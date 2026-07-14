const RISKS = [
    {
        num: '1',
        title: 'Middle East Regional war',
        desc: 'Regional Conflict escalates, threatening energy infrastructure and increasing volatility',
        likelihood: 'High',
        likelihoodColor: 'text-[#E25C3F]',
        impact: 'Severe',
        impactColor: 'text-[#E25C3F]',
    },
    {
        num: '2',
        title: 'Energy Security Crisis',
        desc: 'Disruptions to global energy markets negatively impact the global macro landscape',
        likelihood: 'High',
        likelihoodColor: 'text-[#E25C3F]',
        impact: 'Severe',
        impactColor: 'text-[#E25C3F]',
    },
    {
        num: '3',
        title: 'Global Recession',
        desc: 'Tighter financial conditions and weak demand could trigger a global downturn',
        likelihood: 'Medium',
        likelihoodColor: 'text-[#F67416]',
        impact: 'High',
        impactColor: 'text-[#C97804]',
    },
]

export default function TopRisks() {
    return (
        <div className="px-4 lg:px-6 mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-2">Top 3 Risks by likelihood</h2>
            <p className="text-[#838388] text-[16px] leading-[21px] font-normal mb-4">
                We see the geopolitical environment shaped by the conflict in Iran, which has affected almost every major country and region. Its impact on global energy markets, Western interests and geopolitical relationships across the Gulf and beyond underscores the conflict&apos;s still-unfolding implications for the geopolitical risk landscape.
            </p>

            <div className="bg-[#16161F] pb-1">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_200px_200px_32px] gap-4 px-5 py-4 border-b border-[#FFFFFF0F]">
                    <span className="text-white text-[14px] leading-[14px] font-medium">Risk</span>
                    <span className="text-white text-[14px] leading-[14px] font-medium">Likelihood</span>
                    <span className="text-white text-[14px] leading-[14px] font-medium">Impact</span>
                    <span />
                </div>

                {/* Rows */}
                {RISKS.map((risk, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[1fr_200px_200px_32px] gap-4 px-5 py-4 border-b border-[#FFFFFF0F] last:border-0 hover:bg-[#FFFFFF04] transition-colors cursor-pointer items-center"
                    >
                        <div>
                            <p className="text-white text-[14px] leading-[17px] font-semibold mb-2">
                                {risk.num} {risk.title}
                            </p>
                            <p className="text-[#838388] text-[12px] leading-[16px]">{risk.desc}</p>
                        </div>
                        <span className={`text-[14px] leading-[17px] font-medium ${risk.likelihoodColor}`}>
                            {risk.likelihood}
                        </span>
                        <span className={`text-[14px] leading-[17px] font-medium ${risk.impactColor}`}>
                            {risk.impact}
                        </span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    )
}
