'use client'

import { useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import { formatNowcastNumber, useNowcastData } from './nowcastData'
import type { NowcastCardProps } from './NowcastCard'

type HighlightCol = 'nowcast' | 'consensus' | 'prior'

function MiniSpark({ series, positive }: { series: { value: number }[]; positive: boolean }) {
  const values = series.map((p) => p.value).filter((v) => Number.isFinite(v))
  if (values.length < 2) {
    return <div className="h-6 w-16 bg-[#FFFFFF06]" aria-hidden />
  }
  const w = 64
  const h = 24
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * (w - 2) + 1
      const y = 1 + (1 - (v - min) / span) * (h - 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  const stroke = positive ? '#2CB37B' : '#E25C3F'
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible" aria-hidden>
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function deltaLabel(card: NowcastCardProps): { text: string; positive: boolean } {
  const d = card.nowcast - card.consensus
  if (!Number.isFinite(d)) return { text: '-', positive: true }
  const sign = d > 0 ? '+' : ''
  const unit = card.unit?.includes('%') ? '%' : ''
  const mag = Math.abs(d) >= 10 ? d.toFixed(0) : Number(d.toFixed(2)).toString()
  return { text: `${sign}${mag}${unit}`, positive: d >= 0 }
}

export default function KeyNowcastsTable() {
  const { cards, loading, error } = useNowcastData()
  const [highlight, setHighlight] = useState<HighlightCol>('nowcast')
  const [regionFilter, setRegionFilter] = useState<string>('all')

  const regions = useMemo(() => {
    const set = new Set(cards.map((c) => `${c.region} · ${c.quarter}`))
    return [...set]
  }, [cards])

  const rows = useMemo(() => {
    if (regionFilter === 'all') return cards
    return cards.filter((c) => `${c.region} · ${c.quarter}` === regionFilter)
  }, [cards, regionFilter])

  const colClass = (col: HighlightCol) =>
    highlight === col ? 'text-[#88C4FF]' : 'text-white'

  return (
    <div className="bg-[#16161F] flex flex-col min-h-0 h-full">
      <div className="flex items-start justify-between gap-3 px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] flex-wrap">
        <div>
          <h3 className="text-white text-[16px] leading-[20px] font-semibold">Key Nowcasts</h3>
          <div className="mt-2">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-[#FFFFFF0A] text-[#838388] text-[12px] border border-[#FFFFFF14] px-2 py-1.5 outline-none max-w-[220px]"
            >
              <option value="all">All regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {(
            [
              { key: 'nowcast', label: 'Nowcasts' },
              { key: 'consensus', label: 'Consensus' },
              { key: 'prior', label: 'Prior' },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setHighlight(t.key)}
              className={`px-2.5 py-1.5 text-[12px] leading-[15px] font-medium transition-colors cursor-pointer ${
                highlight === t.key ? 'bg-[#FFFFFF14] text-[#88C4FF]' : 'text-[#838388] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {loading && <ChartLoader className="min-h-[140px]" />}
        {error && !loading && <p className="px-4 py-6 text-[#E25C3F] text-[12px]">{error}</p>}
        {!loading && !error && rows.length === 0 && (
          <p className="px-4 py-6 text-[#838388] text-[12px]">No nowcast rows yet.</p>
        )}

        {!loading && !error && rows.length > 0 && (
          <table className="w-full border-collapse min-w-[560px]">
            <thead className="sticky top-0 bg-[#16161F] z-10">
              <tr className="border-b border-[#FFFFFF08]">
                <th className="pl-4 py-2.5 text-left text-[#838388] text-[12px] font-semibold">Indicator</th>
                <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] font-semibold">Nowcast</th>
                <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] font-semibold">Consensus</th>
                <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] font-semibold">Prior</th>
                <th className="px-2 py-2.5 text-left text-[#838388] text-[12px] font-semibold">Δ vs Cons.</th>
                <th className="pr-4 py-2.5 text-left text-[#838388] text-[12px] font-semibold">Trend</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((card, i) => {
                const delta = deltaLabel(card)
                return (
                  <tr
                    key={`${card.indicator}-${card.region}-${i}`}
                    className="border-b border-[#FFFFFF08] last:border-0 hover:bg-[#FFFFFF03]"
                  >
                    <td className="pl-4 py-3 align-middle">
                      <p className="text-white text-[13px] leading-[18px] font-medium">{card.indicator}</p>
                      <p className="text-[#838388] text-[11px] leading-[14px] mt-0.5">
                        {card.region} · {card.quarter}
                        {card.unit ? ` · ${card.unit}` : ''}
                      </p>
                    </td>
                    <td className={`px-2 py-3 align-middle text-[13px] font-semibold tabular-nums ${colClass('nowcast')}`}>
                      {formatNowcastNumber(card.nowcast, card.unit)}
                    </td>
                    <td className={`px-2 py-3 align-middle text-[13px] font-medium tabular-nums ${colClass('consensus')}`}>
                      {formatNowcastNumber(card.consensus, card.unit)}
                    </td>
                    <td className={`px-2 py-3 align-middle text-[13px] font-medium tabular-nums ${colClass('prior')}`}>
                      {formatNowcastNumber(card.prior, card.unit)}
                    </td>
                    <td
                      className={`px-2 py-3 align-middle text-[13px] font-semibold tabular-nums ${
                        delta.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                      }`}
                    >
                      {delta.text}
                    </td>
                    <td className="pr-4 py-3 align-middle">
                      <MiniSpark series={card.trendSeries || []} positive={delta.positive} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
