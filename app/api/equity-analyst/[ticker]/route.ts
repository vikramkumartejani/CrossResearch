import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ ticker: string }> }

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    const { ticker } = await ctx.params
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    const apiUrl = new URL(`/equity-analyst/${encodeURIComponent(ticker)}`, backendUrl)
    for (const key of ['as_of', 'offline', 'refresh'] as const) {
      const v = req.nextUrl.searchParams.get(key)
      if (v != null) apiUrl.searchParams.set(key, v)
    }

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const data = await response.json().catch(() => ({ detail: 'Unknown error' }))
    if (!response.ok && response.status !== 422) {
      return NextResponse.json(
        { error: 'Analysis failed', details: data.detail || data },
        { status: response.status },
      )
    }
    return NextResponse.json(data, { status: response.status === 422 ? 422 : 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
