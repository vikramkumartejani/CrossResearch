'use client'

import type { DeskThread } from '@/lib/deskChat'

function startOfDay(ts: number) {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function groupThreads(threads: DeskThread[]) {
  const todayStart = startOfDay(Date.now())
  const yestStart = todayStart - 86400000
  const groups: { label: string; items: DeskThread[] }[] = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'Previous', items: [] },
  ]
  for (const thread of threads) {
    const t = new Date(thread.updatedAt).getTime()
    if (t >= todayStart) groups[0].items.push(thread)
    else if (t >= yestStart) groups[1].items.push(thread)
    else groups[2].items.push(thread)
  }
  return groups.filter((g) => g.items.length > 0)
}

export default function ChatHistorySidebar({
  threads,
  activeId,
  onSelect,
  onDelete,
  onClose,
}: {
  threads: DeskThread[]
  activeId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onClose?: () => void
}) {
  const groups = groupThreads(threads)

  return (
    <aside className="flex flex-col h-full min-h-0 w-full bg-[#070711]">
      <div className="flex items-center justify-between gap-2 px-4 py-4 border-b border-[#FFFFFF0D]">
        <p className="text-white text-[14px] leading-[17px] font-semibold">Chat history</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close history"
            className="w-7 h-7 inline-flex items-center justify-center text-[#838388] hover:text-white cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto dashboard-scroll px-2 py-3">
        {threads.length === 0 && (
          <p className="text-[#838388] text-[12px] px-2 py-8 text-center">No conversations yet.</p>
        )}
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-2 mb-1.5 text-[12px] leading-[14px] font-semibold text-[#838388]">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((thread) => {
                const active = thread.id === activeId
                return (
                  <li key={thread.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => onSelect(thread.id)}
                      className={`w-full text-left px-2.5 py-2 cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#88C4FF26] text-[#227ED9]'
                          : 'text-[#FFFFFF60] hover:text-white hover:bg-[#FFFFFF08]'
                      }`}
                    >
                      <p className={`text-[13px] leading-[18px] truncate pr-5 ${active ? 'font-semibold' : 'font-medium'}`}>
                        {thread.title}
                      </p>
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${thread.title}`}
                      onClick={() => onDelete(thread.id)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 inline-flex items-center justify-center text-[#838388] hover:text-[#E25C3F] opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M3 3.5h6M4.2 3.5l.4 6.2h3.6l.4-6.2M5 5.2v3M7 5.2v3"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
