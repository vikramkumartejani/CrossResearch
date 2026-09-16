import { notFound } from 'next/navigation'
import SeoTopicPage from '@/app/components/seo/SeoTopicPage'
import { pageMetadata } from '@/lib/seo'
import { findReport, REPORT_TOPICS } from '@/lib/seo-topics'

export function generateStaticParams() {
  return REPORT_TOPICS.map((r) => ({ category: r.category, slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const row = findReport(category, slug)
  if (!row) return {}
  return pageMetadata({
    title: row.topic.title,
    description: row.topic.description,
    path: `/reports/${category}/${slug}`,
    type: 'article',
  })
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const row = findReport(category, slug)
  if (!row) notFound()
  const t = row.topic
  return (
    <SeoTopicPage
      path={`/reports/${category}/${slug}`}
      title={t.title}
      description={t.description}
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Reports', href: '/reports' },
        { name: t.title, href: `/reports/${category}/${slug}` },
      ]}
      sections={t.sections}
      related={t.related}
      articleMeta={t.articleMeta}
    />
  )
}
