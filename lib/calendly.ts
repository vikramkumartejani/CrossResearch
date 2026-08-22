/** Shared Calendly booking URL + helpers (browser-only popup). */

export const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
export const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'

/** Display / booking timezone for the Contact calendar */
export const CALENDLY_TIMEZONE = 'America/New_York'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
      initInlineWidget?: (opts: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

export type CalendlySlot = {
  /** Calendar day in the booking timezone */
  year: number
  month: number // 1-12
  day: number
  /** e.g. "04:00 PM" */
  timeLabel: string
  timeZone?: string
  /** Exact Calendly spot ISO start - preferred when booking */
  startIso?: string
}

/**
 * Light Calendly chrome so form labels + inputs stay readable.
 * (Dark bg + default dark text made labels invisible; white text made inputs invisible.)
 */
export function calendlyEmbedUrl(baseUrl: string): string {
  const url = new URL(baseUrl.trim())
  url.searchParams.set('hide_gdpr_banner', '1')
  url.searchParams.set('background_color', 'ffffff')
  url.searchParams.set('text_color', '0f172a')
  url.searchParams.set('primary_color', '3b82f6')
  return url.toString()
}

export function getCalendlyUrl(): string | null {
  const raw = (process.env.NEXT_PUBLIC_CALENDLY_URL || '').trim()
  if (!raw) return null
  try {
    const u = new URL(raw)
    if (!u.hostname.includes('calendly.com')) return null
    return raw.replace(/\/+$/, '')
  } catch {
    return null
  }
}

export function parseTimeLabel(label: string): { hour24: number; minute: number } | null {
  const m = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let hour = Number(m[1])
  const minute = Number(m[2])
  const ap = m[3].toUpperCase()
  if (!Number.isFinite(hour) || !Number.isFinite(minute) || hour < 1 || hour > 12) return null
  if (ap === 'AM') {
    if (hour === 12) hour = 0
  } else if (hour !== 12) {
    hour += 12
  }
  return { hour24: hour, minute }
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

/** Offset like -04:00 for a wall-clock time in `timeZone`. */
function offsetForWallTime(
  year: number,
  month: number,
  day: number,
  hour24: number,
  minute: number,
  timeZone: string
): string {
  // Noon UTC probe near the day, then refine with locale offset parts.
  const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
  const tzName = dtf.formatToParts(probe).find((p) => p.type === 'timeZoneName')?.value || 'GMT'
  // "GMT-4" | "GMT-04:00" | "GMT+5:30"
  const match = tzName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/)
  if (!match) {
    // Fallback: compute via locale string diff
    void hour24
    void minute
    return '-04:00'
  }
  const sign = match[1]
  const hh = pad2(Number(match[2]))
  const mm = pad2(Number(match[3] || 0))
  return `${sign}${hh}:${mm}`
}

/**
 * Build a Calendly URL that prefers a specific slot so the widget can skip
 * to the details step when that time is available.
 * Format: {base}/{YYYY-MM-DDTHH:mm:ss±HH:mm}?month=...&date=...
 */
export function calendlyUrlForSlot(baseUrl: string, slot: CalendlySlot): string {
  const timeZone = slot.timeZone || CALENDLY_TIMEZONE
  const y = slot.year
  const mo = slot.month
  const d = slot.day
  const dateStr = `${y}-${pad2(mo)}-${pad2(d)}`
  const monthStr = `${y}-${pad2(mo)}`

  let pathExtra = ''
  if (slot.startIso) {
    // Calendly accepts the spot's ISO start_time in the path
    pathExtra = `/${slot.startIso}`
  } else {
    const parsed = parseTimeLabel(slot.timeLabel)
    if (parsed) {
      const offset = offsetForWallTime(y, mo, d, parsed.hour24, parsed.minute, timeZone)
      const stamp = `${dateStr}T${pad2(parsed.hour24)}:${pad2(parsed.minute)}:00${offset}`
      pathExtra = `/${stamp}`
    }
  }

  const root = baseUrl.replace(/\/+$/, '')
  const url = new URL(`${root}${pathExtra}`)
  url.searchParams.set('month', monthStr)
  url.searchParams.set('date', dateStr)
  url.searchParams.set('hide_gdpr_banner', '1')
  url.searchParams.set('background_color', 'ffffff')
  url.searchParams.set('text_color', '0f172a')
  url.searchParams.set('primary_color', '3b82f6')
  return url.toString()
}

function ensureCalendlyAssets(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = CALENDLY_CSS
    document.head.appendChild(link)
  }

  if (window.Calendly) return Promise.resolve()

  const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`) as HTMLScriptElement | null
  if (existing) {
    return new Promise((resolve) => {
      if (window.Calendly) resolve()
      else existing.addEventListener('load', () => resolve(), { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = CALENDLY_SCRIPT
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Calendly'))
    document.body.appendChild(script)
  })
}

export async function openCalendlyPopup(
  url?: string | null,
  slot?: CalendlySlot | null
): Promise<boolean> {
  const base = url ?? getCalendlyUrl()
  if (!base) return false
  await ensureCalendlyAssets()
  const finalUrl = slot ? calendlyUrlForSlot(base, slot) : calendlyEmbedUrl(base)
  window.Calendly?.initPopupWidget({ url: finalUrl })
  return true
}
