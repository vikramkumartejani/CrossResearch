import React from 'react'

interface Feature {
    id: string
    icon: React.ReactNode
    title: string
    description: string
}

const FEATURES: Feature[] = [
    {
        id: 'alerts',
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4397 25.3023C11.4911 26.6388 13.1427 27.5 15 27.5C16.8573 27.5 18.5089 26.6388 19.5603 25.3023C16.533 25.7125 13.467 25.7125 10.4397 25.3023Z" fill="#88C4FF" />
                <path d="M23.4364 11.25V12.1301C23.4364 13.1864 23.7379 14.219 24.3028 15.0978L25.687 17.2514C26.9515 19.2186 25.9862 21.8924 23.787 22.5144C18.0341 24.1418 11.9659 24.1418 6.21295 22.5144C4.01381 21.8924 3.04853 19.2186 4.31295 17.2514L5.69725 15.0978C6.26215 14.219 6.56359 13.1864 6.56359 12.1301V11.25C6.56359 6.41751 10.3407 2.5 15 2.5C19.6593 2.5 23.4364 6.41751 23.4364 11.25Z" fill="#88C4FF" />
            </svg>
        ),
        title: 'Real - Time Market Data and Alerts',
        description: 'Stay updated with live market data and instant alerts',
    },
    {
        id: 'charting',
        icon: (
            <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.42797 15.8745V24.8154C7.42797 25.1129 7.18891 25.3467 6.89672 25.3467H5.18078V27.8117C5.18078 28.1039 4.94172 28.3429 4.64953 28.3429C4.35734 28.3429 4.11828 28.1039 4.11828 27.8117V25.3467H2.40234C2.11016 25.3467 1.87109 25.1129 1.87109 24.8154V15.8745C1.87109 15.5823 2.11016 15.3432 2.40234 15.3432H4.11828V10.2061C4.11828 9.90855 4.35734 9.6748 4.64953 9.6748C4.94172 9.6748 5.18078 9.90855 5.18078 10.2061V15.3432H6.89672C7.18891 15.3432 7.42797 15.5823 7.42797 15.8745Z" fill="#24D197" />
                <path d="M16.1291 12.5274V23.4818C16.1291 23.7739 15.8901 24.013 15.5979 24.013H13.882V26.4727C13.882 26.7649 13.6429 27.0039 13.3507 27.0039C13.058 27.0039 12.8195 26.7649 12.8195 26.4727V24.013H11.1035C10.806 24.013 10.5723 23.7739 10.5723 23.4818V12.5274C10.5723 12.2352 10.806 11.9961 11.1035 11.9961H12.8195V7.52832C12.8195 7.23613 13.058 6.99707 13.3507 6.99707C13.6429 6.99707 13.882 7.23613 13.882 7.52832V11.9961H15.5974C15.8901 11.9961 16.1291 12.2352 16.1291 12.5274Z" fill="#24D197" />
                <path d="M24.8317 7.17746V22.1428C24.8317 22.435 24.5927 22.674 24.3005 22.674H22.5845V25.1337C22.5845 25.4259 22.3455 25.665 22.0533 25.665C21.7552 25.665 21.522 25.4259 21.522 25.1337V22.674H19.8008C19.5086 22.674 19.2695 22.435 19.2695 22.1428V7.17746C19.2695 6.87996 19.5086 6.64621 19.8008 6.64621H21.522V4.85059C21.522 4.5584 21.7552 4.31934 22.0533 4.31934C22.3455 4.31934 22.5845 4.5584 22.5845 4.85059V6.64621H24.3005C24.5927 6.64621 24.8317 6.87996 24.8317 7.17746Z" fill="#24D197" />
            </svg>
        ),
        title: 'Advanced charting and technical indicators',
        description: 'Use advanced charts and 100+ indicators for in-depth analysis.',
    },
    {
        id: 'timing',
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15 27.5C21.2132 27.5 26.25 22.4632 26.25 16.25C26.25 10.0368 21.2132 5 15 5C8.7868 5 3.75 10.0368 3.75 16.25C3.75 22.4632 8.7868 27.5 15 27.5ZM15 10.3125C15.5178 10.3125 15.9375 10.7322 15.9375 11.25V16.25C15.9375 16.7678 15.5178 17.1875 15 17.1875C14.4822 17.1875 14.0625 16.7678 14.0625 16.25V11.25C14.0625 10.7322 14.4822 10.3125 15 10.3125Z" fill="#A288FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.5625 2.5C11.5625 1.98223 11.9822 1.5625 12.5 1.5625H17.5C18.0178 1.5625 18.4375 1.98223 18.4375 2.5C18.4375 3.01777 18.0178 3.4375 17.5 3.4375H12.5C11.9822 3.4375 11.5625 3.01777 11.5625 2.5Z" fill="#A288FF" />
            </svg>
        ),
        title: 'Multi-timeframe analysis for better timing',
        description: 'Analyze multiple timeframes and make smarter trading decisions.',
    },
    {
        id: 'tradingview',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.294 7.43666L14.097 9.66666C14.989 12.1417 16.938 14.0907 19.413 14.9827L21.643 15.7857C21.844 15.8587 21.844 16.1437 21.643 16.2157L19.413 17.0187C16.938 17.9107 14.989 19.8597 14.097 22.3347L13.294 24.5647C13.221 24.7657 12.936 24.7657 12.864 24.5647L12.061 22.3347C11.169 19.8597 9.22001 17.9107 6.74501 17.0187L4.51501 16.2157C4.31401 16.1427 4.31401 15.8577 4.51501 15.7857L6.74501 14.9827C9.22001 14.0907 11.169 12.1417 12.061 9.66666L12.864 7.43666C12.936 7.23466 13.221 7.23466 13.294 7.43666Z" fill="#88FBFF" />
                <path d="M23.3321 2.07725L23.7391 3.20625C24.1911 4.45925 25.1781 5.44625 26.4311 5.89825L27.5601 6.30525C27.6621 6.34225 27.6621 6.48625 27.5601 6.52325L26.4311 6.93025C25.1781 7.38225 24.1911 8.36925 23.7391 9.62225L23.3321 10.7513C23.2951 10.8533 23.1511 10.8533 23.1141 10.7513L22.7071 9.62225C22.2551 8.36925 21.2681 7.38225 20.0151 6.93025L18.8861 6.52325C18.7841 6.48625 18.7841 6.34225 18.8861 6.30525L20.0151 5.89825C21.2681 5.44625 22.2551 4.45925 22.7071 3.20625L23.1141 2.07725C23.1511 1.97425 23.2961 1.97425 23.3321 2.07725Z" fill="#88FBFF" />
                <path d="M23.3321 21.2503L23.7391 22.3793C24.1911 23.6323 25.1781 24.6193 26.4311 25.0713L27.5601 25.4783C27.6621 25.5153 27.6621 25.6593 27.5601 25.6963L26.4311 26.1033C25.1781 26.5553 24.1911 27.5423 23.7391 28.7953L23.3321 29.9243C23.2951 30.0263 23.1511 30.0263 23.1141 29.9243L22.7071 28.7953C22.2551 27.5423 21.2681 26.5553 20.0151 26.1033L18.8861 25.6963C18.7841 25.6593 18.7841 25.5153 18.8861 25.4783L20.0151 25.0713C21.2681 24.6193 22.2551 23.6323 22.7071 22.3793L23.1141 21.2503C23.1511 21.1483 23.2961 21.1483 23.3321 21.2503Z" fill="#88FBFF" />
            </svg>
        ),
        title: 'Full access to Trading View  powerful tools',
        description: 'Unlock the full potential of Trading View with powerful charting and tools.',
    },
]

