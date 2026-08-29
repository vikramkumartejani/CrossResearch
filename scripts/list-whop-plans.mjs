/**
 * List Whop plans for your company (prints plan_... IDs for .env.local).
 *
 * Usage:
 *   WHOP_COMPANY_API_KEY=apik_... node scripts/list-whop-plans.mjs
 *
 * Optional:
 *   WHOP_COMPANY_ID=biz_...
 *   WHOP_SANDBOX=false   (default: true for sandbox API)
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
const companyId = (process.env.WHOP_COMPANY_ID || '').trim()
const sandbox = (process.env.WHOP_SANDBOX || 'true').trim().toLowerCase() !== 'false'

if (!apiKey) {
  console.error('Set WHOP_COMPANY_API_KEY first (from Whop → Developer → Company API keys).')
  process.exit(1)
}

const whop = new WhopClient({
  token: apiKey,
  ...(sandbox ? { baseUrl: 'https://sandbox-api.whop.com/api/v1' } : {}),
})

function formatPrice(plan) {
  const renewal = plan.renewal_price ?? plan.initial_price
  const period = plan.billing_period
  if (renewal == null) return '-'
  const interval =
    period === 30 ? '/month' : period === 365 ? '/year' : period ? ` / ${period}d` : ''
  return `$${renewal}${interval}`
}

async function main() {
  console.log(`API: ${sandbox ? 'sandbox' : 'production'}\n`)

  const request = companyId ? { account_id: companyId } : {}
  const iterator = await whop.plans.list(request)

  const plans = []
  for await (const plan of iterator) {
    plans.push(plan)
  }

  if (!plans.length) {
    console.log('No plans found.')
    console.log('Tip: set WHOP_COMPANY_ID=biz_... from your dashboard URL, or create plans first.')
    return
  }

  console.log('Copy the matching plan_... IDs into client/.env.local:\n')
  for (const plan of plans) {
    const title = plan.title || plan.product?.title || '(untitled)'
    console.log(`  ${plan.id}`)
    console.log(`    ${title} — ${formatPrice(plan)}`)
    console.log(`    purchase_url: ${plan.purchase_url || '-'}`)
    console.log('')
  }

  const goldMonthly = plans.find(
    (p) =>
      /gold/i.test(p.title || '') &&
      (p.billing_period === 30 || String(p.formatted_price || '').includes('month')),
  )
  const platinumMonthly = plans.find(
    (p) =>
      /platinum/i.test(p.title || '') &&
      (p.billing_period === 30 || String(p.formatted_price || '').includes('month')),
  )

  if (goldMonthly || platinumMonthly) {
    console.log('Suggested .env lines for what you have now:\n')
    if (goldMonthly) console.log(`WHOP_PLAN_GOLD_MONTHLY=${goldMonthly.id}`)
    if (platinumMonthly) console.log(`WHOP_PLAN_PLATINUM_MONTHLY=${platinumMonthly.id}`)
    console.log('\nAnnual plans: create them in Whop (or run npm run setup:whop) for WHOP_PLAN_*_ANNUAL.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
