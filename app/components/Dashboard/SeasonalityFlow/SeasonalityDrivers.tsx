'use client'
import { useRef, useEffect, useState, useMemo } from 'react'

const INSTRUMENT_MAP: Record<string, string> = {
    Eurusd: 'EURUSD',
    'Btc Usd': 'BTCUSD',
    Aapl: 'AAPL',
    Nvda: 'NVDA',
    Spx: 'SP500',
    Gbpusd: 'GBPUSD',
}

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
    metadata?: {
        market_start_date?: string
        errors?: Record<string, string>
    }
}

// ── Returns by Regime chart ───────────────────────────────────────────────────

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

        // Grid lines
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

        // Zero line
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

// ── Volatility Skew chart (placeholder until options surface API exists) ──────
const SKEW_POINTS = [
    { x: -25, y: 24 },
    { x: -15, y: 18 },
    { x: -10, y: 12 },
    { x: -5, y: 6 },
    { x: 25, y: 0 },
]

const ATM_TENORS = [
    { label: '1W', atm: '16.4%', rr: '0.30', rrPos: true },
    { label: '1M', atm: '17.3%', rr: '0.64', rrPos: true },
    { label: '3M', atm: '9.9%', rr: '1.12', rrPos: false },
    { label: '6M', atm: '10.6%', rr: '1.12', rrPos: false },
    { label: '1Y', atm: '19.7%', rr: '1.69', rrPos: false },
]

function SkewChart() {
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

        const padL = 12
        const padR = 12
        const padT = 12
        const padB = 8

        if (!SKEW_POINTS.length) return

        const minX = -25,
            maxX = 25
        const minY = 0,
            maxY = 24

        const toCanvasX = (x: number) => padL + ((x - minX) / (maxX - minX)) * (W - padL - padR)
        const toCanvasY = (y: number) => padT + ((maxY - y) / (maxY - minY)) * (H - padT - padB)

        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 1
        ;[0, 6, 12, 18, 24].forEach((yVal) => {
            const cy = toCanvasY(yVal)
            ctx.beginPath()
            ctx.moveTo(padL, cy)
            ctx.lineTo(W - padR, cy)
            ctx.stroke()
        })

        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'
        ctx.lineWidth = 1.5
        SKEW_POINTS.forEach((pt, i) => {
            const cx = toCanvasX(pt.x)
            const cy = toCanvasY(pt.y)
            if (i === 0) ctx.moveTo(cx, cy)
            else ctx.lineTo(cx, cy)
        })
        ctx.stroke()
        ctx.setLineDash([])

        ;[0, SKEW_POINTS.length - 1].forEach((idx) => {
            const pt = SKEW_POINTS[idx]
            if (!pt) return
            const cx = toCanvasX(pt.x)
            const cy = toCanvasY(pt.y)
            ctx.beginPath()
            ctx.arc(cx, cy, 5, 0, Math.PI * 2)
            ctx.fillStyle = '#88C4FF'
            ctx.fill()
        })
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

function formatPct(value: number, digits = 1) {
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(digits)}%`
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

interface SeasonalityDriversProps {
    activeTab?: string
}

export default function SeasonalityDrivers({ activeTab = 'Eurusd' }: SeasonalityDriversProps) {
    const instrument = INSTRUMENT_MAP[activeTab] || 'EURUSD'
    const [payload, setPayload] = useState<MarketRegimeResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function fetchRegimes() {
            try {
                setLoading(true)
                setError(null)

                // Hit local FastAPI directly (same pattern as SeasonalityMap).
                // The Next.js /api proxy uses BACKEND_URL (Render), which may not
                // have /market-regimes deployed yet.
                const response = await fetch(
                    `http://127.0.0.1:8000/market-regimes?instruments=${encodeURIComponent(instrument)}`
                )
                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))
                    throw new Error(body.detail || body.details || body.error || 'Failed to fetch market regime data')
                }

                const data: MarketRegimeResponse = await response.json()
                if (!cancelled) setPayload(data)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Unknown error')
                    setPayload(null)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchRegimes()
        return () => {
            cancelled = true
        }
    }, [instrument])

    const regimeBars = useMemo<RegimeBar[]>(() => {
        const asset = payload?.assets?.[instrument]
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
    }, [payload, instrument])

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
                {/* Returns by Regime */}
                <div className="bg-[#16161F] p-3 sm:p-4 min-h-60">
                    <p className="text-white text-[16px] leading-[19px] font-medium mb-2">
                        {instrument} Returns by Regime
                    </p>
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

                    {loading && <div className="text-white/50 text-[12px]">Loading regime returns...</div>}
                    {error && !loading && <div className="text-[#E25C3F] text-[12px]">{error}</div>}

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
                        <div className="text-white/50 text-[12px]">No regime statistics for {instrument}.</div>
                    )}
                </div>

                {/* Volatility Skew — still mock until options surface API exists */}
                <div className="bg-[#16161F] p-3 sm:p-4">
                    <p className="text-white text-[16px] leading-[19px] font-medium mb-2">
                        {instrument} Volatility Skew
                    </p>
                    <p className="text-white/50 text-[12px] leading-[14px] mb-4">
                        Implied volatility across moneyness for 5 tenors. Negative 25LRR = put richer (skew bearish).
                    </p>

                    <div className="flex gap-2">
                        <div
                            className="flex flex-col justify-between text-right flex-shrink-0 pb-6"
                            style={{ width: 24 }}
                        >
                            {['24%', '18%', '12%', '6%', '0%'].map((l) => (
                                <span key={l} className="text-[#838388] text-[9px] leading-[11px]">
                                    {l}
                                </span>
                            ))}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div style={{ height: 120 }}>
                                <SkewChart />
                            </div>
                            <div className="flex justify-between mt-1">
                                {[-25, -15, -10, -5, 25].map((v) => (
                                    <span key={v} className="text-[#838388] text-[9px] leading-[11px]">
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around mt-4 pt-3 border-t border-[#FFFFFF08]">
                        {ATM_TENORS.map((t) => (
                            <div key={t.label} className="flex flex-col items-center gap-0.5">
                                <span className="text-[#838388] text-[9px] leading-[11px] font-semibold">{t.label}</span>
                                <span className="text-white text-[11px] leading-[14px] font-semibold">ATM {t.atm}</span>
                                <span
                                    className={`text-[9px] leading-[11px] font-medium ${
                                        t.rrPos ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                    }`}
                                >
                                    RR {t.rr}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
