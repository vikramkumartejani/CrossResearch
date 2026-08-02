import { NextRequest } from 'next/server'
import { corsPreflight, proxyBackend } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status')
  const q = status ? `?status=${encodeURIComponent(status)}` : ''
  return proxyBackend(request, `/tickets${q}`, 'GET')
}

export async function POST(request: NextRequest) {
  return proxyBackend(request, '/tickets', 'POST')
}
