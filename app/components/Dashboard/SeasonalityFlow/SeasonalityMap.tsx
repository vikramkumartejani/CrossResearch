'use client'

import { useState, useEffect } from 'react'

const TABS = ['Eurusd', 'Btc Usd', 'Aapl', 'Nvda', 'Spx', 'Gbpusd']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface SeasonalityData {
    year: string
    values: number[]
}

interface ApiResponse {
    month_of_year_history: Array<{
        instrument: string
        year: number
        month: number
        month_name: string
        monthly_return_pct: number
    }>
    month_statistics: Array<{
        instrument: string
        month: number
        month_name: string
        average_return_pct: number
    }>
}

function cellColor(val: number): string {
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

interface SeasonalityMapProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

export default function SeasonalityMap({ activeTab, onTabChange: _onTabChange }: SeasonalityMapProps) {
    const [data, setData] = useState<SeasonalityData[]>([])
    const [avgRow, setAvgRow] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSeasonalityData() {
            try {
                setLoading(true)
                setError(null)
                
                // Map tab names to instrument names
                const instrumentMap: Record<string, string> = {
                    'Eurusd': 'EURUSD',
                    'Btc Usd': 'BTCUSD',
                    'Aapl': 'AAPL',
                    'Nvda': 'NVDA',
                    'Spx': 'SP500',
                    'Gbpusd': 'GBPUSD'
                }
                
                const instrument = instrumentMap[activeTab] || 'EURUSD'
                const response = await fetch(
                    `/api/seasonality-data?instruments=${encodeURIComponent(instrument)}`
                )

                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))
                    throw new Error(body.details || body.error || 'Failed to fetch seasonality data')
                }
                
                const apiData: ApiResponse = await response.json()
                
                // Transform month_of_year_history into ROWS format
                const years = [...new Set(apiData.month_of_year_history.map(d => d.year))].sort()
                
                const rows: SeasonalityData[] = years.map(year => {
                    const yearData = apiData.month_of_year_history.filter(d => d.year === year)
                    const values = MONTHS.map((_, monthIndex) => {
                        const monthData = yearData.find(d => d.month === monthIndex + 1)
                        return monthData?.monthly_return_pct ?? 0
                    })
                    return { year: year.toString(), values }
                })
                
                // Calculate average row from month_statistics
                const avgValues = MONTHS.map((_, monthIndex) => {
                    const monthStat = apiData.month_statistics.find(d => d.month === monthIndex + 1)
                    return monthStat?.average_return_pct ?? 0
                })
                
                setData(rows)
                setAvgRow(avgValues)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                console.error('Error fetching seasonality data:', err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchSeasonalityData()
    }, [activeTab])

    if (loading) {
        return (
            <div className="mb-4 sm:mb-5">
                <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Seasonality Map</h2>
                <div className="bg-[#16161F] p-3 sm:p-4">
                    <div className="text-white/50 text-[12px]">Loading seasonality data...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mb-4 sm:mb-5">
                <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Seasonality Map</h2>
                <div className="bg-[#16161F] p-3 sm:p-4">
                    <div className="text-red-400 text-[12px]">Error: {error}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="mb-4 sm:mb-5">
            {/* Section heading */}
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Seasonality Map</h2>

            {/* Heatmap card */}
            <div className="bg-[#16161F] p-3 sm:p-4">
                {/* Card header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-5">
                    <div>
                        <p className="text-white text-[16px] leading-[19px] font-medium">
                            {activeTab} Seasonality • 11y
                        </p>
                        <p className="text-white/50 text-[12px] leading-[14px] font-normal mt-2">
                            Color encodes monthly return. Bottom row is the average per calendar month.
                        </p>
                    </div>
                    <span className="text-white/50 text-[11px] sm:text-[12px] leading-[14px] font-medium flex-shrink-0">AVG % RETURN / MO</span>
                </div>

                {/* Heatmap grid */}
                <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                        {/* Header row */}
                        <div className="flex items-center mb-3">
                            <div className="w-12 sm:w-14 flex-shrink-0" />
                            {MONTHS.map((m) => (
                                <div key={m} className="flex-1 text-white/50 text-[12px] leading-[14px] font-normal text-center">{m}</div>
                            ))}
                        </div>

                        {/* Data rows */}
                        <div className="flex flex-col" style={{ gap: '4px' }}>
                            {data.map((row) => (
                                <div key={row.year} className="flex items-stretch" style={{ gap: '4px' }}>
                                    <div className="w-12 sm:w-14 flex-shrink-0 text-white/50 text-[12px] leading-[14px] font-normal flex items-center">{row.year}</div>
                                    {row.values.map((val, mi) => (
                                        <div key={mi} className={`flex-1 ${cellColor(val)} text-white text-[11px] sm:text-[12px] leading-[14px] font-semibold text-center py-2.5`}>
                                            {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Average row */}
                            <div className="flex items-stretch" style={{ gap: '4px' }}>
                                <div className="w-12 sm:w-14 flex-shrink-0 text-[#88C4FF] text-[10px] leading-[12px] font-semibold flex items-center">avg</div>
                                {avgRow.map((val, mi) => (
                                    <div key={mi} className={`flex-1 ${cellColor(val)} text-white text-[11px] sm:text-[12px] leading-[14px] font-semibold text-center py-2.5`}>
                                        {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
