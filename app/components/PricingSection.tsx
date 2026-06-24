"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = {
    monthly: [
        {
            id: "starter",
            name: "Starter Pack",
            sub: "Essential insights for beginners journey",
            price: "FREE",
            priceNote: null,
            features: [
                "Get one free week of insights",
                "Discover our views and work ethics",
                "Be consistent and start free trial",
                "Basic tradingview indicators package",
            ],
            cta: "Try For Free",
            ctaHref: "/signup",
            featured: false,
        },
        {
            id: "gold",
            name: "Gold Pack",
            sub: "Advanced insights for gold trading",
            price: "$24.99",
            priceNote: "~15% off on annual payments",
            features: [
                "Get daily market Insights",
                "Market direction with entry exit signals",
                "Institutional news and macro insights",
                "Pro Hedgefund Algo Strategies",
            ],
            cta: "Subscribe to Gold pack",
            ctaHref: "/subscribe/gold",
            featured: true,
        },
        {
            id: "platinum",
            name: "Platinum Pack",
            sub: "Platinum Pack Elite Access",
            price: "$69.99",
            priceNote: null,
            features: [
                "All of the gold pack",
                "Dedicated support if you are a newbie in the field",
                "Request asset outlook support",
                "Additional algos & market valuation modules",
            ],
            cta: "Subscribe to Platinum pack",
            ctaHref: "/subscribe/platinum",
            featured: false,
        },
    ],
    annual: [
        {
            id: "starter",
            name: "Starter Pack",
            sub: "Essential insights for beginners journey",
            price: "FREE",
            priceNote: null,
            features: [
                "Get one free week of insights",
                "Discover our views and work ethics",
                "Be consistent and start free trial",
                "Basic tradingview indicators package",
            ],
            cta: "Try For Free",
            ctaHref: "/signup",
            featured: false,
        },
        {
            id: "gold",
            name: "Gold Pack",
            sub: "Advanced insights for gold trading",
            price: "$21.24",
            priceNote: "~15% off on annual payments",
            features: [
                "Get daily market Insights",
                "Market direction with entry exit signals",
                "Institutional news and macro insights",
                "Pro Hedgefund Algo Strategies",
            ],
            cta: "Subscribe to Gold pack",
            ctaHref: "/subscribe/gold",
            featured: true,
        },
        {
            id: "platinum",
            name: "Platinum Pack",
            sub: "Platinum Pack Elite Access",
            price: "$59.49",
            priceNote: null,
            features: [
                "All of the gold pack",
                "Dedicated support if you are a newbie in the field",
                "Request asset outlook support",
                "Additional algos & market valuation modules",
            ],
            cta: "Subscribe to Platinum pack",
            ctaHref: "/subscribe/platinum",
            featured: false,
        },
    ],
};

