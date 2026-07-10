// Regime Probability Matrix — cross-country decomposition

interface Country {
    code: string
    state: string
    statePct: number
    stateColor: string
    barColor: string
    nowcast: number
    stagflation: number
    recession: number
    recovery: number
}

const COUNTRIES: Country[] = [
    { code: 'US', state: 'Stagflation', statePct: 47, stateColor: '#F59E0B', barColor: '#F59E0B', nowcast: 4.3, stagflation: 47, recession: 22, recovery: 13 },
    { code: 'EU', state: 'Stagflation', statePct: 41, stateColor: '#F59E0B', barColor: '#F59E0B', nowcast: 4.3, stagflation: 47, recession: 22, recovery: 13 },
    { code: 'JP', state: 'Stagflation', statePct: 38, stateColor: '#F59E0B', barColor: '#F59E0B', nowcast: 3.8, stagflation: 38, recession: 20, recovery: 18 },
    { code: 'UK', state: 'Stagflation', statePct: 35, stateColor: '#F59E0B', barColor: '#F59E0B', nowcast: 5.0, stagflation: 35, recession: 25, recovery: 15 },
    { code: 'CN', state: 'Stagflation', statePct: 30, stateColor: '#F59E0B', barColor: '#F59E0B', nowcast: 6.2, stagflation: 30, recession: 18, recovery: 22 },
]

export default function RegimeProbabilityMatrix() {
    return (
        <div className="mb-5">
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Regime Probability Matrix</h2>
            <p className="text-[#838388] text-[14px] leading-[20px] mb-4">
                Cross - Country Regime Decomposition  • Dominant state highlighted
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {COUNTRIES.map(c => (
                    <div key={c.code} className="bg-[#16161F] p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white text-[12px] leading-[14px] font-medium">{c.code}</span>
                            <span className="text-[12px] leading-[14px] font-normal text-[#88C4FF]">
                                {c.state} {c.statePct}%
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-[9px] bg-[#FFFFFF0D] mb-3">
                            <div
                                className="h-full transition-all"
                                style={{ width: `${c.statePct}%`, background: c.barColor }}
                            />
                        </div>

                        {/* Grid: labels row + values row */}
                        <div className="grid grid-cols-4 gap-2">
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

                                    <span className="mt-1 text-white text-[14px] font-semibold leading-5">
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
