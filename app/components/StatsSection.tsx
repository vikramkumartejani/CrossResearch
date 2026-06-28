const STATS = [
    { value: "100", label: "Markets" },
    { value: "45", label: "Research Team" },
    { value: "32", label: "Year Of Experience" },
    { value: "77+", label: "Trend Reversals" },
];

export default function StatsSection() {
    return (
        <div className="w-full py-16 xl:py-[120px] 2xl:py-[150px] px-6">
            <p className="text-center text-white/60 mb-7 sm:mb-10 text-[18px] sm:text-[24px] leading-6 sm:leading-9">
                Trusted by Data. Driven by Results
            </p>
            <div className="grid grid-cols-2 sm:flex flex-wrap items-start justify-center gap-0 gap-y-5 sm:gap-8 lg:gap-28">
                {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
                        <span className="text-3xl sm:text-5xl md:text-6xl xl:text-[70px] font-semibold text-white leading-tight xl:leading-[77px]">
                            {s.value}
                        </span>

                        <span className="text-white/60 text-[14px] sm:text-lg md:text-xl xl:text-[22px] leading-relaxed xl:leading-[33px] font-normal text-center">
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
