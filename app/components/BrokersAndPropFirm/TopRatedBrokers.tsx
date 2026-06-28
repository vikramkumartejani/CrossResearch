'use client';

import { useState } from 'react';
import BrokerCard, { type BrokerCardData } from './BrokerCard';
import Pagination from './Pagination';

// ─── Data ─────────────────────────────────────────────────────────────────────

const BROKERS: BrokerCardData[] = [
    { id: 'markets', name: 'Markets', logo: '/assets/fxpro.svg', rating: 4.4, minDeposit: '$200', leverage: '1:500', spread: 'Variable', ctaLink: '#' },
    { id: 'xm', name: 'XM', logo: '/assets/fxpro.svg', rating: 4.7, minDeposit: '$50', leverage: '1:1000', spread: 'Low', ctaLink: '#' },
    { id: 'tickmill', name: 'Tickmill', logo: '/assets/fxpro.svg', rating: 4.5, minDeposit: '$100', leverage: '1:500', spread: 'Floating', ctaLink: '#', mostPopular: true },
    { id: 'fxpro', name: 'FxPro', logo: '/assets/fxpro.svg', rating: 4.6, minDeposit: '$100', leverage: '1:200', spread: 'Variable', ctaLink: '#' },
    { id: 'pepperstone', name: 'Pepperstone', logo: '/assets/fxpro.svg', rating: 4.8, minDeposit: '$200', leverage: '1:400', spread: 'Low', ctaLink: '#' },
    { id: 'ic-markets', name: 'IC Markets', logo: '/assets/fxpro.svg', rating: 4.9, minDeposit: '$200', leverage: '1:500', spread: 'Raw', ctaLink: '#' },
    { id: 'exness', name: 'Exness', logo: '/assets/fxpro.svg', rating: 4.3, minDeposit: '$10', leverage: '1:2000', spread: 'Low', ctaLink: '#' },
    { id: 'admirals', name: 'Admirals', logo: '/assets/fxpro.svg', rating: 4.2, minDeposit: '$100', leverage: '1:500', spread: 'Variable', ctaLink: '#' },
    { id: 'oanda', name: 'OANDA', logo: '/assets/fxpro.svg', rating: 4.1, minDeposit: '$0', leverage: '1:50', spread: 'Variable', ctaLink: '#' },
    { id: 'saxo', name: 'Saxo Bank', logo: '/assets/fxpro.svg', rating: 4.0, minDeposit: '$2000', leverage: '1:200', spread: 'Low', ctaLink: '#' },
    { id: 'fbs', name: 'FBS', logo: '/assets/fxpro.svg', rating: 4.5, minDeposit: '$5', leverage: '1:3000', spread: 'Floating', ctaLink: '#' },
    { id: 'forex-com', name: 'Forex.com', logo: '/assets/fxpro.svg', rating: 4.6, minDeposit: '$100', leverage: '1:200', spread: 'Variable', ctaLink: '#' },
    { id: 'etoro', name: 'eToro', logo: '/assets/fxpro.svg', rating: 4.4, minDeposit: '$50', leverage: '1:30', spread: 'Variable', ctaLink: '#' },
    { id: 'avatrade', name: 'AvaTrade', logo: '/assets/fxpro.svg', rating: 4.7, minDeposit: '$100', leverage: '1:400', spread: 'Fixed', ctaLink: '#' },
    { id: 'hotforex', name: 'HF Markets', logo: '/assets/fxpro.svg', rating: 4.5, minDeposit: '$5', leverage: '1:2000', spread: 'Low', ctaLink: '#' },
    { id: 'blackbull', name: 'BlackBull Markets', logo: '/assets/fxpro.svg', rating: 4.6, minDeposit: '$0', leverage: '1:500', spread: 'ECN', ctaLink: '#' },
    { id: 'vantage', name: 'Vantage', logo: '/assets/fxpro.svg', rating: 4.6, minDeposit: '$50', leverage: '1:500', spread: 'Raw', ctaLink: '#' },
    { id: 'thinkmarkets', name: 'ThinkMarkets', logo: '/assets/fxpro.svg', rating: 4.4, minDeposit: '$0', leverage: '1:500', spread: 'Variable', ctaLink: '#' },
    { id: 'fp-markets', name: 'FP Markets', logo: '/assets/fxpro.svg', rating: 4.8, minDeposit: '$100', leverage: '1:500', spread: 'Raw', ctaLink: '#' },
    { id: 'roboforex', name: 'RoboForex', logo: '/assets/fxpro.svg', rating: 4.5, minDeposit: '$10', leverage: '1:2000', spread: 'Floating', ctaLink: '#' },
    { id: 'instaforex', name: 'InstaForex', logo: '/assets/fxpro.svg', rating: 4.3, minDeposit: '$1', leverage: '1:1000', spread: 'Floating', ctaLink: '#' },
    { id: 'octa', name: 'Octa', logo: '/assets/fxpro.svg', rating: 4.6, minDeposit: '$25', leverage: '1:1000', spread: 'Low', ctaLink: '#' },
    { id: 'xchief', name: 'xChief', logo: '/assets/fxpro.svg', rating: 4.2, minDeposit: '$10', leverage: '1:1000', spread: 'Variable', ctaLink: '#' },
    { id: 'capital-com', name: 'Capital.com', logo: '/assets/fxpro.svg', rating: 4.7, minDeposit: '$20', leverage: '1:30', spread: 'Low', ctaLink: '#' },
    { id: 'cmc-markets', name: 'CMC Markets', logo: '/assets/fxpro.svg', rating: 4.8, minDeposit: '$0', leverage: '1:200', spread: 'Variable', ctaLink: '#' },
    { id: 'ig', name: 'IG', logo: '/assets/fxpro.svg', rating: 4.8, minDeposit: '$250', leverage: '1:200', spread: 'Low', ctaLink: '#' },
    { id: 'easyMarkets', name: 'easyMarkets', logo: '/assets/fxpro.svg', rating: 4.3, minDeposit: '$25', leverage: '1:400', spread: 'Fixed', ctaLink: '#' },
    { id: 'dukascopy', name: 'Dukascopy', logo: '/assets/fxpro.svg', rating: 4.5, minDeposit: '$1000', leverage: '1:200', spread: 'ECN', ctaLink: '#' },
    { id: 'trading212', name: 'Trading 212', logo: '/assets/fxpro.svg', rating: 4.4, minDeposit: '$1', leverage: '1:30', spread: 'Variable', ctaLink: '#' },
    { id: 'city-index', name: 'City Index', logo: '/assets/fxpro.svg', rating: 4.4, minDeposit: '$100', leverage: '1:200', spread: 'Low', ctaLink: '#' },
    { id: 'moneta-markets', name: 'Moneta Markets', logo: '/assets/fxpro.svg', rating: 4.6, minDeposit: '$50', leverage: '1:1000', spread: 'Raw', ctaLink: '#', },
    { id: 'tmgm', name: 'TMGM', logo: '/assets/fxpro.svg', rating: 4.5, minDeposit: '$100', leverage: '1:500', spread: 'Low', ctaLink: '#', },
];

const ITEMS_PER_PAGE = 4;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TopRatedBrokers() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

    const start = (page - 1) * itemsPerPage;
    const sliced = BROKERS.slice(start, start + itemsPerPage);

    return (
        <div className='px-4 sm:px-6 pt-[65px] pb-[170px]'>
            <div className='max-w-[1560px] mx-auto'>

                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Top Rated Brokers
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-16">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Summary of <br className='sm:block hidden' /> the Best Brokers
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] font-inter leading-5 sm:leading-[32px] font-normal max-w-[516px]">
                        Compare top brokers with low fees, strong regulation, and reliable trading platforms.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {sliced.map((broker) => (
                        <BrokerCard key={broker.id} broker={broker} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={page}
                    totalItems={BROKERS.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(p) => setPage(p)}
                    onItemsPerPageChange={(size) => setItemsPerPage(size)}
                />
            </div>
        </div>
    );
}
