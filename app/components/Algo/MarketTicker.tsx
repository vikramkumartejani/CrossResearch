import Image from 'next/image'
import React from 'react'

interface TickerItem {
    id: string
    symbol: string
    icon: React.ReactNode
    price: string
    change: string
    isPositive: boolean
}

const TICKERS: TickerItem[] = [
    {
        id: 'spy',
        symbol: 'SPY',
        icon: (
            <div className='bg-white rounded-full'>
                <Image src='/assets/spy.png' alt='SPY' width={50} height={50} className='rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px] object-contain' />
            </div>
        ),
        price: '$584.21',
        change: '-0.14',
        isPositive: false,
    },
    {
        id: 'gold',
        symbol: 'GOLD',
        icon: (
            <div className='bg-white rounded-full'>
                <Image src='/assets/gold.svg' alt='Gold' width={50} height={50} className='rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px] object-contain' />
            </div>
        ),
        price: '$3,042',
        change: '+0.47%',
        isPositive: true,
    },
    {
        id: 'dxy',
        symbol: 'DXY',
        icon: (
            <div className='bg-white rounded-full'>
                <Image src='/assets/dxy.png' alt='DXY' width={50} height={50} className='rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px] object-contain' />
            </div>
        ),
        price: 'Index',
        change: '-0.14',
        isPositive: false,
    },
    {
        id: '10y',
        symbol: '10Y',
        icon: (
            <div className='bg-white rounded-full'>
                <Image src='/assets/ten.png' alt='Ten' width={50} height={50} className='rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px] object-contain' />
            </div>
        ),
        price: 'Bonds',
        change: '+0.38pp',
        isPositive: true,
    },
    {
        id: 'vix',
        symbol: 'VIX',
        icon: (
            <div className='rounded-full'>
                <Image src='/assets/vix.png' alt='VIX' width={50} height={50} className='rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px] object-contain' />
            </div>
        ),
        price: 'Index',
        change: '-0.04',
        isPositive: false,
    },
    {
        id: 'eth',
        symbol: 'ETH',
        icon: (
            <div className='bg-white rounded-full'>
                <Image src='/assets/eth.png' alt='ETH' width={50} height={50} className='rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px] object-contain' />
            </div>
        ),
        price: '$3,791',
        change: '+4.85%',
        isPositive: true,
    },
]

