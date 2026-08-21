'use client'

import { useEffect, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

type Sector = {
    ticker: string
    name: string
    value: string
    label: string
    positive: boolean
}

const FALLBACK_SECTORS: Sector[] = [
    { ticker: 'XLK', name: 'Tech', value: '-', label: '-', positive: true },
    { ticker: 'SMH', name: 'Semis', value: '-', label: '-', positive: true },
    { ticker: 'XLF', name: 'Financials', value: '-', label: '-', positive: true },
    { ticker: 'XLE', name: 'Energy', value: '-', label: '-', positive: true },
    { ticker: 'IWM', name: 'Small Cap', value: '-', label: '-', positive: true },
    { ticker: 'QQQ', name: 'Nasdaq ETF', value: '-', label: '-', positive: true },
]

export default function SectorGammaDashboard() {
    const [sectors, setSectors] = useState<Sector[]>(FALLBACK_SECTORS)
    const [narrative, setNarrative] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/options-positioning', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || `Failed to load options positioning (${res.status})`
                    )
                }
                const nextSectors: Sector[] = Array.isArray(body.sectors)
                    ? body.sectors.map((s: Sector) => ({
                          ticker: s.ticker,
                          name: s.name,
                          value: s.value,
                          label: s.label,
                          positive: Boolean(s.positive),
                      }))
                    : []
                if (!cancelled) {
                    if (nextSectors.length) setSectors(nextSectors)
                    setNarrative(
                        typeof body.narrative === 'string' && body.narrative
                            ? body.narrative
                            : 'No composite narrative available.'
                    )
                    setTags(Array.isArray(body.narrative_tags) ? body.narrative_tags : [])
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load sector gamma')
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

    return (
        <div className="mb-4 sm:mb-5 bg-[#16161F] p-3 sm:p-5 grow h-full min-h-0 flex flex-col">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-2">Sector Gamma Dashboard</h2>
            <p className="text-[#838388] text-[14px] leading-[17px] mb-3 sm:mb-4">Dealer concentration map net GEX in $B</p>

            {loading && <ChartLoader className="min-h-[180px] mb-3" />}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

            {!loading && (
                <>
                    <div className="mb-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                            {sectors.map((sector) => (
                                <div key={sector.ticker} className="text-center bg-[#FFFFFF08] p-3 sm:p-4 flex flex-col gap-3 sm:gap-5">
                                    <div>
                                        <p className="text-white text-[16px] leading-[19px] font-semibold mb-1">{sector.ticker}</p>
                                        <p className="text-white/60 text-[12px] leading-[14px] font-normal">{sector.name}</p>
                                    </div>

                                    <div>
                                        <p className={`text-[16px] sm:text-[18px] leading-[22px] font-bold mb-1 ${sector.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                            {sector.value}
                                        </p>
                                        <p className={`text-[12px] leading-[14px] font-medium ${sector.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                            {sector.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-h-0">
                        <h3 className="text-white text-[18px] leading-[22px] font-medium mb-3">Composite Narrative</h3>
                        <p className="text-white/50 text-[12px] sm:text-[14px] leading-4 sm:leading-[20px] mb-3 sm:mb-5">
                            {narrative}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 h-[27px] rounded-full flex items-center justify-center border border-[#FFFFFF1A] text-white/60 text-[12px] leading-[17px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
