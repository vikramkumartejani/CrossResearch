'use client'

import { useEffect, useMemo, useState } from 'react'
import type { MarketReportsPage, Report } from './reportData'
import ReportDetailModal from './ReportDetailModal'
import ChartLoader from '../shared/ChartLoader'
import DeskMarketSignals from './DeskMarketSignals'
import { media } from '@/lib/media'

type PubTab = 'latest' | 'read' | 'themes'

const ACCENT = '#88C4FF'

const EMPTY_PAGE: MarketReportsPage = {
  eyebrow: '',
  title: '',
  subtitle: '',
}

function formatLabel(label: string) {
  const t = label.trim()
  if (!t) return t
  if (t !== t.toUpperCase()) return t
  return t
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 h-[22px] rounded-full border border-white/15 text-[#C8CDD6] text-[11px] leading-none font-medium whitespace-nowrap normal-case">
      {formatLabel(label)}
    </span>
  )
}

function PubSpark({ up = true }: { up?: boolean }) {
  const stroke = up ? '#2CB37B' : '#E25C3F'
  return (
    <div className="w-[52px] h-[52px] rounded bg-[#0B0E14] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none" aria-hidden>
        <path
          d="M1 14 L8 11 L14 13 L20 6 L28 9 L35 3"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function YieldChart({ title }: { title: string }) {
  const [range, setRange] = useState('1Y')
  const ranges = ['1Y', '3Y', '5Y', '10Y']

  return (
    <div className="h-full min-h-[320px] sm:min-h-[360px] flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-white/90 text-[13px] font-medium truncate">{title}</p>
        <div className="flex items-center gap-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2 py-1 text-[11px] leading-none font-medium cursor-pointer transition-colors ${
                range === r
                  ? 'text-white border border-white/25'
                  : 'text-[#8B8B93] border border-transparent hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 min-h-[280px] sm:min-h-[320px] rounded-sm bg-[#0B0E14] border border-white/[0.06] overflow-hidden">
        <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
          {[40, 80, 120, 160, 200].map((y) => (
            <line key={y} x1="16" y1={y} x2="384" y2={y} stroke="#FFFFFF0F" strokeWidth="1" />
          ))}
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="16" x2={x} y2="204" stroke="#FFFFFF08" strokeWidth="1" />
          ))}
          <path
            d="M20 150 C50 145, 70 160, 95 130 C120 100, 145 115, 170 85 C195 55, 220 70, 245 48 C270 30, 295 55, 320 42 C340 34, 360 50, 380 58"
            fill="none"
            stroke="#88C4FF"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="245" cy="48" r="4" fill="#88C4FF" />
          <rect x="210" y="18" width="58" height="18" rx="3" fill="#16161F" stroke="#88C4FF55" />
          <text x="239" y="31" textAnchor="middle" fill="#88C4FF" fontSize="10" fontWeight="600">
            5.337%
          </text>
          <rect x="352" y="50" width="40" height="16" rx="2" fill="#88C4FF" />
          <text x="372" y="61.5" textAnchor="middle" fill="#0B0E14" fontSize="9" fontWeight="700">
            4.283
          </text>
        </svg>
        <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] text-[#8B8B93]">
          <span>Mar</span>
          <span>Jun</span>
          <span>Sep</span>
          <span>Dec</span>
          <span>Mar</span>
        </div>
      </div>
    </div>
  )
}

