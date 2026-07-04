interface Principle {
    number: string
    icon: React.ReactNode
    title: string
    description: string
}

import React from 'react'

const PRINCIPLES: Principle[] = [
    {
        number: '1',
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.04919 3.07675C6.43905 3.5647 4.45282 5.69208 4.15128 8.32272L4.13165 8.49395C3.62278 12.9334 3.62278 17.4161 4.13165 21.8555C4.44083 24.5528 6.56085 26.689 9.26274 27.0257L10.5321 27.1839C11.1506 27.261 11.4599 27.2996 11.7688 27.3318C13.9169 27.5561 16.0825 27.5561 18.2306 27.3318C18.5395 27.2996 18.8487 27.261 19.4673 27.1839L20.6 27.0428C23.3801 26.6963 25.5591 24.4938 25.8685 21.7174L25.8899 21.5249C26.384 17.0911 26.3696 12.6156 25.8468 8.18512C25.5458 5.63455 23.6167 3.57524 21.0851 3.10196L20.6814 3.02649C16.9263 2.3245 13.0731 2.3245 9.318 3.02649L9.04919 3.07675ZM8.03126 6.89807C8.3637 6.50112 8.95498 6.44882 9.35193 6.78126C10.0734 7.38547 12.0952 8.4375 15 8.4375C17.9048 8.4375 19.9266 7.38547 20.6481 6.78126C21.045 6.44882 21.6363 6.50112 21.9687 6.89807C22.3012 7.29502 22.2489 7.8863 21.8519 8.21874C20.7745 9.1211 18.3202 10.3125 15 10.3125C11.6798 10.3125 9.22553 9.1211 8.14807 8.21874C7.75112 7.8863 7.69882 7.29502 8.03126 6.89807Z" fill="white" />
            </svg>
        ),
        title: 'Radical Independence',
        description: 'No investment banking. No brokerage arm. No sponsored research. Our analysts are paid to be right, not to generate deal flow.',
    },
    {
        number: '2',
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.25 21.25C16.25 18.893 16.25 17.7145 16.9822 16.9822C17.7145 16.25 18.893 16.25 21.25 16.25H22.5C24.857 16.25 26.0355 16.25 26.7678 16.9822C27.5 17.7145 27.5 18.893 27.5 21.25C27.5 23.607 27.5 24.7855 26.7678 25.5178C26.0355 26.25 24.857 26.25 22.5 26.25H21.25C18.893 26.25 17.7145 26.25 16.9822 25.5178C16.25 24.7855 16.25 23.607 16.25 21.25Z" fill="white" />
                <path d="M17.5 3.75H12.5C7.78595 3.75 5.42893 3.75 3.96447 5.21447C2.5 6.67893 2.5 9.03595 2.5 13.75V16.25C2.5 20.964 2.5 23.3211 3.96447 24.7855C5.42893 26.25 7.78595 26.25 12.5 26.25C13.0824 26.25 13.3736 26.25 13.6034 26.1549C13.9096 26.028 14.153 25.7846 14.2799 25.4784C14.375 25.2486 14.375 24.9574 14.375 24.375V21.875C14.375 18.3395 14.375 16.5717 15.4733 15.4733C16.5717 14.375 18.3395 14.375 21.875 14.375H25C26.1858 14.375 26.7787 14.375 27.1457 14.0031C27.5128 13.6312 27.5052 13.0457 27.49 11.8747C27.4472 8.58283 27.2218 6.40075 26.0355 5.21447C24.5711 3.75 22.214 3.75 17.5 3.75Z" fill="white" />
            </svg>
        ),
        title: 'Data-First Rigor',
        description: 'Every thesis starts with data — not narrative. We process millions of data points daily across macro indicators, earnings, positioning.',
    },
    {
        number: '3',
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.33058 4.33058C2.5 6.16117 2.5 9.10744 2.5 15C2.5 20.1675 2.5 23.0692 3.73458 24.9396L24.9396 3.73458C23.0692 2.5 20.1675 2.5 15 2.5C9.10744 2.5 6.16116 2.5 4.33058 4.33058Z" fill="white" />
                <path d="M26.2654 5.06041L16.3258 15L26.2654 24.9396C27.5 23.0692 27.5 20.1675 27.5 15C27.5 9.8325 27.5 6.93083 26.2654 5.06041Z" fill="white" />
                <path d="M15 16.3258L5.06041 26.2654C6.93083 27.5 9.8325 27.5 15 27.5C20.1675 27.5 23.0692 27.5 24.9396 26.2654L15 16.3258Z" fill="white" />
            </svg>
        ),
        title: 'Clarity of View',
        description: 'We write to be understood, not to impress. Our reports cut through hedged language and equivocation to give you a clear.',
    },
]

const CorePrinciples = () => {
    return (
        <div className='px-4 sm:px-6 py-16 sm:py-20 lg:py-[170px]'>
            <div className='max-w-[1560px] mx-auto'>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 lg:mb-16 xl:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        Core Principles
                    </div>
                    <h2 className="font-normal text-[28px] sm:text-[40px] lg:text-[54px] leading-tight lg:leading-[64px] mb-4 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent max-w-[850px]">
                        Built Around Three Principles That Drive Every Decision
                    </h2>
                    <p className="text-white/60 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[32px] font-normal font-inter max-w-[770px]">
                        Three guiding principles shape our products, decisions, and trader experience across every feature, strategy, update, and innovation.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3.5 lg:gap-0 items-stretch">
                    {PRINCIPLES.map((p, i) => (
                        <React.Fragment key={p.number}>
                            {/* Card */}
                            <div className="bg-[#FFFFFF08] rounded-[20px] sm:rounded-[24px] p-6 xl:p-8 flex flex-col gap-5 relative overflow-hidden">
                                {/* Big number background */}
                                <div
                                    className="absolute right-6 xl:right-11 top-0 text-[80px] sm:text-[141px] font-bold leading-none select-none pointer-events-none bg-[linear-gradient(270deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] bg-clip-text text-transparent"
                                    aria-hidden="true"
                                >
                                    {p.number}
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 sm:w-[60px] sm:h-[60px] rounded-[12px] bg-[#FFFFFF0A] border border-[#FFFFFF1A] flex items-center justify-center flex-shrink-0 relative z-10">
                                    {p.icon}
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col gap-3">
                                    <h3 className="text-white text-[18px] sm:text-[24px] font-semibold leading-6 sm:leading-[29px]">
                                        {p.title}
                                    </h3>
                                    <p className="text-white/50 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] font-normal">
                                        {p.description}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow divider between cards */}
                            {i < PRINCIPLES.length - 1 && (
                                <div className="flex items-center justify-center lg:px-5">
                                    <div className="w-10 h-10 lg:w-[50px] lg:h-[50px] rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF1A] flex items-center justify-center flex-shrink-0">
                                        <svg className='w-5 lg:w-6 h-5 lg:h-6 lg:rotate-0 rotate-90' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5 19.5L21 12L13.5 4.5M21 12H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default CorePrinciples
