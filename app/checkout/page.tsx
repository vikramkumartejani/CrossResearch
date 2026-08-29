import { redirect } from 'next/navigation'
import WhopCheckoutClient from './WhopCheckoutClient'
import { isWhopSandbox, whopEmbedReturnUrl } from '@/lib/whop'
import { isBillingInterval, isPaidPlan, whopPlanId, type BillingInterval, type PaidPlanId } from '@/lib/whopCatalog'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    session?: string
    planId?: string
    plan?: string
    interval?: string
  }>
}) {
  const params = await searchParams
  const sessionId = String(params.session || '').trim()
  const planIdParam = String(params.planId || '').trim()
  const plan = String(params.plan || '').trim().toLowerCase()
  const interval = String(params.interval || 'monthly').trim().toLowerCase()

  if (!isPaidPlan(plan) || !isBillingInterval(interval)) {
    redirect('/#pricing')
  }

  const planId =
    planIdParam ||
    (!sessionId && isWhopSandbox()
      ? whopPlanId(plan as PaidPlanId, interval as BillingInterval)
      : '')

  if (!sessionId && !planId) {
    redirect('/#pricing')
  }

  return (
    <WhopCheckoutClient
      sessionId={sessionId || undefined}
      planId={!sessionId && planId ? planId : undefined}
      plan={plan}
      returnUrl={whopEmbedReturnUrl()}
      environment={isWhopSandbox() ? 'sandbox' : 'production'}
    />
  )
}
