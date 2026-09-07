'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { initialsFromName } from '@/lib/authUi'
import { PLAN_LABEL, type PlanId } from '@/lib/plans'
import { startWhopCheckout } from '@/lib/startCheckout'
import { usePlan } from '../PlanProvider'
import { dashCardClass, useDashboardTheme, type DashboardTheme } from '../DashboardTheme'
import ChartLoader from '../shared/ChartLoader'

const SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'security', label: 'Security' },
  { id: 'plan', label: 'Plan & billing' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

function ink(theme: DashboardTheme) {
  return theme === 'light' ? 'text-[#0F172A]' : 'text-white'
}

function muted(theme: DashboardTheme) {
  return theme === 'light' ? 'text-[#5B6472]' : 'text-[#838388]'
}

function hairline(theme: DashboardTheme) {
  return theme === 'light' ? 'border-[#E8EAEF]' : 'border-[#FFFFFF0D]'
}

function fieldClass(theme: DashboardTheme) {
  return theme === 'light'
    ? 'w-full h-[42px] bg-[#F7F8FA] border border-[#D5D8E0] text-[#0F172A] placeholder:text-[#838388] px-3 text-[13px] outline-none focus:border-[#88C4FF] transition-colors'
    : 'w-full h-[42px] bg-[#0B0B10] border border-[#FFFFFF0D] text-white placeholder:text-[#838388] px-3 text-[13px] outline-none focus:border-[#FFFFFF25] transition-colors'
}

function labelClass(theme: DashboardTheme) {
  return `block text-[12px] leading-[14px] font-medium mb-2 ${muted(theme)}`
}

function deskPrimary(disabled: boolean) {
  return `inline-flex items-center justify-center h-[33px] px-5 text-[14px] leading-5 font-medium transition-colors ${
    disabled
      ? 'bg-[#88C4FF66] text-black/50 cursor-not-allowed'
      : 'bg-[#88C4FF] text-black hover:bg-[#88C4FF]/90 cursor-pointer'
  }`
}

function deskGhost(theme: DashboardTheme, disabled = false) {
  return theme === 'light'
    ? `inline-flex items-center justify-center h-[33px] px-5 text-[14px] font-medium border border-[#D5D8E0] text-[#0F172A] transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F3F5F8] cursor-pointer'
      }`
    : `inline-flex items-center justify-center h-[33px] px-5 text-[14px] font-medium border border-[#FFFFFF1A] text-white transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFFFFF0A] cursor-pointer'
      }`
}

function errDetail(body: Record<string, unknown>, fallback: string) {
  const d = body.detail ?? body.details ?? body.error
  if (typeof d === 'string' && d.trim()) return d
  return fallback
}

function Section({
  id,
  eyebrow,
  title,
  description,
  theme,
  children,
  action,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  theme: DashboardTheme
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${dashCardClass(theme)}`}>
      <div className={`px-4 sm:px-5 pt-4 sm:pt-5 pb-4 border-b ${hairline(theme)}`}>
        <p className="text-[#88C4FF] text-[12px] leading-[14px] font-normal mb-2">{eyebrow}</p>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0">
            <h2 className={`text-[18px] leading-[22px] font-medium ${ink(theme)}`}>{title}</h2>
            <p className={`mt-1.5 text-[12px] leading-[17px] max-w-[52ch] ${muted(theme)}`}>{description}</p>
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">{children}</div>
    </section>
  )
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  theme,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  autoComplete: string
  theme: DashboardTheme
}) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className={labelClass(theme)} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className={`${fieldClass(theme)} pr-16`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-2 h-7 text-[11px] font-medium ${muted(theme)} hover:text-[#88C4FF] transition-colors cursor-pointer`}
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { user, plan, loading, refresh } = usePlan()
  const { theme, setTheme } = useDashboardTheme()
  const [active, setActive] = useState<SectionId>('profile')

  const [fullName, setFullName] = useState('')
  const [tvUsername, setTvUsername] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  const [checkoutBusy, setCheckoutBusy] = useState<string | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (!user) return
    setFullName(user.full_name || '')
    setTvUsername(user.tradingview_username || '')
  }, [user])

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target?.id as SectionId | undefined
        if (id && SECTIONS.some((s) => s.id === id)) setActive(id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [loading, user])

  const initials = useMemo(() => initialsFromName(user?.full_name || user?.email || 'U'), [user])
  const profileDirty = useMemo(() => {
    if (!user) return false
    return (
      fullName.trim() !== (user.full_name || '').trim() ||
      (tvUsername.trim() || '') !== (user.tradingview_username || '')
    )
  }, [user, fullName, tvUsername])

  const passwordReady = Boolean(currentPassword && newPassword && confirmPassword)

  const scrollTo = useCallback((id: SectionId) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  async function saveProfile() {
    if (!profileDirty || savingProfile) return
    try {
      setSavingProfile(true)
      const res = await fetch('/api/auth/me/profile', {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          tradingview_username: tvUsername.trim() || null,
        }),
      })
      const body = (await res.json().catch(() => ({}))) as Record<string, unknown>
      if (!res.ok) throw new Error(errDetail(body, 'Could not save profile'))
      await refresh()
      toast.success('Profile saved')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save profile')
    } finally {
      setSavingProfile(false)
    }
  }

  async function savePassword() {
    if (savingPassword) return
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match')
      return
    }
    try {
      setSavingPassword(true)
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      })
      const body = (await res.json().catch(() => ({}))) as Record<string, unknown>
      if (!res.ok) throw new Error(errDetail(body, 'Could not update password'))
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast.success(typeof body.message === 'string' ? body.message : 'Password updated')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update password')
    } finally {
      setSavingPassword(false)
    }
  }

  async function upgrade(planId: 'gold' | 'platinum') {
    const key = `${planId}-monthly`
    try {
      setCheckoutBusy(key)
      await startWhopCheckout(planId, 'monthly')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not start checkout')
      setCheckoutBusy(null)
    }
  }

  async function handleLogout() {
    try {
      setLoggingOut(true)
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
    } catch {
      // continue
    } finally {
      window.location.assign('/login')
    }
  }

  if (loading) {
    return (
      <div className="px-4 lg:px-6 pb-10">
        <ChartLoader className="min-h-[220px]" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="px-4 lg:px-6 pb-10">
        <p className={`text-[13px] ${muted(theme)}`}>Sign in to manage your settings.</p>
      </div>
    )
  }

  const planLabel = PLAN_LABEL[plan as PlanId] || PLAN_LABEL.free
  const shell = theme === 'light' ? 'bg-[#FFFFFF] border-[#D5D8E0]' : 'bg-[#16161F] border-[#FFFFFF0D]'

  return (
    <div className="px-4 lg:px-6 pb-10">
      <div className="mb-3 flex items-center gap-1.5">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M9 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
            stroke="#838388"
            strokeWidth="1.2"
          />
          <path
            d="M14.4 9.7v-1.4l-1.5-.3a4.8 4.8 0 00-.4-1l.9-1.3-1-1-1.3.9a4.8 4.8 0 00-1-.4L9.7 3.6H8.3l-.3 1.5a4.8 4.8 0 00-1 .4l-1.3-.9-1 1 .9 1.3a4.8 4.8 0 00-.4 1l-1.5.3v1.4l1.5.3c.1.35.24.68.4 1l-.9 1.3 1 1 1.3-.9c.32.16.65.3 1 .4l.3 1.5h1.4l.3-1.5c.35-.1.68-.24 1-.4l1.3.9 1-1-.9-1.3c.16-.32.3-.65.4-1l1.5-.3z"
            stroke="#838388"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Account</span>
      </div>

      <h1 className={`text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2 ${ink(theme)}`}>
        Settings
      </h1>
      <p className={`text-[12px] leading-[17px] mb-5 sm:mb-6 max-w-2xl ${muted(theme)}`}>
        Profile, desk appearance, security, and plan - same controls as the rest of CrossResearch.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-4 lg:gap-5 items-start">
        <aside className="lg:sticky lg:top-4">
          <div className={`border p-1 ${shell}`}>
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {SECTIONS.map((s) => {
                const on = active === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className={`shrink-0 text-left px-3 py-2 text-[13px] sm:text-[14px] leading-5 transition-colors cursor-pointer whitespace-nowrap ${
                      on
                        ? theme === 'light'
                          ? 'text-[#0F172A] bg-[#EEF2F7] font-semibold'
                          : 'text-white bg-[#FFFFFF0D] font-semibold'
                        : `${muted(theme)} ${
                            theme === 'light' ? 'hover:text-[#0F172A]' : 'hover:text-white/70'
                          } font-normal`
                    }`}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-4 max-w-[760px]">
          <Section
            id="profile"
            eyebrow="Identity"
            title="Profile"
            description="How you appear across the desk. Email stays on the account for sign-in and support."
            theme={theme}
            action={
              <button
                type="button"
                disabled={!profileDirty || savingProfile}
                onClick={() => void saveProfile()}
                className={deskPrimary(!profileDirty || savingProfile)}
              >
                {savingProfile ? 'Saving…' : 'Save changes'}
              </button>
            }
          >
            <div className={`flex items-center gap-3 sm:gap-4 pb-4 border-b ${hairline(theme)}`}>
              <div className="relative flex-shrink-0">
                <div
                  className={`w-11 h-11 rounded-full border flex items-center justify-center text-[15px] font-medium ${
                    theme === 'light'
                      ? 'bg-[#F3F5F8] border-[#D5D8E0] text-[#5B6472]'
                      : 'bg-[#FFFFFF08] border-[#FFFFFF1A] text-white/60'
                  }`}
                >
                  {initials}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#62A381] border ${
                    theme === 'light' ? 'border-white' : 'border-[#16161F]'
                  }`}
                />
              </div>
              <div className="min-w-0">
                <p className={`text-[14px] leading-[17px] font-semibold truncate ${ink(theme)}`}>
                  {user.full_name || 'Member'}
                </p>
                <p className={`text-[12px] leading-[14px] mt-1 truncate ${muted(theme)}`}>{user.email}</p>
              </div>
              <span
                className={`ml-auto hidden sm:inline-flex items-center px-3 h-[26px] text-[11px] font-medium rounded-[72px] border border-[#FFFFFF1A] text-[#88C4FF]`}
              >
                {planLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass(theme)} htmlFor="settings-name">
                  Full name
                </label>
                <input
                  id="settings-name"
                  className={fieldClass(theme)}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className={labelClass(theme)} htmlFor="settings-email">
                  Email
                </label>
                <input
                  id="settings-email"
                  className={`${fieldClass(theme)} opacity-60 cursor-not-allowed`}
                  value={user.email}
                  disabled
                  readOnly
                />
              </div>
              <div>
                <label className={labelClass(theme)} htmlFor="settings-tv">
                  TradingView username
                </label>
                <input
                  id="settings-tv"
                  className={fieldClass(theme)}
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  placeholder="optional"
                  autoComplete="off"
                />
              </div>
            </div>
            <p className={`text-[12px] leading-[17px] ${muted(theme)}`}>
              Need a different email?{' '}
              <Link href="/contact-support" className="text-[#88C4FF] hover:underline">
                Open a support ticket
              </Link>
              .
            </p>
          </Section>

          <Section
            id="appearance"
            eyebrow="Display"
            title="Appearance"
            description="Theme is saved on this device only."
            theme={theme}
          >
            <div className={`inline-flex items-center border p-1 ${shell}`}>
              {(
                [
                  { id: 'dark' as const, label: 'Dark' },
                  { id: 'light' as const, label: 'Light' },
                ] as const
              ).map((opt) => {
                const on = theme === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`px-4 py-1.5 text-[13px] sm:text-[14px] leading-5 transition-colors cursor-pointer ${
                      on
                        ? theme === 'light'
                          ? 'text-[#0F172A] bg-[#EEF2F7] font-semibold'
                          : 'text-white bg-[#FFFFFF0D] font-semibold'
                        : `${muted(theme)} ${
                            theme === 'light' ? 'hover:text-[#0F172A]' : 'hover:text-white/70'
                          } font-normal`
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </Section>

          <Section
            id="security"
            eyebrow="Access"
            title="Security"
            description="Other signed-in devices are logged out after a successful password change."
            theme={theme}
            action={
              <button
                type="button"
                disabled={savingPassword || !passwordReady}
                onClick={() => void savePassword()}
                className={deskPrimary(savingPassword || !passwordReady)}
              >
                {savingPassword ? 'Updating…' : 'Update password'}
              </button>
            }
          >
            <PasswordField
              id="settings-current-pw"
              label="Current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
              theme={theme}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordField
                id="settings-new-pw"
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                autoComplete="new-password"
                theme={theme}
              />
              <PasswordField
                id="settings-confirm-pw"
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
                theme={theme}
              />
            </div>
            <p className={`text-[12px] leading-[17px] ${muted(theme)}`}>
              Forgot your current password?{' '}
              <Link href="/forgot-password" className="text-[#88C4FF] hover:underline">
                Reset via email
              </Link>
            </p>
          </Section>

          <Section
            id="plan"
            eyebrow="Subscription"
            title="Plan & billing"
            description="Your pack controls which desks and signals stay unlocked."
            theme={theme}
          >
            <div
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border ${hairline(theme)} ${
                theme === 'light' ? 'bg-[#F7F8FA]' : 'bg-[#0B0B10]'
              }`}
            >
              <div>
                <p className={`text-[12px] leading-[14px] ${muted(theme)}`}>Current plan</p>
                <p className={`text-[18px] leading-[22px] font-medium mt-1.5 ${ink(theme)}`}>{planLabel}</p>
              </div>
              {plan !== 'platinum' ? (
                <div className="flex flex-wrap gap-2">
                  {plan === 'free' ? (
                    <button
                      type="button"
                      disabled={!!checkoutBusy}
                      onClick={() => void upgrade('gold')}
                      className={deskGhost(theme, !!checkoutBusy)}
                    >
                      {checkoutBusy === 'gold-monthly' ? 'Opening…' : 'Upgrade to Gold'}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    disabled={!!checkoutBusy}
                    onClick={() => void upgrade('platinum')}
                    className={deskPrimary(!!checkoutBusy)}
                  >
                    {checkoutBusy === 'platinum-monthly' ? 'Opening…' : 'Upgrade to Platinum'}
                  </button>
                </div>
              ) : (
                <span className={`text-[13px] font-medium ${muted(theme)}`}>Full access</span>
              )}
            </div>
            <p className={`text-[12px] leading-[17px] ${muted(theme)}`}>
              Billing runs through checkout. For invoices or cancellations, use{' '}
              <Link href="/contact-support" className="text-[#88C4FF] hover:underline">
                Contact Support
              </Link>
              .
            </p>
          </Section>

          <section className={`${dashCardClass(theme)} px-4 sm:px-5 py-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-[#88C4FF] text-[12px] leading-[14px] font-normal mb-1.5">Session</p>
                <h2 className={`text-[16px] leading-[20px] font-medium ${ink(theme)}`}>Sign out</h2>
                <p className={`mt-1 text-[12px] leading-[17px] ${muted(theme)}`}>
                  End this session on the current device.
                </p>
              </div>
              <button
                type="button"
                disabled={loggingOut}
                onClick={() => void handleLogout()}
                className="inline-flex items-center justify-center h-[33px] px-5 text-[14px] font-medium text-[#E25C3F] border border-[#E25C3F33] hover:bg-[#E25C3F14] transition-colors cursor-pointer"
              >
                {loggingOut ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
