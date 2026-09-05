import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    const q = req.nextUrl.searchParams.get('q') || ''
    const limit = req.nextUrl.searchParams.get('limit') || '12'
    const apiUrl = new URL('/equity-analyst/search', backendUrl)
    apiUrl.searchParams.set('q', q)
    apiUrl.searchParams.set('limit', limit)

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      return NextResponse.json(
        { error: 'Search failed', details: errorData.detail || errorData },
        { status: response.status },
      )
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
