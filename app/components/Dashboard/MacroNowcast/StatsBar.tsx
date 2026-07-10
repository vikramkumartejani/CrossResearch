// Stats bar — 5 metric tiles across the top

interface Stat {
    label: string
    value: string
    color: string
}

const STATS: Stat[] = [
    { label: 'Tracked Indicators', value: '8',   color: '#88C4FF' },
    { label: 'Live Feeds',         value: '1',   color: '#2CB37B' },
    { label: 'Upside Surprises',   value: '3',   color: '#2CB37B' },
    { label: 'Downside Surprises', value: '5',   color: '#E25C3F' },
    { label: 'Avg Model Confidence', value: '72%', color: '#88C4FF' },
]

export default function StatsBar() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
            {STATS.map((s, i) => (
                <div
                    key={s.label}
                    className='px-4 py-4 flex flex-col gap-2 bg-[#16161F]'
                >
                    <span className="text-[#838388] text-[16px] leading-[22px] font-medium">{s.label}</span>
                    <span className="font-semibold text-[30px] leading-[42px] font-semibold" style={{ color: s.color }}>
                        {s.value}
                    </span>
                </div>
            ))}
        </div>
    )
}
