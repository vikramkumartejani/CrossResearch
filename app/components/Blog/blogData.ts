// ─── Types ────────────────────────────────────────────────────────────────────

export interface Post {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    tab: 'recent' | 'strategies' | 'updates' | 'education';
}

export interface Tab {
    id: 'recent' | 'strategies' | 'updates' | 'education';
    label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const POSTS: Post[] = [
    // Recent (4)
    { id: '1',  category: 'Product Updates',   title: 'LuxAlgo Quant Update: Integrated Charts Are Here',              excerpt: 'The biggest challenge with creating Pine Script® using AI has never been getting code on the screen — it has been making that code actually work.',  author: 'Jacob Denbrock',     date: 'Apr 23, 2026', image: '/assets/blog.png', tab: 'recent'     },
    { id: '2',  category: 'Product Updates',   title: 'CrossResearch Now Supports Multi-Asset Dashboards',             excerpt: 'Track equities, crypto, and forex side-by-side in a single unified dashboard with real-time data feeds.',                                        author: 'Jacob Denbrock',     date: 'Apr 22, 2026', image: '/assets/blog.png',      tab: 'recent'     },
    { id: '3',  category: 'Product Updates',   title: 'New Signal Alert System: Never Miss a Trade Setup Again',       excerpt: 'Our revamped alert engine delivers push, email, and webhook notifications the moment a high-conviction setup forms.',                           author: 'Jacob Denbrock',     date: 'Apr 21, 2026', image: '/assets/blog.png', tab: 'recent'     },
    { id: '4',  category: 'Product Updates',   title: 'Platform Performance Update: 3× Faster Chart Loading',         excerpt: 'Under-the-hood optimizations cut average chart load time from 900 ms to under 300 ms across all devices.',                                         author: 'Jacob Denbrock',     date: 'Apr 20, 2026', image: '/assets/blog.png',      tab: 'recent'     },
    { id: '5',  category: 'Product Updates',   title: 'Using Multiple Indicators Without Overcomplicating Your Chart', excerpt: 'Learn how to layer RSI, MACD, and volume profiles effectively while keeping your chart readable and actionable.',                               author: 'Christopher Downie', date: 'Apr 21, 2026', image: '/assets/blog.png', tab: 'recent' },

    // Strategies (4)
    { id: '6',  category: 'Technical Analysis','title': 'Rob Booker Missed Pivot Points: Highlighting Hidden Levels',   'excerpt': 'Discover how missed pivot points can reveal untapped support and resistance zones that most traders overlook.',                               author: 'Alex Pierrefeu',     date: 'Apr 20, 2026', image: '/assets/blog.png',      tab: 'strategies' },
    { id: '7',  category: 'Technical Analysis','title': 'Divergence Indicator: Automatically Spotting Price-Momentum',  'excerpt': 'Automate divergence detection across timeframes to catch trend reversals before they become obvious to the crowd.',                           author: 'Christopher Downie', date: 'Apr 19, 2026', image: '/assets/blog.png', tab: 'strategies' },
    { id: '8',  category: 'Technical Analysis','title': "Connors RSI Guide: Enhanced RSI for Short-Term Signals",        'excerpt': 'Connors RSI combines classic RSI, streak length, and rate-of-change to generate more precise short-term entry signals.',                    author: 'Christopher Downie', date: 'Apr 18, 2026', image: '/assets/blog.png',      tab: 'strategies' },

    // Updates (3)
    { id: '9',  category: 'Product Updates',   title: 'New Feature: Advanced Market Regime Detection',                 excerpt: 'Our latest update brings institutional-grade regime detection — trend, range, and volatile — straight to your dashboard.',                     author: 'Jacob Denbrock',     date: 'Apr 17, 2026', image: '/assets/blog.png', tab: 'updates'    },
    { id: '10', category: 'Product Updates',   title: 'Platform Update: Improved Signal Accuracy Across All Assets',   excerpt: 'We have significantly improved the accuracy of our algo signals following a six-month back-testing overhaul.',                                  author: 'Jacob Denbrock',     date: 'Apr 15, 2026', image: '/assets/blog.png',      tab: 'updates'    },
    { id: '11', category: 'Product Updates',   title: 'Introducing Smart Screener: Filter Markets in Seconds',         excerpt: 'The new Smart Screener lets you filter thousands of instruments by momentum, volatility, and pattern criteria in real time.',                    author: 'Jacob Denbrock',     date: 'Apr 13, 2026', image: '/assets/blog.png', tab: 'updates'    },

    // Education (3)
    { id: '12', category: 'Education',         title: 'Understanding Market Regimes for Better Trading Decisions',     excerpt: 'Learn how to identify trending, ranging, and volatile market regimes — and adapt your strategy for each environment.',                           author: 'Alex Pierrefeu',     date: 'Apr 12, 2026', image: '/assets/blog.png',      tab: 'education'  },
    { id: '13', category: 'Education',         title: 'Risk Management: The Foundation of Consistent Trading',         excerpt: 'Master position sizing, stop placement, and reward-to-risk ratios to protect your capital and grow it steadily over time.',                    author: 'Christopher Downie', date: 'Apr 10, 2026', image: '/assets/blog.png', tab: 'education'  },
    { id: '14', category: 'Education',         title: 'Reading Order Flow: What the Big Players Are Really Doing',     excerpt: 'Order flow analysis reveals institutional footprints in the market — learn to read the tape before price moves.',                               author: 'Alex Pierrefeu',     date: 'Apr 8,  2026', image: '/assets/blog.png',      tab: 'education'  },
    { id: '15', category: 'Education',         title: 'Reading Order Flow: What the Big Players Are Really Doing',     excerpt: 'Order flow analysis reveals institutional footprints in the market — learn to read the tape before price moves.',                               author: 'Alex Pierrefeu',     date: 'Apr 8,  2026', image: '/assets/blog.png',      tab: 'education'  },
];

export const TABS: Tab[] = [
    { id: 'recent',     label: 'Recent'            },
    { id: 'strategies', label: 'Strategies & Tips'  },
    { id: 'updates',    label: 'Product Updates'    },
    { id: 'education',  label: 'Education'          },
];

export const TAB_DESCRIPTIONS: Record<Tab['id'], string> = {
    recent:     '',
    strategies: 'Actionable trading strategies and practical tips designed to improve decision-making, risk management, and overall market performance.',
    updates:    'Latest product updates and improvements designed to enhance performance, usability, and trading experience across all tools.',
    education:  'Learn trading fundamentals and advanced strategies through structured education designed to build consistent market understanding and skill.',
};
