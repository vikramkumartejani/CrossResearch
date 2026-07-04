
import Image from 'next/image'

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
            <line x1="180.5" y1="1" x2="180.5" y2="443" stroke="white" strokeOpacity="0.05" />
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
        <section className="relative w-full overflow-hidden px-4 sm:px-6 min-h-[600px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[900px] 2xl:min-h-[1005px] pb-0" aria-labelledby="hero-heading">
            {/* Background: top-lines SVG */}
            <div className="absolute inset-x-0 top-16 sm:top-[96px] z-10 pointer-events-none overflow-hidden" aria-hidden="true">
                <TopLine />
            </div>

            {/* Content wrapper */}
            <div className="relative z-10 mt-28 lg:mt-32 xl:mt-[172px] max-w-[1100px] mx-auto">
                <h1 className="mb-4 sm:mb-6 text-center font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[73.18px] leading-tight md:leading-tight lg:leading-[95px] tracking-tight lg:tracking-[-0.04em] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Where institutional algorithms meet true macro precision
                </h1>

                <p className="mb-6 sm:mb-10 text-white/70 text-[14px] sm:text-[20px] leading-[20px] sm:leading-[32px] font-inter font-normal max-w-[808px] mx-auto text-center">
                    Purpose-built TradingView indicators and a live macro research dashboard — giving retail traders the same data edge that moves institutional desks.
                </p>

                <div className="w-full flex items-center sm:flex-row flex-col justify-center gap-3">
                    <button className="sm:w-fit w-full bg-white text-black px-6 sm:px-8 h-[48px] sm:h-[60px] rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
                        Explore Algorithms
                    </button>
                    <button className="w-full sm:w-fit bg-[#FFFFFF08] border border-[#FFFFFF0D] text-white px-6 sm:px-8 h-[48px] sm:h-[60px] rounded-[100px] text-[16px] sm:text-[18px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                        View Macro Tools
                    </button>
                </div>
            </div>

            {/* Analysis image — right side, starts at button level */}
            <div className="absolute right-0 bottom-0 w-[100%] sm:w-[72.5%] pointer-events-none" style={{ zIndex: 1 }}>
                {/* Dark overlay — covers top of image so heading text stays visible */}
                <div
                    className="absolute pointer-events-none top-[-640px] sm:top-[-700px] md:top-[-650px] 2xl:top-[-550px]"
                    aria-hidden="true"
                    style={{
                        width: '3554px',
                        height: '733.6px',
                        left: '-891px',
                        background: '#070711',
                        filter: 'blur(52px)',
                        transform: 'rotate(-8.21deg)',
                        zIndex: 2,
                    }}
                />
                <Image
                    src="/assets/analysis.svg"
                    alt=""
                    width={1400}
                    height={602}
                    className="w-full h-[250px] sm:h-auto object-cover"
                    aria-hidden="true"
                    priority
                />
            </div>
        </section>
    );
}
