const STATS = [
    { value: '100', sup: '+', label: 'Markets' },
    { value: '45', sup: '', label: 'Research Team' },
    { value: '32', sup: '', label: 'Years Of Experience' },
]

export default function StatsSection() {
    return (
        <section className="w-full py-16 xl:py-[100px] 2xl:py-[120px] px-4 sm:px-6">
            <div className="max-w-[1200px] mx-auto">
                <p className="text-white/50 text-[13px] sm:text-[14px] leading-none mb-4 sm:mb-5">
                    By the numbers
                </p>
                <h2 className="text-white text-[34px] sm:text-[48px] lg:text-[60px] leading-[1.05] font-semibold tracking-[-0.03em]">
                    Trusted by Data. Driven by Results.
                </h2>
                <p className="mt-4 sm:mt-5 text-white/60 text-[14px] sm:text-[16px] leading-relaxed max-w-[620px]">
                    Discipline over drama. Consistent research is a systems problem, not a
                    hero-trade problem.
                </p>

                <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col items-start py-6 sm:py-2 ${
                                i > 0
                                    ? 'border-t border-[#FFFFFF14] sm:border-t-0 sm:border-l sm:pl-10 lg:pl-14'
                                    : ''
                            } ${i < STATS.length - 1 ? 'sm:pr-10 lg:pr-14' : ''}`}
                        >
                            <span className="text-[64px] sm:text-[76px] lg:text-[96px] font-semibold text-white leading-none tracking-[-0.04em]">
                                {s.value}
                                {s.sup && (
                                    <sup className="text-[0.38em] font-medium align-super tracking-normal">
                                        {s.sup}
                                    </sup>
                                )}
                            </span>
                            <span className="mt-5 sm:mt-7 text-white/55 text-[13px] sm:text-[15px] leading-snug font-normal">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
