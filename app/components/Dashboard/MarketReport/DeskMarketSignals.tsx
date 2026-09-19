'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  formatHeaderPrice,
  quotesMapFromResponse,
  type MarketHeaderQuote,
} from '../Analysis/marketHeader'

type DeskSignal = {
  key: string
  label: string
  symbol: string
  precision: number
  format?: 'price' | 'yield' | 'btc'
}

const SIGNALS: DeskSignal[] = [
  { key: 'spx', label: 'S&P 500', symbol: 'SP500', precision: 2 },
  { key: 'dxy', label: 'DXY', symbol: 'DXY', precision: 2 },
  { key: 'us10y', label: 'US 10Y', symbol: 'US10Y', precision: 2, format: 'yield' },
  { key: 'btc', label: 'BTC', symbol: 'BTCUSD', precision: 0, format: 'btc' },
]

function sparkPoints(q?: MarketHeaderQuote | null): number[] {
  if (!q) return []
  return [q.prev_open, q.prev_low, q.prev_high, q.prev_close, q.price].filter(
    (n): n is number => typeof n === 'number' && Number.isFinite(n)
  )
}

function MiniSpark({ points, up }: { points: number[]; up: boolean }) {
  const clean = points.filter((n) => Number.isFinite(n))
  if (clean.length < 2) {
    return <div className="h-7 w-[64px] bg-white/[0.04]" aria-hidden />
  }
  const w = 64
  const h = 28
  const min = Math.min(...clean)
  const max = Math.max(...clean)
  const span = max - min || 1
  const pts = clean
    .map((v, i) => {
      const x = (i / (clean.length - 1)) * (w - 2) + 1
      const y = 1 + (1 - (v - min) / span) * (h - 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="flex-shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={up ? '#2CB37B' : '#E25C3F'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

function formatPrice(q: MarketHeaderQuote | undefined, s: DeskSignal): string {
  if (!q) return '-'
  if (s.format === 'yield') return `${formatHeaderPrice(q.price, s.precision)}%`
  if (s.format === 'btc') {
    return Math.round(q.price).toLocaleString('en-US')
  }
  return Number(q.price).toLocaleString('en-US', {
    minimumFractionDigits: s.precision,
    maximumFractionDigits: s.precision,
  })
}

function formatChange(q: MarketHeaderQuote | undefined, s: DeskSignal): string {
  if (!q) return '-'
  if (s.format === 'yield') {
    const bp = (q.change ?? 0) * 100
    const sign = bp >= 0 ? '+' : ''
    return `${sign}${bp.toFixed(1)}bp`
  }
  const pct = q.change_pct ?? 0
  const sign = pct >= 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}

export default function DeskMarketSignals() {
  const [quotes, setQuotes] = useState<Record<string, MarketHeaderQuote>>({})

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/market-header?all_symbols=1', { cache: 'no-store' })
        if (!res.ok) return
        const body = await res.json().catch(() => ({}))
        if (!cancelled) setQuotes(quotesMapFromResponse(body.data ?? body))
      } catch {
        /* ignore */
      }
    }
    void load()
    const id = setInterval(load, 15_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const rows = useMemo(() => {
    return SIGNALS.map((s) => {
      const q = quotes[s.symbol]
      const up = (q?.change ?? 0) >= 0
      return {
        ...s,
        price: formatPrice(q, s),
        change: formatChange(q, s),
        up,
        points: sparkPoints(q),
      }
    })
  }, [quotes])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4 w-full xl:w-auto xl:min-w-[480px] xl:h-full xl:items-center xl:content-center">
      {rows.map((row) => (
        <div key={row.key} className="min-w-0 flex flex-col justify-center">
          <p className="text-[#8B8B93] text-[11px] leading-none mb-1.5 normal-case">{row.label}</p>
          <div className="flex items-center gap-2">
            <div className="min-w-0">
              <p className="text-white text-[15px] leading-none font-medium tabular-nums truncate">
                {row.price}
              </p>
              <p
                className={`mt-1 text-[11px] leading-none font-medium tabular-nums ${
                  row.up ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                }`}
              >
                {row.change}
              </p>
            </div>
            <MiniSpark points={row.points} up={row.up} />
          </div>
        </div>
      ))}
    </div>
  )
}
