'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import {
  PAID_PLAN_LABEL,
  billingAmountUsd,
  type BillingInterval,
  type PaidPlanId,
} from '@/lib/billingCatalog'

export type SubscribePaymentMethod = 'card' | 'crypto'

type SubscribePaymentModalProps = {
  open: boolean
  onClose: () => void
  plan: PaidPlanId
  interval: BillingInterval
  busyMethod?: SubscribePaymentMethod | null
  onPayCard: () => void
  onPayCrypto: () => void
}

function formatPrice(plan: PaidPlanId, interval: BillingInterval): string {
  const amount = billingAmountUsd(plan, interval)
  if (interval === 'annual') {
    return `$${amount.toFixed(2)} billed annually`
  }
  return `$${amount.toFixed(2)}/month`
}

function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CryptoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 8.5H13.5C14.88 8.5 16 9.62 16 11C16 12.38 14.88 13.5 13.5 13.5H11V15.5M11 8.5V15.5M11 11.75H13.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckoutSpinner({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[24px] bg-[#101018]/92 backdrop-blur-[2px]">
      <div className="cr-chart-loader text-[#88C4FF] mb-4" aria-hidden />
      <p className="text-white text-[14px] font-medium">{label}</p>
    </div>
  )
}

export default function SubscribePaymentModal({
  open,
  onClose,
  plan,
  interval,
  busyMethod = null,
  onPayCard,
  onPayCrypto,
}: SubscribePaymentModalProps) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !busyMethod) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, busyMethod, onClose])

  if (!open) return null

  const planLabel = PAID_PLAN_LABEL[plan]
  const priceLabel = formatPrice(plan, interval)
  const intervalLabel = interval === 'annual' ? 'Annual' : 'Monthly'
  const loadingLabel =
    busyMethod === 'card' ? 'Opening secure checkout' : busyMethod === 'crypto' ? 'Preparing crypto checkout' : ''

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4"
      onClick={() => {
        if (!busyMethod) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-payment-title"
        className="relative w-full max-w-[440px] rounded-[24px] border border-[#FFFFFF14] bg-[#101018] p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        {busyMethod ? <CheckoutSpinner label={loadingLabel} /> : null}

        <div className="flex items-center gap-3 mb-5">
          <Image src="/assets/logo.svg" alt="" width={36} height={31} className="shrink-0" />
          <div className="min-w-0">
            <p className="text-white text-[15px] font-semibold leading-tight">CrossResearch</p>
            <p className="text-white/45 text-[12px]">Secure subscription checkout</p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[#88C4FF] text-[12px] font-semibold tracking-[0.08em] uppercase mb-1">
              Choose payment method
            </p>
            <h3 id="subscribe-payment-title" className="text-white text-[20px] sm:text-[22px] font-semibold leading-tight">
              {planLabel}
            </h3>
            <p className="text-white/50 text-[14px] mt-1">
              {intervalLabel} · {priceLabel}
            </p>
          </div>
          <button
            type="button"
            disabled={Boolean(busyMethod)}
            onClick={onClose}
            className="shrink-0 text-white/45 hover:text-white text-[13px] disabled:opacity-40 cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            disabled={Boolean(busyMethod)}
            onClick={onPayCard}
            className="group flex items-center gap-4 w-full rounded-[18px] border border-[#FFFFFF12] bg-[#FFFFFF08] px-4 py-4 text-left transition-colors hover:border-[#88C4FF55] hover:bg-[#88C4FF10] disabled:opacity-60 cursor-pointer"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFFFFF14] bg-[#0C0C14] text-white group-hover:text-[#88C4FF]">
              <CardIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-white text-[15px] font-semibold">Credit / debit card</span>
              <span className="block text-white/45 text-[13px] mt-0.5">Secure checkout via Whop · {priceLabel}</span>
            </span>
            <span className="text-white/35 text-[18px]">›</span>
          </button>

          <button
            type="button"
            disabled={Boolean(busyMethod)}
            onClick={onPayCrypto}
            className="group flex items-center gap-4 w-full rounded-[18px] border border-[#FFFFFF12] bg-[#FFFFFF08] px-4 py-4 text-left transition-colors hover:border-[#88C4FF55] hover:bg-[#88C4FF10] disabled:opacity-60 cursor-pointer"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFFFFF14] bg-[#0C0C14] text-white group-hover:text-[#88C4FF]">
              <CryptoIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-white text-[15px] font-semibold">Cryptocurrency</span>
              <span className="block text-white/45 text-[13px] mt-0.5">
                BTC, ETH, USDT, and more · {priceLabel}
              </span>
            </span>
            <span className="text-white/35 text-[18px]">›</span>
          </button>
        </div>
      </div>
    </div>
  )
}
