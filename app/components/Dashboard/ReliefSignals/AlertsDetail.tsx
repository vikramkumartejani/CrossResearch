'use client'
import { useState } from 'react'

const FILTER_TABS = ['All', 'Extreme', 'High', 'Notable']

const ALERTS = [
    {
        severity: 'EXTREME', severityColor: 'bg-[#E25C3F]',
        title: 'Fed cuts rates at March FOMC meeting', time: '11m ago',
        status: 'CONFIRMED', statusColor: 'text-[#2CB37B]',
        prev: '65.6%', now: '72.8%', change: '+6.4pp', relative: '+9.8%', window: '15m', z: '3.8', signal: '91',
        desc: 'Probability of a March rate cut surged 6.4pp in 15 minutes on a hotter-than-expected labor revision. Move cleared volume, velocity and z-score noise filters. Rate-sensitive assets (2Y yields, gold) confirmed direction within the hour.',
        crossAsset: 'GC=F +1.6%  ZN=F +0.8%',
    },
    {
        severity: 'EXTREME', severityColor: 'bg-[#E25C3F]',
        title: 'Ceasefire agreement reached in Eastern Europe by Q2', time: '19m ago',
        status: 'PARTIAL', statusColor: 'text-[#E8A020]',
        prev: '43.1%', now: '38.6%', change: '-5.1pp', relative: '-11.8%', window: '15m', z: '3.2', signal: '84',
        desc: 'Ceasefire odds dropped 5.1pp after negotiations stalled. Energy complex reacted with a modest bid; equity risk proxies softened but confirmation is only partial.',
        crossAsset: 'CL=F +1.4%',
    },
    {
        severity: 'HIGH', severityColor: 'bg-[#E8A020]',
        title: 'US CPI prints above 3.5% year-over-year', time: '38m ago',
        status: 'CONFIRMED', statusColor: 'text-[#2CB37B]',
        prev: '38.8%', now: '44.0%', change: '+5.2pp', relative: '+13.4%', window: '60m', z: '2.6', signal: '73',
        desc: 'Sustained one-hour drift toward a hot CPI print. Consistent with softening in rate-cut expectations elsewhere on the board.',
        crossAsset: null,
    },
    {
        severity: 'HIGH', severityColor: 'bg-[#E8A020]',
        title: 'OPEC+ announces additional production cut', time: '55m ago',
        status: 'CONFIRMED', statusColor: 'text-[#2CB37B]',
        prev: '56.8%', now: '61.0%', change: '+4.2pp', relative: '+7.4%', window: '15m', z: '2.4', signal: '71',
        desc: 'Production-cut odds jumped on wire reports of an emergency call. Crude futures confirmed with a sharp intraday bid.',
        crossAsset: null,
    },
    {
        severity: 'NOTABLE', severityColor: 'bg-[#838388]',
        title: 'Government shutdown avoided before deadline', time: '79m ago',
        status: 'PENDING', statusColor: 'text-[#838388]',
        prev: '59.3%', now: '66.0%', change: '+6.7pp', relative: '+11.3%', window: '60m', z: '2.3', signal: '68',
        desc: 'Shutdown-avoidance odds climbed after a bipartisan framework leaked. Cross-asset confirmation still pending.',
        crossAsset: null,
    },
]

export default function AlertsDetail() {
    const [activeTab, setActiveTab] = useState('All')

    const filtered = activeTab === 'All'
        ? ALERTS
        : ALERTS.filter(a => a.severity === activeTab.toUpperCase())

    return (
        <div className="bg-[#16161F] flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08] gap-2">
                <h3 className="text-white text-[16px] leading-[20px] font-semibold">Alerts</h3>
                <div className="flex items-center sm:gap-1 flex-wrap">
                    {FILTER_TABS.map(tab => (
                        <button
                            key={tab}
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

            {/* Alert cards */}
            <div className="flex flex-col">
                {filtered.map((alert, i) => (
                    <div key={i} className="p-3 sm:px-4 sm:py-4 border-b border-[#FFFFFF08] last:border-0">
                        {/* Title row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                                <span className={`${alert.severityColor} text-white w-[68px] text-center text-[12px] leading-[14px] font-medium px-2 py-0.5 flex-shrink-0`}>
                                    {alert.severity}
                                </span>
                                <span className="text-white text-[14px] leading-[19px] font-semibold">{alert.title}</span>
                                <span className="text-[#838388] text-[14px] leading-[17px] flex-shrink-0">{alert.time}</span>
                            </div>
                            <span className={`text-[12px] leading-[17px] font-semibold flex-shrink-0 ${alert.statusColor}`}>
                                {alert.status}
                            </span>
                        </div>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
                            <span className="text-[#838388] text-[12px] leading-[15px] pr-2">
                                PREV → NOW <span className="text-white font-medium pl-0.5">{alert.prev} → {alert.now}</span>
                            </span>
                            <span className="text-[#838388] text-[12px] leading-[15px]">
                                CHANGE <span className={`font-medium pl-0.5 ${alert.change.startsWith('+') ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>{alert.change}</span>
                            </span>
                            <span className="text-[#838388] text-[12px] leading-[15px]">
                                RELATIVE <span className={`font-medium pl-0.5 ${alert.relative.startsWith('+') ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>{alert.relative}</span>
                            </span>
                            <span className="text-[#838388] text-[12px] leading-[15px]">WINDOW <span className="pl-0.5 text-white font-medium">{alert.window}</span></span>
                            <span className="text-[#838388] text-[12px] leading-[15px]">Z <span className="text-white pl-0.5 font-medium">{alert.z}</span></span>
                            <span className="text-[#838388] text-[12px] leading-[15px]">SIGNAL <span className="text-white pl-0.5 font-medium">{alert.signal}</span></span>
                        </div>

                        {/* Description */}
                        <p className="text-[#838388] text-[14px] leading-[16px] mb-2">{alert.desc}</p>

                        {/* Cross asset */}
                        {alert.crossAsset && (
                            <p className="text-[#838388] text-[12px] leading-[17px]">
                                CROSS-ASSET 1H: <span className="pl-0.5 text-[#2CB37B] font-medium">{alert.crossAsset}</span>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
