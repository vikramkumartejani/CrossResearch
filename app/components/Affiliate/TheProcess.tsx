'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const STEPS = [
    {
        number: '1',
        title: 'Reach Out',
        description: "Fill in the form below with some details about your audience and what you're looking for.",
        side: 'left' as const,
        glow: false,
    },
    {
        number: '2',
        title: 'Discovery Call',
        description: 'We jump on a call to understand your community — their strategies, instruments, and pain points.',
        side: 'right' as const,
        glow: true,
    },
    {
        number: '3',
        title: 'Tailored Package',
        description: 'We build a custom package — pricing, tools, branding, revenue share — designed around your audience.',
        side: 'left' as const,
        glow: false,
    },
    {
        number: '4',
        title: 'Launch Together',
        description: 'We support your rollout with onboarding resources, promotional assets, and ongoing partner support.',
        side: 'right' as const,
        glow: false,
    },
]

const R = 28 // corner radius

export default function TheProcess() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const [svgSize, setSvgSize] = useState({ w: 0, h: 0 })
    const [paths, setPaths] = useState<string[]>([])

    const compute = useCallback(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        const wRect = wrapper.getBoundingClientRect()
        setSvgSize({ w: wRect.width, h: wRect.height })

        const newPaths: string[] = []

        for (let i = 0; i < STEPS.length - 1; i++) {
            const fromEl = cardRefs.current[i]
            const toEl = cardRefs.current[i + 1]
            if (!fromEl || !toEl) continue

            const fRect = fromEl.getBoundingClientRect()
            const tRect = toEl.getBoundingClientRect()

            // all coords relative to wrapper
            const fromSide = STEPS[i].side

            let path: string

            if (fromSide === 'left') {
                const x1 = fRect.right - wRect.left
                const y1 = (fRect.top + fRect.bottom) / 2 - wRect.top
                const x2 = (tRect.left + tRect.right) / 2 - wRect.left
                const y2 = tRect.top - wRect.top

                const cornerX = x2
                path = `M ${x1} ${y1} H ${cornerX - R} Q ${cornerX} ${y1} ${cornerX} ${y1 + R} V ${y2}`
            } else {
                const x1 = fRect.left - wRect.left
                const y1 = (fRect.top + fRect.bottom) / 2 - wRect.top
                const x2 = (tRect.left + tRect.right) / 2 - wRect.left
                const y2 = tRect.top - wRect.top

                const cornerX = x2
                path = `M ${x1} ${y1} H ${cornerX + R} Q ${cornerX} ${y1} ${cornerX} ${y1 + R} V ${y2}`
            }

            newPaths.push(path)
        }

        setPaths(newPaths)
    }, [])

    useEffect(() => {
        compute()
        const ro = new ResizeObserver(compute)
        if (wrapperRef.current) ro.observe(wrapperRef.current)
        return () => ro.disconnect()
    }, [compute])

    return (
        <div className='pb-16 sm:pb-[120px] xl:pb-[170px] px-4 sm:px-6 w-full'>
            <div className='max-w-[1304px] mx-auto'>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12 lg:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        The Process
                    </div>
                    <h2 className="font-normal text-[28px] sm:text-[40px] lg:text-[54px] leading-tight lg:leading-[70px] mb-4 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        From contact to launch <br className='sm:block hidden' /> in just days, not long weeks.
                    </h2>
                    <p className="text-white/60 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[32px] font-normal font-inter max-w-[606px]">
                        From contact to launch in just days, not long weeks, ensuring fast onboarding and rapid execution
                    </p>
                </div>

                {/* Cards + SVG overlay */}
                <div ref={wrapperRef} className='relative'>

                    {/* SVG connector lines */}
                    {svgSize.w > 0 && (
                        <svg
                            className='hidden lg:block absolute inset-0 pointer-events-none'
                            width={svgSize.w}
                            height={svgSize.h}
                            style={{ zIndex: 10, overflow: 'visible' }}
                        >
                            {paths.map((d, i) => (
                                <path
                                    key={i}
                                    d={d}
                                    fill='none'
                                    stroke='#FFFFFF33'
                                    strokeWidth={1}
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            ))}
                        </svg>
                    )}

                    {/* 4 Cards — staggered left/right */}
                    <div className='flex flex-col gap-6 xl:gap-0'>
                        {STEPS.map((step, i) => (
                            <div
                                key={i}
                                className={`flex ${step.side === 'left' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    ref={el => { cardRefs.current[i] = el }}
                                    className='relative w-full lg:max-w-[552px] rounded-[30px] lg:rounded-[40px] border border-[#FFFFFF0D] bg-[#FFFFFF05] p-6 sm:p-8 lg:p-10 overflow-hidden'
                                >
                                    {step.glow && (
                                        <div
                                            aria-hidden='true'
                                            className='absolute top-0 right-0 w-[220px] h-[220px] pointer-events-none'
                                            style={{
                                                background: 'radial-gradient(circle, rgba(56,139,253,0.6) 0%, rgba(56,139,253,0.2) 45%, transparent 70%)',
                                                transform: 'translate(35%, -35%)',
                                                filter: 'blur(18px)',
                                            }}
                                        />
                                    )}

                                    <div className='inline-flex items-center justify-center w-[60px] h-[60px] rounded-[14px] bg-[#FFFFFF0D] border border-[#FFFFFF0D] text-white text-[24px] leading-[38px] font-semibold mb-7 sm:mb-[41px]'>
                                        {step.number}
                                    </div>

                                    <h3 className='text-white text-[24px] sm:text-[30px] lg:text-[40px] font-semibold leading-tight lg:leading-[64px] mb-3'>
                                        {step.title}
                                    </h3>
                                    <p className='text-white/50 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal'>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
