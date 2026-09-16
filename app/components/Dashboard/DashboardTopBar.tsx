'use client'

import Link from 'next/link'
import Image from '@/lib/CldImage'
import { usePathname, useRouter } from 'next/navigation'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'
import { initialsFromName } from '@/lib/authUi'
import { PLAN_LABEL } from '@/lib/plans'
import { usePlan } from './PlanProvider'
import { ThemeToggleButton, useDashboardTheme } from './DashboardTheme'
import { mediaCssUrl } from '@/lib/media'

function IconSparkles() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5l1.05 3.2L12.4 5.7 9.05 7.05 8 10.5 6.95 7.05 3.6 5.7l3.35-1L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 9.25l.45 1.35 1.35.45-1.35.45-.45 1.35-.45-1.35-1.35-.45 1.35-.45.45-1.35Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavIcon({ name }: { name: string }) {
  const url = mediaCssUrl(`/assets/sidebar-icons/${name}.png`)
  return (
    <span
      aria-hidden
      className="inline-block w-[14px] h-[14px]"
      style={{
        backgroundColor: 'currentColor',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

function IconSettings() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 10.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M12.8 8.55v-1.1l-1.2-.24a3.7 3.7 0 00-.32-.78l.72-1.02-.8-.8-1.02.72c-.24-.14-.5-.24-.78-.32L9.16 3.8H6.84l-.24 1.21c-.28.08-.54.18-.78.32l-1.02-.72-.8.8.72 1.02c-.14.24-.24.5-.32.78L3.2 7.45v1.1l1.2.24c.08.28.18.54.32.78l-.72 1.02.8.8 1.02-.72c.24.14.5.24.78.32l.24 1.21h2.32l.24-1.21c.28-.08.54-.18.78-.32l1.02.72.8-.8-.72-1.02c.14-.24.24-.5.32-.78l1.2-.24z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.5 10.5L13.25 13.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconChevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M2.5 3.75L5 6.25L7.5 3.75"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Dest = {
  label: string
  href: string
  icon: ReactNode
  keywords?: string
}

type NavGroup = {
  id: string
  label: string
  items: Dest[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'analysis',
    label: 'Analysis',
    items: [
      { label: 'Analysis Home', href: '/analysis', icon: <NavIcon name="analysis-home" />, keywords: 'desk overview' },
      { label: 'Market Report', href: '/market-report', icon: <NavIcon name="market-report-file-text" />, keywords: 'reports research' },
      { label: 'AI Research', href: '/ai-research', icon: <IconSparkles />, keywords: 'chat assistant' },
    ],
  },
  {
    id: 'macro',
    label: 'Macro',
    items: [
      { label: 'Macro Nowcast', href: '/macro-nowcast', icon: <NavIcon name="macro-nowcast-activity" />, keywords: 'inflation gdp' },
      { label: 'Macro Signals', href: '/macro-signals', icon: <NavIcon name="macro-signals-layers" />, keywords: 'regime' },
    ],
  },
  {
    id: 'signals',
    label: 'Signals',
    items: [
      { label: 'Relief Signals', href: '/relief-signals', icon: <NavIcon name="belief-signals-signal" />, keywords: 'belief' },
      { label: 'Options Positioning', href: '/options-positioning', icon: <NavIcon name="options-positioning-crosshair" />, keywords: 'options gex' },
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    items: [{ label: 'Crypto / BTC', href: '/crypto-btc', icon: <NavIcon name="crypto-bitcoin" />, keywords: 'bitcoin eth' }],
  },
  {
    id: 'equities',
    label: 'Equities',
    items: [
      { label: 'Equity Analyst', href: '/equity-analyst', icon: <NavIcon name="analysis-home" />, keywords: 'stocks ticker' },
    ],
  },
  {
    id: 'flow',
    label: 'Flow',
    items: [
      {
        label: 'Seasonality & Flow',
        href: '/seasonality-flow',
        icon: <NavIcon name="seasonality-flow-bar-chart" />,
        keywords: 'seasonality cot',
      },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    items: [
      { label: 'Geopolitical', href: '/geopolitical', icon: <NavIcon name="geopolitical-globe" />, keywords: 'geo risk' },
      { label: 'News', href: '/news', icon: <NavIcon name="news-megaphone" />, keywords: 'headlines' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    items: [
      { label: 'Tutorial', href: '/tutorial', icon: <NavIcon name="tutorial-graduation-cap" />, keywords: 'quickstart' },
      { label: 'Education Center', href: '/education-center', icon: <NavIcon name="education-book-open" />, keywords: 'guides articles' },
      { label: 'Trading Strategies', href: '/trading-strategies', icon: <NavIcon name="strategies-line-chart" />, keywords: 'playbooks' },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    items: [
      { label: 'Help Center', href: '/help-center', icon: <NavIcon name="help-life-buoy" />, keywords: 'faq' },
      { label: 'Contact Support', href: '/contact-support', icon: <NavIcon name="support-message-circle" />, keywords: 'ticket' },
      { label: 'Settings', href: '/settings', icon: <IconSettings />, keywords: 'account profile' },
    ],
  },
]

const ALL_DESTINATIONS: Dest[] = NAV_GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    ...item,
    keywords: `${g.label} ${item.keywords || ''}`,
  }))
)

const CLOSE_DELAY_MS = 160

type DashboardTopBarProps = {
  navigating?: boolean
  onNavigate?: (href: string) => void
}

export default function DashboardTopBar({ navigating = false, onNavigate }: DashboardTopBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, plan } = usePlan()
  const { theme } = useDashboardTheme()
  const isLight = theme === 'light'

  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [shortcutLabel, setShortcutLabel] = useState('Ctrl K')
  const [isNarrow, setIsNarrow] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function openMenu(id: string) {
    clearCloseTimer()
    setSearchOpen(false)
    setQuery('')
    setOpenGroup(id)
  }

  function scheduleClose() {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpenGroup(null), CLOSE_DELAY_MS)
  }

  function goTo(href: string) {
    clearCloseTimer()
    setOpenGroup(null)
    setSearchOpen(false)
    setQuery('')
    if (onNavigate) {
      onNavigate(href)
      return
    }
    router.push(href)
  }

  function isPathActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  function groupIsActive(group: NavGroup) {
    return group.items.some((item) => isPathActive(item.href))
  }

  const searchHits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_DESTINATIONS.filter((d) => {
      const hay = `${d.label} ${d.href} ${d.keywords || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [query])

  async function handleLogout() {
    setMenuOpen(false)
    const logoutTo = user?.account_type === 'affiliate' ? '/affiliate/login' : '/login'
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast.success('Logged out')
    } catch {
      toast.error('Logout failed')
    }
    router.replace(logoutTo)
    router.refresh()
  }

  useEffect(() => () => clearCloseTimer(), [])

  useEffect(() => {
    function handler(e: MouseEvent) {
      const t = e.target as Node
      if (menuRef.current && !menuRef.current.contains(t)) setMenuOpen(false)
      if (navRef.current && !navRef.current.contains(t)) {
        clearCloseTimer()
        setOpenGroup(null)
      }
      if (searchWrapRef.current && !searchWrapRef.current.contains(t)) {
        const mobileSheet = (t as HTMLElement).closest?.('[data-cr-search-sheet]')
        if (!mobileSheet) {
          setSearchOpen(false)
          setQuery('')
        }
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpenGroup(null)
        setSearchOpen(true)
        setActiveIndex(0)
        return
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setQuery('')
        setOpenGroup(null)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const active = root.querySelector<HTMLElement>('[data-group-active="true"]')
    active?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    try {
      if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcutLabel('⌘K')
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setIsNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    requestAnimationFrame(() => searchInputRef.current?.focus())
  }, [searchOpen, isNarrow])

  const displayName = user?.full_name?.trim() || 'Account'
  const displaySub =
    user?.account_type === 'affiliate' ? 'Affiliate Partner' : PLAN_LABEL[plan] || 'Starter'
  const initials = initialsFromName(displayName)

  function onSearchKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, Math.max(searchHits.length - 1, 0)))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const hit = searchHits[activeIndex]
      if (hit) goTo(hit.href)
    }
  }

  const barBg = isLight ? 'bg-[#F8F9FB] border-[#E4E7EE]' : 'bg-[#0B0B14] border-white/[0.08]'
  const linkBase = isLight
    ? 'text-[#5B6472] hover:text-[#0F172A]'
    : 'text-white/55 hover:text-white'
  const linkActive = isLight ? 'text-[#0F172A]' : 'text-white'
  const panelClass = isLight
    ? 'bg-white border border-[#E4E7EE] shadow-[0_10px_28px_rgba(15,23,42,0.1)]'
    : 'bg-[#14141E] border border-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
  const itemHover = isLight ? 'hover:bg-[#F3F5F8] text-[#0F172A]' : 'hover:bg-white/[0.06] text-white/90'
  const muted = isLight ? 'text-[#838388]' : 'text-white/40'

  return (
    <header className={`relative shrink-0 z-50 border-b ${barBg}`}>
      <div className="flex items-center gap-4 h-12 px-4 lg:px-6">
        <Link
          href="/"
          title="Back to home"
          className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md opacity-90 hover:opacity-100 transition-opacity"
        >
          <Image src="/assets/logo.svg" alt="CrossResearch" width={20} height={20} />
        </Link>

        <nav
          ref={scrollerRef}
          aria-busy={navigating}
          className={`dashboard-topbar-scroll flex-1 min-w-0 ${
            openGroup ? 'overflow-visible' : 'overflow-x-auto'
          }`}
        >
          <div ref={navRef} className="flex items-center gap-1 sm:gap-1.5 w-max">
            {NAV_GROUPS.map((group) => {
              const active = groupIsActive(group)
              const open = openGroup === group.id
              const single = group.items.length === 1
              const tone = active || open ? linkActive : linkBase

              if (single) {
                const only = group.items[0]
                return (
                  <button
                    key={group.id}
                    type="button"
                    data-group-active={active ? 'true' : 'false'}
                    onClick={() => goTo(only.href)}
                    className={`h-8 px-2.5 sm:px-3 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${tone}`}
                  >
                    {group.label}
                  </button>
                )
              }

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => {
                    if (!isNarrow) openMenu(group.id)
                  }}
                  onMouseLeave={() => {
                    if (!isNarrow) scheduleClose()
                  }}
                >
                  <button
                    type="button"
                    data-group-active={active ? 'true' : 'false'}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    onClick={() => {
                      if (isNarrow) {
                        if (open) setOpenGroup(null)
                        else openMenu(group.id)
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${tone}`}
                  >
                    {group.label}
                    <span className={`shrink-0 ${active || open ? 'opacity-70' : 'opacity-45'}`}>
                      <IconChevron open={open} />
                    </span>
                  </button>

                  {open && (
                    <div
                      role="menu"
                      className={`absolute left-0 top-full pt-1.5 z-[100] w-[220px]`}
                      onMouseEnter={clearCloseTimer}
                      onMouseLeave={scheduleClose}
                    >
                      <div className={`rounded-lg overflow-hidden py-1 ${panelClass}`}>
                        {group.items.map((item) => {
                          const itemActive = isPathActive(item.href)
                          return (
                            <button
                              key={item.href}
                              type="button"
                              role="menuitem"
                              onClick={() => goTo(item.href)}
                              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] transition-colors cursor-pointer ${
                                itemActive
                                  ? isLight
                                    ? 'bg-[#F3F5F8] text-[#0F172A]'
                                    : 'bg-white/[0.08] text-white'
                                  : itemHover
                              }`}
                            >
                              <span
                                className={
                                  itemActive
                                    ? isLight
                                      ? 'text-[#227ED9]'
                                      : 'text-[#88C4FF]'
                                    : muted
                                }
                              >
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          <div ref={searchWrapRef} className="relative hidden md:block">
            {!searchOpen ? (
              <button
                type="button"
                onClick={() => {
                  setOpenGroup(null)
                  setSearchOpen(true)
                }}
                className={`inline-flex items-center gap-2 h-8 w-[200px] xl:w-[240px] px-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  isLight
                    ? 'border-[#E4E7EE] bg-white text-[#838388] hover:border-[#C9CED8]'
                    : 'border-white/[0.08] bg-white/[0.04] text-white/40 hover:border-white/15 hover:text-white/55'
                }`}
                aria-label="Search desk pages"
              >
                <IconSearch />
                <span className="flex-1 text-[12px] truncate">Search articles, guides…</span>
                <kbd
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    isLight
                      ? 'border-[#E4E7EE] bg-[#F8F9FB] text-[#838388]'
                      : 'border-white/10 bg-white/[0.03] text-white/35'
                  }`}
                >
                  {shortcutLabel}
                </kbd>
              </button>
            ) : (
              <div className={`absolute right-0 top-0 w-[280px] xl:w-[300px] rounded-lg overflow-hidden z-[110] ${panelClass}`}>
                <div
                  className={`flex items-center gap-2 px-2.5 h-8 border-b ${
                    isLight ? 'border-[#E4E7EE]' : 'border-white/[0.08]'
                  }`}
                >
                  <span className={muted}>
                    <IconSearch />
                  </span>
                  <input
                    ref={!isNarrow ? searchInputRef : undefined}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onSearchKeyDown}
                    placeholder="Type to search pages…"
                    className={`flex-1 bg-transparent outline-none text-[12px] ${
                      isLight
                        ? 'text-[#0F172A] placeholder:text-[#838388]'
                        : 'text-white placeholder:text-white/35'
                    }`}
                    autoComplete="off"
                  />
                </div>
                <div className="max-h-[240px] overflow-y-auto dashboard-scroll py-1">
                  {!query.trim() ? (
                    <p className={`px-3 py-2.5 text-[12px] ${muted}`}>Start typing a page name</p>
                  ) : searchHits.length === 0 ? (
                    <p className={`px-3 py-2.5 text-[12px] ${muted}`}>No matching pages</p>
                  ) : (
                    searchHits.map((hit, i) => {
                      const focused = i === activeIndex
                      return (
                        <button
                          key={hit.href}
                          type="button"
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => goTo(hit.href)}
                          className={`flex w-full items-center gap-2.5 px-3 py-2 text-[12.5px] transition-colors cursor-pointer ${
                            focused
                              ? isLight
                                ? 'bg-[#F3F5F8] text-[#0F172A]'
                                : 'bg-white/[0.06] text-white'
                              : itemHover
                          }`}
                        >
                          <span className={muted}>{hit.icon}</span>
                          <span className="font-medium truncate">{hit.label}</span>
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center w-8 h-8 rounded-md cursor-pointer ${muted}`}
            aria-label="Search"
            onClick={() => {
              setOpenGroup(null)
              setSearchOpen(true)
            }}
          >
            <IconSearch />
          </button>

          <ThemeToggleButton compact />

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center gap-2 h-8 pl-0.5 pr-1 rounded-md cursor-pointer"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <span className="relative shrink-0">
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-semibold ${
                    isLight
                      ? 'bg-white border-[#E4E7EE] text-[#5B6472]'
                      : 'bg-white/[0.06] border-white/15 text-white/70'
                  }`}
                >
                  {initials}
                </span>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#62A381] border ${
                    isLight ? 'border-[#F8F9FB]' : 'border-[#0B0B14]'
                  }`}
                />
              </span>
              <span className="hidden lg:block text-left min-w-0 max-w-[100px]">
                <span
                  className={`block text-[12px] font-medium leading-tight truncate ${
                    isLight ? 'text-[#0F172A]' : 'text-white/90'
                  }`}
                >
                  {displayName}
                </span>
                <span className={`block text-[10px] leading-tight truncate ${muted}`}>{displaySub}</span>
              </span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className={`absolute right-0 top-[calc(100%+6px)] w-[180px] rounded-lg overflow-hidden z-[110] ${panelClass}`}
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    goTo('/settings')
                  }}
                  className={`flex w-full px-3.5 py-2.5 text-[13px] transition-colors ${itemHover}`}
                >
                  Settings
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => void handleLogout()}
                  className={`flex w-full px-3.5 py-2.5 text-[13px] text-[#FF6B6B] transition-colors border-t ${
                    isLight
                      ? 'hover:bg-[#F3F5F8] border-[#E4E7EE]'
                      : 'hover:bg-white/[0.06] border-white/[0.08]'
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {searchOpen && isNarrow && (
        <div className="fixed inset-0 z-[60]" data-cr-search-sheet>
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setSearchOpen(false)
              setQuery('')
            }}
          />
          <div className={`absolute left-3 right-3 top-3 rounded-lg overflow-hidden ${panelClass}`}>
            <div
              className={`flex items-center gap-2 px-3 h-10 border-b ${
                isLight ? 'border-[#E4E7EE]' : 'border-white/[0.08]'
              }`}
            >
              <span className={muted}>
                <IconSearch />
              </span>
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Type to search pages…"
                className={`flex-1 bg-transparent outline-none text-[13px] ${
                  isLight
                    ? 'text-[#0F172A] placeholder:text-[#838388]'
                    : 'text-white placeholder:text-white/35'
                }`}
                autoComplete="off"
              />
            </div>
            <div className="max-h-[60vh] overflow-y-auto dashboard-scroll py-1">
              {!query.trim() ? (
                <p className={`px-3 py-2.5 text-[12px] ${muted}`}>Start typing a page name</p>
              ) : (
                searchHits.map((hit, i) => (
                  <button
                    key={hit.href}
                    type="button"
                    onClick={() => goTo(hit.href)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] ${
                      i === activeIndex
                        ? isLight
                          ? 'bg-[#F3F5F8]'
                          : 'bg-white/[0.06]'
                        : itemHover
                    }`}
                  >
                    <span className={muted}>{hit.icon}</span>
                    <span className="font-medium">{hit.label}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
