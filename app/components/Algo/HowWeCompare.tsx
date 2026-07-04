const ROWS = [
    {
        feature: 'Proprietary TradingView algorithms',
        crossResearch: { text: '50+ indicators', type: 'check' },
        generic: { text: 'Limited', type: 'partial' },
        raw: { text: '—', type: 'dash' },
    },
    {
        feature: 'Live macro research dashboard',
        crossResearch: { text: 'Full suite', type: 'check' },
        generic: { text: 'x', type: 'cross' },
        raw: { text: 'x', type: 'cross' },
    },
    {
        feature: 'Pre-release economic models (NFP, CPI)',
        crossResearch: { text: 'Proprietary', type: 'check' },
        generic: { text: 'x', type: 'cross' },
        raw: { text: 'x', type: 'cross' },
    },
    {
        feature: 'Cross-asset correlation matrix',
        crossResearch: { text: 'Real-time', type: 'check' },
        generic: { text: 'x', type: 'cross' },
        raw: { text: 'Manual', type: 'partial' },
    },
    {
        feature: 'Market structure auto-mapping',
        crossResearch: { text: 'BOS · CHoCH · FVG', type: 'check' },
        generic: { text: 'Basic', type: 'partial' },
        raw: { text: 'x', type: 'cross' },
    },
    {
        feature: 'Webhook & alert automation',
        crossResearch: { text: 'Full support', type: 'check' },
        generic: { text: 'Varies', type: 'partial' },
        raw: { text: '✓', type: 'check' },
    },
    {
        feature: 'Weekly macro research brief',
        crossResearch: { text: 'Every Sunday', type: 'check' },
        generic: { text: 'x', type: 'cross' },
        raw: { text: 'x', type: 'cross' },
    },
]

function CellValue({ text, type }: { text: string; type: string }) {
    if (type === 'check') {
        return (
            <span className="flex items-center gap-1.5 text-white text-[14px] lg:text-[16px] leading-5 sm:leading-[26px] font-semibold">
                {text !== '✓' ? (
                    <img src="/assets/arrow.svg" alt="" className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" aria-hidden="true" />
                ) : (
                    <img src="/assets/arrow.svg" alt="" className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" aria-hidden="true" />
                )}
                {text !== '✓' ? text : ''}
            </span>
        )
    }
    if (type === 'partial') {
        return (
            <span className="text-white text-[16px] leading-[26px] font-semibold flex items-center gap-1">
                <img src='/assets/tilde.svg' alt="tilde" width={12} height={12} /> {text}
            </span>
        )
    }
    if (type === 'dash') {
        return <span>
            <svg width="13" height="2" viewBox="0 0 13 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.000179768 1.60002V1.90735e-05H12.0482V1.60002H0.000179768Z" fill="white" fillOpacity="0.6" />
            </svg>
        </span>
    }
    // cross
    return <span>
        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.799594 11.776L0.639594 11.616L0.543594 11.712C0.372927 11.5413 0.287594 11.4027 0.287594 11.296C0.287594 11.2107 0.244927 11.168 0.159594 11.168L-0.000406206 10.944L0.223594 10.56V10.512L0.239594 10.448C0.239594 10.3733 0.223594 10.336 0.191594 10.336C0.116927 10.336 0.0529271 10.272 -0.000406206 10.144C0.0635938 10.016 0.164927 9.83466 0.303594 9.59999C0.452927 9.36533 0.612927 9.10933 0.783594 8.83199C0.95426 8.55466 1.11959 8.29333 1.27959 8.04799C1.43959 7.80266 1.56759 7.61599 1.66359 7.48799L2.25559 6.68799C2.70359 6.06933 3.18893 5.46133 3.71159 4.86399L3.45559 4.28799L3.26359 3.80799C3.12493 3.45599 2.99693 3.13599 2.87959 2.84799C2.76226 2.55999 2.66626 2.30399 2.59159 2.07999C2.44226 1.61066 2.36759 1.34933 2.36759 1.29599C2.38893 1.17866 2.41026 1.07732 2.43159 0.991992C2.46359 0.906658 2.48493 0.842658 2.49559 0.799992H2.71959C2.75159 0.714658 2.77826 0.671991 2.79959 0.671991C2.83159 0.682659 2.87426 0.714659 2.92759 0.767992C2.99159 0.810659 3.02893 0.831992 3.03959 0.831992L3.23159 0.639992L3.35959 0.799992L3.42359 0.415992C3.55159 0.415992 3.62626 0.437325 3.64759 0.479992C3.65826 0.522659 3.70093 0.549325 3.77559 0.559992L3.83959 0.575992H3.87159L4.54359 1.95199L5.15159 3.13599C5.43959 2.77333 5.70093 2.45333 5.93559 2.17599C6.17026 1.88799 6.38359 1.64266 6.57559 1.43999C6.77826 1.22666 6.97559 1.00799 7.16759 0.783992C7.37026 0.549325 7.58359 0.298658 7.80759 0.031992L7.90359 0.223991L7.98359 0.159991L8.11159 0.0959921C8.13293 0.106659 8.14359 0.143992 8.14359 0.207992C8.14359 0.271991 8.17026 0.319991 8.22359 0.351992L8.28759 0.383992C8.35159 0.383992 8.45293 0.319992 8.59159 0.191992C8.74093 0.0639915 8.82093 -8.58307e-06 8.83159 -8.58307e-06C8.85293 -8.58307e-06 8.86359 0.0106583 8.86359 0.031992C8.87426 0.0639915 8.87959 0.0959915 8.87959 0.127992C8.87959 0.159992 8.87959 0.191992 8.87959 0.223991C8.87959 0.298658 8.90093 0.362659 8.94359 0.415992C8.97559 0.458659 8.99159 0.517325 8.99159 0.591991C8.99159 0.773325 8.93293 0.938658 8.81559 1.08799C8.68759 1.24799 7.93559 2.23999 6.55959 4.06399L5.98359 4.83199L6.39959 5.69599C6.70893 6.32533 6.94359 6.82666 7.10359 7.19999C7.27426 7.56266 7.38093 7.79733 7.42359 7.90399L7.53559 8.19199C7.69559 8.60799 7.77559 8.84266 7.77559 8.89599C7.77559 8.93866 7.75426 8.97599 7.71159 9.00799C7.66893 9.02933 7.62093 9.03999 7.56759 9.03999L7.51959 9.02399H7.48759C7.44493 9.02399 7.39159 9.06666 7.32759 9.15199L7.26359 9.50399L7.03959 9.43999L7.02359 9.48799L6.97559 9.72799C6.80493 9.71733 6.67159 9.68533 6.57559 9.63199C6.49026 9.57866 6.34093 9.42399 6.12759 9.16799C6.02093 9.03999 5.88759 8.85333 5.72759 8.60799C5.57826 8.35199 5.39693 8.04266 5.18359 7.67999L4.60759 6.68799L3.80759 7.83999C3.41293 8.41599 3.04493 8.97599 2.70359 9.51999C2.36226 10.064 2.06893 10.56 1.82359 11.008C1.57826 11.4667 1.32226 11.712 1.05559 11.744L0.863594 11.648L0.799594 11.776Z" fill="white" />
        </svg>
    </span>
}

