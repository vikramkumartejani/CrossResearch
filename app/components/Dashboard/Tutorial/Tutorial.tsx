'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDashboardTheme } from '../DashboardTheme'
import { media } from '@/lib/media'
import data from './tutorialData.json'

type Block =
  | { type: 'heading'; text: string; id: string }
  | { type: 'paragraph'; text: string }

type TocItem = { id: string; label: string }

type TutorialPage = {
  id: string
  title: string
  subtitle: string
  blocks: Block[]
  toc: TocItem[]
}

type Category = {
  id: string
  label: string
  items: { id: string; label: string }[]
}

const QUICKSTART_IMAGE = '/assets/pictures/quickstart.png'
const categories = data.categories as Category[]
const navToPage = data.navToPage as Record<string, string>
const navOrder = data.navOrder as string[]
const pages = data.pages as Record<string, TutorialPage>

function categoryForNav(navId: string): string {
  for (const cat of categories) {
    if (cat.items.some((i) => i.id === navId)) return cat.label
  }
  return 'Documentation'
}

function labelForNav(navId: string): string {
  for (const cat of categories) {
    const hit = cat.items.find((i) => i.id === navId)
    if (hit) return hit.label
  }
  return navId
}

export default function Tutorial() {
  const { theme } = useDashboardTheme()
  const isLight = theme === 'light'
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeNav = searchParams.get('doc') || 'quickstart'
  const pageId = navToPage[activeNav] || 'quickstart'
  const page = pages[pageId] || pages.quickstart

  const [query, setQuery] = useState('')
  const [activeHeading, setActiveHeading] = useState<string | null>(
    page?.toc[0]?.id ?? null
  )
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [query])

  const navIndex = navOrder.indexOf(activeNav)
  const prevNav = navIndex > 0 ? navOrder[navIndex - 1] : null
  const nextNav =
    navIndex >= 0 && navIndex < navOrder.length - 1 ? navOrder[navIndex + 1] : null

  const setDoc = useCallback(
    (navId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('doc', navId)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      setMobileNavOpen(false)
      requestAnimationFrame(() => {
        document.getElementById('tutorial-content')?.scrollTo({ top: 0 })
      })
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    setActiveHeading(page?.toc[0]?.id ?? null)
  }, [page?.id, page?.toc])

  useEffect(() => {
    const root = document.getElementById('tutorial-content')
    if (!root || !page?.toc.length) return

    const nodes = page.toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) setActiveHeading(visible[0].target.id)
      },
      { root, rootMargin: '-8% 0px -72% 0px', threshold: [0, 1] }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [page?.id, page?.toc])

  const muted = isLight ? 'text-[#6B7280]' : 'text-[#8B8B93]'
  const strong = isLight ? 'text-[#0F172A]' : 'text-white'
  const border = isLight ? 'border-[#E2E5EC]' : 'border-[#FFFFFF0F]'
  const shell = isLight ? 'bg-[#F3F5F8]' : 'bg-[#070711]'
  const docsBg = isLight ? 'bg-[#F7F8FA]' : 'bg-[#0A0A10]'
  const activeNavCls = isLight
    ? 'bg-[#E8ECF2] text-[#0F172A]'
    : 'bg-[#FFFFFF12] text-white'
  const idleNavCls = isLight
    ? 'text-[#5B6472] hover:bg-[#EEF1F5] hover:text-[#0F172A]'
    : 'text-[#8B8B93] hover:bg-[#FFFFFF0A] hover:text-white/90'

  return (
    // Cancel shell padding; fill viewport above disclaimer footer (~52px)
    <div
      className={`tutorial-docs flex w-full -mt-18 lg:-mt-5 h-[calc(100dvh-52px)] ${shell}`}
    >
      {/* ── Docs sidebar ── */}
      <aside
        className={`hidden xl:flex w-[248px] 2xl:w-[268px] shrink-0 flex-col border-r ${border} ${docsBg}`}
      >
        <div className={`shrink-0 px-4 pt-5 pb-4 border-b ${border}`}>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden className={muted}>
                <path
                  d="M3.5 5h11M3.5 9h11M3.5 13h7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className={`text-[13px] font-medium truncate ${strong}`}>Documentation</span>
            </div>
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noreferrer"
              className={`shrink-0 text-[11px] font-medium ${muted} hover:opacity-80`}
            >
              Community
            </a>
          </div>

          <label className="relative block">
            <span className="sr-only">Search docs</span>
            <svg
              className={`pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 ${muted}`}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs"
              className={`w-full h-9 rounded-lg border ${border} ${
                isLight ? 'bg-white' : 'bg-[#12121A]'
              } pl-8 pr-3 text-[12px] ${strong} placeholder:text-[#6B7280] outline-none focus:border-[#227ED9]/50`}
            />
          </label>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto px-2.5 py-4 dashboard-scroll">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="mb-5 last:mb-1">
              <p
                className={`px-2.5 mb-1.5 text-[10px] tracking-[0.1em] font-semibold ${muted}`}
              >
                {cat.label}
              </p>
              <ul className="flex flex-col gap-[2px]">
                {cat.items.map((item) => {
                  const active = item.id === activeNav
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setDoc(item.id)}
                        className={`w-full text-left rounded-lg px-2.5 py-[7px] text-[12.5px] leading-[17px] transition-colors cursor-pointer ${
                          active ? `${activeNavCls} font-medium` : idleNavCls
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Content ── */}
      <div id="tutorial-content" className="min-w-0 flex-1 overflow-y-auto dashboard-scroll">
        <div className="px-5 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-12 max-w-[760px]">
          <div className="xl:hidden mb-5">
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className={`w-full flex items-center justify-between rounded-lg border ${border} px-3 py-2.5 text-[13px] ${strong} ${
                isLight ? 'bg-white' : 'bg-[#12121A]'
              }`}
            >
              <span>{labelForNav(activeNav)}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2.5 4.5L6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {mobileNavOpen && (
              <div
                className={`mt-2 max-h-72 overflow-y-auto rounded-lg border ${border} ${
                  isLight ? 'bg-white' : 'bg-[#12121A]'
                } p-2`}
              >
                {categories.map((cat) => (
                  <div key={cat.id} className="mb-3">
                    <p className={`px-2 mb-1 text-[10px] tracking-[0.1em] ${muted}`}>{cat.label}</p>
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDoc(item.id)}
                        className={`block w-full text-left rounded-md px-2 py-1.5 text-[12px] ${
                          item.id === activeNav ? `${activeNavCls}` : idleNavCls
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className={`text-[11px] tracking-[0.08em] font-medium mb-2 ${muted}`}>
            {categoryForNav(activeNav)}
          </p>
          <h1 className={`text-[28px] sm:text-[32px] font-semibold leading-tight tracking-[-0.02em] mb-2 ${strong}`}>
            {page.title}
          </h1>
          {page.subtitle ? (
            <p className={`text-[14px] leading-[21px] max-w-[580px] ${muted}`}>{page.subtitle}</p>
          ) : null}

          {activeNav === 'quickstart' && (
            <div
              className={`mt-6 mb-8 w-full aspect-[16/9] max-h-[340px] rounded-xl border ${border} overflow-hidden ${
                isLight ? 'bg-[#E8ECF2]' : 'bg-[#12121A]'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media(QUICKSTART_IMAGE)}
                alt="CrossResearch quickstart overview"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <div className={`flex flex-col gap-7 ${activeNav === 'quickstart' ? '' : 'mt-8'}`}>
            {page.blocks.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <div key={`${block.id}-${i}`} id={block.id} className="scroll-mt-8">
                    <h2
                      className={`flex items-start gap-2 text-[18px] sm:text-[20px] font-semibold leading-snug ${strong}`}
                    >
                      <span className="text-[#88C4FF] shrink-0 font-semibold">#</span>
                      <span>{block.text}</span>
                    </h2>
                  </div>
                )
              }
              return (
                <p
                  key={`p-${i}`}
                  className={`text-[13px] sm:text-[14px] leading-[21px] ${muted} ${
                    i > 0 && page.blocks[i - 1]?.type === 'heading' ? '-mt-4' : ''
                  }`}
                >
                  {block.text}
                </p>
              )
            })}
          </div>

          <div className={`mt-10 pt-6 border-t ${border} flex items-center justify-between gap-4`}>
            {prevNav ? (
              <button
                type="button"
                onClick={() => setDoc(prevNav)}
                className={`flex items-center gap-1.5 text-[13px] ${strong} cursor-pointer`}
              >
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path
                    d="M13.75 5.5L8.25 11L13.75 16.5"
                    stroke="currentColor"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {labelForNav(prevNav)}
              </button>
            ) : (
              <span />
            )}
            {nextNav ? (
              <button
                type="button"
                onClick={() => setDoc(nextNav)}
                className={`flex items-center gap-1.5 text-[13px] ${strong} cursor-pointer`}
              >
                {labelForNav(nextNav)}
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path
                    d="M8.25 5.5L13.75 11L8.25 16.5"
                    stroke="currentColor"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>

      {/* ── On this page ── */}
      <aside
        className={`hidden lg:flex w-[200px] xl:w-[220px] shrink-0 flex-col border-l ${border} ${docsBg}`}
      >
        <div className="px-4 pt-6 pb-4">
          <p className={`text-[10px] tracking-[0.1em] font-semibold mb-3 ${muted}`}>
            On this page
          </p>
          {page.toc.length ? (
            <ul className="flex flex-col gap-2">
              {page.toc.map((item) => {
                const active = activeHeading === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                        setActiveHeading(item.id)
                      }}
                      className={`w-full text-left text-[12px] leading-[16px] transition-colors cursor-pointer ${
                        active ? strong : `${muted} hover:opacity-90`
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className={`text-[12px] ${muted}`}>Overview</p>
          )}
        </div>
      </aside>
    </div>
  )
}
