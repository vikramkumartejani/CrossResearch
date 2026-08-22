'use client'
import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { SignalChart } from './signalChartsData'
import { media } from '@/lib/media'

// ── Arrow right icon ─────────────────────────────────────────────────────────
function ArrowRight() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 9H14.25" stroke="#88C4FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 3.75L14.25 9L9 14.25" stroke="#88C4FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// ── Badge ────────────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
    ALPHA: 'text-[#88C4FF] border-[#88C4FF40]',
    WATCH: 'text-[#F59E0B] border-[#F59E0B40]',
    NEUTRAL: 'text-[#838388] border-[#83838840]',
}

function formatBadgeLabel(label: string) {
    const raw = (label || '').trim()
    if (!raw) return '-'
    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
}

function Badge({ label }: { label: string }) {
    const key = (label || '').trim().toUpperCase()
    return (
        <span className={`text-[12px] leading-[14px] font-normal ${BADGE_STYLES[key] ?? BADGE_STYLES.NEUTRAL}`}>
            {formatBadgeLabel(label)}
        </span>
    )
}

// ── SVG chart constants ──────────────────────────────────────────────────────
const Y_LABEL_W = 40
const CHART_H = 200
const CHART_W = 560
const PLOT_W = CHART_W - Y_LABEL_W
const X_LABEL_H = 20
const VB_H = CHART_H + X_LABEL_H
const CHART_ASPECT = `${CHART_W} / ${VB_H}`

