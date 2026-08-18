'use client'

import { useEffect, useRef, useState } from 'react'
import { type CurrencyPair } from './Chart'
import { useDashboardTheme } from '../DashboardTheme'

export default function AnalysisHeader({
  pairs,
  selectedPair,
  setSelectedPair,
}: {
  pairs: CurrencyPair[]
  selectedPair: CurrencyPair
  setSelectedPair: (pair: CurrencyPair) => void
}) {
  const { theme } = useDashboardTheme()
  const isLight = theme === 'light'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const title = `${selectedPair.baseName} / ${selectedPair.quoteName}`.toUpperCase()
  const muted = isLight ? 'text-[#838388]' : 'text-white/50'
  const strong = isLight ? 'text-[#0F172A]' : 'text-white'

  const stats = [
    { label: 'PREV OPEN', value: selectedPair.openPrice },
    { label: 'PREV HIGH', value: selectedPair.dayHigh },
    { label: 'PREV LOW', value: selectedPair.dayLow },
    { label: 'PREV CLOSE', value: selectedPair.prevClose },
  ]

  return (
    <div className="mb-5 sm:mb-6">

      {/* Title only - nothing on the right (toggle is floating elsewhere) */}
      <div ref={ref} className="relative mb-6 max-w-xl">
        <p className={`text-[11px] tracking-[0.08em] uppercase mb-2 ${muted}`}>
          Market <span className="opacity-50">•</span> Assets
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-start gap-2 text-left cursor-pointer group"
        >
          <div className="min-w-0">
            <h1
              className={`text-[22px] sm:text-[28px] leading-[1.15] font-medium tracking-tight ${strong} group-hover:opacity-90`}
            >
              {title}
            </h1>
            <p className={`mt-1 text-[13px] sm:text-[14px] ${muted}`}>{selectedPair.symbol}</p>
          </div>
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            className={`mt-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${strong}`}
          >
            <path
              d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {open && (
          <div
            className={`absolute top-[calc(100%+8px)] left-0 z-50 w-[280px] max-h-80 overflow-y-auto rounded border shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${
              isLight ? 'bg-white border-[#D5D8E0]' : 'bg-[#1E1E2A] border-[#FFFFFF14]'
            }`}
          >
            {pairs.map((pair) => (
              <button
                key={pair.symbol}
                type="button"
                onClick={() => {
                  setSelectedPair(pair)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                  selectedPair.symbol === pair.symbol
                    ? isLight
                      ? 'bg-[#F3F5F8]'
                      : 'bg-[#FFFFFF0A]'
                    : isLight
                      ? 'hover:bg-[#F7F8FA]'
                      : 'hover:bg-[#FFFFFF08]'
                }`}
              >
                <div>
                  <p className={`text-[13px] font-semibold ${strong}`}>{pair.symbol}</p>
                  <p className={`text-[11px] mt-0.5 ${muted}`}>
                    {pair.baseName} / {pair.quoteName}
                  </p>
                </div>
                <span
                  className={`text-[12px] font-medium ${
                    pair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                  }`}
                >
                  {pair.change.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom row: prev stats LEFT · live price RIGHT, shared baseline */}
      <div className="flex flex-row flex-wrap items-end justify-between gap-x-6 sm:gap-x-8 gap-y-3 min-w-0 w-full">
        <div className="flex flex-row flex-wrap items-end gap-x-6 sm:gap-x-8 gap-y-3 min-w-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className={`text-[16px] sm:text-[18px] font-semibold leading-none tabular-nums ${strong}`}>
                {stat.value}
              </span>
              <span className={`mt-1.5 text-[11px] tracking-[0.06em] uppercase leading-none ${muted}`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                selectedPair.changePositive ? 'bg-[#2CB37B]' : 'bg-[#E25C3F]'
              } animate-pulse`}
              aria-hidden
            />
            <span className={`text-[22px] sm:text-[24px] font-semibold leading-none tabular-nums ${strong}`}>
              {selectedPair.price}
            </span>
          </div>
          <span
            className={`mt-1.5 text-[12px] sm:text-[13px] font-medium leading-none ${
              selectedPair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
            }`}
          >
            {selectedPair.changePositive ? '↗ ' : '↘ '}
            {selectedPair.change.replace(/^[+-]/, '')}
          </span>
        </div>
      </div>

       
      
    </div>
  )
}
