'use client'
import { useState } from 'react'
import CotPositioning from './CotPositioning'
import SeasonalityMap from './SeasonalityMap'
import SeasonalityDrivers from './SeasonalityDrivers'

export default function SeasonalityFlow() {
    const [activeTab, setActiveTab] = useState('Eurusd')

    return (
        <div>
            {/* Header */}
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
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

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                {/* Tabs — scrollable on mobile */}
                <div className="overflow-x-auto mb-4 sm:mb-5">
                    <div className="flex items-center sm:gap-2 bg-[#FFFFFF08] border border-[#FFFFFF0D] p-1 w-fit min-w-max">
                        {['Eurusd', 'Btc Usd', 'Aapl', 'Nvda', 'Spx', 'Gbpusd'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 text-[13px] sm:text-[14px] leading-[20px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                    activeTab === tab
                                        ? 'text-white bg-[#FFFFFF0D]'
                                        : 'text-[#838388] hover:text-white/70'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* COT Positioning */}
                <CotPositioning />

                {/* Seasonality Map + Tabs */}
                <SeasonalityMap activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Seasonality Drivers */}
                <SeasonalityDrivers />
            </div>
        </div>
    )
}
