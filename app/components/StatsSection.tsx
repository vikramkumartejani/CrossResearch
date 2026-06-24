const STATS = [
    { value: "100", label: "Markets" },
    { value: "45", label: "Research Team" },
    { value: "32", label: "Year Of Experience" },
    { value: "77+", label: "Trend Reversals" },
];

export default function StatsSection() {
    return (
        <div className="w-full py-[150px] px-6">
            <p className="text-center text-white/60 mb-10 text-[24px] leading-9">
                Trusted by Data. Driven by Results
            </p>
            <div className="flex flex-wrap items-start justify-center gap-10 md:gap-28">
                {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col gap-5 items-center">
                        <span className="text-[70px] font-semibold text-white leading-[77px]">
                            {s.value}
                        </span>
                        <span className="text-white/60 text-[22px] leading-[33px] font-normal">
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
