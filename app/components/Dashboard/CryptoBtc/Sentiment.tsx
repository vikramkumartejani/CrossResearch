'use client'
import { useRef, useEffect } from 'react'

// Fear & Greed index line — oscillating around 40-65 range
const FG_DATA = [
    45, 48, 50, 46, 44, 47, 52, 55, 53, 50, 48, 52,
    55, 57, 60, 58, 56, 54, 57, 60, 62, 61, 59, 58,
    60, 62, 63, 62, 61, 60, 62, 63, 62, 60, 58, 57,
    59, 61, 62, 63, 62, 61, 60, 62, 63, 62, 61, 62,
]
const X_LABELS = ['-56', '-50', '-44', '-38', '-32', '-26', '-20', '-14', '-08', '-02', '-0']

function FearGreedChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const c = canvasRef.current; if (!c) return
        const ctx = c.getContext('2d'); if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 600; const H = c.offsetHeight || 140
        c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)

        const minV = 0; const maxV = 100
        const padT = 8; const padB = 8
        const toX = (i: number) => (i / (FG_DATA.length - 1)) * W
        const toY = (v: number) => padT + ((maxV - v) / (maxV - minV)) * (H - padT - padB)

            // Grid lines at 0, 25, 50, 75, 100
            ;[0, 25, 50, 75, 100].forEach(v => {
                const y = toY(v)
                ctx.strokeStyle = v === 25 ? 'rgba(226,92,63,0.3)' : v === 75 ? 'rgba(44,179,123,0.3)' : 'rgba(255,255,255,0.07)'
                ctx.lineWidth = 1
                ctx.setLineDash(v === 25 || v === 75 ? [4, 4] : [])
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
            })
        ctx.setLineDash([])

        // Gradient fill
        const grad = ctx.createLinearGradient(0, toY(100), 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.12)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        FG_DATA.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        ctx.fillStyle = grad; ctx.fill()

        // Line
        ctx.beginPath()
        FG_DATA.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.strokeStyle = '#88C4FF'; ctx.lineWidth = 1.5; ctx.stroke()
    }, [])
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function Sentiment() {
    return (
        <div>
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-4">Sentiment</h2>

            <div className="bg-[#16161F] p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[14px] leading-[17px] mb-2">Sentiment</p>
                        <p className="text-white text-[18px] leading-[22px] font-medium">
                            BTC Fear & Greed Index
                        </p>
                    </div>
                    <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">-2 7D</span>
                </div>

                {/* <div className="flex gap-4">
                    <div className="flex-shrink-0 flex flex-col justify-center items-center w-16">
                        <p className="text-[#2CB37B] text-[40px] leading-none font-bold">62</p>
                        <p className="text-[#2CB37B] text-[11px] leading-[14px] mt-1">Greed</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex gap-2">
                            <div className="flex flex-col justify-between text-right flex-shrink-0 pb-5" style={{ width: 24 }}>
                                {['100', '75', '50', '25', '0'].map(l => (
                                    <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                                ))}
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div style={{ height: 120 }}><FearGreedChart /></div>
                                <div className="flex justify-between mt-1">
                                    {X_LABELS.map(l => (
                                        <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                 <div className='my-16 text-center'>
                    Chart Is Coming...
                </div>

                <p className="text-[#838388] text-[14px] leading-[20px] font-normal mt-4">
                    In-house composite of funding rate, social momentum, dominance, options skew and ETF velocity. Extreme readings (&lt;25 or &gt;75) revert 78% of the time within 14 days.
                </p>
            </div>
        </div>
    )
}
