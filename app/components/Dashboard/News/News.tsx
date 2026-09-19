import NewsFeed from './NewsFeed'
import NewsSidebar from './NewsSidebar'
import LockedSection from '../LockedSection'

export default function News() {
  return (
    <div className="flex flex-col min-h-0 xl:h-[calc(100dvh-148px)] xl:max-h-[calc(100dvh-148px)] xl:overflow-hidden">
      <div className="border-b border-[#FFFFFF0D] pb-5 mb-4 px-4 lg:px-6 shrink-0">
        <div className="mb-3 flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 13.5C9.82843 13.5 10.5 12.8284 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8284 8.17157 13.5 9 13.5Z"
              stroke="#838388"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.625 4.5H15.375"
              stroke="#838388"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.25 7.5H15.75"
              stroke="#838388"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 7.5V10.5" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M2.25 10.5V7.5C2.25 4.67157 2.25 3.25736 3.12868 2.37868C4.00736 1.5 5.42157 1.5 8.25 1.5H9.75C12.5784 1.5 13.9927 1.5 14.8713 2.37868C15.75 3.25736 15.75 4.67157 15.75 7.5V10.5C15.75 13.3284 15.75 14.7427 14.8713 15.6213C13.9927 16.5 12.5784 16.5 9.75 16.5H8.25C5.42157 16.5 4.00736 16.5 3.12868 15.6213C2.25 14.7427 2.25 13.3284 2.25 10.5Z"
              stroke="#838388"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#838388] text-[12px] leading-[14px] font-medium">News Wire</span>
        </div>
        <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
          Market Intelligence Feed
        </h1>
        <p className="text-[#838388] text-[12px] leading-[17px] max-w-[560px]">
          Real-time news, analysis and research from global sources. Filter, search and track what moves markets.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden px-4 lg:px-6 pb-4">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] 2xl:grid-cols-[minmax(0,1fr)_460px] gap-3 sm:gap-4 items-stretch h-full min-h-0 overflow-hidden">
          <div className="min-h-0 h-full overflow-hidden">
            <NewsFeed />
          </div>
          <LockedSection
            title="Desk Briefing"
            showHeading={false}
            className="h-full min-h-0 overflow-hidden"
            contentClassName="h-full min-h-0 overflow-hidden"
          >
            <NewsSidebar />
          </LockedSection>
        </div>
      </div>
    </div>
  )
}
