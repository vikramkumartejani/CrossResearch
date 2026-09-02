'use client'

import { useEffect, useMemo, useState } from 'react'
import ContentDetailModal from '../shared/ContentDetailModal'
import LockedSection from '../LockedSection'
import ChartLoader from '../shared/ChartLoader'
import ContentCardImage from '../shared/ContentCardImage'
import { strategyImage } from '@/lib/contentPictures'

const TABS = ['Recent', 'Momentum', 'Reversals', 'Breakouts', 'All'] as const
type Tab = (typeof TABS)[number]
type StrategyType = 'Momentum' | 'Reversion' | 'Breakouts'
type Placement = 'featured' | 'grid' | 'bottom'

type Strategy = {
  id: string
  type: StrategyType
  title: string
  desc?: string
  contentHtml?: string
  image?: string | null
  tag?: string | null
  author: string
  date: string
  placement: Placement
  sort_order: number
  active: boolean
}

const ALL_PAGE_SIZE = 8

function matchesTab(item: Strategy, tab: Tab) {
  if (tab === 'Recent' || tab === 'All') return true
  if (tab === 'Reversals') return item.type === 'Reversion'
  return item.type === tab
}

function matchesSearch(item: Strategy, search: string) {
  const q = search.trim().toLowerCase()
  if (!q) return true
  return [item.title, item.desc, item.author, item.type, item.tag]
    .filter(Boolean)
    .some((v) => String(v).toLowerCase().includes(q))
}

function byPlacement(list: Strategy[], placement: Placement) {
  return list
    .filter((a) => a.placement === placement && a.active !== false)
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
}

