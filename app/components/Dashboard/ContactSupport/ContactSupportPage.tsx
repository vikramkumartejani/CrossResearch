'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed'
type TabKey = 'All' | Status

interface Ticket {
  id: string
  subject: string
  category: string
  status: Status
  updated: string
  msgs: number
}

const CATEGORIES = [
  'Data & Signals',
  'Account & Auth',
  'User Interface',
  'Billing',
  'Performance',
  'API Services',
  'Other',
]

const STATUS_STYLES: Record<Status, string> = {
  Open: 'text-[#6B7280]',
  'In Progress': 'text-[#A16207]',
  Resolved: 'text-[#2CB37B]',
  Closed: 'text-[#E25C3F]',
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`text-[14px] leading-[18px] font-semibold ${STATUS_STYLES[status] || 'text-[#838388]'}`}>
      {status}
    </span>
  )
}

function getTabs(tickets: Ticket[]): { key: TabKey; label: string; count: number }[] {
  return [
    { key: 'All', label: 'All', count: tickets.length },
    { key: 'Open', label: 'Open', count: tickets.filter((t) => t.status === 'Open').length },
    {
      key: 'In Progress',
      label: 'In Progress',
      count: tickets.filter((t) => t.status === 'In Progress').length,
    },
    { key: 'Resolved', label: 'Resolved', count: tickets.filter((t) => t.status === 'Resolved').length },
    { key: 'Closed', label: 'Closed', count: tickets.filter((t) => t.status === 'Closed').length },
  ]
}

