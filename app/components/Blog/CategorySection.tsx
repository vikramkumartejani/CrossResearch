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
        <div className='px-4 sm:px-6'>
            <div className='max-w-[1560px] mx-auto'>
                <div className="mb-[66px]">
                    <h2 className="text-white text-[28px] sm:text-[40px] font-normal leading-[52px]">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-4 text-white/60 text-[14px] sm:text-[16px] leading-[24px]">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
    );
}
