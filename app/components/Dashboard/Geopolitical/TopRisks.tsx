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
        <div className="px-4 lg:px-6 mb-4 sm:mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-2">Top 3 Risks by likelihood</h2>
            <p className="text-[#838388] text-[12px] sm:text-[16px] leading-[16px] sm:leading-[21px] font-normal mb-3 sm:mb-4">
                We see the geopolitical environment shaped by the conflict in Iran, which has affected almost every major country and region. Its impact on global energy markets, Western interests and geopolitical relationships across the Gulf and beyond underscores the conflict&apos;s still-unfolding implications for the geopolitical risk landscape.
            </p>

            <div className="bg-[#16161F] pb-1">
                {/* Desktop table header — hidden on mobile */}
                <div className="hidden sm:grid grid-cols-[1fr_200px_200px_32px] gap-4 px-5 py-4 border-b border-[#FFFFFF0F]">
                    <span className="text-white text-[14px] leading-[14px] font-medium">Risk</span>
                    <span className="text-white text-[14px] leading-[14px] font-medium">Likelihood</span>
                    <span className="text-white text-[14px] leading-[14px] font-medium">Impact</span>
                    <span />
                </div>

                {RISKS.map((risk, i) => (
                    <div key={i} className="border-b border-[#FFFFFF0F] last:border-0 hover:bg-[#FFFFFF04] transition-colors cursor-pointer">
                        {/* Desktop row */}
                        <div className="hidden sm:grid grid-cols-[1fr_200px_200px_32px] gap-4 px-5 py-4 items-center">
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

                        {/* Mobile card */}
                        <div className="sm:hidden p-3">
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                                <p className="text-white text-[13px] leading-[17px] font-semibold">
                                    {risk.num} {risk.title}
                                </p>
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-[#838388] text-[12px] leading-[16px] mb-2.5">{risk.desc}</p>
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="text-[#838388] text-[11px] font-medium block">Likelihood</span>
                                    <span className={`text-[13px] leading-[17px] font-medium ${risk.likelihoodColor}`}>{risk.likelihood}</span>
                                </div>
                                <div>
                                    <span className="text-[#838388] text-[11px] font-medium block">Impact</span>
                                    <span className={`text-[13px] leading-[17px] font-medium ${risk.impactColor}`}>{risk.impact}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
