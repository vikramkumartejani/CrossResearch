'use client'

import { useEffect, useState, type ReactNode } from 'react'
import ChartLoader from '../shared/ChartLoader'

type GreekCard = {
    label: string
    title: string
    desc: string
    symbol: ReactNode
}

function SymbolIcon({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex size-5 shrink-0 items-center justify-center text-white" aria-hidden>
            {children}
        </span>
    )
}

const ICON_CLASS = 'size-5'

const SYMBOLS: Record<string, ReactNode> = {
    'NET GEX REGIME': (
        <SymbolIcon>
            <svg className={ICON_CLASS} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 2.5h10v3.2H8.2V17.5H5V2.5z" />
            </svg>
        </SymbolIcon>
    ),
    'Vanna Exposure': (
        <SymbolIcon>
            <svg className={ICON_CLASS} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.2 2.5h3.6L10 13.8 13.2 2.5h3.6L11.6 17.5H8.4L3.2 2.5z" />
            </svg>
        </SymbolIcon>
    ),
    'Charm Flow': (
        <SymbolIcon>
            <svg className={ICON_CLASS} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.6 2.5h3.7L10 8.4 13.7 2.5h3.7L11.9 10l5.5 7.5h-3.7L10 11.6 6.3 17.5H2.6L8.1 10 2.6 2.5z" />
            </svg>
        </SymbolIcon>
    ),
    'IV Term Structure': (
        <SymbolIcon>
            <svg className={ICON_CLASS} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6 2.4H6.4C3.4 2.4 1.8 5.2 1.8 9.4c0 5.4 3.8 8.4 9 8.4 5.4 0 8.4-3.6 8.4-8.4 0-3.6-2.2-6-5.6-6.2v3.2c1.4.2 2.4 1.4 2.4 3 0 2.6-1.8 4.4-5.2 4.4-3.4 0-5.4-2-5.4-5.4 0-2.4 1.2-4 3.4-4.4V2.4h8.8z" />
            </svg>
        </SymbolIcon>
    ),
}

const FALLBACK: GreekCard[] = [
    {
        symbol: SYMBOLS['NET GEX REGIME'],
        label: 'NET GEX REGIME',
        title: '-',
        desc: '-',
    },
    {
        symbol: SYMBOLS['Vanna Exposure'],
        label: 'Vanna Exposure',
        title: '-',
        desc: '-',
    },
    {
        symbol: SYMBOLS['Charm Flow'],
        label: 'Charm Flow',
        title: '-',
        desc: '-',
    },
    {
        symbol: SYMBOLS['IV Term Structure'],
        label: 'IV Term Structure',
        title: '-',
        desc: '-',
    },
]

export default function GreeksSynthesis() {
    const [cards, setCards] = useState<GreekCard[]>(FALLBACK)
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
                const next: GreekCard[] = Array.isArray(body.greeks)
                    ? body.greeks.map((g: { label?: string; title?: string; desc?: string }) => {
                          const label = g.label || '-'
                          return {
                              label,
                              title: g.title || '-',
                              desc: g.desc || '',
                              symbol: SYMBOLS[label] ?? SYMBOLS['NET GEX REGIME'],
                          }
                      })
                    : []
                if (!cancelled && next.length) setCards(next)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load greeks')
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
        <div className="mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-3 sm:mb-4">
                Greeks Synthesis • Multi-Asset
            </h2>

            {loading && <ChartLoader className="min-h-[180px] mb-3" />}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                    {cards.map((card) => (
                        <div key={card.label} className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                            <div className="flex items-center gap-1.5 min-h-5">
                                {card.symbol}
                                <span className="text-white text-[14px] leading-5 font-medium">
                                    {card.label}
                                </span>
                            </div>

                            <div className="mt-4 sm:mt-6 xl:pr-6">
                                <p className="text-white text-[18px] leading-[22px] font-medium mb-2">{card.title}</p>
                                <p className="text-[#838388] text-[12px] leading-[17px] font-normal">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
