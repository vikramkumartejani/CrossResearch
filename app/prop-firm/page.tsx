import type { Metadata } from 'next'
import Hero from '../components/BrokersAndPropFirm/Hero'
import RulesDefineSuccess from '../components/BrokersAndPropFirm/RulesDefineSuccess'
import TopPropFirm from '../components/BrokersAndPropFirm/TopPropFirm'
import CTA from '../components/Home/CTA'
import LogoSlider from '../components/LogoSlider'

export const metadata: Metadata = {
    title: 'Best Prop Firms | Top Funded Trading Accounts',
    description: 'Compare the best proprietary trading firms with fair rules, high profit splits up to 95%, fast payouts, and accounts from $1,000 to $300,000. Start your funded trading journey.',
    keywords: ['best prop firms', 'funded trading accounts', 'proprietary trading firms', 'FTMO alternative', 'profit split', 'funded trader', 'CrossResearch'],
    authors: [{ name: 'CrossResearch', url: 'https://crossresearch.io' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://crossresearch.io/prop-firm' },
    openGraph: {
        title: 'Best Prop Firms 2025 | CrossResearch',
        description: 'Compare top prop firms with fair rules, high profit splits, fast payouts, and reliable trading conditions.',
        url: 'https://crossresearch.io/prop-firm',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://crossresearch.io/og-image.png', width: 1200, height: 630, alt: 'CrossResearch' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Prop Firms 2025 | CrossResearch',
        description: 'Compare top prop firms with fair rules, high profit splits, fast payouts, and reliable trading conditions.',
        site: '@crossresearch',
        images: ['https://crossresearch.io/og-image.png'],
    },
}

const page = () => {
    return (
        <div>
            <Hero description="after testing the top prop firms and trading funded accounts onseelves we found the ones that cait truly boost your performance. For new traders or those with limited capital, prop firms can be a strong way to start and scale faster, but they require discipline, strong psychology, and solid risk management." descriptionMaxWidth="1022px" />
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
                    <RulesDefineSuccess />
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
                    <TopPropFirm />
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