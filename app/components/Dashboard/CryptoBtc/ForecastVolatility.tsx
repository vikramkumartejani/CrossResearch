'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoBtcCopy } from './cryptoBtcCopy'

const LIQ_ROWS = [
    { price: '$68 200', label: 'SHORTS 5 – 10X', type: 'short', color: '#2CB37B', width: 85 },
    { price: '$66 800', label: 'SHORTS 10 – 25X', type: 'short', color: '#2CB37B', width: 68 },
    { price: '$65 400', label: 'SHORTS 25 – 50X', type: 'short', color: '#2CB37B', width: 55 },
    { price: '$63 100', label: 'LONGS 25 – 50X', type: 'long', color: '#E25C3F', width: 75 },
    { price: '$61 500', label: 'LONGS 10 – 25X', type: 'long', color: '#E25C3F', width: 60 },
    { price: '$60 200', label: 'LONGS 5 – 10X', type: 'long', color: '#E25C3F', width: 80 },
    { price: '$59 800', label: 'LONGS < 5X', type: 'long', color: '#E25C3F', width: 45 },
]

interface VolPoint {
    t: string
    rv: number | null
    mean: number | null
    upper: number | null
    lower: number | null
}

function formatPct(value: number) {
    return `${value.toFixed(1)}%`
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

        const drawSeries = (
            key: keyof VolPoint,
            color: string,
            width: number,
            dashed: boolean
        ) => {
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

        // Bands first, then mean, then realized vol on top
        drawSeries('upper', 'rgba(226,92,63,0.9)', 1.2, true)
        drawSeries('lower', 'rgba(44,179,123,0.9)', 1.2, true)
        drawSeries('mean', 'rgba(255,255,255,0.55)', 1.2, true)
        drawSeries('rv', '#4C84C4', 1.7, false)

        // Y labels
        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let i = 0; i <= 4; i++) {
            const value = maxV - (span * i) / 4
            const y = padT + (i / 4) * chartH
            ctx.fillText(formatPct(value), padL - 6, y)
        }

        // X labels
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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/btc-forecast')
                if (!res.ok) throw new Error('Failed to load volatility data')
                const data = await res.json()
                if (cancelled) return
                setSeries(data.volatility?.series || [])
                setLatest(data.volatility?.latest || null)
                setSubtitle(data.volatility?.subtitle || '')
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
    const liqCopy = copy.charts.liquidations

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

            {/* Liquidation Zone — no notebook API yet; keep mock UI */}
            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            {liqCopy.eyebrow}
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            {liqCopy.title}
                        </p>
                    </div>
                    {liqCopy.badge && (
                        <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            {liqCopy.badge}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                    {LIQ_ROWS.map((row) => (
                        <div key={row.price} className="flex items-center gap-2 sm:gap-4">
                            <span className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium w-[58px] sm:w-16 flex-shrink-0">
                                {row.price}
                            </span>
                            <div className="flex-1 relative h-5 flex items-center bg-[#FFFFFF0D] min-w-0">
                                <div
                                    className="h-full flex items-center px-1.5 sm:px-2"
                                    style={{ width: `${row.width}%`, backgroundColor: row.color }}
                                >
                                    <span
                                        className={`text-[10px] sm:text-[11px] leading-[13px] font-semibold whitespace-nowrap ${
                                            row.type === 'short' ? 'text-black' : 'text-white'
                                        }`}
                                    >
                                        {row.label}
                                    </span>
                                </div>
                            </div>
                            <span className="text-[#838388] text-[12px] sm:text-[14px] leading-[17px] font-medium flex-shrink-0">
                                $421M
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex items-start flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-8 mt-4">
                    <div>
                        <p className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            Total Shorts At Risk
                        </p>
                        <p className="text-[#2CB37B] text-[14px] sm:text-[16px] leading-[19px] font-semibold mt-1">
                            $5412M (Above Spot)
                        </p>
                    </div>
                    <div>
                        <p className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium">
                            Total Longs At Risk
                        </p>
                        <p className="text-[#E25C3F] text-[14px] sm:text-[16px] leading-[19px] font-semibold mt-1">
                            $4520M (Below Spot)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
