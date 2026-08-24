const STATS = [
    { value: '100+', label: 'Markets' },
    { value: '45', label: 'Research Team' },
    { value: '32', label: 'Years Of Experience' },
]

function TargetBadgeIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    )
}

export default function StatsSection() {
    return (
        <section className="relative w-full overflow-hidden py-16 xl:py-[100px] 2xl:py-[120px] px-4 sm:px-6">
            {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-20 h-[360px] w-[360px] rounded-full bg-[#227ED9]/25 blur-[140px]"
            /> */}

            <div className="relative max-w-[1560px] mx-auto">
                <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-[100px] border border-[#FFFFFF1A] bg-[#FFFFFF08] pl-3.5 pr-4 py-[9px] text-[14px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal text-white/85">
                    <TargetBadgeIcon />
                   By the numbers
                </div>

                <h2 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-[59px] mb-4 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Trusted by Data. Driven by Results.
                </h2>
                <p className="mt-4 text-white/70 text-[14px] sm:text-[22px] leading-5 sm:leading-[32px] font-normal">
                   Discipline over drama. Consistent research is a systems problem, not a hero-trade problem.
                </p>

                <div className="mt-10 sm:mt-20 grid grid-cols-3">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col text-center py-2 px-2 ${
                                i > 0
                                    ? 'border-[#FFFFFF20] border-l'
                                    : ''
                            }`}
                        >
                            <span className="text-[36px] sm:text-[64px] lg:text-[80px] xl:text-[140px] font-normal text-white leading-[100%] tracking-[-0.04em]">
                                {s.value}
                            </span>
                            <span className="mt-3 text-white/50 text-[12px] sm:text-[22px] leading-snug font-normal">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
