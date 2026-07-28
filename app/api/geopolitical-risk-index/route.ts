import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
/** Hobby plan max is 300s. GPRI cold builds can be slow on the Python backend. */
export const maxDuration = 300

function resolveBackendUrl() {
  const raw = (process.env.BACKEND_URL || '').trim().replace(/\/+$/, '')
  if (raw) return raw
  // Local Next.js only — on Vercel this must be set to your Render/API host.
  if (process.env.VERCEL) {
    return ''
  }
  return 'http://127.0.0.1:8000'
}

export async function GET(request: Request) {
  try {
    const backendUrl = resolveBackendUrl()
    if (!backendUrl) {
      return NextResponse.json(
        {
          error: 'BACKEND_URL is not configured',
          details:
            'Set BACKEND_URL in the Vercel project env to your deployed FastAPI URL (e.g. https://your-service.onrender.com). Localhost does not work on Vercel.',
        },
        { status: 503 }
      )
    }

    const incoming = new URL(request.url)
    const apiUrl = new URL('/geopolitical-risk-index', backendUrl)
    const lookback = incoming.searchParams.get('lookback_days')
    if (lookback) apiUrl.searchParams.set('lookback_days', lookback)

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(290_000),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      return NextResponse.json(
        { error: 'Failed to fetch geopolitical-risk-index', details: errorData.detail || errorData },
        { status: response.status }
      )
    }

    return NextResponse.json(await response.json())
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const isTimeout = message.includes('TimeoutError') || message.includes('aborted') || message.includes('timeout')
    return NextResponse.json(
      {
        error: isTimeout ? 'Geopolitical risk index timed out' : 'Internal server error',
        details: message,
      },
      { status: isTimeout ? 504 : 500 }
    )
  }
}
