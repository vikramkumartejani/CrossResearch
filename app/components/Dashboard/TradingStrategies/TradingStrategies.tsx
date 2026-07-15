'use client'
import { useState } from 'react'

const TABS = ['Recent', 'Equities', 'Crypto', 'FX', 'Commodities']

const FEATURED = {
    category: 'Equities',
    categoryColor: 'text-[#88C4FF]',
    title: 'ODTE Gamma Squeeze Playbook',
    desc: "When dealers are short gamma into the close and ODTE dominance exceeds 40%, a measured Upside breakout creates a self-reinforcing flow. The mechanical setup explained step-by-step.",
    author: 'Seth Murphy',
    date: 'Apr 22, 2026',
}

const GRID_CARDS = [
    {
        category: 'Crypto', categoryColor: 'text-[#88C4FF]',
        title: 'BTC Mean-Reversion at Vol Extremes',
        tag: 'BTC Mean-Reversion at Vol Extremes',
        author: 'Jacob Dettore', date: 'Apr 22, 2026',
    },
    {
        category: 'Crypto', categoryColor: 'text-[#88C4FF]',
        title: 'Carry & Vol I- Long CHF/JPY Setup',
        tag: null,
        author: 'Jacob Murphy', date: 'Apr 22, 2026',
    },
    {
        category: 'Equities', categoryColor: 'text-[#88C4FF]',
        title: 'Trading the SPX Gamma Flip',
        tag: null,
        author: 'Jacob Murphy', date: 'Apr 22, 2026',
    },
    {
        category: 'Commodities', categoryColor: 'text-[#E8A020]',
        title: 'WTI Contango Reversal Trade',
        tag: null,
        author: 'Jacob Murphy', date: 'Apr 22, 2026',
    },
]

const BOTTOM_CARDS = [
    {
        category: 'Equities', categoryColor: 'text-[#88C4FF]',
        title: 'Pre-OPEX Vol Compression Playbook',
        desc: 'Long gamma regimes pin price into equity. Three filters confirm the regime, two timers time the entry, and one filter exits before VOI expansion.',
        author: 'Seth Murphy', date: 'Apr 22, 2026',
    },
    {
        category: 'Crypto', categoryColor: 'text-[#88C4FF]',
        title: 'ETF Flow Divergence as a Macro Tell',
        desc: 'Persistent positive ETF inflow alongside softening spot is a clean institutional accumulation tell. Backtested across the last six 2Q windows.',
        author: 'Seth Dettore', date: 'Apr 14, 2026',
    },
]

function SmallCard({ card }: { card: typeof GRID_CARDS[0] }) {
    return (
        <div className="bg-[#16161F] flex flex-col cursor-pointer transition-colors">
            <div className="flex-1 bg-[#FFFFFF08] min-h-[160px] sm:min-h-[199px] relative">
                {card.tag && (
                    <div className="absolute z-10 top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 rounded">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.2" />
                            <path d="M7.125 12V6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M8.25 6V4.5M10.125 6V4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M8.25 13.5V12M10.125 13.5V12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M7.125 9H10.875C11.4963 9 12 9.5037 12 10.125V10.875C12 11.4963 11.4963 12 10.875 12H6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6H10.875C11.4963 6 12 6.50368 12 7.125V7.875C12 8.4963 11.4963 9 10.875 9H7.125" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-white text-[12px] sm:text-[16px] leading-[19px] font-medium line-clamp-1">{card.tag}</span>
                    </div>
                )}
            </div>
            <div className='p-3 sm:p-4'>
                <p className="text-[12px] sm:text-[14px] leading-[17px] font-medium text-[#88C4FF]">{card.category}</p>
                <p className="2xl:pr-8 text-white text-[16px] sm:text-[18px] 2xl:text-[22px] leading-[20px] sm:leading-6 2xl:leading-[29px] font-medium mt-2 2xl:mt-3 mb-2">{card.title}</p>
                <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">By {card.author} • {card.date}</p>
            </div>
        </div>
    )
}

