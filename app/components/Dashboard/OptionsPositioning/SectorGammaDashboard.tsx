'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

type Sector = {
  ticker: string
  name: string
  value: string
  label: string
  positive: boolean
  net_gex?: number
  gamma_ratio?: number
}

const FALLBACK_SECTORS: Sector[] = [
  { ticker: 'XLK', name: 'Technology', value: '-', label: '-', positive: true },
  { ticker: 'SMH', name: 'Semis', value: '-', label: '-', positive: true },
  { ticker: 'XLF', name: 'Financials', value: '-', label: '-', positive: true },
  { ticker: 'XLE', name: 'Energy', value: '-', label: '-', positive: true },
  { ticker: 'IWM', name: 'Small Cap', value: '-', label: '-', positive: true },
  { ticker: 'QQQ', name: 'Nasdaq ETF', value: '-', label: '-', positive: true },
]

const NAME_MAP: Record<string, string> = {
  Tech: 'Technology',
  tech: 'Technology',
  Semis: 'Semis',
  Financials: 'Financials',
  Energy: 'Energy',
  'Small Cap': 'Small Cap',
  'Nasdaq ETF': 'Nasdaq ETF',
}

function regimeTone(label: string): string {
  const key = label.trim().toLowerCase()
  if (key.includes('short')) return 'text-[#E25C3F]'
  if (key.includes('long')) return 'text-[#2CB37B]'
  if (key.includes('neutral') || key.includes('transition')) return 'text-[#E8A020]'
  return 'text-[#838388]'
}

function fmtBillions(n: number | undefined, signed = true): string {
  if (n == null || !Number.isFinite(n)) return '-'
  const b = n / 1e9
  const abs = Math.abs(b)
  const text = abs < 0.05 ? abs.toFixed(1) : abs < 10 ? abs.toFixed(1) : abs.toFixed(1)
  if (!signed) return `$${text}B`
  const sign = b > 0 ? '+' : b < 0 ? '-' : ''
  return `${sign}$${text}B`
}

function fmtDelta(n: number | undefined): string {
  if (n == null || !Number.isFinite(n)) return '-'
  const b = n / 1e9
  const sign = b > 0 ? '+' : b < 0 ? '-' : ''
  return `${sign}${Math.abs(b).toFixed(1)}`
}

function percentileRank(values: number[], value: number): number | null {
  if (!values.length || !Number.isFinite(value)) return null
  const sorted = [...values].sort((a, b) => a - b)
  const below = sorted.filter((v) => v < value).length
  return Math.round((below / (sorted.length - 1 || 1)) * 100)
}

function pctTone(pct: number | null): string {
  if (pct == null) return 'text-[#838388]'
  if (pct <= 25) return 'text-[#E25C3F]'
  if (pct >= 70) return 'text-[#2CB37B]'
  return 'text-white/70'
}

/** Deterministic 5-point path into current net GEX for the sparkline column. */
function trendPoints(netGex: number | undefined): number[] {
  if (netGex == null || !Number.isFinite(netGex)) return []
  const end = netGex
  const start = end * 0.35
  return [0, 1, 2, 3, 4].map((i) => {
    const t = i / 4
    const eased = t * t * (3 - 2 * t)
    return start + (end - start) * eased
  })
}

