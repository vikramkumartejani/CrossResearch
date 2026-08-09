import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  applyAuthCookies,
  backendAuth,
  backendBase,
  clearAuthCookies,
  type AuthTokenPayload,
} from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

async function ensureAccess(request: NextRequest): Promise<{
  access: string | null
  tokens: AuthTokenPayload | null
}> {
  let access = request.cookies.get(ACCESS_COOKIE)?.value || null
  if (access) return { access, tokens: null }

  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (!refresh) return { access: null, tokens: null }

  const { ok, body } = await backendAuth('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refresh }),
  })
  if (!ok) return { access: null, tokens: null }
  const tokens = body as unknown as AuthTokenPayload
  return { access: tokens.access_token, tokens }
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}))
  const { access, tokens } = await ensureAccess(request)
  if (!access) {
    const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return clearAuthCookies(res)
  }

  const response = await fetch(`${backendBase()}/auth/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>
  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to update plan', details: body.detail ?? body, detail: body.detail },
      { status: response.status }
    )
  }

  const res = NextResponse.json(body)
  if (tokens) applyAuthCookies(res, tokens)
  return res
}
