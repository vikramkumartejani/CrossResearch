import Image from '@/lib/CldImage'
import React from 'react'

const GetStarted = () => {
    return (
        <div className='px-4 sm:px-6 pb-16 lg:pb-20 xl:pb-[170px]'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-4 sm:mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Get Started
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-4 lg:gap-10 mb-10 sm:mb-16 lg:mb-20">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Up and running in just<br className='sm:block hidden' />  a few minutes, no setup hasslen
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-inter font-normal max-w-[511px]">
                        Up and running in just a few minutes, with zero setup hassle required, fully streamlined onboarding process ready
                    </p>
                </div>

                {/* Select Plan section */}
                <div className="flex lg:flex-row flex-col items-center justify-between gap-6 items-center">
                    {/* Left - Content */}
                    <div className='w-full lg:max-w-[573px]'>
                        <div className="mb-3 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Select Plan
                        </div>

                        <h3 className="mb-4 text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Choose your plan that<br className='xl:block hidden' />fits your needs
                        </h3>

                        <p className="text-white/50 text-[14px] sm:text-[18px] leading-[22px] sm:leading-[27px] font-normal mb-5 max-w-[550px]">
                            Select the package that fits your style - indicators only, macro dashboard, or the full suite.
                        </p>

                        {/* Steps */}
                        <div className="flex flex-col gap-3 sm:gap-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
                                </svg>
                                <span className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">
                                    Choose the plan that matches your trading style
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
                                </svg>
                                <span className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">
                                    Select tools that fit your trading approach best
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
                                </svg>
                                <span className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal">
                                    Flexible packages for every level of market analysis
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Image card with glow */}
                    <div className="relative w-full lg:max-w-[751px] z-10 bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[24px] sm:rounded-[40px] py-[41px] overflow-hidden">
                        {/* Right-top glow */}
                        <div aria-hidden="true" className="absolute pointer-events-none right-[-100px] lg:right-[-37px] bottom-[-140px] lg:top-[-71px]" style={{ width: '120.48px', height: '188.9px', background: '#6DB7FF', filter: 'blur(37.66px)', transform: 'rotate(-67.08deg)', zIndex: 1 }} />
                        <div aria-hidden="true" className="absolute pointer-events-none right-[-22px] bottom-[-75px] lg:top-[-75px]" style={{ width: '86.95px', height: '185.97px',  background: '#6294FF', mixBlendMode: 'plus-lighter', filter: 'blur(105.97px)', transform: 'rotate(-67.08deg)', zIndex: 1 }} />
                        <div aria-hidden="true" className="absolute pointer-events-none right-[-30px] bottom-[-60px] lg:top-[-53px]" style={{ width: '81.09px', height: '180.55px',  background: '#0F4274', mixBlendMode: 'plus-lighter', filter: 'blur(105.97px)', transform: 'rotate(-67.08deg)', zIndex: 1 }} />
                        <div className='w-[200px] h-[160px] absolute bottom-0 lg:top-0 right-0 z-10'>
                            <div
                                className="absolute inset-0 opacity-20 cr-dots"
                            />
                        </div>
                        <Image
                            src="/assets/plan-select.png"
                            width={751}
                            height={356}
                            alt="Select Plan Interface"
                            style={{ mixBlendMode: "screen" }}
                            className="w-full h-auto rounded-[16px] sm:rounded-[20px] relative z-30"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted