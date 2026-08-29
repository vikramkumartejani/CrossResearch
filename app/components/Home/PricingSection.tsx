"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authErrorMessage } from "@/lib/authUi";
import { PLAN_LABEL, type PlanId } from "@/lib/plans";
import { startWhopCheckout } from "@/lib/startCheckout";
import { mediaCssUrl } from "@/lib/media";

type PlanCard = {
    id: "starter" | "gold" | "platinum";
    name: string;
    sub: string;
    price: string;
    priceNote: string | null;
    features: string[];
    cta: string;
    featured: boolean;
};

const PLANS: Record<"monthly" | "annual", PlanCard[]> = {
    monthly: [
        {
            id: "starter",
            name: "Starter Pack",
            sub: "Essential insights for beginners journey",
            price: "Free",
            priceNote: null,
            features: [
                "Get one free week of insights",
                "Discover our views and work ethics",
                "Be consistent and start free trial",
                "Basic tradingview indicators package",
            ],
            cta: "Try For Free",
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
            featured: false,
        },
    ],
    annual: [
        {
            id: "starter",
            name: "Starter Pack",
            sub: "Essential insights for beginners journey",
            price: "Free",
            priceNote: null,
            features: [
                "Get one free week of insights",
                "Discover our views and work ethics",
                "Be consistent and start free trial",
                "Basic tradingview indicators package",
            ],
            cta: "Try For Free",
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

function toPlanId(cardId: PlanCard["id"]): PlanId {
    if (cardId === "gold") return "gold";
    if (cardId === "platinum") return "platinum";
    return "free";
}

function usePlanCheckout(billing: "monthly" | "annual") {
    const router = useRouter();
    const [busyId, setBusyId] = useState<string | null>(null);

    async function choosePlan(card: PlanCard) {
        const plan = toPlanId(card.id);

        if (plan === "free") {
            // Starter: signup if logged out, else confirm free plan
            const me = await fetch("/api/auth/me", { cache: "no-store" });
            if (!me.ok) {
                router.push("/signup");
                return;
            }
            setBusyId(card.id);
            try {
                const res = await fetch("/api/auth/plan", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ plan: "free" }),
                });
                const body = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(authErrorMessage(body, "Could not update plan"));
                toast.success(body.message || `You're on ${PLAN_LABEL.free}`);
                router.push("/analysis");
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not update plan");
            } finally {
                setBusyId(null);
            }
            return;
        }

        setBusyId(card.id);
        try {
            const me = await fetch("/api/auth/me", { cache: "no-store" });
            if (!me.ok) {
                router.push(`/login?next=${encodeURIComponent("/#pricing")}`);
                toast.message("Log in to subscribe");
                return;
            }
            await startWhopCheckout(plan, billing);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Subscribe failed");
        } finally {
            setBusyId(null);
        }
    }

    return { choosePlan, busyId };
}

