import React from "react";

const ITEMS = [
    {
        title: 'Fed cuts rates July FOMC',
        pct: '72.2%',
        tag: 'MACRO',
        dots: 5,
        filledDots: 5,
        verdict: 'Yes',
        verdictColor: 'text-white',
    },
    {
        title: 'Russia-Ukraine ceasefire announced in Q3',
        pct: '68.7%',
        tag: 'Geopolitics',
        dots: 5,
        filledDots: 4,
        verdict: 'No',
        verdictColor: 'text-white',
    },
    {
        title: 'US enters recession in 2026',
        pct: '20.6%',
        tag: 'MACRO',
        dots: 5,
        filledDots: 2,
        verdict: 'Yes',
        verdictColor: 'text-white',
    },
    {
        title: 'Bitcoin closes above $100K by year-end',
        pct: '53.2%',
        tag: 'Crypto',
        dots: 5,
        filledDots: 3,
        verdict: 'Yes',
        verdictColor: 'text-white',
    },
]

function DotRow({ total, filled }: { total: number; filled: number }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full border ${i < filled ? 'bg-[#88C4FF] border-transparent' : 'bg-transparent border-[#FFFFFF1A]'}`}
                />
            ))}
        </div>
    )
}

export default function CrossPlatformGlyph() {
    return (
        <div className="bg-[#16161F] p-4 flex flex-col">
            {/* Tag */}
            <p className="text-[#838388] text-[12px] leading-[17px] font-normal mb-2">02 / Agreement</p>

            {/* Title */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-2">Cross - Platform Glyph</h3>

            {/* Description */}
            <p className="text-[#838388] text-[12px] leading-[17px] mb-4">
                Five venues, five dots. Filled when aligned with market consensus, hollow when diverging—capturing sentiment at a glance.
            </p>

            {/* Items */}
            <div className="flex flex-col gap-2.5 flex-1">
                {ITEMS.map((item, index) => (
                    <React.Fragment key={item.title}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-[16px] leading-[19px] font-medium truncate">
                                    {item.title}
                                </p>
                                <p className="text-[#838388] text-[12px] leading-[17px] mt-1">
                                    {item.pct} · {item.tag}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <DotRow total={item.dots} filled={item.filledDots} />
                                <span className="text-white text-[14px] leading-[20px] font-normal">
                                    {item.verdict}
                                </span>
                            </div>
                        </div>

                        {index !== ITEMS.length - 1 && (
                            <div className="w-full h-px bg-[#FFFFFF0D]" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
