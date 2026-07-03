import React from 'react'

function TagDot({ color = '#88C4FF' }: { color?: string }) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="5" fill={color} />
            <circle cx="5" cy="5" r="3.5" fill="#21314F" />
            <circle cx="5" cy="5" r="2" fill={color} />
        </svg>
    );
}

function FeatureCard({
    tag,
    index,
    total,
    title,
    description,
    className = '',
}: {
    tag: string;
    index: number;
    total: number;
    title: React.ReactNode;
    description: string;
    className?: string;
}) {
    return (
        <div className={`bg-[#FFFFFF08] shadow-[0px_4px_124px_0px_#0000001A] rounded-[48px] px-[50px] py-[55px] flex flex-col gap-3 max-w-[584px] ${className}`}>
            {/* Top row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <div className="bg-[#91C8FF] rounded-full w-2.5 h-2.5"></div>
                    <span className="text-[#91C8FF] text-[12px] sm:text-[14px] leading-[17px] font-bold">{tag}</span>
                </div>
                <p className="flex items-center gap-1 text-white/60 text-[14px] leading-[17px] font-bold">
                    <span className='text-white'>{String(index).padStart(2, '0')} – </span> {String(total).padStart(2, '0')} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 6H9.5" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 2.5L9.5 6L6 9.5" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </p>
            </div>

            {/* Title */}
            <h3 className="text-white text-[22px] sm:text-[34px] font-normal leading-[34px] sm:leading-[44px] pr-[25px]">
                {title}
            </h3>

            {/* Description */}
            <p className="text-white/50 text-[13px] sm:text-[18px] leading-[20px] sm:leading-[25px] font-normal">
                {description}
            </p>
        </div>
    );
}

export default function ImpossibleToReplicate() {
    return (
        <div className="px-4 sm:px-6">
            <div className="max-w-[1720px] mx-auto">

                {/* 3-column layout: left card | center heading | right cards */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-10 items-center">

                    {/* Left card — 02/03, offset 197px down from right side top */}
                    <div className="h-full mt-[480px]">
                        <FeatureCard
                            tag="Proven Results"
                            index={2}
                            total={3}
                            title="Institutional-grade validation drives consistent results"
                            description="Every strategy undergoes rigorous testing, validation, and stress checks before disciplined capital allocation"
                        />
                    </div>

                    {/* Center — badge + heading + subtitle */}
                    <div className="flex flex-col items-center text-center max-w-[520px] mx-auto">
                        <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-4 py-[9px] rounded-[100px] text-[14px] sm:text-[16px] leading-5 font-normal font-inter">
                            <TagDot color="#88C4FF" />
                            Impossible To Replicate
                        </div>

                        <h2 className="text-white font-normal text-[36px] sm:text-[48px] lg:text-[50px] leading-tight lg:leading-[55px] mb-6">
                            The combination<br />others simply cannot<br />replicate or match
                        </h2>

                        <p className="text-white/70 text-[14px] sm:text-[18px] leading-[29px] font-normal max-w-[456px]">
                            Institutional-grade tools deployed at a scale typically unavailable to retail-level investors.
                        </p>
                    </div>

                    {/* Right — 2 stacked cards with 350px gap */}
                    <div className="flex flex-col gap-5 lg:gap-[350px]">
                        <FeatureCard
                            tag="Data Advantage"
                            index={1}
                            total={3}
                            title={<>Proprietary financial <br /> data drives strategic advantage</>}
                            description="In-house data and signals create a proprietary, non-replicable market edge beyond standard feeds"
                        />
                        <FeatureCard
                            tag="Data Advantage"
                            index={3}
                            total={3}
                            title="Advanced quant reasoning enhances market performance"
                            description="Advanced quant reasoning drives precise decisions using data, models, and statistical validation across"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
