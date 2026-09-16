import { absoluteUrl, siteUrl } from '@/lib/site'
import type { BreadcrumbItem } from '@/lib/seo'
import { SEO_PILLARS, SEO_SITE_NAME } from '@/lib/seo'

function JsonLdScript({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_SITE_NAME,
    url: siteUrl(),
    logo: absoluteUrl('/assets/logo.svg'),
    description:
      'Financial markets research platform for trading education, macro research, market reports, quantitative forecasts, AI/ML finance research, and TradingView indicators.',
    sameAs: ['https://twitter.com/crossresearch'],
    knowsAbout: SEO_PILLARS.map((p) => p.title),
  }
  return <JsonLdScript data={data} />
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_SITE_NAME,
    url: siteUrl(),
    publisher: {
      '@type': 'Organization',
      name: SEO_SITE_NAME,
      url: siteUrl(),
    },
    hasPart: SEO_PILLARS.map((p) => ({
      '@type': 'WebPage',
      name: p.title,
      url: absoluteUrl(p.href),
      description: p.description,
    })),
  }
  return <JsonLdScript data={data} />
}

/** Visually hidden internal links so crawlers can reach pillar hubs without changing UI. */
export function SeoCrawlLinks() {
  return (
    <nav aria-label="Research topics" className="sr-only">
      <ul>
        {SEO_PILLARS.map((p) => (
          <li key={p.id}>
            <a href={p.href}>{p.title}</a>
          </li>
        ))}
        <li>
          <a href="/methodology">Research methodology</a>
        </li>
        <li>
          <a href="/authors">Authors and research team</a>
        </li>
      </ul>
    </nav>
  )
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
  return <JsonLdScript data={data} />
}

export function WebPageJsonLd(opts: {
  name: string
  description: string
  path: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: {
      '@type': 'WebSite',
      name: SEO_SITE_NAME,
      url: siteUrl(),
    },
  }
  return <JsonLdScript data={data} />
}
