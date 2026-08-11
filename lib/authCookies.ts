import { NextResponse } from 'next/server'

export const ACCESS_COOKIE = 'cr_at'
export const REFRESH_COOKIE = 'cr_rt'

const isProd = process.env.NODE_ENV === 'production'

export type AuthTokenPayload = {
  access_token: string
  refresh_token: string
  access_expires_in: number
  refresh_expires_in: number
}

export function backendBase(): string {
  // Same-origin browser calls hit Next `/api/*`; this is the FastAPI origin Next proxies to.
  // Prod: https://crossresearch.io/api  |  Local: http://127.0.0.1:8000
  return (process.env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
}

export function applyAuthCookies(res: NextResponse, tokens: AuthTokenPayload): NextResponse {
  const common = {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
  }
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
  res.cookies.set(ACCESS_COOKIE, '', { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, '', { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 0 })
  return res
}

export function publicAuthBody(body: Record<string, unknown>) {
  const { access_token: _a, refresh_token: _r, ...rest } = body
  return rest
}

export async function backendAuth(
  path: string,
  init: RequestInit
): Promise<{ ok: boolean; status: number; body: Record<string, unknown> }> {
  const response = await fetch(`${backendBase()}${path}`, {
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
