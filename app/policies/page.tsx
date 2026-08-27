import type { Metadata } from 'next'
import Link from 'next/link'
import { privacyPolicy } from '@/lib/legal/privacyContent'
import { termsPolicy } from '@/lib/legal/termsContent'

export const metadata: Metadata = {
  title: 'Policies | CrossResearch',
  description: 'Terms of use, privacy policy, and legal disclaimers for CrossResearch services.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://crossresearch.io/policies' },
}

const POLICIES = [
  {
    href: '/policies/terms',
    title: termsPolicy.title,
    description: termsPolicy.description,
  },
  {
    href: '/policies/privacy',
    title: privacyPolicy.title,
    description: privacyPolicy.description,
  },
]

export default function PoliciesPage() {
  return (
    <div className="px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-[920px] mx-auto">
        <div className="mb-8 sm:mb-10">
          <div className="mb-5 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-4 py-2 rounded-[100px] text-[14px] sm:text-[16px]">
            Legal
          </div>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[56px] font-normal mb-4 sm:mb-5">
            Terms of Use, Policies, and Disclaimers
          </h1>
          <p className="text-white/70 text-[16px] sm:text-[18px] leading-6 sm:leading-[28px] max-w-[760px]">
            Your use of CrossResearch signifies that you agree to the terms and policies below. Please review them before creating an account or using our services.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5">
          {POLICIES.map((policy) => (
            <Link
              key={policy.href}
              href={policy.href}
              className="group block rounded-[20px] sm:rounded-[24px] border border-[#FFFFFF14] bg-[#FFFFFF05] p-5 sm:p-6 hover:border-[#88C4FF66] hover:bg-[#FFFFFF08] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-white text-[20px] sm:text-[22px] font-semibold mb-2 group-hover:text-[#88C4FF] transition-colors">
                    {policy.title}
                  </h2>
                  <p className="text-white/60 text-[15px] sm:text-[16px] leading-6 sm:leading-[26px]">
                    {policy.description}
                  </p>
                </div>
                <svg className="shrink-0 mt-1 text-white/40 group-hover:text-[#88C4FF] transition-colors" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
