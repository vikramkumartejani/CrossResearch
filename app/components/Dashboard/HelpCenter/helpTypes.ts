export type Topic = {
  id: string
  icon: string
  title: string
  desc: string
  sort_order: number
  active: boolean
}

export type Article = {
  id: string
  topic_id: string
  topic_title: string
  question: string
  answer: string
  sort_order: number
  active: boolean
  featured: boolean
}

export type HelpPayload = {
  title?: string
  subtitle?: string
  topics?: Topic[]
  articles?: Article[]
}

export const MOST_ASKED_LIMIT = 10
