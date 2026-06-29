import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CostsDefineProfit = () => {
    return (
        <div className='px-4 sm:px-6 pb-[65px]'>
            <div className='relative max-w-[1560px] overflow-hidden mx-auto w-full flex lg:flex-row flex-col gap-10 lg:gap-4 items-center justify-between border border-[#FFFFFF0D] bg-[#FFFFFF05] rounded-[40px] sm:rounded-[60px] xl:rounded-[80px] p-6 sm:p-10 xl:px-[65px] xl:py-[77.55px]'>
                {/* Shadow */}
                <div
                    aria-hidden="true"
                    className="hidden lg:block absolute pointer-events-none"
                    style={{
                        width: "355px",
                        height: "469px",
                        left: "50px",
                        top: "-100px",
                        zIndex: 0,
                    }}
                >
                    <div className="absolute blur-[84.47px]" style={{
                        width: "270.23px", height: "423.67px",
                        left: "-221.91px", top: "-135.11px",
                        background: "#6DB7FF",
                        transform: "rotate(-56.09deg)",
                    }} />

                    <div className="absolute blur-[237.68px] sm:block hidden" style={{
                        width: "195.02px", height: "417.1px",
                        left: "-174.47px", top: "-143.26px",
                        background: "#6294FF",
                        mixBlendMode: "plus-lighter",
                        transform: "rotate(-56.09deg)",
                    }} />

                    <div className="absolute blur-[237.68px] sm:block hidden" style={{
                        width: "181.87px", height: "404.96px",
                        left: "-197.5px", top: "-98.08px",
                        background: "#0F4274",
                        mixBlendMode: "plus-lighter",
                        transform: "rotate(-56.09deg)",
                    }} />
                </div>

                <div
                    aria-hidden="true"
                    className="lg:hidden block absolute pointer-events-none"
                    style={{
                        width: "355px",
                        height: "469px",
                        right: "-470px",
                        bottom: "-440px",
                        zIndex: 0,
                    }}
                >
                    <div className="absolute blur-[84.47px]" style={{
                        width: "270.23px", height: "423.67px",
                        left: "-221.91px", top: "-135.11px",
                        background: "#6DB7FF",
                        transform: "rotate(-56.09deg)",
                    }} />

                    <div className="absolute blur-[237.68px] sm:block hidden" style={{
                        width: "195.02px", height: "417.1px",
                        left: "-174.47px", top: "-143.26px",
                        background: "#6294FF",
                        mixBlendMode: "plus-lighter",
                        transform: "rotate(-56.09deg)",
                    }} />

                    <div className="absolute blur-[237.68px] sm:block hidden" style={{
                        width: "181.87px", height: "404.96px",
                        left: "-197.5px", top: "-98.08px",
                        background: "#0F4274",
                        mixBlendMode: "plus-lighter",
                        transform: "rotate(-56.09deg)",
                    }} />
                </div>

                {/* card-dot-img overlay */}
                <div className='w-[300px] h-[220px] lg:h-[300px] absolute -bottom-10 lg:top-0 -right-10 lg:left-0'>
                    <div
                        className="absolute inset-0 opacity-40 bg-[url('/assets/card-dot-img.svg')] bg-cover"
                        style={{ backgroundSize: "250%", }}
                    />
                </div>
                
                {/* Left */}
                <div className="w-full lg:max-w-[665px] relative z-10">
                    <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        Costs Define Profit
                    </div>

                    <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[54px] leading-tight lg:leading-[59px] mt-5 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                       Costs, swaps, execution speed define success
                    </h2>

                    <p className="sm:mt-7 my-6 sm:mb-8 text-white/80 text-[16px] sm:text-[20px] leading-[22px] sm:leading-[30px] font-semibold max-w-[559px]">
                        The first edge to gain in the market, is to trade with a reputable broker with advanced services.
                    </p>

                    <Link href="/learn-more" className="bg-white inline-flex items-center gap-2.5 px-[26.5px] h-[52px] rounded-[16px] text-[14px] sm:text-[20px] font-semibold transition-all duration-200 hover:bg-white/10 text-black hover:text-white">
                        Check Criteria and Link Below
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Right */}
                <div className='w-full lg:max-w-[400px] xl:max-w-[597px] relative z-10'>
                    <Image src='/assets/costs-define-profit.svg' alt='costs-define-profit' width={597} height={525} draggable={false} className='select-none' />
                </div>

            </div>
        </div>
    )
}

export default CostsDefineProfit