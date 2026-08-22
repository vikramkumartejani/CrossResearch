'use client'

import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type CalendlySlot, getCalendlyUrl, openCalendlyPopup } from '@/lib/calendly'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'slot'> & {
  children: ReactNode
  /** Prefill Calendly with this date/time when present */
  calendlySlot?: CalendlySlot | null
  /** Fallback href when popup assets fail */
  fallbackHref?: string
}

export default function CalendlyButton({
  children,
  className = '',
  calendlySlot = null,
  fallbackHref,
  onClick,
  ...rest
}: Props) {
  const url = getCalendlyUrl()

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    if (e.defaultPrevented) return

    const opened = await openCalendlyPopup(url, calendlySlot).catch(() => false)
    if (!opened) {
      const href = fallbackHref || url || '/#contact'
      window.location.assign(href)
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}
