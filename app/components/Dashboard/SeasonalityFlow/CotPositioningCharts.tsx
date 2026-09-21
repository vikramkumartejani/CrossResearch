'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import DarkSelect from '../shared/DarkSelect'

type MetricMode = 'zscore' | 'net' | 'wow'

interface CotRow {
  name: string
  ticker: string
  net: number | null
  wow: number | null
  trend: number[]
}

interface CotPayload {
  financials: CotRow[]
  commodities: CotRow[]
}

const METRIC_OPTIONS: { id: MetricMode; label: string }[] = [
  { id: 'zscore', label: 'Z-Score' },
  { id: 'net', label: 'Net (K)' },
  { id: 'wow', label: 'WoW %' },
]

function zScore(values: number[]): number | null {
  if (!values || values.length < 3) return null
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length
  const std = Math.sqrt(variance)
  if (!Number.isFinite(std) || std < 1e-9) return 0
  return (values[values.length - 1] - mean) / std
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

function weekLabels(count: number): string[] {
  const out: string[] = []
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() - (count - 1) * 7)
  for (let i = 0; i < count; i++) {
    out.push(
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    )
    d.setUTCDate(d.getUTCDate() + 7)
  }
  return out
}

/** Evenly spaced indices with unique labels (skip duplicates). */
function uniqueLabelIndices(labels: string[], maxLabels = 4): number[] {
  if (!labels.length) return []
  const targets = [0, Math.floor((labels.length - 1) / 3), Math.floor(((labels.length - 1) * 2) / 3), labels.length - 1]
  const picked: number[] = []
  const seen = new Set<string>()
  for (const i of targets) {
    const idx = Math.min(Math.max(0, i), labels.length - 1)
    const label = labels[idx]
    if (seen.has(label)) continue
    seen.add(label)
    picked.push(idx)
  }
  if (picked[picked.length - 1] !== labels.length - 1) {
    const last = labels.length - 1
    if (!seen.has(labels[last])) picked.push(last)
  }
  return picked.slice(0, maxLabels)
}

function niceTicks(min: number, max: number, count = 5): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0]
  if (min === max) {
    const pad = Math.abs(min) * 0.1 || 1
    min -= pad
    max += pad
  }
  const span = max - min
  const step0 = span / Math.max(1, count - 1)
  const mag = 10 ** Math.floor(Math.log10(Math.abs(step0) || 1))
  const norm = step0 / mag
  const step = (norm >= 5 ? 5 : norm >= 2 ? 2 : 1) * mag
  const start = Math.floor(min / step) * step
  const end = Math.ceil(max / step) * step
  const ticks: number[] = []
  for (let v = start; v <= end + step * 0.5; v += step) ticks.push(Number(v.toFixed(6)))
  return ticks.length ? ticks : [min, max]
}

