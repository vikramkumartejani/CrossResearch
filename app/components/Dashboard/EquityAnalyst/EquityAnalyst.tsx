'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LockedSection from '../LockedSection'
import ChartLoader from '../shared/ChartLoader'

type ReadyTicker = {
  ticker: string
  name: string
  exchange?: string | null
  sector?: string | null
}

type Summary = {
  ticker: string
  name: string
  as_of_date?: string
  period_label?: string
  period_tier?: string
  data_source?: string
  sector_engine?: string
  quality?: number | string
  valuation?: number | string
  momentum?: number | string
  state?: string
  reading?: string
  qc?: { passed?: number; warnings?: number; failures?: number }
}

type AnalysisResponse = {
  summary: Summary | null
  html: string | null
  unavailable?: {
    ticker?: string
    headline?: string
    body?: string
    message?: string
  } | null
  error?: string
  details?: string
}

const FALLBACK_TICKERS: ReadyTicker[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corporation' },
  { ticker: 'AMD', name: 'Advanced Micro Devices' },
  { ticker: 'INTC', name: 'Intel Corp.' },
  { ticker: 'JPM', name: 'JPMorgan Chase' },
  { ticker: 'JNJ', name: 'Johnson & Johnson' },
  { ticker: 'PLTR', name: 'Palantir Technologies' },
  { ticker: 'XOM', name: 'Exxon Mobil' },
]

function asNumber(v: number | string | undefined): number | null {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : null
}

function scoreClass(v: number | string | undefined) {
  const n = asNumber(v)
  if (n == null) return 'text-white'
  if (n >= 70) return 'text-[#2CB37B]'
  if (n >= 45) return 'text-white'
  return 'text-[#E25C3F]'
}

