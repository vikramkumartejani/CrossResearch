import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

const BASE_URL = siteUrl()

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        // Public pages
        { url: `${BASE_URL}/`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
        { url: `${BASE_URL}/about`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/affiliate`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/algo`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/blog`,       lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
        { url: `${BASE_URL}/brokers`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/investing`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
        { url: `${BASE_URL}/prop-firm`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/policies`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/policies/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/policies/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },

        // Auth pages
        { url: `${BASE_URL}/login`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
        { url: `${BASE_URL}/signup`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },

        // Dashboard pages (authenticated - lower priority for SEO)
        { url: `${BASE_URL}/analysis`,            lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/crypto-btc`,          lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/equity-analyst`,      lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/education-center`,    lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
        { url: `${BASE_URL}/geopolitical`,        lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/ai-research`,         lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/macro-nowcast`,       lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/macro-signals`,       lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/market-report`,       lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/news`,                lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/options-positioning`, lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/relief-signals`,      lastModified: new Date(), changeFrequency: 'daily',  priority: 0.5 },
        { url: `${BASE_URL}/seasonality-flow`,    lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
        { url: `${BASE_URL}/trading-strategies`,  lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    ]
}
