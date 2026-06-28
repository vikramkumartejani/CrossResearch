import type { Metadata } from 'next'
import Navbar from "./components/Navbar";
import Hero from "./components/Home/Hero";
import LogoSlider from "./components/LogoSlider";
import GlobalMarketInsights from "./components/Home/GlobalMarketInsights";
import StatsSection from "./components/Home/StatsSection";
import MarketsSection from "./components/Home/MarketsSection";
import IntelligenceSection from "./components/Home/IntelligenceSection";
import ArticlesSection from "./components/Home/ArticlesSection";
import FAQ from "./components/FAQ";
import PricingSection from "./components/Home/PricingSection";
import ContactSection from "./components/Home/ContactSection";
import TestimonialsSection from "./components/Home/TestimonialsSection";
import CTA from "./components/Home/CTA";

export const metadata: Metadata = {
  title: 'CrossResearch - Institutional-Grade Market Intelligence for Retail Traders',
  description: 'Access proprietary algorithms, macro intelligence, volatility analytics, and market regime tools trusted by advanced traders worldwide. Start your free trial today.',
  keywords: ['market intelligence', 'trading signals', 'macro analysis', 'algo trading', 'market regime', 'volatility analytics', 'CrossResearch', 'institutional trading'],
  authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://cross-research.vercel.app' },
  openGraph: {
    title: 'CrossResearch - Institutional-Grade Market Intelligence',
    description: 'Access proprietary algorithms, macro intelligence, and market regime tools trusted by advanced traders worldwide.',
    url: 'https://cross-research.vercel.app',
    siteName: 'CrossResearch',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrossResearch - Institutional-Grade Market Intelligence',
    description: 'Access proprietary algorithms, macro intelligence, and market regime tools trusted by advanced traders worldwide.',
    site: '@crossresearch',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="relative">
        {/* Left glow */}
        <div
          aria-hidden="true"
          className="sm:block hidden absolute pointer-events-none z-0 w-[500px] h-[320px] md:w-[700px] md:h-[450px] lg:w-[977px] lg:h-[625px]
                    -left-36 md:-left-48 lg:-left-[300px] top-20 sm:top-56 md:top-72 lg:top-[350px]
                    -rotate-[26.89deg]
                    blur-[160px] md:blur-[200px] lg:blur-[250px]
                    bg-[rgba(34,126,217,0.4)]"
        />

        {/* Right glow */}
        <div
          aria-hidden="true"
          className="sm:block hidden absolute pointer-events-none z-0 w-[500px] h-[320px] md:w-[700px] md:h-[450px] lg:w-[977px] lg:h-[625px]
                    -right-36 md:-right-48 lg:-right-[300px] top-120 sm:top-56 md:top-72 lg:top-[350px]
                    -rotate-[26.89deg]
                    blur-[160px] md:blur-[200px] lg:blur-[250px]
                    bg-[rgba(34,126,217,0.4)]"
        />
        <div className="relative" style={{ zIndex: 1 }}>
          <LogoSlider />
          <GlobalMarketInsights />
        </div>
      </div>

      <div className="relative">
        {/* Left glow */}
        <div
          aria-hidden="true"
          className="sm:block hidden absolute pointer-events-none z-0 w-[500px] h-[320px] md:w-[700px] md:h-[450px] lg:w-[977px] lg:h-[625px]
                    -left-40 sm:-left-56 md:-left-72 lg:-left-[758px] top-0 bg-[rgba(34,126,217,0.4)]
                    blur-[160px] md:blur-[200px] lg:blur-[250px]"
        />

        <div
          aria-hidden="true"
          className="sm:block hidden absolute pointer-events-none z-0 w-[500px] h-[320px] md:w-[700px] md:h-[450px] lg:w-[977px] lg:h-[625px]
                    -right-40 md:-right-56 lg:-right-[400px] top-[800px] sm:top-0 -rotate-[26.89deg] bg-[rgba(34,126,217,0.4)]
                    blur-[160px] md:blur-[200px] lg:blur-[250px]"
        />
        <div className="relative" style={{ zIndex: 1 }}>
          <StatsSection />
          <MarketsSection />
          <IntelligenceSection />
        </div>
      </div>

      <ArticlesSection />
      <PricingSection />

      <ContactSection />
      <TestimonialsSection />
      <FAQ />

      <div className="relative">
        <div
          aria-hidden="true"
          className="sm:block hidden absolute pointer-events-none z-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] 
                    -right-[20%] sm:-right-[10%] top-[25%] bg-[#227ED966]
                    blur-[150px] md:blur-[200px] lg:blur-[250px]"
        />
        <div className="pb-20 lg:pb-[120px] xl:pb-[170px]">
        <CTA />
        </div>
      </div>
    </main>
  );
}
