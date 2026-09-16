import Link from 'next/link'
import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import { WebPageJsonLd } from './JsonLd'
import type { BreadcrumbItem } from '@/lib/seo'
import { SEO_PILLARS } from '@/lib/seo'

type ClusterLink = {
  href: string
  label: string
  blurb?: string
}

export default function SeoHubPage({
  path,
  title,
  description,
  breadcrumbs,
  clusters,
  children,
}: {
  path: string
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  clusters: ClusterLink[]
  children?: ReactNode
}) {
  const otherPillars = SEO_PILLARS.filter((p) => p.href !== path)

  return (
    <main className="font-urbanist min-h-screen bg-[#0B0B12] text-white">
      <WebPageJsonLd name={title} description={description} path={path} />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10 sm:mb-12 max-w-3xl">
          <p className="text-[#88C4FF] text-[12px] font-semibold tracking-[0.08em] uppercase mb-3">
            CrossResearch research hub
          </p>
          <h1 className="text-[32px] sm:text-[44px] leading-[1.15] tracking-tight font-medium mb-4">
            {title}
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[17px] leading-7">{description}</p>
        </header>

        {children}

        <section className="mb-14" aria-labelledby="hub-clusters">
          <h2 id="hub-clusters" className="text-[20px] sm:text-[22px] font-medium mb-4">
            Explore this pillar
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {clusters.map((c) => {
              const external = c.href.startsWith('http')
              return (
                <div
                  key={c.href + c.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                >
                  <p className="text-white font-medium text-[15px] mb-1">{c.label}</p>
                  {c.blurb ? (
                    <p className="text-white/50 text-[13px] leading-5 mb-3">{c.blurb}</p>
                  ) : null}
                  {external ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#88C4FF] text-[13px] font-medium hover:underline"
                    >
                      Open →
                    </a>
                  ) : (
                    <Link
                      href={c.href}
                      className="text-[#88C4FF] text-[13px] font-medium hover:underline"
                    >
                      Open →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="hub-related">
          <h2 id="hub-related" className="text-[20px] sm:text-[22px] font-medium mb-4">
            Related CrossResearch pillars
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherPillars.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-[#88C4FF]/40 hover:bg-[#88C4FF]/05 transition-colors"
              >
                <p className="text-white font-medium text-[14px] mb-1">{p.short}</p>
                <p className="text-white/45 text-[12px] leading-4 line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/methodology"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white hover:border-white/30"
          >
            Methodology
          </Link>
          <Link
            href="/authors"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white hover:border-white/30"
          >
            Authors
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg bg-[#88C4FF] px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-[#9dceff]"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </main>
  )
}
