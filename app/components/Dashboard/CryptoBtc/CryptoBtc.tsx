import BtcDeskBrief from './BtcDeskBrief'
import InstitutionalFlow from './InstitutionalFlow'
import ForecastVolatility from './ForecastVolatility'
import Sentiment from './Sentiment'

export default function CryptoBtc() {
    return (
        <div>
            {/* Header */}
            <div className="border-b border-[#FFFFFF0D] pb-4 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.9987 14.6673C11.6806 14.6673 14.6654 11.6825 14.6654 8.00065C14.6654 4.31875 11.6806 1.33398 7.9987 1.33398C4.3168 1.33398 1.33203 4.31875 1.33203 8.00065C1.33203 11.6825 4.3168 14.6673 7.9987 14.6673Z" stroke="#838388" strokeWidth="1.2" />
                        <path d="M6.33203 10.6673V5.33398" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M7.33203 5.33333V4M8.9987 5.33333V4" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M7.33203 11.9993V10.666M8.9987 11.9993V10.666" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M6.33203 8H9.66536C10.2176 8 10.6654 8.44773 10.6654 9V9.66667C10.6654 10.2189 10.2176 10.6667 9.66536 10.6667H5.33203" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.33203 5.33398H9.66536C10.2176 5.33398 10.6654 5.7817 10.6654 6.33398V7.00065C10.6654 7.55292 10.2176 8.00065 9.66536 8.00065H6.33203" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Crypto / BTC Desk</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Bitcoin Intelligence</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    ETF flow regime, model-driven return forecast, vol regime classification, liquidation magnets and an in-
                    house Fear & Greed composite — every chart engineered for one decision.
                </p>
            </div>

            {/* ── Body ── */}
            <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] 2xl:grid-cols-[371px_1fr] gap-4 items-stretch">

                    {/* LEFT: BTC Desk Brief — full height */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h2 className="text-white text-[18px] leading-[22px] font-medium">BTC Desk Brief</h2>
                        <div className="flex-1">
                            <BtcDeskBrief />
                        </div>
                    </div>

                    {/* RIGHT: all three sections stacked */}
                    <div className="flex flex-col gap-3 sm:gap-5 h-full">
                        {/* Institutional Flow */}
                        <div>
                            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Institutional Flow</h2>
                            <InstitutionalFlow />
                        </div>

                        {/* Forecast & Volatility */}
                        <div>
                            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Forecast & Volatility</h2>
                            <ForecastVolatility />
                        </div>

                        {/* Sentiment */}
                        <Sentiment />
                    </div>

                </div>
            </div>
        </div>
    )
}
