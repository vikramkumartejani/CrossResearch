'use client'

import { useEffect, useState } from 'react'
import MarketCard from './MarketCard'
import GreeksSynthesis from './GreeksSynthesis'
import SectorGammaDashboard from './SectorGammaDashboard'
import MacroEventStress from './MacroEventStress'
import LockedSection from '../LockedSection'
import ChartLoader from '../shared/ChartLoader'

type DealerLevel = {
    label: string
    level: number
    change: string
    positive: boolean
}

type StructureCard = {
    ticker: string
    regime: string
    regimeColor: string
    name: string
    price: string
    change: string
    changePositive: boolean
    dealerBias: string
    trendDay: string
    odteDom: string
    meanRevert: string
    volRegime: string
    levels: DealerLevel[]
    summary: string
    tags: string[]
}

export default function OptionsPositioning() {
    const [sectionTitle, setSectionTitle] = useState('Market Structure')
    const [cards, setCards] = useState<StructureCard[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/market-structure', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || body.detail || `Failed to load market structure (${res.status})`
                    )
                }
                const mapped: StructureCard[] = (Array.isArray(body.cards) ? body.cards : [])
                    .filter((c: { active?: boolean }) => c.active !== false)
                    .sort(
                        (a: { sort_order?: number }, b: { sort_order?: number }) =>
                            Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
                    )
                    .map((c: StructureCard) => ({
                        ticker: c.ticker || '-',
                        regime: c.regime || '-',
                        regimeColor: c.regimeColor || '#2CB37B',
                        name: c.name || '',
                        price: c.price || '-',
                        change: c.change || '',
                        changePositive: Boolean(c.changePositive),
                        dealerBias: c.dealerBias || '',
                        trendDay: c.trendDay || '-',
                        odteDom: c.odteDom || '-',
                        meanRevert: c.meanRevert || '-',
                        volRegime: c.volRegime || '-',
                        levels: Array.isArray(c.levels) ? c.levels : [],
                        summary: c.summary || '',
                        tags: Array.isArray(c.tags) ? c.tags : [],
                    }))
                if (!cancelled) {
                    if (typeof body.title === 'string' && body.title.trim()) {
                        setSectionTitle(body.title.trim())
                    }
                    setCards(mapped)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load market structure')
                    setCards([])
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
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
                <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">Mechanical Dealer Levels</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Gamma exposure, dealer bias and key option levels for SPX, NDX and DJIA. Identifies walls, flip zones
                    and vacuum areas that drive intraday mechanics.
                </p>
            </div>

            <div className="px-4 lg:px-6">
                <h2 className="text-white text-[18px] font-medium leading-[22px] mb-3 sm:mb-4">{sectionTitle}</h2>
                {loading && <ChartLoader className="min-h-[80px] mb-3" />}
                {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4 sm:mb-5 items-stretch">
                    {cards.map((card) => (
                        <MarketCard key={card.ticker} {...card} />
                    ))}
                </div>

                <LockedSection title="Greeks Synthesis" className="mb-4 sm:mb-5">
                    <GreeksSynthesis />
                </LockedSection>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_524px] gap-3 sm:gap-4 grow items-stretch">
                    <LockedSection title="Sector Gamma" className="h-full min-h-0 flex flex-col">
                        <SectorGammaDashboard />
                    </LockedSection>
                    <LockedSection title="Macro Event Stress" className="h-full min-h-0">
                        <MacroEventStress />
                    </LockedSection>
                </div>
            </div>
        </div>
    )
}
