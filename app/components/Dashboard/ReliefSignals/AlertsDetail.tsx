'use client'

import { useMemo, useState } from 'react'
import { useBeliefMarkets } from './beliefMarkets'

const FILTER_TABS = ['All', 'Extreme', 'High', 'Notable'] as const

export default function AlertsDetail() {
    const { data, loading, error } = useBeliefMarkets()
    const [activeTab, setActiveTab] = useState<(typeof FILTER_TABS)[number]>('All')
    const alerts = data?.alerts || []

    const filtered = useMemo(() => {
        if (activeTab === 'All') return alerts
        return alerts.filter((a) => a.severity === activeTab.toUpperCase())
    }, [alerts, activeTab])

    return (
        <div className="bg-[#16161F] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] gap-2">
                <h3 className="text-white text-[16px] leading-[20px] font-semibold">Alerts</h3>
                <div className="flex items-center sm:gap-1 flex-wrap">
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-2 sm:px-3 py-1.5 text-[12px] leading-[15px] font-medium transition-colors cursor-pointer ${
                                activeTab === tab ? 'bg-[#FFFFFF14] text-white' : 'text-[#838388] hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {loading && <p className="px-4 py-6 text-[#838388] text-[12px]">Loading alert detail…</p>}
            {error && !loading && <p className="px-4 py-6 text-[#E25C3F] text-[12px]">{error}</p>}
            {!loading && !error && filtered.length === 0 && (
                <p className="px-4 py-6 text-[#838388] text-[12px]">No alerts in this bucket yet.</p>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="flex flex-col">
                    {filtered.map((alert, i) => (
                        <div key={`${alert.title}-${i}`} className="p-3 sm:px-4 sm:py-4 border-b border-[#FFFFFF08] last:border-0">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                                    <span
                                        className={`${alert.severityColor} text-white w-[68px] text-center text-[12px] leading-[14px] font-medium px-2 py-0.5 flex-shrink-0`}
                                    >
                                        {alert.severity}
                                    </span>
                                    <span className="text-white text-[14px] leading-[19px] font-semibold">
                                        {alert.title}
                                    </span>
                                    <span className="text-[#838388] text-[14px] leading-[17px] flex-shrink-0">
                                        {alert.time}
                                    </span>
                                </div>
                                <span className={`text-[12px] leading-[17px] font-semibold flex-shrink-0 ${alert.statusColor}`}>
                                    {alert.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
                                <span className="text-[#838388] text-[12px] leading-[15px] pr-2">
                                    PREV → NOW{' '}
                                    <span className="text-white font-medium pl-0.5">
                                        {alert.prev} → {alert.now}
                                    </span>
                                </span>
                                <span className="text-[#838388] text-[12px] leading-[15px]">
                                    CHANGE{' '}
                                    <span
                                        className={`font-medium pl-0.5 ${
                                            alert.change.startsWith('+')
                                                ? 'text-[#2CB37B]'
                                                : alert.change.startsWith('-')
                                                  ? 'text-[#E25C3F]'
                                                  : 'text-white'
                                        }`}
                                    >
                                        {alert.change}
                                    </span>
                                </span>
                                <span className="text-[#838388] text-[12px] leading-[15px]">
                                    REL <span className="text-white font-medium pl-0.5">{alert.relative}</span>
                                </span>
                                <span className="text-[#838388] text-[12px] leading-[15px]">
                                    WIN <span className="text-white font-medium pl-0.5">{alert.window}</span>
                                </span>
                                <span className="text-[#838388] text-[12px] leading-[15px]">
                                    Z <span className="text-white font-medium pl-0.5">{alert.z}</span>
                                </span>
                                <span className="text-[#838388] text-[12px] leading-[15px]">
                                    SIG <span className="text-white font-medium pl-0.5">{alert.signal}</span>
                                </span>
                            </div>

                            <p className="text-[#838388] text-[12px] leading-[18px]">{alert.desc}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
