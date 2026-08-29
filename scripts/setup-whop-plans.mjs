/**
 * Create CrossResearch subscription plans in Whop sandbox (or production).
 *
 * Usage:
 *   WHOP_COMPANY_API_KEY=apik_... WHOP_SANDBOX=true node scripts/setup-whop-plans.mjs
 *
 * Optional:
 *   WHOP_COMPANY_ID=biz_...   (from your Whop dashboard URL)
 */
import { WhopClient } from '@whop/sdk'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnvFile(path) {
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile(resolve(process.cwd(), '.env.local'))
loadEnvFile(resolve(process.cwd(), '.env'))

const apiKey = (process.env.WHOP_COMPANY_API_KEY || '').trim()
const sandbox = (process.env.WHOP_SANDBOX || 'true').trim().toLowerCase() !== 'false'
const explicitCompanyId = (process.env.WHOP_COMPANY_ID || '').trim()

if (!apiKey) {
  console.error('Set WHOP_COMPANY_API_KEY before running this script.')
  process.exit(1)
}

const whop = new WhopClient({
  token: apiKey,
  ...(sandbox ? { baseUrl: 'https://sandbox-api.whop.com/api/v1' } : {}),
})

async function resolveCompanyId() {
  if (explicitCompanyId) return explicitCompanyId
  const iterator = await whop.companies.list()
  for await (const company of iterator) {
    return company.id
  }
  throw new Error('No company found. Set WHOP_COMPANY_ID=biz_... from your dashboard URL.')
}

async function createPlan(companyId, productId, title, renewalPrice, billingPeriod) {
  const plan = await whop.plans.create({
    company_id: companyId,
    product_id: productId,
    plan_type: 'renewal',
    initial_price: 0,
    renewal_price: renewalPrice,
    billing_period: billingPeriod,
    currency: 'usd',
    visibility: 'hidden',
    release_method: 'buy_now',
    title,
  })
  return plan.id
}

async function main() {
  const companyId = await resolveCompanyId()
  console.log(`Using company: ${companyId}`)
  console.log(`Environment: ${sandbox ? 'sandbox' : 'production'}\n`)

  const goldProduct = await whop.products.create({
    company_id: companyId,
    title: 'CrossResearch Gold Pack',
    visibility: 'hidden',
  })
  const platinumProduct = await whop.products.create({
    company_id: companyId,
    title: 'CrossResearch Platinum Pack',
    visibility: 'hidden',
  })

  const plans = {
    WHOP_PLAN_GOLD_MONTHLY: await createPlan(companyId, goldProduct.id, 'Gold Monthly', 24.99, 30),
    WHOP_PLAN_GOLD_ANNUAL: await createPlan(companyId, goldProduct.id, 'Gold Annual', 21.24, 365),
    WHOP_PLAN_PLATINUM_MONTHLY: await createPlan(companyId, platinumProduct.id, 'Platinum Monthly', 69.99, 30),
    WHOP_PLAN_PLATINUM_ANNUAL: await createPlan(companyId, platinumProduct.id, 'Platinum Annual', 59.49, 365),
  }

  console.log('\nAdd these to client/.env.local:\n')
  console.log(`WHOP_COMPANY_API_KEY=${apiKey}`)
  console.log(`WHOP_COMPANY_ID=${companyId}`)
  console.log(`WHOP_SANDBOX=${sandbox ? 'true' : 'false'}`)
  console.log('NEXT_PUBLIC_APP_URL=http://localhost:3000')
  console.log('WHOP_BILLING_ENABLED=true')
  for (const [key, value] of Object.entries(plans)) {
    console.log(`${key}=${value}`)
  }
  console.log('\nWebhook URL (after deploy or ngrok):')
  console.log('  https://YOUR_HOST/api/auth/webhooks/whop')
  console.log('\nSubscribe to events: payment.succeeded, membership.activated, membership.deactivated')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
