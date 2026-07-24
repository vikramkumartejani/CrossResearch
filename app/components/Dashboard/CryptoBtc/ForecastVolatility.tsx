'use client'

import { useEffect, useRef, useState } from 'react'

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

function VolChart({ series }: { series: VolPoint[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || series.length < 2) return
        const ctx = c.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 400
        const H = c.offsetHeight || 180
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const values = series.map((p) => p.rv ?? 0)
        const minV = 0
        const maxV = Math.max(...values, 20)
        const padT = 8
        const padB = 8
        const toX = (i: number) => (i / (series.length - 1)) * W
        const toY = (v: number) => padT + ((maxV - v) / (maxV - minV || 1)) * (H - padT - padB)

        ;[0, 0.25, 0.5, 0.75, 1].forEach((frac) => {
            const y = padT + frac * (H - padT - padB)
            ctx.strokeStyle = 'rgba(255,255,255,0.07)'
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(W, y)
            ctx.stroke()
        })

        const grad = ctx.createLinearGradient(0, toY(maxV), 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.18)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        values.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        values.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.strokeStyle = '#88C4FF'
        ctx.lineWidth = 1.5
        ctx.stroke()
    }, [series])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function ForecastVolatility() {
    const [series, setSeries] = useState<VolPoint[]>([])
    const [latest, setLatest] = useState<{
        rv_pct: number | null
        z_score: number | null
        regime: string
    } | null>(null)
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            Vol Regime
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            BTC Realized Vol • 4H Regime
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">Alpha</span>
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
                    <div className="mt-3" style={{ height: 160 }}>
                        <VolChart series={series} />
                    </div>
                )}

                <p className="mt-auto text-[#838388] text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] font-normal">
                    RV at{' '}
                    <span className="text-white font-semibold">
                        {latest?.rv_pct != null ? `${latest.rv_pct.toFixed(1)}%` : '—'}
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
                            Liquidations
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            Crypto Liquidation Zone
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">Magnet Zone</span>
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
