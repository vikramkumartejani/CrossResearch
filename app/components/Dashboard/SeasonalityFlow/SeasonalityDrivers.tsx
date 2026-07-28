'use client'
import { useRef, useEffect, useState, useMemo } from 'react'
import InstrumentDropdown, { type SeasonalityInstrument } from './InstrumentDropdown'

const REGIME_ORDER = ['Expansion', 'Stagflation', 'Recession', 'Recovery'] as const

interface RegimeStats {
    mean: number | null
    vol: number | null
    sharpe: number | null
    hit: number | null
    n: number
    sample_warning: boolean
}

interface RegimeBar {
    label: string
    shortLabel: string
    mean: number
    sharpe: string
    hit: string
    n: number
}

interface CurrentRegime {
    regime_label?: string
    forecast_regime?: string
    regime_confidence_percent?: number | null
    macro_data_as_of?: string
}

interface CountryRegimeRow {
    country: string
    current_regime: string
    regime_conviction_percent: number | null
    growth_score: number | null
    inflation_score: number | null
    conviction_strength: string
    data_as_of?: string | null
}

interface MarketRegimeResponse {
    regimes: string[]
    assets: Record<
        string,
        {
            asset_class: string
            ticker: string
            regimes: Record<string, RegimeStats>
        }
    >
    current: CurrentRegime
    countries?: CountryRegimeRow[]
    metadata?: {
        market_start_date?: string
        errors?: Record<string, string>
    }
}

function ReturnsChart({ regimes, yMin, yMax }: { regimes: RegimeBar[]; yMin: number; yMax: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = canvas.offsetWidth || 300
        const H = canvas.offsetHeight || 120
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const padL = 8
        const padR = 8
        const padT = 8
        const padB = 8
        const chartH = H - padT - padB
        const span = yMax - yMin || 1
        const zeroY = padT + ((yMax - 0) / span) * chartH

        const gridCount = 5
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 1
        for (let i = 0; i < gridCount; i++) {
            const y = padT + (i / (gridCount - 1)) * chartH
            ctx.beginPath()
            ctx.moveTo(padL, y)
            ctx.lineTo(W - padR, y)
            ctx.stroke()
        }

        if (yMin < 0 && yMax > 0) {
            ctx.strokeStyle = 'rgba(255,255,255,0.18)'
            ctx.beginPath()
            ctx.moveTo(padL, zeroY)
            ctx.lineTo(W - padR, zeroY)
            ctx.stroke()
        }

        const slotW = (W - padL - padR) / Math.max(regimes.length, 1)
        const barW = slotW * 0.45

        regimes.forEach((regime, i) => {
            const x = padL + i * slotW + slotW / 2
            const barTop = padT + ((yMax - Math.max(regime.mean, 0)) / span) * chartH
            const barBottom = padT + ((yMax - Math.min(regime.mean, 0)) / span) * chartH
            const y = Math.min(barTop, barBottom)
            const bH = Math.max(Math.abs(barBottom - barTop), 1)

            const grad = ctx.createLinearGradient(0, y, 0, y + bH)
            if (regime.mean >= 0) {
                grad.addColorStop(0, 'rgba(136,196,255,0.55)')
                grad.addColorStop(1, 'rgba(136,196,255,0.08)')
            } else {
                grad.addColorStop(0, 'rgba(226,92,63,0.15)')
                grad.addColorStop(1, 'rgba(226,92,63,0.55)')
            }
            ctx.fillStyle = grad
            ctx.fillRect(x - barW / 2, y, barW, bH)
        })
    }, [regimes, yMin, yMax])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

function formatPct(value: number, digits = 1) {
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(digits)}%`
}

function formatSigned(value: number | null | undefined, digits = 2) {
    if (value == null || !Number.isFinite(value)) return '—'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(digits)}`
}

function buildYLabels(yMin: number, yMax: number) {
    const steps = 4
    const labels: string[] = []
    for (let i = 0; i <= steps; i++) {
        const value = yMax - ((yMax - yMin) * i) / steps
        labels.push(`${value.toFixed(1)}%`)
    }
    return labels
}

function friendlyError(error: string) {
    if (/warming up|still computing|retry shortly|retrying in background/i.test(error)) {
        return error
    }
    if (/fetch failed|failed to fetch|aborted|timeout/i.test(error)) {
        return 'Regime model is still warming up. Server precomputes US/EU/UK on startup — refresh in a minute.'
    }
    return error
}