function TicketCard({
  ticket,
  isLast,
  onOpen,
}: {
  ticket: Ticket
  isLast: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`w-full text-left px-3 py-3 cursor-pointer hover:bg-[#FFFFFF04] transition-colors ${!isLast ? 'border-b border-[#FFFFFF0D]' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#838388] text-[14px] leading-5 font-normal">{ticket.id}</span>
        <StatusBadge status={ticket.status} />
      </div>
      <p className="text-white text-[16px] leading-[20px] font-medium mb-2">{ticket.subject}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[#838388] text-[12px] leading-5">{ticket.category}</span>
        <span className="text-[#838388] text-[14px] leading-5">•</span>
        <span className="text-[#838388] text-[12px] leading-5">{ticket.updated}</span>
        <span className="text-[#838388] text-[12px] leading-5">•</span>
        <span className="text-[#838388] text-[12px] leading-5">{ticket.msgs} msgs</span>
      </div>
    </button>
  )
}

export default function ContactSupportPage() {
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [activeTab, setActiveTab] = useState<TabKey>('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    subject: '',
    category: CATEGORIES[0],
    body: '',
  })

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/tickets', { cache: 'no-store' })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        const detail = body.details ?? body.detail ?? body.error
        throw new Error(
          typeof detail === 'string'
            ? detail
            : `Failed to load tickets (${res.status})`
        )
      }
      setTickets(Array.isArray(body.tickets) ? body.tickets : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets')
      setTickets([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const tabs = useMemo(() => getTabs(tickets), [tickets])
  const filtered = activeTab === 'All' ? tickets : tickets.filter((t) => t.status === activeTab)

  async function createTicket(e: React.FormEvent) {
    e.preventDefault()
    try {
      setCreating(true)
      setError(null)
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        const detail = body.details ?? body.detail ?? body.error
        throw new Error(
          typeof detail === 'string' ? detail : 'Could not create ticket'
        )
      }
      const id = body.ticket?.id
      setShowNew(false)
      setForm({
        subject: '',
        category: CATEGORIES[0],
        body: '',
      })
      if (id) router.push(`/contact-support/${id}`)
      else await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create ticket')
    } finally {
      setCreating(false)
    }
  }

  function openTicket(id: string) {
    router.push(`/contact-support/${id}`)
  }

  return (
    <div className="px-4 lg:px-6">
      <div className="mb-3 flex items-center gap-1">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.125 9C16.125 12.935 12.935 16.125 9 16.125C7.77893 16.125 6.62955 15.8178 5.625 15.2765C4.22383 14.5215 3.28097 15.2234 2.44944 15.3494C2.3233 15.3685 2.19768 15.3227 2.10748 15.2325C1.97056 15.0956 1.9445 14.8838 2.02013 14.7056C2.34649 13.9364 2.64615 12.4787 2.23756 11.25C2.00235 10.5428 1.875 9.78623 1.875 9C1.875 5.06497 5.06497 1.875 9 1.875C12.935 1.875 16.125 5.06497 16.125 9Z"
            stroke="#838388"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-[#838388] text-[12px] leading-3.5 font-medium">Contact Support</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-1.5 sm:mb-2">
            Your Tickets
          </h3>
          <p className="text-[#838388] text-[12px] leading-[17px]">
            Open a new ticket, track conversations with the support desk, and search your historical
            requests.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="flex items-center gap-1 h-[33px] px-6 bg-[#88C4FF] text-black text-[14px] leading-5 font-medium hover:bg-[#88C4FF]/90 transition-colors cursor-pointer self-start sm:self-auto flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3.75V14.25" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.75 9H14.25" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          New Ticket
        </button>
      </div>

      {error && <p className="text-[#E25C3F] text-[13px] mb-3">{error}</p>}
      {loading && <ChartLoader className="min-h-[140px] mb-3" />}

      <div className="mb-5 overflow-x-auto">
        <div className="flex items-center sm:gap-2 bg-[#16161F] border border-[#FFFFFF0D] w-fit p-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1 text-[12px] sm:text-[14px] leading-5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-white bg-[#FFFFFF0D] font-semibold'
                  : 'text-[#838388] hover:text-white/70 font-normal'
              }`}
            >
              {tab.label} {tab.count}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden sm:block w-full bg-[#16161F] border border-[#FFFFFF08] overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#FFFFFF1A]">
              {['Ticket', 'Subject', 'Category', 'Status', 'Updated', 'Msgs'].map((col) => (
                <th
                  key={col}
                  className="px-6 pt-6 pb-[17px] text-left text-[14px] leading-[17px] font-semibold text-white whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-[#838388] text-[14px]">
                  No tickets yet. Click New Ticket to open one.
                </td>
              </tr>
            )}
            {filtered.map((ticket, i) => (
              <tr
                key={ticket.id}
                onClick={() => openTicket(ticket.id)}
                className={`cursor-pointer hover:bg-[#FFFFFF04] transition-colors ${i !== filtered.length - 1 ? 'border-b border-[#FFFFFF0D]' : ''}`}
              >
                <td className="px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal whitespace-nowrap">
                  {ticket.id}
                </td>
                <td className="px-6 py-5 text-[14px] leading-[17px] text-white font-medium">{ticket.subject}</td>
                <td className="px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal whitespace-nowrap">
                  {ticket.category}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal whitespace-nowrap">
                  {ticket.updated}
                </td>
                <td className="px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal text-left whitespace-nowrap">
                  {ticket.msgs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden w-full bg-[#16161F]">
        {!loading && filtered.length === 0 && (
          <p className="px-3 py-8 text-[#838388] text-[13px]">No tickets yet. Click New Ticket to open one.</p>
        )}
        {filtered.map((ticket, i) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            isLast={i === filtered.length - 1}
            onOpen={() => openTicket(ticket.id)}
          />
        ))}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={createTicket}
            className="w-full max-w-lg bg-[#16161F] border border-[#FFFFFF14] p-5 sm:p-6 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-white text-[20px] font-medium">New Ticket</h4>
                <p className="text-[#838388] text-[12px] mt-1">Describe the issue and our desk will reply.</p>
              </div>
              <button
                type="button"
                className="text-[#838388] hover:text-white"
                onClick={() => setShowNew(false)}
              >
                Close
              </button>
            </div>
            <label className="block text-[12px] text-[#838388]">
              Subject
              <input
                required
                className="mt-1 w-full bg-[#0E0E16] border border-[#FFFFFF14] px-3 py-2 text-white text-[14px] outline-none"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              />
            </label>
            <label className="block text-[12px] text-[#838388]">
              Category
              <select
                className="mt-1 w-full bg-[#0E0E16] border border-[#FFFFFF14] px-3 py-2 text-white text-[14px] outline-none"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-[#838388] text-[11px]">
              The ticket is created under your account - we&apos;ll reply to your registered email.
            </p>
            <label className="block text-[12px] text-[#838388]">
              Message
              <textarea
                required
                rows={5}
                className="mt-1 w-full bg-[#0E0E16] border border-[#FFFFFF14] px-3 py-2 text-white text-[14px] outline-none resize-y"
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              />
            </label>
            <button
              type="submit"
              disabled={creating}
              className="w-full h-[40px] bg-[#88C4FF] text-black font-medium text-[14px] disabled:opacity-50"
            >
              {creating ? 'Opening…' : 'Open ticket'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
