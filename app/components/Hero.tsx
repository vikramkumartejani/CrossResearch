import Image from "next/image";
import TopLine from "./Svgs/TopLine";
import ButtonGlow from "./Svgs/ButtonGlow";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden px-6" aria-labelledby="hero-heading">
            {/* Background: top-lines SVG */}
            <div className="absolute inset-x-0 top-[96px] z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <TopLine />
            </div>
            <div className="absolute inset-x-0 -top-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <Image src='/assets/dots-bg.svg' alt="dots-bg" width={1920} height={961} className="opacity-10 mx-auto" />
            </div>

            {/* Content wrapper */}
            <div className="mt-[136px] max-w-[1920px] bg-[#0F0F18] rounded-[60px] relative z-10 mx-auto px-6 pt-[76px] flex flex-col items-center justify-center">

                {/* Heading */}
                <h1 className="text-center font-normal text-[73.18px] leading-[88px] tracking-[-2.93px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Institutional-Grade Market <br /> Intelligence for Serious Traders
                </h1>

                {/* Subheading */}
                <p className="mb-6 text-white/70 text-[20px] leading-[32px] font-inter font-normal max-w-[849px] mx-auto text-center">
                    Access proprietary algorithms, macro intelligence, and market regime
                    tools trusted by advanced traders for precise, data-driven market
                    decisions worldwide.
                </p>

                {/* CTA row */}
                <div className="flex items-center gap-6 mb-[118px]">
                    <button
                        type="button"
                        aria-label="Get Access Now"
                        className="relative cursor-pointer hover:opacity-90 transition-opacity h-[48px]"
                    >
                        <ButtonGlow />
                    </button>

                    {/* Avatars + trusted text */}
                    <div className="flex items-center gap-5">
                        {/* Overlapping avatar stack */}
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
                                    className="w-[35px] h-[35px] rounded-full border border-white overflow-hidden -ml-3.5 first:ml-0"
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

                        {/* Text */}
                        <p className="text-white/60 text-[24px] leading-[29px] font-normal whitespace-nowrap">
                            Trusted by{' '}
                            <span className="text-[#88C4FF] font-bold">10,000+</span>
                            {' '}traders
                        </p>
                    </div>
                </div>

                <div className="bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-t-[80px] h-[956px] py-[60px] w-full max-w-[1521px] mx-auto">
                    <h2 className="text-[80px] leading-[140%] font-medium text-center">H 1323</h2>
                </div>
            </div>
        </section>
    );
}
