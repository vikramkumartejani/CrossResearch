// Regime Probability Matrix — cross-country decomposition

interface Country {
    code: string
    state: string
    statePct: number
    stateColor: string
    nowcast: number
    nowcastPct: number
    stagflation: number
    recession: number
    recovery: number
}

const COUNTRIES: Country[] = [
    { code: 'US', state: 'Stagflation', statePct: 47, stateColor: '#E4702D', nowcast: 4.3, nowcastPct: 18, stagflation: 47, recession: 22, recovery: 13 },
    { code: 'EU', state: 'Stagflation', statePct: 41, stateColor: '#E4702D', nowcast: 4.3, nowcastPct: 18, stagflation: 47, recession: 22, recovery: 13 },
    { code: 'JP', state: 'Stagflation', statePct: 38, stateColor: '#E4702D', nowcast: 3.8, nowcastPct: 24, stagflation: 38, recession: 20, recovery: 18 },
    { code: 'UK', state: 'Stagflation', statePct: 35, stateColor: '#E4702D', nowcast: 5.0, nowcastPct: 25, stagflation: 35, recession: 25, recovery: 15 },
    { code: 'CN', state: 'Stagflation', statePct: 30, stateColor: '#E4702D', nowcast: 6.2, nowcastPct: 30, stagflation: 30, recession: 18, recovery: 22 },
]

export default function RegimeProbabilityMatrix() {
    return (
        <div className="mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Regime Probability Matrix</h2>
            <p className="text-[#838388] text-[14px] leading-[20px] mb-3 sm:mb-4">
                Cross - Country Regime Decomposition  • Dominant state highlighted
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4">
                {COUNTRIES.map(c => (
                    <div key={c.code} className="bg-[#16161F] p-3 sm:p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white text-[12px] leading-[14px] font-medium">{c.code}</span>
                            <span className="text-[12px] leading-[14px] font-semibold text-[#88C4FF]">
                                {c.state} {c.statePct}%
                            </span>
                        </div>

                        {/* Segmented progress bar */}
                        <div className="flex h-[9px] mb-3 rounded-sm overflow-hidden">
                            <div style={{ width: `${c.nowcastPct}%`,  background: '#2CB37B', flexShrink: 0 }} />
                            <div style={{ width: `${c.stagflation}%`, background: '#E4702D', flexShrink: 0 }} />
                            <div style={{ width: `${c.recession}%`,   background: '#E25C3F', flexShrink: 0 }} />
                            <div style={{ width: `${c.recovery}%`,    background: '#88C4FF', flexShrink: 0 }} />
                        </div>

                        {/* Grid: labels row + values row */}
                        <div className="flex flex-wrap items-start gap-2">
                            {[
                                { label: "Nowcast", value: c.nowcast },
                                { label: "Stagflation", value: `${c.stagflation}%` },
                                { label: "Recession", value: `${c.recession}%` },
                                { label: "Recovery", value: `${c.recovery}%` },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col">
                                    <span className="text-white/60 text-[12px] leading-[14px] font-medium">
                                        {item.label}
                                    </span>
                                    <span className="mt-1 text-white text-[13px] sm:text-[14px] font-semibold leading-4 sm:leading-5">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
