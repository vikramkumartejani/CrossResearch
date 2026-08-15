'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import LoadingLabel from '../LoadingLabel'

export default function HeroEmailBar() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const subscribe = async () => {
    const value = email.trim()
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error('Enter a valid email address.')
      return
    }
    try {
      setLoading(true)
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'homepage' }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        const detail = body.details ?? body.detail ?? body.error
        throw new Error(typeof detail === 'string' ? detail : 'Could not subscribe.')
      }
      toast.success(body.already ? "You're already on the list." : "You're subscribed - we'll keep you posted.")
      setEmail('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not subscribe')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-fit max-w-full">
      <div className="inline-flex items-center gap-2 h-[40px] sm:h-[44px] rounded-full bg-[#FFFFFF0A] border border-[#FFFFFF14] pl-3.5 sm:pl-4 pr-1 shadow-[0_0_0_1px_rgba(136,196,255,0.06)_inset]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="shrink-0 opacity-70"
        >
          <path
            d="M17 5.5H3C2.44772 5.5 2 5.94772 2 6.5V13.5C2 14.0523 2.44772 14.5 3 14.5H17C17.5523 14.5 18 14.0523 18 13.5V6.5C18 5.94772 17.5523 5.5 17 5.5Z"
            stroke="#A5A5A5"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M3 6.75L9.15 11.05C9.66 11.41 10.34 11.41 10.85 11.05L17 6.75"
            stroke="#A5A5A5"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              void subscribe()
            }
          }}
          placeholder="Enter email to receive newsletter"
          autoComplete="email"
          aria-label="Email address"
          className="cr-autofill-dark w-[210px] sm:w-[270px] bg-transparent h-full text-white text-[13px] sm:text-[14px] outline-none placeholder:text-white/45"
        />
        <button
          type="button"
          onClick={() => void subscribe()}
          disabled={loading}
          className="shrink-0 min-w-[96px] h-[28px] sm:h-[32px] px-4 rounded-full bg-white text-[#070711] text-[13px] sm:text-[14px] font-medium hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-70"
        >
          <LoadingLabel loading={loading}>Subscribe</LoadingLabel>
        </button>
      </div>
    </div>
  )
}
