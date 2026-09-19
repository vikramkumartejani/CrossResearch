'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import NewsRail, { topicToCategory, type NewsRailFilters } from './NewsRail'

interface NewsItem {
  id?: string
  category: string
  source: string
  time: string
  publishedAt?: string
  impact: string
  impactScore?: number
  title: string
  desc: string
  url?: string
}

const WIRE_TABS = [
  'All',
  'Top Stories',
  'Macro',
  'Markets',
  'Geopolitics',
  'Crypto',
  'Earnings',
  'Central Banks',
  'Energy',
]

const SOURCE_COLORS = ['#E25C3F', '#E8A020', '#2796FF', '#2CB37B', '#A855F7', '#88C4FF']

function sourceColor(source: string): string {
  let hash = 0
  for (let i = 0; i < source.length; i++) hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  return SOURCE_COLORS[hash % SOURCE_COLORS.length]
}

function clockTime(publishedAt?: string, fallback?: string): string {
  if (publishedAt) {
    const d = new Date(publishedAt)
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    }
  }
  // Relative strings like "Just now" - show as-is shortened
  if (fallback && /^\d{1,2}:\d{2}/.test(fallback)) return fallback
  return fallback || '--:--'
}

function isLive(item: NewsItem): boolean {
  const title = item.title.toLowerCase()
  if (title.includes(' live') || title.startsWith('live ') || title.includes('security council live')) {
    return true
  }
  if (item.time.toLowerCase().includes('just now')) return true
  if (item.publishedAt) {
    const t = new Date(item.publishedAt).getTime()
    if (Number.isFinite(t) && Date.now() - t < 15 * 60 * 1000) return true
  }
  return false
}

function matchesTab(item: NewsItem, tab: string): boolean {
  if (tab === 'All') return true
  if (tab === 'Top Stories') return (item.impactScore || 0) >= 55 || item.impact.toLowerCase().includes('high')
  if (tab === 'Markets') return item.category === 'Equities' || item.category === 'Macro'
  if (tab === 'Central Banks') return item.category === 'Rates'
  if (tab === 'Earnings') {
    return (
      item.category === 'Equities' &&
      /earn|guidance|eps|revenue|quarter/i.test(`${item.title} ${item.desc}`)
    )
  }
  return item.category === tab
}

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState('All')
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [rail, setRail] = useState<NewsRailFilters>({
    newsSection: 'top',
    topic: 'All Topics',
    source: 'All Sources',
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/news-wire', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(
            typeof body.detail === 'string'
              ? body.detail
              : body.error || `Failed to load news (${res.status})`
          )
        }
        if (cancelled) return
        const list: NewsItem[] = (body.items || []).map((n: any) => ({
          id: n.id,
          category: String(n.category || 'Macro'),
          source: String(n.source || 'Wire'),
          time: String(n.time || '-'),
          publishedAt: n.publishedAt ? String(n.publishedAt) : undefined,
          impact: String(n.impact || 'Low Impact'),
          impactScore: Number(n.impactScore || 0),
          title: String(n.title || ''),
          desc: String(n.desc || n.summary || ''),
          url: n.url,
        }))
        setItems(list)
        if (list[0]?.id) setSelectedId(list[0].id)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load news')
          setItems([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    const id = setInterval(load, 60_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const filtered = useMemo(() => {
    let list = items.filter((n) => matchesTab(n, activeTab))

    const topicCat = topicToCategory(rail.topic)
    if (topicCat) list = list.filter((n) => n.category === topicCat)

    if (rail.source !== 'All Sources') {
      const needle = rail.source.toLowerCase()
      list = list.filter((n) => n.source.toLowerCase().includes(needle.split(' ')[0].toLowerCase()))
    }

    if (rail.newsSection === 'top') {
      list = [...list].sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0))
    }

    return list
  }, [items, activeTab, rail])

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const tab of WIRE_TABS) {
      counts[tab] = items.filter((n) => matchesTab(n, tab)).length
    }
    return counts
  }, [items])

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 min-w-0 items-stretch h-full min-h-0 overflow-hidden">
      <div className="w-full lg:w-[220px] xl:w-[240px] flex-shrink-0 h-auto lg:h-full min-h-0 overflow-hidden">
        <NewsRail filters={rail} onChange={setRail} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col h-full min-h-0 overflow-hidden">
        <div className="overflow-x-auto mb-3 shrink-0">
          <div className="flex items-center gap-1 min-w-max">
            {WIRE_TABS.map((tab) => {
              const active = activeTab === tab
              const count = tabCounts[tab] || 0
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-[13px] leading-[16px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#88C4FF] text-[#0E0E16]'
                      : 'text-[#838388] hover:text-white bg-transparent'
                  }`}
                >
                  {tab}
                  {tab !== 'All' && count > 0 ? (
                    <span className={`ml-1 ${active ? 'text-[#0E0E16]/70' : 'text-white/30'}`}>{count}</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        {error && <p className="text-[#E25C3F] text-[13px] mb-2 shrink-0">{error}</p>}
        {loading && <ChartLoader className="min-h-[160px] mb-2 shrink-0" />}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-white/40 text-[13px] mb-2 shrink-0">No stories for this filter.</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="bg-[#16161F] border border-[#FFFFFF0D] flex-1 min-h-0 overflow-y-auto overflow-x-auto dashboard-scroll">
            <table className="w-full border-collapse min-w-[640px]">
              <thead className="sticky top-0 z-10 bg-[#16161F]">
                <tr className="border-b border-[#FFFFFF0D]">
                  <th className="pl-4 pr-3 py-2.5 text-left text-[#838388] text-[11px] font-medium w-[72px]">
                    Time
                  </th>
                  <th className="px-3 py-2.5 text-left text-[#838388] text-[11px] font-medium w-[140px]">
                    Source
                  </th>
                  <th className="pr-4 pl-3 py-2.5 text-left text-[#838388] text-[11px] font-medium">
                    Headline
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => {
                  const rowId = item.id || `row-${i}`
                  const active = selectedId === rowId
                  const live = isLive(item)
                  return (
                    <tr
                      key={rowId}
                      onClick={() => setSelectedId(rowId)}
                      className={`border-b border-[#FFFFFF08] last:border-0 cursor-pointer transition-colors ${
                        active ? 'bg-[#FFFFFF0A]' : 'hover:bg-[#FFFFFF05]'
                      }`}
                    >
                      <td className="pl-4 pr-3 py-3 align-middle text-[#838388] text-[13px] tabular-nums whitespace-nowrap">
                        {clockTime(item.publishedAt, item.time)}
                      </td>
                      <td className="px-3 py-3 align-middle">
                        <span className="inline-flex items-center gap-2 text-[13px] text-white/80">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: sourceColor(item.source) }}
                          />
                          <span className="truncate max-w-[120px]">{item.source}</span>
                        </span>
                      </td>
                      <td className="pr-4 pl-3 py-3 align-middle">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-white text-[14px] sm:text-[15px] leading-[20px] font-medium">
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {item.title}
                              </a>
                            ) : (
                              item.title
                            )}
                          </p>
                          {live && (
                            <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-sm bg-[#E25C3F] text-white text-[10px] leading-[14px] font-medium">
                              Live
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
