'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { IconBack, IconHelp, IconSearch, TOPIC_ICONS } from './helpIcons'
import QuestionList from './QuestionList'
import { useHelpCenter } from './useHelpCenter'

export default function HelpTopic({ topicId }: { topicId: string }) {
  const { topics, articles, loading, error } = useHelpCenter()
  const [search, setSearch] = useState('')

  const topic = useMemo(
    () => topics.find((t) => t.id === topicId && t.active !== false) || null,
    [topics, topicId]
  )

  const questions = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return articles
      .filter((a) => a.active !== false && a.topic_id === topicId)
      .filter((a) => {
        if (!needle) return true
        return (
          a.question.toLowerCase().includes(needle) || a.answer.toLowerCase().includes(needle)
        )
      })
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
  }, [articles, topicId, search])

  const otherTopics = useMemo(() => {
    return topics
      .filter((t) => t.active !== false && t.id !== topicId)
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
  }, [topics, topicId])

  return (
    <div className="px-4 lg:px-6 pb-8">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-[12px]">
        <Link
          href="/help-center"
          className="inline-flex items-center gap-1 text-[#88C4FF] hover:underline"
        >
          <IconBack />
          Help Center
        </Link>
        <span className="text-white/30">/</span>
        <span className="text-[#838388] truncate">{topic?.title || 'Topic'}</span>
      </div>

      {loading && <p className="text-white/40 text-[13px] mb-4">Loading…</p>}
      {error && <p className="text-[#E25C3F] text-[13px] mb-4">{error}</p>}

      {!loading && !topic && !error && (
        <div className="bg-[#16161F] p-6">
          <p className="text-white text-[16px] font-medium mb-2">Topic not found</p>
          <p className="text-[#838388] text-[13px] mb-4">
            This topic may be inactive or the link is outdated.
          </p>
          <Link href="/help-center" className="text-[#88C4FF] text-[13px] hover:underline">
            Back to Help Center
          </Link>
        </div>
      )}

      {topic && (
        <>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-11 h-11 flex items-center justify-center bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-lg flex-shrink-0">
              {TOPIC_ICONS[topic.icon] || TOPIC_ICONS[topic.id] || <IconHelp />}
            </div>
            <div className="min-w-0">
              <h1 className="text-white text-[22px] sm:text-[28px] font-medium leading-tight mb-1">
                {topic.title}
              </h1>
              <p className="text-[#838388] text-[13px] leading-[18px]">{topic.desc}</p>
              <p className="text-white/40 text-[12px] mt-2">
                {questions.length} question{questions.length === 1 ? '' : 's'}
                {search.trim() ? ' matching' : ''}
              </p>
            </div>
          </div>

          <div className="relative mb-5 w-full max-w-[480px]">
            <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search in ${topic.title}…`}
              className="w-full h-9 sm:h-[42px] pl-8 sm:pl-9 pr-4 bg-[#16161F] border border-[#FFFFFF0D] text-white text-[12px] font-normal placeholder:text-[#838388] outline-none focus:border-[#FFFFFF25] transition-colors"
            />
          </div>

          <QuestionList
            items={questions}
            emptyText={
              search.trim()
                ? 'No questions match in this topic.'
                : 'No questions in this topic yet.'
            }
          />

          {otherTopics.length > 0 && (
            <div className="mt-8">
              <h2 className="text-white text-[15px] font-medium mb-3">Other topics</h2>
              <div className="flex flex-wrap gap-2">
                {otherTopics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/help-center/${t.id}`}
                    className="px-3 py-1.5 bg-[#16161F] border border-[#FFFFFF0D] text-white/70 text-[12px] hover:text-white hover:border-[#FFFFFF25] transition-colors"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
