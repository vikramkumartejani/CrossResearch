'use client'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import * as FlagComponents from 'country-flag-icons/react/3x2'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

type Period = '1M' | '1D' | '1W' | '1Y' | 'YTD'

interface CurrencyPair {
    symbol: string
    base: string
    quote: string
    baseName: string
    quoteName: string
    baseFlag: string
    quoteFlag: string
    price: string
    change: string
    changePositive: boolean
    prevClose: string
    openPrice: string
    dayHigh: string
    dayLow: string
}

export const CURRENCY_PAIRS: CurrencyPair[] = [
    { symbol: 'EURUSD', base: 'EUR', quote: 'USD', baseName: 'Euro', quoteName: 'U.S. Dollar', baseFlag: 'EU', quoteFlag: 'US', price: '1.05195', change: '-0.00185 (-0.42%)', changePositive: false, prevClose: '1.05214', openPrice: '1.05524', dayHigh: '1.05600', dayLow: '1.04620' },
    { symbol: 'GBPUSD', base: 'GBP', quote: 'USD', baseName: 'British Pound', quoteName: 'U.S. Dollar', baseFlag: 'GB', quoteFlag: 'US', price: '1.27340', change: '+0.00210 (+0.17%)', changePositive: true, prevClose: '1.27130', openPrice: '1.27180', dayHigh: '1.27560', dayLow: '1.27020' },
    { symbol: 'USDJPY', base: 'USD', quote: 'JPY', baseName: 'U.S. Dollar', quoteName: 'Japanese Yen', baseFlag: 'US', quoteFlag: 'JP', price: '149.820', change: '+0.350 (+0.23%)', changePositive: true, prevClose: '149.470', openPrice: '149.510', dayHigh: '150.100', dayLow: '149.300' },
    { symbol: 'XAUUSD', base: 'XAU', quote: 'USD', baseName: 'Gold', quoteName: 'U.S. Dollar', baseFlag: 'XAU', quoteFlag: 'US', price: '2341.50', change: '+12.30 (+0.53%)', changePositive: true, prevClose: '2329.20', openPrice: '2330.00', dayHigh: '2348.00', dayLow: '2325.50' },
    { symbol: 'XAGUSD', base: 'XAG', quote: 'USD', baseName: 'Silver', quoteName: 'U.S. Dollar', baseFlag: 'XAG', quoteFlag: 'US', price: '27.420', change: '+0.180 (+0.66%)', changePositive: true, prevClose: '27.240', openPrice: '27.260', dayHigh: '27.580', dayLow: '27.180' },
    { symbol: 'USOIL', base: 'USO', quote: 'USD', baseName: 'US Crude Oil', quoteName: 'U.S. Dollar', baseFlag: 'USO', quoteFlag: 'US', price: '78.340', change: '-0.560 (-0.71%)', changePositive: false, prevClose: '78.900', openPrice: '78.800', dayHigh: '79.200', dayLow: '78.100' },
    { symbol: 'NAS100', base: 'NAS', quote: 'USD', baseName: 'Nasdaq 100', quoteName: 'U.S. Dollar', baseFlag: 'NAS', quoteFlag: 'US', price: '17842.0', change: '+134.5 (+0.76%)', changePositive: true, prevClose: '17707.5', openPrice: '17720.0', dayHigh: '17890.0', dayLow: '17680.0' },
    { symbol: 'US30', base: 'US3', quote: 'USD', baseName: 'Dow Jones 30', quoteName: 'U.S. Dollar', baseFlag: 'US3', quoteFlag: 'US', price: '38921.0', change: '+210.0 (+0.54%)', changePositive: true, prevClose: '38711.0', openPrice: '38730.0', dayHigh: '38980.0', dayLow: '38650.0' },
    { symbol: 'SP500', base: 'SP5', quote: 'USD', baseName: 'S&P 500', quoteName: 'U.S. Dollar', baseFlag: 'SP5', quoteFlag: 'US', price: '5021.80', change: '-8.40 (-0.17%)', changePositive: false, prevClose: '5030.20', openPrice: '5028.00', dayHigh: '5045.00', dayLow: '5015.00' },
    { symbol: 'BTCUSD', base: 'BTC', quote: 'USD', baseName: 'Bitcoin', quoteName: 'U.S. Dollar', baseFlag: 'BTC', quoteFlag: 'US', price: '67420.0', change: '+820.0 (+1.23%)', changePositive: true, prevClose: '66600.0', openPrice: '66700.0', dayHigh: '67800.0', dayLow: '66400.0' },
]

