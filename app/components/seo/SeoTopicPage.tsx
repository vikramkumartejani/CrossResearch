import Link from 'next/link'
import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import { WebPageJsonLd } from './JsonLd'
import { ArticleJsonLd } from './ArticleJsonLd'
import type { BreadcrumbItem } from '@/lib/seo'

export type TopicSection = {
  heading: string
  paragraphs: string[]
}

export default function SeoTopicPage({
  path,
  title,
  description,
  breadcrumbs,
  sections,
  related,
  children,
  articleMeta,
}: {
  path: string
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  sections: TopicSection[]
  related: { href: string; label: string }[]
  children?: ReactNode
  articleMeta?: {
    authorName: string
    datePublished: string
    dateModified?: string
    dataThrough?: string
    sources?: string
  }
}) {
  return (
    <main className="font-urbanist min-h-screen bg-[#0B0B12] text-white">
      <WebPageJsonLd name={title} description={description} path={path} />
      {articleMeta ? (
        <ArticleJsonLd
          headline={title}
          description={description}
          path={path}
          datePublished={articleMeta.datePublished}
          dateModified={articleMeta.dateModified}
          authorName={articleMeta.authorName}
        />
      ) : null}
      <div className="mx-auto max-w-[820px] px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-8 sm:mb-10">
          <h1 className="text-[30px] sm:text-[40px] leading-[1.15] tracking-tight font-medium mb-4">
            {title}
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[17px] leading-7">{description}</p>
          {articleMeta ? (
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[13px] text-white/55 space-y-1">
              <p>
                <span className="text-white/75">{articleMeta.authorName}</span>
              </p>
              <p>Published: {articleMeta.datePublished}</p>
              {articleMeta.dateModified ? <p>Updated: {articleMeta.dateModified}</p> : null}
              {articleMeta.dataThrough ? <p>Data through: {articleMeta.dataThrough}</p> : null}
              {articleMeta.sources ? <p>Sources: {articleMeta.sources}</p> : null}
              <p>
                Methodology:{' '}
                <Link href="/methodology" className="text-[#88C4FF] hover:underline">
                  CrossResearch research framework
                </Link>
              </p>
            </div>
          ) : null}
        </header>

        {children}

        <div className="space-y-8 mb-12">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[20px] sm:text-[22px] font-medium mb-3">{s.heading}</h2>
              <div className="space-y-3">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="text-white/55 text-[14px] sm:text-[15px] leading-7">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {related.length ? (
          <section aria-labelledby="related-topics">
            <h2 id="related-topics" className="text-[18px] font-medium mb-3">
              Related research
            </h2>
            <ul className="flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="inline-flex rounded-lg border border-white/15 px-3 py-1.5 text-[12px] text-white/70 hover:text-white hover:border-white/30"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  )
}
