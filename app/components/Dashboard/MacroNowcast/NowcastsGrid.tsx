'use client'
import { useEffect, useState } from 'react'
import NowcastCard, { type NowcastCardProps } from './NowcastCard'

interface ApiDriver {
    label: string
    value: string
    positive?: boolean
}

interface ApiCard {
    id?: string
    region?: string
    quarter?: string
    indicator?: string
    unit?: string
    value?: string
    nowcast?: number | null
    consensus?: number | null
    prior?: number | null
    vsConsensus?: number | null
    inRange?: string
    drivers?: ApiDriver[]
    confidence?: number
    trendSeries?: { date: string; value: number }[]
    modelVsActual?: { period: string; forecast: number | null; actual: number | null }[]
}

function formatVsConsensus(vs: number | null | undefined): { label: string; positive: boolean } {
    if (vs == null || !Number.isFinite(vs)) {
        return { label: '0 Vs', positive: true }
    }
    const sign = vs > 0 ? '+' : ''
    const text = Number.isInteger(vs) ? String(vs) : String(Number(vs.toFixed(2)))
    return { label: `${sign}${text} Vs`, positive: vs >= 0 }
}

function toCardProps(card: ApiCard): NowcastCardProps {
    const vs = formatVsConsensus(card.vsConsensus)
    return {
        region: card.region || '—',
        quarter: card.quarter || '—',
        vsConsensus: vs.label,
        vsConsensusPositive: vs.positive,
        indicator: card.indicator || 'Indicator',
        value: card.value ?? String(card.nowcast ?? ''),
        unit: card.unit || '',
        nowcast: Number(card.nowcast ?? 0),
        consensus: Number(card.consensus ?? 0),
        prior: Number(card.prior ?? 0),
        inRange: card.inRange || '—',
        drivers: (card.drivers || []).map((d) => ({
            label: d.label,
            value: d.value,
            positive: d.positive ?? !String(d.value).trim().startsWith('-'),
        })),
        confidence: Number(card.confidence ?? 0),
        trendSeries: card.trendSeries || [],
        modelVsActual: card.modelVsActual || [],
    }
}

const MOBILE_INITIAL = 4

export default function NowcastsGrid() {
    const [cards, setCards] = useState<NowcastCardProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/nowcast-cards', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.detail === 'string'
                            ? body.detail
                            : body.error || `Failed to load nowcasts (${res.status})`
                    )
                }
                const list = Array.isArray(body.cards) ? body.cards.map(toCardProps) : []
                if (!cancelled) setCards(list)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load nowcasts')
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

    const visibleCards = showAll ? cards : cards.slice(0, MOBILE_INITIAL)

    return (
        <div className="mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Nowcasts</h2>
            <p className="text-[#838388] text-[14px] leading-[20px] mb-3 sm:mb-4">
                Model-driven current-quarter / current-period estimates vs consensus
            </p>

            {loading && (
                <p className="text-white/40 text-[13px] mb-3">Loading nowcasts…</p>
            )}
            {error && (
                <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>
            )}
            {!loading && !error && cards.length === 0 && (
                <p className="text-white/40 text-[13px] mb-3">No nowcast cards published yet.</p>
            )}

            <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {cards.map((card, i) => (
                    <NowcastCard key={`${card.region}-${card.indicator}-${i}`} {...card} />
                ))}
            </div>

            <div className="sm:hidden">
                <div className="grid grid-cols-1 gap-3">
                    {visibleCards.map((card, i) => (
                        <NowcastCard key={`${card.region}-${card.indicator}-${i}`} {...card} />
                    ))}
                </div>

                {!showAll && cards.length > MOBILE_INITIAL && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-3 w-full py-2 border border-[#FFFFFF1A] text-white/60 text-[14px] leading-[20px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
                    >
                        See {cards.length - MOBILE_INITIAL} More Nowcasts ↓
                    </button>
                )}

                {showAll && cards.length > MOBILE_INITIAL && (
                    <button
                        onClick={() => setShowAll(false)}
                        className="mt-3 w-full py-2 border border-[#FFFFFF1A] text-white/60 text-[14px] leading-[20px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
                    >
                        Show Less ↑
                    </button>
                )}
            </div>
        </div>
    )
}
