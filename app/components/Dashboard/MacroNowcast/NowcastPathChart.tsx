'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import DarkSelect from '../shared/DarkSelect'
import { formatNowcastNumber, useNowcastData } from './nowcastData'
import type { NowcastCardProps } from './NowcastCard'

function pickDefaultCard(cards: NowcastCardProps[]): NowcastCardProps | null {
  if (!cards.length) return null
  const gdp = cards.find((c) => /gdp/i.test(c.indicator))
  return gdp || cards[0]
}

function monthLabel(date: string, i: number): string {
  const d = new Date(date)
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleString('en-US', { month: 'short' })
  }
  if (date.length <= 4) return date
  return date.slice(0, 3) || `T${i + 1}`
}

/** Evenly spaced nice ticks covering [min, max]. */
function niceTicks(min: number, max: number, count = 4): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0]
  if (min === max) {
    const pad = Math.abs(min) * 0.1 || 1
    min -= pad
    max += pad
  }
  const span = max - min
  const step0 = span / Math.max(1, count - 1)
  const mag = 10 ** Math.floor(Math.log10(step0))
  const norm = step0 / mag
  const step = (norm >= 5 ? 5 : norm >= 2 ? 2 : 1) * mag
  const start = Math.floor(min / step) * step
  const end = Math.ceil(max / step) * step
  const ticks: number[] = []
  for (let v = start; v <= end + step * 0.5; v += step) {
    ticks.push(Number(v.toFixed(6)))
  }
  return ticks.length ? ticks : [min, max]
}

