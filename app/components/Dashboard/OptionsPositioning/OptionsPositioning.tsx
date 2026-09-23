'use client'

import { useEffect, useMemo, useState } from 'react'
import MarketCard from './MarketCard'
import GreeksSynthesis from './GreeksSynthesis'
import SectorGammaDashboard from './SectorGammaDashboard'
import MacroEventStress from './MacroEventStress'
import LockedSection from '../LockedSection'
import ChartLoader from '../shared/ChartLoader'
import {
  quotesMapFromResponse,
  type MarketHeaderQuote,
} from '../Analysis/marketHeader'

type DealerLevel = {
  label: string
  level: number
  change: string
  positive: boolean
}

type StructureCard = {
  ticker: string
  regime: string
  regimeColor: string
  name: string
  price: string
  change: string
  changePositive: boolean
  dealerBias: string
  trendDay: string
  odteDom: string
  meanRevert: string
  volRegime: string
  levels: DealerLevel[]
  summary: string
  tags: string[]
}

/** Map structure tickers → market-header symbols for OHLC sparks */
const TICKER_TO_HEADER: Record<string, string> = {
  SPX: 'SP500',
  SP500: 'SP500',
  NDX: 'NAS100',
  NAS100: 'NAS100',
  DJIA: 'US30',
  DJI: 'US30',
  US30: 'US30',
}

function sparkFromQuote(q?: MarketHeaderQuote | null): number[] {
  if (!q) return []
  return [q.prev_open, q.prev_low, q.prev_high, q.prev_close, q.price].filter(
    (n): n is number => typeof n === 'number' && Number.isFinite(n)
  )
}

/** Fallback path from dealer levels when header quote is missing */
function sparkFromLevels(levels: DealerLevel[], spotHint?: string): number[] {
  const nums = levels.map((l) => l.level).filter((n) => Number.isFinite(n))
  const spot = Number(String(spotHint || '').replace(/,/g, ''))
  if (Number.isFinite(spot)) nums.push(spot)
  return nums
}

export default function OptionsPositioning() {
  const [sectionTitle, setSectionTitle] = useState('Market Structure')
  const [cards, setCards] = useState<StructureCard[]>([])
  const [quotes, setQuotes] = useState<Record<string, MarketHeaderQuote>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [structRes, headerRes] = await Promise.all([
          fetch('/api/market-structure', { cache: 'no-store' }),
          fetch('/api/market-header?all_symbols=1', { cache: 'no-store' }),
        ])
        const body = await structRes.json().catch(() => ({}))
        if (!structRes.ok) {
          throw new Error(
            typeof body.details === 'string'
              ? body.details
              : body.error || body.detail || `Failed to load market structure (${structRes.status})`
          )
        }
        const mapped: StructureCard[] = (Array.isArray(body.cards) ? body.cards : [])
          .filter((c: { active?: boolean }) => c.active !== false)
          .sort(
            (a: { sort_order?: number }, b: { sort_order?: number }) =>
              Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
          )
          .map((c: StructureCard) => ({
            ticker: c.ticker || '-',
            regime: c.regime || '-',
            regimeColor: c.regimeColor || '#2CB37B',
            name: c.name || '',
            price: c.price || '-',
            change: c.change || '',
            changePositive: Boolean(c.changePositive),
            dealerBias: c.dealerBias || '',
            trendDay: c.trendDay || '-',
            odteDom: c.odteDom || '-',
            meanRevert: c.meanRevert || '-',
            volRegime: c.volRegime || '-',
            levels: Array.isArray(c.levels) ? c.levels : [],
            summary: c.summary || '',
            tags: Array.isArray(c.tags) ? c.tags : [],
          }))

        let nextQuotes: Record<string, MarketHeaderQuote> = {}
        if (headerRes.ok) {
          const headerBody = await headerRes.json().catch(() => ({}))
          nextQuotes = quotesMapFromResponse(headerBody.data ?? headerBody)
        }

        if (!cancelled) {
          if (typeof body.title === 'string' && body.title.trim()) {
            setSectionTitle(body.title.trim())
          }
          setCards(mapped)
          setQuotes(nextQuotes)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load market structure')
          setCards([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const cardsWithLines = useMemo(() => {
    return cards.map((card) => {
      const headerSym = TICKER_TO_HEADER[card.ticker.toUpperCase()]
      const fromQuote = headerSym ? sparkFromQuote(quotes[headerSym]) : []
      const priceLine =
        fromQuote.length >= 2 ? fromQuote : sparkFromLevels(card.levels, card.price)
      return { ...card, priceLine }
    })
  }, [cards, quotes])

  return (
    <div>
      <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
        <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">
          Mechanical Dealer Levels
        </h1>
        <p className="text-[#838388] text-[12px] leading-[17px]">
          Gamma exposure, dealer bias and key option levels for SPX, NDX and DJIA. Identifies walls, flip
          zones and vacuum areas that drive intraday mechanics.
        </p>
      </div>

      <div className="px-4 lg:px-6">
        <h2 className="text-white text-[18px] font-medium leading-[22px] mb-3 sm:mb-4">{sectionTitle}</h2>
        {loading && <ChartLoader className="min-h-[80px] mb-3" />}
        {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4 sm:mb-5 items-stretch">
          {cardsWithLines.map((card) => (
            <MarketCard key={card.ticker} {...card} />
          ))}
        </div>

        <LockedSection title="Greeks Synthesis" className="mb-4 sm:mb-5">
          <GreeksSynthesis />
        </LockedSection>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_524px] gap-3 sm:gap-4 items-stretch mb-4 sm:mb-5">
          <LockedSection
            title="Sector Gamma"
            showHeading={false}
            className="h-full min-h-0"
            contentClassName="h-full min-h-0"
          >
            <SectorGammaDashboard />
          </LockedSection>
          <LockedSection
            title="Macro Event Stress"
            showHeading={false}
            className="h-full min-h-0"
            contentClassName="h-full min-h-0"
          >
            <MacroEventStress />
          </LockedSection>
        </div>
      </div>
    </div>
  )
}
