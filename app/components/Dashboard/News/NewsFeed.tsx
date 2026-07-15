'use client'
import { useState } from 'react'

const TABS = ['All', 'Macro', 'Crypto', 'Tech', 'Finance', 'Health', "Environment", "Travel"]

const FEATURED = {
    tag: 'Top Of The Wire',
    title: 'Fed minutes reveal divided FOMC; Powell flags "patient" approach as services CPI sticks above 4%.',
    desc: 'risk for rate markets 38% chance of June ctn vs 62% one wek ap. Front • erxi yields up on the wek: I-JSD strength bæk cn the rtvw into next CPI print.',
}

const NEWS_ITEMS = [
    {
        category: 'Macro',
        source: 'Reuters',
        time: '2m Ago',
        impact: 'High Impact',
        impactColor: 'text-[#E25C3F]',
        title: 'Fed Signals Prolonged Hold as Inflation Pressure Lingers',
        desc: 'FOMC minutes reveal a unanimous stance on keeping policy restrictive into Q2 inflation and resilient labor data',
    },
    {
        category: 'Crypto',
        source: 'Bloomberg',
        time: '4m Ago',
        impact: 'Medium Impact',
        impactColor: 'text-[#A16207]',
        title: 'Bitcoin Breaches $64K as ETF Inflows Accelerate',
        desc: 'Spot Bitcoin ETFs recorded net inflows of $810M yesterday, marking the strongest single-day demand since the January launch window.',
    },
    {
        category: 'Tech',
        source: 'TechCrunch',
        time: '10m Ago',
        impact: 'High Impact',
        impactColor: 'text-[#E25C3F]',
        title: 'Apple Unveils New Features for iOS 17',
        desc: 'The latest iOS update focuses on privacy enhancements and introduces new customization options for users.',
    },
    {
        category: 'Finance',
        source: 'CNBC',
        time: '15m Ago',
        impact: 'Low Impact',
        impactColor: 'text-[#2796FF]',
        title: 'Stock Market Rally Continues Amid Strong Earnings Reports',
        desc: 'Major indices are up 2% following positive earnings surprises from tech giants, boosting investor confidence.',
    },
    {
        category: 'Health',
        source: 'The Guardian',
        time: '30m Ago',
        impact: 'High Impact',
        impactColor: 'text-[#E25C3F]',
        title: 'New Study Links Sleep Quality to Mental Health',
        desc: 'Research shows that improved sleep patterns can significantly reduce anxiety and depression symptoms, highlighting the importance of sleep hygiene.',
    },
    {
        category: 'Environment',
        source: 'National Geographic',
        time: '45m Ago',
        impact: 'High Impact',
        impactColor: 'text-[#E25C3F]',
        title: 'New Climate Report Warns of Accelerating Global Warming',
        desc: 'The latest IPCC report indicates that without significant action, global temperatures could rise by 2 degrees Celsius by 2050, impacting biodiversity and weather patterns.',
    },
    {
        category: 'Travel',
        source: 'Forbes',
        time: '1h Ago',
        impact: 'Medium Impact',
        impactColor: 'text-[#A16207]',
        title: 'Travel Industry Sees Surge in Post-Pandemic Bookings',
        desc: 'Airlines and hotels report a 90% increase in bookings as more people feel safe to travel, indicating a strong recovery trend.',
    },
]

export default function NewsFeed() {
    const [activeTab, setActiveTab] = useState('All')

    const filtered = activeTab === 'All'
        ? NEWS_ITEMS
        : NEWS_ITEMS.filter(n => n.category === activeTab)

    return (
        <div className="flex flex-col">
            {/* Featured */}
            <div className="bg-[#16161F] p-3 sm:p-4 mb-4 sm:mb-5">
                <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] font-medium">Top Of The Wire</span>
                <h2 className="text-white text-[18px] sm:text-[34px] leading-[24px] sm:leading-[44px] font-semibold my-2 sm:my-3">{FEATURED.title}</h2>
                <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[16px] sm:leading-[24px] font-normal sm:max-w-[850px]">{FEATURED.desc}</p>
            </div>

            {/* Tabs — scrollable on mobile */}
            <div className="overflow-x-auto mb-4 sm:mb-5">
                <div className="flex items-center sm:gap-2 p-1 bg-[#16161F] border border-[#FFFFFF0D] w-fit min-w-max">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 text-[13px] sm:text-[14px] leading-[20px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab
                                    ? 'text-white bg-[#FFFFFF0D]'
                                    : 'text-[#838388] hover:text-white/70'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feed */}
            <div className="flex flex-col gap-2.5 sm:gap-4">
                {filtered.map((item, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-[#16161F] cursor-pointer">
                        {/* Top row — wraps on mobile */}
                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[20px] font-normal">{item.category}</span>
                                <span className="text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">• {item.source}</span>
                                <span className="bg-[#FFFFFF08] rounded-full px-2.5 py-1 text-white/60 text-[12px] leading-[14px] font-normal">{item.time}</span>
                            </div>
                            <span className={`text-[12px] leading-[16px] font-medium flex-shrink-0 ${item.impactColor}`}>
                                {item.impact}
                            </span>
                        </div>
                        <h3 className="text-white text-[14px] sm:text-[20px] leading-[20px] sm:leading-[24px] font-semibold mb-1.5">{item.title}</h3>
                        <p className="text-[#838388] text-[13px] sm:text-[14px] leading-[20px] sm:leading-[21px] font-normal sm:max-w-[850px]">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
