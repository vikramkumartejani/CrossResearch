import { NextRequest, NextResponse } from 'next/server'
import { backendAuth } from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}))
  const { ok, status, body } = await backendAuth('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!ok) {
    return NextResponse.json(
      {
        error: 'Could not start password reset',
        details: body.detail ?? body,
        detail: body.detail,
      },
      { status }
    )
  }
  return NextResponse.json(body)
}
