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
        <div className='px-4 sm:px-6 pt-[26px] pb-[170px]'>
            <div className='relative max-w-[1560px] mx-auto bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[40px] sm:rounded-[60px] lg:rounded-[80px] overflow-hidden'>

                {/* Concentric circles SVG — right bottom */}
                <div aria-hidden="true" className="absolute bottom-0 right-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <svg width="510" height="371" viewBox="0 0 510 371" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="359.5" cy="359.5" r="359.5" fill="white" fillOpacity="0.03"/>
                        <circle cx="359.5" cy="359.5" r="359" stroke="white" strokeOpacity="0.05"/>
                        <circle cx="359.5" cy="359.5" r="323.5" fill="white" fillOpacity="0.03"/>
                        <circle cx="359.5" cy="359.5" r="323" stroke="white" strokeOpacity="0.05"/>
                        <circle cx="370.5" cy="397.5" r="312.5" fill="white" fillOpacity="0.03"/>
                        <circle cx="370.5" cy="397.5" r="312" stroke="white" strokeOpacity="0.05"/>
                    </svg>
                </div>

                {/* Two men image — right side */}
                <div className="absolute -top-18 right-4 pointer-events-none hidden sm:block" style={{ zIndex: 1 }}>
                    <Image
                        src="/assets/two-men.png"
                        alt=""
                        width={700}
                        height={820}
                        className="object-contain object-bottom h-full w-auto"
                        aria-hidden="true"
                    />
                </div>

                {/* Content — left side */}
                <div className="relative z-10 p-8 sm:pl-12 lg:pl-[65px] pt-[154.21px] pb-[173.79px] max-w-[630px]">
                    {/* Badge */}
                    <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                        <TagDot />
                        Institutional Fund
                    </div>

                    {/* Heading */}
                    <h2 className="text-white text-[32px] sm:text-[40px] lg:text-[54px] font-normal leading-tight lg:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Discretionary<br />Institutional Fund
                    </h2>

                    {/* Description */}
                    <p className="text-white/80 text-[14px] sm:text-[20px] leading-[22px] sm:leading-[30px] font-semibold my-7 max-w-[700px]">
                        Sophisticated quantitative strategy suite for high-net-worth and institutional clients demanding the highest level of systematic precision
                    </p>

                    {/* Sub-label */}
                    <p className="text-white/80 text-[14px] sm:text-[20px] leading-[30px] font-semibold">
                        Primarily for HNW &amp; Institutional Clients
                    </p>
                </div>

            </div>
        </div>
    )
}

export default InstitutionalFund
