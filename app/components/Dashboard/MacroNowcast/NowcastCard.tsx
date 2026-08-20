interface Driver {
    label: string
    value: string
    positive?: boolean
}

interface TrendPoint {
    date: string
    value: number
}

interface ModelPoint {
    period: string
    forecast: number | null
    actual: number | null
}

export interface NowcastCardProps {
    region: string
    quarter: string
    vsConsensus: string
    vsConsensusPositive: boolean
    indicator: string
    value: string
    unit: string
    nowcast: number
    consensus: number
    prior: number
    inRange: string
    drivers: Driver[]
    confidence: number
    trendSeries?: TrendPoint[]
    modelVsActual?: ModelPoint[]
}

function TrendBars({ series }: { series: TrendPoint[] }) {
    const values = series.map((p) => p.value).filter((v) => Number.isFinite(v))
    if (values.length < 1) {
        return (
            <div className="h-[61px] flex items-center text-white/30 text-[11px]">No trend series</div>
        )
    }

    const w = 358
    const h = 61
    const padX = 2
    const padY = 4
    const usableW = w - padX * 2
    const usableH = h - padY * 2
    const min = Math.min(0, ...values)
    const max = Math.max(0, ...values)
    const span = max - min || 1
    const zeroY = padY + usableH - ((0 - min) / span) * usableH
    const gap = Math.max(1, usableW * 0.08 / values.length)
    const barW = Math.max(2, (usableW - gap * (values.length - 1)) / values.length)

    return (
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} fill="none" preserveAspectRatio="none">
            <line x1={padX} y1={zeroY} x2={w - padX} y2={zeroY} stroke="#FFFFFF12" strokeWidth="1" />
            {values.map((v, i) => {
                const x = padX + i * (barW + gap)
                const y = padY + usableH - ((v - min) / span) * usableH
                const top = Math.min(y, zeroY)
                const height = Math.max(1.5, Math.abs(zeroY - y))
                const isLast = i === values.length - 1
                return (
                    <rect
                        key={i}
                        x={x}
                        y={top}
                        width={barW}
                        height={height}
                        rx={1.5}
                        fill={isLast ? '#88C4FF' : '#88C4FF'}
                        opacity={isLast ? 1 : 0.35 + (0.45 * i) / Math.max(1, values.length - 1)}
                    />
                )
            })}
        </svg>
    )
}

function ModelDotPlot({ points }: { points: ModelPoint[] }) {
    const forecasts = points.map((p) => p.forecast).filter((v): v is number => v != null && Number.isFinite(v))
    const actuals = points.map((p) => p.actual).filter((v): v is number => v != null && Number.isFinite(v))
    if (forecasts.length < 1 && actuals.length < 1) {
        return (
            <div className="h-[53px] flex items-center text-white/30 text-[11px]">No model history</div>
        )
    }

    const all = [...forecasts, ...actuals]
    const min = Math.min(...all)
    const max = Math.max(...all)
    const span = max - min || 1
    const w = 363
    const h = 53
    const padX = 10
    const padY = 8
    const usableW = w - padX * 2
    const usableH = h - padY * 2
    const n = Math.max(points.length, 1)

    const yFor = (v: number) => padY + usableH - ((v - min) / span) * usableH
    const xFor = (i: number) => padX + (n === 1 ? usableW / 2 : (i / (n - 1)) * usableW)

    return (
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} fill="none" preserveAspectRatio="none">
            {points.map((p, i) => {
                const x = xFor(i)
                const hasF = p.forecast != null && Number.isFinite(p.forecast)
                const hasA = p.actual != null && Number.isFinite(p.actual)
                const nodes = []

                if (hasF && hasA) {
                    nodes.push(
                        <line
                            key={`stem-${i}`}
                            x1={x}
                            y1={yFor(p.forecast as number)}
                            x2={x}
                            y2={yFor(p.actual as number)}
                            stroke="#FFFFFF22"
                            strokeWidth="1.5"
                        />
                    )
                }
                if (hasA) {
                    nodes.push(
                        <circle
                            key={`a-${i}`}
                            cx={x}
                            cy={yFor(p.actual as number)}
                            r="4"
                            fill="#5A5A63"
                            stroke="#16161F"
                            strokeWidth="1"
                        />
                    )
                }
                if (hasF) {
                    nodes.push(
                        <circle
                            key={`f-${i}`}
                            cx={x}
                            cy={yFor(p.forecast as number)}
                            r="4"
                            fill="#88C4FF"
                            stroke="#16161F"
                            strokeWidth="1"
                        />
                    )
                }
                return nodes
            })}
        </svg>
    )
}

