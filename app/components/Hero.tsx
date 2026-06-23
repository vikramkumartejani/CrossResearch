import Image from "next/image";
import Link from "next/link";
import TopLine from "./Svgs/TopLine";

const AVATAR_COLORS = [
    { bg: "#3b6fe8", letter: "A" },
    { bg: "#7c5cbf", letter: "B" },
    { bg: "#2ba882", letter: "C" },
    { bg: "#e87c3b", letter: "D" },
];

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden" aria-labelledby="hero-heading">
            {/* Background: top-lines SVG */}
            <div className="absolute inset-x-0 top-[96px] z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <TopLine/>
            </div>

            {/* Content wrapper */}
            <div
                className="relative z-10 mx-auto px-6 py-6 flex flex-col items-center justify-center"
                style={{ maxWidth: "1920px", minHeight: "100vh", paddingTop: "140px" }}
            >
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium"
                    style={{
                        background: "rgba(59,111,232,0.12)",
                        border: "1px solid rgba(59,111,232,0.35)",
                        color: "#7aa8f5",
                        fontFamily: "var(--font-dm-sans)",
                        letterSpacing: "0.04em",
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: "#3b6fe8" }}
                        aria-hidden="true"
                    />
                    Now with AI-powered market regime detection
                </div>

                {/* Heading */}
                <h1
                    id="hero-heading"
                    className="text-center font-bold leading-tight mb-6"
                    style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                        letterSpacing: "-0.03em",
                        maxWidth: "820px",
                        color: "#ffffff",
                    }}
                >
                    Institutional-Grade Market{" "}
                    <span
                        style={{
                            background:
                                "linear-gradient(135deg, #6fa3ff 0%, #a78bfa 50%, #60c6f5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Intelligence
                    </span>{" "}
                    for Serious Traders
                </h1>

                {/* Subheading */}
                <p
                    className="text-center mb-10 leading-relaxed"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)",
                        color: "rgba(255,255,255,0.55)",
                        maxWidth: "560px",
                    }}
                >
                    Access proprietary algorithms, macro intelligence, and market regime
                    tools trusted by advanced traders for precise, data-driven market
                    decisions worldwide.
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    <Link
                        href="/get-access"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={{
                            background: "linear-gradient(135deg, #3b6fe8 0%, #2952c8 100%)",
                            color: "#ffffff",
                            fontFamily: "var(--font-dm-sans)",
                            boxShadow:
                                "0 0 0 1px rgba(59,111,232,0.4), 0 4px 24px rgba(59,111,232,0.35)",
                        }}
                    >
                        Get Access Now
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                            <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>

                    {/* Social proof */}
                    <div className="flex items-center gap-3">
                        {/* Avatars */}
                        <div className="flex -space-x-2" aria-hidden="true">
                            {AVATAR_COLORS.map((a) => (
                                <div
                                    key={a.letter}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2"
                                    style={{
                                        background: a.bg,
                                        boxShadow: "0 0 0 2px #070711",
                                        fontFamily: "var(--font-inter)",
                                    }}
                                >
                                    {a.letter}
                                </div>
                            ))}
                        </div>
                        <p
                            className="text-sm"
                            style={{
                                color: "rgba(255,255,255,0.55)",
                                fontFamily: "var(--font-dm-sans)",
                            }}
                        >
                            Trusted by{" "}
                            <span className="font-semibold" style={{ color: "#3b6fe8" }}>
                                10,000+
                            </span>{" "}
                            traders
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
