'use client'

interface Report {
    id: number
    tags: { label: string; color: string }[]
    readTime: string
    sentiment: string
    sentimentColor: string
    title: string
    subtitle: string
    body: string
    track: string
    author: string
    date: string
}

const REPORTS: Report[] = [
    {
        id: 1,
        tags: [{ label: 'MACRO', color: '#88C4FF' }, { label: 'REGIME', color: '#A78BFA' }],
        readTime: '12 Min Read',
        sentiment: 'CONSTRUCTIVE',
        sentimentColor: '#2CB37B',
        title: 'Q1 2026 Macro Regime Outlook',
        subtitle: 'Stagflation persists. Positioning for late-cycle defensive rotation.',
        body: 'Our cycle composite continues to print stagflation across G7 economies. Real yields remain elevated while growth surprise indices roll over. We outline four positioning frameworks for the quarter.',
        track: 'Idea Track • 12 W',
        author: 'BTB Macro Desk',
        date: 'Feb 14, 2026',
    },
    {
        id: 2,
        tags: [{ label: 'FX', color: '#34D399' }, { label: 'TECHNICAL', color: '#F59E0B' }],
        readTime: '07 Min Read',
        sentiment: 'Defensive',
        sentimentColor: '#E25C3F',
        title: 'EUR/USD Structural Analysis',
        subtitle: 'Bearish structure intact below 1.0788 reversal level.',
        body: 'EUR/USD remains in a major downtrend with minor counter-trend rally exhausting near 1.0595. Reversal threshold sits at 1.07887 — below which our regime play targets 1.02621.',
        track: 'Idea Track • 12 W',
        author: 'BTB Macro Strategy',
        date: 'Feb 12, 2026',
    },
    {
        id: 3,
        tags: [{ label: 'CRYPTO', color: '#F97316' }, { label: 'CYCLE', color: '#A78BFA' }],
        readTime: '10 Min Read',
        sentiment: 'CONSTRUCTIVE',
        sentimentColor: '#2CB37B',
        title: 'Bitcoin Cycle Positioning',
        subtitle: 'Mid-Cycle expansion. Halving setup confirmed.',
        body: 'EUR/USD remains in a major downtrend with minor counter-trend rally exhausting near 1.0595. Reversal threshold sits at 1.07887 — below which our regime play targets 1.02621.',
        track: 'Idea Track • 12 W',
        author: 'BTB Digital Assets',
        date: 'Feb 15, 2026',
    },
]

const SIDEBAR_REPORTS = [REPORTS[0], REPORTS[0], REPORTS[0]]

