'use client'
import { useState } from 'react'

interface Release {
    date: string
    time: string
    country: string
    indicator: string
    period: string
    prior: string
    cons: string
    fcst: string
    tier: 'High' | 'Medium' | 'Low'
}

const RELEASES: Release[] = [
    { date: '05-25', time: '08:30 ET', country: 'US', indicator: 'Core PCE Price Index', period: 'Jan 2026', prior: '0.2%', cons: '0.2%', fcst: '0.3%', tier: 'High' },
    { date: '05-25', time: '08:30 ET', country: 'US', indicator: 'ISM Manufacturing PMI', period: 'Jan 2026', prior: '0.2%', cons: '0.2%', fcst: '0.3%', tier: 'High' },
    { date: '05-26', time: '10:00 ET', country: 'US', indicator: 'New Home Sales', period: 'Jan 2026', prior: '—', cons: '—', fcst: '750K', tier: 'Medium' },
    { date: '05-25', time: '08:30 ET', country: 'US', indicator: 'Crude Oil Inventories', period: 'Jan 2026', prior: '—', cons: '—', fcst: '—', tier: 'Low' },
    { date: '05-27', time: '14:00 ET', country: 'US', indicator: 'FOMC Minutes', period: 'Mar 2026', prior: '—', cons: '—', fcst: '—', tier: 'High' },
    { date: '05-28', time: '08:30 ET', country: 'US', indicator: 'Nonfarm Payrolls', period: 'Apr 2026', prior: '228K', cons: '190K', fcst: '205K', tier: 'High' },
    { date: '05-28', time: '08:30 ET', country: 'US', indicator: 'Unemployment Rate', period: 'Apr 2026', prior: '3.9%', cons: '3.9%', fcst: '4.0%', tier: 'High' },
]

const TIER_COLOR: Record<string, string> = {
    High: '#E25C3F',
    Medium: '#F59E0B',
    Low: '#838388',
}

const FILTERS = ['All 5', 'High', 'Medium'] as const
type Filter = typeof FILTERS[number]

export default function UpcomingReleases() {
    const [active, setActive] = useState<Filter>('All 5')

    const filtered = active === 'All 5'
        ? RELEASES
        : RELEASES.filter(r => r.tier === active)

    return (
        <div className="">
            {/* Section header */}
            <div className='mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <div>
                    <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Upcoming Releases</h2>
                    <p className="text-[#838388] text-[14px] leading-[20px]">
                        Forward-looking macro calendar with our model forecasts
                    </p>
                </div>

                <div className="flex items-center gap-2 border border-[#FFFFFF0D] bg-[#FFFFFF08] p-1 self-start sm:self-auto flex-shrink-0">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`px-3 h-[28px] text-[14px] leading-[20px] transition-colors cursor-pointer ${active === f
                                ? 'bg-[#FFFFFF0D] text-white font-semibold'
                                : 'text-[#838388] hover:text-white font-normal'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Proper table */}
            <div className="border border-[#FFFFFF0D] bg-[#16161F] overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#FFFFFF0D]">
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">Date/Time</th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">Cty</th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5">Indicator</th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">Prior</th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">Cons</th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">Fcst</th>
                            <th className="text-right text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">Tier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => (
                            <tr
                                key={i}
                                className="bg-[#FFFFFF08] border-b border-[#FFFFFF0D] last:border-b-0 hover:bg-[#FFFFFF03] transition-colors cursor-pointer"
                            >
                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] font-semibold mb-1">{r.date}</p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.time}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4">
                                    <span className="text-white text-[14px] leading-[20px] font-semibold">{r.country}</span>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1 text-nowrap">{r.indicator}</p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.period}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1">Prior</p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.prior}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1">Cons.</p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.cons}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1">Forecast</p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.fcst}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <div className='flex items-center justify-end gap-2.5'>
                                        <span className="px-2 text-[12px] leading-[20px] font-medium" style={{ color: TIER_COLOR[r.tier] }}>
                                            {r.tier}
                                        </span>
                                        <button className="transition-colors cursor-pointer">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
