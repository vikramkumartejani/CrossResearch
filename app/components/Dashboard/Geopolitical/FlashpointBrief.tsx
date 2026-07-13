const FLASHPOINTS = [
    { region: 'Yemen', date: 'Nov 2, 2026', title: 'Red Sea Shipping Disruption', severity: 'High', severityColor: 'text-[#E25C3F]' },
    { region: 'Ukraine', date: 'Nov 2, 2026', title: 'Russia – Ukraine War', severity: 'Medium', severityColor: 'text-[#2796FF]' },
    { region: 'Brazil', date: 'Nov 3, 2026', title: 'Amazon Rainforest Fires', severity: 'High', severityColor: 'text-[#E25C3F]' },
    { region: 'USA', date: 'Nov 4, 2026', title: 'Midterm Elections', severity: 'Medium', severityColor: 'text-[#2796FF]' },
    { region: 'India', date: 'Nov 5, 2026', title: 'Pollution Crisis in Delhi', severity: 'High', severityColor: 'text-[#E25C3F]' },
    { region: 'France', date: 'Nov 6, 2026', title: 'Strikes in Public Transport', severity: 'Medium', severityColor: 'text-[#2796FF]' },
]

export default function FlashpointBrief() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-white text-[18px] leading-[22px] font-medium">Flashpoint Brief</h2>
                <button className="text-[#838388] hover:text-white transition-colors">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2096 16.5C14.2096 18.2719 12.7732 19.7083 11.0013 19.7083C9.22939 19.7083 7.79297 18.2719 7.79297 16.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.6285 16.5003H4.37146C3.47595 16.5003 2.75 15.7743 2.75 14.8788C2.75 14.4488 2.92083 14.0364 3.22492 13.7323L3.77788 13.1793C4.2936 12.6636 4.58333 11.9641 4.58333 11.2348V8.70866C4.58333 5.16483 7.45618 2.29199 11 2.29199C14.5438 2.29199 17.4167 5.16483 17.4167 8.70866V11.2348C17.4167 11.9641 17.7064 12.6636 18.2221 13.1793L18.7751 13.7323C19.0791 14.0364 19.25 14.4488 19.25 14.8788C19.25 15.7743 18.524 16.5003 17.6285 16.5003Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-3">
                    {FLASHPOINTS.map((fp, i) => (
                        <div key={i} className="bg-[#16161F] flex items-start justify-between p-3.5">
                            <div className="flex flex-col gap-2">
                                <span className="text-[#838388] text-[14px] leading-[20px] font-normal">
                                    {fp.region} • {fp.date}
                                </span>
                                <p className="text-white text-[16px] leading-[20px] font-medium">{fp.title}</p>
                            </div>
                            <span className={`text-[14px] leading-[17px] font-medium ${fp.severityColor}`}>
                                {fp.severity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
