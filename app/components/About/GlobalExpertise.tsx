import Image from 'next/image'
import React from 'react'

const GlobalExpertise = () => {
    return (
        <div className='px-4 sm:px-6 mt-16 md:mt-20 lg:mt-[114px]'>
            <div className='max-w-[1560px] mx-auto'>
                <div className="flex lg:flex-row flex-col items-center justify-between lg:gap-6 items-center">
                    {/* Left - Content */}
                    <div className='w-full lg:max-w-[615px]'>
                        <div className="mb-5 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Global Expertise
                        </div>

                        <h3 className="mb-5 text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Backed by Institutional Market Analysts
                        </h3>

                        <p className="text-white/50 text-[14px] sm:text-[18px] leading-[22px] sm:leading-[27px] font-normal mb-5 max-w-[576px]">
                            Our global analyst team monitors markets daily, delivering deeper insights, macro context, and institutional-level research.
                        </p>
                    </div>

                    {/* Right - Image card with glow */}
                    <div className="relative w-full lg:max-w-[849px]">
                        {/* Ellipse 16952 - blue glow behind world map */}
                        <div
                            aria-hidden="true"
                            className="absolute pointer-events-none hidden sm:block"
                            style={{
                                width: '833px',
                                height: '363px',
                                right: '-200px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: '#227ED9',
                                mixBlendMode: 'plus-lighter',
                                filter: 'blur(250px)',
                                zIndex: 0,
                            }}
                        />
                        <Image
                            src="/assets/world-map.svg"
                            width={849}
                            height={480}
                            alt="World Map"
                            draggable="false"
                            className="w-full h-auto relative z-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalExpertise