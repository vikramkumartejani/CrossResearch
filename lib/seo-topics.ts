export type SeoTopic = {
  slug: string
  title: string
  description: string
  sections: { heading: string; paragraphs: string[] }[]
  related: { href: string; label: string }[]
  articleMeta?: {
    authorName: string
    datePublished: string
    dateModified?: string
    dataThrough?: string
    sources?: string
  }
}

function topic(
  slug: string,
  title: string,
  description: string,
  sections: SeoTopic['sections'],
  related: SeoTopic['related'],
  articleMeta?: SeoTopic['articleMeta']
): SeoTopic {
  return { slug, title, description, sections, related, articleMeta }
}

const baseRelated = {
  methodology: { href: '/methodology', label: 'Methodology' },
  authors: { href: '/authors', label: 'Authors' },
  education: { href: '/education', label: 'Education hub' },
  macro: { href: '/research/macro', label: 'Macro hub' },
  models: { href: '/models', label: 'Models hub' },
  reports: { href: '/reports', label: 'Reports hub' },
  indicators: { href: '/indicators/tradingview', label: 'Indicators hub' },
  ai: { href: '/ai-finance', label: 'AI / ML hub' },
}

export const EDUCATION_TOPICS: SeoTopic[] = [
  topic(
    'forex',
    'How forex markets work',
    'A CrossResearch primer on FX sessions, major pairs, pricing, and how macro transmits into currency markets.',
    [
      {
        heading: 'What forex is',
        paragraphs: [
          'Foreign exchange is the market where currencies are traded against each other. Price is a relative value: EURUSD rises when the euro strengthens versus the dollar.',
          'Liquidity concentrates in major pairs and during the London and New York overlaps. Understanding session timing matters for volatility and spreads.',
        ],
      },
      {
        heading: 'How CrossResearch uses FX education',
        paragraphs: [
          'Education here connects to macro differentials, positioning, and model context rather than isolated chart patterns.',
          'After foundations, move into market structure, risk, and strategy pages that share the same research language as the desk.',
        ],
      },
    ],
    [
      baseRelated.education,
      { href: '/education/technical-analysis', label: 'Technical analysis' },
      { href: '/education/fundamental-analysis', label: 'Fundamental analysis' },
      { href: '/reports/forex/eurusd-outlook-2026-09-20', label: 'EURUSD outlook' },
      baseRelated.macro,
    ]
  ),
  topic(
    'technical-analysis',
    'Technical analysis for research workflows',
    'How price structure, levels, and indicators fit a research process without becoming the whole thesis.',
    [
      {
        heading: 'Role of technicals',
        paragraphs: [
          'Technical analysis organizes price into structure, momentum, and volatility context. It is most useful when it confirms or challenges a macro or positioning thesis.',
          'CrossResearch treats charts as execution context, not as a substitute for understanding catalysts and regimes.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [
          'Over-layering indicators, ignoring timeframe conflict, and treating every signal as a standalone trade idea.',
          'Prefer a small set of tools with clear rules, then link back to macro and risk pages.',
        ],
      },
    ],
    [
      baseRelated.education,
      { href: '/education/market-structure', label: 'Market structure' },
      { href: '/indicators/tradingview', label: 'TradingView indicators' },
      { href: '/indicators/market-structure-indicators', label: 'Structure indicators' },
    ]
  ),
  topic(
    'fundamental-analysis',
    'Fundamental analysis for markets',
    'How growth, inflation, policy, and balances feed into FX, rates, equities, and commodities.',
    [
      {
        heading: 'Core drivers',
        paragraphs: [
          'Fundamentals start with activity, prices, labor, and policy reaction functions. Markets price paths, not single prints.',
          'CrossResearch maps those drivers into regimes and cross-asset implications instead of one-line “bullish/bearish” labels.',
        ],
      },
    ],
    [baseRelated.education, baseRelated.macro, { href: '/research/macro/inflation', label: 'Inflation' }, baseRelated.models]
  ),
  topic(
    'market-structure',
    'Market structure & liquidity',
    'Structure, liquidity pools, and how institutional footprints show up in price.',
    [
      {
        heading: 'Structure basics',
        paragraphs: [
          'Market structure describes swing hierarchy, break/retest behavior, and where liquidity is likely resting.',
          'Pair structure with positioning and event risk so technical levels stay tied to a real catalyst map.',
        ],
      },
    ],
    [
      baseRelated.education,
      { href: '/education/order-flow', label: 'Order flow' },
      { href: '/indicators/order-flow-indicators', label: 'Order-flow indicators' },
    ]
  ),
  topic(
    'order-flow',
    'Order flow concepts for traders',
    'Reading aggression, absorption, and participation without overclaiming tape-reading certainty.',
    [
      {
        heading: 'What order flow can and cannot do',
        paragraphs: [
          'Order-flow tools highlight participation and imbalance. They do not remove the need for risk rules or macro context.',
          'Use them to refine timing after a thesis is set, not to invent a thesis from a single footprint candle.',
        ],
      },
    ],
    [baseRelated.education, { href: '/education/market-structure', label: 'Market structure' }, baseRelated.indicators]
  ),
  topic(
    'risk-management',
    'Risk management foundations',
    'Position sizing, drawdown control, and process discipline for research-driven trading.',
    [
      {
        heading: 'Process over prediction',
        paragraphs: [
          'Edge compounds only if losses stay bounded. Define risk per idea, max daily loss, and when to stand down in hostile regimes.',
          'CrossResearch research can improve decision quality; it does not replace a written risk plan.',
        ],
      },
    ],
    [baseRelated.education, { href: '/education/trading-strategies', label: 'Trading strategies' }, baseRelated.methodology]
  ),
  topic(
    'trading-strategies',
    'Research-linked trading strategies',
    'How to turn macro regimes and structure into rules without overfitting.',
    [
      {
        heading: 'From thesis to rules',
        paragraphs: [
          'A strategy needs entry criteria, invalidation, size, and review cadence. Macro sets the bias; technicals set timing; risk keeps you solvent.',
          'Document what would falsify the idea before you enter.',
        ],
      },
    ],
    [baseRelated.education, { href: '/education/risk-management', label: 'Risk management' }, baseRelated.models]
  ),
]

