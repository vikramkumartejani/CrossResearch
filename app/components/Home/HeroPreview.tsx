import Image from '@/lib/CldImage'
import Link from 'next/link'

export default function HeroPreview() {
  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-6 pb-6 sm:pb-8 lg:pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[820px] h-[55%] rounded-full bg-[#88C4FF]/25 blur-[90px]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] z-10">
        <div className="relative rounded-[18px] sm:rounded-[22px] overflow-hidden">
          <Image
            src="/assets/crossresearch_1600x900.png"
            alt="CrossResearch platform dashboard"
            width={1600}
            height={900}
            className="w-full h-auto block"
            priority
            unoptimized
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent"
          />

          <Link
            href="/signup"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#88C4FF] text-[#0B0B14] text-[13px] sm:text-[16px] lg:text-[18px] font-semibold px-5 sm:px-8 lg:px-10 h-10 sm:h-12 lg:h-[52px] shadow-[0_0_0_1px_rgba(136,196,255,0.35),0_0_36px_8px_rgba(136,196,255,0.45)] hover:bg-[#9DD0FF] transition-colors"
          >
            Explore the Platform
          </Link>
        </div>
      </div>
    </div>
  )
}
