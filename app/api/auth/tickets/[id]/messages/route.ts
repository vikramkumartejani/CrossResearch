import { NextRequest } from 'next/server'
import { corsPreflight, proxyBackend } from '@/lib/adminCors'

export const dynamic = 'force-dynamic'

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request)
}

/** See list route - must stay under /api/auth/* on DigitalOcean. */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  return proxyBackend(request, `/tickets/${encodeURIComponent(id)}/messages`, 'POST')
}
