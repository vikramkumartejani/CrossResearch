import Image from "next/image";

export default function AuthRightPanel() {
    return (
        <div className="relative w-full bg-[#0D1321] border border-[#FFFFFF0D] flex items-center justify-center flex-col overflow-hidden rounded-[30px] py-20">

            {/* Ellipse 13 — bottom right glow */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                    width: '787px',
                    height: '504px',
                    right: '-200px',
                    bottom: '-150px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }}
            />

            {/* ── Top-left corner glow (Group 4) ── */}
            <div
                aria-hidden="true"
                className="xl:block hidden absolute pointer-events-none"
                style={{
                    width: "300px",
                    height: "250px",
                    left: "0px",
                    top: "0px",
                    zIndex: 0,
                }}
            >
                {/* Ellipse 1 */}
                <div className="absolute blur-[84.47px]" style={{
                    width: "250.23px", height: "323.67px",
                    left: "-100.91px", top: "-135.11px",
                    background: "#6DB7FF",
                    transform: "rotate(-56.09deg)",
                    borderRadius: "50%",
                }} />
                {/* Ellipse 2 */}
                <div className="absolute blur-[237.68px] sm:block hidden" style={{
                    width: "195.02px", height: "417.1px",
                    left: "-100.47px", top: "-143.26px",
                    background: "#6294FF",
                    mixBlendMode: "plus-lighter",
                    transform: "rotate(-56.09deg)",
                    borderRadius: "50%",
                }} />
                {/* Ellipse 3 */}
                <div className="absolute blur-[237.68px] sm:block hidden" style={{
                    width: "181.87px", height: "404.96px",
                    left: "-100.5px", top: "-98.08px",
                    background: "#0F4274",
                    mixBlendMode: "plus-lighter",
                    transform: "rotate(-56.09deg)",
                    borderRadius: "50%",
                }} />
                {/* card-dot-img overlay */}
                <Image
                    src="/assets/card-dot-img.svg"
                    alt=""
                    width={500}
                    height={350}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    aria-hidden="true"
                />
            </div>

            {/* Main image — centered */}
            <div className="relative z-20">
                <Image
                    src="/assets/login.svg"
                    alt="Dashboard preview"
                    width={610}
                    height={659}
                    draggable="false"
                    priority
                />
            </div>

            {/* Bottom text + dots */}
            <div className="relative z-20 flex items-center flex-col pt-10">
                <h2 className="text-white text-[40px] font-medium leading-[56px] mb-3">
                    Turn your ideas into reality
                </h2>
                <p className="text-white/80 text-[18px] leading-[29px] font-normal">
                    Consistent quality and experience across all platforms and devices.
                </p>

                {/* Dots indicator */}
                <div className="flex items-center gap-2 mt-10">
                    <span className="w-[8px] h-[8px] rounded-full bg-white/20" />
                    <span className="w-[27px] h-[8px] rounded-full bg-white" />
                    <span className="w-[8px] h-[8px] rounded-full bg-white/20" />
                </div>
            </div>
        </div>
    );
}
