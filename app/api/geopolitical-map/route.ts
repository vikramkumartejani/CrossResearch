import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
/** Hobby plan max is 300s — values above this fail the Vercel build. */
export const maxDuration = 300

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    const apiUrl = new URL('/geopolitical-map', backendUrl)

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(300_000),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      return NextResponse.json(
        { error: 'Failed to fetch geopolitical-map', details: errorData.detail || errorData },
        { status: response.status }
      )
    }

    return NextResponse.json(await response.json())
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const friendly =
      /timeout|abort/i.test(message)
        ? 'Geopolitical map is still computing. Please retry shortly.'
        : message
    return NextResponse.json({ error: 'Internal server error', details: friendly }, { status: 504 })
  }
}
