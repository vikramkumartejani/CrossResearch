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
    title: 'Best Prop Firms | Top Funded Trading Accounts',
    description: 'Compare the best proprietary trading firms with fair rules, high profit splits up to 95%, fast payouts, and accounts from $1,000 to $300,000. Start your funded trading journey.',
    keywords: ['best prop firms', 'funded trading accounts', 'proprietary trading firms', 'FTMO alternative', 'profit split', 'funded trader', 'CrossResearch'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/prop-firm' },
    openGraph: {
        title: 'Best Prop Firms 2025 | CrossResearch',
        description: 'Compare top prop firms with fair rules, high profit splits, fast payouts, and reliable trading conditions.',
        url: 'https://cross-research.vercel.app/prop-firm',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Prop Firms 2025 | CrossResearch',
        description: 'Compare top prop firms with fair rules, high profit splits, fast payouts, and reliable trading conditions.',
        site: '@crossresearch',
    },
}

const page = () => {
    return (
        <div>
            <Hero />
            <LogoSlider />
            <StrategyMattersMost />
            <OurStrategies/>
            <InstitutionalFund/>
            <AccessOurFunds/>
            <ImpossibleToReplicate/>
            <InvestorSupport/>
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page