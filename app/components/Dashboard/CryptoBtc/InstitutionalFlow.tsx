'use client'

import { useEffect, useRef, useState } from 'react'

interface EtfPoint {
    date: string
    net_flow_usd: number
    cumulative_usd: number
}

interface ForecastPoint {
    t: string
    price: number | null
}

function formatFlow(value: number | null) {
    if (value == null || !Number.isFinite(value)) return '—'
    const sign = value >= 0 ? '+' : '-'
    const abs = Math.abs(value)
    if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`
    if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
    return `${sign}$${abs.toFixed(0)}`
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

function ReturnForecastChart({
    median,
    upper,
    lower,
}: {
    median: number[]
    upper: number[]
    lower: number[]
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || median.length < 2) return
        const ctx = c.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 300
        const H = c.offsetHeight || 160
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const all = [...median, ...upper, ...lower]
        const minV = Math.min(...all)
        const maxV = Math.max(...all)
        const span = maxV - minV || 1
        const toX = (i: number) => (i / (median.length - 1)) * W
        const toY = (v: number) => H - ((v - minV) / span) * H

        ctx.beginPath()
        upper.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        lower
            .slice()
            .reverse()
            .forEach((v, i) => ctx.lineTo(toX(lower.length - 1 - i), toY(v)))
        ctx.closePath()
        ctx.fillStyle = 'rgba(136,196,255,0.08)'
        ctx.fill()

        ;[upper, lower].forEach((line) => {
            ctx.beginPath()
            line.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
            ctx.strokeStyle = 'rgba(136,196,255,0.25)'
            ctx.lineWidth = 1
            ctx.stroke()
        })

        ctx.beginPath()
        median.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.strokeStyle = '#88C4FF'
        ctx.lineWidth = 1.5
        ctx.stroke()
    }, [median, upper, lower])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function InstitutionalFlow() {
    const [etfSeries, setEtfSeries] = useState<number[]>([])
    const [etfMeta, setEtfMeta] = useState<{
        flow5d: number | null
        flow20d: number | null
        cumulative: number | null
        commentary: string
        windowDays: number
    } | null>(null)
    const [forecastPaths, setForecastPaths] = useState<{
        median: number[]
        upper: number[]
        lower: number[]
        commentary: string
    } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const [etfRes, forecastRes] = await Promise.all([
                    fetch('/api/btc-etf-flows'),
                    fetch('/api/btc-forecast'),
                ])
                if (!etfRes.ok || !forecastRes.ok) throw new Error('Failed to load institutional flow data')

                const etf = await etfRes.json()
                const forecast = await forecastRes.json()
                if (cancelled) return

                const series: EtfPoint[] = etf.series || []
                setEtfSeries(series.map((p) => p.net_flow_usd))
                setEtfMeta({
                    flow5d: etf.latest?.flow_5d ?? null,
                    flow20d: etf.latest?.flow_20d ?? null,
                    cumulative: etf.latest?.cumulative ?? null,
                    commentary: etf.metadata?.commentary || etf.latest?.regime || '',
                    windowDays: etf.metadata?.window_days || series.length || 30,
                })

                const median = ((forecast.forecast?.median_path || []) as ForecastPoint[])
                    .map((p) => p.price)
                    .filter((v): v is number => v != null)
                const upper = ((forecast.forecast?.upper_path || []) as ForecastPoint[])
                    .map((p) => p.price)
                    .filter((v): v is number => v != null)
                const lower = ((forecast.forecast?.lower_path || []) as ForecastPoint[])
                    .map((p) => p.price)
                    .filter((v): v is number => v != null)

                const terminal = forecast.forecast?.terminal
                setForecastPaths({
                    median,
                    upper,
                    lower,
                    commentary: terminal
                        ? `30D median ${terminal.bias?.toLowerCase()} path · p05/p95 band ${terminal.lower_pct?.toFixed?.(1)}% / +${terminal.upper_pct?.toFixed?.(1)}%`
                        : '',
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

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            ETF Flows
                        </p>
                        <p className="text-white text-[16px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            BTC Spot ETF Net Flows • {etfMeta?.windowDays ?? 30}d
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">Alpha</span>
                </div>

                {loading && <div className="my-16 text-center text-white/50 text-[12px]">Loading ETF flows...</div>}
                {error && !loading && <div className="my-16 text-center text-[#E25C3F] text-[12px]">{error}</div>}

                {!loading && !error && etfSeries.length > 0 && (
                    <div className="flex-1" style={{ height: 140 }}>
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

            <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            Return Forecast
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            BTC 30d Projected Path • 90% Band
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">Alpha</span>
                </div>

                {loading && <div className="my-16 text-center text-white/50 text-[12px]">Loading forecast...</div>}
                {!loading && forecastPaths && forecastPaths.median.length > 1 && (
                    <div className="flex-1" style={{ height: 120 }}>
                        <ReturnForecastChart
                            median={forecastPaths.median}
                            upper={forecastPaths.upper}
                            lower={forecastPaths.lower}
                        />
                    </div>
                )}

                <p className="mt-auto text-[#838388] text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] mt-3">
                    {forecastPaths?.commentary || 'Regime-conditioned Monte Carlo forecast path.'}
                </p>
            </div>
        </div>
    )
}
