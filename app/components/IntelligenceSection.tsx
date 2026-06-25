"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "./CirsularProgress";

export default function IntelligenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto max-w-[1560px]">
        <div
          ref={sectionRef}
          className="relative border border-[#FFFFFF0D] bg-[#FFFFFF05] rounded-[80px] pt-[92px] pb-[91px] pl-[49px] pr-20 overflow-hidden gap-[54px] flex flex-col lg:flex-row justify-between"
        >
          {/* Left: charts image */}
          <div className="relative z-20 max-w-[809px] h-[497px] px-5 py-8 bg-[#FFFFFF]/1 rounded-[45px] border border-[#FFFFFF0D] backdrop-blur-[131.948px]">
            <Image
              src="/assets/our-features.png"
              alt="Market intelligence dashboard"
              width={778}
              height={435}
              // className="w-full h-full"
            />
          </div>

          {/* Right: text */}
          <div className="relative z-20 flex-shrink-0 w-full max-w-[566px] flex flex-col justify-center">
            <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter w-fit">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
              </svg>
              Our features
            </div>

            <h2 className="mt-5 mb-7 font-medium text-[48px] leading-[53px] mb-7 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
              We develop intelligent finance systems
            </h2>

            <p className="mb-[42px] text-white/60 text-[18px] leading-[27px] font-normal">
              We analyse macro trends across FX, equities, and global assets to inform investment decisions
            </p>

            {/* Animated circular progress indicators */}
            <div className="flex items-start gap-10">
              <CircularProgress
                target={85}
                label="Research and bias correct"
                duration={4000}
                delay={0}
                triggered={triggered}
              />
              <CircularProgress
                target={99}
                label={"Client satisfaction"}
                duration={4000}
                delay={0}
                triggered={triggered}
              />
            </div>
          </div>

          {/* Bottom-right corner glow */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: "295.95px",
              height: "391.44px",
              right: "-150px",
              bottom: "-200px",
              zIndex: 0,
            }}
          >
            <div className="absolute" style={{
              width: "225.24px", height: "353.14px",
              left: "-60px", top: "-40px",
              background: "#6DB7FF",
              filter: "blur(70.41px)",
              transform: "rotate(-56.09deg)",
              borderRadius: "50%",
            }} />
            <div className="absolute" style={{
              width: "162.55px", height: "347.66px",
              left: "-20px", top: "-47px",
              background: "#6294FF",
              mixBlendMode: "plus-lighter",
              filter: "blur(198.11px)",
              transform: "rotate(-56.09deg)",
              borderRadius: "50%",
            }} />
            <div className="absolute" style={{
              width: "151.6px", height: "337.54px",
              left: "-40px", top: "-10px",
              background: "#0F4274",
              mixBlendMode: "plus-lighter",
              filter: "blur(198.11px)",
              transform: "rotate(-56.09deg)",
              borderRadius: "50%",
            }} />
          </div>

          <div className="w-[296px] h-fit absolute -right-10 bottom-0">
            <Image
              src="/assets/card-dot-img.svg"
              alt=""
              width={296}
              height={391}
              className=" object-cover"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}