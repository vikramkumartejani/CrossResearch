import Image from "next/image";

const FEATURES = [
    {
        num: "01",
        total: "03",
        title: "Nowcasting",
        desc: "Track economic activity, inflation, and growth expectations before official releases",
    },
    {
        num: "02",
        total: "03",
        title: "Volatility Analytics",
        desc: "Monitor risk regimes, volatility trends, and market stress indicators across asset classes",
    },
    {
        num: "03",
        total: "03",
        title: "TradingView Toolkit",
        desc: "Advanced institutional indicators designed for traders seeking higher-conviction market signals",
    },
];

export default function GlobalMarketInsights() {
    return (
        <section className="relative w-full pt-[50px] px-6">
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1640px]">

                {/* Badge */}
                <div className="flex justify-center mb-5">
                    <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        Global Market Insights
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-center font-medium text-[54px] leading-[59px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Building Next<br />Gen Financial Tools
                </h2>

                {/* Subheading */}
                <p className="text-center text-white/60 text-[22px] leading-[33px] font-normal max-w-[465px] mx-auto">
                    Helping Retail Traders to Understand Markets
                    From an Institutional Perspective
                </p>

                {/* Card */}
                <div className="mt-20 bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[40px] pt-[45.49px] pl-[61px] pb-[44.51px] pr-6 flex flex-col lg:flex-row gap-[34px] items-center">
                    {/* Left: text content */}
                    <div className="flex-1 max-w-[745px]">
                        {/* Inner badge */}
                        <div className="mb-5 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Research. Forecasting. Execution.
                        </div>

                        {/* Card heading */}
                        <h3 className="font-medium text-[40px] leading-[44px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            A suite of quantitative tools built to transform complex market data into actionable insights.
                        </h3>

                        {/* Feature list */}
                        <div className="flex flex-col gap-6 max-w-[615px]">
                            {FEATURES.map((f) => (
                                <div key={f.num}>
                                    <p className="text-[28px] leading-[31px] font-semibold mb-3 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                                        {f.num} / <span className="bg-[linear-gradient(176.19deg,rgba(177,216,255,0.6)_-8.19%,rgba(255,255,255,0.6)_107.43%)] bg-clip-text text-transparent">{f.total}</span> <span>{f.title}</span>
                                    </p>
                                    <p className="text-[24px] leading-[31px] font-normal bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: dashboard screenshot placeholder */}
                    <div className="max-w-[776px]">
                        <Image src='/assets/global-market-insights-right-image.png' alt="global-market-insights" width={776} height={530} />
                    </div>
                </div>
            </div>
        </section>
    );
}
