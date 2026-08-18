'use client'

import { useEffect, useMemo, useState } from 'react'
import TheCycleWidget from './TheCycleWidget'
import Chart, { CURRENCY_PAIRS, type CurrencyPair } from './Chart'
import PriceRanges from './PriceRange'
import MarketTiming from './MarketTiming'
import LockedSection from '../LockedSection'
import AnalysisHeader from './AnalysisHeader'
import {
  applyMarketHeader,
  quotesMapFromResponse,
  type MarketHeaderQuote,
} from './marketHeader'

const POLL_MS = 2_000

export default function AnalysisPage() {
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0])
  const [quotes, setQuotes] = useState<Record<string, MarketHeaderQuote>>({})

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/market-header?all_symbols=1', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok || cancelled) return
        const next = quotesMapFromResponse(body.data ?? body)
        if (Object.keys(next).length) setQuotes(next)
      } catch {
        // keep last good values
      }
    }

    void load()
    const timer = window.setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const pairsWithQuotes = useMemo(
    () => CURRENCY_PAIRS.map((pair) => applyMarketHeader(pair, quotes[pair.symbol])),
    [quotes]
  )

  const activePair = useMemo(
    () => applyMarketHeader(selectedPair, quotes[selectedPair.symbol]),
    [selectedPair, quotes]
  )

  return (
    <div className="flex flex-col gap-5 px-4 lg:px-6 pb-6">
      <AnalysisHeader
        pairs={pairsWithQuotes}
        selectedPair={activePair}
        setSelectedPair={setSelectedPair}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(320px,500px)_1fr] 2xl:grid-cols-[minmax(380px,580px)_1fr] gap-4 items-stretch">
        <TheCycleWidget />
        <Chart selectedPair={activePair} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <LockedSection title="Price Ranges">
          <PriceRanges asset={activePair.symbol} />
        </LockedSection>
        <LockedSection title="Market Timing">
          <MarketTiming />
        </LockedSection>
      </div>
    </div>
  )
}
