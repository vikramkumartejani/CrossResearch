'use client'

import { useEffect, useRef, useState } from 'react'
import { type CurrencyPair } from './Chart'
import { useDashboardTheme } from '../DashboardTheme'

function assetBadge(symbol: string): string {
  if (symbol === 'BTCUSD') return 'CRYPTO'
  if (symbol === 'XAUUSD' || symbol === 'XAGUSD' || symbol === 'USOIL') return 'CMD'
  if (symbol === 'NAS100' || symbol === 'US30' || symbol === 'SP500') return 'IDX'
  return 'FX'
}

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

  const title = `${selectedPair.baseName} / ${selectedPair.quoteName}`
  const muted = isLight ? 'text-[#838388]' : 'text-white/50'
  const strong = isLight ? 'text-[#0F172A]' : 'text-white'
  const divider = isLight ? 'bg-[#D5D8E0]' : 'bg-[#FFFFFF18]'
  const badgeClass = isLight
    ? 'bg-[#EEF0F4] text-[#5A5A63] border-[#D5D8E0]'
    : 'bg-[#FFFFFF0A] text-[#C8CDD6] border-[#FFFFFF14]'

  const stats = [
    { label: 'Prev open', value: selectedPair.openPrice },
    { label: 'Prev high', value: selectedPair.dayHigh },
    { label: 'Prev low', value: selectedPair.dayLow },
    { label: 'Prev close', value: selectedPair.prevClose },
  ]

  const changeText = selectedPair.change.startsWith('+') || selectedPair.change.startsWith('-')
    ? selectedPair.change
    : `${selectedPair.changePositive ? '+' : '-'}${selectedPair.change.replace(/^[+-]/, '')}`

  return (
    <div className="mb-5 sm:mb-6 min-w-0">
      <div className="flex items-center gap-4 sm:gap-5 min-w-0 overflow-x-auto dashboard-scroll pb-0.5">
        {/* Ticker + name + badge */}
        <div ref={ref} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[22px] sm:text-[24px] leading-none font-semibold tabular-nums ${strong} group-hover:opacity-90`}
                >
                  {selectedPair.symbol}
                </span>
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${strong}`}
                  aria-hidden
                >
                  <path
                    d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className={`mt-1.5 text-[12px] sm:text-[13px] leading-none normal-case ${muted}`}>
                {title}
              </p>
            </div>
            <span
              className={`shrink-0 px-1.5 py-0.5 text-[10px] leading-none font-medium tracking-wide border rounded-sm ${badgeClass}`}
            >
              {assetBadge(selectedPair.symbol)}
            </span>
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

        <div className={`w-px self-stretch shrink-0 ${divider}`} aria-hidden />

        {/* Prev OHLC */}
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 sm:gap-5">
              {i > 0 && <div className={`w-px self-stretch min-h-[36px] shrink-0 ${divider}`} aria-hidden />}
              <div className="flex flex-col">
                <span className={`text-[15px] sm:text-[16px] font-semibold leading-none tabular-nums ${strong}`}>
                  {stat.value}
                </span>
                <span className={`mt-1.5 text-[11px] leading-none ${muted}`}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-2" aria-hidden />

        {/* Live price */}
        <div className="flex flex-col items-end shrink-0 ml-auto pl-2">
          <div className="flex items-center gap-2">
            <span className={`text-[22px] sm:text-[24px] font-semibold leading-none tabular-nums ${strong}`}>
              {selectedPair.price}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                selectedPair.changePositive ? 'bg-[#2CB37B]' : 'bg-[#E25C3F]'
              } animate-pulse`}
              aria-hidden
            />
          </div>
          <span
            className={`mt-1.5 text-[12px] sm:text-[13px] font-medium leading-none tabular-nums ${
              selectedPair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
            }`}
          >
            {changeText}
          </span>
        </div>
      </div>
    </div>
  )
}
