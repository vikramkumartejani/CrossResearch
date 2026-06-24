import Link from "next/link";

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

export default function ArticlesSection() {
    const small = ARTICLES.filter((a) => a.size === "small");
    const large = ARTICLES.filter((a) => a.size === "large");

    return (
        <section className="relative w-full pt-[90px] px-6">
            {/* Left glow — Ellipse 3 (relative to section top) */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                    width: "977px",
                    height: "446px",
                    left: "-512px",
                    top: "220px",
                    background: "rgba(34, 126, 217, 0.4)",
                    filter: "blur(250px)",
                    transform: "rotate(-20.7deg)",
                    zIndex: 0,
                }}
            />
            {/* Right glow — Ellipse 12 */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                    width: "977px",
                    height: "446px",
                    right: "-400px",
                    top: "0px",
                    background: "rgba(34, 126, 217, 0.4)",
                    filter: "blur(250px)",
                    transform: "rotate(-20.7deg)",
                    zIndex: 0,
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1560px]">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                        <TagDot />
                        Market Insight Hub
                    </div>

                    <h2 className="max-w-[840px] mx-auto text-center font-normal text-[54px] leading-[70px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Our articles provide deep <br /> insights into global market trends
                    </h2>

                    <p className="text-center text-white/70 text-[20px] leading-[32px] font-normal max-w-[650px] mx-auto">
                        Our articles provide deep insights into global market trends, helping you make informed financial decisions.
                    </p>
                </div>

                {/* Articles grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left column — two small cards stacked */}
                    <div className="flex flex-col gap-6">
                        {small.map((article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.id}`}
                                className="bg-[#FFFFFF08] border border-[#FFFFFF0D] group py-4 pl-4 pr-5 flex items-center flex-row rounded-[50px] overflow-hidden transition-all duration-200"
                            >
                                {/* Thumbnail */}
                                <div className="relative flex-shrink-0 w-[318px] min-h-[334px] bg-[#FFFFFF0D] rounded-[40px]">
                                    <div className="absolute bottom-5 left-5 flex items-center gap-2">
                                        <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">
                                            {article.category}
                                        </span>
                                        <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">
                                            {article.date}
                                        </span>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="flex-1 pl-8 flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-[7.37px] pl-[12.89px] pr-[14.73px] py-[8.29px] rounded-[100px] text-[12.89px] leading-[15px] font-normal font-inter">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="5.98588" cy="5.98588" r="5.98588" fill="#88C4FF" />
                                                <circle cx="5.98602" cy="5.98583" r="4.38964" fill="#21314F" />
                                                <circle cx="5.98585" cy="5.98579" r="2.79341" fill="#88C4FF" />
                                            </svg>
                                            {article.tag}
                                        </div>

                                        <h3 className="text-white text-[22px] font-semibold mb-3 leading-[29px] group-hover:text-[#88C4FF] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-white/70 text-[16px] leading-[26px] font-inter font-normal">
                                            {article.desc}
                                        </p>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right column — one large card */}
                    {large.map((article) => (
                        <Link
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="bg-[#FFFFFF08] border border-[#FFFFFF0D] group p-[30px] flex items-start flex-col rounded-[50px] overflow-hidden transition-all duration-200"
                        >
                            {/* Thumbnail — tall */}
                            <div className="relative flex-shrink-0 w-full max-w-[708px] min-h-[550px] bg-[#FFFFFF0D] rounded-[40px]">
                                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                                    <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">
                                        {article.category}
                                    </span>
                                    <span className="bg-[#FFFFFF0D] px-4 py-[7px] rounded-full text-[12px] leading-4 font-normal text-white/50">
                                        {article.date}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mt-8">
                                <div className="mb-4 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-[7.37px] pl-[12.89px] pr-[14.73px] py-[8.29px] rounded-[100px] text-[12.89px] leading-[15px] font-normal font-inter">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5.98588" cy="5.98588" r="5.98588" fill="#88C4FF" />
                                        <circle cx="5.98602" cy="5.98583" r="4.38964" fill="#21314F" />
                                        <circle cx="5.98585" cy="5.98579" r="2.79341" fill="#88C4FF" />
                                    </svg>
                                    {article.tag}
                                </div>

                                <h3 className="text-white text-[22px] font-semibold mb-3 leading-[29px] group-hover:text-[#88C4FF] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-white/70 text-[16px] leading-[26px] font-inter font-normal">
                                    {article.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All button */}
                <div className="flex justify-center mt-[60px]">
                    <Link
                        href="/articles"
                        className="bg-white inline-flex items-center gap-2.5 px-8 h-[62px] rounded-full text-[20px] leading-6 font-semibold transition-all duration-200 hover:bg-white/10 text-black hover:text-white"
                    >
                        View All
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
