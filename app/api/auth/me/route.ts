import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  applyAuthCookies,
  backendAuth,
  backendBase,
  clearAuthCookies,
  publicAuthBody,
  shouldClearAuthCookies,
  type AuthTokenPayload,
} from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

async function tryRefresh(request: NextRequest): Promise<{
  tokens: (AuthTokenPayload & { user?: unknown }) | null
  status: number
}> {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (!refresh) return { tokens: null, status: 401 }
  const { ok, status, body } = await backendAuth('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refresh }),
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
      'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
    },
  })
  if (!ok) return { tokens: null, status: status || 401 }
  return { tokens: body as unknown as AuthTokenPayload & { user?: unknown }, status: 200 }
}

export async function GET(request: NextRequest) {
  const access = request.cookies.get(ACCESS_COOKIE)?.value

  async function fetchMe(token: string) {
    const response = await fetch(`${backendBase()}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    const body = (await response.json().catch(() => ({}))) as Record<string, unknown>
    return { ok: response.ok, status: response.status, body }
  }

  if (access) {
    const me = await fetchMe(access)
    if (me.ok) {
      return NextResponse.json(me.body)
    }
  }

  const refreshed = await tryRefresh(request)
  if (!refreshed.tokens?.access_token) {
    const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (shouldClearAuthCookies(refreshed.status)) return clearAuthCookies(res)
    return res
  }

  const me = await fetchMe(refreshed.tokens.access_token)
  if (!me.ok) {
    const res = NextResponse.json({ error: 'Unauthorized' }, { status: me.status || 401 })
    if (shouldClearAuthCookies(me.status)) return clearAuthCookies(res)
    return res
  }

  const res = NextResponse.json(
    me.body.user ? me.body : { user: refreshed.tokens.user, ...publicAuthBody(me.body) }
  )
  return applyAuthCookies(res, refreshed.tokens)
}
