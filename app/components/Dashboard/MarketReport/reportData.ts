export interface Report {
    id: number
    tags: { label: string; color: string }[]
    readTime: string
    sentiment: string
    sentimentColor: string
    title: string
    subtitle: string
    body: string
    track: string
    author: string
    date: string
    // Detail modal fields
    assetCode: string
    assetName: string
    bias: 'SHORT' | 'LONG'
    dateShort: string
    headline: string
    contentHtml: string
    sidebarTags: string[]
    rockets: number
    comments: number
    views: number
    chartImage?: string
}

export const REPORTS: Report[] = [
    {
        id: 1,
        tags: [
            { label: 'MACRO', color: '#88C4FF' },
            { label: 'REGIME', color: '#A78BFA' },
        ],
        readTime: '12 Min Read',
        sentiment: 'CONSTRUCTIVE',
        sentimentColor: '#2CB37B',
        title: 'Q1 2026 Macro Regime Outlook',
        subtitle: 'Stagflation persists. Positioning for late-cycle defensive rotation.',
        body: 'Our cycle composite continues to print stagflation across G7 economies. Real yields remain elevated while growth surprise indices roll over. We outline four positioning frameworks for the quarter.',
        track: 'Idea Track • 12 W',
        author: 'BTB Macro Desk',
        date: 'Feb 14, 2026',
        assetCode: 'SPX',
        assetName: 'S&P 500 Index',
        bias: 'LONG',
        dateShort: 'Feb 14',
        headline: 'Late-Cycle Defensive Rotation',
        contentHtml: `
            <p>Our cycle composite continues to print <strong>stagflation</strong> across G7 economies. Real yields remain elevated while growth surprise indices roll over.</p>
            <p>We outline four positioning frameworks for the quarter:</p>
            <ul>
                <li>Overweight quality equities with pricing power</li>
                <li>Underweight cyclicals tied to soft manufacturing PMIs</li>
                <li>Maintain duration hedges into sticky services inflation</li>
                <li>Favor USD defensives until growth impulse turns</li>
            </ul>
            <p>The setup remains constructive for selective risk, but breadth is narrow and leadership is fragile.</p>
        `,
        sidebarTags: ['Macro', 'Regime Analysis', 'Equities', 'Rates'],
        rockets: 12,
        comments: 3,
        views: 842,
    },
    {
        id: 2,
        tags: [
            { label: 'FX', color: '#34D399' },
            { label: 'TECHNICAL', color: '#F59E0B' },
        ],
        readTime: '07 Min Read',
        sentiment: 'Defensive',
        sentimentColor: '#E25C3F',
        title: 'EUR/USD Structural Analysis',
        subtitle: 'Bearish structure intact below 1.0788 reversal level.',
        body: 'EUR/USD remains in a major downtrend with minor counter-trend rally exhausting near 1.0595. Reversal threshold sits at 1.07887 — below which our regime play targets 1.02621.',
        track: 'Idea Track • 12 W',
        author: 'BTB Macro Strategy',
        date: 'Feb 12, 2026',
        assetCode: 'EURUSD',
        assetName: 'Euro / U.S. Dollar',
        bias: 'SHORT',
        dateShort: 'Feb 12',
        headline: 'Bearish Structure Below Reversal',
        contentHtml: `
            <p>EUR/USD remains in a major downtrend with a minor counter-trend rally exhausting near <strong>1.0595</strong>.</p>
            <p>The reversal threshold sits at <u>1.07887</u> — below which our regime play targets <strong>1.02621</strong>.</p>
            <p>Wave structure favors continuation lower while price holds beneath the invalidation level. Momentum divergence on the daily is present but not yet confirmed by a break of structure.</p>
        `,
        sidebarTags: ['Technical Indicators', 'Trend Analysis', 'FX', 'Wave Analysis'],
        rockets: 5,
        comments: 1,
        views: 177,
    },
    {
        id: 3,
        tags: [
            { label: 'CRYPTO', color: '#F97316' },
            { label: 'CYCLE', color: '#A78BFA' },
        ],
        readTime: '10 Min Read',
        sentiment: 'CONSTRUCTIVE',
        sentimentColor: '#2CB37B',
        title: 'Bitcoin Cycle Positioning',
        subtitle: 'Mid-Cycle expansion. Halving setup confirmed.',
        body: 'Bitcoin remains in a mid-cycle expansion phase with liquidity and ETF flows supporting higher highs. We map key support zones and invalidation for the current impulse.',
        track: 'Idea Track • 12 W',
        author: 'BTB Digital Assets',
        date: 'Feb 15, 2026',
        assetCode: 'BTCUSD',
        assetName: 'Bitcoin / U.S. Dollar',
        bias: 'LONG',
        dateShort: 'Feb 15',
        headline: 'Mid-Cycle Expansion Confirmed',
        contentHtml: `
            <p>Bitcoin remains in a <em>mid-cycle expansion</em> phase with liquidity and ETF flows supporting higher highs.</p>
            <p>We map key support zones and invalidation for the current impulse. As long as weekly structure holds, pullbacks are treated as continuation entries rather than regime shifts.</p>
            <p>Watch funding and open interest for signs of overcrowding into resistance.</p>
        `,
        sidebarTags: ['Crypto', 'Cycle Analysis', 'Liquidity', 'ETF Flows'],
        rockets: 28,
        comments: 6,
        views: 1204,
    },
]

export const SIDEBAR_REPORTS = [REPORTS[0], REPORTS[1], REPORTS[2]]