function formatScore(v: number | string | undefined) {
  const n = asNumber(v)
  if (n == null) return '-'
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

function EquityTickerPicker({
  value,
  options,
  onSelect,
  disabled,
}: {
  value: string
  options: ReadyTicker[]
  onSelect: (ticker: string) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.ticker === value) || {
    ticker: value,
    name: value,
  }

  const filtered = useMemo(() => {
    const q = filter.trim().toUpperCase()
    if (!q) return options
    return options.filter(
      (o) =>
        o.ticker.includes(q) ||
        (o.name || '').toUpperCase().includes(q) ||
        (o.sector || '').toUpperCase().includes(q),
    )
  }, [filter, options])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFilter('')
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-2 text-left cursor-pointer group disabled:opacity-60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <p className="text-white text-[22px] sm:text-[24px] leading-[28px] sm:leading-[30px] font-semibold group-hover:opacity-90">
            {selected.ticker}
          </p>
          <p className="mt-1 text-[#838388] text-[13px] leading-[16px] truncate">{selected.name}</p>
        </div>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          className={`mt-2.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z"
            fill="#FAFAF9"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-[#1E1E2A] border border-[#FFFFFF14] shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="p-2 border-b border-[#FFFFFF0D]">
            <input
              autoFocus
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search ticker or name"
              className="w-full bg-[#16161F] border border-[#FFFFFF0D] text-white text-[13px] px-3 py-2 outline-none focus:border-[#88C4FF55] placeholder:text-[#838388]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filtered[0]) {
                  onSelect(filtered[0].ticker)
                  setOpen(false)
                  setFilter('')
                }
              }}
            />
          </div>
          <div className="max-h-64 overflow-y-auto dashboard-scroll">
            {filtered.length === 0 ? (
              <p className="px-3.5 py-3 text-[#838388] text-[12px]">No matches</p>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.ticker}
                  type="button"
                  role="option"
                  aria-selected={item.ticker === value}
                  onClick={() => {
                    onSelect(item.ticker)
                    setOpen(false)
                    setFilter('')
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left cursor-pointer ${
                    item.ticker === value ? 'bg-[#FFFFFF0A]' : 'hover:bg-[#FFFFFF08]'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-white text-[13px] font-semibold tabular-nums">{item.ticker}</p>
                    <p className="text-[#838388] text-[12px] truncate">{item.name}</p>
                  </div>
                  {item.sector ? (
                    <span className="shrink-0 text-[#88C4FF] text-[11px]">{item.sector}</span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EquityAnalyst() {
  const [ready, setReady] = useState<ReadyTicker[]>([])
  const [active, setActive] = useState('NVDA')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [html, setHtml] = useState<string | null>(null)
  const [searchHits, setSearchHits] = useState<ReadyTicker[]>([])

  const options = useMemo(() => {
    const map = new Map<string, ReadyTicker>()
    for (const t of [...FALLBACK_TICKERS, ...ready, ...searchHits]) {
      if (!t?.ticker) continue
      map.set(t.ticker, {
        ticker: t.ticker,
        name: t.name || t.ticker,
        exchange: t.exchange,
        sector: t.sector,
      })
    }
    if (summary?.ticker) {
      map.set(summary.ticker, {
        ticker: summary.ticker,
        name: summary.name || summary.ticker,
        sector: summary.sector_engine,
      })
    }
    return Array.from(map.values()).sort((a, b) => a.ticker.localeCompare(b.ticker))
  }, [ready, searchHits, summary])

  const loadReady = useCallback(async () => {
    try {
      const res = await fetch('/api/equity-analyst/ready', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      setReady(Array.isArray(data.tickers) ? data.tickers : [])
    } catch {
      /* fallback list still works */
    }
  }, [])

  const analyze = useCallback(async (ticker: string) => {
    const t = ticker.trim().toUpperCase()
    if (!t) return
    setActive(t)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/equity-analyst/${encodeURIComponent(t)}`, { cache: 'no-store' })
      const data = (await res.json()) as AnalysisResponse
      if (!res.ok && res.status !== 422) {
        throw new Error(
          typeof data.details === 'string'
            ? data.details
            : data.error || `Analysis failed (${res.status})`,
        )
      }
      setSummary(data.summary ?? null)
      setHtml(data.html ?? null)
      if (!data.html) {
        setError(
          data.unavailable?.body ||
            data.unavailable?.message ||
            data.error ||
            'No research dashboard returned',
        )
      }
    } catch (e) {
      setSummary(null)
      setHtml(null)
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadReady()
    void analyze('NVDA')
  }, [loadReady, analyze])

  useEffect(() => {
    let cancelled = false
    async function warmSearch() {
      try {
        const res = await fetch('/api/equity-analyst/search?q=A&limit=40', { cache: 'no-store' })
        if (!res.ok || cancelled) return
        const data = await res.json()
        if (!cancelled) setSearchHits(Array.isArray(data.hits) ? data.hits : [])
      } catch {
        /* optional */
      }
    }
    void warmSearch()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <div className="border-b border-[#FFFFFF0D] pb-4 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M3.75 3.75h10.5v10.5H3.75V3.75Z"
                stroke="#838388"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M6 7.5h6M6 9.75h6M6 12h4.5"
                stroke="#838388"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[#838388] text-[12px] leading-[14px] font-medium">
              Equity Research Desk
            </span>
          </div>
          <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
            Equity Analyst
          </h1>
          <p className="text-[#838388] text-[12px] leading-[17px] max-w-[640px]">
            Full institutional research - Overview, Thesis, Valuation, Financials, Business,
            Industry, Competitors, Governance, Catalysts, Risks, and Model & QC.
          </p>
        </div>

        <div className="w-full lg:w-[320px] shrink-0 bg-[#16161F] p-3 sm:p-4">
          <p className="text-[#838388] text-[12px] leading-[14px] font-medium mb-2">Issuer</p>
          <EquityTickerPicker
            value={active}
            options={options}
            onSelect={(t) => void analyze(t)}
            disabled={loading}
          />
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[#838388] text-[12px]">State</span>
            <span className="text-white text-[12px] font-medium text-right">
              {summary?.state || (loading ? 'Loading…' : '-')}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(
              [
                ['Quality', summary?.quality],
                ['Valuation', summary?.valuation],
                ['Momentum', summary?.momentum],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="min-w-0">
                <p className="text-white/50 text-[11px] mb-0.5">{label}</p>
                <p className={`text-[15px] font-semibold tabular-nums ${scoreClass(value)}`}>
                  {loading && !summary ? '…' : formatScore(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 pb-6">
        <LockedSection title="Research dashboard" keepTitle>
          <div className="border border-[#FFFFFF0D] bg-[#070711] overflow-hidden min-h-[78vh]">
            {loading && !html ? (
              <ChartLoader className="min-h-[78vh]" />
            ) : html ? (
              <iframe
                title={`${active} equity analyst`}
                srcDoc={html}
                className="w-full min-h-[82vh] h-[calc(100dvh-11rem)] border-0 bg-[#070711]"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center min-h-[78vh] px-6">
                <p className="text-[#838388] text-[13px] leading-[18px] text-center max-w-sm">
                  {error || 'Choose an issuer to open the research dashboard.'}
                </p>
              </div>
            )}
          </div>
          {summary?.reading ? (
            <p className="mt-3 text-[#838388] text-[12px] leading-[17px] max-w-[920px]">
              {summary.reading}
            </p>
          ) : null}
        </LockedSection>
      </div>
    </div>
  )
}
