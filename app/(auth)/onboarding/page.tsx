import { Suspense } from 'react'
import AuthLayout from '@/app/components/Auth/AuthLayout'
import OnboardingFlow from '@/app/components/Auth/OnboardingFlow'
import ChartLoader from '@/app/components/Dashboard/shared/ChartLoader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Personalize your CrossResearch experience.',
}

export default function OnboardingPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<ChartLoader className="min-h-[280px]" />}>
        <OnboardingFlow />
      </Suspense>
    </AuthLayout>
  )
}
