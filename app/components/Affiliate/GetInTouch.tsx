import CustomSelect from '../ui/CustomSelect'

const AUDIENCE_OPTIONS = [
    { value: '0-1k', label: '0 – 1,000' },
    { value: '1k-10k', label: '1,000 – 10,000' },
    { value: '10k-50k', label: '10,000 – 50,000' },
    { value: '50k-100k', label: '50,000 – 100,000' },
    { value: '100k+', label: '100,000+' },
]

const PARTNERSHIP_OPTIONS = [
    { value: 'affiliate', label: 'Affiliate' },
    { value: 'referral', label: 'Referral' },
    { value: 'reseller', label: 'Reseller' },
    { value: 'ambassador', label: 'Brand Ambassador' },
]

const MARKET_OPTIONS = [
    { value: 'forex', label: 'Forex' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'equities', label: 'Equities' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'macro', label: 'Macro' },
]

const GetInTouch = () => {
    return (
        <div className='px-4 sm:px-6'>
            <div className='max-w-[1697px] mx-auto'>
                <div className='flex items-center justify-between gap-6'>
                    {/* Left - Content */}
                    <div className='w-full lg:max-w-[605px]'>
                        <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                            </svg>
                            Get in Touch
                        </div>

                        <h3 className="mb-6 text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[70px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Let's build the perfect
                            package for your community
                        </h3>

                        <p className="text-white/50 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[500px]">
                            Tell us about yourself and your audience. We'll come back to you within 24 hours to schedule a call and explore what we can build together.
                        </p>
                    </div>

                    {/* Right - Form */}
                    <div className='w-full lg:max-w-[1019px] border border-[#FFFFFF0D] bg-[#FFFFFF08] rounded-[40px] sm:rounded-[60px] p-6 sm:p-10'>
                        <div className='bg-[#FFFFFF05] border border-[#FFFFFF1A] rounded-[28px] sm:rounded-[40px] backdrop-blur-[40px] p-6 sm:p-10'>
                            <h2 className='text-white text-[22px] sm:text-[28px] leading-8 sm:leading-9 font-normal mb-2'>Partner Application</h2>
                            <p className='text-white/60 text-[14px] sm:text-[18px] leading-[20px] sm:leading-[23px] font-normal mb-8'>All fields help us prepare a relevant proposal before our call.</p>

                            <form className='flex flex-col gap-4'>
                                {/* Row 1 — Name + Email */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-white text-[16px] font-normal leading-[21px]'>Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="Type your Name"
                                            className='w-full bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[16px] px-5 h-[48px] sm:h-[61px] text-white text-[16px] placeholder:text-white/50 outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-white text-[16px] font-normal leading-[21px]'>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Type Email Address"
                                            className='w-full bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[16px] px-5 h-[48px] sm:h-[61px] text-white text-[16px] placeholder:text-white/50 outline-none'
                                        />
                                    </div>
                                </div>

                                {/* Row 2 — Platform + Audience Size */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-white text-[16px] font-normal leading-[21px]'>Platform / Community</label>
                                        <input
                                            type="text"
                                            placeholder="YouTube, Discord, Telegram..."
                                            className='w-full bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[16px] px-5 h-[48px] sm:h-[61px] text-white text-[16px] placeholder:text-white/50 outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-white text-[16px] font-normal leading-[21px]'>Audience Size</label>
                                        <CustomSelect
                                            options={AUDIENCE_OPTIONS}
                                            placeholder="Select Range"
                                        />
                                    </div>
                                </div>

                                {/* Row 3 — Partnership Type + Primary Market Focus */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-white text-[16px] font-normal leading-[21px]'>Partnership Type</label>
                                        <CustomSelect
                                            options={PARTNERSHIP_OPTIONS}
                                            placeholder="Select Type"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-white text-[16px] font-normal leading-[21px]'>Primary Market Focus</label>
                                        <CustomSelect
                                            options={MARKET_OPTIONS}
                                            placeholder="Select markets"
                                        />
                                    </div>
                                </div>

                                {/* Row 4 — Potential Comments */}
                                <div className='flex flex-col gap-3'>
                                    <label className='text-white text-[16px] font-normal leading-[21px]'>Potential Comments</label>
                                    <textarea
                                        placeholder="What do your followers trade? What tools are they missing? What would make the biggest difference for them?"
                                        rows={5}
                                        className='w-full bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[16px] p-5 h-[48px] sm:h-[194px] resize-none text-white text-[16px] placeholder:text-white/50 outline-none'
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className='w-full bg-white text-[#070711] text-[16px] sm:text-[18px] font-semibold h-[52px] sm:h-[58px] rounded-full hover:bg-white/90 transition-colors cursor-pointer mt-2'
                                >
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch