import type { PlanId } from '@/lib/plans'

export type BillingInterval = 'monthly' | 'annual'
export type PaidPlanId = Extract<PlanId, 'gold' | 'platinum'>

const PLAN_ENV: Record<PaidPlanId, Record<BillingInterval, string>> = {
  gold: {
    monthly: 'WHOP_PLAN_GOLD_MONTHLY',
    annual: 'WHOP_PLAN_GOLD_ANNUAL',
  },
  platinum: {
    monthly: 'WHOP_PLAN_PLATINUM_MONTHLY',
    annual: 'WHOP_PLAN_PLATINUM_ANNUAL',
  },
}

export function whopPlanId(plan: PaidPlanId, interval: BillingInterval): string {
  const envName = PLAN_ENV[plan][interval]
  const value = (process.env[envName] || '').trim()
  if (!value) {
    throw new Error(`Missing environment variable ${envName}`)
  }
  return value
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
