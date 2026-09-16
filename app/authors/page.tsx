import Link from 'next/link'
import Breadcrumbs from '@/app/components/seo/Breadcrumbs'
import { WebPageJsonLd } from '@/app/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Authors & Research Team',
  description:
    'Meet the CrossResearch authors and research team behind trading education, macro analysis, market reports, models, and AI/ML finance content.',
  path: '/authors',
  keywords: ['CrossResearch authors', 'market research team', 'macro research authors'],
})

const AUTHORS = [
  {
    name: 'CrossResearch Desk',
    role: 'Macro, markets & education',
    bio: 'Collective byline for platform research spanning education hubs, macro notes, recurring reports, and model commentary.',
  },
  {
    name: 'Quantitative Research',
    role: 'Models & forecasting',
    bio: 'Owns nowcasts, regime models, expectation paths, and methodology documentation for quantitative work.',
  },
  {
    name: 'AI Research',
    role: 'ML / NLP for finance',
    bio: 'Covers machine learning pipelines, financial NLP, evaluation standards, and AI-assisted research workflows.',
  },
]

export default function AuthorsPage() {
  return (
    <main className="font-urbanist min-h-screen bg-[#0B0B12] text-white">
      <WebPageJsonLd
        name="Authors & Research Team"
        description="CrossResearch authors and research team profiles."
        path="/authors"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Authors & Research Team',
            url: absoluteUrl('/authors'),
            about: AUTHORS.map((a) => ({
              '@type': 'Person',
              name: a.name,
              jobTitle: a.role,
              description: a.bio,
              worksFor: { '@type': 'Organization', name: 'CrossResearch' },
            })),
          }),
        }}
      />
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Authors', href: '/authors' },
          ]}
        />
        <header className="mb-10 max-w-3xl">
          <p className="text-[#88C4FF] text-[12px] font-semibold tracking-[0.08em] uppercase mb-3">
            Trust & transparency
          </p>
          <h1 className="text-[32px] sm:text-[44px] leading-[1.15] tracking-tight font-medium mb-4">
            Authors & research team
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[17px] leading-7">
            Research should show who produced it. Author profiles and desk bylines will expand as
            individual contributors publish under their own names; until then, desk ownership stays
            visible on every pillar.
          </p>
        </header>

        <section className="grid gap-4 mb-14" aria-labelledby="authors-list">
          <h2 id="authors-list" className="sr-only">
            Author profiles
          </h2>
          {AUTHORS.map((author) => (
            <article
              key={author.name}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="text-white font-medium text-[17px]">{author.name}</h3>
              <p className="text-[#88C4FF] text-[13px] mt-1 mb-3">{author.role}</p>
              <p className="text-white/55 text-[14px] leading-6">{author.bio}</p>
            </article>
          ))}
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/methodology"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white"
          >
            Methodology
          </Link>
          <Link
            href="/reports/weekly-outlook/2026-09-20"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white"
          >
            Latest weekly outlook
          </Link>
          <Link
            href="/education"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white"
          >
            Education
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center rounded-lg bg-[#88C4FF] px-4 py-2.5 text-[13px] font-semibold text-black"
          >
            Market reports
          </Link>
        </div>
      </div>
    </main>
  )
}
