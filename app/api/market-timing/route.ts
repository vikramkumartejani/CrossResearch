import { NextRequest } from 'next/server'
import { corsPreflight, proxyBackend } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

export async function GET(request: NextRequest) {
  return proxyBackend(request, '/market-timing', 'GET')
}

export async function PUT(request: NextRequest) {
  return proxyBackend(request, '/market-timing', 'PUT')
}
