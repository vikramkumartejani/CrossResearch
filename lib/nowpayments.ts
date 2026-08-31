import crypto from 'crypto'

export function isNowpaymentsEnabled(): boolean {
  const disabled = (process.env.NOWPAYMENTS_BILLING_ENABLED || '').trim().toLowerCase()
  if (disabled === 'false' || disabled === '0' || disabled === 'no') return false
  return Boolean((process.env.NOWPAYMENTS_API_KEY || '').trim())
}

export function isNowpaymentsSandbox(): boolean {
  const raw = (process.env.NOWPAYMENTS_SANDBOX || '').trim().toLowerCase()
  if (raw === 'false' || raw === '0' || raw === 'no') return false
  if (raw === 'true' || raw === '1' || raw === 'yes') return true
  return process.env.NODE_ENV !== 'production'
}

export function nowpaymentsApiBase(): string {
  return isNowpaymentsSandbox()
    ? 'https://api-sandbox.nowpayments.io/v1'
    : 'https://api.nowpayments.io/v1'
}

export function nowpaymentsRedirectBase(): string {
  const explicit = (
    process.env.NOWPAYMENTS_REDIRECT_URL ||
    process.env.WHOP_REDIRECT_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    ''
  )
    .trim()
    .replace(/\/+$/, '')
  if (explicit.startsWith('https://')) return explicit
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crossresearch.io')
    .trim()
    .replace(/\/+$/, '')
  return site.startsWith('https://') ? site : 'https://crossresearch.io'
}

export function nowpaymentsSuccessUrl(): string {
  return `${nowpaymentsRedirectBase()}/checkout/complete?status=success&provider=crypto`
}

export function nowpaymentsCancelUrl(): string {
  const app = (process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://crossresearch.io')
    .trim()
    .replace(/\/+$/, '')
  return `${app}/#pricing`
}

export function nowpaymentsIpnUrl(): string {
  const base = nowpaymentsRedirectBase()
  return `${base}/api/auth/webhooks/nowpayments`
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

function sortObject(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => sortObject(item as JsonValue))
  }
  if (value && typeof value === 'object') {
    const out: Record<string, JsonValue> = {}
    for (const key of Object.keys(value as Record<string, JsonValue>).sort()) {
      out[key] = sortObject((value as Record<string, JsonValue>)[key])
    }
    return out
  }
  return value
}

export function verifyNowpaymentsIpnSignature(payload: unknown, signature: string, secret: string): boolean {
  const trimmed = signature.trim()
  if (!trimmed || !secret.trim()) return false
  const normalized = sortObject(payload as JsonValue)
  const body = JSON.stringify(normalized)
  const expected = crypto.createHmac('sha512', secret.trim()).update(body).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(trimmed, 'utf8'))
  } catch {
    return expected === trimmed
  }
}

export async function nowpaymentsMinAmountUsd(payCurrency = 'btc'): Promise<number> {
  const apiKey = (process.env.NOWPAYMENTS_API_KEY || '').trim()
  if (!apiKey) {
    return 20
  }

  const query = new URLSearchParams({
    currency_from: 'usd',
    currency_to: payCurrency,
    fiat_equivalent: 'usd',
    is_fixed_rate: 'true',
    is_fee_paid_by_user: 'false',
  })

  const res = await fetch(`${nowpaymentsApiBase()}/min-amount?${query}`, {
    headers: { 'x-api-key': apiKey },
    cache: 'no-store',
  })
  const body = (await res.json().catch(() => ({}))) as {
    fiat_equivalent?: number | string
    min_amount?: number | string
    message?: string
  }

  if (!res.ok) {
    return 20
  }

  const fiat = Number(body.fiat_equivalent ?? body.min_amount)
  if (!Number.isFinite(fiat) || fiat <= 0) {
    return 20
  }

  return Math.ceil(fiat * 100) / 100
}

export async function resolveNowpaymentsChargeUsd(
  requestedUsd: number,
  payCurrency = 'btc',
): Promise<number> {
  const minimum = await nowpaymentsMinAmountUsd(payCurrency)
  return Math.max(requestedUsd, minimum)
}

export async function createNowpaymentsInvoice(input: {
  priceAmount: number
  orderId: string
  orderDescription: string
  successUrl: string
  cancelUrl: string
  ipnCallbackUrl: string
}): Promise<{ invoiceUrl: string; invoiceId: string }> {
  const apiKey = (process.env.NOWPAYMENTS_API_KEY || '').trim()
  if (!apiKey) {
    throw new Error('NOWPAYMENTS_API_KEY is not configured')
  }

  const res = await fetch(`${nowpaymentsApiBase()}/invoice`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount: input.priceAmount,
      price_currency: 'usd',
      order_id: input.orderId,
      order_description: input.orderDescription,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      ipn_callback_url: input.ipnCallbackUrl,
      is_fixed_rate: true,
      is_fee_paid_by_user: false,
    }),
    cache: 'no-store',
  })

  const body = (await res.json().catch(() => ({}))) as {
    invoice_url?: string
    id?: string | number
    message?: string
    status?: boolean
  }

  if (!res.ok) {
    const detail = body.message || JSON.stringify(body)
    throw new Error(typeof detail === 'string' ? detail : 'NOWPayments invoice failed')
  }

  const invoiceUrl = String(body.invoice_url || '').trim()
  const invoiceId = String(body.id || '').trim()
  if (!invoiceUrl) {
    throw new Error('NOWPayments did not return an invoice URL')
  }

  return { invoiceUrl, invoiceId }
}
