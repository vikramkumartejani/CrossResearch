import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { ACCESS_COOKIE, REFRESH_COOKIE, applyAuthCookies, backendBase } from '@/lib/authCookies'
import { postLoginRedirect, safeNextPath } from '@/lib/authRedirect'

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
  '/affiliate-center',
]

const AUTH_PAGES = ['/login', '/signup', '/forgot-password']

type AccessInfo = { valid: boolean; onboardingDone: boolean }

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

async function readAccess(token: string | undefined): Promise<AccessInfo> {
  if (!token) return { valid: false, onboardingDone: false }
  try {
    const { payload } = await jwtVerify(token, jwtSecretKey(), { algorithms: ['HS256'] })
    if (payload.type !== 'access') return { valid: false, onboardingDone: false }
    // Missing `ob` = legacy tokens treated as complete
    const onboardingDone = payload.ob !== 0 && payload.ob !== '0'
    return { valid: true, onboardingDone }
  } catch {
    return { valid: false, onboardingDone: false }
  }
}

function loginRedirect(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

function redirectTo(request: NextRequest, pathname: string, tokens?: {
  access_token: string
  refresh_token: string
  access_expires_in: number
  refresh_expires_in: number
}) {
  const url = request.nextUrl.clone()
  const q = pathname.indexOf('?')
  if (q >= 0) {
    url.pathname = pathname.slice(0, q)
    url.search = pathname.slice(q)
  } else {
    url.pathname = pathname
    url.search = ''
  }
  const res = NextResponse.redirect(url)
  if (tokens) applyAuthCookies(res, tokens)
  return res
}

function onboardingRedirect(request: NextRequest, tokens?: {
  access_token: string
  refresh_token: string
  access_expires_in: number
  refresh_expires_in: number
}) {
  const next = safeNextPath(request.nextUrl.pathname)
  const path = next ? `/onboarding?next=${encodeURIComponent(next)}` : '/onboarding'
  return redirectTo(request, path, tokens)
}

async function refreshViaBackend(request: NextRequest) {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value
  if (!refresh) return null
  const backend = backendBase()
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
  let info = await readAccess(access)

  if (isDashboardPath(pathname)) {
    if (!info.valid) {
      const tokens = await refreshViaBackend(request)
      if (!tokens?.access_token) return loginRedirect(request)
      info = await readAccess(tokens.access_token)
      if (!info.valid) return loginRedirect(request)
      if (!info.onboardingDone) return onboardingRedirect(request, tokens)
      const res = NextResponse.next()
      applyAuthCookies(res, tokens)
      return res
    }
    if (!info.onboardingDone) return onboardingRedirect(request)
    return NextResponse.next()
  }

  if (pathname === '/onboarding' || pathname.startsWith('/onboarding/')) {
    if (!info.valid) {
      const tokens = await refreshViaBackend(request)
      if (!tokens?.access_token) return loginRedirect(request)
      info = await readAccess(tokens.access_token)
      if (!info.valid) return loginRedirect(request)
      if (info.onboardingDone) {
        return redirectTo(
          request,
          postLoginRedirect({
            onboardingDone: true,
            preferredNext: request.nextUrl.searchParams.get('next'),
          }),
          tokens
        )
      }
      const res = NextResponse.next()
      applyAuthCookies(res, tokens)
      return res
    }
    if (info.onboardingDone) {
      return redirectTo(
        request,
        postLoginRedirect({
          onboardingDone: true,
          preferredNext: request.nextUrl.searchParams.get('next'),
        })
      )
    }
    return NextResponse.next()
  }

  if (isAuthPage(pathname)) {
    const preferredNext = request.nextUrl.searchParams.get('next')
    if (!info.valid) {
      const tokens = await refreshViaBackend(request)
      if (tokens?.access_token) {
        info = await readAccess(tokens.access_token)
        if (info.valid) {
          return redirectTo(
            request,
            postLoginRedirect({ onboardingDone: info.onboardingDone, preferredNext }),
            tokens
          )
        }
      }
      return NextResponse.next()
    }
    return redirectTo(
      request,
      postLoginRedirect({ onboardingDone: info.onboardingDone, preferredNext })
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/analysis',
    '/analysis/:path*',
    '/market-report',
    '/market-report/:path*',
    '/macro-nowcast',
    '/macro-nowcast/:path*',
    '/macro-signals',
    '/macro-signals/:path*',
    '/relief-signals',
    '/relief-signals/:path*',
    '/options-positioning',
    '/options-positioning/:path*',
    '/seasonality-flow',
    '/seasonality-flow/:path*',
    '/crypto-btc',
    '/crypto-btc/:path*',
    '/geopolitical',
    '/geopolitical/:path*',
    '/news',
    '/news/:path*',
    '/tutorial',
    '/tutorial/:path*',
    '/education-center',
    '/education-center/:path*',
    '/trading-strategies',
    '/trading-strategies/:path*',
    '/help-center',
    '/help-center/:path*',
    '/contact-support',
    '/contact-support/:path*',
    '/affiliate-center',
    '/affiliate-center/:path*',
    '/onboarding',
    '/onboarding/:path*',
    '/login',
    '/signup',
    '/forgot-password',
  ],
}
