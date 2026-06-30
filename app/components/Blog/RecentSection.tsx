'use client';

import { POSTS } from './blogData';
import type { Post } from './blogData';
import FeaturedPost from './FeaturedPost';
import SidebarCard from './SidebarCard';
import GridCard from './GridCard';
import LogoSlider from '../LogoSlider';

interface RecentSectionProps {
    posts: Post[];
}

const CATEGORY_SECTIONS = [
    { id: 'strategies', label: 'Strategies & Tips' },
    { id: 'updates', label: 'Product Updates' },
    { id: 'education', label: 'Education' },
] as const;

export default function RecentSection({ posts }: RecentSectionProps) {
    const featured = posts[0];
    const sidebar = posts.slice(1, 5);

    if (!featured) return null;

    return (
        <>
            {/* Featured + sidebar */}
            <div className='px-4 sm:px-6'>
                <div className="flex flex-col lg:flex-row gap-[50px] max-w-[1560px] mx-auto">
                    <div className='max-w-[878px]'>
                        <FeaturedPost post={featured} />
                    </div>
                    <div className="lg:flex-1 flex flex-col gap-5 max-w-[632px]">
                        {sidebar.map((post) => (
                            <SidebarCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>

            {/* LogoSlider between featured and categories */}
            <div className='mt-[120px] mb-[66px]'>
                <LogoSlider />
            </div>

            <div className='px-4 sm:px-6'>
                <div className='max-w-[1560px] mx-auto'>
                    {/* Category sections below */}
                    {CATEGORY_SECTIONS.map((section) => {
                        const sectionPosts = POSTS.filter((p) => p.tab === section.id).slice(0, 3);
                        if (sectionPosts.length === 0) return null;
                        return (
                            <div key={section.id} className="mb-[60px]">
                                <h2 className="text-white text-[24px] sm:text-[40px] font-normal leading-[52px] mb-10">
                                    {section.label}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sectionPosts.map((post) => (
                                        <GridCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
