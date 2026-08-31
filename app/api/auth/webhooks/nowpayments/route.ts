import { NextRequest, NextResponse } from 'next/server'
import { backendBase } from '@/lib/authCookies'
import { isNowpaymentsEnabled, verifyNowpaymentsIpnSignature } from '@/lib/nowpayments'

export const dynamic = 'force-dynamic'

async function forwardToBackend(payload: Record<string, unknown>): Promise<Response> {
  const adminKey = (process.env.ADMIN_API_KEY || '').trim()
  if (!adminKey) {
    throw new Error('ADMIN_API_KEY is required to apply NOWPayments webhooks')
  }

  const res = await fetch(`${backendBase()}/billing/nowpayments/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: JSON.stringify({ payload }),
    cache: 'no-store',
  })

  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail =
      typeof (body as { detail?: unknown }).detail === 'string'
        ? (body as { detail: string }).detail
        : 'Backend billing apply failed'
    throw new Error(detail)
  }

  return NextResponse.json(body)
}

export async function POST(request: NextRequest) {
  if (!isNowpaymentsEnabled()) {
    return NextResponse.json({ error: 'NOWPayments billing is not configured' }, { status: 503 })
  }

  const secret = (process.env.NOWPAYMENTS_IPN_SECRET || '').trim()
  if (!secret) {
    return NextResponse.json({ error: 'NOWPAYMENTS_IPN_SECRET is not configured' }, { status: 503 })
  }

  const signature = request.headers.get('x-nowpayments-sig') || ''
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'Invalid IPN payload' }, { status: 400 })
  }

  if (!verifyNowpaymentsIpnSignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 401 })
  }

  try {
    return await forwardToBackend(payload)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Billing apply failed'
    return NextResponse.json({ error: 'Webhook processing failed', details: message }, { status: 500 })
  }
}
