'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface BeliefAlertLite {
  time: string
  severity: string
  severityColor: string
  title: string
  change: string
  positive: boolean
}

export interface BeliefAlertDetail {
  severity: string
  severityColor: string
  title: string
  time: string
  status: string
  statusColor: string
  prev: string
  now: string
  change: string
  relative: string
  window: string
  z: string
  signal: string
  desc: string
  crossAsset: string | null
  url?: string | null
}

export interface BeliefWatchlist {
  title: string
  desc: string
  items: { title: string; category: string; prob?: string; url?: string | null }[]
  count: number
}

export interface BeliefMover {
  id?: string
  event: string
  verdict: string
  category: string
  prob: string
  d1m: string
  d1h: string
  d24h: string
  shockLabel: string
  shockColor: string
  url?: string | null
}

export interface BeliefMarketsPayload {
  market_state?: string
  updated_at?: string
  latest_alerts?: BeliefAlertLite[]
  alerts?: BeliefAlertDetail[]
  watchlists?: BeliefWatchlist[]
  movers?: BeliefMover[]
  stats?: { markets?: number; alerts?: number; movers?: number }
  sources?: Record<string, { status?: string }>
}

interface BeliefMarketsContextValue {
  data: BeliefMarketsPayload | null
  loading: boolean
  error: string | null
  refresh: () => void
}

const BeliefMarketsContext = createContext<BeliefMarketsContextValue | null>(null)

export function BeliefMarketsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BeliefMarketsPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/belief-markets', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(
            typeof body.details === 'string' ? body.details : body.error || 'Failed to load belief markets'
          )
        }
        if (!cancelled) setData(body as BeliefMarketsPayload)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setData(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const id = setInterval(load, 60_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [tick])

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
      refresh: () => setTick((t) => t + 1),
    }),
    [data, loading, error]
  )

  return <BeliefMarketsContext.Provider value={value}>{children}</BeliefMarketsContext.Provider>
}

export function useBeliefMarkets() {
  const ctx = useContext(BeliefMarketsContext)
  if (!ctx) throw new Error('useBeliefMarkets must be used within BeliefMarketsProvider')
  return ctx
}
