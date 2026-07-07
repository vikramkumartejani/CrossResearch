'use client'
import { useState, useRef, useEffect } from 'react'
import * as FlagComponents from 'country-flag-icons/react/3x2'

type Period = '1M' | '1D' | '1W' | '1Y' | 'YTD'

interface CurrencyPair {
    symbol: string
    base: string
    quote: string
    baseName: string
    quoteName: string
    baseFlag: string   
    quoteFlag: string
    price: string
    change: string
    changePositive: boolean
}

const CURRENCY_PAIRS: CurrencyPair[] = [
    { symbol: 'EUR/USD', base: 'EUR', quote: 'USD', baseName: 'Euro', quoteName: 'U.S. Dollar', baseFlag: 'EU', quoteFlag: 'US', price: '1.05195', change: '-0.00185 (-0.42%)', changePositive: false },
    { symbol: 'GBP/USD', base: 'GBP', quote: 'USD', baseName: 'British Pound', quoteName: 'U.S. Dollar', baseFlag: 'GB', quoteFlag: 'US', price: '1.27340', change: '+0.00210 (+0.17%)', changePositive: true },
    { symbol: 'USD/JPY', base: 'USD', quote: 'JPY', baseName: 'U.S. Dollar', quoteName: 'Japanese Yen', baseFlag: 'US', quoteFlag: 'JP', price: '149.820', change: '+0.350 (+0.23%)', changePositive: true },
    { symbol: 'AUD/USD', base: 'AUD', quote: 'USD', baseName: 'Australian Dollar', quoteName: 'U.S. Dollar', baseFlag: 'AU', quoteFlag: 'US', price: '0.64510', change: '-0.00120 (-0.19%)', changePositive: false },
    { symbol: 'USD/CAD', base: 'USD', quote: 'CAD', baseName: 'U.S. Dollar', quoteName: 'Canadian Dollar', baseFlag: 'US', quoteFlag: 'CA', price: '1.36750', change: '+0.00080 (+0.06%)', changePositive: true },
    { symbol: 'USD/CHF', base: 'USD', quote: 'CHF', baseName: 'U.S. Dollar', quoteName: 'Swiss Franc', baseFlag: 'US', quoteFlag: 'CH', price: '0.90230', change: '-0.00050 (-0.06%)', changePositive: false },
    { symbol: 'NZD/USD', base: 'NZD', quote: 'USD', baseName: 'New Zealand Dollar', quoteName: 'U.S. Dollar', baseFlag: 'NZ', quoteFlag: 'US', price: '0.59870', change: '+0.00090 (+0.15%)', changePositive: true },
]

function FlagIcon({ code, size = 48 }: { code: string; size?: number }) {
    const Flag = FlagComponents[code as keyof typeof FlagComponents]
    if (!Flag) return <div style={{ width: size, height: size }} className='rounded-full bg-white/10' />
    return (
        <div style={{ width: size, height: size, overflow: 'hidden', borderRadius: '50%', flexShrink: 0 }}>
            <Flag
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    // @ts-expect-error – non-standard but supported in all browsers
                    preserveAspectRatio: 'xMidYMid slice',
                }}
                // Pass it directly as an SVG attribute too
                preserveAspectRatio="xMidYMid slice"
                title={code}
            />
        </div>
    )
}

function PairFlags({ pair }: { pair: CurrencyPair }) {
    return (
        <div className='relative flex-shrink-0' style={{ width: 72, height: 48 }}>
            <div className='absolute left-0 top-0 rounded-full overflow-hidden border-2 border-[#16161F]' style={{ width: 48, height: 48 }}>
                <FlagIcon code={pair.baseFlag} size={48} />
            </div>
            <div className='absolute rounded-full overflow-hidden border-2 border-[#16161F]' style={{ width: 48, height: 48, left: 24, top: 0 }}>
                <FlagIcon code={pair.quoteFlag} size={48} />
            </div>
        </div>
    )
}

