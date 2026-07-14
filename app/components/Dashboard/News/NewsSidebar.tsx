'use client'
import { useRef, useEffect } from 'react'

// ── Most Read ────────────────────────────────────────────────────────────────
const MOST_READ = [
    { num: '01', title: 'Fed Signals Prolonged Hold as Inflation Pressure Lingers', source: 'Reuters' },
    { num: '02', title: 'Bitcoin Breaches $85K as ETF Inflows Accelerate', source: 'Bloomberg' },
    { num: '03', title: 'Tech Stocks Rally Amid Strong Earnings Reports', source: 'CNBC' },
    { num: '04', title: 'Oil Prices Surge After OPEC+ Cuts Production', source: 'MarketWatch' },
    { num: '05', title: 'US Job Market Remains Resilient Despite Rate Hikes', source: 'The Wall Street Journal' },
]

// ── Index Futures ────────────────────────────────────────────────────────────
const FUTURES = [
    { label: 'Dow Fut', value: '39 585,98', change: '+0.07%', positive: true },
    { label: 'Spx Fut', value: '5 253,17', change: '+0.28%', positive: true },
    { label: 'Nasdaq Fut', value: '12 345,67', change: '+0.45%', positive: true },
    { label: 'Russell 2000', value: '1 800,92', change: '+0.18%', positive: true },
    { label: 'FTSE 100', value: '7 120,50', change: '+0.22%', positive: true },
    { label: 'DAX 30', value: '15 450,80', change: '+0.33%', positive: true },
]

// Simple sparkline
function Sparkline({ positive }: { positive: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const c = canvasRef.current; if (!c) return
        const ctx = c.getContext('2d'); if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 100; const H = c.offsetHeight || 36
        c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)
        const pts = positive
            ? [28, 26, 28, 24, 22, 24, 20, 22, 18, 16, 18, 14, 16, 14, 12, 14, 12, 10]
            : [10, 12, 10, 14, 16, 14, 18, 16, 20, 22, 20, 24, 22, 26, 24, 28, 26, 28]
        const min = Math.min(...pts); const max = Math.max(...pts)
        const toX = (i: number) => (i / (pts.length - 1)) * W
        const toY = (v: number) => H - ((v - min) / (max - min + 1)) * H * 0.8 - H * 0.1
        const color = positive ? '#2CB37B' : '#E25C3F'
        const grad = ctx.createLinearGradient(0, 0, 0, H)
        grad.addColorStop(0, positive ? 'rgba(44,179,123,0.2)' : 'rgba(226,92,63,0.2)')
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        pts.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        ctx.fillStyle = grad; ctx.fill()
        ctx.beginPath()
        pts.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke()
    }, [positive])
    return <canvas ref={canvasRef} style={{ width: '100%', height: 36, display: 'block' }} />
}

export default function NewsSidebar() {
    return (
        <div className="flex flex-col gap-5">
            {/* Bloomberg TV */}
            <div className="bg-[#16161F] p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.66797 11.6667C1.66797 8.524 1.66797 6.95262 2.64428 5.97631C3.62059 5 5.19194 5 8.33464 5H11.668C14.8106 5 16.3821 5 17.3583 5.97631C18.3346 6.95262 18.3346 8.524 18.3346 11.6667C18.3346 14.8093 18.3346 16.3808 17.3583 17.357C16.3821 18.3333 14.8106 18.3333 11.668 18.3333H8.33464C5.19194 18.3333 3.62059 18.3333 2.64428 17.357C1.66797 16.3808 1.66797 14.8093 1.66797 11.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7.5 2.50033L10 5.00033L13.3333 1.66699" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-white text-[16px] leading-[19px] font-semibold">Bloomberg TV</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#E25C3F1A] py-1.5 px-3">
                        <div className="w-1.5 h-1.5 bg-[#E25C3F] rounded-full" />
                        <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">Live</span>
                    </div>
                </div>
                <div className="bg-[#FFFFFF08] overflow-hidden" style={{ height: 200 }}>

                </div>
            </div>

            {/* Today's Most Read */}
            <div className="bg-[#16161F] p-4">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <p className="text-white text-[16px] leading-[19px] font-semibold">Today&apos;s Most Read</p>
                    <span className="text-white/60 text-[12px] leading-[14px]">Next In 0:11</span>
                </div>

                <div className="flex flex-col gap-4">
                    {MOST_READ.map((item) => (
                        <div key={item.num} className="flex gap-3 cursor-pointer group">
                            <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium flex-shrink-0 mt-0.5">{item.num}</span>
                            <div>
                                <p className="text-white text-[16px] leading-[21px] font-medium">{item.title}</p>
                                <p className="text-white/60 text-[14px] leading-[17px] mt-1">{item.source}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Index Futures */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-white text-[16px] leading-[19px] font-semibold">Index Futures</p>
                    <div className="flex items-center gap-1 bg-[#E25C3F1A] rounded-full px-3 py-1.5">
                        <div className="w-2 h-2 bg-[#E25C3F] rounded-full" />
                        <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">Live</span>
                    </div>
                </div>
                <div className="">
                    <div className="grid grid-cols-2 gap-3">
                        {FUTURES.map((f) => (
                            <div key={f.label} className="bg-[#16161F] p-3 pb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[#88C4FF] text-[14px] leading-[17px] font-semibold">{f.label}</span>
                                    <span className={`text-[14px] leading-[17px] font-normal ${f.positive ? 'text-[#23B672]' : 'text-[#E25C3F]'}`}>
                                        {f.change}
                                    </span>
                                </div>

                                <p className="text-white text-[20px] leading-[26px] font-semibold mb-[35px]">{f.value}</p>

                                <svg width="245" height="44" viewBox="0 0 245 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_584_3218)">
                                        <path d="M238.2 22.6343L217.853 34.6058C215.837 35.7917 213.269 35.422 211.67 33.7158L186.272 6.62126C184.643 4.88398 182.016 4.53617 179.991 5.78993L163.433 16.0448C161.855 17.0223 159.865 17.0449 158.265 16.1035L139.741 5.20486C138.106 4.24263 136.067 4.28907 134.477 5.32476L92.1151 32.9192C90.5056 33.9677 88.4377 34.0013 86.7949 33.0059L41.424 5.51317C39.4795 4.33491 37.0839 4.17442 34.9996 5.08279L6.2002 17.6343" stroke="#23B672" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_584_3218" x="0" y="0" width="244.454" height="43.7964" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="2" />
                                            <feGaussianBlur stdDeviation="3" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0 0.541176 0 0 0 1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_584_3218" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_584_3218" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
