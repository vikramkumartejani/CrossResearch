import React from 'react'

const TopRatedBrokers = () => {
    return (
        <div className='px-4 sm:px-6 pt-[65px] pb-[170px]'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Top Rated Brokers
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-16">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                       Summary of <br className='sm:block hidden' /> the Best Brokers
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] font-inter leading-5 sm:leading-[32px] font-normal max-w-[516px]">
                        Compare top brokers with low fees, strong regulation, and reliable trading platforms.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TopRatedBrokers