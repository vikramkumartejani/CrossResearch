import WeeklyHighlights from './WeeklyHighlights'
import SignalChartCard from './SignalChartCard'
import { ALL_CHARTS } from './signalChartsData'

export default function MacroSignals() {
    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_584_5585)">
                            <path d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#838388" strokeWidth="1.2" />
                            <path d="M2.25 6.00578C2.25 6.00578 4.45287 8.24997 7.82787 8.24997C10.125 8.24997 11.3443 6.92016 12.375 6.56681C14.3122 5.90272 15.75 6.00578 15.75 6.00578" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M2.25051 10.5058C2.25051 10.5058 3.81717 10.4027 5.92793 11.0668C7.05104 11.4202 8.37954 12.75 10.8825 12.75C13.1413 12.75 14.9183 11.9033 15.9531 11.25" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_584_5585">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Macro Signals Desk</span>
                </div>
                <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">Cross - Asset Alpha Engine</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Curated macro charts with proprietary insight behind each - rate differentials, breadth divergences, vol-curve dislocations, credit-equity lead/lag, and cross-asset correlations. Read once. Act once.
                </p>
            </div>

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[386px_1fr] gap-3 sm:gap-4">
                    {/* Left: Weekly Highlights */}
                    <WeeklyHighlights />

                    {/* Right: all charts */}
                    <div>
                        <h2 className="text-white text-[16px] font-medium leading-[22px] mb-3 sm:mb-4">Liquidity & Cross Signals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            {ALL_CHARTS.map(chart => (
                                <SignalChartCard key={chart.id} chart={chart} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
