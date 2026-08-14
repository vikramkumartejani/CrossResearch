import React from 'react'

interface WhoThisIsForCard {
    id: string
    icon: React.ReactNode
    title: string
    description: string
    hasGlow: boolean
}

const CARDS: WhoThisIsForCard[] = [
    {
        id: 'gdp',
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.37988 18.7499C4.01909 10.129 11.2161 3.33325 20.0004 3.33325C18.6156 3.33325 17.3827 3.94027 16.3684 4.86846C15.3592 5.79201 14.5063 7.08121 13.8165 8.60517C13.1227 10.1381 12.5837 11.9311 12.2189 13.8768C11.9265 15.4365 11.7485 17.0808 11.6892 18.7499H3.37988ZM3.37988 21.2499H11.6892C11.7485 22.9191 11.9265 24.5633 12.2189 26.1231C12.5837 28.0688 13.1227 29.8617 13.8165 31.3947C14.5063 32.9186 15.3592 34.2078 16.3684 35.1314C17.3827 36.0596 18.6156 36.6666 20.0004 36.6666C11.2161 36.6666 4.01909 29.8708 3.37988 21.2499Z" fill="white" />
                <path d="M20.0004 5.65883C19.542 5.65883 18.9499 5.85386 18.2614 6.48395C17.5678 7.11869 16.8734 8.1135 16.2599 9.46887C15.6505 10.8153 15.1556 12.4406 14.8151 14.2569C14.5469 15.6873 14.3806 17.2036 14.3222 18.7499H25.6786C25.6202 17.2036 25.4538 15.6873 25.1857 14.2569C24.8451 12.4406 24.3503 10.8153 23.7409 9.46887C23.1274 8.1135 22.433 7.11869 21.7394 6.48395C21.0509 5.85386 20.4587 5.65883 20.0004 5.65883Z" fill="white" />
                <path d="M14.8151 25.7429C15.1556 27.5592 15.6505 29.1846 16.2599 30.531C16.8734 31.8863 17.5678 32.8811 18.2614 33.5159C18.9499 34.146 19.542 34.341 20.0004 34.341C20.4587 34.341 21.0508 34.146 21.7394 33.5159C22.433 32.8811 23.1274 31.8863 23.7409 30.531C24.3503 29.1846 24.8451 27.5592 25.1857 25.7429C25.4538 24.3126 25.6202 22.7963 25.6786 21.2499H14.3222C14.3806 22.7963 14.5469 24.3126 14.8151 25.7429Z" fill="white" />
                <path d="M20.0004 3.33325C21.3851 3.33325 22.6181 3.94027 23.6324 4.86847C24.6416 5.79201 25.4944 7.08121 26.1842 8.60518C26.8781 10.1381 27.417 11.9311 27.7818 13.8768C28.0743 15.4365 28.2522 17.0808 28.3115 18.7499H36.6209C35.9817 10.129 28.7846 3.33325 20.0004 3.33325Z" fill="white" />
                <path d="M27.7818 26.1231C27.417 28.0688 26.8781 29.8617 26.1842 31.3947C25.4944 32.9186 24.6416 34.2078 23.6324 35.1314C22.6181 36.0596 21.3851 36.6666 20.0004 36.6666C28.7846 36.6666 35.9817 29.8708 36.6209 21.2499H28.3115C28.2522 22.9191 28.0743 24.5633 27.7818 26.1231Z" fill="white" />
            </svg>
        ),
        title: 'Trading Influencers',
        description: 'You’ve built trust. Give traders institutional tools and edge.',
        hasGlow: false,
    },
    {
        id: 'nfp',
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.33301 2.08325C2.64265 2.08325 2.08301 2.6429 2.08301 3.33325C2.08301 4.02361 2.64265 4.58325 3.33301 4.58325H6.66634V17.4999C6.66634 22.6068 6.66634 25.1602 8.34002 26.7467C10.0137 28.3333 12.7074 28.3333 18.0949 28.3333H18.7497V34.2274L16.1073 35.5485C15.4899 35.8573 15.2396 36.6081 15.5483 37.2256C15.857 37.8431 16.6079 38.0934 17.2254 37.7846L19.9997 36.3975L22.774 37.7846C23.3915 38.0934 24.1423 37.8431 24.451 37.2256C24.7598 36.6081 24.5095 35.8573 23.892 35.5485L21.2497 34.2274V28.3333H21.9044C27.2919 28.3333 29.9857 28.3333 31.6593 26.7467C33.333 25.1602 33.333 22.6068 33.333 17.4999V4.58325H36.6663C37.3567 4.58325 37.9163 4.02361 37.9163 3.33325C37.9163 2.6429 37.3567 2.08325 36.6663 2.08325H3.33301ZM25.8836 13.2827C26.3717 13.7709 26.3717 14.5623 25.8836 15.0505L23.6881 17.2459C23.4465 17.4877 23.1852 17.7492 22.9349 17.9402C22.6417 18.1639 22.2221 18.4047 21.6663 18.4047C21.1106 18.4047 20.691 18.1639 20.3978 17.9402C20.1475 17.7492 19.8862 17.4877 19.6445 17.2459L18.6276 16.229C18.5109 16.1122 18.4162 16.0176 18.333 15.9371C18.2498 16.0176 18.1551 16.1122 18.0384 16.229L15.8836 18.3838C15.3954 18.872 14.6039 18.872 14.1158 18.3838C13.6276 17.8956 13.6276 17.1042 14.1158 16.616L16.3112 14.4206C16.5528 14.1788 16.8141 13.9173 17.0644 13.7263C17.3576 13.5026 17.7772 13.2618 18.333 13.2618C18.8888 13.2618 19.3084 13.5026 19.6016 13.7263C19.8519 13.9173 20.1131 14.1787 20.3547 14.4205L21.3717 15.4375C21.4885 15.5543 21.5832 15.6489 21.6663 15.7294C21.7495 15.6489 21.8442 15.5543 21.961 15.4375L24.1158 13.2827C24.6039 12.7945 25.3954 12.7945 25.8836 13.2827Z" fill="white" />
            </svg>
        ),
        title: 'Introducing Brokers & Community Leaders',
        description: 'Differentiate your community with branded tools, exclusive research, market data, and TradingView integrations.',
        hasGlow: true,
    },
    {
        id: 'central-bank',
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.66699 8.33333V31.6667C6.66699 34.4281 8.90557 36.6667 11.667 36.6667H28.3337C31.0951 36.6667 33.3337 34.4281 33.3337 31.6667V15C33.3337 12.2386 31.0951 10 28.3337 10H8.33366C7.41318 10 6.66699 9.25381 6.66699 8.33333ZM12.0837 20C12.0837 19.3096 12.6433 18.75 13.3337 18.75H26.667C27.3573 18.75 27.917 19.3096 27.917 20C27.917 20.6904 27.3573 21.25 26.667 21.25H13.3337C12.6433 21.25 12.0837 20.6904 12.0837 20ZM12.0837 25.8333C12.0837 25.143 12.6433 24.5833 13.3337 24.5833H22.5003C23.1907 24.5833 23.7503 25.143 23.7503 25.8333C23.7503 26.5237 23.1907 27.0833 22.5003 27.0833H13.3337C12.6433 27.0833 12.0837 26.5237 12.0837 25.8333Z" fill="white" />
                <path d="M7.3483 6.81183C7.9291 7.07231 8.33366 7.65558 8.33366 8.33333H28.3337C28.9092 8.33333 29.4676 8.40626 30.0003 8.54336V7.17673C30.0003 5.14824 28.2037 3.59003 26.1956 3.8769L8.19965 6.44775C7.87886 6.49358 7.58817 6.6229 7.3483 6.81183Z" fill="white" />
            </svg>
        ),
        title: 'Brokerages & Institutions',
        description: 'Deliver our institutional tools and services at scale for your clients with tailored partnership solutions.',
        hasGlow: false,
    }
]
const WhoThisIsFor = () => {
    return (
        <div className='px-4 sm:px-6 pb-11'>
            <div className='max-w-[1560px] mx-auto'>
                <div className="flex flex-col items-center text-center mb-10 lg:mb-16 xl:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                        </svg>
                        Who This Is For
                    </div>
                    <h2 className="font-normal text-[28px] sm:text-[40px] lg:text-[54px] leading-tight lg:leading-[70px] mb-4 sm:mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Made for people with real  <br className='lg:block hidden' /> influence shaping powerful communities
                    </h2>
                    <p className="text-white/60 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[32px] font-normal font-inter max-w-[740px]">
                        We avoid generic affiliate links and create custom programs tailored to your audience’s needs every community trades differently
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="group bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[20px] sm:rounded-[30px] py-6 md:py-10 lg:py-[60px] px-6 sm:px-8 flex flex-col items-center text-center justify-center gap-5 relative overflow-hidden"
                        >
                            {/* Right-top glow - shows on hover */}
                            <div aria-hidden="true" className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ width: '79.21px', height: '124.18px', right: '0px', top: '-40px', background: '#6DB7FF', filter: 'blur(24.76px)', transform: 'rotate(-56.09deg)', zIndex: 0 }} />
                            <div aria-hidden="true" className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ width: '57.16px', height: '122.26px', right: '-14px', top: '-42px', background: '#6294FF', mixBlendMode: 'plus-lighter', filter: 'blur(69.67px)', transform: 'rotate(-56.09deg)', zIndex: 0 }} />
                            <div aria-hidden="true" className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ width: '53.31px', height: '118.7px', right: '-7px', top: '-29px', background: '#0F4274', mixBlendMode: 'plus-lighter', filter: 'blur(69.67px)', transform: 'rotate(-56.09deg)', zIndex: 0 }} />
                            <div className='w-[180px] h-[130px] absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <div
                                    className="absolute inset-0 opacity-20 bg-[url('/assets/dots.svg')] bg-cover"
                                />
                            </div>

                            {/* Badge */}
                            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-[22.5px] bg-[#FFFFFF0D] flex items-center justify-center">
                                {card.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-white text-[20px] sm:text-[26px] font-medium leading-6 sm:leading-[31px] mb-3 sm:max-w-[376px] mx-auto">
                                    {card.title}
                                </h3>
                                <p className="text-white/60 text-[15px] sm:text-[20px] leading-[22px] sm:leading-[30px] xl:px-2">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WhoThisIsFor