'use client'

import { useEffect, useRef } from 'react'

type CommodityGroup = 'softs' | 'energy' | 'grains' | 'metals'

interface CommodityPoint {
    name: string
    /** Approx 20D return (%) for x-axis */
    returnPct: number
    /** 20D annualised volatility (%) for y-axis */
    volPct: number
    group: CommodityGroup
}

const GROUP_COLOR: Record<CommodityGroup, string> = {
    softs: '#C4A0FF',
    energy: '#D4B483',
    grains: '#9AD4A0',
    metals: '#88C4FF',
}

/** Placeholder scatter matching the desk chart layout until a live engine exists */
const COMMODITIES: CommodityPoint[] = [
    { name: 'Coffee', returnPct: 1.2, volPct: 86, group: 'softs' },
    { name: 'Cocoa', returnPct: 0.4, volPct: 78, group: 'softs' },
    { name: 'Heating Oil', returnPct: 6.8, volPct: 59, group: 'energy' },
    { name: 'Brent Crude', returnPct: 5.6, volPct: 55, group: 'energy' },
    { name: 'WTI Crude', returnPct: 4.4, volPct: 52, group: 'energy' },
    { name: 'RBOB Gasoline', returnPct: 2.8, volPct: 42, group: 'energy' },
    { name: 'Silver', returnPct: -0.2, volPct: 40, group: 'metals' },
    { name: 'Wheat', returnPct: 0.6, volPct: 39, group: 'grains' },
    { name: 'Palladium', returnPct: 1.8, volPct: 37, group: 'metals' },
    { name: 'Natural Gas', returnPct: -11.5, volPct: 34, group: 'energy' },
    { name: 'Cotton', returnPct: -1.8, volPct: 32, group: 'softs' },
    { name: 'Platinum', returnPct: 1.0, volPct: 32, group: 'metals' },
    { name: 'Corn', returnPct: -0.6, volPct: 28, group: 'grains' },
    { name: 'Sugar', returnPct: 0.2, volPct: 28, group: 'softs' },
    { name: 'Copper', returnPct: -2.4, volPct: 23, group: 'metals' },
    { name: 'Gold', returnPct: -3.2, volPct: 22, group: 'metals' },
    { name: 'Soybeans', returnPct: -4.0, volPct: 20, group: 'grains' },
]

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

        const minX = -14
        const maxX = 10
        const minY = 15
        const maxY = 95
        const spanX = maxX - minX
        const spanY = maxY - minY

        const toX = (v: number) => padL + ((v - minX) / spanX) * chartW
        const toY = (v: number) => padT + ((maxY - v) / spanY) * chartH

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        for (let y = 20; y <= 90; y += 10) {
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

        // Axis labels
        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let y = 20; y <= 90; y += 10) {
            ctx.fillText(`${y}%`, padL - 6, toY(y))
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

        // Points + labels
        points.forEach((p) => {
            const x = toX(p.returnPct)
            const y = toY(p.volPct)
            const color = GROUP_COLOR[p.group]

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
    return (
        <div className="flex flex-col h-full">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">
                Commodity Risk
            </h2>
            <div className="bg-[#16161F] p-3 sm:p-4 flex-1 flex flex-col min-h-[320px]">
                <p className="text-white text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] font-semibold mb-3">
                    Commodity Risk / Return Map
                </p>
                <div className="flex-1" style={{ minHeight: 280 }}>
                    <CommodityScatterChart points={COMMODITIES} />
                </div>
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
