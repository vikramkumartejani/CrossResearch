import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoSlider from "./components/LogoSlider";
import GlobalMarketInsights from "./components/GlobalMarketInsights";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Wrapper so glow covers both LogoSlider and GlobalMarketInsights */}
      <div className="relative" style={{ overflow: "clip" }}>
      {/* Left glow — Figma Ellipse 14, centered around GlobalMarketInsights top */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "977px",
            height: "625px",
            left: "-300px",
            top: "500px",
            background: "#227ED966",
            filter: "blur(250px)",
            transform: "rotate(-26.89deg)",
            zIndex: 0,
          }}
        />
        {/* Right glow — Figma Ellipse 13, centered around GlobalMarketInsights top */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "977px",
            height: "625px",
            right: "-300px",
            top: "500px",
            background: "#227ED966",
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
    </main>
  );
}
