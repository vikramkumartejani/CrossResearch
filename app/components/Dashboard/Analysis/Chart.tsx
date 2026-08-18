'use client'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { dashCardClass, useDashboardTheme } from '../DashboardTheme'
import ChartLoader from '../shared/ChartLoader'

type Period = '1D'

export interface CurrencyPair {
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
    { symbol: 'EURUSD', base: 'EUR', quote: 'USD', baseName: 'Euro', quoteName: 'U.S. Dollar', baseFlag: 'EU', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'GBPUSD', base: 'GBP', quote: 'USD', baseName: 'British Pound', quoteName: 'U.S. Dollar', baseFlag: 'GB', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'USDJPY', base: 'USD', quote: 'JPY', baseName: 'U.S. Dollar', quoteName: 'Japanese Yen', baseFlag: 'US', quoteFlag: 'JP', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'XAUUSD', base: 'XAU', quote: 'USD', baseName: 'Gold', quoteName: 'U.S. Dollar', baseFlag: 'XAU', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'XAGUSD', base: 'XAG', quote: 'USD', baseName: 'Silver', quoteName: 'U.S. Dollar', baseFlag: 'XAG', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'USOIL', base: 'USO', quote: 'USD', baseName: 'US Crude Oil', quoteName: 'U.S. Dollar', baseFlag: 'USO', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'NAS100', base: 'NAS', quote: 'USD', baseName: 'Nasdaq 100', quoteName: 'U.S. Dollar', baseFlag: 'NAS', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'US30', base: 'US3', quote: 'USD', baseName: 'Dow Jones 30', quoteName: 'U.S. Dollar', baseFlag: 'US3', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'SP500', base: 'SP5', quote: 'USD', baseName: 'S&P 500', quoteName: 'U.S. Dollar', baseFlag: 'SP5', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
    { symbol: 'BTCUSD', base: 'BTC', quote: 'USD', baseName: 'Bitcoin', quoteName: 'U.S. Dollar', baseFlag: 'BTC', quoteFlag: 'US', price: '-', change: '-', changePositive: true, prevClose: '-', openPrice: '-', dayHigh: '-', dayLow: '-' },
]

// ── Y-axis width (pixels reserved for right-side labels) ─────────────────────
const Y_AXIS_W        = 60   // desktop
const Y_AXIS_W_MOBILE = 46   // mobile (< 480px)

// ── Y-axis width (pixels reserved for right-side labels) ─────────────────────
function pickXLabels(
    timestamps: number[],
    period: Period,
    chartWidth: number   // px available for plot area (total - yAxisW)
): { idx: number; label: string }[] {
    if (!timestamps.length) return []

    const fmt = (ts: number, p: Period) => {
        const d = new Date(ts * 1000)
        if (p === '1D') {
            const hStr = String(d.getHours()).padStart(2, '0')
            const mStr = String(d.getMinutes()).padStart(2, '0')
            return `${hStr}:${mStr}`
        }
        const mon = d.toLocaleString('en-US', { month: 'short' })
        return `${mon} ${d.getDate()}`
    }

    // each label is ~48px wide; require at least 12px gap between them
    const labelW      = 48
    const minGap      = 12
    const slotW       = labelW + minGap
    const maxLabels   = Math.max(2, Math.floor(chartWidth / slotW))
    const step        = Math.max(1, Math.floor((timestamps.length - 1) / (maxLabels - 1)))

    const result: { idx: number; label: string }[] = []
    for (let i = 0; i < timestamps.length; i += step) {
        result.push({ idx: i, label: fmt(timestamps[i], period) })
    }

    // Only append the last point if it's far enough from the second-to-last label
    const last      = timestamps.length - 1
    const lastAdded = result[result.length - 1]
    if (lastAdded?.idx !== last) {
        const lastFrac   = last / (timestamps.length - 1)
        const prevFrac   = lastAdded ? lastAdded.idx / (timestamps.length - 1) : 0
        const pxBetween  = (lastFrac - prevFrac) * chartWidth
        // only add if there's room for a full label slot
        if (pxBetween >= slotW) {
            result.push({ idx: last, label: fmt(timestamps[last], period) })
        } else {
            // replace the last added label with the final timestamp instead
            if (result.length > 1) {
                result[result.length - 1] = { idx: last, label: fmt(timestamps[last], period) }
            }
        }
    }
    return result
}

// ── uPlot chart ───────────────────────────────────────────────────────────────
const CHART_H = 274  // canvas height (excludes X label row)
const X_LABEL_H = 24 // height of the HTML X label row below canvas

function UPlotChart({
    timestamps, prices, decimals, period, light = false,
}: {
    timestamps: number[]
    prices: number[]
    decimals: number
    period: Period
    light?: boolean
}) {
    const wrapRef    = useRef<HTMLDivElement>(null)
    const plotRef    = useRef<uPlot | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)
    const xLabelsRef = useRef<HTMLDivElement | null>(null)
    const [containerW, setContainerW] = useState(0)

    // derived - use smaller Y-axis on mobile
    const isMobile  = containerW > 0 && containerW < 480
    const yAxisW    = isMobile ? Y_AXIS_W_MOBILE : Y_AXIS_W
    const yFontSize = isMobile ? 10 : 13
    const plotW     = Math.max(0, containerW - yAxisW)
    const xLabels   = useMemo(() => pickXLabels(timestamps, period, plotW), [timestamps, period, plotW])
    const gridStroke = light ? 'rgba(15,23,42,0.10)' : '#FFFFFF1A'
    const axisStroke = light ? 'rgba(15,23,42,0.55)' : '#FFFFFF99'
    const labelColor = light ? 'rgba(15,23,42,0.55)' : 'rgba(255,255,255,0.6)'

