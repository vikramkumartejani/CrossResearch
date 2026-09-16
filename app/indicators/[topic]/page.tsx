import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { INDICATOR_TOPICS, findTopic } from '@/lib/seo-topics'

export function generateStaticParams() {
  return INDICATOR_TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(INDICATOR_TOPICS, slug)
  if (!t) return {}
  return pageMetadata({ title: t.title, description: t.description, path: `/indicators/${t.slug}` })
}

export default async function IndicatorTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(INDICATOR_TOPICS, slug)
  if (!t) notFound()
  // Keep /indicators/tradingview as the dedicated hub route (sibling folder).
  if (slug === 'tradingview') notFound()
  return (
    <SeoTopicPage
      path={`/indicators/${t.slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Indicators', href: '/indicators/tradingview' },
        { name: t.title, href: `/indicators/${t.slug}` },
      ]}
      sections={t.sections}
      related={t.related}
    />
  )
}
