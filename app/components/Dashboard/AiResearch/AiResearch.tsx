'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import {
  AI_RESEARCH_PROMPTS,
  DESK_FILE_REPLY,
  mockReplyFor,
  seedChatThreads,
  type DeskAttachment,
  type DeskMessage,
  type DeskThread,
} from '@/lib/deskChat'
import { quotesMapFromResponse } from '../Analysis/marketHeader'
import ChatHistorySidebar from './ChatHistorySidebar'
import DataAttachMenu, { type AttachKind } from './DataAttachMenu'

type ToolId = 'context' | 'mode' | 'chart' | 'sources'

type UiAttachment = DeskAttachment & { previewUrl?: string }

type UiMessage = Omit<DeskMessage, 'attachments'> & { attachments?: UiAttachment[] }

const HISTORY_KEY = 'cr_ai_research_threads'

const TOOLS: { id: ToolId; label: string; icon: ReactNode }[] = [
  {
    id: 'context',
    label: 'Asset Context',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <rect x="1.75" y="1.75" width="4.2" height="4.2" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <rect x="7.05" y="1.75" width="4.2" height="4.2" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1.75" y="7.05" width="4.2" height="4.2" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <rect x="7.05" y="7.05" width="4.2" height="4.2" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'mode',
    label: 'Research Mode',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path
          d="M3 2.5h7v8H3zM5 5h3M5 7.25h3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'chart',
    label: 'Chart',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path
          d="M2 10.5h9M4 10.5V7M6.5 10.5V4.5M9 10.5V6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'sources',
    label: 'Sources',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path
          d="M4.2 2.5h5.8v8H4.2C3.3 10.5 2.5 9.7 2.5 8.8V4.2C2.5 3.3 3.3 2.5 4.2 2.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M5.25 5h3.5M5.25 7.25h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const TICKER_FALLBACK = [
  { label: 'EURUSD', value: '1.08769' },
  { label: 'DXY', value: '97.45' },
  { label: 'US 2Y', value: '3.71%' },
  { label: 'US 10Y', value: '4.29%' },
  { label: 'VIX', value: '18.5' },
]

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#FFFFFF0D] rounded-[14px] rounded-bl-[4px] px-3.5 py-3 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#88C4FF] animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#88C4FF] animate-bounce [animation-delay:120ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#88C4FF] animate-bounce [animation-delay:240ms]" />
      </div>
    </div>
  )
}

function stripPreviews(messages: UiMessage[]): DeskMessage[] {
  return messages.map((m) => ({
    id: m.id,
    role: m.role,
    text: m.text,
    attachments: m.attachments?.map(({ id, kind, name }) => ({ id, kind, name })),
  }))
}

function titleFromMessages(messages: UiMessage[]) {
  const first = messages.find((m) => m.role === 'user')
  const fromText = first?.text.trim()
  if (fromText) return fromText.replace(/\s+/g, ' ').slice(0, 72)
  const file = first?.attachments?.[0]?.name
  return file || 'New research'
}

function loadThreads(): DeskThread[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (raw === null) return seedChatThreads()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return seedChatThreads()
    return parsed.filter(
      (t: DeskThread) => t && typeof t.id === 'string' && Array.isArray(t.messages)
    )
  } catch {
    return seedChatThreads()
  }
}

function saveThreads(threads: DeskThread[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(threads))
  } catch {
    // ignore quota
  }
}

