'use client'
import { useState } from 'react'

const TABS = ['Recent', 'Strategies & Tips', 'Product Updates', 'Education']

const FEATURED = {
    category: 'Product Update',
    categoryColor: 'text-[#88C4FF]',
    title: 'BTB Quant Update: Integrated Charts Are Here',
    desc: "The biggest challenge with curating macro signals has never been finding data — it's been keeping every chart on the same screen, calibrated to the same regime.",
    author: 'Jacob Denbrock',
    date: 'Apr 22, 2026',
}

const GRID_CARDS = [
    { category: 'Product Updates', categoryColor: 'text-[#88C4FF]', title: 'BTB Quant Update: Integrated Charts Are Here', author: 'Jacob Denbrock', date: 'Apr 22, 2026' },
    { category: 'Product Updates', categoryColor: 'text-[#88C4FF]', title: 'Central Banking 101: How Policy Drives Markets', author: 'Jacob Denbrock', date: 'Apr 22, 2026' },
    { category: 'Product Updates', categoryColor: 'text-[#88C4FF]', title: 'Bitcoin and the Ripple Effect on Risk Assets', author: 'Jacob Denbrock', date: 'Apr 22, 2026' },
    { category: 'Commodities', categoryColor: 'text-[#E8A020]', title: 'Central Banking 101 Liquidity Plumbing', author: 'Jacob Dettore', date: 'Apr 22, 2026' },
]

const BOTTOM_CARDS = [
    {
        category: 'Product Updates', categoryColor: 'text-[#88C4FF]',
        title: 'BTB Quant Update: Integrated Charts Here',
        desc: "The biggest challenge with curating macro signals has never been finding data — it's been keeping every chart on the same screen, calibrated to the same regime.",
        author: 'Jacob Denbrock', date: 'Apr 22, 2026',
    },
    {
        category: 'Education', categoryColor: 'text-[#2CB37B]',
        title: 'How To Read The Dealer Positioning Tape',
        desc: 'Gamma flips, VOI triggers and put walls are the three levels that drive 80% of intraday mechanics. Here\'s how to spot them at a glance.',
        author: 'Seth Dettore', date: 'Apr 14, 2026',
    },
]

function SmallCard({ card }: { card: typeof GRID_CARDS[0] }) {
    return (
        <div className="bg-[#16161F] flex flex-col cursor-pointer transition-colors">
            <div className="flex-1 bg-[#FFFFFF08] min-h-[199px]" />
            <div className='p-4'> 
                <p className={`text-[14px] leading-[17px] font-medium text-[#88C4FF]`}>{card.category}</p>
                <p className="text-white text-[22px] leading-[29px] font-medium mt-3 mb-2 xl:pr-8">{card.title}</p>
                <p className="text-[#838388] text-[14px] leading-[20px] font-normal">By {card.author} • {card.date}</p>
            </div>
        </div>
    )
}

export default function EducationCenter() {
    const [activeTab, setActiveTab] = useState('Recent')
    const [search, setSearch] = useState('')

    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 13.5C9.82843 13.5 10.5 12.8284 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8284 8.17157 13.5 9 13.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.625 4.5H15.375" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.25 7.5H15.75" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 7.5V10.5" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.25 10.5V7.5C2.25 4.67157 2.25 3.25736 3.12868 2.37868C4.00736 1.5 5.42157 1.5 8.25 1.5H9.75C12.5784 1.5 13.9927 1.5 14.8713 2.37868C15.75 3.25736 15.75 4.67157 15.75 7.5V10.5C15.75 13.3284 15.75 14.7427 14.8713 15.6213C13.9927 16.5 12.5784 16.5 9.75 16.5H8.25C5.42157 16.5 4.00736 16.5 3.12868 15.6213C2.25 14.7427 2.25 13.3284 2.25 10.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Education Center</span>
                </div>
                <h1 className="text-white text-[35px] font-medium leading-[42px] mb-2">Library</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Open a new ticket, track conversations with the support desk, and search your historical Requests.
                </p>
            </div>

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                {/* Tabs + Search */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_724px] gap-4 mb-5">
                    <div className="flex items-center gap-2 p-1 bg-[#16161F] w-fit border border-[#FFFFFF0D]">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 text-[14px] leading-[20px] transition-colors cursor-pointer ${activeTab === tab ? 'text-white bg-[#FFFFFF0D] font-semibold' : 'font-normal text-[#838388] hover:text-white/70'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#16161F] border border-[#FFFFFF0D] px-3 py-[9px] max-w-full">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                {/* Row 1: Featured (left) + 2x2 grid (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_724px] gap-4 mb-4">
                    {/* Featured card */}
                    <div className="bg-[#16161F] p-5 flex flex-col gap-5 cursor-pointer transition-colors">
                        <div className="flex-1 bg-[#FFFFFF08] min-h-[481px]" />
                        <div className="">
                            <span className={`text-[16px] leading-[19px] font-medium text-[#88C4FF]`}>{FEATURED.category}</span>
                            <h2 className="text-white text-[32px] leading-[38px] font-semibold my-4">{FEATURED.title}</h2>
                            <p className="text-[#838388] text-[16px] leading-[24px] mb-4">{FEATURED.desc}</p>
                            <p className="text-[#838388] text-[16px] leading-[22px] font-normal">By {FEATURED.author} • {FEATURED.date}</p>
                        </div>
                    </div>

                    {/* 2×2 grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {GRID_CARDS.map((card, i) => (
                            <SmallCard key={i} card={card} />
                        ))}
                    </div>
                </div>

                {/* Row 2: two half-width cards */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_724px] gap-4">
                    {BOTTOM_CARDS.map((card, i) => (
                        <div key={i} className="bg-[#16161F] p-4 cursor-pointer transition-colors">
                            <span className={`text-[16px] leading-[19px] font-medium text-[#88C4FF]`}>{card.category}</span>
                            <h3 className="text-white text-[32px] leading-[38px] font-semibold my-3">{card.title}</h3>
                            <p className="text-[#838388] text-[16px] leading-[24px] font-normal mb-3">{card.desc}</p>
                            <p className="text-[#838388] text-[16px] leading-[22px]">By {card.author} • {card.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
