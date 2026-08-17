import Image from '@/lib/CldImage';

export default function AuthRightPanel() {
    return (
        <div className="relative w-full h-full min-h-[620px] overflow-hidden rounded-[30px] border border-[#FFFFFF0D]">
            <Image
                src="/assets/auth.png"
                alt=""
                fill
                sizes="(min-width: 1536px) 970px, (min-width: 1280px) 700px, 50vw"
                className="object-cover"
                priority
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/55 via-transparent to-transparent"
            />

            <div className="absolute top-12 right-10 z-20 max-w-[520px] flex flex-col items-end text-right">
                <h2 className="text-white text-[40px] font-medium leading-[56px] mb-3">
                    Turn your ideas into reality
                </h2>
                <p className="text-white/80 text-[18px] leading-[29px] font-normal">
                    Consistent quality and experience across all platforms and devices.
                </p>
            </div>
        </div>
    );
}
