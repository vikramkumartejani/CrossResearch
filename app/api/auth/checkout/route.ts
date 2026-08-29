import { NextRequest, NextResponse } from 'next/server'
import {
  applyAuthCookies,
  backendBase,
  clearAuthCookies,
  resolveAccessToken,
  type AuthTokenPayload,
} from '@/lib/authCookies'
import { getWhopClient, isWhopBillingEnabled, isWhopSandbox, preferHostedWhopCheckout, whopCheckoutCompleteUrl, whopErrorMessage, whopHostedCheckoutUrl, whopStatusCode } from '@/lib/whop'
import {
  isBillingInterval,
  isPaidPlan,
  whopPlanId,
  type BillingInterval,
  type PaidPlanId,
} from '@/lib/whopCatalog'

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
  if (!isWhopBillingEnabled()) {
    return NextResponse.json(
      { error: 'Billing is not configured', details: 'WHOP_COMPANY_API_KEY is missing' },
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
    const planId = whopPlanId(plan as PaidPlanId, interval as BillingInterval)
    const whop = getWhopClient()
    const companyId = (process.env.WHOP_COMPANY_ID || '').trim() || undefined

    const config = await whop.checkoutConfigurations.create({
      ...(companyId ? { account_id: companyId } : {}),
      plan_id: planId,
      mode: 'payment',
      redirect_url: whopCheckoutCompleteUrl(),
      ...(isWhopSandbox() ? { three_ds_level: 'frictionless' as const } : {}),
      metadata: {
        user_id: user.id,
        user_email: user.email,
        plan,
        interval,
        plan_id: planId,
      },
    })

    const sessionId = String((config as { id?: string }).id || '').trim()
    const purchaseUrl = whopHostedCheckoutUrl(
      String((config as { purchase_url?: string }).purchase_url || '').trim(),
    )
    const hosted = preferHostedWhopCheckout()

    if (!sessionId) {
      throw new Error('Whop did not return a checkout session id')
    }
    if (hosted && !purchaseUrl) {
      throw new Error('Whop did not return a hosted checkout URL')
    }

    return finish(
      NextResponse.json({
        sessionId,
        plan,
        interval,
        planId,
        email: user.email,
        purchaseUrl: hosted ? purchaseUrl : undefined,
        mode: hosted ? 'hosted' : 'embed',
      }),
      tokens,
    )
  } catch (err) {
    const message = whopErrorMessage(err)
    const whopStatus = whopStatusCode(err)
    const status = message.includes('HTTPS redirect')
      ? 400
      : whopStatus === 401 || whopStatus === 403
        ? 502
        : 500
    return finish(NextResponse.json({ error: 'Checkout failed', details: message }, { status }), tokens)
  }
}
