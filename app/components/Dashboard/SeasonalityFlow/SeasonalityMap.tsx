'use client'

import { useState, useEffect } from 'react'
import InstrumentDropdown, { type SeasonalityInstrument } from './InstrumentDropdown'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

type MapView = 'yearly' | 'monthly'

interface SeasonalityRow {
    label: string
    values: (number | null)[]
}

interface ApiResponse {
    month_of_year_history: Array<{
        instrument: string
        year: number
        month: number
        month_name: string
        monthly_return_pct: number | null
    }>
    month_statistics: Array<{
        instrument: string
        month: number
        month_name: string
        average_return_pct: number | null
    }>
    month_day_averages: Array<{
        instrument: string
        month: number
        month_name: string
        day_of_month: number
        average_daily_return_pct: number | null
    }>
    day_of_month_statistics: Array<{
        instrument: string
        day_of_month: number
        average_return_pct: number | null
    }>
    metadata?: {
        analysis_year_count?: number
    }
}

function cellColor(val: number | null): string {
    if (val == null || !Number.isFinite(val)) return 'bg-[#FFFFFF0D]'

    const abs = Math.abs(val)
    if (val > 0) {
        if (abs >= 6) return 'bg-[#378F5C]'
        if (abs >= 3) return 'bg-[#378F5C80]'
        return 'bg-[#378F5C80]'
    } else {
        if (abs >= 6) return 'bg-[#773136]'
        if (abs >= 3) return 'bg-[#BC4849]'
        return 'bg-[#BC4849]'
    }
}

function formatReturn(val: number | null) {
    if (val == null || !Number.isFinite(val)) return '—'
    return val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)
}

function formatAvgCompact(val: number | null) {
    if (val == null || !Number.isFinite(val)) return '—'
    return val > 0 ? `+${val.toFixed(1)}` : val.toFixed(1)
}