export const MACRO_TOPICS: SeoTopic[] = [
  topic('inflation', 'Inflation and market impact', 'CPI, PCE, shelter, goods vs services, and how inflation prints reprice rates and risk assets.', [
    { heading: 'Why inflation matters', paragraphs: [
      'Inflation expectations shape real yields, policy odds, and equity multiples. Surprise direction often matters more than the level alone.',
      'CrossResearch tracks inflation through research notes, nowcasts, and cross-asset transmission pages.',
    ]},
  ], [
    { href: '/research/macro/interest-rates', label: 'Interest rates' },
    { href: '/models/inflation-nowcast', label: 'Inflation nowcast' },
    { href: '/reports/events/us-cpi-september-2026', label: 'CPI event report' },
    baseRelated.macro,
  ]),
  topic('labor-market', 'Labor market for traders', 'Employment, wages, participation, and why labor data moves Fed odds and USD.', [
    { heading: 'Reading labor prints', paragraphs: [
      'NFP, unemployment, and wage growth interact. Soft jobs with sticky wages is a different market regime than soft jobs with cooling pay.',
      'Link labor reads to Fed expectations and USD/gold pages rather than treating payrolls in isolation.',
    ]},
  ], [
    { href: '/research/macro/central-banks', label: 'Central banks' },
    { href: '/reports/events/nfp-september-2026', label: 'NFP report' },
    baseRelated.macro,
  ]),
  topic('growth', 'Growth & activity', 'GDP, PMIs, and demand signals that define expansion vs late-cycle risk.', [
    { heading: 'Growth in a market lens', paragraphs: [
      'Growth regimes change equity beta, credit spreads, and commodity demand. Soft landing vs stall narratives reprice differently across assets.',
    ]},
  ], [
    { href: '/models/growth-nowcast', label: 'Growth nowcast' },
    { href: '/models/macro-regime-model', label: 'Macro regime model' },
    baseRelated.macro,
  ]),
  topic('liquidity', 'Liquidity conditions', 'Funding, balance-sheet, and cross-market liquidity context for risk appetite.', [
    { heading: 'Liquidity vs policy rates', paragraphs: [
      'Policy rates set the cost of money; liquidity conditions affect how easily risk is warehoused. Both matter for FX and equities.',
    ]},
  ], [
    { href: '/tools/global-liquidity-index', label: 'Liquidity index' },
    baseRelated.macro,
    baseRelated.models,
  ]),
  topic('interest-rates', 'Interest rates & real yields', 'Nominal yields, real yields, and why they transmit into USD, gold, and equities.', [
    { heading: 'Transmission', paragraphs: [
      'Rising real yields typically pressure duration-sensitive assets and gold; falling real yields often do the opposite - with important exceptions around crisis liquidity.',
    ]},
  ], [
    { href: '/research/macro/inflation', label: 'Inflation' },
    { href: '/reports/gold/gold-outlook-2026-09-20', label: 'Gold outlook' },
    { href: '/models/fed-expectations', label: 'Fed expectations' },
  ]),
  topic('central-banks', 'Central banks & policy paths', 'Fed, ECB, and policy reaction functions for market pricing.', [
    { heading: 'Policy as a path', paragraphs: [
      'Markets trade the expected path of policy, not the last statement in isolation. CrossResearch links policy odds to data surprises and model expectations pages.',
    ]},
  ], [
    { href: '/models/fed-expectations', label: 'Fed expectations' },
    { href: '/models/ecb-expectations', label: 'ECB expectations' },
    { href: '/reports/events/fomc-september-2026', label: 'FOMC report' },
  ]),
  topic('cross-asset', 'Cross-asset transmission', 'How macro shocks show up across FX, rates, equities, and commodities.', [
    { heading: 'One map, many markets', paragraphs: [
      'A useful research desk asks “so what elsewhere?” after every major print. Cross-asset pages connect those transmissions explicitly.',
    ]},
  ], [baseRelated.macro, baseRelated.reports, { href: '/models/cross-asset-model', label: 'Cross-asset model' }]),
]

