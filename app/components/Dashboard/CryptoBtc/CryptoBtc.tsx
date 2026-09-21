'use client'

import BtcDeskBrief from './BtcDeskBrief'
import InstitutionalFlow from './InstitutionalFlow'
import ForecastVolatility from './ForecastVolatility'
import Sentiment from './Sentiment'
import LockedSection from '../LockedSection'
import { CryptoBtcCopyProvider, useCryptoBtcCopy } from './cryptoBtcCopy'

function CryptoBtcContent() {
    const copy = useCryptoBtcCopy()

    return (
        <div>
            <div className="border-b border-[#FFFFFF0D] pb-4 sm:pb-6 mb-4 sm:mb-5 px-4 lg:px-6">
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
                    {copy.page.title}
                </h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">{copy.page.subtitle}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-6">
                <div className="lg:w-[300px] 2xl:w-[371px] flex-shrink-0 lg:sticky lg:top-10 h-fit">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h2 className="text-white text-[18px] leading-[22px] font-medium">{copy.sections.desk_brief}</h2>
                        <div>
                            <BtcDeskBrief />
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-3 sm:gap-5">
                    <LockedSection title={copy.sections.institutional_flow} keepTitle>
                        <InstitutionalFlow />
                    </LockedSection>

                    <LockedSection title={copy.sections.forecast_volatility} keepTitle>
                        <ForecastVolatility />
                    </LockedSection>

                    <LockedSection title="Sentiment" keepTitle>
                        <Sentiment />
                    </LockedSection>
                </div>
            </div>
        </div>
    )
}

export default function CryptoBtc() {
    return (
        <CryptoBtcCopyProvider>
            <CryptoBtcContent />
        </CryptoBtcCopyProvider>
    )
}
