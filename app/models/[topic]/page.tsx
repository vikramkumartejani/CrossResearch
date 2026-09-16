import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { MODEL_TOPICS, findTopic } from '@/lib/seo-topics'

export function generateStaticParams() {
  return MODEL_TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(MODEL_TOPICS, slug)
  if (!t) return {}
  return pageMetadata({ title: t.title, description: t.description, path: `/models/${t.slug}` })
}

export default async function ModelTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(MODEL_TOPICS, slug)
  if (!t) notFound()
  return (
    <SeoTopicPage
      path={`/models/${t.slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Models', href: '/models' },
        { name: t.title, href: `/models/${t.slug}` },
      ]}
      sections={t.sections}
      related={t.related}
      articleMeta={t.articleMeta}
    />
  )
}
