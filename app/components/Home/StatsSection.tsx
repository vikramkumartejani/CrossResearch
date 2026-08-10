const STATS = [
    { value: '100', label: 'Markets' },
    { value: '45', label: 'Research Team' },
    { value: '32', label: 'Year Of Experience' },
    { value: '77+', label: 'Trend Reversals' },
]

export default function StatsSection() {
    return (
        <section className="w-full py-16 xl:py-[100px] 2xl:py-[120px] px-4 sm:px-6">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-white text-[22px] sm:text-[28px] lg:text-[32px] leading-tight font-semibold tracking-[-0.02em]">
                    Trusted by Data. Driven by Results
                </h2>

                <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col items-start ${
                                i > 0 ? 'lg:border-l lg:border-[#FFFFFF14] lg:pl-10' : ''
                            } ${i % 2 === 1 ? 'pl-6 sm:pl-8 border-l border-[#FFFFFF14] lg:pl-10' : 'pr-4'}`}
                        >
                            <span className="text-[40px] sm:text-[52px] lg:text-[64px] font-semibold text-white leading-none tracking-[-0.03em]">
                                {s.value}
                            </span>
                            <span className="mt-3 sm:mt-4 text-white/55 text-[13px] sm:text-[15px] lg:text-[16px] leading-snug font-normal">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
