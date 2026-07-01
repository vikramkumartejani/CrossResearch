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

            {/* Main image — centered */}
            <div className="relative">
                <div className="relative z-10">
                    <Image
                        src="/assets/login.svg"
                        alt="Dashboard preview"
                        width={610}
                        height={659}
                        draggable="false"
                        priority
                    />
                </div>
            </div>

            {/* Bottom text + dots */}
            <div className="relative z-10 flex items-center flex-col pt-10">
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
