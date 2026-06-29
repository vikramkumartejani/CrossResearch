import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RulesDefineSuccess = () => {
    return (
        <div className='px-4 sm:px-6 pb-[65px]'>
            <div className='relative max-w-[1560px] overflow-hidden mx-auto w-full flex items-center justify-between lg:flex-row flex-col gap-10 sm:gap-4 order border-[#FFFFFF0D] bg-[#FFFFFF05] rounded-[40px] sm:rounded-[60px] xl:rounded-[80px] p-6 sm:p-10 xl:px-[65px] xl:py-[77.55px]'>
                {/* Shadow */}
                <div
                    aria-hidden="true"
                    className="lg:block hidden absolute pointer-events-none"
                    style={{
                        width: "355px",
                        height: "469px",
                        right: "50px",
                        top: "0px",
                        zIndex: 0,
                    }}
                >
                    <div className="absolute blur-[84.47px]" style={{
                        width: "270.23px", height: "423.67px",
                        right: "-221.91px", top: "-135.11px",
                        background: "#6DB7FF",
                        transform: "rotate(-56.09deg)",
                    }} />

                    <div className="absolute blur-[237.68px] sm:block hidden" style={{
                        width: "195.02px", height: "417.1px",
                        right: "-174.47px", top: "-143.26px",
                        background: "#6294FF",
                        mixBlendMode: "plus-lighter",
                        transform: "rotate(-56.09deg)",
                    }} />

                    <div className="absolute blur-[237.68px] sm:block hidden" style={{
                        width: "181.87px", height: "404.96px",
                        right: "-197.5px", top: "-98.08px",
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
                <div className='w-[300px] h-[200px] lg:h-[400px] absolute -bottom-10 lg:top-0 right-0'>
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
                        Rules Define Success
                    </div>

                    <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[54px] leading-tight lg:leading-[59px] mt-5 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Capital is the Game changer
                    </h2>

                    <p className="my-6 sm:my-7 text-white/80 text-[16px] sm:text-[20px] leading-[22px] sm:leading-[30px] font-semibold max-w-[611px]">
                        Most traders fail not because of stagey but because of limited capital and risk pressure Prop firms solve that
                    </p>

                    <ul className='mb-6 sm:mb-8 flex flex-col gap-2.5 sm:gap-5'>
                        {[
                            { prefix: 'Trade with : ', bold: '$1,000 – $200.000 Funded accounts' },
                            { prefix: 'Keep up to 90% of Profits', bold: '' },
                            { prefix: 'Scale fast without risking personal savings', bold: '' },
                        ].map((item, i) => (
                            <li key={i} className='flex items-center gap-3'>
                                <svg width="32" height="32" className='min-w-8' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3 16C3 8.82 8.82 3 16 3C23.18 3 29 8.82 29 16C29 23.18 23.18 29 16 29C8.82 29 3 23.18 3 16ZM20.8133 13.5813C20.8933 13.4747 20.9512 13.3532 20.9836 13.2239C21.0159 13.0946 21.0221 12.9602 21.0018 12.8285C20.9815 12.6968 20.935 12.5704 20.8651 12.4569C20.7953 12.3434 20.7034 12.245 20.595 12.1675C20.4866 12.09 20.3638 12.035 20.2337 12.0056C20.1037 11.9763 19.9692 11.9732 19.838 11.9966C19.7068 12.02 19.5816 12.0694 19.4697 12.1419C19.3579 12.2144 19.2616 12.3085 19.1867 12.4187L14.872 18.4587L12.7067 16.2933C12.5171 16.1167 12.2664 16.0205 12.0073 16.0251C11.7482 16.0297 11.5011 16.1346 11.3178 16.3178C11.1346 16.5011 11.0297 16.7482 11.0251 17.0073C11.0205 17.2664 11.1167 17.5171 11.2933 17.7067L14.2933 20.7067C14.396 20.8092 14.5197 20.8882 14.656 20.9382C14.7922 20.9881 14.9377 21.0078 15.0824 20.9959C15.227 20.984 15.3673 20.9407 15.4935 20.8691C15.6197 20.7975 15.7289 20.6993 15.8133 20.5813L20.8133 13.5813Z" fill="white" />
                                </svg>
                                <span className='text-white text-[14px] sm:text-[20px] leading-5 sm:leading-[24px] font-normal'>
                                    {item.prefix}
                                    {item.bold && <strong className='font-semibold'>{item.bold}</strong>}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Link href="/learn-more" className="bg-white inline-flex items-center gap-2.5 px-[26.5px] h-[52px] rounded-[16px] text-[14px] sm:text-[20px] font-semibold transition-all duration-200 hover:bg-white/10 text-black hover:text-white">
                        Check Criteria and Link Below
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Right */}
                <div className='w-full lg:max-w-[400px] xl:max-w-[597px] relative z-20'>
                    <Image src='/assets/costs-define-profit.svg' alt='costs-define-profit' width={597} height={525} draggable={false} className='select-none' />
                </div>

            </div>
        </div>
    )
}

export default RulesDefineSuccess