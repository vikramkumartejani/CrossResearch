import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { ACCESS_COOKIE, REFRESH_COOKIE, applyAuthCookies } from '@/lib/authCookies'

const DASHBOARD_PREFIXES = [
  '/analysis',
  '/market-report',
  '/macro-nowcast',
  '/macro-signals',
  '/relief-signals',
  '/options-positioning',
  '/seasonality-flow',
  '/crypto-btc',
  '/geopolitical',
  '/news',
  '/tutorial',
  '/education-center',
  '/trading-strategies',
  '/help-center',
  '/contact-support',
]

const AUTH_PAGES = ['/login', '/signup', '/forgot-password']

function isDashboardPath(pathname: string) {
  return DASHBOARD_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function jwtSecretKey() {
  const secret = (process.env.AUTH_JWT_SECRET || '').trim()
  if (secret.length >= 32) return new TextEncoder().encode(secret)
  const fallback =
    (process.env.ADMIN_API_KEY || 'crossresearch-admin-dev') + '-jwt-dev-only-change-me!!'
  return new TextEncoder().encode(fallback)
}

async function accessValid(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, jwtSecretKey(), { algorithms: ['HS256'] })
    return payload.type === 'access'
  } catch {
    return false
  }
}

function loginRedirect(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

async function refreshViaBackend(request: NextRequest) {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (!refresh) return null
  const backend = (process.env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  try {
    const response = await fetch(`${backend}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
      cache: 'no-store',
    })
    if (!response.ok) return null
    return (await response.json()) as {
      access_token: string
      refresh_token: string
      access_expires_in: number
      refresh_expires_in: number
    }
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const access = request.cookies.get(ACCESS_COOKIE)?.value

  if (isDashboardPath(pathname)) {
    if (await accessValid(access)) {
      return NextResponse.next()
    }
    const tokens = await refreshViaBackend(request)
    if (!tokens?.access_token) {
      return loginRedirect(request)
    }
    const res = NextResponse.next()
    applyAuthCookies(res, tokens)
    return res
  }

  if (isAuthPage(pathname)) {
    if (await accessValid(access)) {
      const url = request.nextUrl.clone()
      url.pathname = '/analysis'
      url.search = ''
      return NextResponse.redirect(url)
    }
    const tokens = await refreshViaBackend(request)
    if (tokens?.access_token) {
      const url = request.nextUrl.clone()
      url.pathname = '/analysis'
      url.search = ''
      const res = NextResponse.redirect(url)
      applyAuthCookies(res, tokens)
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/analysis/:path*',
    '/market-report/:path*',
    '/macro-nowcast/:path*',
    '/macro-signals/:path*',
    '/relief-signals/:path*',
    '/options-positioning/:path*',
    '/seasonality-flow/:path*',
    '/crypto-btc/:path*',
    '/geopolitical/:path*',
    '/news/:path*',
    '/tutorial/:path*',
    '/education-center/:path*',
    '/trading-strategies/:path*',
    '/help-center/:path*',
    '/contact-support/:path*',
    '/login',
    '/signup',
    '/forgot-password',
  ],
}
