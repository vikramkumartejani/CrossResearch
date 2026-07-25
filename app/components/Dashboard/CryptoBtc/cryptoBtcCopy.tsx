'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface ChartCopy {
    eyebrow: string
    title: string
    badge: string | null
}

export interface CryptoBtcCopy {
    page: {
        eyebrow: string
        title: string
        subtitle: string
    }
    sections: {
        desk_brief: string
        institutional_flow: string
        forecast_volatility: string
        sentiment: string
    }
    charts: {
        etf_flows: ChartCopy
        return_forecast: ChartCopy
        vol_regime: ChartCopy
        fear_greed: ChartCopy
    }
}

const DEFAULT_COPY: CryptoBtcCopy = {
    page: {
        eyebrow: 'Crypto / BTC Desk',
        title: 'Bitcoin Intelligence',
        subtitle:
            'ETF flow regime, model-driven return forecast, vol regime classification, and an in-house Fear & Greed composite — every chart engineered for one decision.',
    },
    sections: {
        desk_brief: 'BTC Desk Brief',
        institutional_flow: 'Institutional Flow',
        forecast_volatility: 'Forecast & Volatility',
        sentiment: 'Sentiment',
    },
    charts: {
        etf_flows: { eyebrow: 'ETF Flows', title: 'BTC Spot ETF Net Flows', badge: 'Alpha' },
        return_forecast: {
            eyebrow: 'Return Forecast',
            title: 'BTC/USDT 4H Mean · σ Bands · Monte Carlo',
            badge: 'Alpha',
        },
        vol_regime: {
            eyebrow: 'Vol Regime',
            title: 'BTC/USDT 4H Realized Volatility Regime Bands',
            badge: 'Alpha',
        },
        fear_greed: { eyebrow: 'Sentiment', title: 'BTC Fear & Greed Index', badge: null },
    },
}

const CryptoBtcCopyContext = createContext<CryptoBtcCopy>(DEFAULT_COPY)

export function CryptoBtcCopyProvider({ children }: { children: ReactNode }) {
    const [copy, setCopy] = useState<CryptoBtcCopy>(DEFAULT_COPY)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                const res = await fetch('/api/crypto-btc-copy')
                if (!res.ok) return
                const data = await res.json()
                if (cancelled || !data?.page || !data?.sections || !data?.charts) return
                setCopy({
                    page: { ...DEFAULT_COPY.page, ...data.page },
                    sections: { ...DEFAULT_COPY.sections, ...data.sections },
                    charts: {
                        etf_flows: { ...DEFAULT_COPY.charts.etf_flows, ...data.charts.etf_flows },
                        return_forecast: {
                            ...DEFAULT_COPY.charts.return_forecast,
                            ...data.charts.return_forecast,
                        },
                        vol_regime: { ...DEFAULT_COPY.charts.vol_regime, ...data.charts.vol_regime },
                        fear_greed: { ...DEFAULT_COPY.charts.fear_greed, ...data.charts.fear_greed },
                    },
                })
            } catch {
                // Keep defaults if copy endpoint is unavailable
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    const value = useMemo(() => copy, [copy])
    return <CryptoBtcCopyContext.Provider value={value}>{children}</CryptoBtcCopyContext.Provider>
}

export function useCryptoBtcCopy() {
    return useContext(CryptoBtcCopyContext)
}
