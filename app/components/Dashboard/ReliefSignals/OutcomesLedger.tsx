// 30 signal outcomes — green = hit, red = miss, orange = partial
const OUTCOMES: ('hit' | 'miss' | 'partial')[] = [
    'hit', 'hit', 'hit', 'hit', 'hit',
    'hit', 'miss', 'hit', 'hit', 'hit',
    'hit', 'hit', 'partial', 'hit', 'hit',
    'miss', 'hit', 'hit', 'hit', 'hit',
    'hit', 'hit', 'hit', 'miss', 'hit',
    'hit', 'partial', 'hit', 'hit', 'miss',
]

const COLOR_MAP = {
    hit: 'bg-[#2CB37B]',
    miss: 'bg-[#E25C3F]',
    partial: 'bg-transparent border border-[#FFFFFF1A]',
}

const hits = OUTCOMES.filter((o) => o === 'hit').length
const misses = OUTCOMES.filter((o) => o === 'miss').length

export default function OutcomesLedger() {
    return (
        <div className="bg-[#16161F] border border-[#FFFFFF08] p-4 flex flex-col">
            {/* Tag */}
            <p className="text-[#838388] text-[12px] leading-[17px] font-normal mb-2">04 / Memory</p>

            {/* Title */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-2">Outcomes Ledger</h3>

            {/* Description */}
            <p className="text-[#838388] text-[12px] leading-[17px] mb-3">
                Every signal we've issued and resolved, providing transparent accountability that builds trust with skeptical clients.
            </p>

            {/* Sub-label */}
            <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-[#838388] text-[13px] leading-[16px]">Last 30 Signals</p>

                <span className="text-[#838388] text-[13px] leading-[16px]">
                    HIT / MISS
                </span>
            </div>

            {/* Dot grid */}
            <div className="flex flex-wrap gap-1">
                {OUTCOMES.map((outcome, i) => (
                    <div
                        key={i}
                        className={`w-[15px] h-[15px] rounded-full ${COLOR_MAP[outcome]}`}
                    />
                ))}
            </div>
        </div>
    )
}
