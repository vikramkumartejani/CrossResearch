import { NextRequest, NextResponse } from 'next/server'
import {
  REFRESH_COOKIE,
  backendAuth,
  clearAuthCookies,
} from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (refresh) {
    await backendAuth('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refresh }),
    }).catch(() => null)
  }
  const res = NextResponse.json({ ok: true })
  return clearAuthCookies(res)
}
