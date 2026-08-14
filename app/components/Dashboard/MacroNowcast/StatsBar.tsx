// Stats bar - 5 metric tiles across the top

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
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-4 mb-4 sm:mb-5">
            {STATS.map((s, i) => (
                <div
                    key={s.label}
                    className='p-3 sm:px-4 sm:py-4 flex justify-between items-center gap-2 bg-[#16161F]'
                >
                    <span className="text-[#838388] text-[14px] sm:text-[16px] leading-5 sm:leading-[22px] font-medium">{s.label}</span>
                    <span className="font-semibold text-[24px] sm:text-[30px] leading-6 sm:leading-[42px] font-semibold" style={{ color: s.color }}>
                        {s.value}
                    </span>
                </div>
            ))}
        </div>
    )
}
