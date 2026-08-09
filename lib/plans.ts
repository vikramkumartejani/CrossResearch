export type PlanId = 'free' | 'gold' | 'platinum'

export const PLAN_RANK: Record<PlanId, number> = {
  free: 0,
  gold: 1,
  platinum: 2,
}

export const PLAN_LABEL: Record<PlanId, string> = {
  free: 'Starter',
  gold: 'Gold Pack',
  platinum: 'Platinum Pack',
}

export function planAllows(userPlan: PlanId | string | null | undefined, required: PlanId): boolean {
  const plan = (userPlan === 'gold' || userPlan === 'platinum' ? userPlan : 'free') as PlanId
  return PLAN_RANK[plan] >= PLAN_RANK[required]
}

export function normalizePlan(value: unknown): PlanId {
  const v = String(value || 'free').toLowerCase()
  if (v === 'gold' || v === 'platinum') return v
  return 'free'
}
