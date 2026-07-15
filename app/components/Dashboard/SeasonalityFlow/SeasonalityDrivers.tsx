'use client'
import { useRef, useEffect } from 'react'

// ── Returns by Regime chart ───────────────────────────────────────────────────
const REGIMES = [
    { label: 'Expansion', shortLabel: 'Expa', sharpe: '0.48', hit: '68.6%', n: 29, barH: 0.82 },
    { label: 'Stagflation', shortLabel: 'Stag', sharpe: '0.46', hit: '70.8%', n: 41, barH: 0.78 },
    { label: 'Recession', shortLabel: 'Rece', sharpe: '2.05', hit: '98.8%', n: 77, barH: 0.95 },
    { label: 'Recovery', shortLabel: 'Reco', sharpe: '2.17', hit: '85.2%', n: 85, barH: 0.98 },
    { label: 'Reflation', shortLabel: 'Refl', sharpe: '0.66', hit: '85.2%', n: 74, barH: 0.88 },
]

// Y-axis labels: 6%, 4%, 2%, 0%, -2%
const Y_LABELS = ['6%', '4%', '2%', '0%', '-2%']

function ReturnsChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = canvas.offsetWidth || 300
        const H = canvas.offsetHeight || 120
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.scale(dpr, dpr)

        const padL = 8
        const padR = 8
        const padT = 8
        const padB = 8
        const chartH = H - padT - padB

        // Grid lines (5 lines for 6%,4%,2%,0%,-2%)
        const gridCount = 5
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 1
        for (let i = 0; i < gridCount; i++) {
            const y = padT + (i / (gridCount - 1)) * chartH
            ctx.beginPath()
            ctx.moveTo(padL, y)
            ctx.lineTo(W - padR, y)
            ctx.stroke()
        }

        // Bars
        const barW = (W - padL - padR) / (REGIMES.length * 2)
        REGIMES.forEach((regime, i) => {
            const x = padL + i * (W - padL - padR) / REGIMES.length + barW / 2
            const maxBarH = chartH * 0.75
            const bH = maxBarH * regime.barH
            const y = padT + chartH * 0.15

            // Gradient bar
            const grad = ctx.createLinearGradient(0, y, 0, y + bH)
            grad.addColorStop(0, 'rgba(136,196,255,0.5)')
            grad.addColorStop(1, 'rgba(136,196,255,0.05)')
            ctx.fillStyle = grad
            ctx.fillRect(x - barW / 2, y, barW, bH)
        })
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ── Volatility Skew chart ─────────────────────────────────────────────────────
const SKEW_POINTS = [
    { x: -25, y: 24 },
    { x: -15, y: 18 },
    { x: -10, y: 12 },
    { x: -5, y: 6 },
    { x: 25, y: 0 },
]

const ATM_TENORS = [
    { label: '1W', atm: '16.4%', rr: '0.30', rrPos: true },
    { label: '1M', atm: '17.3%', rr: '0.64', rrPos: true },
    { label: '3M', atm: '9.9%', rr: '1.12', rrPos: false },
    { label: '6M', atm: '10.6%', rr: '1.12', rrPos: false },
    { label: '1Y', atm: '19.7%', rr: '1.69', rrPos: false },
]

function SkewChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const W = canvas.offsetWidth || 300
        const H = canvas.offsetHeight || 120
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.scale(dpr, dpr)

        const padL = 12
        const padR = 12
        const padT = 12
        const padB = 8

        if (!SKEW_POINTS.length) return

        const minX = -25, maxX = 25
        const minY = 0, maxY = 24

        const toCanvasX = (x: number) => padL + ((x - minX) / (maxX - minX)) * (W - padL - padR)
        const toCanvasY = (y: number) => padT + ((maxY - y) / (maxY - minY)) * (H - padT - padB)

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 1
        const yGrids = [0, 6, 12, 18, 24]
        yGrids.forEach((yVal) => {
            const cy = toCanvasY(yVal)
            ctx.beginPath()
            ctx.moveTo(padL, cy)
            ctx.lineTo(W - padR, cy)
            ctx.stroke()
        })

        // Dashed skew line
        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'
        ctx.lineWidth = 1.5
        SKEW_POINTS.forEach((pt, i) => {
            const cx = toCanvasX(pt.x)
            const cy = toCanvasY(pt.y)
            if (i === 0) ctx.moveTo(cx, cy)
            else ctx.lineTo(cx, cy)
        })
        ctx.stroke()
        ctx.setLineDash([])

        // Dots at first and last points
        const dotIndices = [0, SKEW_POINTS.length - 1]
        for (const idx of dotIndices) {
            const pt = SKEW_POINTS[idx]
            if (!pt) continue
            const cx = toCanvasX(pt.x)
            const cy = toCanvasY(pt.y)
            ctx.beginPath()
            ctx.arc(cx, cy, 5, 0, Math.PI * 2)
            ctx.fillStyle = '#88C4FF'
            ctx.fill()
        }
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SeasonalityDrivers() {
    return (
        <div>
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Seasonality Drivers</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">

                {/* Returns by Regime */}
                <div className="bg-[#16161F] p-3 sm:p-4 min-h-60">
                    <p className="text-white text-[16px] leading-[19px] font-medium mb-2">EURUSD Returns by Regime</p>
                    <p className="text-white/50 text-[12px] leading-[14px] mb-4">
                        Average monthly return conditional on the macro regime (10-year sample).
                    </p>

                    {/* <div className="flex gap-2">
                        <div className="flex flex-col justify-between text-right flex-shrink-0 pb-6" style={{ width: 24 }}>
                            {Y_LABELS.map((l) => (
                                <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                            ))}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div style={{ height: 120 }}>
                                <ReturnsChart />
                            </div>
                            <div className="flex justify-around mt-1">
                                {REGIMES.map((r) => (
                                    <span key={r.label} className="text-[#838388] text-[9px] leading-[11px] text-center">{r.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around mt-4 pt-3 border-t border-[#FFFFFF08]">
                        {REGIMES.map((r) => (
                            <div key={r.label} className="flex flex-col items-center gap-0.5">
                                <span className="text-white text-[11px] leading-[14px] font-semibold">Sh {r.sharpe}</span>
                                <span className="text-[#838388] text-[9px] leading-[11px]">{r.hit} hit</span>
                                <span className="text-[#838388] text-[9px] leading-[11px]">n={r.n}</span>
                            </div>
                        ))}
                    </div> */}
                </div>

                {/* Volatility Skew */}
                <div className="bg-[#16161F] p-3 sm:p-4">
                    <p className="text-white text-[16px] leading-[19px] font-medium mb-2">EURUSD Volatility Skew</p>
                    <p className="text-white/50 text-[12px] leading-[14px] mb-4">
                        Implied volatility across moneyness for 5 tenors. Negative 25LRR = put richer (skew bearish).
                    </p>

                    {/* <div className="flex gap-2">
                        <div className="flex flex-col justify-between text-right flex-shrink-0 pb-6" style={{ width: 24 }}>
                            {['24%', '18%', '12%', '6%', '0%'].map((l) => (
                                <span key={l} className="text-[#838388] text-[9px] leading-[11px]">{l}</span>
                            ))}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div style={{ height: 120 }}>
                                <SkewChart />
                            </div>
                            <div className="flex justify-between mt-1">
                                {[-25, -15, -10, -5, 25].map((v) => (
                                    <span key={v} className="text-[#838388] text-[9px] leading-[11px]">{v}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around mt-4 pt-3 border-t border-[#FFFFFF08]">
                        {ATM_TENORS.map((t) => (
                            <div key={t.label} className="flex flex-col items-center gap-0.5">
                                <span className="text-[#838388] text-[9px] leading-[11px] font-semibold">{t.label}</span>
                                <span className="text-white text-[11px] leading-[14px] font-semibold">ATM {t.atm}</span>
                                <span className={`text-[9px] leading-[11px] font-medium ${t.rrPos ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                    RR {t.rr}
                                </span>
                            </div>
                        ))}
                    </div> */}
                </div>

            </div>
        </div>
    )
}
