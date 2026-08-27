import type { Metadata } from 'next'
import PolicyDocumentView from '@/app/components/Legal/PolicyDocumentView'
import { privacyPolicy } from '@/lib/legal/privacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | CrossResearch',
  description: privacyPolicy.description,
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://crossresearch.io/policies/privacy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-[920px] mx-auto">
        <PolicyDocumentView policy={privacyPolicy} />
      </div>
    </div>
  )
}
