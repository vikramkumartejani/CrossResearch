type StrengthLevel = 'Strong' | 'Moderate' | 'Weak'

interface TrendRow {
    period: string
    value: string
    change: string
    positive: boolean
    strength: StrengthLevel
}

const STRENGTH_COLOR: Record<StrengthLevel, string> = {
    Strong: '#4CAF7D',
    Moderate: '#F5A623',
    Weak: '#FF6B6B',
}

function TrendTable({
    title,
    subtitle,
    colHeader,
    rows,
}: {
    title: string
    subtitle?: string
    colHeader: string
    rows: TrendRow[]
}) {
    return (
        <div className="bg-[#16161F] border border-[#FFFFFF08] flex flex-col">
            <div className="bg-[#FFFFFF0D] px-4 py-2.5">
                <h4 className="text-white text-[16px] leading-[19px] font-medium">{title}</h4>
            </div>
            <div className="w-full overflow-x-auto px-4 pt-4 pb-2">
                <table className="w-full border-collapse">
                    <thead className="">
                        <tr className="">
                            <th className="pb-1.5 text-left text-[14px] leading-[16.87px] text-white/60 font-normal">{colHeader}</th>
                            <th className="pb-1.5 text-right text-[14px] leading-[16.87px] text-white/60 font-normal">Change</th>
                            <th className="pb-1.5 text-right text-[14px] leading-[16.87px] text-white/60 font-normal">Strength</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {rows.map((row, i) => (
                            <tr key={row.period} className="">
                                <td className="text-white py-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] leading-[16.87px] font-semibold w-8">{row.period}</span>
                                        <span className={`text-[14px] leading-[16.87px] font-normal ${row.positive ? 'text-[#4CAF7D]' : 'text-[#FF6B6B]'}`}>{row.value}</span>
                                    </div>
                                </td>
                                <td
                                    className={`text-right text-[14px] leading-[16.87px] font-normal ${row.positive ? 'text-[#4CAF7D]' : 'text-[#FF6B6B]'
                                        }`}
                                >
                                    {row.change}
                                </td>
                                <td className="text-right">
                                    <span
                                        className="flex items-center justify-end gap-1 text-[14px] leading-[16.87px] font-normal"
                                        style={{ color: STRENGTH_COLOR[row.strength] }}
                                    >
                                        <span className="text-[8px]">●</span>
                                        {row.strength}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TrendReversalCard() {
    return (
        <div className="bg-[#16161F] border border-[#FFFFFF08] flex flex-col justify-between">
            <div className="bg-[#FFFFFF0D] px-4 py-2.5">
                <h4 className="text-white text-[16px] font-medium leading-[19px]">
                    Trend Reversal Probability (Next)
                </h4>
            </div>
            <div className="flex-1 flex flex-col items-start justify-end p-4">
                <span className="text-white text-[28px] font-semibold leading-[34px] mt-auto">
                    1.17521
                </span>
                <p className="text-white/60 text-[12px] mt-3 leading-[14px]">
                    Medium probability of trend reversal in coming sessions
                </p>
            </div>
        </div>
    )
}

export default function TrendOverview() {
    const majorTrendRows: TrendRow[] = [
        { period: 'D', value: '1.1608', change: '+2.31%', positive: true, strength: 'Strong' },
        { period: 'W', value: '1.1678', change: '+1.56%', positive: true, strength: 'Moderate' },
        { period: 'M', value: '1.1587', change: '-0.43%', positive: false, strength: 'Weak' },
    ]

    const shortTermRows: TrendRow[] = [
        { period: 'D', value: '1.1822', change: '+1.13%', positive: true, strength: 'Moderate' },
        { period: 'W', value: '1.1599', change: '+0.12%', positive: true, strength: 'Strong' },
        { period: 'M', value: '1.1563', change: '-0.1%', positive: false, strength: 'Moderate' },
    ]

    return (
        <div>
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-4">Trend Overview</h3>
            <div className="grid grid-cols-3 gap-4">
                <TrendTable
                    title="Major Trend"
                    colHeader="Major Trend"
                    rows={majorTrendRows}
                />
                <TrendTable
                    title="Major Trend"
                    subtitle="Short-term Direction"
                    colHeader="Short-term Direction"
                    rows={shortTermRows}
                />
                <TrendReversalCard />
            </div>
        </div>
    )
}
