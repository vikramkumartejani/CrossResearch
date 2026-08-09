'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroEmailBar() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const goSignup = () => {
    const value = email.trim()
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email address.')
      return
    }
    setError(null)
    router.push(`/signup?email=${encodeURIComponent(value)}`)
  }

  return (
    <div className="w-full max-w-[560px] mx-auto mb-8 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3 h-[52px] sm:h-[60px] rounded-full bg-[#FFFFFF0A] border border-[#FFFFFF14] pl-5 sm:pl-6 pr-1.5 sm:pr-2 shadow-[0_0_0_1px_rgba(136,196,255,0.06)_inset]">
        <svg
          width="20"
          height="20"
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
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              goSignup()
            }
          }}
          placeholder="Add your email"
          autoComplete="email"
          aria-label="Email address"
          className="flex-1 min-w-0 bg-transparent h-full text-white text-[14px] sm:text-[16px] outline-none placeholder:text-white/45"
        />
        <button
          type="button"
          onClick={goSignup}
          className="shrink-0 h-[40px] sm:h-[46px] px-4 sm:px-6 rounded-full bg-white text-[#070711] text-[13px] sm:text-[15px] font-medium hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap"
        >
          Get Access
        </button>
      </div>
      {error ? (
        <p role="status" className="mt-2 text-center text-[13px] text-[#E25C3F]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
