import React from 'react'

const SUPPORT_ITEMS = [
    {
        id: 'monitoring',
        icon: (
            <svg className='w-8 h-8 lg:w-[38px] lg:h-[38px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.9378 3.1665C24.9378 2.51067 24.4062 1.979 23.7503 1.979C23.0945 1.979 22.5628 2.51067 22.5628 3.1665V34.8332C22.5628 35.489 23.0945 36.0207 23.7503 36.0207C24.4062 36.0207 24.9378 35.489 24.9378 34.8332V31.6577C29.1114 31.6139 31.436 31.3542 32.9787 29.8115C34.8337 27.9565 34.8337 24.971 34.8337 18.9998C34.8337 13.0287 34.8337 10.0432 32.9787 8.18816C31.436 6.64547 29.1114 6.38575 24.9378 6.34202V3.1665Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.02198 29.8115C6.87697 31.6665 9.86253 31.6665 15.8337 31.6665H20.5837V18.9998V6.33317H15.8337C9.86253 6.33317 6.87697 6.33317 5.02198 8.18816C3.16699 10.0432 3.16699 13.0287 3.16699 18.9998C3.16699 24.971 3.16699 27.9565 5.02198 29.8115ZM20.5837 18.9998C20.5837 18.1254 19.8748 17.4165 19.0003 17.4165C18.1259 17.4165 17.417 18.1254 17.417 18.9998C17.417 19.8743 18.1259 20.5832 19.0003 20.5832C19.8748 20.5832 20.5837 19.8743 20.5837 18.9998ZM14.2503 18.9998C14.2503 19.8743 13.5414 20.5832 12.667 20.5832C11.7925 20.5832 11.0837 19.8743 11.0837 18.9998C11.0837 18.1254 11.7925 17.4165 12.667 17.4165C13.5414 17.4165 14.2503 18.1254 14.2503 18.9998Z" fill="white" />
            </svg>
        ),
        name: '24/5 Strategy Monitoring',
        description: 'Strategies monitored continuously,\nmanaging risk in real time',
        cta: null,
        active: false,
    },
    {
        id: 'insights',
        icon: (
            <svg className='w-8 h-8 lg:w-[38px] lg:h-[38px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.48573 5.48524C3.16699 7.80398 3.16699 11.5359 3.16699 18.9998C3.16699 26.4637 3.16699 30.1957 5.48573 32.5144C7.80447 34.8332 11.5364 34.8332 19.0003 34.8332C26.4642 34.8332 30.1962 34.8332 32.5149 32.5144C34.8337 30.1957 34.8337 26.4637 34.8337 18.9998C34.8337 11.5359 34.8337 7.80398 32.5149 5.48524C30.1962 3.1665 26.4642 3.1665 19.0003 3.1665C11.5364 3.1665 7.80447 3.1665 5.48573 5.48524ZM10.1714 15.073C10.5913 14.5692 11.3401 14.5011 11.8439 14.9209L12.2816 15.2857C13.2394 16.0838 14.0548 16.7632 14.6192 17.3882C15.2185 18.0519 15.6863 18.8153 15.6863 19.7915C15.6863 20.7678 15.2185 21.5311 14.6192 22.1949C14.0548 22.8198 13.2394 23.4993 12.2816 24.2974L11.8439 24.6621C11.3401 25.082 10.5913 25.0139 10.1714 24.5101C9.75157 24.0063 9.81964 23.2575 10.3235 22.8376L10.6946 22.5283C11.7373 21.6594 12.4192 21.0875 12.8565 20.6032C13.2718 20.1433 13.3113 19.9277 13.3113 19.7915C13.3113 19.6554 13.2718 19.4398 12.8565 18.9799C12.4192 18.4956 11.7373 17.9237 10.6946 17.0547L10.3235 16.7455C9.81964 16.3256 9.75157 15.5768 10.1714 15.073ZM28.1045 23.7499C28.1045 24.4057 27.5729 24.9374 26.917 24.9374H19.0004C18.3445 24.9374 17.8129 24.4057 17.8129 23.7499C17.8129 23.094 18.3445 22.5624 19.0004 22.5624H26.917C27.5729 22.5624 28.1045 23.094 28.1045 23.7499Z" fill="white" />
            </svg>
        ),
        name: 'Performance Deployment Insights',
        description: 'Provide transparent performance insights and\npersonalized allocation guidance',
        cta: null,
        active: false,
    },
    {
        id: 'meeting',
        icon: (
            <svg className='w-8 h-8 lg:w-[38px] lg:h-[38px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2707 3.9585C12.2707 3.30266 11.739 2.771 11.0832 2.771C10.4273 2.771 9.89567 3.30266 9.89567 3.9585V6.45899C7.61673 6.64148 6.12064 7.08934 5.02149 8.18849C3.92235 9.28763 3.47448 10.7837 3.29199 13.0627H34.7077C34.5252 10.7837 34.0773 9.28763 32.9782 8.18849C31.879 7.08934 30.3829 6.64148 28.104 6.45899V3.9585C28.104 3.30266 27.5723 2.771 26.9165 2.771C26.2607 2.771 25.729 3.30266 25.729 3.9585V6.35392C24.6757 6.3335 23.495 6.3335 22.1665 6.3335H15.8332C14.5047 6.3335 13.324 6.3335 12.2707 6.35392V3.9585Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M3.1665 19.0002C3.1665 17.6717 3.1665 16.491 3.18693 15.4377H34.8127C34.8332 16.491 34.8332 17.6717 34.8332 19.0002V22.1668C34.8332 28.138 34.8332 31.1235 32.9782 32.9785C31.1232 34.8335 28.1376 34.8335 22.1665 34.8335H15.8332C9.86205 34.8335 6.87648 34.8335 5.02149 32.9785C3.1665 31.1235 3.1665 28.138 3.1665 22.1668V19.0002ZM26.9165 22.1668C27.791 22.1668 28.4998 21.4579 28.4998 20.5835C28.4998 19.709 27.791 19.0002 26.9165 19.0002C26.0421 19.0002 25.3332 19.709 25.3332 20.5835C25.3332 21.4579 26.0421 22.1668 26.9165 22.1668ZM26.9165 28.5002C27.791 28.5002 28.4998 27.7913 28.4998 26.9168C28.4998 26.0424 27.791 25.3335 26.9165 25.3335C26.0421 25.3335 25.3332 26.0424 25.3332 26.9168C25.3332 27.7913 26.0421 28.5002 26.9165 28.5002ZM20.5832 20.5835C20.5832 21.4579 19.8743 22.1668 18.9998 22.1668C18.1254 22.1668 17.4165 21.4579 17.4165 20.5835C17.4165 19.709 18.1254 19.0002 18.9998 19.0002C19.8743 19.0002 20.5832 19.709 20.5832 20.5835ZM20.5832 26.9168C20.5832 27.7913 19.8743 28.5002 18.9998 28.5002C18.1254 28.5002 17.4165 27.7913 17.4165 26.9168C17.4165 26.0424 18.1254 25.3335 18.9998 25.3335C19.8743 25.3335 20.5832 26.0424 20.5832 26.9168ZM11.0832 22.1668C11.9576 22.1668 12.6665 21.4579 12.6665 20.5835C12.6665 19.709 11.9576 19.0002 11.0832 19.0002C10.2087 19.0002 9.49984 19.709 9.49984 20.5835C9.49984 21.4579 10.2087 22.1668 11.0832 22.1668ZM11.0832 28.5002C11.9576 28.5002 12.6665 27.7913 12.6665 26.9168C12.6665 26.0424 11.9576 25.3335 11.0832 25.3335C10.2087 25.3335 9.49984 26.0424 9.49984 26.9168C9.49984 27.7913 10.2087 28.5002 11.0832 28.5002Z" fill="white" />
            </svg>
        ),
        name: 'Book a Meeting',
        description: 'Speak directly with our team for clear, pressure-free\nguidance tailored to your investment needs',
        cta: 'Schedule Now →',
        active: true,
    },
];

