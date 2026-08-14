import { NextRequest, NextResponse } from 'next/server'
import { backendBase } from '@/lib/adminCors'
import { ACCESS_COOKIE } from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const headers: Record<string, string> = {}
    const access = request.cookies.get(ACCESS_COOKIE)?.value
    if (access) headers.Authorization = `Bearer ${access}`

    const response = await fetch(`${backendBase()}/media/upload`, {
      method: 'POST',
      headers,
      body: form,
      cache: 'no-store',
    })
    const body = await response.json().catch(() => ({}))
    return NextResponse.json(body, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
