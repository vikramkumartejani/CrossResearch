import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { MACRO_TOPICS, findTopic } from '@/lib/seo-topics'

export function generateStaticParams() {
  return MACRO_TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(MACRO_TOPICS, slug)
  if (!t) return {}
  return pageMetadata({ title: t.title, description: t.description, path: `/research/macro/${t.slug}` })
}

export default async function MacroTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(MACRO_TOPICS, slug)
  if (!t) notFound()
  return (
    <SeoTopicPage
      path={`/research/macro/${t.slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Macro', href: '/research/macro' },
        { name: t.title, href: `/research/macro/${t.slug}` },
      ]}
      sections={t.sections}
      related={t.related}
    />
  )
}
