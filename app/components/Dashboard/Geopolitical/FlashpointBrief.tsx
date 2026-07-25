'use client'

type Severity = 'High' | 'Medium' | 'Low' | string

export interface FlashpointItem {
    region: string
    date: string
    title: string
    severity: Severity
    url?: string
}

const SEVERITY_COLOR: Record<string, string> = {
    High: 'text-[#E25C3F]',
    Medium: 'text-[#2796FF]',
    Low: 'text-[#918A8E]',
}

export default function FlashpointBrief({
    items,
    loading,
    error,
}: {
    items: FlashpointItem[]
    loading?: boolean
    error?: string | null
}) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                <h2 className="text-white text-[18px] leading-[22px] font-medium">Flashpoint Brief</h2>
                <button className="text-[#838388] hover:text-white transition-colors" type="button" aria-label="Alerts">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.2096 16.5C14.2096 18.2719 12.7732 19.7083 11.0013 19.7083C9.22939 19.7083 7.79297 18.2719 7.79297 16.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.6285 16.5003H4.37146C3.47595 16.5003 2.75 15.7743 2.75 14.8788C2.75 14.4488 2.92083 14.0364 3.22492 13.7323L3.77788 13.1793C4.2936 12.6636 4.58333 11.9641 4.58333 11.2348V8.70866C4.58333 5.16483 7.45618 2.29199 11 2.29199C14.5438 2.29199 17.4167 5.16483 17.4167 8.70866V11.2348C17.4167 11.9641 17.7064 12.6636 18.2221 13.1793L18.7751 13.7323C19.0791 14.0364 19.25 14.4488 19.25 14.8788C19.25 15.7743 18.524 16.5003 17.6285 16.5003Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 max-h-[520px]">
                    {loading && (
                        <div className="bg-[#16161F] p-4 text-[#838388] text-[13px]">Loading flashpoints...</div>
                    )}
                    {error && !loading && (
                        <div className="bg-[#16161F] p-4 text-[#E25C3F] text-[13px]">{error}</div>
                    )}
                    {!loading && !error && items.length === 0 && (
                        <div className="bg-[#16161F] p-4 text-[#838388] text-[13px]">No flashpoints in the last 24h.</div>
                    )}
                    {!loading &&
                        !error &&
                        items.map((fp, i) => {
                            const color = SEVERITY_COLOR[fp.severity] || SEVERITY_COLOR.Medium
                            const body = (
                                <div className="bg-[#16161F] flex items-start justify-between gap-3 p-3 sm:p-3.5">
                                    <div className="flex flex-col gap-1 sm:gap-2 min-w-0">
                                        <span className="text-[#838388] text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] font-normal">
                                            {fp.region} • {fp.date}
                                        </span>
                                        <p className="text-white text-[13px] sm:text-[16px] leading-[18px] sm:leading-[20px] font-medium">
                                            {fp.title}
                                        </p>
                                    </div>
                                    <span className={`text-[12px] sm:text-[14px] leading-[17px] font-medium flex-shrink-0 ${color}`}>
                                        {fp.severity}
                                    </span>
                                </div>
                            )

                            if (fp.url) {
                                return (
                                    <a
                                        key={`${fp.title}-${i}`}
                                        href={fp.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block hover:opacity-90 transition-opacity"
                                    >
                                        {body}
                                    </a>
                                )
                            }

                            return <div key={`${fp.title}-${i}`}>{body}</div>
                        })}
                </div>
            </div>
        </div>
    )
}