export const MODEL_TOPICS: SeoTopic[] = [
  topic('inflation-nowcast', 'Inflation nowcast model', 'Near-term inflation tracking used in CrossResearch macro research.', [
    { heading: 'What it measures', paragraphs: ['A nowcast estimates near-term inflation momentum using timely inputs before full official releases settle.'] },
    { heading: 'Limitations', paragraphs: ['Nowcasts can miss regime breaks, data revisions, and one-off distortions. Always read with methodology and error context.'] },
  ], [
    { href: '/research/macro/inflation', label: 'Inflation research' },
    baseRelated.methodology,
    baseRelated.models,
  ], { authorName: 'CrossResearch Quantitative Research', datePublished: '2026-09-01', sources: 'BLS, BEA, market pricing' }),
  topic('growth-nowcast', 'Growth nowcast model', 'Activity tracking that informs regime and risk appetite.', [
    { heading: 'What it measures', paragraphs: ['Growth nowcasts summarize timely activity indicators into an up-to-date growth pulse for research and risk context.'] },
  ], [{ href: '/research/macro/growth', label: 'Growth research' }, baseRelated.models], { authorName: 'CrossResearch Quantitative Research', datePublished: '2026-09-01' }),
  topic('macro-regime-model', 'Macro regime model', 'Growth/inflation regime classification for cross-asset context.', [
    { heading: 'Why regimes', paragraphs: ['Asset behavior differs in reflation, stagflation, disinflation, and recovery states. Regime labels keep research consistent.'] },
  ], [{ href: '/tools/macro-regime-index', label: 'Regime index' }, baseRelated.models], { authorName: 'CrossResearch Quantitative Research', datePublished: '2026-09-01' }),
  topic('fed-expectations', 'Fed expectations model', 'Policy-path interpretation tied to data and market pricing.', [
    { heading: 'Use case', paragraphs: ['Expectation paths help frame USD, rates, and risk trades around FOMC and data weeks.'] },
  ], [{ href: '/research/macro/central-banks', label: 'Central banks' }, baseRelated.models], { authorName: 'CrossResearch Quantitative Research', datePublished: '2026-09-01' }),
  topic('ecb-expectations', 'ECB expectations model', 'Euro-area policy path context for EUR and European risk.', [
    { heading: 'Use case', paragraphs: ['ECB path odds interact with EURUSD, European equities, and relative growth differentials.'] },
  ], [baseRelated.models, { href: '/reports/forex/eurusd-outlook-2026-09-20', label: 'EURUSD outlook' }], { authorName: 'CrossResearch Quantitative Research', datePublished: '2026-09-01' }),
  topic('cross-asset-model', 'Cross-asset model', 'Framework linking macro states to FX, rates, equities, and commodities.', [
    { heading: 'Purpose', paragraphs: ['Converts regime and factor inputs into a coherent cross-asset checklist for research notes.'] },
  ], [baseRelated.models, { href: '/research/macro/cross-asset', label: 'Cross-asset research' }], { authorName: 'CrossResearch Quantitative Research', datePublished: '2026-09-01' }),
]