/** Side card (Starter / Platinum) */
function SideCard({
    plan,
    onChoose,
    busy,
}: {
    plan: PlanCard;
    onChoose: (plan: PlanCard) => void;
    busy: boolean;
}) {
    return (
        <div className="flex flex-col p-4 sm:p-6 h-full bg-[#FFFFFF08] rounded-[40px] sm:rounded-[48px]">
            <div className="flex flex-col h-full">
                <div
                    className="bg-[#FFFFFF08] border border-[#0000000D] rounded-[32px] p-6 mb-8"
                    style={{
                        backgroundImage: mediaCssUrl("/assets/price-card-bg.svg"),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <p className="text-white text-[16px] sm:text-[18px] font-inter font-semibold leading-5 sm:leading-[22px] capitalize mb-2">
                        {plan.name}
                    </p>
                    <p className="text-white/50 text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] font-normal mb-9">
                        {plan.sub}
                    </p>
                    <p className="text-white text-[32px] leading-[38px] font-semibold">
                        {plan.price}
                    </p>
                </div>

                <ul className="flex flex-col gap-4 sm:gap-5 flex-1 px-4 sm:px-6 mb-8">
                    {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-white/50 text-[16px] sm:text-[18px] font-medium leading-6 sm:leading-[27px]">
                            <CheckIcon />
                            {f}
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    disabled={busy}
                    onClick={() => onChoose(plan)}
                    className="flex items-center justify-center text-center h-[50px] sm:h-[62px] rounded-[102px] border border-[#00000005] bg-[#FFFFFF0D] text-white/60 text-[16px] sm:text-[18px] leading-[22px] font-inter font-semibold transition-all duration-200 hover:bg-white hover:text-black disabled:opacity-60 cursor-pointer"
                >
                    {busy ? "Updating…" : plan.cta}
                </button>
            </div>
        </div>
    );
}

/** Center featured card (Gold) */
function FeaturedCard({
    plan,
    onChoose,
    busy,
}: {
    plan: PlanCard;
    onChoose: (plan: PlanCard) => void;
    busy: boolean;
}) {
    return (
        <div className="bg-[#FFFFFF0D] flex flex-col rounded-[40px] sm:rounded-[55px] lg:mt-[-28px] lg:mb-[-28px] p-4 pt-5 overflow-hidden">
            {plan.priceNote && (
                <div className="text-white text-[16px] sm:text-[18px] leading-[27px] font-semibold text-center mb-5">
                    {plan.priceNote}
                </div>
            )}

            <div className="bg-[#FFFFFF08] rounded-[30px] sm:rounded-[40px] py-5 sm:py-6 px-4 sm:px-[25px]">
                <div className="p-6 bg-[#F4F4F4] rounded-[30px] sm:rounded-[32px]">
                    <p className="text-black text-[16px] sm:text-[18px] leading-5 sm:leading-[22px] font-semibold mb-1">
                        {plan.name}
                    </p>
                    <p className="text-black/50 leading-[14px] sm:text-[16px] leading-5 sm:leading-[24px] font-normal mb-10">
                        {plan.sub}
                    </p>
                    <p className="text-[32px] leading-[38px] font-semibold text-black">
                        {plan.price}
                    </p>
                </div>

                <div className="flex flex-col flex-1 pt-8">
                    <div className="px-3">
                        <div className="flex items-center gap-4 mb-4">
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
                            <div
                                className="flex-1 h-px"
                                style={{
                                    background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                                }}
                            />
                        </div>

                        <ul className="flex flex-col gap-5 flex-1 mb-8 lg:mb-[91px]">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-white/50 text-[16px] sm:text-[18px] font-medium leading-6 sm:leading-[27px]">
                                    <CheckIcon />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => onChoose(plan)}
                        className="flex items-center justify-center text-center h-[50px] sm:h-[62px] bg-white border border-[#00000005] rounded-full text-[16px] sm:text-[18px] font-bold text-black font-inter transition-all duration-200 hover:bg-white/10 hover:text-white disabled:opacity-60 cursor-pointer"
                    >
                        {busy ? "Updating…" : plan.cta}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PricingSection() {
    const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
    const [activePlan, setActivePlan] = useState(0);
    const plans = PLANS[billing];
    const { choosePlan, busyId } = usePlanCheckout(billing);

    return (
        <section id="pricing" className="relative w-full pt-20 sm:pt-[120px] lg:pt-[170px] px-4 sm:px-6 scroll-mt-24">
            <div
                aria-hidden="true"
                className="absolute pointer-events-none z-0 w-[500px] h-[230px] md:w-[700px] md:h-[320px] lg:w-[977.2px] lg:h-[446.65px]
                            -left-48 md:-left-64 lg:-left-[512px]
                            top-40 md:top-56 lg:top-[300px] -rotate-[20.4deg] bg-[#227ED966]
                            blur-[160px] md:blur-[200px] lg:blur-[250px]"
            />

            <div className="relative z-10 mx-auto max-w-[1440px]">
                <div className="flex flex-col items-center text-center mb-6 lg:mb-20 xl:mb-[108]">
                    <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        Choose your plan
                    </div>

                    <h2 className="my-5 sm:my-6 text-center font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Choose your trading research <br className="sm:block hidden" />
                        plan and start your financial journey
                    </h2>

                    <p className="mb-6 sm:mb-8 text-center text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[821px] mx-auto">
                        Our articles provide deep insights into global market trends, helping you understand movements and make informed, confident financial decisions always.
                    </p>

                    <div
                        className="relative bg-[#FFFFFF08] flex items-center p-1 rounded-full w-[288px]"
                        role="group"
                        aria-label="Billing period"
                    >
                        <div
                            className="absolute top-1 h-12 sm:h-[51px] w-[140px] rounded-full bg-[#F4F4F4] transition-all duration-300 ease-in-out"
                            style={{ left: billing === "monthly" ? "4px" : "144px" }}
                        />
                        <button
                            onClick={() => setBilling("monthly")}
                            className="relative z-10 cursor-pointer w-[140px] h-12 sm:h-[51px] rounded-full text-[18px] font-medium transition-colors duration-300"
                            style={{ color: billing === "monthly" ? "#000000" : "rgba(255,255,255,0.5)" }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling("annual")}
                            className="relative z-10 cursor-pointer w-[140px] h-12 sm:h-[51px] rounded-full text-[18px] font-medium transition-colors duration-300"
                            style={{ color: billing === "annual" ? "#000000" : "rgba(255,255,255,0.5)" }}
                        >
                            Annual
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center hidden lg:grid">
                    {plans.map((plan) =>
                        plan.featured ? (
                            <FeaturedCard
                                key={plan.id}
                                plan={plan}
                                onChoose={choosePlan}
                                busy={busyId === plan.id}
                            />
                        ) : (
                            <SideCard
                                key={plan.id}
                                plan={plan}
                                onChoose={choosePlan}
                                busy={busyId === plan.id}
                            />
                        )
                    )}
                </div>

                <div className="lg:hidden">
                      <div className="flex items-end justify-end gap-3 mb-6">
                            <button type="button" aria-label="Previous plan" onClick={() => setActivePlan(p => (p - 1 + plans.length) % plans.length)} className="w-12 h-12 rounded-full bg-[#FFFFFF0D] flex items-center justify-center hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <button type="button" aria-label="Next plan" onClick={() => setActivePlan(p => (p + 1) % plans.length)} className="w-12 h-12 rounded-full bg-[#FFFFFF0D] flex items-center justify-center hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${billing}-${activePlan}`}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.1, ease: 'easeInOut' }}
                            >
                                {plans[activePlan].featured
                                    ? <FeaturedCard plan={plans[activePlan]} onChoose={choosePlan} busy={busyId === plans[activePlan].id} />
                                    : <SideCard plan={plans[activePlan]} onChoose={choosePlan} busy={busyId === plans[activePlan].id} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
