import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { ACCESS_COOKIE, REFRESH_COOKIE, applyAuthCookies, backendBase } from '@/lib/authCookies'
import {
  isAffiliatePath,
  loginPathForAccountType,
  postLoginRedirect,
  safeNextPath,
} from '@/lib/authRedirect'

const MEMBER_DASHBOARD_PREFIXES = [
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

const AUTH_PAGES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/affiliate/login',
  '/affiliate/signup',
  '/affiliate/forgot-password',
]

type AccessInfo = {
  valid: boolean
  onboardingDone: boolean
  accountType: 'member' | 'affiliate'
}

function isMemberDashboardPath(pathname: string) {
  return MEMBER_DASHBOARD_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function isAffiliateAuthPage(pathname: string) {
  return (
    pathname === '/affiliate/login' ||
    pathname === '/affiliate/signup' ||
    pathname === '/affiliate/forgot-password' ||
    pathname.startsWith('/affiliate/login/') ||
    pathname.startsWith('/affiliate/signup/') ||
    pathname.startsWith('/affiliate/forgot-password/')
  )
}

function jwtSecretKey() {
  const secret = (process.env.AUTH_JWT_SECRET || '').trim()
  if (secret.length >= 32) return new TextEncoder().encode(secret)
  const fallback =
    (process.env.ADMIN_API_KEY || 'crossresearch-admin-dev') + '-jwt-dev-only-change-me!!'
  return new TextEncoder().encode(fallback)
}

async function readAccess(token: string | undefined): Promise<AccessInfo> {
  if (!token) return { valid: false, onboardingDone: false, accountType: 'member' }
  try {
    const { payload } = await jwtVerify(token, jwtSecretKey(), { algorithms: ['HS256'] })
    if (payload.type !== 'access') {
      return { valid: false, onboardingDone: false, accountType: 'member' }
    }
    // Pre-role tokens must refresh so we get `at` from the current user doc
    if (payload.at !== 'member' && payload.at !== 'affiliate') {
      return { valid: false, onboardingDone: false, accountType: 'member' }
    }
    // Missing `ob` = legacy tokens treated as complete
    const onboardingDone = payload.ob !== 0 && payload.ob !== '0'
    const accountType = payload.at === 'affiliate' ? 'affiliate' : 'member'
    return { valid: true, onboardingDone, accountType }
  } catch {
    return { valid: false, onboardingDone: false, accountType: 'member' }
  }
}

function loginRedirect(request: NextRequest, accountType: 'member' | 'affiliate' = 'member') {
  const url = request.nextUrl.clone()
  const loginPath = loginPathForAccountType(accountType, request.nextUrl.pathname)
  const q = loginPath.indexOf('?')
  if (q >= 0) {
    url.pathname = loginPath.slice(0, q)
    url.search = loginPath.slice(q)
  } else {
    url.pathname = loginPath
    url.search = ''
  }
  return NextResponse.redirect(url)
}

function redirectTo(
  request: NextRequest,
  pathname: string,
  tokens?: {
    access_token: string
    refresh_token: string
    access_expires_in: number
    refresh_expires_in: number
  }
) {
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

function onboardingRedirect(
  request: NextRequest,
  tokens?: {
    access_token: string
    refresh_token: string
    access_expires_in: number
    refresh_expires_in: number
  }
) {
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

async function ensureAccess(
  request: NextRequest,
  info: AccessInfo
): Promise<{ info: AccessInfo; tokens: Awaited<ReturnType<typeof refreshViaBackend>> | null }> {
  if (info.valid) return { info, tokens: null }
  const tokens = await refreshViaBackend(request)
  if (!tokens?.access_token) return { info, tokens: null }
  return { info: await readAccess(tokens.access_token), tokens }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const access = request.cookies.get(ACCESS_COOKIE)?.value
  let info = await readAccess(access)

  if (isAffiliatePath(pathname)) {
    const ensured = await ensureAccess(request, info)
    info = ensured.info
    if (!info.valid) return loginRedirect(request, 'affiliate')
    // Member session cannot open the partner panel - send them to partner login to switch
    if (info.accountType !== 'affiliate') {
      return loginRedirect(request, 'affiliate')
    }
    if (ensured.tokens) {
      const res = NextResponse.next()
      applyAuthCookies(res, ensured.tokens)
      return res
    }
    return NextResponse.next()
  }

  if (isMemberDashboardPath(pathname)) {
    const ensured = await ensureAccess(request, info)
    info = ensured.info
    if (!info.valid) return loginRedirect(request, 'member')
    // Affiliate session cannot open member tools - send them to member login to switch
    if (info.accountType === 'affiliate') {
      return loginRedirect(request, 'member')
    }
    if (!info.onboardingDone) return onboardingRedirect(request, ensured.tokens || undefined)
    if (ensured.tokens) {
      const res = NextResponse.next()
      applyAuthCookies(res, ensured.tokens)
      return res
    }
    return NextResponse.next()
  }

  if (pathname === '/onboarding' || pathname.startsWith('/onboarding/')) {
    const ensured = await ensureAccess(request, info)
    info = ensured.info
    if (!info.valid) return loginRedirect(request, 'member')
    if (info.accountType === 'affiliate') {
      return loginRedirect(request, 'member')
    }
    if (info.onboardingDone) {
      return redirectTo(
        request,
        postLoginRedirect({
          onboardingDone: true,
          preferredNext: request.nextUrl.searchParams.get('next'),
          accountType: 'member',
        }),
        ensured.tokens || undefined
      )
    }
    if (ensured.tokens) {
      const res = NextResponse.next()
      applyAuthCookies(res, ensured.tokens)
      return res
    }
    return NextResponse.next()
  }

  if (isAuthPage(pathname)) {
    const preferredNext = request.nextUrl.searchParams.get('next')
    const authRole = isAffiliateAuthPage(pathname) ? 'affiliate' : 'member'
    const ensured = await ensureAccess(request, info)
    info = ensured.info
    if (info.valid) {
      // Same role already signed in → go to that role's home
      if (info.accountType === authRole) {
        return redirectTo(
          request,
          postLoginRedirect({
            onboardingDone: info.onboardingDone,
            preferredNext,
            accountType: info.accountType,
          }),
          ensured.tokens || undefined
        )
      }
      // Different role signed in → keep this auth page so they can switch accounts
      if (ensured.tokens) {
        const res = NextResponse.next()
        applyAuthCookies(res, ensured.tokens)
        return res
      }
      return NextResponse.next()
    }
    return NextResponse.next()
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
    '/affiliate/login',
    '/affiliate/signup',
    '/affiliate/forgot-password',
  ],
}
