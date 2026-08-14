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
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-[50px] max-w-[1560px] mx-auto">
                    <div className='w-full lg:max-w-[878px]'>
                        <FeaturedPost post={featured} />
                    </div>
                    <div className="w-full lg:flex-1 flex flex-col gap-4 sm:gap-5 lg:max-w-[632px]">
                        {sidebar.map((post) => (
                            <SidebarCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>

            {/* LogoSlider between featured and categories */}
            <div className='relative my-10 md:mt-20 xl:mt-[120px] md:mb-[66px]'>
                {/* Ellipse 14 - left glow */}
                <div aria-hidden="true" className="absolute pointer-events-none top-0 sm:top-[-200px] w-[500px] sm:w-[833px] h-[300px] sm:h-[533px] left-[-300px] sm:left-[-339px] blur-[100px] sm:blur-[250px]" style={{
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />
                {/* Ellipse 13 - right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '787px', height: '504px',
                    right: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <LogoSlider />
                </div>
            </div>

            <div className='px-4 sm:px-6'>
                <div className='relative max-w-[1560px] mx-auto'>

                    {/* Ellipse 18 - right top (near Strategies) */}
                    <div aria-hidden="true" className="absolute pointer-events-none w-[500px] sm:w-[765px] h-[300px] sm:h-[403px] right-[-373px] blur-[100px] sm:blur-[250px]" style={{
                        top: '600px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        transform: 'rotate(-23.64deg)',
                        zIndex: 0,
                    }} />
                    {/* Ellipse 1 - left top (near Strategies) */}
                    <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                        width: '765px', height: '429px',
                        left: '-373px', top: '600px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        filter: 'blur(250px)',
                        zIndex: 0,
                    }} />
                    {/* Ellipse 16 - right bottom (near Education) */}
                    <div aria-hidden="true" className="absolute pointer-events-none md:block hidden" style={{
                        width: '744.52px', height: '468.77px',
                        right: '-373px', bottom: '200px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        filter: 'blur(250px)',
                        transform: 'rotate(-26.89deg)',
                        zIndex: 0,
                    }} />
                    {/* Ellipse 15 - left bottom (near Education) */}
                    <div aria-hidden="true" className="absolute pointer-events-none w-[500px] sm:w-[865px] h-[300px] sm:h-[473px] left-[-373px] blur-[100px] sm:blur-[250px]" style={{
                        bottom: '0px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        zIndex: 0,
                    }} />

                    {/* Category sections below */}
                    <div className="relative" style={{ zIndex: 1 }}>
                        {CATEGORY_SECTIONS.map((section) => {
                            const sectionPosts = POSTS.filter((p) => p.tab === section.id).slice(0, 3);
                            if (sectionPosts.length === 0) return null;
                            return (
                                <div key={section.id} className="mb-10 sm:mb-[60px]">
                                    <h2 className="text-white text-[26px] sm:text-[40px] font-normal leading-10 sm:leading-[52px] mb-4 sm:mb-10">
                                        {section.label}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {sectionPosts.map((post) => (
                                            <GridCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
