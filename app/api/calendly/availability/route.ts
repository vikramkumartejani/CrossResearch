import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type Spot = { status?: string; start_time?: string; invitees_remaining?: number }
type Day = { date?: string; status?: string; spots?: Spot[] }

function parseCalendlyUrl(raw: string): { owner: string; slug: string } | null {
  try {
    const u = new URL(raw.trim())
    if (!u.hostname.includes('calendly.com')) return null
    const parts = u.pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null
    return { owner: parts[0], slug: parts[1] }
  } catch {
    return null
  }
}

async function resolveEventTypeUuid(owner: string, slug: string): Promise<string | null> {
  const res = await fetch(`https://calendly.com/api/booking/profiles/${encodeURIComponent(owner)}/event_types`, {
    headers: { Accept: 'application/json', 'User-Agent': 'CrossResearch/1.0' },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  const list = (await res.json()) as Array<{ slug?: string; uuid?: string }>
  const hit = list.find((e) => e.slug === slug)
  return hit?.uuid || null
}

function ymd(d: Date) {
  return d.toISOString().slice(0, 10)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // YYYY-MM-DD
    const month = searchParams.get('month') // YYYY-MM (optional month overview)
    const timezone = searchParams.get('timezone') || 'America/New_York'

    const base = (process.env.NEXT_PUBLIC_CALENDLY_URL || '').trim()
    const parsed = parseCalendlyUrl(base)
    if (!parsed) {
      return NextResponse.json(
        { error: 'Calendly URL not configured', times: [], days: [] },
        { status: 503 }
      )
    }

    const uuid =
      (process.env.CALENDLY_EVENT_TYPE_UUID || '').trim() ||
      (await resolveEventTypeUuid(parsed.owner, parsed.slug))

    if (!uuid) {
      return NextResponse.json(
        { error: 'Could not resolve Calendly event type', times: [], days: [] },
        { status: 502 }
      )
    }

    let rangeStart: string
    let rangeEnd: string
    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const [y, m] = month.split('-').map(Number)
      rangeStart = `${month}-01`
      const last = new Date(Date.UTC(y, m, 0)).getUTCDate()
      rangeEnd = `${month}-${String(last).padStart(2, '0')}`
    } else if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      rangeStart = date
      rangeEnd = date
    } else {
      const today = ymd(new Date())
      rangeStart = today
      rangeEnd = today
    }

    const apiUrl = new URL(
      `https://calendly.com/api/booking/event_types/${uuid}/calendar/range`
    )
    apiUrl.searchParams.set('timezone', timezone)
    apiUrl.searchParams.set('diagnostics', 'false')
    apiUrl.searchParams.set('range_start', rangeStart)
    apiUrl.searchParams.set('range_end', rangeEnd)

    const res = await fetch(apiUrl.toString(), {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'CrossResearch/1.0',
        Referer: base,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      return NextResponse.json(
        { error: 'Calendly availability failed', detail, times: [], days: [] },
        { status: 502 }
      )
    }

    const body = (await res.json()) as {
      days?: Day[]
      availability_timezone?: string
      today?: string
    }

    const days = (body.days || []).map((d) => ({
      date: d.date,
      status: d.status,
      available: d.status === 'available' && (d.spots || []).some((s) => s.status === 'available'),
    }))

    const focusDate = date || rangeStart
    const day = (body.days || []).find((d) => d.date === focusDate)
    const times = (day?.spots || [])
      .filter((s) => s.status === 'available' && s.start_time)
      .map((s) => {
        const iso = s.start_time as string
        const label = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date(iso))
        return { start: iso, label }
      })

    return NextResponse.json({
      timezone,
      availabilityTimezone: body.availability_timezone || null,
      date: focusDate,
      times,
      days,
      eventUuid: uuid,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal error',
        details: error instanceof Error ? error.message : String(error),
        times: [],
        days: [],
      },
      { status: 500 }
    )
  }
}
