import Image from 'next/image'

function CheckIcon() {
    return (
        <svg className='min-w-6 h-6 sm:min-w-[28px] sm:h-[28px]' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fill-opacity="0.6" />
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
                    <div className="relative w-full lg:max-w-[587px] bg-[#FFFFFF08] rounded-[11px] relative z-30">
                        <Image
                            src="/assets/trading-view-right-img.png"
                            alt="Cross Asset Alpha Engine Dashboard"
                            width={900}
                            height={640}
                            style={{ mixBlendMode: "lighten", opacity: 1 }}
                            className="w-full h-full rounded-[11px]"
                        />
                        {/* Institutional Trading badge overlay */}
                        <div className="absolute bottom-[46%] left-[-20px] sm:left-0 2xl:-left-28 flex items-center gap-[8.4px] bg-[#13131D] rounded-md sm:rounded-[12px] pl-[8.5px] p-[8.5px] sm:pr-[38.22px] py-1 sm:py-[8.4px] shadow-[7px_7px_22px_0px_#82C1FB1A,29px_26px_39px_0px_#82C1FB17,66px_59px_53px_0px_#82C1FB0D,118px_106px_63px_0px_#82C1FB03,184px_165px_69px_0px_#82C1FB00]">
                            <div className="w-[34.98px] h-[34.98px] rounded-full bg-[#88C4FF1A] flex items-center justify-center flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_15_18045)">
                                        <path d="M9.32893 2.33223C9.32893 1.36785 10.1137 0.583058 11.0781 0.583058C11.0781 0.260627 11.3387 0 11.6612 0C11.9836 0 12.2442 0.260627 12.2442 0.583058H12.4005C13.0226 0.583058 13.6033 0.917734 13.9153 1.45706C14.0768 1.73635 13.9812 2.0926 13.703 2.25352C13.4226 2.41503 13.0669 2.31941 12.9066 2.04129C12.8022 1.86054 12.6086 1.74917 12.4011 1.74917H11.0787C10.7568 1.74917 10.4956 2.01039 10.4956 2.33223C10.4956 2.55321 10.6536 2.73921 10.8717 2.77594L12.6442 3.07097C13.4267 3.20157 13.994 3.87209 13.994 4.66447C13.994 5.62884 13.2092 6.41364 12.2448 6.41364C12.2448 6.73607 11.9842 6.9967 11.6617 6.9967C11.3393 6.9967 11.0787 6.73607 11.0787 6.41364H10.9224C10.3003 6.41364 9.71958 6.07897 9.40765 5.53964C9.24614 5.26035 9.34176 4.9041 9.61988 4.74318C9.89975 4.58051 10.256 4.67729 10.4163 4.95541C10.5207 5.13616 10.7143 5.24752 10.9218 5.24752H12.2442C12.5661 5.24752 12.8273 4.98631 12.8273 4.66447C12.8273 4.44349 12.6693 4.25749 12.4512 4.22076L10.6787 3.92573C9.89625 3.79513 9.32893 3.12461 9.32893 2.33223ZM13.064 7.44799C13.4039 7.3477 13.717 7.19086 13.9928 6.98212V8.74646C13.9928 10.3539 12.685 11.6617 11.0775 11.6617H7.57917V12.8279H9.91141C10.2338 12.8279 10.4945 13.0885 10.4945 13.4109C10.4945 13.7334 10.2338 13.994 9.91141 13.994H4.08141C3.75956 13.994 3.49835 13.7334 3.49835 13.4109C3.49835 13.0885 3.75956 12.8279 4.08141 12.8279H6.41364V11.6617H2.91529C1.3078 11.6617 0 10.3539 0 8.74646V4.08199C0 2.47392 1.3078 1.16612 2.91529 1.16612H8.41003C8.25319 1.52411 8.16282 1.9171 8.16282 2.33223C8.16282 2.94736 8.36106 3.51934 8.70273 3.98345C8.47184 4.20268 8.30625 4.48139 8.22229 4.79624C8.10159 5.24811 8.16398 5.7198 8.39837 6.1227C8.81234 6.84044 9.51435 7.33487 10.3079 7.50746C10.6286 7.90394 11.1131 8.16282 11.6617 8.16282C12.2384 8.16282 12.7457 7.87887 13.064 7.44799ZM2.91529 6.9967C2.91529 6.67427 2.65408 6.41364 2.33223 6.41364C2.01039 6.41364 1.74917 6.67427 1.74917 6.9967V8.74587C1.74917 9.06831 2.01039 9.32893 2.33223 9.32893C2.65408 9.32893 2.91529 9.06831 2.91529 8.74587V6.9967ZM5.24752 4.66447C5.24752 4.34204 4.98631 4.08141 4.66447 4.08141C4.34262 4.08141 4.08141 4.34204 4.08141 4.66447V8.74587C4.08141 9.06831 4.34262 9.32893 4.66447 9.32893C4.98631 9.32893 5.24752 9.06831 5.24752 8.74587V4.66447ZM7.57976 6.41364C7.57976 6.09121 7.31913 5.83058 6.9967 5.83058C6.67427 5.83058 6.41364 6.09121 6.41364 6.41364V8.74587C6.41364 9.06831 6.67427 9.32893 6.9967 9.32893C7.31913 9.32893 7.57976 9.06831 7.57976 8.74587V6.41364Z" fill="#88C4FF" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_15_18045">
                                            <rect width="13.9934" height="13.9934" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <span className="text-white text-[12.59px] leading-[14px] font-semibold whitespace-nowrap">
                                Institutional Trading
                            </span>
                        </div>
                    </div>


                    {/* Shadows */}
                    <div aria-hidden="true" className="absolute pointer-events-none right-[-120px] lg:left-[-131px] bottom-[-120px] lg:top-[-131px]" style={{ width: '194.72px', height: '305.28px', background: '#6DB7FF', filter: 'blur(60.87px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
                    <div aria-hidden="true" className="absolute pointer-events-none right-[-117px] bottom-[-137px] lg:top-[-137px]" style={{ width: '140.52px', height: '300.55px', background: '#6294FF', mixBlendMode: 'plus-lighter', filter: 'blur(171.26px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
                    <div aria-hidden="true" className="absolute pointer-events-none right-[-133px] bottom-[-105px] lg:top-[-105px]" style={{ width: '131.05px', height: '291.8px', background: '#0F4274', mixBlendMode: 'plus-lighter', filter: 'blur(171.26px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
                    <div className='w-[280px] sm:w-[380px] h-[220px] lg:h-[350px] absolute bottom-0 lg:top-0 right-0 lg:left-0 z-10'>
                        <div
                            className="absolute inset-0 opacity-20 bg-[url('/assets/dots.svg')] bg-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradingView
