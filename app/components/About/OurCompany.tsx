interface Stat {
    value: string
    label: string
}

const STATS: Stat[] = [
    { value: '25K+', label: 'Active Members' },
    { value: '2021', label: 'Founded' },
    { value: '120+', label: 'Algos & Modules' },
    { value: '40+', label: 'Markets Covered' },
    { value: '1M +', label: 'Data Points / Day' },
    { value: '100%', label: 'Customer – Funded' },
]

const OurCompany = () => {
    return (
        <div className='px-4 sm:px-6 pt-14 md:pt-16 lg:pt-24'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Our Company
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-4 lg:gap-10 mb-10 lg:mb-16 xl:mb-20">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] tracking-[-1.5px] leading-tight xl:leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        CrossResearch built for trader-first transparency advantage
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[480px]">
                        <span className='text-white font-semibold'>CrossResearch</span> is built entirely for traders ensuring transparent data and true market advantage
                    </p>
                </div>

                {/* Stats card */}
                <div className="relative bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] px-6 sm:px-12 xl:px-[60px] py-6 sm:py-14 xl:py-20 overflow-hidden">

                    {/* Right-top glow */}
                    <div aria-hidden="true" className="absolute pointer-events-none right-[-80px] sm:right-[-40px] top-[-80px] sm:top-[-60px]" style={{
                        width: '113.73px', height: '178.3px',
                        background: '#6DB7FF',
                        filter: 'blur(35.55px)',
                        transform: 'rotate(-63.99deg)',
                        zIndex: 0,
                    }} />
                    <div aria-hidden="true" className="absolute pointer-events-none" style={{
                        width: '82.07px', height: '175.54px',
                        right: '-4px', top: '-39px',
                        background: '#6294FF',
                        mixBlendMode: 'plus-lighter',
                        filter: 'blur(100.03px)',
                        transform: 'rotate(-63.99deg)',
                        zIndex: 0,
                    }} />
                    <div aria-hidden="true" className="absolute pointer-events-none" style={{
                        width: '76.54px', height: '170.43px',
                        right: '-12px', top: '-18px',
                        background: '#0F4274',
                        mixBlendMode: 'plus-lighter',
                        filter: 'blur(100.03px)',
                        transform: 'rotate(-63.99deg)',
                        zIndex: 0,
                    }} />
                    <div className='w-[180px] h-[220px] lg:h-[350px] absolute bottom-0 lg:top-0 right-0 z-10'>
                        <div
                            className="absolute inset-0 opacity-20 cr-dots"
                        />
                    </div>

                    {/* Stats grid */}
                    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-y-6 sm:gap-y-8 xl:flex xl:items-center xl:justify-between">
                        {STATS.map((stat, i) => (
                            <div key={i} className="flex items-center gap-6 2xl:gap-[62px]">
                                <div className="flex flex-col gap-1 sm:gap-3">
                                    <span className="text-white text-[28px] sm:text-[32px] lg:text-[40px] font-semibold leading-8 sm:leading-[44px]">
                                        {stat.value}
                                    </span>
                                    <span className="text-white/60 text-[14px] sm:text-[16px] lg:text-[18px] leading-5 sm:leading-[27px] font-normal">
                                        {stat.label}
                                    </span>
                                </div>
                                {i < STATS.length - 1 && (
                                    <svg className="mr-6 hidden xl:block flex-shrink-0" width="1" height="61" viewBox="0 0 1 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.5" y1="0.5" x2="0.499997" y2="60.5" stroke="url(#svgDivider)" strokeLinecap="round"/>
                                        <defs>
                                            <linearGradient id="svgDivider" x1="-0.5" y1="-2.18557e-08" x2="-0.500003" y2="61" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="white" stopOpacity="0"/>
                                                <stop offset="0.5" stopColor="white" stopOpacity="0.2"/>
                                                <stop offset="1" stopColor="white" stopOpacity="0"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OurCompany
