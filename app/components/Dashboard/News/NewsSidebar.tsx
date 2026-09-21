'use client'

import { useEffect, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'
import BloombergTv from '../shared/BloombergTv'

type ChangeTone = 'up' | 'down' | 'flat'

interface SignalRow {
  id?: string
  name: string
  detail: string
  last: string
  d1: string
  d5: string
  m3: string
  z: string
  d1Tone: ChangeTone
  d5Tone: ChangeTone
  m3Tone: ChangeTone
  zTone: ChangeTone
  accent: string
}

function toneClass(tone: ChangeTone) {
  if (tone === 'up') return 'text-[#2CB37B]'
  if (tone === 'down') return 'text-[#E25C3F]'
  return 'text-white/50'
}

function mapTone(value: unknown): ChangeTone {
  const tone = String(value || 'flat').toLowerCase()
  if (tone === 'up') return 'up'
  if (tone === 'down' || tone === 'dn') return 'down'
  return 'flat'
}

const MOST_READ = [
  { num: '01', title: 'Fed Signals Prolonged Hold as Inflation Pressure Lingers', source: 'Reuters' },
  { num: '02', title: 'Bitcoin Breaches $85K as ETF Inflows Accelerate', source: 'Bloomberg' },
  { num: '03', title: 'Tech Stocks Rally Amid Strong Earnings Reports', source: 'CNBC' },
  { num: '04', title: 'Oil Prices Surge After OPEC+ Cuts Production', source: 'MarketWatch' },
  { num: '05', title: 'US Job Market Remains Resilient Despite Rate Hikes', source: 'The Wall Street Journal' },
]

export default function NewsSidebar() {
  const [signals, setSignals] = useState<SignalRow[]>([])
  const [mostRead, setMostRead] = useState<{ num: string; title: string; source: string; url?: string }[]>(MOST_READ)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nextIn, setNextIn] = useState(45)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [signalsRes, newsRes] = await Promise.all([
          fetch('/api/market-signals', { cache: 'no-store' }),
          fetch('/api/news-wire', { cache: 'no-store' }),
        ])
        if (!signalsRes.ok) throw new Error('Failed to load market signals')
        const data = await signalsRes.json()
        if (cancelled) return

        const rows: SignalRow[] = (data.market_signals || []).map((row: any) => ({
          id: row.id,
          name: String(row.name || ''),
          detail: String(row.detail || ''),
          last: String(row.last ?? '-'),
          d1: String(row.d1 ?? '-'),
          d5: String(row.d5 ?? '-'),
          m3: String(row.m3 ?? '-'),
          z: String(row.z ?? '-'),
          d1Tone: mapTone(row.d1_tone),
          d5Tone: mapTone(row.d5_tone),
          m3Tone: mapTone(row.m3_tone),
          zTone: mapTone(row.z_tone),
          accent: String(row.accent || '#88C4FF'),
        }))
        setSignals(rows)

        if (newsRes.ok) {
          const news = await newsRes.json()
          const mr = Array.isArray(news.most_read)
            ? news.most_read.map((item: any, i: number) => ({
                num: String(item.num || `${i + 1}`.padStart(2, '0')),
                title: String(item.title || ''),
                source: String(item.source || ''),
                url: item.url,
              }))
            : []
          if (mr.length) setMostRead(mr)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setNextIn((s) => (s <= 0 ? 45 : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const nextLabel = `Next In ${Math.floor(nextIn / 60)}:${String(nextIn % 60).padStart(2, '0')}`

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="shrink-0">
        <BloombergTv height={140} />
      </div>

      <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <p className="text-white text-[16px] leading-[19px] font-medium">Market Signals</p>
          <span className="text-white/50 text-[11px] sm:text-[12px] leading-[14px]">Live · FRED / Yahoo</span>
        </div>

        {loading && <ChartLoader className="min-h-[80px] py-6" />}
        {error && !loading && <p className="text-[#E25C3F] text-[12px] py-6">{error}</p>}
        {!loading && !error && signals.length === 0 && (
          <p className="text-[#838388] text-[12px] py-6">No market signals available.</p>
        )}

        {!loading && !error && signals.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr className="text-[#838388] text-[10px] sm:text-[11px] leading-[14px]">
                  <th className="text-left font-medium pb-2 pr-3">Signal</th>
                  <th className="text-right font-medium pb-2 px-1.5">Last</th>
                  <th className="text-right font-medium pb-2 px-1.5">1D</th>
                  <th className="text-right font-medium pb-2 px-1.5">5D</th>
                  <th className="text-right font-medium pb-2 pl-1.5">3M</th>
                </tr>
              </thead>
              <tbody>
                {signals.map((row) => (
                  <tr key={row.id || row.name} className="border-t border-[#FFFFFF0D]">
                    <td className="py-2.5 sm:py-3 pr-3 align-middle">
                      <div className="flex items-start gap-2">
                        <span
                          className="w-[3px] self-stretch min-h-[28px] flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: row.accent }}
                        />
                        <div className="min-w-0">
                          <p className="text-white text-[12px] sm:text-[13px] leading-[16px] font-medium">
                            {row.name}
                          </p>
                          <p className="text-[#838388] text-[10px] sm:text-[11px] leading-[14px] mt-0.5">
                            {row.detail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-1.5 text-right text-white text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap">
                      {row.last}
                    </td>
                    <td
                      className={`py-2.5 sm:py-3 px-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.d1Tone)}`}
                    >
                      {row.d1}
                    </td>
                    <td
                      className={`py-2.5 sm:py-3 px-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.d5Tone)}`}
                    >
                      {row.d5}
                    </td>
                    <td
                      className={`py-2.5 sm:py-3 pl-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.m3Tone)}`}
                    >
                      {row.m3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-white text-[16px] leading-[19px] font-medium">Today&apos;s Most Read</p>
          <span className="text-white/60 text-[12px] leading-[14px]">{nextLabel}</span>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {mostRead.map((item) => (
            <div key={item.num} className="flex gap-2 sm:gap-3 cursor-pointer group">
              <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium flex-shrink-0 mt-0.5">
                {item.num}
              </span>
              <div className="min-w-0">
                <p className="text-white text-[14px] sm:text-[15px] leading-5 font-medium group-hover:underline">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </p>
                <p className="text-white/60 text-[12px] leading-[14px] mt-1">{item.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
