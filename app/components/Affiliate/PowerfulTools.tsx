const STATS = [
    { value: '50+', label: 'Trading View Indicators' },
    { value: '10k+', label: 'Active Traders' },
    { value: '55', label: 'Generic Signals' },
    { value: '1:1', label: 'Tailored Setup' },
    { value: 'Real-time', label: 'Macro Dashboard' },
]

const PowerfulTools = () => {
    return (
        <div className='px-4 sm:px-6 pt-10 pb-16 lg:py-20 xl:pt-[160px] xl:pb-[170px]'>
            <div className='max-w-[1500px] mx-auto'>
                {/* Subtitle */}
                <p className='text-center text-white/60 text-[14px] sm:text-[22px] leading-[33px] font-normal'>
                    Powerful Tools. Real Trading Edge
                </p>

                {/* Stats row */}
                <div className='mt-8 sm:mt-10 grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-x-5 gap-y-6'>
                    {STATS.map((stat, i) => (
                        <div key={i} className={`flex flex-col items-center gap-3 md:gap-5 ${i === STATS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
                            <span className='text-white font-semibold text-[40px] lg:text-[48px] xl:text-[56px] leading-tight md:leading-[62px]'>
                                {stat.value}
                            </span>
                            <span className='text-white/60 text-[14px] sm:text-[22px] leading-5 sm:leading-[33px] font-normal'>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PowerfulTools
