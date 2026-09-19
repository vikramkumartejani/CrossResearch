'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import { useBeliefMarkets, type BeliefMover } from './beliefMarkets'

function parsePp(value: string | undefined): number | null {
  if (!value || value === '-') return null
  const n = Number.parseFloat(value.replace(/pp/gi, '').replace('+', ''))
  return Number.isFinite(n) ? n : null
}

function parseProbPct(m: BeliefMover): number | null {
  if (typeof m.prob_raw === 'number' && Number.isFinite(m.prob_raw)) {
    return m.prob_raw <= 1.5 ? m.prob_raw * 100 : m.prob_raw
  }
  if (!m.prob || m.prob === '-') return null
  const n = Number.parseFloat(m.prob.replace('%', ''))
  return Number.isFinite(n) ? n : null
}

/** Reconstruct a compact path from available Δ windows when full history is not exposed. */
function buildSeries(m: BeliefMover): number[] {
  const now = parseProbPct(m)
  if (now == null) return []
  const d1m = parsePp(m.d1m) ?? 0
  const d1h = parsePp(m.d1h) ?? d1m
  const d24h = parsePp(m.d24h) ?? d1h

  const p24 = now - d24h
  const p1h = now - d1h
  const p1m = now - d1m

  const anchors = [
    { t: 0, v: p24 },
    { t: 0.55, v: p1h },
    { t: 0.88, v: p1m },
    { t: 1, v: now },
  ]

  const points: number[] = []
  const n = 28
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    let a = anchors[0]
    let b = anchors[anchors.length - 1]
    for (let j = 0; j < anchors.length - 1; j++) {
      if (t >= anchors[j].t && t <= anchors[j + 1].t) {
        a = anchors[j]
        b = anchors[j + 1]
        break
      }
    }
    const span = b.t - a.t || 1
    const u = (t - a.t) / span
    const eased = u * u * (3 - 2 * u)
    points.push(a.v + (b.v - a.v) * eased)
  }
  return points
}

function ProbabilityChart({ series }: { series: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || series.length < 2) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    if (W < 2 || H < 2) return

    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)

    const min = Math.min(...series)
    const max = Math.max(...series)
    const range = max - min || 1
    const padT = 10
    const padB = 10
    const padX = 4
    const toY = (v: number) => padT + ((max - v) / range) * (H - padT - padB)
    const xStep = (W - padX * 2) / (series.length - 1)

    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 1
    for (let i = 1; i < 4; i++) {
      const y = (H / 4) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }

    const grad = ctx.createLinearGradient(0, 0, 0, H)
    grad.addColorStop(0, 'rgba(136,196,255,0.22)')
    grad.addColorStop(1, 'rgba(136,196,255,0)')

    ctx.beginPath()
    series.forEach((v, i) => {
      const x = padX + i * xStep
      const y = toY(v)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.lineTo(padX + (series.length - 1) * xStep, H)
    ctx.lineTo(padX, H)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    ctx.beginPath()
    series.forEach((v, i) => {
      const x = padX + i * xStep
      const y = toY(v)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = '#88C4FF'
    ctx.lineWidth = 1.75
    ctx.lineJoin = 'round'
    ctx.stroke()

    const lastX = padX + (series.length - 1) * xStep
    const lastY = toY(series[series.length - 1])
    ctx.beginPath()
    ctx.arc(lastX, lastY, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = '#88C4FF'
    ctx.fill()
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }, [series])

  return <canvas ref={canvasRef} className="w-full h-full block" />
}

export default function ImpliedProbability() {
  const { data, loading, error } = useBeliefMarkets()
  const movers = data?.movers || []
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const selected = useMemo(() => {
    if (!movers.length) return null
    if (selectedId) {
      const hit = movers.find((m) => (m.id || m.event) === selectedId)
      if (hit) return hit
    }
    return movers[0]
  }, [movers, selectedId])

  const series = useMemo(() => (selected ? buildSeries(selected) : []), [selected])
  const now = selected ? parseProbPct(selected) : null
  const d24 = selected ? parsePp(selected.d24h) : null
  const menuItems = movers.slice(0, 12)
  const activeValue = selectedId || (movers[0]?.id || movers[0]?.event) || ''

  return (
    <div className="bg-[#16161F] flex flex-col min-h-[240px] h-full">
      <div className="px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-white text-[16px] leading-[20px] font-semibold">Implied Probability</h3>
            <p className="text-[#838388] text-[12px] leading-[17px] mt-1 truncate">
              {selected?.event || 'Select a mover'}
            </p>
          </div>
          {menuItems.length > 1 && (
            <div ref={menuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 max-w-[160px] bg-[#FFFFFF0A] text-white text-[12px] border border-[#FFFFFF14] px-2 py-1.5 outline-none cursor-pointer hover:border-[#FFFFFF30] transition-colors"
              >
                <span className="truncate">
                  {(selected?.event || 'Select').slice(0, 28)}
                  {(selected?.event?.length || 0) > 28 ? '…' : ''}
                </span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 11 7"
                  fill="none"
                  className={`shrink-0 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  <path
                    d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[280px] max-h-64 overflow-y-auto rounded border border-[#FFFFFF14] bg-[#16161F] shadow-[0_12px_32px_rgba(0,0,0,0.45)] dashboard-scroll">
                  {menuItems.map((m) => {
                    const value = m.id || m.event
                    const active = value === activeValue
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setSelectedId(value)
                          setMenuOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2.5 text-[12px] leading-[16px] cursor-pointer transition-colors ${
                          active
                            ? 'bg-[#88C4FF] text-[#0B0E14]'
                            : 'text-white/85 hover:bg-[#FFFFFF0A]'
                        }`}
                      >
                        {m.event}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-white text-[28px] leading-none font-semibold tabular-nums">
            {now != null ? `${now.toFixed(1)}%` : '-'}
          </span>
          {d24 != null && (
            <span
              className={`text-[13px] font-medium tabular-nums ${
                d24 >= 0 ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
              }`}
            >
              {d24 >= 0 ? '+' : ''}
              {d24.toFixed(1)}pp
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-[140px] px-3 sm:px-4 py-3">
        {loading && <ChartLoader className="min-h-[120px]" />}
        {error && !loading && <p className="text-[#E25C3F] text-[12px]">{error}</p>}
        {!loading && !error && series.length < 2 && (
          <p className="text-[#838388] text-[12px]">Not enough probability history for a path.</p>
        )}
        {!loading && !error && series.length >= 2 && (
          <div className="h-full min-h-[140px]">
            <ProbabilityChart series={series} />
          </div>
        )}
      </div>

      <div className="px-3 sm:px-4 py-2 border-t border-[#FFFFFF08] flex justify-between text-[11px] text-[#838388]">
        <span>Last 24h path</span>
        <span className="text-[#88C4FF]">Live desk blue</span>
      </div>
    </div>
  )
}
