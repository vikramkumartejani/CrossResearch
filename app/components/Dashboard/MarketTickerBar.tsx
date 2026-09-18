'use client'

import { useEffect, useMemo, useState } from 'react'
import { useDashboardTheme } from './DashboardTheme'
import {
  formatHeaderPrice,
  quotesMapFromResponse,
  type MarketHeaderQuote,
} from './Analysis/marketHeader'

type TickerItem = {
  key: string
  label: string
  symbol: string
  precision?: number
}

const TICKER_ITEMS: TickerItem[] = [
  { key: 'nas', label: 'NASDAQ', symbol: 'NAS100', precision: 2 },
  { key: 'dow', label: 'DOW', symbol: 'US30', precision: 2 },
  { key: 'spx', label: 'S&P', symbol: 'SP500', precision: 2 },
  { key: 'gold', label: 'GOLD', symbol: 'XAUUSD', precision: 2 },
  { key: 'btc', label: 'BTC', symbol: 'BTCUSD', precision: 2 },
  { key: 'wti', label: 'WTI', symbol: 'USOIL', precision: 2 },
  { key: 'eur', label: 'EURUSD', symbol: 'EURUSD', precision: 5 },
]

const POLL_MS = 5_000

function formatClock(date: Date) {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  })
}

function isUsEquitySession(date: Date) {
  // Rough session window in US/Eastern - weekdays 9:30-16:00
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(date)
    const weekday = parts.find((p) => p.type === 'weekday')?.value
    if (weekday === 'Sat' || weekday === 'Sun') return false
    const hour = Number(parts.find((p) => p.type === 'hour')?.value || 0)
    const minute = Number(parts.find((p) => p.type === 'minute')?.value || 0)
    const mins = hour * 60 + minute
    return mins >= 9 * 60 + 30 && mins < 16 * 60
  } catch {
    return true
  }
}

export default function MarketTickerBar() {
  const { theme } = useDashboardTheme()
  const isLight = theme === 'light'
  const [quotes, setQuotes] = useState<Record<string, MarketHeaderQuote>>({})
  const [now, setNow] = useState(() => new Date())

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
        // keep last good snapshot
      }
    }

    void load()
    const poll = window.setInterval(load, POLL_MS)
    const clock = window.setInterval(() => setNow(new Date()), 1000)
    return () => {
      cancelled = true
      window.clearInterval(poll)
      window.clearInterval(clock)
    }
  }, [])

  const rows = useMemo(() => {
    return TICKER_ITEMS.map((item) => {
      const q = quotes[item.symbol]
      const precision = item.precision ?? q?.precision ?? 2
      if (!q) {
        return {
          ...item,
          price: '-',
          change: '-',
          positive: true,
        }
      }
      return {
        ...item,
        price: formatHeaderPrice(q.price, precision),
        change: `${q.change_pct >= 0 ? '+' : ''}${q.change_pct.toFixed(2)}%`,
        positive: (q.change ?? 0) >= 0,
      }
    })
  }, [quotes])

  const marketOpen = isUsEquitySession(now)
  const barBg = isLight
    ? 'bg-[#F8F9FB] border-[#E4E7EE] text-[#5B6472]'
    : 'bg-[#080810] border-white/[0.06] text-white/45'
  const nameTone = isLight ? 'text-[#0F172A]' : 'text-white/75'
  const priceTone = isLight ? 'text-[#0F172A]' : 'text-white'

  return (
    <div className={`shrink-0 border-b ${barBg}`}>
      <div className="flex items-center gap-4 h-9 px-4 lg:px-6">
        <div className="flex-1 min-w-0 overflow-x-auto dashboard-topbar-scroll">
          <div className="flex items-center justify-start gap-5 sm:gap-6 w-max pr-2">
            {rows.map((row) => (
              <div key={row.key} className="flex items-baseline gap-1.5 whitespace-nowrap text-[11px] sm:text-[12px]">
                <span className={`font-semibold tracking-wide ${nameTone}`}>{row.label}</span>
                <span className={`font-medium tabular-nums ${priceTone}`}>{row.price}</span>
                <span
                  className={`font-medium tabular-nums ${
                    row.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                  }`}
                >
                  {row.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 hidden md:flex items-center gap-3 text-[11px]">
          <span className="tabular-nums whitespace-nowrap">{formatClock(now)}</span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                marketOpen ? 'bg-[#2CB37B]' : 'bg-[#E25C3F]'
              }`}
              aria-hidden
            />
            <span className={isLight ? 'text-[#0F172A]' : 'text-white/70'}>
              {marketOpen ? 'Market Open' : 'Market Closed'}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
