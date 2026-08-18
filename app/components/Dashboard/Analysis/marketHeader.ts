import type { CurrencyPair } from './Chart'

export type MarketHeaderQuote = {
  symbol: string
  price: number
  change: number
  change_pct: number
  prev_open: number | null
  prev_high: number | null
  prev_low: number | null
  prev_close: number | null
  precision: number
  asof?: string
  source?: string
}

export function formatHeaderPrice(value: number | null | undefined, precision: number): string {
  if (value == null || !Number.isFinite(value)) return '-'
  return value.toFixed(precision)
}

export function formatHeaderChange(change: number, changePct: number, precision: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(precision)} (${sign}${changePct.toFixed(2)}%)`
}

export function applyMarketHeader(pair: CurrencyPair, quote?: MarketHeaderQuote | null): CurrencyPair {
  if (!quote || quote.symbol !== pair.symbol) return pair

  const precision = quote.precision ?? 5
  const changePositive = (quote.change ?? 0) >= 0

  return {
    ...pair,
    price: formatHeaderPrice(quote.price, precision),
    change: formatHeaderChange(quote.change, quote.change_pct, precision),
    changePositive,
    prevClose: formatHeaderPrice(quote.prev_close, precision),
    openPrice: formatHeaderPrice(quote.prev_open, precision),
    dayHigh: formatHeaderPrice(quote.prev_high, precision),
    dayLow: formatHeaderPrice(quote.prev_low, precision),
  }
}

export function quotesMapFromResponse(body: unknown): Record<string, MarketHeaderQuote> {
  if (!body || typeof body !== 'object') return {}
  const record = body as Record<string, unknown>
  if (record.symbol && typeof record.price === 'number') {
    return { [String(record.symbol)]: record as MarketHeaderQuote }
  }

  const out: Record<string, MarketHeaderQuote> = {}
  for (const [key, value] of Object.entries(record)) {
    if (key.startsWith('_')) continue
    if (!value || typeof value !== 'object') continue
    const quote = value as MarketHeaderQuote
    if (typeof quote.price === 'number') out[key] = quote
  }
  return out
}
