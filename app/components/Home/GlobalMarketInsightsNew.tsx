'use client';

import { useState, useEffect, useRef } from 'react';
import Image from '@/lib/CldImage';

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS = [
    {
        id: 'nowcasting',
        title: 'Nowcasting',
        description: 'Track economic activity, inflation, and growth expectations before official releases',
        image: '/assets/Nowcasting.png',
        imageMobile: '/assets/proprietary.png',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.6666 6.82043C21.9665 6.82043 23.6164 6.82043 24.6415 7.87184C25.6666 8.92325 25.6666 10.6155 25.6666 13.9999C25.6666 17.3844 25.6666 19.0766 24.6415 20.128C23.6164 21.1794 21.9665 21.1794 18.6666 21.1794L9.33329 21.1794C6.03346 21.1794 4.38354 21.1794 3.35842 20.128C2.33329 19.0766 2.33329 17.3844 2.33329 13.9999C2.33329 10.6155 2.33329 8.92325 3.35842 7.87184C4.38354 6.82043 6.03346 6.82043 9.33329 6.82043L18.6666 6.82043Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M23.625 3.23069C23.625 3.72633 23.2332 4.12812 22.75 4.12812L5.24996 4.12812C4.76671 4.12812 4.37496 3.72633 4.37496 3.23069C4.37496 2.73505 4.76671 2.33325 5.24996 2.33325L22.75 2.33325C23.2332 2.33325 23.625 2.73505 23.625 3.23069ZM23.625 24.7691C23.625 25.2648 23.2332 25.6666 22.75 25.6666L5.24996 25.6666C4.76671 25.6666 4.37496 25.2648 4.37496 24.7691C4.37496 24.2735 4.76671 23.8717 5.24996 23.8717L22.75 23.8717C23.2332 23.8717 23.625 24.2735 23.625 24.7691Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        id: 'quant',
        title: 'Proprietary Quant Models',
        description: 'Monitor risk regimes, volatility trends, and market stress indicators across asset classes',
        image: '/assets/Proprietory.png',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.94043 5.9294C3.5 6.55691 3.5 8.42217 3.5 12.1527V13.9898C3.5 20.5676 8.44546 23.7597 11.5483 25.1151C12.39 25.4827 12.8109 25.6666 14 25.6666C15.1891 25.6666 15.61 25.4827 16.4517 25.1151C19.5545 23.7597 24.5 20.5676 24.5 13.9898V12.1527C24.5 8.42217 24.5 6.55691 24.0596 5.9294C23.6191 5.30188 21.8653 4.70154 18.3576 3.50084L17.6893 3.27209C15.8609 2.6462 14.9466 2.33325 14 2.33325C13.0534 2.33325 12.1391 2.6462 10.3107 3.27209L9.6424 3.50084C6.13471 4.70154 4.38087 5.30188 3.94043 5.9294ZM19.1917 12.7749L15.225 9.79992C14.4991 9.25547 13.5009 9.25547 12.775 9.79992L8.80833 12.7749C8.42173 13.0649 8.34338 13.6133 8.63333 13.9999C8.92328 14.3865 9.47173 14.4649 9.85833 14.1749L13.825 11.1999C13.9287 11.1221 14.0713 11.1221 14.175 11.1999L18.1417 14.1749C18.5283 14.4649 19.0767 14.3865 19.3667 13.9999C19.6566 13.6133 19.5783 13.0649 19.1917 12.7749ZM16.8583 15.6916L14.525 13.9416C14.2139 13.7083 13.7861 13.7083 13.475 13.9416L11.1417 15.6916C10.7551 15.9815 10.6767 16.53 10.9667 16.9166C11.2566 17.3032 11.8051 17.3815 12.1917 17.0916L14 15.7353L15.8083 17.0916C16.1949 17.3815 16.7434 17.3032 17.0333 16.9166C17.3233 16.53 17.2449 15.9815 16.8583 15.6916Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        id: 'tradingview',
        title: 'TradingView Toolkit',
        description: 'Advanced institutional indicators designed for traders seeking higher-conviction market signals',
        image: '/assets/Toolkit.png',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.33333 7.73976C2.33333 4.75383 4.7539 2.33325 7.73983 2.33325C10.7258 2.33325 13.1463 4.75383 13.1463 7.73976C13.1463 10.7257 10.7258 13.1463 7.73983 13.1463C4.7539 13.1463 2.33333 10.7257 2.33333 7.73976Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.8537 20.2601C14.8537 17.2742 17.2742 14.8536 20.2602 14.8536C23.2461 14.8536 25.6667 17.2742 25.6667 20.2601C25.6667 23.246 23.2461 25.6666 20.2602 25.6666C17.2742 25.6666 14.8537 23.246 14.8537 20.2601Z" fill="currentColor" />
                <path d="M2.33333 20.4166C2.33333 17.9417 2.33333 16.7043 3.10217 15.9354C3.87102 15.1666 5.10845 15.1666 7.58333 15.1666C10.0582 15.1666 11.2956 15.1666 12.0645 15.9354C12.8333 16.7043 12.8333 17.9417 12.8333 20.4166C12.8333 22.8915 12.8333 24.1289 12.0645 24.8977C11.2956 25.6666 10.0582 25.6666 7.58333 25.6666C5.10845 25.6666 3.87102 25.6666 3.10217 24.8977C2.33333 24.1289 2.33333 22.8915 2.33333 20.4166Z" fill="currentColor" />
                <path d="M15.1667 7.58325C15.1667 5.10838 15.1667 3.87094 15.9355 3.1021C16.7044 2.33325 17.9418 2.33325 20.4167 2.33325C22.8915 2.33325 24.129 2.33325 24.8978 3.1021C25.6667 3.87094 25.6667 5.10838 25.6667 7.58325C25.6667 10.0581 25.6667 11.2956 24.8978 12.0644C24.129 12.8333 22.8915 12.8333 20.4167 12.8333C17.9418 12.8333 16.7044 12.8333 15.9355 12.0644C15.1667 11.2956 15.1667 10.0581 15.1667 7.58325Z" fill="currentColor" />
            </svg>
        ),
    },
];

