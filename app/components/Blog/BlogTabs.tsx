'use client';

import { TABS, type Tab } from './blogData';

interface BlogTabsProps {
    activeTab: Tab['id'];
    onTabChange: (id: Tab['id']) => void;
}

export default function BlogTabs({ activeTab, onTabChange }: BlogTabsProps) {
    return (
        <div className="mb-10 border-b border-white/[0.06] pt-6 px-4 sm:px-6">
            <div className='max-w-[1560px] mx-auto'>
                <div className='w-full flex items-center justify-start'>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`cursor-pointer px-6 pb-[18px] text-[14px] sm:text-[16px] leading-5 sm:leading-[24px] transition-colors relative whitespace-nowrap ${activeTab === tab.id
                                ? 'text-white font-semibold '
                                : 'text-white/60 hover:text-white/70 font-normal'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#6DB7FF] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
