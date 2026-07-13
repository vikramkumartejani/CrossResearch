'use client'

const TABS = ['Eurusd', 'Btc Usd', 'Aapl', 'Nvda', 'Spx', 'Gbpusd']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Per-year monthly return data
const ROWS: { year: string; values: number[] }[] = [
    { year: '2017', values: [2.74, 7.96, 4.36, 9.98, 1.74, -8.23, -1.74, -2.85, 5.98, -7.47, -4.95, -8.74] },
    { year: '2018', values: [-8.23, 2.74, -1.74, 4.36, 1.74, -7.47, 9.98, -2.85, -4.95, -8.74, 7.96, 5.98] },
    { year: '2019', values: [3.47, -5.12, 6.22, -1.58, 2.90, 0.45, -9.33, 4.21, -3.56, 7.18, 6.74, 8.55] },
    { year: '2020', values: [-7.89, 3.14, 5.67, -4.29, -1.11, 8.20, -3.44, 2.88, -4.76, 6.47, 9.63, -0.55] },
    { year: '2021', values: [9.14, 1.23, -2.99, 3.80, -4.60, 0.59, 5.45, -6.60, 7.44, -3.20, 2.15, 1.22] },
    { year: '2022', values: [5.24, -6.44, 4.32, -2.10, 6.19, -4.23, -7.08, 2.58, 9.76, -1.67, 3.37, 5.45] },
    { year: '2023', values: [4.68, -2.33, 1.11, 4.75, -3.84, -1.29, 7.99, 8.45, -5.69, -9.12, -2.52, 1.77] },
    { year: '2024', values: [-5.78, -3.90, 7.24, 2.21, 0.88, -6.53, -5.44, -2.92, 1.50, -0.73, 4.92, 5.23] },
    { year: '2025', values: [2.10, -7.67, -2.63, 4.78, -1.45, 3.44, 0.94, -0.56, 6.30, 1.97, 5.05, 3.74] },
    { year: '2026', values: [-4.58, 3.75, 6.84, -5.11, 1.04, -3.27, 2.98, 7.01, 8.66, -2.34, 4.12, 0.45] },
    { year: '2027', values: [5.92, -3.26, -1.56, -6.34, 4.84, -2.77, 1.12, -2.57, 5.01, -3.81, 6.73, 7.88] },
]

// 10y average row
const AVG_ROW = MONTHS.map((_, mi) => {
    const sum = ROWS.reduce((acc, r) => acc + r.values[mi], 0)
    return parseFloat((sum / ROWS.length).toFixed(2))
})

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
    return (
        <div className="mb-5">
            {/* Section heading */}
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-4">Seasonality Map</h2>

            {/* Heatmap card */}
            <div className="bg-[#16161F] p-4">
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                        <p className="text-white text-[16px] leading-[19px] font-medium">
                            EURUSD Seasonality • 10y
                        </p>
                        <p className="text-white/50 text-[12px] leading-[14px] font-normal mt-2">
                            Color encodes monthly return. Bottom row is the 10-year average per calendar month.
                        </p>
                    </div>
                    <span className="text-white/50 text-[12px] leading-[14px] font-medium">AVG % RETURN / MO</span>
                </div>

                {/* Heatmap grid */}
                <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                        {/* Header row */}
                        <div className="flex items-center mb-3">
                            <div className="w-14 flex-shrink-0" />
                            {MONTHS.map((m) => (
                                <div key={m} className="flex-1 text-white/50 text-[12px] leading-[14px] font-normal text-center">{m}</div>
                            ))}
                        </div>

                        {/* Data rows */}
                        <div className="flex flex-col" style={{ gap: '4px' }}>
                            {ROWS.map((row) => (
                                <div key={row.year} className="flex items-stretch" style={{ gap: '4px' }}>
                                    <div className="w-14 flex-shrink-0 text-white/50 text-[12px] leading-[14px] font-normal flex items-center">{row.year}</div>
                                    {row.values.map((val, mi) => (
                                        <div key={mi} className={`flex-1 ${cellColor(val)} text-white text-[12px] leading-[14px] font-semibold text-center py-2.5`}>
                                            {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* 10y avg row */}
                            <div className="flex items-stretch" style={{ gap: '4px' }}>
                                <div className="w-14 flex-shrink-0 text-[#88C4FF] text-[10px] leading-[12px] font-semibold flex items-center">10y avg</div>
                                {AVG_ROW.map((val, mi) => (
                                    <div key={mi} className={`flex-1 ${cellColor(val)} text-white text-[12px] leading-[14px] font-semibold text-center py-2.5`}>
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