const DURATION = 5000; // 8 seconds per tab

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlobalMarketInsightsNew() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = (index: number) => {
        // Clear existing
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (progressRef.current) clearInterval(progressRef.current);

        setProgress(0);

        // Progress bar - tick every 30ms
        const step = (30 / DURATION) * 100;
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + step;
            });
        }, 30);

        // Advance tab after DURATION
        intervalRef.current = setTimeout(() => {
            setActiveIndex((index + 1) % TABS.length);
        }, DURATION) as unknown as ReturnType<typeof setInterval>;
    };

    useEffect(() => {
        startTimer(activeIndex);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    const handleTabClick = (index: number) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    };

    const activeTab = TABS[activeIndex];

    return (
        <div className="max-w-[1640px] mx-auto border border-[#FFFFFF1A] bg-[#FFFFFF05] rounded-[30px] sm:rounded-[40px] p-4 sm:p-6 flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6">

            {/* ── Left: tabs ── */}
            <div className="w-full lg:max-w-[420px] xl:max-w-[616px] flex flex-col gap-4">
                {TABS.map((tab, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(i)}
                            className={`text-left w-full rounded-[16px] sm:rounded-[24px] xl:rounded-[32px] cursor-pointer bg-[#FFFFFF0D] transition-all duration-300 overflow-hidden ${isActive
                                ? ''
                                : ''
                                }`}
                        >
                            <div className="py-4 sm:py-8 xl:py-10 px-4 sm:px-6 xl:px-8">
                                {/* Title row */}
                                <div className={`flex items-center gap-1.5 mb-0 transition-colors duration-300 ${isActive ? 'text-[#88C4FF]' : 'text-white'}`}>
                                    <span className="flex-shrink-0">{tab.icon}</span>
                                    <span className={`text-[18px] sm:text-[20px] 2xl:text-[28px] font-medium leading-[22px] sm:leading-[24px] sm:leading-[31px] ${isActive ? 'text-[#88C4FF]' : 'text-white'}`}>
                                        {tab.title}
                                    </span>
                                </div>

                                {/* Description + progress - only when active */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateRows: isActive ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 0.35s ease',
                                    }}
                                >
                                    <div style={{ overflow: 'hidden' }}>
                                        <p className="mt-3 sm:mt-4 text-[16px] sm:text-[18px] 2xl:text-[24px] leading-light 2xl:leading-[32px] font-normal bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                                            {tab.description}
                                        </p>

                                        {/* Progress bar */}
                                        <div className="mt-4 sm:mt-6 h-[5px] sm:h-[9px] rounded-full bg-[#FFFFFF0D] overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[#88C4FF] transition-none"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* ── Right: image panel ── */}
            <div className="flex-1 relative rounded-[20px] sm:rounded-[40px] overflow-hidden bg-[#FFFFFF0D] min-h-[340px] sm:min-h-[300px] lg:min-h-0">

                {/* Ellipse 17030 - center glow */}
                <div
                    aria-hidden="true"
                    className="absolute pointer-events-none blur-[60px] sm:blur-[100px]"
                    style={{
                        width: '625px', height: '356px',
                        left: '140px', top: '81px',
                        background: '#227ED9',
                        zIndex: 0,
                    }}
                />

                {/* Inner image box - right-bottom aligned */}
                <div className="absolute bottom-0 right-0 z-10 w-[789px] max-w-[95%] rounded-tl-[30px] sm:rounded-tl-[40px] overflow-hidden border-t border-l border-[#88C4FFB2] bg-[#1B1C26]"
                    style={{height: '386px', maxHeight: '92%' }}>
                    {TABS.map((tab, i) => (
                        <div
                            key={tab.id}
                            className="absolute inset-0 transition-opacity duration-500"
                            style={{ opacity: i === activeIndex ? 1 : 0 }}
                        >
                            <Image
                                src={tab.imageMobile || tab.image}
                                alt={tab.title}
                                fill
                                className="object-cover object-center lg:hidden"
                                sizes="(max-width: 1024px) 95vw, 0px"
                                priority={i === 0}
                            />
                            <Image
                                src={tab.image}
                                alt={tab.title}
                                fill
                                className="object-cover object-top hidden lg:block"
                                sizes="(min-width: 1024px) 789px, 0px"
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
