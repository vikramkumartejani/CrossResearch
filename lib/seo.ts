import type { Metadata } from 'next'
import { absoluteUrl, siteUrl } from '@/lib/site'

export const SEO_SITE_NAME = 'CrossResearch'
export const SEO_DEFAULT_OG = absoluteUrl('/og-image.png')

export type BreadcrumbItem = {
  name: string
  href: string
}

/** Shared metadata builder for indexable public pages. */
export function pageMetadata(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
  index?: boolean
  type?: 'website' | 'article'
  absoluteTitle?: boolean
}): Metadata {
  const url = absoluteUrl(opts.path)
  const index = opts.index !== false
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    keywords: opts.keywords,
    authors: [{ name: SEO_SITE_NAME, url: siteUrl() }],
    creator: SEO_SITE_NAME,
    publisher: SEO_SITE_NAME,
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SEO_SITE_NAME,
      type: opts.type || 'website',
      locale: 'en_US',
      images: [{ url: SEO_DEFAULT_OG, width: 1200, height: 630, alt: SEO_SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      site: '@crossresearch',
      images: [SEO_DEFAULT_OG],
    },
  }
}

export const SEO_PILLARS = [
  {
    id: 'education',
    href: '/education',
    title: 'Trading & Forex Education',
    short: 'Education',
    description:
      'From beginner forex concepts to advanced market structure, risk management, and execution frameworks.',
    keywords: ['forex trading education', 'learn forex', 'trading education', 'market structure'],
  },
  {
    id: 'macro',
    href: '/research/macro',
    title: 'Macro & Fundamental Research',
    short: 'Macro research',
    description:
      'Central banks, inflation, labor, growth, liquidity, and rates - and how they transmit into markets.',
    keywords: ['macro analysis', 'fundamental analysis', 'Fed analysis', 'inflation'],
  },
  {
    id: 'reports',
    href: '/reports',
    title: 'Market Reports',
    short: 'Reports',
    description:
      'Date-stamped outlooks, asset reports, event previews, and post-event analysis that show an active research desk.',
    keywords: ['weekly market outlook', 'gold outlook', 'EURUSD outlook', 'CPI analysis'],
  },
  {
    id: 'indicators',
    href: '/indicators/tradingview',
    title: 'TradingView Indicators',
    short: 'Indicators',
    description:
      'Indicator education, comparison guidance, and CrossResearch tools built for TradingView workflows.',
    keywords: ['best TradingView indicators', 'TradingView indicators', 'market structure indicator'],
  },
  {
    id: 'models',
    href: '/models',
    title: 'Macro Models & Forecasting',
    short: 'Models',
    description:
      'Nowcasting, regimes, inflation and growth models, central-bank expectations, and cross-asset forecasts.',
    keywords: ['macro forecasting model', 'inflation forecast model', 'economic nowcasting'],
  },
  {
    id: 'ai',
    href: '/ai-finance',
    title: 'Machine Learning & AI for Finance',
    short: 'AI / ML finance',
    description:
      'ML pipelines, feature engineering, financial NLP, signals, backtesting, and AI-assisted research.',
    keywords: ['machine learning for finance', 'AI for trading', 'financial machine learning'],
  },
] as const

/** Private / utility paths that must not be indexed or listed in sitemaps. */
export const SEO_NOINDEX_PREFIXES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/onboarding',
  '/settings',
  '/checkout',
  '/support',
  '/affiliate/login',
  '/affiliate/signup',
  '/affiliate/forgot-password',
  '/affiliate-center',
  '/contact-support',
  '/analysis',
  '/crypto-btc',
  '/equity-analyst',
  '/education-center',
  '/geopolitical',
  '/ai-research',
  '/macro-nowcast',
  '/macro-signals',
  '/market-report',
  '/news',
  '/options-positioning',
  '/relief-signals',
  '/seasonality-flow',
  '/trading-strategies',
  '/help-center',
  '/tutorial',
] as const
