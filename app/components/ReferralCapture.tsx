'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export const REF_COOKIE = 'cr_ref'
const REF_TTL_DAYS = 90

function Capture() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  useEffect(() => {
    if (!ref) return
    const code = ref.trim().toLowerCase()
    if (!/^[a-z0-9_-]{3,40}$/.test(code)) return
    document.cookie = `${REF_COOKIE}=${code}; path=/; max-age=${REF_TTL_DAYS * 86400}; samesite=lax`
    fetch('/api/referral/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    }).catch(() => {})
  }, [ref])

  return null
}

/** Drops a 90-day referral cookie + logs the click when the URL carries ?ref=CODE. */
export default function ReferralCapture() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  )
}
