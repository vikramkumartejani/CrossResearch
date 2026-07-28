'use client'

import { useBeliefMarkets } from './beliefMarkets'

const CAT_COLOR: Record<string, string> = {
    macro: 'text-[#88C4FF]',
    geopolitics: 'text-[#E8A020]',
    elections: 'text-[#A855F7]',
    politics: 'text-[#E8A020]',
    commodities: 'text-[#E8A020]',
    crypto: 'text-[#2CB37B]',
    markets: 'text-[#2CB37B]',
}

export default function Watchlist() {
    const { data, loading, error } = useBeliefMarkets()
    const watchlists = data?.watchlists || []

    return (
        <div className="bg-[#16161F] flex flex-col">
            <div className="px-3 sm:px-4 py-3 border-b border-[#FFFFFF08]">
                <h3 className="text-white text-[16px] leading-[20px] font-semibold">Watchlists</h3>
                <p className="text-[#838388] text-[12px] leading-[17px] mt-1">
                    Themed collections of events for focused monitoring.
                </p>
            </div>

            {loading && <p className="px-4 py-6 text-[#838388] text-[12px]">Loading watchlists…</p>}
            {error && !loading && <p className="px-4 py-6 text-[#E25C3F] text-[12px]">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-3 flex-1">
                    {watchlists.map((wl, i) => (
                        <div
                            key={wl.title}
                            className={`p-3 sm:p-4 flex flex-col gap-2 sm:gap-4 ${
                                i < watchlists.length - 1
                                    ? 'border-b sm:border-b-0 sm:border-r border-[#FFFFFF08]'
                                    : ''
                            }`}
                        >
                            <div>
                                <p className="text-white text-[14px] leading-[18px] font-semibold">{wl.title}</p>
                                <p className="text-[#838388] text-[12px] leading-[17px] mt-1">{wl.desc}</p>
                            </div>
                            <div className="flex flex-col gap-1 sm:gap-2">
                                {wl.items.length === 0 && (
                                    <p className="text-[#838388] text-[12px]">No live events in this theme.</p>
                                )}
                                {wl.items.map((item, j) => (
                                    <div
                                        key={`${item.title}-${j}`}
                                        className="flex items-center justify-between gap-3"
                                    >
                                        <span className="text-[#838388] text-[12px] leading-[17px] flex-1 min-w-0 truncate">
                                            {item.title}
                                        </span>
                                        <span
                                            className={`text-[12px] leading-[14px] font-medium flex-shrink-0 ${
                                                CAT_COLOR[item.category] ?? 'text-[#838388]'
                                            }`}
                                        >
                                            {item.category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[#838388] text-[12px] leading-[17px] mt-auto pt-3 border-t border-[#FFFFFF08]">
                                {wl.count} events tracked
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
