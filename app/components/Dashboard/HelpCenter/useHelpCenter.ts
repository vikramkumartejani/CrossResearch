'use client'

import { useEffect, useState } from 'react'
import type { Article, HelpPayload, Topic } from './helpTypes'

export function useHelpCenter() {
  const [title, setTitle] = useState('How can I help you')
  const [subtitle, setSubtitle] = useState(
    'Search the knowledge base for setup guides, API references, regime engine documentation and platform best practices.'
  )
  const [topics, setTopics] = useState<Topic[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/help-center', { cache: 'no-store' })
        const body = (await res.json().catch(() => ({}))) as HelpPayload & {
          details?: string
          error?: string
          detail?: string
        }
        if (!res.ok) {
          throw new Error(
            typeof body.details === 'string'
              ? body.details
              : body.error || body.detail || `Failed to load (${res.status})`
          )
        }
        if (cancelled) return
        if (typeof body.title === 'string' && body.title.trim()) setTitle(body.title.trim())
        if (typeof body.subtitle === 'string' && body.subtitle.trim()) setSubtitle(body.subtitle.trim())
        setTopics(Array.isArray(body.topics) ? body.topics : [])
        setArticles(Array.isArray(body.articles) ? body.articles : [])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load')
          setTopics([])
          setArticles([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { title, subtitle, topics, articles, loading, error }
}
