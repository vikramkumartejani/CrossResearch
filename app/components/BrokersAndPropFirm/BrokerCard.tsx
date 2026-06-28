import Image from 'next/image';
import Link from 'next/link';

export interface BrokerCardData {
    id: string;
    name: string;
    logo: string;
    rating: number;
    minDeposit: string;
    leverage: string;
    spread: string;
    ctaLink: string;
    mostPopular?: boolean;
}

interface BrokerCardProps {
    broker: BrokerCardData;
}

function StarRating({ rating }: { rating: number }) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
            {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} type="full" />)}
            {half && <Star key="h" type="half" />}
            {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} type="empty" />)}
        </div>
    );
}

function Star({ type }: { type: 'full' | 'half' | 'empty' }) {
    const fill = type === 'empty' ? '#4B5563' : '#FDAC17';
    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2391 0.690968C11.5385 -0.230343 12.8419 -0.230344 13.1412 0.690967L15.3334 7.43768C15.4673 7.8497 15.8512 8.12866 16.2844 8.12866H23.3783C24.3471 8.12866 24.7498 9.36828 23.9661 9.93768L18.227 14.1074C17.8766 14.362 17.7299 14.8134 17.8638 15.2254L20.0559 21.9721C20.3553 22.8934 19.3008 23.6596 18.5171 23.0902L12.778 18.9205C12.4275 18.6658 11.9529 18.6658 11.6024 18.9205L5.86331 23.0902C5.07959 23.6596 4.02511 22.8934 4.32446 21.9721L6.5166 15.2254C6.65048 14.8134 6.50382 14.362 6.15333 14.1074L0.414236 9.93768C-0.369477 9.36828 0.0332973 8.12866 1.00202 8.12866H8.09593C8.52916 8.12866 8.91312 7.8497 9.04699 7.43768L11.2391 0.690968Z" fill={fill} />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 16C3 8.82 8.82 3 16 3C23.18 3 29 8.82 29 16C29 23.18 23.18 29 16 29C8.82 29 3 23.18 3 16ZM20.8133 13.5813C20.8933 13.4747 20.9512 13.3532 20.9836 13.2239C21.0159 13.0946 21.0221 12.9602 21.0018 12.8285C20.9815 12.6968 20.935 12.5704 20.8651 12.4569C20.7953 12.3434 20.7034 12.245 20.595 12.1675C20.4866 12.09 20.3638 12.035 20.2337 12.0056C20.1037 11.9763 19.9692 11.9732 19.838 11.9966C19.7068 12.02 19.5816 12.0694 19.4697 12.1419C19.3579 12.2144 19.2616 12.3085 19.1867 12.4187L14.872 18.4587L12.7067 16.2933C12.5171 16.1167 12.2664 16.0205 12.0073 16.0251C11.7482 16.0297 11.5011 16.1346 11.3178 16.3178C11.1346 16.5011 11.0297 16.7482 11.0251 17.0073C11.0205 17.2664 11.1167 17.5171 11.2933 17.7067L14.2933 20.7067C14.396 20.8092 14.5197 20.8882 14.656 20.9382C14.7922 20.9881 14.9377 21.0078 15.0824 20.9959C15.227 20.984 15.3673 20.9407 15.4935 20.8691C15.6197 20.7975 15.7289 20.6993 15.8133 20.5813L20.8133 13.5813Z" fill="white" />
        </svg>
    );
}

export default function BrokerCard({ broker }: BrokerCardProps) {
    const { name, logo, rating, minDeposit, leverage, spread, ctaLink, mostPopular } = broker;

    return (
        <div className="relative flex flex-col bg-[#FFFFFF08] border border-[#FFFFFF0D] rounded-[50px] gap-5">
            {/* Header — logo + name + rating */}
            <div className="flex items-start justify-between gap-3 pt-10 px-10 pb-[50px] border-b border-[#FFFFFF1A]">
                <div className="flex items-center gap-[38px]">
                    {/* Logo */}
                    <div className="w-[100px] h-[100px] rounded-[20px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image src={logo} alt={name} width={100} height={100} className="object-contain" unoptimized />
                    </div>

                    {/* Name + numeric rating */}
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
                        { label: 'Min Deposit : ', value: minDeposit },
                        { label: 'Leverage : ', value: leverage },
                        { label: 'Spread : ', value: spread },
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
                    Start Trading
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M11.25 16.25L17.5 10L11.25 3.75M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
