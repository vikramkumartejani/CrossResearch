'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

function PageIcon({ pathname }: { pathname: string }) {
    const cls = 'w-6 h-6 text-white'
    if (pathname === '/analysis') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M2 7.33333L3.66667 5.66667C4.34471 4.98863 4.68372 4.64961 5.09149 4.5744C5.25137 4.54491 5.4153 4.54491 5.57518 4.5744C5.98295 4.64961 6.32197 4.98863 7 5.66667C7.67807 6.3447 8.01707 6.68373 8.4248 6.75893C8.58473 6.7884 8.7486 6.7884 8.90853 6.75893C9.31627 6.68373 9.65527 6.3447 10.3333 5.66667L14 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10V14M6 8.66667V14M10 10.6667V14M14 6V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/market-report') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M1.33301 4.00016C1.33301 2.5274 2.52692 1.3335 3.99967 1.3335C5.47243 1.3335 6.66634 2.5274 6.66634 4.00016V12.0002C6.66634 13.4729 5.47243 14.6668 3.99967 14.6668C2.52692 14.6668 1.33301 13.4729 1.33301 12.0002V4.00016Z" stroke="currentColor" strokeWidth="1.2" /><path d="M6.66651 5.49504L8.87562 3.28593C9.91702 2.24453 11.6055 2.24453 12.6469 3.28593C13.6883 4.32733 13.6883 6.01577 12.6469 7.05717L6.2041 13.4999" stroke="currentColor" strokeWidth="1.2" /><path d="M4 14.6668L12 14.6668C13.4728 14.6668 14.6667 13.4729 14.6667 12.0002C14.6667 10.5274 13.4728 9.3335 12 9.3335L10.3333 9.3335" stroke="currentColor" strokeWidth="1.2" /><path d="M4.66634 12.0002C4.66634 12.3684 4.36786 12.6668 3.99967 12.6668C3.63148 12.6668 3.33301 12.3684 3.33301 12.0002C3.33301 11.632 3.63148 11.3335 3.99967 11.3335C4.36786 11.3335 4.66634 11.632 4.66634 12.0002Z" stroke="currentColor" strokeWidth="1.2" /></svg>
    )
    if (pathname === '/macro-nowcast' || pathname === '/macro-signals') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M2 1.3335V14.6668" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M4.66699 5.00016C4.66699 4.37709 4.66699 4.06555 4.80097 3.8335C4.88874 3.68148 5.01497 3.55524 5.16699 3.46747C5.39904 3.3335 5.71058 3.3335 6.33366 3.3335H12.3337C12.9567 3.3335 13.2683 3.3335 13.5003 3.46747C13.6523 3.55524 13.7786 3.68148 13.8664 3.8335C14.0003 4.06555 14.0003 4.37709 14.0003 5.00016C14.0003 5.62324 14.0003 5.93478 13.8664 6.16683C13.7786 6.31885 13.6523 6.44509 13.5003 6.53285C13.2683 6.66683 12.9567 6.66683 12.3337 6.66683H6.33366C5.71058 6.66683 5.39904 6.66683 5.16699 6.53285C5.01497 6.44509 4.88874 6.31885 4.80097 6.16683C4.66699 5.93478 4.66699 5.62324 4.66699 5.00016Z" stroke="currentColor" strokeWidth="1.2" /><path d="M4.66699 11.0002C4.66699 10.3771 4.66699 10.0655 4.80097 9.8335C4.88874 9.68148 5.01497 9.55524 5.16699 9.46747C5.39904 9.3335 5.71058 9.3335 6.33366 9.3335H10.3337C10.9567 9.3335 11.2683 9.3335 11.5003 9.46747C11.6523 9.55524 11.7786 9.68148 11.8664 9.8335C12.0003 10.0655 12.0003 10.3771 12.0003 11.0002C12.0003 11.6232 12.0003 11.9348 11.8664 12.1668C11.7786 12.3188 11.6523 12.4451 11.5003 12.5329C11.2683 12.6668 10.9567 12.6668 10.3337 12.6668H6.33366C5.71058 12.6668 5.39904 12.6668 5.16699 12.5329C5.01497 12.4451 4.88874 12.3188 4.80097 12.1668C4.66699 11.9348 4.66699 11.6232 4.66699 11.0002Z" stroke="currentColor" strokeWidth="1.2" /></svg>
    )
    if (pathname === '/relief-signals') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M3.49707 8.87298L3.07192 9.29636C3.59691 9.82353 4.90046 10.6003 7.9994 10.6003V9.40032C5.08585 9.40032 4.14254 8.67085 3.92222 8.4496L3.49707 8.87298ZM7.9994 10.0003V10.6003C11.1802 10.6003 12.4694 9.78168 12.9658 9.25626L12.5296 8.84424L12.0935 8.43222C11.9044 8.63236 10.9894 9.40032 7.9994 9.40032V10.0003Z" fill="currentColor" /></svg>
    )
    if (pathname === '/options-positioning') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M5.99967 12.6668C4.12706 12.6668 3.19075 12.6668 2.51815 12.2174C2.22698 12.0229 1.97698 11.7729 1.78242 11.4817C1.33301 10.8091 1.33301 9.87278 1.33301 8.00016C1.33301 6.12755 1.33301 5.19124 1.78242 4.51864C1.97698 4.22747 2.22698 3.97747 2.51815 3.78291C3.19075 3.3335 4.12706 3.3335 5.99967 3.3335L9.99967 3.3335C11.8723 3.3335 12.8086 3.3335 13.4812 3.78291C13.7724 3.97747 14.0224 4.22747 14.2169 4.51864C14.6663 5.19124 14.6663 6.12755 14.6663 8.00016C14.6663 9.87278 14.6663 10.8091 14.2169 11.4817C14.0224 11.7729 13.7724 12.0229 13.4812 12.2174C12.8086 12.6668 11.8723 12.6668 9.99967 12.6668H5.99967Z" stroke="currentColor" strokeWidth="1.2" /><path d="M6 6C4.89543 6 4 6.89543 4 8C4 9.10457 4.89543 10 6 10" stroke="currentColor" strokeWidth="1.2" /><path d="M10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10" stroke="currentColor" strokeWidth="1.2" /></svg>
    )
    if (pathname === '/seasonality-flow') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M7.99967 1.3335C11.6816 1.3335 14.6663 4.31826 14.6663 8.00016C14.6663 11.6821 11.6816 14.6668 7.99967 14.6668C4.31778 14.6668 1.33301 11.6821 1.33301 8.00016C1.33301 6.13523 2.09877 4.44916 3.33301 3.23921" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M3.33301 8.00016C3.33301 10.5775 5.42235 12.6668 7.99967 12.6668C10.577 12.6668 12.6663 10.5775 12.6663 8.00016C12.6663 5.42283 10.577 3.3335 7.99967 3.3335" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
    )
    if (pathname === '/crypto-btc') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M7.9987 14.6673C11.6806 14.6673 14.6654 11.6825 14.6654 8.00065C14.6654 4.31875 11.6806 1.33398 7.9987 1.33398C4.3168 1.33398 1.33203 4.31875 1.33203 8.00065C1.33203 11.6825 4.3168 14.6673 7.9987 14.6673Z" stroke="currentColor" strokeWidth="1.2" /><path d="M6.33203 10.6673V5.33398" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M6.33203 8H9.66536C10.2176 8 10.6654 8.44773 10.6654 9V9.66667C10.6654 10.2189 10.2176 10.6667 9.66536 10.6667H5.33203" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/geopolitical') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M7.33203 14.0007H6.66536C4.1512 14.0007 2.89413 14.0007 2.11308 13.2196C1.33203 12.4386 1.33203 11.1815 1.33203 8.66732V6.66732C1.33203 4.15316 1.33203 2.89608 2.11308 2.11503C2.89413 1.33398 4.1512 1.33398 6.66536 1.33398H7.9987C10.5128 1.33398 11.77 1.33398 12.551 2.11503C13.332 2.89608 13.332 4.15316 13.332 6.66732V7.00065" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M11.6033 9.60303C11.7448 9.2443 12.2525 9.2443 12.3941 9.60303L12.4185 9.66523C12.7641 10.5415 13.4578 11.2352 14.3341 11.5808L14.3963 11.6052C14.755 11.7468 14.755 12.2545 14.3963 12.396L14.3341 12.4205C13.4578 12.7661 12.7641 13.4598 12.4185 14.336L12.3941 14.3982C12.2525 14.757 11.7448 14.757 11.6033 14.3982L11.5788 14.336C11.2332 13.4598 10.5395 12.7661 9.66328 12.4205L9.60108 12.396C9.24235 12.2545 9.24235 11.7468 9.60108 11.6052L9.66328 11.5808C10.5395 11.2352 11.2332 10.5415 11.5788 9.66523L11.6033 9.60303Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/news') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M1.66797 2.93268V4.41668C1.66797 4.93442 1.66797 5.1933 1.76439 5.42608C1.86081 5.65886 2.04386 5.84191 2.40996 6.20801L9.79264 13.5907C10.1588 13.9568 10.3418 14.1398 10.5746 14.2363C10.8074 14.3327 11.0662 14.3327 11.584 14.3327H13.068C13.6651 14.3327 13.9636 14.3327 14.1492 14.1472C14.3346 13.9617 14.3346 13.6631 14.3346 13.066V11.582C14.3346 11.0643 14.3346 10.8054 14.2382 10.5726C14.1418 10.3398 13.9588 10.1568 13.5926 9.79068L6.20996 2.40801C5.84386 2.04191 5.66081 1.85886 5.42803 1.76244C5.19526 1.66602 4.93638 1.66602 4.41863 1.66602H2.93464C2.33752 1.66602 2.03897 1.66602 1.85347 1.85152C1.66797 2.03702 1.66797 2.33557 1.66797 2.93268Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/tutorial') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M8.66667 1.33301H7.33333C4.81917 1.33301 3.5621 1.33301 2.78105 2.11405C2 2.89511 2 4.15218 2 6.66634V9.33301C2 11.8471 2 13.1043 2.78105 13.8853C3.5621 14.6663 4.81917 14.6663 7.33333 14.6663H8.66667C11.1808 14.6663 12.4379 14.6663 13.2189 13.8853C14 13.1043 14 11.8471 14 9.33301V6.66634C14 4.15218 14 2.89511 13.2189 2.11405C12.4379 1.33301 11.1808 1.33301 8.66667 1.33301Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M14 8H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
    )
    if (pathname === '/education-center') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M8.0013 12.0007C8.73768 12.0007 9.33464 11.4037 9.33464 10.6673C9.33464 9.93094 8.73768 9.33398 8.0013 9.33398C7.26492 9.33398 6.66797 9.93094 6.66797 10.6673C6.66797 11.4037 7.26492 12.0007 8.0013 12.0007Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 9.33301V6.66634C2 4.15218 2 2.89511 2.78105 2.11405C3.5621 1.33301 4.81917 1.33301 7.33333 1.33301H8.66667C11.1808 1.33301 12.4379 1.33301 13.2189 2.11405C14 2.89511 14 4.15218 14 6.66634V9.33301C14 11.8471 14 13.1043 13.2189 13.8853C12.4379 14.6663 11.1808 14.6663 8.66667 14.6663H7.33333C4.81917 14.6663 3.5621 14.6663 2.78105 13.8853C2 13.1043 2 11.8471 2 9.33301Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/trading-strategies') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M2.66797 10.7717L2.66799 5.22707C2.66799 3.9958 2.668 3.38017 3.01305 2.93107C3.3581 2.48198 3.95296 2.3234 5.14268 2.00623L7.48149 1.38273C7.60529 1.34972 7.73289 1.33301 7.86102 1.33301C8.67489 1.33301 9.33469 1.99276 9.33469 2.80661V13.1924C9.33469 14.0062 8.67495 14.666 7.86109 14.666C7.73289 14.666 7.60529 14.6492 7.48142 14.6162L5.14243 13.9925C3.95281 13.6752 3.358 13.5166 3.01298 13.0676C2.66796 12.6185 2.66796 12.0029 2.66797 10.7717Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/help-center') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M6.586 5.01267C7.36667 4.32933 8.63333 4.32933 9.414 5.01267C10.1953 5.696 10.1953 6.804 9.414 7.48733C9.27867 7.60667 9.12733 7.70467 8.96733 7.782C8.47067 8.02267 8.00067 8.448 8.00067 9V9.5M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8ZM8 11.5H8.00533V11.5053H8V11.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    if (pathname === '/contact-support') return (
        <svg className={cls} width="24" height="24" style={{minWidth:24,minHeight:24,flexShrink:0}} viewBox="0 0 16 16" fill="none"><path d="M11.3333 8.37778C13.1741 8.37778 14.6667 6.94998 14.6667 5.18891C14.6667 3.42785 13.1741 2 11.3333 2C9.4926 2 8 3.42785 8 5.18891C8 6.03503 8.34447 6.80385 8.90627 7.37438C9.03 7.49998 9.1126 7.67158 9.07927 7.84825C9.02427 8.13705 8.8996 8.40645 8.71707 8.63098C9.19733 8.72031 9.69673 8.63985 10.125 8.41211C10.2761 8.33171 10.3521 8.29131 10.4055 8.28318C10.4589 8.27505 10.5355 8.28938 10.6885 8.31811C10.9011 8.35805 11.1169 8.37805 11.3333 8.37778Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.66797 8.66602C6.66797 9.77062 5.77254 10.666 4.66797 10.666C3.5634 10.666 2.66797 9.77062 2.66797 8.66602C2.66797 7.56148 3.5634 6.66602 4.66797 6.66602C5.77254 6.66602 6.66797 7.56148 6.66797 8.66602Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.9987 13.9993C7.9987 12.1584 6.50631 10.666 4.66536 10.666C2.82442 10.666 1.33203 12.1584 1.33203 13.9993" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
    return null
}

