const AUTH_PATH_PREFIXES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/affiliate/login',
  '/affiliate/signup',
  '/affiliate/forgot-password',
] as const

export type AccountType = 'member' | 'affiliate'

/** Safe in-app path from ?next= (blocks auth loops and open redirects). */
export function safeNextPath(preferredNext?: string | null): string | null {
  const next = (preferredNext || '').trim()
  if (!next.startsWith('/') || next.startsWith('//')) return null
  if (AUTH_PATH_PREFIXES.some((p) => next === p || next.startsWith(`${p}/`))) return null
  return next
}

function onboardingPath(preferredNext?: string | null): string {
  const next = safeNextPath(preferredNext)
  return next ? `/onboarding?next=${encodeURIComponent(next)}` : '/onboarding'
}

export function isAffiliatePath(pathname: string): boolean {
  return pathname === '/affiliate-center' || pathname.startsWith('/affiliate-center/')
}

export function homeForAccountType(accountType?: AccountType | string | null): string {
  return accountType === 'affiliate' ? '/affiliate-center' : '/analysis'
}

export function loginPathForAccountType(
  accountType?: AccountType | string | null,
  preferredNext?: string | null
): string {
  const base = accountType === 'affiliate' ? '/affiliate/login' : '/login'
  const next = safeNextPath(preferredNext)
  if (!next) return base
  // Keep role homes aligned with the login surface
  if (accountType === 'affiliate' && !isAffiliatePath(next)) {
    return `${base}?next=${encodeURIComponent('/affiliate-center')}`
  }
  if (accountType !== 'affiliate' && isAffiliatePath(next)) {
    return `${base}?next=${encodeURIComponent('/analysis')}`
  }
  return `${base}?next=${encodeURIComponent(next)}`
}

/** Where to send an already-authenticated user away from login/signup. */
export function postLoginRedirect(options: {
  onboardingDone: boolean
  preferredNext?: string | null
  accountType?: AccountType | string | null
}): string {
  if (options.accountType === 'affiliate') {
    const next = safeNextPath(options.preferredNext)
    if (next && isAffiliatePath(next)) return next
    return '/affiliate-center'
  }
  const next = safeNextPath(options.preferredNext)
  if (!options.onboardingDone) return onboardingPath(options.preferredNext)
  if (next && isAffiliatePath(next)) return '/analysis'
  return next ?? '/analysis'
}

/** Where to send the user after login/signup based on role + onboarding. */
export function postAuthPath(user: unknown, preferredNext?: string | null): string {
  const u = (user && typeof user === 'object' ? user : {}) as {
    onboarding_completed?: unknown
    account_type?: unknown
  }

  if (u.account_type === 'affiliate') {
    const next = safeNextPath(preferredNext)
    if (next && isAffiliatePath(next)) return next
    return '/affiliate-center'
  }

  const completed = u.onboarding_completed !== false
  if (!completed) return onboardingPath(preferredNext)

  const next = safeNextPath(preferredNext)
  if (next && isAffiliatePath(next)) return '/analysis'
  return next ?? '/analysis'
}
