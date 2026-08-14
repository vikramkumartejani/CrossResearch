'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { siteUrl } from '@/lib/site'

interface FunnelDay {
  date: string
  clicks: number
  signups: number
  conversions: number
}

interface ClientRow {
  id: string
  name: string
  email: string
  status: 'Subscribed' | 'Cancelled' | 'Never Subscribed'
  plan: string
  plan_label: string
  joined?: string | null
  mrr: number
}

interface PayoutRow {
  id: string
  amount: number
  method: string
  status: string
  created_at?: string | null
}

interface DashboardData {
  affiliate: {
    name: string
    email: string
    status: 'pending' | 'approved' | 'suspended'
    referral_code: string
    commission_rate: number
  }
  stats: {
    total_referrals: number
    active_subscribers: number
    mrr_contribution: number
    monthly_commission: number
    churn_30d: number
    deltas?: {
      referrals: number
      subs: number
      mrr: number
      churn: number
    }
  }
  earnings: {
    lifetime: number
    paid: number
    pending: number
    available: number
    min_payout: number
  }
  funnel: FunnelDay[]
  clients: ClientRow[]
  payouts: PayoutRow[]
}

const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

function formatDate(iso?: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const STATUS_BADGE: Record<string, string> = {
  Subscribed: 'bg-[#2CB37B1F] text-[#2CB37B]',
  Cancelled: 'bg-[#E25C3F1F] text-[#E25C3F]',
  'Never Subscribed': 'bg-[#FFFFFF08] text-[#838388]',
}

type SeriesKey = 'clicks' | 'signups' | 'conversions'

/** Round the axis top up to a clean step so labels read 0 / 15 / 30 / 45 / 60. */
function niceTop(max: number): number {
  const steps = [1, 2, 5, 10, 15, 20, 25, 50, 100, 200, 250, 500, 1000]
  const raw = Math.max(1, max) / 4
  const step = steps.find((s) => s >= raw) ?? Math.ceil(raw / 1000) * 1000
  return step * 4
}

/** Catmull-Rom smoothing so the lines curve like a real analytics chart. */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (!pts.length) return ''
  if (pts.length < 3) {
    return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  }
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

/** Hand-rolled 3-series area chart (no chart lib in the project). */
function FunnelChart({ days }: { days: FunnelDay[] }) {
  const W = 1000
  const H = 260
  const TOP_PAD = 6
  const max = Math.max(1, ...days.map((d) => Math.max(d.clicks, d.signups, d.conversions)))
  const top = niceTop(max)

  const x = (i: number) => (i * W) / Math.max(1, days.length - 1)
  const y = (v: number) => H - ((H - TOP_PAD) * v) / top

  const pts = (key: SeriesKey) => days.map((d, i) => ({ x: x(i), y: y(d[key]) }))
  const line = (key: SeriesKey) => smoothPath(pts(key))
  const area = (key: SeriesKey) => `${line(key)} L${W},${H} L0,${H} Z`

  const yTicks = [top, (top * 3) / 4, top / 2, top / 4, 0]
  const xTicks = days.length > 5 ? [0, 5, 10, 15, 20, 25] : days.map((_, i) => i)

  return (
    <div>
      <div className="flex gap-2">
        {/* Y axis labels */}
        <div className="flex flex-col justify-between text-right text-[10px] text-[#838388] w-6 shrink-0 h-[220px] sm:h-[260px] -my-[5px]">
          {yTicks.map((t) => (
            <span key={t} className="leading-[10px]">
              {t}
            </span>
          ))}
        </div>

        {/* Plot */}
        <div className="relative flex-1 min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px] sm:h-[260px]" preserveAspectRatio="none">
            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                x1={0}
                x2={W}
                y1={TOP_PAD + f * (H - TOP_PAD)}
                y2={TOP_PAD + f * (H - TOP_PAD)}
                stroke="#FFFFFF0D"
                strokeDasharray={f === 1 ? undefined : '4 6'}
              />
            ))}
            <path d={area('clicks')} fill="url(#affGradClicks)" />
            <path d={area('signups')} fill="url(#affGradSignups)" />
            <path d={area('conversions')} fill="url(#affGradConversions)" />
            <path d={line('clicks')} fill="none" stroke="#3E5A7E" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={line('signups')} fill="none" stroke="#88C4FF" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={line('conversions')} fill="none" stroke="#2CB37B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <defs>
              <linearGradient id="affGradClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22406B" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#101825" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="affGradSignups" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#88C4FF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#88C4FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="affGradConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2CB37B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2CB37B" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* X axis labels */}
          <div className="relative h-[16px] mt-1.5">
            {xTicks.map((i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 text-[10px] text-[#838388] whitespace-nowrap"
                style={{ left: `${(i / Math.max(1, days.length - 1)) * 100}%` }}
              >
                D{i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** "↗ +3 vs Prev" trend row under each stat value. */
function DeltaRow({ value, isMoney = false, invert = false }: { value: number; isMoney?: boolean; invert?: boolean }) {
  const good = invert ? value < 0 : value > 0
  const color = value === 0 ? 'text-[#838388]' : good ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
  const abs = Math.abs(value)
  const label = isMoney ? `$${abs % 1 ? abs.toFixed(2) : abs}` : String(abs)
  return (
    <p className={`flex items-center gap-1 text-[11px] mt-2 ${color}`}>
      {value !== 0 && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={value < 0 ? 'rotate-90' : ''}
        >
          <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span>
        {value > 0 ? '+' : value < 0 ? '-' : ''}
        {label} vs Prev
      </span>
    </p>
  )
}

function StatIcon({ path }: { path: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d={path} stroke="#838388" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ICONS = {
  wallet: 'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M21 7h-6a2.5 2.5 0 0 0 0 5h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  userCheck: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 11l2 2 4-4',
  dollar: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  churn: 'M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6',
}

function PartnerDeskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 15v-1.5A3 3 0 0 0 9 10.5H4.5a3 3 0 0 0-3 3V15M6.75 7.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 15v-1.5a3 3 0 0 0-2.25-2.9M11.25 1.6a3 3 0 0 1 0 5.81"
        stroke="#838388"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function AffiliateCenter() {
  const router = useRouter()

  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notAffiliate, setNotAffiliate] = useState(false)
  const [tab, setTab] = useState<'All' | ClientRow['status']>('All')
  const [search, setSearch] = useState('')
  const [showPayout, setShowPayout] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState('')
  const [requesting, setRequesting] = useState(false)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/affiliate/dashboard', { cache: 'no-store' })
      const body = await res.json().catch(() => ({}))
      if (res.status === 401) {
        router.replace('/login?next=/affiliate-center')
        return
      }
      if (res.status === 403) {
        setNotAffiliate(true)
        return
      }
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string' ? body.details : body.detail || body.error || 'Failed to load'
        )
      }
      setData(body as DashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    void load()
  }, [load])

  async function requestPayout(e: React.FormEvent) {
    e.preventDefault()
    try {
      setRequesting(true)
      const res = await fetch('/api/affiliate/payout-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: payoutMethod }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string' ? body.details : body.detail || body.error || 'Request failed'
        )
      }
      toast.success(body.message || 'Payout requested.')
      setShowPayout(false)
      setPayoutMethod('')
      await load()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setRequesting(false)
    }
  }

  const referralCode = data?.affiliate.referral_code || ''
  const referralLink = referralCode ? `${siteUrl()}/signup?ref=${referralCode}` : ''

  function copyText(text: string, label: string) {
    if (!text) return
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`${label} copied`))
      .catch(() => toast.error('Could not copy'))
  }

  const filteredClients = useMemo(() => {
    if (!data) return []
    const q = search.trim().toLowerCase()
    return data.clients.filter((c) => {
      if (tab !== 'All' && c.status !== tab) return false
      if (q && !`${c.name} ${c.email}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [data, tab, search])

  const tabCounts = useMemo(() => {
    const counts = { All: 0, Subscribed: 0, Cancelled: 0, 'Never Subscribed': 0 }
    for (const c of data?.clients || []) {
      counts.All += 1
      counts[c.status] += 1
    }
    return counts
  }, [data])

  const payoutTotal = (data?.payouts || [])
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const header = (
    <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
      <div className="mb-3 flex items-center gap-1.5">
        <PartnerDeskIcon />
        <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Partner Desk</span>
      </div>
      <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
        Affiliate Center
      </h1>
      <p className="text-[#838388] text-[12px] leading-[17px]">
        Track every client you bring in — subscription status, contribution, and payouts. Updates in real time.
      </p>
    </div>
  )

  // ── Render states ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div>
        {header}
        <p className="px-4 lg:px-6 text-white/40 text-[13px]">Loading your referral desk…</p>
      </div>
    )
  }

  if (notAffiliate) {
    return (
      <div>
        {header}
        <div className="px-4 lg:px-6 pb-8">
          <div className="bg-[#16161F] border border-[#FFFFFF0D] max-w-md p-5">
            <h2 className="text-white text-[16px] font-semibold mb-2">Not an affiliate account</h2>
            <p className="text-[#838388] text-[13px] leading-[19px] mb-4">
              This page is for CrossResearch affiliate partners. Apply with a separate partner
              account to get your referral link.
            </p>
            <Link
              href="/affiliate/signup"
              className="inline-flex items-center h-[33px] px-6 bg-[#88C4FF] text-black text-[14px] leading-5 font-medium hover:bg-[#88C4FF]/90 transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div>
        {header}
        <div className="px-4 lg:px-6 pb-8">
          <p className="text-[#E25C3F] text-[13px] mb-3">{error || 'Something went wrong'}</p>
          <button
            onClick={() => void load()}
            className="inline-flex items-center h-[33px] px-6 bg-[#16161F] border border-[#FFFFFF0D] text-white text-[14px] hover:bg-[#1A1A24] transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (data.affiliate.status !== 'approved') {
    const suspended = data.affiliate.status === 'suspended'
    return (
      <div>
        {header}
        <div className="px-4 lg:px-6 pb-8">
          <div className="bg-[#16161F] border border-[#FFFFFF0D] max-w-md p-5">
            <span
              className={`inline-block px-2 py-0.5 text-[11px] mb-3 ${
                suspended ? 'bg-[#E25C3F1F] text-[#E25C3F]' : 'bg-[#F5A6231F] text-[#F5A623]'
              }`}
            >
              {suspended ? 'Account suspended' : 'Application under review'}
            </span>
            <h2 className="text-white text-[16px] font-semibold mb-2">
              {suspended
                ? 'Your partner account is suspended'
                : `Thanks, ${data.affiliate.name.split(' ')[0] || 'partner'}!`}
            </h2>
            <p className="text-[#838388] text-[13px] leading-[19px]">
              {suspended
                ? 'Contact support if you believe this is a mistake.'
                : 'Our team is reviewing your affiliate application. You will get access to your referral link and dashboard once approved — usually within 1–2 business days.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Approved dashboard ───────────────────────────────────────────────────

  return (
    <div>
      {header}

      <div className="px-4 lg:px-6 pb-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="bg-[#16161F] border border-[#FFFFFF0D] p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <StatIcon path={ICONS.wallet} />
              <p className="text-[#838388] text-[12px] leading-[14px]">Available Balance</p>
            </div>
            <p className="text-white text-[26px] font-semibold leading-8">{money(data.earnings.available)}</p>
            <p className="text-[11px] text-[#838388] mt-1">
              Lifetime: <span className="text-white/70">{money(data.earnings.lifetime)}</span> · Pending:{' '}
              <span className="text-white/70">{money(data.earnings.pending)}</span>
            </p>
            <button
              onClick={() => setShowPayout(true)}
              className="mt-3 inline-flex items-center h-[33px] px-6 bg-[#88C4FF] text-black text-[13px] leading-5 font-medium hover:bg-[#88C4FF]/90 transition-colors cursor-pointer"
            >
              Request Payout
            </button>
            <div className="mt-4">
              <p className="text-[#838388] text-[11px] mb-1">Your Referral Link</p>
              <button
                onClick={() => copyText(referralLink, 'Referral link')}
                title="Copy referral link"
                className="w-full flex items-center gap-2 bg-[#FFFFFF08] border border-[#FFFFFF0D] px-3 py-2 text-left text-[11px] text-white/70 hover:bg-[#FFFFFF0D] transition-colors cursor-pointer"
              >
                <span className="truncate">{referralLink.replace(/^https?:\/\//, '')}</span>
                <svg className="ml-auto flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <p className="text-[#838388] text-[11px] mb-1 mt-3">Referral Code</p>
              <button
                onClick={() => copyText(referralCode, 'Referral code')}
                title="Copy referral code"
                className="w-full flex items-center gap-2 bg-[#FFFFFF08] border border-[#FFFFFF0D] px-3 py-2 text-left text-[11px] text-white/70 hover:bg-[#FFFFFF0D] transition-colors cursor-pointer"
              >
                <span className="truncate font-mono tracking-wide">{referralCode}</span>
                <svg className="ml-auto flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>
          </div>

          {[
            {
              label: 'Total Referrals',
              value: String(data.stats.total_referrals),
              icon: ICONS.users,
              delta: data.stats.deltas?.referrals ?? 0,
            },
            {
              label: 'Active Subscribers',
              value: String(data.stats.active_subscribers),
              icon: ICONS.userCheck,
              delta: data.stats.deltas?.subs ?? 0,
            },
            {
              label: 'MRR Contribution',
              value: money(data.stats.mrr_contribution),
              icon: ICONS.dollar,
              delta: data.stats.deltas?.mrr ?? 0,
              isMoney: true,
              extra: (
                <p className="text-[11px] text-[#838388] mt-1">
                  Your cut ({Math.round(data.affiliate.commission_rate * 100)}%):{' '}
                  <span className="text-[#2CB37B]">{money(data.stats.monthly_commission)}/mo</span>
                </p>
              ),
            },
            {
              label: 'Churn (30D)',
              value: String(data.stats.churn_30d),
              icon: ICONS.churn,
              delta: data.stats.deltas?.churn ?? 0,
              invert: true,
              bad: data.stats.churn_30d > 0,
            },
          ].map((c) => (
            <div key={c.label} className="bg-[#16161F] border border-[#FFFFFF0D] p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <StatIcon path={c.icon} />
                <p className="text-[#838388] text-[12px] leading-[14px]">{c.label}</p>
              </div>
              <p className={`text-[26px] font-semibold leading-8 ${c.bad ? 'text-[#E25C3F]' : 'text-white'}`}>
                {c.value}
              </p>
              {c.extra}
              <DeltaRow value={c.delta} isMoney={c.isMoney} invert={c.invert} />
            </div>
          ))}
        </div>

        {/* Funnel chart */}
        <div className="bg-[#16161F] border border-[#FFFFFF0D] p-4 mb-3 sm:mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <p className="text-white text-[14px] font-medium">Referral Funnel · 30d</p>
              <p className="text-[#838388] text-[11px]">Clicks · Sign-Ups · Paid Conversions across your link</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#838388]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-[3px] bg-[#8AA3C2] inline-block" /> Clicks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-[3px] bg-[#88C4FF] inline-block" /> Sign-Ups
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-[3px] bg-[#2CB37B] inline-block" /> Conversions
              </span>
            </div>
          </div>
          <FunnelChart days={data.funnel} />
        </div>

        {/* Clients + payouts */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-3 sm:gap-4">
          <div className="bg-[#16161F] border border-[#FFFFFF0D] overflow-hidden">
            <div className="p-4 pb-3">
              <p className="text-white text-[14px] font-medium">Referral Clients</p>
              <p className="text-[#838388] text-[11px]">Subscription status, plan and contribution per client</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-3">
              <div className="overflow-x-auto">
                <div className="flex items-center sm:gap-2 p-1 bg-[#0F0F18] w-fit border border-[#FFFFFF0D] min-w-max">
                  {(['All', 'Subscribed', 'Cancelled', 'Never Subscribed'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1 text-[13px] leading-[20px] transition-colors cursor-pointer whitespace-nowrap ${
                        tab === t
                          ? 'text-white bg-[#FFFFFF0D] font-semibold'
                          : 'font-normal text-[#838388] hover:text-white/70'
                      }`}
                    >
                      {t} {tabCounts[t]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0F0F18] border border-[#FFFFFF0D] px-3 py-[7px] w-full sm:w-[220px]">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                  <path d="M12.75 12.75L15.75 15.75" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25Z" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name or email"
                  className="bg-transparent text-white text-[12px] leading-[17px] placeholder:text-[#838388] outline-none w-full"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-[13px]">
                <thead>
                  <tr className="border-y border-[#FFFFFF0D] text-left text-[#838388] text-[11px] uppercase">
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Plan</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium text-right">MRR</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((c) => (
                    <tr key={c.id} className="border-b border-[#FFFFFF08]">
                      <td className="px-4 py-3 text-white whitespace-nowrap">{c.name || '—'}</td>
                      <td className="px-4 py-3 text-[#838388]">{c.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 text-[11px] ${STATUS_BADGE[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#838388] whitespace-nowrap">{c.plan_label}</td>
                      <td className="px-4 py-3 text-[#838388] whitespace-nowrap">{formatDate(c.joined)}</td>
                      <td className={`px-4 py-3 text-right ${c.mrr > 0 ? 'text-[#2CB37B]' : 'text-[#838388]'}`}>
                        {c.mrr > 0 ? money(c.mrr) : '—'}
                      </td>
                    </tr>
                  ))}
                  {!filteredClients.length && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-[#838388]">
                        {data.clients.length
                          ? 'No clients match this filter.'
                          : 'No referrals yet — share your link to get started.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#16161F] border border-[#FFFFFF0D] p-4 h-fit">
            <p className="text-white text-[14px] font-medium">Payout History</p>
            <p className="text-[#838388] text-[11px] mb-3">Your affiliate payout requests</p>
            <div className="divide-y divide-[#FFFFFF08]">
              {data.payouts.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-[12px] text-[#838388]">{formatDate(p.created_at)}</p>
                    <p className="text-[12px] text-white/70 truncate">{p.method || 'Payout'}</p>
                  </div>
                  <p className="ml-auto text-white text-[13px] font-medium whitespace-nowrap">{money(p.amount)}</p>
                  <span
                    className={`text-[10px] uppercase font-semibold px-2 py-0.5 ${
                      p.status === 'paid'
                        ? 'bg-[#2CB37B1F] text-[#2CB37B]'
                        : p.status === 'rejected'
                          ? 'bg-[#E25C3F1F] text-[#E25C3F]'
                          : 'bg-[#F5A6231F] text-[#F5A623]'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
              {!data.payouts.length && (
                <p className="py-8 text-center text-[#838388] text-[12px]">
                  No payouts yet — minimum payout is {money(data.earnings.min_payout)}.
                </p>
              )}
            </div>
            {data.payouts.length > 0 && (
              <div className="flex items-center justify-between border-t border-[#FFFFFF0D] pt-3 mt-1">
                <p className="text-[12px] text-[#838388]">Total paid</p>
                <p className="text-white text-[15px] font-semibold">{money(payoutTotal)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payout modal */}
      {showPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={requestPayout}
            className="w-full max-w-md bg-[#16161F] border border-[#FFFFFF14] p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-white text-[18px] font-medium">Request Payout</h4>
                <p className="text-[#838388] text-[12px] mt-1">
                  Available: <span className="text-white">{money(data.earnings.available)}</span> · Minimum{' '}
                  {money(data.earnings.min_payout)}
                </p>
              </div>
              <button
                type="button"
                className="text-[#838388] hover:text-white cursor-pointer text-[13px]"
                onClick={() => setShowPayout(false)}
              >
                Close
              </button>
            </div>
            <label className="block text-[12px] text-[#838388]">
              How should we pay you? (wire details, PayPal, USDT address…)
              <textarea
                required
                rows={3}
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="mt-1 w-full bg-[#0F0F18] border border-[#FFFFFF14] px-3 py-2 text-white text-[13px] outline-none resize-y focus:border-white/25 transition-colors"
              />
            </label>
            <button
              type="submit"
              disabled={requesting}
              className="w-full h-[40px] bg-[#88C4FF] text-black font-medium text-[14px] disabled:opacity-50 cursor-pointer"
            >
              {requesting ? 'Requesting…' : `Request ${money(data.earnings.available)}`}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
