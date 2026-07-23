import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const report = searchParams.get('report') || 'futures_only'
    const weeks = searchParams.get('weeks') || '11'

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    const apiUrl = new URL('/cot-positioning', backendUrl)
    apiUrl.searchParams.set('report', report)
    apiUrl.searchParams.set('weeks', weeks)

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      console.error('FastAPI error:', errorData)
      return NextResponse.json(
        { error: 'Failed to fetch COT positioning from backend', details: errorData.detail || errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
