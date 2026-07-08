import Image from "next/image";

const LOGOS = [
    { name: "Yahoo Finance", src: "/assets/yahoo.png", width: 206, height: 29 },
    { name: "Bloomberg", src: "/assets/bloombery.png", width: 133, height: 24.72 },
    { name: "Chainalysis", src: "/assets/chainalysis.svg", width: 211, height: 34.34 },
    { name: "Reuters", src: "/assets/reuters.png", width: 161, height: 41 },
    { name: "Databento", src: "/assets/databento.png", width: 180, height: 30 },
    { name: "Polygon", src: "/assets/polygon.png", width: 203, height: 42 },
    { name: "Massive", src: "/assets/massive.png", width: 164, height: 50.51 },
    { name: "FactSet", src: "/assets/factset.png", width: 109, height: 22 },
];

const LOGO_FILTER = "brightness(0) invert(1) brightness(0.60)";

export default function LogoSlider() {
    return (
        <div className="w-full overflow-hidden relative" aria-label="Trusted data partners">
            <div className="logo-slider-track">
                {/* Track 1 */}
                <div className="flex flex-shrink-0 items-center">
                    {LOGOS.map((logo) => (
                        <div
                            key={`a-${logo.name}`}
                            className="flex-shrink-0 flex items-center justify-center px-5 sm:px-10"
                            aria-label={logo.name}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={logo.width}
                                height={logo.height}
                                className="object-contain"
                                style={{ filter: LOGO_FILTER }}
                            />
                        </div>
                    ))}
                </div>
                {/* Track 2 — exact clone for seamless loop */}
                <div className="flex flex-shrink-0 items-center" aria-hidden="true">
                    {LOGOS.map((logo) => (
                        <div
                            key={`b-${logo.name}`}
                            className="flex-shrink-0 flex items-center justify-center px-5 sm:px-10"
                        >
                            <Image
                                src={logo.src}
                                alt=""
                                width={logo.width}
                                height={logo.height}
                                className="object-contain"
                                style={{ filter: LOGO_FILTER }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}