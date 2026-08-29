import { WhopClient } from '@whop/sdk'

let client: WhopClient | null = null
let clientKey = ''

export function isWhopBillingEnabled(): boolean {
  const disabled = (process.env.WHOP_BILLING_ENABLED || '').trim().toLowerCase()
  if (disabled === 'false' || disabled === '0' || disabled === 'no') return false
  return Boolean((process.env.WHOP_COMPANY_API_KEY || '').trim())
}

export function isWhopSandbox(): boolean {
  const raw = (process.env.WHOP_SANDBOX || '').trim().toLowerCase()
  return raw === 'true' || raw === '1' || raw === 'yes'
}

export function appOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  ).replace(/\/+$/, '')
}

/** Whop requires redirect URLs to use https:// (sandbox and production). */
export function whopRedirectBase(): string {
  const explicit = (
    process.env.WHOP_REDIRECT_URL ||
    process.env.NEXT_PUBLIC_WHOP_REDIRECT_URL ||
    ''
  )
    .trim()
    .replace(/\/+$/, '')
  if (explicit) return explicit

  const origin = appOrigin()
  if (origin.startsWith('https://')) return origin

  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crossresearch.io')
    .trim()
    .replace(/\/+$/, '')
  if (site.startsWith('https://')) return site

  return origin
}

export function whopCheckoutCompleteUrl(opts?: { plan?: string; interval?: string }): string {
  const base = whopRedirectBase()
  if (!base.startsWith('https://')) {
    throw new Error(
      'Whop requires an HTTPS redirect URL. Set WHOP_REDIRECT_URL (e.g. https://crossresearch.io or your ngrok URL).',
    )
  }
  const url = new URL(`${base}/checkout/complete`)
  url.searchParams.set('status', 'success')
  if (opts?.plan) url.searchParams.set('plan', opts.plan)
  if (opts?.interval) url.searchParams.set('interval', opts.interval)
  return url.toString()
}

export function whopStatusCode(err: unknown): number | undefined {
  if (err && typeof err === 'object' && 'statusCode' in err) {
    const code = Number((err as { statusCode?: number }).statusCode)
    if (Number.isFinite(code) && code > 0) return code
  }
  return undefined
}

export function whopErrorMessage(err: unknown): string {
  let apiMsg = ''
  if (err && typeof err === 'object') {
    const body = (err as { body?: { error?: { message?: string } } }).body
    if (typeof body?.error?.message === 'string') apiMsg = body.error.message.trim()
  }
  if (!apiMsg && err instanceof Error) apiMsg = err.message

  const status = whopStatusCode(err)
  if (status === 401 || /authentication failed/i.test(apiMsg)) {
    if (isWhopSandbox()) {
      return 'Whop sandbox rejected this API key. Create a company API key at https://sandbox.whop.com (not whop.com).'
    }
    return 'Whop rejected the company API key. Check WHOP_COMPANY_API_KEY.'
  }

  return apiMsg || 'Checkout failed'
}

export function whopHostedCheckoutUrl(purchaseUrl: string): string {
  // Use the API URL as-is. Sandbox checkout sessions are not valid on
  // sandbox.whop.com/checkout/ch_* (that rewrite caused 404s).
  return purchaseUrl.trim()
}

/** Always use Whop's hosted checkout page unless explicitly disabled. */
export function preferHostedWhopCheckout(): boolean {
  const raw = (process.env.WHOP_HOSTED_CHECKOUT || '').trim().toLowerCase()
  if (raw === 'false' || raw === '0' || raw === 'no') return false
  return true
}

/** Return URL for the embedded checkout iframe (can be localhost in sandbox). */
export function whopEmbedReturnUrl(): string {
  if (isWhopSandbox()) {
    return `${appOrigin()}/checkout/complete?status=success`
  }
  return whopCheckoutCompleteUrl()
}

export function getWhopClient(): WhopClient {
  const apiKey = (process.env.WHOP_COMPANY_API_KEY || '').trim()
  if (!apiKey) {
    throw new Error('WHOP_COMPANY_API_KEY is not configured')
  }

  const key = `${isWhopSandbox() ? 'sandbox' : 'live'}:${apiKey}`
  if (!client || clientKey !== key) {
    clientKey = key
    client = new WhopClient({
      token: apiKey,
      ...(isWhopSandbox()
        ? { baseUrl: 'https://sandbox-api.whop.com/api/v1' }
        : {}),
    })
  }

  return client
}
