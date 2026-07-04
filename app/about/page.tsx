import type { Metadata } from 'next'
import CTA from '../components/Home/CTA'
import Hero from '../components/About/Hero'
import LogoSlider from '../components/LogoSlider'
import OurCompany from '../components/About/OurCompany'
import GlobalExpertise from '../components/About/GlobalExpertise'
import CorePrinciples from '../components/About/CorePrinciples'
import InstitutionalAccess from '../components/About/InstitutionalAccess'
import Advisory from '../components/About/Advisory'
import TradingView from '../components/About/TradingView'

export const metadata: Metadata = {
    title: 'About | CrossResearch - Trader-First Research Platform',
    description: 'Learn about CrossResearch - built for trader-first transparency. Meet the team, explore our core principles, and discover how we deliver institutional-grade tools to retail traders.',
    keywords: ['CrossResearch', 'about', 'trader research', 'institutional tools', 'quant trading', 'macro research', 'algo trading platform'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/about' },
    openGraph: {
        title: 'About | CrossResearch',
        description: 'Built for trader-first transparency. Institutional-grade tools, research, and data access for serious modern retail traders worldwide.',
        url: 'https://cross-research.vercel.app/about',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About | CrossResearch',
        description: 'Built for trader-first transparency. Institutional-grade tools, research, and data access for serious modern retail traders worldwide.',
        site: '@crossresearch',
    },
}

const page = () => {
    return (
        <div>
            <Hero />
            <LogoSlider />
            <OurCompany />
            <TradingView />
            <GlobalExpertise />
            <CorePrinciples />
            <InstitutionalAccess />
            <Advisory />
            <div className='relative pb-14 sm:pb-20 xl:pb-[170px] pt-16 sm:pt-[111px]'>
                {/* Ellipse 19 — left glow */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none" style={{
                    width: '977px', height: '446px',
                    left: '-465px', bottom: '-600px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 20 — right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none h-[300px] md:h-[446px] w-[400px] md:w-[977px] right-[-200px] md:right-[-465px] blur-[80px] md:blur-[250px]" style={{
                    bottom: '-320px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
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
