'use client';

import { useState, useEffect } from 'react';

interface RangeItem {
    title: string
    subtitle: string
    high: string
    low: string
}

interface PriceRangeData {
    intraday_range: { high: number; low: number }
    trend_range: { high: number; low: number }
    volatility_range: { high: number; low: number }
}

interface ApiResponse {
    asset: string
    ranges: PriceRangeData
    metadata: {
        spot: number
        latest_bar_utc: string
        atr14: number
        rv21_pct: number
    }
    generated_utc: string
}

interface PriceRangesProps {
    asset: string
}

function PriceRangeCard({ title, subtitle, high, low, isLoading }: RangeItem & { isLoading?: boolean }) {
    return (
        <div className="bg-[#16161F] flex flex-col flex-1 min-w-0">
            <div className="bg-[#FFFFFF0D] px-2.5 sm:px-4 py-2.5">
                <p className="text-white text-[12px] sm:text-[14px] font-semibold leading-[17px] pr-10 sm:pr-0">{title}</p>
                <p className="text-white/60 text-[11px] sm:text-[12px] leading-[14px] font-normal mt-1">{subtitle}</p>
            </div>

            {/* HIGH value */}
            <div className="flex items-start gap-2.5 sm:gap-4 p-3 sm:p-4">
                <div className="flex flex-col items-center">
                    <div
                        style={{
                            width: '9px',
                            height: '167px',
                            borderRadius: '70px',
                            background: 'linear-gradient(180deg, #2CB37B 0%, #060707 47.04%, #E25C3F 100%)',
                            flexShrink: 0,
                        }}
                    />
                </div>
                <div className="flex flex-col justify-between gap-3 h-full">
                    <div className="text-left">
                        <p className="text-[#23B672] text-[14px] font-semibold leading-[17px]">
                            {isLoading ? '...' : high}
                        </p>
                        <p className="text-white/60 text-[12px] leading-[14px] font-normal mt-1">High</p>
                    </div>

                    <div className="text-left">
                        <p className="text-[#E25C3F] text-[14px] font-semibold leading-[17px]">
                            {isLoading ? '...' : low}
                        </p>
                        <p className="text-white/60 text-[12px] leading-[14px] font-normal mt-1">Low</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PriceRanges({ asset }: PriceRangesProps) {
    const [priceData, setPriceData] = useState<PriceRangeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPriceRanges();
    }, [asset]);

    const fetchPriceRanges = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/price-ranges?asset=${asset}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data: ApiResponse = await response.json();
            setPriceData(data.ranges);
        } catch (err) {
            console.error('Error fetching price ranges:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch price ranges');
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (value: number, precision: number = 5) => {
        return value.toFixed(precision);
    };

    const getPrecision = (asset: string): number => {
        const precisionMap: Record<string, number> = {
            'EURUSD': 5,
            'GBPUSD': 5,
            'USDJPY': 3,
            'XAUUSD': 2,
            'XAGUSD': 3,
            'USOIL': 2,
            'NAS100': 2,
            'US30': 1,
            'SP500': 2,
            'BTCUSD': 1,
        };
        return precisionMap[asset] || 5;
    };

    const ranges: RangeItem[] = priceData ? [
        { 
            title: 'Intraday Range', 
            subtitle: 'Todays Range', 
            high: formatPrice(priceData.intraday_range.high, getPrecision(asset)),
            low: formatPrice(priceData.intraday_range.low, getPrecision(asset))
        },
        { 
            title: 'Trend Range', 
            subtitle: '7-Day Range', 
            high: formatPrice(priceData.trend_range.high, getPrecision(asset)),
            low: formatPrice(priceData.trend_range.low, getPrecision(asset))
        },
        { 
            title: 'Volatility Range', 
            subtitle: '30-Day Range', 
            high: formatPrice(priceData.volatility_range.high, getPrecision(asset)),
            low: formatPrice(priceData.volatility_range.low, getPrecision(asset))
        },
    ] : [];

    return (
        <div>
            <h4 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Price Ranges</h4>
            
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[12px] px-3 py-2 rounded mb-3">
                    {error}
                </div>
            )}
            
            <div className="flex gap-2.5 sm:gap-4 mt-3 sm:mt-4">
                {isLoading ? (
                    <>
                        <PriceRangeCard title="Intraday Range" subtitle="Todays Range" high="..." low="..." isLoading />
                        <PriceRangeCard title="Trend Range" subtitle="7-Day Range" high="..." low="..." isLoading />
                        <PriceRangeCard title="Volatility Range" subtitle="30-Day Range" high="..." low="..." isLoading />
                    </>
                ) : ranges.length > 0 ? (
                    ranges.map((r) => (
                        <PriceRangeCard key={r.title} {...r} />
                    ))
                ) : null}
            </div>
        </div>
    )
}
