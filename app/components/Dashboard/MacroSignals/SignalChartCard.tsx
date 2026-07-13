'use client'
import type { SignalChart } from './signalChartsData'

// ── Arrow right icon ─────────────────────────────────────────────────────────
function ArrowRight({ positive }: { positive: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 9H14.25" stroke="#88C4FF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 3.75L14.25 9L9 14.25" stroke="#88C4FF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

// ── Badge ────────────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
    ALPHA: 'text-[#88C4FF] border-[#88C4FF40]',
    WATCH: 'text-[#F59E0B] border-[#F59E0B40]',
    NEUTRAL: 'text-[#838388] border-[#83838840]',
}

function Badge({ label }: { label: string }) {
    return (
        <span className={`text-[#88C4FF] text-[12px] leading-[14px] font-normal ${BADGE_STYLES[label] ?? BADGE_STYLES.NEUTRAL}`}>
            {label}
        </span>
    )
}

// ── Inline SVG bar chart ─────────────────────────────────────────────────────
function BarChart({ labels, values }: { labels: string[]; values: number[] }) {
    const W = 100
    const H = 60
    const barGap = 6
    const n = values.length
    const barW = Math.max(1, (W - barGap * (n + 1)) / n)
    const maxV = Math.max(...values.map(Math.abs), 0.01)

    return (
        <div className="w-full" style={{ aspectRatio: '2.4 / 1', minHeight: 60 }}>
            <svg
                viewBox={`0 0 100 72`}
                preserveAspectRatio="none"
                width="100%"
                height="100%"
            >
                {/* zero line */}
                <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#FFFFFF1A" strokeWidth="0.5" />

                {values.map((v, i) => {
                    const x = barGap + i * (barW + barGap)
                    const barH = (Math.abs(v) / maxV) * (H / 2 - 4)
                    const y = v >= 0 ? H / 2 - barH : H / 2
                    return (
                        <rect
                            key={i}
                            x={x}
                            y={y}
                            width={barW}
                            height={barH}
                            fill={v >= 0 ? '#88C4FF' : '#E25C3F'}
                            rx="0.5"
                        />
                    )
                })}

                {/* X labels */}
                {labels.map((lbl, i) => {
                    const x = barGap + i * (barW + barGap) + barW / 2
                    return (
                        <text
                            key={i}
                            x={x}
                            y={70}
                            textAnchor="middle"
                            fontSize="4"
                            fill="rgba(255,255,255,0.4)"
                            fontFamily="Inter, sans-serif"
                        >
                            {lbl}
                        </text>
                    )
                })}
            </svg>
        </div>
    )
}

// ── Inline SVG line chart ────────────────────────────────────────────────────
function LineChart({ values }: { values: number[] }) {
    const W = 100
    const H = 60
    const n = values.length
    if (n < 2) return null

    const minV = Math.min(...values)
    const maxV = Math.max(...values)
    const range = maxV - minV || 1
    const pad = range * 0.1

    const toX = (i: number) => (i / (n - 1)) * W
    const toY = (v: number) => H - ((v - minV + pad) / (range + pad * 2)) * (H - 4) - 2

    const pts = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')

    // gradient fill path
    const fillPts = [
        `0,${H}`,
        ...values.map((v, i) => `${toX(i)},${toY(v)}`),
        `${W},${H}`,
    ].join(' ')

    return (
        <div className="w-full" style={{ aspectRatio: '2.4 / 1', minHeight: 60 }}>
            <svg
                viewBox={`0 0 100 60`}
                preserveAspectRatio="none"
                width="100%"
                height="100%"
            >
                <defs>
                    <linearGradient id={`lg_${values[0]}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#88C4FF" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#88C4FF" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* fill */}
                <polygon points={fillPts} fill={`url(#lg_${values[0]})`} />
                {/* line */}
                <polyline points={pts} fill="none" stroke="#88C4FF" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
                {/* last point dot */}
                <circle cx={toX(n - 1)} cy={toY(values[n - 1])} r="2" fill="#fff" stroke="#88C4FF" strokeWidth="1" />
            </svg>
        </div>
    )
}

// ── Main card ────────────────────────────────────────────────────────────────
export default function SignalChartCard({ chart }: { chart: SignalChart }) {
    return (
        <div className="bg-[#16161F] flex flex-col">
            {/* Top row: category + badge */}
            <div className='px-5 pt-5'>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[12px] leading-[14px] font-normal">
                        {chart.category}
                    </span>
                    <Badge label={chart.badge} />
                </div>

                {/* Title */}
                <p className="mt-2 mb-4 text-white text-[16px] leading-[19px] font-medium">{chart.title}</p>

                {/* Chart */}
                {/* <div className="w-full">
                {chart.chartType === 'bar' && chart.barLabels && chart.barValues ? (
                    <BarChart labels={chart.barLabels} values={chart.barValues} />
                ) : chart.lineValues ? (
                    <LineChart values={chart.lineValues} />
                ) : null}
            </div> */}

                {/* Description */}
                <p className="text-white/50 text-[12px] leading-[17px] font-normal">
                    {chart.description}
                </p>
            </div>

            {/* Action */}
            <button className='cursor-pointer px-5 pb-5 flex items-center gap-1.5 text-[#88C4FF] text-[10px] leading-[14px] font-semibold border-t border-[#FFFFFF1A] mt-4 pt-4'>
                <ArrowRight positive={chart.actionPositive} />
                <span>{chart.action}</span>
            </button>
        </div>
    )
}
