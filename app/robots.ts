import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { SEO_NOINDEX_PREFIXES } from '@/lib/seo'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...SEO_NOINDEX_PREFIXES],
      },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
