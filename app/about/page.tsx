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
    authors: [{ name: 'CrossResearch', url: 'https://crossresearch.io' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://crossresearch.io/about' },
    openGraph: {
        title: 'About | CrossResearch',
        description: 'Built for trader-first transparency. Institutional-grade tools, research, and data access for serious modern retail traders worldwide.',
        url: 'https://crossresearch.io/about',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://crossresearch.io/og-image.png', width: 1200, height: 630, alt: 'CrossResearch' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About | CrossResearch',
        description: 'Built for trader-first transparency. Institutional-grade tools, research, and data access for serious modern retail traders worldwide.',
        site: '@crossresearch',
        images: ['https://crossresearch.io/og-image.png'],
    },
}

const page = () => {
    return (
        <div>
            <Hero />
            <div className='py-7 sm:py-12 2xl:py-16'>
                <LogoSlider />
            </div>
            {/* Ellipse 14 - left glow + Ellipse 13 - right glow */}
            <div className="relative">
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[60px] lg:blur-[250px]" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[320px] lg:w-[787px] lg:h-[504px] top-[-150px] lg:top-[-200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <OurCompany />
                </div>
            </div>
            {/* Ellipse 18 (right) + Ellipse 1 (left) - TradingView */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '765px', height: '389px',
                    right: '-339px', top: '300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-23.64deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '765px', height: '389px',
                    left: '-373px', top: '300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <TradingView />
                </div>
            </div>
            {/* Ellipse 15 (left) + Ellipse 16 (right) - GlobalExpertise */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '765px', height: '453px',
                    left: '-2/49px', top: '0px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[280px] lg:w-[744px] lg:h-[410px] top-[-100px] lg:top-[0px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-26.89deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <GlobalExpertise />
                </div>
            </div>
            {/* Ellipse 19 (left) + Ellipse 20 (right) - CorePrinciples */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '977px', height: '446px',
                    left: '-465px', top: '400px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[250px] lg:w-[877px] lg:h-[346px] top-[70px] lg:top-[600px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <CorePrinciples />
                </div>
            </div>
            {/* Ellipse 16951 (right-bottom) - InstitutionalAccess */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] lg:w-[756px] h-[300px] lg:h-[345px] top-0 lg:bottom-[200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px', bottom: '200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <InstitutionalAccess />
                </div>
            </div>
            {/* Ellipse 22 (left) + Ellipse 21 (right) - Advisory */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                    width: '699px', height: '319px',
                    left: '-444px', top: '200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[220px] lg:w-[756px] lg:h-[345px] top-[-100px] lg:top-[-150px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <Advisory />
                </div>
            </div>
            <div className='relative pb-14 sm:pb-20 xl:pb-[170px] pt-16 sm:pt-[111px]'>
                {/* Ellipse 17 - right top glow */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '713px', height: '325px',
                    right: '-339px', top: '-300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 19 - left glow */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none" style={{
                    width: '977px', height: '446px',
                    left: '-465px', bottom: '-600px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 20 - right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none bottom-[-200px] lg:bottom-[-320px] h-[280px] md:h-[446px] w-[400px] md:w-[977px] right-[-200px] md:right-[-465px] blur-[80px] md:blur-[250px]" style={{
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
