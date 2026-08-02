'use client'
import { useMemo, useState } from 'react'

const TABS = ['Recent', 'Macro', 'Technical', 'Psychology', 'All'] as const
type Tab = (typeof TABS)[number]
type Topic = 'Macro' | 'Technical' | 'Psychology'
type Level = 'Beginner' | 'Advanced'

type Article = {
    topic: Topic
    level: Level
    title: string
    desc?: string
    author: string
    date: string
}

function topicLabel(article: Pick<Article, 'topic' | 'level'>) {
    return `${article.topic} • ${article.level}`
}

const FEATURED: Article = {
    topic: 'Technical',
    level: 'Beginner',
    title: 'BTB Quant Update: Integrated Charts Are Here',
    desc: "The biggest challenge with curating macro signals has never been finding data — it's been keeping every chart on the same screen, calibrated to the same regime.",
    author: 'Jacob Denbrock',
    date: 'Apr 22, 2026',
}

const GRID_CARDS: Article[] = [
    {
        topic: 'Technical',
        level: 'Beginner',
        title: 'BTB Quant Update: Integrated Charts Are Here',
        author: 'Jacob Denbrock',
        date: 'Apr 22, 2026',
    },
    {
        topic: 'Macro',
        level: 'Beginner',
        title: 'Central Banking 101: How Policy Drives Markets',
        author: 'Jacob Denbrock',
        date: 'Apr 22, 2026',
    },
    {
        topic: 'Macro',
        level: 'Advanced',
        title: 'Bitcoin and the Ripple Effect on Risk Assets',
        author: 'Jacob Denbrock',
        date: 'Apr 22, 2026',
    },
    {
        topic: 'Psychology',
        level: 'Beginner',
        title: 'Central Banking 101 Liquidity Plumbing',
        author: 'Jacob Dettore',
        date: 'Apr 22, 2026',
    },
]

const BOTTOM_CARDS: Article[] = [
    {
        topic: 'Technical',
        level: 'Advanced',
        title: 'BTB Quant Update: Integrated Charts Here',
        desc: "The biggest challenge with curating macro signals has never been finding data — it's been keeping every chart on the same screen, calibrated to the same regime.",
        author: 'Jacob Denbrock',
        date: 'Apr 22, 2026',
    },
    {
        topic: 'Psychology',
        level: 'Advanced',
        title: 'How To Read The Dealer Positioning Tape',
        desc: "Gamma flips, VOI triggers and put walls are the three levels that drive 80% of intraday mechanics. Here's how to spot them at a glance.",
        author: 'Seth Dettore',
        date: 'Apr 14, 2026',
    },
]

function matchesTab(article: Article, tab: Tab) {
    if (tab === 'Recent' || tab === 'All') return true
    return article.topic === tab
}

function matchesSearch(article: Article, search: string) {
    const q = search.trim().toLowerCase()
    if (!q) return true
    return [article.title, article.desc, article.author, article.topic, article.level]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
}

function SmallCard({ card }: { card: Article }) {
    return (
        <div className="bg-[#16161F] flex flex-col cursor-pointer transition-colors">
            <div className="flex-1 bg-[#FFFFFF08] min-h-[160px] sm:min-h-[199px]" />
            <div className="p-3 sm:p-4">
                <p className="text-[12px] sm:text-[14px] leading-[17px] font-medium text-[#88C4FF]">
                    {topicLabel(card)}
                </p>
                <p className="2xl:pr-10 text-white text-[16px] sm:text-[18px] 2xl:text-[22px] leading-[20px] sm:leading-6 2xl:leading-[29px] font-medium mt-2 2xl:mt-3 mb-2">
                    {card.title}
                </p>
                <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">
                    By {card.author} • {card.date}
                </p>
            </div>
        </div>
    )
}

export default function EducationCenter() {
    const [activeTab, setActiveTab] = useState<Tab>('Recent')
    const [search, setSearch] = useState('')

    const gridCards = useMemo(
        () => GRID_CARDS.filter((c) => matchesTab(c, activeTab) && matchesSearch(c, search)),
        [activeTab, search]
    )
    const bottomCards = useMemo(
        () => BOTTOM_CARDS.filter((c) => matchesTab(c, activeTab) && matchesSearch(c, search)),
        [activeTab, search]
    )
    const showFeatured =
        matchesTab(FEATURED, activeTab) && matchesSearch(FEATURED, search)

    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
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
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Library</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Open a new ticket, track conversations with the support desk, and search your historical Requests.
                </p>
            </div>

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                {/* Tabs + Search — stacked on mobile */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {/* Tabs — scrollable on mobile */}
                    <div className="overflow-x-auto">
                        <div className="flex items-center sm:gap-2 p-1 bg-[#16161F] w-fit border border-[#FFFFFF0D] min-w-max">
                            {TABS.map((tab) => (
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
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Strategies"
                            className="bg-transparent text-white text-[12px] leading-[17px] placeholder:text-[#838388] outline-none w-full"
                        />
                    </div>
                </div>

                {/* Row 1: Featured (top on mobile, left on desktop) + 2×2 grid */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {/* Featured card */}
                    {showFeatured ? (
                        <div className="bg-[#16161F] sm:p-5 flex flex-col gap-0 sm:gap-5 cursor-pointer transition-colors">
                            <div className="flex-1 bg-[#FFFFFF08] min-h-[160px] sm:min-h-[220px] xl:min-h-[481px]" />
                            <div className="p-3 sm:p-0">
                                <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">
                                    {topicLabel(FEATURED)}
                                </span>
                                <h2 className="text-white text-[16px] lg:text-[20px] 2xl:text-[32px] leading-5 lg:leading-[24px] 2xl:leading-[38px] font-semibold my-2 sm:my-4">
                                    {FEATURED.title}
                                </h2>
                                <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] mb-3 sm:mb-4">
                                    {FEATURED.desc}
                                </p>
                                <p className="text-[#838388] text-[12px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal">
                                    By {FEATURED.author} • {FEATURED.date}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden xl:block" />
                    )}

                    {/* 2×2 grid — stays 2 cols even on mobile since cards are compact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {gridCards.map((card, i) => (
                            <SmallCard key={`${card.title}-${i}`} card={card} />
                        ))}
                    </div>
                </div>

                {/* Row 2: bottom cards */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4">
                    {bottomCards.map((card, i) => (
                        <div key={`${card.title}-${i}`} className="bg-[#16161F] p-3 sm:p-4 cursor-pointer transition-colors">
                            <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">
                                {topicLabel(card)}
                            </span>
                            <h3 className="text-white text-[16px] lg:text-[20px] 2xl:text-[32px] leading-5 lg:leading-[24px] 2xl:leading-[38px] font-semibold my-2 sm:my-3">
                                {card.title}
                            </h3>
                            <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] font-normal mb-2 sm:mb-3">
                                {card.desc}
                            </p>
                            <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[22px]">
                                By {card.author} • {card.date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
