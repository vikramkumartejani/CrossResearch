import { NextRequest, NextResponse } from 'next/server'
import {
  applyAuthCookies,
  backendBase,
  clearAuthCookies,
  refreshAccessFromRequest,
  resolveAccessToken,
  shouldClearAuthCookies,
  type AuthTokenPayload,
} from './authCookies'

const DEFAULT_ORIGINS = [
  'https://admin.crossresearch.io',
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

const PROXY_TIMEOUT_MS = 20_000

function proxyFetchSignal(): AbortSignal | undefined {
  if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
    return AbortSignal.timeout(PROXY_TIMEOUT_MS)
  }
  return undefined
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

    const authed = !adminKey && !supportKey
    let tokens: AuthTokenPayload | null = null
    let access: string | null = null

    if (authed) {
      const resolved = await resolveAccessToken(request)
      access = resolved.access
      tokens = resolved.tokens
    }

    if (access) headers.Authorization = `Bearer ${access}`

    let bodyText: string | undefined
    if (method !== 'GET' && method !== 'DELETE') {
      bodyText = await request.text()
    }

    async function callBackend(bearer: string | null) {
      const h = { ...headers }
      if (bearer) h.Authorization = `Bearer ${bearer}`
      return fetch(apiUrl, {
        method,
        headers: h,
        body: bodyText,
        cache: 'no-store',
        signal: proxyFetchSignal(),
      })
    }

    let response = await callBackend(access)

    // Same retry path as /api/auth/me when the access JWT was rejected server-side.
    if (authed && response.status === 401) {
      const refreshed = await refreshAccessFromRequest(request)
      if (refreshed?.access_token) {
        tokens = refreshed
        response = await callBackend(refreshed.access_token)
      }
    }

    const body = await response.json().catch(() => ({}))

    function finish(res: NextResponse): NextResponse {
      const withCookies = tokens ? applyAuthCookies(res, tokens) : res
      return withCors(request, withCookies)
    }

    if (!response.ok) {
      const res = NextResponse.json(
        {
          error: `Failed to ${method.toLowerCase()} ${path}`,
          details: (body as { detail?: unknown }).detail ?? body,
          detail: (body as { detail?: unknown }).detail,
        },
        { status: response.status }
      )
      // Only wipe session on real auth failure. 403 (e.g. not an affiliate) must keep cookies.
      if (authed && response.status === 401 && shouldClearAuthCookies(response.status)) {
        return finish(clearAuthCookies(res))
      }
      return finish(res)
    }

    return finish(NextResponse.json(body))
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
              : 'Could not reach the API server. Set BACKEND_URL on the Next host (e.g. http://127.0.0.1:8000 on the droplet).'
            : raw,
        },
        { status: 500 }
      )
    )
  }
}
