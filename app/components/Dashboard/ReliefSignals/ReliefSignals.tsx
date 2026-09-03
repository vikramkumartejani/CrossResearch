'use client'

import Watchlist from './Watchlist'
import ProbabilityMovers from './ProbabilityMovers'
import AlertsDetail from './AlertsDetail'
import LockedSection from '../LockedSection'
import { BeliefMarketsProvider, formatSeverityLabel, useBeliefMarkets } from './beliefMarkets'

function ReliefSignalsContent() {
    const { data, loading, refresh } = useBeliefMarkets()
    const marketState = data?.market_state || (loading ? '…' : '-')

    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <div className="mb-3 flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_belief_icon)">
                                <path
                                    d="M1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5C6.15685 1.5 7.5 2.84315 7.5 4.5V13.5C7.5 15.1569 6.15685 16.5 4.5 16.5C2.84315 16.5 1.5 15.1569 1.5 13.5V4.5Z"
                                    stroke="#838388"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M7.4997 6.18229L9.98495 3.69704C11.1565 2.52547 13.056 2.52547 14.2276 3.69704C15.3992 4.86861 15.3992 6.76811 14.2276 7.93968L6.97949 15.1878"
                                    stroke="#838388"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M4.5 16.5L13.5 16.5C15.1569 16.5 16.5 15.1569 16.5 13.5C16.5 11.8431 15.1569 10.5 13.5 10.5L11.625 10.5"
                                    stroke="#838388"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M5.25 13.5C5.25 13.9142 4.91421 14.25 4.5 14.25C4.08579 14.25 3.75 13.9142 3.75 13.5C3.75 13.0858 4.08579 12.75 4.5 12.75C4.91421 12.75 5.25 13.0858 5.25 13.5Z"
                                    stroke="#838388"
                                    strokeWidth="1.2"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_belief_icon">
                                    <rect width="18" height="18" rx="4" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Belief Markets Desk</span>
                    </div>
                    <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">
                        Probability Signals & Sentiment
                    </h1>
                    <p className="text-[#838388] text-[12px] leading-[17px] max-w-[540px]">
                        Live Polymarket (+ Kalshi) probability intelligence - movers, watchlists and threshold alerts.
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                        type="button"
                        onClick={refresh}
                        className="text-[#88C4FF] text-[12px] leading-[14px] hover:underline cursor-pointer"
                    >
                        Refresh
                    </button>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <p className="text-[12px] leading-[18px] font-medium">
                            Market State <span className="text-[14px] leading-[18px] font-semibold">{formatSeverityLabel(marketState)}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-6 flex flex-col xl:flex-row gap-4 xl:h-[760px]">
                <div className="flex-1 min-w-0 min-h-0 h-[420px] xl:h-full">
                    <ProbabilityMovers />
                </div>
                <div className="flex flex-col gap-4 flex-1 min-w-0 min-h-0 xl:h-full">
                    <LockedSection title="Watchlist" className="min-h-0 h-[360px] xl:flex-1 xl:h-auto xl:min-h-0">
                        <Watchlist />
                    </LockedSection>
                    <LockedSection title="Alerts" className="min-h-0 h-[360px] xl:flex-1 xl:h-auto xl:min-h-0">
                        <AlertsDetail />
                    </LockedSection>
                </div>
            </div>
        </div>
    )
}

export default function ReliefSignals() {
    return (
        <BeliefMarketsProvider>
            <ReliefSignalsContent />
        </BeliefMarketsProvider>
    )
}
