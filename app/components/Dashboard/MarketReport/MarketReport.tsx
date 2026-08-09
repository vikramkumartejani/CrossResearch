'use client'

import { useEffect, useState } from 'react'
import type { MarketReportsPage, Report } from './reportData'
import ReportDetailModal from './ReportDetailModal'
import LockedSection from '../LockedSection'

function Tag({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center px-3 sm:px-[15px] h-[26px] sm:h-[29px] text-[#88C4FF] text-[11px] sm:text-[12px] leading-[17px] font-medium rounded-[72px] border border-[#FFFFFF1A]">
            {label}
        </span>
    )
}

function Thumb({ src }: { src?: string | null }) {
    if (src) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt=""
                className="w-full lg:w-[172px] h-[140px] lg:h-[113px] flex-shrink-0 object-cover bg-[#FFFFFF0D]"
            />
        )
    }
    return <div className="w-full lg:w-[172px] h-[140px] lg:h-[113px] flex-shrink-0 bg-[#FFFFFF0D]" />
}

function MainCard({ r, onOpen }: { r: Report; onOpen: (report: Report) => void }) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen(r)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpen(r)
            }}
            className="bg-[#16161F] p-3.5 sm:p-5 cursor-pointer transition-colors hover:bg-[#1A1A24]"
        >
            <div className="flex flex-col-reverse xl:flex-row xl:items-start xl:justify-between gap-2.5 sm:gap-4">
                <div className="w-full sm:max-w-[843px]">
                    <div className="flex items-center gap-2 flex-wrap">
                        {r.tags.map((t) => (
                            <Tag key={t} label={t} />
                        ))}
                    </div>
                    <h3 className="mt-3 text-white text-[20px] sm:text-[24px] 2xl:text-[28px] leading-[26px] sm:leading-[28px] 2xl:leading-[34px] font-medium mb-2">
                        {r.title}
                    </h3>
                    <p className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-medium mb-2 sm:mb-4">
                        {r.subtitle}
                    </p>
                    <p className="text-white/60 text-[12px] leading-[19px] font-normal sm:max-w-[647px]">{r.body}</p>

                    <div className="flex items-center justify-between mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-[#FFFFFF26]">
                        <span className="text-white/60 text-[12px] sm:text-[14px] leading-[22px] font-normal">
                            {r.author}
                        </span>
                        <span className="text-white text-[12px] sm:text-[14px] leading-[22px] font-semibold">
                            {r.date}
                        </span>
                    </div>
                </div>

                <div className="w-full xl:max-w-[231px]">
                    <div className="flex items-center justify-end gap-3 sm:gap-10">
                        <span className="text-white/60 text-[12px] sm:text-[14px] leading-[22px] font-normal">
                            {r.readTime}
                        </span>
                    </div>
                    <div className="flex flex-col items-end gap-1 sm:gap-2.5 flex-shrink-0 pt-1 sm:pt-2.5 relative">
                        <Thumb src={r.chartImage} />
                        <span className="text-white/60 text-[12px] sm:text-[14px] leading-[22px] lg:static absolute bottom-2.5 right-2.5">
                            {r.track}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SideCard({ r, onOpen }: { r: Report; onOpen: (report: Report) => void }) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen(r)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpen(r)
            }}
            className="cursor-pointer transition-colors h-full flex flex-col min-h-0"
        >
            <div className="flex items-center gap-2 flex-wrap">
                {r.tags.map((t) => (
                    <Tag key={t} label={t} />
                ))}
            </div>

            <div className="max-w-[337px] flex-1">
                <h4 className="mt-3 text-white text-[20px] font-medium leading-[24px] mb-2">{r.title}</h4>
                <p className="text-[#88C4FF] text-[12px] leading-[16px] font-medium mb-2">{r.subtitle}</p>
                <p className="text-white/60 font-normal text-[12px] leading-[19px]">{r.body}</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#FFFFFF26]">
                <span className="text-white/60 text-[12px] leading-[19px] font-normal">{r.author}</span>
                <span className="text-white text-[12px] leading-[19px] font-semibold">{r.date}</span>
            </div>
        </div>
    )
}

