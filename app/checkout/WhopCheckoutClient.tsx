'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WhopCheckoutEmbed } from '@whop/checkout/react'
import { PAID_PLAN_LABEL } from '@/lib/whopCatalog'

export default function WhopCheckoutClient({
  sessionId,
  planId,
  plan,
  returnUrl,
  email,
  environment,
}: {
  sessionId?: string
  planId?: string
  plan: string
  returnUrl: string
  email?: string
  environment: 'sandbox' | 'production'
}) {
  const router = useRouter()
  const [prefillEmail, setPrefillEmail] = useState(email || '')
  const label = PAID_PLAN_LABEL[plan as keyof typeof PAID_PLAN_LABEL] || 'CrossResearch'

  useEffect(() => {
    if (prefillEmail) return
    fetch('/api/auth/me', { cache: 'no-store', credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        const e = body?.user?.email
        if (typeof e === 'string' && e.trim()) setPrefillEmail(e.trim())
      })
      .catch(() => undefined)
  }, [prefillEmail])

  const embedProps = sessionId
    ? { sessionId }
    : planId
      ? { planId }
      : null

  return (
    <div className="min-h-screen bg-[#070711] text-white px-4 py-10">
      <div className="mx-auto max-w-[560px]">
        <button
          type="button"
          onClick={() => router.push('/#pricing')}
          className="mb-6 text-white/60 hover:text-white text-[14px] transition-colors"
        >
          ← Back to pricing
        </button>

        <h1 className="text-[28px] sm:text-[32px] font-semibold mb-2">Subscribe to {label}</h1>
        <p className="text-white/55 text-[15px] leading-6 mb-8">
          Secure checkout powered by Whop.
          {environment === 'sandbox' ? (
            <>
              {' '}
              Sandbox test card: <span className="text-white/80">4242 4242 4242 4242</span>
            </>
          ) : (
            ' Complete payment on the secure Whop checkout page.'
          )}
        </p>

        <div className="rounded-[20px] border border-[#FFFFFF14] bg-[#101018] p-3 sm:p-4 overflow-hidden min-h-[420px]">
          {embedProps ? (
            <WhopCheckoutEmbed
              {...embedProps}
              returnUrl={returnUrl}
              skipRedirect
              environment={environment}
              theme="dark"
              themeOptions={{ accentColor: '#88C4FF', backgroundColor: '#101018' }}
              prefill={prefillEmail ? { email: prefillEmail } : undefined}
              onComplete={() => {
                router.push('/checkout/complete?status=success')
              }}
            />
          ) : (
            <p className="text-white/60 text-center py-16">Checkout could not be loaded.</p>
          )}
        </div>
      </div>
    </div>
  )
}
