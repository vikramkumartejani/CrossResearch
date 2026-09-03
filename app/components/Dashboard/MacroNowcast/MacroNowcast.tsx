import StatsBar from './StatsBar'
import NowcastsGrid from './NowcastsGrid'
import RegimeProbabilityMatrix from './RegimeProbabilityMatrix'
import UpcomingReleases from './UpcomingReleases'
import LockedSection from '../LockedSection'

export default function MacroNowcast() {
    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <div className="mb-3 flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.25 1.5V16.5" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M5.25 5.625C5.25 4.92404 5.25 4.57356 5.40072 4.3125C5.49946 4.14148 5.64148 3.99946 5.8125 3.90072C6.07356 3.75 6.42404 3.75 7.125 3.75H13.875C14.576 3.75 14.9264 3.75 15.1875 3.90072C15.3585 3.99946 15.5005 4.14148 15.5993 4.3125C15.75 4.57356 15.75 4.92404 15.75 5.625C15.75 6.32596 15.75 6.67644 15.5993 6.9375C15.5005 7.10852 15.3585 7.25054 15.1875 7.34928C14.9264 7.5 14.576 7.5 13.875 7.5H7.125C6.42404 7.5 6.07356 7.5 5.8125 7.34928C5.64148 7.25054 5.49946 7.10852 5.40072 6.9375C5.25 6.67644 5.25 6.32596 5.25 5.625Z" stroke="#838388" strokeWidth="1.2" />
                            <path d="M5.25 12.375C5.25 11.674 5.25 11.3236 5.40072 11.0625C5.49946 10.8915 5.64148 10.7495 5.8125 10.6507C6.07356 10.5 6.42404 10.5 7.125 10.5H11.625C12.326 10.5 12.6764 10.5 12.9375 10.6507C13.1085 10.7495 13.2505 10.8915 13.3493 11.0625C13.5 11.3236 13.5 11.674 13.5 12.375C13.5 13.076 13.5 13.4264 13.3493 13.6875C13.2505 13.8585 13.1085 14.0005 12.9375 14.0993C12.6764 14.25 12.326 14.25 11.625 14.25H7.125C6.42404 14.25 6.07356 14.25 5.8125 14.0993C5.64148 14.0005 5.49946 13.8585 5.40072 13.6875C5.25 13.4264 5.25 13.076 5.25 12.375Z" stroke="#838388" strokeWidth="1.2" />
                        </svg>
                        <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Macro Nowcasting Desk</span>
                    </div>
                    <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">Probability Signals & Sentiment</h1>
                    <p className="text-[#838388] text-[12px] leading-[17px]">
                        Cross - venue prediction - market intelligence. We aggregate polymarket, Kalshi, Predictlt, manifold & meticulous into a single belief lattice - then surface the moves that matter.
                    </p>
                </div>
                <div className='flex items-center gap-1 flex-shrink-0'>
                    <div className='w-1.5 h-1.5 bg-white rounded-full' />
                    <p className='text-[12px] leading-[18px] font-medium'>Market State <span className='text-[14px] leading-[18px] font-semibold'>Divergent</span></p>
                </div>
            </div>

            <div className="px-4 lg:px-6 flex flex-col gap-4">
                <StatsBar />
                <LockedSection title="Nowcast Grid">
                    <NowcastsGrid />
                </LockedSection>
                <LockedSection title="Regime Probability">
                    <RegimeProbabilityMatrix />
                </LockedSection>
                <LockedSection title="Upcoming Releases">
                    <UpcomingReleases />
                </LockedSection>
            </div>
        </div>
    )
}
