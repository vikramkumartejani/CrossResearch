import { pageMetadata } from '@/lib/seo'

type Cluster = { href: string; label: string; blurb: string }

export type HubConfig = {
  path: string
  title: string
  description: string
  keywords: string[]
  breadcrumbs: { name: string; href: string }[]
  clusters: Cluster[]
  intro?: string[]
}

export function hubMetadata(hub: HubConfig) {
  return pageMetadata({
    title: hub.title,
    description: hub.description,
    path: hub.path,
    keywords: hub.keywords,
  })
}

export const EDUCATION_HUB: HubConfig = {
  path: '/education',
  title: 'Trading & Forex Education',
  description:
    'Structured trading and forex education covering market structure, risk management, technical and fundamental analysis, order flow, and trading strategies.',
  keywords: [
    'forex trading education',
    'learn forex',
    'trading education',
    'risk management',
    'market structure',
    'order flow',
  ],
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Education', href: '/education' },
  ],
  intro: [
    'CrossResearch education is built to connect concepts to live research - not generic definitions copied from every trading blog.',
    'Start with foundations, then move into structure, risk, and strategies that map to the same frameworks used across our research desk.',
  ],
  clusters: [
    {
      href: '/education/forex',
      label: 'Forex foundations',
      blurb: 'How FX markets work, sessions, pairs, and the building blocks of currency trading.',
    },
    {
      href: '/education/technical-analysis',
      label: 'Technical analysis',
      blurb: 'Price action, structure, indicators, and how technical tools fit a research workflow.',
    },
    {
      href: '/education/fundamental-analysis',
      label: 'Fundamental analysis',
      blurb: 'How growth, inflation, rates, and policy feed into trade ideas.',
    },
    {
      href: '/education/market-structure',
      label: 'Market structure & order flow',
      blurb: 'Liquidity, positioning, and microstructure concepts traders actually use.',
    },
    {
      href: '/education/risk-management',
      label: 'Risk management',
      blurb: 'Position sizing, drawdown control, and process discipline.',
    },
    {
      href: '/education/trading-strategies',
      label: 'Trading strategies',
      blurb: 'Frameworks that combine macro context with execution rules.',
    },
  ],
}

export const MACRO_HUB: HubConfig = {
  path: '/research/macro',
  title: 'Macro & Fundamental Research',
  description:
    'Macro and fundamental market research on inflation, labor, growth, liquidity, central banks, interest rates, and cross-asset transmission.',
  keywords: [
    'macro analysis',
    'fundamental analysis',
    'Fed analysis',
    'inflation',
    'interest rates',
    'cross asset',
  ],
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Research', href: '/research/macro' },
    { name: 'Macro', href: '/research/macro' },
  ],
  intro: [
    'This hub is the home for CrossResearch macroeconomic and fundamental analysis - how the cycle transmits into FX, rates, equities, and commodities.',
    'Use it to navigate inflation, labor, growth, liquidity, and policy research that feeds our models and market reports.',
  ],
  clusters: [
    {
      href: '/research/macro/inflation',
      label: 'Inflation',
      blurb: 'CPI, PCE, shelter, goods vs services, and market pricing of inflation risk.',
    },
    {
      href: '/research/macro/labor-market',
      label: 'Labor market',
      blurb: 'Employment, wages, participation, and what labor data means for policy.',
    },
    {
      href: '/research/macro/growth',
      label: 'Growth & activity',
      blurb: 'GDP nowcasts, PMI, demand, and late-cycle signals.',
    },
    {
      href: '/research/macro/liquidity',
      label: 'Liquidity & rates',
      blurb: 'Real yields, balance sheets, funding conditions, and cross-asset beta.',
    },
    {
      href: '/research/macro/central-banks',
      label: 'Central banks',
      blurb: 'Fed, ECB, BoE, and policy path interpretation.',
    },
    {
      href: '/models/macro-regime-model',
      label: 'Macro models',
      blurb: 'Nowcasts and regime models that quantify the narrative.',
    },
  ],
}

export const REPORTS_HUB: HubConfig = {
  path: '/reports',
  title: 'Market Reports',
  description:
    'Date-stamped market reports including weekly outlooks, gold and FX views, equities notes, macro event previews, and post-event analysis.',
  keywords: [
    'weekly market outlook',
    'gold outlook',
    'EURUSD outlook',
    'CPI preview',
    'NFP analysis',
  ],
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Reports', href: '/reports' },
  ],
  intro: [
    'Market reports show an active research desk: recurring outlooks, asset notes, and event analysis with a clear “so what for markets?” conclusion.',
    'Archives stay crawlable with stable URLs so Google can see freshness without thin duplicate pages.',
  ],
  clusters: [
    {
      href: '/reports/weekly-outlook/2026-09-20',
      label: 'Weekly market outlook',
      blurb: 'Cross-asset weekly framing of regime, catalysts, and key levels.',
    },
    {
      href: '/reports/gold/gold-outlook-2026-09-20',
      label: 'Gold & commodities',
      blurb: 'Gold outlooks tied to real rates, USD, and positioning.',
    },
    {
      href: '/reports/forex/eurusd-outlook-2026-09-20',
      label: 'Forex reports',
      blurb: 'EURUSD and major FX views driven by rates differentials and risk.',
    },
    {
      href: '/reports/events/fomc-september-2026',
      label: 'Macro event previews',
      blurb: 'CPI, NFP, FOMC, and other high-impact event briefings.',
    },
    {
      href: '/reports/events/us-cpi-september-2026',
      label: 'CPI analysis',
      blurb: 'Inflation event preview with market transmission.',
    },
    {
      href: '/research/macro',
      label: 'Macro research hub',
      blurb: 'Deeper fundamental context behind each report.',
    },
  ],
}

