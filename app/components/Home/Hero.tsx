import Image from '@/lib/CldImage';
import TopLine from "./Svgs/TopLine";
import HeroEmailBar from "./HeroEmailBar";
import HeroPreview from "./HeroPreview";

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
            <div className="mt-[84px] sm:mt-[92px] xl:mt-[100px] max-w-[1920px] bg-[#0F0F18] rounded-t-[40px] 2xl:rounded-[60px] relative z-10 mx-auto overflow-hidden">
                <div className="px-5 sm:px-6 pt-6 sm:pt-8 lg:pt-10 flex flex-col items-center justify-center">
                    {/* Heading */}
                    <h1 id="hero-heading" className="font-urbanist mb-4 sm:mb-6 text-center font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[73px] leading-tight md:leading-tight lg:leading-[88px] tracking-tight lg:tracking-[-2.93px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Institutional-<span className="text-[#88C4FF]">Grade</span> Market <br className="xl:block hidden" /> Intelligence for Serious Traders
                    </h1>

                    {/* Subheading */}
                    <p className="mb-6 sm:mb-8 text-white/70 text-[14px] sm:text-[20px] leading-[20px] sm:leading-[32px] font-urbanist font-normal max-w-[849px] mx-auto text-center">
                        Access proprietary algorithms, macro intelligence, and market regime
                        tools trusted by advanced traders for precise, data-driven market
                        decisions worldwide.
                    </p>

                    <div className="w-full max-w-[900px] mx-auto mb-8 sm:mb-10 lg:mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <HeroEmailBar />

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
                                        className="w-6 sm:w-7 h-6 sm:h-7 rounded-full border border-white overflow-hidden -ml-2 first:ml-0"
                                        style={{ zIndex: i + 1 }}
                                    >
                                        <Image
                                            src={src}
                                            alt={`Trader ${i + 1}`}
                                            width={28}
                                            height={28}
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/55 text-[12px] sm:text-[14px] leading-[16px] sm:leading-[18px] font-normal whitespace-nowrap">
                                Trusted by{' '}
                                <span className="text-[#88C4FF] font-semibold">10,000+</span>
                                {' '}traders
                            </p>
                        </div>
                    </div>
                </div>

                <HeroPreview />
            </div>
        </section>
    );
}
