import { NextRequest, NextResponse } from 'next/server'
import { corsPreflight, withCors, backendBase } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    const headers: Record<string, string> = {}
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey) headers['X-Admin-Key'] = adminKey

    let body: BodyInit
    if (contentType.includes('multipart/form-data')) {
      body = await request.formData()
    } else {
      headers['Content-Type'] = 'application/json'
      body = await request.text()
    }

    const response = await fetch(`${backendBase()}/nowcast-cards/parse`, {
      method: 'POST',
      headers,
      body,
      cache: 'no-store',
    })
    const payload = await response.json().catch(() => ({}))
    return withCors(request, NextResponse.json(payload, { status: response.status }))
  } catch (error) {
    return withCors(
      request,
      NextResponse.json(
        {
          error: 'Parse failed',
          detail: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      )
    )
  }
}
