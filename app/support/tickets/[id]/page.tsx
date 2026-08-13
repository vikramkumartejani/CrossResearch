'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SUPPORT_AGENT_STORAGE, SUPPORT_KEY_STORAGE } from '@/lib/supportAuth'

type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed'

interface Message {
  id: string
  role: 'user' | 'agent'
  author: string
  body: string
  created_at: string
}

interface TicketDetail {
  id: string
  subject: string
  category: string
  status: Status
  updated: string
  requester_name?: string
  requester_email?: string
  messages: Message[]
}

const STATUSES: Status[] = ['Open', 'In Progress', 'Resolved', 'Closed']

export default function SupportTicketAnswerPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params?.id
  const [ready, setReady] = useState(false)
  const [key, setKey] = useState('')
  const [agent, setAgent] = useState('Support Desk')
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [status, setStatus] = useState<Status>('In Progress')
  const [sending, setSending] = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    try {
      setError(null)
      const supportKey = sessionStorage.getItem(SUPPORT_KEY_STORAGE) || ''
      const res = await fetch(`/api/tickets/${encodeURIComponent(id)}`, {
        cache: 'no-store',
        headers: { 'X-Support-Key': supportKey },
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Ticket not found'
        )
      }
      setTicket(body.ticket || null)
      if (body.ticket?.status) setStatus(body.ticket.status)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    }
  }, [id])

  useEffect(() => {
    const k = typeof window !== 'undefined' ? sessionStorage.getItem(SUPPORT_KEY_STORAGE) : null
    if (!k) {
      router.replace('/support/login')
      return
    }
    setKey(k)
    setAgent(sessionStorage.getItem(SUPPORT_AGENT_STORAGE) || 'Support Desk')
    setReady(true)
    void load()
  }, [router, load])

  async function sendAnswer(e: React.FormEvent) {
    e.preventDefault()
    if (!id || !reply.trim()) return
    try {
      setSending(true)
      setError(null)
      const res = await fetch(`/api/tickets/${encodeURIComponent(id)}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Support-Key': key,
        },
        body: JSON.stringify({
          role: 'agent',
          author: agent,
          body: reply,
          status,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Could not send answer'
        )
      }
      setTicket(body.ticket || null)
      setReply('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send answer')
    } finally {
      setSending(false)
    }
  }

  async function saveStatusOnly() {
    if (!id) return
    try {
      setSending(true)
      setError(null)
      const res = await fetch(`/api/tickets/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Support-Key': key,
        },
        body: JSON.stringify({ status }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Could not update status'
        )
      }
      setTicket(body.ticket || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update status')
    } finally {
      setSending(false)
    }
  }

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#070711] text-white/50 text-sm">
        Checking access…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070711] text-white px-4 py-8 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/support/inbox" className="text-[#88C4FF] text-[13px] hover:underline">
          ← Inbox
        </Link>

        {error && <p className="text-[#E25C3F] text-[13px] mt-4">{error}</p>}

        {ticket && (
          <div className="mt-4">
            <p className="text-[#838388] text-[12px] mb-1">{ticket.id}</p>
            <h1 className="text-[26px] sm:text-[32px] font-medium leading-tight mb-2">{ticket.subject}</h1>
            <p className="text-[#838388] text-[13px] mb-6">
              {ticket.category}
              {ticket.requester_email ? ` · ${ticket.requester_email}` : ''}
              {ticket.requester_name ? ` · ${ticket.requester_name}` : ''}
            </p>

            <div className="space-y-3 mb-6">
              {(ticket.messages || []).map((m) => (
                <div
                  key={m.id}
                  className={`border border-[#FFFFFF0D] p-4 ${m.role === 'agent' ? 'bg-[#88C4FF12]' : 'bg-[#16161F]'}`}
                >
                  <div className="flex justify-between gap-2 mb-2 text-[12px]">
                    <span className="font-medium">
                      {m.author} · {m.role === 'agent' ? 'Agent' : 'User'}
                    </span>
                    <span className="text-[#838388]">
                      {String(m.created_at || '').replace('T', ' ').replace('Z', '')}
                    </span>
                  </div>
                  <p className="text-white/85 text-[14px] leading-6 whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
            </div>

            <form onSubmit={sendAnswer} className="space-y-3 border border-[#FFFFFF0D] p-4 bg-[#16161F]">
              <p className="text-[13px] text-white/70">Answer as {agent}</p>
              <textarea
                required
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write the support answer…"
                className="w-full bg-[#0E0E16] border border-[#FFFFFF14] px-3 py-2 text-[14px] outline-none resize-y"
              />
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-[12px] text-[#838388] flex items-center gap-2">
                  Status
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Status)}
                    className="bg-[#0E0E16] border border-[#FFFFFF14] px-2 py-1.5 text-white text-[13px]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => void saveStatusOnly()}
                  disabled={sending}
                  className="h-9 px-3 border border-[#FFFFFF14] text-[13px] disabled:opacity-50"
                >
                  Update status only
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="h-9 px-4 bg-[#88C4FF] text-black text-[13px] font-semibold disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Send answer'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
