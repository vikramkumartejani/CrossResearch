import Link from 'next/link'
import type { ReactNode } from 'react'

const CARDS = [
    { id: 'macro', title: 'Macro & Economic Data', subtitle: 'Understand the cycle.' },
    { id: 'positioning', title: 'Market Positioning', subtitle: 'See where traders are leaning.' },
    { id: 'options', title: 'Options & Dealer Flows', subtitle: 'Find the levels that matter.' },
    { id: 'cross-asset', title: 'Cross-Asset Analysis', subtitle: 'Connect the market.' },
    { id: 'geopolitics', title: 'Geopolitics & News', subtitle: 'Understand the catalyst.' },
    { id: 'technicals', title: 'Technical TradingView Tools', subtitle: 'Turn research into action.' },
] as const

const METRICS = [
    { label: 'Growth regime', value: 'Late cycle', accent: true },
    { label: 'Inflation', value: 'Cooling', accent: true },
    { label: 'Fed expectations', value: 'Easing', accent: true },
    { label: 'Conviction', value: '0.72', accent: false },
]

const ACTIVITY = [
    { time: '09:31', text: 'CPI nowcast eased after shelter deceleration.' },
    { time: '09:44', text: 'Real yields softened - risk sentiment improved.' },
    { time: '10:02', text: 'Macro regime update broadcast to positioning & strategy.' },
]

function LayerIcon({ id }: { id: string }) {
    const common = {
        width: 22,
        height: 22,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
    }

    const icons: Record<string, ReactNode> = {
        macro: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 27.5H2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                <path d="M26.25 27.5V18.125C26.25 17.0895 25.4105 16.25 24.375 16.25H20.625C19.5895 16.25 18.75 17.0895 18.75 18.125V27.5" stroke="white" stroke-width="1.5" />
                <path d="M18.75 27.5V6.25C18.75 4.48223 18.75 3.59835 18.2008 3.04917C17.6517 2.5 16.7678 2.5 15 2.5C13.2322 2.5 12.3483 2.5 11.7992 3.04917C11.25 3.59835 11.25 4.48223 11.25 6.25V27.5" stroke="white" stroke-width="1.5" />
                <path d="M11.25 27.5V11.875C11.25 10.8395 10.4105 10 9.375 10H5.625C4.58947 10 3.75 10.8395 3.75 11.875V27.5" stroke="white" stroke-width="1.5" />
            </svg>

        ),
        positioning: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.25" cy="7.5" r="5" stroke="white" stroke-width="1.5" />
                <path d="M18.75 11.25C20.8211 11.25 22.5 9.57107 22.5 7.5C22.5 5.42893 20.8211 3.75 18.75 3.75" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                <ellipse cx="11.25" cy="21.25" rx="8.75" ry="5" stroke="white" stroke-width="1.5" />
                <path d="M22.5 17.5C24.6928 17.9809 26.25 19.1987 26.25 20.625C26.25 21.9117 24.9828 23.0286 23.125 23.588" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>

        ),
        options: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 2.5V6.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 23.75V27.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M27.5 14.9999L23.75 14.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.25 15H2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 12.5V17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                <path d="M17.5 15L12.5195 14.9878" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>

        ),
        'cross-asset': (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.25 8.125C26.25 10.1961 24.5711 11.875 22.5 11.875C20.4289 11.875 18.75 10.1961 18.75 8.125C18.75 6.05394 20.4289 4.375 22.5 4.375C24.5711 4.375 26.25 6.05394 26.25 8.125Z" stroke="white" stroke-width="1.5" />
                <path d="M11.25 15C11.25 17.0711 9.57106 18.75 7.5 18.75C5.42894 18.75 3.75 17.0711 3.75 15C3.75 12.9289 5.42894 11.25 7.5 11.25C9.57106 11.25 11.25 12.9289 11.25 15Z" stroke="white" stroke-width="1.5" />
                <path d="M26.25 21.875C26.25 23.9461 24.5711 25.625 22.5 25.625C20.4289 25.625 18.75 23.9461 18.75 21.875C18.75 19.8039 20.4289 18.125 22.5 18.125C24.5711 18.125 26.25 19.8039 26.25 21.875Z" stroke="white" stroke-width="1.5" />
                <path d="M10.9106 13.4369L19.0356 9.6875M10.9106 16.5625L19.0356 20.3119" stroke="white" stroke-width="1.5" />
            </svg>

        ),
        geopolitics: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="white" stroke-width="1.5" />
                <path d="M10 15C10 22.5 15 27.5 15 27.5C15 27.5 20 22.5 20 15C20 7.5 15 2.5 15 2.5C15 2.5 10 7.5 10 15Z" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M26.25 18.75H3.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M26.25 11.25H3.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        ),
        technicals: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 27.5H15C9.10744 27.5 6.16117 27.5 4.33058 25.6694C2.5 23.8388 2.5 20.8926 2.5 15V2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                <path d="M23.7502 8.75L19.8527 13.658C19.2557 14.4098 18.9572 14.7857 18.6145 14.9689C18.0875 15.2506 17.4579 15.2643 16.9193 15.0058C16.5689 14.8377 16.2543 14.4751 15.6252 13.75C14.9961 13.0249 14.6815 12.6623 14.3311 12.4942C13.7925 12.2357 13.1629 12.2494 12.636 12.5311C12.2933 12.7143 11.9948 13.0901 11.3977 13.8419L7.5 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>

        ),
    }

    return icons[id] ?? null
}

function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 16.25L16.25 3.75M6.875 3.75H16.25V13.125" stroke="#88C4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}


function TargetBadgeIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    )
}

