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

    const filtered = active === 'All 5' ? RELEASES
        : RELEASES.filter(r => r.tier === active)

    return (
        <div className="">
            {/* Header */}
            <div className='flex items-center justify-between gap-4 mb-4'>
                <div>
                    <h2 className="text-white text-[18px] font-medium leading-[22px]">Upcoming Releases</h2>
                    <p className="text-[#838388] text-[14px] leading-[20px]">
                        Forward-looking macro calendar with our model forecasts
                    </p>
                </div>

                <div className="flex items-center gap-1">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`px-3 h-[28px] text-[12px] font-medium border transition-colors cursor-pointer ${active === f
                                ? 'bg-[#FFFFFF0D] border-[#FFFFFF20] text-white'
                                : 'border-transparent text-[#838388] hover:text-white'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#16161F]">
                {/* Header row */}
                <div className="grid grid-cols-[140px_60px_1fr_80px_80px_80px_80px_32px] gap-x-4 px-5 py-3 border-b border-[#FFFFFF0D] bg-[#FFFFFF04]">
                    {['Date/Time', 'Cty', 'Indicator', 'Prior', 'Cons', 'Fcst', 'Tier', ''].map(h => (
                        <span key={h} className="text-[#838388] text-[11px] font-semibold uppercase tracking-wider">{h}</span>
                    ))}
                </div>

                {filtered.map((r, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[140px_60px_1fr_80px_80px_80px_80px_32px] gap-x-4 px-5 py-4 border-b border-[#FFFFFF0D] last:border-b-0 hover:bg-[#FFFFFF03] transition-colors cursor-pointer items-start"
                    >
                        {/* Date/Time */}
                        <div>
                            <p className="text-white text-[13px] font-medium">{r.date}</p>
                            <p className="text-[#838388] text-[11px]">{r.time}</p>
                        </div>

                        {/* Country */}
                        <span className="text-white text-[13px] pt-0.5">{r.country}</span>

                        {/* Indicator */}
                        <div>
                            <p className="text-white text-[13px] font-medium">{r.indicator}</p>
                            <p className="text-[#838388] text-[11px]">{r.period}</p>
                        </div>

                        {/* Prior */}
                        <div>
                            <p className="text-[#838388] text-[10px] mb-0.5">Prior</p>
                            <p className="text-white text-[13px]">{r.prior}</p>
                        </div>

                        {/* Cons */}
                        <div>
                            <p className="text-[#838388] text-[10px] mb-0.5">Cons.</p>
                            <p className="text-white text-[13px]">{r.cons}</p>
                        </div>

                        {/* Fcst */}
                        <div>
                            <p className="text-[#838388] text-[10px] mb-0.5">Forecast</p>
                            <p className="text-white text-[13px]">{r.fcst}</p>
                        </div>

                        {/* Tier */}
                        <span
                            className="text-[12px] font-semibold pt-0.5"
                            style={{ color: TIER_COLOR[r.tier] }}
                        >
                            {r.tier}
                        </span>

                        {/* Arrow */}
                        <button className="pt-1 text-[#838388] hover:text-white transition-colors cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
