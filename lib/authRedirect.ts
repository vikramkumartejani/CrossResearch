/** Where to send the user after login/signup based on onboarding status. */
export function postAuthPath(user: unknown, preferredNext?: string | null): string {
  const u = (user && typeof user === 'object' ? user : {}) as {
    onboarding_completed?: unknown
    account_type?: unknown
  }

  // Affiliate partners have their own dashboard
  if (u.account_type === 'affiliate') return '/affiliate-center'

  const completed = u.onboarding_completed !== false

  if (!completed) return '/onboarding'

  const next = (preferredNext || '').trim()
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/login') && !next.startsWith('/signup')) {
    return next
  }
  return '/analysis'
}