export const INDICATOR_TOPICS: SeoTopic[] = [
  topic('best-tradingview-indicators', 'Best TradingView indicators: how to choose', 'Editorial criteria for selecting TradingView indicators - categories, limitations, timeframe fit, and repainting risks.', [
    { heading: 'Selection criteria', paragraphs: [
      'Prefer indicators with clear logic, known lag/repaint behavior, and a defined role (structure, momentum, volatility, or flow).',
      'CrossResearch indicators can appear in comparisons transparently; category pages explain use cases without sales-only framing.',
    ]},
  ], [
    { href: '/indicators/market-structure-indicators', label: 'Structure' },
    { href: '/indicators/momentum-indicators', label: 'Momentum' },
    { href: '/indicators/order-flow-indicators', label: 'Order flow' },
    baseRelated.indicators,
  ]),
  topic('market-structure-indicators', 'Market structure indicators', 'Tools for swings, levels, and structure context on TradingView.', [
    { heading: 'When they help', paragraphs: ['Structure tools help map bias and invalidation. They fail when forced into every timeframe without a higher-timeframe thesis.'] },
  ], [{ href: '/indicators/structural-pivot-support-resistance', label: 'Structural pivot S/R' }, baseRelated.indicators]),
  topic('order-flow-indicators', 'Order-flow indicators', 'Participation and imbalance-style tools for TradingView workflows.', [
    { heading: 'Caveats', paragraphs: ['Retail order-flow proxies are imperfect. Treat them as context, not certainty.'] },
  ], [{ href: '/indicators/liquidity-delta-matrix', label: 'Liquidity Delta Matrix' }, baseRelated.indicators]),
  topic('momentum-indicators', 'Momentum indicators', 'Momentum and trend tools - strengths, lag, and failure modes.', [
    { heading: 'Use carefully', paragraphs: ['Momentum confirms continuation better than it predicts reversals. Pair with structure and risk rules.'] },
  ], [{ href: '/indicators/multi-timeframe-momentum', label: 'MTF momentum' }, baseRelated.indicators]),
  topic('volume-indicators', 'Volume indicators', 'Volume and participation context for confirmation.', [
    { heading: 'Role', paragraphs: ['Volume tools help validate breakouts and exhaustion - they do not replace a catalyst map.'] },
  ], [baseRelated.indicators]),
  topic('liquidity-delta-matrix', 'Liquidity Delta Matrix', 'CrossResearch TradingView tool documentation for liquidity/delta context.', [
    { heading: 'Overview', paragraphs: ['Documentation page for intended use, timeframe guidance, and limitations. Pair with education and macro context.'] },
  ], [baseRelated.indicators, { href: 'https://www.tradingview.com/u/crossresearch/', label: 'TradingView profile' }]),
  topic('structural-pivot-support-resistance', 'Structural pivot support & resistance', 'CrossResearch structure/level indicator documentation.', [
    { heading: 'Overview', paragraphs: ['Use for level mapping and invalidation framing. Avoid treating every pivot as an automatic entry.'] },
  ], [baseRelated.indicators]),
  topic('liquidation-heatmap', 'Liquidation heatmap', 'Documentation for liquidation-heatmap style visualization on TradingView.', [
    { heading: 'Overview', paragraphs: ['Heatmap views highlight crowded leverage zones. They are probabilistic context, not guaranteed magnets.'] },
  ], [baseRelated.indicators]),
  topic('multi-timeframe-momentum', 'Multi-timeframe momentum', 'CrossResearch MTF momentum indicator documentation.', [
    { heading: 'Overview', paragraphs: ['Align lower-timeframe execution with higher-timeframe momentum when the macro regime supports the bias.'] },
  ], [baseRelated.indicators]),
  topic('kalman-regime-momentum', 'Kalman regime momentum', 'Documentation for regime-aware momentum tooling.', [
    { heading: 'Overview', paragraphs: ['Regime-aware momentum adapts behavior by state. Always review limitations and failure modes on the methodology page.'] },
  ], [baseRelated.indicators, baseRelated.methodology]),
]

