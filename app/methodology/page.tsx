import Link from 'next/link'
import Breadcrumbs from '@/app/components/seo/Breadcrumbs'
import { WebPageJsonLd } from '@/app/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Research Methodology',
  description:
    'How CrossResearch produces market research: data inputs, model assumptions, review process, update cadence, and known limitations.',
  path: '/methodology',
  keywords: ['research methodology', 'macro model methodology', 'market research process'],
})

const STEPS = [
  {
    title: 'Define the question',
    body: 'Every note starts with a market-relevant question - regime, catalyst, relative value, or risk - not a data dump.',
  },
  {
    title: 'Assemble inputs',
    body: 'Macro prints, market pricing, positioning, and model outputs are collected with source timestamps so conclusions stay auditable.',
  },
  {
    title: 'Quantify where possible',
    body: 'Nowcasts, regimes, and expectation paths are used when they add signal. Models are described with inputs, assumptions, and failure modes.',
  },
  {
    title: 'Write the market implication',
    body: 'Reports answer “so what for markets?” across FX, rates, equities, and commodities when transmission is material.',
  },
  {
    title: 'Review and date-stamp',
    body: 'Published research carries authors, review notes where applicable, and clear update times so readers know what is current.',
  },
]

export default function MethodologyPage() {
  return (
    <main className="font-urbanist min-h-screen bg-[#0B0B12] text-white">
      <WebPageJsonLd
        name="Research Methodology"
        description="How CrossResearch produces market research and quantitative forecasts."
        path="/methodology"
      />
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Methodology', href: '/methodology' },
          ]}
        />
        <header className="mb-10 max-w-3xl">
          <p className="text-[#88C4FF] text-[12px] font-semibold tracking-[0.08em] uppercase mb-3">
            Trust & transparency
          </p>
          <h1 className="text-[32px] sm:text-[44px] leading-[1.15] tracking-tight font-medium mb-4">
            Research methodology
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[17px] leading-7">
            CrossResearch publishes education, macro research, market reports, models, and AI/ML
            finance content under one process: clear questions, dated inputs, quantified context,
            and explicit limitations.
          </p>
        </header>

        <section className="space-y-6 mb-14" aria-labelledby="method-steps">
          <h2 id="method-steps" className="text-[20px] sm:text-[22px] font-medium">
            How a research note is built
          </h2>
          <ol className="space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <p className="text-[#88C4FF] text-[12px] font-semibold mb-1">Step {i + 1}</p>
                <h3 className="text-white font-medium text-[16px] mb-2">{step.title}</h3>
                <p className="text-white/55 text-[14px] leading-6">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14" aria-labelledby="method-limits">
          <h2 id="method-limits" className="text-[20px] sm:text-[22px] font-medium mb-3">
            Limitations
          </h2>
          <p className="text-white/55 text-[14px] sm:text-[15px] leading-7">
            Models can be wrong. Data revisions change history. Markets reprice before prints land.
            Nothing on CrossResearch is investment advice. Use research as decision support, not as
            a substitute for your own risk process.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/authors"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white"
          >
            Authors
          </Link>
          <Link
            href="/models"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-[13px] text-white/80 hover:text-white"
          >
            Models hub
          </Link>
          <Link
            href="/research/macro"
            className="inline-flex items-center rounded-lg bg-[#88C4FF] px-4 py-2.5 text-[13px] font-semibold text-black"
          >
            Macro research
          </Link>
        </div>
      </div>
    </main>
  )
}
