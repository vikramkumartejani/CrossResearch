'use client'

import { useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import { useBeliefMarkets } from './beliefMarkets'

const FILTER_TABS = ['Macro', 'Geopolitics', 'Politics', 'Markets']

const CAT_COLOR: Record<string, string> = {
    macro: 'text-[#88C4FF]',
    geopolitics: 'text-[#E8A020]',
    politics: 'text-[#A855F7]',
    markets: 'text-[#2CB37B]',
    crypto: 'text-[#2CB37B]',
    commodities: 'text-[#E8A020]',
}

export default function ProbabilityMovers() {
    const { data, loading, error } = useBeliefMarkets()
    const [activeFilter, setActiveFilter] = useState<string | null>(null)
    const movers = data?.movers || []

    const filtered = useMemo(() => {
        if (!activeFilter) return movers
        const key = activeFilter.toLowerCase()
        return movers.filter((m) => m.category === key)
    }, [movers, activeFilter])

    return (
        <div className="bg-[#16161F] flex flex-col h-full max-h-full">
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] flex-wrap gap-2 shrink-0">
                <h3 className="text-white text-[16px] leading-[20px] font-semibold">Probability movers</h3>
                <div className="flex items-center sm:gap-1">
                    <button
                        type="button"
                        onClick={() => setActiveFilter(null)}
                        className={`px-2 sm:px-3 py-1.5 text-[12px] leading-[15px] font-medium rounded transition-colors cursor-pointer ${
                            activeFilter === null ? 'bg-[#FFFFFF14] text-white' : 'text-[#838388] hover:text-white'
                        }`}
                    >
                        All
                    </button>
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
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

            <div className="flex-1 min-h-0 overflow-auto">
                {loading && <ChartLoader className="min-h-[180px]" />}
                {error && !loading && <p className="px-4 py-6 text-[#E25C3F] text-[12px]">{error}</p>}
                {!loading && !error && filtered.length === 0 && (
                    <p className="px-4 py-6 text-[#838388] text-[12px]">No movers for this filter.</p>
                )}

                {!loading && !error && filtered.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse 2xl:min-w-full min-w-[794px]">
                            <thead className="sticky top-0 bg-[#16161F] z-10">
                                <tr className="border-b border-[#FFFFFF08]">
                                    <th className="pl-4 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[38%]">
                                        EVENT / OUTCOME
                                    </th>
                                    <th className="pl-4 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[13%]">
                                        CATEGORY
                                    </th>
                                    <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[8%]">
                                        PROB
                                    </th>
                                    <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[9%]">
                                        Δ1M
                                    </th>
                                    <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[9%]">
                                        Δ1H
                                    </th>
                                    <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[9%]">
                                        Δ24H
                                    </th>
                                    <th className="px-4 py-2.5 text-left text-[#838388] text-[12px] leading-[14px] font-semibold tracking-wide w-[12%]">
                                        SHOCK
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((row) => (
                                    <tr
                                        key={row.id || row.event}
                                        className="border-b border-[#FFFFFF08] last:border-0 hover:bg-[#FFFFFF03] transition-colors"
                                    >
                                        <td className="pl-4 py-3.5 align-middle">
                                            <span className="text-white text-[13px] leading-[18px] pr-1">{row.event}</span>
                                            <span className="text-[#838388] text-[13px] leading-[17px]">{row.verdict}</span>
                                        </td>
                                        <td className="p-4 py-3.5 align-middle">
                                            <span
                                                className={`text-[13px] leading-[15px] font-medium capitalize ${
                                                    CAT_COLOR[row.category] ?? 'text-[#838388]'
                                                }`}
                                            >
                                                {row.category}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3.5 align-middle">
                                            <span className="text-white text-[13px] leading-[17px] font-semibold">
                                                {row.prob}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3.5 align-middle">
                                            <span
                                                className={`text-[13px] leading-[17px] font-semibold ${
                                                    row.d1m.startsWith('+')
                                                        ? 'text-[#2CB37B]'
                                                        : row.d1m.startsWith('-')
                                                          ? 'text-[#E25C3F]'
                                                          : 'text-[#838388]'
                                                }`}
                                            >
                                                {row.d1m}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3.5 align-middle">
                                            <span
                                                className={`text-[13px] leading-[17px] font-semibold ${
                                                    row.d1h.startsWith('+')
                                                        ? 'text-[#2CB37B]'
                                                        : row.d1h.startsWith('-')
                                                          ? 'text-[#E25C3F]'
                                                          : 'text-[#838388]'
                                                }`}
                                            >
                                                {row.d1h}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3.5 align-middle">
                                            <span
                                                className={`text-[13px] leading-[17px] font-semibold ${
                                                    row.d24h.startsWith('+')
                                                        ? 'text-[#2CB37B]'
                                                        : row.d24h.startsWith('-')
                                                          ? 'text-[#E25C3F]'
                                                          : 'text-[#838388]'
                                                }`}
                                            >
                                                {row.d24h}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 align-middle">
                                            <span
                                                className={`text-white text-[12px] font-medium px-2 py-0.5 text-center w-full inline-block ${row.shockColor}`}
                                            >
                                                {row.shockLabel}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
