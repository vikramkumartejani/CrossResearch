import { absoluteUrl } from '@/lib/site'
import { SEO_SITE_NAME } from '@/lib/seo'

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd(opts: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  authorName: string
  image?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: {
      '@type': 'Person',
      name: opts.authorName,
      worksFor: { '@type': 'Organization', name: SEO_SITE_NAME },
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_SITE_NAME,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/logo.svg') },
    },
    image: opts.image ? [absoluteUrl(opts.image)] : [absoluteUrl('/og-image.png')],
    mainEntityOfPage: absoluteUrl(opts.path),
  }
  return <JsonLdScript data={data} />
}
