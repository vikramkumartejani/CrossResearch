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

export const metadata: Metadata = {
    title: 'Affiliate | CrossResearch - Partner With Us',
    description: 'Join the CrossResearch affiliate program. Partner with a trader-first research platform and offer your community institutional-grade tools, algo signals, and macro intelligence.',
    keywords: ['CrossResearch affiliate', 'trading affiliate program', 'forex affiliate', 'algo trading partner', 'prop firm affiliate', 'trading community partnership'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/affiliate' },
    openGraph: {
        title: 'Affiliate | CrossResearch',
        description: 'Partner with CrossResearch and give your trading community access to institutional-grade research, algo signals, and macro dashboards.',
        url: 'https://cross-research.vercel.app/affiliate',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://cross-research.vercel.app/og-image.png', width: 1200, height: 630, alt: 'CrossResearch' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affiliate | CrossResearch',
        description: 'Partner with CrossResearch and give your trading community access to institutional-grade research, algo signals, and macro dashboards.',
        site: '@crossresearch',
        images: ['https://cross-research.vercel.app/og-image.png'],
    },
}

const page = () => {
    return (
        <div>
            <Hero />
            <LogoSlider />
            <PowerfulTools/>
            <WhoThisIsFor/>
            <ThePackage/>
            <TheEdgeYouareGivingThem />
            <TestimonialsSection />
            <GetInTouch />
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page