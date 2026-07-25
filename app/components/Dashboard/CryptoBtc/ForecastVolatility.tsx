'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoBtcCopy } from './cryptoBtcCopy'

interface VolPoint {
    t: string
    rv: number | null
    mean: number | null
    upper: number | null
    lower: number | null
}

interface EtfPoint {
    date: string
    net_flow_usd: number
    cumulative_usd: number
}

function formatPct(value: number) {
    return `${value.toFixed(1)}%`
}

function formatFlow(value: number | null) {
    if (value == null || !Number.isFinite(value)) return '—'
    const sign = value >= 0 ? '+' : '-'
    const abs = Math.abs(value)
    if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`
    if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
    return `${sign}$${abs.toFixed(0)}`
}

function VolRegimeChart({ series }: { series: VolPoint[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || series.length < 2) return
        const ctx = c.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 420
        const H = c.offsetHeight || 220
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const padL = 36
        const padR = 10
        const padT = 10
        const padB = 22
        const chartW = W - padL - padR
        const chartH = H - padT - padB

        const allVals = series
            .flatMap((p) => [p.rv, p.mean, p.upper, p.lower])
            .filter((v): v is number => v != null && Number.isFinite(v))
        if (!allVals.length) return

        let minV = Math.min(0, ...allVals)
        let maxV = Math.max(...allVals)
        const pad = (maxV - minV) * 0.08 || 0.2
        maxV += pad
        if (minV > 0) minV = Math.max(0, minV - pad * 0.3)
        const span = maxV - minV || 1

        const toX = (i: number) => padL + (i / (series.length - 1)) * chartW
        const toY = (v: number) => padT + ((maxV - v) / span) * chartH

        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 1
        for (let i = 0; i <= 4; i++) {
            const y = padT + (i / 4) * chartH
            ctx.beginPath()
            ctx.moveTo(padL, y)
            ctx.lineTo(padL + chartW, y)
            ctx.stroke()
        }

        const drawSeries = (key: keyof VolPoint, color: string, width: number, dashed: boolean) => {
            let started = false
            ctx.beginPath()
            if (dashed) ctx.setLineDash([5, 4])
            else ctx.setLineDash([])
            series.forEach((p, i) => {
                const v = p[key]
                if (typeof v !== 'number' || !Number.isFinite(v)) return
                const x = toX(i)
                const y = toY(v)
                if (!started) {
                    ctx.moveTo(x, y)
                    started = true
                } else {
                    ctx.lineTo(x, y)
                }
            })
            if (!started) return
            ctx.strokeStyle = color
            ctx.lineWidth = width
            ctx.stroke()
            ctx.setLineDash([])
        }

        drawSeries('upper', 'rgba(226,92,63,0.9)', 1.2, true)
        drawSeries('lower', 'rgba(44,179,123,0.9)', 1.2, true)
        drawSeries('mean', 'rgba(255,255,255,0.55)', 1.2, true)
        drawSeries('rv', '#4C84C4', 1.7, false)

        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let i = 0; i <= 4; i++) {
            const value = maxV - (span * i) / 4
            const y = padT + (i / 4) * chartH
            ctx.fillText(formatPct(value), padL - 6, y)
        }

        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        const label = (iso?: string) => {
            if (!iso) return ''
            const d = new Date(iso)
            if (Number.isNaN(d.getTime())) return ''
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
        const mid = Math.floor(series.length / 2)
        ctx.fillText(label(series[0]?.t), padL + 18, padT + chartH + 6)
        ctx.fillText(label(series[mid]?.t), padL + chartW / 2, padT + chartH + 6)
        ctx.fillText(label(series[series.length - 1]?.t), padL + chartW - 18, padT + chartH + 6)
    }, [series])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

function EtfBarChart({ values }: { values: number[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || values.length === 0) return
        const ctx = c.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 400
        const H = c.offsetHeight || 160
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const maxV = Math.max(...values.map(Math.abs), 1)
        const midY = H / 2
        const gap = W / values.length
        const barW = gap * 0.6

        ctx.strokeStyle = 'rgba(255,255,255,0.12)'
        ctx.beginPath()
        ctx.moveTo(0, midY)
        ctx.lineTo(W, midY)
        ctx.stroke()

        values.forEach((val, i) => {
            const x = i * gap + gap / 2 - barW / 2
            const barH = Math.abs(val / maxV) * midY * 0.85
            const y = val >= 0 ? midY - barH : midY
            ctx.fillStyle = val >= 0 ? 'rgba(136,196,255,0.8)' : 'rgba(136,196,255,0.35)'
            ctx.fillRect(x, y, barW, Math.max(barH, 1))
        })
    }, [values])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function ForecastVolatility() {
    const copy = useCryptoBtcCopy()
    const [series, setSeries] = useState<VolPoint[]>([])
    const [latest, setLatest] = useState<{
        rv_pct: number | null
        mean_pct: number | null
        upper_pct: number | null
        lower_pct: number | null
        z_score: number | null
        regime: string
    } | null>(null)
    const [subtitle, setSubtitle] = useState<string>('')
    const [etfSeries, setEtfSeries] = useState<number[]>([])
    const [etfMeta, setEtfMeta] = useState<{
        flow5d: number | null
        flow20d: number | null
        cumulative: number | null
        commentary: string
        windowDays: number
    } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const [forecastRes, etfRes] = await Promise.all([
                    fetch('/api/btc-forecast'),
                    fetch('/api/btc-etf-flows'),
                ])
                if (!forecastRes.ok || !etfRes.ok) throw new Error('Failed to load forecast & flow data')

                const data = await forecastRes.json()
                const etf = await etfRes.json()
                if (cancelled) return

                setSeries(data.volatility?.series || [])
                setLatest(data.volatility?.latest || null)
                setSubtitle(data.volatility?.subtitle || '')

                const points: EtfPoint[] = etf.series || []
                setEtfSeries(points.map((p) => p.net_flow_usd))
                setEtfMeta({
                    flow5d: etf.latest?.flow_5d ?? null,
                    flow20d: etf.latest?.flow_20d ?? null,
                    cumulative: etf.latest?.cumulative ?? null,
                    commentary: etf.metadata?.commentary || etf.latest?.regime || '',
                    windowDays: etf.metadata?.window_days || points.length || 30,
                })
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    const volCopy = copy.charts.vol_regime
    const etfCopy = copy.charts.etf_flows

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            {volCopy.eyebrow}
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            {volCopy.title}
                        </p>
                    </div>
                    {volCopy.badge && (
                        <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            {volCopy.badge}
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className="text-[#838388] text-[11px] sm:text-[12px] leading-4 mt-2">{subtitle}</p>
                )}

                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 mb-2 text-[10px] text-[#838388]">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#4C84C4] inline-block" /> Realized vol
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-white/50 inline-block" /> Mean
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#E25C3F] inline-block" /> Upper (+2σ)
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#2CB37B] inline-block" /> Lower (−2σ)
                    </span>
                </div>

                {loading && (
                    <div className="flex items-center justify-center h-full text-center py-16 text-white/50 text-[12px]">
                        Loading volatility...
                    </div>
                )}
                {error && !loading && (
                    <div className="flex items-center justify-center h-full text-center py-16 text-[#E25C3F] text-[12px]">
                        {error}
                    </div>
                )}
                {!loading && !error && series.length > 1 && (
                    <div className="mt-1" style={{ height: 220 }}>
                        <VolRegimeChart series={series} />
                    </div>
                )}

                <p className="mt-auto text-[#838388] text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] font-normal mt-3">
                    RV at{' '}
                    <span className="text-white font-semibold">
                        {latest?.rv_pct != null ? `${latest.rv_pct.toFixed(2)}%` : '—'}
                    </span>
                    , z-score {latest?.z_score != null ? latest.z_score.toFixed(3) : '—'} · Regime{' '}
                    <span className="text-white font-semibold">{latest?.regime || '—'}</span>.
                </p>
            </div>

            <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            {etfCopy.eyebrow}
                        </p>
                        <p className="text-white text-[16px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            {etfCopy.title} • {etfMeta?.windowDays ?? 30}d
                        </p>
                    </div>
                    {etfCopy.badge && (
                        <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            {etfCopy.badge}
                        </span>
                    )}
                </div>

                {loading && <div className="my-16 text-center text-white/50 text-[12px]">Loading ETF flows...</div>}
                {error && !loading && <div className="my-16 text-center text-[#E25C3F] text-[12px]">{error}</div>}

                {!loading && !error && etfSeries.length > 0 && (
                    <div className="flex-1" style={{ height: 180 }}>
                        <EtfBarChart values={etfSeries} />
                    </div>
                )}

                <p className="text-[#838388] text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] font-normal mt-3">
                    {etfMeta?.commentary || 'U.S. BTC spot ETF net flows.'}
                </p>

                <div className="mt-3 sm:mt-4 flex items-start flex-wrap gap-x-6 gap-y-3 sm:gap-8">
                    {[
                        { label: '5D NET', value: formatFlow(etfMeta?.flow5d ?? null), pos: (etfMeta?.flow5d ?? 0) >= 0 },
                        { label: '20D', value: formatFlow(etfMeta?.flow20d ?? null), pos: (etfMeta?.flow20d ?? 0) >= 0 },
                        {
                            label: 'Cumulative',
                            value: formatFlow(etfMeta?.cumulative ?? null).replace(/^\+/, ''),
                            pos: (etfMeta?.cumulative ?? 0) >= 0,
                        },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium">{s.label}</p>
                            <p
                                className={`text-[14px] sm:text-[16px] leading-[19px] font-semibold mt-1 ${
                                    s.pos ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                }`}
                            >
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
