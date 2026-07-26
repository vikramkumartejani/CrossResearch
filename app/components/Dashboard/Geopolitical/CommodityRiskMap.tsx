'use client'

import { useEffect, useRef, useState } from 'react'

type CommodityGroup = 'softs' | 'energy' | 'grains' | 'metals'

interface CommodityPoint {
    name: string
    returnPct: number
    volPct: number
    group: CommodityGroup
}

const GROUP_COLOR: Record<CommodityGroup, string> = {
    softs: '#C4A0FF',
    energy: '#D4B483',
    grains: '#9AD4A0',
    metals: '#88C4FF',
}

function CommodityScatterChart({ points }: { points: CommodityPoint[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || points.length === 0) return
        const ctx = c.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 520
        const H = c.offsetHeight || 320
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const padL = 44
        const padR = 16
        const padT = 12
        const padB = 28
        const chartW = W - padL - padR
        const chartH = H - padT - padB

        const xs = points.map((p) => p.returnPct)
        const ys = points.map((p) => p.volPct)
        const minX = Math.min(...xs)
        const maxX = Math.max(...xs)
        const minY = Math.min(...ys)
        const maxY = Math.max(...ys)
        const padX = Math.max((maxX - minX) * 0.12, 1)
        const padY = Math.max((maxY - minY) * 0.12, 2)
        const x0 = minX - padX
        const x1 = maxX + padX
        const y0 = Math.max(0, minY - padY)
        const y1 = maxY + padY
        const spanX = x1 - x0 || 1
        const spanY = y1 - y0 || 1

        const toX = (v: number) => padL + ((v - x0) / spanX) * chartW
        const toY = (v: number) => padT + ((y1 - v) / spanY) * chartH

        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        for (let i = 0; i <= 5; i++) {
            const y = y0 + (spanY * i) / 5
            const py = toY(y)
            ctx.beginPath()
            ctx.moveTo(padL, py)
            ctx.lineTo(padL + chartW, py)
            ctx.stroke()
        }
        for (let i = 0; i <= 5; i++) {
            const x = padL + (i / 5) * chartW
            ctx.beginPath()
            ctx.moveTo(x, padT)
            ctx.lineTo(x, padT + chartH)
            ctx.stroke()
        }

        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let i = 0; i <= 5; i++) {
            const y = y0 + (spanY * i) / 5
            ctx.fillText(`${Math.round(y)}%`, padL - 6, toY(y))
        }

        ctx.save()
        ctx.translate(12, padT + chartH / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.font = '10px sans-serif'
        ctx.fillText('20D annualised volatility', 0, 0)
        ctx.restore()

        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.fillText('1M return', padL + chartW / 2, padT + chartH + 10)

        points.forEach((p) => {
            const x = toX(p.returnPct)
            const y = toY(p.volPct)
            const color = GROUP_COLOR[p.group] || '#88C4FF'

            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.fill()

            ctx.fillStyle = 'rgba(255,255,255,0.85)'
            ctx.font = '10px sans-serif'
            ctx.textAlign = 'left'
            ctx.textBaseline = 'bottom'
            ctx.fillText(p.name, x + 6, y - 2)
        })
    }, [points])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function CommodityRiskMap() {
    const [points, setPoints] = useState<CommodityPoint[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/commodity-risk-map')
                if (!res.ok) throw new Error('Failed to load commodity risk map')
                const data = await res.json()
                if (cancelled) return

                const mapped: CommodityPoint[] = (data.commodity_risk_map?.points || [])
                    .map((p: any) => {
                        const group = String(p.group || 'metals').toLowerCase() as CommodityGroup
                        return {
                            name: String(p.name || ''),
                            returnPct: Number(p.return_pct),
                            volPct: Number(p.vol_pct),
                            group: (['softs', 'energy', 'grains', 'metals'].includes(group)
                                ? group
                                : 'metals') as CommodityGroup,
                        }
                    })
                    .filter(
                        (p: CommodityPoint) =>
                            p.name && Number.isFinite(p.returnPct) && Number.isFinite(p.volPct)
                    )

                setPoints(mapped)
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
        <div className="flex flex-col h-full">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Commodity Risk</h2>
            <div className="bg-[#16161F] p-3 sm:p-4 flex-1 flex flex-col min-h-[320px]">
                <p className="text-white text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] font-semibold mb-3">
                    Commodity Risk / Return Map
                </p>

                {loading && <div className="flex-1 flex items-center justify-center text-[#838388] text-[12px]">Loading commodities...</div>}
                {error && !loading && (
                    <div className="flex-1 flex items-center justify-center text-[#E25C3F] text-[12px]">{error}</div>
                )}
                {!loading && !error && points.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-[#838388] text-[12px]">
                        No commodity data available.
                    </div>
                )}
                {!loading && !error && points.length > 0 && (
                    <div className="flex-1" style={{ minHeight: 280 }}>
                        <CommodityScatterChart points={points} />
                    </div>
                )}

                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[10px] text-[#838388]">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#C4A0FF] inline-block" /> Softs
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#D4B483] inline-block" /> Energy
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#9AD4A0] inline-block" /> Grains
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#88C4FF] inline-block" /> Metals
                    </span>
                </div>
            </div>
        </div>
    )
}
