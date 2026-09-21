'use client'
import CotPositioning from './CotPositioning'
import CotPositioningCharts from './CotPositioningCharts'
import SeasonalityMap from './SeasonalityMap'
import SeasonalityDrivers from './SeasonalityDrivers'
import LockedSection from '../LockedSection'

export default function SeasonalityFlow() {
    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-2 mb-5 px-4 lg:px-6">
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Positioning, Cycles & Options Flow</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    CFTC Commitments of Traders for global Financial, agricultural and energy instruments, asset seasonality with regime - conditional returns, and options - derived sentiment via the volatility skew Surface.
                </p>
            </div>

            <div className="px-4 lg:px-6 flex flex-col gap-4">
                <CotPositioningCharts />
                <CotPositioning />
                <SeasonalityMap />
                <LockedSection title="Seasonality Drivers">
                    <SeasonalityDrivers />
                </LockedSection>
            </div>
        </div>
    )
}
