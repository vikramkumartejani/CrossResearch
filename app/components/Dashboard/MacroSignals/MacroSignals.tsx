'use client'

import { useEffect, useState } from 'react'
import WeeklyHighlights from './WeeklyHighlights'
import SignalChartCard from './SignalChartCard'
import LockedSection from '../LockedSection'
import type { SignalChart } from './signalChartsData'
import type { MacroBrief } from './weeklyHighlightsData'

interface MacroSignalsResponse {
    brief?: MacroBrief
    charts?: SignalChart[]
    metadata?: Record<string, unknown>
    cached?: boolean
}

export default function MacroSignals() {
    const [charts, setCharts] = useState<SignalChart[]>([])
    const [brief, setBrief] = useState<MacroBrief | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch('/api/macro-signals')
                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))
                    throw new Error(body.details || body.detail || body.error || 'Failed to fetch macro signals')
                }
                const data: MacroSignalsResponse = await response.json()
                if (cancelled) return
                setCharts(Array.isArray(data.charts) ? data.charts : [])
                setBrief(data.brief ?? null)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Unknown error')
                    setCharts([])
                    setBrief(null)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_584_5585)">
                            <path d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#838388" strokeWidth="1.2" />
                            <path d="M2.25 6.00578C2.25 6.00578 4.45287 8.24997 7.82787 8.24997C10.125 8.24997 11.3443 6.92016 12.375 6.56681C14.3122 5.90272 15.75 6.00578 15.75 6.00578" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M2.25051 10.5058C2.25051 10.5058 3.81717 10.4027 5.92793 11.0668C7.05104 11.4202 8.37954 12.75 10.8825 12.75C13.1413 12.75 14.9183 11.9033 15.9531 11.25" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_584_5585">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Macro Signals Desk</span>
                </div>
                <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">Cross - Asset Alpha Engine</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Live signals from the CrossResearch desk — equity concentration (SPY vs RSP) and crude crack fair-value — with proprietary insight behind each chart.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 px-4 lg:px-6">
                <div className="lg:w-[300px] xl:w-[386px] flex-shrink-0 lg:sticky lg:top-10 h-fit">
                    <WeeklyHighlights brief={brief} />
                </div>

                <LockedSection title="Liquidity & Cross Signals" keepTitle className="flex-1">
                    {error && (
                        <div className="mb-3 text-[#E25C3F] text-[13px] leading-[18px]">{error}</div>
                    )}
                    {loading && !charts.length && (
                        <div className="mb-3 text-white/40 text-[13px]">Computing live macro signals…</div>
                    )}

                    <div className="flex flex-col gap-3 sm:gap-4">
                        {charts.map((chart) => (
                            <SignalChartCard key={chart.id} chart={chart} />
                        ))}
                    </div>
                </LockedSection>
            </div>
        </div>
    )
}