export default function SeasonalityMap() {
    const [instrument, setInstrument] = useState<SeasonalityInstrument>('EURUSD')
    const [view, setView] = useState<MapView>('yearly')
    const [yearlyRows, setYearlyRows] = useState<SeasonalityRow[]>([])
    const [yearlyAvg, setYearlyAvg] = useState<(number | null)[]>([])
    const [monthlyRows, setMonthlyRows] = useState<SeasonalityRow[]>([])
    const [monthlyAvg, setMonthlyAvg] = useState<(number | null)[]>([])
    const [yearCount, setYearCount] = useState(11)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSeasonalityData() {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(
                    `/api/seasonality-data?instruments=${encodeURIComponent(instrument)}`
                )

                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))
                    throw new Error(body.details || body.error || 'Failed to fetch seasonality data')
                }

                const apiData: ApiResponse = await response.json()

                const years = [...new Set(apiData.month_of_year_history.map((d) => d.year))].sort()
                setYearlyRows(
                    years.map((year) => {
                        const yearData = apiData.month_of_year_history.filter((d) => d.year === year)
                        const values = MONTHS.map((_, monthIndex) => {
                            const monthData = yearData.find((d) => d.month === monthIndex + 1)
                            const value = monthData?.monthly_return_pct
                            return value == null || !Number.isFinite(value) ? null : value
                        })
                        return { label: year.toString(), values }
                    })
                )
                setYearlyAvg(
                    MONTHS.map((_, monthIndex) => {
                        const monthStat = apiData.month_statistics.find((d) => d.month === monthIndex + 1)
                        const value = monthStat?.average_return_pct
                        return value == null || !Number.isFinite(value) ? null : value
                    })
                )

                const dayAverages = apiData.month_day_averages || []
                setMonthlyRows(
                    MONTHS.map((monthName, monthIndex) => {
                        const monthNum = monthIndex + 1
                        const values = DAYS.map((day) => {
                            const hit = dayAverages.find(
                                (d) => d.month === monthNum && d.day_of_month === day
                            )
                            const value = hit?.average_daily_return_pct
                            return value == null || !Number.isFinite(value) ? null : value
                        })
                        return { label: monthName, values }
                    })
                )
                setMonthlyAvg(
                    DAYS.map((day) => {
                        const dayStat = (apiData.day_of_month_statistics || []).find(
                            (d) => d.day_of_month === day
                        )
                        const value = dayStat?.average_return_pct
                        return value == null || !Number.isFinite(value) ? null : value
                    })
                )

                setYearCount(apiData.metadata?.analysis_year_count || years.length || 11)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                console.error('Error fetching seasonality data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchSeasonalityData()
    }, [instrument])

    const isYearly = view === 'yearly'
    const rows = isYearly ? yearlyRows : monthlyRows
    const avgRow = isYearly ? yearlyAvg : monthlyAvg
    const columns = isYearly ? MONTHS : DAYS.map(String)
    const showBodyValues = isYearly
    const cellGap = isYearly ? '4px' : '2px'
    const bodyCellClass = isYearly
        ? 'flex-1 min-w-0 text-[11px] sm:text-[12px] leading-[14px] font-semibold py-2.5'
        : 'w-7 sm:w-8 flex-shrink-0 h-7 sm:h-8'
    const avgCellClass = isYearly
        ? 'flex-1 min-w-0 text-[11px] sm:text-[12px] leading-[14px] font-semibold py-2.5'
        : 'w-7 sm:w-8 flex-shrink-0 text-[8px] sm:text-[9px] leading-[10px] font-semibold py-1.5 flex items-center justify-center'

    return (
        <div className="mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Seasonality Map</h2>

            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-5">
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <InstrumentDropdown value={instrument} onChange={setInstrument} />
                            <p className="text-white text-[16px] leading-[19px] font-medium">
                                Seasonality • {yearCount}y
                            </p>
                            <div className="flex items-center bg-[#FFFFFF0D] p-0.5 ml-1">
                                {([
                                    { id: 'yearly' as const, label: 'Yearly' },
                                    { id: 'monthly' as const, label: 'Monthly' },
                                ]).map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setView(option.id)}
                                        className={`px-2.5 py-1 text-[11px] sm:text-[12px] leading-[14px] font-medium transition-colors ${
                                            view === option.id
                                                ? 'bg-[#88C4FF1A] text-[#88C4FF]'
                                                : 'text-white/50 hover:text-white/80'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-white/50 text-[12px] leading-[14px] font-normal mt-2">
                            {isYearly
                                ? 'Color encodes monthly return. Bottom row is the average per calendar month.'
                                : 'Color encodes average daily return by day-of-month. Avg row shows the numeric average.'}
                        </p>
                    </div>
                    <span className="text-white/50 text-[11px] sm:text-[12px] leading-[14px] font-medium flex-shrink-0">
                        {isYearly ? 'AVG % RETURN / MO' : 'AVG % RETURN / DAY'}
                    </span>
                </div>

                {loading && <div className="text-white/50 text-[12px]">Loading seasonality data...</div>}
                {error && !loading && <div className="text-red-400 text-[12px]">Error: {error}</div>}

                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <div className={isYearly ? 'min-w-[700px]' : 'inline-block min-w-max'}>
                            <div className="flex items-center mb-3" style={{ gap: cellGap }}>
                                <div className="w-12 sm:w-14 flex-shrink-0" />
                                {columns.map((col) => (
                                    <div
                                        key={col}
                                        className={`text-white/50 font-normal text-center ${
                                            isYearly
                                                ? 'flex-1 text-[12px] leading-[14px]'
                                                : 'w-7 sm:w-8 flex-shrink-0 text-[9px] sm:text-[10px] leading-[12px]'
                                        }`}
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col" style={{ gap: cellGap }}>
                                {rows.map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex items-stretch"
                                        style={{ gap: cellGap }}
                                    >
                                        <div className="w-12 sm:w-14 flex-shrink-0 text-white/50 text-[12px] leading-[14px] font-normal flex items-center">
                                            {row.label}
                                        </div>
                                        {row.values.map((val, mi) => (
                                            <div
                                                key={mi}
                                                title={`${row.label} ${columns[mi]}: ${formatReturn(val)}%`}
                                                className={`${cellColor(val)} text-white text-center ${bodyCellClass}`}
                                            >
                                                {showBodyValues ? formatReturn(val) : null}
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                <div className="flex items-stretch" style={{ gap: cellGap }}>
                                    <div className="w-12 sm:w-14 flex-shrink-0 text-[#88C4FF] text-[10px] leading-[12px] font-semibold flex items-center">
                                        avg
                                    </div>
                                    {avgRow.map((val, mi) => (
                                        <div
                                            key={mi}
                                            title={`Avg ${columns[mi]}: ${formatReturn(val)}%`}
                                            className={`${cellColor(val)} text-white text-center ${avgCellClass}`}
                                        >
                                            {isYearly ? formatReturn(val) : formatAvgCompact(val)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
