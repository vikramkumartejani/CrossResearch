import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import {
  applyAuthCookies,
  backendBase,
  clearAuthCookies,
  resolveAccessToken,
  type AuthTokenPayload,
} from '@/lib/authCookies'
import {
  billingDescription,
  isBillingInterval,
  isPaidPlan,
  nowpaymentsInvoiceAmountUsd,
  type BillingInterval,
  type PaidPlanId,
} from '@/lib/billingCatalog'
import {
  createNowpaymentsInvoice,
  isNowpaymentsEnabled,
  nowpaymentsCancelUrl,
  nowpaymentsIpnUrl,
  nowpaymentsSuccessUrl,
  resolveNowpaymentsChargeUsd,
} from '@/lib/nowpayments'

export const dynamic = 'force-dynamic'

async function currentUserId(
  access: string,
): Promise<{ id: string; email: string } | null> {
  const res = await fetch(`${backendBase()}/auth/me`, {
    headers: { Authorization: `Bearer ${access}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const body = (await res.json().catch(() => ({}))) as {
    user?: { id?: string; email?: string }
  }
  const id = String(body.user?.id || '').trim()
  const email = String(body.user?.email || '').trim()
  if (!id) return null
  return { id, email }
}

function finish(
  res: NextResponse,
  tokens: AuthTokenPayload | null,
): NextResponse {
  return tokens ? applyAuthCookies(res, tokens) : res
}

export async function POST(request: NextRequest) {
  if (!isNowpaymentsEnabled()) {
    return NextResponse.json(
      { error: 'Crypto billing is not configured', details: 'NOWPAYMENTS_API_KEY is missing' },
      { status: 503 },
    )
  }

  const { access, tokens } = await resolveAccessToken(request)
  if (!access) {
    return finish(clearAuthCookies(NextResponse.json({ error: 'Unauthorized' }, { status: 401 })), tokens)
  }

  const payload = (await request.json().catch(() => ({}))) as {
    plan?: string
    interval?: string
  }
  const plan = String(payload.plan || '').trim().toLowerCase()
  const interval = String(payload.interval || 'monthly').trim().toLowerCase()

  if (!isPaidPlan(plan)) {
    return finish(NextResponse.json({ error: 'Invalid plan' }, { status: 400 }), tokens)
  }
  if (!isBillingInterval(interval)) {
    return finish(NextResponse.json({ error: 'Invalid billing interval' }, { status: 400 }), tokens)
  }

  const user = await currentUserId(access)
  if (!user) {
    return finish(clearAuthCookies(NextResponse.json({ error: 'Unauthorized' }, { status: 401 })), tokens)
  }

  try {
    const paidPlan = plan as PaidPlanId
    const billing = interval as BillingInterval
    const requested = nowpaymentsInvoiceAmountUsd(paidPlan, billing)
    const amount = await resolveNowpaymentsChargeUsd(requested)
    const orderId = `cr:${user.id}:${paidPlan}:${billing}:${randomUUID()}`
    const invoice = await createNowpaymentsInvoice({
      priceAmount: amount,
      orderId,
      orderDescription: billingDescription(paidPlan, billing),
      successUrl: `${nowpaymentsSuccessUrl()}&plan=${paidPlan}`,
      cancelUrl: nowpaymentsCancelUrl(),
      ipnCallbackUrl: nowpaymentsIpnUrl(),
    })

    return finish(
      NextResponse.json({
        invoiceUrl: invoice.invoiceUrl,
        invoiceId: invoice.invoiceId,
        plan: paidPlan,
        interval: billing,
        amount,
        orderId,
        email: user.email,
      }),
      tokens,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Crypto checkout failed'
    return finish(NextResponse.json({ error: 'Checkout failed', details: message }, { status: 500 }), tokens)
  }
}
