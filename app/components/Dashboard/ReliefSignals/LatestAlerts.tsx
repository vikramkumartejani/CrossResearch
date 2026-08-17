'use client'

import ChartLoader from '../shared/ChartLoader'
import { useBeliefMarkets } from './beliefMarkets'

export default function LatestAlerts() {
    const { data, loading, error } = useBeliefMarkets()
    const alerts = data?.latest_alerts || []

    return (
        <div className="bg-[#16161F] flex flex-col">
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08]">
                <span className="text-white text-[16px] leading-[20px] font-semibold">Latest Alerts</span>
                <span className="text-[#88C4FF] text-[12px] leading-[14px]">
                    {data?.stats?.alerts != null ? `${data.stats.alerts} total` : 'Live'}
                </span>
            </div>

            {loading && <ChartLoader className="min-h-[180px]" />}
            {error && !loading && <p className="px-4 py-6 text-[#E25C3F] text-[12px]">{error}</p>}
            {!loading && !error && alerts.length === 0 && (
                <p className="px-4 py-6 text-[#838388] text-[12px]">
                    No threshold crossings yet. Alerts appear when probabilities jump sharply.
                </p>
            )}

            {!loading && !error && alerts.length > 0 && (
                <div className="flex flex-col">
                    {alerts.map((alert, i) => (
                        <div
                            key={`${alert.title}-${i}`}
                            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 border-b border-[#FFFFFF08] last:border-0 hover:bg-[#FFFFFF03] transition-colors"
                        >
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-[#838388] text-[12px] leading-[17px] w-16 flex-shrink-0">
                                    {alert.time}
                                </span>
                                <span
                                    className={`${alert.severityColor} text-white w-[68px] text-center text-[11px] leading-[14px] font-medium px-2 py-0.5 flex-shrink-0`}
                                >
                                    {alert.severity}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2 flex-1 min-w-0 pl-[72px] sm:pl-0">
                                <span className="text-white text-[14px] leading-[20px] flex-1 min-w-0">
                                    {alert.title}
                                </span>
                                <span
                                    className={`text-[14px] leading-[20px] font-semibold flex-shrink-0 ${
                                        alert.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'
                                    }`}
                                >
                                    {alert.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
