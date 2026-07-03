import React from 'react'

function TagDot() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    );
}

const STRATEGIES = [
    {
        id: 'momentum',
        icon: (
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.9217 25.8827C40.1916 24.6312 40.3337 23.3322 40.3337 22.0001C40.3337 19.9442 39.9952 17.9673 39.3711 16.1222L38.4052 16.0529L38.4031 16.0528L38.3855 16.0518C38.3669 16.0508 38.3353 16.0492 38.2913 16.0477C38.2033 16.0446 38.0657 16.0414 37.8829 16.0422C37.5172 16.0438 36.9715 16.0613 36.2811 16.127C34.8993 16.2584 32.9451 16.5823 30.696 17.3533C30.2135 17.5187 29.6633 17.8161 28.9394 18.2437C28.7942 18.3295 28.6425 18.4202 28.4847 18.5146C27.894 18.8678 27.2183 19.2719 26.4901 19.6524C24.6018 20.6391 22.2318 21.542 19.1349 21.542C14.7018 21.542 11.0562 20.0685 8.5367 18.6151C7.27454 17.887 6.28388 17.1578 5.60395 16.606C5.26357 16.3298 4.99982 16.097 4.8176 15.9297C4.78433 15.8991 4.75376 15.8707 4.72592 15.8447C4.04031 17.7686 3.66699 19.8407 3.66699 22.0001C3.66699 22.7891 3.71684 23.5665 3.81355 24.3293L4.51779 24.294L4.52253 24.2937L4.53718 24.2931L4.58684 24.2911C4.62887 24.2895 4.68856 24.2875 4.76487 24.2857C4.91745 24.2821 5.13662 24.279 5.41384 24.2806C5.96794 24.2838 6.75589 24.3058 7.70899 24.3804C9.6099 24.5293 12.1949 24.8893 14.902 25.741C15.7282 26.0009 16.5499 26.4255 17.3349 26.8511C17.5174 26.9501 17.6993 27.0498 17.8818 27.15C18.5168 27.4984 19.1608 27.8516 19.8746 28.1939C21.671 29.0554 23.8064 29.7921 26.6005 29.7921C29.1353 29.7921 31.4803 29.1607 33.5715 28.3879C34.618 28.0011 35.5851 27.5852 36.4874 27.1971L36.521 27.1826C37.391 26.8084 38.2373 26.4443 38.9821 26.196L39.9217 25.8827Z" fill="white" />
                <path d="M38.8778 29.1718C38.4861 29.3313 38.0542 29.5168 37.5741 29.7233L37.5554 29.7313C36.664 30.1147 35.6406 30.555 34.5248 30.9673C32.2756 31.7986 29.5874 32.5421 26.6005 32.5421C23.2763 32.5421 20.7289 31.6534 18.6855 30.6736C17.8968 30.2953 17.1668 29.8947 16.5235 29.5417C16.3508 29.4469 16.1838 29.3552 16.0242 29.2687C15.237 28.8419 14.6232 28.5362 14.0767 28.3642C11.6242 27.5926 9.25636 27.26 7.49434 27.1221C6.61598 27.0533 5.89494 27.0334 5.39792 27.0305C5.14958 27.0291 4.95766 27.0319 4.83054 27.0349C4.76699 27.0365 4.71968 27.038 4.68966 27.0392L4.65775 27.0404L4.65259 27.0407L4.37264 27.0547C6.56704 34.7218 13.6283 40.3334 22.0003 40.3334C29.5805 40.3334 36.0863 35.733 38.8778 29.1718Z" fill="white" />
                <path d="M4.96793 15.2039C5.09963 15.0744 5.27006 14.907 5.49062 14.6905L4.96793 15.2039C4.96801 15.2037 4.96786 15.2041 4.96793 15.2039Z" fill="white" />
                <path d="M5.93463 13.161L6.47947 13.7161L6.48524 13.7218L6.51958 13.7555C6.55252 13.7874 6.6054 13.8378 6.6776 13.9041C6.82209 14.0368 7.04349 14.2326 7.33684 14.4707C7.92437 14.9475 8.79553 15.5897 9.91082 16.2331C12.1462 17.5226 15.3181 18.792 19.1349 18.792C21.6532 18.792 23.5811 18.0696 25.2166 17.215C25.8676 16.8749 26.4538 16.5245 27.0361 16.1764C27.2041 16.076 27.3718 15.9758 27.5407 15.876C28.2598 15.4512 29.0269 15.0184 29.8042 14.7519C32.2904 13.8996 34.4612 13.5377 36.0206 13.3893C36.8008 13.3151 37.4298 13.2941 37.871 13.2922C37.9696 13.2918 38.0588 13.2923 38.1383 13.2934C35.039 7.56089 28.9744 3.66675 22.0003 3.66675C15.08 3.66675 9.05531 7.50101 5.93463 13.161Z" fill="white" />
                <path d="M38.5421 14.0857L38.5003 14.6781C38.5172 14.4429 38.5306 14.247 38.5421 14.0857C38.5422 14.0861 38.5419 14.0853 38.5421 14.0857Z" fill="white" />
            </svg>
        ),
        name: 'Momentum Fund',
        description: 'Designed to capture sustained directional moves across assets, performing best in confirmed trends with disciplined regime-filtered exposure',
        tag: 'Trending Markets',
        active: false,
    },
    {
        id: 'longonly',
        icon: (
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.0003 40.3334C32.1255 40.3334 40.3337 32.1253 40.3337 22.0001C40.3337 11.8749 32.1255 3.66675 22.0003 3.66675C11.8751 3.66675 3.66699 11.8749 3.66699 22.0001C3.66699 32.1253 11.8751 40.3334 22.0003 40.3334ZM19.9126 17.1662L19.6723 17.5973C19.4084 18.0708 19.2764 18.3076 19.0706 18.4638C18.8648 18.62 18.6086 18.678 18.096 18.794L17.6293 18.8996C15.8256 19.3077 14.9237 19.5118 14.7091 20.2018C14.4945 20.8918 15.1094 21.6107 16.3391 23.0487L16.6572 23.4207C17.0066 23.8293 17.1814 24.0336 17.26 24.2864C17.3386 24.5392 17.3121 24.8118 17.2593 25.357L17.2112 25.8533C17.0253 27.7719 16.9323 28.7311 17.4941 29.1576C18.0559 29.584 18.9003 29.1952 20.5891 28.4176L21.0261 28.2164C21.506 27.9955 21.746 27.885 22.0003 27.885C22.2547 27.885 22.4946 27.9955 22.9746 28.2164L23.4115 28.4176C25.1004 29.1952 25.9448 29.584 26.5066 29.1576C27.0683 28.7311 26.9753 27.7719 26.7894 25.8533L26.7413 25.357C26.6885 24.8118 26.6621 24.5392 26.7407 24.2864C26.8193 24.0336 26.994 23.8293 27.3435 23.4207L27.6616 23.0487C28.8913 21.6107 29.5061 20.8918 29.2916 20.2018C29.077 19.5117 28.1751 19.3077 26.3713 18.8996L25.9047 18.794C25.3921 18.678 25.1358 18.62 24.93 18.4638C24.7243 18.3076 24.5923 18.0708 24.3283 17.5973L24.088 17.1662C23.1591 15.4999 22.6947 14.6667 22.0003 14.6667C21.306 14.6667 20.8415 15.4999 19.9126 17.1662Z" fill="white" />
            </svg>
        ),
        name: 'Long-Only US Indices Fund',
        description: 'Always invested and adaptive, dynamically adjusting exposure across US indices to outperform S&P 500 on risk-adjusted basis',
        tag: 'Outperform S&P 500',
        active: true,
    },
    {
        id: 'multistrategy',
        icon: (
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0694 5.90272C24.011 5.08454 26.7425 4.88038 28.7558 5.15997C29.7652 5.30013 30.5242 5.5522 31.0308 5.85057C31.528 6.14339 31.7018 6.42724 31.7572 6.6419C31.814 6.86179 31.799 7.21304 31.5004 7.74063C31.1988 8.27359 30.6553 8.89248 29.8455 9.54029C28.2297 10.8328 25.7615 12.0746 22.8207 12.8925C19.8791 13.7107 17.1476 13.9149 15.1343 13.6353C14.125 13.4951 13.3659 13.2431 12.8593 12.9447C12.3621 12.6519 12.1883 12.368 12.1329 12.1533C12.0762 11.9335 12.0911 11.5822 12.3897 11.0546C12.6913 10.5217 13.2348 9.90277 14.0446 9.25496C15.6604 7.96244 18.1286 6.72066 21.0694 5.90272Z" fill="white" />
                <path d="M33.3859 9.86234C32.8948 10.5097 32.271 11.1217 31.5634 11.6877C29.5962 13.2613 26.7712 14.6482 23.5576 15.542C20.3449 16.4355 17.2261 16.7022 14.756 16.3591C13.5236 16.188 12.3826 15.8554 11.4637 15.3143C11.1107 15.1063 10.7795 14.8602 10.4887 14.5736L9.77721 22.6115L10.5927 23.4304C11.2684 24.1089 13.945 26.1258 21.9998 26.1258C30.266 26.1258 32.868 24.0023 33.4584 23.3774L34.3207 22.4645L33.3859 9.86234Z" fill="white" />
                <path d="M9.4498 26.3103L9.47081 26.0729C11.2555 27.3718 14.8665 28.8758 21.9998 28.8758C29.2113 28.8758 32.8227 27.3382 34.5853 26.0315L34.6182 26.4742C34.9027 31.4957 35.045 34.0065 34.13 35.9118C33.4536 37.3202 32.3912 38.4897 31.0765 39.2733C29.2978 40.3334 26.8748 40.3334 22.0288 40.3334C17.1278 40.3334 14.6773 40.3334 12.8884 39.2573C11.5665 38.462 10.5026 37.2761 9.83264 35.8507C8.92603 33.9219 9.10062 31.3847 9.4498 26.3103Z" fill="white" />
            </svg>
        ),
        name: 'Multi-Strategy Fund',
        description: 'Diversified systematic engine across global assets, exploiting mean reversion, spreads, and macro opportunities in currencies and cryptocurrencies',
        tag: 'Outperform S&P 500',
        active: false,
    },
];

