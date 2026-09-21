import GeoStatsRow from './GeoStatsRow'
import RiskTensionMonitoring from './RiskTensionMonitoring'
import GeographicalDistribution from './GeographicalDistribution'
import TopRisks from './TopRisks'
import LockedSection from '../LockedSection'

export default function Geopolitical() {
    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Rick Map & Live Surveillance</h1>
                    <p className="text-[#838388] text-[12px] leading-[17px]">
                        Active flashpoints - conflicts, regime disruption, election windows - plotted globally, Coproprietor Geopolitical Risk Index runs underneath for cross-asset tail•hedge timing.
                    </p>
                </div>
                <div className='flex items-center gap-1 flex-shrink-0'>
                    <div className='w-1.5 h-1.5 bg-[#E25C3F] rounded-full' />
                    <p className='text-[#E25C3F] text-[14px] leading-[18px] font-medium'>Off Regime Elevated</p>
                </div>
            </div>

            <GeoStatsRow />
            <div className="flex flex-col gap-4 mt-4">
                <LockedSection title="Risk Tension">
                    <RiskTensionMonitoring />
                </LockedSection>
                <LockedSection title="Geographical Distribution">
                    <GeographicalDistribution />
                </LockedSection>
                <LockedSection title="Top Risks">
                    <TopRisks />
                </LockedSection>
            </div>
        </div>
    )
}
