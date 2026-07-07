'use client'
import { useState, useEffect } from 'react'

export default function MarketTiming() {
    const [currentTime, setCurrentTime] = useState('14:32:15')

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const h = String(now.getUTCHours()).padStart(2, '0')
            const m = String(now.getUTCMinutes()).padStart(2, '0')
            const s = String(now.getUTCSeconds()).padStart(2, '0')
            setCurrentTime(`${h}:${m}:${s}`)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    // Week of May 2025 containing the 21st
    const week = [21, 22, 23, 24, 25, 26, 27]
    const highlightBlue = 22
    const todayMarker = 24

    return (
        <div className='h-full'>
            <h4 className="text-white text-[18px] leading-[22px] font-medium">Market Timing</h4>

            <div className="mt-4 bg-[#16161F] border border-[#0C0C16] p-5 flex flex-col">
                {/* UTC clock */}
                <div className="flex items-center gap-2 mb-[18px]">
                    <span className="text-white/60 text-[14px] leading-[17px] font-medium">15:00 UTC Time : {currentTime}</span>
                </div>

                {/* Month heading */}
                <p className="text-white/60 text-[16px] leading-[19px] font-semibold">May 2025</p>

                {/* Calendar grid */}
                <div className='mt-4'>
                    {/* Week row: day name + date number stacked, tick below */}
                    <div className="flex items-center justify-between">
                        {week.map((d, i) => {
                            const isBlue = d === highlightBlue
                            const isToday = d === todayMarker
                            return (
                                <div key={d} className="flex flex-col items-center gap-[6px]">
                                    {/* Day name */}
                                    <span className='text-white/60 text-[14px] font-normal leading-[17px]'>
                                        {days[i]}
                                    </span>
                                    {/* Date badge */}
                                    <div
                                        className={`py-[3px] flex items-center justify-center text-[18px] font-semibold leading-[22px] cursor-pointer transition-colors
                                            ${isBlue
                                                ? 'rounded-[8px] px-[17px] text-[#88C4FF]'
                                                : isToday
                                                    ? 'rounded-[10px] px-[17px] text-[#88C4FF]'
                                                    : 'text-white'
                                            }`}
                                        style={(isBlue || isToday) ? {
                                            background: 'linear-gradient(180deg, rgba(136, 196, 255, 0.15) 0%, rgba(136, 196, 255, 0) 98.21%)',
                                        } : undefined}
                                    >
                                        {d}
                                    </div>
                                    {/* Tick line below */}
                                    <div className="w-px h-[13px] bg-[#FFFFFF40] mt-0.5" />
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Optimal Trading Window button */}
                <button className="mt-6 w-fit mx-auto py-3 px-4 bg-[#FFFFFF0D] border border-[#FFFFFF0D] rounded-[8px] text-white text-[14px] leading-[17px] font-semibold transition-colors cursor-pointer">
                    Optimal Trading Window
                </button>

                {/* Legend */}
                <div className="mt-[22px] flex items-center justify-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1 text-[14px] leading-[17px] font-normal text-white">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.49431 1.33754C4.68098 0.888789 5.31764 0.888789 5.50431 1.33754L6.37181 3.42337L8.62348 3.60421C9.10848 3.64296 9.30514 4.24796 8.93556 4.56462L7.22014 6.03421L7.74389 8.23129C7.85681 8.70462 7.34223 9.07837 6.92723 8.82504L4.99931 7.64754L3.07139 8.82504C2.65639 9.07837 2.14181 8.70421 2.25473 8.23129L2.77848 6.03421L1.06306 4.56462C0.693476 4.24796 0.890143 3.64296 1.37514 3.60421L3.62681 3.42337L4.49431 1.33754Z" fill="#62A381" />
                        </svg>
                        Bottom Formation
                    </span>
                    <span className="flex items-center gap-1 text-[14px] leading-[17px] font-normal text-white">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="3" cy="3" r="3" fill="#F4D36D" />
                        </svg>
                        No Cluster
                    </span>
                    <span className="flex items-center gap-1 text-[14px] leading-[17px] font-normal text-white">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="3" cy="3" r="3" fill="#E25C3F" />
                        </svg>
                        Top Formation
                    </span>
                </div>
            </div>
        </div>
    )
}
