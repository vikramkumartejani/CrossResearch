'use client'

import Image from '@/lib/CldImage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SUPPORT_AGENT_STORAGE, SUPPORT_KEY_STORAGE } from '@/lib/supportAuth'

export default function SupportLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [key, setKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/support/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Support-Key': key.trim(),
        },
        body: '{}',
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || 'Invalid support desk key'
        )
      }
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(SUPPORT_KEY_STORAGE, key.trim())
        window.sessionStorage.setItem(
          SUPPORT_AGENT_STORAGE,
          email.trim() || body.agent || 'Support Desk'
        )
      }
      router.push('/support/inbox')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Image src="/assets/logo.svg" alt="CrossResearch" width={44} height={38} priority />
        <p className="text-[#838388] text-[12px] tracking-[0.14em] mt-6 mb-2">Help desk</p>
        <h1 className="text-white text-[28px] sm:text-[34px] font-medium leading-tight mb-2">
          Support answer login
        </h1>
        <p className="text-white/55 text-[14px] leading-6 mb-8">
          Separate from member signup. Employees unlock the answer inbox with the support desk key.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-[12px] text-[#838388]">
            Agent email / name
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@crossresearch.com"
              className="mt-1 w-full h-12 rounded-full bg-[#151B29] border border-[#FFFFFF0D] px-5 text-white outline-none"
            />
          </label>
          <label className="block text-[12px] text-[#838388]">
            Support desk key
            <input
              type="password"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="X-Support-Key"
              className="mt-1 w-full h-12 rounded-full bg-[#151B29] border border-[#FFFFFF0D] px-5 text-white outline-none"
            />
          </label>
          {error && <p className="text-[#E25C3F] text-[13px]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[#88C4FF] text-black font-semibold disabled:opacity-50"
          >
            {loading ? 'Checking…' : 'Enter inbox'}
          </button>
        </form>

        <p className="text-white/45 text-[13px] mt-6">
          Members open tickets at{' '}
          <Link href="/contact-support" className="text-[#88C4FF] underline underline-offset-2">
            Contact Support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
