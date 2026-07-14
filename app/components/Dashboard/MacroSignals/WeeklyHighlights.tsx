'use client'
import { MACRO_BRIEF } from './weeklyHighlightsData'

// ── Globe icon (matches header) ──────────────────────────────────────────────
function GlobeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.58073 5C5.84878 5 3.9828 5 2.82343 5.97631C1.66406 6.95262 1.66406 8.524 1.66406 11.6667C1.66406 14.8093 1.66406 16.3807 2.82343 17.357C3.9828 18.3333 5.84878 18.3333 9.58073 18.3333C13.3126 18.3333 15.1786 18.3333 16.3381 17.357C17.4974 16.3807 17.4974 14.8093 17.4974 11.6667C17.4974 10.6918 17.4974 9.86825 17.4628 9.16667" stroke="#88C4FF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15.4167 1.66797L15.6316 2.24883C15.9134 3.01049 16.0543 3.39132 16.3322 3.66913C16.61 3.94694 16.9908 4.08786 17.7525 4.3697L18.3333 4.58464L17.7525 4.79957C16.9908 5.08141 16.61 5.22234 16.3322 5.50014C16.0543 5.77795 15.9134 6.15879 15.6316 6.92044L15.4167 7.5013L15.2018 6.92044C14.9199 6.15879 14.779 5.77795 14.5012 5.50014C14.2233 5.22234 13.8425 5.08141 13.0808 4.79957L12.5 4.58464L13.0808 4.3697C13.8425 4.08786 14.2233 3.94694 14.5012 3.66913C14.779 3.39132 14.9199 3.01049 15.2018 2.24883L15.4167 1.66797Z" stroke="#88C4FF" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M10 8.33203V14.9987" stroke="#88C4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 10V13.3333" stroke="#88C4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10.832V12.4987" stroke="#88C4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 10V13.3333" stroke="#88C4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 10.832V12.4987" stroke="#88C4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function WeeklyHighlights() {
    const brief = MACRO_BRIEF

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-white text-[16px] font-medium leading-[22px] mb-4">Weekly Highlights</h2>

            {/* Brief card */}
            <div className="bg-[#16161F] flex flex-col flex-1 pb-5">
                {/* Card header */}
                <div className='px-5 pt-5 pb-4 mb-4 border-b border-[#FFFFFF1A]'>
                    <div className="flex items-center gap-1.5">
                        <GlobeIcon />
                        <span className="text-[#88C4FF] text-[14px] leading-[20px] font-semibold">
                            Todays Macro Brief
                        </span>
                        <span className="text-white/60 text-[12px] leading-[14px] font-normal ml-auto">{brief.date}</span>
                    </div>

                    {/* Headline */}
                    <p className="mt-4 text-white text-[16px] leading-[19px] font-medium">
                        {brief.headline}
                    </p>
                </div>

                {/* Bullet points */}
                <ol className="flex flex-col gap-3 px-5">
                    {brief.points.map((pt) => (
                        <li key={pt.id} className="flex items-start gap-3">
                            <span className="flex-shrink-0 text-[12px] leading-[14px] text-[#88C4FF] font-semibold">
                                {String(pt.id).padStart(2, '0')}
                            </span>
                            <p className="text-white/60 text-[14px] leading-[20px] font-normal">{pt.text}</p>
                        </li>
                    ))}
                </ol>

                {/* Conviction bar */}
                <div className="pt-6 mt-6 px-5 border-t border-[#FFFFFF0D]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-[12px] leading-[17px] font-normal">Conviction</span>
                        <span className="text-[#88C4FF] text-[12px] leading-[17px] font-bold">{brief.conviction}<span className='text-[#88C4FF]/60 font-normal'>/100</span></span>
                    </div>

                    {/* Track */}
                    <div className="relative h-[8px] bg-[#FFFFFF0D] rounded-full overflow-hidden mb-2">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                                width: `${brief.conviction}%`,
                                background: '#88C4FF',
                            }}
                        />
                    </div>

                    {/* Regime */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/60 text-[12px] leading-[17px] font-normal">Regime</span>
                        <span className="text-white text-[12px] leading-[17px] font-semibold">{brief.regime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
