'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Testimonial {
    id: string;
    rating: number;
    quote: string;
    name: string;
    role: string;
    avatar: string;
}

interface CardProps {
    t: Testimonial;
    isActive: boolean;
    onClick: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
    { id: 'testimonial-marvin',   rating: 5, quote: "By far the only signal provider I need to earn some profits. They don't only share numbers but rational fundamental and logical behind their views, nothing but respect to the team and it all.",          name: 'Marvin McKinney',    role: 'Student',             avatar: 'https://randomuser.me/api/portraits/men/32.jpg'   },
    { id: 'testimonial-brooklyn', rating: 5, quote: "It's not just for the signals, but the markets commentary made are just wow, they literally make you understand the markets and the rational behind every move.",                                         name: 'Brooklyn Simmons',   role: 'CS grad',             avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 'testimonial-cameron',  rating: 4, quote: "As an experienced trader who became a dad lately this has been nothing but gems. Without them and their markets roundabout I wouldn't be able to keep up with the markets, a genuine work.",             name: 'Cameron Williamson', role: 'Owner of Plantio',    avatar: 'https://randomuser.me/api/portraits/men/76.jpg'   },
    { id: 'testimonial-kathryn',  rating: 3, quote: "A game changer for me, I went through so many services before, CRM has topped my expectations and were the best so far.",                                                                               name: 'Kathryn Murphy',     role: 'Doctor',              avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 'testimonial-james',    rating: 5, quote: "The macro intelligence tools here are second to none. I've been able to anticipate market moves that I would've completely missed otherwise. Worth every penny.",                                        name: 'James Thornton',     role: 'Hedge Fund Analyst',  avatar: 'https://randomuser.me/api/portraits/men/52.jpg'   },
    { id: 'testimonial-sarah',    rating: 5, quote: "The research quality is institutional-grade but presented in a way that's actually digestible. I check it every morning before the market opens.",                                                       name: 'Sarah Chen',         role: 'Day Trader',          avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: 'testimonial-alex',     rating: 5, quote: "I've tried nearly every research service out there. Cross Research is the only one that actually explains the 'why' behind every market call. My win rate improved significantly.",                      name: 'Alex Rivera',        role: 'Swing Trader',        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'   },
    { id: 'testimonial-priya',    rating: 4, quote: "As someone who juggles a full-time job with trading, the concise daily summaries are a lifesaver. 20 minutes and I'm fully briefed. Highly recommend.",                                                name: 'Priya Nair',         role: 'Software Engineer',   avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
    { id: 'testimonial-daniel',   rating: 5, quote: "The volatility analytics alone are worth the subscription. I've been able to size my positions so much better since joining. The team clearly has real institutional experience.",                       name: 'Daniel Osei',        role: 'Portfolio Manager',   avatar: 'https://randomuser.me/api/portraits/men/63.jpg'   },
    { id: 'testimonial-lena',     rating: 5, quote: "What separates Cross Research from the noise is the macro context. Every signal comes with a rationale. That's what I needed as a beginner trying to learn properly.",                                  name: 'Lena Fischer',       role: 'Finance Student',     avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
    { id: 'testimonial-ryan',     rating: 4, quote: "I was skeptical at first, but their track record speaks for itself. The regime detection tools flagged the last two major corrections before they happened. Genuinely impressive.",                      name: 'Ryan Kowalski',      role: 'Futures Trader',      avatar: 'https://randomuser.me/api/portraits/men/88.jpg'   },
    { id: 'testimonial-amara',    rating: 5, quote: "The community and the research together make this unbeatable. I came for the signals, I stayed for the education. My trading has never been more consistent.",                                          name: 'Amara Diallo',       role: 'Independent Investor',avatar: 'https://randomuser.me/api/portraits/women/77.jpg' },
];

const CARD_W = 491;
const GAP    = 24;
const N      = TESTIMONIALS.length;

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-3" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.239 0.690724C11.5384 -0.230587 12.8418 -0.230588 13.1411 0.690722L15.3333 7.43743C15.4671 7.84946 15.8511 8.12842 16.2843 8.12842H23.3782C24.347 8.12842 24.7497 9.36803 23.966 9.93743L18.2269 14.1071C17.8764 14.3618 17.7298 14.8131 17.8636 15.2252L20.0558 21.9719C20.3551 22.8932 19.3007 23.6593 18.5169 23.0899L12.7778 18.9202C12.4274 18.6656 11.9528 18.6656 11.6023 18.9202L5.86318 23.0899C5.07947 23.6593 4.02499 22.8932 4.32434 21.9719L6.51648 15.2252C6.65035 14.8131 6.5037 14.3618 6.15321 14.1071L0.414114 9.93743C-0.369599 9.36803 0.0331752 8.12842 1.0019 8.12842H8.09581C8.52904 8.12842 8.91299 7.84946 9.04687 7.43743L11.239 0.690724Z"
                        fill={i < rating ? '#F5A623' : '#CCCAC880'}
                        stroke={i < rating ? '#F5A623' : '#CCCAC880'}
                    />
                </svg>
            ))}
        </div>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ t, isActive, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className="flex-shrink-0 flex flex-col rounded-[32px] p-8 cursor-pointer transition-all duration-300 overflow-hidden"
            style={{
                position: 'relative',
                width: `${CARD_W}px`,
                minHeight: '492px',
                background: 'rgba(255,255,255,0.03)',
            }}
        >
            {/* Active card: glow ellipses + dot pattern */}
            {isActive && (
                <>
                    <div aria-hidden="true" style={{ position: 'absolute', width: '241.67px', height: '378.9px',  right: '-60px', top: '-171px', background: '#6DB7FF', filter: 'blur(75.54px)',   transform: 'matrix(-0.98,-0.19,-0.19,0.98,0,0)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
                    <div aria-hidden="true" style={{ position: 'absolute', width: '174.41px', height: '373.02px', right: '-67px', top: '-173px', background: '#6294FF', mixBlendMode: 'plus-lighter', filter: 'blur(212.56px)', transform: 'matrix(-0.98,-0.19,-0.19,0.98,0,0)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
                    <div aria-hidden="true" style={{ position: 'absolute', width: '162.65px', height: '362.17px', right: '-17px', top: '-163px', background: '#0F4274', mixBlendMode: 'plus-lighter', filter: 'blur(212.56px)', transform: 'matrix(-0.98,-0.19,-0.19,0.98,0,0)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/card-dot-img.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: 'auto', opacity: 0.6, pointerEvents: 'none', zIndex: 1 }} />
                </>
            )}

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="flex items-start justify-between mb-[34px]">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.0336 12.9605C27.5536 12.9605 30.4016 15.8405 30.4016 19.3605C30.4016 22.8805 27.5216 25.7605 24.0016 25.7605C20.4816 25.7605 17.6016 22.8805 17.6016 19.3605C17.6016 12.2885 23.3296 6.56055 30.4016 6.56055C30.4016 6.56055 26.2096 8.12855 24.0336 12.9605ZM14.4016 19.3605C14.4016 22.8805 11.5216 25.7605 8.00156 25.7605C4.48156 25.7605 1.60156 22.8805 1.60156 19.3605C1.60156 12.2885 7.32956 6.56055 14.4016 6.56055C14.4016 6.56055 10.2096 8.12855 8.03356 12.9605C11.5536 12.9605 14.4016 15.8405 14.4016 19.3605Z" fill="white" />
                    </svg>
                    <StarRating rating={t.rating} />
                </div>
                <p className="text-white/50 text-[22px] leading-[33px] font-normal flex-1 mb-6">{t.quote}</p>
                <div className="flex items-center gap-6">
                    <div className="w-[63px] h-[63px] rounded-full overflow-hidden flex-shrink-0 bg-[#DFD8D4]">
                        <Image src={t.avatar} alt={t.name} width={63} height={63} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div>
                        <p className="text-white text-[23px] font-medium leading-[35px]">{t.name}</p>
                        <p className="text-white/60 text-[16px] leading-[24px] font-normal mt-1">{t.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState<number>(2);

    // Shortest circular offset from activeIndex to i
    const getOffset = useCallback((i: number, active: number): number => {
        let offset = i - active;
        if (offset > N / 2)  offset -= N;
        if (offset < -N / 2) offset += N;
        return offset;
    }, []);

    const navigate = (dir: 1 | -1): void => {
        setActiveIndex(prev => (prev + dir + N) % N);
    };

    return (
        <section className="relative w-full py-[170px]">
            {/* Ellipse 7 – right glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    width: '700px',
                    height: '446.65px',
                    right: '-318px',
                    top: '25%',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(150px)',
                    transform: 'matrix(0.94, -0.35, 0.35, 0.94, 0, 0)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            {/* Header */}
            <div className="px-6 mb-20">
                <div className="relative z-10 mx-auto max-w-[1560px]">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-4 py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                    <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                    <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                                </svg>
                                Trusted By Users
                            </div>
                            <h2 className="font-normal text-[54px] leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                                What Users Say About <br /> Cross Research
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="button" aria-label="Previous" onClick={() => navigate(-1)} className="w-[56px] h-[56px] rounded-full bg-[#FFFFFF0D] flex items-center justify-center hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <button type="button" aria-label="Next" onClick={() => navigate(1)} className="w-[56px] h-[56px] rounded-full bg-[#FFFFFF0D] flex items-center justify-center hover:bg-[#FFFFFF18] transition-colors cursor-pointer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel — framer-motion for smooth centering */}
            <div className="w-full overflow-hidden" style={{ position: 'relative', height: '492px' }}>
                {/* Left fade */}
                <div aria-hidden="true" style={{
                    position: 'absolute', top: 0, left: 0, width: '120px', height: '100%',
                    background: 'linear-gradient(to right, #070711 0%, transparent 100%)',
                    zIndex: 10, pointerEvents: 'none',
                }} />
                {/* Right fade */}
                <div aria-hidden="true" style={{
                    position: 'absolute', top: 0, right: 0, width: '120px', height: '100%',
                    background: 'linear-gradient(to left, #070711 0%, transparent 100%)',
                    zIndex: 10, pointerEvents: 'none',
                }} />
                {TESTIMONIALS.map((t, i) => {
                    const offset = getOffset(i, activeIndex);
                    const isActive = i === activeIndex;
                    // Only render cards within ±3 slots
                    if (Math.abs(offset) > 3) return null;
                    const x = offset * (CARD_W + GAP);
                    return (
                        <motion.div
                            key={t.id}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                width: `${CARD_W}px`,
                                zIndex: isActive ? 2 : 1,
                                willChange: 'transform',
                            }}
                            initial={false}
                            animate={{
                                x: x - CARD_W / 2,
                            }}
                            transition={{
                                type: 'tween',
                                ease: [0.25, 0.1, 0.25, 1],
                                duration: 0.4,
                            }}
                        >
                            <TestimonialCard
                                t={t}
                                isActive={isActive}
                                onClick={() => setActiveIndex(i)}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
