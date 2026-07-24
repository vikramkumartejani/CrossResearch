'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoBtcCopy } from './cryptoBtcCopy'

interface EtfPoint {
    date: string
    net_flow_usd: number
    cumulative_usd: number
}

interface PricePoint {
    t: string
    price: number | null
}

interface PriceLevels {
    mean: number | null
    '+1': number | null
    '-1': number | null
    '+2': number | null
    '-2': number | null
    '+3': number | null
    '-3': number | null
}

interface MonteCarloChartData {
    history: PricePoint[]
    median: PricePoint[]
    samplePaths: (number | null)[][]
    levels: PriceLevels
    origin: string
    commentary: string
}

function formatFlow(value: number | null) {
    if (value == null || !Number.isFinite(value)) return '—'
    const sign = value >= 0 ? '+' : '-'
    const abs = Math.abs(value)
    if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`
    if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
    return `${sign}$${abs.toFixed(0)}`
}

function formatK(value: number) {
    if (value >= 1000) return `${Math.round(value / 1000)}k`
    return String(Math.round(value))
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

function MonteCarloForecastChart({
    history,
    median,
    samplePaths,
    levels,
}: {
    history: PricePoint[]
    median: PricePoint[]
    samplePaths: (number | null)[][]
    levels: PriceLevels
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || history.length < 2 || median.length < 2) return
        const ctx = c.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 420
        const H = c.offsetHeight || 240
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

        const historyPrices = history.map((p) => p.price).filter((v): v is number => v != null)
        const medianPrices = median.map((p) => p.price).filter((v): v is number => v != null)
        const pathPrices = samplePaths.flat().filter((v): v is number => v != null)
        const levelPrices = Object.values(levels).filter((v): v is number => v != null)

        const allPrices = [...historyPrices, ...medianPrices, ...pathPrices, ...levelPrices]
        if (!allPrices.length) return

        let minV = Math.min(...allPrices)
        let maxV = Math.max(...allPrices)
        const pad = (maxV - minV) * 0.06 || maxV * 0.02
        minV -= pad
        maxV += pad
        const span = maxV - minV || 1

        const histCount = history.length
        const futCount = median.length
        // History takes ~70% of width, forecast ~30% (matches notebook visual balance)
        const splitRatio = 0.72
        const originX = padL + chartW * splitRatio

        const toHistX = (i: number) =>
            padL + (histCount <= 1 ? 0 : (i / (histCount - 1)) * (originX - padL))
        const toFutX = (i: number) =>
            originX + (futCount <= 1 ? 0 : (i / (futCount - 1)) * (padL + chartW - originX))
        const toY = (v: number) => padT + ((maxV - v) / span) * chartH

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 1
        for (let i = 0; i <= 4; i++) {
            const y = padT + (i / 4) * chartH
            ctx.beginPath()
            ctx.moveTo(padL, y)
            ctx.lineTo(padL + chartW, y)
            ctx.stroke()
        }

        // Std-dev / mean horizontal bands across full chart
        const bandSpecs: { key: keyof PriceLevels; color: string; width: number }[] = [
            { key: '+3', color: 'rgba(226,92,63,0.85)', width: 1 },
            { key: '-3', color: 'rgba(226,92,63,0.85)', width: 1 },
            { key: '+2', color: 'rgba(245,158,11,0.85)', width: 1 },
            { key: '-2', color: 'rgba(245,158,11,0.85)', width: 1 },
            { key: '+1', color: 'rgba(44,179,123,0.85)', width: 1 },
            { key: '-1', color: 'rgba(44,179,123,0.85)', width: 1 },
            { key: 'mean', color: 'rgba(255,255,255,0.55)', width: 1.2 },
        ]

        bandSpecs.forEach(({ key, color, width }) => {
            const value = levels[key]
            if (value == null) return
            const y = toY(value)
            ctx.beginPath()
            ctx.setLineDash([5, 4])
            ctx.strokeStyle = color
            ctx.lineWidth = width
            ctx.moveTo(padL, y)
            ctx.lineTo(padL + chartW, y)
            ctx.stroke()
        })
        ctx.setLineDash([])

        // Monte Carlo cloud (forecast side only)
        samplePaths.forEach((path) => {
            let started = false
            ctx.beginPath()
            path.forEach((v, i) => {
                if (v == null) return
                const x = toFutX(i)
                const y = toY(v)
                if (!started) {
                    ctx.moveTo(x, y)
                    started = true
                } else {
                    ctx.lineTo(x, y)
                }
            })
            if (!started) return
            ctx.strokeStyle = 'rgba(136,196,255,0.16)'
            ctx.lineWidth = 0.8
            ctx.stroke()
        })

        // Historical close
        ctx.beginPath()
        let histStarted = false
        history.forEach((p, i) => {
            if (p.price == null) return
            const x = toHistX(i)
            const y = toY(p.price)
            if (!histStarted) {
                ctx.moveTo(x, y)
                histStarted = true
            } else {
                ctx.lineTo(x, y)
            }
        })
        ctx.strokeStyle = '#4C84C4'
        ctx.lineWidth = 1.6
        ctx.stroke()

        // Median Monte Carlo path (dashed)
        ctx.beginPath()
        ctx.setLineDash([6, 4])
        let medStarted = false
        median.forEach((p, i) => {
            if (p.price == null) return
            const x = toFutX(i)
            const y = toY(p.price)
            if (!medStarted) {
                ctx.moveTo(x, y)
                medStarted = true
            } else {
                ctx.lineTo(x, y)
            }
        })
        ctx.strokeStyle = '#88C4FF'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.setLineDash([])

        // Forecast origin vertical divider
        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = 'rgba(255,255,255,0.35)'
        ctx.lineWidth = 1
        ctx.moveTo(originX, padT)
        ctx.lineTo(originX, padT + chartH)
        ctx.stroke()
        ctx.setLineDash([])

        // Y labels
        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let i = 0; i <= 4; i++) {
            const value = maxV - (span * i) / 4
            const y = padT + (i / 4) * chartH
            ctx.fillText(formatK(value), padL - 6, y)
        }

        // X labels: start / origin / end
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        const histStart = history[0]?.t
        const origin = history[history.length - 1]?.t || median[0]?.t
        const futEnd = median[median.length - 1]?.t
        const label = (iso?: string) => {
            if (!iso) return ''
            const d = new Date(iso)
            if (Number.isNaN(d.getTime())) return ''
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
        ctx.fillText(label(histStart), padL + 18, padT + chartH + 6)
        ctx.fillText(label(origin), originX, padT + chartH + 6)
        ctx.fillText(label(futEnd), padL + chartW - 18, padT + chartH + 6)
    }, [history, median, samplePaths, levels])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function InstitutionalFlow() {
    const copy = useCryptoBtcCopy()
    const [etfSeries, setEtfSeries] = useState<number[]>([])
    const [etfMeta, setEtfMeta] = useState<{
        flow5d: number | null
        flow20d: number | null
        cumulative: number | null
        commentary: string
        windowDays: number
    } | null>(null)
    const [forecastChart, setForecastChart] = useState<MonteCarloChartData | null>(null)
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

                const terminal = forecast.forecast?.terminal
                setForecastChart({
                    history: (forecast.forecast?.history || []) as PricePoint[],
                    median: (forecast.forecast?.median_path || []) as PricePoint[],
                    samplePaths: (forecast.forecast?.sample_paths || []) as (number | null)[][],
                    levels: (forecast.forecast?.price_levels || {}) as PriceLevels,
                    origin: forecast.forecast?.origin || '',
                    commentary: terminal
                        ? `Mean/σ bands + Monte Carlo cloud · median ${terminal.bias?.toLowerCase()} ${terminal.change_pct?.toFixed?.(1)}%`
                        : 'Mean/σ bands with regime-conditioned Monte Carlo paths',
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
                            {copy.charts.etf_flows.eyebrow}
                        </p>
                        <p className="text-white text-[16px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            {copy.charts.etf_flows.title} • {etfMeta?.windowDays ?? 30}d
                        </p>
                    </div>
                    {copy.charts.etf_flows.badge && (
                        <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            {copy.charts.etf_flows.badge}
                        </span>
                    )}
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
                <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            {copy.charts.return_forecast.eyebrow}
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            {copy.charts.return_forecast.title}
                        </p>
                    </div>
                    {copy.charts.return_forecast.badge && (
                        <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            {copy.charts.return_forecast.badge}
                        </span>
                    )}
                </div>

                {/* Compact legend */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 text-[10px] text-[#838388]">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#4C84C4] inline-block" /> Close
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#88C4FF] inline-block" /> Median MC
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-white/50 inline-block" /> Mean
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#2CB37B] inline-block" /> ±1σ
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#F59E0B] inline-block" /> ±2σ
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-[2px] bg-[#E25C3F] inline-block" /> ±3σ
                    </span>
                </div>

                {loading && <div className="my-16 text-center text-white/50 text-[12px]">Loading forecast...</div>}
                {!loading && forecastChart && forecastChart.history.length > 1 && forecastChart.median.length > 1 && (
                    <div className="flex-1" style={{ height: 240 }}>
                        <MonteCarloForecastChart
                            history={forecastChart.history}
                            median={forecastChart.median}
                            samplePaths={forecastChart.samplePaths}
                            levels={forecastChart.levels}
                        />
                    </div>
                )}

                <p className="mt-auto text-[#838388] text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] mt-3">
                    {forecastChart?.commentary || 'Mean/σ bands with regime-conditioned Monte Carlo paths.'}
                </p>
            </div>
        </div>
    )
}
