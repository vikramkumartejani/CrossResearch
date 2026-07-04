import Image from 'next/image'

interface FeaturePoint {
    text: string
}

interface FeatureSection {
    id: string
    badge: string
    title: string
    subtitle: string
    description: string
    points: FeaturePoint[]
    ctaText: string
    image: string
    imageWidth: number
    imageHeight: number
    imageAlt: string
    imageLeft: boolean
}

const SECTIONS: FeatureSection[] = [
    {
        id: 'nfp',
        badge: 'Proprietary',
        title: 'NFP & Economic Release Predictor',
        subtitle: 'Pre-event intelligence with 90% directional accuracy',
        description: 'Quant models forecast macro events early, revealing likely surprise direction before release',
        points: [
            { text: 'Pre-NFP estimate model updated 48h before release' },
            { text: 'CPI surprise probability score (beat / in-line / miss)' },
            { text: 'Historical market reaction mapped per release type' },
        ],
        ctaText: 'Access Macro Models',
        image: '/assets/proprietary.png',
        imageWidth: 740,
        imageHeight: 460,
        imageAlt: 'NFP Economic Release Predictor Chart',
        imageLeft: false,
    },
    {
        id: 'divergence',
        badge: 'Indicator',
        title: 'Divergence & Exhaustion Scanner',
        subtitle: 'Catch reversals before the crowd',
        description: 'Scans divergences and exhaustion signals, identifying high probability reversal setups market wide',
        points: [
            { text: 'Momentum exhaustion heatmap' },
            { text: 'Regular & hidden divergence across 4 oscillators simultaneously' },
            { text: 'Multi-ticker scanner — scan watchlists in real time' },
        ],
        ctaText: 'Explore Indicator',
        image: '/assets/indicator.png',
        imageWidth: 659,
        imageHeight: 653,
        imageAlt: 'Divergence & Exhaustion Scanner',
        imageLeft: true,
    },
    {
        id: 'volatility',
        badge: 'Volatility Engine',
        title: 'Smart Positioning Powered with a Vol Forecast',
        subtitle: 'Forecasting weekly move expectations using IV, realised volatility and VRP.',
        description: '',
        points: [
            { text: 'Forecast IV: model estimates next 30D X asset implied volatility at 23.4%.' },
            { text: 'Expected weekly move: implied 1σ range is approximately ±3.24%.' },
            { text: 'Std & pivot areas: highlights projected volatility bands and key reaction zones for the week ahead.' },
        ],
        ctaText: 'Explore Indicator',
        image: '/assets/volatility-engine.png',
        imageWidth: 740,
        imageHeight: 460,
        imageAlt: 'Volatility Engine FX Valuation Power Score',
        imageLeft: false,
    },
    {
        id: 'market-structure',
        badge: 'Trading View',
        title: 'Market Structure & Liquidity Map',
        subtitle: 'See exactly where smart money is positioned',
        description: 'Automatically maps structure shifts and liquidity zones across timeframes, revealing precise reaction areas ahead',
        points: [
            { text: 'Auto-detection of BOS and CHoCH events' },
            { text: 'Liquidity sweep alerts with volume confirmation' },
            { text: 'Supply & demand zones with freshness rating' },
        ],
        ctaText: 'Explore Indicator',
        image: '/assets/trading-view.png',
        imageWidth: 740,
        imageHeight: 460,
        imageAlt: 'Market Structure & Liquidity Map',
        imageLeft: true,
    },
]

function CheckIcon() {
    return (
        <svg className='min-w-5 h-5 xl:w-[28px] xl:h-[28px]' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.625 14C2.625 7.7175 7.7175 2.625 14 2.625C20.2825 2.625 25.375 7.7175 25.375 14C25.375 20.2825 20.2825 25.375 14 25.375C7.7175 25.375 2.625 20.2825 2.625 14ZM18.2117 11.8837C18.2817 11.7904 18.3323 11.6841 18.3606 11.5709C18.389 11.4578 18.3944 11.3402 18.3766 11.2249C18.3588 11.1097 18.3181 10.9991 18.257 10.8998C18.1959 10.8005 18.1155 10.7144 18.0206 10.6466C17.9258 10.5788 17.8183 10.5306 17.7045 10.5049C17.5908 10.4793 17.473 10.4766 17.3582 10.497C17.2434 10.5175 17.1339 10.5607 17.036 10.6241C16.9381 10.6876 16.8539 10.7699 16.7883 10.8663L13.013 16.1513L11.1183 14.2567C10.9525 14.1021 10.7331 14.018 10.5064 14.022C10.2797 14.026 10.0634 14.1178 9.90311 14.2781C9.74279 14.4384 9.65096 14.6547 9.64696 14.8814C9.64296 15.1081 9.72711 15.3275 9.88167 15.4933L12.5067 18.1183C12.5965 18.2081 12.7048 18.2772 12.824 18.3209C12.9432 18.3646 13.0705 18.3819 13.1971 18.3714C13.3236 18.361 13.4464 18.3231 13.5568 18.2605C13.6673 18.1979 13.7628 18.1119 13.8367 18.0087L18.2117 11.8837Z" fill="white" fillOpacity="0.6" />
        </svg>
    )
}

