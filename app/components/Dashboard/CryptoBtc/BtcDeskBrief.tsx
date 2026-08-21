'use client'

import { useEffect, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

interface DeskData {
    spotPrice: number | null
    change24h: number | null
    forecastPrice: number | null
    forecastChange: number | null
    forecastBias: string
    upperPct: number | null
    lowerPct: number | null
    volRegime: string
    volPct: number | null
    fearGreed: number | null
    fearRegime: string
    etf5d: number | null
}

function formatUsd(value: number | null) {
    if (value == null || !Number.isFinite(value)) return '-'
    return (
        '$' +
        value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    )
}

function formatSignedPct(value: number | null, digits = 2) {
    if (value == null || !Number.isFinite(value)) return '-'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(digits)}%`
}

function formatFlowUsd(value: number | null) {
    if (value == null || !Number.isFinite(value)) return '-'
    const sign = value >= 0 ? '+' : '-'
    const abs = Math.abs(value)
    if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`
    if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
    return `${sign}$${abs.toFixed(0)}`
}

export default function BtcDeskBrief() {
    const [data, setData] = useState<DeskData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)

                const [forecastRes, etfRes, fgRes] = await Promise.all([
                    fetch('/api/btc-forecast'),
                    fetch('/api/btc-etf-flows'),
                    fetch('/api/btc-fear-greed'),
                ])

                if (!forecastRes.ok || !etfRes.ok || !fgRes.ok) {
                    throw new Error('Failed to load BTC desk data')
                }

                const forecast = await forecastRes.json()
                const etf = await etfRes.json()
                const fg = await fgRes.json()

                if (cancelled) return

                setData({
                    spotPrice: forecast?.spot?.price ?? null,
                    change24h: forecast?.spot?.change_24h_pct ?? null,
                    forecastPrice: forecast?.forecast?.terminal?.median ?? null,
                    forecastChange: forecast?.forecast?.terminal?.change_pct ?? null,
                    forecastBias: forecast?.forecast?.terminal?.bias ?? '-',
                    upperPct: forecast?.forecast?.terminal?.upper_pct ?? null,
                    lowerPct: forecast?.forecast?.terminal?.lower_pct ?? null,
                    volRegime: forecast?.volatility?.latest?.regime ?? '-',
                    volPct: forecast?.volatility?.latest?.rv_pct ?? null,
                    fearGreed: fg?.latest?.index ?? null,
                    fearRegime: fg?.latest?.regime ?? '-',
                    etf5d: etf?.latest?.flow_5d ?? null,
                })
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Unknown error')
                    setData(null)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    const changeUp = (data?.change24h ?? 0) >= 0
    const forecastUp = (data?.forecastChange ?? 0) >= 0
    const etfUp = (data?.etf5d ?? 0) >= 0
    const fgValue = data?.fearGreed
    const fgClass =
        fgValue == null
            ? 'text-white'
            : fgValue >= 55
              ? 'text-[#2CB37B]'
              : fgValue <= 45
                ? 'text-[#E25C3F]'
                : 'text-white'

    return (
        <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
            <div className="flex items-center gap-1 mb-3 sm:mb-4">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.83313 11.1943L13.6669 16.0281C13.8865 16.2477 13.9963 16.3575 14.1148 16.4162C14.3401 16.5279 14.6047 16.5279 14.8302 16.4162C14.9486 16.3575 15.0584 16.2477 15.2781 16.0281C15.4977 15.8084 15.6075 15.6986 15.6662 15.5802C15.7779 15.3547 15.7779 15.0901 15.6662 14.8648C15.6075 14.7463 15.4977 14.6365 15.2781 14.4169L10.4444 9.58312L8.83313 7.9719C8.61353 7.7523 8.50373 7.6425 8.38523 7.58377C8.15985 7.47208 7.89525 7.47208 7.6698 7.58377C7.55138 7.6425 7.44155 7.7523 7.22192 7.9719C7.00228 8.19157 6.89247 8.30137 6.83377 8.4198C6.72208 8.64525 6.72208 8.90985 6.83377 9.13522C6.89247 9.25372 7.00228 9.36352 7.22192 9.58312L8.83313 11.1943ZM10.4444 9.58312L8.83313 11.1943"
                        stroke="#88C4FF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12.75 1.5L12.9711 2.09745C13.261 2.88088 13.4059 3.27259 13.6917 3.55834C13.9774 3.84409 14.3691 3.98903 15.1525 4.27892L15.75 4.5L15.1525 4.72108C14.3691 5.01097 13.9774 5.15592 13.6917 5.44166C13.4059 5.72741 13.261 6.11912 12.9711 6.90255L12.75 7.5L12.5289 6.90255C12.239 6.11913 12.0941 5.72741 11.8083 5.44166C11.5226 5.15591 11.1309 5.01097 10.3475 4.72108L9.75 4.5L10.3475 4.27892C11.1309 3.98903 11.5226 3.84409 11.8083 3.55834C12.0941 3.27259 12.239 2.88088 12.5289 2.09745L12.75 1.5Z"
                        stroke="#88C4FF"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4.5 3L4.66581 3.44809C4.88323 4.03565 4.99194 4.32944 5.20625 4.54376C5.42056 4.75806 5.71435 4.86677 6.30191 5.08419L6.75 5.25L6.30191 5.41581C5.71435 5.63323 5.42056 5.74194 5.20624 5.95625C4.99194 6.17056 4.88323 6.46435 4.66581 7.05191L4.5 7.5L4.33419 7.05191C4.11677 6.46435 4.00806 6.17056 3.79375 5.95625C3.57944 5.74194 3.28565 5.63323 2.69809 5.41581L2.25 5.25L2.69809 5.08419C3.28565 4.86677 3.57944 4.75806 3.79375 4.54375C4.00806 4.32944 4.11677 4.03565 4.33419 3.44809L4.5 3Z"
                        stroke="#88C4FF"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium">BTC Desk Summary</span>
            </div>

            {loading && <ChartLoader className="min-h-[120px]" />}
            {error && !loading && <p className="text-[#E25C3F] text-[12px]">{error}</p>}

            {!loading && !error && data && (
                <>
                    <div>
                        <p className="text-[#838388] text-[14px] leading-[17px] mb-1 font-medium">Spot</p>
                        <p className="text-white text-[22px] sm:text-[24px] leading-[30px] sm:leading-[34px] font-semibold">
                            {formatUsd(data.spotPrice)}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                            <span className={`text-[14px] leading-[17px] font-medium ${changeUp ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                {formatSignedPct(data.change24h)}
                            </span>
                            <span className="text-white/50 text-[14px] leading-[17px] font-medium">24H</span>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#FFFFFF1A] my-3" />

                    <div>
                        <p className="text-[#838388] text-[14px] leading-[17px] font-medium mb-1">30D Model Forecast</p>
                        <p className="text-white text-[22px] sm:text-[24px] leading-[30px] sm:leading-[34px] font-semibold">
                            {formatUsd(data.forecastPrice)}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                            <span
                                className={`text-[14px] leading-[17px] font-medium ${
                                    forecastUp ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                }`}
                            >
                                {formatSignedPct(data.forecastChange)}
                            </span>
                            <span className="text-white/50 text-[14px] leading-[17px] font-medium">{data.forecastBias}</span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div>
                            <p className="text-white/50 text-[14px] leading-[17px] font-medium mb-1">Upper</p>
                            <p className="text-[#2CB37B] text-[14px] leading-[17px] font-medium">
                                {formatSignedPct(data.upperPct, 1)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-white/50 text-[14px] leading-[17px] font-medium mb-1">Lower</p>
                            <p className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">
                                {formatSignedPct(data.lowerPct, 1)}
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#FFFFFF1A] my-3" />

                    <div className="flex flex-col gap-2.5 sm:gap-3">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[#838388] text-[14px] leading-[17px] font-medium">Vol Regime</span>
                            <span className="bg-[#88C4FF1A] text-[#88C4FF] text-[12px] leading-[14px] font-medium px-3 py-[5px]">
                                {data.volRegime}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[#838388] text-[14px] leading-[17px] font-medium">RV (Current)</span>
                            <span className="text-white text-[14px] leading-[17px] font-medium">
                                {data.volPct != null ? `${data.volPct.toFixed(1)}%` : '-'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[#838388] text-[14px] leading-[17px] font-medium">Fear & Greed</span>
                            <span className={`text-[14px] leading-[17px] font-medium ${fgClass}`}>
                                {fgValue != null ? `${fgValue.toFixed(0)}·${data.fearRegime}` : '-'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[#838388] text-[14px] leading-[17px] font-medium">5d ETF Flow</span>
                            <span
                                className={`text-[14px] leading-[17px] font-medium ${
                                    etfUp ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                }`}
                            >
                                {formatFlowUsd(data.etf5d)}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