export default function TradingStrategies() {
    const [activeTab, setActiveTab] = useState('Recent')
    const [search, setSearch] = useState('')

    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.125 9C16.125 12.935 12.935 16.125 9 16.125C7.77893 16.125 6.62955 15.8178 5.625 15.2765C4.22383 14.5215 3.28097 15.2234 2.44944 15.3494C2.3233 15.3685 2.19768 15.3227 2.10748 15.2325C1.97056 15.0956 1.9445 14.8838 2.02013 14.7056C2.34649 13.9364 2.64615 12.4787 2.23756 11.25C2.00235 10.5428 1.875 9.78623 1.875 9C1.875 5.06497 5.06497 1.875 9 1.875C12.935 1.875 16.125 5.06497 16.125 9Z" stroke="#838388" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.09427 9H9.00052M6.09375 9H6M12.0937 9H12M9.18802 9C9.18802 9.10358 9.1041 9.1875 9.00052 9.1875C8.89702 9.1875 8.81302 9.10358 8.81302 9C8.81302 8.89643 8.89702 8.8125 9.00052 8.8125C9.1041 8.8125 9.18802 8.89643 9.18802 9ZM6.1875 9C6.1875 9.10358 6.10355 9.1875 6 9.1875C5.89645 9.1875 5.8125 9.10358 5.8125 9C5.8125 8.89643 5.89645 8.8125 6 8.8125C6.10355 8.8125 6.1875 8.89643 6.1875 9ZM12.1875 9C12.1875 9.10358 12.1036 9.1875 12 9.1875C11.8964 9.1875 11.8125 9.10358 11.8125 9C11.8125 8.89643 11.8964 8.8125 12 8.8125C12.1036 8.8125 12.1875 8.89643 12.1875 9Z" stroke="#838388" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Trading Strategies</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Playbooks</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Open a new ticket, track conversations with the support desk, and search your historical Requests.
                </p>
            </div>

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                {/* Tabs + Search */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {/* Tabs — scrollable on mobile */}
                    <div className="overflow-x-auto">
                        <div className="flex items-center sm:gap-2 p-1 bg-[#16161F] w-fit border border-[#FFFFFF0D] min-w-max">
                            {TABS.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 text-[13px] sm:text-[14px] leading-[20px] transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab ? 'text-white bg-[#FFFFFF0D] font-semibold' : 'font-normal text-[#838388] hover:text-white/70'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-1.5 bg-[#16161F] border border-[#FFFFFF0D] px-3 py-[9px]">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <path d="M12.75 12.75L15.75 15.75" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25Z" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search Strategies"
                            className="bg-transparent text-white text-[12px] leading-[17px] placeholder:text-[#838388] outline-none w-full"
                        />
                    </div>
                </div>

                {/* Row 1: Featured + 2×2 grid */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {/* Featured card */}
                    <div className="bg-[#16161F] p-0 sm:p-5 flex flex-col gap-0 sm:gap-5 cursor-pointer transition-colors">
                        <div className="flex-1 bg-[#FFFFFF08] min-h-[160px] sm:min-h-[220px] xl:min-h-[481px]" />
                        <div className='p-3 sm:p-0'>
                            <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">{FEATURED.category}</span>
                            <h2 className="text-white text-[16px] lg:text-[20px] 2xl:text-[32px] leading-5 lg:leading-[24px] 2xl:leading-[38px] font-semibold my-2 sm:my-4">{FEATURED.title}</h2>
                            <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] mb-3 sm:mb-4">{FEATURED.desc}</p>
                            <p className="text-[#838388] text-[12px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal">By {FEATURED.author} • {FEATURED.date}</p>
                        </div>
                    </div>

                    {/* 2×2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {GRID_CARDS.map((card, i) => (
                            <SmallCard key={i} card={card} />
                        ))}
                    </div>
                </div>

                {/* Row 2: bottom cards */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4">
                    {BOTTOM_CARDS.map((card, i) => (
                        <div key={i} className="bg-[#16161F] p-3 sm:p-4 cursor-pointer transition-colors">
                            <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">{card.category}</span>
                            <h3 className="text-white text-[16px] lg:text-[20px] 2xl:text-[32px] leading-5 lg:leading-[24px] 2xl:leading-[38px] font-semibold my-2 sm:my-3">{card.title}</h3>
                            <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] font-normal mb-2 sm:mb-3">{card.desc}</p>
                            <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[22px]">By {card.author} • {card.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
