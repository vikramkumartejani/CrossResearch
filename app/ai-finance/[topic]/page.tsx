import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { AI_TOPICS, findTopic } from '@/lib/seo-topics'

export function generateStaticParams() {
  return AI_TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(AI_TOPICS, slug)
  if (!t) return {}
  return pageMetadata({ title: t.title, description: t.description, path: `/ai-finance/${t.slug}` })
}

export default async function AiTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(AI_TOPICS, slug)
  if (!t) notFound()
  return (
    <SeoTopicPage
      path={`/ai-finance/${t.slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'AI for finance', href: '/ai-finance' },
        { name: t.title, href: `/ai-finance/${t.slug}` },
      ]}
      sections={t.sections}
      related={t.related}
    />
  )
}
