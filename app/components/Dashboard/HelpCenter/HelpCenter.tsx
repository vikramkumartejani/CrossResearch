'use client'
import { useState } from 'react'

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconHelp() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7.40925 5.63925C8.2875 4.8705 9.7125 4.8705 10.5908 5.63925C11.4698 6.408 11.4698 7.6545 10.5908 8.42325C10.4385 8.5575 10.2683 8.66775 10.0883 8.75475C9.5295 9.0255 9.00075 9.504 9.00075 10.125V10.6875M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9ZM9 12.9375H9.006V12.9435H9V12.9375Z"
                stroke="#9498A8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconSearch() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 12.75L15.75 15.75" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25Z" stroke="#838388" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconChevronRight({ className }: { className?: string }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconGetStarted() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.04785 6.09535C3.04785 3.94036 3.04785 2.86287 3.71732 2.1934C4.38679 1.52393 5.46429 1.52393 7.61928 1.52393H10.6669C12.8219 1.52393 13.8994 1.52393 14.5689 2.1934C15.2383 2.86287 15.2383 3.94036 15.2383 6.09535V12.1906C15.2383 14.3456 15.2383 15.4231 14.5689 16.0926C13.8994 16.762 12.8219 16.762 10.6669 16.762H7.61928C5.46429 16.762 4.38679 16.762 3.71732 16.0926C3.04785 15.4231 3.04785 14.3456 3.04785 12.1906V6.09535Z" stroke="#9498A8" strokeWidth="1.14286" />
            <path d="M15.1604 12.1904H6.01759C5.30904 12.1904 4.95476 12.1904 4.6641 12.2683C3.87531 12.4797 3.25921 13.0958 3.04785 13.8846" stroke="#9498A8" strokeWidth="1.14286" />
            <path d="M5.33301 12.1905V1.90479" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M9.90504 12.1904V14.8807C9.90504 15.0906 9.90504 15.1956 9.83277 15.238C9.7605 15.2805 9.66166 15.2335 9.46399 15.1396L8.51752 14.6901C8.45064 14.6583 8.4172 14.6424 8.38123 14.6424C8.34526 14.6424 8.31182 14.6583 8.24494 14.6901L7.29848 15.1396C7.1008 15.2335 7.00196 15.2805 6.92969 15.238C6.85742 15.1956 6.85742 15.0906 6.85742 14.8807V12.5333" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
        </svg>
    )
}

function IconAccount() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.52344 10.6665C1.52344 7.7932 1.52344 6.35654 2.41606 5.46392C3.30869 4.57129 4.74535 4.57129 7.61868 4.57129H10.6663C13.5396 4.57129 14.9763 4.57129 15.8689 5.46392C16.7615 6.35654 16.7615 7.7932 16.7615 10.6665C16.7615 13.5398 16.7615 14.9765 15.8689 15.8691C14.9763 16.7618 13.5396 16.7618 10.6663 16.7618H7.61867C4.74535 16.7618 3.30869 16.7618 2.41606 15.8691C1.52344 14.9765 1.52344 13.5398 1.52344 10.6665Z" stroke="#9498A8" strokeWidth="1.14286" />
            <path d="M12.1909 4.57154C12.1909 3.13488 12.1909 2.41655 11.7446 1.97024C11.2983 1.52393 10.58 1.52393 9.14332 1.52393C7.70666 1.52393 6.98833 1.52393 6.54202 1.97024C6.0957 2.41655 6.0957 3.13488 6.0957 4.57154" stroke="#9498A8" strokeWidth="1.14286" />
            <path d="M7.61909 11.4287H4.57148C4.21231 11.4287 4.03273 11.4287 3.92115 11.5403C3.80957 11.6519 3.80957 11.8315 3.80957 12.1906V12.9525C3.80957 13.3117 3.80957 13.4913 3.92115 13.6028C4.03273 13.7144 4.21231 13.7144 4.57148 13.7144H7.61909C7.97826 13.7144 8.15784 13.7144 8.26942 13.6028C8.381 13.4913 8.381 13.3117 8.381 12.9525V12.1906C8.381 11.8315 8.381 11.6519 8.26942 11.5403C8.15784 11.4287 7.97826 11.4287 7.61909 11.4287Z" stroke="#9498A8" strokeWidth="1.14286" strokeLinejoin="round" />
            <path d="M4.57129 4.95215V11.4283M4.57129 16.3807V14.095" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M13.7139 4.95215V16.3807" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
        </svg>
    )
}

