import GeoStatsRow from './GeoStatsRow'
import RiskTensionMonitoring from './RiskTensionMonitoring'
import GeographicalDistribution from './GeographicalDistribution'
import TopRisks from './TopRisks'

export default function Geopolitical() {
    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex items-end justify-between gap-4">
                <div>
                    <div className="mb-3 flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25 15.75H7.5C4.67157 15.75 3.25736 15.75 2.37868 14.8713C1.5 13.9927 1.5 12.5784 1.5 9.75V7.5C1.5 4.67157 1.5 3.25736 2.37868 2.37868C3.25736 1.5 4.67157 1.5 7.5 1.5H9C11.8284 1.5 13.2427 1.5 14.1213 2.37868C15 3.25736 15 4.67157 15 7.5V7.875" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.0552 10.8027C13.2144 10.3991 13.7856 10.3991 13.9448 10.8027L13.9723 10.8727C14.3611 11.8585 15.1415 12.6388 16.1273 13.0276L16.1973 13.0552C16.6009 13.2144 16.6009 13.7856 16.1973 13.9448L16.1273 13.9723C15.1415 14.3611 14.3611 15.1415 13.9723 16.1273L13.9448 16.1973C13.7856 16.6009 13.2144 16.6009 13.0552 16.1973L13.0276 16.1273C12.6388 15.1415 11.8585 14.3611 10.8727 13.9723L10.8027 13.9448C10.3991 13.7856 10.3991 13.2144 10.8027 13.0552L10.8727 13.0276C11.8585 12.6388 12.6388 11.8585 13.0276 10.8727L13.0552 10.8027Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.25 5.25H11.25M5.25 8.625H11.25M5.25 12H8.25" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Geopolitical Monitor</span>
                    </div>
                    <h1 className="text-white text-[35px] font-medium leading-[42px] mb-2">Rick Map & Live Surveillance</h1>
                    <p className="text-[#838388] text-[12px] leading-[17px]">
                        Active flashpoints — conflicts, regime disruption, election windows — plotted globally, Coproprietor Geopolitical Risk Index runs underneath for cross-asset tail•hedge timing.
                    </p>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='w-1.5 h-1.5 bg-[#E25C3F] rounded-full' />
                    <p className='text-[#E25C3F] text-[14px] leading-[18px] font-medium'>Off Regime Elevated</p>
                </div>
            </div>

            {/* ── Stats Row ── */}
            <GeoStatsRow />

            {/* ── Risk Tension Monitoring ── */}
            <RiskTensionMonitoring />

            {/* ── Geographical Distribution + Flashpoint Brief ── */}
            <GeographicalDistribution />

            {/* ── Top 3 Risks ── */}
            <TopRisks />
        </div>
    )
}
