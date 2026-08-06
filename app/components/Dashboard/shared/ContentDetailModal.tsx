'use client'

import { useEffect } from 'react'

export type ContentDetailItem = {
  title: string
  subtitle?: string
  tags?: string[]
  author?: string
  date?: string
  desc?: string
  contentHtml?: string
}

const CONTENT_CLASS =
  'text-white/80 text-[15px] leading-7 ' +
  '[&_strong]:text-white [&_em]:text-white/90 [&_u]:text-white/90 ' +
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 ' +
  '[&_li]:mb-1 [&_p]:mb-3 [&_h2]:text-white [&_h2]:text-[20px] [&_h2]:font-medium [&_h2]:mb-3 ' +
  '[&_h3]:text-white [&_h3]:text-[17px] [&_h3]:font-medium [&_h3]:mb-2 ' +
  '[&_a]:text-[#88C4FF] [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default function ContentDetailModal({
  item,
  onClose,
}: {
  item: ContentDetailItem
  onClose: () => void
}) {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const html =
    item.contentHtml?.trim() ||
    (item.desc?.trim() ? `<p>${escapeHtml(item.desc.trim())}</p>` : '<p></p>')

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B0B10] overflow-y-auto">
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] w-10 h-10 flex items-center justify-center bg-[#FFFFFF0A] border border-[#FFFFFF14] hover:bg-[#FFFFFF14] transition-colors cursor-pointer"
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4L14 14M14 4L4 14" stroke="#FAFAF9" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div className="max-w-[860px] mx-auto px-4 sm:px-8 pt-10 sm:pt-12 pb-16">
        {item.tags && item.tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 h-[26px] text-[#88C4FF] text-[11px] sm:text-[12px] leading-[17px] uppercase font-medium rounded-[72px] border border-[#FFFFFF1A]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <h1 className="text-white text-[26px] sm:text-[34px] leading-[1.2] font-medium mb-3">
          {item.title}
        </h1>
        {item.subtitle ? (
          <p className="text-[#88C4FF] text-[14px] sm:text-[16px] leading-[22px] font-medium mb-5">
            {item.subtitle}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] sm:text-[13px] text-[#838388] mb-6 sm:mb-8 pb-4 border-b border-[#FFFFFF0D]">
          {item.author ? <span>{item.author}</span> : null}
          {item.date ? <span>{item.date}</span> : null}
        </div>

        <div className="bg-[#16161F] border border-[#FFFFFF0D] px-4 py-4 sm:px-5 sm:py-5">
          <div className={CONTENT_CLASS} dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <p className="mt-8 text-[#838388] text-[11px] leading-4">
          Disclaimer: This content is for informational purposes only and does not constitute investment
          advice. Markets involve risk of loss. Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  )
}
