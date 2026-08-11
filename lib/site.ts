/** Canonical public site origin (no trailing slash). */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://crossresearch.io').replace(/\/+$/, '')
}

export function absoluteUrl(path = '/'): string {
  const base = siteUrl()
  if (!path || path === '/') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