function NowcastLineChart({
  nowcastSeries,
  consensus,
  prior,
  labels,
}: {
  nowcastSeries: number[]
  consensus: number
  prior: number
  labels: string[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (!cr) return
      setSize({ w: Math.max(1, Math.floor(cr.width)), h: Math.max(1, Math.floor(cr.height)) })
    })
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || nowcastSeries.length < 2 || size.w < 2 || size.h < 2) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = size.w
    const H = size.h
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)

    const n = nowcastSeries.length
    // Consensus path: smooth climb from the first nowcast point to the live consensus
    const consensusSeries = Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1)
      const eased = t * t * (3 - 2 * t)
      return nowcastSeries[0] + (consensus - nowcastSeries[0]) * eased
    })

    const all = [...nowcastSeries, ...consensusSeries, prior, consensus]
    const dataMin = Math.min(...all)
    const dataMax = Math.max(...all)
    const pad = (dataMax - dataMin) * 0.12 || 0.5
    const ticks = niceTicks(dataMin - pad, dataMax + pad, 4)
    const yMin = ticks[0]
    const yMax = ticks[ticks.length - 1]
    const ySpan = yMax - yMin || 1

    const padT = 12
    const padB = 26
    const padL = 36
    // Badge sits flush after the last point - only reserve badge width, no dead plot gap
    const badgeSpace = 40
    const padR = badgeSpace
    const plotW = W - padL - padR
    const plotH = H - padT - padB

    const xFor = (i: number) => padL + (i / (n - 1)) * plotW
    const yFor = (v: number) => padT + (1 - (v - yMin) / ySpan) * plotH

    // Horizontal grid + Y labels (linear)
    ctx.font = '11px sans-serif'
    ticks.forEach((tick) => {
      const y = yFor(tick)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padL, y)
      ctx.lineTo(padL + plotW, y)
      ctx.stroke()

      ctx.fillStyle = '#838388'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      const label = Number.isInteger(tick) ? String(tick) : tick.toFixed(1)
      ctx.fillText(label, padL - 8, y)
    })

    // Vertical month guides aligned to points
    labels.forEach((_, i) => {
      const x = xFor(i)
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.beginPath()
      ctx.moveTo(x, padT)
      ctx.lineTo(x, padT + plotH)
      ctx.stroke()
    })

    // Prior reference (dashed)
    if (Number.isFinite(prior)) {
      const y = yFor(prior)
      ctx.strokeStyle = 'rgba(131,131,136,0.7)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(padL, y)
      ctx.lineTo(padL + plotW, y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawLine = (series: number[], color: string, width: number, fill = false) => {
      if (fill) {
        const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH)
        grad.addColorStop(0, 'rgba(136,196,255,0.2)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        series.forEach((v, i) => {
          const x = xFor(i)
          const y = yFor(v)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.lineTo(xFor(n - 1), padT + plotH)
        ctx.lineTo(xFor(0), padT + plotH)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()
      }

      ctx.beginPath()
      series.forEach((v, i) => {
        const x = xFor(i)
        const y = yFor(v)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    drawLine(consensusSeries, '#5A5A63', 1.75, false)
    drawLine(nowcastSeries, '#88C4FF', 2.25, true)

    // Dots on both series
    const paintDots = (series: number[], fill: string) => {
      series.forEach((v, i) => {
        ctx.beginPath()
        ctx.arc(xFor(i), yFor(v), 3.25, 0, Math.PI * 2)
        ctx.fillStyle = fill
        ctx.fill()
        ctx.strokeStyle = '#16161F'
        ctx.lineWidth = 1.25
        ctx.stroke()
      })
    }
    paintDots(consensusSeries, '#5A5A63')
    paintDots(nowcastSeries, '#88C4FF')

    // End badges tight against the last point (no floating gap)
    const badge = (v: number, y: number, bg: string) => {
      const text = Number(v.toFixed(1)).toString()
      ctx.font = '600 11px sans-serif'
      const tw = ctx.measureText(text).width
      const bw = tw + 10
      const bh = 18
      const lastX = xFor(n - 1)
      const bx = Math.min(lastX + 8, W - bw - 2)
      const by = Math.max(2, Math.min(y - bh / 2, H - padB - bh))
      ctx.fillStyle = bg
      ctx.beginPath()
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(bx, by, bw, bh, 4)
      } else {
        ctx.rect(bx, by, bw, bh)
      }
      ctx.fill()
      ctx.fillStyle = '#0E0E16'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, bx + 5, by + bh / 2)
    }
    badge(nowcastSeries[n - 1], yFor(nowcastSeries[n - 1]), '#88C4FF')
    badge(consensusSeries[n - 1], yFor(consensusSeries[n - 1]), '#838388')

    // X labels centered under each point
    ctx.fillStyle = '#838388'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const step = Math.max(1, Math.ceil(labels.length / 9))
    labels.forEach((label, i) => {
      if (i % step !== 0 && i !== labels.length - 1) return
      ctx.fillText(label, xFor(i), padT + plotH + 8)
    })
  }, [nowcastSeries, consensus, prior, labels, size])

  return (
    <div ref={wrapRef} className="w-full h-full min-h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

export default function NowcastPathChart() {
  const { cards, loading, error } = useNowcastData()
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const options = useMemo(
    () =>
      cards.map((c, i) => ({
        key: `${c.region}-${c.indicator}-${i}`,
        label: `${c.indicator} · ${c.region}`,
        card: c,
      })),
    [cards]
  )

  const selected = useMemo(() => {
    if (selectedKey) {
      const hit = options.find((o) => o.key === selectedKey)
      if (hit) return hit.card
    }
    return pickDefaultCard(cards)
  }, [cards, options, selectedKey])

  const chartData = useMemo(() => {
    if (!selected) return null
    const raw = (selected.trendSeries || [])
      .map((p) => p.value)
      .filter((v) => Number.isFinite(v))

    let series: number[]
    let labels: string[]

    if (raw.length >= 2) {
      series = [...raw]
      // Pin the last point to the live nowcast so the badge matches the header
      series[series.length - 1] = selected.nowcast
      labels = (selected.trendSeries || []).map((p, i) => monthLabel(p.date, i))
    } else {
      const n = 9
      const start = Number.isFinite(selected.prior) ? selected.prior : selected.nowcast * 0.2
      series = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1)
        const eased = t * t * (3 - 2 * t)
        return start + (selected.nowcast - start) * eased
      })
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }

    return { nowcastSeries: series, labels }
  }, [selected])

  return (
    <div className="bg-[#16161F] flex flex-col min-h-[280px] h-full">
      <div className="px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="text-white text-[16px] leading-[20px] font-semibold">
            {selected ? `${selected.indicator} Nowcast` : 'Nowcast Path'}
          </h3>
          {selected && (
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
              <span className="inline-flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-[#88C4FF]" />
                Nowcast: {formatNowcastNumber(selected.nowcast, selected.unit)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#838388]">
                <span className="w-2 h-2 rounded-full bg-[#5A5A63]" />
                Consensus: {formatNowcastNumber(selected.consensus, selected.unit)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#838388]">
                <span className="w-3 border-t border-dashed border-[#838388]" />
                Prior: {formatNowcastNumber(selected.prior, selected.unit)}
              </span>
            </div>
          )}
        </div>
        {options.length > 0 && (
          <DarkSelect
            value={selectedKey || options.find((o) => o.card === selected)?.key || options[0].key}
            onChange={setSelectedKey}
            options={options.map((o) => ({ id: o.key, label: o.label }))}
            minMenuWidth={220}
          />
        )}
      </div>

      <div className="flex-1 min-h-[200px] px-2 sm:px-3 py-3">
        {loading && <ChartLoader className="min-h-[160px]" />}
        {error && !loading && <p className="px-2 text-[#E25C3F] text-[12px]">{error}</p>}
        {!loading && !error && !chartData && (
          <p className="px-2 text-[#838388] text-[12px]">No series available.</p>
        )}
        {!loading && !error && chartData && selected && (
          <div className="h-full min-h-[200px]">
            <NowcastLineChart
              nowcastSeries={chartData.nowcastSeries}
              consensus={selected.consensus}
              prior={selected.prior}
              labels={chartData.labels}
            />
          </div>
        )}
      </div>
    </div>
  )
}