export default function MarketReport() {
  const [selected, setSelected] = useState<Report | null>(null)
  const [page, setPage] = useState<MarketReportsPage>(EMPTY_PAGE)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pubTab, setPubTab] = useState<PubTab>('latest')

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/market-reports', {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Failed to load market reports')
        const data = await res.json()
        if (cancelled) return

        setPage({
          eyebrow: data.page?.eyebrow || 'Global Macro Research',
          title: data.page?.title || 'Research & Strategy Desk',
          subtitle:
            data.page?.subtitle ||
            'Independent research, macro views and market intelligence for a more informed tomorrow.',
        })
        setReports(Array.isArray(data.reports) ? [...data.reports] : [])
      } catch (err) {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) return
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  const mains = useMemo(
    () =>
      [...reports]
        .filter((r) => r && String(r.placement || 'main') !== 'sidebar')
        .sort((a, b) => Number(b.id) - Number(a.id)),
    [reports]
  )

  const featured = mains[0] || null

  /** Right rail prefers CMS sidebar rows (matches the mock list), then other mains. */
  const railReports = useMemo(() => {
    const sides = [...reports]
      .filter((r) => String(r.placement) === 'sidebar')
      .sort((a, b) => Number(b.id) - Number(a.id))
    const otherMains = mains.slice(1)
    const seen = new Set<number>()
    const out: Report[] = []
    for (const r of [...sides, ...otherMains]) {
      if (featured && r.id === featured.id) continue
      if (seen.has(r.id)) continue
      seen.add(r.id)
      out.push(r)
    }
    return out
  }, [reports, mains, featured])

  const themes = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of reports) {
      for (const t of r.tags || []) counts.set(t, (counts.get(t) || 0) + 1)
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }))
  }, [reports])

  const publications = useMemo(() => {
    const list = [...railReports]
    if (pubTab === 'read') list.sort((a, b) => Number(b.id) - Number(a.id))
    return list
  }, [railReports, pubTab])

  return (
    <div className="min-h-full w-full">
      {loading && (
        <div className="px-4 lg:px-6">
          <ChartLoader className="min-h-[360px]" />
        </div>
      )}

      {!loading && (
        <>
          <div className="px-4 lg:px-6 pt-1 pb-6 mb-5 border-b border-white/[0.06]">
            <div className="flex flex-col xl:flex-row xl:items-stretch xl:justify-between gap-6">
              <div className="max-w-[520px] shrink-0 flex flex-col justify-center">
                <p className="text-[#838388] text-[12px] leading-[14px] font-medium mb-2 normal-case">
                  {formatLabel(page.eyebrow || 'Global Macro Research')}
                </p>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2 normal-case">
                  {page.title || 'Research & Strategy Desk'}
                </h1>
                <p className="text-[#8B8B93] text-[13px] leading-[18px]">
                  {page.subtitle ||
                    'Independent research, macro views and market intelligence for a more informed tomorrow.'}
                </p>
              </div>
              <DeskMarketSignals />
            </div>
          </div>

          {error && <div className="px-4 lg:px-6 text-[#E25C3F] text-[13px] py-8">{error}</div>}

          {!error && (
            <div className="px-4 lg:px-6 pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.95fr)] gap-5 items-stretch">
                {/* LEFT: Featured Research */}
                <section className="rounded-lg border border-white/[0.08] bg-[#12151C] overflow-hidden min-w-0 flex flex-col">
                  {featured ? (
                    <>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col min-h-0">
                        <div className="flex items-center gap-2 mb-5 shrink-0">
                          <span className="w-[3px] h-3.5 rounded-sm" style={{ background: ACCENT }} />
                          <span
                            className="text-[12px] leading-[14px] font-medium normal-case"
                            style={{ color: ACCENT }}
                          >
                            Featured Research
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 items-stretch flex-1 min-h-0">
                          <div className="min-w-0 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {(featured.tags || []).map((t) => (
                                <Tag key={t} label={t} />
                              ))}
                            </div>

                            <p className="text-[#8B8B93] text-[12px] leading-[14px] font-medium mb-2 normal-case">
                              {formatLabel(featured.author || 'CrossResearch Macro Desk')}
                            </p>

                            <h2 className="text-white text-[22px] sm:text-[26px] font-medium leading-[1.2] mb-3 normal-case">
                              {featured.title}
                            </h2>

                            {featured.subtitle ? (
                              <p className="text-[#88C4FF] text-[14px] leading-[20px] font-medium mb-3">
                                {featured.subtitle}
                              </p>
                            ) : null}

                            <p className="text-[#B0B4BD] text-[13px] sm:text-[14px] leading-[21px] mb-5 flex-1">
                              {featured.body}
                            </p>

                            <button
                              type="button"
                              onClick={() => setSelected(featured)}
                              className="text-[14px] font-medium hover:underline cursor-pointer self-start mt-auto"
                              style={{ color: ACCENT }}
                            >
                              Read Full Report →
                            </button>
                          </div>

                          <div className="min-w-0 h-full flex flex-col min-h-[280px]">
                            {featured.chartImage ? (
                              <div className="flex flex-col h-full min-h-0">
                                <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
                                  <p className="text-white/90 text-[13px] font-medium truncate">
                                    {featured.track || 'Desk Chart'}
                                  </p>
                                </div>
                                <div className="relative flex-1 min-h-[240px] rounded-sm bg-[#0B0E14] border border-white/[0.06] overflow-hidden">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={media(featured.chartImage)}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="h-full min-h-[280px]">
                                <YieldChart title={featured.track || 'U.S. 30Y Yield (TV)'} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 py-3.5 border-t border-white/[0.06] flex items-center justify-between gap-3 text-[12px] shrink-0 mt-auto">
                        <span className="text-[#8B8B93] normal-case">
                          {formatLabel(featured.author || 'CrossResearch Macro Desk')}
                        </span>
                        <span className="text-[#B0B4BD]">
                          {featured.date}
                          {featured.readTime ? ` | ${featured.readTime}` : ''}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-[#8B8B93] text-[13px]">No featured research published yet.</div>
                  )}
                </section>

                {/* RIGHT: height locked to featured; list scrolls when longer */}
                <div className="relative min-w-0 min-h-[420px] lg:min-h-0 self-stretch">
                  <aside className="rounded-lg border border-white/[0.08] bg-[#12151C] p-4 sm:p-5 flex flex-col overflow-hidden lg:absolute lg:inset-0">
                    <div className="flex items-start justify-between gap-2 mb-4 shrink-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {(
                          [
                            { id: 'latest', label: 'Latest Publications' },
                            { id: 'read', label: 'Most Read' },
                            { id: 'themes', label: 'Top Themes' },
                          ] as const
                        ).map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setPubTab(t.id)}
                            className={`text-[12px] sm:text-[13px] font-medium pb-1.5 cursor-pointer transition-colors border-b-2 ${
                              pubTab === t.id
                                ? 'text-white'
                                : 'text-[#8B8B93] border-transparent hover:text-white'
                            }`}
                            style={pubTab === t.id ? { borderColor: ACCENT } : undefined}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => publications[0] && setSelected(publications[0])}
                        className="text-[12px] font-medium hover:underline cursor-pointer whitespace-nowrap shrink-0"
                        style={{ color: ACCENT }}
                      >
                        View All →
                      </button>
                    </div>

                    {pubTab === 'themes' ? (
                      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto dashboard-scroll pr-1">
                        {themes.length === 0 && (
                          <p className="text-[#8B8B93] text-[12px] py-8">No themes yet.</p>
                        )}
                        {themes.map((t) => (
                          <div
                            key={t.tag}
                            className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0"
                          >
                            <span className="text-white text-[14px] font-medium">{t.tag}</span>
                            <span className="text-[#8B8B93] text-[12px]">{t.count}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto dashboard-scroll pr-1">
                        {publications.length === 0 && (
                          <p className="text-[#8B8B93] text-[12px] py-8">No publications yet.</p>
                        )}
                        {publications.map((r, i) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelected(r)}
                            className="flex items-start gap-3 py-3.5 border-b border-white/[0.06] last:border-0 text-left hover:bg-white/[0.02] transition-colors cursor-pointer w-full shrink-0"
                          >
                            {r.chartImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={media(r.chartImage)}
                                alt=""
                                className="w-[52px] h-[52px] object-cover rounded bg-[#0B0E14] flex-shrink-0"
                              />
                            ) : (
                              <PubSpark up={i % 2 === 0} />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap gap-1.5 mb-1.5">
                                {(r.tags || []).slice(0, 2).map((t) => (
                                  <Tag key={t} label={t} />
                                ))}
                              </div>
                              <p className="text-white text-[14px] leading-[18px] font-medium mb-1 line-clamp-1 normal-case">
                                {r.title}
                              </p>
                              <p className="text-[#8B8B93] text-[12px] leading-[16px] line-clamp-1">
                                {r.subtitle || r.body}
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-right w-[78px] pt-0.5">
                              <p className="text-[#8B8B93] text-[11px] leading-[14px]">
                                {r.readTime || '-'}
                              </p>
                              <p className="text-[#8B8B93] text-[11px] leading-[14px] mt-1">{r.date}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </aside>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {selected && <ReportDetailModal report={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
