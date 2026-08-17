'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

interface Release {
    date: string
    time: string
    country: string
    indicator: string
    period: string
    prior: string
    cons: string
    fcst: string
    tier: 'High' | 'Medium' | 'Low'
}

interface ApiRelease {
    release_date?: string
    release_time?: string
    time_zone?: string
    country?: string
    indicator?: string
    reference_period?: string
    prior?: string | null
    consensus?: string | null
    model_forecast?: string | null
    tier?: string
    status?: string
}

const TIER_COLOR: Record<string, string> = {
    High: '#E25C3F',
    Medium: '#F59E0B',
    Low: '#838388',
}

function formatDate(iso?: string): string {
    if (!iso) return '-'
    // Prefer MM-DD from ISO YYYY-MM-DD
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
    if (m) return `${m[2]}-${m[3]}`
    return iso
}

function mapRelease(r: ApiRelease): Release | null {
    const indicator = (r.indicator || '').trim()
    if (!indicator) return null
    const tierRaw = String(r.tier || 'Medium')
    const tier = (['High', 'Medium', 'Low'].includes(tierRaw) ? tierRaw : 'Medium') as Release['tier']
    const tz = (r.time_zone || 'ET').trim()
    const time = r.release_time ? `${r.release_time} ${tz}` : tz
    return {
        date: formatDate(r.release_date),
        time,
        country: (r.country || '-').trim(),
        indicator,
        period: (r.reference_period || '-').trim(),
        prior: r.prior == null || r.prior === '' ? '-' : String(r.prior),
        cons: r.consensus == null || r.consensus === '' ? '-' : String(r.consensus),
        fcst: r.model_forecast == null || r.model_forecast === '' ? '-' : String(r.model_forecast),
        tier,
    }
}

type Filter = string

export default function UpcomingReleases() {
    const [releases, setReleases] = useState<Release[]>([])
    const [subtitle, setSubtitle] = useState('Forward-looking macro calendar with model forecasts')
    const [active, setActive] = useState<Filter>('All')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/upcoming-releases', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || body.detail || `Failed to load releases (${res.status})`
                    )
                }
                const mapped = (Array.isArray(body.releases) ? body.releases : [])
                    .map(mapRelease)
                    .filter((r: Release | null): r is Release => r != null)
                if (!cancelled) {
                    setReleases(mapped)
                    const calSub = body.calendar?.subtitle
                    if (typeof calSub === 'string' && calSub.trim()) setSubtitle(calSub.trim())
                    setActive('All')
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load releases')
                    setReleases([])
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

    const filters = useMemo(
        () =>
            [
                { id: 'All', label: `All ${releases.length}` },
                { id: 'High', label: 'High' },
                { id: 'Medium', label: 'Medium' },
            ] as const,
        [releases.length]
    )

    const filtered = active === 'All' ? releases : releases.filter((r) => r.tier === active)

    return (
        <div className="">
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Upcoming Releases</h2>
                    <p className="text-[#838388] text-[14px] leading-[20px]">{subtitle}</p>
                </div>

                <div className="flex items-center gap-2 border border-[#FFFFFF0D] bg-[#FFFFFF08] p-1 self-start sm:self-auto flex-shrink-0">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setActive(f.id)}
                            className={`px-3 h-[28px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
                                active === f.id
                                    ? 'bg-[#FFFFFF0D] text-white font-semibold'
                                    : 'text-[#838388] hover:text-white font-normal'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading && <ChartLoader className="min-h-[140px] mb-3" />}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

            <div className="border border-[#FFFFFF0D] bg-[#16161F] overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#FFFFFF0D]">
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">
                                Date/Time
                            </th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">
                                Cty
                            </th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5">
                                Indicator
                            </th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">
                                Prior
                            </th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">
                                Cons
                            </th>
                            <th className="text-left text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">
                                Fcst
                            </th>
                            <th className="text-right text-[13px] sm:text-[14px] leading-[17px] font-normal text-[#838388] p-3 sm:p-5 whitespace-nowrap">
                                Tier
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && !error && filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-5 py-6 text-[#838388] text-[13px]">
                                    No upcoming releases published yet.
                                </td>
                            </tr>
                        )}
                        {filtered.map((r, i) => (
                            <tr
                                key={`${r.date}-${r.indicator}-${i}`}
                                className="bg-[#FFFFFF08] border-b border-[#FFFFFF0D] last:border-b-0 hover:bg-[#FFFFFF03] transition-colors cursor-pointer"
                            >
                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-[20px] font-semibold mb-1">
                                        {r.date}
                                    </p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.time}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4">
                                    <span className="text-white text-[14px] leading-[20px] font-semibold">{r.country}</span>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1 text-nowrap">
                                        {r.indicator}
                                    </p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.period}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1">
                                        Prior
                                    </p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.prior}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1">
                                        Cons.
                                    </p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.cons}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <p className="text-white text-[13px] sm:text-[14px] leading-4 sm:leading-5 font-semibold mb-1">
                                        Forecast
                                    </p>
                                    <p className="text-white/60 text-[12px] leading-[14px] font-medium">{r.fcst}</p>
                                </td>

                                <td className="px-3 sm:px-5 py-2 sm:py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2.5">
                                        <span
                                            className="px-2 text-[12px] leading-[20px] font-medium"
                                            style={{ color: TIER_COLOR[r.tier] }}
                                        >
                                            {r.tier}
                                        </span>
                                        <button className="transition-colors cursor-pointer" type="button" aria-label="Open">
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
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
