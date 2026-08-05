'use client'

import { useEffect, useState, type ReactNode } from 'react'
import DashboardSidebar from './DashboardSidebar'

const STORAGE_KEY = 'cr_dashboard_sidebar_collapsed'

export default function DashboardShell({ children }: { children: ReactNode }) {
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

  return (
    <div className="flex h-screen bg-[#070711] overflow-hidden">
      <DashboardSidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
        ready={ready}
      />

      <div
        className={`flex flex-col flex-1 min-w-0 min-h-0 transition-[padding] duration-200 ${
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-[268px]'
        }`}
      >
        <main className="flex-1 overflow-y-auto pt-18 lg:pt-6 min-h-0 dashboard-scroll">
          {children}
        </main>
        <p className="shrink-0 border-t border-[#FFFFFF0D] bg-[#070711] py-3 px-4 text-center text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">
          Market intelligence • Not investment advice • Users remain solely responsible for all
          investment decisions and associated risks
        </p>
      </div>
    </div>
  )
}