const SmarterTradingAccess = () => {
    return (
        <div className='px-4 sm:px-6'>
            <div className='max-w-[1490px] mx-auto'>
                <div className="flex lg:flex-row flex-col-reverse justify-between gap-6 items-center">
                    {/* Left - Feature cards */}
                    <div className='lg:max-w-[686px] w-full border border-[#FFFFFF0D] bg-[#FFFFFF08] rounded-[24px] sm:rounded-[40px] p-5 sm:p-8'>
                        <div className="mb-5 text-white text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-semibold">
                            Powerful Features
                        </div>

                        <div className="flex flex-col gap-2.5 sm:gap-3">
                            {FEATURES.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="bg-[#FFFFFF08] rounded-[16px] p-4 sm:p-5 flex sm:flex-row flex-col items-start sm:items-center gap-3"
                                >
                                    {/* Icon */}
                                    <div className='w-[60px] h-[60px] border border-[#FFFFFF0D] bg-[#FFFFFF08] rounded-[12px] flex items-center justify-center flex-shrink-0'>
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-white text-[16px] font-semibold leading-6 sm:leading-[26px] mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white/60 text-[14px] leading-[21px] font-normal">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Main content */}
                    <div className='lg:max-w-[624px] w-full'>
                        <div className="mb-3 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Smarter Trading Access
                        </div>

                        <h2 className="mb-4 text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Access TradingView for precise analysis tools
                        </h2>

                        <p className="text-white/50 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal mb-5 max-w-[620px]">
                            Gain full access to Trading View and explore powerful charting tools for precise market analysis and smarter trading decisions.
                        </p>

                        {/* Checkmark list */}
                        <div className="flex flex-col gap-4 sm:gap-5">
                            <div className="flex items-start gap-2 sm:gap-3">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
                                </svg>
                                <span className="text-white/60 text-[14px] sm:text-[18px] leading-[27px] font-normal">
                                    Real-time market data and alerts
                                </span>
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
                                </svg>
                                <span className="text-white/60 text-[14px] sm:text-[18px] leading-[27px] font-normal">
                                    Advanced charting and technical indicators
                                </span>
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
                                </svg>
                                <span className="text-white/60 text-[14px] sm:text-[18px] leading-[27px] font-normal">
                                    Multi-timeframe analysis for better timing
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SmarterTradingAccess