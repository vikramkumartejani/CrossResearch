import Image from '@/lib/CldImage';

export default function CTA() {
    return (
        <div className="relative w-full px-4 sm:px-6 overflow-hidden">
            <div className="relative z-10 mx-auto max-w-[1791px]">
                {/* Main CTA Card */}
                <div className="relative bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[40px] lg:rounded-[60px] xl:rounded-[80px] py-14 sm:py-16 xl:py-[80px] px-6 md:px-10 xl:px-[60px] overflow-hidden flex flex-col items-center text-center">

                    {/* Ellipse 17032 - top center glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none"
                        style={{
                            position: 'absolute',
                            width: '1093px',
                            height: '1211px',
                            left: 'calc(50% - 1193px / 2)',
                            top: '-909px',
                            background: 'rgba(109, 183, 255, 0.4)',
                            filter: 'blur(107.646px)',
                            zIndex: 0,
                        }}
                    />

                    {/* Dot pattern - top-left */}
                    <div className="absolute left-0 top-0 opacity-10 pointer-events-none" aria-hidden="true">
                        <Image
                            src="/assets/card-dot-img.svg"
                            alt=""
                            width={800}
                            height={400}
                            className="object-cover"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Content - centered */}
                    <div className="relative z-10 flex flex-col items-center max-w-[800px]">
                        {/* Badge */}
                        <div className="mb-5 sm:mb-6 inline-flex">
                            <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                    <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                    <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                                </svg>
                                Trade Smarter
                            </div>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[70px] font-normal mb-5 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Take your trading to the <br className="sm:block hidden" /> next level with our insights
                        </h2>

                        {/* Subheading */}
                        <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal font-inter mb-7 sm:mb-8">
                            reviews showed that more than 75% of subscribers <br className="sm:block hidden" /> make back their money within 3 days
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-2.5 sm:gap-4 flex-wrap justify-center">
                            <button className="sm:w-fit w-full bg-white text-black px-6 sm:px-8 py-2.5 sm:py-4 rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
                                Start Now
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="sm:w-fit w-full bg-transparent border border-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex justify-center items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer">
                                Get a Free Consultation
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
