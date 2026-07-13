'use client'
import { useRef, useEffect } from 'react'

// Simulated scatter / constellation data — dots at various x/y positions with varying sizes
const CONSTELLATION_POINTS = [
    { x: 0.08, y: 0.35, r: 3.5, color: '#88C4FF' },
    { x: 0.14, y: 0.55, r: 5, color: '#88C4FF' },
    { x: 0.20, y: 0.42, r: 4, color: '#88C4FF' },
    { x: 0.28, y: 0.60, r: 6, color: '#5BA4CF' },
    { x: 0.35, y: 0.38, r: 3, color: '#88C4FF' },
    { x: 0.42, y: 0.70, r: 7, color: '#88C4FF' },
    { x: 0.50, y: 0.45, r: 5, color: '#4F91C3' },
    { x: 0.57, y: 0.55, r: 8, color: '#88C4FF' },
    { x: 0.63, y: 0.40, r: 4, color: '#88C4FF' },
    { x: 0.70, y: 0.65, r: 6, color: '#5BA4CF' },
    { x: 0.77, y: 0.35, r: 3, color: '#88C4FF' },
    { x: 0.83, y: 0.58, r: 5, color: '#88C4FF' },
    { x: 0.90, y: 0.48, r: 4, color: '#4F91C3' },
    { x: 0.95, y: 0.62, r: 7, color: '#88C4FF' },
]

// Lines connecting nearby points
const CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
    [3, 6], [7, 10],
]

const Y_LABELS = ['200k', '100k', '50k', '0k']
const X_LABELS = ['-48', '-36', '-24', '-12']

function ConstellationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const W = canvas.offsetWidth
        const H = canvas.offsetHeight
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.scale(dpr, dpr)

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 1
        for (let i = 1; i < 4; i++) {
            const y = (H / 4) * i
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(W, y)
            ctx.stroke()
        }

        // Connection lines
        ctx.strokeStyle = 'rgba(136,196,255,0.25)'
        ctx.lineWidth = 0.8
        CONNECTIONS.forEach(([a, b]) => {
            const pa = CONSTELLATION_POINTS[a]
            const pb = CONSTELLATION_POINTS[b]
            ctx.beginPath()
            ctx.moveTo(pa.x * W, pa.y * H)
            ctx.lineTo(pb.x * W, pb.y * H)
            ctx.stroke()
        })

        // Dots with glow
        CONSTELLATION_POINTS.forEach((pt) => {
            const cx = pt.x * W
            const cy = pt.y * H

            // Glow
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, pt.r * 3)
            grd.addColorStop(0, 'rgba(136,196,255,0.3)')
            grd.addColorStop(1, 'rgba(136,196,255,0)')
            ctx.beginPath()
            ctx.arc(cx, cy, pt.r * 3, 0, Math.PI * 2)
            ctx.fillStyle = grd
            ctx.fill()

            // Dot
            ctx.beginPath()
            ctx.arc(cx, cy, pt.r, 0, Math.PI * 2)
            ctx.fillStyle = pt.color
            ctx.fill()
        })
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function ConvictionConstellation() {
    return (
        <div className="bg-[#16161F] p-4 flex flex-col">
             {/* Tag */}
            <p className="text-[#838388] text-[12px] leading-[17px] font-normal mb-2">03 / Topology</p>

            {/* Title */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-2">Conviction Constellation</h3>

            {/* Description */}
            <p className="text-[#838388] text-[12px] leading-[17px] mb-4">
                Every active market mapped by velocity and liquidity, with dot size revealing conviction across the ecosystem.
            </p>

            {/* Y-axis labels + chart */}
            <div className="flex gap-2 flex-1 min-h-0">
                {/* <div className="flex flex-col justify-between text-right flex-shrink-0" style={{ width: 32 }}>
                    {Y_LABELS.map((v) => (
                        <span key={v} className="text-[#838388] text-[9px] leading-[11px]">{v}</span>
                    ))}
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex-1" style={{ height: 90 }}>
                        <ConstellationCanvas />
                    </div>
                    <div className="flex justify-between mt-1">
                        {X_LABELS.map((l) => (
                            <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Footer */}
                <span className="text-[#838388] text-[12px] leading-[14px] font-normal text-center">Velocity (2% 24h)</span>
        </div>
    )
}
