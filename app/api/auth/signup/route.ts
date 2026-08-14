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
  // Referral attribution: the ?ref= landing cookie links this signup to an affiliate
  const ref = request.cookies.get('cr_ref')?.value
  if (ref && !payload.ref) payload.ref = ref
  const { ok, status, body } = await backendAuth('/auth/signup', {
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
        error: 'Signup failed',
        details: body.detail ?? body,
        detail: body.detail,
      },
      { status }
    )
  }

  // OTP pending — no cookies yet
  if (body.needs_verification) {
    return NextResponse.json(publicAuthBody(body))
  }

  const tokens = body as unknown as AuthTokenPayload
  const res = NextResponse.json(publicAuthBody(body))
  return applyAuthCookies(res, tokens)
}
