'use client'

import { useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { usePlan } from './PlanProvider'
import { authErrorMessage } from '@/lib/authUi'
import { PLAN_LABEL, planAllows, type PlanId } from '@/lib/plans'

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 6.125V4.375C3.5 2.51104 5.01104 1 6.875 1C8.73896 1 10.25 2.51104 10.25 4.375V6.125"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect x="2" y="6.125" width="10" height="6.875" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="9.25" r="0.9" fill="currentColor" />
    </svg>
  )
}

/**
 * Section-level paywall: title stays sharp; content is veiled with a compact unlock control.
 */
export default function LockedSection({
  children,
  required = 'gold',
  className = '',
  label,
  title,
  keepTitle = false,
}: {
  children: ReactNode
  required?: PlanId
  className?: string
  /** @deprecated prefer `title` */
  label?: string
  /** Clear section heading shown above the veil */
  title?: string
  /** Keep rendering the title when unlocked (use when children have no heading) */
  keepTitle?: boolean
}) {
  const router = useRouter()
  const { plan, loading, refresh, setPlanOptimistic } = usePlan()
  const [busy, setBusy] = useState(false)
  const allowed = planAllows(plan, required)
  const heading = (title || label || '').trim()

  async function unlock() {
    setBusy(true)
    try {
      const res = await fetch('/api/auth/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: required }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(authErrorMessage(body, 'Upgrade failed'))
      setPlanOptimistic(required)
      toast.success(body.message || `Unlocked with ${PLAN_LABEL[required]}`)
      await refresh()
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upgrade failed')
    } finally {
      setBusy(false)
    }
  }

  if (loading || allowed) {
    return (
      <div className={className}>
        {keepTitle && heading ? (
          <h2 className="text-white text-[16px] sm:text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">
            {heading}
          </h2>
        ) : null}
        {children}
      </div>
    )
  }

  const planLabel = PLAN_LABEL[required]

  return (
    <div className={`relative ${className}`}>
      {heading ? (
        <div className="relative z-20 mb-3 flex items-center gap-2.5">
          <h2 className="text-white text-[16px] sm:text-[18px] leading-[22px] font-medium">{heading}</h2>
          <span className="inline-flex items-center gap-1 h-[22px] px-2 rounded-md border border-[#FFFFFF14] bg-[#FFFFFF08] text-white/55 text-[10px] font-medium uppercase tracking-[0.06em]">
            <LockIcon size={11} />
            Locked
          </span>
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-[10px] min-h-[180px] border border-[#FFFFFF0A] bg-[#0C0C14]/40">
        <div
          aria-hidden
          className="pointer-events-none select-none blur-[4px] opacity-[0.55] saturate-[0.75] [&_h2:first-of-type]:invisible"
        >
          {children}
        </div>

        <div
          aria-hidden
          className="absolute inset-0 z-[5] bg-[linear-gradient(180deg,rgba(7,7,17,0.28)_0%,rgba(7,7,17,0.5)_40%,rgba(7,7,17,0.88)_100%)]"
        />

        <div className="absolute inset-0 z-10 flex items-end sm:items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-[360px] rounded-xl border border-[#FFFFFF12] bg-[#101018]/88 px-5 py-4 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#88C4FF33] bg-[#88C4FF14] text-[#88C4FF]">
                <LockIcon size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-[14px] font-medium leading-5">
                  {heading ? `Unlock ${heading}` : 'Unlock this section'}
                </p>
                <p className="text-white/45 text-[12px] leading-4 mt-1">
                  Available on {planLabel}. Preview stays behind the veil.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => void unlock()}
              className="mt-4 w-full inline-flex items-center justify-center h-10 rounded-lg bg-[#88C4FF] text-black text-[13px] font-semibold hover:bg-[#9dceff] transition-colors disabled:opacity-60 cursor-pointer"
            >
              {busy ? 'Unlocking…' : `Unlock with ${planLabel}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