export default function NowcastCard({
    region, quarter, vsConsensus, vsConsensusPositive,
    indicator, value, unit,
    nowcast, consensus, prior,
    inRange, drivers, confidence,
    trendSeries = [],
    modelVsActual = [],
}: NowcastCardProps) {
    return (
        <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col h-full">

            <div className="flex items-center justify-between mb-2 sm:mb-5">
                <span className="text-[#838388] text-[12px] leading-[17px] font-normal">{region} · {quarter}</span>
                <span
                    className="text-[12px] font-medium leading-[14px]"
                    style={{ color: vsConsensusPositive ? '#2CB37B' : '#E25C3F' }}
                >
                    {vsConsensus} Cons.
                </span>
            </div>

            <div className="mb-2 sm:mb-4">
                <p className="text-white text-[14px] sm:text-[16px] leading-4 sm:leading-[19px] font-medium mb-1 sm:mb-2">{indicator}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-white text-[24px] sm:text-[27px] font-medium leading-7 sm:leading-[32px]">{value}</span>
                    <span className="text-white/60 text-[12px] font-medium">{unit}</span>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-3 border border-[#FFFFFF0D] bg-[#FFFFFF08] rounded-md sm:rounded-[12px] px-3 py-2 sm:p-3">
                {[
                    { label: 'Nowcast',   val: nowcast,   color: '#88C4FF' },
                    { label: 'Consensus', val: consensus, color: '#ffffff' },
                    { label: 'Prior',     val: prior,     color: '#ffffff' },
                ].map(item => (
                    <div key={item.label} className="first:pl-0 pl-5 flex flex-col items-start gap-2 border-r border-[#FFFFFF1A] last:border-none">
                        <span className="text-white/60 text-[12px] leading-[14px] font-medium">{item.label}</span>
                        <span className="text-[16px] leading-[22px] font-semibold" style={{ color: item.color }}>{item.val}</span>
                    </div>
                ))}
            </div>

            <TrendBars series={trendSeries} />

            <div className="sm:mt-3 pt-3 border-t border-[#FFFFFF12] flex items-center justify-between">
                <span className="text-white/60 text-[12px] font-normal leading-[14px]">Model Vs Actual · Last 8</span>
                <span className="text-[#88C4FF] text-[12px] leading-[14px] font-semibold">{inRange} In Range</span>
            </div>

            <div className="my-[15px]">
                <ModelDotPlot points={modelVsActual} />
            </div>

            <div className="flex items-center gap-4 border-b border-[#FFFFFF12] pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#88C4FF] inline-block" />
                    <span className="text-[14px] text-white/60 font-normal leading-[17px]">Forecast</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5A5A63] inline-block" />
                    <span className="text-[14px] text-white/60 font-normal leading-[17px]">Actual</span>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <p className="text-white text-[14px] leading-[17px] font-semibold mb-2.5">Component Drivers</p>
                <div className="flex flex-col gap-2 sm:gap-3">
                    {drivers.map(d => (
                        <div key={d.label} className="flex items-center justify-between">
                            <span className="text-white/60 text-[12px] leading-[14px] font-normal">{d.label}</span>
                            <span
                                className="text-[12px] leading-[14px] font-semibold"
                                style={{ color: (d.positive ?? !String(d.value).startsWith('-')) ? '#2CB37B' : '#E25C3F' }}
                            >
                                {d.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-[#FFFFFF12] mt-auto pt-3 sm:pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-white/60 text-[14px] leading-[17px]">Model Confidence</span>
                    <div className="flex items-center gap-2">
                        <div className="h-2 bg-[#FFFFFF0f] shadow-2xl w-[60px] rounded-full">
                            <div
                                className="h-full bg-[#88C4FF] rounded-full"
                                style={{ width: `${Math.max(0, Math.min(100, confidence))}%` }}
                            />
                        </div>
                        <span className="text-[#838388] text-[14px] leading-5">{confidence}%</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
