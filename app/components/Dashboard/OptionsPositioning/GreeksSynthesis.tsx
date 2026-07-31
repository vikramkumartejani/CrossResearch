'use client'

import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'

type GreekCard = {
    label: string
    title: string
    desc: string
    symbol: ReactNode
}

const SYMBOLS: Record<string, ReactNode> = {
    'NET GEX REGIME': (
        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="24" fill="white" />
            <rect y="6" width="6" height="14" transform="rotate(-90 0 6)" fill="white" />
        </svg>
    ),
    'Vanna Exposure': (
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.16716 20L0 0H4.04734L9.5 16.0571L14.9808 0H19L11.8328 20H7.16716Z" fill="white" />
        </svg>
    ),
    'Charm Flow': (
        <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.093596 22L6.9885 10.8429L0 0H4.86699L9.67159 7.51143L14.0706 0H18.8128L11.9803 11.0314L19 22H14.133L9.29721 14.3629L4.86699 22H0.093596Z" fill="white" />
        </svg>
    ),
    'IV Term Structure': (
        <Image src="/assets/term-structure.png" alt="IV Term Structure" width={24} height={24} className="object-contain" style={{ filter: 'invert(1)' }} />
    ),
}

const FALLBACK: GreekCard[] = [
    {
        symbol: SYMBOLS['NET GEX REGIME'],
        label: 'NET GEX REGIME',
        title: '—',
        desc: 'Loading net GEX regime…',
    },
    {
        symbol: SYMBOLS['Vanna Exposure'],
        label: 'Vanna Exposure',
        title: '—',
        desc: 'Loading vanna exposure…',
    },
    {
        symbol: SYMBOLS['Charm Flow'],
        label: 'Charm Flow',
        title: '—',
        desc: 'Loading charm flow…',
    },
    {
        symbol: SYMBOLS['IV Term Structure'],
        label: 'IV Term Structure',
        title: '—',
        desc: 'Loading IV term structure…',
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
                          const label = g.label || '—'
                          return {
                              label,
                              title: g.title || '—',
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

            {loading && <p className="text-white/40 text-[13px] mb-3">Loading greeks…</p>}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {cards.map((card) => (
                    <div key={card.label} className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                        <div className="flex items-center gap-[5px]">
                            <span className="text-white text-[22px] leading-none font-light">{card.symbol}</span>
                            <span className="text-white text-[14px] leading-[17px] font-medium pt-2.5">
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
        </div>
    )
}
