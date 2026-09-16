export interface Post {
  id: string
  slug: string
  category: string
  title: string
  excerpt: string
  body: string[]
  author: string
  date: string
  dateIso: string
  image: string
  tab: 'recent' | 'strategies' | 'updates' | 'education'
}

export interface Tab {
  id: 'recent' | 'strategies' | 'updates' | 'education'
  label: string
}

/** CrossResearch-only editorial posts (no competitor/demo brands). */
export const POSTS: Post[] = [
  {
    id: '1',
    slug: 'crossresearch-multi-asset-dashboards',
    category: 'Product Updates',
    title: 'CrossResearch multi-asset dashboards',
    excerpt:
      'Track equities, crypto, and forex side-by-side in one research environment with shared macro context.',
    body: [
      'CrossResearch dashboards are built so macro, positioning, and asset views share the same regime language.',
      'Instead of jumping between disconnected charts, traders can keep the catalyst map and the execution context in one workspace.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 12, 2026',
    dateIso: '2026-09-12',
    image: '/assets/blog.png',
    tab: 'recent',
  },
  {
    id: '2',
    slug: 'signal-alerts-high-conviction-setups',
    category: 'Product Updates',
    title: 'Signal alerts for high-conviction setups',
    excerpt:
      'Alert workflows for push, email, and webhook delivery when research conditions align.',
    body: [
      'Alerts should fire on defined research conditions - not noise. CrossResearch alert design emphasizes conviction filters and clear context.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 10, 2026',
    dateIso: '2026-09-10',
    image: '/assets/blog.png',
    tab: 'recent',
  },
  {
    id: '3',
    slug: 'faster-chart-loading-performance',
    category: 'Product Updates',
    title: 'Faster chart loading across the platform',
    excerpt: 'Performance work focused on chart readiness and smoother research workflows.',
    body: [
      'Chart performance matters when traders review multiple assets around data releases. Ongoing performance work keeps research sessions usable under load.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 8, 2026',
    dateIso: '2026-09-08',
    image: '/assets/blog.png',
    tab: 'recent',
  },
  {
    id: '4',
    slug: 'layering-indicators-without-noise',
    category: 'Product Updates',
    title: 'Layering indicators without chart noise',
    excerpt: 'How to combine structure and momentum tools without stacking redundant signals.',
    body: [
      'Most traders do not need more indicators - they need clearer roles for the ones they keep. Structure for bias, momentum for timing, risk for size.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 6, 2026',
    dateIso: '2026-09-06',
    image: '/assets/blog.png',
    tab: 'recent',
  },
  {
    id: '5',
    slug: 'pivot-structure-support-resistance',
    category: 'Technical Analysis',
    title: 'Pivot structure and hidden support/resistance',
    excerpt: 'Using structural pivots to map liquidity and invalidation without overfitting every swing.',
    body: [
      'Structural pivots help define where the market has accepted or rejected price. Treat them as context for risk, not automatic entries.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 5, 2026',
    dateIso: '2026-09-05',
    image: '/assets/blog.png',
    tab: 'strategies',
  },
  {
    id: '6',
    slug: 'divergence-price-momentum',
    category: 'Technical Analysis',
    title: 'Divergence between price and momentum',
    excerpt: 'How divergence can flag exhaustion - and when it fails in strong trends.',
    body: [
      'Divergence is a warning, not a trigger. In strong trends it can persist. Pair it with structure and macro regime before acting.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 4, 2026',
    dateIso: '2026-09-04',
    image: '/assets/blog.png',
    tab: 'strategies',
  },
  {
    id: '7',
    slug: 'short-term-momentum-rsi-framework',
    category: 'Technical Analysis',
    title: 'A short-term momentum RSI framework',
    excerpt: 'Using RSI-style momentum with streak and rate-of-change context for short horizons.',
    body: [
      'Short-horizon momentum tools need strict risk. Use them for timing after a higher-timeframe thesis is set.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 3, 2026',
    dateIso: '2026-09-03',
    image: '/assets/blog.png',
    tab: 'strategies',
  },
  {
    id: '8',
    slug: 'market-regime-detection-update',
    category: 'Product Updates',
    title: 'Market regime detection update',
    excerpt: 'Trend, range, and volatile regimes surfaced more clearly in the research stack.',
    body: [
      'Regime labels keep strategy selection honest. A breakout rule in a range regime is a different trade than the same rule in a trend regime.',
    ],
    author: 'CrossResearch Desk',
    date: 'Sep 2, 2026',
    dateIso: '2026-09-02',
    image: '/assets/blog.png',
    tab: 'updates',
  },
  {
    id: '9',
    slug: 'signal-quality-review-process',
    category: 'Product Updates',
    title: 'Signal quality review process',
    excerpt: 'How CrossResearch reviews signal behavior across regimes without promising perfection.',
    body: [
      'Signal quality work is continuous. We document assumptions and limitations rather than advertising unverifiable accuracy percentages.',
    ],
    author: 'CrossResearch Desk',
    date: 'Aug 30, 2026',
    dateIso: '2026-08-30',
    image: '/assets/blog.png',
    tab: 'updates',
  },
  {
    id: '10',
    slug: 'smart-screener-filter-markets',
    category: 'Product Updates',
    title: 'Smart screener for faster market filtering',
    excerpt: 'Filter instruments by momentum, volatility, and pattern criteria inside the research workflow.',
    body: [
      'Screeners are discovery tools. Always bring candidates back into macro and risk context before sizing.',
    ],
    author: 'CrossResearch Desk',
    date: 'Aug 28, 2026',
    dateIso: '2026-08-28',
    image: '/assets/blog.png',
    tab: 'updates',
  },
  {
    id: '11',
    slug: 'understanding-market-regimes',
    category: 'Education',
    title: 'Understanding market regimes',
    excerpt: 'Identify trending, ranging, and volatile regimes - then adapt strategy and risk.',
    body: [
      'Regime literacy is foundational. CrossResearch education links regimes to models, reports, and execution tools.',
      'Continue with /education/risk-management and /models/macro-regime-model for deeper process.',
    ],
    author: 'CrossResearch Desk',
    date: 'Aug 26, 2026',
    dateIso: '2026-08-26',
    image: '/assets/blog.png',
    tab: 'education',
  },
  {
    id: '12',
    slug: 'risk-management-consistent-trading',
    category: 'Education',
    title: 'Risk management for consistent trading',
    excerpt: 'Position sizing, stops, and process discipline that protect capital.',
    body: [
      'Without risk rules, research edge cannot compound. Write invalidation and size before entry.',
    ],
    author: 'CrossResearch Desk',
    date: 'Aug 24, 2026',
    dateIso: '2026-08-24',
    image: '/assets/blog.png',
    tab: 'education',
  },
  {
    id: '13',
    slug: 'reading-order-flow-institutions',
    category: 'Education',
    title: 'Reading order flow without overclaiming',
    excerpt: 'Institutional footprints are useful context - not a crystal ball.',
    body: [
      'Order-flow tools highlight participation. Combine them with structure and macro, and keep risk bounded.',
    ],
    author: 'CrossResearch Desk',
    date: 'Aug 22, 2026',
    dateIso: '2026-08-22',
    image: '/assets/blog.png',
    tab: 'education',
  },
]

export const TABS: Tab[] = [
  { id: 'recent', label: 'Recent' },
  { id: 'strategies', label: 'Strategies & Tips' },
  { id: 'updates', label: 'Product Updates' },
  { id: 'education', label: 'Education' },
]

export const TAB_DESCRIPTIONS: Record<Tab['id'], string> = {
  recent: '',
  strategies:
    'Actionable trading strategies and practical tips designed to improve decision-making, risk management, and overall market performance.',
  updates:
    'Latest product updates and improvements designed to enhance performance, usability, and trading experience across all tools.',
  education:
    'Learn trading fundamentals and advanced strategies through structured education designed to build consistent market understanding and skill.',
}

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug)
}

export function getPostById(id: string) {
  return POSTS.find((p) => p.id === id)
}

export function blogPath(post: Post) {
  return `/blog/${post.slug}`
}
