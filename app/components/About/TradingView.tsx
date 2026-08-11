import Image from 'next/image'

function CheckIcon() {
    return (
        <svg className='min-w-6 h-6 sm:min-w-[28px] sm:h-[28px]' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
        </svg>
    )
}

const TradingView = () => {
    return (
        <div className='px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-32'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Outer card */}
                <div className="relative bg-[#FFFFFF05] border border-[#FFFFFF0D] gap-6 rounded-[20px] p-5 sm:p-10 md:py-12 lg:py-20 2xl:py-[90px] md:px-12 2xl:px-20 sm:rounded-[40px] lg:rounded-[60px] xl:rounded-[80px] overflow-hidden flex lg:flex-row flex-col justify-between">
                    {/* Left — content */}
                    <div className="w-full lg:max-w-[615px] flex flex-col justify-center relative z-30">
                        <div className="w-fit mb-4 sm:mb-5 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Trading View
                        </div>

                        <h3 className="mb-4 sm:mb-5 text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Institutional concepts made simple tools
                        </h3>

                        <p className="text-white/80 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[30px] font-semibold">
                            Simplified institutional trading for everyone
                        </p>

                        {/* Description */}
                        <p className="text-white/60 text-[14px] sm:text-[18px] leading-[22px] sm:leading-[27px] font-normal my-4 sm:my-5 max-w-[576px]">
                            We simplify institutional trading concepts into practical automated tools designed for every modern trader worldwide.
                        </p>

                        {/* Checkpoints */}
                        <div className="flex flex-col gap-3 sm:gap-5">
                            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                                <CheckIcon />
                                <span className="text-white/60 text-[16px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">Simplified institutional trading for all traders</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                                <CheckIcon />
                                <span className="text-white/60 text-[16px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">Automated tools built from institutional concepts</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                                <CheckIcon />
                                <span className="text-white/60 text-[16px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">Turning complex strategies into usable systems</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — dashboard image */}
                    <div className="relative w-full lg:max-w-[737px] bg-[#FFFFFF08] rounded-[11px] relative z-30">
                        <Image
                            src="/assets/our-features.webp"
                            alt="Cross Asset Alpha Engine Dashboard"
                            width={1200}
                            height={640}
                            style={{ mixBlendMode: "lighten", opacity: 1 }}
                            className="w-full h-full rounded-[11px]"
                        />
                      
                    </div>


                    
                </div>
            </div>
        </div>
    )
}

export default TradingView
