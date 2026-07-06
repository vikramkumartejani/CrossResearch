'use client'

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ARTICLES = [
    {
        id: 1,
        tag: "Macro Insights NFP",
        title: "Recent macro developments and NFP insights",
        desc: "Recent macro developments and NFP data shape market sentiment and expectations.",
        category: "Finance",
        date: "November 12, 2024",
        size: "small",
    },
    {
        id: 2,
        tag: "Gold Market Surge",
        title: "Gold Prices Surge 30%: Key Drivers and Outlook",
        desc: "Gold prices rise driven by demand inflation uncertainty and safe haven buying",
        category: "Finance",
        date: "November 12, 2024",
        size: "small",
    },
    {
        id: 3,
        tag: "Gold Strategy Insights",
        title: "2024 gold surge and strategic market approaches",
        desc: "2024 gold surge driven by inflation trends and strategic market positioning.",
        category: "Finance",
        date: "November 12, 2024",
        size: "large",
    },
];

function TagDot() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    );
}

function ArticleCard({ article }: { article: typeof ARTICLES[number] }) {
    const isLarge = article.size === "large";
    return (
        <Link
            href={`/articles/${article.id}`}
            className={`bg-[#FFFFFF08] border border-[#FFFFFF0D] group p-4 sm:p-5 flex items-start flex-col rounded-[30px] xl:rounded-[50px] overflow-hidden transition-all duration-200 w-full ${isLarge ? 'xl:p-[30px]' : 'xl:py-4 xl:pl-4 xl:pr-5 xl:flex-row xl:items-center'}`}
        >
            <div className={`relative flex-shrink-0 w-full bg-[#FFFFFF0D] rounded-[30px] xl:rounded-[40px] ${isLarge ? 'h-[200px] sm:h-[334px]' : 'xl:w-[318px] min-h-[200px] sm:min-h-[334px]'}`}>
                <div className={`absolute bottom-5 flex items-center gap-2 ${isLarge ? 'right-6' : 'left-5'}`}>
                    <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">{article.category}</span>
                    <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">{article.date}</span>
                </div>
            </div>
            <div className={`flex-1 mt-6 sm:mt-8 flex flex-col justify-between ${!isLarge ? 'xl:pl-8 xl:mt-0' : ''}`}>
                <div>
                    <div className="mb-4 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-[7.37px] pl-[12.89px] pr-[14.73px] py-[8.29px] rounded-[100px] text-[12.89px] leading-[15px] font-normal font-inter">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.98588" cy="5.98588" r="5.98588" fill="#88C4FF" /><circle cx="5.98602" cy="5.98583" r="4.38964" fill="#21314F" /><circle cx="5.98585" cy="5.98579" r="2.79341" fill="#88C4FF" /></svg>
                        {article.tag}
                    </div>
                    <h3 className="text-white text-[20px] sm:text-[22px] font-semibold mb-3 leading-7 sm:leading-[29px] group-hover:text-[#88C4FF] transition-colors">{article.title}</h3>
                    <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] font-inter font-normal">{article.desc}</p>
                </div>
            </div>
        </Link>
    );
}

