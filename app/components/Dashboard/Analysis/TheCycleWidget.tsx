'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { dashCardClass, useDashboardTheme } from '../DashboardTheme'

/** Desk notes shown under the cycle metrics. */
const FALLBACK_COMMENTARY = ['Add desk commentary here.']

const CYCLE_ROWS: {
  label: string
  value: ReactNode
  valueClass?: string
}[] = [
  { label: 'Current Market Regime', value: 'Stagnation', valueClass: 'opacity-70' },
  { label: 'Depth', value: '42.3%' },
  { label: 'Next Probable Market Regime', value: 'Expansion' },
  {
    label: 'Regime Play',
    value: (
      <span className="inline-flex items-center gap-1 text-[#E25C3F]">
        <span aria-hidden>↘</span> DOWN
      </span>
    ),
  },
]

export default function TheCycleWidget() {
  const { theme } = useDashboardTheme()
  const isLight = theme === 'light'
  const [commentary, setCommentary] = useState<string[]>(FALLBACK_COMMENTARY)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/desk-commentary', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok || cancelled) return
        const items = Array.isArray(body.items)
          ? body.items.map((x: unknown) => String(x ?? '').trim()).filter(Boolean)
          : []
        if (items.length) setCommentary(items)
      } catch {
        // keep fallback
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const muted = isLight ? 'text-[#838388]' : 'text-white/55'
  const strong = isLight ? 'text-[#0F172A]' : 'text-white'
  const rowBorder = isLight ? 'border-[#D5D8E0]' : 'border-[#FFFFFF0F]'

  return (
    <div className={`${dashCardClass(theme)} flex flex-col h-full rounded-[4px]`}>
      <div className={`px-4 py-3.5 border-b ${rowBorder} flex items-start justify-between gap-3`}>
        <div>
          <h3 className={`text-[16px] sm:text-[18px] leading-[22px] font-medium ${strong}`}>
            The Cycle Widget
          </h3>
          <p className={`text-[12px] leading-[16px] mt-1 ${muted}`}>
            Proprietary regime composite & forward probability
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[#2CB37B]">
          LIVE
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 min-h-0 gap-4">
        <div className={`divide-y ${isLight ? 'divide-[#D5D8E0]' : 'divide-[#FFFFFF0F]'}`}>
          {CYCLE_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <p className={`text-[13px] leading-[18px] ${muted}`}>{row.label}</p>
              <p
                className={`text-[14px] sm:text-[15px] font-semibold leading-[18px] text-right ${strong} ${row.valueClass || ''}`}
              >
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-auto pt-3 border-t ${rowBorder}`}>
          <p className={`text-[11px] uppercase tracking-[0.06em] mb-2 ${muted}`}>Desk Commentary</p>
          <div className="flex flex-col gap-2">
            {commentary.slice(0, 2).map((item, index) => (
              <div key={`${index}-${item.slice(0, 24)}`} className="flex gap-2 items-start">
                <span className="text-[#88C4FF] text-[12px] font-semibold tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className={`text-[12px] leading-[17px] ${muted}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