function TagDot() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    )
}

export default function HowWeCompare() {
    return (
        <div className="px-4 sm:px-6 py-16 lg:py-20 xl:py-[170px]">
            <div className="max-w-[1560px] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 lg:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <TagDot />
                        How We Compare
                    </div>
                    <h2 className="font-normal text-[30px] sm:text-[40px] lg:text-[54px] leading-tight lg:leading-[64px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent max-w-[800px]">
                        CrossResearch provides deeper insight than generic indicators
                    </h2>
                    <p className="text-white/60 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[32px] font-normal font-inter max-w-[612px]">
                        Most indicator suites give you signals. We give you signals plus the macro context to understand them.
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto compare-table-scroll">
                <div className="compare-table-wrapper pb-[15px] bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[30px] sm:rounded-[40px] overflow-hidden" style={{ minWidth: '940px' }}>

                    {/* Table header */}
                    <div className="compare-table-grid grid bg-[#FFFFFF08] border-b border-[#FFFFFF1A] mb-5 font-inter" style={{ gridTemplateColumns: '300px 240px 180px 190px' }}>
                        <div className="px-6 sm:px-8 py-5 sm:py-6">
                            <span className="text-white/60 text-[18px] sm:text-[20px] leading-6 sm:leading-8 font-normal">Feature</span>
                        </div>
                        <div className="px-8 py-5 sm:py-6">
                            <span className="text-white/60 text-[18px] sm:text-[20px] leading-6 sm:leading-8 font-normal">CrossResearch</span>
                        </div>
                        <div className="px-8 py-5 sm:py-6">
                            <span className="text-white/60 text-[18px] sm:text-[20px] leading-6 sm:leading-8 font-normal whitespace-nowrap">Generic Suites</span>
                        </div>
                        <div className="px-8 py-5 sm:py-6 flex items-center justify-center">
                            <span className="text-white/60 text-[18px] sm:text-[20px] leading-6 sm:leading-8 font-normal whitespace-nowrap">Raw TradingView</span>
                        </div>
                    </div>

                    {/* Rows */}
                    {ROWS.map((row, i) => (
                        <div key={i} className="compare-table-grid hover:bg-[#FFFFFF08] grid" style={{ gridTemplateColumns: '300px 240px 180px 190px' }}>
                            <div className="flex items-center px-6 sm:px-8 py-3">
                                <span className="text-white text-[16px] font-semibold leading-[26px]">{row.feature}</span>
                            </div>
                            <div className="px-8 py-3">
                                <div className="flex items-center bg-[#FFFFFF08] py-3 px-4 lg:pl-[34.5px] max-w-[244px] whitespace-nowrap">
                                    <CellValue text={row.crossResearch.text} type={row.crossResearch.type} />
                                </div>
                            </div>
                            <div className="flex items-center px-8 py-3 whitespace-nowrap">
                                <CellValue text={row.generic.text} type={row.generic.type} />
                            </div>
                            <div className="flex items-center justify-center px-8 py-3 whitespace-nowrap">
                                <CellValue text={row.raw.text} type={row.raw.type} />
                            </div>
                        </div>
                    ))}
                </div>
                </div>

            </div>
        </div>
    )
}
