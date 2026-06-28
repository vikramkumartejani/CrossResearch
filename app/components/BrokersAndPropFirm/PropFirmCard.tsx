import Image from 'next/image';
import Link from 'next/link';

export interface PropFirmCardData {
    id: string;
    name: string;
    logo: string;
    rating: number;
    challengeFee: string;   // e.g. "$99"
    accountSize: string;    // e.g. "$100,000"
    profitSplit: string;    // e.g. "80%"
    ctaLink: string;
    mostPopular?: boolean;
}

function StarRating({ rating }: { rating: number }) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
            {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} fill="#F5A623" />)}
            {half && <Star key="h" fill="#F5A623" half />}
            {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} fill="#4B5563" />)}
        </div>
    );
}

function Star({ fill, half }: { fill: string; half?: boolean }) {
    return (
        <svg width="20" height="20" viewBox="0 0 25 24" fill="none">
            <path
                d="M11.239 0.690724C11.5384 -0.230587 12.8418 -0.230588 13.1411 0.690722L15.3333 7.43743C15.4671 7.84946 15.8511 8.12842 16.2843 8.12842H23.3782C24.347 8.12842 24.7497 9.36803 23.966 9.93743L18.2269 14.1071C17.8764 14.3618 17.7298 14.8131 17.8636 15.2252L20.0558 21.9719C20.3551 22.8932 19.3007 23.6593 18.5169 23.0899L12.7778 18.9202C12.4274 18.6656 11.9528 18.6656 11.6023 18.9202L5.86318 23.0899C5.07947 23.6593 4.02499 22.8932 4.32434 21.9719L6.51648 15.2252C6.65035 14.8131 6.5037 14.3618 6.15321 14.1071L0.414114 9.93743C-0.369599 9.36803 0.0331752 8.12842 1.0019 8.12842H8.09581C8.52904 8.12842 8.91299 7.84946 9.04687 7.43743L11.239 0.690724Z"
                fill={half ? 'url(#half)' : fill}
            />
            {half && (
                <defs>
                    <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="50%" stopColor="#F5A623" />
                        <stop offset="50%" stopColor="#4B5563" />
                    </linearGradient>
                </defs>
            )}
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 16C3 8.82 8.82 3 16 3C23.18 3 29 8.82 29 16C29 23.18 23.18 29 16 29C8.82 29 3 23.18 3 16ZM20.8133 13.5813C20.8933 13.4747 20.9512 13.3532 20.9836 13.2239C21.0159 13.0946 21.0221 12.9602 21.0018 12.8285C20.9815 12.6968 20.935 12.5704 20.8651 12.4569C20.7953 12.3434 20.7034 12.245 20.595 12.1675C20.4866 12.09 20.3638 12.035 20.2337 12.0056C20.1037 11.9763 19.9692 11.9732 19.838 11.9966C19.7068 12.02 19.5816 12.0694 19.4697 12.1419C19.3579 12.2144 19.2616 12.3085 19.1867 12.4187L14.872 18.4587L12.7067 16.2933C12.5171 16.1167 12.2664 16.0205 12.0073 16.0251C11.7482 16.0297 11.5011 16.1346 11.3178 16.3178C11.1346 16.5011 11.0297 16.7482 11.0251 17.0073C11.0205 17.2664 11.1167 17.5171 11.2933 17.7067L14.2933 20.7067C14.396 20.8092 14.5197 20.8882 14.656 20.9382C14.7922 20.9881 14.9377 21.0078 15.0824 20.9959C15.227 20.984 15.3673 20.9407 15.4935 20.8691C15.6197 20.7975 15.7289 20.6993 15.8133 20.5813L20.8133 13.5813Z" fill="white" />
        </svg>
    );
}

export default function PropFirmCard({ firm }: { firm: PropFirmCardData }) {
    const { name, logo, rating, challengeFee, accountSize, profitSplit, ctaLink, mostPopular } = firm;

    return (
        <div className="relative flex flex-col bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[50px] gap-5">



            {/* Header */}
            <div className="flex items-start justify-between gap-3 pt-10 px-10 pb-[50px] border-b border-[#FFFFFF1A]">
                <div className="flex items-center gap-[38px]">
                    <div className="w-[100px] h-[100px] rounded-[20px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image src={logo} alt={name} width={80} height={80} className="object-contain" unoptimized />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-white text-[45px] font-semibold leading-[50px]">{name}</h3>
                            <span className="border border-[#FFFFFF0D] bg-[#FFFFFF08] rounded-[12px] px-[13px] py-2 flex items-center gap-2 text-white text-[16px] leading-[18px] font-semibold">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.38586 0.690968C8.68521 -0.230343 9.98862 -0.230344 10.288 0.690967L11.8066 5.36473C11.9404 5.77675 12.3244 6.05571 12.7576 6.05571H17.6719C18.6406 6.05571 19.0434 7.29533 18.2597 7.86473L14.284 10.7533C13.9335 11.0079 13.7868 11.4593 13.9207 11.8713L15.4393 16.5451C15.7386 17.4664 14.6842 18.2325 13.9004 17.6631L9.9247 14.7746C9.57421 14.5199 9.09962 14.5199 8.74913 14.7746L4.77339 17.6631C3.98968 18.2325 2.9352 17.4664 3.23455 16.5451L4.75314 11.8713C4.88702 11.4593 4.74036 11.0079 4.38987 10.7533L0.414135 7.86473C-0.369579 7.29533 0.0331967 6.05571 1.00192 6.05571H5.9162C6.34943 6.05571 6.73339 5.77675 6.86726 5.36473L8.38586 0.690968Z" fill="#FDAC17" />
                                </svg>
                                {rating}
                            </span>
                        </div>
                        <StarRating rating={rating} />
                    </div>
                </div>

                {/* Most Popular badge */}
                {mostPopular && (
                    <div className="flex items-center justify-center bg-[#88C4FF] border border-dashed border-white text-black text-[14px] leading-[15px] font-semibold px-6 h-[43px] rounded-[60px]">
                        Most Popular
                    </div>
                )}
            </div>

            <div className='pt-8 px-10 pb-10'>
                {/* Stats */}
                <ul className="flex flex-col gap-5 mb-8">
                    {[
                        { label: 'Challenge Fee : ', value: challengeFee },
                        { label: 'Account Size: ', value: accountSize },
                        { label: 'Profit Split : ', value: profitSplit },
                    ].map((row) => (
                        <li key={row.label} className="flex items-center gap-4 text-white text-[20px] leading-[24px]">
                            <CheckIcon />
                            <span className="font-normal">{row.label}<strong className="font-semibold">{row.value}</strong></span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link
                    href={ctaLink}
                    className="mt-auto inline-flex items-center gap-2.5 bg-[#FFFFFF08] text-white text-[20px] leading-6 font-semibold px-4.5 h-[52px] rounded-[16px] w-fit hover:bg-white hover:text-black transition-colors duration-200"
                >
                    Start Challenge
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