export default function ResearchStackSection() {
    return (
        <section className="w-full px-4 sm:px-6 pb-[60px] 2xl:pb-[40px]">
            <div className="mx-auto max-w-[1560px]">
                <div className='flex xl:flex-row flex-col items-center lg:items-start justify-between lg:text-left text-center'>
                    <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-[100px] border border-[#FFFFFF1A] bg-[#FFFFFF08] pl-3.5 pr-4 py-[9px] text-[14px] sm:text-[16px] leading-5 sm:leading-[22px] font-normal text-white/85">
                        <TargetBadgeIcon />
                        Research Stack
                    </div>

                    <div className='max-w-[967px]'>
                        <h2 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-[59px] mb-4 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Six Research Layers.
                            <br />
                            One Coherent Market View.
                        </h2>
                        <p className="mt-4 sm:mt-5 text-white/70 text-[14px] sm:text-[22px] leading-5 sm:leading-[32px] font-normal">
                            CrossResearch brings macro data, positioning, options, cross-asset signals, market events and technical analysis into one research environment. Instead of jumping between disconnected tools, traders get one structured view of what is driving the market.
                        </p>
                    </div>
                </div>

                <div className="mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="group relative overflow-hidden rounded-[16px] sm:rounded-[20px] border border-[#FFFFFF0D] bg-[#FFFFFF08] p-4 lg:p-8 transition-[border-color] duration-300 cursor-pointer"
                        >
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -top-12 -right-10 h-40 w-40 rounded-full bg-[#5BA8FF]/40 blur-[36px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-16 right-6 h-28 w-36 rounded-full bg-[#3B82F6]/20 blur-[40px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <div className='absolute top-3 right-3 md:top-8 md:right-8'>
                                <svg width="30" height="30" className='w-6 h-6 sm:w-[30px] sm:h-[30px]' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.75 21.25L21.25 8.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.75 8.75H21.25V21.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className="relative flex items-center gap-1.5 sm:gap-3">
                                <span className="shrink-0 text-white/80 border border-[#FFFFFF0D] bg-[#FFFFFF0D] rounded-full w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center">
                                    <LayerIcon id={card.id} />
                                </span>
                                <span className="min-w-0">
                                    <span className="bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent text-[17px] sm:text-[20px] lg:text-[24px] leading-[22px] sm:leading-[26px] font-medium">
                                        {card.title}
                                    </span>
                                    <span className="mt-1.5 sm:mt-3 block text-white/45 text-[14px] sm:text-[20px] leading-5 sm:leading-[22px]">
                                        {card.subtitle}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex xl:flex-row flex-col justify-between gap-6 lg:gap-14 items-start">
                    <div className="pt-1 max-w-[470px]">
                        <p className="bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent  font-normal text-[16px] sm:text-[22px] leading-5.5 sm:leading-[26px]">
                            Tracks inflation, growth, labor data, liquidity and central-bank
                            expectations to build a live macro regime map that informs every other
                            layer of research.
                        </p>
                        <Link
                            href="/macro-nowcast"
                            className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-[#88C4FF] text-[14px] sm:text-[22px] leading-[26px] font-normal"
                        >
                            Explore macro research
                            <ArrowIcon />
                        </Link>
                    </div>

                    <div className="w-full rounded-[20px] border border-[#FFFFFF0D] bg-[#FFFFFF08] overflow-hidden p-4 md:p-8">
                        <div className="grid grid-cols-2 gap-3 md:gap-0 md:flex w-full items-stretch justify-between lg:px-8">
                            {METRICS.map((metric, index) => (
                                <div
                                    key={metric.label}
                                    className={`
                                        relative
                                        ${index !== METRICS.length - 1
                                            ? "lg:border-r border-[#FFFFFF1F] lg:pr-[90px] lg:pr-[95px]"
                                            : ""
                                        }
                                    `}
                                >
                                    <p className="sm:mb-1 whitespace-nowrap bg-[linear-gradient(176.19deg,rgba(177,216,255,0.6)_-8.19%,rgba(255,255,255,0.6)_107.43%)] bg-clip-text text-[14px] leading-[18px] text-transparent sm:text-[16px]">
                                        {metric.label}
                                    </p>

                                    <p className="whitespace-nowrap text-[15px] font-medium leading-[26px] text-[#88C4FF] sm:text-[24px]">
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>


                        <div className="border-t border-[#FFFFFF1F] mt-5 pt-5">
                            <div className="pb-4 flex items-center justify-between border-b border-[#FFFFFF1F]">
                                <p className="text-[16px] leading-[18px] font-normal bg-[linear-gradient(176.19deg,rgba(177,216,255,0.8)_-8.19%,rgba(255,255,255,0.8)_107.43%)] bg-clip-text text-transparent">
                                    Live activity
                                </p>
                                <span className="inline-flex items-center gap-1.5 text-[16px] leading-[18px] font-normal text-white/70">
                                    <span className="relative flex h-[13px] w-[13px] bg-[#86868B] rounded-full">

                                    </span>
                                    Streaming
                                </span>
                            </div>
                            <div>
                                {ACTIVITY.map((item, index) => (
                                    <p
                                        key={`${item.time}-${item.text}`}
                                        className={`first:pt-4 first:pb-4 text-[16px] leading-[18px] font-normal bg-[linear-gradient(176.19deg,rgba(177,216,255,0.6)_-8.19%,rgba(255,255,255,0.6)_107.43%)] bg-clip-text text-transparent ${index > 0 ? 'border-t border-[#FFFFFF1F] pt-4 pb-4 last:pb-0 first:pt-0' : ''
                                            }`}
                                    >
                                        <span className="bg-[linear-gradient(176.19deg,rgba(177,216,255,0.8)_-8.19%,rgba(255,255,255,0.8)_107.43%)] bg-clip-text text-transparent">{item.time}</span>
                                        {' - '}
                                        {item.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