function IconBilling() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.429 15.9998C13.9178 15.5653 14.6544 15.5653 15.1433 15.9998C15.4754 16.295 16.0004 16.0592 16.0004 15.6149V2.67027C16.0004 2.22591 15.4754 1.99014 15.1433 2.28536C14.6544 2.71987 13.9178 2.71987 13.429 2.28536C12.9402 1.85084 12.2035 1.85084 11.7147 2.28536C11.2259 2.71987 10.4892 2.71987 10.0004 2.28536C9.51159 1.85084 8.77496 1.85084 8.28613 2.28536C7.7973 2.71987 7.06067 2.71987 6.57185 2.28536C6.08302 1.85084 5.34639 1.85084 4.85756 2.28536C4.36873 2.71987 3.6321 2.71987 3.14328 2.28536C2.81115 1.99014 2.28613 2.22591 2.28613 2.67027V15.6149C2.28613 16.0592 2.81115 16.295 3.14328 15.9998C3.6321 15.5653 4.36873 15.5653 4.85756 15.9998C5.34639 16.4343 6.08302 16.4343 6.57185 15.9998C7.06067 15.5653 7.7973 15.5653 8.28613 15.9998C8.77496 16.4343 9.51159 16.4343 10.0004 15.9998C10.4892 15.5653 11.2259 15.5653 11.7147 15.9998C12.2035 16.4343 12.9402 16.4343 13.429 15.9998Z" stroke="#9498A8" strokeWidth="1.14286" />
            <path d="M5.71387 11.8096H12.571" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M5.71387 9.14307H12.571" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M5.71387 6.47607H12.571" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
        </svg>
    )
}

function IconData() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7615 8.00012V9.14297C16.7615 12.7346 16.7615 14.5305 15.6457 15.6462C14.53 16.762 12.7341 16.762 9.14248 16.762C5.55083 16.762 3.755 16.762 2.63922 15.6462C1.52344 14.5305 1.52344 12.7346 1.52344 9.14297C1.52344 5.55132 1.52344 3.75549 2.63922 2.63971C3.755 1.52393 5.55083 1.52393 9.14248 1.52393H10.2853" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M5.33301 10.6668L6.70207 9.02389C7.24458 8.37288 7.51583 8.04737 7.87269 8.04737C8.22955 8.04737 8.5008 8.37288 9.04331 9.02389L9.24175 9.26201C9.78426 9.91302 10.0555 10.2385 10.4124 10.2385C10.7692 10.2385 11.0405 9.91302 11.583 9.26201L12.9521 7.61914" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <circle cx="14.4761" cy="3.80964" r="2.28571" stroke="#9498A8" strokeWidth="1.14286" />
        </svg>
    )
}

function IconSettings() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.52344 9.14297C1.52344 5.55132 1.52344 3.75549 2.63922 2.63971C3.755 1.52393 5.55083 1.52393 9.14248 1.52393C12.7341 1.52393 14.53 1.52393 15.6457 2.63971C16.7615 3.75549 16.7615 5.55132 16.7615 9.14297C16.7615 12.7346 16.7615 14.5305 15.6457 15.6462C14.53 16.762 12.7341 16.762 9.14248 16.762C5.55083 16.762 3.755 16.762 2.63922 15.6462C1.52344 14.5305 1.52344 12.7346 1.52344 9.14297Z" stroke="#9498A8" strokeWidth="1.14286" />
            <path d="M5.33301 13.7144L5.33301 11.4287" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M9.14258 13.7145V9.14307" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
            <path d="M12.9521 13.7141V6.85693" stroke="#9498A8" strokeWidth="1.14286" strokeLinecap="round" />
        </svg>
    )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TOPICS = [
    {
        id: 'getting-started',
        icon: <IconGetStarted />,
        title: 'Getting Started',
        count: 15,
        desc: 'First-time setup, Navigation, Account Basics.',
    },
    {
        id: 'account-auth',
        icon: <IconAccount />,
        title: 'Account & Auth',
        count: 8,
        desc: 'Sign-in, MFA password reset & sessions.',
    },
    {
        id: 'billing',
        icon: <IconBilling />,
        title: 'Billing & Plans',
        count: 7,
        desc: 'Subscription, Invoices, Refunds, Upgrades.',
    },
    {
        id: 'data-signals',
        icon: <IconData />,
        title: 'Data & Signals',
        count: 18,
        desc: 'Sources, Calibration, Regime engine FAQ.',
    },
    {
        id: 'platform-settings',
        icon: <IconSettings />,
        title: 'Platform Settings',
        count: 11,
        desc: 'Workspaces, Notifications, Themes.',
    },
]