function ZScoreBars({
  rows,
  mode,
}: {
  rows: { ticker: string; value: number }[]
  mode: MetricMode
}) {
  const W = 640
  const H = 150
  const padL = 36
  const padR = 12
  const padT = 12
  const padB = 28
  const plotW = W - padL - padR
  const plotH = H - padT - padB

  const yMin = mode === 'zscore' ? -3 : Math.min(...rows.map((r) => r.value), 0)
  const yMax = mode === 'zscore' ? 3 : Math.max(...rows.map((r) => r.value), 0)
  const ySpan = yMax - yMin || 1
  const yTicks = mode === 'zscore' ? [-3, -2, -1, 0, 1, 2, 3] : niceTicks(yMin, yMax, 5)

  const zeroY = padT + ((yMax - 0) / ySpan) * plotH
  const n = Math.max(rows.length, 1)
  const gap = 4
  const barW = Math.max(6, (plotW - gap * (n + 1)) / n)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none" aria-hidden>
      {yTicks.map((t) => {
        const y = padT + ((yMax - t) / ySpan) * plotH
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#FFFFFF10" strokeWidth="1" />
            <text x={padL - 6} y={y + 3} textAnchor="end" fill="#838388" fontSize="10">
              {mode === 'zscore' ? t : Math.abs(t) >= 1000 ? `${(t / 1000).toFixed(0)}k` : t}
            </text>
          </g>
        )
      })}
      <line x1={padL} y1={zeroY} x2={W - padR} y2={zeroY} stroke="#FFFFFF28" strokeWidth="1" />
      {rows.map((r, i) => {
        const x = padL + gap + i * (barW + gap)
        const v = mode === 'zscore' ? clamp(r.value, -3, 3) : r.value
        const y = padT + ((yMax - v) / ySpan) * plotH
        const top = Math.min(y, zeroY)
        const h = Math.max(1, Math.abs(y - zeroY))
        const color =
          Math.abs(v) < (mode === 'zscore' ? 0.25 : Math.abs(ySpan) * 0.02)
            ? '#6B7280'
            : v >= 0
              ? '#2CB37B'
              : '#E25C3F'
        return (
          <g key={r.ticker}>
            <rect x={x} y={top} width={barW} height={h} fill={color} rx="1" />
            <text x={x + barW / 2} y={H - 10} textAnchor="middle" fill="#838388" fontSize="9">
              {r.ticker}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function HistoryChart({
  netSeries,
  priceSeries,
  labels,
}: {
  netSeries: number[]
  priceSeries: number[]
  labels: string[]
}) {
  const W = 640
  const H = 140
  const padL = 44
  const padR = 48
  const padT = 10
  const padB = 28
  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const n = netSeries.length
  if (n < 2) {
    return <p className="text-[#838388] text-[12px] p-4">Not enough history.</p>
  }

  const netMin = Math.min(...netSeries)
  const netMax = Math.max(...netSeries)
  const netPad = (netMax - netMin) * 0.1 || 1
  const nLo = netMin - netPad
  const nHi = netMax + netPad
  const pMin = Math.min(...priceSeries)
  const pMax = Math.max(...priceSeries)
  const pPad = (pMax - pMin) * 0.1 || 1
  const pLo = pMin - pPad
  const pHi = pMax + pPad

  const netTicks = niceTicks(nLo, nHi, 5)
  const priceTicks = niceTicks(pLo, pHi, 5)

  const xAt = (i: number) => padL + (i / (n - 1)) * plotW
  const yNet = (v: number) => padT + ((nHi - v) / (nHi - nLo || 1)) * plotH
  const yPrice = (v: number) => padT + ((pHi - v) / (pHi - pLo || 1)) * plotH

  const netPath = netSeries.map((v, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)} ${yNet(v).toFixed(1)}`).join(' ')
  const pricePath = priceSeries
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)} ${yPrice(v).toFixed(1)}`)
    .join(' ')

  const labelIdx = uniqueLabelIndices(labels)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none" aria-hidden>
      {netTicks.map((t) => {
        const y = yNet(t)
        return (
          <g key={`n-${t}`}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#FFFFFF10" strokeWidth="1" />
            <text x={padL - 6} y={y + 3} textAnchor="end" fill="#838388" fontSize="10">
              {Math.abs(t) >= 1000 ? `${(t / 1000).toFixed(0)}` : t.toFixed(0)}
            </text>
          </g>
        )
      })}
      {priceTicks.map((t) => (
        <text key={`p-${t}`} x={W - padR + 6} y={yPrice(t) + 3} textAnchor="start" fill="#838388" fontSize="10">
          {t >= 1000 ? t.toLocaleString('en-US', { maximumFractionDigits: 0 }) : t.toFixed(0)}
        </text>
      ))}
      <path d={pricePath} fill="none" stroke="#E8EAED" strokeWidth="1.6" strokeLinejoin="round" />
      <path d={netPath} fill="none" stroke="#88C4FF" strokeWidth="2" strokeLinejoin="round" />
      {labelIdx.map((i) => (
        <text key={i} x={xAt(i)} y={H - 10} textAnchor="middle" fill="#838388" fontSize="10">
          {labels[i] || ''}
        </text>
      ))}
    </svg>
  )
}

function proxyPriceFromNet(net: number[]): number[] {
  if (!net.length) return []
  const min = Math.min(...net)
  const max = Math.max(...net)
  const span = max - min || 1
  return net.map((v) => 4500 + ((max - v) / span) * 2000)
}

export default function CotPositioningCharts() {
  const [payload, setPayload] = useState<CotPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [metric, setMetric] = useState<MetricMode>('zscore')
  const [historyTicker, setHistoryTicker] = useState('SPX')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/cot-positioning?weeks=26', { cache: 'no-store' })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.details || body.error || 'Failed to load COT charts')
        }
        const data = await res.json()
        if (!cancelled) {
          setPayload({
            financials: data.financials || [],
            commodities: data.commodities || [],
          })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setPayload(null)
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

  const allRows = useMemo(() => {
    if (!payload) return []
    return [...payload.financials, ...payload.commodities].filter((r) => r.trend?.length)
  }, [payload])

  const barRows = useMemo(() => {
    return allRows
      .map((r) => {
        let value = 0
        if (metric === 'zscore') value = zScore(r.trend) ?? 0
        else if (metric === 'net') value = (r.net ?? r.trend[r.trend.length - 1] ?? 0) / 1000
        else value = r.wow ?? 0
        return { ticker: r.ticker, value }
      })
      .slice(0, 18)
  }, [allRows, metric])

  const historyRow = useMemo(() => {
    return allRows.find((r) => r.ticker === historyTicker) || allRows[0] || null
  }, [allRows, historyTicker])

  useEffect(() => {
    if (historyRow?.ticker && historyRow.ticker !== historyTicker) {
      setHistoryTicker(historyRow.ticker)
    }
  }, [historyRow, historyTicker])

  const historyNetK = useMemo(() => {
    if (!historyRow?.trend?.length) return []
    return historyRow.trend.map((v) => v / 1000)
  }, [historyRow])

  const historyPrice = useMemo(() => proxyPriceFromNet(historyRow?.trend || []), [historyRow])
  const historyLabels = useMemo(() => weekLabels(historyNetK.length), [historyNetK.length])

  const metricLabel = METRIC_OPTIONS.find((m) => m.id === metric)?.label || 'Z-Score'
  const tickerOptions = useMemo(
    () => allRows.map((r) => ({ id: r.ticker, label: r.ticker })),
    [allRows]
  )

  return (
    <div className="mb-4 sm:mb-5">
      {loading && (
        <div className="bg-[#16161F] p-4">
          <ChartLoader className="min-h-[200px]" />
        </div>
      )}
      {error && !loading && (
        <div className="bg-[#16161F] p-4 text-[#E25C3F] text-[13px]">{error}</div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-[#16161F] border border-[#FFFFFF0D] p-3 sm:p-4 flex flex-col min-h-[180px] overflow-visible">
            <div className="flex items-start justify-between gap-3 mb-3 shrink-0 relative z-20">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-white text-[15px] sm:text-[16px] leading-[20px] font-medium truncate">
                  CFTC Net Positioning ({metricLabel})
                </h3>
                <span
                  className="text-[#838388] text-[12px] border border-[#FFFFFF18] rounded-full w-4 h-4 inline-flex items-center justify-center shrink-0"
                  title="Net speculative positioning vs its own recent distribution"
                >
                  i
                </span>
              </div>
              <DarkSelect value={metric} options={METRIC_OPTIONS} onChange={setMetric} />
            </div>
            <div className="flex-1 min-h-[130px]">
              {barRows.length ? (
                <ZScoreBars rows={barRows} mode={metric} />
              ) : (
                <p className="text-[#838388] text-[12px]">No positioning bars available.</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-[#838388] shrink-0">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#2CB37B]" /> Long positioning
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#E25C3F]" /> Short positioning
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#6B7280]" /> Neutral
              </span>
            </div>
          </div>

          <div className="bg-[#16161F] border border-[#FFFFFF0D] p-3 sm:p-4 flex flex-col min-h-[180px] overflow-visible">
            <div className="flex items-start justify-between gap-3 mb-2 shrink-0 relative z-20">
              <h3 className="text-white text-[15px] sm:text-[16px] leading-[20px] font-medium">
                Positioning History
              </h3>
              {tickerOptions.length > 0 && (
                <DarkSelect
                  value={(historyRow?.ticker || historyTicker) as string}
                  options={tickerOptions}
                  onChange={setHistoryTicker}
                />
              )}
            </div>
            <div className="flex items-center gap-4 mb-2 text-[11px] text-[#C8CDD6] shrink-0">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#88C4FF]" /> CFTC Net (K)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E8EAED]" /> Price index
              </span>
            </div>
            <div className="flex-1 min-h-[120px]">
              {historyNetK.length >= 2 ? (
                <HistoryChart netSeries={historyNetK} priceSeries={historyPrice} labels={historyLabels} />
              ) : (
                <p className="text-[#838388] text-[12px]">No history for this instrument.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
