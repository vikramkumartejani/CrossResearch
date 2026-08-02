import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_ORIGINS = [
  'https://crossresearch-admin-panel.vercel.app',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
]

function allowedOrigins(): Set<string> {
  const extra = (process.env.ADMIN_CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  return new Set([...DEFAULT_ORIGINS, ...extra])
}

export function corsOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin')
  if (!origin) return null
  return allowedOrigins().has(origin) ? origin : null
}

export function withCors(request: NextRequest, response: NextResponse): NextResponse {
  const origin = corsOrigin(request)
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key, X-Support-Key')
    response.headers.set('Vary', 'Origin')
  }
  return response
}

export function corsPreflight(request: NextRequest): NextResponse {
  return withCors(request, new NextResponse(null, { status: 204 }))
}

export function backendBase(): string {
  return (process.env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
}

export async function proxyBackend(
  request: NextRequest,
  path: string,
  method: 'GET' | 'PUT' | 'POST' | 'PATCH'
): Promise<NextResponse> {
  try {
    const apiUrl = `${backendBase()}${path}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey) headers['X-Admin-Key'] = adminKey
    const supportKey = request.headers.get('x-support-key')
    if (supportKey) headers['X-Support-Key'] = supportKey

    const init: RequestInit = {
      method,
      headers,
      cache: 'no-store',
    }
    if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
      init.body = await request.text()
    }

    const response = await fetch(apiUrl, init)
    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      return withCors(
        request,
        NextResponse.json(
          {
            error: `Failed to ${method.toLowerCase()} ${path}`,
            details: (body as { detail?: unknown }).detail ?? body,
            detail: (body as { detail?: unknown }).detail,
          },
          { status: response.status }
        )
      )
    }
    return withCors(request, NextResponse.json(body))
  } catch (error) {
    return withCors(
      request,
      NextResponse.json(
        {
          error: 'Internal server error',
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      )
    )
  }
}
