import Image from 'next/image'
import Link from 'next/link'

interface Advisor {
    id: string
    role: string
    name: string
    description: string
    image: string
}

const ADVISORS: Advisor[] = [
    {
        id: 'sara',
        role: 'Markets Advisor',
        name: 'Sara Petrov',
        description: '20+ years in fixed-income and derivatives. Advises on macro coverage, broker partnerships and the institutional data licensing roadmap.',
        image: '/assets/sara-petrov.png',
    },
    {
        id: 'adrian',
        role: 'Product Advisor',
        name: 'Adrian Kim',
        description: '20+ years in fixed-income and derivatives. Advises on macro coverage, broker partnerships and the institutional data licensing roadmap.',
        image: '/assets/adrian-kim.png',
    },
]

const Advisory = () => {
    return (
        <div className='px-4 sm:px-6'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Heading */}
                <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                    Advisory
                </h2>

                {/* Top row — advisor cards */}
                <div className="mt-8 sm:mt-10 lg:mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    {ADVISORS.map((advisor) => (
                        <div
                            key={advisor.id}
                            className="bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 overflow-hidden flex flex-col"
                        >
                            {/* Photo */}
                            <div className="w-full h-[280px] sm:h-[376px] rounded-[24px] overflow-hidden">
                                <Image
                                    src={advisor.image}
                                    alt={advisor.name}
                                    width={700}
                                    height={525}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            {/* Info */}
                            <div className="pt-6 sm:pt-8 flex flex-col">
                                <span className="text-[#88C4FF] text-[14px] font-medium leading-[21px] mb-2">
                                    {advisor.role}
                                </span>
                                <h3 className="text-white text-[22px] sm:text-[32px] font-medium leading-7 sm:leading-[42px]">
                                    {advisor.name}
                                </h3>
                                <p className="text-white/60 text-[14px] leading-[21px] font-normal mt-3 sm:mt-4 max-w-[610px]">
                                    {advisor.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom row — CTA cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Card 1 — Explore platform */}
                    <div className="bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col">
                        <span className="text-[#88C4FF] text-[14px] font-medium leading-[21px] mb-2">
                            Trading Intelligence
                        </span>
                        <h3 className="text-white text-[22px] sm:text-[32px] font-medium leading-7 sm:leading-[42px] mb-3 sm:mb-4">
                            Explore the platform
                        </h3>
                        <p className="text-white/60 text-[14px] leading-[21px] font-normal max-w-[450px]">
                            See how our algos, modules and data come together into one workflow built for serious traders.
                        </p>
                        <div className="mt-[21px]">
                            <Link
                                href="/algo"
                                className="inline-flex items-center gap-2 bg-[#FFFFFF0D] text-white text-[16px] leading-[21px] font-medium px-8 h-[46px] sm:h-[53.3px] rounded-full hover:bg-[#FFFFFF18] transition-colors"
                            >
                                Explore Features
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 — Join community */}
                    <div className="bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col">
                        <span className="text-[#88C4FF] text-[14px] font-medium leading-[21px] mb-2">
                            Trader Community
                        </span>
                        <h3 className="text-white text-[22px] sm:text-[32px] font-medium leading-7 sm:leading-[42px] mb-3 sm:mb-4">
                            Join the community
                        </h3>
                        <p className="text-white/60 text-[14px] leading-[21px] font-normal max-w-[450px]">
                            Thousands of traders sharpening their edge together — daily research, live calls and direct access to the team.
                        </p>
                        <div className="mt-[21px]">
                            <Link
                                href="/algo"
                                className="inline-flex items-center gap-2 bg-[#FFFFFF0D] text-white text-[16px] leading-[21px] font-medium px-8 h-[46px] sm:h-[53.3px] rounded-full hover:bg-[#FFFFFF18] transition-colors"
                            >
                                Join Discord
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Advisory
