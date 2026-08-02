'use client'

import { useState } from 'react'

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setStatus('loading')
      setMessage(null)
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Could not subscribe'
        )
      }
      setStatus('ok')
      setMessage(body.already ? 'You’re already subscribed.' : 'Thanks — you’re on the list.')
      setEmail('')
    } catch (err) {
      setStatus('err')
      setMessage(err instanceof Error ? err.message : 'Could not subscribe')
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full mb-[17px] rounded-[20px] bg-[#FFFFFF08] px-4 sm:px-6 py-5">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="w-full sm:max-w-[221px]">
          <h4 className="text-white text-[18px] font-semibold leading-[27px] mb-4">Newsletter</h4>
          <p className="text-white/60 text-[12px] leading-[18px]">
            Stay updated with the latest market insights, product updates, and exclusive content.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full h-12 sm:h-[53px] flex items-center gap-2 bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-full px-4 sm:px-5 flex-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.75026 6.25L3.83616 6.8594C3.18087 7.29626 2.85323 7.51469 2.67567 7.84781C2.4981 8.18093 2.49942 8.57245 2.50205 9.35545C2.50522 10.2981 2.51398 11.2587 2.53824 12.2306C2.5958 14.5365 2.62458 15.6895 3.47238 16.5373C4.32018 17.3852 5.48873 17.4143 7.82581 17.4728C9.27978 17.5091 10.7208 17.5091 12.1747 17.4728C14.5119 17.4143 15.6804 17.3852 16.5282 16.5373C17.376 15.6895 17.4048 14.5365 17.4623 12.2306C17.4866 11.2587 17.4953 10.2981 17.4985 9.35545C17.5011 8.57245 17.5024 8.18092 17.3249 7.84781C17.1473 7.51469 16.8197 7.29626 16.1643 6.8594L15.2502 6.25"
                  stroke="#A5A5A5"
                  strokeWidth="1.08"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 8.5L7.68477 11.6109C8.81275 12.2877 9.37675 12.626 10 12.626C10.6232 12.626 11.1872 12.2877 12.3152 11.6109L17.5 8.5"
                  stroke="#A5A5A5"
                  strokeWidth="1.08"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.75 10V5.5C4.75 4.08579 4.75 3.37868 5.18934 2.93934C5.62869 2.5 6.33579 2.5 7.75 2.5H12.25C13.6642 2.5 14.3713 2.5 14.8107 2.93934C15.25 3.37868 15.25 4.08579 15.25 5.5V10"
                  stroke="#A5A5A5"
                  strokeWidth="1.08"
                />
                <path
                  d="M8.5 8.5H11.5M8.5 5.5H11.5"
                  stroke="#A5A5A5"
                  strokeWidth="1.08"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="bg-transparent h-12 sm:h-[53px] w-full text-white text-[14px] font-normal outline-none placeholder:text-white/60"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="sm:w-[140px] w-full bg-white text-[#070711] text-[16px] leading-[19px] font-inter font-medium px-6 h-12 sm:h-[53px] rounded-full hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              {status === 'loading' ? '…' : 'Subscribe'}
            </button>
          </div>
          {message && (
            <p className={`text-[12px] ${status === 'err' ? 'text-[#E25C3F]' : 'text-[#2CB37B]'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
