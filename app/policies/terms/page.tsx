import type { Metadata } from 'next'
import PolicyDocumentView from '@/app/components/Legal/PolicyDocumentView'
import { termsPolicy } from '@/lib/legal/termsContent'

export const metadata: Metadata = {
  title: 'Terms & Conditions | CrossResearch',
  description: termsPolicy.description,
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://crossresearch.io/policies/terms' },
}

export default function TermsPolicyPage() {
  return (
    <div className="px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-[920px] mx-auto">
        <PolicyDocumentView policy={termsPolicy} />
      </div>
    </div>
  )
}
