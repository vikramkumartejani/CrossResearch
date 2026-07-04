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
            <div className='relative mt-16 lg:mt-20 2xl:mt-[143px]'>
                {/* Ellipse 14 — left glow */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[60px] lg:blur-[250px]" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                {/* Ellipse 13 — right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[300px] lg:w-[787px] lg:h-[504px] top-[0px] lg:top-[200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-330px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <MarketTicker />
                </div>
            </div>
            <FeatureSections />
            <div className="relative" style={{ zIndex: 1 }}>
                {/* Ellipse 16951 — right side glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[280px] lg:w-[756px] lg:h-[345px] top-[10%] lg:top-[50%] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    transform: 'translateY(-50%) rotate(-20.7deg)',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <MarketIntelligence />
            </div>
            {/* Ellipse 22 (left-top) + Ellipse 21 (right) — MacroIntelligence */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '699px', height: '319px',
                    left: '-444px', top: '0px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[220px] lg:w-[756px] lg:h-[345px] top-[50px] lg:top-[-100px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <MacroIntelligence />
                </div>
                {/* Ellipse 17 — right bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '713px', height: '325px',
                    right: '-339px', bottom: '-150px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
            </div>
            {/* Ellipse 6 (left) + Ellipse 5 (right) — HowWeCompare */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '977px', height: '446px',
                    left: '-318px', top: '750px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[250px] lg:w-[977px] lg:h-[446px] top-[50px] lg:top-[650px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <HowWeCompare />
                </div>
            </div>
            <GetStarted />
            {/* Ellipse 16950 (left) + Ellipse 16949 (right) — SmarterTradingAccess */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '713px', height: '325px',
                    left: '-286px', top: '50%',
                    transform: 'translateY(-50%) rotate(-52.92deg)',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[220px] lg:w-[713px] lg:h-[325px] top-[8%] md:top-[30%] blur-[100px] lg:blur-[250px]" style={{
                    right: '-239px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <SmarterTradingAccess />
                </div>
            </div>
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page