const ROUTE_LABELS: Record<string, string> = {
    '/analysis': 'Analysis',
    '/market-report': 'Market Report',
    '/macro-nowcast': 'Macro Nowcast',
    '/macro-signals': 'Macro Signals',
    '/relief-signals': 'Relief Signals',
    '/options-positioning': 'Options Positioning',
    '/seasonality-flow': 'Seasonality & Flow',
    '/crypto-btc': 'Crypto / BTC',
    '/geopolitical': 'Geopolitical',
    '/news': 'News',
    '/tutorial': 'Tutorial',
    '/education-center': 'Education Center',
    '/trading-strategies': 'Trading Strategies',
    '/help-center': 'Help Center',
    '/contact-support': 'Contact Support',
}

export default function DashboardHeader() {
    const pathname = usePathname()
    const label = ROUTE_LABELS[pathname] ?? 'Dashboard'
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <header className='sticky top-0 z-30 min-h-20 flex items-center justify-between px-5 lg:px-6 bg-[#16161F] border-[#FFFFFF0F] backdrop-blur-sm border-b'>
            {/* Page title with icon */}
            <div className='flex items-center gap-2'>
                <PageIcon pathname={pathname} />
                <h1 className='text-white text-[24px] leading-[24px] font-semibold'>{label}</h1>
            </div>

            {/* User profile dropdown */}
            <div ref={ref} className='relative'>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className='flex items-center gap-2 group cursor-pointer'
                >
                    {/* Avatar with online dot */}
                    <div className='relative flex-shrink-0'>
                        <div className='w-10 h-10 rounded-full bg-[#FFFFFF08] border border-[#FFFFFF1A] flex items-center justify-center text-white/60 text-[15px] font-medium leading-[12px]'>
                            SM
                        </div>
                        <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#62A381] border-1 border-[#0D1115]' />
                    </div>
                    {/* Name + role */}
                    <div className='hidden sm:block text-left'>
                        <p className='text-white text-[14px] leading-[17px] font-semibold'>Smith Murphy</p>
                        <p className='text-white/60 text-[11px] leading-[13px] font-normal mt-1'>Early Bird</p>
                    </div>
                    {/* Chevron */}
                    <svg className={`flex-shrink-0 text-white group-hover:text-white/70 transition-all duration-200 ml-2 ${open ? 'rotate-180' : 'rotate-0'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Dropdown */}
                {open && (
                    <div className='absolute right-0 top-[calc(100%+10px)] w-full bg-[#1E1E2A] border border-[#FFFFFF0F] rounded-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50'>
                        <Link
                            href='/login'
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-2.5 w-full px-4 py-3 text-[13px] text-[#FF6B6B] hover:bg-[#FFFFFF08] transition-colors'
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M5.5 13H3a1 1 0 01-1-1V3a1 1 0 011-1h2.5M10 10.5L13 7.5M13 7.5L10 4.5M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Logout
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}