export const AI_TOPICS: SeoTopic[] = [
  topic('machine-learning', 'Machine learning pipelines for finance', 'Data, labels, validation, and leakage pitfalls in financial ML.', [
    { heading: 'Research standard', paragraphs: ['Financial ML fails when leakage, non-stationarity, or naive backtests are ignored. CrossResearch AI content stays methods-first.'] },
  ], [baseRelated.ai, { href: '/ai-finance/backtesting', label: 'Backtesting' }]),
  topic('financial-nlp', 'Financial NLP', 'News and transcript text signals with careful evaluation.', [
    { heading: 'Use case', paragraphs: ['NLP can augment research workflows when evaluated out of sample and paired with market context.'] },
  ], [baseRelated.ai]),
  topic('feature-engineering', 'Feature engineering for markets', 'Macro, market, and alternative features that aim to generalize.', [
    { heading: 'Discipline', paragraphs: ['Features should be motivated, documented, and stress-tested across regimes.'] },
  ], [baseRelated.ai, baseRelated.models]),
  topic('forecasting', 'Forecasting with ML', 'How model outputs become research context rather than magical predictions.', [
    { heading: 'Framing', paragraphs: ['Forecasts are distributional and uncertain. Publish assumptions and error.'] },
  ], [baseRelated.ai, baseRelated.methodology]),
  topic('backtesting', 'Backtesting discipline', 'Walk-forward design, costs, and overfitting controls.', [
    { heading: 'Non-negotiables', paragraphs: ['Include costs, avoid look-ahead, and separate research from production rules.'] },
  ], [baseRelated.ai, { href: '/ai-finance/walk-forward-testing', label: 'Walk-forward testing' }]),
  topic('walk-forward-testing', 'Walk-forward testing', 'Rolling validation to reduce overfitting in trading research.', [
    { heading: 'Why it matters', paragraphs: ['Walk-forward testing stresses whether a process survives regime change better than a single in-sample fit.'] },
  ], [baseRelated.ai, { href: '/ai-finance/backtesting', label: 'Backtesting' }]),
]

export const REPORT_TOPICS: { category: string; slug: string; topic: SeoTopic }[] = [
  {
    category: 'weekly-outlook',
    slug: '2026-09-20',
    topic: topic(
      '2026-09-20',
      'Weekly market outlook - 20 Sep 2026',
      'Cross-asset weekly framing of regime, catalysts, and levels for the week ahead.',
      [
        { heading: 'Regime snapshot', paragraphs: ['Late-cycle growth with cooling inflation remains the baseline research frame - monitor labor and policy path risks.'] },
        { heading: 'So what for markets', paragraphs: ['USD and real yields remain the hinge for gold and risk assets; event calendar risk is concentrated in inflation and policy communication.'] },
      ],
      [baseRelated.reports, baseRelated.macro, { href: '/models/macro-regime-model', label: 'Regime model' }],
      {
        authorName: 'CrossResearch Macro Desk',
        datePublished: '2026-09-20',
        dateModified: '2026-09-20',
        dataThrough: '2026-09-19 16:00 UTC',
        sources: 'Federal Reserve, BLS, CME',
      }
    ),
  },
  {
    category: 'gold',
    slug: 'gold-outlook-2026-09-20',
    topic: topic(
      'gold-outlook-2026-09-20',
      'Gold outlook - 20 Sep 2026',
      'Gold view through real yields, USD, positioning, and inflation path.',
      [
        { heading: 'Thesis', paragraphs: ['Gold remains sensitive to real yields and USD. Softening real rates with contained USD typically supports gold - the reverse pressures it.'] },
        { heading: 'Watchbacks', paragraphs: ['Inflation surprises, Fed communication, and positioning extremes can invalidate a simple real-yield map.'] },
      ],
      [
        { href: '/research/macro/interest-rates', label: 'Real yields' },
        { href: '/models/inflation-nowcast', label: 'Inflation nowcast' },
        { href: '/tools/gold-valuation-model', label: 'Gold valuation model' },
        baseRelated.reports,
      ],
      {
        authorName: 'CrossResearch Macro Desk',
        datePublished: '2026-09-20',
        dataThrough: '2026-09-19 16:00 UTC',
        sources: 'Federal Reserve, CME, CFTC',
      }
    ),
  },
  {
    category: 'forex',
    slug: 'eurusd-outlook-2026-09-20',
    topic: topic(
      'eurusd-outlook-2026-09-20',
      'EURUSD outlook - 20 Sep 2026',
      'EURUSD framed by rate differentials, relative growth, and risk sentiment.',
      [
        { heading: 'Drivers', paragraphs: ['Rate differentials and relative data surprises remain primary. Risk-off USD bids can dominate short windows.'] },
      ],
      [
        { href: '/models/fed-expectations', label: 'Fed expectations' },
        { href: '/models/ecb-expectations', label: 'ECB expectations' },
        baseRelated.reports,
      ],
      { authorName: 'CrossResearch Macro Desk', datePublished: '2026-09-20', sources: 'ECB, Federal Reserve, CME' }
    ),
  },
  {
    category: 'events',
    slug: 'fomc-september-2026',
    topic: topic(
      'fomc-september-2026',
      'FOMC preview - September 2026',
      'Policy path scenarios and market implications into the September FOMC.',
      [
        { heading: 'Scenarios', paragraphs: ['Baseline, hawkish surprise, and dovish surprise paths should be mapped to USD, yields, and equities before the event.'] },
      ],
      [{ href: '/models/fed-expectations', label: 'Fed expectations' }, baseRelated.reports],
      { authorName: 'CrossResearch Macro Desk', datePublished: '2026-09-16', sources: 'Federal Reserve, CME' }
    ),
  },
  {
    category: 'events',
    slug: 'us-cpi-september-2026',
    topic: topic(
      'us-cpi-september-2026',
      'US CPI preview - September 2026',
      'Inflation print scenarios and transmission into yields, USD, and gold.',
      [
        { heading: 'What matters', paragraphs: ['Core services, shelter, and goods disinflation paths drive the surprise distribution more than the headline alone.'] },
      ],
      [
        { href: '/research/macro/inflation', label: 'Inflation hub' },
        { href: '/models/inflation-nowcast', label: 'Inflation nowcast' },
        baseRelated.reports,
      ],
      { authorName: 'CrossResearch Macro Desk', datePublished: '2026-09-15', sources: 'BLS, Federal Reserve' }
    ),
  },
  {
    category: 'events',
    slug: 'nfp-september-2026',
    topic: topic(
      'nfp-september-2026',
      'NFP preview - September 2026',
      'Labor-market scenarios and policy/market implications.',
      [
        { heading: 'Focus', paragraphs: ['Payrolls, unemployment, and wages together - not payrolls alone - set the Fed and USD reaction function.'] },
      ],
      [{ href: '/research/macro/labor-market', label: 'Labor market' }, baseRelated.reports],
      { authorName: 'CrossResearch Macro Desk', datePublished: '2026-09-14', sources: 'BLS' }
    ),
  },
]

