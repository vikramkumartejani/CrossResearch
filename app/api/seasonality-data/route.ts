import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const instruments = searchParams.get('instruments') || null

    const backendUrl = (process.env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
    const apiUrl = new URL('/seasonality', `${backendUrl}/`)

    if (instruments) {
      apiUrl.searchParams.set('instruments', instruments)
    }

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(90_000),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      console.error('FastAPI seasonality error:', errorData)
      return NextResponse.json(
        {
          error: 'Failed to fetch seasonality data from backend',
          details: errorData.detail || errorData,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const timedOut = /timeout|aborted|AbortError/i.test(message)
    console.error('Seasonality API route error:', message)
    return NextResponse.json(
      {
        error: timedOut
          ? 'Seasonality request timed out. Try again in a moment.'
          : 'Internal server error',
        details: message,
      },
      { status: timedOut ? 504 : 500 }
    )
  }
}
