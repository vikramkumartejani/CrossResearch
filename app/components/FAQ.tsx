'use client';

import { useState } from 'react';

const FAQS = [
    {
        question: "How profitable can I become ?",
        answer: "Profitability depends on your trading strategy, risk management, and market conditions. Our tools are designed to help you make data-driven decisions, but past performance doesn't guarantee future results. Many of our users report improved decision-making and better trade execution within their first few weeks.",
    },
    {
        question: "How much time do I need to dedicate to reading your research?",
        answer: "We understand that our subscribers have busy schedules. That's why we've designed our research to be concise and to the point. On average, it only takes about 20 minutes a day to read through our analysis and just to keep notifications on to follow our alerts.",
    },
    {
        question: "How accurate are your market predictions?",
        answer: "Our predictions are based on institutional-grade quantitative models and proprietary algorithms. While no model is 100% accurate, our track record shows strong performance across various market regimes. We focus on probability-weighted scenarios rather than point predictions.",
    },
    {
        question: "What sets your research service apart from others?",
        answer: "We combine macro intelligence, volatility analytics, and nowcasting data with advanced TradingView indicators. Our research is built for serious traders who need institutional-grade insights, not just surface-level analysis.",
    },
    {
        question: "How do I get access to the free trial ?",
        answer: "Visit our sign-up page and select the free trial option. You'll get immediate access to all core features for 30 days. No credit card required to start exploring our platform.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full py-[120px] px-6 overflow-hidden">
            {/* Left Shadow */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                    width: "1168px",
                    height: "1833px",
                    left: "0px",
                    top: "-300px",
                    zIndex: 0,
                }}
            >
                <svg width="1168" height="1833" viewBox="0 0 1168 1833" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_15_3640)">
                        <ellipse cx="488.602" cy="223.325" rx="488.602" ry="223.325" transform="matrix(0.935232 -0.354035 0.353004 0.935622 -476 880.13)" fill="#227ED9" fillOpacity="0.4"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_15_3640" x="-903.991" y="144.828" width="1927.56" height="1542.54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_15_3640"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Right Shadow */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                    width: "1141px",
                    height: "1833px",
                    right: "0px",
                    top: "700",
                    zIndex: 0,
                }}
            >
                <svg width="1141" height="1833" viewBox="0 0 1141 1833" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_15_3639)">
                        <ellipse cx="488.602" cy="223.325" rx="488.602" ry="223.325" transform="matrix(0.935232 -0.354035 0.353004 0.935622 572.11 880.13)" fill="#227ED9" fillOpacity="0.4"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_15_3639" x="144.118" y="144.828" width="1927.56" height="1542.54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_15_3639"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1640px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-start">
                    {/* Left column */}
                    <div className="flex flex-col gap-[24px]">
                        {/* Badge */}
                        <div className="inline-flex w-fit">
                            <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                    <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                    <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                                </svg>
                                Help And Support
                            </div>
                        </div>

                        {/* Heading */}
                        <h2 className="font-normal text-[54px] leading-[100%] tracking-[-2.93px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Frequently Asked <br /> Questions and Answers
                        </h2>

                        {/* Subheading */}
                        <p className="text-white/60 text-[20px] leading-[160%] font-normal max-w-[465px]">
                            Frequently asked questions and answers to help you understand our services better.
                        </p>
                    </div>

                    {/* Right column - FAQ items */}
                    <div className="flex flex-col gap-4">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[20px] overflow-hidden"
                            >
                                {/* Question header */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-6 flex items-center justify-between gap-4 hover:bg-[#FFFFFF12] transition-colors duration-200"
                                    aria-expanded={openIndex === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <h3 className="text-[27px] leading-[150%] font-normal text-white text-left">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{
                                                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            <path
                                                d="M12 5V19M5 12H19"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </button>

                                {/*
                                    CSS grid trick: animating `grid-template-rows` from `0fr` → `1fr`
                                    is the smoothest way to expand/collapse variable-height content.
                                    Unlike max-height, it doesn't clip or jump — it tracks the real
                                    content height perfectly.
                                */}
                                <div
                                    id={`faq-answer-${index}`}
                                    style={{
                                        display: 'grid',
                                        gridTemplateRows: openIndex === index ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 0.35s ease',
                                    }}
                                >
                                    <div style={{ overflow: 'hidden', minHeight: 0 }}>
                                        <p className="px-6 pb-6 text-[18px] leading-[150%] font-normal text-white/70">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}