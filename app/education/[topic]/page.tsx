import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { EDUCATION_TOPICS, findTopic } from '@/lib/seo-topics'

export function generateStaticParams() {
  return EDUCATION_TOPICS.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(EDUCATION_TOPICS, slug)
  if (!t) return {}
  return pageMetadata({ title: t.title, description: t.description, path: `/education/${t.slug}` })
}

export default async function EducationTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const t = findTopic(EDUCATION_TOPICS, slug)
  if (!t) notFound()
  return (
    <SeoTopicPage
      path={`/education/${t.slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Education', href: '/education' },
        { name: t.title, href: `/education/${t.slug}` },
      ]}
      sections={t.sections}
      related={t.related}
    />
  )
}
