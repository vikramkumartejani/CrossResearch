'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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
  msgs: number
  requester_name?: string
  requester_email?: string
  messages: Message[]
}

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/tickets/${encodeURIComponent(id)}`, { cache: 'no-store' })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Ticket not found'
        )
      }
      setTicket(body.ticket || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ticket')
      setTicket(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  async function sendReply(e: React.FormEvent) {
    e.preventDefault()
    if (!id || !reply.trim()) return
    try {
      setSending(true)
      setError(null)
      const res = await fetch(`/api/tickets/${encodeURIComponent(id)}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', body: reply, author: 'You' }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof body.details === 'string'
            ? body.details
            : body.detail || body.error || 'Could not send reply'
        )
      }
      setTicket(body.ticket || null)
      setReply('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send reply')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="px-4 lg:px-6 pb-10">
      <Link href="/contact-support" className="text-[#88C4FF] text-[13px] hover:underline">
        ← Back to tickets
      </Link>

      {loading && <p className="text-white/40 text-[13px] mt-4">Loading…</p>}
      {error && <p className="text-[#E25C3F] text-[13px] mt-4">{error}</p>}

      {ticket && (
        <div className="mt-4 max-w-3xl">
          <p className="text-[#838388] text-[12px] mb-1">{ticket.id}</p>
          <h1 className="text-white text-[24px] sm:text-[32px] font-medium leading-tight mb-2">
            {ticket.subject}
          </h1>
          <p className="text-[#838388] text-[13px] mb-6">
            {ticket.category} · {ticket.status} · Updated {ticket.updated}
          </p>

          <div className="space-y-3 mb-6">
            {(ticket.messages || []).map((m) => (
              <div
                key={m.id}
                className={`border border-[#FFFFFF0D] p-4 ${m.role === 'agent' ? 'bg-[#88C4FF12]' : 'bg-[#16161F]'}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-white text-[13px] font-medium">
                    {m.role === 'agent' ? 'Support' : m.author}{' '}
                    <span className="text-[#838388] font-normal">
                      · {m.role === 'agent' ? 'Agent' : 'You'}
                    </span>
                  </span>
                  <span className="text-[#838388] text-[11px]">
                    {String(m.created_at || '').replace('T', ' ').replace('Z', '')}
                  </span>
                </div>
                <p className="text-white/80 text-[14px] leading-6 whitespace-pre-wrap">{m.body}</p>
              </div>
            ))}
          </div>

          {ticket.status !== 'Closed' ? (
            <form onSubmit={sendReply} className="space-y-3">
              <textarea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply…"
                className="w-full bg-[#16161F] border border-[#FFFFFF0D] px-3 py-2 text-white text-[14px] outline-none resize-y"
                required
              />
              <button
                type="submit"
                disabled={sending}
                className="h-[36px] px-5 bg-[#88C4FF] text-black text-[14px] font-medium disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send reply'}
              </button>
            </form>
          ) : (
            <p className="text-[#838388] text-[13px]">This ticket is closed.</p>
          )}
        </div>
      )}
    </div>
  )
}