function CheckIcon() {
    return (
        <svg width="24" height="24" className="min-w-[24px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12L10.5347 14.2812C10.9662 14.6696 11.6366 14.6101 11.993 14.1519L16 9M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/** Side card (Starter / Platinum) */
function SideCard({ plan }: { plan: (typeof PLANS.monthly)[number] }) {
    const isStarter = plan.id === "starter";
    return (
        <div className="flex flex-col p-6 h-full bg-[#FFFFFF08] rounded-[48px]">
            <div className="flex flex-col h-full">
                <div
                    className="bg-[#FFFFFF08] border border-[#0000000D] rounded-[32px] p-6 mb-8"
                    style={{
                        backgroundImage: "url('/assets/price-card-bg.svg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* Name */}
                    <p className="text-white text-[18px] font-inter font-semibold leading-[22px] capitalize mb-2">
                        {plan.name}
                    </p>

                    {/* Subtitle */}
                    <p className="text-white/50 text-[16px] leading-[24px] font-normal mb-9">
                        {plan.sub}
                    </p>

                    {/* Price */}
                    <p className="text-white text-[32px] leading-[38px] font-semibold">
                        {plan.price}
                    </p>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-5 flex-1 px-6 mb-8">
                    {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-white/50 text-[18px] font-medium leading-[27px]">
                            <CheckIcon />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link href={plan.ctaHref} className="flex items-center justify-center text-center h-[62px] rounded-[102px] border border-[#00000005] bg-[#FFFFFF0D] text-white/60 text-[18px] leading-[22px] font-inter font-semibold transition-all duration-200 hover:bg-white hover:text-black">
                    {plan.cta}
                </Link>
            </div>
        </div>
    );
}

/** Center featured card (Gold) */
function FeaturedCard({ plan }: { plan: (typeof PLANS.monthly)[number] }) {
    return (
        <div className="bg-[#FFFFFF0D] flex flex-col rounded-[55px] mt-[-28px] mb-[-28px] p-4 pt-5 overflow-hidden">
            {/* Top label */}
            {plan.priceNote && (
                <div className="text-white text-[18px] leading-[27px] font-semibold text-center mb-5">
                    {plan.priceNote}
                </div>
            )}

            <div className="bg-[#FFFFFF08] rounded-[40px] py-6 px-[25px]">
                {/* White header block — name + price */}
                <div className="p-6 bg-[#F4F4F4] rounded-[32px]">
                    <p className="text-black text-[18px] leading-[22px] font-semibold mb-1">
                        {plan.name}
                    </p>
                    <p className="text-black/50 text-[16px] leading-[24px] font-normal mb-10">
                        {plan.sub}
                    </p>

                    <p className="text-[32px] leading-[38px] font-semibold text-black">
                        {plan.price}
                    </p>
                </div>

                {/* Dark lower block — features + CTA */}
                <div className="flex flex-col flex-1 pt-8">
                    <div className="px-3">
                        {/* Features label with gradient lines */}
                        <div className="flex items-center gap-4 mb-4">
                            {/* Left line */}
                            <div
                                className="flex-1 h-px"
                                style={{
                                    background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                                    transform: "scaleX(-1)",
                                }}
                            />
                            <p className="text-white/50 text-[14.83px] leading-[22px] font-semibold shrink-0">
                                Features
                            </p>
                            {/* Right line */}
                            <div
                                className="flex-1 h-px"
                                style={{
                                    background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                                }}
                            />
                        </div>

                        {/* Features */}
                        <ul className="flex flex-col gap-5 flex-1 mb-[91px]">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-white/50 text-[18px] font-medium leading-[27px]">
                                    <CheckIcon />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <Link href={plan.ctaHref} className="flex items-center justify-center text-center h-[62px] bg-white border border-[#00000005] rounded-full text-[18px] font-bold text-black font-inter transition-all duration-200 hover:bg-white/10 hover:text-white">
                        {plan.cta}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PricingSection() {
    const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
    const plans = PLANS[billing];

    return (
        <section className="relative w-full py-[170px] px-6">
            {/* Left glow */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                    width: "977.2px",
                    height: "446.65px",
                    left: "-512px",
                    top: "300px",
                    background: "#227ED966",
                    filter: "blur(250px)",
                    transform: "matrix(0.94, -0.35, 0.35, 0.94, 0, 0)",
                    zIndex: 0,
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1440px]">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-[108]">
                    {/* Badge */}
                    <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        Choose your plan
                    </div>

                    {/* Heading */}
                    <h2 className="text-center font-medium text-[54px] leading-[70px] my-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Choose your trading research <br />
                        plan and start your financial journey
                    </h2>

                    {/* Subheading */}
                    <p className="mb-8 text-center text-white/70 text-[20px] leading-[32px] font-normal max-w-[821px] mx-auto">
                        Our articles provide deep insights into global market trends, helping you understand movements and make informed, confident financial decisions always.
                    </p>

                    {/* Toggle */}
                    <div
                        className="relative bg-[#FFFFFF08] flex items-center p-1 rounded-full w-[288px]"
                        role="group"
                        aria-label="Billing period"
                    >
                        {/* Sliding pill */}
                        <div
                            className="absolute top-1 h-[51px] w-[140px] rounded-full bg-[#F4F4F4] transition-all duration-300 ease-in-out"
                            style={{ left: billing === "monthly" ? "4px" : "144px" }}
                        />
                        <button
                            onClick={() => setBilling("monthly")}
                            className="relative z-10 cursor-pointer w-[140px] h-[51px] rounded-full text-[18px] font-medium transition-colors duration-300"
                            style={{ color: billing === "monthly" ? "#000000" : "rgba(255,255,255,0.5)" }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling("annual")}
                            className="relative z-10 cursor-pointer w-[140px] h-[51px] rounded-full text-[18px] font-medium transition-colors duration-300"
                            style={{ color: billing === "annual" ? "#000000" : "rgba(255,255,255,0.5)" }}
                        >
                            Annual
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {plans.map((plan) =>
                        plan.featured ? (
                            <FeaturedCard key={plan.id} plan={plan} />
                        ) : (
                            <SideCard key={plan.id} plan={plan} />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
