'use client'

import { useMemo } from 'react'
import { calendlyEmbedUrl, getCalendlyUrl } from '@/lib/calendly'

type Props = {
  /** Override env URL when needed */
  url?: string
  className?: string
  /** iframe height */
  height?: number
}

export default function CalendlyInline({ url, className = '', height = 720 }: Props) {
  const src = useMemo(() => {
    const base = (url || getCalendlyUrl() || '').trim()
    if (!base) return null
    return calendlyEmbedUrl(base)
  }, [url])

  if (!src) {
    return (
      <div
        className={`flex min-h-[320px] items-center justify-center rounded-[24px] border border-[#FFFFFF0D] bg-[#FFFFFF08] px-6 text-center ${className}`}
      >
        <p className="max-w-md text-[14px] leading-[22px] text-white/60">
          Calendly is not configured yet. Set{' '}
          <code className="text-[#88C4FF]">NEXT_PUBLIC_CALENDLY_URL</code> to your booking link
          (e.g. https://calendly.com/your-team/intro).
        </p>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden rounded-[24px] sm:rounded-[40px] bg-[#0A0F1C] ${className}`}>
      <iframe
        title="Schedule a meeting with CrossResearch"
        src={src}
        className="w-full border-0"
        style={{ minWidth: 320, height }}
        loading="lazy"
      />
    </div>
  )
}
