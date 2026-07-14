'use client'
import { useRef, useEffect } from 'react'

// GRI index data — gradual rise from ~75 to ~250 with spikes
const GRI_DATA = [
    75, 78, 80, 82, 85, 88, 90, 95, 100, 105, 110, 115,
    120, 118, 122, 125, 130, 135, 140, 145, 148, 150, 152,
    155, 160, 165, 168, 170, 172, 175, 180, 185, 188, 190,
    195, 200, 205, 210, 215, 220, 225, 228, 230, 232, 235,
    238, 240, 242, 244, 246, 248, 250, 248, 246, 248, 250,
    252, 250, 248, 246, 248, 250, 252, 248, 246, 248, 252,
]
const X_LABELS = ['Dec 23', 'Feb 23', 'Apr 23', 'Jun 23', 'Aug 23', 'Oct 23']
const Y_LABELS = ['300', '225', '150', '75', '0']

function GriChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const c = canvasRef.current; if (!c) return
        const ctx = c.getContext('2d'); if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 500; const H = c.offsetHeight || 200
        c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)
        const padT = 8; const padB = 8
        const minV = 0; const maxV = 300
        const toX = (i: number) => (i / (GRI_DATA.length - 1)) * W
        const toY = (v: number) => padT + ((maxV - v) / (maxV - minV)) * (H - padT - padB)

            // Grid lines
            ;[0, 75, 150, 225, 300].forEach(v => {
                const y = toY(v)
                ctx.strokeStyle = v === 150 ? 'rgba(226,92,63,0.35)' : v === 75 ? 'rgba(136,196,255,0.2)' : 'rgba(255,255,255,0.06)'
                ctx.lineWidth = 1
                ctx.setLineDash(v === 150 || v === 75 ? [4, 4] : [])
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
            })
        ctx.setLineDash([])

        // Gradient fill
        const grad = ctx.createLinearGradient(0, toY(300), 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.2)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        GRI_DATA.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        ctx.fillStyle = grad; ctx.fill()

        // Line
        ctx.beginPath()
        GRI_DATA.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.strokeStyle = '#88C4FF'; ctx.lineWidth = 1.5; ctx.stroke()
    }, [])
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function RiskTensionMonitoring() {
    return (
        <div className="px-4 lg:px-6 mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-4">Risk Tension Monitoring</h2>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_524px] gap-4">
                {/* GRI Chart */}
                <div className="bg-[#16161F] p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-white text-[18px] leading-[22px] font-medium">
                                Geopolitical Risk Index • 180d
                            </p>
                            <p className="text-[#838388] text-[14px] leading-[17px] font-normal mt-2">
                                Global baseline methodology • mean-revied risk premium
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-white text-[22px] leading-[31px] font-semibold mb-1">25.7</p>
                            <p className="text-[#5CEB8A] text-[14px] leading-[17px] font-normal">+1.8 Today</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-full">
                        {/* <div className="flex flex-col justify-between text-right flex-shrink-0 pb-5" style={{ width: 28 }}>
                            {Y_LABELS.map(l => (
                                <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                            ))}
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div style={{ height: 180 }}><GriChart /></div>
                            <div className="flex justify-between mt-1">
                                {X_LABELS.map(l => (
                                    <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                                ))}
                            </div>
                        </div> */}
                        Chart Is Coming...
                    </div>
                </div>

                {/* Bloomberg TV */}
                <div className="bg-[#16161F] p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.66797 11.6667C1.66797 8.524 1.66797 6.95262 2.64428 5.97631C3.62059 5 5.19194 5 8.33464 5H11.668C14.8106 5 16.3821 5 17.3583 5.97631C18.3346 6.95262 18.3346 8.524 18.3346 11.6667C18.3346 14.8093 18.3346 16.3808 17.3583 17.357C16.3821 18.3333 14.8106 18.3333 11.668 18.3333H8.33464C5.19194 18.3333 3.62059 18.3333 2.64428 17.357C1.66797 16.3808 1.66797 14.8093 1.66797 11.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M7.5 2.50033L10 5.00033L13.3333 1.66699" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-white text-[16px] leading-[19px] font-semibold">Bloomberg TV</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-[#E25C3F] rounded-full animate-pulse" />
                            <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">Live</span>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#FFFFFF08] overflow-hidden" style={{ minHeight: 250 }}>
                        {/* <iframe
                            src="https://www.bloomberg.com/media-manifest/streams/us.m3u8"
                            className="w-full h-full"
                            style={{ minHeight: 180, border: 'none' }}
                            allow="autoplay; fullscreen"
                            title="Bloomberg TV"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
