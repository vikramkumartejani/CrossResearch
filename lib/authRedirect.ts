const AUTH_PATH_PREFIXES = ['/login', '/signup', '/forgot-password'] as const

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

/** Where to send an already-authenticated user away from login/signup. */
export function postLoginRedirect(options: {
  onboardingDone: boolean
  preferredNext?: string | null
}): string {
  const next = safeNextPath(options.preferredNext)
  if (!options.onboardingDone) return onboardingPath(options.preferredNext)
  return next ?? '/analysis'
}

/** Where to send the user after login/signup based on onboarding status. */
export function postAuthPath(user: unknown, preferredNext?: string | null): string {
  const u = (user && typeof user === 'object' ? user : {}) as {
    onboarding_completed?: unknown
    account_type?: unknown
  }

  // Affiliate partners have their own dashboard
  if (u.account_type === 'affiliate') return '/affiliate-center'

  const completed = u.onboarding_completed !== false
  if (!completed) return onboardingPath(preferredNext)

  return safeNextPath(preferredNext) ?? '/analysis'
}
