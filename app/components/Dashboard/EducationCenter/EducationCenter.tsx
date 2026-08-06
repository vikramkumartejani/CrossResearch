'use client'

import { useEffect, useMemo, useState } from 'react'
import ContentDetailModal from '../shared/ContentDetailModal'

const TABS = ['Recent', 'Macro', 'Technical', 'Psychology', 'All'] as const
type Tab = (typeof TABS)[number]
type Topic = 'Macro' | 'Technical' | 'Psychology'
type Level = 'Beginner' | 'Advanced'
type Placement = 'featured' | 'grid' | 'bottom'

type Article = {
  id: string
  topic: Topic
  level: Level
  title: string
  desc?: string
  contentHtml?: string
  author: string
  date: string
  placement: Placement
  sort_order: number
  active: boolean
}

const ALL_PAGE_SIZE = 8

function topicLabel(article: Pick<Article, 'topic' | 'level'>) {
  return `${article.topic} • ${article.level}`
}

function matchesSearch(article: Article, search: string) {
  const q = search.trim().toLowerCase()
  if (!q) return true
  return [article.title, article.desc, article.author, article.topic, article.level]
    .filter(Boolean)
    .some((v) => String(v).toLowerCase().includes(q))
}

function byPlacement(list: Article[], placement: Placement) {
  return list
    .filter((a) => a.placement === placement && a.active !== false)
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
}

function SmallCard({ card, onOpen }: { card: Article; onOpen: (card: Article) => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(card)
      }}
      className="bg-[#16161F] flex flex-col cursor-pointer transition-colors h-full hover:bg-[#1A1A24]"
    >
      <div className="flex-1 bg-[#FFFFFF08] min-h-[140px] sm:min-h-[180px]" />
      <div className="p-3 sm:p-4">
        <p className="text-[12px] sm:text-[14px] leading-[17px] font-medium text-[#88C4FF]">
          {topicLabel(card)}
        </p>
        <p className="text-white text-[16px] sm:text-[18px] leading-[20px] sm:leading-6 font-medium mt-2 mb-2 line-clamp-3">
          {card.title}
        </p>
        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">
          By {card.author} • {card.date}
        </p>
      </div>
    </div>
  )
}

