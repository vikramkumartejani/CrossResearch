import Image from 'next/image'

function TagDot() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
            <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
            <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
        </svg>
    )
}

const InstitutionalFund = () => {
    return (
        <div className='px-4 sm:px-6 pt-[26px] pb-16 lg:pb-24 xl:pb-[170px] relative z-10'>
            <div className='relative max-w-[1560px] mx-auto bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] xl:rounded-[80px] overflow-hidden'>
                {/* Concentric circles SVG - right bottom */}
                <div aria-hidden="true" className="absolute bottom-0 right-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <svg width="510" height="371" className='w-[510px] h-[250px] sm:h-[371px]' viewBox="0 0 510 371" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="359.5" cy="359.5" r="359.5" fill="white" fillOpacity="0.03" />
                        <circle cx="359.5" cy="359.5" r="359" stroke="white" strokeOpacity="0.05" />
                        <circle cx="359.5" cy="359.5" r="323.5" fill="white" fillOpacity="0.03" />
                        <circle cx="359.5" cy="359.5" r="323" stroke="white" strokeOpacity="0.05" />
                        <circle cx="370.5" cy="397.5" r="312.5" fill="white" fillOpacity="0.03" />
                        <circle cx="370.5" cy="397.5" r="312" stroke="white" strokeOpacity="0.05" />
                    </svg>
                </div>

                {/* Content - left side */}
                <div className="relative z-20 p-6 sm:pl-12 lg:pl-[65px] pt-8 sm:pt-14 lg:pt-[154.21px] pb-0 lg:pb-[167.81px] max-w-[630px]">
                    {/* Badge */}
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <TagDot />
                        Institutional Fund
                    </div>

                    {/* Heading */}
                    <h2 className="text-white text-[28px] sm:text-[40px] lg:text-[54px] font-normal leading-tight lg:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Discretionary<br />Institutional Fund
                    </h2>

                    {/* Description */}
                    <p className="text-white/80 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[30px] font-semibold my-5 sm:my-7 max-w-[700px]">
                        Sophisticated quantitative strategy suite for high-net-worth and institutional clients demanding the highest level of systematic precision
                    </p>

                    {/* Sub-label */}
                    <p className="text-white/80 text-[14px] sm:text-[20px] leading-5 sm:leading-[30px] font-semibold">
                        Primarily for HNW &amp; Institutional Clients
                    </p>
                </div>

                <div className="flex justify-center items-start relative lg:absolute lg:-top-18 lg:right-4 pointer-events-none overflow-hidden h-[360px] lg:h-auto lg:overflow-visible" style={{ zIndex: 1 }}>
                    <Image
                        src="/assets/two-men.png"
                        alt=""
                        width={700}
                        height={820}
                        className="object-cover object-top w-full max-w-[380px] lg:max-w-none lg:w-[700px] lg:object-contain lg:object-bottom h-full lg:h-auto"
                        aria-hidden="true"
                    />
                </div>

                {/* Shadow Top Left */}
                {/* card-dot-img overlay */}
                <div className='w-[220px] sm:w-[360px] h-[250px] lg:h-[400px] absolute top-0 left-0 z-20'>
                    <div
                        className="absolute inset-0 opacity-20 bg-[url('/assets/dots.svg')] bg-cover"
                    />
                </div>

                {/* Ellipse 1 - blue glow */}
                <div aria-hidden="true" className="absolute pointer-events-none left-[-60px] sm:left-[-20px] top-[-180px] sm:top-[-80px]" style={{
                    width: '167.78px', height: '263.04px',
                    background: '#6DB7FF',
                    filter: 'blur(60.45px)',
                    transform: 'rotate(-56.09deg)',
                    zIndex: 1,
                }} />
                {/* Ellipse 2 - plus-lighter glow */}
                <div aria-hidden="true" className="absolute pointer-events-none sm:block hidden" style={{
                    width: '121.08px', height: '258.97px',
                    left: '-2px', top: '-95px',
                    background: '#6294FF',
                    mixBlendMode: 'plus-lighter',
                    filter: 'blur(147.57px)',
                    transform: 'rotate(-56.09deg)',
                    zIndex: 1,
                }} />
                {/* Ellipse 3 - dark overlay glow */}
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '112.92px', height: '251.43px',
                    left: '-16px', top: '-67px',
                    background: '#0F4274',
                    mixBlendMode: 'plus-lighter',
                    filter: 'blur(147.57px)',
                    transform: 'rotate(-56.09deg)',
                    zIndex: 1,
                }} />
            </div>
        </div>
    )
}

export default InstitutionalFund
