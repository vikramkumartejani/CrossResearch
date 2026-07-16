const WATCHLISTS = [
    {
        title: 'Rate Path',
        desc: 'Central-bank and inflation markets driving the front end.',
        items: [
            { title: 'Fed cuts rates at March FOMC meeting',          category: 'macro' },
            { title: 'US CPI prints above 3.5% year-over-year',      category: 'macro' },
            { title: 'ECB holds rates at next policy meeting',        category: 'macro' },
            { title: 'China GDP growth beats 5% target this quarter', category: 'macro' },
        ],
    },
    {
        title: 'Geopolitical Risk',
        desc: 'Conflict, elections and shutdown risk.',
        items: [
            { title: 'Ceasefire agreement reached in Eastern Eur...', category: 'geopolitics' },
            { title: 'Incumbent wins national election first round',   category: 'elections'   },
            { title: 'Government shutdown avoided before deadline',    category: 'politics'    },
        ],
    },
    {
        title: 'Commodities & Crypto',
        desc: 'Energy supply and digital-asset targets.',
        items: [
            { title: 'OPEC+ announces additional production cut', category: 'commodities' },
            { title: 'Bitcoin closes above $120k this month',     category: 'crypto'      },
        ],
    },
]

const CAT_COLOR: Record<string, string> = {
    macro:       'text-[#88C4FF]',
    geopolitics: 'text-[#E8A020]',
    elections:   'text-[#A855F7]',
    politics:    'text-[#E8A020]',
    commodities: 'text-[#E8A020]',
    crypto:      'text-[#2CB37B]',
}

export default function Watchlist() {
    return (
        <div className="bg-[#16161F] flex flex-col">
            {/* Header */}
            <div className="px-3 sm:px-4 py-3 border-b border-[#FFFFFF08]">
                <h3 className="text-white text-[16px] leading-[20px] font-semibold">Watchlists</h3>
                <p className="text-[#838388] text-[12px] leading-[17px] mt-1">Themed collections of events for focused monitoring.</p>
            </div>

            {/* Watchlist columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 flex-1">
                {WATCHLISTS.map((wl, i) => (
                    <div key={i} className={`p-3 sm:p-4 flex flex-col gap-2 sm:gap-4 ${i < WATCHLISTS.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-[#FFFFFF08]' : ''}`}>
                        <div>
                            <p className="text-white text-[14px] leading-[18px] font-semibold">{wl.title}</p>
                            <p className="text-[#838388] text-[12px] leading-[17px] mt-1">{wl.desc}</p>
                        </div>
                        <div className="flex flex-col gap-1 sm:gap-2">
                            {wl.items.map((item, j) => (
                                <div key={j} className="flex items-center justify-between gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                    <span className="text-[#838388] text-[12px] leading-[17px] flex-1 min-w-0 truncate">{item.title}</span>
                                    <span className={`text-[12px] leading-[14px] font-medium flex-shrink-0 ${CAT_COLOR[item.category] ?? 'text-[#838388]'}`}>
                                        {item.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[#838388] text-[12px] leading-[17px] mt-auto pt-3 border-t border-[#FFFFFF08]">
                            {wl.items.length} events tracked
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
