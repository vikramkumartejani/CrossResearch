'use client'

type ChangeTone = 'up' | 'down' | 'flat'

interface SignalRow {
    name: string
    detail: string
    last: string
    d1: string
    d5: string
    m3: string
    z: string
    d1Tone: ChangeTone
    d5Tone: ChangeTone
    m3Tone: ChangeTone
    zTone: ChangeTone
    accent: string
}

const SIGNALS: SignalRow[] = [
    {
        name: 'Net Fed Liquidity',
        detail: 'Fed assets − TGA − ON RRP',
        last: '$5.92tn',
        d1: '−$28bn',
        d5: '−$41bn',
        m3: '−$0.31tn',
        z: '+0.81',
        d1Tone: 'down',
        d5Tone: 'down',
        m3Tone: 'down',
        zTone: 'up',
        accent: '#88C4FF',
    },
    {
        name: 'Bank Reserves',
        detail: 'Reserve balances at the Fed',
        last: '$2.92tn',
        d1: '−$18bn',
        d5: '−$29bn',
        m3: '−$0.19tn',
        z: '−0.22',
        d1Tone: 'down',
        d5Tone: 'down',
        m3Tone: 'down',
        zTone: 'down',
        accent: '#88C4FF',
    },
    {
        name: 'SOFR − IORB',
        detail: 'Secured funding vs admin rate',
        last: '−1 bp',
        d1: '0 bp',
        d5: '−1 bp',
        m3: '−2 bp',
        z: '−0.96',
        d1Tone: 'flat',
        d5Tone: 'down',
        m3Tone: 'down',
        zTone: 'down',
        accent: '#88C4FF',
    },
    {
        name: '10Y Real Yield',
        detail: '10Y TIPS real yield (DFII10)',
        last: '2.43%',
        d1: '−2 bp',
        d5: '−6 bp',
        m3: '+21 bp',
        z: '+1.87',
        d1Tone: 'down',
        d5Tone: 'down',
        m3Tone: 'up',
        zTone: 'up',
        accent: '#F0B35A',
    },
    {
        name: '10Y Breakeven',
        detail: 'Market-implied 10Y inflation',
        last: '2.21%',
        d1: '0 bp',
        d5: '−3 bp',
        m3: '−8 bp',
        z: '−0.64',
        d1Tone: 'flat',
        d5Tone: 'down',
        m3Tone: 'down',
        zTone: 'down',
        accent: '#F0B35A',
    },
    {
        name: 'Copper / Gold',
        detail: 'Cyclical growth vs defense',
        last: '0.000198',
        d1: '−0.8%',
        d5: '−2.1%',
        m3: '+4.6%',
        z: '+0.41',
        d1Tone: 'down',
        d5Tone: 'down',
        m3Tone: 'up',
        zTone: 'up',
        accent: '#F0B35A',
    },
    {
        name: 'US HY OAS',
        detail: 'High-yield credit spread',
        last: '277 bp',
        d1: '−2 bp',
        d5: '−5 bp',
        m3: '−18 bp',
        z: '−1.12',
        d1Tone: 'up',
        d5Tone: 'up',
        m3Tone: 'up',
        zTone: 'up',
        accent: '#E88AB0',
    },
    {
        name: 'MOVE Index',
        detail: 'Treasury implied volatility',
        last: '70.9',
        d1: '−1.4',
        d5: '−3.8',
        m3: '−12.1',
        z: '−0.55',
        d1Tone: 'up',
        d5Tone: 'up',
        m3Tone: 'up',
        zTone: 'up',
        accent: '#FFFFFF99',
    },
]

function toneClass(tone: ChangeTone) {
    if (tone === 'up') return 'text-[#2CB37B]'
    if (tone === 'down') return 'text-[#E25C3F]'
    return 'text-white/50'
}

const MOST_READ = [
    { num: '01', title: 'Fed Signals Prolonged Hold as Inflation Pressure Lingers', source: 'Reuters' },
    { num: '02', title: 'Bitcoin Breaches $85K as ETF Inflows Accelerate', source: 'Bloomberg' },
    { num: '03', title: 'Tech Stocks Rally Amid Strong Earnings Reports', source: 'CNBC' },
    { num: '04', title: 'Oil Prices Surge After OPEC+ Cuts Production', source: 'MarketWatch' },
    { num: '05', title: 'US Job Market Remains Resilient Despite Rate Hikes', source: 'The Wall Street Journal' },
]

