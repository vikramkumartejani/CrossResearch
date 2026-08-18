import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const asset = searchParams.get('asset')
    const all = searchParams.get('all_symbols') === '1' || searchParams.get('all') === '1'
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'

    const query = all
      ? 'all_symbols=1'
      : `asset=${encodeURIComponent(asset || 'EURUSD')}`
    const apiUrl = `${backendUrl}/market-header?${query}`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      return NextResponse.json(
        { error: 'Failed to fetch market header', details: errorData.detail || errorData },
        { status: response.status }
      )
    }

    return NextResponse.json(await response.json())
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
