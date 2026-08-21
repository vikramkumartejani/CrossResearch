// ── Weekly Highlights data ──────────────────────────────────────────────────

export interface BriefPoint {
    id: number
    text: string
}

export interface MacroBrief {
    date: string
    headline: string
    points: BriefPoint[]
    conviction: number // 0-100
    regime: string
    use_custom?: boolean
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
            text: 'Despite recent volatility, emerging markets show resilience, attracting capital flows.',
        },
        {
            id: 4,
            text: 'Inflation expectations remain anchored, but supply chain concerns could trigger short-term spikes.',
        },
    ],
    conviction: 77,
    regime: 'Stagflation',
}
