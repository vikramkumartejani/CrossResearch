export type FaqEntry = {
  question: string
  answer: string
  aliases?: string[]
}

export type ResearchPrompt = {
  category: string
  question: string
}

export const DESK_WELCOME =
  "Hey - I'm the CrossResearch desk assistant. Ask what CrossResearch is, who it's for, or how to use the platform."

export const DESK_SUGGESTIONS = [
  'What is CrossResearch?',
  'Is CrossResearch a signal service?',
  'How should I use CrossResearch?',
]

export const AI_RESEARCH_PROMPTS: ResearchPrompt[] = [
  { category: 'Macro', question: 'What is currently driving EURUSD?' },
  { category: 'Cross Asset', question: 'Compare Gold sensitivity to real yields across the last 3 regimes.' },
  { category: 'Quant', question: 'Calculate the 60D rolling beta of BTC to Nasdaq.' },
  { category: 'Scenario', question: 'What would a 25 bp dovish repricing imply for DXY, Gold and Nasdaq?' },
  { category: 'Research', question: 'Compare current market conditions with previous late-cycle slowdowns.' },
]

export const MOCK_FAQS: FaqEntry[] = [
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

export type DeskRole = 'bot' | 'user'

export type DeskAttachment = {
  id: string
  kind: 'image' | 'doc' | 'screenshot'
  name: string
}

export type DeskMessage = {
  id: number
  role: DeskRole
  text: string
  attachments?: DeskAttachment[]
}

export type DeskThread = {
  id: string
  title: string
  updatedAt: string
  messages: DeskMessage[]
}

export function seedChatThreads(now = Date.now()): DeskThread[] {
  const picks: { faq: FaqEntry; agoMs: number }[] = [
    { faq: MOCK_FAQS[0], agoMs: 18 * 60 * 1000 },
    { faq: MOCK_FAQS[2], agoMs: 3 * 60 * 60 * 1000 },
    { faq: MOCK_FAQS[7], agoMs: 26 * 60 * 60 * 1000 },
    { faq: MOCK_FAQS[6], agoMs: 3 * 24 * 60 * 60 * 1000 },
    { faq: MOCK_FAQS[1], agoMs: 6 * 24 * 60 * 60 * 1000 },
  ]

  return picks.map((pick, i) => ({
    id: `mock-${i + 1}`,
    title: pick.faq.question,
    updatedAt: new Date(now - pick.agoMs).toISOString(),
    messages: [
      { id: 1, role: 'user', text: pick.faq.question },
      { id: 2, role: 'bot', text: pick.faq.answer },
    ],
  }))
}

export const DESK_FALLBACK_REPLY =
  "I don't have a mock answer for that yet. Try asking what CrossResearch is, who it's for, what markets we cover, or how to use the platform."

export const DESK_FILE_REPLY =
  "I received the attached file. Preview only - file analysis is not connected yet. Ask what CrossResearch is, who it's for, or how to use the platform."

export function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function mockReplyFor(query: string): string {
  const q = normalizeQuery(query)
  if (!q) return DESK_FALLBACK_REPLY

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

  return best && best.score >= 30 ? best.answer : DESK_FALLBACK_REPLY
}
