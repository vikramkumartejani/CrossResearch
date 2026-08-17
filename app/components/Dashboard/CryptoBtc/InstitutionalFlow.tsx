'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoBtcCopy } from './cryptoBtcCopy'
import ChartLoader from '../shared/ChartLoader'

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

function formatK(value: number) {
    if (value >= 1000) return `${Math.round(value / 1000)}k`
    return String(Math.round(value))
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
        const H = c.offsetHeight || 280
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
        const splitRatio = 0.72
        const originX = padL + chartW * splitRatio

        const toHistX = (i: number) =>
            padL + (histCount <= 1 ? 0 : (i / (histCount - 1)) * (originX - padL))
        const toFutX = (i: number) =>
            originX + (futCount <= 1 ? 0 : (i / (futCount - 1)) * (padL + chartW - originX))
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

        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = 'rgba(255,255,255,0.35)'
        ctx.lineWidth = 1
        ctx.moveTo(originX, padT)
        ctx.lineTo(originX, padT + chartH)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let i = 0; i <= 4; i++) {
            const value = maxV - (span * i) / 4
            const y = padT + (i / 4) * chartH
            ctx.fillText(formatK(value), padL - 6, y)
        }

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
    const [forecastChart, setForecastChart] = useState<MonteCarloChartData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const forecastRes = await fetch('/api/btc-forecast')
                if (!forecastRes.ok) throw new Error('Failed to load return forecast')

                const forecast = await forecastRes.json()
                if (cancelled) return

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
        <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col w-full">
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

            {loading && <ChartLoader />}
            {error && !loading && <div className="my-16 text-center text-[#E25C3F] text-[12px]">{error}</div>}
            {!loading && !error && forecastChart && forecastChart.history.length > 1 && forecastChart.median.length > 1 && (
                <div className="w-full" style={{ height: 300 }}>
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
    )
}
