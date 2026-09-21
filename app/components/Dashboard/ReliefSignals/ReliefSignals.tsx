'use client'

import Watchlist from './Watchlist'
import ProbabilityMovers from './ProbabilityMovers'
import SentimentHeatmap from './SentimentHeatmap'
import ImpliedProbability from './ImpliedProbability'
import LockedSection from '../LockedSection'
import { BeliefMarketsProvider, formatSeverityLabel, useBeliefMarkets } from './beliefMarkets'

function ReliefSignalsContent() {
    const { data, loading, refresh } = useBeliefMarkets()
    const marketState = data?.market_state || (loading ? '…' : '-')

    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
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

            <div className="px-4 lg:px-6 flex flex-col xl:flex-row gap-4 items-stretch">
                <div className="flex-1 min-w-0 flex flex-col gap-4">
                    <div className="h-[420px] xl:h-[520px] min-h-0 shrink-0">
                        <ProbabilityMovers />
                    </div>
                    <SentimentHeatmap />
                </div>

                <div className="w-full xl:w-[420px] 2xl:w-[460px] flex flex-col gap-4 flex-shrink-0 min-h-0">
                    <LockedSection title="Watchlist" className="min-h-0 h-[280px] shrink-0">
                        <Watchlist />
                    </LockedSection>
                    <div className="flex-1 min-h-[280px]">
                        <ImpliedProbability />
                    </div>
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
