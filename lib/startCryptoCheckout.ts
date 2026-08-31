import type { BillingInterval, PaidPlanId } from '@/lib/billingCatalog'

export async function startCryptoCheckout(plan: PaidPlanId, interval: BillingInterval): Promise<void> {
  const res = await fetch('/api/auth/checkout/crypto', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, interval }),
  })
  const body = (await res.json().catch(() => ({}))) as {
    invoiceUrl?: string
    error?: string
    details?: string
    detail?: string
  }

  if (!res.ok) {
    const detail = body.details ?? body.detail ?? body.error
    throw new Error(typeof detail === 'string' ? detail : 'Could not start crypto checkout')
  }

  if (!body.invoiceUrl) {
    throw new Error('Crypto checkout URL was not returned')
  }

  window.location.assign(body.invoiceUrl)
}
