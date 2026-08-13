import { NextRequest } from 'next/server'
import { corsPreflight, proxyBackend } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

export async function GET(request: NextRequest) {
  // Forward search/filter/pagination query params to FastAPI
  return proxyBackend(request, `/admin/users${request.nextUrl.search}`, 'GET')
}
