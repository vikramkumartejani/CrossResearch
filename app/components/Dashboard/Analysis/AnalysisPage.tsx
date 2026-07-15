'use client'
import TheCycleWidget from './TheCycleWidget'
import Chart from './Chart'
import TrendOverview from './TrendOverview'
import PriceRanges from './PriceRange'
import MarketTiming from './MarketTiming'

export default function AnalysisPage() {
  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6">
      {/* Row 1: Chart (65%) + CycleWidget (35%) */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] 2xl:grid-cols-[1fr_532px] gap-4">
        <Chart />
        <TheCycleWidget />
      </div>

      {/* Row 2: Trend Overview full width */}
      {/* <TrendOverview /> */}

      {/* Row 3: Price Ranges (55%) + Market Timing (45%) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <PriceRanges />
        <MarketTiming />
      </div>
    </div>
  )
}
