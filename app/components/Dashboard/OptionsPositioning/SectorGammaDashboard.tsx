const SECTORS = [
    {
        ticker: 'XLK',
        name: 'Tech',
        value: '+$4.2B',
        label: 'Longo Gamma',
        positive: true,
    },
    {
        ticker: 'SMH',
        name: 'Semis',
        value: '+$-1.1B',
        label: 'Short Gamma',
        positive: false,
    },
    {
        ticker: 'XLF',
        name: 'Financials',
        value: '+$2.8B',
        label: 'Longo Gamma',
        positive: true,
    },
    {
        ticker: 'XLE',
        name: 'Energy',
        value: '+$0.3B',
        label: 'Neutral',
        positive: true,
    },
    {
        ticker: 'IWM',
        name: 'Small Cap',
        value: '+$-1.7B',
        label: 'Short Gamma',
        positive: false,
    },
    {
        ticker: 'QQQ',
        name: 'Nasdaq ETF',
        value: '+$1.2B',
        label: 'Transitioning',
        positive: true,
    },
]

const NARRATIVE =
    'Cross-asset composite: 2 of 3 major indices in positive gamma — structural floor active. NQs transition regime is the key risk vector today. If NQ breaks negative gamma, expect breadth deterioration in tech leadership and contagion into SPX\'s positive gamma regime. OPEX in 6 days — gamma rolloff begins accelerating. Reduce premium selling exposure by Thursday close.'

const NARRATIVE_TAGS = ['Fragile Rally Pattern', 'Nq Transition Key Risk', 'Open In 6D Watch']

export default function SectorGammaDashboard() {
    return (
        <div className="mb-4 sm:mb-5 bg-[#16161F] p-3 sm:p-5 grow h-full">
            {/* Section heading */}
            <h2 className="text-white text-[18px] leading-[22px] font-medium mb-2">Sector Gamma Dashboard</h2>
            <p className="text-[#838388] text-[14px] leading-[17px] mb-3 sm:mb-4">Dealer concentration map net GEX in $B</p>

            {/* Sector grid */}
            <div className="mb-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {SECTORS.map((sector) => (
                        <div key={sector.ticker} className="text-center bg-[#FFFFFF08] p-3 sm:p-4 flex flex-col gap-3 sm:gap-5">
                            <div>
                                <p className="text-white text-[16px] leading-[19px] font-semibold mb-1">{sector.ticker}</p>
                                <p className="text-white/60 text-[12px] leading-[14px] font-normal">{sector.name}</p>
                            </div>

                            <div>
                                <p className={`text-[16px] sm:text-[18px] leading-[22px] font-bold mb-1 ${sector.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                    {sector.value}
                                </p>
                                <p className={`text-[12px] leading-[14px] font-medium ${sector.positive ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                    {sector.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Composite Narrative */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-3">Composite Narrative</h3>
            <p className="text-white/50 text-[12px] sm:text-[14px] leading-4 sm:leading-[20px] mb-3 sm:mb-5">{NARRATIVE}</p>
            <div className="flex flex-wrap gap-2.5">
                {NARRATIVE_TAGS.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 h-[27px] rounded-full flex items-center justify-between border border-[#FFFFFF1A] text-white/60 text-[12px] leading-[17px] font-normal hover:text-white hover:border-[#FFFFFF30] transition-colors cursor-pointer"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
