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

export const CURRENCY_PAIRS: CurrencyPair[] = [
    { symbol: 'EURUSD', base: 'EUR', quote: 'USD', baseName: 'Euro', quoteName: 'U.S. Dollar', baseFlag: 'EU', quoteFlag: 'US', price: '1.05195', change: '-0.00185 (-0.42%)', changePositive: false },
    { symbol: 'GBPUSD', base: 'GBP', quote: 'USD', baseName: 'British Pound', quoteName: 'U.S. Dollar', baseFlag: 'GB', quoteFlag: 'US', price: '1.27340', change: '+0.00210 (+0.17%)', changePositive: true },
    { symbol: 'USDJPY', base: 'USD', quote: 'JPY', baseName: 'U.S. Dollar', quoteName: 'Japanese Yen', baseFlag: 'US', quoteFlag: 'JP', price: '149.820', change: '+0.350 (+0.23%)', changePositive: true },
    { symbol: 'XAUUSD', base: 'XAU', quote: 'USD', baseName: 'Gold', quoteName: 'U.S. Dollar', baseFlag: 'XAU', quoteFlag: 'US', price: '2341.50', change: '+12.30 (+0.53%)', changePositive: true },
    { symbol: 'XAGUSD', base: 'XAG', quote: 'USD', baseName: 'Silver', quoteName: 'U.S. Dollar', baseFlag: 'XAG', quoteFlag: 'US', price: '27.420', change: '+0.180 (+0.66%)', changePositive: true },
    { symbol: 'USOIL', base: 'USO', quote: 'USD', baseName: 'US Crude Oil', quoteName: 'U.S. Dollar', baseFlag: 'USO', quoteFlag: 'US', price: '78.340', change: '-0.560 (-0.71%)', changePositive: false },
    { symbol: 'NAS100', base: 'NAS', quote: 'USD', baseName: 'Nasdaq 100', quoteName: 'U.S. Dollar', baseFlag: 'NAS', quoteFlag: 'US', price: '17842.0', change: '+134.5 (+0.76%)', changePositive: true },
    { symbol: 'US30', base: 'US3', quote: 'USD', baseName: 'Dow Jones 30', quoteName: 'U.S. Dollar', baseFlag: 'US3', quoteFlag: 'US', price: '38921.0', change: '+210.0 (+0.54%)', changePositive: true },
    { symbol: 'SP500', base: 'SP5', quote: 'USD', baseName: 'S&P 500', quoteName: 'U.S. Dollar', baseFlag: 'SP5', quoteFlag: 'US', price: '5021.80', change: '-8.40 (-0.17%)', changePositive: false },
    { symbol: 'BTCUSD', base: 'BTC', quote: 'USD', baseName: 'Bitcoin', quoteName: 'U.S. Dollar', baseFlag: 'BTC', quoteFlag: 'US', price: '67420.0', change: '+820.0 (+1.23%)', changePositive: true },
]

// Commodity / index / crypto fallback icons
const COMMODITY_ICONS: Record<string, string> = {
    XAU: '🥇', XAG: '🥈', USO: '🛢️', NAS: '📈', US3: '📊', SP5: '📉', BTC: '₿',
}

function FlagIcon({ code, size = 48 }: { code: string; size?: number }) {
    // Commodity / index fallback
    if (code in COMMODITY_ICONS) {
        return (
            <div style={{ width: size, height: size, borderRadius: '50%', background: '#1E2A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.60, flexShrink: 0 }}>
                {COMMODITY_ICONS[code]}
            </div>
        )
    }
    const Flag = FlagComponents[code as keyof typeof FlagComponents]
    if (!Flag) return <div style={{ width: size, height: size, borderRadius: '50%' }} className='bg-white/10' />
    // Flags are 3:2 (width:height). Render at natural ratio then center-crop into circle.
    const flagW = size * 1.5
    const offsetX = (flagW - size) / 2
    return (
        <div style={{ width: size, height: size, overflow: 'hidden', borderRadius: '50%', flexShrink: 0, position: 'relative' }}>
            <Flag
                style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: -offsetX,
                    width: flagW,
                    height: size,
                }}
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

