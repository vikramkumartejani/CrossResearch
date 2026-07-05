const STATS = [
    { value: '50+', label: 'Trading View Indicators' },
    { value: '10k+', label: 'Active Traders' },
    { value: '55', label: 'Generic Signals' },
    { value: '1:1', label: 'Tailored Setup' },
    { value: 'Real-time', label: 'Macro Dashboard' },
]

const PowerfulTools = () => {
    return (
        <div className='px-4 sm:px-6 pt-[160px] pb-[170px]'>
            <div className='max-w-[1500px] mx-auto'>
                {/* Subtitle */}
                <p className='text-center text-white/60 text-[14px] sm:text-[22px] leading-[33px] font-normal'>
                    Powerful Tools. Real Trading Edge
                </p>

                {/* Stats row */}
                <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10'>
                    {STATS.map((stat, i) => (
                        <div key={i} className='flex flex-col items-center gap-5'>
                            <span className='text-white font-semibold text-[36px] sm:text-[56px] leading-[62px]'>
                                {stat.value}
                            </span>
                            <span className='text-white/60 text-[16px] sm:text-[22px] leading-[22px] sm:leading-[33px] font-normal'>
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
