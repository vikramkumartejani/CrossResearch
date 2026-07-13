'use client'

// ── Sparkline ────────────────────────────────────────────────────────────────
function Sparkline({ positive }: { positive: boolean }) {
    const color = positive ? '#88C4FF' : '#FFFFFF4D'
    return (
        <svg width="77" height="15" viewBox="0 0 77 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M74.8406 9.35235C75.3443 9.57899 75.9363 9.35443 76.1629 8.85079C76.3895 8.34715 76.165 7.75515 75.6613 7.52851L75.251 8.44043L74.8406 9.35235ZM51.0399 3.23036L50.371 2.48706L51.0399 3.23036ZM60.4173 1.76529L60.007 2.67721L60.4173 1.76529ZM40.2764 3.99886L40.9424 3.25292L40.2764 3.99886ZM28.5779 5.9643L27.6117 5.70664L28.5779 5.9643ZM38.9895 2.84978L39.6555 2.10384L38.9895 2.84978ZM0.750977 13.4404L1.50169 14.1011L7.03009 7.81878L6.27938 7.15816L5.52866 6.49753L0.000263035 12.7798L0.750977 13.4404ZM16.8099 7.4983L16.0181 8.10911L16.5724 8.82767L17.3642 8.21686L18.156 7.60606L17.6017 6.8875L16.8099 7.4983ZM38.9895 2.84978L38.3234 3.59572L39.6104 4.74479L40.2764 3.99886L40.9424 3.25292L39.6555 2.10384L38.9895 2.84978ZM50.2079 3.97919L50.8769 4.72249L51.7089 3.97365L51.0399 3.23036L50.371 2.48706L49.5389 3.2359L50.2079 3.97919ZM60.4173 1.76529L60.007 2.67721L74.8406 9.35235L75.251 8.44043L75.6613 7.52851L60.8277 0.853371L60.4173 1.76529ZM51.0399 3.23036L51.7089 3.97365C53.9737 1.93537 57.2284 1.42687 60.007 2.67721L60.4173 1.76529L60.8277 0.853371C57.3263 -0.722239 53.2249 -0.0814502 50.371 2.48706L51.0399 3.23036ZM40.2764 3.99886L39.6104 4.74479C42.8218 7.61215 47.6768 7.60254 50.8769 4.72249L50.2079 3.97919L49.5389 3.2359C47.0972 5.43343 43.3928 5.44076 40.9424 3.25292L40.2764 3.99886ZM28.5779 5.9643L29.5442 6.22197C30.5772 2.34814 35.3328 0.925531 38.3234 3.59572L38.9895 2.84978L39.6555 2.10384C35.5528 -1.55923 29.0289 0.39236 27.6117 5.70664L28.5779 5.9643ZM17.3642 8.21686L16.5724 8.82767C20.3063 13.6679 27.9691 12.1286 29.5442 6.22197L28.5779 5.9643L27.6117 5.70664C26.4635 10.0123 20.8778 11.1343 18.156 7.60606L17.3642 8.21686ZM6.27938 7.15816L7.03009 7.81878C9.4509 5.06786 13.7799 5.20769 16.0181 8.10911L16.8099 7.4983L17.6017 6.8875C14.5952 2.99022 8.78038 2.8024 5.52866 6.49753L6.27938 7.15816Z"
                fill={color}
            />
        </svg>
    )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const GLOBAL_ROWS = [
    { name: 'Dow Jones', code: 'DJIA', net: '+544.3K', wow: '-20.43%', netPos: true, wowPos: false },
    { name: 'S&P 500', code: 'SPX', net: '-1.45M', wow: '+14.86%', netPos: false, wowPos: true },
    { name: 'NASDAQ', code: 'COMP', net: '+1.20M', wow: '+12.34%', netPos: true, wowPos: true },
    { name: 'FTSE 100', code: 'Z', net: '-300K', wow: '-5.67%', netPos: false, wowPos: false },
    { name: 'DAX', code: 'FDAX', net: '+250K', wow: '+3.45%', netPos: true, wowPos: true },
    { name: 'Nikkei 225', code: 'N225', net: '+400K', wow: '+6.78%', netPos: true, wowPos: true },
    { name: 'CAC 40', code: 'CAC', net: '-150K', wow: '-4.12%', netPos: false, wowPos: false },
    { name: 'Hang Seng Index', code: 'HSI', net: '+500K', wow: '+8.90%', netPos: true, wowPos: true },
]

const ENERGY_ROWS = [
    { name: 'Crude Oil', code: 'CL', net: '-985.6K', wow: '+12.98%', netPos: false, wowPos: true },
    { name: 'Brent Oil', code: 'BZ', net: '+1.00M', wow: '+21.98%', netPos: true, wowPos: true },
    { name: 'Natural Gas', code: 'NG', net: '+250K', wow: '+15.50%', netPos: true, wowPos: true },
    { name: 'Gold', code: 'GC', net: '-3.5K', wow: '+0.45%', netPos: false, wowPos: true },
    { name: 'Silver', code: 'SI', net: '+12.5M', wow: '-5.75%', netPos: true, wowPos: false },
    { name: 'Copper', code: 'HG', net: '-500K', wow: '+7.20%', netPos: false, wowPos: true },
    { name: 'Aluminum', code: 'AL', net: '+1.5M', wow: '+9.00%', netPos: true, wowPos: true },
    { name: 'Corn', code: 'C', net: '+100K', wow: '+3.30%', netPos: true, wowPos: true },
]

const COMMENTARY = [
    { num: '01', highlight: 'USD Positioning', text: ' remains net long across DXY and against EUR – Speculator longs at 1.5y high, Contrarian risk skew building' },
    { num: '02', highlight: 'S&P 500 Specs', text: ' filpped net short – 1.4M Contracts this week (+14.5% wow) historically a contrarian buy signal when paired with rising VIX' },
    { num: '03', highlight: 'Gold prices', text: ' gain momentum as inflation concerns grow – hedge funds increase long positions in anticipation of market instability' },
    { num: '04', highlight: 'Oil futures', text: ' dip amid global supply concerns – OPEC production cuts lead to mixed sentiments among traders' },
    { num: '05', highlight: 'Cryptocurrency market', text: ' shows signs of recovery – Bitcoin approaches $30,000 as institutional interest rises' },
    { num: '06', highlight: 'US Treasury', text: ' yields edge higher – investors eye upcoming economic data for signs of Fed policy shifts' },
]

const REGIME_TAKEAWAY =
    'Specs are positioned for USD strength + commodity squeeze + equity downside hedges — consistent with the stagflation playbook.'

// ── Sub-table ─────────────────────────────────────────────────────────────────
function InstrumentTable({ title, rows }: { title: string; rows: typeof GLOBAL_ROWS }) {
    return (
        <div className="bg-[#16161F]">
            <h4 className="text-white text-[16px] leading-[19px] font-medium p-4">{title}</h4>
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px_80px] gap-4 px-4 pb-3 border-b border-[#FFFFFF0D]">
                {['Instrument', 'Net', 'Wow', '10W Trend'].map((h) => (
                    <span key={h} className="text-white/60 text-[14px] leading-[17px] font-normal">{h}</span>
                ))}
            </div>
            {/* Rows */}
            <div className="flex flex-col">
                {rows.map((row) => (
                    <div
                        key={row.code}
                        className="grid grid-cols-[1fr_80px_80px_80px] gap-4 py-3 px-4 border-b border-[#FFFFFF08] last:border-0"
                    >
                        <div>
                            <p className="text-white text-[14px] leading-[17px] font-semibold mb-1">{row.name}</p>
                            <p className="text-white/60 text-[12px] leading-[14px]">{row.code}</p>
                        </div>
                        <div>
                            <p className={`text-[14px] leading-[17px] font-semibold ${row.netPos ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                {row.net}
                            </p>
                            <p className="text-[12px] leading-[14px] font-normal text-white/60 mt-1">NET</p>
                        </div>
                        <div>
                            <p className={`text-[14px] leading-[17px] font-semibold ${row.wowPos ? 'text-[#2CB37B]' : 'text-[#E25C3F]'}`}>
                                {row.wow}
                            </p>
                            <p className="text-[12px] leading-[14px] font-normal text-white/60 mt-1">WOW</p>
                        </div>
                        <div className="self-center">
                            <Sparkline positive={row.netPos} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CotPositioning() {
    return (
        <div className="mb-5">
            <h2 className="text-white text-[18px] leading-[22px] font-medium">
                COT Positioning • Latest CFTC Report
            </h2>

            <div className="mt-4 grid grid-cols-3 gap-4">
                <InstrumentTable title="Global Financial Instruments" rows={GLOBAL_ROWS} />
                <InstrumentTable title="Energy & Metals Instruments" rows={ENERGY_ROWS} />
                <div className="bg-[#16161F] flex flex-col">
                    <div className="p-4 flex items-start justify-between gap-4 border-b border-[#FFFFFF0D]">
                        <div className="flex flex-col">
                            <span className="text-[#88C4FF] text-[12px] leading-[14px] font-normal mb-2">Desk Commentary</span>
                            <h4 className="text-white text-[16px] leading-[19px] font-medium">Energy & Metals Instruments</h4>
                        </div>
                        <span className="bg-[#FFFFFF0A] rounded-full py-2 px-4 text-white/60 text-[12px] leading-[14px] font-normal">May 24 2025</span>
                    </div>

                    <div className="flex flex-col gap-4 flex-1 p-4">
                        {COMMENTARY.map((item) => (
                            <div key={item.num} className="flex gap-4">
                                <span className="text-[#88C4FF] text-[14px] leading-[17px] font-semibold flex-shrink-0">{item.num}</span>
                                <p className="text-white/50 text-[14px] leading-[21px]">
                                    <span className="text-white font-semibold">{item.highlight}</span>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Regime Takeaway */}
                    <div className="mt-4 p-4 border-t border-[#FFFFFF0D]">
                        <p className="text-[#88C4FF] text-[16px] leading-[19px] font-semibold uppercase mb-3">Regime Takeaway</p>
                        <p className="text-white/60 text-[12px] leading-[18px]">{REGIME_TAKEAWAY}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
