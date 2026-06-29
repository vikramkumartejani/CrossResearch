'use client';

import { useState } from 'react';
import PropFirmCard, { type PropFirmCardData } from './PropFirmCard';
import Pagination from './Pagination';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROP_FIRMS: PropFirmCardData[] = [
    { id: 'ftmo', name: 'FTMO', logo: '/assets/funding-traders.png', rating: 4.5, challengeFee: '$99', accountSize: '$100,000', profitSplit: '80%', ctaLink: '#', mostPopular: true },
    { id: 'my-forex-funds', name: 'My Forex Funds', logo: '/assets/funding-traders.png', rating: 4.7, challengeFee: '$74', accountSize: '$200,000', profitSplit: '85%', ctaLink: '#' },
    { id: 'funding-traders', name: 'Funding Traders', logo: '/assets/funding-traders.png', rating: 4.4, challengeFee: '$85', accountSize: '$300,000', profitSplit: '95%', ctaLink: '#' },
    { id: 'blueberry-funded', name: 'Blueberry Funded', logo: '/assets/funding-traders.png', rating: 4.8, challengeFee: '$74', accountSize: '$150,000', profitSplit: '80%', ctaLink: '#' },
    { id: 'the5ers', name: 'The5ers', logo: '/assets/funding-traders.png', rating: 4.6, challengeFee: '$39', accountSize: '$50,000', profitSplit: '100%', ctaLink: '#' },
    { id: 'topstep', name: 'TopStep', logo: '/assets/funding-traders.png', rating: 4.3, challengeFee: '$149', accountSize: '$150,000', profitSplit: '90%', ctaLink: '#' },
    { id: 'e8-funding', name: 'E8 Funding', logo: '/assets/funding-traders.png', rating: 4.2, challengeFee: '$58', accountSize: '$100,000', profitSplit: '80%', ctaLink: '#' },
    { id: 'true-forex', name: 'True Forex Funds', logo: '/assets/funding-traders.png', rating: 4.1, challengeFee: '$59', accountSize: '$100,000', profitSplit: '75%', ctaLink: '#' },
    { id: 'instant-funding', name: 'Instant Funding', logo: '/assets/funding-traders.png', rating: 4.0, challengeFee: '$39', accountSize: '$25,000', profitSplit: '75%', ctaLink: '#' },
    { id: 'alpha-capital', name: 'Alpha Capital', logo: '/assets/funding-traders.png', rating: 3.9, challengeFee: '$99', accountSize: '$200,000', profitSplit: '80%', ctaLink: '#' },
    { id: 'fundednext', name: 'FundedNext', logo: '/assets/funding-traders.png', rating: 4.8, challengeFee: '$59', accountSize: '$200,000', profitSplit: '90%', ctaLink: '#' },
    { id: 'lux-trading', name: 'Lux Trading Firm', logo: '/assets/funding-traders.png', rating: 4.6, challengeFee: '$99', accountSize: '$250,000', profitSplit: '75%', ctaLink: '#' },
    { id: 'surgetrader', name: 'SurgeTrader', logo: '/assets/funding-traders.png', rating: 4.5, challengeFee: '$49', accountSize: '$100,000', profitSplit: '90%', ctaLink: '#' },
    { id: 'maven-trading', name: 'Maven Trading', logo: '/assets/funding-traders.png', rating: 4.4, challengeFee: '$79', accountSize: '$200,000', profitSplit: '80%', ctaLink: '#' },
    { id: 'funded-engineer', name: 'Funded Engineer', logo: '/assets/funding-traders.png', rating: 4.3, challengeFee: '$55', accountSize: '$100,000', profitSplit: '90%', ctaLink: '#' },
    { id: 'traders-with-edge', name: 'Traders With Edge', logo: '/assets/funding-traders.png', rating: 4.7, challengeFee: '$89', accountSize: '$200,000', profitSplit: '80%', ctaLink: '#' },
    { id: 'audacity-capital', name: 'Audacity Capital', logo: '/assets/funding-traders.png', rating: 4.2, challengeFee: '$149', accountSize: '$500,000', profitSplit: '85%', ctaLink: '#' },
    { id: 'city-traders', name: 'City Traders Imperium', logo: '/assets/funding-traders.png', rating: 4.5, challengeFee: '$69', accountSize: '$100,000', profitSplit: '80%', ctaLink: '#' },
];

const ITEMS_PER_PAGE = 6;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TopPropFirm() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

    const start = (page - 1) * itemsPerPage;
    const sliced = PROP_FIRMS.slice(start, start + itemsPerPage);

    return (
        <div className='px-4 sm:px-6 py-8 sm:py-[65px]'>
            <div className='max-w-[1560px] mx-auto'>

                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Top Rated Prop Firm
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-16">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Summary of <br className='sm:block hidden' /> the Prop Firm
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] font-inter leading-5 sm:leading-[32px] font-normal max-w-[535px]">
                        Compare top prop firms with fair rules, high profit splits, fast payouts, and reliable trading conditions.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    {sliced.map((firm) => (
                        <PropFirmCard key={firm.id} firm={firm} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={page}
                    totalItems={PROP_FIRMS.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(p) => setPage(p)}
                    onItemsPerPageChange={(size) => setItemsPerPage(size)}
                />
            </div>
        </div>
    );
}
