const CYCLE_ITEMS = [
    {
        label: 'Current Market Regime',
        value: 'Stagflation',
        valueColor: 'text-white',
        icon: (
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.96912 2.96961C1.71387 4.22487 1.71387 6.24517 1.71387 10.2858C1.71387 14.3264 1.71387 16.3467 2.96912 17.602C4.22438 18.8572 6.24469 18.8572 10.2853 18.8572C14.3259 18.8572 16.3462 18.8572 17.6015 17.602C18.8567 16.3467 18.8567 14.3264 18.8567 10.2858C18.8567 6.24517 18.8567 4.22487 17.6015 2.96961C16.3462 1.71436 14.3259 1.71436 10.2853 1.71436C6.24469 1.71436 4.22438 1.71436 2.96912 2.96961ZM14.571 7.0715C14.926 7.0715 15.2139 7.35931 15.2139 7.71435V15.4286C15.2139 15.7837 14.926 16.0715 14.571 16.0715C14.216 16.0715 13.9282 15.7837 13.9282 15.4286V7.71435C13.9282 7.35931 14.216 7.0715 14.571 7.0715ZM10.9282 10.2858C10.9282 9.93074 10.6403 9.64293 10.2853 9.64293C9.93025 9.64293 9.64244 9.93074 9.64244 10.2858V15.4286C9.64244 15.7837 9.93025 16.0715 10.2853 16.0715C10.6403 16.0715 10.9282 15.7837 10.9282 15.4286V10.2858ZM5.99958 12.2144C6.35462 12.2144 6.64244 12.5022 6.64244 12.8572V15.4286C6.64244 15.7837 6.35462 16.0715 5.99958 16.0715C5.64454 16.0715 5.35672 15.7837 5.35672 15.4286V12.8572C5.35672 12.5022 5.64454 12.2144 5.99958 12.2144Z" fill="white" />
            </svg>
        ),
    },
    {
        label: 'Depth',
        value: '42.5%',
        valueColor: 'text-white',
        icon: (
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.3328 3.94326C5.71385 3.68865 6.11396 3.46782 6.52853 3.28216C7.70442 2.75556 8.29236 2.49225 9.07454 2.999C9.85673 3.50575 9.85673 4.337 9.85673 5.99952V7.28523C9.85673 8.90147 9.85673 9.7096 10.3588 10.2117C10.8609 10.7138 11.6691 10.7138 13.2853 10.7138H14.571C16.2335 10.7138 17.0648 10.7138 17.5715 11.496C18.0783 12.2782 17.815 12.8661 17.2884 14.042C17.1027 14.4566 16.8819 14.8567 16.6273 15.2377C15.7325 16.5768 14.4608 17.6205 12.9729 18.2368C11.485 18.8531 9.84769 19.0144 8.26814 18.7002C6.68858 18.386 5.23766 17.6105 4.09886 16.4717C2.96006 15.3329 2.18453 13.882 1.87033 12.3024C1.55614 10.7228 1.7174 9.08558 2.33371 7.59766C2.95002 6.10975 3.99371 4.83801 5.3328 3.94326Z" fill="white" />
                <path d="M18.3823 6.0581C17.6865 4.29179 16.2786 2.88392 14.5123 2.18808C13.191 1.66755 12 2.86452 12 4.28468V7.71325C12 8.18664 12.3838 8.5704 12.8571 8.5704H16.2857C17.7059 8.5704 18.9028 7.37943 18.3823 6.0581Z" fill="white" />
            </svg>
        ),
    },
    {
        label: 'Future Regime',
        value: 'Expansion',
        valueColor: 'text-white',
        icon: (
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.0004 2.35693C15.3555 2.35693 15.6433 2.64475 15.6433 2.99979V4.92836H17.5718C17.9269 4.92836 18.2147 5.21618 18.2147 5.57122C18.2147 5.92626 17.9269 6.21408 17.5718 6.21408H15.6433V8.14265C15.6433 8.49769 15.3555 8.7855 15.0004 8.7855C14.6454 8.7855 14.3576 8.49769 14.3576 8.14265V6.21408H12.429C12.0739 6.21408 11.7861 5.92626 11.7861 5.57122C11.7861 5.21618 12.0739 4.92836 12.429 4.92836H14.3576V2.99979C14.3576 2.64475 14.6454 2.35693 15.0004 2.35693Z" fill="white" />
                <path d="M1.71387 5.5715C1.71387 3.75322 1.71387 2.84409 2.27873 2.27922C2.8436 1.71436 3.75274 1.71436 5.57101 1.71436C7.38928 1.71436 8.29842 1.71436 8.86329 2.27922C9.42815 2.84409 9.42815 3.75322 9.42815 5.5715C9.42815 7.38977 9.42815 8.29891 8.86329 8.86378C8.29842 9.42864 7.38928 9.42864 5.57101 9.42864C3.75274 9.42864 2.8436 9.42864 2.27873 8.86378C1.71387 8.29891 1.71387 7.38977 1.71387 5.5715Z" fill="white" />
                <path d="M11.1426 15.0002C11.1426 13.1819 11.1426 12.2728 11.7074 11.7079C12.2723 11.1431 13.1814 11.1431 14.9997 11.1431C16.818 11.1431 17.7271 11.1431 18.292 11.7079C18.8569 12.2728 18.8569 13.1819 18.8569 15.0002C18.8569 16.8185 18.8569 17.7276 18.292 18.2925C17.7271 18.8574 16.818 18.8574 14.9997 18.8574C13.1814 18.8574 12.2723 18.8574 11.7074 18.2925C11.1426 17.7276 11.1426 16.8185 11.1426 15.0002Z" fill="white" />
                <path d="M1.71387 15.0002C1.71387 13.1819 1.71387 12.2728 2.27873 11.7079C2.8436 11.1431 3.75274 11.1431 5.57101 11.1431C7.38928 11.1431 8.29842 11.1431 8.86329 11.7079C9.42815 12.2728 9.42815 13.1819 9.42815 15.0002C9.42815 16.8185 9.42815 17.7276 8.86329 18.2925C8.29842 18.8574 7.38928 18.8574 5.57101 18.8574C3.75274 18.8574 2.8436 18.8574 2.27873 18.2925C1.71387 17.7276 1.71387 16.8185 1.71387 15.0002Z" fill="white" />
            </svg>
        ),
    },
    {
        label: 'Regime Pay',
        value: (
            <span className="flex items-center gap-1">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 3.95898V15.0423" stroke="#E25C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.0443 9.5L9.5026 15.0417L3.96094 9.5" stroke="#E25C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Down
            </span>
        ),
        valueColor: 'text-[#E25C3F]',
        icon: (
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.3328 3.94326C5.71385 3.68865 6.11396 3.46782 6.52853 3.28216C7.70442 2.75556 8.29236 2.49225 9.07454 2.999C9.85673 3.50575 9.85673 4.337 9.85673 5.99952V7.28523C9.85673 8.90147 9.85673 9.7096 10.3588 10.2117C10.8609 10.7138 11.6691 10.7138 13.2853 10.7138H14.571C16.2335 10.7138 17.0648 10.7138 17.5715 11.496C18.0783 12.2782 17.815 12.8661 17.2884 14.042C17.1027 14.4566 16.8819 14.8567 16.6273 15.2377C15.7325 16.5768 14.4608 17.6205 12.9729 18.2368C11.485 18.8531 9.84769 19.0144 8.26814 18.7002C6.68858 18.386 5.23766 17.6105 4.09886 16.4717C2.96006 15.3329 2.18453 13.882 1.87033 12.3024C1.55614 10.7228 1.7174 9.08558 2.33371 7.59766C2.95002 6.10975 3.99371 4.83801 5.3328 3.94326Z" fill="white" />
                <path d="M18.3823 6.0581C17.6865 4.29179 16.2786 2.88392 14.5123 2.18808C13.191 1.66755 12 2.86452 12 4.28468V7.71325C12 8.18664 12.3838 8.5704 12.8571 8.5704H16.2857C17.7059 8.5704 18.9028 7.37943 18.3823 6.0581Z" fill="white" />
            </svg>
        ),
    },
]

