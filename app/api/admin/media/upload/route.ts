import { NextRequest, NextResponse } from 'next/server'
import { corsPreflight, withCors, backendBase } from '@/lib/adminCors'
import { ACCESS_COOKIE } from '@/lib/authCookies'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const headers: Record<string, string> = {}
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey) headers['X-Admin-Key'] = adminKey
    const access = request.cookies.get(ACCESS_COOKIE)?.value
    if (access) headers.Authorization = `Bearer ${access}`

    const response = await fetch(`${backendBase()}/media/upload`, {
      method: 'POST',
      headers,
      body: form,
      cache: 'no-store',
    })
    const body = await response.json().catch(() => ({}))
    return withCors(request, NextResponse.json(body, { status: response.status }))
  } catch (error) {
    return withCors(
      request,
      NextResponse.json(
        { error: 'Upload failed', detail: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      )
    )
  }
}
