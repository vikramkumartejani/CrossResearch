'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { NowcastCardProps } from './NowcastCard'

export interface ApiDriver {
  label: string
  value: string
  positive?: boolean
}

export interface ApiCard {
  id?: string
  region?: string
  quarter?: string
  indicator?: string
  unit?: string
  value?: string
  nowcast?: number | null
  consensus?: number | null
  prior?: number | null
  vsConsensus?: number | null
  inRange?: string
  drivers?: ApiDriver[]
  confidence?: number
  trendSeries?: { date: string; value: number }[]
  modelVsActual?: { period: string; forecast: number | null; actual: number | null }[]
}

function formatVsConsensus(vs: number | null | undefined): { label: string; positive: boolean } {
  if (vs == null || !Number.isFinite(vs)) {
    return { label: '0 Vs', positive: true }
  }
  const sign = vs > 0 ? '+' : ''
  const text = Number.isInteger(vs) ? String(vs) : String(Number(vs.toFixed(2)))
  return { label: `${sign}${text} Vs`, positive: vs >= 0 }
}

export function toCardProps(card: ApiCard): NowcastCardProps {
  const vs = formatVsConsensus(card.vsConsensus)
  return {
    region: card.region || '-',
    quarter: card.quarter || '-',
    vsConsensus: vs.label,
    vsConsensusPositive: vs.positive,
    indicator: card.indicator || 'Indicator',
    value: card.value ?? String(card.nowcast ?? ''),
    unit: card.unit || '',
    nowcast: Number(card.nowcast ?? 0),
    consensus: Number(card.consensus ?? 0),
    prior: Number(card.prior ?? 0),
    inRange: card.inRange || '-',
    drivers: (card.drivers || []).map((d) => ({
      label: d.label,
      value: d.value,
      positive: d.positive ?? !String(d.value).trim().startsWith('-'),
    })),
    confidence: Number(card.confidence ?? 0),
    trendSeries: card.trendSeries || [],
    modelVsActual: card.modelVsActual || [],
  }
}

interface NowcastDataValue {
  cards: NowcastCardProps[]
  loading: boolean
  error: string | null
}

const NowcastDataContext = createContext<NowcastDataValue | null>(null)

export function NowcastDataProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<NowcastCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/nowcast-cards', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(
            typeof body.detail === 'string'
              ? body.detail
              : body.error || `Failed to load nowcasts (${res.status})`
          )
        }
        const list = Array.isArray(body.cards) ? body.cards.map(toCardProps) : []
        if (!cancelled) setCards(list)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load nowcasts')
          setCards([])
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

  const value = useMemo(() => ({ cards, loading, error }), [cards, loading, error])
  return <NowcastDataContext.Provider value={value}>{children}</NowcastDataContext.Provider>
}

export function useNowcastData() {
  const ctx = useContext(NowcastDataContext)
  if (!ctx) throw new Error('useNowcastData must be used within NowcastDataProvider')
  return ctx
}

export function formatNowcastNumber(n: number, unit?: string): string {
  if (!Number.isFinite(n)) return '-'
  const abs = Math.abs(n)
  let text: string
  if (abs >= 100) text = n.toFixed(0)
  else if (abs >= 10) text = Number(n.toFixed(1)).toString()
  else text = Number(n.toFixed(2)).toString()
  if (unit?.includes('%')) return `${text}%`
  return text
}
