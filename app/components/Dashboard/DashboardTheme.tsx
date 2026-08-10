'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type DashboardTheme = 'dark' | 'light'

type DashboardThemeContextValue = {
  theme: DashboardTheme
  toggle: () => void
  setTheme: (t: DashboardTheme) => void
}

const DashboardThemeContext = createContext<DashboardThemeContextValue | null>(null)

const STORAGE_KEY = 'cr-dashboard-theme'
const LEGACY_KEY = 'cr-analysis-theme'

export function DashboardThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DashboardTheme>('dark')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY)
      if (saved === 'light' || saved === 'dark') setThemeState(saved)
    } catch {
      // ignore
    }
  }, [])

  const setTheme = (t: DashboardTheme) => {
    setThemeState(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {
      // ignore
    }
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme]
  )

  return (
    <DashboardThemeContext.Provider value={value}>{children}</DashboardThemeContext.Provider>
  )
}

export function useDashboardTheme() {
  const ctx = useContext(DashboardThemeContext)
  if (!ctx) throw new Error('useDashboardTheme must be used within DashboardThemeProvider')
  return ctx
}

/** Card surface helpers (analysis + reusable) */
export function dashCardClass(theme: DashboardTheme) {
  return theme === 'light'
    ? 'bg-[#FFFFFF] border border-[#D5D8E0] text-[#0F172A]'
    : 'bg-[#2A2A35] border border-[#FFFFFF0D] text-white'
}

export function ThemeToggleButton({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useDashboardTheme()
  const isDark = theme === 'dark'
  const [iconTick, setIconTick] = useState(0)

  const handleToggle = () => {
    setIconTick((n) => n + 1)
    toggle()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`dashboard-theme-toggle inline-flex items-center gap-2 rounded-full text-[12px] font-semibold tracking-wide cursor-pointer transition-colors duration-200 ${
        compact ? 'h-8 px-2.5' : 'h-9 px-3.5'
      }`}
    >
      <span
        key={iconTick}
        className="dashboard-theme-toggle__icon inline-flex"
        aria-hidden
      >
        {isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      {!compact && (isDark ? 'DARK' : 'LIGHT')}
    </button>
  )
}
