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

            {/* CTA with glows */}
            <div className='relative pb-14 sm:pb-20 xl:pb-[170px] pt-10 sm:pt-[50px]'>
                {/* Ellipse 19 - left glow */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none" style={{
                    width: '977px', height: '446px',
                    left: '-465px', bottom: '-100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />

                {/* Ellipse 20 - right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none h-[300px] md:h-[446px] w-[400px] md:w-[977px] right-[-200px] md:right-[-465px] blur-[80px] md:blur-[250px]" style={{
                     bottom: '-120px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <CTA />
                </div>
            </div>
        </div>
    );
}
