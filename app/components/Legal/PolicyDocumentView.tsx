import Link from 'next/link'
import type { PolicyDocument } from '@/lib/legal/types'

function PolicyBlocks({ blocks }: { blocks: PolicyDocument['sections'][number]['blocks'] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'ul') {
          return (
            <ul key={index} className="list-disc pl-5 sm:pl-6 space-y-2 text-white/70 text-[15px] sm:text-[16px] leading-6 sm:leading-[26px]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={index} className="text-white/70 text-[15px] sm:text-[16px] leading-6 sm:leading-[26px]">
            {block.text}
          </p>
        )
      })}
    </>
  )
}

export default function PolicyDocumentView({ policy }: { policy: PolicyDocument }) {
  return (
    <article className="max-w-[920px]">
      <header className="mb-8 sm:mb-10">
        <Link
          href="/policies"
          className="inline-flex items-center gap-2 text-[#88C4FF] text-[14px] sm:text-[15px] hover:text-white transition-colors mb-5"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All policies
        </Link>
        <h1 className="text-white text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[56px] font-normal mb-4 sm:mb-5">
          {policy.title}
        </h1>
        <p className="text-white/60 text-[16px] sm:text-[18px] leading-6 sm:leading-[28px]">
          {policy.description}
        </p>
      </header>

      <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
        {policy.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-white/75 text-[15px] sm:text-[17px] leading-6 sm:leading-[28px]">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-8 sm:space-y-10">
        {policy.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-white text-[20px] sm:text-[24px] leading-7 sm:leading-8 font-semibold mb-3 sm:mb-4">
              {section.number ? `${section.number}. ${section.title}` : section.title}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <PolicyBlocks blocks={section.blocks} />
            </div>
          </section>
        ))}
      </div>

      {policy.contactEmail && (
        <footer className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#FFFFFF14]">
          <p className="text-white/60 text-[14px] sm:text-[16px] leading-6">
            Questions about this policy? Contact{' '}
            <a href={`mailto:${policy.contactEmail}`} className="text-[#88C4FF] hover:text-white transition-colors">
              {policy.contactEmail}
            </a>
          </p>
        </footer>
      )}
    </article>
  )
}
