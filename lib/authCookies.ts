import { NextResponse } from 'next/server'

export const ACCESS_COOKIE = 'cr_at'
export const REFRESH_COOKIE = 'cr_rt'

export type AuthTokenPayload = {
  access_token: string
  refresh_token: string
  access_expires_in: number
  refresh_expires_in: number
}

/**
 * FastAPI origin for server-side proxying (no trailing slash).
 * Prod example: https://crossresearch.io/api
 * Local: http://127.0.0.1:8000
 */
export function backendBase(): string {
  return (process.env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
}

/** Secure cookies on HTTPS production. Override with COOKIE_SECURE=true|false. */
function cookieSecure(): boolean {
  const raw = (process.env.COOKIE_SECURE || '').trim().toLowerCase()
  if (raw === '1' || raw === 'true' || raw === 'yes') return true
  if (raw === '0' || raw === 'false' || raw === 'no') return false
  return process.env.NODE_ENV === 'production'
}

function cookieCommon() {
  const domain = (process.env.COOKIE_DOMAIN || '').trim() // e.g. .crossresearch.io
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax' as const,
    path: '/',
    ...(domain ? { domain } : {}),
  }
}

export function applyAuthCookies(res: NextResponse, tokens: AuthTokenPayload): NextResponse {
  if (!tokens?.access_token || !tokens?.refresh_token) return res
  const common = cookieCommon()
  res.cookies.set(ACCESS_COOKIE, tokens.access_token, {
    ...common,
    maxAge: Math.max(60, Number(tokens.access_expires_in) || 900),
  })
  res.cookies.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...common,
    maxAge: Math.max(60, Number(tokens.refresh_expires_in) || 60 * 60 * 24 * 30),
  })
  return res
}

export function clearAuthCookies(res: NextResponse): NextResponse {
  const common = cookieCommon()
  res.cookies.set(ACCESS_COOKIE, '', { ...common, maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, '', { ...common, maxAge: 0 })
  return res
}

export function publicAuthBody(body: Record<string, unknown>) {
  const { access_token: _a, refresh_token: _r, ...rest } = body
  return rest
}

/** Wipe cookies only when the session is actually invalid, not when the backend is down. */
export function shouldClearAuthCookies(status: number): boolean {
  return status === 401 || status === 403
}

export async function backendAuth(
  path: string,
  init: RequestInit
): Promise<{ ok: boolean; status: number; body: Record<string, unknown> }> {
  const response = await fetch(`${backendBase()}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })
  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>
  return { ok: response.ok, status: response.status, body }
}
