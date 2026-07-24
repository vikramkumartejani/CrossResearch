'use client'

import { useEffect, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import type { Report } from './reportData'

interface ReportDetailModalProps {
    report: Report
    onClose: () => void
}

export default function ReportDetailModal({ report, onClose }: ReportDetailModalProps) {
    const [bodyHtml, setBodyHtml] = useState(report.contentHtml)
    const [isEditing, setIsEditing] = useState(true)

    useEffect(() => {
        setBodyHtml(report.contentHtml)
    }, [report.id, report.contentHtml])

    useEffect(() => {
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)

        return () => {
            document.body.style.overflow = previous
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    const biasIsShort = report.bias.toUpperCase() === 'SHORT'

    return (
        <div className="fixed inset-0 z-[100] bg-[#0B0B10] overflow-y-auto">
            <button
                type="button"
                onClick={onClose}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] w-10 h-10 flex items-center justify-center bg-[#FFFFFF0A] border border-[#FFFFFF14] hover:bg-[#FFFFFF14] transition-colors cursor-pointer"
                aria-label="Close report"
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 4L14 14M14 4L4 14" stroke="#FAFAF9" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </button>

            <div className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-10 sm:pt-12 pb-16">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 bg-[#88C4FF] text-[#0B0B10] text-[11px] font-bold flex items-center justify-center">
                        {report.assetCode.slice(0, 2)}
                    </div>
                    <span className="text-white/80 text-[13px] sm:text-[14px] font-medium">{report.assetName}</span>
                    <span
                        className={`px-2 py-0.5 text-[11px] font-bold tracking-wide ${
                            biasIsShort ? 'bg-[#E25C3F22] text-[#E25C3F]' : 'bg-[#2CB37B22] text-[#2CB37B]'
                        }`}
                    >
                        {report.bias.toUpperCase()}
                    </span>
                    <span className="text-[#838388] text-[13px]">{report.dateShort}</span>
                </div>

                <h1 className="text-white text-[26px] sm:text-[34px] leading-[1.2] font-medium mb-6 sm:mb-8 max-w-[860px]">
                    {report.assetCode} | {report.headline}
                </h1>

                <div className="w-full bg-[#16161F] border border-[#FFFFFF0D] overflow-hidden mb-4 aspect-[16/9] sm:aspect-[2.2/1] flex items-center justify-center relative">
                    {report.chartImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={report.chartImage} alt={report.headline} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center px-6">
                            <p className="text-white text-[16px] sm:text-[20px] font-medium mb-2">
                                {report.assetCode} Chart
                            </p>
                            <p className="text-[#838388] text-[12px] sm:text-[13px] max-w-md mx-auto">
                                {report.subtitle}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-3 py-3 border-b border-[#FFFFFF0D] mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <button
                            type="button"
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[#838388] text-[13px] hover:text-white transition-colors cursor-pointer"
                        >
                            <span aria-hidden>🚀</span>
                            <span>{report.rockets}</span>
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1.5 text-[12px] sm:text-[13px] font-medium border border-[#FFFFFF1A] text-white/80 hover:bg-[#FFFFFF0A] transition-colors cursor-pointer"
                        >
                            Grab this chart
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[#838388] text-[13px] hover:text-white transition-colors cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M2.5 3.5h11v7.5H8.2L5 13.5v-2.5H2.5V3.5z"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>{report.comments}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing((v) => !v)}
                            className="px-3 py-1.5 text-[12px] sm:text-[13px] font-medium border border-[#FFFFFF1A] text-[#88C4FF] hover:bg-[#FFFFFF0A] transition-colors cursor-pointer"
                        >
                            {isEditing ? 'Preview' : 'Edit'}
                        </button>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#838388] text-[13px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            />
                            <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <span>{report.views}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-6 lg:gap-8">
                    <div>
                        <RichTextEditor content={bodyHtml} onChange={setBodyHtml} editable={isEditing} />

                        <div className="mt-8 pt-5 border-t border-[#FFFFFF0D]">
                            <h3 className="text-white text-[16px] font-medium mb-2">
                                {report.comments} comment{report.comments === 1 ? '' : 's'}
                            </h3>
                            <p className="text-[#838388] text-[13px]">Be the first to leave a note on this idea.</p>
                        </div>
                    </div>

                    <aside className="bg-[#16161F] border border-[#FFFFFF0D] p-4 sm:p-5 space-y-5 h-fit">
                        <div>
                            <p className="text-white text-[16px] font-medium tracking-tight mb-3">crossresearch</p>
                            <button
                                type="button"
                                className="w-full h-10 bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white text-[13px] font-semibold hover:bg-[#FFFFFF14] transition-colors cursor-pointer"
                            >
                                Follow
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            {['X', 'IG', 'Web'].map((label) => (
                                <button
                                    key={label}
                                    type="button"
                                    className="w-8 h-8 border border-[#FFFFFF1A] text-[10px] font-semibold text-[#838388] hover:text-white hover:bg-[#FFFFFF0A] transition-colors cursor-pointer"
                                    aria-label={label}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {report.sidebarTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 border border-[#FFFFFF1A] text-[#88C4FF] text-[11px] font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-[#838388] text-[11px] leading-4">
                            Disclaimer: This content is for informational purposes only and does not constitute
                            investment advice. Markets involve risk of loss. Past performance is not indicative of
                            future results. Always do your own research.
                        </p>
                    </aside>
                </div>
            </div>
        </div>
    )
}
