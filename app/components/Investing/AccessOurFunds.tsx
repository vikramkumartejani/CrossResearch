import Image from "next/image"

const AccessOurFunds = () => {
    return (
        <div className='px-4 sm:px-6 pb-16 lg:pb-24 xl:pb-[170px]'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Access Our Funds
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-20">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Two pathways to <br className='sm:block hidden' /> invest with us
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-inter font-normal max-w-[603px]">
                        We have structured access to make our strategies available regardless of your account size or institutional setup.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* ── Left column ── */}
                    <div className="flex flex-col-reverse lg:flex-col gap-6">
                        {/* Card 1 — Copy Trading */}
                        <div className="bg-[#FFFFFF08] rounded-[30px] sm:rounded-[50px] px-6 sm:px-8 xl:px-10 pt-6 sm:pt-8 xl:pt-10 pb-5 sm:pb-[27px] flex flex-col overflow-hidden">
                            {/* Icon */}
                            <div className="mb-4 w-[60px] h-[60px] rounded-full bg-[#FFFFFF08] border border-[#FFFFFF0D] flex items-center justify-center flex-shrink-0">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.09375 16.8438C3.09375 16.2742 3.55546 15.8125 4.125 15.8125C11.5291 15.8125 17.5312 21.8147 17.5312 29.2188C17.5312 29.7883 17.0695 30.25 16.5 30.25C15.9305 30.25 15.4688 29.7883 15.4688 29.2188C15.4688 22.9538 10.39 17.875 4.125 17.875C3.55546 17.875 3.09375 17.4133 3.09375 16.8438Z" fill="white" />
                                    <path d="M3.09375 20.9688C3.09375 20.3992 3.55546 19.9375 4.125 19.9375C9.25089 19.9375 13.4062 24.0929 13.4062 29.2188C13.4062 29.7883 12.9445 30.25 12.375 30.25C11.8055 30.25 11.3438 29.7883 11.3438 29.2188C11.3438 25.2319 8.11181 22 4.125 22C3.55546 22 3.09375 21.5383 3.09375 20.9688Z" fill="white" />
                                    <path d="M4.125 24.0625C3.55546 24.0625 3.09375 24.5242 3.09375 25.0938C3.09375 25.6633 3.55546 26.125 4.125 26.125C5.83363 26.125 7.21875 27.5101 7.21875 29.2188C7.21875 29.7883 7.68046 30.25 8.25 30.25C8.81954 30.25 9.28125 29.7883 9.28125 29.2188C9.28125 26.371 6.97272 24.0625 4.125 24.0625Z" fill="white" />
                                    <path d="M2.78363 14.0551C3.18941 13.8596 3.64441 13.75 4.125 13.75C12.6682 13.75 19.5938 20.6756 19.5938 29.2188C19.5938 29.5798 19.5319 29.9263 19.4183 30.2485C23.2424 30.2351 25.2966 30.106 26.7451 28.8588C28.3608 27.4675 28.6959 25.1387 29.3661 20.4809L29.7494 17.8171C30.2711 14.1911 30.532 12.3781 29.7889 10.828C29.0457 9.27795 27.464 8.33572 24.3005 6.45125L22.3963 5.31694C19.5236 3.60565 18.0872 2.75 16.5 2.75C14.9128 2.75 13.4764 3.60565 10.6037 5.31695L8.6995 6.45124C5.53602 8.33571 3.95426 9.27795 3.21113 10.828C2.78406 11.7189 2.68858 12.6965 2.78363 14.0551Z" fill="white" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-white text-[20px] sm:text-[26px] font-semibold leading-8 sm:leading-[42px] mb-3">Copy Trading</h3>
                                <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] max-w-[549px]">
                                    Access strategies via regulated brokers, connect your account, and replicate trades automatically in real time
                                </p>
                            </div>

                            {/* Mock chart card */}
                            <div className="mt-4 sm:mt-2.5">
                                <Image src='/assets/copy-trading.svg' alt="copy-trading" width={686} height={273} draggable="false" />
                            </div>
                        </div>

                        {/* Card 2 — PAMM / MAMM */}
                        <div className="bg-[#FFFFFF08] rounded-[30px] sm:rounded-[50px] p-6 sm:p-8 xl:p-10 flex flex-col gap-4 sm:gap-6">
                            {/* Icon */}
                            <div className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF08] flex items-center justify-center flex-shrink-0">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5312 4.125C17.5312 3.55546 17.0695 3.09375 16.5 3.09375C15.9305 3.09375 15.4688 3.55546 15.4688 4.125V6.875C15.4688 7.44454 15.9305 7.90625 16.5 7.90625C17.0695 7.90625 17.5312 7.44454 17.5312 6.875V4.125Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.2812 16.5777C31.2813 19.1046 31.2813 21.1061 31.0707 22.6725C30.854 24.2846 30.3973 25.5894 29.3683 26.6184C28.3393 27.6474 27.0345 28.1041 25.4224 28.3208C23.856 28.5314 21.8545 28.5314 19.3277 28.5314H13.6723C11.1454 28.5314 9.14398 28.5314 7.5776 28.3208C5.96552 28.1041 4.66071 27.6474 3.63171 26.6184C2.60271 25.5894 2.14605 24.2846 1.92931 22.6725C1.71871 21.1061 1.71873 19.1046 1.71875 16.5777L1.71875 16.1872C1.71878 15.8852 1.7189 15.5909 1.71949 15.3041C1.72057 14.7766 1.72324 14.2745 1.72984 13.7967C1.74833 12.4558 1.79769 11.3068 1.92931 10.3278C2.14605 8.71576 2.60271 7.41095 3.63171 6.38195C4.66071 5.35296 5.96552 4.8963 7.5776 4.67956C8.5627 4.54711 9.71987 4.49797 11.0716 4.47974C11.2988 4.47668 11.6527 4.47441 12.0293 4.47276C12.7894 4.46943 13.4063 5.08576 13.4063 5.84588V6.87511C13.4063 8.58374 14.7914 9.96886 16.5 9.96886C18.2086 9.96886 19.5938 8.58374 19.5938 6.87511V5.84414C19.5938 5.08469 20.2098 4.46786 20.9692 4.47145C22.7413 4.47983 24.2118 4.51679 25.4224 4.67956C27.0345 4.8963 28.3393 5.35296 29.3683 6.38195C30.3973 7.41095 30.854 8.71576 31.0707 10.3278C31.2813 11.8942 31.2813 13.8957 31.2812 16.4225V16.5777ZM11 13.4064C10.4305 13.4064 9.96875 13.8681 9.96875 14.4376C9.96875 15.0072 10.4305 15.4689 11 15.4689H22C22.5695 15.4689 23.0313 15.0072 23.0313 14.4376C23.0313 13.8681 22.5695 13.4064 22 13.4064H11ZM11 18.2189C10.4305 18.2189 9.96875 18.6806 9.96875 19.2501C9.96875 19.8197 10.4305 20.2814 11 20.2814H18.5625C19.132 20.2814 19.5938 19.8197 19.5938 19.2501C19.5938 18.6806 19.132 18.2189 18.5625 18.2189H11Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white text-[20px] sm:text-[26px] font-semibold leading-8 sm:leading-[42px] mb-3">PAMM / MAMM Agreement</h3>
                                <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] max-w-[541px]">
                                    Managed allocation via PAMM and MAMM, your capital stays secure while we execute trading mandate professionally
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Right column ── */}
                    <div className="flex flex-col gap-6">
                        {/* Card 3 — Managed Allocation */}
                        <div className="bg-[#FFFFFF08] rounded-[30px] sm:rounded-[50px] p-6 sm:p-8 xl:p-10 flex flex-col gap-4 sm:gap-6 relative overflow-hidden">
                            {/* card-dot-img overlay */}
                            <div className='w-[280px] h-[220px] absolute top-0 right-0 z-10'>
                                <div
                                    className="absolute inset-0 opacity-20 bg-[url('/assets/dots.svg')] bg-cover"
                                />
                            </div>

                            {/* Ellipse 1 — blue glow */}
                            <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                width: '143.67px', height: '225.25px',
                                right: '-30px', top: '-80px',
                                background: '#6DB7FF',
                                filter: 'blur(44.91px)',
                                transform: 'rotate(-56.09deg)',
                                zIndex: 2,
                            }} />
                            {/* Ellipse 2 — plus-lighter glow */}
                            <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                width: '103.68px', height: '221.75px',
                                right: '-5px', top: '-64px',
                                background: '#6294FF',
                                mixBlendMode: 'plus-lighter',
                                filter: 'blur(126.36px)',
                                transform: 'rotate(-56.09deg)',
                                zIndex: 2,
                            }} />
                            {/* Ellipse 3 — dark overlay glow */}
                            <div aria-hidden="true" className="absolute pointer-events-none" style={{
                                width: '96.69px', height: '215.3px',
                                right: '-18px', top: '-30px',
                                background: '#0F4274',
                                mixBlendMode: 'plus-lighter',
                                filter: 'blur(126.36px)',
                                transform: 'rotate(-56.09deg)',
                                zIndex: 2,
                            }} />
                            <div className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF08] flex items-center justify-center flex-shrink-0 relative z-10">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4659 2.75C8.67527 3.2535 3.2535 8.67527 2.75 15.4659H6.84826C7.41939 15.4659 7.88238 15.9289 7.88238 16.5C7.88238 17.0711 7.41939 17.5341 6.84826 17.5341H2.75C3.2535 24.3247 8.67527 29.7465 15.4659 30.25V26.1517C15.4659 25.5806 15.9289 25.1176 16.5 25.1176C17.0711 25.1176 17.5341 25.5806 17.5341 26.1517V30.25C24.3247 29.7465 29.7465 24.3247 30.25 17.5341H26.1517C25.5806 17.5341 25.1176 17.0711 25.1176 16.5C25.1176 15.9289 25.5806 15.4659 26.1517 15.4659H30.25C29.7465 8.67527 24.3247 3.2535 17.5341 2.75V6.84826C17.5341 7.41939 17.0711 7.88238 16.5 7.88238C15.9289 7.88238 15.4659 7.41939 15.4659 6.84826V2.75ZM12.7082 16.5C12.7082 15.9289 13.1712 15.4659 13.7424 15.4659H15.4659V13.7424C15.4659 13.1712 15.9289 12.7082 16.5 12.7082C17.0711 12.7082 17.5341 13.1712 17.5341 13.7424V15.4659H19.2576C19.8288 15.4659 20.2918 15.9289 20.2918 16.5C20.2918 17.0711 19.8288 17.5341 19.2576 17.5341H17.5341V19.2576C17.5341 19.8288 17.0711 20.2918 16.5 20.2918C15.9289 20.2918 15.4659 19.8288 15.4659 19.2576V17.5341H13.7424C13.1712 17.5341 12.7082 17.0711 12.7082 16.5Z" fill="white" />
                                </svg>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-white text-[20px] sm:text-[26px] font-semibold leading-8 sm:leading-[42px] mb-3">Managed Allocation</h3>
                                <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] max-w-[541px]">
                                    Access institutional-grade strategies through structured allocation models designed for disciplined capital deployment.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 — Your Capital Always Yours */}
                        <div className="bg-[#FFFFFF08] rounded-[30px] sm:rounded-[50px] pb-0 px-6 sm:px-8 xl:px-10 pt-6 sm:pt-8 xl:pt-10 flex flex-col max-h-[532px] overflow-hidden">
                            {/* Icon */}
                            <div className="mb-6 w-[60px] h-[60px] rounded-full bg-[#FFFFFF08] border border-[#FFFFFF0D] flex items-center justify-center flex-shrink-0">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.9247 25.4663C28.9972 23.0589 30.25 19.9258 30.25 16.5C30.25 13.0742 28.9972 9.94108 26.9247 7.5337L21.0497 13.4087C21.6494 14.2897 22 15.3539 22 16.5C22 17.6461 21.6494 18.7103 21.0497 19.5913L26.9247 25.4663Z" fill="white" />
                                    <path d="M25.4663 26.9247C23.0589 28.9972 19.9258 30.25 16.5 30.25C13.0742 30.25 9.94108 28.9972 7.5337 26.9247L13.4087 21.0497C14.2897 21.6494 15.3539 22 16.5 22C17.6461 22 18.7103 21.6494 19.5913 21.0497L25.4663 26.9247Z" fill="white" />
                                    <path d="M6.07529 25.4663L11.9503 19.5913C11.3506 18.7103 11 17.6461 11 16.5C11 15.3539 11.3506 14.2897 11.9503 13.4087L6.07529 7.5337C4.00282 9.94108 2.75 13.0742 2.75 16.5C2.75 19.9258 4.00282 23.0589 6.07529 25.4663Z" fill="white" />
                                    <path d="M16.5 11C15.3539 11 14.2897 11.3506 13.4087 11.9503L7.5337 6.07529C9.94108 4.00282 13.0742 2.75 16.5 2.75C19.9258 2.75 23.0589 4.00282 25.4663 6.07529L19.5913 11.9503C18.7103 11.3506 17.6461 11 16.5 11Z" fill="white" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-white text-[20px] sm:text-[26px] font-semibold leading-8 sm:leading-[42px] mb-3 sm:mb-4">Your Capital, Always Yours</h3>
                                <p className="text-white/70 text-[14px] sm:text-[16px] leading-5 sm:leading-[26px] max-w-[549px]">
                                    <b className="text-white">CrossResearch</b> never holds funds; capital stays in your account while we direct trades, never custody assets=
                                </p>
                            </div>

                            {/* Mock chart card */}
                            <div className="mt-4 sm:mt-8">
                                <Image src='/assets/your-capital-always-yours.svg' alt="your-capital-always-yours" width={720} height={300} draggable="false" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AccessOurFunds
