'use client'

import { useEffect, useState, type ReactNode } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { PlanProvider } from './PlanProvider'
import { DashboardThemeProvider, ThemeToggleButton, useDashboardTheme } from './DashboardTheme'

const STORAGE_KEY = 'cr_dashboard_sidebar_collapsed'

function DashboardShellInner({ children }: { children: ReactNode }) {
  const { theme } = useDashboardTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === '1') setCollapsed(true)
    } catch {
      // ignore
    } finally {
      setReady(true)
    }
  }, [])

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        // ignore
      }
      return next
    })
  }

  const isLight = theme === 'light'

  return (
    <div
      data-dashboard-theme={theme}
      className={`dashboard-root flex h-screen overflow-hidden ${
        isLight ? 'bg-[#F3F5F8]' : 'bg-[#070711]'
      }`}
    >
      <DashboardSidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
        ready={ready}
      />

      <div
        className={`relative flex flex-col flex-1 min-w-0 min-h-0 transition-[padding] duration-200 ${
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-[268px]'
        }`}
      >
        <main className="relative flex-1 overflow-y-auto pt-18 lg:pt-5 min-h-0 dashboard-scroll">
          {/* Sticky float — zero layout height so header/price alignment is untouched */}
          <div className="pointer-events-none sticky top-2 z-50 hidden lg:flex justify-end px-4 lg:px-6 h-0">
            <div className="pointer-events-auto -translate-y-2 translate-x-0">
              <ThemeToggleButton />
            </div>
          </div>
          {children}
        </main>
        <p
          className={`shrink-0 border-t py-3 px-4 text-center text-[12px] sm:text-[14px] leading-[20px] font-normal ${
            isLight
              ? 'border-[#D5D8E0] bg-[#F3F5F8] text-[#838388]'
              : 'border-[#FFFFFF0D] bg-[#070711] text-[#838388]'
          }`}
        >
          Market intelligence • Not investment advice • Users remain solely responsible for all
          investment decisions and associated risks
        </p>
      </div>
    </div>
  )
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      <DashboardThemeProvider>
        <DashboardShellInner>{children}</DashboardShellInner>
      </DashboardThemeProvider>
    </PlanProvider>
  )
}
