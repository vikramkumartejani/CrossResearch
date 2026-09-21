import NewsFeed from './NewsFeed'
import NewsSidebar from './NewsSidebar'
import LockedSection from '../LockedSection'

/**
 * Row height is driven by the right rail (Signals + Most Read).
 * The feed column is absolutely filled so the headline list scrolls
 * inside that height and cannot push the page past Most Read.
 */
export default function News() {
  return (
    <div className="flex flex-col pb-4">
      <div className="border-b border-[#FFFFFF0D] pb-5 mb-4 px-4 lg:px-6">
        <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
          Market Intelligence Feed
        </h1>
        <p className="text-[#838388] text-[12px] leading-[17px] max-w-[560px]">
          Real-time news, analysis and research from global sources. Filter, search and track what moves markets.
        </p>
      </div>

      <div className="px-4 lg:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] 2xl:grid-cols-[minmax(0,1fr)_460px] gap-3 sm:gap-4 xl:items-stretch">
          {/* Height comes from the right column on xl+ */}
          <div className="min-h-[560px] xl:min-h-0 relative">
            <div className="xl:absolute xl:inset-0 min-h-[560px] xl:min-h-0">
              <NewsFeed />
            </div>
          </div>

          <div className="xl:sticky xl:top-3 self-start w-full xl:max-h-[calc(100dvh-170px)] xl:overflow-y-auto dashboard-scroll">
            <LockedSection title="Desk Briefing" showHeading={false}>
              <NewsSidebar />
            </LockedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
