'use client'
import { useRef, useEffect } from 'react'

// ETF bar chart data — alternating positive/negative flows
const ETF_BARS = [
    120, 180, 200, 150, 220, 190, 160, -80, 210, 240, 180, -120,
    200, 170, 190, -90, 220, 200, 180, 160, -100, 210, 190, 170,
    -130, 200, 220, 180, 200, -80, 190, 210, 170, -110, 200, 180,
]

// Return forecast line — gentle upward curve then flat
const FORECAST_LINE = [
    60, 60.5, 61, 61.5, 62, 62.5, 63, 63.5, 64, 64.5, 65, 65.5,
    66, 66.5, 67, 67.2, 67.4, 67.5, 67.6, 67.5,
]
const BAND_UPPER = FORECAST_LINE.map(v => v + 4)
const BAND_LOWER = FORECAST_LINE.map(v => v - 3)

function EtfBarChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const c = canvasRef.current; if (!c) return
        const ctx = c.getContext('2d'); if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 400; const H = c.offsetHeight || 160
        c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)

        const maxV = Math.max(...ETF_BARS.map(Math.abs))
        const midY = H / 2
        const barW = (W / ETF_BARS.length) * 0.6
        const gap = W / ETF_BARS.length

        // Zero line
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke()

        // Y grid lines
        const yLabels = [400, 200, 0, -200, -400]
        yLabels.forEach(v => {
            const y = midY - (v / maxV) * (midY * 0.85)
            ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
        })

        ETF_BARS.forEach((val, i) => {
            const x = i * gap + gap / 2 - barW / 2
            const barH = Math.abs(val / maxV) * midY * 0.85
            const y = val >= 0 ? midY - barH : midY
            ctx.fillStyle = val >= 0 ? 'rgba(136,196,255,0.8)' : 'rgba(136,196,255,0.35)'
            ctx.fillRect(x, y, barW, barH)
        })
    }, [])
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

function ReturnForecastChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const c = canvasRef.current; if (!c) return
        const ctx = c.getContext('2d'); if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 300; const H = c.offsetHeight || 160
        c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)

        const allVals = [...FORECAST_LINE, ...BAND_UPPER, ...BAND_LOWER]
        const minV = Math.min(...allVals) - 2
        const maxV = Math.max(...allVals) + 2
        const toX = (i: number) => (i / (FORECAST_LINE.length - 1)) * W
        const toY = (v: number) => H - ((v - minV) / (maxV - minV)) * H

        // Band fill
        ctx.beginPath()
        BAND_UPPER.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        BAND_LOWER.slice().reverse().forEach((v, i) => ctx.lineTo(toX(BAND_LOWER.length - 1 - i), toY(v)))
        ctx.closePath()
        ctx.fillStyle = 'rgba(136,196,255,0.08)'
        ctx.fill()

            // Band borders
            ;[BAND_UPPER, BAND_LOWER].forEach(line => {
                ctx.beginPath()
                line.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
                ctx.strokeStyle = 'rgba(136,196,255,0.25)'; ctx.lineWidth = 1; ctx.stroke()
            })

        // Main line
        ctx.beginPath()
        FORECAST_LINE.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)))
        ctx.strokeStyle = '#88C4FF'; ctx.lineWidth = 1.5; ctx.stroke()

            // Y grid labels
            ;[60, 67, 70, 74].forEach(v => {
                if (v < minV || v > maxV) return
                const y = toY(v)
                ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
            })
    }, [])
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function InstitutionalFlow() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ETF Flows card */}
            <div className="bg-[#16161F] p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[14px] leading-[17px] mb-2">ETF Flows</p>
                        <p className="text-white text-[18px] leading-[22px] font-medium">
                            BTC Spot ETF Net Flows • 180d
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium">Alpha</span>
                </div>

                {/* Y labels + chart */}
                {/* <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-right flex-shrink-0 py-1" style={{ width: 36 }}>
                        {['400M', '200M', '0M', '-200M', '-400M'].map(l => (
                            <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                        ))}
                    </div>
                    <div className="flex-1" style={{ height: 140 }}>
                        <EtfBarChart />
                    </div>
                </div> */}
                <div className='my-16 text-center'>
                    Chart Is Coming...
                </div>

                <p className="text-[#838388] text-[14px] leading-[20px] font-normal">
                    Cumulative inflows reached <span className="text-white font-semibold">$17190</span> 9M - institutional bid persists through volatility.
                </p>

                {/* Stats row */}
                <div className="mt-4 flex items-center gap-8">
                    {[
                        { label: '5D NET', value: '+$775.5M', pos: true },
                        { label: '30D', value: '+$7855.09M', pos: true },
                        { label: 'Cumulative', value: '$18.2B', pos: true },
                    ].map(s => (
                        <div key={s.label}>
                            <p className="text-white/50 text-[14px] leading-[17px] font-medium">{s.label}</p>
                            <p className={`text-[16px] leading-[19px] font-semibold mt-1 ${s.pos ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>{s.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Return Forecast card */}
            <div className="bg-[#16161F] p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[#838388] text-[14px] leading-[17px] mb-2">Return Forecast</p>
                        <p className="text-white text-[18px] leading-[22px] font-medium">
                            BTC 30d Projected Path • 97% Band
                        </p>
                    </div>
                    <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium">Alpha</span>
                </div>

                {/* Y labels + chart */}
                {/* <div className="flex gap-2 mt-3">
                    <div className="flex flex-col justify-between text-right flex-shrink-0 py-1" style={{ width: 24 }}>
                        {['74k', '70k', '67k', '60k'].map(l => (
                            <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                        ))}
                    </div>
                    <div className="flex-1" style={{ height: 120 }}>
                        <ReturnForecastChart />
                    </div>
                </div> */}
                <div className='my-16 text-center'>
                    Chart Is Coming...
                </div>


                {/* X labels */}
                {/* <div className="flex justify-between mt-1 pl-8">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                        <span key={n} className="text-[#838388] text-[9px] leading-[11px]">{n}</span>
                    ))}
                </div> */}

                <p className="mt-auto text-[#838388] text-[14px] leading-[20px] mt-3">
                    Cumulative inflows reached <span className="text-white font-semibold">$17190 </span> 9M - institutional bid persists through volatility.
                </p>
            </div>
        </div>
    )
}
