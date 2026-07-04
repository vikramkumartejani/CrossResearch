interface StatCard {
    id: string
    value: string
    label: string
    hasGlow?: boolean
}

const STATS: StatCard[] = [
    {
        id: 'indicators',
        value: '50+',
        label: 'TradingView indicators',
    },
    {
        id: 'accuracy',
        value: '90%',
        label: 'Macro model accuracy',
    },
    {
        id: 'traders',
        value: '10k+',
        label: 'Active traders',
    },
    {
        id: 'modules',
        value: '16',
        label: 'Macro data modules',
    },
    {
        id: 'lagging',
        value: '14',
        label: 'Lagging data delays',
        hasGlow: true,
    },
]

export default function MarketIntelligence() {
    return (
        <div className="px-4 sm:px-6 py-16 sm:py-24 lg:py-[170px]">
            <div className="max-w-[1560px] mx-auto">
                <div className="flex lg:flex-row flex-col items-center justify-between gap-6 items-center">
                    {/* Left — Text content */}
                    <div className="w-full lg:max-w-[654px]">
                        <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Market Intelligence
                        </div>

                        <h2 className="mb-6 text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Proven Market Intelligence
                        </h2>

                        <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-inter font-normal max-w-[550px]">
                            Built for precision-driven traders, our system combines high-performance indicators, macro-level models, and real-time data infrastructure.
                        </p>
                    </div>

                    {/* Right — Stats grid */}
                    <div className="w-full lg:max-w-[550px] xl:max-w-[686px] grid grid-cols-2 gap-4">
                        {STATS.map((stat) => (
                            <div
                                key={stat.id}
                                className={`bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[16px] p-5 sm:p-6 lg:p-8 flex flex-col relative overflow-hidden ${stat.id === 'lagging' ? 'col-span-2' : ''}`}
                            >
                                <div className='flex items-start justify-between mb-4 sm:mb-5'>
                                    <h3 className="text-white text-[28px] sm:text-[40px] font-semibold leading-8 sm:leading-[44px]">
                                        {stat.value}
                                    </h3>
                                    <button className="cursor-pointer hover:opacity-80">
                                        <svg className="w-6 h-6 sm:w-[30px] sm:h-[30px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.75 21.25L21.25 8.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.75 8.75H21.25V21.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