function SmallCard({
  card,
  onOpen,
  imageVariant = 'grid',
  fillHeight = false,
}: {
  card: Strategy
  onOpen: (card: Strategy) => void
  imageVariant?: 'grid' | 'grid-recent'
  fillHeight?: boolean
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(card)
      }}
      className={`bg-[#16161F] flex flex-col cursor-pointer transition-colors hover:bg-[#1A1A24]${fillHeight ? ' h-full' : ''}`}
    >
      <div
        className={
          fillHeight
            ? 'flex-1 min-h-[160px] sm:min-h-[199px] relative overflow-hidden'
            : 'h-[160px] sm:h-[199px] shrink-0 relative overflow-hidden'
        }
      >
        <ContentCardImage src={strategyImage(card, imageVariant)} alt={card.title} />
        {card.tag && (
          <div className="absolute z-10 top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.2" />
              <path d="M7.125 12V6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M8.25 6V4.5M10.125 6V4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M8.25 13.5V12M10.125 13.5V12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M7.125 9H10.875C11.4963 9 12 9.5037 12 10.125V10.875C12 11.4963 11.4963 12 10.875 12H6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6H10.875C11.4963 6 12 6.50368 12 7.125V7.875C12 8.4963 11.4963 9 10.875 9H7.125" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white text-[12px] sm:text-[16px] leading-[19px] font-medium line-clamp-1">
              {card.tag}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[12px] sm:text-[14px] leading-[17px] font-medium text-[#88C4FF]">{card.type}</p>
        <p className="2xl:pr-8 text-white text-[16px] sm:text-[18px] 2xl:text-[22px] leading-[20px] sm:leading-6 2xl:leading-[29px] font-medium mt-2 2xl:mt-3 mb-2">
          {card.title}
        </p>
        <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">
          By {card.author} • {card.date}
        </p>
      </div>
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

export default function TradingStrategies() {
  const [activeTab, setActiveTab] = useState<Tab>('Recent')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageTitle, setPageTitle] = useState('Playbooks')
  const [subtitle, setSubtitle] = useState(
    'Trading strategy playbooks by Momentum, Reversion, and Breakouts - browse recent setups or filter by style.'
  )
  const [items, setItems] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Strategy | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/trading-strategies', { cache: 'no-store' })
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
        setItems(Array.isArray(body.items) ? body.items : [])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load')
          setItems([])
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

  const activeItems = useMemo(() => items.filter((item) => item.active !== false), [items])

  const featured = useMemo(() => byPlacement(items, 'featured')[0] || null, [items])
  const gridCards = useMemo(
    () =>
      byPlacement(items, 'grid').filter((c) => matchesTab(c, activeTab) && matchesSearch(c, search)),
    [items, activeTab, search]
  )
  const bottomCards = useMemo(
    () =>
      byPlacement(items, 'bottom').filter(
        (c) => matchesTab(c, activeTab) && matchesSearch(c, search)
      ),
    [items, activeTab, search]
  )
  const showFeatured =
    !!featured && matchesTab(featured, activeTab) && matchesSearch(featured, search)

  const listItems = useMemo(
    () =>
      activeItems
        .filter((item) => matchesTab(item, activeTab) && matchesSearch(item, search))
        .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)),
    [activeItems, activeTab, search]
  )
  const totalPages = Math.max(1, Math.ceil(listItems.length / ALL_PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = listItems.slice(
    (safePage - 1) * ALL_PAGE_SIZE,
    safePage * ALL_PAGE_SIZE
  )
  const showRecent = activeTab === 'Recent' && !search.trim()
  const showPaged = activeTab !== 'Recent' || !!search.trim()

  return (
    <div>
      <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
        <div className="mb-3 flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.125 9C16.125 12.935 12.935 16.125 9 16.125C7.77893 16.125 6.62955 15.8178 5.625 15.2765C4.22383 14.5215 3.28097 15.2234 2.44944 15.3494C2.3233 15.3685 2.19768 15.3227 2.10748 15.2325C1.97056 15.0956 1.9445 14.8838 2.02013 14.7056C2.34649 13.9364 2.64615 12.4787 2.23756 11.25C2.00235 10.5428 1.875 9.78623 1.875 9C1.875 5.06497 5.06497 1.875 9 1.875C12.935 1.875 16.125 5.06497 16.125 9Z" stroke="#838388" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.09427 9H9.00052M6.09375 9H6M12.0937 9H12M9.18802 9C9.18802 9.10358 9.1041 9.1875 9.00052 9.1875C8.89702 9.1875 8.81302 9.10358 8.81302 9C8.81302 8.89643 8.89702 8.8125 9.00052 8.8125C9.1041 8.8125 9.18802 8.89643 9.18802 9ZM6.1875 9C6.1875 9.10358 6.10355 9.1875 6 9.1875C5.89645 9.1875 5.8125 9.10358 5.8125 9C5.8125 8.89643 5.89645 8.8125 6 8.8125C6.10355 8.8125 6.1875 8.89643 6.1875 9ZM12.1875 9C12.1875 9.10358 12.1036 9.1875 12 9.1875C11.8964 9.1875 11.8125 9.10358 11.8125 9C11.8125 8.89643 11.8964 8.8125 12 8.8125C12.1036 8.8125 12.1875 8.89643 12.1875 9Z" stroke="#838388" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Trading Strategies</span>
        </div>
        <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
          {pageTitle}
        </h1>
        <p className="text-[#838388] text-[12px] leading-[17px]">{subtitle}</p>
      </div>

      <div className="px-4 lg:px-6">
        {loading && <ChartLoader className="min-h-[180px] mb-3" />}
        {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="overflow-x-auto">
            <div className="flex items-center sm:gap-2 p-1 bg-[#16161F] w-fit border border-[#FFFFFF0D] min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setPage(1)
                  }}
                  className={`px-3 py-1 text-[13px] sm:text-[14px] leading-[20px] transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab ? 'text-white bg-[#FFFFFF0D] font-semibold' : 'font-normal text-[#838388] hover:text-white/70'}`}
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
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M12.75 12.75L15.75 15.75" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25Z" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder="Search Strategies"
                className="bg-transparent text-white text-[12px] leading-[17px] placeholder:text-[#838388] outline-none w-full"
              />
            </div>
          </div>
        </div>

        {showRecent && (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4 mb-3 sm:mb-4">
              {showFeatured && featured ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(featured)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelected(featured)
                  }}
                  className="bg-[#16161F] p-0 sm:p-5 flex flex-col gap-0 sm:gap-5 cursor-pointer transition-colors hover:bg-[#1A1A24] overflow-hidden h-full min-h-0"
                >
                  <div className="flex-1 min-h-[160px] sm:min-h-[220px] xl:min-h-[481px] overflow-hidden">
                    <ContentCardImage
                      src={strategyImage(featured, 'featured')}
                      alt={featured.title}
                    />
                  </div>
                  <div className="p-3 sm:p-0">
                    <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">
                      {featured.type}
                    </span>
                    <h2 className="text-white text-[16px] lg:text-[20px] 2xl:text-[32px] leading-5 lg:leading-[24px] 2xl:leading-[38px] font-semibold my-2 sm:my-4">
                      {featured.title}
                    </h2>
                    <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] mb-3 sm:mb-4">
                      {featured.desc}
                    </p>
                    <p className="text-[#838388] text-[12px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal">
                      By {featured.author} • {featured.date}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="hidden xl:block" />
              )}

              <LockedSection required="platinum" title="Strategy Cards" showHeading={false} contentClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full">
                {gridCards.map((card) => (
                  <SmallCard key={card.id} card={card} onOpen={setSelected} imageVariant="grid-recent" fillHeight />
                ))}
              </LockedSection>
            </div>

            <LockedSection required="platinum" title="More Strategies" showHeading={false} contentClassName="grid grid-cols-1 lg:grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_724px] gap-3 sm:gap-4">
              {bottomCards.map((card) => (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(card)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelected(card)
                  }}
                  className="bg-[#16161F] p-3 sm:p-4 cursor-pointer transition-colors hover:bg-[#1A1A24]"
                >
                  <span className="text-[12px] sm:text-[16px] leading-[17px] sm:leading-[19px] font-medium text-[#88C4FF]">
                    {card.type}
                  </span>
                  <h3 className="text-white text-[16px] lg:text-[20px] 2xl:text-[32px] leading-5 lg:leading-[24px] 2xl:leading-[38px] font-semibold my-2 sm:my-3">
                    {card.title}
                  </h3>
                  <p className="text-[#838388] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[24px] font-normal mb-2 sm:mb-3">
                    {card.desc}
                  </p>
                  <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[22px]">
                    By {card.author} • {card.date}
                  </p>
                </div>
              ))}
            </LockedSection>
          </>
        )}

        {showPaged &&
          (pageItems.length === 0 && !loading ? (
            <p className="text-[#838388] text-[13px] py-8">No strategies match.</p>
          ) : (
            <LockedSection required="platinum" title="Strategy Library" showHeading={false}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                {pageItems.map((card) => (
                  <SmallCard key={card.id} card={card} onOpen={setSelected} />
                ))}
              </div>
            </LockedSection>
          ))}
      </div>

      {selected && (
        <ContentDetailModal
          item={{
            title: selected.title,
            subtitle: selected.desc,
            tags: [selected.type, ...(selected.tag ? [selected.tag] : [])],
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
