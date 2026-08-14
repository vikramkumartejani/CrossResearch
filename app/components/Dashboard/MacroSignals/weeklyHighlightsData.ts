// ── Weekly Highlights data ──────────────────────────────────────────────────

export interface BriefPoint {
    id: number
    text: string
}

export interface MacroBrief {
    date: string
    headline: string
    points: BriefPoint[]
    conviction: number   // 0-100
    regime: string
}

export const MACRO_BRIEF: MacroBrief = {
    date: 'Sun, May 24 2026',
    headline: 'Stagflation regime persistence; positioning skewed long quality, short cyclicals.',
    points: [
        {
            id: 1,
            text: 'USD rate differential vs G7 still positive across the curve supports USD carry trades into next FOMC.',
        },
        {
            id: 2,
            text: 'breadth > 200EMA has rolled over 4% in 10d while index makes marginal new highs - classic late-cycle warning.',
        },
        {
            id: 3,
            text: 'Despite recent volatility, emerging markets show resilience, attracting capital flows and providing diversification opportunities.',
        },
        {
            id: 4,
            text: 'Inflation expectations remain anchored, but supply chain concerns could trigger short-term price spikes, warranting caution.',
        },
        {
            id: 5,
            text: 'Equity valuations are stretched in many sectors, indicating a potential correction if earnings growth does not meet forecasts.',
        },
    ],
    conviction: 77,
    regime: 'Stagflation',
}
