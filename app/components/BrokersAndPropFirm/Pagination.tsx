'use client';

import { useState, useRef, useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (items: number) => void;
}

const PAGE_SIZE_OPTIONS = [4, 8, 12, 20];

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const getPages = (): (number | '...')[] => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | '...')[] = [];
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Result count */}
            <p className="text-white/50 text-[14px] sm:text-[16px] leading-4.5 sm:leading-[21px] font-medium bg-[#FFFFFF08] rounded-[62px] py-2 sm:py-2.5 px-5">
                Result :<span className="text-white font-semibold ml-2.5">{totalItems} Items</span>
            </p>

            {/* Page buttons */}
            <div className="flex items-center gap-3">
                {/* Prev */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 sm:w-[41px] h-8 sm:h-[41px] cursor-pointer flex items-center justify-center rounded-full bg-[#FFFFFF08] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 13L5.5 8L10.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className='flex items-center gap-1'>
                    {pages.map((p, i) =>
                        p === '...' ? (
                            <span key={`ellipsis-${i}`} className="mx-1 w-8 sm:w-[41px] bg-[#FFFFFF08] rounded-full h-8 sm:h-[41px] flex items-center justify-center text-white/80 text-[16px] font-semibold leading-[50px]">…</span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => onPageChange(p as number)}
                                className={`w-8 sm:w-[41px] h-8 sm:h-[41px] cursor-pointer flex items-center justify-center rounded-full text-[16px] leading-[21px] font-semibold transition-colors ${currentPage === p
                                    ? 'bg-white text-[#070711]'
                                    : 'text-white/80 hover:text-white bg-[#FFFFFF08]'
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    )}
                </div>

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 sm:w-[41px] h-8 sm:h-[41px] cursor-pointer flex items-center justify-center rounded-full bg-[#FFFFFF08] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 13L10.5 8L5.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Pages dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="flex items-center gap-10 bg-[#FFFFFF08] cursor-pointer rounded-[90px] px-5 py-2 sm:py-2.5 text-[14px] sm:text-[16px] leading-4.5 sm:leading-[21px] font-semibold text-white/70 transition-colors"
                >
                    <span className="font-medium text-white/70">{totalPages} Pages</span>
                    <svg width="16" height="16" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 5.5L8 10.5L3 5.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {dropdownOpen && onItemsPerPageChange && (
                    <div className="absolute right-0 top-full mb-2 w-full bg-[#FFFFFF08] rounded-xl overflow-hidden shadow-xl z-20">
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <button
                                key={size}
                                onClick={() => {
                                    onItemsPerPageChange(size);
                                    onPageChange(1);
                                    setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-[14px] cursor-pointer transition-colors ${itemsPerPage === size
                                    ? 'text-white bg-white/10 font-medium'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {size} per page
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