const DEFAULT_PAGE: MarketReportsPage = {
    eyebrow: 'Market Reports',
    title: 'Research & Strategy Desk',
    subtitle: 'Long-form macro, FX and digital-asset reports authored by the CrossResearch desks.',
}

export default function MarketReport() {
    const [selected, setSelected] = useState<Report | null>(null)
    const [page, setPage] = useState<MarketReportsPage>(DEFAULT_PAGE)
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/market-reports')
                if (!res.ok) throw new Error('Failed to load market reports')
                const data = await res.json()
                if (cancelled) return

                setPage({ ...DEFAULT_PAGE, ...(data.page || {}) })
                const list = Array.isArray(data.reports) ? [...data.reports] : []
                list.sort((a, b) => Number(b.id) - Number(a.id))
                setReports(list)
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

    return (
        <div className="">
            <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clipPath="url(#clip_mr)">
                            <path
                                d="M1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5C6.15685 1.5 7.5 2.84315 7.5 4.5V13.5C7.5 15.1569 6.15685 16.5 4.5 16.5C2.84315 16.5 1.5 15.1569 1.5 13.5V4.5Z"
                                stroke="#838388"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M7.4997 6.1818L9.98495 3.69655C11.1565 2.52498 13.056 2.52498 14.2276 3.69655C15.3992 4.86812 15.3992 6.76762 14.2276 7.93919L6.97949 15.1873"
                                stroke="#838388"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M4.5 16.5L13.5 16.5C15.1569 16.5 16.5 15.1569 16.5 13.5C16.5 11.8431 15.1569 10.5 13.5 10.5L11.625 10.5"
                                stroke="#838388"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M5.25 13.5C5.25 13.9142 4.91421 14.25 4.5 14.25C4.08579 14.25 3.75 13.9142 3.75 13.5C3.75 13.0858 4.08579 12.75 4.5 12.75C4.91421 12.75 5.25 13.0858 5.25 13.5Z"
                                stroke="#838388"
                                strokeWidth="1.2"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip_mr">
                                <rect width="18" height="18" rx="4" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-[#838388] text-[12px] font-medium">{page.eyebrow}</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
                    {page.title}
                </h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">{page.subtitle}</p>
            </div>

            {loading && (
                <div className="px-4 lg:px-6 text-white/50 text-[13px] py-10">Loading market reports...</div>
            )}
            {error && !loading && (
                <div className="px-4 lg:px-6 text-[#E25C3F] text-[13px] py-10">{error}</div>
            )}

            {!loading && !error && (
                <div className="px-4 lg:px-6 flex flex-col gap-4">
                    {reports[0] && (
                        <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_389px] gap-x-4 gap-y-3 sm:gap-y-4 items-stretch">
                            <div
                                aria-hidden
                                className="hidden xl:block absolute top-0 bottom-0 right-0 w-[389px] bg-[#16161F] pointer-events-none"
                            />
                            <MainCard r={reports[0]} onOpen={setSelected} />
                            <div className="relative z-10 bg-[#16161F] xl:bg-transparent p-3.5 sm:p-5 h-full flex flex-col">
                                <SideCard r={reports[0]} onOpen={setSelected} />
                            </div>
                        </div>
                    )}

                    {reports.slice(1).map((r) => (
                        <LockedSection key={r.id} title="Market Report">
                            <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_389px] gap-x-4 gap-y-3 sm:gap-y-4 items-stretch">
                                <MainCard r={r} onOpen={setSelected} />
                                <div className="relative z-10 bg-[#16161F] p-3.5 sm:p-5 h-full flex flex-col">
                                    <SideCard r={r} onOpen={setSelected} />
                                </div>
                            </div>
                        </LockedSection>
                    ))}
                </div>
            )}

            {selected && <ReportDetailModal report={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}
