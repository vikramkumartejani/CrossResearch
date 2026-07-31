'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type TabId = 'geopolitical_risk_score' | 'reversal_risk_momentum'

interface SeriesPoint {
    t: string
    v: number
    percentile?: number
    probability_pct?: number
    activation?: number
    state?: string | null
}

interface GriTab {
    id: TabId
    label: string
    y_domain: [number, number]
    latest: {
        t: string
        v: number
        change_1d: number | null
        percentile?: number | null
        probability_pct?: number | null
        state?: string | null
    }
    series: SeriesPoint[]
}

interface GriPayload {
    snapshot?: {
        gpri?: number
        gpri_1d_change?: number | null
        rrm?: number
        rrm_1d_change?: number | null
        rrm_state?: string
    }
    tabs?: GriTab[]
}

function OscillatorChart({
    series,
    yDomain = [-1, 1],
    lineColor = '#88C4FF',
}: {
    series: number[]
    yDomain?: [number, number]
    lineColor?: string
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = canvasRef.current
        if (!c || series.length < 2) return
        const ctx = c.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const W = c.offsetWidth || 500
        const H = c.offsetHeight || 200
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const [minV, maxV] = yDomain
        const padT = 8
        const padB = 8
        const toX = (i: number) => (i / (series.length - 1)) * W
        const toY = (v: number) => padT + ((maxV - v) / (maxV - minV)) * (H - padT - padB)

        ;[-1, -0.5, 0, 0.5, 1].forEach((v) => {
            const y = toY(v)
            ctx.strokeStyle =
                v === 0
                    ? 'rgba(255,255,255,0.18)'
                    : Math.abs(v) === 0.5
                      ? 'rgba(136,196,255,0.18)'
                      : 'rgba(255,255,255,0.06)'
            ctx.lineWidth = 1
            ctx.setLineDash(v === 0 || Math.abs(v) === 0.5 ? [4, 4] : [])
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(W, y)
            ctx.stroke()
        })
        ctx.setLineDash([])

        const grad = ctx.createLinearGradient(0, toY(maxV), 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.18)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')
        ctx.beginPath()
        series.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        series.forEach((v, i) => (i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v))))
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 1.5
        ctx.stroke()
    }, [series, yDomain, lineColor])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

