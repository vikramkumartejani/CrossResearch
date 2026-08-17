'use client';

import { useState } from 'react';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

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

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>('faq-profitability');

    const toggle = (id: string): void => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="faq" className="relative w-full scroll-mt-28 pb-20 lg:pb-[120px] xl:pb-[170px] px-4 sm:px-6">

            <div
                aria-hidden="true"
                className="absolute pointer-events-none z-0 w-[450px] h-[250px] md:w-[600px] md:h-[340px] lg:w-[800px] lg:h-[446.65px]
                            -right-60 lg:-right-[318px] top-[20%] -rotate-[20.4deg] bg-[#227ED966]
                            blur-[100px] md:blur-[200px] lg:blur-[250px]"
            />

          <div
                aria-hidden="true"
                className="lg:block hidden absolute pointer-events-none z-0 w-[420px] h-[210px] md:w-[580px] md:h-[290px] lg:w-[777.2px] lg:h-[380.65px]
                           -left-40 md:-left-56 lg:-left-[476px] bottom-40 lg:bottom-[100px] -rotate-[20.4deg] bg-[#227ED966]
                            blur-[160px] lg:blur-[200px]"
            />

            <div className="relative z-10 mx-auto max-w-[1640px]">
                <div className="flex items-start justify-between lg:flex-row flex-col gap-10">

                    <div className="flex flex-col gap-6 lg:gap-10 max-w-[600px]">
                        <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter w-fit">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Help And Support
                        </div>

                        <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Frequently Asked <br /> Questions and Answers
                        </h2>

                        <p className="text-left font-inter text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[501px]">
                            Frequently asked questions and answers to help you understand our services better.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:max-w-[700px] xl:max-w-[944px] w-full">
                        {FAQS.map((faq: FaqItem) => {
                            const isOpen = openId === faq.id;
                            const answerId = `${faq.id}-answer`;

                            return (
                                <div
                                    key={faq.id}
                                    className="bg-[#FFFFFF08] border border-[#FFFFFF0D] p-5 sm:p-6 rounded-[24px]"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggle(faq.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={answerId}
                                        className="w-full flex items-center justify-between gap-2.5 sm:gap-4 cursor-pointer text-left"
                                    >
                                        <span className="text-[18px] sm:text-[27px] leading-6 sm:leading-[41px] font-normal text-white">
                                            {faq.question}
                                        </span>

                                        <span className="relative flex shrink-0 w-6 h-6" aria-hidden="true">
                                            <svg
                                                className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            >
                                                <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <svg
                                                className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            >
                                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div
                                        id={answerId}
                                        role="region"
                                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="pt-4 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[27px] font-medium text-white/60">
                                                {faq.answer}
                                            </p>
                                        </div>
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
