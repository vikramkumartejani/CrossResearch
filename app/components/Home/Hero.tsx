import Image from "next/image";
import TopLine from "./Svgs/TopLine";
import HeroEmailBar from "./HeroEmailBar";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden px-4 sm:px-6" aria-labelledby="hero-heading">
            {/* Background: top-lines SVG */}
            <div className="absolute inset-x-0 top-16 sm:top-[96px] z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <TopLine />
            </div>
            <div className="absolute inset-x-0 -top-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <Image src='/assets/dots-bg.svg' alt="dots-bg" width={1920} height={961} className="opacity-10 mx-auto" />
            </div>

            {/* Content wrapper */}
            <div className="mt-24 sm:mt-32 xl:mt-[136px] max-w-[1920px] bg-[#0F0F18] rounded-t-[40px] 2xl:rounded-[60px] relative z-10 mx-auto px-5 sm:px-6 pt-8 sm:pt-16 lg:pt-[76px] flex flex-col items-center justify-center">

                {/* Heading */}
                <h1 id="hero-heading" className="mb-4 sm:mb-6 text-center font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[73px] leading-tight md:leading-tight lg:leading-[88px] tracking-tight lg:tracking-[-2.93px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Institutional-Grade Market <br className="xl:block hidden" /> Intelligence for Serious Traders
                </h1>

                {/* Subheading */}
                <p className="mb-6 sm:mb-8 text-white/70 text-[14px] sm:text-[20px] leading-[20px] sm:leading-[32px] font-inter font-normal max-w-[849px] mx-auto text-center">
                    Access proprietary algorithms, macro intelligence, and market regime
                    tools trusted by advanced traders for precise, data-driven market
                    decisions worldwide.
                </p>

                <HeroEmailBar />

                {/* Social proof */}
                <div className="flex items-center sm:flex-row flex-col gap-6 mb-14 sm:mb-20 2xl:mb-[118px]">
                    <div className="flex items-center gap-2.5 sm:gap-5">
                        <div className="flex items-center">
                            {[
                                'https://randomuser.me/api/portraits/men/32.jpg',
                                'https://randomuser.me/api/portraits/women/44.jpg',
                                'https://randomuser.me/api/portraits/men/76.jpg',
                                'https://randomuser.me/api/portraits/women/68.jpg',
                                'https://randomuser.me/api/portraits/women/60.jpg',
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    className="w-8 sm:w-[35px] h-8 sm:h-[35px] rounded-full border border-white overflow-hidden -ml-4.5 sm:-ml-3.5 first:ml-0"
                                    style={{ zIndex: i + 1 }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Trader ${i + 1}`}
                                        width={35}
                                        height={35}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>

                        <p className="text-white/60 text-[16px] sm:text-[24px] leading-[20px] sm:leading-[29px] font-normal whitespace-nowrap">
                            Trusted by{' '}
                            <span className="text-[#88C4FF] font-bold">10,000+</span>
                            {' '}traders
                        </p>
                    </div>
                </div>

                <div className="bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-t-[40px] sm:rounded-t-[60px] 2xl:rounded-t-[80px] h-[600px] xl:h-[956px] py-[60px] w-full max-w-[1521px] mx-auto">
                    <h2 className="text-[60px] sm:text-[80px] sm:leading-[140%] font-medium text-center">H 1323</h2>
                </div>
            </div>
        </section>
    );
}
