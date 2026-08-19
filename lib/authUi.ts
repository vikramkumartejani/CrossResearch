export function authErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback
  const b = body as Record<string, unknown>
  const detail = b.details ?? b.detail ?? b.error
  if (typeof detail === 'string' && detail.trim()) return detail
  if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg)
  if (detail && typeof detail === 'object') {
    const nested = (detail as Record<string, unknown>).detail ?? (detail as Record<string, unknown>).message
    if (typeof nested === 'string' && nested.trim()) return nested
  }
  return fallback
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
