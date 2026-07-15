import Image from 'next/image'

const GREEK_CARDS = [
    {
        symbol: <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="24" fill="white" />
            <rect y="6" width="6" height="14" transform="rotate(-90 0 6)" fill="white" />
        </svg>,
        label: 'NET GEX REGIME',
        title: 'Long Gamma',
        desc: 'SPX and DJIA in positive gamma. NQ approaching flip. Dealers structurally buying dips and selling rallies across 2 of 3 major indices.',
    },
    {
        symbol: <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.16716 20L0 0H4.04734L9.5 16.0571L14.9808 0H19L11.8328 20H7.16716Z" fill="white" />
        </svg>,
        label: 'Vanna Exposure',
        title: 'Squeeze Risk',
        desc: 'As IV drops on Rally Dealers Forced to Buy underlying to Rehedge. Vanna tailwind active in SPX. Potential acceleration if VIX Continues lower 17.',
    },
    {
        symbol: <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.093596 22L6.9885 10.8429L0 0H4.86699L9.67159 7.51143L14.0706 0H18.8128L11.9803 11.0314L19 22H14.133L9.29721 14.3629L4.86699 22H0.093596Z" fill="white" />
        </svg>,
        label: 'Charm Flow',
        title: 'Bearish Into Close',
        desc: 'Delta decay points to mid selling pressure from 3–4 PM EST as dealers rebalance short delta exposure.',
    },
    {
        symbol: <Image src="/assets/term-structure.png" alt="IV Term Structure" width={24} height={24} className="object-contain" style={{ filter: 'invert(1)' }} />,
        label: 'IV Term Structure',
        title: 'Contango',
        desc: 'Front-month VIX below 18.4. Term structure in normal Contango — low stress environment. NO imminent tail risk demand.',
    },
]

export default function GreeksSynthesis() {
    return (
        <div className="mb-4 sm:mb-5">
            {/* Section heading */}
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-3 sm:mb-4">
                Greeks Synthesis • Multi-Asset
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {GREEK_CARDS.map((card) => (
                    <div key={card.label} className="bg-[#16161F] p-3 sm:p-4 flex flex-col">
                        {/* Greek letter + label */}
                        <div className="flex items-center gap-[5px]">
                            <span className="text-white text-[22px] leading-none font-light">{card.symbol}</span>
                            <span className="text-white text-[14px] leading-[17px] font-medium pt-2.5">
                                {card.label}
                            </span>
                        </div>

                        {/* Title + description */}
                        <div className="mt-4 sm:mt-6 xl:pr-6">
                            <p className="text-white text-[18px] leading-[22px] font-medium mb-2">{card.title}</p>
                            <p className="text-[#838388] text-[12px] leading-[17px] font-normal">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
