import type { Metadata } from 'next'
import Hero from '../components/Affiliate/Hero'
import LogoSlider from '../components/LogoSlider'
import CTA from '../components/Home/CTA'
import TestimonialsSection from '../components/Home/TestimonialsSection'
import TheEdgeYouareGivingThem from '../components/Affiliate/TheEdgeYouareGivingThem'
import GetInTouch from '../components/Affiliate/GetInTouch'
import ThePackage from '../components/Affiliate/ThePackage'
import WhoThisIsFor from '../components/Affiliate/WhoThisIsFor'
import PowerfulTools from '../components/Affiliate/PowerfulTools'
import TheProcess from '../components/Affiliate/TheProcess'

export const metadata: Metadata = {
    title: 'Affiliate | CrossResearch - Partner With Us',
    description: 'Join the CrossResearch affiliate program. Partner with a trader-first research platform and offer your community institutional-grade tools, algo signals, and macro intelligence.',
    keywords: ['CrossResearch affiliate', 'trading affiliate program', 'forex affiliate', 'algo trading partner', 'prop firm affiliate', 'trading community partnership'],
    authors: [{ name: 'CrossResearch', url: 'https://crossresearch.io' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://crossresearch.io/affiliate' },
    openGraph: {
        title: 'Affiliate | CrossResearch',
        description: 'Partner with CrossResearch and give your trading community access to institutional-grade research, algo signals, and macro dashboards.',
        url: 'https://crossresearch.io/affiliate',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://crossresearch.io/og-image.png', width: 1200, height: 630, alt: 'CrossResearch' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affiliate | CrossResearch',
        description: 'Partner with CrossResearch and give your trading community access to institutional-grade research, algo signals, and macro dashboards.',
        site: '@crossresearch',
        images: ['https://crossresearch.io/og-image.png'],
    },
}

const page = () => {
    return (
        <div>
            <Hero />
            <LogoSlider />
            {/* Ellipse 14 - left glow + Ellipse 13 - right glow (below LogoSlider) */}
            <div className="relative">
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[300px] lg:w-[787px] lg:h-[504px] top-[-100px] lg:top-[-200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <PowerfulTools/>
                </div>
            </div>
            <WhoThisIsFor/>
            {/* Ellipse 1 - left glow + Ellipse 18 - right glow (below WhoThisIsFor) */}
            <div className="relative">
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '765px', height: '489px',
                    left: '-373px', top: '-400px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[300px] lg:w-[765px] lg:h-[489px] top-[-80px] lg:top-[-500px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-23.64deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <ThePackage/>
                </div>
                {/* Ellipse 15 - left glow + Ellipse 16 - right glow (bottom of ThePackage) */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '865px', height: '553px',
                    left: '-249px', bottom: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[300px] lg:w-[744px] lg:h-[510px] bottom-[-200px] lg:bottom-[200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-26.89deg)',
                    zIndex: 0,
                }} />
            </div>
            <TheEdgeYouareGivingThem />
            {/* Ellipse 19 - left glow + Ellipse 20 - right glow (bottom of TheEdgeYouareGivingThem) */}
            <div className="relative">
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '977px', height: '446px',
                    left: '-465px', top: '-250px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none w-[450px] h-[250px] lg:w-[977px] lg:h-[446px] top-[-100px] lg:top-[-200px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <TestimonialsSection />
                </div>
            </div>
            {/* TheProcess with glows - top & bottom both sides */}
            <div className="relative">
                {/* Ellipse 22 - top left */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '699px', height: '319px',
                    left: '-444px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 21 - top right */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[200px] lg:w-[756px] lg:h-[345px] top-[-30px] lg:top-0 blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 4 - bottom left */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '567px', height: '259px',
                    left: '-313px', bottom: '350px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 17 - bottom right */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[200px] lg:w-[713px] lg:h-[325px] bottom-[450px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <TheProcess/>
                </div>
            </div>
            {/* GetInTouch with glows */}
            <div className="relative">
                {/* Ellipse 6 - left */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[250px]" style={{
                    width: '977px', height: '446px',
                    left: '-318px', top: '250px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 5 - right */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[250px] lg:w-[977px] lg:h-[446px] top-0 lg:top-[100px] blur-[100px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <GetInTouch />
                </div>
            </div>
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page