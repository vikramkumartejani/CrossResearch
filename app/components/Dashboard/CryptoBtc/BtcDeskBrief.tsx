const METRICS = [
    { label: 'IV Regime', value: 'Normal', valueClass: 'bg-[#88C4FF1A] text-[#88C4FF] text-[12px] leading-[14px] font-medium px-4 py-[5px]' },
    { label: 'IV (Current)', value: '68.5%', valueClass: 'text-white' },
    { label: 'Fear & Greed', value: '68·Greed', valueClass: 'text-[#2CB37B]' },
    { label: '5d ETF Flow', value: '+$456.3M', valueClass: 'text-[#2CB37B]' },
]

export default function BtcDeskBrief() {
    return (
        <div className="bg-[#16161F] p-5 flex flex-col h-full">
            {/* BTC Desk Summary label */}
            <div className="flex items-center gap-1 mb-6">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.83313 11.1943L13.6669 16.0281C13.8865 16.2477 13.9963 16.3575 14.1148 16.4162C14.3401 16.5279 14.6047 16.5279 14.8302 16.4162C14.9486 16.3575 15.0584 16.2477 15.2781 16.0281C15.4977 15.8084 15.6075 15.6986 15.6662 15.5802C15.7779 15.3547 15.7779 15.0901 15.6662 14.8648C15.6075 14.7463 15.4977 14.6365 15.2781 14.4169L10.4444 9.58312L8.83313 7.9719C8.61353 7.7523 8.50373 7.6425 8.38523 7.58377C8.15985 7.47208 7.89525 7.47208 7.6698 7.58377C7.55138 7.6425 7.44155 7.7523 7.22192 7.9719C7.00228 8.19157 6.89247 8.30137 6.83377 8.4198C6.72208 8.64525 6.72208 8.90985 6.83377 9.13522C6.89247 9.25372 7.00228 9.36352 7.22192 9.58312L8.83313 11.1943ZM10.4444 9.58312L8.83313 11.1943" stroke="#88C4FF" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.75 1.5L12.9711 2.09745C13.261 2.88088 13.4059 3.27259 13.6917 3.55834C13.9774 3.84409 14.3691 3.98903 15.1525 4.27892L15.75 4.5L15.1525 4.72108C14.3691 5.01097 13.9774 5.15592 13.6917 5.44166C13.4059 5.72741 13.261 6.11912 12.9711 6.90255L12.75 7.5L12.5289 6.90255C12.239 6.11913 12.0941 5.72741 11.8083 5.44166C11.5226 5.15591 11.1309 5.01097 10.3475 4.72108L9.75 4.5L10.3475 4.27892C11.1309 3.98903 11.5226 3.84409 11.8083 3.55834C12.0941 3.27259 12.239 2.88088 12.5289 2.09745L12.75 1.5Z" stroke="#88C4FF" stroke-linejoin="round" />
                    <path d="M4.5 3L4.66581 3.44809C4.88323 4.03565 4.99194 4.32944 5.20625 4.54376C5.42056 4.75806 5.71435 4.86677 6.30191 5.08419L6.75 5.25L6.30191 5.41581C5.71435 5.63323 5.42056 5.74194 5.20624 5.95625C4.99194 6.17056 4.88323 6.46435 4.66581 7.05191L4.5 7.5L4.33419 7.05191C4.11677 6.46435 4.00806 6.17056 3.79375 5.95625C3.57944 5.74194 3.28565 5.63323 2.69809 5.41581L2.25 5.25L2.69809 5.08419C3.28565 4.86677 3.57944 4.75806 3.79375 4.54375C4.00806 4.32944 4.11677 4.03565 4.33419 3.44809L4.5 3Z" stroke="#88C4FF" stroke-linejoin="round" />
                </svg>
                <span className="text-[#88C4FF] text-[14px] leading-[17px] font-medium">BTC Desk Summary</span>
            </div>

            {/* Spot price */}
            <div>
                <p className="text-[#838388] text-[14px] leading-[17px] mb-2 font-medium">Spot</p>
                <p className="text-white text-[24px] leading-[38px] font-semibold">$45 214,5</p>
                <div className="flex items-center gap-1 mt-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.666V3.33268" stroke="#2CB37B" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6654 8L7.9987 3.33333L3.33203 8" stroke="#2CB37B" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="text-[#2CB37B] text-[14px] leading-[17px] font-medium">+0.01%</span>
                    <span className="text-white/50 text-[14px] leading-[17px] font-medium">24H</span>
                </div>
            </div>

            <div className="w-full h-px bg-[#FFFFFF1A] my-5" />

            {/* 3D Model Forecast */}
            <div>
                <p className="text-[#838388] text-[14px] leading-[17px] font-medium mb-2">30D Model Forecast</p>
                <p className="text-white text-[24px] leading-[38px] font-semibold">$85 745,57</p>
                <div className="flex items-center gap-1 mt-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.33398V12.6673" stroke="#E25C3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6654 8L7.9987 12.6667L3.33203 8" stroke="#E25C3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">-3.47% </span>
                    <span className="text-white/50 text-[14px] leading-[17px] font-medium">Bearish</span>
                </div>
            </div>

            {/* Upper / Lower */}
            <div className="mt-5 flex items-center justify-between">
                <div>
                    <p className="text-white/50 text-[14px] leading-[17px] font-medium mb-1">Upper</p>
                    <p className="text-[#2CB37B] text-[14px] leading-[17px] font-medium">+5.1%</p>
                </div>
                <div className="text-right">
                    <p className="text-white/50 text-[14px] leading-[17px] font-medium mb-1">Lower</p>
                    <p className="text-[#E25C3F] text-[14px] leading-[17px] font-medium">-8.5%</p>
                </div>
            </div>

            <div className="w-full h-px bg-[#FFFFFF1A] my-5" />

            {/* Metrics */}
            <div className="flex flex-col gap-4">
                {METRICS.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                        <span className="text-[#838388] text-[14px] leading-[17px] font-medium">{m.label}</span>
                        {m.label === 'IV Regime' ? (
                            <span className={m.valueClass}>{m.value}</span>
                        ) : (
                            <span className={`text-[14px] leading-[17px] font-medium ${m.valueClass}`}>{m.value}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
