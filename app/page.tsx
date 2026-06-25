import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoSlider from "./components/LogoSlider";
import GlobalMarketInsights from "./components/GlobalMarketInsights";
import StatsSection from "./components/StatsSection";
import MarketsSection from "./components/MarketsSection";
import IntelligenceSection from "./components/IntelligenceSection";
import ArticlesSection from "./components/ArticlesSection";
import FAQ from "./components/FAQ";
import PricingSection from "./components/PricingSection";
import ContactSection from "./components/ContactSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* LogoSlider + GlobalMarketInsights */}
      <div className="relative">
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ width: "977px", height: "625px", left: "-300px", top: "350px", background: "rgba(34, 126, 217, 0.4)", filter: "blur(250px)", transform: "rotate(-26.89deg)", zIndex: 0 }} />
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ width: "977px", height: "625px", right: "-300px", top: "350px", background: "rgba(34, 126, 217, 0.4)", filter: "blur(250px)", transform: "rotate(-26.89deg)", zIndex: 0 }} />
        <div className="relative" style={{ zIndex: 1 }}>
          <LogoSlider />
          <GlobalMarketInsights />
        </div>
      </div>

      {/* Stats + Markets + Intelligence */}
      <div className="relative">
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ width: "977px", height: "625px", left: "-758px", top: "0px", background: "rgba(34, 126, 217, 0.4)", filter: "blur(250px)", zIndex: 0 }} />
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ width: "977px", height: "625px", right: "-400px", top: "0px", background: "rgba(34, 126, 217, 0.4)", filter: "blur(250px)", transform: "rotate(-26.89deg)", zIndex: 0 }} />
        <div className="relative" style={{ zIndex: 1 }}>
          <StatsSection />
          <MarketsSection />
          <IntelligenceSection />
        </div>
      </div>

      {/* Articles — glows inside component */}
      <ArticlesSection />
      <PricingSection />

      <ContactSection />
      <TestimonialsSection />
      <FAQ />

      {/* CTA + Footer share one relative wrapper — Ellipse 11 spans the boundary */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            right: "-10%",
            top: "25%",
            background: "rgba(34, 126, 217, 0.4)",
            filter: "blur(250px)",
            zIndex: 0,
          }}
        />

        <CTA />
        <Footer />
      </div>
    </main>
  );
}
