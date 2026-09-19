'use client'

import { useTransition, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from '@/lib/CldImage'
import DashboardTopBar from './DashboardTopBar'
import MarketTickerBar from './MarketTickerBar'
import { PlanProvider } from './PlanProvider'
import { DashboardThemeProvider, useDashboardTheme } from './DashboardTheme'

function DashboardShellInner({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useDashboardTheme()
  const [isNavigating, startTransition] = useTransition()

  function navigateDashboard(href: string) {
    if (pathname === href || pathname.startsWith(`${href}/`)) return
    startTransition(() => {
      router.push(href)
    })
  }

  const isLight = theme === 'light'

  return (
    <div
      data-dashboard-theme={theme}
      className={`dashboard-root flex flex-col h-screen overflow-hidden ${
        isLight ? 'bg-[#F3F5F8]' : 'bg-[#070711]'
      }`}
    >
      <DashboardTopBar navigating={isNavigating} onNavigate={navigateDashboard} />
      <MarketTickerBar />

      <div className="relative flex flex-col flex-1 min-w-0 min-h-0">
        <main className="relative flex-1 overflow-y-auto min-h-0 dashboard-scroll">
          {isNavigating && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-[2px] bg-[#88C4FF]/25 overflow-hidden"
            >
              <div className="h-full w-1/3 bg-[#88C4FF] animate-[cr-nav-progress_1s_ease-in-out_infinite]" />
            </div>
          )}
          <div key={pathname} className="min-h-full pt-4 sm:pt-5">
            {children}
          </div>
        </main>
        <div
          className={`relative shrink-0 border-t py-3 px-4 flex items-center justify-center text-center text-[12px] sm:text-[14px] leading-[20px] font-normal ${
            isLight
              ? 'border-[#D5D8E0] bg-[#F3F5F8] text-[#838388]'
              : 'border-[#FFFFFF0D] bg-[#070711] text-[#838388]'
          }`}
        >
          <Image
            src="/assets/logo.svg"
            alt="CrossResearch"
            width={18}
            height={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-80 shrink-0"
          />
          <p className="px-8 sm:px-10 max-w-[920px]">
            Market intelligence • Not investment advice • Users remain solely responsible for all
            investment decisions and associated risks
          </p>
        </div>
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