export default function NewsSidebar() {
    return (
        <div className="flex flex-col gap-3 sm:gap-5">
            {/* Bloomberg TV */}
            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.66797 11.6667C1.66797 8.524 1.66797 6.95262 2.64428 5.97631C3.62059 5 5.19194 5 8.33464 5H11.668C14.8106 5 16.3821 5 17.3583 5.97631C18.3346 6.95262 18.3346 8.524 18.3346 11.6667C18.3346 14.8093 18.3346 16.3808 17.3583 17.357C16.3821 18.3333 14.8106 18.3333 11.668 18.3333H8.33464C5.19194 18.3333 3.62059 18.3333 2.64428 17.357C1.66797 16.3808 1.66797 14.8093 1.66797 11.6667Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M7.5 2.50033L10 5.00033L13.3333 1.66699"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-white text-[16px] leading-[19px] font-semibold">Bloomberg TV</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#E25C3F1A] py-1 sm:py-1.5 px-2 sm:px-3">
                        <div className="w-1.5 h-1.5 bg-[#E25C3F] rounded-full" />
                        <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">Live</span>
                    </div>
                </div>
                <div className="bg-[#FFFFFF08] overflow-hidden" style={{ height: 200 }} />
            </div>

            {/* Today's Most Read */}
            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <p className="text-white text-[16px] leading-[19px] font-semibold">Today&apos;s Most Read</p>
                    <span className="text-white/60 text-[12px] leading-[14px]">Next In 0:11</span>
                </div>

                <div className="flex flex-col gap-2.5 sm:gap-4">
                    {MOST_READ.map((item) => (
                        <div key={item.num} className="flex gap-2 sm:gap-3 cursor-pointer group">
                            <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium flex-shrink-0 mt-0.5">
                                {item.num}
                            </span>
                            <div>
                                <p className="text-white text-[14px] sm:text-[16px] leading-5 sm:leading-[21px] font-medium">
                                    {item.title}
                                </p>
                                <p className="text-white/60 text-[12px] sm:text-[14px] leading-[14px] sm:leading-[17px] mt-1">
                                    {item.source}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market Signals — replaces Index Futures (no trigger / regime / alert) */}
            <div className="bg-[#16161F] p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <p className="text-white text-[16px] leading-[19px] font-semibold">Market Signals</p>
                    <span className="text-white/50 text-[11px] sm:text-[12px] leading-[14px]">Desk monitor</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse">
                        <thead>
                            <tr className="text-[#838388] text-[10px] sm:text-[11px] leading-[14px] uppercase tracking-wide">
                                <th className="text-left font-medium pb-2 pr-3">Signal</th>
                                <th className="text-right font-medium pb-2 px-1.5">Last</th>
                                <th className="text-right font-medium pb-2 px-1.5">1D</th>
                                <th className="text-right font-medium pb-2 px-1.5">5D</th>
                                <th className="text-right font-medium pb-2 px-1.5">3M</th>
                                <th className="text-right font-medium pb-2 pl-1.5">Z</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SIGNALS.map((row) => (
                                <tr key={row.name} className="border-t border-[#FFFFFF0D]">
                                    <td className="py-2.5 sm:py-3 pr-3 align-middle">
                                        <div className="flex items-start gap-2">
                                            <span
                                                className="w-[3px] self-stretch min-h-[28px] flex-shrink-0 mt-0.5"
                                                style={{ backgroundColor: row.accent }}
                                            />
                                            <div className="min-w-0">
                                                <p className="text-white text-[12px] sm:text-[13px] leading-[16px] font-medium">
                                                    {row.name}
                                                </p>
                                                <p className="text-[#838388] text-[10px] sm:text-[11px] leading-[14px] mt-0.5">
                                                    {row.detail}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2.5 sm:py-3 px-1.5 text-right text-white text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap">
                                        {row.last}
                                    </td>
                                    <td
                                        className={`py-2.5 sm:py-3 px-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.d1Tone)}`}
                                    >
                                        {row.d1}
                                    </td>
                                    <td
                                        className={`py-2.5 sm:py-3 px-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.d5Tone)}`}
                                    >
                                        {row.d5}
                                    </td>
                                    <td
                                        className={`py-2.5 sm:py-3 px-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.m3Tone)}`}
                                    >
                                        {row.m3}
                                    </td>
                                    <td
                                        className={`py-2.5 sm:py-3 pl-1.5 text-right text-[11px] sm:text-[12px] leading-[15px] font-medium whitespace-nowrap ${toneClass(row.zTone)}`}
                                    >
                                        {row.z}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
