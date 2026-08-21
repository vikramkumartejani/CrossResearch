'use client'

const BLOOMBERG_LIVE_EMBED =
  'https://www.youtube.com/embed/QB5BNdBFujE?autoplay=1&mute=1&rel=0&modestbranding=1'

type BloombergTvProps = {
  className?: string
  /** Fixed pixel height (News sidebar). Prefer grow for flex parents. */
  height?: number
  /** Fill remaining space in a flex column (Geopolitical panel). */
  grow?: boolean
}

export default function BloombergTv({ className = '', height, grow = false }: BloombergTvProps) {
  return (
    <div className={`bg-[#16161F] p-3 sm:p-4 flex flex-col ${grow ? 'h-full min-h-0' : ''} ${className}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.66797 11.6667C1.66797 8.524 1.66797 6.95262 2.64428 5.97631C3.62059 5 5.19194 5 8.33464 5H11.668C14.8106 5 16.3821 5 17.3583 5.97631C18.3346 6.95262 18.3346 8.524 18.3346 11.6667C18.3346 14.8093 18.3346 16.3808 17.3583 17.357C16.3821 18.3333 14.8106 18.3333 11.668 18.3333H8.33464C5.19194 18.3333 3.62059 18.3333 2.64428 17.357C1.66797 16.3808 1.66797 14.8093 1.66797 11.6667Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7.5 2.50033L10 5.00033L13.3333 1.66699"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white text-[16px] leading-[19px] font-semibold">Bloomberg TV</span>
        </div>
        <div className="flex items-center gap-1 bg-[#E25C3F1A] py-1 sm:py-1.5 px-2 sm:px-3">
          <div className="w-1.5 h-1.5 bg-[#E25C3F] rounded-full animate-pulse" />
          <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">Live</span>
        </div>
      </div>

      <div
        className={`bg-[#FFFFFF08] overflow-hidden relative ${grow ? 'flex-1 min-h-0' : ''}`}
        style={height && !grow ? { height } : undefined}
      >
        <iframe
          src={BLOOMBERG_LIVE_EMBED}
          title="Bloomberg TV Live"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  )
}