/* ── Reusable glow sets ── */
function GlowRight() {
    return (
        <>
            <div aria-hidden="true" className="absolute pointer-events-none right-[-100px] lg:right-[-46px] bottom-[-200px] lg:top-[-131px]" style={{ width: '194.72px', height: '305.28px', background: '#6DB7FF', filter: 'blur(60.87px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
            <div aria-hidden="true" className="absolute pointer-events-none right-[-12px] bottom-[-137px] lg:top-[-137px]" style={{ width: '140.52px', height: '300.55px', background: '#6294FF', mixBlendMode: 'plus-lighter', filter: 'blur(171.26px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
            <div aria-hidden="true" className="absolute pointer-events-none right-[-28px] bottom-[-105px] lg:top-[-105px]" style={{ width: '131.05px', height: '291.8px', background: '#0F4274', mixBlendMode: 'plus-lighter', filter: 'blur(171.26px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
             <div className='w-[280px] sm:w-[350px] h-[220px] lg:h-[350px] absolute bottom-0 lg:top-0 right-0 z-10'>
                <div
                    className="absolute inset-0 opacity-20 bg-[url('/assets/dots.svg')] bg-cover"
                />
            </div>
        </>
    )
}

function GlowLeft() {
    return (
        <>
            <div aria-hidden="true" className="absolute pointer-events-none left-[-120px] lg:left-[-131px] bottom-[-120px] lg:top-[-131px]" style={{ width: '194.72px', height: '305.28px', background: '#6DB7FF', filter: 'blur(60.87px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
            <div aria-hidden="true" className="absolute pointer-events-none left-[-117px] bottom-[-137px] lg:top-[-137px]" style={{ width: '140.52px', height: '300.55px', background: '#6294FF', mixBlendMode: 'plus-lighter', filter: 'blur(171.26px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
            <div aria-hidden="true" className="absolute pointer-events-none left-[-133px] bottom-[-105px] lg:top-[-105px]" style={{ width: '131.05px', height: '291.8px', background: '#0F4274', mixBlendMode: 'plus-lighter', filter: 'blur(171.26px)', transform: 'rotate(-56.09deg)', zIndex: 1 }} />
            <div className='w-[280px] sm:w-[380px] h-[220px] lg:h-[350px] absolute bottom-0 lg:top-0 left-0 z-10'>
                <div
                    className="absolute inset-0 opacity-20 bg-[url('/assets/dots.svg')] bg-cover"
                />
            </div>
        </>
    )
}

export default function FeatureSections() {
    const s0 = SECTIONS[0]
    const s1 = SECTIONS[1]
    const s2 = SECTIONS[2]
    const s3 = SECTIONS[3]

    return (
        <div className="px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-32">
            <div className="max-w-[1560px] mx-auto flex flex-col gap-10 sm:gap-14 lg:gap-20">

                {/* Card 1 — NFP — right-top glow */}
                <div className='relative border border-[#FFFFFF0D] bg-[#FFFFFF05] p-6 sm:p-10 lg:p-12 2xl:pl-[90px] 2xl:pr-[74px] 2xl:py-[70px] rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] 2xl:rounded-[80px] flex flex-col lg:flex-row justify-between gap-8 lg:gap-6 items-center overflow-hidden'>
                    <GlowRight />
                    <div className="relative z-10 flex flex-col max-w-full lg:max-w-[615px] w-full">
                        <div className="mb-4 sm:mb-5 w-fit bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" /><circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" /><circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" /></svg>
                            {s0.badge}
                        </div>
                        <h2 className="w-full max-w-[615px] text-left font-normal text-2xl sm:text-3xl md:text-4xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">{s0.title}</h2>
                        <p className="text-white/80 text-[16px] sm:text-[18px] xl:text-[20px] leading-5 sm:leading-6 xl:leading-[30px] font-semibold my-4 sm:my-5">{s0.subtitle}</p>
                        {s0.description && <p className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal mb-4 sm:mb-5">{s0.description}</p>}
                        <div className="flex flex-col gap-3.5 sm:gap-5 mb-6 sm:mb-8">
                            {s0.points.map((point, i) => (
                                <div key={i} className="flex items-center gap-2 sm:gap-3">
                                    <CheckIcon /><span className="text-white/60 text-[14px] leading-5 xl:text-[18px] xl:leading-[27px]">{point.text}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full sm:w-fit bg-white text-black text-[18px] sm:text-[20px] leading-6 font-semibold px-5 h-[48px] sm:h-[52px] rounded-[16px] hover:bg-white/90 transition-colors cursor-pointer inline-flex items-center justify-between gap-2.5">
                            {s0.ctaText}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                    <div className="relative z-10 w-full lg:max-w-[380px] xl:max-w-[715px] rounded-[20px] overflow-hidden flex-shrink-0 max-h-[636px]">
                        <Image src={s0.image} alt={s0.imageAlt} width={s0.imageWidth} height={s0.imageHeight} className="w-full h-auto object-cover" />
                    </div>
                </div>

                {/* Card 2 — Divergence — left-top glow */}
                {/* Ellipse 1 (left) + Ellipse 18 (right) — between card 1 and card 2 */}
                <div className="relative">
                    <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                        width: '765px', height: '489px',
                        left: '-373px', top: '-250px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        zIndex: 0,
                    }} />
                    <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[280px] lg:w-[765px] lg:h-[489px] top-[-200px] lg:top-[-250px] blur-[100px] lg:blur-[250px]" style={{
                        right: '-339px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        transform: 'rotate(-23.64deg)',
                        zIndex: 0,
                    }} />
                    <div className="relative" style={{ zIndex: 1 }}>
                        <div className='relative border border-[#FFFFFF0D] bg-[#FFFFFF05] p-6 sm:p-10 lg:pl-[88px] lg:pr-[63px] lg:pt-[42px] lg:pb-[41px] rounded-[30px] sm:rounded-[40px] lg:rounded-[80px] flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-6 items-center overflow-hidden'>
                    <GlowLeft />
                    <div className="relative z-10 w-full lg:max-w-[699px] rounded-[20px] sm:rounded-[28px] overflow-hidden p-3 sm:p-5 border border-[#FFFFFF14] flex-shrink-0">
                        <Image src={s1.image} alt={s1.imageAlt} width={s1.imageWidth} height={s1.imageHeight}  style={{ mixBlendMode: "screen" }} className="w-full h-auto object-cover" />
                    </div>
                    <div className="relative z-10 flex flex-col max-w-full lg:max-w-[615px] w-full">
                        <div className="mb-4 sm:mb-5 w-fit bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" /><circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" /><circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" /></svg>
                            {s1.badge}
                        </div>
                        <h2 className="max-w-[615px] text-left font-normal text-2xl sm:text-3xl md:text-4xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">{s1.title}</h2>
                        <p className="text-white/80 text-[16px] sm:text-[18px] xl:text-[20px] leading-5 sm:leading-6 xl:leading-[30px] font-semibold my-4 sm:my-5">{s1.subtitle}</p>
                        {s1.description && <p className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal mb-4 sm:mb-5 2xl:pr-10">{s1.description}</p>}
                        <div className="flex flex-col gap-3.5 sm:gap-5 mb-6 sm:mb-8">
                            {s1.points.map((point, i) => (
                                <div key={i} className="flex items-center gap-2 sm:gap-3"><CheckIcon /><span className="text-white/60 text-[14px] leading-5 xl:text-[18px] xl:leading-[27px]">{point.text}</span></div>
                            ))}
                        </div>
                        <button className="w-full sm:w-fit bg-white text-black text-[18px] sm:text-[20px] leading-6 font-semibold px-5 h-[48px] sm:h-[52px] rounded-[16px] hover:bg-white/90 transition-colors cursor-pointer inline-flex items-center justify-between gap-2.5">
                            {s1.ctaText}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </div>
                    </div>
                </div>

                {/* Card 3 — Volatility — right-top glow */}
                {/* Ellipse 15 (left) + Ellipse 16 (right) — between card 2 and card 3 */}
                <div className="relative">
                    <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                        width: '865px', height: '553px',
                        left: '-249px', top: '-250px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        zIndex: 0,
                    }} />
                    <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[280px] lg:w-[744px] lg:h-[510px] top-[-200px] lg:top-[-250px] blur-[100px] lg:blur-[250px]" style={{
                        right: '-339px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        transform: 'rotate(-26.89deg)',
                        zIndex: 0,
                    }} />
                    <div className="relative" style={{ zIndex: 1 }}>
                        <div className='relative border border-[#FFFFFF0D] bg-[#FFFFFF05] p-6 sm:p-10 lg:pl-[90px] lg:pr-[74px] lg:py-[70px] rounded-[30px] sm:rounded-[40px] lg:rounded-[80px] flex flex-col lg:flex-row justify-between gap-8 lg:gap-6 items-center overflow-hidden'>
                    <GlowRight />
                    <div className="relative z-10 flex flex-col max-w-full lg:max-w-[649px] w-full">
                        <div className="mb-4 sm:mb-5 w-fit bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" /><circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" /><circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" /></svg>
                            {s2.badge}
                        </div>
                        <h2 className="tracking-[-1.62px] text-left font-normal text-2xl sm:text-3xl md:text-4xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">{s2.title}</h2>
                        <p className="max-w-[500px] text-white/80 text-[16px] sm:text-[18px] xl:text-[20px] leading-5 sm:leading-6 xl:leading-[30px] font-semibold my-4 sm:my-5">{s2.subtitle}</p>
                        {s2.description && <p className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal mb-4 sm:mb-5">{s2.description}</p>}
                        <div className="flex flex-col gap-3.5 sm:gap-5 mb-6 sm:mb-8">
                            {s2.points.map((point, i) => (
                                <div key={i} className="flex items-center gap-2 sm:gap-3"><CheckIcon /><span className="text-white/60 text-[14px] leading-5 xl:text-[18px] xl:leading-[27px]">{point.text}</span></div>
                            ))}
                        </div>
                        <button className="w-full sm:w-fit bg-white text-black text-[18px] sm:text-[20px] leading-6 font-semibold px-5 h-[48px] sm:h-[52px] rounded-[16px] hover:bg-white/90 transition-colors cursor-pointer inline-flex items-center justify-between gap-2.5">
                            {s2.ctaText}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                    <div className="relative z-10 w-full lg:max-w-[712px] rounded-[20px] sm:rounded-[30px] max-h-[636px] overflow-hidden flex-shrink-0">
                        <Image src={s2.image} alt={s2.imageAlt} width={s2.imageWidth} height={s2.imageHeight} className="w-full h-auto object-cover" />
                    </div>
                </div>
                    </div>
                </div>

                {/* Card 4 — Market Structure — left-top glow */}
                {/* Ellipse 19 (left-top) + Ellipse 20 (right-middle) — between card 3 and card 4 */}
                <div className="relative">
                    <div aria-hidden="true" className="absolute pointer-events-none lg:block hidden blur-[250px]" style={{
                        width: '977px', height: '446px',
                        left: '-465px', top: '0px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        transform: 'rotate(-20.7deg)',
                        zIndex: 0,
                    }} />
                    <div aria-hidden="true" className="absolute pointer-events-none w-[400px] h-[250px] lg:w-[977px] lg:h-[446px] top-[20%] blur-[100px] lg:blur-[250px]" style={{
                        right: '-539px',
                        background: 'rgba(34, 126, 217, 0.4)',
                        transform: 'rotate(-20.7deg)',
                        zIndex: 0,
                    }} />
                    <div className="relative" style={{ zIndex: 1 }}>
                        <div className='relative border border-[#FFFFFF0D] bg-[#FFFFFF05] p-6 sm:p-10 lg:pl-[88px] lg:pr-[63px] lg:py-[32px] rounded-[30px] sm:rounded-[40px] lg:rounded-[80px] flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-6 items-center overflow-hidden'>
                    <GlowLeft />
                    <div className="relative z-10 w-full lg:max-w-[699px] max-h-[712px] rounded-[20px] overflow-hidden p-3 sm:p-5 border border-[#FFFFFF14] flex-shrink-0">
                        <Image src={s3.image} alt={s3.imageAlt} width={659} height={673}  style={{ mixBlendMode: "screen" }} className='object-contain w-full h-auto' />
                    </div>
                    <div className="relative z-10 flex flex-col max-w-full lg:max-w-[615px] w-full">
                        <div className="mb-4 sm:mb-5 w-fit bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" /><circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" /><circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" /></svg>
                            {s3.badge}
                        </div>
                        <h2 className="max-w-[615px] text-left font-normal text-2xl sm:text-3xl md:text-4xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">{s3.title}</h2>
                        <p className="text-white/80 text-[16px] sm:text-[18px] xl:text-[20px] leading-5 sm:leading-6 xl:leading-[30px] font-semibold my-4 sm:my-5">{s3.subtitle}</p>
                        {s3.description && <p className="text-white/60 text-[14px] sm:text-[18px] leading-5 sm:leading-[27px] font-normal mb-4 sm:mb-5">{s3.description}</p>}
                        <div className="flex flex-col gap-3.5 sm:gap-5 mb-6 sm:mb-8">
                            {s3.points.map((point, i) => (
                                <div key={i} className="flex items-center gap-2 sm:gap-3"><CheckIcon /><span className="text-white/60 text-[14px] leading-5 xl:text-[18px] xl:leading-[27px]">{point.text}</span></div>
                            ))}
                        </div>
                        <button className="w-full sm:w-fit bg-white text-black text-[18px] sm:text-[20px] leading-6 font-semibold px-5 h-[48px] sm:h-[52px] rounded-[16px] hover:bg-white/90 transition-colors cursor-pointer inline-flex items-center justify-between gap-2.5">
                            {s3.ctaText}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