export default function SeasonalityDrivers() {
    const [regimeInstrument, setRegimeInstrument] = useState<SeasonalityInstrument>('EURUSD')
    const [payload, setPayload] = useState<MarketRegimeResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        let retryTimer: ReturnType<typeof setTimeout> | null = null

        async function fetchRegimes() {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(
                    `/api/market-regimes?instruments=${encodeURIComponent(regimeInstrument)}`
                )
                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))
                    const detail = body.details || body.detail || body.error || 'Failed to fetch market regime data'
                    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail))
                }

                const data: MarketRegimeResponse = await response.json()
                if (!cancelled) setPayload(data)
            } catch (err) {
                if (!cancelled) {
                    const message = err instanceof Error ? err.message : 'Unknown error'
                    setError(message)
                    setPayload(null)
                    if (/warming up|still computing|retry/i.test(message)) {
                        retryTimer = setTimeout(fetchRegimes, 15_000)
                        return
                    }
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchRegimes()
        return () => {
            cancelled = true
            if (retryTimer) clearTimeout(retryTimer)
        }
    }, [regimeInstrument])

    const regimeBars = useMemo<RegimeBar[]>(() => {
        const asset = payload?.assets?.[regimeInstrument]
        if (!asset) return []

        return REGIME_ORDER.map((label) => {
            const stats = asset.regimes[label]
            return {
                label,
                shortLabel: label.slice(0, 4),
                mean: stats?.mean ?? 0,
                sharpe: stats?.sharpe != null ? stats.sharpe.toFixed(2) : '—',
                hit: stats?.hit != null ? `${stats.hit.toFixed(1)}%` : '—',
                n: stats?.n ?? 0,
            }
        })
    }, [payload, regimeInstrument])

    const { yMin, yMax, yLabels } = useMemo(() => {
        if (!regimeBars.length) {
            return { yMin: -2, yMax: 6, yLabels: ['6%', '4%', '2%', '0%', '-2%'] }
        }
        const means = regimeBars.map((r) => r.mean)
        const rawMin = Math.min(0, ...means)
        const rawMax = Math.max(0, ...means)
        const pad = Math.max(0.5, (rawMax - rawMin) * 0.15)
        const nextMin = Math.floor((rawMin - pad) * 2) / 2
        const nextMax = Math.ceil((rawMax + pad) * 2) / 2
        return {
            yMin: nextMin,
            yMax: nextMax === nextMin ? nextMin + 1 : nextMax,
            yLabels: buildYLabels(nextMin, nextMax === nextMin ? nextMin + 1 : nextMax),
        }
    }, [regimeBars])

    const current = payload?.current
    const sampleStart = payload?.metadata?.market_start_date?.slice(0, 4)

    return (
        <div>
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Seasonality Drivers</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#16161F] p-3 sm:p-4 min-h-60">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        <InstrumentDropdown value={regimeInstrument} onChange={setRegimeInstrument} />
                        <p className="text-white text-[16px] leading-[19px] font-medium">Returns by Regime</p>
                    </div>
                    <p className="text-white/50 text-[12px] leading-[14px] mb-2">
                        Average monthly return conditional on the macro regime
                        {sampleStart ? ` (from ${sampleStart}).` : '.'}
                    </p>
                    {current?.regime_label && (
                        <p className="text-[#88C4FF] text-[11px] leading-[14px] mb-4">
                            Current: {current.regime_label}
                            {current.forecast_regime ? ` → ${current.forecast_regime}` : ''}
                            {current.regime_confidence_percent != null
                                ? ` · ${current.regime_confidence_percent.toFixed(0)}% conf`
                                : ''}
                            {current.macro_data_as_of ? ` · as of ${current.macro_data_as_of}` : ''}
                        </p>
                    )}

                    {loading && (
                        <div className="text-white/50 text-[12px]">
                            Loading regime returns (first load can take several minutes)…
                        </div>
                    )}
                    {error && !loading && (
                        <div className="text-[#E25C3F] text-[12px]">{friendlyError(error)}</div>
                    )}

                    {!loading && !error && regimeBars.length > 0 && (
                        <>
                            <div className="flex gap-2">
                                <div
                                    className="flex flex-col justify-between text-right flex-shrink-0 pb-6"
                                    style={{ width: 32 }}
                                >
                                    {yLabels.map((label) => (
                                        <span key={label} className="text-[#838388] text-[9px] leading-[11px]">
                                            {label}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div style={{ height: 120 }}>
                                        <ReturnsChart regimes={regimeBars} yMin={yMin} yMax={yMax} />
                                    </div>
                                    <div className="flex justify-around mt-1">
                                        {regimeBars.map((r) => (
                                            <span
                                                key={r.label}
                                                className="text-[#838388] text-[9px] leading-[11px] text-center"
                                            >
                                                {r.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-around mt-4 pt-3 border-t border-[#FFFFFF08]">
                                {regimeBars.map((r) => (
                                    <div key={r.label} className="flex flex-col items-center gap-0.5">
                                        <span className="text-white text-[11px] leading-[14px] font-semibold">
                                            {formatPct(r.mean)}
                                        </span>
                                        <span className="text-white/70 text-[10px] leading-[12px]">Sh {r.sharpe}</span>
                                        <span className="text-[#838388] text-[9px] leading-[11px]">{r.hit} hit</span>
                                        <span className="text-[#838388] text-[9px] leading-[11px]">n={r.n}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {!loading && !error && regimeBars.length === 0 && (
                        <div className="text-white/50 text-[12px]">No regime statistics for {regimeInstrument}.</div>
                    )}
                </div>

                <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col min-h-60">
                    <p className="text-white text-[16px] leading-[19px] font-medium mb-2">Current Regime</p>
                    <p className="text-white/50 text-[12px] leading-[14px] mb-4">
                        G3 macro regime snapshot for the Euro Area, United Kingdom and United States.
                        {payload?.countries?.[0]?.data_as_of
                            ? ` As of ${payload.countries[0].data_as_of}.`
                            : ''}
                    </p>

                    {loading && (
                        <div className="text-white/50 text-[12px]">
                            Loading current regimes (first load can take several minutes)…
                        </div>
                    )}
                    {error && !loading && (
                        <div className="text-[#E25C3F] text-[12px]">{friendlyError(error)}</div>
                    )}

                    {!loading && !error && (payload?.countries?.length ?? 0) > 0 && (
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full min-w-[520px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-[#FFFFFF14]">
                                        <th className="py-2 pr-3 text-[#838388] text-[11px] leading-[14px] font-medium">
                                            Country
                                        </th>
                                        <th className="py-2 pr-3 text-[#838388] text-[11px] leading-[14px] font-medium">
                                            Current Regime
                                        </th>
                                        <th className="py-2 pr-3 text-[#838388] text-[11px] leading-[14px] font-medium text-right">
                                            Conviction %
                                        </th>
                                        <th className="py-2 pr-3 text-[#838388] text-[11px] leading-[14px] font-medium text-right">
                                            Growth
                                        </th>
                                        <th className="py-2 pr-3 text-[#838388] text-[11px] leading-[14px] font-medium text-right">
                                            Inflation
                                        </th>
                                        <th className="py-2 text-[#838388] text-[11px] leading-[14px] font-medium">
                                            Strength
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(payload?.countries ?? []).map((row, idx) => (
                                        <tr
                                            key={row.country}
                                            className={idx % 2 === 0 ? 'bg-[#FFFFFF05]' : 'bg-transparent'}
                                        >
                                            <td className="py-2.5 pr-3 text-white text-[13px] leading-4 font-semibold">
                                                {row.country}
                                            </td>
                                            <td className="py-2.5 pr-3 text-white/90 text-[12px] sm:text-[13px] leading-4">
                                                {row.current_regime || '—'}
                                            </td>
                                            <td className="py-2.5 pr-3 text-white text-[13px] leading-4 text-right tabular-nums">
                                                {row.regime_conviction_percent != null
                                                    ? row.regime_conviction_percent.toFixed(1)
                                                    : '—'}
                                            </td>
                                            <td
                                                className={`py-2.5 pr-3 text-[13px] leading-4 text-right tabular-nums ${
                                                    (row.growth_score ?? 0) >= 0
                                                        ? 'text-[#5CEB8A]'
                                                        : 'text-[#E25C3F]'
                                                }`}
                                            >
                                                {formatSigned(row.growth_score)}
                                            </td>
                                            <td
                                                className={`py-2.5 pr-3 text-[13px] leading-4 text-right tabular-nums ${
                                                    (row.inflation_score ?? 0) >= 0
                                                        ? 'text-[#5CEB8A]'
                                                        : 'text-[#E25C3F]'
                                                }`}
                                            >
                                                {formatSigned(row.inflation_score)}
                                            </td>
                                            <td className="py-2.5 text-[#88C4FF] text-[12px] leading-4">
                                                {row.conviction_strength || '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && !error && (payload?.countries?.length ?? 0) === 0 && (
                        <div className="text-white/50 text-[12px]">No country regime snapshot available.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
