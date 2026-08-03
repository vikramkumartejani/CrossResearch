'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { MOST_ASKED_LIMIT } from './helpTypes'
import { IconChevronRight, IconHelp, IconSearch, TOPIC_ICONS } from './helpIcons'
import QuestionList from './QuestionList'
import { useHelpCenter } from './useHelpCenter'

export default function HelpCenter() {
  const { title, subtitle, topics, articles, loading, error } = useHelpCenter()
  const [search, setSearch] = useState('')

  const activeArticles = useMemo(
    () => articles.filter((a) => a.active !== false),
    [articles]
  )

  const visibleTopics = useMemo(() => {
    return topics
      .filter((t) => t.active !== false)
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
      .map((t) => ({
        ...t,
        count: activeArticles.filter((a) => a.topic_id === t.id).length,
      }))
      .filter((t) => t.count > 0)
  }, [topics, activeArticles])

  const needle = search.trim().toLowerCase()
  const searching = needle.length > 0

  const mostAsked = useMemo(() => {
    return activeArticles
      .filter((a) => a.featured)
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
      .slice(0, MOST_ASKED_LIMIT)
  }, [activeArticles])

  const searchResults = useMemo(() => {
    if (!searching) return []
    return activeArticles
      .filter(
        (a) =>
          a.question.toLowerCase().includes(needle) ||
          a.answer.toLowerCase().includes(needle) ||
          a.topic_title.toLowerCase().includes(needle)
      )
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
  }, [activeArticles, needle, searching])

  return (
    <div className="px-4 lg:px-6 pb-8">
      <div className="mb-3 flex items-center gap-1.5">
        <IconHelp />
        <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Help Center</span>
      </div>

      <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
        {title}
      </h1>
      <p className="text-[#838388] text-[12px] leading-[17px] mb-5 max-w-2xl">{subtitle}</p>

      {loading && <p className="text-white/40 text-[13px] mb-4">Loading help center…</p>}
      {error && <p className="text-[#E25C3F] text-[13px] mb-4">{error}</p>}

      <div className="relative mb-6 w-full max-w-[550px]">
        <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <IconSearch />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all questions…"
          className="w-full h-9 sm:h-[42px] pl-8 sm:pl-9 pr-4 bg-[#16161F] border border-[#FFFFFF0D] text-white text-[12px] font-normal placeholder:text-[#838388] outline-none focus:border-[#FFFFFF25] transition-colors"
        />
      </div>

      {searching ? (
        <section>
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-white text-[18px] font-medium leading-[22px]">
              Search results
              <span className="text-white/40 text-[14px] font-normal ml-2">
                {searchResults.length}
              </span>
            </h2>
            <button
              type="button"
              className="text-[#88C4FF] text-[13px] hover:underline"
              onClick={() => setSearch('')}
            >
              Clear search
            </button>
          </div>
          <QuestionList
            items={searchResults}
            showTopic
            emptyText="No questions match your search."
          />
        </section>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-1">Browse by topic</h2>
            <p className="text-[#838388] text-[12px] mb-4">
              Open a topic to see all questions in that category.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {visibleTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/help-center/${topic.id}`}
                  className="group flex flex-col bg-[#16161F] p-3 sm:p-4 text-left transition-colors border border-transparent hover:border-[#FFFFFF18] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#88C4FF55]"
                >
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-lg flex-shrink-0">
                        {TOPIC_ICONS[topic.icon] || TOPIC_ICONS[topic.id] || <IconHelp />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[14px] font-semibold leading-[17px] truncate">
                          {topic.title}
                        </p>
                        <p className="text-white/55 text-[12px] font-normal leading-[14px] mt-1">
                          {topic.count} questions
                        </p>
                      </div>
                    </div>
                    <IconChevronRight className="text-white/50 group-hover:text-white transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-white/55 font-medium text-[13px] leading-[17px] line-clamp-2">
                    {topic.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-1">Most asked</h2>
            <p className="text-[#838388] text-[12px] mb-4">
              Quick answers curated by the team ({mostAsked.length} of {MOST_ASKED_LIMIT}).
            </p>
            <QuestionList
              items={mostAsked}
              showTopic
              emptyText="No featured questions yet."
            />
          </section>
        </>
      )}
    </div>
  )
}