export default function ArticlesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const small = ARTICLES.filter((a) => a.size === "small");
    const large = ARTICLES.filter((a) => a.size === "large");

    const navigate = (dir: 1 | -1) => {
        setActiveIndex(prev => (prev + dir + ARTICLES.length) % ARTICLES.length);
    };

    return (
        <section className="relative w-full pt-0 sm:pt-[90px] px-4 sm:px-6">
            {/* Left glow */}
            <div aria-hidden="true" className="absolute pointer-events-none z-0 w-[500px] h-[230px] md:w-[700px] md:h-[320px] lg:w-[977px] lg:h-[446px] -left-90 md:-left-64 lg:-left-[512px] top-[50px] sm:top-[220px] sm:-rotate-[20.7deg] bg-[rgba(34,126,217,0.4)] blur-[70px] md:blur-[200px] lg:blur-[250px]" />

            <div className="relative z-10 mx-auto max-w-[1560px]">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-6 sm:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <TagDot />
                        Market Insight Hub
                    </div>
                    <h2 className="text-center font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-[70px] mb-4 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Our articles provide deep <br className="sm:block hidden" /> insights into global market trends
                    </h2>
                    <p className="text-center text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[650px] mx-auto">
                        Our articles provide deep insights into global market trends, helping you make informed financial decisions.
                    </p>
                </div>

                {/* Desktop grid */}
                <div className="hidden lg:grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6">
                        {small.map((article) => (
                            <Link key={article.id} href={`/articles/${article.id}`} className="bg-[#FFFFFF08] border border-[#FFFFFF0D] group p-4 sm:p-5 xl:py-4 xl:pl-4 xl:pr-5 flex items-start lg:items-center xl:flex-row flex-col rounded-[30px] xl:rounded-[50px] overflow-hidden transition-all duration-200">
                                <div className="relative flex-shrink-0 w-full xl:w-[318px] min-h-[334px] bg-[#FFFFFF0D] rounded-[30px] xl:rounded-[40px]">
                                    <div className="absolute bottom-5 left-5 flex items-center gap-2">
                                        <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">{article.category}</span>
                                        <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">{article.date}</span>
                                    </div>
                                </div>
                                <div className="flex-1 xl:pl-8 mt-6 sm:mt-8 xl:mt-0 flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-[7.37px] pl-[12.89px] pr-[14.73px] py-[8.29px] rounded-[100px] text-[12.89px] leading-[15px] font-normal font-inter">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.98588" cy="5.98588" r="5.98588" fill="#88C4FF" /><circle cx="5.98602" cy="5.98583" r="4.38964" fill="#21314F" /><circle cx="5.98585" cy="5.98579" r="2.79341" fill="#88C4FF" /></svg>
                                            {article.tag}
                                        </div>
                                        <h3 className="text-white text-[20px] sm:text-[22px] font-semibold mb-3 leading-7 sm:leading-[29px] group-hover:text-[#88C4FF] transition-colors">{article.title}</h3>
                                        <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] font-inter font-normal">{article.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {large.map((article) => (
                        <Link key={article.id} href={`/articles/${article.id}`} className="bg-[#FFFFFF08] border border-[#FFFFFF0D] group p-4 sm:p-5 xl:p-[30px] flex items-start flex-col rounded-[30px] xl:rounded-[50px] overflow-hidden transition-all duration-200">
                            <div className="relative flex-shrink-0 w-full lg:max-w-[708px] h-[334px] lg:min-h-[550px] bg-[#FFFFFF0D] rounded-[30px] xl:rounded-[40px]">
                                <div className="absolute bottom-5 lg:bottom-6 right-6 flex items-center gap-2">
                                    <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">{article.category}</span>
                                    <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">{article.date}</span>
                                </div>
                            </div>
                            <div className="mt-6 sm:mt-8">
                                <div className="mb-4 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-[7.37px] pl-[12.89px] pr-[14.73px] py-[8.29px] rounded-[100px] text-[12.89px] leading-[15px] font-normal font-inter">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.98588" cy="5.98588" r="5.98588" fill="#88C4FF" /><circle cx="5.98602" cy="5.98583" r="4.38964" fill="#21314F" /><circle cx="5.98585" cy="5.98579" r="2.79341" fill="#88C4FF" /></svg>
                                    {article.tag}
                                </div>
                                <h3 className="text-white text-[20px] sm:text-[22px] font-semibold mb-3 leading-7 sm:leading-[29px] group-hover:text-[#88C4FF] transition-colors">{article.title}</h3>
                                <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] font-inter font-normal">{article.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile slider */}
                <div className="lg:hidden">
                    <div className="flex items-end justify-end gap-3 mb-6">
                        <button type="button" aria-label="Previous" onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-[#FFFFFF0D] flex items-center justify-center hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <button type="button" aria-label="Next" onClick={() => navigate(1)} className="w-12 h-12 rounded-full bg-[#FFFFFF0D] flex items-center justify-center hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>

                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.1, ease: 'easeInOut' }}
                            >
                                <ArticleCard article={ARTICLES[activeIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* View All button */}
                <div className="flex justify-center mt-10 sm:mt-[60px]">
                    <Link href="/articles" className="bg-white inline-flex items-center gap-2.5 px-8 h-[50px] sm:h-[62px] rounded-full text-[20px] leading-6 font-semibold transition-all duration-200 hover:bg-white/10 text-black hover:text-white">
                        View All
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
