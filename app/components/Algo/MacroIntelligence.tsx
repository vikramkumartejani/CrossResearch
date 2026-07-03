import React from 'react'

const CARDS = [
    {
        id: 'gdp',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M7 13C7 11.3431 8.34315 10 10 10H11C12.6569 10 14 11.3431 14 13V21C14 22.6569 12.6569 24 11 24H10C8.34315 24 7 22.6569 7 21V13Z" fill="white" />
                <path d="M17 7C17 5.34315 18.3431 4 20 4H21C22.6569 4 24 5.34315 24 7V21C24 22.6569 22.6569 24 21 24H20C18.3431 24 17 22.6569 17 21V7Z" fill="white" />
            </svg>
        ),
        badge: 'Live Data',
        title: 'GDP Component Dashboard',
        description: 'GDP components visualization shows economic growth drivers clearly',
        hasGlow: false,
    },
    {
        id: 'nfp',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="2" />
                <path d="M14 8V14L18 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        badge: '90% Accuracy',
        title: 'NFP Deep Dive Module',
        description: 'Pre-release models and playbooks reveal market impact',
        hasGlow: true,
    },
    {
        id: 'central-bank',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="3" fill="white" />
                <circle cx="14" cy="6" r="2" fill="white" />
                <circle cx="14" cy="22" r="2" fill="white" />
                <circle cx="6" cy="14" r="2" fill="white" />
                <circle cx="22" cy="14" r="2" fill="white" />
            </svg>
        ),
        badge: 'FOMC Ready',
        title: 'Central Bank Tracker',
        description: 'Fed, ECB, BOJ, BOE calendars with rate probabilities and sentiment scoring matrix',
        hasGlow: false,
    },
    {
        id: 'inflation',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="4" width="20" height="20" rx="2" stroke="white" strokeWidth="2" />
                <path d="M4 12H24M12 4V24" stroke="white" strokeWidth="2" />
            </svg>
        ),
        badge: 'CPI · PCE · PPI',
        title: 'Inflation Intelligence',
        description: 'CPI PCE breakdown with inflation surprise forecasting model',
        hasGlow: false,
    },
    {
        id: 'correlation',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4V24M4 14H24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="7" cy="7" r="2" fill="white" />
                <circle cx="21" cy="7" r="2" fill="white" />
                <circle cx="7" cy="21" r="2" fill="white" />
                <circle cx="21" cy="21" r="2" fill="white" />
            </svg>
        ),
        badge: 'Real-time',
        title: 'Cross-Asset Correlation Matrix',
        description: 'Live correlation heatmaps reveal intermarket regime shifts clearly',
        hasGlow: false,
    },
    {
        id: 'research',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="6" width="20" height="16" rx="2" stroke="white" strokeWidth="2" />
                <path d="M8 11H20M8 15H20M8 19H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        badge: 'Weekly',
        title: 'Weekly Research Brief',
        description: 'Weekly macro brief with key trade setups insights',
        hasGlow: false,
    },
]

const MacroIntelligence = () => {
    return (
        <div className='px-4 sm:px-6 py-32'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Macro Intelligence
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-20">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Institutional research kept <br className='sm:block hidden' />  hidden
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-inter font-normal max-w-[511px]">
                        Real-time macro data and models unify cross-asset analysis to explain market moves clearly
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden"
                        >
                            {/* Glow overlay - only for NFP card */}
                            {card.hasGlow && (
                                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#6DB7FF] opacity-20 blur-[100px] pointer-events-none" style={{ zIndex: 0 }} />
                            )}

                            {/* Badge */}
                            <div className={`flex items-center justify-between ${card.hasGlow ? 'relative z-10' : ''}`}>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#FFFFFF0D] flex items-center justify-center">
                                    {card.icon}
                                </div>
                                <span className="text-white/40 text-[12px] sm:text-[13px] font-medium">{card.badge}</span>
                            </div>

                            {/* Content */}
                            <div className={card.hasGlow ? 'relative z-10' : ''}>
                                <h3 className="text-white text-[20px] sm:text-[24px] font-semibold leading-7 sm:leading-8 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-white/50 text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px]">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MacroIntelligence