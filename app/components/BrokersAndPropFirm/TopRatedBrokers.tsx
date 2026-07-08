'use client';

import { useState } from 'react';
import BrokerCard, { type BrokerCardData } from './BrokerCard';
import Pagination from './Pagination';

// ─── Data ─────────────────────────────────────────────────────────────────────

const BROKERS: BrokerCardData[] = [
    {
        id: "vt-markets",
        name: "VT Markets",
        logo: "/assets/vt.png",
        rating: 4.4,
        minDeposit: "$200",
        leverage: "1:500",
        spread: "Variable",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=vtuk",
    },
    {
        id: "pu-prime",
        name: "PU Prime",
        logo: "/assets/pu.png",
        rating: 4.7,
        minDeposit: "$50",
        leverage: "1:1000",
        spread: "Low",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=pu",
    },
    {
        id: "axi",
        name: "AxiTrader",
        logo: "/assets/axi.png",
        rating: 4.5,
        minDeposit: "$100",
        leverage: "1:500",
        spread: "Floating",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=axitrader_new",
        mostPopular: true,
    },
    {
        id: "bullwaves",
        name: "Bullwaves",
        logo: "/assets/bull waves.png",
        rating: 4.6,
        minDeposit: "$100",
        leverage: "1:200",
        spread: "Variable",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=bullwaves",
    },
    {
        id: "vantage",
        name: "Vantage",
        logo: "/assets/vantage.png",
        rating: 4.8,
        minDeposit: "$200",
        leverage: "1:400",
        spread: "Low",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=vantagefx",
    },
    {
        id: "kudotrade",
        name: "Kudotrade",
        logo: "/assets/kudo.png",
        rating: 4.9,
        minDeposit: "$200",
        leverage: "1:500",
        spread: "Raw",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=kudotrade",
    },
    {
        id: "ultima-markets",
        name: "Ultima Markets",
        logo: "/assets/ultima.png",
        rating: 4.3,
        minDeposit: "$10",
        leverage: "1:2000",
        spread: "Low",
        ctaLink: "https://go.wealthwaveaffiliation.com/visit/?bta=35473&brand=ultimarkets",
    },
    {
        id: "tickmill",
        name: "Tickmill",
        logo: "/assets/tickmill.png",
        rating: 4.2,
        minDeposit: "$100",
        leverage: "1:500",
        spread: "Variable",
        ctaLink: "https://go.tickmill.com/visit/?bta=36008&brand=tickmill",
    },
    {
        id: "blueberry",
        name: "Blueberry",
        logo: "/assets/blueberry.png",
        rating: 4.1,
        minDeposit: "$0",
        leverage: "1:50",
        spread: "Variable",
        ctaLink: "#",
    },
];

const ITEMS_PER_PAGE = 6;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TopRatedBrokers() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

    const start = (page - 1) * itemsPerPage;
    const sliced = BROKERS.slice(start, start + itemsPerPage);

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
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
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
