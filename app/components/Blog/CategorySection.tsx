'use client';

import { useState } from 'react';
import type { Post } from './blogData';
import GridCard from './GridCard';
import Pagination from '../BrokersAndPropFirm/Pagination';

interface CategorySectionProps {
    title: string;
    description: string;
    posts: Post[];
}

const DEFAULT_ITEMS_PER_PAGE = 6;

export default function CategorySection({ title, description, posts }: CategorySectionProps) {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

    const start = (page - 1) * itemsPerPage;
    const sliced = posts.slice(start, start + itemsPerPage);

    const handleItemsPerPageChange = (size: number) => {
        setItemsPerPage(size);
        setPage(1);
    };

    return (
        <div className='px-4 sm:px-6 mb-6 lg:mb-[60px]'>
            <div className='relative max-w-[1560px] mx-auto'>

                {/* Ellipse 14 - left glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '400px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                {/* Ellipse 13 - right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none w-[500px] sm:w-[787px] h-[300px] sm:h-[504px] right-[-400px] sm:right-[-339px] blur-[100px] sm:blur-[250px]" style={{
                    top: '400px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    zIndex: 0,
                }} />

                <div className="relative" style={{ zIndex: 1 }}>
                    <div className="mb-8 sm:mb-10 lg:mb-[66px]">
                        <h2 className="text-white text-[26px] sm:text-[40px] font-normal leading-10 sm:leading-[52px]">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-2 sm:mt-4 text-white/60 text-[14px] sm:text-[16px] leading-5 sm:leading-[24px]">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                        {sliced.map((post) => (
                            <GridCard key={post.id} post={post} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={page}
                        totalItems={posts.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
            </div>
        </div>
    );
}