function BottomCard({ card, onOpen }: { card: Article; onOpen: (card: Article) => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(card)
      }}
      className="bg-[#16161F] p-3 sm:p-4 cursor-pointer transition-colors h-full hover:bg-[#1A1A24]"
    >
      <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">
        {topicLabel(card)}
      </span>
      <h3 className="text-white text-[16px] lg:text-[20px] leading-5 lg:leading-[26px] font-semibold my-2 sm:my-3">
        {card.title}
      </h3>
      {card.desc ? (
        <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] font-normal mb-2 sm:mb-3 line-clamp-3">
          {card.desc}
        </p>
      ) : null}
      <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[22px]">
        By {card.author} • {card.date}
      </p>
    </div>
  )
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="px-2 py-1 text-[12px] text-[#838388] disabled:opacity-30 hover:text-white transition-colors"
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`min-w-7 h-7 text-[12px] transition-colors ${
            n === page ? 'text-white font-semibold' : 'text-[#838388] hover:text-white'
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="px-2 py-1 text-[12px] text-[#838388] disabled:opacity-30 hover:text-white transition-colors"
      >
        ›
      </button>
    </div>
  )
}

export default function EducationCenter() {
  const [activeTab, setActiveTab] = useState<Tab>('Recent')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageTitle, setPageTitle] = useState('Library')
  const [subtitle, setSubtitle] = useState(
    'Education articles and guides across Macro, Technical, and Psychology — filter by topic or search the library.'
  )
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Article | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/education-center', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(
            typeof body.details === 'string'
              ? body.details
              : body.error || body.detail || `Failed to load (${res.status})`
          )
        }
        if (cancelled) return
        if (typeof body.title === 'string' && body.title.trim()) setPageTitle(body.title.trim())
        if (typeof body.subtitle === 'string' && body.subtitle.trim()) setSubtitle(body.subtitle.trim())
        setArticles(Array.isArray(body.articles) ? body.articles : [])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load')
          setArticles([])
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

  useEffect(() => {
    setPage(1)
  }, [activeTab, search])

  const activeArticles = useMemo(
    () => articles.filter((a) => a.active !== false),
    [articles]
  )

  /** Recent: exactly 4 slots — left, big right, 2 bottom */
  const recentLayout = useMemo(() => {
    const featured = byPlacement(activeArticles, 'featured')[0] || null
    const grid = byPlacement(activeArticles, 'grid')
    const bottom = byPlacement(activeArticles, 'bottom')

    const used = new Set<string>()
    const take = (pool: Article[], fallbackPool: Article[]) => {
      const fromPool = pool.find((a) => !used.has(a.id))
      if (fromPool) {
        used.add(fromPool.id)
        return fromPool
      }
      const fromFallback = fallbackPool.find((a) => !used.has(a.id))
      if (fromFallback) {
        used.add(fromFallback.id)
        return fromFallback
      }
      return null
    }

    const sortedAll = [...activeArticles].sort(
      (a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
    )

    const bigRight = featured || take(sortedAll, [])
    const left = take(grid, sortedAll)
    const bottomLeft = take(bottom, sortedAll)
    const bottomRight = take(bottom, sortedAll)

    return { left, bigRight, bottomLeft, bottomRight }
  }, [activeArticles])

  const listArticles = useMemo(() => {
    return activeArticles
      .filter((a) => {
        if (!matchesSearch(a, search)) return false
        if (activeTab === 'All' || activeTab === 'Recent') return true
        return a.topic === activeTab
      })
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
  }, [activeArticles, activeTab, search])

  const totalPages = Math.max(1, Math.ceil(listArticles.length / ALL_PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageArticles = listArticles.slice(
    (safePage - 1) * ALL_PAGE_SIZE,
    safePage * ALL_PAGE_SIZE
  )

  const showRecent = activeTab === 'Recent' && !search.trim()
  const showPaged = activeTab === 'All' || activeTab === 'Macro' || activeTab === 'Technical' || activeTab === 'Psychology' || !!search.trim()

  return (
    <div>
      <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
        <div className="mb-3 flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 13.5C9.82843 13.5 10.5 12.8284 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8284 8.17157 13.5 9 13.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.625 4.5H15.375" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.25 7.5H15.75" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 7.5V10.5" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.25 10.5V7.5C2.25 4.67157 2.25 3.25736 3.12868 2.37868C4.00736 1.5 5.42157 1.5 8.25 1.5H9.75C12.5784 1.5 13.9927 1.5 14.8713 2.37868C15.75 3.25736 15.75 4.67157 15.75 7.5V10.5C15.75 13.3284 15.75 14.7427 14.8713 15.6213C13.9927 16.5 12.5784 16.5 9.75 16.5H8.25C5.42157 16.5 4.00736 16.5 3.12868 15.6213C2.25 14.7427 2.25 13.3284 2.25 10.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Education Center</span>
        </div>
        <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
          {pageTitle}
        </h1>
        <p className="text-[#838388] text-[12px] leading-[17px]">{subtitle}</p>
      </div>

      <div className="px-4 lg:px-6">
        {loading && <p className="text-white/40 text-[13px] mb-3">Loading library…</p>}
        {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="overflow-x-auto">
            <div className="flex items-center sm:gap-2 p-1 bg-[#16161F] w-fit border border-[#FFFFFF0D] min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-[13px] sm:text-[14px] leading-[20px] transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-white bg-[#FFFFFF0D] font-semibold'
                      : 'font-normal text-[#838388] hover:text-white/70'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {showPaged && (
              <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
            )}
            <div className="flex items-center gap-1.5 bg-[#16161F] border border-[#FFFFFF0D] px-3 py-[9px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M12.75 12.75L15.75 15.75"
                  stroke="#838388"
                  strokeWidth="1.125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25Z"
                  stroke="#838388"
                  strokeWidth="1.125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles"
                className="bg-transparent text-white text-[12px] leading-[17px] placeholder:text-[#838388] outline-none w-full"
              />
            </div>
          </div>
        </div>

        {showRecent && (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="min-h-0">
                {recentLayout.left ? (
                  <SmallCard card={recentLayout.left} onOpen={setSelected} />
                ) : (
                  <div className="bg-[#16161F] h-full min-h-[220px]" />
                )}
              </div>

              {recentLayout.bigRight ? (
                (() => {
                  const featured = recentLayout.bigRight
                  return (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelected(featured)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelected(featured)
                      }}
                      className="bg-[#16161F] sm:p-5 flex flex-col gap-0 sm:gap-5 cursor-pointer transition-colors h-full hover:bg-[#1A1A24]"
                    >
                      <div className="flex-1 bg-[#FFFFFF08] min-h-[180px] sm:min-h-[260px] xl:min-h-[320px]" />
                      <div className="p-3 sm:p-0">
                        <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">
                          {topicLabel(featured)}
                        </span>
                        <h2 className="text-white text-[16px] lg:text-[22px] 2xl:text-[28px] leading-5 lg:leading-[28px] 2xl:leading-[34px] font-semibold my-2 sm:my-4">
                          {featured.title}
                        </h2>
                        {featured.desc ? (
                          <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] mb-3 sm:mb-4 line-clamp-4">
                            {featured.desc}
                          </p>
                        ) : null}
                        <p className="text-[#838388] text-[12px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal">
                          By {featured.author} • {featured.date}
                        </p>
                      </div>
                    </div>
                  )
                })()
              ) : (
                <div className="bg-[#16161F] min-h-[220px]" />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {recentLayout.bottomLeft && (
                <BottomCard card={recentLayout.bottomLeft} onOpen={setSelected} />
              )}
              {recentLayout.bottomRight && (
                <BottomCard card={recentLayout.bottomRight} onOpen={setSelected} />
              )}
            </div>
          </>
        )}

        {showPaged && (
          pageArticles.length === 0 && !loading ? (
            <p className="text-[#838388] text-[13px] py-8">No articles match.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {pageArticles.map((card) => (
                <SmallCard key={card.id} card={card} onOpen={setSelected} />
              ))}
            </div>
          )
        )}
      </div>

      {selected && (
        <ContentDetailModal
          item={{
            title: selected.title,
            subtitle: selected.desc,
            tags: [selected.topic, selected.level],
            author: selected.author,
            date: selected.date,
            desc: selected.desc,
            contentHtml: selected.contentHtml,
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