    const buildOpts = useCallback((w: number, axisW: number, fontSize: number): uPlot.Options => {
        const minP = prices.length ? Math.min(...prices) : 0
        const maxP = prices.length ? Math.max(...prices) : 1
        const range = Math.max(maxP - minP, 1e-9)
        const pad  = range * 0.15

        return {
            width:  w,
            height: CHART_H,
            padding: [16, 0, 0, 0],
            cursor: {
                y: false,
                points: {
                    size: 8,
                    fill: light ? '#0F172A' : '#ffffff',
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
                            <div style="font-size:11px;color:${light ? 'rgba(15,23,42,0.55)' : 'rgba(255,255,255,0.55)'};margin-bottom:3px;">${dateStr} ${timeStr}</div>
                            <div style="font-size:13px;color:${light ? '#0F172A' : '#fff'};font-weight:600;">${price.toFixed(decimals)}</div>
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
                    // X axis - completely hidden (we render our own HTML labels)
                    show:  false,
                    size:  0,
                    gap:   0,
                    ticks: { show: false },
                    grid:  { show: false },
                },
                {
                    // Y axis - right side
                    side:  1,
                    ticks: { show: false },
                    grid: {
                        stroke: gridStroke,
                        width:  1,
                        dash:   [4, 4],
                    },
                    gap:  8,
                    size: axisW,
                    font: `500 ${fontSize}px Inter,sans-serif`,
                    stroke: axisStroke,
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
    }, [prices, decimals, timestamps, gridStroke, axisStroke, light])

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
            wrap.appendChild(tooltip)
            tooltipRef.current = tooltip
        }
        tooltip.style.cssText = [
            'position:absolute',
            'display:none',
            'pointer-events:none',
            light ? 'background:#FFFFFF' : 'background:#1C1E2E',
            light ? 'border:1px solid rgba(15,23,42,0.10)' : 'border:1px solid rgba(255,255,255,0.10)',
            'border-radius:6px',
            'padding:7px 11px',
            'z-index:20',
            'white-space:nowrap',
            'box-shadow:0 4px 16px rgba(0,0,0,0.45)',
        ].join(';')

        const opts = buildOpts(containerW, yAxisW, yFontSize)
        const plot = new uPlot(opts, [timestamps, prices], wrap)
        plotRef.current = plot

        return () => {
            plot.destroy()
            plotRef.current = null
        }
    }, [timestamps, prices, containerW, yAxisW, yFontSize, buildOpts, light])

    // ResizeObserver - only track width
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
                    marginRight: yAxisW,  // align with plot area (exclude Y axis)
                }}
            >
                {xLabels.map(({ idx, label }) => {
                    const isFirst = idx === 0
                    const isLast  = idx === timestamps.length - 1
                    const frac    = timestamps.length > 1 ? idx / (timestamps.length - 1) : 0
                    const leftPct = frac * 100
                    return (
                        <span
                            key={idx}
                            style={{
                                position:   'absolute',
                                top:        4,
                                fontSize:   isMobile ? 10 : 13,
                                fontWeight: 500,
                                lineHeight: '16px',
                                color:      labelColor,
                                whiteSpace: 'nowrap',
                                ...(isFirst ? { left: 0, transform: 'none' } :
                                    isLast  ? { left: 'auto', right: 0, transform: 'none' } :
                                              { left: `${leftPct}%`, transform: 'translateX(-50%)' }),
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
interface ChartProps {
    selectedPair: CurrencyPair
}

export default function Chart({ selectedPair }: ChartProps) {
    const { theme } = useDashboardTheme()
    const isLight = theme === 'light'
    const [timestamps, setTimestamps] = useState<number[]>([])
    const [prices, setPrices] = useState<number[]>([])
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

    useEffect(() => {
        const controller = new AbortController()
        setStatus('loading')
        fetch(`/api/price-action?asset=${encodeURIComponent(selectedPair.symbol)}`, {
            cache: 'no-store',
            signal: controller.signal,
        })
            .then(async (res) => {
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(typeof body?.details === 'string' ? body.details : 'Failed to load chart')
                }
                const ts = Array.isArray(body.timestamps) ? body.timestamps.map(Number) : []
                const px = Array.isArray(body.prices) ? body.prices.map(Number) : []
                if (ts.length < 2 || px.length < 2) {
                    throw new Error('Not enough Yahoo bars')
                }
                setTimestamps(ts)
                setPrices(px)
                setStatus('ready')
            })
            .catch((err) => {
                if (err?.name === 'AbortError') return
                setTimestamps([])
                setPrices([])
                setStatus('error')
            })
        return () => controller.abort()
    }, [selectedPair.symbol])

    const decimals = selectedPair.price !== '-' && parseFloat(selectedPair.price) < 100 ? 5 : 1
    const muted = isLight ? 'text-[#5B6472]' : 'text-white/50'

    return (
        <div className={`${dashCardClass(theme)} p-4 sm:p-5 flex flex-col h-full rounded-[4px]`}>
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <h3 className={`text-[16px] sm:text-[18px] leading-[22px] font-medium ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                    Daily Price Action
                </h3>
                <span className={`text-[12px] sm:text-[13px] leading-[16px] font-medium ${muted}`}>
                    15-minute · last 24h
                </span>
            </div>

            {status === 'ready' ? (
                <UPlotChart
                    timestamps={timestamps}
                    prices={prices}
                    decimals={decimals}
                    period="1D"
                    light={isLight}
                />
            ) : status === 'loading' ? (
                <ChartLoader light={isLight} className="min-h-[298px]" />
            ) : (
                <div className={`flex-1 min-h-[274px] flex items-center justify-center text-[13px] ${muted}`}>
                    Unavailable
                </div>
            )}
        </div>
    )
}
