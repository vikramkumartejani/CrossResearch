import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 900

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const instruments = searchParams.get('instruments') || null

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    const apiUrl = new URL('/market-regimes', backendUrl)

    if (instruments) {
      apiUrl.searchParams.append('instruments', instruments)
    }

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(900_000),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      return NextResponse.json(
        { error: 'Failed to fetch market regime data from backend', details: errorData.detail || errorData },
        { status: response.status }
      )
    }

    return NextResponse.json(await response.json())
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const friendly =
      /timeout|abort/i.test(message)
        ? 'Market regime model is still computing (can take several minutes on first load). Please retry shortly.'
        : message
    return NextResponse.json({ error: 'Internal server error', details: friendly }, { status: 504 })
  }
}
