// ── Signal Charts data ──────────────────────────────────────────────────────

export type ChartType = 'bar' | 'line'

export interface SignalChart {
    id: string
    section: string          // section heading (e.g. "Liquidity & Cross Signals")
    category: string         // sub-label (e.g. "Rates", "Breadth", "Commodities", "Credit", "Volatility")
    title: string
    badge: 'ALPHA' | 'WATCH' | 'NEUTRAL'
    chartType: ChartType

    // Bar chart: each bar has a label + value
    barLabels?: string[]
    barValues?: number[]

    // Line chart: values array (equally spaced)
    lineValues?: number[]

    description: string
    action: string
    actionPositive: boolean   // true = bullish / green, false = bearish / red
}

export const SIGNAL_CHARTS: SignalChart[] = [
    // ── Liquidity & Cross Signals ──────────────────────────────────────────
    {
        id: 'usd-rate-diff',
        section: 'Liquidity & Cross Signals',
        category: 'Rates',
        title: 'USD Rate Differential VS G7',
        badge: 'ALPHA',
        chartType: 'bar',
        barLabels: ['Vs EUR', 'Vs GBP', 'Vs JPY', 'Vs CAD', 'Vs AUD', 'Vs CHF', 'Vs NZD'],
        barValues: [2.1, 1.4, 3.8, 1.2, 2.7, 0.9, 2.4],
        description:
            'USD short rate premium intact vs EUR/GBP/JPY/CAD/AUD/CHF/NZD — carry trade tailwind persists through the next FOMC window.',
        action: 'Long USD vs low-yielders (CHF, JPY).',
        actionPositive: true,
    },
    {
        id: 'breadth-200ema',
        section: 'Liquidity & Cross Signals',
        category: 'Breadth',
        title: '% Stocks > 200 EMA vs NASDAQ',
        badge: 'ALPHA',
        chartType: 'line',
        lineValues: [12000, 14000, 16000, 18000, 17000, 19000, 18500, 16000, 15000, 17000, 16500, 14000, 13500, 12000, 13000, 14500, 13000, 12500, 11000, 10000],
        description:
            'USD short rate premium intact vs EUR/GBP/JPY/CAD/AUD/CHF/NZD — carry trade tailwind persists through the next FOMC window.',
        action: 'Long USD vs low-yielders (CHF, JPY).',
        actionPositive: true,
    },
    // ── Commodities ─────────────────────────────────────────────────────────
    {
        id: 'wti-spread',
        section: 'Liquidity & Cross Signals',
        category: 'Commodities',
        title: 'WTI Front / 12m Spread',
        badge: 'ALPHA',
        chartType: 'line',
        lineValues: [340, 300, 240, 160, 80, 20, -40, -80, -100, -120, -140, -155, -165, -172, -178, -183, -185, -184, -185, -185],
        description:
            'Front-month flipped to contango at −1.8% vs back. Term-structure inversion historically front-runs realized vol expansions of +28% within 30 days.',
        action: 'Long Crude vol (gamma); avoid short calendar spreads.',
        actionPositive: false,
    },
    {
        id: 'hy-ig-credit',
        section: 'Liquidity & Cross Signals',
        category: 'Credit',
        title: 'HY- IG Credit Spread',
        badge: 'ALPHA',
        chartType: 'line',
        lineValues: [85, 100, 120, 150, 180, 210, 240, 265, 280, 300, 315, 325, 330, 335, 338, 340, 339, 340, 340, 340],
        description:
            'Spread widened 20bpX in 14 sessions to 312bps. HY repricing leads equity drawdowns by ~6 weeks. Watch for sympathy move in cyclicals.',
        action: 'Underweight high-beta equity; long IG vs HY in pairs.',
        actionPositive: false,
    },
    // ── Volatility ──────────────────────────────────────────────────────────
    {
        id: 'vix-term-structure',
        section: 'Volatility',
        category: 'Volatility',
        title: 'VIX Term Structure',
        badge: 'ALPHA',
        chartType: 'line',
        lineValues: [14, 14.5, 15, 15.8, 16.5, 17.2, 18, 18.8, 19.4, 20, 20.5, 21, 21.4, 21.8, 22.1, 22.3, 22.4, 22.5, 22.5, 22.6],
        description:
            'Front VIX contango has flattened — historically precedes vol spikes within 2–3 weeks. Term structure compression suggests market is under-hedged.',
        action: 'Buy near-dated vol; rotate into defensive hedges.',
        actionPositive: false,
    },
    {
        id: 'skew-index',
        section: 'Volatility',
        category: 'Volatility',
        title: 'CBOE SKEW Index',
        badge: 'WATCH',
        chartType: 'line',
        lineValues: [120, 125, 122, 130, 135, 140, 138, 142, 148, 152, 155, 158, 156, 160, 162, 165, 163, 167, 168, 170],
        description:
            'SKEW index elevated above 160 — tail-risk demand rising. Historically correlates with institutional hedging activity and short-term market stress.',
        action: 'Hold tail hedges; monitor for reversal below 155.',
        actionPositive: true,
    },
    // ── FX / Carry ──────────────────────────────────────────────────────────
    {
        id: 'g10-carry',
        section: 'FX / Carry',
        category: 'FX',
        title: 'G10 Carry Index (Long vs Short)',
        badge: 'ALPHA',
        chartType: 'line',
        lineValues: [0, 0.2, 0.5, 0.8, 1.1, 1.4, 1.2, 1.5, 1.8, 2.0, 1.9, 2.1, 2.3, 2.5, 2.4, 2.6, 2.7, 2.8, 2.9, 3.0],
        description:
            'G10 carry index extending gains — high-yielders outperforming vs low-yielders for 8 consecutive weeks. Regime remains supportive for carry.',
        action: 'Long AUD/JPY, NZD/CHF; trim on risk-off signals.',
        actionPositive: true,
    },
    {
        id: 'dxy-momentum',
        section: 'FX / Carry',
        category: 'FX',
        title: 'DXY Momentum vs COT Positioning',
        badge: 'WATCH',
        chartType: 'bar',
        barLabels: ['Wk-8', 'Wk-7', 'Wk-6', 'Wk-5', 'Wk-4', 'Wk-3', 'Wk-2', 'Wk-1'],
        barValues: [-2.1, -1.4, 0.3, 1.2, 2.0, 1.8, 2.5, 3.1],
        description:
            'COT non-commercial net longs in USD reaching 18-month highs. Momentum diverging from crowded positioning — risk of reversal if data disappoints.',
        action: 'Reduce USD longs; hedge with EUR/USD calls.',
        actionPositive: false,
    },
]

// Group by section
export function groupBySection(charts: SignalChart[]): Record<string, SignalChart[]> {
    return charts.reduce<Record<string, SignalChart[]>>((acc, c) => {
        if (!acc[c.section]) acc[c.section] = []
        acc[c.section].push(c)
        return acc
    }, {})
}
