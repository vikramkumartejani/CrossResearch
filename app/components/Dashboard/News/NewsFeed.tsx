'use client'
import { useEffect, useMemo, useState } from 'react'

interface NewsItem {
    id?: string
    category: string
    source: string
    time: string
    impact: string
    impactColor: string
    title: string
    desc: string
    url?: string
}

interface Featured {
    tag?: string
    title: string
    desc: string
    url?: string
}

interface Tab {
    id: string
    label: string
    count: number
}

const FALLBACK_TABS = ['All', 'Macro', 'Rates', 'Geopolitics', 'Energy', 'Equities', 'Crypto', 'Regulation']

export default function NewsFeed() {
    const [activeTab, setActiveTab] = useState('All')
    const [items, setItems] = useState<NewsItem[]>([])
    const [featured, setFeatured] = useState<Featured | null>(null)
    const [tabs, setTabs] = useState<Tab[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
                    impact: String(n.impact || 'Low Impact'),
                    impactColor: String(n.impactColor || 'text-[#2796FF]'),
                    title: String(n.title || ''),
                    desc: String(n.desc || n.summary || ''),
                    url: n.url,
                }))
                setItems(list)
                setFeatured(
                    body.featured
                        ? {
                              tag: body.featured.tag || 'Top Of The Wire',
                              title: String(body.featured.title || ''),
                              desc: String(body.featured.desc || ''),
                              url: body.featured.url,
                          }
                        : null
                )
                const apiTabs: Tab[] = Array.isArray(body.tabs)
                    ? body.tabs.map((t: any) => ({
                          id: String(t.id || t.label),
                          label: String(t.label || t.id),
                          count: Number(t.count || 0),
                      }))
                    : []
                setTabs(apiTabs.length ? apiTabs : FALLBACK_TABS.map((id) => ({ id, label: id, count: 0 })))
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load news')
                    setItems([])
                    setFeatured(null)
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

    const filtered = useMemo(
        () => (activeTab === 'All' ? items : items.filter((n) => n.category === activeTab)),
        [items, activeTab]
    )

    const visibleTabs = tabs.length
        ? tabs
        : FALLBACK_TABS.map((id) => ({ id, label: id, count: 0 }))

    return (
        <div className="flex flex-col">
            <div className="bg-[#16161F] p-3 sm:p-4 mb-4 sm:mb-5">
                <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] font-medium">
                    {featured?.tag || 'Top Of The Wire'}
                </span>
                {loading && !featured ? (
                    <p className="text-white/40 text-[14px] mt-3">Loading top of the wire…</p>
                ) : featured ? (
                    <>
                        <h2 className="text-white text-[18px] sm:text-[34px] leading-[24px] sm:leading-[44px] font-semibold my-2 sm:my-3">
                            {featured.url ? (
                                <a href={featured.url} target="_blank" rel="noreferrer" className="hover:underline">
                                    {featured.title}
                                </a>
                            ) : (
                                featured.title
                            )}
                        </h2>
                        <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[16px] sm:leading-[24px] font-normal sm:max-w-[850px]">
                            {featured.desc}
                        </p>
                    </>
                ) : (
                    <p className="text-white/40 text-[14px] mt-3">No featured story yet.</p>
                )}
            </div>

            <div className="overflow-x-auto mb-4 sm:mb-5">
                <div className="flex items-center sm:gap-2 p-1 bg-[#16161F] border border-[#FFFFFF0D] w-fit min-w-max">
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1 text-[13px] sm:text-[14px] leading-[20px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'text-white bg-[#FFFFFF0D]'
                                    : 'text-[#838388] hover:text-white/70'
                            }`}
                        >
                            {tab.label}
                            {tab.id !== 'All' && tab.count > 0 ? (
                                <span className="ml-1 text-white/30 font-normal">{tab.count}</span>
                            ) : null}
                        </button>
                    ))}
                </div>
            </div>

            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}
            {loading && <p className="text-white/40 text-[13px] mb-3">Loading wire…</p>}
            {!loading && !error && filtered.length === 0 && (
                <p className="text-white/40 text-[13px] mb-3">No stories in this category.</p>
            )}

            <div className="flex flex-col gap-2.5 sm:gap-4">
                {filtered.map((item, i) => (
                    <div key={item.id || i} className="p-3 sm:p-4 bg-[#16161F] cursor-pointer">
                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[20px] font-normal">
                                    {item.category}
                                </span>
                                <span className="text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal">
                                    • {item.source}
                                </span>
                                <span className="bg-[#FFFFFF08] rounded-full px-2.5 py-1 text-white/60 text-[12px] leading-[14px] font-normal">
                                    {item.time}
                                </span>
                            </div>
                            <span className={`text-[12px] leading-[16px] font-medium flex-shrink-0 ${item.impactColor}`}>
                                {item.impact}
                            </span>
                        </div>
                        <h3 className="text-white text-[14px] sm:text-[20px] leading-[20px] sm:leading-[24px] font-semibold mb-1.5">
                            {item.url ? (
                                <a href={item.url} target="_blank" rel="noreferrer" className="hover:underline">
                                    {item.title}
                                </a>
                            ) : (
                                item.title
                            )}
                        </h3>
                        <p className="text-[#838388] text-[13px] sm:text-[14px] leading-[20px] sm:leading-[21px] font-normal sm:max-w-[850px]">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
