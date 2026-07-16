const ALERTS = [
    { time: '8m ago',  severity: 'EXTREME', severityColor: 'bg-[#E25C3F]',  title: 'Fed cuts rates at March FOMC meeting',               change: '+6.4pp', positive: true  },
    { time: '16m ago', severity: 'EXTREME', severityColor: 'bg-[#E25C3F]',  title: 'Ceasefire agreement reached in Eastern Europe by Q2',  change: '-5.1pp', positive: false },
    { time: '35m ago', severity: 'HIGH',    severityColor: 'bg-[#E8A020]',  title: 'US CPI prints above 3.5% year-over-year',             change: '+5.2pp', positive: true  },
    { time: '52m ago', severity: 'HIGH',    severityColor: 'bg-[#E8A020]',  title: 'OPEC+ announces additional production cut',           change: '+4.2pp', positive: true  },
    { time: '76m ago', severity: 'NOTABLE', severityColor: 'bg-[#838388]',  title: 'Government shutdown avoided before deadline',         change: '+6.7pp', positive: true  },
]

export default function LatestAlerts() {
    return (
        <div className="bg-[#16161F] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#FFFFFF08]">
                <span className="text-white text-[16px] leading-[20px] font-semibold">Latest Alerts</span>
                <button className="text-[#88C4FF] text-[12px] leading-[14px] hover:underline cursor-pointer">All Alerts →</button>
            </div>

            {/* Alert rows */}
            <div className="flex flex-col">
                {ALERTS.map((alert, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 border-b border-[#FFFFFF08] last:border-0 hover:bg-[#FFFFFF03] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="text-[#838388] text-[12px] leading-[17px] w-16 flex-shrink-0">{alert.time}</span>
                            <span className={`${alert.severityColor} text-white text-[11px] leading-[14px] font-medium px-2 py-0.5 flex-shrink-0`}>
                                {alert.severity}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 flex-1 min-w-0 pl-[72px] sm:pl-0">
                            <span className="text-white text-[14px] leading-[20px] flex-1 min-w-0">{alert.title}</span>
                            <span className={`text-[14px] leading-[20px] font-semibold flex-shrink-0 ${alert.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                {alert.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