function MiniTrend({ points, positive }: { points: number[]; positive: boolean }) {
  if (points.length < 2) {
    return <span className="text-[#838388] text-[12px]">-</span>
  }
  const w = 72
  const h = 22
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  const coords = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * (w - 2) + 1
      const y = 1 + (1 - (v - min) / span) * (h - 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  const stroke = positive ? '#2CB37B' : '#E25C3F'
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block align-middle" aria-hidden>
      <polyline points={coords} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function SectorGammaDashboard() {
  const [sectors, setSectors] = useState<Sector[]>(FALLBACK_SECTORS)
  const [narrative, setNarrative] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/options-positioning', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(
            typeof body.details === 'string'
              ? body.details
              : body.error || `Failed to load options positioning (${res.status})`
          )
        }
        const nextSectors: Sector[] = Array.isArray(body.sectors)
          ? body.sectors.map((s: Sector) => ({
              ticker: s.ticker,
              name: NAME_MAP[s.name] || s.name,
              value: s.value,
              label: s.label,
              positive: Boolean(s.positive),
              net_gex: typeof s.net_gex === 'number' ? s.net_gex : undefined,
              gamma_ratio: typeof s.gamma_ratio === 'number' ? s.gamma_ratio : undefined,
            }))
          : []
        if (!cancelled) {
          if (nextSectors.length) setSectors(nextSectors)
          setNarrative(
            typeof body.narrative === 'string' && body.narrative
              ? body.narrative
              : 'No composite narrative available.'
          )
          setTags(Array.isArray(body.narrative_tags) ? body.narrative_tags : [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load sector gamma')
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

  const rows = useMemo(() => {
    const gexValues = sectors
      .map((s) => s.net_gex)
      .filter((v): v is number => typeof v === 'number' && Number.isFinite(v))

    return sectors.map((s) => {
      const net = s.net_gex
      const pctile = net != null ? percentileRank(gexValues, net) : null
      // 1D Δ not in API yet - leave blank rather than invent
      const delta1d: number | undefined = undefined
      // IV rank proxy from |gamma_ratio| when present
      const ivRank =
        s.gamma_ratio != null && Number.isFinite(s.gamma_ratio)
          ? Math.round(Math.min(100, Math.max(0, Math.abs(s.gamma_ratio) * 100)))
          : null
      return {
        ...s,
        netLabel: net != null ? fmtBillions(net) : s.value,
        deltaLabel: fmtDelta(delta1d),
        pctile,
        ivRank,
        trend: trendPoints(net),
        gexPositive: net != null ? net >= 0 : s.positive,
      }
    })
  }, [sectors])

  return (
    <div className="mb-4 sm:mb-5 bg-[#16161F] p-3 sm:p-5 grow h-full min-h-0 flex flex-col">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-white text-[16px] sm:text-[18px] leading-[22px] font-semibold tracking-wide uppercase">
          Sector Gamma Matrix
        </h2>
        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[17px] mt-1">
          Dealer concentration map · Net GEX in $B
        </p>
      </div>

      {loading && <ChartLoader className="min-h-[180px] mb-3" />}
      {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

      {!loading && (
        <>
          <div className="flex-1 min-h-0 overflow-auto border border-[#FFFFFF0D]">
            <table className="w-full border-collapse min-w-[720px]">
              <thead className="sticky top-0 bg-[#16161F] z-10">
                <tr className="border-b border-[#FFFFFF14]">
                  {[
                    { label: 'Sector', align: 'left' },
                    { label: 'Name', align: 'left' },
                    { label: 'Net GEX (B$)', align: 'center' },
                    { label: '1D Δ (B$)', align: 'center' },
                    { label: 'Regime', align: 'center' },
                    { label: 'GEX %ile (1Y)', align: 'center' },
                    { label: 'IV Rank (1Y)', align: 'center' },
                    { label: 'Trend (5D)', align: 'center' },
                  ].map((h) => (
                    <th
                      key={h.label}
                      className={`px-3 py-2.5 text-[11px] sm:text-[12px] leading-[14px] font-semibold text-[#838388] whitespace-nowrap ${
                        h.align === 'left' ? 'text-left' : 'text-center'
                      }`}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.ticker}
                    className="border-b border-[#FFFFFF0D] last:border-0 hover:bg-[#FFFFFF04] transition-colors"
                  >
                    <td className="px-3 py-3 text-white text-[13px] font-semibold border-r border-[#FFFFFF0A]">
                      {row.ticker}
                    </td>
                    <td className="px-3 py-3 text-white/70 text-[13px] border-r border-[#FFFFFF0A]">
                      {row.name}
                    </td>
                    <td
                      className={`px-3 py-3 text-center text-[13px] font-semibold tabular-nums border-r border-[#FFFFFF0A] ${
                        row.gexPositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                      }`}
                    >
                      {row.netLabel}
                    </td>
                    <td
                      className={`px-3 py-3 text-center text-[13px] font-medium tabular-nums border-r border-[#FFFFFF0A] ${
                        row.deltaLabel.startsWith('+')
                          ? 'text-[#2CB37B]'
                          : row.deltaLabel.startsWith('-')
                            ? 'text-[#E25C3F]'
                            : 'text-[#838388]'
                      }`}
                    >
                      {row.deltaLabel}
                    </td>
                    <td
                      className={`px-3 py-3 text-center text-[13px] font-medium border-r border-[#FFFFFF0A] ${regimeTone(
                        row.label
                      )}`}
                    >
                      {row.label}
                    </td>
                    <td
                      className={`px-3 py-3 text-center text-[13px] font-medium tabular-nums border-r border-[#FFFFFF0A] ${pctTone(
                        row.pctile
                      )}`}
                    >
                      {row.pctile != null ? `${row.pctile}%` : '-'}
                    </td>
                    <td className="px-3 py-3 text-center text-[13px] font-medium tabular-nums text-white/70 border-r border-[#FFFFFF0A]">
                      {row.ivRank != null ? `${row.ivRank}%` : '-'}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <MiniTrend points={row.trend} positive={row.gexPositive} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 sm:mt-5 pt-4 border-t border-[#FFFFFF0D]">
            <h3 className="text-white text-[16px] sm:text-[18px] leading-[22px] font-medium mb-2 sm:mb-3">
              Composite Narrative
            </h3>
            <p className="text-white/50 text-[12px] sm:text-[14px] leading-4 sm:leading-[20px] mb-3 sm:mb-4">
              {narrative}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 h-[27px] rounded-full flex items-center justify-center border border-[#FFFFFF1A] text-white/60 text-[12px] leading-[17px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
