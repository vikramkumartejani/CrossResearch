import AuthLayout from '@/app/components/Auth/AuthLayout'
import OnboardingFlow from '@/app/components/Auth/OnboardingFlow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Personalize your CrossResearch experience.',
}

export default function OnboardingPage() {
  return (
    <AuthLayout>
      <OnboardingFlow />
    </AuthLayout>
  )
}
