import Image from "next/image";

export default function CTA() {
    return (
        <div className="relative w-full pb-20 lg:pb-[120px] xl:pb-[170px] px-4 sm:px-6 overflow-hidden">
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1791px]">
                {/* Main CTA Card */}
                <div className="relative bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[40px] lg:rounded-[60px] xl:rounded-[80px] xl:pt-[65.76px] xl:pb-[66.24px] py-10 sm:py-12 px-6 md:px-10 xl:px-[60px] overflow-hidden">

                    {/* Ellipse 1 — left-top glow */}
                    <div aria-hidden="true" className="blur-[160px] sm:blur-[107.646px]" style={{
                        position: 'absolute',
                        width: '246.3px', height: '386.15px',
                        left: '79px', top: '-150.28px',
                        background: '#6DB7FF',
                        transform: 'rotate(-11.09deg)',
                        pointerEvents: 'none', zIndex: 0,
                    }} />
                    {/* Ellipse 2 */}
                    <div aria-hidden="true" className="sm:block hidden"  style={{
                        position: 'absolute',
                        width: '177.75px', height: '380.16px',
                        left: '155.06px', top: '-152px',
                        background: '#6294FF',
                        mixBlendMode: 'plus-lighter',
                        filter: 'blur(302.886px)',
                        transform: 'rotate(-11.09deg)',
                        pointerEvents: 'none', zIndex: 0,
                    }} />
                    {/* Ellipse 3 */}
                    <div aria-hidden="true" className="sm:block hidden" style={{
                        position: 'absolute',
                        width: '165.77px', height: '369.1px',
                        left: '118.12px', top: '-142.46px',
                        background: '#0F4274',
                        mixBlendMode: 'plus-lighter',
                        filter: 'blur(302.886px)',
                        transform: 'rotate(-11.09deg)',
                        pointerEvents: 'none', zIndex: 0,
                    }} />

                    <div className="w-[450px] h-[120px] absolute -left-10 top-0 opacity-40">
                        <Image
                            src="/assets/card-dot-img.svg"
                            alt=""
                            width={500}
                            height={300}
                            className=" object-cover"
                            aria-hidden="true"
                        />
                    </div>

                    {/* icons-line image — right side */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/icons-line.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute right-[-250px] 2xl:right-0 top-0 h-full w-auto pointer-events-none select-none lg:block hidden"
                        style={{ zIndex: 1 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 lg:max-w-[55%]">
                        {/* Badge */}
                        <div className="mb-5 sm:mb-6 inline-flex">
                            <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal font-inter mb-5 sm:mb-6">
                            reviews showed that more than 75% of subscribers <br className="sm:block hidden" /> make back their money within 3 days
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-2.5 sm:gap-4 flex-wrap">
                            <button className="sm:w-fit w-full bg-white text-black px-6 sm:px-8 py-2.5 sm:py-4 rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex items-center justify-between gap-2 hover:bg-white/90 transition-colors cursor-pointer">
                                Start Now
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="sm:w-fit w-full bg-transparent border border-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex justify-between items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer">
                                Get a Free Consultation
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
