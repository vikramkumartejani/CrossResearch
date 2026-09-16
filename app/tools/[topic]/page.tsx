import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { TOOL_TOPICS, findTopic } from '@/lib/seo-topics'

export function generateStaticParams() {
  return TOOL_TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(TOOL_TOPICS, slug)
  if (!t) return {}
  return pageMetadata({ title: t.title, description: t.description, path: `/tools/${t.slug}` })
}

export default async function ToolTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(TOOL_TOPICS, slug)
  if (!t) notFound()
  return (
    <SeoTopicPage
      path={`/tools/${t.slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools/cpi-tracker' },
        { name: t.title, href: `/tools/${t.slug}` },
      ]}
      sections={t.sections}
      related={t.related}
    />
  )
}