function Tag({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center px-3 sm:px-[15px] h-[26px] sm:h-[29px] text-[#88C4FF] text-[11px] sm:text-[12px] leading-[17px] uppercase font-medium rounded-[72px] border border-[#FFFFFF1A]">
            {label}
        </span>
    )
}

// Thumbnail placeholder matching the grey box in the Figma
function Thumb() {
    return (
        <div className="w-full lg:w-[172px] h-[140px] lg:h-[113px] flex-shrink-0 bg-[#FFFFFF0D] flex items-center justify-center">
        </div>
    )
}

function MainCard({ r }: { r: Report }) {
    return (
        <div className="bg-[#16161F] p-3.5 sm:p-5 cursor-pointer transition-colors">
            {/* On mobile: stack vertically. On desktop: text left, thumb right */}
            <div className="flex flex-col-reverse xl:flex-row xl:items-start xl:justify-between gap-2.5 sm:gap-4">
                {/* Text section */}
                <div className="w-full sm:max-w-[843px]">
                    <div className="flex items-center gap-2 flex-wrap">
                        {r.tags.map(t => <Tag key={t.label} {...t} />)}
                    </div>
                    <h3 className="mt-3 text-white text-[20px] sm:text-[24px] 2xl:text-[28px] leading-[26px] sm:leading-[28px] 2xl:leading-[34px] font-medium mb-2">{r.title}</h3>
                    <p className="text-[#88C4FF] text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-medium mb-2 sm:mb-4">{r.subtitle}</p>
                    <p className="text-white/60 text-[12px] leading-[19px] font-normal sm:max-w-[647px]">{r.body}</p>

                    {/* footer */}
                    <div className="flex items-center justify-between mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-[#FFFFFF26]">
                        <span className="text-white/60 text-[12px] sm:text-[14px] leading-[22px] font-normal">{r.author}</span>
                        <span className="text-white text-[12px] sm:text-[14px] leading-[22px] font-semibold">{r.date}</span>
                    </div>
                </div>

                {/* Thumb + meta section — sits below text on mobile, right side on desktop */}
                <div className="w-full xl:max-w-[231px]">
                    <div className="flex items-center justify-between gap-3 sm:gap-10">
                        <span className="text-white/60 text-[12px] sm:text-[14px] leading-[22px] font-normal">{r.readTime}</span>
                        <span className="text-[12px] sm:text-[14px] font-normal leading-[22px]" style={{ color: r.sentimentColor }}>{r.sentiment}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 sm:gap-2.5 flex-shrink-0 pt-1 sm:pt-2.5 relative">
                        <Thumb />
                        <span className="text-white/60 text-[12px] sm:text-[14px] leading-[22px] lg:static absolute bottom-2.5 right-2.5">{r.track}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SideCard({ r }: { r: Report }) {
    return (
        <div className="cursor-pointer transition-colors">
            {/* tags */}
            <div className="flex items-center gap-2 mb-3">
                {r.tags.map(t => <Tag key={t.label} {...t} />)}
            </div>

            {/* title + subtitle + body */}
            <div className="max-w-[337px]">
                <h4 className="text-white text-[20px] font-medium leading-[24px] mb-2">{r.title}</h4>
                <p className="text-[#88C4FF] text-[12px] leading-[16px] font-medium mb-2">{r.subtitle}</p>
                <p className="text-white/60 font-normal text-[12px] leading-[19px]">{r.body}</p>
            </div>

            {/* footer */}
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#FFFFFF26]">
                <span className="text-white/60 text-[12px] leading-[19px] font-normal">{r.author}</span>
                <span className="text-white text-[12px] leading-[19px] font-semibold">{r.date}</span>
            </div>
        </div>
    )
}

export default function MarketReport() {
    return (
        <div className="">

            {/* Header */}
            <div className="border-b border-[#FFFFFF0D] pb-5 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clipPath="url(#clip_mr)">
                            <path d="M1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5C6.15685 1.5 7.5 2.84315 7.5 4.5V13.5C7.5 15.1569 6.15685 16.5 4.5 16.5C2.84315 16.5 1.5 15.1569 1.5 13.5V4.5Z" stroke="#838388" strokeWidth="1.2" />
                            <path d="M7.4997 6.1818L9.98495 3.69655C11.1565 2.52498 13.056 2.52498 14.2276 3.69655C15.3992 4.86812 15.3992 6.76762 14.2276 7.93919L6.97949 15.1873" stroke="#838388" strokeWidth="1.2" />
                            <path d="M4.5 16.5L13.5 16.5C15.1569 16.5 16.5 15.1569 16.5 13.5C16.5 11.8431 15.1569 10.5 13.5 10.5L11.625 10.5" stroke="#838388" strokeWidth="1.2" />
                            <path d="M5.25 13.5C5.25 13.9142 4.91421 14.25 4.5 14.25C4.08579 14.25 3.75 13.9142 3.75 13.5C3.75 13.0858 4.08579 12.75 4.5 12.75C4.91421 12.75 5.25 13.0858 5.25 13.5Z" stroke="#838388" strokeWidth="1.2" />
                        </g>
                        <defs>
                            <clipPath id="clip_mr"><rect width="18" height="18" rx="4" fill="white" /></clipPath>
                        </defs>
                    </svg>
                    <span className="text-[#838388] text-[12px] font-medium">Market Reports</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Research & Strategy Desk</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Long - Fom macro, FX and digital - asset reports authored by the BTB research desks
                </p>
            </div>

            {/* Layout: left flex-1, right 389px */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_389px] gap-4 items-stretch px-4 lg:px-6">
                {/* Left */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {REPORTS.map((r) => (
                        <MainCard key={r.id} r={r} />
                    ))}
                </div>

                {/* Right — hidden on mobile, visible on lg+ */}
                <div className="flex flex-col gap-5 sm:gap-8 p-3.5 sm:p-4 bg-[#16161F] h-full self-stretch">
                    {SIDEBAR_REPORTS.map((r, i) => (
                        <SideCard key={i} r={r} />
                    ))}
                </div>
            </div>
        </div>
    )
}
