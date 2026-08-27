import { NextRequest } from 'next/server'
import { corsPreflight, proxyBackend } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

/**
 * Lives under /api/auth/* so nginx on the droplet routes it to Next (cookie → Bearer),
 * not straight to FastAPI. FastAPI path stays /tickets.
 */
export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status')
  const q = status ? `?status=${encodeURIComponent(status)}` : ''
  return proxyBackend(request, `/tickets${q}`, 'GET')
}

export async function POST(request: NextRequest) {
  return proxyBackend(request, '/tickets', 'POST')
}
