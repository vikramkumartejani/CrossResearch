import { NextRequest, NextResponse } from 'next/server'
import {
  applyAuthCookies,
  backendBase,
  clearAuthCookies,
  resolveAccessToken,
  type AuthTokenPayload,
} from '@/lib/authCookies'
import { getWhopClient, isWhopBillingEnabled, whopErrorMessage } from '@/lib/whop'
import { isPaidPlan, type PaidPlanId } from '@/lib/whopCatalog'

export const dynamic = 'force-dynamic'

type PaymentRow = {
  id?: string
  status?: string | null
  created_at?: string
  checkout_configuration_id?: string | null
  metadata?: Record<string, unknown> | null
  plan?: { id?: string } | null
  product?: { id?: string; title?: string } | null
  membership?: { id?: string } | null
}

function finish(res: NextResponse, tokens: AuthTokenPayload | null): NextResponse {
  return tokens ? applyAuthCookies(res, tokens) : res
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: NextRequest) {
  if (!isWhopBillingEnabled()) {
    return NextResponse.json({ error: 'Billing is not configured' }, { status: 503 })
  }

  const { access, tokens } = await resolveAccessToken(request)
  if (!access) {
    return finish(clearAuthCookies(NextResponse.json({ error: 'Unauthorized' }, { status: 401 })), tokens)
  }

  const meRes = await fetch(`${backendBase()}/auth/me`, {
    headers: { Authorization: `Bearer ${access}` },
    cache: 'no-store',
  })
  if (!meRes.ok) {
    return finish(clearAuthCookies(NextResponse.json({ error: 'Unauthorized' }, { status: 401 })), tokens)
  }
  const meBody = (await meRes.json().catch(() => ({}))) as {
    user?: { id?: string; email?: string }
  }
  const userId = asString(meBody.user?.id)
  const email = asString(meBody.user?.email)
  if (!userId || !email) {
    return finish(clearAuthCookies(NextResponse.json({ error: 'Unauthorized' }, { status: 401 })), tokens)
  }

  const body = (await request.json().catch(() => ({}))) as { plan?: string }
  const expectedPlan = asString(body.plan).toLowerCase()

  try {
    const whop = getWhopClient()
    const companyId = (process.env.WHOP_COMPANY_ID || '').trim()
    const iterator = await whop.payments.list({
      ...(companyId ? { company_id: companyId } : {}),
      query: email,
      statuses: 'paid',
      first: 20,
    })

    const paid: PaymentRow[] = []
    for await (const payment of iterator) {
      paid.push(payment as PaymentRow)
    }

    const cutoff = Date.now() - 48 * 60 * 60 * 1000
    const match = paid.find((payment) => {
      if (String(payment.status || '').toLowerCase() !== 'paid') return false
      const created = Date.parse(String(payment.created_at || ''))
      if (Number.isFinite(created) && created < cutoff) return false
      const meta = payment.metadata && typeof payment.metadata === 'object' ? payment.metadata : {}
      const metaUser = asString(meta.user_id || meta.userId)
      const metaEmail = asString(meta.user_email || meta.email).toLowerCase()
      if (metaUser && metaUser === userId) return true
      if (metaEmail && metaEmail === email.toLowerCase()) return true
      return false
    })

    if (!match) {
      return finish(
        NextResponse.json({ error: 'No paid Whop checkout found for this account yet' }, { status: 404 }),
        tokens,
      )
    }

    const meta = match.metadata && typeof match.metadata === 'object' ? match.metadata : {}
    const adminKey = (process.env.ADMIN_API_KEY || '').trim()
    if (!adminKey) {
      throw new Error('ADMIN_API_KEY is required to apply billing')
    }

    const applyRes = await fetch(`${backendBase()}/billing/whop/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': adminKey,
      },
      body: JSON.stringify({
        event_type: 'payment.succeeded',
        data: {
          id: match.id,
          plan_id: match.plan?.id,
          product_id: match.product?.id,
          product_title: match.product?.title,
          membership_id: match.membership?.id,
          plan: match.plan,
          product: match.product,
          metadata: {
            ...meta,
            user_id: asString(meta.user_id) || userId,
            user_email: asString(meta.user_email) || email,
            plan: asString(meta.plan) || (isPaidPlan(expectedPlan) ? expectedPlan : ''),
          },
        },
      }),
      cache: 'no-store',
    })
    const applyBody = (await applyRes.json().catch(() => ({}))) as {
      plan?: string
      detail?: string
      user?: { plan?: string }
    }
    if (!applyRes.ok) {
      throw new Error(typeof applyBody.detail === 'string' ? applyBody.detail : 'Could not apply paid plan')
    }

    const plan = (applyBody.plan || applyBody.user?.plan || expectedPlan) as PaidPlanId | string
    return finish(NextResponse.json({ ok: true, plan }), tokens)
  } catch (err) {
    return finish(
      NextResponse.json({ error: 'Checkout confirm failed', details: whopErrorMessage(err) }, { status: 500 }),
      tokens,
    )
  }
}
