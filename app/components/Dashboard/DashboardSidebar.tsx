'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { initialsFromName } from '@/lib/authUi'
import { PLAN_LABEL } from '@/lib/plans'
import { usePlan } from './PlanProvider'
import { ThemeToggleButton, useDashboardTheme } from './DashboardTheme'

// ─── Icons ────────────────────────────────────────────────────────────────────
// PNG artwork from /assets/sidebar-icons used as CSS masks so the icons inherit
// the nav item color (inactive grey, active blue, hover, light/dark themes).

function NavIcon({ name }: { name: string }) {
    const url = `url(/assets/sidebar-icons/${name}.png)`
    return (
        <span
            aria-hidden
            className="inline-block w-4 h-4"
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

// ─── Nav structure ────────────────────────────────────────────────────────────

// Shown only to affiliate partner accounts, at the top of the nav
const PARTNER_SECTION = {
    label: 'PARTNER',
    items: [
        { label: 'Affiliate Center', href: '/affiliate-center', icon: <NavIcon name="affiliate-users" /> },
    ],
}

const NAV_SECTIONS = [
    {
        label: 'WORK SPACE',
        items: [
            { label: 'Analysis', href: '/analysis', icon: <NavIcon name="analysis-home" /> },
            { label: 'Market Report', href: '/market-report', icon: <NavIcon name="market-report-file-text" /> },
        ],
    },
    {
        label: 'MACRO',
        items: [
            { label: 'Macro Nowcast', href: '/macro-nowcast', icon: <NavIcon name="macro-nowcast-activity" /> },
            { label: 'Macro Signals', href: '/macro-signals', icon: <NavIcon name="macro-signals-layers" /> },
            { label: 'Relief Signals', href: '/relief-signals', icon: <NavIcon name="belief-signals-signal" /> },
        ],
    },
    {
        label: 'FLOW & POSITIONING',
        items: [
            { label: 'Options Positioning', href: '/options-positioning', icon: <NavIcon name="options-positioning-crosshair" /> },
            { label: 'Seasonality & Flow', href: '/seasonality-flow', icon: <NavIcon name="seasonality-flow-bar-chart" /> },
        ],
    },
    {
        label: 'CRYPTO',
        items: [
            { label: 'Crypto / BTC', href: '/crypto-btc', icon: <NavIcon name="crypto-bitcoin" /> },
        ],
    },
    {
        label: 'INTELLIGENCE',
        items: [
            { label: 'Geopolitical', href: '/geopolitical', icon: <NavIcon name="geopolitical-globe" /> },
            { label: 'News', href: '/news', icon: <NavIcon name="news-megaphone" /> },
        ],
    },
    {
        label: 'LEARNING',
        items: [
            { label: 'Tutorial', href: '/tutorial', icon: <NavIcon name="tutorial-graduation-cap" /> },
            { label: 'Education Center', href: '/education-center', icon: <NavIcon name="education-book-open" /> },
            { label: 'Trading Strategies', href: '/trading-strategies', icon: <NavIcon name="strategies-line-chart" /> },
        ],
    },
    {
        label: 'SUPPORT',
        items: [
            { label: 'Help Center', href: '/help-center', icon: <NavIcon name="help-life-buoy" /> },
            { label: 'Contact Support', href: '/contact-support', icon: <NavIcon name="support-message-circle" /> },
        ],
    },
]

// ─── Component ────────────────────────────────────────────────────────────────

type DashboardSidebarProps = {
    collapsed?: boolean
    onToggleCollapse?: () => void
    ready?: boolean
}

function IconCollapseChevron({ collapsed }: { collapsed: boolean }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            aria-hidden
        >
            <path
                d="M10 4L6 8L10 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default function DashboardSidebar({
    collapsed = false,
    onToggleCollapse,
    ready = true,
}: DashboardSidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const { user, plan, refresh } = usePlan()
    const { theme } = useDashboardTheme()
    const isLight = theme === 'light'
    const [mobileOpen, setMobileOpen] = useState(false)

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        void refresh()
    }, [refresh])

    async function handleLogout() {
        setOpen(false)
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            toast.success('Logged out')
        } catch {
            toast.error('Logout failed')
        }
        router.replace('/login')
        router.refresh()
    }

    const isAffiliate = user?.account_type === 'affiliate'
    const navSections = isAffiliate ? [PARTNER_SECTION, ...NAV_SECTIONS] : NAV_SECTIONS

    const displayName = user?.full_name?.trim() || 'Account'
    const displaySub = isAffiliate ? 'Affiliate Partner' : PLAN_LABEL[plan] || 'Starter'
    const initials = initialsFromName(displayName)

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Close user menu when collapsing
    useEffect(() => {
        if (collapsed) setOpen(false)
    }, [collapsed])

    function renderSidebarContent(opts: {
        compact: boolean
        showCollapseToggle: boolean
        attachUserRef?: boolean
    }) {
        const { compact, showCollapseToggle, attachUserRef } = opts

        return (
            <div className="relative w-full flex flex-col h-full pt-4">
                {/* Collapse toggle (desktop only) */}
                {showCollapseToggle && onToggleCollapse && (
                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
                        title={compact ? 'Expand sidebar' : 'Collapse sidebar'}
                        className={`absolute top-5 -right-3 z-10 inline-flex items-center justify-center w-6 h-6 rounded-full border transition-colors cursor-pointer ${
                            isLight
                                ? 'border-[#D5D8E0] bg-[#F3F5F8] text-[#5B6472] hover:text-[#0F172A] hover:bg-white'
                                : 'border-[#FFFFFF1A] bg-[#070711] text-white/50 hover:text-white hover:bg-[#22222E]'
                        }`}
                    >
                        <IconCollapseChevron collapsed={compact} />
                    </button>
                )}

                {/* User */}
                <div ref={attachUserRef ? ref : undefined} className={`relative pb-5 border-b ${isLight ? 'border-[#D5D8E0]' : 'border-[#FFFFFF0F]'} ${compact ? 'px-2' : 'px-4'}`}>
                    <button
                        onClick={() => {
                            if (compact) return
                            setOpen((prev) => !prev)
                        }}
                        className={`w-full flex items-center gap-2 group ${
                            compact ? 'justify-center cursor-default' : 'justify-between cursor-pointer'
                        }`}
                        title={compact ? displayName : undefined}
                    >
                        <div className={`flex items-center gap-2 ${compact ? 'justify-center' : ''}`}>
                            <div className="relative flex-shrink-0">
                                <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[15px] font-medium leading-[12px] ${
                                    isLight
                                        ? 'bg-[#F3F5F8] border-[#D5D8E0] text-[#5B6472]'
                                        : 'bg-[#FFFFFF08] border-[#FFFFFF1A] text-white/60'
                                }`}>
                                    {initials}
                                </div>
                                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#62A381] border-1 ${isLight ? 'border-[#F3F5F8]' : 'border-[#070711]'}`} />
                            </div>
                            {!compact && (
                                <div className="block text-left min-w-0">
                                    <p className={`text-[14px] leading-[17px] font-semibold truncate max-w-[140px] ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                                        {displayName}
                                    </p>
                                    <p className={`text-[11px] leading-[13px] font-normal mt-1 truncate max-w-[140px] ${isLight ? 'text-[#838388]' : 'text-white/60'}`}>
                                        {displaySub}
                                    </p>
                                </div>
                            )}
                        </div>
                        {!compact && (
                            <svg
                                className={`flex items-end justify-end transition-all duration-200 ml-2 ${open ? 'rotate-180' : 'rotate-0'} ${isLight ? 'text-[#5B6472]' : 'text-white group-hover:text-white/70'}`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 7.5L10 12.5L15 7.5"
                                    stroke="currentColor"
                                    strokeOpacity="0.6"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>

                    {!compact && open && (
                        <div className={`absolute right-4 top-[calc(100%-16px)] w-[200px] border rounded-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.15)] z-50 ${
                            isLight ? 'bg-white border-[#D5D8E0]' : 'bg-[#1E1E2A] border-[#FFFFFF0F]'
                        }`}>
                            <button
                                type="button"
                                onClick={() => void handleLogout()}
                                className={`flex items-center gap-2.5 w-full px-4 py-3 text-[13px] text-[#FF6B6B] transition-colors ${
                                    isLight ? 'hover:bg-[#F3F5F8]' : 'hover:bg-[#FFFFFF08]'
                                }`}
                            >
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path
                                        d="M5.5 13H3a1 1 0 01-1-1V3a1 1 0 011-1h2.5M10 10.5L13 7.5M13 7.5L10 4.5M13 7.5H6"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Nav sections */}
                <nav className={`dashboard-nav flex-1 overflow-y-auto pt-5 ${compact ? 'px-2' : 'px-4'}`}>
                    {navSections.map((section) => (
                        <div key={section.label} className="mb-5">
                            {!compact && (
                                <p className={`text-[12px] leading-[14px] font-semibold uppercase mb-2.5 ${isLight ? 'text-[#838388]' : 'text-white/60'}`}>
                                    {section.label}
                                </p>
                            )}
                            <ul className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive =
                                        pathname === item.href || pathname.startsWith(item.href + '/')
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                title={compact ? item.label : undefined}
                                                onClick={() => setMobileOpen(false)}
                                                className={`flex items-center h-10 text-[14px] leading-[17px] transition-colors duration-150 group ${
                                                    compact
                                                        ? `justify-center rounded-md border-transparent ${
                                                              isActive
                                                                  ? 'bg-[#88C4FF26] text-[#227ED9]'
                                                                  : isLight
                                                                    ? 'text-[#5B6472] hover:text-[#0F172A] hover:bg-[#F3F5F8]'
                                                                    : 'text-[#FFFFFF60] hover:text-white hover:bg-[#FFFFFF08]'
                                                          }`
                                                        : `border-l gap-2 p-3 ${
                                                              isActive
                                                                  ? 'bg-[#88C4FF26] text-[#227ED9] font-semibold border-[#88C4FF]'
                                                                  : isLight
                                                                    ? 'text-[#5B6472] hover:text-[#0F172A] hover:bg-[#F3F5F8] font-medium border-transparent'
                                                                    : 'text-[#FFFFFF60] hover:text-white hover:bg-[#FFFFFF08] font-medium border-transparent'
                                                          }`
                                                }`}
                                            >
                                                <span
                                                    className={`flex-shrink-0 ${
                                                        isActive
                                                            ? 'text-[#227ED9]'
                                                            : isLight
                                                              ? 'text-[#838388] group-hover:text-[#0F172A]'
                                                              : 'text-[#9498A8] group-hover:text-white'
                                                    } transition-colors`}
                                                >
                                                    {item.icon}
                                                </span>
                                                {!compact && item.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Bottom logo — links back to the marketing home page */}
                <div className={`py-5 mt-auto border-t ${isLight ? 'border-[#D5D8E0]' : 'border-[#FFFFFF0F]'} ${compact ? 'px-2 flex justify-center' : 'px-4'}`}>
                    <Link
                        href="/"
                        title="Back to home"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex opacity-90 hover:opacity-100 transition-opacity"
                    >
                        {compact ? (
                            <Image
                                src="/assets/logo.svg"
                                alt="CrossResearch"
                                width={28}
                                height={28}
                                className="object-contain"
                            />
                        ) : (
                            <Image src="/assets/full-logo.svg" alt="CrossResearch" width={218} height={28} />
                        )}
                    </Link>
                </div>
            </div>
        )
    }

    const desktopContent = renderSidebarContent({
        compact: collapsed,
        showCollapseToggle: true,
        attachUserRef: !collapsed && !mobileOpen,
    })
    const mobileContent = renderSidebarContent({
        compact: false,
        showCollapseToggle: false,
        attachUserRef: true,
    })

    return (
        <>
            {/* Desktop sidebar — fixed */}
            <aside
                className={`hidden lg:flex fixed top-0 left-0 h-full flex-col z-40 transition-[width] duration-200 border-r ${
                    isLight
                        ? 'bg-[#F3F5F8] border-[#D5D8E0]'
                        : 'bg-[#070711] border-[#FFFFFF0F]'
                } ${ready ? '' : 'opacity-0'} ${collapsed ? 'w-[72px]' : 'w-[268px]'}`}
            >
                {desktopContent}
            </aside>

            {/* Mobile header bar */}
            <header
                className={`lg:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b flex items-center justify-between px-4 ${
                    isLight
                        ? 'bg-[#F3F5F8] border-[#D5D8E0]'
                        : 'bg-[#070711] border-[#FFFFFF0F]'
                }`}
            >
                {/* Left: logo */}
                <Image
                    src='/assets/full-logo.svg'
                    alt='CrossResearch'
                    width={168}
                    height={24}
                    className='object-contain'
                />

                <div className="flex items-center gap-2">
                    <ThemeToggleButton compact />
                    {/* Right: hamburger / X toggle */}
                    <button
                        className='flex flex-col justify-center items-center w-9 h-10 cursor-pointer relative'
                        onClick={() => setMobileOpen(prev => !prev)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    >
                        <span
                            className={`block w-6 h-[2px] rounded-full absolute transition-all duration-300 ${isLight ? 'bg-[#0F172A]' : 'bg-white'}`}
                            style={{
                                transform: mobileOpen ? 'rotate(45deg)' : 'translateY(-6px)',
                            }}
                        />
                        <span
                            className={`block w-6 h-[2px] rounded-full absolute transition-all duration-300 ${isLight ? 'bg-[#0F172A]' : 'bg-white'}`}
                            style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)' }}
                        />
                        <span
                            className={`block w-6 h-[2px] rounded-full absolute transition-all duration-300 ${isLight ? 'bg-[#0F172A]' : 'bg-white'}`}
                            style={{
                                transform: mobileOpen ? 'rotate(-45deg)' : 'translateY(6px)',
                            }}
                        />
                    </button>
                </div>
            </header>

            {/* Mobile drawer with animation */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key='backdrop'
                            className='fixed inset-0 bg-black/60 z-40'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            key='drawer'
                            className={`fixed top-0 left-0 h-full w-[260px] border-r z-50 flex flex-col ${
                                isLight
                                    ? 'bg-[#F3F5F8] border-[#D5D8E0]'
                                    : 'bg-[#070711] border-[#FFFFFF0D]'
                            }`}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            {mobileContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
