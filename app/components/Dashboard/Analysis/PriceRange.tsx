interface RangeItem {
    title: string
    subtitle: string
    high: string
    low: string
}

function PriceRangeCard({ title, subtitle, high, low }: RangeItem) {
    return (
        <div className="bg-[#16161F] border border-[#FFFFFF08] flex flex-col flex-1 min-w-0">
            <div className="bg-[#FFFFFF0D] p-4">
                <p className="text-white text-[14px] font-semibold leading-[17px]">{title}</p>
                <p className="text-white/60 text-[12px] leading-[14px] font-normal mt-1">{subtitle}</p>
            </div>

            {/* HIGH value */}
            <div className="flex items-start gap-4 p-4">
                <div className="flex flex-col items-center">
                    <div
                        style={{
                            width: '9px',
                            height: '185px',
                            borderRadius: '70px',
                            background: 'linear-gradient(180deg, #2CB37B 0%, #060707 47.04%, #E25C3F 100%)',
                            flexShrink: 0,
                        }}
                    />
                </div>
                <div className="flex flex-col justify-between gap-3 h-full">
                    <div className="text-left">
                        <p className="text-[#23B672] text-[14px] font-semibold leading-[17px]">{high}</p>
                        <p className="text-white/60 text-[12px] leading-[14px] font-normal mt-1">High</p>
                    </div>

                    <div className="text-left">
                        <p className="text-[#E25C3F] text-[14px] font-semibold leading-[17px]">{low}</p>
                        <p className="text-white/60 text-[12px] leading-[14px] font-normal mt-1">Low</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PriceRanges() {
    const ranges: RangeItem[] = [
        { title: 'Intraday Range', subtitle: 'Todays Range', high: '1.02457', low: '1.05414' },
        { title: 'Trend Range', subtitle: '7-Day Range', high: '1.06020', low: '1.04890' },
        { title: 'Volatility Range', subtitle: '30-Day Range', high: '1.07020', low: '1.03890' },
    ]

    return (
        <div>
            <h4 className="text-white text-[18px] leading-[22px] font-medium">Price Ranges</h4>
            <div className="flex gap-4 mt-4">
                {ranges.map((r) => (
                    <PriceRangeCard key={r.title} {...r} />
                ))}
            </div>
        </div>
    )
}
