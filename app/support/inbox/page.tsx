'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SUPPORT_AGENT_STORAGE, SUPPORT_KEY_STORAGE } from '@/lib/supportAuth'

type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed'

interface Ticket {
  id: string
  subject: string
  category: string
  status: Status
  updated: string
  msgs: number
  requester_name?: string
  requester_email?: string
}

export default function SupportInboxPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [error, setError] = useState<string | null>(null)
  const [agent, setAgent] = useState('Support Desk')

  const load = useCallback(async () => {
    try {
      setError(null)
      const key = sessionStorage.getItem(SUPPORT_KEY_STORAGE) || ''
      const res = await fetch('/api/tickets', {
        cache: 'no-store',
        headers: { 'X-Support-Key': key },
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Failed to load tickets'
        )
      }
      setTickets(Array.isArray(body.tickets) ? body.tickets : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    }
  }, [])

  useEffect(() => {
    const key = typeof window !== 'undefined' ? sessionStorage.getItem(SUPPORT_KEY_STORAGE) : null
    if (!key) {
      router.replace('/support/login')
      return
    }
    setAgent(sessionStorage.getItem(SUPPORT_AGENT_STORAGE) || 'Support Desk')
    setReady(true)
    void load()
  }, [router, load])

  function logout() {
    sessionStorage.removeItem(SUPPORT_KEY_STORAGE)
    sessionStorage.removeItem(SUPPORT_AGENT_STORAGE)
    router.push('/support/login')
  }

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#070711] text-white/50 text-sm">
        Checking access…
      </div>
    )
  }

  const openish = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress')

  return (
    <div className="min-h-screen bg-[#070711] text-white px-4 py-8 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[#838388] text-[12px] tracking-[0.14em] mb-2">Answer desk</p>
            <h1 className="text-[28px] sm:text-[34px] font-medium">Support inbox</h1>
            <p className="text-white/50 text-[13px] mt-1">Signed in as {agent}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="h-9 px-4 border border-[#FFFFFF14] text-[13px] text-white/80"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="h-9 px-4 border border-[#FFFFFF14] text-[13px] text-white/80"
            >
              Log out
            </button>
          </div>
        </div>

        {error && <p className="text-[#E25C3F] text-[13px] mb-4">{error}</p>}

        <p className="text-[#838388] text-[13px] mb-3">
          Needs attention: {openish.length} · All tickets: {tickets.length}
        </p>

        <div className="bg-[#16161F] border border-[#FFFFFF0D] divide-y divide-[#FFFFFF0D]">
          {tickets.length === 0 && (
            <p className="p-6 text-[#838388] text-[14px]">No tickets yet.</p>
          )}
          {tickets.map((t) => (
            <Link
              key={t.id}
              href={`/support/tickets/${t.id}`}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-4 hover:bg-[#FFFFFF06]"
            >
              <span className="text-[#838388] text-[13px] w-24 shrink-0">{t.id}</span>
              <span className="flex-1 text-[15px] font-medium">{t.subject}</span>
              <span className="text-[#838388] text-[12px]">{t.category}</span>
              <span className="text-[12px] font-semibold text-[#88C4FF] w-24">{t.status}</span>
              <span className="text-[#838388] text-[12px] w-28">{t.updated}</span>
              <span className="text-[#838388] text-[12px] w-16">{t.msgs} msgs</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