const MOST_ASKED = [
    { q: 'How do I read the Cycle Widget?', cat: 'Getting Started' },
    { q: 'Why is my Macro Nowcast value different from Atlanta Fed?', cat: 'Data & Signals' },
    { q: 'How do dealer-positioning levels get computed?', cat: 'Data & Signals' },
    { q: 'Where can I download my billing invoice?', cat: 'Billing & Plans' },
    { q: 'How do I switch back to the legacy light theme?', cat: 'Platform Settings' },
    { q: 'Can I share my Workspace view with my team?', cat: 'Account & Auth' },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function HelpCenter() {
    const [search, setSearch] = useState('')

    return (
        <div className="px-4 lg:px-6">

            {/* Breadcrumb */}
            <div className="mb-3 flex items-center gap-1.5">
                <IconHelp />
                <span className="text-[#838388] text-[12px] leading-[14px] font-medium">Help Center</span>
            </div>

            {/* Heading */}
            <h1 className="text-white text-[24px] sm:text-[35px] font-medium leading-[30px] sm:leading-[42px] mb-2">
                How Can I Help You
            </h1>
            <p className="text-[#838388] text-[12px] leading-[17px] mb-5">
                Search the knowledge base for setup guides, API references, regime engine
                documentation and platform best practices.
            </p>

            {/* Search */}
            <div className="relative mb-4 sm:mb-5 w-full max-w-[550px]">
                <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <IconSearch />
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search articles, e.g. 'dealer gamma'"
                    className="w-full h-9 sm:h-[42px] pl-8 sm:pl-9 pr-4 bg-[#16161F] border border-[#FFFFFF0D] text-white text-[12px] font-normal placeholder:text-[#838388] outline-none focus:border-[#FFFFFF25] transition-colors"
                />
            </div>

            {/* Browse By Topic */}
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-3 sm:mb-4">
                Browse By Topic
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 mb-4 sm:mb-5">
                {TOPICS.map(topic => (
                    <button
                        key={topic.id}
                        className="group flex flex-col bg-[#16161F] p-3 sm:p-4 text-left transition-colors cursor-pointer"
                    >
                        {/* Top row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 flex items-center justify-center bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-lg flex-shrink-0">
                                    {topic.icon}
                                </div>
                                <div>
                                    <p className="text-white text-[14px] font-semibold leading-[17px]">{topic.title}</p>
                                    <p className="text-white/60 text-[12px] font-normal leading-[14px] mt-1">{topic.count} Articles</p>
                                </div>
                            </div>
                            <IconChevronRight className="text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
                        </div>
                        {/* Description */}
                        <p className="text-white/60 font-medium text-[14px] leading-[17px]">
                            {topic.desc}
                        </p>
                    </button>
                ))}
            </div>

            {/* Most Asked */}
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-3 sm:mb-4">
                Most Asked
            </h2>

            <div className="bg-[#16161F]">
                {MOST_ASKED.map((item, i) => (
                    <button
                        key={i}
                        className="group w-full flex items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-5 border-b border-[#FFFFFF0D] last:border-b-0 hover:bg-[#FFFFFF05] transition-colors cursor-pointer text-left"
                    >
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                            <span className="text-white text-[14px] sm:text-[16px] leading-[19px] font-medium w-5 sm:w-6 flex-shrink-0">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-white font-medium text-[14px] sm:text-[16px] leading-[18px] sm:leading-[19px] line-clamp-2 sm:truncate">
                                {item.q}
                            </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
                            <span className="text-white/60 text-[16px] leading-[19px] font-medium group-hover:text-white/70 transition-colors">
                                {item.cat}
                            </span>
                            <IconChevronRight className="text-white/60 group-hover:text-white transition-colors" />
                        </div>
                        <IconChevronRight className="sm:hidden text-white/60 flex-shrink-0" />
                    </button>
                ))}
            </div>

        </div>
    )
}
