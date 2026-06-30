'use client';

import { useState } from 'react';
import BlogTabs from './BlogTabs';
import RecentSection from './RecentSection';
import CategorySection from './CategorySection';
import { POSTS, TABS, TAB_DESCRIPTIONS, type Tab } from './blogData';
import CTA from '../Home/CTA';

export default function BlogContent() {
    const [activeTab, setActiveTab] = useState<Tab['id']>('recent');

    const filtered = POSTS.filter((p) => p.tab === activeTab);
    const activeTabData = TABS.find((t) => t.id === activeTab);

    return (
        <div>
            <div className='border-t border-[#FFFFFF0D] mt-[96px]'>
                <BlogTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div>
                {activeTab === 'recent' ? (
                    <RecentSection posts={filtered} />
                ) : (
                    <CategorySection
                        title={activeTabData?.label ?? ''}
                        description={TAB_DESCRIPTIONS[activeTab]}
                        posts={filtered}
                    />
                )}
            </div>

            <div className='pb-[170px] pt-[50px] px-4 sm:px-6'>
                <CTA />
            </div>
        </div>
    );
}
