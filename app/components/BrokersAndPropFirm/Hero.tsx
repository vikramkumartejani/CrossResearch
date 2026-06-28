'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

function ActiveBtnGlow() {
    return (
        <svg
            aria-hidden="true"
            width="145" height="44" viewBox="0 0 145 44" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid slice"
        >
            <g filter="url(#abg_f0)">
                <path d="M110.273 25.9355C104.728 41.6835 37.3664 139.318 53.9074 145.142C70.4484 150.965 182.911 74.8362 188.456 59.0882C194 43.3402 202.95 25.0848 186.409 19.2609C169.868 13.4371 115.817 10.1875 110.273 25.9355Z" fill="#6DB7FF"/>
            </g>
            <g filter="url(#abg_f1)" style={{ mixBlendMode: 'plus-lighter' }}>
                <path d="M90.7488 19.061C85.2041 34.809 41.2988 138.027 53.1965 142.216C65.0941 146.405 154.415 57.7452 159.96 41.9971C165.504 26.2491 160.354 10.087 148.456 5.89802C136.559 1.70903 96.2934 3.31298 90.7488 19.061Z" fill="#6294FF"/>
            </g>
            <g filter="url(#abg_f2)" style={{ mixBlendMode: 'plus-lighter' }}>
                <path d="M110.273 25.9355C104.728 41.6835 62.9539 140.708 74.0621 144.619C85.1703 148.53 169.376 63.0133 174.921 47.2653C180.466 31.5173 175.955 15.5804 164.847 11.6694C153.739 7.75836 115.817 10.1875 110.273 25.9355Z" fill="#0F4274"/>
            </g>
            <defs>
                <filter id="abg_f0" x="-13.5933" y="-50.4368" width="274.391" height="260.789" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="32.4468" result="effect1_foregroundBlur_15_478"/>
                </filter>
                <filter id="abg_f1" x="-131.432" y="-178.675" width="476.214" height="503.628" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="91.2963" result="effect1_foregroundBlur_15_478"/>
                </filter>
                <filter id="abg_f2" x="-110.401" y="-172.567" width="470.286" height="499.909" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="91.2963" result="effect1_foregroundBlur_15_478"/>
                </filter>
            </defs>
        </svg>
    );
}

interface HeroProps {
    description?: string;
    descriptionMaxWidth?: string;
}

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
            <line x1="180" y1="118.5" x2="1740" y2="118.5" stroke="white" strokeOpacity="0.05" />
            <line x1="180" y1="332.5" x2="1740" y2="332.5" stroke="white" strokeOpacity="0.05" />
            <line x1="180.5" y1="1" x2="180.5" y2="333" stroke="white" strokeOpacity="0.05" />
            <line x1="1740.5" y1="1" x2="1740.5" y2="333" stroke="white" strokeOpacity="0.05" />
            <line x1="420.5" y1="1" x2="420.5" y2="332" stroke="white" strokeOpacity="0.05" />
            <line x1="620.5" y1="1" x2="620.5" y2="332" stroke="white" strokeOpacity="0.05" />
            <line x1="660.5" y1="1" x2="660.5" y2="332" stroke="white" strokeOpacity="0.05" />
            <line x1="1260.5" y1="1" x2="1260.5" y2="488" stroke="white" strokeOpacity="0.05" />
            <line x1="1500.5" y1="1" x2="1500.5" y2="332" stroke="white" strokeOpacity="0.1" />
            <line x1="1300.5" y1="1" x2="1300.5" y2="488" stroke="white" strokeOpacity="0.05" />
        </svg>
    );
};

export default function Hero({ description, descriptionMaxWidth = '860px' }: HeroProps) {
    const pathname = usePathname();
    const isBrokers = pathname === '/brokers';

    return (
        <section className="relative w-full overflow-hidden px-4 sm:px-6" aria-labelledby="hero-heading">
            {/* Background: top-lines SVG */}
            <div className="absolute inset-x-0 top-16 sm:top-[96px] z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <TopLine />
            </div>

            {/* Content wrapper */}
            <div className="mt-[192px] max-w-[1100px] mx-auto">

                {/* Toggle — Brokers / Prop Firm */}
                <div className="flex justify-center mb-8 relative z-10">
                    <div className="flex items-center bg-[#0C0C16] border border-[#FFFFFF0D] rounded-full">
                        <Link
                            href="/brokers"
                            className="relative w-[145px] h-[43.19px] flex items-center justify-center rounded-full text-[14px] leading-[14px] transition-all duration-200 overflow-hidden"
                            style={{
                                color: isBrokers ? '#fff' : 'rgba(255,255,255,0.5)',
                                border: isBrokers ? '1px solid #88C4FF99' : '1px solid transparent',
                            }}
                        >
                            {isBrokers && <ActiveBtnGlow />}
                            <span className="relative z-10">Brokers</span>
                        </Link>
                        <Link
                            href="/prop-firm"
                            className="relative w-[145px] h-[43.19px] flex items-center justify-center rounded-full text-[14px] leading-[21px] transition-all duration-200 overflow-hidden"
                            style={{
                                color: !isBrokers ? '#fff' : 'rgba(255,255,255,0.6)',
                                border: !isBrokers ? '1px solid #88C4FF99' : '1px solid transparent',
                                fontWeight: !isBrokers ? '600' : '400',
                            }}
                        >
                            {!isBrokers && <ActiveBtnGlow />}
                            <span className="relative z-10">Prop Firm</span>
                        </Link>
                    </div>
                </div>

                <h1 className="mb-4 sm:mb-6 text-center font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[73px] leading-tight md:leading-tight lg:leading-[88px] tracking-tight lg:tracking-[-0.04em] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Passionately delivering exceptional results for every single client
                </h1>

                <p className="mb-6 text-white/70 text-[14px] sm:text-[20px] leading-[20px] sm:leading-[32px] font-inter font-normal mx-auto text-center" style={{ maxWidth: descriptionMaxWidth }}>
                    {description}
                </p>
            </div>

        </section>
    );
}