const OurStrategies = () => {
    return (
        <div className='px-4 sm:px-6 pt-12 sm:pt-20 lg:pt-[127px] bg-[#FFFFFF03] pb-12 sm:pb-[54.21px]'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 sm:mb-20">
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <TagDot />
                        Our Strategies
                    </div>

                    <h2 className="text-center font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight lg:leading-[70px] mb-6 bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Three funds. One <br className="sm:block hidden" /> disciplined framework.
                    </h2>

                    <p className="text-center text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[614px] mx-auto">
                        Each strategy is designed for a distinct market regime, with clearly defined mandates and systematic execution.
                    </p>
                </div>

                {/* Strategy cards */}
                <div className="flex flex-col gap-4">
                    {STRATEGIES.map((s) => (
                        <div
                            key={s.id}
                            className="relative flex items-start md:items-center md:flex-row flex-col justify-between gap-6 bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 lg:p-10 overflow-hidden"
                        >
                            {/* Active card blue glow right */}
                            {s.active && (
                                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                    width: '400px', height: '300px',
                                    right: '-80px', top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(34, 126, 217, 0.45)',
                                    filter: 'blur(80px)',
                                    zIndex: 0,
                                }} />
                            )}

                            {/* Left: icon + text */}
                            <div className="relative z-10 flex md:flex-row flex-col items-start md:items-center gap-6 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF08] border border-[#FFFFFF0D] flex items-center justify-center">
                                    {s.icon}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-white text-[22px] sm:text-[24px] lg:text-[30px] font-semibold leading-9 lg:leading-[48px] mb-3 lg:mb-4">
                                        {s.name}
                                    </h3>
                                    <p className="text-white/70 text-[14px] sm:text-[16px] lg:text-[18px] leading-[20px] sm:leading-6 lg:leading-[29px] font-normal max-w-[720px]">
                                        {s.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right: tag pill */}
                            <div className="w-full sm:w-fit relative z-10 sm:flex-shrink-0">
                                <button className={`w-full sm:w-fit flex items-center justify-center px-6 lg:px-8 h-12 sm:h-[60px] rounded-full font-inter text-[16px] sm:text-[18px] font-medium whitespace-nowrap border transition-colors ${s.active
                                    ? 'bg-white text-black border-[#FFFFFF0D]'
                                    : 'bg-[#FFFFFF08] text-white border-[#FFFFFF0D]'
                                    }`}>
                                    {s.tag}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default OurStrategies