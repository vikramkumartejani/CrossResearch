import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

const BACKEND_TIMEOUT_MS = 20_000

function backendFetchSignal(): AbortSignal | undefined {
  if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
    return AbortSignal.timeout(BACKEND_TIMEOUT_MS)
  }
  return undefined
}

/** True when the access JWT is missing, malformed, or within 15s of expiry. */
export function isAccessExpired(token: string | undefined | null): boolean {
  if (!token) return true
  const parts = token.split('.')
  if (parts.length !== 3) return true
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
    const payload = JSON.parse(atob(padded)) as { exp?: number }
    if (typeof payload.exp !== 'number') return true
    return payload.exp * 1000 <= Date.now() + 15_000
  } catch {
    return true
  }
}

export async function refreshAccessFromRequest(
  request: Pick<NextRequest, 'cookies' | 'headers'>,
): Promise<AuthTokenPayload | null> {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (!refresh) return null
  const { ok, body } = await backendAuth('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refresh }),
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
      'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
    },
  })
  if (!ok || typeof body.access_token !== 'string' || typeof body.refresh_token !== 'string') {
    return null
  }
  return body as unknown as AuthTokenPayload
}

/** Resolve a usable access token, refreshing proactively when the cookie JWT is expired. */
export async function resolveAccessToken(
  request: Pick<NextRequest, 'cookies' | 'headers'>,
): Promise<{ access: string | null; tokens: AuthTokenPayload | null }> {
  let tokens: AuthTokenPayload | null = null
  let access = request.cookies.get(ACCESS_COOKIE)?.value || null
  if (!isAccessExpired(access)) return { access, tokens: null }

  tokens = await refreshAccessFromRequest(request)
  access = tokens?.access_token ?? null
  return { access, tokens }
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
    signal: backendFetchSignal(),
  })
  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>
  return { ok: response.ok, status: response.status, body }
}
