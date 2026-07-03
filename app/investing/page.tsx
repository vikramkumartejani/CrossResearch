import type { Metadata } from 'next'
import Hero from '../components/Investing/Hero'
import LogoSlider from '../components/LogoSlider'
import StrategyMattersMost from '../components/Investing/StrategyMattersMost'
import CTA from '../components/Home/CTA'
import OurStrategies from '../components/Investing/OurStrategies'
import InstitutionalFund from '../components/Investing/InstitutionalFund'
import InvestorSupport from '../components/Investing/InvestorSupport'
import AccessOurFunds from '../components/Investing/AccessOurFunds'
import ImpossibleToReplicate from '../components/Investing/ImpossibleToReplicate'

export const metadata: Metadata = {
    title: 'Investing | Institutional Fund & Quantitative Strategies',
    description: 'Explore CrossResearch institutional fund strategies built for high-net-worth and institutional clients. Systematic, quantitative approaches for disciplined capital allocation.',
    keywords: ['institutional fund', 'quantitative strategies', 'investing', 'systematic trading', 'high-net-worth investing', 'discretionary fund', 'CrossResearch'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/investing' },
    openGraph: {
        title: 'Investing | CrossResearch Institutional Fund',
        description: 'Systematic quantitative fund strategies built for those who understand the difference between speculation and disciplined capital allocation.',
        url: 'https://cross-research.vercel.app/investing',
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
            <Hero />
            <div className='py-7 sm:py-14 2xl:py-[120px]'>
                <LogoSlider />
            </div>
            {/* Ellipse 14 — left glow + Ellipse 13 — right glow (between LogoSlider & StrategyMattersMost) */}
            <div className="relative">
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[60px] lg:blur-[250px]" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[500px] h-[320px] lg:w-[833px] lg:h-[533px] top-[-150px] lg:top-[-200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <StrategyMattersMost />
                </div>
                {/* Ellipse 1 — left bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '977px', height: '625px',
                    left: '-405px', bottom: '-300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                {/* Ellipse 2 — right bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[977px] h-[350px] sm:h-[669px] right-[-200px] sm:right-[-405px] bottom-[-300px] blur-[100px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-26.89deg)',
                    zIndex: 0,
                }} />
            </div>
            <OurStrategies/>
            {/* Ellipse 15 (left) + Ellipse 16 (right) — bottom of OurStrategies */}
            <div className="relative">
                {/* Ellipse 15 — left bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '865px', height: '553px',
                    left: '-449px', top: '-550px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                {/* Ellipse 16 — right bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[744px] h-[350px] sm:h-[510px] right-[-200px] sm:right-[-505px] top-[-150px] sm:top-[-600px] blur-[100px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-26.89deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <InstitutionalFund/>
                </div>
            </div>
            {/* Ellipse 3 (left) + Ellipse 12 (right) — top of AccessOurFunds */}
            <div className="relative">
                {/* Ellipse 3 — left top glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '977px', height: '446px',
                    left: '-512px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 12 — right top glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[864px] h-[300px] sm:h-[394px] right-[-200px] sm:right-[-300px] top-[0px] sm:top-[100px] blur-[100px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <AccessOurFunds/>
                </div>
            </div>
            {/* Ellipse 4 (left) + Ellipse 17 (right) — ImpossibleToReplicate section */}
            <div className="relative">
                {/* Ellipse 4 — left glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '977px', height: '446px',
                    left: '-612px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 17 — right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[977px] h-[300px] sm:h-[446px] right-[-200px] sm:right-[-400px] top-[0px] sm:top-[-100px] blur-[100px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <ImpossibleToReplicate/>
                </div>
            </div>
            {/* Ellipse 5 (right) + Ellipse 6 (left) — InvestorSupport section */}
            <div className="relative">
                {/* Ellipse 6 — left glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '977px', height: '446px',
                    left: '-418px', top: '300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 5 — right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[977px] h-[300px] sm:h-[446px] right-[-200px] sm:right-[-400px] top-[100px] sm:top-[200px] blur-[100px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <InvestorSupport/>
                </div>
            </div>
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px] relative'>
                {/* Ellipse 7 — right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] md:w-[730px] h-[200px] right-[-150px] md:right-[-300px] md:h-[333px] blur-[100px] md:blur-[250px] lg:-rotate-[20.7deg]" style={{
                 bottom: '0px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <CTA />
                </div>
            </div>
        </div>
    )
}

export default page