import Image from "next/image";
import Link from "next/link";

export default function MarketsSection() {
    return (
        <section className="w-full px-6 pb-20">
            <div className="mx-auto max-w-[1560px]">
                <div className="rounded-[80px] bg-[#FFFFFF05] border border-[#FFFFFF0D] pl-[90px] pr-6 pt-[81px] pb-[102px] flex flex-col lg:flex-row justify-between gap-6 items-center overflow-hidden relative">

                    {/* ── Top-left corner glow (Group 4) ── */}
                    <div
                        aria-hidden="true"
                        className="absolute pointer-events-none"
                        style={{
                            width: "300px",
                            height: "250px",
                            left: "0px",
                            top: "0px",
                            zIndex: 0,
                        }}
                    >
                        {/* Ellipse 1 */}
                        <div className="absolute" style={{
                            width: "270.23px", height: "423.67px",
                            left: "-100.91px", top: "-135.11px",
                            background: "#6DB7FF",
                            filter: "blur(84.47px)",
                            transform: "rotate(-56.09deg)",
                            borderRadius: "50%",
                        }} />
                        {/* Ellipse 2 */}
                        <div className="absolute" style={{
                            width: "195.02px", height: "417.1px",
                            left: "-100.47px", top: "-143.26px",
                            background: "#6294FF",
                            mixBlendMode: "plus-lighter",
                            filter: "blur(237.68px)",
                            transform: "rotate(-56.09deg)",
                            borderRadius: "50%",
                        }} />
                        {/* Ellipse 3 */}
                        <div className="absolute" style={{
                            width: "181.87px", height: "404.96px",
                            left: "-100.5px", top: "-98.08px",
                            background: "#0F4274",
                            mixBlendMode: "plus-lighter",
                            filter: "blur(237.68px)",
                            transform: "rotate(-56.09deg)",
                            borderRadius: "50%",
                        }} />
                        {/* card-dot-img overlay */}
                        <Image
                            src="/assets/card-dot-img.svg"
                            alt=""
                            width={500}
                            height={350}
                            className="absolute z-10 inset-0 w-full h-full object-cover"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Left text */}
                    <div className="flex-shrink-0 w-full max-w-[600px] relative z-10">
                        <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Global Market Insights
                        </div>

                        <h2 className="mt-5 font-medium text-[54px] leading-[59px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            We cover markets across multiple assets
                        </h2>

                        <p className="my-7 text-white/80 text-[20px] leading-[30px] font-semibold">
                            Includes indices, gold, commodities, FX, cryptocurrencies, and many more global assets
                        </p>
                        <p className="mb-8 text-white/60 text-[18px] leading-[27px] font-normal max-w-[546px]">
                            You may even request a specific analysis on any asset not<br />covered from our team.
                        </p>

                        <Link href="/learn-more" className="bg-white inline-flex items-center gap-2.5 px-[26.5px] h-[52px] rounded-[16px] text-[20px] font-semibold transition-all duration-200 hover:bg-white/10 text-black hover:text-white">
                            Learn More
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right: dashboard image */}
                    <div className="max-w-[809px] px-4.5 h-[497px] py-8 bg-[#FFFFFF03] rounded-[45px] border border-[#FFFFFF0D] flex items-center justify-center backdrop-blur-[131.948px] relative z-10">
                        <Image
                            src="/assets/markets.png"
                            alt="Market intelligence dashboard"
                            width={778}
                            height={435}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
