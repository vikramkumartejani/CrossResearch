export type ChartType = 'area' | 'area-tenor' | 'dashed' | 'dots' | 'bar'

export interface SignalChart {
    id: string
    category: string
    title: string
    badge: 'ALPHA' | 'WATCH' | 'NEUTRAL'
    chartType: ChartType
    lineValues?: number[]
    yLabels?: string[]
    xLabels?: string[]
    barLabels?: string[]
    barValues?: number[]
    description: string
    action: string
    actionPositive: boolean
}

export const ALL_CHARTS: SignalChart[] = [
    {
        id: 'usd-rate-diff',
        category: 'Rates',
        title: 'USD Rate Differential VS G7',
        badge: 'ALPHA',
        chartType: 'bar',
        barLabels: ['Vs EUR', 'Vs GBP', 'Vs JPY', 'Vs CAD', 'Vs AUD', 'Vs CHF', 'Vs NZD'],
        barValues: [2.1, 1.4, 3.8, 1.2, 2.7, 0.9, 2.4],
        description: 'USD short rate premium intact vs EUR/GBP/JPY/CAD/AUD/CHF/NZD — carry trade tailwind persists through the next FOMC window.',
        action: 'Long USD vs low-yielders (CHF, JPY).',
        actionPositive: true,
    },
    {
        id: 'breadth-200ema',
        category: 'Breadth',
        title: '% Stocks > 200 EMA vs NASDAQ',
        badge: 'ALPHA',
        chartType: 'area',
        lineValues: [12000, 14000, 16000, 18000, 17000, 19000, 18500, 16000, 15000, 17000, 16500, 14000, 13500, 12000, 13000, 14500, 13000, 12500, 11000, 10000],
        yLabels: ['20000', '15000', '10000', '5000', '0'],
        description: 'USD short rate premium intact vs EUR/GBP/JPY/CAD/AUD/CHF/NZD — carry trade tailwind persists through the next FOMC window.',
        action: 'Long USD vs low-yielders (CHF, JPY).',
        actionPositive: true,
    },
    {
        id: 'wti-spread',
        category: 'Commodities',
        title: 'WTI Front / 12m Spread',
        badge: 'ALPHA',
        chartType: 'area',
        lineValues: [340, 300, 240, 160, 80, 20, -40, -80, -100, -120, -140, -155, -165, -172, -178, -183, -185, -184, -185, -185],
        yLabels: ['340', '0', '-0.68', '-1.2', '-1.85'],
        description: 'Front-month flipped to contango at −1.8% vs back. Term-structure inversion historically front-runs realized vol expansions of +28% within 30 days.',
        action: 'Long Crude vol (gamma); avoid short calendar spreads.',
        actionPositive: false,
    },
    {
        id: 'hy-ig-credit',
        category: 'Credit',
        title: 'HY- IG Credit Spread',
        badge: 'ALPHA',
        chartType: 'area',
        lineValues: [85, 100, 120, 150, 180, 210, 240, 265, 280, 300, 315, 325, 330, 335, 338, 340, 339, 340, 340, 340],
        yLabels: ['340', '255', '170', '85', '0'],
        description: 'Spread widened 20bpX in 14 sessions to 312bps. HY repricing leads equity drawdowns by ~6 weeks. Watch for sympathy move in cyclicals.',
        action: 'Underweight high-beta equity; long IG vs HY in pairs.',
        actionPositive: false,
    },
    {
        id: 'gold-silver-ratio',
        category: 'Metals',
        title: 'Gold / Silver Ratio',
        badge: 'ALPHA',
        chartType: 'area',
        lineValues: [98, 99, 100, 99.5, 100, 99, 98.5, 99, 100, 99.5, 100, 99, 98, 99, 100, 99.5, 98.5, 99, 100, 100],
        yLabels: ['100', '75', '50', '25', '0'],
        description: 'Ratio at 88.4x — 2.10 above 5-year mean. Reverts within 60 days in 78% of historical episodes. Tactical mean-reversion.',
        action: 'Long silver vs gold 12-week trade.',
        actionPositive: true,
    },
    {
        id: 'vix-term-structure',
        category: 'Volatility',
        title: 'VIX Term Structure',
        badge: 'ALPHA',
        chartType: 'dots',
        lineValues: [20, 20.2, 20.5, 21, 21.5, 22],
        xLabels: ['1D', '9D', '1M', '3M', '6M', '1Y'],
        yLabels: ['20%', '15%', '10%', '5%', '0%'],
        description: 'VIX9D > VIX9D > VIX3M — front-end stressed but curve still steep on 6M+. Vol selling on the wing remains positive-EV.',
        action: 'Short long-dated vol; long short-dated as event hedge.',
        actionPositive: false,
    },
    {
        id: 'dxy-risk-correlation',
        category: 'Cross – Asset',
        title: 'DXY vs Risk Assets 60d Correlation',
        badge: 'ALPHA',
        chartType: 'dashed',
        lineValues: [0.3, 0.28, 0.25, 0.22, 0.3, 0.18, 0.12, 0.05, 0, -0.05, -0.1, -0.15, -0.18, -0.2, -0.22, -0.23, -0.24, -0.24, -0.25, -0.25],
        yLabels: ['0.3', '0.15', '0', '-0.15', '-0.3'],
        description: 'DXY-SPX correlation has flipped to −0.62 (deeply negative): weakness is now the marginal driver of risk-on, not earnings.',
        action: 'Watch DXY for risk-asset inflection points; trade through DXY proxies.',
        actionPositive: true,
    },
    {
        id: 'us10y-real-yield',
        category: 'Rates',
        title: 'US 10Y Real Yield',
        badge: 'ALPHA',
        chartType: 'area-tenor',
        lineValues: [2.2, 2.15, 2.1, 1.95, 1.7, 1.4],
        xLabels: ['1D', '9D', '1M', '3M', '6M', '1Y'],
        yLabels: ['2.2', '1.65', '1.1', '0.55', '0'],
        description: 'Real yields holding above 2.0% despite Fed dovish lean — a structural headwind for duration and wld that the market is mispricing.',
        action: 'Short long-duration bonds; underweight gold tactically.',
        actionPositive: false,
    },
]
