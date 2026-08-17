'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoBtcCopy } from './cryptoBtcCopy'
import ChartLoader from '../shared/ChartLoader'

interface FgPoint {
    t: string
    index: number | null
    mean_20d: number | null
}

function FearGreedChart({ series }: { series: number[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || series.length < 2) return
        const ctx = c.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 600
        const H = c.offsetHeight || 140
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const minV = 0
        const maxV = 100
        const padT = 8
        const padB = 8
        const toX = (i: number) => (i / (series.length - 1)) * W
        const toY = (v: number) => padT + ((maxV - v) / (maxV - minV)) * (H - padT - padB)

        ;[0, 25, 50, 75, 100].forEach((v) => {
            const y = toY(v)
            ctx.strokeStyle =
                v === 25 ? 'rgba(226,92,63,0.3)' : v === 75 ? 'rgba(44,179,123,0.3)' : 'rgba(255,255,255,0.07)'
            ctx.lineWidth = 1
            ctx.setLineDash(v === 25 || v === 75 ? [4, 4] : [])
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(W, y)
            ctx.stroke()
        })
        ctx.setLineDash([])

        const grad = ctx.createLinearGradient(0, toY(100), 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.12)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        series.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        series.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.strokeStyle = '#88C4FF'
        ctx.lineWidth = 1.5
        ctx.stroke()
    }, [series])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function Sentiment() {
    const copy = useCryptoBtcCopy()
    const [series, setSeries] = useState<number[]>([])
    const [latest, setLatest] = useState<{
        index: number | null
        regime: string
        change_7d: number | null
    } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/btc-fear-greed')
                if (!res.ok) throw new Error('Failed to load fear & greed')
                const data = await res.json()
                if (cancelled) return

                const points: FgPoint[] = data.series || []
                setSeries(points.map((p) => p.index ?? 50))
                setLatest({
                    index: data.latest?.index ?? null,
                    regime: data.latest?.regime ?? '-',
                    change_7d: data.latest?.change_7d ?? null,
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

    const idx = latest?.index
    const color =
        idx == null ? 'text-white' : idx >= 55 ? 'text-[#2CB37B]' : idx <= 45 ? 'text-[#E25C3F]' : 'text-white'
    const change7 = latest?.change_7d
    const changeLabel =
        change7 == null || !Number.isFinite(change7)
            ? '-'
            : `${change7 >= 0 ? '+' : ''}${change7.toFixed(0)} 7D`

    return (
        <div>
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">
                {copy.sections.sentiment}
            </h2>

            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">
                            {copy.charts.fear_greed.eyebrow}
                        </p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            {copy.charts.fear_greed.title}
                        </p>
                    </div>
                    <span
                        className={`text-[12px] sm:text-[14px] leading-[17px] font-medium ${
                            (change7 ?? 0) >= 0 ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                        }`}
                    >
                        {changeLabel}
                    </span>
                </div>

                {loading && <ChartLoader />}
                {error && !loading && <div className="my-16 text-center text-[#E25C3F] text-[12px]">{error}</div>}

                {!loading && !error && (
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 flex flex-col justify-center items-center w-16">
                            <p className={`${color} text-[40px] leading-none font-bold`}>
                                {idx != null ? idx.toFixed(0) : '-'}
                            </p>
                            <p className={`${color} text-[11px] leading-[14px] mt-1`}>{latest?.regime || '-'}</p>
                        </div>
                        <div className="flex-1" style={{ height: 120 }}>
                            {series.length > 1 ? <FearGreedChart series={series} /> : null}
                        </div>
                    </div>
                )}

                <p className="text-[#838388] text-[12px] sm:text-[14px] leading-4 sm:leading-[20px] font-normal mt-4">
                    In-house composite of trend, breadth, realized vol, drawdown, funding/premium, options vol and
                    volume. Extreme readings (&lt;25 or &gt;75) historically mean-revert.
                </p>
            </div>
        </div>
    )
}
