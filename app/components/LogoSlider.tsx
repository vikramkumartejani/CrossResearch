import Image from "next/image";
import Link from "next/link";

const LOGOS = [
    {
        name: "VT Markets",
        src: "/assets/vt.png",
        width: 206,
        height: 29,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=vtuk",
    },
    {
        name: "PU Prime",
        src: "/assets/pu.png",
        width: 133,
        height: 24.72,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=pu",
    },
    {
        name: "AxiTrader",
        src: "/assets/axi.png",
        width: 211,
        height: 34.34,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=axitrader_new",
    },
    {
        name: "Bullwaves",
        src: "/assets/bull waves.png",
        width: 161,
        height: 41,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=bullwaves",
    },
    {
        name: "Vantage",
        src: "/assets/vantage.png",
        width: 180,
        height: 30,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=vantagefx",
    },
    {
        name: "Kudotrade",
        src: "/assets/kudo.png",
        width: 203,
        height: 42,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=kudotrade",
    },
    {
        name: "Ultima Markets",
        src: "/assets/ultima.png",
        width: 164,
        height: 50.51,
        href: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=ultimarkets",
    },
    {
        name: "Tickmill",
        src: "/assets/tickmill.png",
        width: 109,
        height: 22,
        href: "https://go.tickmill.com/visit/?bta=36008&brand=tickmill",
    },
    {
        name: "Blueberry",
        src: "/assets/blueberry.png",
        width: 109,
        height: 22,
        href: "#", // Replace with your Blueberry affiliate link
    },
];

// const LOGO_FILTER = "brightness(0) invert(1) brightness(0.60)";

export default function LogoSlider() {
    return (
        <div
            className="w-full overflow-hidden relative"
            aria-label="Trusted data partners"
        >
            <div className="logo-slider-track">
                {/* Track 1 */}
                <div className="flex flex-shrink-0 items-center">
                    {LOGOS.map((logo) => (
                        <Link
                            key={`a-${logo.name}`}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="flex-shrink-0 flex items-center justify-center px-5 sm:px-10 transition-opacity hover:opacity-80"
                            aria-label={logo.name}
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}

                                className={`object-contain h-6 md:h-10 w-auto max-w-[200px]`}
                            // style={{ filter: LOGO_FILTER }}
                            />
                        </Link>
                    ))}
                </div>

                {/* Track 2 - exact clone for seamless loop */}
                <div className="flex flex-shrink-0 items-center" aria-hidden="true">
                    {LOGOS.map((logo) => (
                        <Link
                            key={`b-${logo.name}`}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="flex-shrink-0 flex items-center justify-center px-5 sm:px-10 transition-opacity hover:opacity-80"
                            tabIndex={-1}
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}

                                className={`object-contain h-6 md:h-10 w-auto max-w-[200px]`}
                            // style={{ filter: LOGO_FILTER }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}