function AttachmentChips({
  items,
  onRemove,
}: {
  items: UiAttachment[]
  onRemove?: (id: string) => void
}) {
  if (!items.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((file) => (
        <div
          key={file.id}
          className="inline-flex items-center gap-2 max-w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF08] pl-1.5 pr-2 py-1"
        >
          {file.kind !== 'doc' && file.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={file.previewUrl} alt="" className="w-7 h-7 rounded object-cover" />
          ) : (
            <span className="w-7 h-7 rounded bg-[#FFFFFF0D] text-[#838388] text-[9px] font-semibold inline-flex items-center justify-center uppercase">
              {file.kind === 'doc' ? 'DOC' : file.kind === 'screenshot' ? 'SCR' : 'IMG'}
            </span>
          )}
          <span className="text-[11px] truncate max-w-[140px] text-white/80">{file.name}</span>
          {onRemove && (
            <button
              type="button"
              aria-label={`Remove ${file.name}`}
              onClick={() => onRemove(file.id)}
              className="cursor-pointer text-[#838388] hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AiResearch() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<UiMessage[]>([])
  const [attachments, setAttachments] = useState<UiAttachment[]>([])
  const [threads, setThreads] = useState<DeskThread[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [dataOpen, setDataOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [tools, setTools] = useState<Record<ToolId, boolean>>({
    context: false,
    mode: false,
    chart: false,
    sources: false,
  })
  const [ticker, setTicker] = useState(TICKER_FALLBACK)
  const listRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const nextId = useRef(1)
  const inThread = messages.length > 0

  useEffect(() => {
    setThreads(loadThreads())
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/market-header?asset=EURUSD', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok || cancelled) return
        const quotes = quotesMapFromResponse(body.data ?? body)
        const quote = quotes.EURUSD
        if (!quote || typeof quote.price !== 'number') return
        const precision = quote.precision ?? 5
        setTicker((prev) =>
          prev.map((row) =>
            row.label === 'EURUSD' ? { ...row, value: quote.price.toFixed(precision) } : row
          )
        )
      } catch {
        // keep mock ticker
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!inThread) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [inThread, messages, typing])

  const persistMessages = useCallback((threadId: string | null, msgs: UiMessage[]) => {
    if (msgs.length === 0) return threadId
    const stored = stripPreviews(msgs)
    const title = titleFromMessages(msgs)
    const updatedAt = new Date().toISOString()
    const id = threadId || `t-${Date.now()}`
    setThreads((prev) => {
      const next = [...prev]
      const idx = next.findIndex((t) => t.id === id)
      const row: DeskThread = { id, title, updatedAt, messages: stored }
      if (idx >= 0) next[idx] = row
      else next.unshift(row)
      saveThreads(next)
      return next
    })
    return id
  }, [])

  function resizeTextarea() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`
  }

  function toggleTool(id: ToolId) {
    setTools((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function addFiles(files: File[], kind: AttachKind) {
    const added: UiAttachment[] = files.map((file) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      kind,
      name: file.name,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }))
    setAttachments((prev) => [...prev, ...added])
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => {
      const hit = prev.find((a) => a.id === id)
      if (hit?.previewUrl) URL.revokeObjectURL(hit.previewUrl)
      return prev.filter((a) => a.id !== id)
    })
  }

  function pushMock(text: string, files = attachments) {
    const trimmed = text.trim()
    if ((!trimmed && files.length === 0) || typing) return
    const userMsg: UiMessage = {
      id: nextId.current++,
      role: 'user',
      text: trimmed,
      attachments: files.length ? files : undefined,
    }
    const threadIdAtSend = activeId
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setAttachments([])
    setTyping(true)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    window.setTimeout(() => {
      const reply: UiMessage = {
        id: nextId.current++,
        role: 'bot',
        text: trimmed ? mockReplyFor(trimmed) : DESK_FILE_REPLY,
      }
      const complete = [...nextMessages, reply]
      setMessages(complete)
      setTyping(false)
      const id = persistMessages(threadIdAtSend, complete)
      if (id && id !== threadIdAtSend) setActiveId(id)
    }, 700)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    pushMock(input)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      pushMock(input)
    }
  }

  function startNew() {
    attachments.forEach((a) => {
      if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
    })
    if (messages.length) persistMessages(activeId, messages)
    setActiveId(null)
    setMessages([])
    setTyping(false)
    setInput('')
    setAttachments([])
    setHistoryOpen(false)
    textareaRef.current?.focus()
  }

  function openThread(id: string) {
    attachments.forEach((a) => {
      if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
    })
    if (messages.length && activeId !== id) persistMessages(activeId, messages)
    const thread = threads.find((t) => t.id === id)
    if (!thread) return
    setActiveId(id)
    setMessages(thread.messages)
    nextId.current = Math.max(0, ...thread.messages.map((m) => m.id)) + 1
    setTyping(false)
    setInput('')
    setAttachments([])
    setHistoryOpen(false)
  }

  function deleteThread(id: string) {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id)
      saveThreads(next)
      return next
    })
    if (activeId === id) {
      setActiveId(null)
      setMessages([])
    }
  }

  const canSend = Boolean(input.trim() || attachments.length) && !typing

  return (
    <div className="flex min-h-[calc(100dvh-8.5rem)] lg:min-h-[calc(100dvh-5.5rem)]">
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="mb-3 flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M8 1.5l1.05 3.2L12.4 5.7 9.05 7.05 8 10.5 6.95 7.05 3.6 5.7l3.35-1L8 1.5Z"
                  stroke="#838388"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5 10.5l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4.4-1.2Z"
                  stroke="#838388"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[#838388] text-[12px] leading-[14px] font-medium">
                Quantitative Market Intelligence
              </span>
            </div>
            <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
              CrossResearch AI
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] leading-[17px] text-[#838388]">
              {ticker.map((row, i) => (
                <span key={row.label} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="text-[#FFFFFF28]">|</span>}
                  <span>
                    {row.label} <span className="text-white tabular-nums">{row.value}</span>
                  </span>
                </span>
              ))}
              <span className="inline-flex items-center gap-3">
                <span className="text-[#FFFFFF28]">|</span>
                <span>
                  Macro Regime: <span className="text-white">Stagnation</span>
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="xl:hidden text-[#88C4FF] text-[12px] leading-[14px] hover:underline cursor-pointer"
            >
              History
            </button>
            {inThread && (
              <button
                type="button"
                onClick={startNew}
                className="text-[#88C4FF] text-[12px] leading-[14px] hover:underline cursor-pointer"
              >
                New research
              </button>
            )}
          </div>
        </div>

        <div className="px-4 lg:px-6 pb-6 flex-1 min-h-0 flex flex-col">
          <div className="mx-auto w-full max-w-[820px] flex flex-col flex-1 min-h-0">
            {inThread ? (
              <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto space-y-3 pb-4 dashboard-scroll">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[88%] px-3.5 py-2.5 text-[13px] sm:text-[14px] leading-[20px] whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-[#88C4FF] text-black rounded-[14px] rounded-br-[4px]'
                          : 'bg-[#FFFFFF0D] text-white/90 rounded-[14px] rounded-bl-[4px]'
                      }`}
                    >
                      {m.attachments && m.attachments.length > 0 && (
                        <div className="mb-2">
                          <AttachmentChips items={m.attachments} />
                        </div>
                      )}
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && <TypingDots />}
              </div>
            ) : (
              <div className="flex-1 min-h-0" aria-hidden />
            )}

            <div className="mt-auto shrink-0 pt-2">
              {!inThread && (
                <h2 className="text-white text-[18px] font-medium leading-[22px] mb-4">
                  What do you want to understand?
                </h2>
              )}

              <form onSubmit={onSubmit} className={!inThread ? 'mb-5' : undefined}>
                <div className="border border-[#FFFFFF0D] bg-[#16161F] px-3.5 pt-3.5 pb-3">
                  {attachments.length > 0 && (
                    <div className="mb-3">
                      <AttachmentChips items={attachments} onRemove={removeAttachment} />
                    </div>
                  )}
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value)
                      resizeTextarea()
                    }}
                    onKeyDown={onKeyDown}
                    rows={inThread ? 2 : 3}
                    placeholder="Analyze the current EURUSD setup across macro, positioning and price dynamics..."
                    className="w-full resize-none bg-transparent text-white text-[13px] sm:text-[14px] leading-[20px] placeholder:text-[#838388] outline-none min-h-[52px]"
                  />
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1 min-w-0">
                      <DataAttachMenu
                        open={dataOpen}
                        active={attachments.length > 0}
                        onToggle={() => setDataOpen((v) => !v)}
                        onClose={() => setDataOpen(false)}
                        onPick={addFiles}
                      />
                      {TOOLS.map((tool) => {
                        const on = tools[tool.id]
                        return (
                          <button
                            key={tool.id}
                            type="button"
                            onClick={() => toggleTool(tool.id)}
                            className={`inline-flex items-center gap-1.5 h-8 px-2.5 text-[12px] leading-none transition-colors cursor-pointer ${
                              on
                                ? 'bg-[#88C4FF1A] text-[#88C4FF] border border-[#88C4FF55]'
                                : 'text-[#838388] border border-transparent hover:text-white hover:bg-[#FFFFFF08]'
                            }`}
                          >
                            {tool.icon}
                            <span className="hidden sm:inline">{tool.label}</span>
                          </button>
                        )
                      })}
                    </div>
                    <button
                      type="submit"
                      disabled={!canSend}
                      aria-label="Send"
                      className="w-8 h-8 shrink-0 inline-flex items-center justify-center rounded-[8px] bg-[#88C4FF] text-black disabled:opacity-40 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-[#838388] mt-2 px-0.5">Preview only · replies are mocked</p>
              </form>

              {!inThread && (
                <div className="flex flex-col gap-2">
                  {AI_RESEARCH_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.question}
                      type="button"
                      onClick={() => pushMock(prompt.question, [])}
                      className="w-full flex items-center gap-4 sm:gap-8 px-4 py-3.5 bg-[#16161F] border border-transparent text-left hover:border-[#FFFFFF18] transition-colors cursor-pointer"
                    >
                      <span className="shrink-0 w-[92px] sm:w-[110px] text-[11px] tracking-[0.14em] uppercase text-[#838388] font-medium">
                        {prompt.category}
                      </span>
                      <span className="text-[13px] sm:text-[14px] leading-[20px] text-white/85">
                        {prompt.question}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex w-[268px] shrink-0 border-l border-[#FFFFFF0D]">
        <ChatHistorySidebar
          threads={threads}
          activeId={activeId}
          onSelect={openThread}
          onNew={startNew}
          onDelete={deleteThread}
        />
      </div>

      {historyOpen && (
        <div className="xl:hidden fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Close history"
            className="absolute inset-0 bg-black/60"
            onClick={() => setHistoryOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[min(100%,280px)] bg-[#070711] border-l border-[#FFFFFF0D]">
            <ChatHistorySidebar
              threads={threads}
              activeId={activeId}
              onSelect={openThread}
              onNew={startNew}
              onDelete={deleteThread}
              onClose={() => setHistoryOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
