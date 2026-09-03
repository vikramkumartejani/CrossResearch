'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

interface CotInstrumentRow {
    name: string
    ticker: string
    net: number | null
    net_display: string
    wow: number | null
    wow_display: string
    net_positive: boolean
    wow_positive: boolean
    trend: number[]
    error?: string | null
}

interface CotObservation {
    rank: number
    num: string
    ticker: string
    instrument_name: string
    highlight: string
    text: string
    commentary: string
}

interface CotResponse {
    metadata: {
        latest_cftc_report_date?: string | null
        report_type?: string
        errors?: Record<string, string>
    }
    financials: CotInstrumentRow[]
    commodities: CotInstrumentRow[]
    commentary: {
        report_date?: string | null
        regime_takeaway?: string
        observations: CotObservation[]
    }
}

function formatReportDate(value?: string | null) {
    if (!value) return 'Latest report'
    const date = new Date(`${value}T00:00:00Z`)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    })
}

// ── Sparkline from real 10W net series ───────────────────────────────────────
function Sparkline({ values, positive }: { values: number[]; positive: boolean }) {
    const color = positive ? '#88C4FF' : '#FFFFFF4D'
    const path = useMemo(() => {
        if (!values || values.length < 2) return null

        const width = 77
        const height = 15
        const padX = 1
        const padY = 1.5
        const min = Math.min(...values)
        const max = Math.max(...values)
        const span = max - min || 1

        return values
            .map((value, index) => {
                const x = padX + (index / (values.length - 1)) * (width - padX * 2)
                const y = height - padY - ((value - min) / span) * (height - padY * 2)
                return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
            })
            .join(' ')
    }, [values])

    return (
        <svg
            viewBox="0 0 77 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-w-[77px]"
            preserveAspectRatio="xMidYMid meet"
        >
            {path ? (
                <path d={path} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            ) : (
                <path d="M2 7.5 H75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            )}
        </svg>
    )
}

// ── Sub-table ─────────────────────────────────────────────────────────────────
function InstrumentTable({ title, rows }: { title: string; rows: CotInstrumentRow[] }) {
    return (
        <div className="bg-[#16161F] h-[590px]">
            <h4 className="text-white text-[16px] leading-[19px] font-medium p-3 sm:p-4">{title}</h4>
            <div className="grid grid-cols-[1fr_64px_64px_64px] sm:grid-cols-[1fr_80px_80px_80px] gap-1 sm:gap-4 px-3 sm:px-4 pb-3 border-b border-[#FFFFFF0D]">
                {['Instrument', 'Net', 'Wow', '10W Trend'].map((h) => (
                    <span key={h} className="text-white/60 text-[11px] sm:text-[14px] leading-[17px] font-normal">
                        {h}
                    </span>
                ))}
            </div>
            <div className="flex flex-col">
                {rows.map((row) => (
                    <div
                        key={row.ticker}
                        className="grid grid-cols-[1fr_64px_64px_64px] sm:grid-cols-[1fr_80px_80px_80px] gap-1 sm:gap-4 py-3 px-3 sm:px-4 border-b border-[#FFFFFF08] last:border-0"
                    >
                        <div>
                            <p className="text-white text-[12px] sm:text-[14px] leading-[17px] font-semibold mb-1">
                                {row.name}
                            </p>
                            <p className="text-white/60 text-[11px] sm:text-[12px] leading-[14px]">{row.ticker}</p>
                        </div>
                        <div>
                            <p
                                className={`text-[12px] sm:text-[14px] leading-[17px] font-semibold ${
                                    row.net_positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                }`}
                            >
                                {row.net_display}
                            </p>
                            <p className="text-[11px] sm:text-[12px] leading-[14px] font-normal text-white/60 mt-1">Net</p>
                        </div>
                        <div>
                            <p
                                className={`text-[12px] sm:text-[14px] leading-[17px] font-semibold ${
                                    row.wow_positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                }`}
                            >
                                {row.wow_display}
                            </p>
                            <p className="text-[11px] sm:text-[12px] leading-[14px] font-normal text-white/60 mt-1">WoW</p>
                        </div>
                        <div className="self-center">
                            <Sparkline values={row.trend} positive={row.net_positive} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CotPositioning() {
    const [payload, setPayload] = useState<CotResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function fetchCot() {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/api/cot-positioning')
                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))
                    throw new Error(body.details || body.detail || body.error || 'Failed to fetch COT positioning')
                }

                const data: CotResponse = await response.json()
                if (!cancelled) setPayload(data)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Unknown error')
                    setPayload(null)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchCot()
        return () => {
            cancelled = true
        }
    }, [])

    const reportDate = formatReportDate(
        payload?.commentary?.report_date || payload?.metadata?.latest_cftc_report_date
    )
    const observations = payload?.commentary?.observations ?? []
    const takeaway =
        payload?.commentary?.regime_takeaway ||
        'Insufficient positioning history is available to form a regime takeaway.'

    return (
        <div className="mb-4 sm:mb-5">
            <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-white text-[18px] leading-[22px] font-medium">
                    COT Positioning • Latest CFTC Report
                </h2>
            </div>

            {loading && (
                <div className="mt-4 bg-[#16161F] p-3 sm:p-4">
                    <ChartLoader className="min-h-[120px]" />
                </div>
            )}

            {error && !loading && (
                <div className="mt-4 bg-[#16161F] p-3 sm:p-4 text-[#E25C3F] text-[12px]">{error}</div>
            )}

            {!loading && !error && payload && (
                <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4">
                    <InstrumentTable title="Global Financial Instruments" rows={payload.financials} />
                    <InstrumentTable title="Energy & Metals Instruments" rows={payload.commodities} />
                    <div className="bg-[#16161F] flex flex-col h-[590px] overflow-y-auto">
                        <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#FFFFFF0D]">
                            <div className="flex flex-col">
                                <span className="text-[#88C4FF] text-[12px] leading-[14px] font-normal mb-2">
                                    Desk Commentary
                                </span>
                                <h4 className="text-white text-[16px] leading-[19px] font-medium">
                                    Cross-Asset Positioning
                                </h4>
                            </div>
                            <span className="bg-[#FFFFFF0A] rounded-full py-2 px-3 sm:px-4 text-white/60 text-[12px] leading-[14px] font-normal self-start flex-shrink-0">
                                {reportDate}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2.5 sm:gap-4 flex-1 p-3 sm:p-4">
                            {observations.length === 0 && (
                                <p className="text-white/50 text-[13px] sm:text-[14px]">
                                    Insufficient positioning history is available to generate commentary.
                                </p>
                            )}
                            {observations.map((item) => (
                                <div key={item.num} className="flex gap-2 sm:gap-4">
                                    <span className="text-[#88C4FF] text-[13px] sm:text-[14px] leading-[17px] font-semibold flex-shrink-0">
                                        {item.num}
                                    </span>
                                    <p className="text-white/50 text-[13px] sm:text-[14px] leading-[20px] sm:leading-[21px]">
                                        <span className="text-white font-semibold">{item.highlight}</span>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 border-t border-[#FFFFFF0D]">
                            <p className="text-[#88C4FF] text-[14px] sm:text-[16px] leading-[19px] font-semibold mb-2 sm:mb-3">
                                Regime Takeaway
                            </p>
                            <p className="text-white/60 text-[12px] leading-4 sm:leading-[18px]">{takeaway}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}