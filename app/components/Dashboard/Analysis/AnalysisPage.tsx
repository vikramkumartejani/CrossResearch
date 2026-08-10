'use client'

import { useState } from 'react'
import TheCycleWidget from './TheCycleWidget'
import Chart, { CURRENCY_PAIRS, type CurrencyPair } from './Chart'
import PriceRanges from './PriceRange'
import MarketTiming from './MarketTiming'
import LockedSection from '../LockedSection'
import AnalysisHeader from './AnalysisHeader'

export default function AnalysisPage() {
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0])

  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6 pb-6">
      <AnalysisHeader selectedPair={selectedPair} setSelectedPair={setSelectedPair} />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(280px,420px)_1fr] 2xl:grid-cols-[minmax(320px,480px)_1fr] gap-4 items-stretch">
        <TheCycleWidget />
        <Chart selectedPair={selectedPair} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <LockedSection title="Price Ranges">
          <PriceRanges asset={selectedPair.symbol} />
        </LockedSection>
        <LockedSection title="Market Timing">
          <MarketTiming />
        </LockedSection>
      </div>
    </div>
  )
}