function ChartSvg({ children }: { children: ReactNode }) {
    return (
        <svg
            viewBox={`0 0 ${CHART_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            className="block w-full h-auto"
            style={{ aspectRatio: CHART_ASPECT }}
        >
            {children}
        </svg>
    )
}

function toPlotX(i: number, n: number) {
    return Y_LABEL_W + (n < 2 ? 0 : (i / (n - 1)) * PLOT_W)
}

function toPlotY(v: number, minV: number, maxV: number, pad = 0.1) {
    const range = maxV - minV || 1
    const p = range * pad
    return CHART_H - ((v - minV + p) / (range + p * 2)) * (CHART_H - 6) - 3
}

function YLabels({ labels }: { labels: string[] }) {
    const n = labels.length
    return (
        <>
            {labels.map((lbl, i) => {
                const y = i === 0 ? 8 : i === n - 1 ? CHART_H - 2 : (i / (n - 1)) * CHART_H
                return (
                    <text
                        key={i}
                        x={Y_LABEL_W - 4}
                        y={y}
                        textAnchor="end"
                        dominantBaseline={i === 0 ? 'hanging' : i === n - 1 ? 'auto' : 'middle'}
                        fontSize="7"
                        fill="rgba(255,255,255,0.35)"
                        fontFamily="Inter, sans-serif"
                    >
                        {lbl}
                    </text>
                )
            })}
        </>
    )
}

function XLabels({ labels, n }: { labels: string[]; n: number }) {
    return (
        <>
            {labels.map((lbl, i) => {
                const x = toPlotX(i, n)
                const anchor = i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'
                return (
                    <text
                        key={i}
                        x={x}
                        y={CHART_H + X_LABEL_H - 2}
                        textAnchor={anchor}
                        fontSize="7"
                        fill="rgba(255,255,255,0.35)"
                        fontFamily="Inter, sans-serif"
                    >
                        {lbl}
                    </text>
                )
            })}
        </>
    )
}

function NumberedXLabels({ n }: { n: number }) {
    const step = n <= 10 ? 1 : Math.ceil(n / 10)
    const indices: number[] = []
    for (let i = 0; i < n; i += step) indices.push(i)
    if (indices[indices.length - 1] !== n - 1) indices.push(n - 1)
    return (
        <>
            {indices.map((i) => {
                const x = toPlotX(i, n)
                const anchor = i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'
                return (
                    <text key={i} x={x} y={CHART_H + X_LABEL_H - 2} textAnchor={anchor} fontSize="7" fill="rgba(255,255,255,0.35)" fontFamily="Inter, sans-serif">
                        {i + 1}
                    </text>
                )
            })}
        </>
    )
}

function GridLines({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                const y = i === 0 ? 4 : (i / (count - 1)) * CHART_H
                return (
                    <line key={i} x1={Y_LABEL_W} y1={y} x2={CHART_W} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                )
            })}
        </>
    )
}

function AreaChart({ values, yLabels }: { values: number[]; yLabels?: string[] }) {
    const n = values.length
    const minV = Math.min(...values)
    const maxV = Math.max(...values)
    const pts = values.map((v, i) => `${toPlotX(i, n)},${toPlotY(v, minV, maxV)}`)
    const fillPts = [`${Y_LABEL_W},${CHART_H}`, ...pts, `${CHART_W},${CHART_H}`].join(' ')
    const gradId = `area_${values[0]}_${n}`
    return (
        <ChartSvg>
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#88C4FF" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#88C4FF" stopOpacity="0" />
                </linearGradient>
            </defs>
            <GridLines count={yLabels?.length ?? 5} />
            {yLabels && <YLabels labels={yLabels} />}
            <polygon points={fillPts} fill={`url(#${gradId})`} />
            <polyline points={pts.join(' ')} fill="none" stroke="#88C4FF" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            <NumberedXLabels n={n} />
        </ChartSvg>
    )
}

function AreaTenorChart({ values, yLabels, xLabels }: { values: number[]; yLabels?: string[]; xLabels?: string[] }) {
    const n = values.length
    const minV = Math.min(...values)
    const maxV = Math.max(...values)
    const pts = values.map((v, i) => `${toPlotX(i, n)},${toPlotY(v, minV, maxV)}`)
    const fillPts = [`${Y_LABEL_W},${CHART_H}`, ...pts, `${CHART_W},${CHART_H}`].join(' ')
    const gradId = `areatenor_${values[0]}_${n}`
    return (
        <ChartSvg>
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#88C4FF" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#88C4FF" stopOpacity="0" />
                </linearGradient>
            </defs>
            <GridLines count={yLabels?.length ?? 5} />
            {yLabels && <YLabels labels={yLabels} />}
            <polygon points={fillPts} fill={`url(#${gradId})`} />
            <polyline points={pts.join(' ')} fill="none" stroke="#88C4FF" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            {xLabels && <XLabels labels={xLabels} n={n} />}
        </ChartSvg>
    )
}

function DashedChart({ values, yLabels }: { values: number[]; yLabels?: string[] }) {
    const n = values.length
    const minV = Math.min(...values)
    const maxV = Math.max(...values)
    const pts = values.map((v, i) => `${toPlotX(i, n)},${toPlotY(v, minV, maxV)}`)
    const highlightIdx = [0, Math.floor(n * 0.55)]
    const zeroY = toPlotY(0, minV, maxV)
    return (
        <ChartSvg>
            <GridLines count={yLabels?.length ?? 5} />
            {yLabels && <YLabels labels={yLabels} />}
            {zeroY > 4 && zeroY < CHART_H - 4 && (
                <line x1={Y_LABEL_W} y1={zeroY} x2={CHART_W} y2={zeroY} stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
            )}
            <polyline points={pts.join(' ')} fill="none" stroke="#88C4FF" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4 3" />
            {highlightIdx.map((idx) => (
                <circle key={idx} cx={toPlotX(idx, n)} cy={toPlotY(values[idx], minV, maxV)} r="3" fill="#fff" stroke="#88C4FF" strokeWidth="1" />
            ))}
            <NumberedXLabels n={n} />
        </ChartSvg>
    )
}

function DotsChart({ values, yLabels, xLabels }: { values: number[]; yLabels?: string[]; xLabels?: string[] }) {
    const n = values.length
    const minV = Math.min(...values)
    const maxV = Math.max(...values)
    const coords = values.map((v, i) => ({ x: toPlotX(i, n), y: toPlotY(v, minV, maxV, 0.15) }))
    return (
        <ChartSvg>
            <GridLines count={yLabels?.length ?? 5} />
            {yLabels && <YLabels labels={yLabels} />}
            <polyline points={coords.map(c => `${c.x},${c.y}`).join(' ')} fill="none" stroke="#88C4FF" strokeWidth="1.5" strokeLinejoin="round" />
            {coords.map((c, i) => (
                <circle key={i} cx={c.x} cy={c.y} r="3.5" fill="#fff" stroke="#88C4FF" strokeWidth="1" />
            ))}
            {xLabels && <XLabels labels={xLabels} n={n} />}
        </ChartSvg>
    )
}

function BarChart({ labels, values }: { labels: string[]; values: number[] }) {
    const n = values.length
    const maxAbs = Math.max(...values.map(Math.abs), 0.01)
    const barGap = 2
    const barW = (PLOT_W - barGap * (n + 1)) / n
    const zeroY = CHART_H / 2
    return (
        <ChartSvg>
            <line x1={Y_LABEL_W} y1={zeroY} x2={CHART_W} y2={zeroY} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            {values.map((v, i) => {
                const x = Y_LABEL_W + barGap + i * (barW + barGap)
                const barH = (Math.abs(v) / maxAbs) * (CHART_H / 2 - 6)
                return (
                    <rect key={i} x={x} y={v >= 0 ? zeroY - barH : zeroY} width={barW} height={barH} fill={v >= 0 ? '#88C4FF' : '#E25C3F'} rx="0.5" />
                )
            })}
            {labels.map((lbl, i) => (
                <text key={i} x={Y_LABEL_W + barGap + i * (barW + barGap) + barW / 2} y={CHART_H + X_LABEL_H - 2} textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.35)" fontFamily="Inter, sans-serif">
                    {lbl}
                </text>
            ))}
        </ChartSvg>
    )
}

function ChartVisual({ chart, size = 'card' }: { chart: SignalChart; size?: 'card' | 'modal' }) {
    const imageClass =
        size === 'modal'
            ? 'w-full h-auto max-h-[min(70vh,720px)] object-contain rounded-[4px] bg-[#0C0C14]'
            : 'w-full h-auto max-h-[260px] object-contain rounded-[4px] bg-[#0C0C14]'

    if (chart.image && /res\.cloudinary\.com/i.test(chart.image)) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media(chart.image)} alt={chart.title} className={imageClass} />
        )
    }
    if (chart.chartType === 'bar' && chart.barLabels && chart.barValues) {
        return <BarChart labels={chart.barLabels} values={chart.barValues} />
    }
    if (chart.chartType === 'dots' && chart.lineValues) {
        return <DotsChart values={chart.lineValues} yLabels={chart.yLabels} xLabels={chart.xLabels} />
    }
    if (chart.chartType === 'dashed' && chart.lineValues) {
        return <DashedChart values={chart.lineValues} yLabels={chart.yLabels} />
    }
    if (chart.chartType === 'area-tenor' && chart.lineValues) {
        return <AreaTenorChart values={chart.lineValues} yLabels={chart.yLabels} xLabels={chart.xLabels} />
    }
    if (chart.lineValues && chart.lineValues.length > 1) {
        return <AreaChart values={chart.lineValues} yLabels={chart.yLabels} />
    }
    return (
        <div className="h-[180px] flex items-center justify-center text-white/35 text-[13px]">
            Chart unavailable
        </div>
    )
}

