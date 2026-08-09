import { NextRequest, NextResponse } from 'next/server'
import { backendAuth } from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}))
  const { ok, status, body } = await backendAuth('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!ok) {
    return NextResponse.json(
      {
        error: 'Could not reset password',
        details: body.detail ?? body,
        detail: body.detail,
      },
      { status }
    )
  }
  return NextResponse.json(body)
}
