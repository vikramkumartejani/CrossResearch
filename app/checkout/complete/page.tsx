'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PLAN_LABEL, normalizePlan } from '@/lib/plans'

export default function CheckoutCompletePage() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(status !== 'error')

  useEffect(() => {
    if (status === 'error') return

    let cancelled = false
    let attempts = 0

    async function poll() {
      attempts += 1
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store', credentials: 'same-origin' })
        if (!res.ok) return
        const body = await res.json().catch(() => ({}))
        const userPlan = normalizePlan(body?.user?.plan)
        if (userPlan === 'gold' || userPlan === 'platinum') {
          if (!cancelled) {
            setPlan(userPlan)
            setLoading(false)
          }
          return
        }
      } catch {
        // keep polling briefly while webhook applies
      }

      if (!cancelled && attempts < 12) {
        window.setTimeout(() => void poll(), 1500)
      } else if (!cancelled) {
        setLoading(false)
      }
    }

    void poll()
    return () => {
      cancelled = true
    }
  }, [status])

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-[28px] font-semibold mb-3">Payment not completed</h1>
          <p className="text-white/60 mb-8">Your card was not charged. You can try again from pricing.</p>
          <Link href="/#pricing" className="inline-flex h-11 items-center px-6 rounded-full bg-white text-black font-semibold">
            Back to pricing
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {loading ? (
          <>
            <h1 className="text-[28px] font-semibold mb-3">Confirming your subscription…</h1>
            <p className="text-white/60">This usually takes a few seconds after checkout.</p>
          </>
        ) : plan ? (
          <>
            <h1 className="text-[28px] font-semibold mb-3">You&apos;re on {PLAN_LABEL[plan as keyof typeof PLAN_LABEL]}!</h1>
            <p className="text-white/60 mb-8">Your plan is active. Head to the dashboard to start using it.</p>
            <Link href="/analysis" className="inline-flex h-11 items-center px-6 rounded-full bg-white text-black font-semibold">
              Open dashboard
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-[28px] font-semibold mb-3">Payment received</h1>
            <p className="text-white/60 mb-8">
              We are still syncing your plan. Refresh in a moment, or open the dashboard if access is already live.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/analysis" className="inline-flex h-11 items-center px-6 rounded-full bg-white text-black font-semibold">
                Open dashboard
              </Link>
              <Link href="/#pricing" className="inline-flex h-11 items-center px-6 rounded-full border border-white/20 text-white/80">
                Back to pricing
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
