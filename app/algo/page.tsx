import React from 'react'
import CTA from '../components/Home/CTA'
import type { Metadata } from 'next'
import HowWeCompare from '../components/Algo/HowWeCompare'
import MacroIntelligence from '../components/Algo/MacroIntelligence'
import MarketIntelligence from '../components/Algo/MarketIntelligence'
import GetStarted from '../components/Algo/GetStarted'
import SmarterTradingAccess from '../components/Algo/SmarterTradingAccess'

export const metadata: Metadata = {
    title: 'Algo | Institutional Fund & Quantitative Strategies',
    description: 'Explore CrossResearch institutional fund strategies built for high-net-worth and institutional clients. Systematic, quantitative approaches for disciplined capital allocation.',
    keywords: ['institutional fund', 'quantitative strategies', 'investing', 'systematic trading', 'high-net-worth investing', 'discretionary fund', 'CrossResearch'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/algo' },
    openGraph: {
        title: 'Investing | CrossResearch Institutional Fund',
        description: 'Systematic quantitative fund strategies built for those who understand the difference between speculation and disciplined capital allocation.',
        url: 'https://cross-research.vercel.app/algo',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Investing | CrossResearch Institutional Fund',
        description: 'Systematic quantitative fund strategies built for those who understand the difference between speculation and disciplined capital allocation.',
        site: '@crossresearch',
    },
}


const page = () => {
    return (
        <div>
            <MarketIntelligence/>
            <MacroIntelligence/>
            <HowWeCompare/>
            <GetStarted/>
            <SmarterTradingAccess/>
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page