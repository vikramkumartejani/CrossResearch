'use client'

import { useId } from 'react'

/** Tiny SVG sparkline - CrossResearch blue (#88C4FF). */
export default function MiniPriceLine({
  points,
  className = '',
}: {
  points: number[]
  className?: string
}) {
  const gid = useId().replace(/:/g, '')
  const clean = points.filter((n) => Number.isFinite(n))
  if (clean.length < 2) {
    return <div className={`h-8 w-full rounded bg-[#FFFFFF06] ${className}`} aria-hidden />
  }

  const min = Math.min(...clean)
  const max = Math.max(...clean)
  const span = max - min || 1
  const w = 120
  const h = 32
  const pad = 2

  const coords = clean.map((v, i) => {
    const x = pad + (i / (clean.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (v - min) / span) * (h - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const line = coords.join(' ')
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`h-8 w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={`cr-price-fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#88C4FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#88C4FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#cr-price-fill-${gid})`} />
      <polyline
        points={line}
        fill="none"
        stroke="#88C4FF"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
