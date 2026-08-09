/** Where to send the user after login/signup based on onboarding status. */
export function postAuthPath(user: unknown, preferredNext?: string | null): string {
  const completed =
    user &&
    typeof user === 'object' &&
    (user as { onboarding_completed?: unknown }).onboarding_completed !== false

  if (!completed) return '/onboarding'

  const next = (preferredNext || '').trim()
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/login') && !next.startsWith('/signup')) {
    return next
  }
  return '/analysis'
}
