'use client'

import { useEffect, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

type StressEvent = {
    id: string
    time: string
    title: string
    badge: string
    badgeColor: string
    desc: string
}

const FALLBACK_BADGE = '#E25C3F'

function joinDetail(line1?: string | null, line2?: string | null): string {
    const a = (line1 || '').trim()
    const b = (line2 || '').trim()
    if (a && b) return `${a}\n${b}`
    return a || b
}

function formatEventTime(displayDate?: string | null, eventTime?: string | null): string {
    const d = (displayDate || '').trim()
    const t = (eventTime || '').trim()
    if (d && t) return `${d} ${t}`
    return d || t || '-'
}

export default function MacroEventStress() {
    const [title, setTitle] = useState('Macro Event Stress')
    const [events, setEvents] = useState<StressEvent[]>([])
    const [footerNote, setFooterNote] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/macro-event-stress', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || body.detail || `Failed to load macro event stress (${res.status})`
                    )
                }
                const rawEvents = Array.isArray(body.macro_events) ? body.macro_events : []
                const mapped: StressEvent[] = rawEvents
                    .filter((e: { active?: boolean }) => e.active !== false)
                    .sort(
                        (a: { sort_order?: number }, b: { sort_order?: number }) =>
                            Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
                    )
                    .map(
                        (e: {
                            event_id?: string
                            display_date?: string
                            event_time?: string | null
                            event_name?: string
                            tag?: string
                            tag_color?: string
                            detail_line_1?: string | null
                            detail_line_2?: string | null
                        }) => ({
                            id: e.event_id || `${e.event_name}-${e.display_date}`,
                            time: formatEventTime(e.display_date, e.event_time),
                            title: e.event_name || '-',
                            badge: e.tag || '-',
                            badgeColor: e.tag_color || FALLBACK_BADGE,
                            desc: joinDetail(e.detail_line_1, e.detail_line_2),
                        })
                    )

                const alerts = Array.isArray(body.footer_alerts) ? body.footer_alerts : []
                const firstAlert = alerts
                    .filter((a: { active?: boolean }) => a.active !== false)
                    .sort(
                        (a: { sort_order?: number }, b: { sort_order?: number }) =>
                            Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
                    )[0]

                if (!cancelled) {
                    if (typeof body.card?.title === 'string' && body.card.title.trim()) {
                        setTitle(body.card.title.trim())
                    }
                    setEvents(mapped)
                    setFooterNote(
                        firstAlert?.alert_text
                            ? String(firstAlert.alert_text)
                            : ''
                    )
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load macro event stress')
                    setEvents([])
                    setFooterNote('')
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
        <div className="bg-[#16161F] p-3 sm:p-5 flex flex-col h-full">
            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                <h3 className="text-white text-[16px] leading-[19px] font-semibold">{title}</h3>
                <button className="transition-colors" type="button" aria-label="Info">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.9974 18.3337C14.5998 18.3337 18.3307 14.6027 18.3307 10.0003C18.3307 5.39795 14.5998 1.66699 9.9974 1.66699C5.39502 1.66699 1.66406 5.39795 1.66406 10.0003C1.66406 14.6027 5.39502 18.3337 9.9974 18.3337Z"
                            stroke="white"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 6.66699V10.0003"
                            stroke="white"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 13.333H10.0083"
                            stroke="white"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {loading && <ChartLoader className="min-h-[80px] mb-3" />}
            {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}

            <div className="flex-1 overflow-y-auto">
                {!loading && !error && events.length === 0 && (
                    <p className="text-white/40 text-[13px]">No macro events published yet.</p>
                )}
                {events.map((ev) => (
                    <div
                        key={ev.id}
                        className="border-b border-[#FFFFFF1A] pb-3 sm:pb-3.5 pt-3 sm:pt-3.5 first:pt-0 last:border-0"
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-[20px] min-w-0">
                                <span className="text-white/60 text-[12px] leading-[14px] font-normal shrink-0 sm:w-[120px]">
                                    {ev.time}
                                </span>
                                <p className="text-white text-[14px] sm:text-[16px] leading-[19px] font-semibold">
                                    {ev.title}
                                </p>
                            </div>

                            <span
                                className="text-[12px] leading-[16px] font-semibold shrink-0"
                                style={{ color: ev.badgeColor }}
                            >
                                {ev.badge}
                            </span>
                        </div>

                        <p className="text-white/60 text-[12px] leading-[16px] font-normal whitespace-pre-line sm:ml-[140px]">
                            {ev.desc}
                        </p>
                    </div>
                ))}
            </div>

            {footerNote && (
                <div className="flex items-start gap-2">
                    <svg width="20" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.82535 3.64183L1.17868 13.0685C1.06226 13.2701 1.00066 13.4987 1.00001 13.7315C0.999353 13.9643 1.05967 14.1932 1.17496 14.3955C1.29025 14.5978 1.4565 14.7663 1.65715 14.8844C1.85781 15.0025 2.08588 15.0659 2.31868 15.0685H13.612C13.8448 15.0659 14.0729 15.0025 14.2735 14.8844C14.4742 14.7663 14.6404 14.5978 14.7557 14.3955C14.871 14.1932 14.9313 13.9643 14.9307 13.7315C14.93 13.4987 14.8684 13.2701 14.752 13.0685L9.10535 3.64183C8.9865 3.4459 8.81916 3.28391 8.61948 3.17149C8.41979 3.05906 8.1945 3 7.96535 3C7.73619 3 7.5109 3.05906 7.31122 3.17149C7.11153 3.28391 6.94419 3.4459 6.82535 3.64183Z"
                            stroke="#A5A5A5"
                            strokeWidth="1.15556"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 6.40039V9.24514"
                            stroke="#A5A5A5"
                            strokeWidth="1.15556"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 12.0898H8.0075"
                            stroke="#A5A5A5"
                            strokeWidth="1.15556"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="text-white/60 text-[12px] leading-4 sm:leading-[17px] font-normal">{footerNote}</p>
                </div>
            )}
        </div>
    )
}
