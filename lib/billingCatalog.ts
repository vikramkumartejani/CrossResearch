import type { PlanId } from '@/lib/plans'

export type BillingInterval = 'monthly' | 'annual'
export type PaidPlanId = Extract<PlanId, 'gold' | 'platinum'>

/** USD charge amounts (annual = full year billed upfront). */
export const BILLING_USD: Record<PaidPlanId, Record<BillingInterval, number>> = {
  gold: {
    monthly: 24.99,
    annual: 254.88,
  },
  platinum: {
    monthly: 69.99,
    annual: 713.88,
  },
}

export function isPaidPlan(value: string): value is PaidPlanId {
  return value === 'gold' || value === 'platinum'
}

export function isBillingInterval(value: string): value is BillingInterval {
  return value === 'monthly' || value === 'annual'
}

export const PAID_PLAN_LABEL: Record<PaidPlanId, string> = {
  gold: 'Gold Pack',
  platinum: 'Platinum Pack',
}

export function billingAmountUsd(plan: PaidPlanId, interval: BillingInterval): number {
  return BILLING_USD[plan][interval]
}

function parseTestAmountUsd(): number | null {
  const raw = (
    process.env.NOWPAYMENTS_TEST_AMOUNT_USD ||
    process.env.NEXT_PUBLIC_NOWPAYMENTS_TEST_AMOUNT_USD ||
    ''
  ).trim()
  if (!raw) return null
  const amount = Number(raw)
  if (!Number.isFinite(amount) || amount <= 0) return null
  return amount
}

/** NOWPayments fixed-rate floor (live API ~$19.15 USD as of 2026-08). */
export const NOWPAYMENTS_MIN_CHARGE_USD = 20

/** Crypto invoice amount; test env is raised to NOWPayments minimum when too low. */
export function nowpaymentsInvoiceAmountUsd(plan: PaidPlanId, interval: BillingInterval): number {
  const test = parseTestAmountUsd()
  if (test !== null) {
    return Math.max(test, NOWPAYMENTS_MIN_CHARGE_USD)
  }
  return billingAmountUsd(plan, interval)
}

export function nowpaymentsTestAmountUsd(): number | null {
  return parseTestAmountUsd()
}

export function billingDescription(plan: PaidPlanId, interval: BillingInterval): string {
  const label = PAID_PLAN_LABEL[plan]
  return interval === 'annual' ? `${label} (annual)` : `${label} (monthly)`
}
