'use client'

import { useEffect, useRef, useState } from 'react'
import Image from '@/lib/CldImage'
import { usePathname } from 'next/navigation'

type Role = 'bot' | 'user'

interface Message {
  id: number
  role: Role
  text: string
}

const WELCOME: Message[] = [
  {
    id: 1,
    role: 'bot',
    text: 'Hey - I’m the CrossResearch desk assistant. Ask what CrossResearch is, who it’s for, or how to use the platform.',
  },
]

const SUGGESTIONS = [
  'What is CrossResearch?',
  'Is CrossResearch a signal service?',
  'How should I use CrossResearch?',
]

type FaqEntry = {
  question: string
  answer: string
  /** Extra phrases that should map to this answer */
  aliases?: string[]
}

const MOCK_FAQS: FaqEntry[] = [
  {
    question: 'What is CrossResearch?',
    aliases: ['what is cross research', 'about crossresearch', 'tell me about crossresearch'],
    answer:
      'CrossResearch is a financial research and market intelligence platform built to help traders understand why markets move, not simply tell them when to buy or sell.\n\nWe combine macroeconomics, market data, positioning, cross-asset analysis, probabilities, research, and analytical tools in one platform.',
  },
  {
    question: 'How is CrossResearch different from other signal providers?',
    aliases: [
      'how is crossresearch different',
      'different from signal providers',
      'vs signal providers',
      'what makes crossresearch different',
    ],
    answer:
      'CrossResearch is not just another signal provider.\n\nMost platforms focus on telling you what to buy or sell. CrossResearch focuses on teaching you how to look at markets like a hedge fund or institutional investor.\n\nWe take you from the global macroeconomic cycle all the way to individual asset behavior, using large amounts of economic, financial, positioning, and market data.\n\nThe goal is not to make you dependent on signals. It is to help you understand what is happening, why it is happening, and how different markets connect.\n\nThis institutional way of approaching markets is rarely taught to retail traders in one structured platform.',
  },
  {
    question: 'Is CrossResearch a signal service?',
    aliases: ['signal service', 'do you provide signals', 'is it a signal', 'buy or sell signals'],
    answer:
      'Not primarily.\n\nSignals and market opportunities can be part of the platform, but CrossResearch is built around research, understanding, probabilities, and decision-making.\n\nInstead of simply receiving a BUY or SELL notification, you can understand the macro environment, catalysts, positioning, cross-asset confirmation, and risks behind a market view.',
  },
  {
    question: 'Who is CrossResearch for?',
    aliases: ['who is it for', 'who can use', 'target audience', 'for beginners'],
    answer:
      'CrossResearch is designed for traders and investors who want to develop a deeper understanding of financial markets.\n\nIt can be used by beginners who want to learn institutional market thinking as well as experienced traders looking for structured macro, positioning, and cross-asset research.',
  },
  {
    question: 'What can I find on CrossResearch?',
    aliases: ['what can i find', 'what does the platform include', 'what features', 'what tools'],
    answer:
      'CrossResearch brings together tools and research covering areas such as:\n\n• Macroeconomic cycles\n• Economic data and forecasts\n• Market probabilities\n• Cross-asset analysis\n• Market positioning\n• Institutional-style research\n• Financial news and market impact\n• Trading tools and indicators\n• Educational content',
  },
  {
    question: 'Do I need to understand macroeconomics before using CrossResearch?',
    aliases: ['need to understand macro', 'macroeconomics before', 'do i need macro knowledge'],
    answer:
      'No.\n\nCrossResearch is designed to make complex financial information easier to understand.\n\nYou can start with the basic explanations and progressively learn how macroeconomic conditions, interest rates, inflation, liquidity, positioning, and other factors influence financial assets.',
  },
  {
    question: 'What markets does CrossResearch cover?',
    aliases: ['what markets', 'markets covered', 'which markets', 'forex commodities crypto'],
    answer:
      'CrossResearch focuses on the major global markets, including Forex, commodities, equity indices, cryptocurrencies, bonds, interest rates, and macroeconomic data.\n\nThe platform also emphasizes the relationships between these markets rather than analyzing each asset in isolation.',
  },
  {
    question: 'How should I use CrossResearch?',
    aliases: ['how should i use', 'how to use', 'where do i start', 'getting started'],
    answer:
      "A good starting point is to understand the current macro environment, then examine relevant economic data, market probabilities, positioning, and cross-asset relationships.\n\nFrom there, you can use the platform's research and tools to understand how those conditions may affect individual markets.",
  },
  {
    question: 'Does CrossResearch provide financial advice?',
    aliases: ['financial advice', 'is this advice', 'personalized advice'],
    answer:
      'No. CrossResearch provides financial research, analytical tools, data, and educational content.\n\nThe information available on the platform is intended to support your own research and decision-making and should not be considered personalized financial advice.',
  },
  {
    question: 'What is the goal of CrossResearch?',
    aliases: ['what is the goal', 'goal of crossresearch', 'mission'],
    answer:
      'The goal is simple:\n\nHelp traders stop looking at markets as isolated charts and start understanding them as an interconnected financial system.\n\nCrossResearch aims to give users access to the type of thinking, data, and analytical framework traditionally associated with professional macro and hedge fund research.',
  },
  {
    question: 'Does CrossResearch have educational content?',
    aliases: ['educational content', 'education', 'learning content', 'tutorials', 'learn'],
    answer:
      'Yes.\n\nCrossResearch includes educational content from beginner to advanced level, covering everything from financial market fundamentals and macroeconomics to cross-asset analysis, positioning, market cycles, institutional research methods, quantitative concepts, and advanced trading frameworks.\n\nThe goal is to allow users to progressively build their knowledge while learning how professional investors and hedge funds approach financial markets.',
  },
]

