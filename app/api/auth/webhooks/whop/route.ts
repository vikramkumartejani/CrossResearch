import { NextRequest, NextResponse } from 'next/server'
import { unwrapWebhook } from '@whop/sdk/helpers'
import { backendBase } from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

type WhopWebhookEvent = {
  type?: string
  data?: Record<string, unknown>
}

async function forwardToBackend(event: WhopWebhookEvent): Promise<Response> {
  const adminKey = (process.env.ADMIN_API_KEY || '').trim()
  if (!adminKey) {
    throw new Error('ADMIN_API_KEY is required to apply Whop webhooks')
  }

  const res = await fetch(`${backendBase()}/billing/whop/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: JSON.stringify({
      event_type: event.type,
      data: event.data || {},
    }),
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
  const secret = (process.env.WHOP_WEBHOOK_SECRET || '').trim()
  if (!secret) {
    return NextResponse.json({ error: 'WHOP_WEBHOOK_SECRET is not configured' }, { status: 503 })
  }

  const payload = await request.text()
  const headers = Object.fromEntries(request.headers)

  try {
    const event = unwrapWebhook(payload, { headers, key: secret }) as WhopWebhookEvent
    return await forwardToBackend(event)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid webhook'
    return NextResponse.json({ error: 'Webhook verification failed', details: message }, { status: 401 })
  }
}
