'use client'
import { useRef, useEffect } from 'react'

// IV trend — rising line from ~20% to ~65%
const IV_DATA = [
    20, 21, 22, 24, 26, 28, 30, 32, 35, 38, 40, 42,
    40, 41, 43, 44, 45, 44, 43, 45, 47, 50, 52, 55,
    54, 56, 58, 60, 62, 63, 64, 65, 64, 65, 66, 65,
]
const X_LABELS = ['-29', '-27', '-25', '-23', '-21', '-19', '-17', '-15', '-13', '-11', '-9', '-7', '-5', '-3', '-1', '0']
const Y_LABELS = ['80%', '60%', '40%', '20%', '0%']

// Liquidation bars
const LIQ_ROWS = [
    { price: '$68 200', label: 'SHORTS 5 – 10X',  type: 'short', color: '#2CB37B', width: 85 },
    { price: '$66 800', label: 'SHORTS 10 – 25X', type: 'short', color: '#2CB37B', width: 68 },
    { price: '$65 400', label: 'SHORTS 25 – 50X', type: 'short', color: '#2CB37B', width: 55 },
    { price: '$63 100', label: 'LONGS 25 – 50X',  type: 'long',  color: '#E25C3F', width: 75 },
    { price: '$61 500', label: 'LONGS 10 – 25X',  type: 'long',  color: '#E25C3F', width: 60 },
    { price: '$60 200', label: 'LONGS 5 – 10X',   type: 'long',  color: '#E25C3F', width: 80 },
    { price: '$59 800', label: 'LONGS < 5X',       type: 'long',  color: '#E25C3F', width: 45 },
]

function IvChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const c = canvasRef.current; if (!c) return
        const ctx = c.getContext('2d'); if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 400; const H = c.offsetHeight || 180
        c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)
        const padT = 8; const padB = 8
        const minV = 0; const maxV = 80

        const toX = (i: number) => (i / (IV_DATA.length - 1)) * W
        const toY = (v: number) => padT + ((maxV - v) / (maxV - minV)) * (H - padT - padB)

            // Grid lines
            ;[0, 20, 40, 60, 80].forEach(v => {
                const y = toY(v)
                ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
            })

        // 40% dashed reference (red)
        const y40 = toY(40)
        ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(226,92,63,0.5)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(0, y40); ctx.lineTo(W, y40); ctx.stroke()

        // 20% dashed reference (blue)
        const y20 = toY(20)
        ctx.strokeStyle = 'rgba(136,196,255,0.3)'
        ctx.beginPath(); ctx.moveTo(0, y20); ctx.lineTo(W, y20); ctx.stroke()
        ctx.setLineDash([])

        // Gradient fill
        const grad = ctx.createLinearGradient(0, toY(maxV), 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.18)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        IV_DATA.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        ctx.fillStyle = grad; ctx.fill()

        // Line
        ctx.beginPath()
        IV_DATA.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.strokeStyle = '#88C4FF'; ctx.lineWidth = 1.5; ctx.setLineDash([]); ctx.stroke()
    }, [])
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function ForecastVolatility() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* IV Trend chart */}
            <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">Vol Regime</p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            BTC Implied Vol • 600 Trend
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">Alpha</span>
                </div>

                {/* <div className="flex gap-2 mt-3">
                    <div className="flex flex-col justify-between text-right flex-shrink-0 pb-5" style={{ width: 28 }}>
                        {Y_LABELS.map(l => (
                            <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div style={{ height: 160 }}><IvChart /></div>
                        <div className="flex justify-between mt-1">
                            {X_LABELS.map(l => (
                                <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                            ))}
                        </div>
                    </div>
                </div> */}

                <div className='flex items-center justify-center h-full text-center py-16'>
                    Chart Is Coming...
                </div>

                <p className="mt-auto text-[#838388] text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] font-normal">
                    IV at <span className="text-white font-semibold">63.4%</span>, z-score 0.470. Trend falling 7d — favour vd-selling tactical strategies.
                </p>
            </div>

            {/* Liquidation Zone */}
            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mb-2">Liquidations</p>
                        <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                            Crypto Liquidation Zone
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[17px] font-medium">Magnet Zone</span>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                    {LIQ_ROWS.map((row) => (
                        <div key={row.price} className="flex items-center gap-2 sm:gap-4">
                            <span className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium w-[58px] sm:w-16 flex-shrink-0">{row.price}</span>
                            <div className="flex-1 relative h-5 flex items-center bg-[#FFFFFF0D] min-w-0">
                                <div
                                    className="h-full flex items-center px-1.5 sm:px-2"
                                    style={{ width: `${row.width}%`, backgroundColor: row.color }}
                                >
                                    <span className={`text-[10px] sm:text-[11px] leading-[13px] font-semibold whitespace-nowrap ${row.type === 'short' ? 'text-black' : 'text-white'}`}>{row.label}</span>
                                </div>
                            </div>
                            <span className="text-[#838388] text-[12px] sm:text-[14px] leading-[17px] font-medium flex-shrink-0">$421M</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-start flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-8 mt-4">
                    <div>
                        <p className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium">Total Shorts At Risk</p>
                        <p className="text-[#2CB37B] text-[14px] sm:text-[16px] leading-[19px] font-semibold mt-1">$5412M (Above Spot)</p>
                    </div>
                    <div>
                        <p className="text-white/50 text-[12px] sm:text-[14px] leading-[17px] font-medium">Total Longs At Risk</p>
                        <p className="text-[#E25C3F] text-[14px] sm:text-[16px] leading-[19px] font-semibold mt-1">$4520M (Below Spot)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