function SignalChartModal({ chart, onClose }: { chart: SignalChart; onClose: () => void }) {
    useEffect(() => {
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)

        return () => {
            document.body.style.overflow = previous
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={chart.title}
        >
            <div
                className="relative w-full max-w-[960px] max-h-[92vh] overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-[#16161F] border border-[#FFFFFF14] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 flex items-center justify-center bg-[#FFFFFF0A] border border-[#FFFFFF14] hover:bg-[#FFFFFF14] transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
                        <path d="M4 4L14 14M14 4L4 14" stroke="#FAFAF9" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 pr-12 sm:pr-14">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-white/50 text-[12px] leading-[14px] font-normal">
                            {chart.category}
                        </span>
                        <Badge label={chart.badge} />
                    </div>
                    <h2 className="mt-2 mb-4 sm:mb-5 text-white text-[18px] sm:text-[22px] leading-[1.25] font-medium">
                        {chart.title}
                    </h2>

                    <div className="w-full mb-4 sm:mb-5">
                        <ChartVisual chart={chart} size="modal" />
                    </div>

                    <p className="text-white/55 text-[13px] sm:text-[14px] leading-[20px] font-normal">
                        {chart.description}
                    </p>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-5 flex items-center gap-1.5 text-[#88C4FF] text-[11px] sm:text-[12px] leading-[14px] font-semibold border-t border-[#FFFFFF1A] pt-3 sm:pt-4">
                    <ArrowRight />
                    <span>{chart.action}</span>
                </div>
            </div>
        </div>,
        document.body,
    )
}

// ── Main card ────────────────────────────────────────────────────────────────
export default function SignalChartCard({ chart }: { chart: SignalChart }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="bg-[#16161F] flex flex-col text-left w-full cursor-pointer hover:bg-[#1A1A24] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#88C4FF]"
                aria-label={`Open ${chart.title}`}
            >
                <div className="px-3 sm:px-5 pt-3 sm:pt-5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-white/50 text-[12px] leading-[14px] font-normal">
                            {chart.category}
                        </span>
                        <Badge label={chart.badge} />
                    </div>

                    <p className="mt-1 sm:mt-2 mb-4 text-white text-[14px] sm:text-[15px] sm:text-[16px] leading-[19px] font-medium">
                        {chart.title}
                    </p>

                    <div className="w-full pointer-events-none">
                        <ChartVisual chart={chart} size="card" />
                    </div>

                    <p className="text-white/50 text-[12px] leading-[16px] sm:leading-[17px] font-normal">
                        {chart.description}
                    </p>
                </div>

                <div className="px-3 sm:px-5 pb-3 sm:pb-5 flex items-center text-left gap-1.5 text-[#88C4FF] text-[10px] leading-[14px] font-semibold border-t border-[#FFFFFF1A] mt-3 sm:mt-4 pt-3 sm:pt-4">
                    <ArrowRight />
                    <span>{chart.action}</span>
                </div>
            </button>

            {open ? <SignalChartModal chart={chart} onClose={() => setOpen(false)} /> : null}
        </>
    )
}