function formatSigned(value: number | null | undefined, digits = 2) {
    if (value == null || !Number.isFinite(value)) return '—'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(digits)}`
}

export default function RiskTensionMonitoring() {
    const [payload, setPayload] = useState<GriPayload | null>(null)
    const [activeTab, setActiveTab] = useState<TabId>('geopolitical_risk_score')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load(attempt = 1) {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/geopolitical-risk-index?lookback_days=730')
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    const detail =
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || 'Failed to load geopolitical risk index'
                    // Backend cold-builds GPRI (~1 min). Retry a few times on gateway timeouts.
                    if ((res.status === 504 || res.status === 503) && attempt < 4) {
                        if (!cancelled) {
                            setError(`Model warming up… retry ${attempt}/3`)
                        }
                        await new Promise((r) => setTimeout(r, 4000 * attempt))
                        if (!cancelled) return load(attempt + 1)
                        return
                    }
                    throw new Error(detail)
                }
                const data = body as GriPayload
                if (cancelled) return
                setPayload(data)
                if (data.tabs?.[0]?.id) setActiveTab(data.tabs[0].id)
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    const tabs = payload?.tabs ?? []
    const tab = tabs.find((t) => t.id === activeTab) ?? tabs[0]
    const values = useMemo(() => (tab?.series || []).map((p) => p.v), [tab])
    const latest = tab?.latest
    const change = latest?.change_1d
    const changeColor =
        change == null ? 'text-[#838388]' : change >= 0 ? 'text-[#5CEB8A]' : 'text-[#E25C3F]'

    const lookbackLabel = useMemo(() => {
        const days = payload?.tabs?.[0]?.series?.length
            ? Math.round(
                  (new Date(payload.tabs[0].series[payload.tabs[0].series.length - 1].t).getTime() -
                      new Date(payload.tabs[0].series[0].t).getTime()) /
                      (1000 * 60 * 60 * 24)
              )
            : 730
        if (days >= 1000) return '3Y'
        if (days >= 600) return '2Y'
        if (days >= 300) return '1Y'
        return `${days}d`
    }, [payload])

    const xLabels = useMemo(() => {
        const series = tab?.series || []
        if (series.length < 2) return []
        const idxs = [0, Math.floor((series.length - 1) / 2), series.length - 1]
        const spanDays =
            (new Date(series[series.length - 1].t).getTime() - new Date(series[0].t).getTime()) /
            (1000 * 60 * 60 * 24)
        return idxs.map((i) => {
            const d = new Date(series[i].t)
            // Longer windows: month + year reads cleaner than day-of-month.
            if (spanDays > 400) {
                return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            }
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        })
    }, [tab])

    return (
        <div className="px-4 lg:px-6 mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-4">Risk Tension Monitoring</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_524px] gap-3 sm:gap-4">
                <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col h-[360px] sm:h-[380px]">
                    <div className="flex sm:flex-row flex-col items-start justify-between gap-3 shrink-0">
                        <div>
                            <p className="text-white text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-medium">
                                Geopolitical Risk Index • {lookbackLabel}
                            </p>
                            <p className="text-[#838388] text-[12px] sm:text-[14px] leading-[17px] font-normal mt-2">
                                Global baseline methodology • mean-reverting risk premium
                            </p>
                        </div>
                        <div className="text-right flex sm:flex-col flex-row items-center sm:items-end gap-3 sm:gap-0">
                            <p className="text-white text-[18px] sm:text-[22px] leading-6 sm:leading-[31px] font-semibold mb-1">
                                {latest?.v != null ? latest.v.toFixed(2) : loading ? '…' : '—'}
                            </p>
                            <p className={`${changeColor} text-[14px] leading-[17px] font-normal`}>
                                {formatSigned(change)} Today
                            </p>
                        </div>
                    </div>

                    {tabs.length > 0 && (
                        <div className="flex items-center gap-1 mt-4 overflow-x-auto shrink-0">
                            {tabs.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setActiveTab(t.id)}
                                    className={`px-3 py-1 text-[12px] sm:text-[13px] leading-5 whitespace-nowrap transition-colors cursor-pointer ${
                                        activeTab === t.id
                                            ? 'text-white bg-[#FFFFFF0D] font-semibold'
                                            : 'text-[#838388] font-normal hover:text-white/70'
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex-1 mt-4 min-h-0 flex flex-col">
                        {loading && (
                            <div className="flex items-center justify-center flex-1 text-[#838388] text-sm">
                                Loading GRI…
                            </div>
                        )}
                        {!loading && error && (
                            <div className="flex items-center justify-center flex-1 text-[#E25C3F] text-sm px-4 text-center">
                                {error}
                            </div>
                        )}
                        {!loading && !error && values.length >= 2 && (
                            <div className="flex flex-col h-full min-h-0">
                                <div className="flex gap-2 flex-1 min-h-0">
                                    <div
                                        className="flex flex-col justify-between text-right flex-shrink-0 pb-5"
                                        style={{ width: 28 }}
                                    >
                                        {['+1', '+0.5', '0', '−0.5', '−1'].map((l) => (
                                            <span key={l} className="text-[#838388] text-[9px] leading-[11px]">
                                                {l}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex-1 flex flex-col min-w-0 min-h-0">
                                        <div className="flex-1 min-h-[160px]">
                                            <OscillatorChart
                                                series={values}
                                                yDomain={tab?.y_domain ?? [-1, 1]}
                                                lineColor={
                                                    activeTab === 'reversal_risk_momentum'
                                                        ? '#FF9F43'
                                                        : '#88C4FF'
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-between mt-1 shrink-0">
                                            {xLabels.map((l) => (
                                                <span key={l} className="text-[#838388] text-[9px] leading-[11px]">
                                                    {l}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Always reserve footer height so tabs don't jump */}
                                <p
                                    className={`text-[#838388] text-[11px] sm:text-[12px] leading-4 mt-3 h-8 overflow-hidden shrink-0 ${
                                        activeTab === 'reversal_risk_momentum' && latest?.state
                                            ? 'visible'
                                            : 'invisible'
                                    }`}
                                >
                                    {latest?.state || '—'}
                                </p>
                            </div>
                        )}
                        {!loading && !error && values.length < 2 && (
                            <div className="flex items-center justify-center flex-1 text-[#838388] text-sm">
                                No series available
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#16161F] p-4 flex flex-col h-[360px] sm:h-[380px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.66797 11.6667C1.66797 8.524 1.66797 6.95262 2.64428 5.97631C3.62059 5 5.19194 5 8.33464 5H11.668C14.8106 5 16.3821 5 17.3583 5.97631C18.3346 6.95262 18.3346 8.524 18.3346 11.6667C18.3346 14.8093 18.3346 16.3808 17.3583 17.357C16.3821 18.3333 14.8106 18.3333 11.668 18.3333H8.33464C5.19194 18.3333 3.62059 18.3333 2.64428 17.357C1.66797 16.3808 1.66797 14.8093 1.66797 11.6667Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M7.5 2.50033L10 5.00033L13.3333 1.66699"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-white text-[16px] leading-[19px] font-semibold">Bloomberg TV</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-[#E25C3F] rounded-full animate-pulse" />
                            <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">Live</span>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#FFFFFF08] overflow-hidden min-h-0" />
                </div>
            </div>
        </div>
    )
}
