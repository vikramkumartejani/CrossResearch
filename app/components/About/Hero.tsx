
const TopLine = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 630"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
        >
            <line y1="0.5" x2="1920" y2="0.5" stroke="white" strokeOpacity="0.05" />
            <line x1="180" y1="96.5" x2="1740" y2="96.5001" stroke="white" strokeOpacity="0.05" />
            <line x1="180" y1="342.5" x2="1740" y2="342.5" stroke="white" strokeOpacity="0.05" />
            <line x1="180" y1="442.5" x2="1740" y2="442.5" stroke="white" strokeOpacity="0.05" />
            <line x1="180.5" y1="1" x2="180.5" y2="488" stroke="white" strokeOpacity="0.05" />
            <line x1="1740.5" y1="1" x2="1740.5" y2="443" stroke="white" strokeOpacity="0.05" />
            <line x1="420.5" y1="1" x2="420.5" y2="343" stroke="white" strokeOpacity="0.05" />
            <line x1="620.5" y1="1" x2="620.5" y2="443" stroke="white" strokeOpacity="0.05" />
            <line x1="660.5" y1="1" x2="660.5" y2="443" stroke="white" strokeOpacity="0.05" />
            <line x1="1260.5" y1="1" x2="1260.5" y2="443" stroke="white" strokeOpacity="0.05" />
            <line x1="1500.5" y1="1" x2="1500.5" y2="342" stroke="white" strokeOpacity="0.1" />
            <line x1="1300.5" y1="1" x2="1300.5" y2="443" stroke="white" strokeOpacity="0.05" />
        </svg>
    );
};

export default function Hero() {

    return (
        <section className="relative w-full overflow-hidden px-4 sm:px-6 pb-14 md:pb-16 lg:pb-24" aria-labelledby="hero-heading">
            {/* Background: top-lines SVG */}
            <div className="absolute inset-x-0 top-16 sm:top-[96px] z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <TopLine />
            </div>

            {/* Content wrapper */}
            <div className="mt-28 lg:mt-32 xl:mt-[172px] max-w-[1100px] mx-auto">
                <h1 className="mb-4 sm:mb-6 text-center font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[73px] leading-tight md:leading-tight lg:leading-[88px] tracking-tight lg:tracking-[-0.04em] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Institutional Research Tools for Modern Retail Traders
                </h1>

                <p className="mb-6 text-white/70 text-[14px] sm:text-[20px] leading-[20px] sm:leading-[32px] font-inter font-normal max-w-[808px] mx-auto text-center">
                    Advanced market research and data-driven insights helping retail traders analyze markets with institutional-level confidence daily.
                </p>

                <div className="w-full flex items-center justify-center">
                    <button className="w-full sm:w-fit bg-white text-black px-6 sm:px-8 h-[48px] sm:h-[60px] rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}
