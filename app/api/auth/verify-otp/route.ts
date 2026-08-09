import { NextRequest, NextResponse } from 'next/server'
import {
  applyAuthCookies,
  backendAuth,
  publicAuthBody,
  type AuthTokenPayload,
} from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}))
  const { ok, status, body } = await backendAuth('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
      'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
    },
  })

  if (!ok) {
    return NextResponse.json(
      {
        error: 'Verification failed',
        details: body.detail ?? body,
        detail: body.detail,
      },
      { status }
    )
  }

  const tokens = body as unknown as AuthTokenPayload
  const res = NextResponse.json(publicAuthBody(body))
  return applyAuthCookies(res, tokens)
}
