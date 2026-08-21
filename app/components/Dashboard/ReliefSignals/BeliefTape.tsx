const TAPE_ITEMS = [
    {
        label: 'Watch',
        title: 'Fed Cuts rates before July FOMC',
        change: '+3.06%',
        positive: true,
    },
    {
        label: 'Watch',
        title: 'Russia – Ukraine announced in Q3',
        change: '-3.77%',
        positive: false,
    },
    {
        label: 'Watch',
        title: 'US enters recession in 2026',
        change: '+5.74%',
        positive: true,
    },
    {
        label: 'Watch',
        title: 'Bitcoin Closes above $100K year – end',
        change: '-1.71%',
        positive: false,
    },
]

export default function BeliefTape() {
    return (
        <div className="bg-[#16161F] p-4 flex flex-col">
            {/* Tag + badge */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-[#838388] text-[12px] leading-[17px] font-normal">06 / Tape</p>
                <div className="flex items-center gap-1">
                    <div className="w-[5px] h-[5px] bg-white rounded-full" />
                    <span className="text-white text-[12px] leading-[16px] font-medium">Divergent</span>
                </div>
            </div>

            {/* Title */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-2">Belief Tape</h3>

            {/* Description */}
            <p className="text-[#838388] text-[12px] leading-[17px] mb-4">
                A scrolling feed of market shocks, where new events appear instantly and older signals fade away.
            </p>

            {/* Tape feed */}
            <div className="flex flex-col gap-4">
                {TAPE_ITEMS.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between gap-2 pb-4 last:pb-0 border-b border-[#FFFFFF1A] last:border-0"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="h-[22px] border border-[#FFFFFF0D] bg-[#FFFFFF08] rounded-[70px] px-2.5 flex items-center justify-center text-white text-[12px] leading-[17px] font-medium">
                                {item.label}
                            </span>

                            <span className="text-white text-[14px] leading-[20px] font-semibold truncate">{item.title}</span>
                        </div>

                        <span
                            className={`text-[14px] leading-[20px] font-medium flex-shrink-0 ${item.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                }`}
                        >
                            {item.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
