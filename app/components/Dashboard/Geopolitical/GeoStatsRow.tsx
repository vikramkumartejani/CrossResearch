const STATS = [
    { label: 'Active Flashpoints', value: '10', sub: 'VS. 7d: +2', subColor: 'text-[#838388]' },
    { label: 'Gri Index', value: '10', sub: 'VS. 7d: +8.4', subColor: 'text-[#838388]' },
    { label: '24D Change', value: '+0.45%', sub: 'VS. 7d: +8.4', subColor: 'text-[#838388]', valueColor: 'text-[#5CEB8A]' },
    { label: 'High Severity', value: '3', sub: 'VS. 7d: No Change', subColor: 'text-[#838388]', valueColor: "text-[#E25C3F]" },
]

export default function GeoStatsRow() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 lg:px-6 mb-4 sm:mb-5">
            {STATS.map((s) => (
                <div key={s.label} className="bg-[#16161F] px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
                    <div>
                        <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-medium mb-1.5 sm:mb-2">{s.label}</p>
                    <p className={`text-[11px] sm:text-[16px] leading-[16px] sm:leading-[22px] font-medium ${s.subColor}`}>{s.sub}</p>
                    </div>
                        <p className={`text-[20px] sm:text-[30px] leading-[24px] sm:leading-[38px] font-semibold mb-1.5 sm:mb-2 ${s.valueColor ?? 'text-white'}`}>{s.value}</p>
                </div>
            ))}
        </div>
    )
}