const FALLBACK_REPLY =
  'I don’t have a mock answer for that yet. Try asking what CrossResearch is, who it’s for, what markets we cover, or how to use the platform.'

function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function mockReplyFor(query: string): string {
  const q = normalizeQuery(query)
  if (!q) return FALLBACK_REPLY

  let best: { score: number; answer: string } | null = null

  for (const faq of MOCK_FAQS) {
    const candidates = [faq.question, ...(faq.aliases ?? [])].map(normalizeQuery)
    for (const c of candidates) {
      let score = 0
      if (q === c) score = 100
      else if (q.includes(c) || c.includes(q)) score = 80
      else {
        const qWords = new Set(q.split(' ').filter((w) => w.length > 2))
        const cWords = c.split(' ').filter((w) => w.length > 2)
        const hits = cWords.filter((w) => qWords.has(w)).length
        if (hits >= 2) score = Math.min(70, hits * 15)
      }
      if (score > 0 && (!best || score > best.score)) {
        best = { score, answer: faq.answer }
      }
    }
  }

  return best && best.score >= 30 ? best.answer : FALLBACK_REPLY
}

const HIDE_ON = [
  '/login',
  '/signup',
  '/forgot-password',
  '/onboarding',
  '/support',
  '/affiliate/signup',
  '/affiliate/login',
  '/affiliate/forgot-password',
]

export default function ChatWidget() {
  const pathname = usePathname()
  const hidden = HIDE_ON.some((p) => pathname.startsWith(p))

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(WELCOME)
  const [typing, setTyping] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(2)

  useEffect(() => {
    if (!open) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [open, messages, typing])

  if (hidden) return null

  function pushMock(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    const userMsg: Message = { id: nextId.current++, role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: 'bot', text: mockReplyFor(trimmed) },
      ])
      setTyping(false)
    }, 700)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    pushMock(input)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]">
      {open && (
        <div className="mb-3 w-[min(100vw-2rem,380px)] h-[min(72vh,520px)] flex flex-col overflow-hidden rounded-[16px] border border-[#FFFFFF14] bg-[#101018] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#FFFFFF0D] bg-[#16161F]">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#88C4FF14] border border-[#88C4FF33] flex items-center justify-center">
                <Image src="/assets/logo.svg" alt="" width={18} height={16} />
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#2CB37B] border-2 border-[#16161F]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-[14px] font-semibold leading-4">Ask CrossResearch</p>
              <p className="text-[#838388] text-[11px] mt-0.5">Desk assistant · Preview</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 inline-flex items-center justify-center text-[#838388] hover:text-white transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Thread */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 dashboard-scroll">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-[19px] whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#88C4FF] text-black rounded-[14px] rounded-br-[4px]'
                      : 'bg-[#FFFFFF0D] text-white/90 rounded-[14px] rounded-bl-[4px]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#FFFFFF0D] rounded-[14px] rounded-bl-[4px] px-3.5 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88C4FF] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88C4FF] animate-bounce [animation-delay:120ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88C4FF] animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            )}

            {messages.length <= 1 && !typing && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => pushMock(s)}
                    className="text-left text-[12px] leading-[17px] text-[#88C4FF] border border-[#88C4FF33] bg-[#88C4FF0D] px-3 py-2 rounded-[10px] hover:bg-[#88C4FF1A] transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-[#FFFFFF0D] p-3 bg-[#16161F]">
            <div className="flex items-center gap-2 bg-[#0C0C14] border border-[#FFFFFF14] rounded-[12px] px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent text-white text-[13px] placeholder:text-[#838388] outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send"
                className="w-8 h-8 shrink-0 inline-flex items-center justify-center rounded-[8px] bg-[#88C4FF] text-black disabled:opacity-40 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-[#838388] mt-2 px-0.5">Preview only · replies are mocked</p>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`ml-auto flex h-14 w-14 items-center justify-center rounded-full border transition-colors cursor-pointer ${
          open
            ? 'bg-[#16161F] border-[#FFFFFF1A] text-white hover:bg-[#1E1E2A]'
            : 'bg-[#0D1115] border-[#88C4FF55] shadow-[0_8px_32px_rgba(136,196,255,0.28)] hover:border-[#88C4FF]'
        }`}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="26" height="22" viewBox="0 0 35 30" fill="none" aria-hidden>
            <path d="M25.148 20.725 22.639 27.567c-.425 1.252-1.621 2.128-2.943 2.155H3.172C1.388 29.663-.055 28.123.002 26.338V14.552c-.004-1.341.818-2.588 2.052-3.112l5.886-2.398v11.697l17.208-.014Z" fill="#88C4FF" />
            <path d="m32.755 18.326-5.658 2.399h6.879c.224 0 .44.089.598.247.159.159.248.374.248.599v7.305c-.004.46-.387.842-.846.846h-6.327c-.46-.004-.842-.387-.846-.846V9.012H7.91L10.47 2.207C10.956.898 12.238.004 13.634 0H31.438C33.281 0 34.822 1.541 34.822 3.384v11.771c.011.675-.18 1.337-.549 1.902-.369.565-.898 1.007-1.518 1.269Z" fill="#88C4FF" />
          </svg>
        )}
      </button>
    </div>
  )
}
