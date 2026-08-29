import type { BillingInterval, PaidPlanId } from '@/lib/whopCatalog'

type CheckoutResponse = {
  sessionId?: string
  planId?: string
  plan: PaidPlanId
  interval: BillingInterval
  email?: string
  purchaseUrl?: string
  mode?: 'hosted' | 'embed'
}

export async function startWhopCheckout(plan: PaidPlanId, interval: BillingInterval): Promise<void> {
  const res = await fetch('/api/auth/checkout', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, interval }),
  })
  const body = (await res.json().catch(() => ({}))) as CheckoutResponse & {
    error?: string
    details?: string
    detail?: string
  }

  if (!res.ok) {
    const detail = body.details ?? body.detail ?? body.error
    throw new Error(typeof detail === 'string' ? detail : 'Could not start checkout')
  }

  if (body.purchaseUrl) {
    window.location.assign(body.purchaseUrl)
    return
  }

  if (body.mode === 'hosted') {
    throw new Error('Checkout URL was not returned by Whop')
  }

  const url = new URL('/checkout', window.location.origin)
  url.searchParams.set('plan', body.plan || plan)
  url.searchParams.set('interval', body.interval || interval)
  if (body.sessionId) url.searchParams.set('session', body.sessionId)
  else if (body.planId) url.searchParams.set('planId', body.planId)
  window.location.assign(url.toString())
}
