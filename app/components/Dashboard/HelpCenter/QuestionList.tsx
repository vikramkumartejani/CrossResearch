'use client'

import { useState } from 'react'
import type { Article } from './helpTypes'
import { IconChevronRight } from './helpIcons'

export default function QuestionList({
  items,
  showTopic = false,
  emptyText = 'No articles match.',
}: {
  items: Article[]
  showTopic?: boolean
  emptyText?: string
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (items.length === 0) {
    return <p className="px-4 py-8 text-[#838388] text-[14px] bg-[#16161F]">{emptyText}</p>
  }

  return (
    <div className="bg-[#16161F]">
      {items.map((item, i) => {
        const open = openId === item.id
        return (
          <div key={item.id} className="border-b border-[#FFFFFF0D] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="group w-full flex items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-5 hover:bg-[#FFFFFF05] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <span className="text-white/50 text-[13px] sm:text-[14px] leading-[19px] font-medium w-5 sm:w-7 flex-shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white font-medium text-[14px] sm:text-[16px] leading-[18px] sm:leading-[22px]">
                  {item.question}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                {showTopic && (
                  <span className="text-white/45 text-[13px] leading-[19px] font-medium max-w-[160px] truncate">
                    {item.topic_title}
                  </span>
                )}
                <IconChevronRight
                  className={`text-white/60 transition-transform ${open ? 'rotate-90' : ''}`}
                />
              </div>
              <IconChevronRight
                className={`sm:hidden text-white/60 flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
              />
            </button>
            {open && (
              <div className="px-3 sm:px-6 pb-4 sm:pb-5 pl-10 sm:pl-[3.75rem]">
                <p className="text-white/70 text-[13px] sm:text-[14px] leading-6 whitespace-pre-wrap">
                  {item.answer || 'Answer coming soon.'}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
