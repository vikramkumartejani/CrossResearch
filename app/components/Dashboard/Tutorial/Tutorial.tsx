'use client'

const SECTIONS = [
    {
        id: 'getting-started',
        title: 'Getting Started With BTB',
        content: [
            'Welcome to the BTB terminal. Use the sections below to learn how to set up, navigate the and integrate signals into your trading workflow.',
            'The terminal is organized into seven workspaces — Analysis, Macro, Flow & Positioning, Crypto, Intelligence, Learning and Support — each surfaces a different lens on the same regime engine.',
        ],
    },
    {
        id: 'faq',
        title: 'Frequently Asked Questions',
        content: [
            'Most onboarding questions land in three buckets: how regimes are calibrated, why your Nowcast values differ from public feeds, and how positioning levels are derived. Each is covered in detail under Data Engine Calibration.',
        ],
    },
    {
        id: 'community',
        title: 'Join Our Community',
        content: [
            'We run a small, signal-dense Discord for traders, quants and macro analysts. Drop in to compare regime calls, get changelog previews, and request features directly from the desk.',
        ],
    },
]

export default function Tutorial() {

    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 13.5C9.82843 13.5 10.5 12.8284 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8284 8.17157 13.5 9 13.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.625 4.5H15.375" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.25 7.5H15.75" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 7.5V10.5" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.25 10.5V7.5C2.25 4.67157 2.25 3.25736 3.12868 2.37868C4.00736 1.5 5.42157 1.5 8.25 1.5H9.75C12.5784 1.5 13.9927 1.5 14.8713 2.37868C15.75 3.25736 15.75 4.67157 15.75 7.5V10.5C15.75 13.3284 15.75 14.7427 14.8713 15.6213C13.9927 16.5 12.5784 16.5 9.75 16.5H8.25C5.42157 16.5 4.00736 16.5 3.12868 15.6213C2.25 14.7427 2.25 13.3284 2.25 10.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Get Started</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Quickstart</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Start Learning About How the BTB Terminal Works Within Minutes.
                </p>
            </div>

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                <div className="w-full flex flex-col items-start">

                    {/* Video placeholder */}
                    <div className='w-full h-[220px] sm:h-[320px] lg:h-[400px] bg-[#16161F] mb-6 sm:mb-8' />

                    {/* Content sections */}
                    <div className="flex flex-col gap-3 sm:gap-6 w-full max-w-[780px]">
                        {SECTIONS.map((section) => (
                            <div key={section.id} id={section.id} className='flex items-start gap-3 sm:gap-[14px]'>
                                <span className="text-[#88C4FF] text-[20px] sm:text-[26px] leading-[28px] sm:leading-[31px] font-semibold flex-shrink-0">#</span>
                                <div>
                                    <h2 className="text-white text-[18px] sm:text-[26px] leading-[24px] sm:leading-[31px] font-semibold mb-2 sm:mb-3">{section.title}</h2>
                                    <div className="flex flex-col gap-2 sm:gap-3">
                                        {section.content.map((para, i) => (
                                            <p key={i} className="text-[#838388] text-[13px] sm:text-[14px] leading-[20px] sm:leading-[21px]">{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Prev / Next navigation */}
                    <div className="w-full flex items-center justify-between mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-[#FFFFFF1A]">
                        <button className="flex items-center gap-1 text-white text-[14px] sm:text-[16px] leading-[24px] cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 5.5L8.25 11L13.75 16.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="">What Is BTB</span>
                        </button>
                        <button className="flex items-center gap-1 text-white text-[14px] sm:text-[16px] leading-[24px] cursor-pointer">
                            <span className="">Navigation The Terminal</span>
                            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.25 5.5L13.75 11L8.25 16.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