const COMMODITY_ICONS: Record<string, string> = {
    XAU: '🥇', XAG: '🥈', USO: '🛢️', NAS: '📈', US3: '📊', SP5: '📉', BTC: '₿',
}

// ── Y-axis width (pixels reserved for right-side labels) ─────────────────────
const Y_AXIS_W = 60

// ── Generate chart data ───────────────────────────────────────────────────────
function generateData(pair: CurrencyPair, period: Period): [number[], number[]] {
    const basePrice = parseFloat(pair.price)
    const low  = parseFloat(pair.dayLow)
    const high = parseFloat(pair.dayHigh)
    const range = high - low

    const seed = pair.symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    let state = seed + period.charCodeAt(0)
    const rand = () => {
        state = (state * 1664525 + 1013904223) & 0xffffffff
        return (state >>> 0) / 0xffffffff
    }

    const now = Math.floor(Date.now() / 1000)
    let pointCount: number, stepSec: number
    switch (period) {
        case '1D':  pointCount = 96;  stepSec = 15 * 60;   break
        case '1W':  pointCount = 120; stepSec = 30 * 60;   break
        case '1M':  pointCount = 90;  stepSec = 8  * 3600; break
        case '1Y':  pointCount = 260; stepSec = 24 * 3600; break
        case 'YTD': pointCount = 180; stepSec = 24 * 3600; break
        default:    pointCount = 96;  stepSec = 15 * 60
    }

    const startTs = now - (pointCount - 1) * stepSec
    const timestamps: number[] = []
    const prices: number[] = []

    let price = basePrice + (rand() - 0.5) * range * 0.3
    for (let i = 0; i < pointCount; i++) {
        timestamps.push(startTs + i * stepSec)
        const step = (rand() - 0.48) * range * 0.05
        price = Math.max(low, Math.min(high, price + step))
        prices.push(parseFloat(price.toFixed(5)))
    }
    prices[prices.length - 1] = basePrice
    return [timestamps, prices]
}

// ── Pick evenly spaced X label indices so they never overlap ──────────────────
function pickXLabels(
    timestamps: number[],
    period: Period,
    chartWidth: number   // px available for plot area (total - Y_AXIS_W)
): { idx: number; label: string }[] {
    if (!timestamps.length) return []

    const fmt = (ts: number, period: Period) => {
        const d = new Date(ts * 1000)
        if (period === '1D') {
            const h = d.getHours(), m = d.getMinutes()
            const hStr = String(h).padStart(2, '0')
            const mStr = String(m).padStart(2, '0')
            return `${hStr}:${mStr}`
        }
        const mon = d.toLocaleString('en-US', { month: 'short' })
        const day = d.getDate()
        if (period === '1W') return `${mon} ${day}`
        return `${mon} ${day}`
    }

    // approx px per label (label ~50px wide + 20px min gap)
    const minSpacingPx = 60
    const maxLabels = Math.max(2, Math.floor(chartWidth / minSpacingPx))
    const step = Math.max(1, Math.floor((timestamps.length - 1) / (maxLabels - 1)))

    const result: { idx: number; label: string }[] = []
    for (let i = 0; i < timestamps.length; i += step) {
        result.push({ idx: i, label: fmt(timestamps[i], period) })
    }
    // always include last
    const last = timestamps.length - 1
    if (result[result.length - 1]?.idx !== last) {
        result.push({ idx: last, label: fmt(timestamps[last], period) })
    }
    return result
}

