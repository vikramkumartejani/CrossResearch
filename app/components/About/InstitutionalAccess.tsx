import Image from 'next/image'

interface TeamMember {
    id: string
    role: string
    name: string
    description: string
    image: string
}

const TEAM: TeamMember[] = [
    {
        id: 'marco',
        role: 'Founder & CEO',
        name: 'Marco Conti',
        description: 'Quant trader turned founder. Built CrossResearch after a decade reverse-engineering institutional flow models, now leading product research and growth.',
        image: '/assets/marco-conti-profile.png',
    },
    {
        id: 'elena',
        role: 'Head Of Research',
        name: 'Elena Laurent',
        description: 'Former buy-side analyst with deep expertise in market microstructure. Designs the data pipelines and signal frameworks that power every CrossResearch module.',
        image: '/assets/elena-laurent-profile.png',
    },
    {
        id: 'jonas',
        role: 'Head Of Engineering',
        name: 'Jonas Reyes',
        description: 'Veteran trading-systems engineer. Owns the algo engine, latency-critical infrastructure and the platform powering thousands of daily research sessions.',
        image: '/assets/jonas-reyes-profile.png',
    },
]

const InstitutionalAccess = () => {
    return (
        <div className='px-4 sm:px-6 pb-16 lg:pb-20 xl:pb-[170px]'>
            <div className='max-w-[1560px] mx-auto'>
                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Institutional Access
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-4 sm:gap-6 lg:gap-10 mb-10 lg:mb-16 xl:mb-20">
                    <h2 className="max-w-[672px] text-left font-medium text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[59px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Retail Meets Institutional Intelligence
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal lg:max-w-[400px] xl:max-w-[550px]">
                        Built to deliver institutional-grade tools, research, and data access for serious modern retail traders worldwide.
                    </p>
                </div>

                {/* Team cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {TEAM.map((member) => (
                        <div
                            key={member.id}
                            className="bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 overflow-hidden flex flex-col"
                        >
                            {/* Photo */}
                            <div className="w-full h-[280px] sm:h-[336px] overflow-hidden bg-[#FFFFFF08] border border-[#FFFFFF1A] rounded-[24px]">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={500}
                                    height={336}
                                    className="w-full h-full object-cover object-center rounded-[24px]"
                                />
                            </div>

                            {/* Info */}
                            <div className="pt-6 sm:pt-8 flex flex-col">
                                <span className="text-[#88C4FF] text-[14px] font-medium leading-[21px] mb-2">
                                    {member.role}
                                </span>
                                <h3 className="text-white text-[22px] sm:text-[26px] font-medium leading-7 sm:leading-[34px] mb-3">
                                    {member.name}
                                </h3>
                                <p className="text-white/60 text-[14px] leading-[20px] leading-5 sm:leading-[21px] font-normal">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default InstitutionalAccess
