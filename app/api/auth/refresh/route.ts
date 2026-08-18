import { NextRequest, NextResponse } from 'next/server'
import {
  REFRESH_COOKIE,
  applyAuthCookies,
  backendAuth,
  clearAuthCookies,
  publicAuthBody,
  shouldClearAuthCookies,
  type AuthTokenPayload,
} from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (!refresh) {
    const res = NextResponse.json({ error: 'Unauthorized', detail: 'No session' }, { status: 401 })
    return clearAuthCookies(res)
  }

  const { ok, status, body } = await backendAuth('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refresh }),
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
      'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
    },
  })

  if (!ok) {
    const res = NextResponse.json(
      { error: 'Unauthorized', details: body.detail ?? body, detail: body.detail },
      { status: status || 401 }
    )
    if (shouldClearAuthCookies(status || 401)) return clearAuthCookies(res)
    return res
  }

  const tokens = body as unknown as AuthTokenPayload
  const res = NextResponse.json(publicAuthBody(body))
  return applyAuthCookies(res, tokens)
}
