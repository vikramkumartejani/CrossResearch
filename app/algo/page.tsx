import type { Metadata } from 'next'
import CTA from '../components/Home/CTA'
import Hero from '../components/Algo/Hero'
import MarketTicker from '../components/Algo/MarketTicker'
import MarketIntelligence from '../components/Algo/MarketIntelligence'
import MacroIntelligence from '../components/Algo/MacroIntelligence'
import FeatureSections from '../components/Algo/FeatureSections'
import HowWeCompare from '../components/Algo/HowWeCompare'
import GetStarted from '../components/Algo/GetStarted'
import SmarterTradingAccess from '../components/Algo/SmarterTradingAccess'

export const metadata: Metadata = {
    title: 'Algo | TradingView Indicators & Macro Research Dashboard',
    description: 'Purpose-built TradingView indicators and a live macro research dashboard — giving retail traders the same data edge that moves institutional desks.',
    keywords: ['TradingView indicators', 'algo trading', 'macro research dashboard', 'institutional algorithms', 'market intelligence', 'quantitative trading', 'CrossResearch'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/algo' },
    openGraph: {
        title: 'Algo | CrossResearch TradingView Indicators & Macro Tools',
        description: 'Purpose-built TradingView indicators and a live macro research dashboard — giving retail traders the same data edge that moves institutional desks.',
        url: 'https://cross-research.vercel.app/algo',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Algo | CrossResearch TradingView Indicators & Macro Tools',
        description: 'Purpose-built TradingView indicators and a live macro research dashboard — giving retail traders the same data edge that moves institutional desks.',
        site: '@crossresearch',
    },
}

const page = () => {
    return (
        <div>
            <Hero />
            <div className='mt-16 lg:mt-20 2xl:mt-[143px]'>
                <MarketTicker />
            </div>
            <FeatureSections />
            <MarketIntelligence />
            <MacroIntelligence />
            <HowWeCompare />
            <GetStarted />
            <SmarterTradingAccess />
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page
