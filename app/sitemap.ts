import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { SEO_PILLARS } from '@/lib/seo'
import { POSTS } from '@/app/components/Blog/blogData'
import {
  EDUCATION_TOPICS,
  MACRO_TOPICS,
  MODEL_TOPICS,
  INDICATOR_TOPICS,
  AI_TOPICS,
  REPORT_TOPICS,
  TOOL_TOPICS,
} from '@/lib/seo-topics'

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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry('/', { changeFrequency: 'weekly', priority: 1 }),
    entry('/about', { changeFrequency: 'monthly', priority: 0.7 }),
    entry('/algo', { changeFrequency: 'weekly', priority: 0.7 }),
    entry('/investing', { changeFrequency: 'weekly', priority: 0.6 }),
    entry('/affiliate', { changeFrequency: 'monthly', priority: 0.5 }),
    entry('/brokers', { changeFrequency: 'monthly', priority: 0.5 }),
    entry('/prop-firm', { changeFrequency: 'monthly', priority: 0.5 }),
    entry('/blog', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/policies', { changeFrequency: 'yearly', priority: 0.3 }),
    entry('/policies/terms', { changeFrequency: 'yearly', priority: 0.3 }),
    entry('/policies/privacy', { changeFrequency: 'yearly', priority: 0.3 }),
    entry('/methodology', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/authors', { changeFrequency: 'monthly', priority: 0.8 }),
    ...SEO_PILLARS.map((p) => entry(p.href, { priority: 0.9, changeFrequency: 'weekly' })),
    ...EDUCATION_TOPICS.map((t) => entry(`/education/${t.slug}`, { priority: 0.8 })),
    ...MACRO_TOPICS.map((t) => entry(`/research/macro/${t.slug}`, { priority: 0.8 })),
    ...MODEL_TOPICS.map((t) => entry(`/models/${t.slug}`, { priority: 0.8 })),
    ...INDICATOR_TOPICS.map((t) => entry(`/indicators/${t.slug}`, { priority: 0.8 })),
    ...AI_TOPICS.map((t) => entry(`/ai-finance/${t.slug}`, { priority: 0.75 })),
    ...REPORT_TOPICS.map((r) =>
      entry(`/reports/${r.category}/${r.slug}`, { priority: 0.85, changeFrequency: 'weekly' })
    ),
    ...TOOL_TOPICS.map((t) => entry(`/tools/${t.slug}`, { priority: 0.7 })),
    ...POSTS.map((p) => entry(`/blog/${p.slug}`, { priority: 0.7, changeFrequency: 'monthly' })),
  ]
}
