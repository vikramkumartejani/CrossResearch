'use client';

import { useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQS: FaqItem[] = [
    {
        id: 'faq-profitability',
        question: 'How profitable can I become ?',
        answer: 'Profitability depends on your trading strategy, risk management, and market conditions. Our tools are designed to help you make data-driven decisions, but past performance doesn\'t guarantee future results. Many of our users report improved decision-making and better trade execution within their first few weeks.',
    },
    {
        id: 'faq-time-commitment',
        question: 'How much time do I need to dedicate to reading your research?',
        answer: 'We understand that our subscribers have busy schedules. That\'s why we\'ve designed our research to be concise and to the point. On average, it only takes about 20 minutes a day to read through our analysis and just to keep notifications on to follow our alerts.',
    },
    {
        id: 'faq-accuracy',
        question: 'How accurate are your market predictions?',
        answer: 'Our predictions are based on institutional-grade quantitative models and proprietary algorithms. While no model is 100% accurate, our track record shows strong performance across various market regimes. We focus on probability-weighted scenarios rather than point predictions.',
    },
    {
        id: 'faq-differentiators',
        question: 'What sets your research service apart from others?',
        answer: 'We combine macro intelligence, volatility analytics, and nowcasting data with advanced TradingView indicators. Our research is built for serious traders who need institutional-grade insights, not just surface-level analysis.',
    },
    {
        id: 'faq-free-trial',
        question: 'How do I get access to the free trial ?',
        answer: 'Visit our sign-up page and select the free trial option. You\'ll get immediate access to all core features for 30 days. No credit card required to start exploring our platform.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>("faq-profitability");
    const answerRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const toggle = (id: string): void => {
        setOpenId(prev => (prev === id ? null : id));
    };

    const setRef = (id: string) => (el: HTMLDivElement | null): void => {
        answerRefs.current[id] = el;
    };

    return (
        <section className="relative w-full pb-[170px] px-6">
            {/* Ellipse 10 – right glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    width: '977.2px',
                    height: '446.65px',
                    right: '-318px',
                    top: '0%',
                    transform: 'matrix(0.94, -0.35, 0.35, 0.94, 0, 0)',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1640px]">
                <div className="flex items-start justify-between">

                    {/* Left column */}
                    <div className="flex flex-col gap-10 max-w-[600px]">
                        <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter w-fit">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Help And Support
                        </div>

                        <h2 className="text-left font-normal text-[54px] leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Frequently Asked <br /> Questions and Answers
                        </h2>

                        <p className="text-left font-inter text-white/70 text-[20px] leading-[32px] font-normal max-w-[501px]">
                            Frequently asked questions and answers to help you understand our services better.
                        </p>
                    </div>

                    {/* Right column – FAQ accordion */}
                    <div className="flex flex-col gap-6 max-w-[944px]">
                        {FAQS.map((faq: FaqItem) => {
                            const isOpen = openId === faq.id;
                            const answerId = `${faq.id}-answer`;

                            return (
                                <div
                                    key={faq.id}
                                    className="bg-[#FFFFFF08] border border-[#FFFFFF0D] p-6 rounded-[24px] overflow-hidden"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggle(faq.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={answerId}
                                        className="w-full flex items-center justify-between gap-4 cursor-pointer"
                                    >
                                        <h3 className="text-[27px] leading-[41px] font-normal text-white text-left">
                                            {faq.question}
                                        </h3>

                                        <div className="relative flex shrink-0 w-6 h-6">
                                            {/* Plus — shown when closed */}
                                            <svg
                                                aria-hidden="true"
                                                className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            >
                                                <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {/* Minus — shown when open */}
                                            <svg
                                                aria-hidden="true"
                                                className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            >
                                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Animated answer panel */}
                                    <div
                                        id={answerId}
                                        role="region"
                                        ref={setRef(faq.id)}
                                        style={{
                                            maxHeight: isOpen
                                                ? `${answerRefs.current[faq.id]?.scrollHeight ?? 500}px`
                                                : '0px',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease',
                                        }}
                                    >
                                        <p className="pt-4 text-[18px] leading-[27px] font-medium text-white/50">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
