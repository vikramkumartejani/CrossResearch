import type { Metadata } from 'next'
import CostsDefineProfit from '../components/BrokersAndPropFirm/CostsDefineProfit'
import Hero from '../components/BrokersAndPropFirm/Hero'
import TopRatedBrokers from '../components/BrokersAndPropFirm/TopRatedBrokers'
import CTA from '../components/Home/CTA'
import LogoSlider from '../components/LogoSlider'

export const metadata: Metadata = {
    title: 'Best Forex Brokers | Top Rated Brokers',
    description: 'Compare the best forex brokers with low commissions, fast execution, and strong regulation. CrossResearch reviews top brokers to maximize your trading profits.',
    keywords: ['best forex brokers', 'top rated brokers', 'low commission brokers', 'forex trading', 'broker comparison', 'CrossResearch'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/brokers' },
    openGraph: {
        title: 'Best Forex Brokers 2025 | CrossResearch',
        description: 'Compare top forex brokers with low fees, strong regulation, and reliable trading platforms. Find the best broker for your trading style.',
        url: 'https://cross-research.vercel.app/brokers',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://cross-research.vercel.app/og-image.png', width: 1200, height: 630, alt: 'CrossResearch' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Forex Brokers 2025 | CrossResearch',
        description: 'Compare top forex brokers with low fees, strong regulation, and reliable trading platforms.',
        site: '@crossresearch',
        images: ['https://cross-research.vercel.app/og-image.png'],
    },
}

const page = () => {
    return (
        <div>
            <Hero description="After years testing top brokers, we found one maximizing profits through low commissions and fast execution. Want details? Message us or sign up below." />
            <div className='py-7 sm:py-14 2xl:py-[120px]'>
                <LogoSlider />
            </div>

            {/* Ellipse 14 — left glow + Ellipse 13 — right glow (between LogoSlider & CostsDefineProfit) */}
            <div className="relative">
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none blur-[60px] lg:blur-[250px]" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[450px] h-[300px] lg:w-[833px] lg:h-[533px] top-[-150px] lg:top-[-200px] blur-[80px] lg:blur-[250px]" style={{
                    right: '-339px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <CostsDefineProfit />
                </div>
            </div>

            {/* Ellipse 1 (left) + Ellipse 2 (right) — top of TopRatedBrokers */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '977px', height: '625px',
                    left: '-305px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[977px] h-[350px] sm:h-[669.55px] right-[-200px] sm:right-[-305px] top-[-80px] sm:top-[100px] blur-[80px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-26.89deg)',
                    zIndex: 0,
                }} />
                <div className="relative bg-[#FFFFFF03] z-30" style={{ zIndex: 1 }}>
                    <TopRatedBrokers />
                </div>
            </div>

            <div className='mb-[60px] md:mb-[110px] pt-10 sm:pt-20 xl:pt-[105px] relative'>
                <div aria-hidden="true" className="sm:block hidden absolute pointer-events-none w-[977px] h-[446px] blur-[250px]" style={{
                    left: '-512px', bottom: '-300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none w-[400px] sm:w-[977px] h-[350px] sm:h-[446px] right-[-20%] sm:right-[-512px] bottom-[-350px] sm:bottom-[-300px] blur-[80px] sm:blur-[250px]" style={{
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