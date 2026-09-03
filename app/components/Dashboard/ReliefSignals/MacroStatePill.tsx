const STATES = [
    { label: 'Calm', pct: 35, color: '#2CB37B' },
    { label: 'Elevated', pct: 12, color: '#E4702D' },
    { label: 'Divergent', pct: 79, color: '#B388FA' },
    { label: 'Fragile', pct: 20, color: '#E25C3F' },
    { label: 'Stressed', pct: 50, color: '#FFFFFF' },
]

export default function MacroStatePill() {
    return (
        <div className="bg-[#16161F] p-4 flex flex-col">
            {/* Tag + badge */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-[#838388] text-[12px] leading-[17px] font-normal">05 / State</p>
                <div className="flex items-center gap-1">
                    <div className="w-[5px] h-[5px] bg-white rounded-full" />
                    <span className="text-white text-[12px] leading-[16px] font-medium">Divergent</span>
                </div>
            </div>

            {/* Title */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-2">Macro State Pill</h3>

            {/* Description */}
            <p className="text-[#838388] text-[12px] leading-[17px] mb-5">
                One word captures market sentiment - Calm, Elevated, Divergent, Fragile, or Stressed. Always visible, always honest.
            </p>

            {/* State bars */}
            <div className="flex flex-col gap-4 flex-1">
                {STATES.map((state) => (
                    <div key={state.label} className="flex items-center">
                        <span className="text-[#838388] text-[14px] leading-[20px] w-20 flex-shrink-0">{state.label}</span>
                        <div className="flex-1 h-[9px] bg-[#FFFFFF0D] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${state.pct}%`,
                                    backgroundColor: state.color,
                                }}
                            />
                        </div>
                        <span className="text-[#838388] text-[14px] leading-[20px] w-[46px] text-right flex-shrink-0">
                            {state.pct}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
