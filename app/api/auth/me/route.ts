import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  applyAuthCookies,
  backendAuth,
  backendBase,
  clearAuthCookies,
  publicAuthBody,
  type AuthTokenPayload,
} from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

async function tryRefresh(request: NextRequest) {
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
  if (!ok) return null
  return body as unknown as AuthTokenPayload & { user?: unknown }
}

export async function GET(request: NextRequest) {
  let access = request.cookies.get(ACCESS_COOKIE)?.value
  let refreshed: (AuthTokenPayload & { user?: unknown }) | null = null

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

  refreshed = await tryRefresh(request)
  if (!refreshed?.access_token) {
    const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return clearAuthCookies(res)
  }

  const me = await fetchMe(refreshed.access_token)
  if (!me.ok) {
    const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return clearAuthCookies(res)
  }

  const res = NextResponse.json(me.body.user ? me.body : { user: refreshed.user, ...publicAuthBody(me.body) })
  return applyAuthCookies(res, refreshed)
}
