const STATS = [
    { value: '100+', label: 'Markets' },
    { value: '45', label: 'Research Team' },
    { value: '32', label: 'Years Of Experience' },
]

export default function StatsSection() {
    return (
        <section className="relative w-full overflow-hidden py-16 xl:py-[100px] 2xl:py-[120px] px-4 sm:px-6">
            <div className="relative max-w-[1560px] mx-auto">
                <p className="mb-5 sm:mb-6 text-[14px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal text-white/85">
                    By the numbers
                </p>

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