const InvestorSupport = () => {
    return (
        <div className='px-4 sm:px-6 pt-16 lg:pt-20 xl:pt-[109px]'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Investor Support
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-20">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        We are with you <br className='sm:block hidden' />  every step
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-inter font-normal max-w-[640px]">
                        Our commitment extends beyond strategy — we provide the clarity and guidance needed to deploy capital with confidence.
                    </p>
                </div>

                {/* Support cards */}
                <div className="flex flex-col gap-4 sm:gap-6">
                    {SUPPORT_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex lg:flex-row flex-col items-start lg:items-center justify-between gap-4 sm:gap-6 xl:gap-[70px] bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[30px] lg:rounded-[40px] p-6 sm:p-8 xl:p-10 overflow-hidden"
                        >
                            {/* Active blue glow right */}
                            {item.active && (
                                <>
                                    {/* card-dot-img overlay */}
                                    <div className='w-[140px] h-full absolute top-0 right-0 z-30'>
                                        <div
                                            className="absolute inset-0 opacity-60 bg-[url('/assets/dots.svg')] bg-cover"
                                        />
                                    </div>

                                    {/* Ellipse 1 — blue glow */}
                                    <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                        width: '167.78px', height: '263.04px',
                                        right: '-40px', top: '-140px',
                                        background: '#6DB7FF',
                                        filter: 'blur(60.45px)',
                                        transform: 'rotate(-56.09deg)',
                                        zIndex: 1,
                                    }} />
                                    {/* Ellipse 2 — plus-lighter glow */}
                                    <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                        width: '121.08px', height: '258.97px',
                                        right: '-2px', top: '-95px',
                                        background: '#6294FF',
                                        mixBlendMode: 'plus-lighter',
                                        filter: 'blur(147.57px)',
                                        transform: 'rotate(-56.09deg)',
                                        zIndex: 1,
                                    }} />
                                    {/* Ellipse 3 — dark overlay glow */}
                                    <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                        width: '112.92px', height: '251.43px',
                                        right: '-16px', top: '-67px',
                                        background: '#0F4274',
                                        mixBlendMode: 'plus-lighter',
                                        filter: 'blur(147.57px)',
                                        transform: 'rotate(-56.09deg)',
                                        zIndex: 1,
                                    }} />
                                </>
                            )}

                            {/* Left: icon + name */}
                            <div className="relative z-40 flex sm:flex-row flex-col items-start sm:items-center gap-5 sm:gap-6 flex-shrink-0 w-full lg:w-[320px] xl:w-[420px] 2xl:w-[600px]">
                                <div className="flex-shrink-0 w-14 h-14 lg:w-[70px] lg:h-[70px] rounded-full bg-[#FFFFFF08] border border-[#FFFFFF0D] flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-white text-[20px] xl:text-[30px] font-semibold leading-8 xl:leading-[48px]">
                                    {item.name}
                                </h3>
                            </div>

                            {/* Center: description */}
                            <p className="relative z-40 text-white/70 text-[14px] sm:text-[16px] xl:text-[18px] leading-[20px] sm:leading-[29px] font-normal flex-1">
                                {item.description.split('\n').map((line, i) => (
                                    <span key={i}>{line}{i === 0 && <br className='xl:block hidden' />}</span>
                                ))}
                            </p>

                            {/* Right: CTA or arrow */}
                            <div className="w-full sm:w-fit relative z-40 flex-shrink-0">
                                {item.cta ? (
                                    <button className="w-full bg-white text-black font-inter text-[16px] sm:text-[18px] font-semibold px-5 sm:px-8 h-12 sm:h-[60px] rounded-full hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap">
                                        {item.cta}
                                    </button>
                                ) : (
                                    <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-[75px] sm:h-[75px] rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF18] transition-colors">
                                        <svg width="35" height="35" className='w-8 h-8 sm:w-[35px] sm:h-[35px]' viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.208 24.7916L24.7913 10.2083" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.208 10.2083H24.7913V24.7916" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default InvestorSupport