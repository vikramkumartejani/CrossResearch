import { NextRequest } from 'next/server'
import { corsPreflight, proxyBackend } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

/**
 * Lives under /api/auth/* so nginx on the droplet routes it to Next (cookie → Bearer),
 * not straight to FastAPI. FastAPI path stays /affiliate/dashboard.
 */
export async function GET(request: NextRequest) {
  return proxyBackend(request, '/affiliate/dashboard', 'GET')
}
