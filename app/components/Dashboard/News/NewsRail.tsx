'use client'

const NEWS_LINKS = [
  { id: 'top', label: 'Top Stories' },
  { id: 'latest', label: 'Latest' },
  { id: 'feed', label: 'My Feed' },
  { id: 'bookmarks', label: 'Bookmarks' },
  { id: 'av', label: 'Audio & Video' },
  { id: 'press', label: 'Press Releases' },
  { id: 'transcripts', label: 'Transcripts' },
]

const TOPICS = [
  'All Topics',
  'Macro',
  'Rates & Central Banks',
  'Geopolitics',
  'Equities',
  'Crypto & Digital Assets',
  'Energy & Commodities',
  'FX & Currencies',
  'Credit & Debt',
  'M&A / Corporate',
  'Regulation',
  'ESG & Climate',
  'Earnings',
  'Economy',
  'Technology',
]

const SOURCES = [
  'All Sources',
  'Bloomberg',
  'Reuters',
  'WSJ',
  'Financial Times',
  'CNBC',
  'The Economist',
]

const TOPIC_TO_CATEGORY: Record<string, string | null> = {
  'All Topics': null,
  Macro: 'Macro',
  'Rates & Central Banks': 'Rates',
  Geopolitics: 'Geopolitics',
  Equities: 'Equities',
  'Crypto & Digital Assets': 'Crypto',
  'Energy & Commodities': 'Energy',
  'FX & Currencies': 'Macro',
  'Credit & Debt': 'Macro',
  'M&A / Corporate': 'Equities',
  Regulation: 'Regulation',
  'ESG & Climate': 'Macro',
  Earnings: 'Equities',
  Economy: 'Macro',
  Technology: 'Equities',
}

export type NewsRailFilters = {
  newsSection: string
  topic: string
  source: string
}

export function topicToCategory(topic: string): string | null {
  return TOPIC_TO_CATEGORY[topic] ?? null
}

function NavIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="opacity-70">
      <path
        d="M2.5 3.5h9M2.5 7h9M2.5 10.5h6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function NewsRail({
  filters,
  onChange,
}: {
  filters: NewsRailFilters
  onChange: (next: NewsRailFilters) => void
}) {
  return (
    <aside className="bg-[#16161F] border border-[#FFFFFF0D] p-3 sm:p-4">
      <div className="mb-5">
        <p className="text-[#838388] text-[11px] leading-[14px] font-medium mb-2 normal-case">
          News
        </p>
        <div className="flex flex-col gap-0.5">
          {NEWS_LINKS.map((link) => {
            const active = filters.newsSection === link.id
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onChange({ ...filters, newsSection: link.id })}
                className={`flex items-center gap-2.5 px-2.5 py-2 text-left text-[13px] leading-[16px] transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#88C4FF22] text-white'
                    : 'text-[#838388] hover:text-white hover:bg-[#FFFFFF08]'
                }`}
              >
                <NavIcon />
                {link.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[#838388] text-[11px] leading-[14px] font-medium mb-2 normal-case">
          Topics
        </p>
        <div className="flex flex-col gap-0.5">
          {TOPICS.map((topic) => {
            const active = filters.topic === topic
            return (
              <button
                key={topic}
                type="button"
                onClick={() => onChange({ ...filters, topic })}
                className={`flex items-center gap-2.5 px-2.5 py-2 text-left text-[13px] leading-[16px] transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#88C4FF22] text-white'
                    : 'text-[#838388] hover:text-white hover:bg-[#FFFFFF08]'
                }`}
              >
                <NavIcon />
                {topic}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-[#838388] text-[11px] leading-[14px] font-medium mb-2 normal-case">
          Sources
        </p>
        <div className="flex flex-col gap-1">
          {SOURCES.map((source) => {
            const checked =
              source === 'All Sources'
                ? filters.source === 'All Sources'
                : filters.source === source
            return (
              <label
                key={source}
                className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] leading-[16px] text-[#838388] hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      source: source === 'All Sources' ? 'All Sources' : source,
                    })
                  }
                  className="accent-[#88C4FF] w-3.5 h-3.5"
                />
                {source}
              </label>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
