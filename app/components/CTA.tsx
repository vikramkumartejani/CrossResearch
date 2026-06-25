export default function CTA() {
    return (
        <section className="relative w-full pb-[170px] px-6 overflow-hidden">

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1791px]">
                {/* Main CTA Card */}
                <div className="relative bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[80px] pt-[65.76px] pb-[66.24px] px-[60px] overflow-hidden">

                    {/* icons-line image — right side */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/icons-line.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute right-0 top-0 h-full w-auto pointer-events-none select-none"
                        style={{ zIndex: 1 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 max-w-[55%]">
                        {/* Badge */}
                        <div className="mb-6 inline-flex">
                            <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                    <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                    <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                                </svg>
                                Trade Smarter
                            </div>
                        </div>

                        {/* Heading */}
                        <h2 className="text-[54px] leading-[70px] font-normal mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Take your trading to the <br /> next level with our insights
                        </h2>

                        {/* Subheading */}
                        <p className="text-white/70 text-[20px] leading-[32px] font-normal font-inter mb-6">
                            reviews showed that more than 75% of subscribers <br /> make back their money within 3 days
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap">
                            <button className="bg-white text-black px-8 py-4 rounded-[100px] text-[18px] font-medium inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
                                Start Now
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-[100px] text-[18px] font-medium inline-flex items-center gap-2 hover:bg-white/5 transition-colors">
                                Get a Free Consultation
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