export default function Chart() {
    const [activePeriod, setActivePeriod] = useState<Period>('1D')
    const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const periods: Period[] = ['1M', '1D', '1W', '1Y', 'YTD']

    // Close dropdown on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const rawPoints: [number, number][] = [
        [0, 80], [15, 75], [30, 82], [45, 70], [60, 78], [75, 68],
        [90, 74], [105, 65], [120, 72], [135, 63], [150, 70], [165, 60],
        [180, 67], [195, 58], [210, 65], [225, 72], [240, 62], [255, 70],
        [270, 60], [285, 68], [300, 75], [315, 65], [330, 73], [345, 80],
        [360, 88], [375, 78], [390, 86], [405, 95], [420, 85], [435, 93],
        [450, 103], [465, 95], [480, 104], [495, 112], [510, 102],
        [525, 110], [540, 120], [555, 112], [570, 121], [585, 130],
        [600, 122], [615, 131], [630, 140], [645, 132], [660, 141],
        [675, 150], [690, 143], [705, 152], [720, 145], [735, 154],
        [750, 147], [765, 156], [780, 149], [795, 158], [810, 151],
        [825, 160], [840, 153], [855, 162], [870, 155], [900, 160],
    ]

    const polylinePoints = rawPoints.map(([x, y]) => `${x},${y}`).join(' ')
    const fillPath = `M0,80 ` + rawPoints.map(([x, y]) => `L${x},${y}`).join(' ') + ` L900,200 L0,200 Z`
    const yLabels = ['1.05600', '1.05400', '1.05200', '1.05000', '1.04800', '1.04600']
    const xLabels = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00']

    return (
        <div className="bg-[#16161F] border border-[#FFFFFF08] p-5 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap mb-6">

                {/* Left: currency pair selector dropdown */}
                <div ref={dropdownRef} className='relative'>
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className='flex items-center gap-3 cursor-pointer group'
                    >
                        <PairFlags pair={selectedPair} />
                        <div>
                            <div className='flex items-center gap-1.5'>
                                <p className="text-white text-[16px] leading-[19px] font-semibold">{selectedPair.symbol}</p>
                                <svg
                                    width="11" height="7" viewBox="0 0 11 7" fill="none"
                                    className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                >
                                    <path d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z" fill="#FAFAF9" />
                                </svg>
                            </div>
                            <p className="text-white/60 text-[14px] leading-[17px] font-normal mt-[5px]">
                                {selectedPair.baseName} / {selectedPair.quoteName}
                            </p>
                        </div>
                    </button>

                    {/* Dropdown menu */}
                    {dropdownOpen && (
                        <div className='absolute top-[calc(100%+8px)] left-0 z-50 w-[280px] bg-[#1E1E2A] border border-[#FFFFFF14] rounded overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]'>
                            {CURRENCY_PAIRS.map((pair) => (
                                <button
                                    key={pair.symbol}
                                    onClick={() => { setSelectedPair(pair); setDropdownOpen(false) }}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-[#FFFFFF08] transition-colors cursor-pointer ${selectedPair.symbol === pair.symbol ? 'bg-[#FFFFFF0A]' : ''}`}
                                >
                                    <PairFlags pair={pair} />
                                    <div className='text-left'>
                                        <p className='text-white text-[13px] font-semibold leading-tight'>{pair.symbol}</p>
                                        <p className='text-white/40 text-[11px] leading-tight mt-0.5'>{pair.baseName} / {pair.quoteName}</p>
                                    </div>
                                    <span className={`ml-auto text-[12px] font-medium ${pair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                        {pair.change.split(' ')[0]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: period buttons */}
                <div className="flex items-center gap-px border border-[#FFFFFF12] rounded-[10px] p-1">
                    {periods.map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePeriod(p)}
                            className={`w-[38px] h-[37px] text-[14px] leading-[17px] font-medium rounded-[8px] transition-colors cursor-pointer ${activePeriod === p
                                ? 'bg-[#FFFFFF0D] text-white'
                                : 'text-white/60 hover:text-white/70'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price row */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-white text-[45px] font-semibold leading-[54px]">{selectedPair.price}</span>
                    <span className={`text-[18px] leading-[22px] font-normal ${selectedPair.changePositive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                        {selectedPair.change}
                    </span>
                </div>
                <div className="flex items-center flex-wrap gap-5">
                    {[
                        { label: 'Prev Close', value: '1.05214' },
                        { label: 'Open Price', value: '1.05524' },
                        { label: 'Day High', value: '1.02542' },
                        { label: 'Day Low', value: '1.05147' },
                    ].map((stat, i) => (
                        <div key={stat.label} className={`flex flex-col items-start ${i < 3 ? '' : ''}`}>
                            <span className="text-white/60 text-[12px] leading-[16px] font-medium mb-1">{stat.label}</span>
                            <span className="text-white text-[18px] font-semibold leading-[22px]">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

