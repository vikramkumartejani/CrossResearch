'use client'

import { useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import { useBeliefMarkets, type BeliefMover } from './beliefMarkets'

type WindowKey = '1h' | '24h' | 'live'

const WINDOWS: { key: WindowKey; label: string }[] = [
  { key: '1h', label: '1H' },
  { key: '24h', label: '1D' },
  { key: 'live', label: 'Live' },
]

const CATEGORY_ORDER = ['macro', 'geopolitics', 'politics', 'markets', 'crypto', 'commodities']

function parsePp(value: string | undefined): number | null {
  if (!value || value === '-') return null
  const n = Number.parseFloat(value.replace(/pp/gi, '').replace('+', ''))
  return Number.isFinite(n) ? n : null
}

function deltaForWindow(m: BeliefMover, window: WindowKey): number | null {
  if (window === '1h') return parsePp(m.d1h)
  if (window === '24h') return parsePp(m.d24h)
  return parsePp(m.d1m) ?? parsePp(m.d24h)
}

function cellColor(delta: number | null, maxAbs: number): string {
  if (delta == null || maxAbs <= 0) return 'rgba(255, 255, 255, 0.04)'
  const t = Math.max(-1, Math.min(1, delta / maxAbs))
  if (t >= 0) {
    const a = 0.12 + t * 0.55
    return `rgba(44, 179, 123, ${a.toFixed(2)})`
  }
  const a = 0.12 + Math.abs(t) * 0.55
  return `rgba(226, 92, 63, ${a.toFixed(2)})`
}

export default function SentimentHeatmap() {
  const { data, loading, error } = useBeliefMarkets()
  const [window, setWindow] = useState<WindowKey>('24h')
  const movers = data?.movers || []

  const { groups, maxAbs } = useMemo(() => {
    const byCat = new Map<string, { title: string; delta: number | null; shock: string }[]>()
    let peak = 0
    for (const m of movers) {
      const cat = (m.category || 'markets').toLowerCase()
      const delta = deltaForWindow(m, window)
      if (delta != null) peak = Math.max(peak, Math.abs(delta))
      const list = byCat.get(cat) || []
      list.push({
        title: m.event,
        delta,
        shock: m.shockLabel,
      })
      byCat.set(cat, list)
    }

    const ordered = [
      ...CATEGORY_ORDER.filter((c) => byCat.has(c)),
      ...[...byCat.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
    ].map((cat) => ({
      cat,
      cells: (byCat.get(cat) || []).slice(0, 10),
    }))

    return { groups: ordered, maxAbs: peak || 1 }
  }, [movers, window])

  return (
    <div className="bg-[#16161F] flex flex-col min-h-[200px]">
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] gap-2 flex-wrap shrink-0">
        <div>
          <h3 className="text-white text-[16px] leading-[20px] font-semibold">Sentiment Heatmap</h3>
          <p className="text-[#838388] text-[12px] leading-[17px] mt-1">
            Category pressure from live probability moves.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {WINDOWS.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => setWindow(w.key)}
              className={`px-2.5 py-1.5 text-[12px] leading-[15px] font-medium transition-colors cursor-pointer ${
                window === w.key ? 'bg-[#FFFFFF14] text-white' : 'text-[#838388] hover:text-white'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 min-h-0">
        {loading && <ChartLoader className="min-h-[120px]" />}
        {error && !loading && <p className="text-[#E25C3F] text-[12px]">{error}</p>}
        {!loading && !error && groups.length === 0 && (
          <p className="text-[#838388] text-[12px]">No sentiment cells yet.</p>
        )}

        {!loading && !error && groups.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-stretch gap-2 overflow-x-auto dashboard-topbar-scroll pb-1">
              {groups.map((g) => (
                <div key={g.cat} className="min-w-[140px] flex-1 flex flex-col gap-1.5">
                  <span className="text-[#838388] text-[11px] leading-[14px] font-medium capitalize px-0.5">
                    {g.cat}
                  </span>
                  <div className="grid grid-cols-5 gap-1">
                    {g.cells.map((cell, i) => (
                      <div
                        key={`${g.cat}-${i}`}
                        title={`${cell.title}\n${cell.delta != null ? `${cell.delta >= 0 ? '+' : ''}${cell.delta.toFixed(1)}pp` : '-'}`}
                        className="h-7 sm:h-8 border border-[#FFFFFF08]"
                        style={{ background: cellColor(cell.delta, maxAbs) }}
                      />
                    ))}
                    {Array.from({ length: Math.max(0, 10 - g.cells.length) }).map((_, i) => (
                      <div
                        key={`pad-${g.cat}-${i}`}
                        className="h-7 sm:h-8 bg-[#FFFFFF06] border border-[#FFFFFF08]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] leading-[14px] text-[#838388]">
              <span>Bearish</span>
              <div className="flex-1 mx-3 h-1.5 rounded-sm bg-gradient-to-r from-[#E25C3F] via-[#FFFFFF14] to-[#2CB37B]" />
              <span>Bullish</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