export default function MarketTicker() {
    return (
        <div className="bg-[#FFFFFF08] py-4 overflow-hidden relative">
            {/* Left Fade */}
            <div className="absolute inset-y-0 left-0 w-10 sm:w-20 z-20 pointer-events-none bg-gradient-to-r from-[#0B1020] via-[#0B1020]/80 to-transparent" />

            {/* Right Fade */}
            <div className="absolute inset-y-0 right-0 w-10 sm:w-20 z-20 pointer-events-none bg-gradient-to-l from-[#0B1020] via-[#0B1020]/80 to-transparent" />
            <div className="ticker-track">
                {/* Track 1 */}
                <div className="flex flex-shrink-0 items-center">
                    {TICKERS.map((ticker) => (
                        <div
                            key={`a-${ticker.id}`}
                            className="flex items-center gap-6 sm:gap-10 flex-shrink-0 px-6 sm:px-10 border-r border-[#FFFFFF26]"
                        >
                            <div className='flex items-center gap-3'>
                                {/* Icon */}
                                {ticker.icon}

                                {/* Content */}
                                <div className="flex flex-col items-start">
                                    <span className="text-white text-[15px] sm:text-[18px] leading-5 sm:leading-[23px] font-semibold whitespace-nowrap">
                                        {ticker.symbol}
                                    </span>
                                    <span className="text-white/60 text-[12px] leading-[19px] font-normal whitespace-nowrap">
                                        {ticker.price}
                                    </span>
                                </div>
                            </div>
                            <span className={`flex items-center gap-1 text-white text-[14px] leading-[22px] font-semibold whitespace-nowrap ${ticker.isPositive ? 'text-[#4ADE80]' : 'text-[#EF4444]'}`}>
                                {ticker.isPositive ?
                                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.19773 0.499999C6.58263 -0.166668 7.54488 -0.166667 7.92978 0.5L13.992 11C14.3769 11.6667 13.8957 12.5 13.1259 12.5H1.00158C0.231781 12.5 -0.249344 11.6667 0.135557 11L6.19773 0.499999Z" fill="#00C666" />
                                    </svg>
                                    : <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.19773 12C6.58263 12.6667 7.54488 12.6667 7.92978 12L13.992 1.5C14.3769 0.833332 13.8957 0 13.1259 0H1.00158C0.231781 0 -0.249344 0.833333 0.135557 1.5L6.19773 12Z" fill="#FD4438" />
                                    </svg>
                                }
                                {ticker.change}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Track 2 */}
                <div className="flex flex-shrink-0 items-center">
                    {TICKERS.map((ticker) => (
                        <div
                            key={`a-${ticker.id}`}
                            className="flex items-center gap-6 sm:gap-10 flex-shrink-0 px-6 sm:px-10 border-r border-[#FFFFFF26]"
                        >
                            <div className='flex items-center gap-3'>
                                {/* Icon */}
                                {ticker.icon}

                                {/* Content */}
                                <div className="flex flex-col items-start">
                                    <span className="text-white text-[15px] sm:text-[18px] leading-5 sm:leading-[23px] font-semibold whitespace-nowrap">
                                        {ticker.symbol}
                                    </span>
                                    <span className="text-white/60 text-[12px] leading-[19px] font-normal whitespace-nowrap">
                                        {ticker.price}
                                    </span>
                                </div>
                            </div>
                            <span className={`flex items-center gap-1 text-white text-[14px] leading-[22px] font-semibold whitespace-nowrap ${ticker.isPositive ? 'text-[#4ADE80]' : 'text-[#EF4444]'}`}>
                                {ticker.isPositive ?
                                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.19773 0.499999C6.58263 -0.166668 7.54488 -0.166667 7.92978 0.5L13.992 11C14.3769 11.6667 13.8957 12.5 13.1259 12.5H1.00158C0.231781 12.5 -0.249344 11.6667 0.135557 11L6.19773 0.499999Z" fill="#00C666" />
                                    </svg>
                                    : <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.19773 12C6.58263 12.6667 7.54488 12.6667 7.92978 12L13.992 1.5C14.3769 0.833332 13.8957 0 13.1259 0H1.00158C0.231781 0 -0.249344 0.833333 0.135557 1.5L6.19773 12Z" fill="#FD4438" />
                                    </svg>
                                }
                                {ticker.change}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Track 3 */}
                <div className="flex flex-shrink-0 items-center">
                    {TICKERS.map((ticker) => (
                        <div
                            key={`a-${ticker.id}`}
                            className="flex items-center gap-6 sm:gap-10 flex-shrink-0 px-6 sm:px-10 border-r border-[#FFFFFF26]"
                        >
                            <div className='flex items-center gap-3'>
                                {/* Icon */}
                                {ticker.icon}

                                {/* Content */}
                                <div className="flex flex-col items-start">
                                    <span className="text-white text-[15px] sm:text-[18px] leading-5 sm:leading-[23px] font-semibold whitespace-nowrap">
                                        {ticker.symbol}
                                    </span>
                                    <span className="text-white/60 text-[12px] leading-[19px] font-normal whitespace-nowrap">
                                        {ticker.price}
                                    </span>
                                </div>
                            </div>
                            <span className={`flex items-center gap-1 text-white text-[14px] leading-[22px] font-semibold whitespace-nowrap ${ticker.isPositive ? 'text-[#4ADE80]' : 'text-[#EF4444]'}`}>
                                {ticker.isPositive ?
                                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.19773 0.499999C6.58263 -0.166668 7.54488 -0.166667 7.92978 0.5L13.992 11C14.3769 11.6667 13.8957 12.5 13.1259 12.5H1.00158C0.231781 12.5 -0.249344 11.6667 0.135557 11L6.19773 0.499999Z" fill="#00C666" />
                                    </svg>
                                    : <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.19773 12C6.58263 12.6667 7.54488 12.6667 7.92978 12L13.992 1.5C14.3769 0.833332 13.8957 0 13.1259 0H1.00158C0.231781 0 -0.249344 0.833333 0.135557 1.5L6.19773 12Z" fill="#FD4438" />
                                    </svg>
                                }
                                {ticker.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
