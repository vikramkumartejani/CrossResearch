const STATS = [
    {
        label: 'Active Signals',
        value: '15',
        sub: 'Across 5 Venues',
    },
    {
        label: 'Avg Conviction',
        value: '6',
        sub: '0 – 100',
    },
    {
        label: 'Cross – Venue Agreement',
        value: '24%',
        sub: 'Directional Consensus',
    },
    {
        label: 'Structural Shocks',
        value: '0',
        sub: 'Tape Worthy / 48h',
    },
]

export default function StatsRow() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6 mb-5">
            {STATS.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-[#16161F] p-4"
                >
                    <p className="text-[#838388] text-[16px] leading-[22px] font-medium">{stat.label}</p>
                    <p className="text-white text-[32px] leading-[40px] font-semibold my-2">{stat.value}</p>
                    <p className="text-[#838388] text-[16px] leading-[22px] font-medium">{stat.sub}</p>
                </div>
            ))}
        </div>
    )
}
