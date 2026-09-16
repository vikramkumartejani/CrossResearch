import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { SEO_PILLARS } from '@/lib/seo'

const BASE = siteUrl()

export const dynamic = 'force-static'

function entry(
  path: string,
  opts?: Partial<MetadataRoute.Sitemap[number]>
): MetadataRoute.Sitemap[number] {
  return {
    url: path === '/' ? `${BASE}/` : `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: opts?.changeFrequency || 'weekly',
    priority: opts?.priority ?? 0.7,
  }
}

/**
 * Public canonical URLs only.
 * Segment groups mirror the SEO blueprint (education, research, reports, indicators, models, AI, authors, core)
 * and stay in one sitemap.xml so Next.js 16 serves a working root index (generateSitemaps leaves /sitemap.xml 404).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // core
    entry('/', { changeFrequency: 'weekly', priority: 1 }),
    entry('/about', { changeFrequency: 'monthly', priority: 0.7 }),
    entry('/algo', { changeFrequency: 'weekly', priority: 0.7 }),
    entry('/investing', { changeFrequency: 'weekly', priority: 0.6 }),
    entry('/affiliate', { changeFrequency: 'monthly', priority: 0.5 }),
    entry('/brokers', { changeFrequency: 'monthly', priority: 0.5 }),
    entry('/prop-firm', { changeFrequency: 'monthly', priority: 0.5 }),
    entry('/blog', { changeFrequency: 'weekly', priority: 0.6 }),
    entry('/policies', { changeFrequency: 'yearly', priority: 0.3 }),
    entry('/policies/terms', { changeFrequency: 'yearly', priority: 0.3 }),
    entry('/policies/privacy', { changeFrequency: 'yearly', priority: 0.3 }),

    // six pillars
    ...SEO_PILLARS.map((p) => entry(p.href, { priority: 0.9, changeFrequency: 'weekly' })),

    // trust
    entry('/methodology', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/authors', { changeFrequency: 'monthly', priority: 0.8 }),
  ]
}
