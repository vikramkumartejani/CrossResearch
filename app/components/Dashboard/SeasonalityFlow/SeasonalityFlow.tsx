'use client'
import CotPositioning from './CotPositioning'
import SeasonalityMap from './SeasonalityMap'
import SeasonalityDrivers from './SeasonalityDrivers'
import LockedSection from '../LockedSection'

export default function SeasonalityFlow() {
    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-2 mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_584_7226)">
                            <path d="M9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 6.90195 2.36148 5.00512 3.75 3.64393" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M3.75 9C3.75 11.8995 6.10051 14.25 9 14.25C11.8995 14.25 14.25 11.8995 14.25 9C14.25 6.10051 11.8995 3.75 9 3.75" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_584_7226">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Seasonality & Flow Desk</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Positioning, Cycles & Options Flow</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    CFTC Commitments of Traders for global Financial, agricultural and energy instruments, asset seasonality with regime - conditional returns, and options - derived sentiment via the volatility skew Surface.
                </p>
            </div>

            <div className="px-4 lg:px-6 flex flex-col gap-4">
                <CotPositioning />
                <LockedSection title="Seasonality Map">
                    <SeasonalityMap />
                </LockedSection>
                <LockedSection title="Seasonality Drivers">
                    <SeasonalityDrivers />
                </LockedSection>
            </div>
        </div>
    )
}
