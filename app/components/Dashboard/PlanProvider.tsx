'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { normalizePlan, type PlanId } from '@/lib/plans'

type AuthUser = {
  id: string
  email: string
  full_name: string
  tradingview_username: string | null
  plan: PlanId
}

type PlanContextValue = {
  user: AuthUser | null
  plan: PlanId
  loading: boolean
  refresh: () => Promise<void>
  setPlanOptimistic: (plan: PlanId) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

export function PlanProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      if (!res.ok) {
        setUser(null)
        return
      }
      const body = await res.json().catch(() => ({}))
      const u = body?.user
      if (!u) {
        setUser(null)
        return
      }
      setUser({
        id: String(u.id || ''),
        email: String(u.email || ''),
        full_name: String(u.full_name || ''),
        tradingview_username:
          typeof u.tradingview_username === 'string' && u.tradingview_username.trim()
            ? u.tradingview_username.trim()
            : null,
        plan: normalizePlan(u.plan),
      })
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const setPlanOptimistic = useCallback((plan: PlanId) => {
    setUser((prev) => (prev ? { ...prev, plan } : prev))
  }, [])

  const value = useMemo(
    () => ({
      user,
      plan: user?.plan || 'free',
      loading,
      refresh,
      setPlanOptimistic,
    }),
    [user, loading, refresh, setPlanOptimistic]
  )

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export function usePlan() {
  const ctx = useContext(PlanContext)
  if (!ctx) {
    return {
      user: null,
      plan: 'free' as PlanId,
      loading: false,
      refresh: async () => undefined,
      setPlanOptimistic: (_plan: PlanId) => undefined,
    }
  }
  return ctx
}
