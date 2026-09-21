'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import NowcastCard from './NowcastCard'
import ChartLoader from '../shared/ChartLoader'
import { useNowcastData } from './nowcastData'

const PAGE_SIZE = 2

function PaginationBar({
  page,
  pageCount,
  onPage,
}: {
  page: number
  pageCount: number
  onPage: (next: number) => void
}) {
  if (pageCount <= 1) return null
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => onPage(Math.max(0, page - 1))}
        disabled={page === 0}
        className="px-3 py-1.5 text-[13px] font-medium border border-[#FFFFFF1A] text-white/70 hover:text-white hover:border-[#FFFFFF30] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        ← Prev
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Page ${i + 1}`}
            onClick={() => onPage(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
              i === page ? 'bg-[#88C4FF]' : 'bg-[#FFFFFF28] hover:bg-[#FFFFFF50]'
            }`}
          />
        ))}
        <span className="ml-2 text-[#838388] text-[12px] tabular-nums">
          {page + 1} / {pageCount}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onPage(Math.min(pageCount - 1, page + 1))}
        disabled={page >= pageCount - 1}
        className="px-3 py-1.5 text-[13px] font-medium border border-[#FFFFFF1A] text-white/70 hover:text-white hover:border-[#FFFFFF30] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        Next →
      </button>
    </div>
  )
}

export default function NowcastsGrid({
  compact = false,
  fillHeight = false,
  /** When set, pagination is not rendered inside the card stack (parent places it below). */
  paginationBelow = false,
  leftColumn,
}: {
  compact?: boolean
  fillHeight?: boolean
  paginationBelow?: boolean
  /** Optional left column (e.g. Key Nowcasts + path chart) stretched beside the cards */
  leftColumn?: ReactNode
}) {
  const { cards, loading, error } = useNowcastData()
  const [page, setPage] = useState(0)

  const pageCount = Math.max(1, Math.ceil(cards.length / PAGE_SIZE))

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1))
  }, [pageCount])

  const pageCards = useMemo(() => {
    const start = page * PAGE_SIZE
    return cards.slice(start, start + PAGE_SIZE)
  }, [cards, page])

  const cardsGrid = !loading && !error && cards.length > 0 && (
    <div
      className={
        fillHeight
          ? 'grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch flex-1 min-h-0 h-full'
          : compact
            ? 'grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch'
      }
    >
      {pageCards.map((card, i) => (
        <div
          key={`${card.region}-${card.indicator}-${page}-${i}`}
          className={fillHeight ? 'min-h-0 h-full' : undefined}
        >
          <NowcastCard {...card} />
        </div>
      ))}
    </div>
  )

  const pager = (
    <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
  )

  if (leftColumn) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col xl:flex-row gap-4 items-stretch">
          <div className="w-full xl:w-[42%] 2xl:w-[40%] flex flex-col gap-4 min-w-0 min-h-[420px]">
            {leftColumn}
          </div>
          <div className="flex-1 min-w-0 flex flex-col min-h-[420px]">
            {loading && <ChartLoader className="min-h-[80px] mb-3" />}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}
            {!loading && !error && cards.length === 0 && (
              <p className="text-white/40 text-[13px] mb-3">No nowcast cards published yet.</p>
            )}
            {cardsGrid}
          </div>
        </div>
        {pager}
      </div>
    )
  }

  return (
    <div
      className={
        fillHeight
          ? 'h-full min-h-0 flex flex-col'
          : compact
            ? 'flex flex-col'
            : 'mb-4 sm:mb-5'
      }
    >
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

      {cardsGrid}

      <div className="mt-3">{pager}</div>
    </div>
  )
}