export const TOOL_TOPICS: SeoTopic[] = [
  topic('cpi-tracker', 'CrossResearch CPI Tracker', 'Public inflation decomposition concept page - live tracker expands with published methodology.', [
    { heading: 'Purpose', paragraphs: ['A linkable inflation tracker asset for traders and analysts. Methodology and limitations stay visible.'] },
  ], [{ href: '/research/macro/inflation', label: 'Inflation research' }, baseRelated.methodology]),
  topic('nfp-dashboard', 'CrossResearch NFP Dashboard', 'Employment trends concept page for public research visibility.', [
    { heading: 'Purpose', paragraphs: ['Summarizes labor-market trends, revisions, and wages for research audiences.'] },
  ], [{ href: '/research/macro/labor-market', label: 'Labor market' }, baseRelated.methodology]),
  topic('macro-regime-index', 'Macro Regime Index', 'Growth/inflation regime classification overview for public reference.', [
    { heading: 'Purpose', paragraphs: ['Publishes the regime framework used across CrossResearch research notes.'] },
  ], [{ href: '/models/macro-regime-model', label: 'Regime model' }, baseRelated.methodology]),
  topic('global-liquidity-index', 'Global Liquidity Index', 'Cross-market liquidity conditions overview.', [
    { heading: 'Purpose', paragraphs: ['Tracks liquidity context that interacts with risk appetite and FX.'] },
  ], [{ href: '/research/macro/liquidity', label: 'Liquidity research' }, baseRelated.methodology]),
  topic('cftc-positioning-dashboard', 'CFTC Positioning Dashboard', 'Futures positioning visualization overview for research and education.', [
    { heading: 'Purpose', paragraphs: ['Makes positioning context easier to cite and compare across markets.'] },
  ], [baseRelated.reports, baseRelated.methodology]),
  topic('gold-valuation-model', 'Gold Valuation Model', 'Gold relative to yields, USD, inflation, and regimes.', [
    { heading: 'Purpose', paragraphs: ['A transparent valuation lens for gold research - not a price guarantee.'] },
  ], [{ href: '/reports/gold/gold-outlook-2026-09-20', label: 'Gold outlook' }, baseRelated.methodology]),
]

export function findTopic(list: SeoTopic[], slug: string) {
  return list.find((t) => t.slug === slug)
}

export function findReport(category: string, slug: string) {
  return REPORT_TOPICS.find((r) => r.category === category && r.slug === slug)
}
