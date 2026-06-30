import Image from 'next/image';
import Link from 'next/link';
import type { Post } from './blogData';

interface SidebarCardProps {
    post: Post;
}

export default function SidebarCard({ post }: SidebarCardProps) {
    return (
        <Link href={`/blog/${post.id}`} className="flex items-center gap-4 sm:gap-6 group">
            <div className="relative flex-shrink-0 w-[130px] h-[110px] sm:w-[180px] sm:h-[110px] lg:w-[256px] lg:h-[150px] rounded-[6px] overflow-hidden border border-[#FFFFFF1A] bg-[#FFFFFF08]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <span className="text-[#88C4FF] text-[14px] font-medium leading-[21px]">
                    {post.category}
                </span>
                <h4 className="mt-1 sm:mt-2 text-white text-[16px] sm:text-[18px] lg:text-[22px] font-medium leading-[20px] sm:leading-[26px] lg:leading-[29px] line-clamp-2 group-hover:text-white/80 transition-colors">
                    {post.title}
                </h4>
                <p className="mt-2 sm:mt-4 text-white/60 text-[14px] leading-[18px] sm:leading-[21px] font-medium">
                    By {post.author} <span className='text-[#9EA5AF] mx-1 sm:mx-2'>•</span> {post.date}
                </p>
            </div>
        </Link>
    );
}
