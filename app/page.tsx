import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoSlider from "./components/LogoSlider";
import GlobalMarketInsights from "./components/GlobalMarketInsights";
import StatsSection from "./components/StatsSection";
import MarketsSection from "./components/MarketsSection";
import IntelligenceSection from "./components/IntelligenceSection";

export default function Home() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Navbar />
      <Hero />

      {/* LogoSlider + GlobalMarketInsights — shared left/right glow */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "977px", height: "625px",
            left: "-300px", top: "350px",
            background: "rgba(34, 126, 217, 0.4)",
            filter: "blur(250px)",
            transform: "rotate(-26.89deg)",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "977px", height: "625px",
            right: "-300px", top: "350px",
            background: "rgba(34, 126, 217, 0.4)",
            filter: "blur(250px)",
            transform: "rotate(-26.89deg)",
            zIndex: 0,
          }}
        />
        <div className="relative" style={{ zIndex: 1 }}>
          <LogoSlider />
          <GlobalMarketInsights />
        </div>
      </div>

      {/* Stats + Markets + Intelligence — Figma Ellipse 1 & 2 glows */}
      <div className="relative">
        {/* Left glow — Ellipse 1 */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "977px", height: "625px",
            left: "-758px", top: "0px",
            background: "rgba(34, 126, 217, 0.4)",
            filter: "blur(250px)",
            zIndex: 0,
          }}
        />
        {/* Right glow — Ellipse 2 */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "977px", height: "625px",
            right: "-400px", top: "0px",
            background: "rgba(34, 126, 217, 0.4)",
            filter: "blur(250px)",
            transform: "rotate(-26.89deg)",
            zIndex: 0,
          }}
        />
        <div className="relative" style={{ zIndex: 1 }}>
          <StatsSection />
          <MarketsSection />
          <IntelligenceSection />
        </div>
      </div>
    </main>
  );
}