export default function TheCycleWidget() {
    return (
        <div className="bg-[#16161F] flex flex-col h-full">
            {/* Title */}
            <div className="bg-[#FFFFFF0A] px-4 py-3">
                <h3 className="text-white text-[18px] leading-[22px] font-medium">The Cycle Widget</h3>
                <p className="text-white/60 text-[12px] leading-[14px] font-normal mt-1.5">
                    Forward Probability Based Market Regime Analysis
                </p>
            </div>

            <div className="p-3 sm:p-4">
                {/* 2x2 grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 flex-1">
                    {CYCLE_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className="bg-[#FFFFFF0D] border border-[#FFFFFF05] p-3.5 flex items-start flex-col gap-3 "
                        >
                            <div className="w-10 h-10 rounded-[9.14px] bg-[#FFFFFF0D] flex items-center justify-center flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-white/60 text-[12px] leading-[14px] font-normal">{item.label}</p>
                                <p className={`text-[16px] font-semibold leading-[19px] mt-1 ${item.valueColor}`}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-2.5 sm:mt-4 bg-[#FFFFFF0D] border border-[#FFFFFF05] p-3.5 flex items-start h-fit flex-col gap-3">
                    <div>
                        <p className="text-white/60 text-[12px] leading-[14px] font-normal">title</p>
                        <p className='text-[16px] font-semibold leading-[19px] mt-1'>descr</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-2.5 sm:mt-4 flex items-center justify-between bg-[#FFFFFF0D] border border-[#FFFFFF05] p-3">
                    <span className="text-white/60 text-[12px] leading-[14px] font-normal flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.0026 14.6663C11.6845 14.6663 14.6693 11.6816 14.6693 7.99967C14.6693 4.31778 11.6845 1.33301 8.0026 1.33301C4.32071 1.33301 1.33594 4.31778 1.33594 7.99967C1.33594 11.6816 4.32071 14.6663 8.0026 14.6663Z" stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 10.6667V8" stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 5.33398H8.00583" stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Forward Probability Model
                    </span>
                    <span className="text-white text-[14px] leading-[17px] font-normal">Updated: UTC</span>
                </div>
            </div>
        </div>
    )
}
