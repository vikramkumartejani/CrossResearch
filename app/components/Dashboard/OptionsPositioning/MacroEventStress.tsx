const EVENTS = [
    {
        time: 'TODAY 14:00',
        title: 'FOMC Minutes Release',
        badge: 'FED',
        badgeColor: 'text-[#E25C3F]',
        desc: 'Implied move SPX:\n• Gamma vulnerability: HIGH',
    },
    {
        time: 'TODAY 15:30',
        title: 'Charm Flow Window',
        badge: 'Charm',
        badgeColor: 'text-[#2796FF]',
        desc: 'Late-day delta rebalancing + NQ: watch for selling pressure into close',
    },
    {
        time: 'TUE 27 08:30',
        title: 'Durable Goods orders',
        badge: 'MED',
        badgeColor: 'text-[#E4702D]',
        desc: 'Prev: -1.7% • Est: +0.8%',
    },
    {
        time: 'THU 29 08:30',
        title: 'GDP Revision Q1 2026',
        badge: 'FED',
        badgeColor: 'text-[#E25C3F]',
        desc: 'Prev: +2.4% Est: +2.1% •\nHigh vol trigger risk if miss',
    },
    {
        time: 'THU 29 08:30',
        title: 'Initial Jobless Claims',
        badge: 'FED',
        badgeColor: 'text-[#E25C3F]',
        desc: 'Prev: 225k • Est: 225k •\nCombined with GDP double event risk',
    },
    {
        time: 'FRI 30 OPEX',
        title: 'Monthly Options Expiry',
        badge: 'FED',
        badgeColor: 'text-[#E25C3F]',
        desc: 'Pin zones: SPX 5,800 /\nNQ 21000 / DJI 42,500 ngamma cliff',
    },
]

const FOOTER_NOTE =
    'Post-OPEX gamma cliff: expect vol expansion next week as dealer inventory resets. NQ most vulnerable if still in negative -gamma by expiry.'

export default function MacroEventStress() {
    return (
        <div className="bg-[#16161F] p-5 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-5">
                <h3 className="text-white text-[16px] leading-[19px] font-semibold">Macro Event Stress</h3>
                <button className="transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.9974 18.3337C14.5998 18.3337 18.3307 14.6027 18.3307 10.0003C18.3307 5.39795 14.5998 1.66699 9.9974 1.66699C5.39502 1.66699 1.66406 5.39795 1.66406 10.0003C1.66406 14.6027 5.39502 18.3337 9.9974 18.3337Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 6.66699V10.0003" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 13.333H10.0083" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Event list */}
            <div className="flex-1 overflow-y-auto">
                {EVENTS.map((ev, i) => (
                    <div key={i} className="border-b border-[#FFFFFF1A] pb-3.5 pt-3.5 first:pt-0 last:border-0">
                        <div className="flex items-start justify-between gap-0 mb-2">
                            <div className="flex items-start gap-[20px] min-w-0">
                                <span className="text-white/60 text-[12px] leading-[14px] font-normal w-[120px]">
                                    {ev.time}
                                </span>
                                <p className="text-white text-[16px] leading-[19px] font-semibold">{ev.title}</p>
                            </div>

                            <span className={`text-[12px] leading-[16px] font-semibold ${ev.badgeColor}`}>
                                {ev.badge}
                            </span>
                        </div>

                        <p className="text-white/60 text-[12px] leading-[16px] font-normal whitespace-pre-line ml-[140px] max-w-[220px]">
                            {ev.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <div className="flex items-start gap-2">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.82535 3.64183L1.17868 13.0685C1.06226 13.2701 1.00066 13.4987 1.00001 13.7315C0.999353 13.9643 1.05967 14.1932 1.17496 14.3955C1.29025 14.5978 1.4565 14.7663 1.65715 14.8844C1.85781 15.0025 2.08588 15.0659 2.31868 15.0685H13.612C13.8448 15.0659 14.0729 15.0025 14.2735 14.8844C14.4742 14.7663 14.6404 14.5978 14.7557 14.3955C14.871 14.1932 14.9313 13.9643 14.9307 13.7315C14.93 13.4987 14.8684 13.2701 14.752 13.0685L9.10535 3.64183C8.9865 3.4459 8.81916 3.28391 8.61948 3.17149C8.41979 3.05906 8.1945 3 7.96535 3C7.73619 3 7.5109 3.05906 7.31122 3.17149C7.11153 3.28391 6.94419 3.4459 6.82535 3.64183Z" stroke="#A5A5A5" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6.40039V9.24514" stroke="#A5A5A5" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12.0898H8.0075" stroke="#A5A5A5" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-white/60 text-[12px] leading-[17px] font-normal">{FOOTER_NOTE}</p>
            </div>
        </div>
    )
}
