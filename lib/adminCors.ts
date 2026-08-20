import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  applyAuthCookies,
  backendAuth,
  backendBase,
  type AuthTokenPayload,
} from './authCookies'

const DEFAULT_ORIGINS = [
  'https://crossresearch-admin-panel.vercel.app',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
]

function allowedOrigins(): Set<string> {
  const extra = (process.env.ADMIN_CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  return new Set([...DEFAULT_ORIGINS, ...extra])
}

export function corsOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin')
  if (!origin) return null
  return allowedOrigins().has(origin) ? origin : null
}

export function withCors(request: NextRequest, response: NextResponse): NextResponse {
  const origin = corsOrigin(request)
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key, X-Support-Key')
    response.headers.set('Vary', 'Origin')
  }
  return response
}

export function corsPreflight(request: NextRequest): NextResponse {
  return withCors(request, new NextResponse(null, { status: 204 }))
}

export { backendBase }

async function refreshAccess(request: NextRequest): Promise<AuthTokenPayload | null> {
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

export async function proxyBackend(
  request: NextRequest,
  path: string,
  method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE'
): Promise<NextResponse> {
  try {
    const apiUrl = `${backendBase()}${path.startsWith('/') ? path : `/${path}`}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    const adminKey = request.headers.get('x-admin-key')
    const supportKey = request.headers.get('x-support-key')
    if (adminKey) headers['X-Admin-Key'] = adminKey
    if (supportKey) headers['X-Support-Key'] = supportKey

    let tokens: AuthTokenPayload | null = null
    let access = request.cookies.get(ACCESS_COOKIE)?.value
    if (!access && !adminKey && !supportKey) {
      tokens = await refreshAccess(request)
      access = tokens?.access_token
    }
    if (access) headers.Authorization = `Bearer ${access}`

    const init: RequestInit = {
      method,
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
    }
    let bodyText: string | undefined
    if (method !== 'GET' && method !== 'DELETE') {
      bodyText = await request.text()
      init.body = bodyText
    }

    let response = await fetch(apiUrl, init)
    // Access cookie expired while refresh still works - same path /api/auth/me uses.
    if (response.status === 401 && !adminKey && !supportKey) {
      tokens = await refreshAccess(request)
      if (tokens?.access_token) {
        headers.Authorization = `Bearer ${tokens.access_token}`
        response = await fetch(apiUrl, {
          method,
          headers,
          body: bodyText,
          cache: 'no-store',
          signal: AbortSignal.timeout(20_000),
        })
      }
    }

    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      const res = withCors(
        request,
        NextResponse.json(
          {
            error: `Failed to ${method.toLowerCase()} ${path}`,
            details: (body as { detail?: unknown }).detail ?? body,
            detail: (body as { detail?: unknown }).detail,
          },
          { status: response.status }
        )
      )
      return tokens ? applyAuthCookies(res, tokens) : res
    }
    const res = withCors(request, NextResponse.json(body))
    return tokens ? applyAuthCookies(res, tokens) : res
  } catch (error) {
    const raw = error instanceof Error ? error.message : String(error)
    const timedOut = /aborted|timeout|AbortError/i.test(raw)
    const unreachable =
      timedOut || /fetch failed|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|network/i.test(raw)
    return withCors(
      request,
      NextResponse.json(
        {
          error: 'Internal server error',
          details: unreachable
            ? timedOut
              ? 'API request timed out. Confirm BACKEND_URL points to a running FastAPI server.'
              : 'Could not reach the API server. Set BACKEND_URL on the Next.js deployment to your FastAPI origin.'
            : raw,
        },
        { status: 500 }
      )
    )
  }
}
