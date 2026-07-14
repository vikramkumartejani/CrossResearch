import MarketCard from './MarketCard'
import GreeksSynthesis from './GreeksSynthesis'
import SectorGammaDashboard from './SectorGammaDashboard'
import MacroEventStress from './MacroEventStress'

// ── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
    {
        ticker: 'SPX',
        regime: 'Pos Gamma',
        regimeColor: '#2CB37B',
        name: 'S&P 500 Index',
        price: '5 841.1',
        change: '+0.34%',
        changePositive: true,
        dealerBias: 'Long Gamma – Bullish',
        trendDay: '22%',
        odteDom: '34%',
        meanRevert: '74%',
        volRegime: 'Suppressed',
        levels: [
            { label: 'Call Wall', level: 5900, change: '+0.99%', positive: true },
            { label: 'Vol Trigger', level: 5870, change: '+0.4%', positive: true },
            { label: 'Price Alert', level: 5920, change: '+1.2%', positive: true },
            { label: 'Trend Line', level: 5850, change: '-0.5%', positive: false },
            { label: 'Support Level', level: 5800, change: '-1.0%', positive: false },
            { label: 'Resistance Level', level: 5950, change: '-1.5%', positive: false },
            { label: 'Market Sentiment', level: 5870, change: '-0.75%', positive: false },
        ],
        summary: 'SPX opens at 5,842, positioned +22 points above the gamma flip at 5,820, confirming a positive gamma regime. Dealers structurally long gamma with mechanical support anchored at the 5,800 put wall. The 5,900 call wall acts simultaneously as a magnet and resistance. ODTE concentration at 34% is below the critical 40% dominance threshold. Charm flows project mild bearish pressure into the close. Mean reversion probability is elevated at 74% — favor fading extremes today.',
        tags: ['Long Gamma Regime', 'Vol Suppressed', 'Charm Bearish Close', 'Vanna Squeeze Risk'],
    },
    {
        ticker: 'NDX',
        regime: 'Transition',
        regimeColor: '#F59E0B',
        name: 'Nasdaq – 100 Futures',
        price: '20 918.5',
        change: '+0.51%',
        changePositive: true,
        dealerBias: 'Transitioning – Watch',
        trendDay: '22%',
        odteDom: '34%',
        meanRevert: '74%',
        volRegime: 'Suppressed',
        levels: [
            { label: 'Call Wall', level: 5900, change: '+0.99%', positive: true },
            { label: 'Vol Trigger', level: 5870, change: '-0.4%', positive: false },
            { label: 'Price Alert', level: 5920, change: '+1.2%', positive: true },
            { label: 'Trend Line', level: 5850, change: '-0.5%', positive: false },
            { label: 'Support Level', level: 5800, change: '-1.0%', positive: false },
            { label: 'Resistance Level', level: 5950, change: '-1.5%', positive: false },
            { label: 'Market Sentiment', level: 5870, change: '-0.75%', positive: false },
        ],
        summary: 'NQ is in a critical transition regime — spot at 20,918 sits only 31 points above the gamma flip at 20,950. The ODTE dominance at 48% breaches the critical 40% threshold, meaning intraday options mechanics now dominate risk. If NQ breaks below 20,900, dealers short gamma must sell futures to hedge — creating self-reinforcing downside acceleration. Upside reclaim above 21,100 vol trigger would flip flows structurally bullish.',
        tags: ['Transition – Resolve Pending', 'Odte Dominant – 48%'],
    },
    {
        ticker: 'DJIA',
        regime: 'Pos Gamma',
        regimeColor: '#2CB37B',
        name: 'Dow Jones Industrial',
        price: '42 545.8',
        change: '+0.21%',
        changePositive: true,
        dealerBias: 'Long Gamma – Stable',
        trendDay: '22%',
        odteDom: '34%',
        meanRevert: '74%',
        volRegime: 'Suppressed',
        levels: [
            { label: 'Call Wall', level: 5900, change: '+0.99%', positive: true },
            { label: 'Vol Trigger', level: 5870, change: '+0.4%', positive: true },
            { label: 'Price Alert', level: 5920, change: '+1.2%', positive: true },
            { label: 'Trend Line', level: 5850, change: '-0.5%', positive: false },
            { label: 'Support Level', level: 5800, change: '-1.0%', positive: false },
            { label: 'Resistance Level', level: 5950, change: '-1.5%', positive: false },
            { label: 'Market Sentiment', level: 5870, change: '-0.75%', positive: false },
        ],
        summary: 'DJIA at 42,654 sits comfortably +454 points above its gamma flip at 42,200. The most stable of the three indices today — positive gamma regime, ODTE dominance at only 27%, mean reversion probability at 81%. The 42,500 pin zone is gravitationally active heading into Friday\'s OPEX. IV term structure in contango. VIX suppressed. DJIA is the safest mean-reversion environment.',
        tags: ['Long Gamma – Stable', 'Pin Zone Active 42,500', 'Vol Suppressed'],
    },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OptionsPositioning() {
    return (
        <div>
            {/* Header */}
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25 15.75H7.5C4.67157 15.75 3.25736 15.75 2.37868 14.8713C1.5 13.9927 1.5 12.5784 1.5 9.75V7.5C1.5 4.67157 1.5 3.25736 2.37868 2.37868C3.25736 1.5 4.67157 1.5 7.5 1.5H9C11.8284 1.5 13.2427 1.5 14.1213 2.37868C15 3.25736 15 4.67157 15 7.5V7.875" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.0552 10.8027C13.2144 10.3991 13.7856 10.3991 13.9448 10.8027L13.9723 10.8727C14.3611 11.8585 15.1415 12.6388 16.1273 13.0276L16.1973 13.0552C16.6009 13.2144 16.6009 13.7856 16.1973 13.9448L16.1273 13.9723C15.1415 14.3611 14.3611 15.1415 13.9723 16.1273L13.9448 16.1973C13.7856 16.6009 13.2144 16.6009 13.0552 16.1973L13.0276 16.1273C12.6388 15.1415 11.8585 14.3611 10.8727 13.9723L10.8027 13.9448C10.3991 13.7856 10.3991 13.2144 10.8027 13.0552L10.8727 13.0276C11.8585 12.6388 12.6388 11.8585 13.0276 10.8727L13.0552 10.8027Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.25 5.25H11.25M5.25 8.625H11.25M5.25 12H8.25" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Options Positioning Dealer Positioning Engine</span>
                </div>
                <h1 className="text-white text-[35px] font-medium leading-[42px] mb-2">Mechanical Dealer Levels</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Gamma exposure, dealer bias and key option levels for SPX, NDX and DJIA. Identifies walls, flip zones
                    and vacuum areas that drive intraday mechanics.
                </p>
            </div>

            <div className="px-4 lg:px-6">
                {/* Market Structure — unchanged */}
                <h2 className="text-white text-[18px] font-medium leading-[22px] mb-4">Market Structure</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                    {CARDS.map(card => (
                        <MarketCard key={card.ticker} {...card} />
                    ))}
                </div>

                {/* Greeks Synthesis */}
                <GreeksSynthesis />

                {/* Sector Gamma Dashboard + Macro Event Stress */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_524px] gap-4 grow">
                    <SectorGammaDashboard />
                    <MacroEventStress />
                </div>
            </div>
        </div>
    )
}
