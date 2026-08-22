'use client'

import { useEffect, useState } from 'react'

interface MarketTimingData {
  clock_label: string
  month_label: string
  week_dates: number[]
  highlight_dates: number[]
  box_text: string
}

const FALLBACK: MarketTimingData = {
  clock_label: '15:00 UTC Time',
  month_label: 'May 2025',
  week_dates: [21, 22, 23, 24, 25, 26, 27],
  highlight_dates: [22, 24],
  box_text: 'Optimal Trading Window',
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function normalize(raw: Partial<MarketTimingData> | null | undefined): MarketTimingData {
  const week = Array.isArray(raw?.week_dates)
    ? raw!.week_dates.map((n) => Number(n)).filter((n) => Number.isFinite(n)).slice(0, 7)
    : FALLBACK.week_dates
  const highlights = Array.isArray(raw?.highlight_dates)
    ? raw!.highlight_dates.map((n) => Number(n)).filter((n) => Number.isFinite(n))
    : FALLBACK.highlight_dates
  return {
    clock_label: String(raw?.clock_label || FALLBACK.clock_label).trim() || FALLBACK.clock_label,
    month_label: String(raw?.month_label || FALLBACK.month_label).trim() || FALLBACK.month_label,
    week_dates: week.length === 7 ? week : FALLBACK.week_dates,
    highlight_dates: highlights.length ? highlights : FALLBACK.highlight_dates,
    box_text: String(raw?.box_text || FALLBACK.box_text).trim() || FALLBACK.box_text,
  }
}

export default function MarketTiming() {
  const [currentTime, setCurrentTime] = useState('--:--:--')
  const [data, setData] = useState<MarketTimingData>(FALLBACK)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const h = String(now.getUTCHours()).padStart(2, '0')
      const m = String(now.getUTCMinutes()).padStart(2, '0')
      const s = String(now.getUTCSeconds()).padStart(2, '0')
      setCurrentTime(`${h}:${m}:${s}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/market-timing', { cache: 'no-store' })
        if (!res.ok) return
        const body = await res.json()
        if (!cancelled) setData(normalize(body))
      } catch {
        // keep fallback
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const highlightSet = new Set(data.highlight_dates)

  return (
    <div>
      <h4 className="text-white text-[18px] leading-[22px] font-medium">Market Timing</h4>

      <div className="mt-3 sm:mt-4 bg-[#16161F] p-3 sm:p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-white/60 text-[13px] sm:text-[14px] leading-[17px] font-medium">
            {data.clock_label} : {currentTime}
          </span>
          <p className="text-white/60 text-[13px] sm:text-[15px] leading-[17px] font-semibold">
            {data.month_label}
          </p>
        </div>

        <div className="mt-1">
          <div className="flex items-center justify-between gap-1">
            {data.week_dates.map((d, i) => {
              const isHighlight = highlightSet.has(d)
              return (
                <div key={`${d}-${i}`} className="flex flex-col items-center gap-1.5 min-w-0">
                  <span className="text-white/60 text-[12px] sm:text-[14px] font-normal leading-[17px]">
                    {DAY_NAMES[i] || ''}
                  </span>
                  <div
                    className={`py-[2px] flex items-center justify-center text-[15px] sm:text-[17px] font-semibold leading-5 cursor-default transition-colors ${
                      isHighlight
                        ? 'rounded-[8px] px-2 sm:px-3 text-[#88C4FF]'
                        : 'text-white'
                    }`}
                    style={
                      isHighlight
                        ? {
                            background:
                              'linear-gradient(180deg, rgba(136, 196, 255, 0.15) 0%, rgba(136, 196, 255, 0) 98.21%)',
                          }
                        : undefined
                    }
                  >
                    {d}
                  </div>
                  <div className="w-px h-[10px] bg-[#FFFFFF40]" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-3 sm:mt-4 w-full max-w-md mx-auto py-2 sm:py-2.5 px-3 sm:px-4 bg-[#FFFFFF0D] border border-[#FFFFFF0D] rounded-[8px] text-white text-[12px] sm:text-[14px] leading-[17px] font-semibold text-center whitespace-pre-wrap">
          {data.box_text}
        </div>
      </div>
    </div>
  )
}
