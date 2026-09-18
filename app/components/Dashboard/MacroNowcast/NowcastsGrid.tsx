'use client'

import { useState } from 'react'
import NowcastCard from './NowcastCard'
import ChartLoader from '../shared/ChartLoader'
import { useNowcastData } from './nowcastData'

const MOBILE_INITIAL = 4

export default function NowcastsGrid({ compact = false }: { compact?: boolean }) {
  const { cards, loading, error } = useNowcastData()
  const [showAll, setShowAll] = useState(false)
  const visibleCards = showAll ? cards : cards.slice(0, MOBILE_INITIAL)

  return (
    <div className={compact ? 'h-full min-h-0 flex flex-col' : 'mb-4 sm:mb-5'}>
      {!compact && (
        <>
          <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Nowcasts</h2>
          <p className="text-[#838388] text-[14px] leading-[20px] mb-3 sm:mb-4">
            Model-driven current-quarter / current-period estimates vs consensus
          </p>
        </>
      )}

      {loading && <ChartLoader className="min-h-[80px] mb-3" />}
      {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}
      {!loading && !error && cards.length === 0 && (
        <p className="text-white/40 text-[13px] mb-3">No nowcast cards published yet.</p>
      )}

      <div
        className={
          compact
            ? 'hidden sm:grid sm:grid-cols-1 xl:grid-cols-2 gap-4 items-stretch flex-1 min-h-0 overflow-y-auto'
            : 'hidden sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch'
        }
      >
        {cards.map((card, i) => (
          <NowcastCard key={`${card.region}-${card.indicator}-${i}`} {...card} />
        ))}
      </div>

      <div className="sm:hidden">
        <div className="grid grid-cols-1 gap-3">
          {visibleCards.map((card, i) => (
            <NowcastCard key={`${card.region}-${card.indicator}-${i}`} {...card} />
          ))}
        </div>

        {!showAll && cards.length > MOBILE_INITIAL && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-3 w-full py-2 border border-[#FFFFFF1A] text-white/60 text-[14px] leading-[20px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
          >
            See {cards.length - MOBILE_INITIAL} More Nowcasts ↓
          </button>
        )}

        {showAll && cards.length > MOBILE_INITIAL && (
          <button
            type="button"
            onClick={() => setShowAll(false)}
            className="mt-3 w-full py-2 border border-[#FFFFFF1A] text-white/60 text-[14px] leading-[20px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
          >
            Show Less ↑
          </button>
        )}
      </div>
    </div>
  )
}
