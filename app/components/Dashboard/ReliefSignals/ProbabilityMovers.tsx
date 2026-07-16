'use client'
import { useState } from 'react'

const FILTER_TABS = ['Macro', 'Geopolitics', 'Politics', 'Markets']

const MOVERS = [
    { event: 'Fed cuts rates at March FOMC meeting',                verdict: 'Yes', category: 'macro',       prob: '72.0%', d1m: '+6.4pp', d1h: '+9.1pp',  d24h: '+14.2pp', shockLabel: 'EXTREME',   shockColor: 'bg-[#E25C3F]' },
    { event: 'Ceasefire agreement reached in Eastern Europe by Q2', verdict: 'Yes', category: 'geopolitics', prob: '38.0%', d1m: '-5.1pp', d1h: '-7.8pp',  d24h: '-11.4pp', shockLabel: 'HIGH',      shockColor: 'bg-[#E8A020]' },
    { event: 'US CPI prints above 3.5% year-over-year',            verdict: 'Yes', category: 'macro',       prob: '44.0%', d1m: '+3.9pp', d1h: '+5.2pp',  d24h: '+6.8pp',  shockLabel: 'HIGH',      shockColor: 'bg-[#E8A020]' },
    { event: 'OPEC+ announces additional production cut',          verdict: 'Yes', category: 'markets',     prob: '61.0%', d1m: '+4.2pp', d1h: '+3.1pp',  d24h: '+8.7pp',  shockLabel: 'HIGH',      shockColor: 'bg-[#E8A020]' },
    { event: 'Government shutdown avoided before deadline',        verdict: 'Yes', category: 'politics',    prob: '66.0%', d1m: '+3.2pp', d1h: '+6.7pp',  d24h: '+5.4pp',  shockLabel: 'NOTABLE',   shockColor: 'bg-[#838388]' },
    { event: 'Incumbent wins national election first round',       verdict: 'Yes', category: 'politics',    prob: '55.0%', d1m: '-2.8pp', d1h: '-4.5pp',  d24h: '-3.2pp',  shockLabel: 'NOTABLE',   shockColor: 'bg-[#838388]' },
    { event: 'Bitcoin closes above $120k this month',             verdict: 'Yes', category: 'markets',     prob: '29.0%', d1m: '+2.7pp', d1h: '+4.8pp',  d24h: '+9.3pp',  shockLabel: 'NOTABLE',   shockColor: 'bg-[#838388]' },
    { event: 'China GDP growth beats 5% target this quarter',     verdict: 'Yes', category: 'macro',       prob: '41.0%', d1m: '-3.4pp', d1h: '-2.1pp',  d24h: '-4.8pp',  shockLabel: 'NOTABLE',   shockColor: 'bg-[#838388]' },
    { event: 'Major tech antitrust ruling before year end',       verdict: 'Yes', category: 'politics',    prob: '47.0%', d1m: '+1.4pp', d1h: '+2.2pp',  d24h: '+3.9pp',  shockLabel: 'DEVELOPING', shockColor: 'bg-[#2CB37B]' },
    { event: 'ECB holds rates at next policy meeting',            verdict: 'Yes', category: 'macro',       prob: '83.0%', d1m: '-1.1pp', d1h: '-0.8pp',  d24h: '+1.6pp',  shockLabel: 'DEVELOPING', shockColor: 'bg-[#2CB37B]' },
]

const CAT_COLOR: Record<string, string> = {
    macro:       'text-[#88C4FF]',
    geopolitics: 'text-[#E8A020]',
    politics:    'text-[#A855F7]',
    markets:     'text-[#2CB37B]',
}

export default function ProbabilityMovers() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    const filtered = activeFilter
        ? MOVERS.filter(m => m.category === activeFilter.toLowerCase())
        : MOVERS

    return (
        <div className="bg-[#16161F] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] flex-wrap gap-2">
                <h3 className="text-white text-[16px] leading-[20px] font-semibold">Probability movers</h3>
                <div className="flex items-center sm:gap-1">
                    <button
                        onClick={() => setActiveFilter(null)}
                        className={`px-2 sm:px-3 py-1.5 text-[12px] leading-[15px] font-medium rounded transition-colors cursor-pointer ${
                            activeFilter === null ? 'bg-[#FFFFFF14] text-white' : 'text-[#838388] hover:text-white'
                        }`}
                    >All</button>
                    {FILTER_TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab === activeFilter ? null : tab)}
                            className={`px-3 py-1.5 text-[12px] leading-[15px] font-medium transition-colors cursor-pointer ${
                                activeFilter === tab ? 'bg-[#FFFFFF14] text-white' : 'text-[#838388] hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table — uses a real <table> so columns size correctly to available width */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse 2xl:min-w-full min-w-[794px]">
                    <thead>
                        <tr className="border-b border-[#FFFFFF08]">
                            <th className="pl-4 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[38%]">EVENT / OUTCOME</th>
                            <th className="pl-4 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[13%]">CATEGORY</th>
                            <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[8%]">PROB</th>
                            <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[9%]">Δ1M</th>
                            <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[9%]">Δ1H</th>
                            <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[9%]">Δ24H</th>
                            <th className="px-4 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold uppercase tracking-wide w-[12%]">SHOCK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-[#FFFFFF08] last:border-0 hover:bg-[#FFFFFF03] transition-colors cursor-pointer"
                            >
                                <td className="pl-4 py-3.5 align-middle">
                                    <span className="text-white text-[13px] leading-[18px] pr-1">{row.event}</span>
                                    <span className="text-[#838388] text-[13px] leading-[17px]">{row.verdict}</span>
                                </td>
                                <td className="p-4 py-3.5 align-middle">
                                    <span className={`text-[13px] leading-[15px] font-medium capitalize ${CAT_COLOR[row.category] ?? 'text-[#838388]'}`}>{row.category}</span>
                                </td>
                                <td className="px-2 py-3.5 align-middle">
                                    <span className="text-white text-[13px] leading-[17px] font-semibold">{row.prob}</span>
                                </td>
                                <td className="px-2 py-3.5 align-middle">
                                    <span className={`text-[13px] leading-[17px] font-semibold ${row.d1m.startsWith('+') ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>{row.d1m}</span>
                                </td>
                                <td className="px-2 py-3.5 align-middle">
                                    <span className={`text-[13px] leading-[17px] font-semibold ${row.d1h.startsWith('+') ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>{row.d1h}</span>
                                </td>
                                <td className="px-2 py-3.5 align-middle">
                                    <span className={`text-[13px] leading-[17px] font-semibold ${row.d24h.startsWith('+') ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>{row.d24h}</span>
                                </td>
                                <td className="px-4 py-3.5 align-middle">
                                    <span className={`text-white text-[12px] font-medium px-2 py-0.5 text-center w-full inline-block ${row.shockColor}`}>{row.shockLabel}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
