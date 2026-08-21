import Image from '@/lib/CldImage';
import React from 'react'

function TagDot() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    );
}

const StrategyMattersMost = () => {
    return (
        <div className='px-4 sm:px-6 pt-10 lg:pt-20 lg:pt-[160.28px] pb-10 sm:pb-[41.21px]'>
            <div className='max-w-[1336px] mx-auto'>
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 sm:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <TagDot />
                        Strategy Matters Most
                    </div>

                    <h2 className="text-center font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-[70px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Why generic strategies fail  <br className="sm:block hidden" /> to outperform in changing markets
                    </h2>

                    <p className="text-center text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[670px] mx-auto">
                        Generic strategies ignore nuance, adapt slowly, and miss opportunities for consistent long-term outperformance
                    </p>
                </div>

                {/* Two main cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 mb-6 bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px]">
                    {/* Card 1 - The Generic Problem */}
                    <div className="relative p-6 sm:p-8 lg:p-[60px] flex flex-col gap-10 lg:gap-20 overflow-hidden">
                        {/* Icon */}
                        <div className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center flex-shrink-0">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.8337 6.49996V19.5C10.8337 21.0168 10.8337 21.7752 10.5385 22.3545C10.2788 22.8641 9.86449 23.2784 9.35488 23.5381C8.77554 23.8333 8.01713 23.8333 6.50033 23.8333C4.98352 23.8333 4.22511 23.8333 3.64577 23.5381C3.13616 23.2784 2.72184 22.8641 2.46218 22.3545C2.16699 21.7752 2.16699 21.0168 2.16699 19.5V6.49996C2.16699 4.98315 2.16699 4.22475 2.46218 3.6454C2.72184 3.1358 3.13616 2.72147 3.64577 2.46182C4.22511 2.16663 4.98352 2.16663 6.50033 2.16663C8.01713 2.16663 8.77554 2.16663 9.35488 2.46182C9.86449 2.72147 10.2788 3.1358 10.5385 3.6454C10.8337 4.22475 10.8337 4.98315 10.8337 6.49996ZM7.58366 21.3958C8.03239 21.3958 8.39616 21.032 8.39616 20.5833C8.39616 20.1346 8.03239 19.7708 7.58366 19.7708H5.41699C4.96826 19.7708 4.60449 20.1346 4.60449 20.5833C4.60449 21.032 4.96826 21.3958 5.41699 21.3958H7.58366Z" fill="white" />
                                <path d="M20.6486 11.4989L14.324 18.0959C13.5333 18.9207 13.138 19.333 12.7983 19.1965C12.4587 19.06 12.4587 18.4887 12.4587 17.3462L12.4587 8.42157C12.4599 7.70659 12.7439 7.02112 13.2485 6.51466L14.3912 5.37202L14.8573 5.01565C15.9452 4.18393 16.4891 3.76806 17.0816 3.64029C17.5693 3.53511 18.0765 3.56668 18.5474 3.7315C19.1194 3.93174 19.6076 4.41184 20.584 5.37202C21.6669 6.45488 22.2083 6.99632 22.409 7.6164C22.5802 8.14523 22.5846 8.71393 22.4215 9.24531C22.2302 9.86838 21.703 10.4119 20.6486 11.4989Z" fill="white" />
                                <path d="M13.8559 23.8333H19.3914C20.9082 23.8333 21.6666 23.8333 22.2459 23.5381C22.7555 23.2784 23.1698 22.8641 23.4295 22.3545C23.7247 21.7752 23.7247 21.0168 23.7247 19.5C23.7247 17.9831 23.7247 17.2247 23.4295 16.6454C23.1698 16.1358 22.7555 15.7215 22.2459 15.4618C21.6666 15.1666 20.9082 15.1666 19.3914 15.1666H19.1533L12.8682 21.4478C12.606 21.7098 12.4587 22.034 12.4587 22.4047C12.4587 23.1763 13.0842 23.8333 13.8559 23.8333Z" fill="white" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.6248 2.5C10.6248 2.15482 10.345 1.875 9.99984 1.875C9.65466 1.875 9.37484 2.15482 9.37484 2.5V4.16667C9.37484 4.51184 9.65466 4.79167 9.99984 4.79167C10.345 4.79167 10.6248 4.51184 10.6248 4.16667V2.5Z" fill="#42C5FF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.9582 10.0471C18.9582 11.5786 18.9582 12.7916 18.8306 13.7409C18.6992 14.7179 18.4224 15.5087 17.7988 16.1324C17.1752 16.756 16.3844 17.0328 15.4074 17.1641C14.458 17.2918 13.245 17.2918 11.7136 17.2917H8.28607C6.75464 17.2918 5.54165 17.2918 4.59232 17.1641C3.6153 17.0328 2.82451 16.756 2.20087 16.1324C1.57724 15.5087 1.30047 14.7179 1.16912 13.7409C1.04148 12.7916 1.04149 11.5785 1.0415 10.0471L1.04151 9.8104C1.04152 9.6274 1.04159 9.44903 1.04195 9.27521C1.04261 8.95551 1.04423 8.65118 1.04822 8.36163C1.05943 7.54895 1.08934 6.85263 1.16912 6.2593C1.30047 5.28228 1.57724 4.49149 2.20087 3.86785C2.82451 3.24422 3.6153 2.96745 4.59232 2.83609C5.18935 2.75583 5.89067 2.72604 6.70989 2.71499C6.84758 2.71314 7.06208 2.71176 7.29033 2.71077C7.751 2.70875 8.12484 3.08228 8.12484 3.54296V4.16673C8.12484 5.20227 8.9643 6.04173 9.99984 6.04173C11.0354 6.04173 11.8748 5.20227 11.8748 4.16673V3.5419C11.8748 3.08163 12.2482 2.70779 12.7084 2.70997C13.7824 2.71505 14.6737 2.73745 15.4074 2.83609C16.3844 2.96745 17.1752 3.24422 17.7988 3.86785C18.4224 4.49149 18.6992 5.28228 18.8306 6.2593C18.9582 7.20863 18.9582 8.42161 18.9582 9.95306V10.0471ZM6.6665 8.12507C6.32133 8.12507 6.0415 8.40489 6.0415 8.75007C6.0415 9.09525 6.32133 9.37507 6.6665 9.37507H13.3332C13.6783 9.37507 13.9582 9.09525 13.9582 8.75007C13.9582 8.40489 13.6783 8.12507 13.3332 8.12507H6.6665ZM6.6665 11.0417C6.32133 11.0417 6.0415 11.3216 6.0415 11.6667C6.0415 12.0119 6.32133 12.2917 6.6665 12.2917H11.2498C11.595 12.2917 11.8748 12.0119 11.8748 11.6667C11.8748 11.3216 11.595 11.0417 11.2498 11.0417H6.6665Z" fill="#42C5FF" />
                                </svg>
                                <span className="text-[#42C5FF] text-[14px] sm:text-[16px] font-medium tracking-[3px] leading-[20px]">The generic problem</span>
                            </div>
                            <h3 className="text-white text-[28px] lg:text-[36px] font-normal leading-9 lg:leading-[47px] mb-3 sm:mb-4">
                                Noise passed off<br className='sm:block hidden' />as signal
                            </h3>
                            <p className="max-w-[449px] text-white/50 text-[14px] sm:text-[16px] leading-[24px] font-normal mb-6">
                                Conventional funds chase momentum without regime awareness, rely on lagged public data, apply static rules regardless of market environment, and lack the quantitative rigor needed to distinguish luck from edge
                            </p>
                            <button className="w-full sm:w-fit flex items-center justify-center bg-[#FFFFFF0F] border border-[#FFFFFF0D] bg-blur-[54px] text-white/70 text-[16px] leading-[19px] font-medium px-11 h-[48px] rounded-full hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                                Read More
                            </button>
                        </div>
                    </div>

                    {/* Card 2 - Alpha Advantage */}
                    <div className="relative bg-[#FFFFFF08] p-6 sm:p-8 lg:p-[60px] flex flex-col gap-10 lg:gap-20 rounded-r-[30px] sm:rounded-r-[40px] rounded-b-[30px] md:rounded-b-none lg:rounded-r-[50px] overflow-hidden">
                        {/* card-dot-img overlay */}
                        <div className='w-[280px] sm:w-[350px] h-[220px] lg:h-[350px] absolute top-0 right-0 z-10'>
                            <div
                                className="absolute inset-0 opacity-20 cr-dots"
                                // style={{ backgroundSize: "10%", }}
                            />
                        </div>

                        {/* Ellipse 1 - blue glow */}
                        <div aria-hidden="true" className="absolute pointer-events-none blur-[70.408px] right-[-140px] sm:right-[-100px] top-[-180px] sm:top-[-140px]" style={{
                            width: '225.24px', height: '353.14px',
                            background: '#6DB7FF',
                            transform: 'rotate(-56.09deg)',
                            zIndex: 0,
                        }} />
                        {/* Ellipse 2 - plus-lighter glow */}
                        <div aria-hidden="true" className="absolute pointer-events-none md:block hidden" style={{
                            width: '162.55px', height: '347.66px',
                            right: '-30px', top: '-121px',
                            background: '#6294FF',
                            mixBlendMode: 'plus-lighter',
                            filter: 'blur(198.109px)',
                            transform: 'rotate(-56.09deg)',
                            zIndex: 0,
                        }} />
                        {/* Ellipse 3 - dark overlay glow */}
                        <div aria-hidden="true" className="absolute pointer-events-none" style={{
                            width: '151.6px', height: '337.54px',
                            right: '-50px', top: '-83px',
                            background: '#0F4274',
                            mixBlendMode: 'plus-lighter',
                            filter: 'blur(198.109px)',
                            transform: 'rotate(-56.09deg)',
                            zIndex: 0,
                        }} />

                        {/* Icon */}
                        <div className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center flex-shrink-0">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8123 3.25C13.8123 2.80127 13.4486 2.4375 12.9998 2.4375C12.5511 2.4375 12.1873 2.80127 12.1873 3.25V5.41667C12.1873 5.8654 12.5511 6.22917 12.9998 6.22917C13.4486 6.22917 13.8123 5.8654 13.8123 5.41667V3.25Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.6457 13.0613C24.6457 15.0521 24.6457 16.6291 24.4798 17.8632C24.309 19.1333 23.9492 20.1614 23.1385 20.9721C22.3278 21.7828 21.2997 22.1426 20.0296 22.3134C18.7955 22.4793 17.2185 22.4793 15.2277 22.4793H10.7719C8.78109 22.4793 7.20419 22.4793 5.97006 22.3134C4.69994 22.1426 3.67191 21.7828 2.86119 20.9721C2.05046 20.1614 1.69066 19.1333 1.5199 17.8632C1.35397 16.6291 1.35399 15.0521 1.354 13.0612L1.35401 12.7535C1.35403 12.5156 1.35412 12.2837 1.35458 12.0578C1.35544 11.6422 1.35754 11.2465 1.36274 10.8701C1.37731 9.81363 1.4162 8.90843 1.5199 8.13709C1.69066 6.86696 2.05046 5.83893 2.86119 5.02821C3.67191 4.21748 4.69994 3.85769 5.97006 3.68692C6.7462 3.58257 7.65792 3.54385 8.72291 3.52949C8.90191 3.52708 9.18075 3.52529 9.47747 3.52399C10.0764 3.52137 10.5623 4.00696 10.5623 4.60585V5.41675C10.5623 6.76295 11.6536 7.85425 12.9998 7.85425C14.346 7.85425 15.4373 6.76295 15.4373 5.41675V4.60447C15.4373 4.00612 15.9227 3.52013 16.521 3.52296C17.9172 3.52957 19.0758 3.55869 20.0296 3.68692C21.2997 3.85769 22.3278 4.21748 23.1385 5.02821C23.9492 5.83893 24.309 6.86696 24.4798 8.13709C24.6457 9.37122 24.6457 10.9481 24.6457 12.939V13.0613ZM8.6665 10.5626C8.21777 10.5626 7.854 10.9264 7.854 11.3751C7.854 11.8238 8.21777 12.1876 8.6665 12.1876H17.3332C17.7819 12.1876 18.1457 11.8238 18.1457 11.3751C18.1457 10.9264 17.7819 10.5626 17.3332 10.5626H8.6665ZM8.6665 14.3543C8.21777 14.3543 7.854 14.718 7.854 15.1668C7.854 15.6155 8.21777 15.9793 8.6665 15.9793H14.6248C15.0736 15.9793 15.4373 15.6155 15.4373 15.1668C15.4373 14.718 15.0736 14.3543 14.6248 14.3543H8.6665Z" fill="white" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.3178 15.4342C17.5739 13.9752 18.3332 12.0763 18.3332 10.0001C18.3332 7.92386 17.5739 6.02498 16.3178 4.56596L12.7572 8.12657C13.1207 8.66049 13.3332 9.30547 13.3332 10.0001C13.3332 10.6947 13.1207 11.3397 12.7572 11.8736L16.3178 15.4342Z" fill="#42C5FF" />
                                    <path d="M15.434 16.3181C13.9749 17.5741 12.0761 18.3334 9.99984 18.3334C7.92361 18.3334 6.02473 17.5741 4.56572 16.3181L8.12632 12.7575C8.66025 13.121 9.30523 13.3334 9.99984 13.3334C10.6944 13.3334 11.3394 13.121 11.8734 12.7575L15.434 16.3181Z" fill="#42C5FF" />
                                    <path d="M3.68183 15.4342L7.24244 11.8736C6.87896 11.3397 6.6665 10.6947 6.6665 10.0001C6.6665 9.30547 6.87896 8.66049 7.24244 8.12657L3.68183 4.56596C2.42579 6.02498 1.6665 7.92386 1.6665 10.0001C1.6665 12.0763 2.42579 13.9752 3.68183 15.4342Z" fill="#42C5FF" />
                                    <path d="M9.99984 6.66675C9.30523 6.66675 8.66025 6.87921 8.12632 7.24268L4.56572 3.68208C6.02473 2.42603 7.92361 1.66675 9.99984 1.66675C12.0761 1.66675 13.9749 2.42603 15.434 3.68208L11.8734 7.24268C11.3394 6.87921 10.6944 6.66675 9.99984 6.66675Z" fill="#42C5FF" />
                                </svg>
                                <span className="text-[#42C5FF] text-[14px] sm:text-[16px] font-medium tracking-[3px] leading-[20px]">Alpha Advantag</span>
                            </div>
                            <h3 className="text-white text-[28px] lg:text-[36px] font-normal leading-9 lg:leading-[47px] mb-3 sm:mb-4">
                                Mathematically Proven  <br className='sm:block hidden' />Strategies
                            </h3>
                            <p className="max-w-[490px] text-white/50 text-[14px] sm:text-[16px] leading-[24px] font-normal mb-6">
                                Our strategies adapt to market environments through proprietary regime classification, advanced statistical reasoning, and multi-factor validation - ensuring every position is grounded in quantitative evidence, not conviction.
                            </p>
                            <button className="w-full sm:w-fit flex items-center justify-center bg-[#FFFFFF0F] border border-[#FFFFFF0D] bg-blur-[54px] text-white/70 text-[16px] leading-[19px] font-medium px-11 h-[48px] rounded-full hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quote card */}
                <div className="relative bg-[#FFFFFF08] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] p-6 sm:p-10 lg:p-[50px] flex items-center justify-between gap-6 overflow-hidden">
                    <p className="relative z-10 text-white text-[18px] sm:text-[28px] lg:text-[38px] font-normal leading-7 sm:leading-[40px] lg:leading-[49px] max-w-[800px]">
                        &ldquo;The edge is not in the trade - it is <br className="sm:block hidden" /> in the framework behind it.&rdquo;
                    </p>
                    <div className="relative z-10 flex-shrink-0 h-16 sm:w-[75px] w-16 sm:h-[75px] rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF18] transition-colors">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.208 24.7916L24.7913 10.2083" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.208 10.2083H24.7913V24.7916" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StrategyMattersMost