export const INDICATORS_HUB: HubConfig = {
  path: '/indicators/tradingview',
  title: 'TradingView Indicators',
  description:
    'TradingView indicator education, comparison guidance, and CrossResearch tools for market structure, momentum, order flow, liquidity, and volatility.',
  keywords: [
    'best TradingView indicators',
    'TradingView indicators',
    'market structure indicator',
    'momentum indicator',
  ],
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Indicators', href: '/indicators/tradingview' },
    { name: 'TradingView', href: '/indicators/tradingview' },
  ],
  intro: [
    'This hub covers TradingView indicators as both education and product: categories, selection criteria, limitations, timeframe fit, and when tools help versus when they mislead.',
    'Editorial comparison content lives here so commercial queries are not answered by a sales page alone.',
  ],
  clusters: [
    {
      href: '/indicators/best-tradingview-indicators',
      label: 'How to choose indicators',
      blurb: 'Repainting, lag, timeframe suitability, and confirmation rules.',
    },
    {
      href: '/indicators/market-structure-indicators',
      label: 'Market structure tools',
      blurb: 'Swing structure, levels, and regime-aware technical context.',
    },
    {
      href: '/indicators/momentum-indicators',
      label: 'Momentum & volatility',
      blurb: 'When momentum indicators help and when they fail.',
    },
    {
      href: '/indicators/order-flow-indicators',
      label: 'Order-flow tools',
      blurb: 'Participation and imbalance-style TradingView workflows.',
    },
    {
      href: 'https://www.tradingview.com/u/crossresearch/',
      label: 'CrossResearch on TradingView',
      blurb: 'Published scripts and indicator profiles on TradingView.',
    },
    {
      href: '/education/technical-analysis',
      label: 'Technical education',
      blurb: 'Lessons that explain the concepts behind the tools.',
    },
  ],
}

export const MODELS_HUB: HubConfig = {
  path: '/models',
  title: 'Macro Models & Forecasting',
  description:
    'Quantitative macro forecasting models including inflation and growth nowcasts, market regime models, central-bank expectations, and cross-asset forecasts.',
  keywords: [
    'macro forecasting model',
    'inflation forecast model',
    'market regime model',
    'economic nowcasting',
  ],
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Models', href: '/models' },
  ],
  intro: [
    'CrossResearch models turn macro narratives into measurable regimes, nowcasts, and expectations paths - with methodology and limitations stated clearly.',
    'This hub links forecasting models to the research and product surfaces that use them.',
  ],
  clusters: [
    {
      href: '/models/macro-regime-model',
      label: 'Macro regime model',
      blurb: 'Growth and inflation regime classification for cross-asset context.',
    },
    {
      href: '/models/inflation-nowcast',
      label: 'Inflation nowcast',
      blurb: 'Near-term inflation tracking and surprise risk.',
    },
    {
      href: '/models/growth-nowcast',
      label: 'Growth nowcast',
      blurb: 'Activity tracking that feeds risk appetite and policy odds.',
    },
    {
      href: '/models/fed-expectations',
      label: 'Central-bank expectations',
      blurb: 'Policy path interpretation tied to data and pricing.',
    },
    {
      href: '/methodology',
      label: 'Methodology',
      blurb: 'Inputs, assumptions, update cadence, and known limitations.',
    },
    {
      href: '/research/macro',
      label: 'Macro research',
      blurb: 'Narrative research that sits on top of the model stack.',
    },
  ],
}

export const AI_HUB: HubConfig = {
  path: '/ai-finance',
  title: 'Machine Learning & AI for Finance',
  description:
    'Machine learning and AI for finance: ML pipelines, feature engineering, financial NLP, forecasting, backtesting, and AI-assisted market research.',
  keywords: [
    'machine learning for finance',
    'AI for trading',
    'financial machine learning',
    'NLP finance',
    'quant research',
  ],
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'AI for finance', href: '/ai-finance' },
  ],
  intro: [
    'This pillar covers practical ML/AI for markets - from feature design and NLP to evaluation, backtesting discipline, and AI-assisted research workflows.',
    'Content stays research-grade: methods, failure modes, and how AI fits CrossResearch tooling rather than hype.',
  ],
  clusters: [
    {
      href: '/ai-finance/machine-learning',
      label: 'Machine learning pipelines',
      blurb: 'Data, labels, validation, and leakage pitfalls in financial ML.',
    },
    {
      href: '/ai-finance/financial-nlp',
      label: 'Financial NLP',
      blurb: 'News, transcripts, and text signals with careful evaluation.',
    },
    {
      href: '/ai-finance/feature-engineering',
      label: 'Feature engineering',
      blurb: 'Macro, market, and alternative features that actually generalize.',
    },
    {
      href: '/ai-finance/forecasting',
      label: 'Forecasting & signals',
      blurb: 'How model outputs become research and trading context.',
    },
    {
      href: '/ai-finance/backtesting',
      label: 'Backtesting discipline',
      blurb: 'Walk-forward design, costs, and overfitting controls.',
    },
    {
      href: '/methodology',
      label: 'Research methodology',
      blurb: 'How CrossResearch reviews and publishes quantitative work.',
    },
  ],
}

export const ALL_HUBS = [
  EDUCATION_HUB,
  MACRO_HUB,
  REPORTS_HUB,
  INDICATORS_HUB,
  MODELS_HUB,
  AI_HUB,
] as const
