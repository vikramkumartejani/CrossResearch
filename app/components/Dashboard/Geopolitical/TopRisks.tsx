'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

type RiskRow = {
    num: string
    title: string
    desc: string
    likelihood: string
    impact: string
}

const LIKELIHOOD_COLOR: Record<string, string> = {
    High: 'text-[#E25C3F]',
    Medium: 'text-[#F67416]',
    Low: 'text-[#838388]',
}

const IMPACT_COLOR: Record<string, string> = {
    Severe: 'text-[#E25C3F]',
    High: 'text-[#C97804]',
    Medium: 'text-[#F67416]',
    Low: 'text-[#838388]',
}

function colorFor(map: Record<string, string>, value: string, fallback: string) {
    return map[value] || fallback
}

export default function TopRisks() {
    const [title, setTitle] = useState('Top 3 Risks by likelihood')
    const [subtitle, setSubtitle] = useState('')
    const [risks, setRisks] = useState<RiskRow[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/top-risks', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || body.detail || `Failed to load top risks (${res.status})`
                    )
                }
                const mapped: RiskRow[] = (Array.isArray(body.risks) ? body.risks : [])
                    .filter((r: { active?: boolean }) => r.active !== false)
                    .sort(
                        (a: { sort_order?: number; num?: string }, b: { sort_order?: number; num?: string }) =>
                            Number(a.sort_order ?? a.num ?? 0) - Number(b.sort_order ?? b.num ?? 0)
                    )
                    .map((r: RiskRow & { num?: string | number }, i: number) => ({
                        num: String(r.num ?? i + 1),
                        title: r.title || '-',
                        desc: r.desc || '',
                        likelihood: r.likelihood || '-',
                        impact: r.impact || '-',
                    }))
                if (!cancelled) {
                    if (typeof body.title === 'string' && body.title.trim()) setTitle(body.title.trim())
                    if (typeof body.subtitle === 'string') setSubtitle(body.subtitle)
                    setRisks(mapped)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load top risks')
                    setRisks([])
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

    const heading = useMemo(() => {
        if (title.includes('Top') && risks.length) return title.replace(/Top\s+\d+/i, `Top ${risks.length}`)
        return title
    }, [title, risks.length])

    return (
        <div className="px-4 lg:px-6 mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-2">{heading}</h2>
            {subtitle && (
                <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[16px] sm:leading-[21px] font-normal mb-3 sm:mb-4">
                    {subtitle}
                </p>
            )}

            {loading && <ChartLoader className="min-h-[140px] mb-3" />}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

            <div className="bg-[#16161F] pb-1">
                <div className="hidden sm:grid grid-cols-[1fr_200px_200px_32px] gap-4 px-5 py-4 border-b border-[#FFFFFF0F]">
                    <span className="text-white text-[14px] leading-[14px] font-medium">Risk</span>
                    <span className="text-white text-[14px] leading-[14px] font-medium">Likelihood</span>
                    <span className="text-white text-[14px] leading-[14px] font-medium">Impact</span>
                    <span />
                </div>

                {!loading && !error && risks.length === 0 && (
                    <p className="text-white/40 text-[13px] px-5 py-4">No risks published yet.</p>
                )}

                {risks.map((risk, i) => (
                    <div
                        key={`${risk.num}-${risk.title}-${i}`}
                        className="border-b border-[#FFFFFF0F] last:border-0 hover:bg-[#FFFFFF04] transition-colors cursor-pointer"
                    >
                        <div className="hidden sm:grid grid-cols-[1fr_200px_200px_32px] gap-4 px-5 py-4 items-center">
                            <div>
                                <p className="text-white text-[14px] leading-[17px] font-semibold mb-2">
                                    {risk.num} {risk.title}
                                </p>
                                <p className="text-[#838388] text-[12px] leading-[16px]">{risk.desc}</p>
                            </div>
                            <span
                                className={`text-[14px] leading-[17px] font-medium ${colorFor(
                                    LIKELIHOOD_COLOR,
                                    risk.likelihood,
                                    'text-[#E25C3F]'
                                )}`}
                            >
                                {risk.likelihood}
                            </span>
                            <span
                                className={`text-[14px] leading-[17px] font-medium ${colorFor(
                                    IMPACT_COLOR,
                                    risk.impact,
                                    'text-[#E25C3F]'
                                )}`}
                            >
                                {risk.impact}
                            </span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.5 15L12.5 10L7.5 5"
                                    stroke="white"
                                    strokeOpacity="0.6"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div className="sm:hidden p-3">
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                                <p className="text-white text-[13px] leading-[17px] font-semibold">
                                    {risk.num} {risk.title}
                                </p>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 mt-0.5"
                                >
                                    <path
                                        d="M7.5 15L12.5 10L7.5 5"
                                        stroke="white"
                                        strokeOpacity="0.6"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <p className="text-[#838388] text-[12px] leading-[16px] mb-2.5">{risk.desc}</p>
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="text-[#838388] text-[11px] font-medium block">Likelihood</span>
                                    <span
                                        className={`text-[13px] leading-[17px] font-medium ${colorFor(
                                            LIKELIHOOD_COLOR,
                                            risk.likelihood,
                                            'text-[#E25C3F]'
                                        )}`}
                                    >
                                        {risk.likelihood}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[#838388] text-[11px] font-medium block">Impact</span>
                                    <span
                                        className={`text-[13px] leading-[17px] font-medium ${colorFor(
                                            IMPACT_COLOR,
                                            risk.impact,
                                            'text-[#E25C3F]'
                                        )}`}
                                    >
                                        {risk.impact}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
