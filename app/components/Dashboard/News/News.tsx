import NewsFeed from './NewsFeed'
import NewsSidebar from './NewsSidebar'

export default function News() {
    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6">
                <div className="mb-3 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 13.5C9.82843 13.5 10.5 12.8284 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8284 8.17157 13.5 9 13.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.625 4.5H15.375" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.25 7.5H15.75" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 7.5V10.5" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.25 10.5V7.5C2.25 4.67157 2.25 3.25736 3.12868 2.37868C4.00736 1.5 5.42157 1.5 8.25 1.5H9.75C12.5784 1.5 13.9927 1.5 14.8713 2.37868C15.75 3.25736 15.75 4.67157 15.75 7.5V10.5C15.75 13.3284 15.75 14.7427 14.8713 15.6213C13.9927 16.5 12.5784 16.5 9.75 16.5H8.25C5.42157 16.5 4.00736 16.5 3.12868 15.6213C2.25 14.7427 2.25 13.3284 2.25 10.5Z" stroke="#838388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#838388] text-[12px] leading-[14px] font-medium">News Wire</span>
                </div>
                <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">Market Intelligence Feed</h1>
                <p className="text-[#838388] text-[12px] leading-[17px]">
                    Curated dispatches from desks and primary newswires. Filter by domain.
                </p>
            </div>

            {/* ── Body: Left feed + Right sidebar ── */}
            <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_424px] 2xl:grid-cols-[1fr_524px] gap-3 sm:gap-4 items-start">
                    <NewsFeed />
                    <NewsSidebar />
                </div>
            </div>
        </div>
    )
}