// ── Flag helpers ──────────────────────────────────────────────────────────────
function FlagIcon({ code, size = 48 }: { code: string; size?: number }) {
    if (code in COMMODITY_ICONS) {
        return (
            <div style={{ width: size, height: size, borderRadius: '50%', background: '#1E2A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.6, flexShrink: 0 }}>
                {COMMODITY_ICONS[code]}
            </div>
        )
    }
    const Flag = FlagComponents[code as keyof typeof FlagComponents]
    if (!Flag) return <div style={{ width: size, height: size, borderRadius: '50%' }} className="bg-white/10" />
    const flagW = size * 1.5
    const offsetX = (flagW - size) / 2
    return (
        <div style={{ width: size, height: size, overflow: 'hidden', borderRadius: '50%', flexShrink: 0, position: 'relative' }}>
            <Flag style={{ display: 'block', position: 'absolute', top: 0, left: -offsetX, width: flagW, height: size }} title={code} />
        </div>
    )
}

function PairFlags({ pair }: { pair: CurrencyPair }) {
    return (
        <div className="relative flex-shrink-0" style={{ width: 72, height: 48 }}>
            <div className="absolute left-0 top-0 rounded-full overflow-hidden border-2 border-[#16161F]" style={{ width: 48, height: 48 }}>
                <FlagIcon code={pair.baseFlag} size={48} />
            </div>
            <div className="absolute rounded-full overflow-hidden border-2 border-[#16161F]" style={{ width: 48, height: 48, left: 24 }}>
                <FlagIcon code={pair.quoteFlag} size={48} />
            </div>
        </div>
    )
}

// ── uPlot chart ───────────────────────────────────────────────────────────────
const CHART_H = 274  // canvas height (excludes X label row)
const X_LABEL_H = 24 // height of the HTML X label row below canvas

function UPlotChart({
    timestamps, prices, decimals, period,
}: {
    timestamps: number[]
    prices: number[]
    decimals: number
    period: Period
}) {
    const wrapRef    = useRef<HTMLDivElement>(null)
    const plotRef    = useRef<uPlot | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)
    const xLabelsRef = useRef<HTMLDivElement | null>(null)
    const [containerW, setContainerW] = useState(0)

    // derived
    const plotW     = Math.max(0, containerW - Y_AXIS_W)
    const xLabels   = useMemo(() => pickXLabels(timestamps, period, plotW), [timestamps, period, plotW])

    const buildOpts = useCallback((w: number): uPlot.Options => {
        const minP = Math.min(...prices)
        const maxP = Math.max(...prices)
        const range = maxP - minP
        const pad  = range * 0.15

        return {
            width:  w,
            height: CHART_H,
            padding: [16, 0, 0, 0],
            cursor: {
                y: false,
                points: {
                    size: 8,
                    fill: '#ffffff',
                    stroke: '#88C4FF',
                    width: 2,
                },
            },
            hooks: {
                setCursor: [
                    (u: uPlot) => {
                        const { idx } = u.cursor
                        const tooltip = tooltipRef.current
                        if (!tooltip) return

                        if (idx == null || idx < 0) {
                            tooltip.style.display = 'none'
                            return
                        }

                        const ts    = timestamps[idx]
                        const price = prices[idx]
                        if (ts == null || price == null) { tooltip.style.display = 'none'; return }

                        const date    = new Date(ts * 1000)
                        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

                        tooltip.innerHTML = `
                            <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:3px;">${dateStr} ${timeStr}</div>
                            <div style="font-size:13px;color:#fff;font-weight:600;">${price.toFixed(decimals)}</div>
                        `

                        const left = u.valToPos(ts, 'x')
                        const top  = u.valToPos(price, 'y')

                        // keep tooltip inside plot area
                        const tw = tooltip.offsetWidth  || 120
                        const th = tooltip.offsetHeight || 52
                        const clampedLeft = Math.min(Math.max(left - tw / 2, 0), u.bbox.width / devicePixelRatio - tw)
                        const clampedTop  = top - th - 10 < 0 ? top + 10 : top - th - 10

                        tooltip.style.display = 'block'
                        tooltip.style.left    = `${clampedLeft}px`
                        tooltip.style.top     = `${clampedTop}px`
                    },
                ],
            },
            legend: { show: false },
            scales: {
                x: { time: true },
                y: { range: [minP - pad, maxP + pad] },
            },
            axes: [
                {
                    // X axis — completely hidden (we render our own HTML labels)
                    show:  false,
                    size:  0,
                    gap:   0,
                    ticks: { show: false },
                    grid:  { show: false },
                },
                {
                    // Y axis — right side
                    side:  1,
                    ticks: { show: false },
                    grid: {
                        stroke: '#FFFFFF1A',
                        width:  1,
                        dash:   [4, 4],
                    },
                    gap:  8,
                    size: Y_AXIS_W,
                    font: '500 13px Inter,sans-serif',
                    stroke: '#FFFFFF99',
                    values: (_u: uPlot, vals: number[]) =>
                        vals.map(v => (v != null ? v.toFixed(decimals) : '')),
                },
            ],
            series: [
                {},
                {
                    stroke: '#88C4FF',
                    width:  1.5,
                    fill: (u: uPlot) => {
                        const ctx  = u.ctx
                        const grad = ctx.createLinearGradient(0, u.bbox.top, 0, u.bbox.top + u.bbox.height)
                        grad.addColorStop(0, 'rgba(136,196,255,0.15)')
                        grad.addColorStop(1, 'rgba(136,196,255,0)')
                        return grad
                    },
                    points: { show: false },
                },
            ],
        }
    }, [prices, decimals, timestamps])

    // Init / re-init uPlot whenever data or width changes
    useEffect(() => {
        const wrap = wrapRef.current
        if (!wrap || containerW === 0) return

        // Destroy previous instance
        plotRef.current?.destroy()
        plotRef.current = null

        // Tooltip
        let tooltip = tooltipRef.current
        if (!tooltip) {
            tooltip = document.createElement('div')
            tooltip.style.cssText = [
                'position:absolute',
                'display:none',
                'pointer-events:none',
                'background:#1C1E2E',
                'border:1px solid rgba(255,255,255,0.10)',
                'border-radius:6px',
                'padding:7px 11px',
                'z-index:20',
                'white-space:nowrap',
                'box-shadow:0 4px 16px rgba(0,0,0,0.45)',
            ].join(';')
            wrap.appendChild(tooltip)
            tooltipRef.current = tooltip
        }

        const opts = buildOpts(containerW)
        const plot = new uPlot(opts, [timestamps, prices], wrap)
        plotRef.current = plot

        return () => {
            plot.destroy()
            plotRef.current = null
        }
    }, [timestamps, prices, containerW, buildOpts])

    // ResizeObserver — only track width
    useEffect(() => {
        const wrap = wrapRef.current
        if (!wrap) return
        
        // Set initial width immediately
        setContainerW(Math.floor(wrap.clientWidth))
        
        const ro = new ResizeObserver(entries => {
            const w = entries[0]?.contentRect.width ?? 0
            if (w > 0) setContainerW(Math.floor(w))
        })
        ro.observe(wrap)
        return () => ro.disconnect()
    }, [])

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* uPlot canvas lives here */}
            <div ref={wrapRef} style={{ width: '100%', position: 'relative', overflow: 'hidden' }} />

            {/* Custom HTML X-axis label row */}
            <div
                ref={xLabelsRef}
                style={{
                    position: 'relative',
                    height: X_LABEL_H,
                    marginRight: Y_AXIS_W,  // align with plot area (exclude Y axis)
                    overflow: 'hidden',
                }}
            >
                {xLabels.map(({ idx, label }) => {
                    // position = fraction of plot width
                    const frac = timestamps.length > 1 ? idx / (timestamps.length - 1) : 0
                    const leftPct = frac * 100
                    return (
                        <span
                            key={idx}
                            style={{
                                position:  'absolute',
                                left:      `${leftPct}%`,
                                transform: 'translateX(-50%)',
                                top:       4,
                                fontSize:  13,
                                fontWeight: 500,
                                lineHeight: '16px',
                                color:     'rgba(255,255,255,0.6)',
                                whiteSpace: 'nowrap',
                                // clamp first/last so they don't go outside
                                ...(idx === 0                        ? { left: 0, transform: 'none' } : {}),
                                ...(idx === timestamps.length - 1    ? { left: 'auto', right: 0, transform: 'none' } : {}),
                            }}
                        >
                            {label}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Chart() {
    const [activePeriod, setActivePeriod] = useState<Period>('1D')
    const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const periods: Period[] = ['1M', '1D', '1W', '1Y', 'YTD']

    const [timestamps, prices] = useMemo(
        () => generateData(selectedPair, activePeriod),
        [selectedPair, activePeriod]
    )

    const decimals = parseFloat(selectedPair.price) < 100 ? 5 : 1

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
                setDropdownOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="bg-[#16161F] border border-[#FFFFFF08] p-5 flex flex-col">

            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setDropdownOpen(p => !p)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <PairFlags pair={selectedPair} />
                        <div>
                            <div className="flex items-center gap-1.5">
                                <p className="text-white text-[16px] leading-[19px] font-semibold">{selectedPair.symbol}</p>
                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none"
                                    className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                                    <path d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z" fill="#FAFAF9" />
                                </svg>
                            </div>
                            <p className="text-white/60 text-[14px] leading-[17px] font-normal mt-[5px]">
                                {selectedPair.baseName} / {selectedPair.quoteName}
                            </p>
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-[280px] bg-[#1E1E2A] dashboard-nav border border-[#FFFFFF14] rounded overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)] max-h-98 overflow-y-auto">
                            {CURRENCY_PAIRS.map(pair => (
                                <button
                                    key={pair.symbol}
                                    onClick={() => { setSelectedPair(pair); setDropdownOpen(false) }}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-[#FFFFFF08] transition-colors cursor-pointer ${selectedPair.symbol === pair.symbol ? 'bg-[#FFFFFF0A]' : ''}`}
                                >
                                    <PairFlags pair={pair} />
                                    <div className="text-left">
                                        <p className="text-white text-[13px] font-semibold leading-tight">{pair.symbol}</p>
                                        <p className="text-white/40 text-[11px] leading-tight mt-0.5">{pair.baseName} / {pair.quoteName}</p>
                                    </div>
                                    <span className={`ml-auto text-[12px] font-medium ${pair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                        {pair.change.split(' ')[0]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-px border border-[#FFFFFF12] rounded-[10px] p-1">
                    {periods.map(p => (
                        <button key={p} onClick={() => setActivePeriod(p)}
                            className={`w-[38px] h-[37px] text-[14px] leading-[17px] font-medium rounded-[8px] transition-colors cursor-pointer ${activePeriod === p ? 'bg-[#FFFFFF0D] text-white' : 'text-white/60 hover:text-white/70'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price row */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-white text-[45px] font-semibold leading-[54px]">{selectedPair.price}</span>
                    <span className={`text-[18px] leading-[22px] font-normal ${selectedPair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                        {selectedPair.change}
                    </span>
                </div>
                <div className="flex items-center flex-wrap gap-5">
                    {[
                        { label: 'Prev Close', value: selectedPair.prevClose },
                        { label: 'Open Price', value: selectedPair.openPrice },
                        { label: 'Day High',   value: selectedPair.dayHigh   },
                        { label: 'Day Low',    value: selectedPair.dayLow    },
                    ].map(stat => (
                        <div key={stat.label} className="flex flex-col items-start">
                            <span className="text-white/60 text-[12px] leading-[16px] font-medium mb-1">{stat.label}</span>
                            <span className="text-white text-[18px] font-semibold leading-[22px]">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <UPlotChart
                timestamps={timestamps}
                prices={prices}
                decimals={decimals}
                period={activePeriod}
            />
        </div>
    )
}
