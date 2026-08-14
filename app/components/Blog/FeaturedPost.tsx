import Image from '@/lib/CldImage';
import Link from 'next/link';
import type { Post } from './blogData';

interface FeaturedPostProps {
    post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <Link href={`/blog/${post.id}`} className="group block">
            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[382px] rounded-[16px] sm:rounded-[24px] overflow-hidden mb-5 sm:mb-10 border border-[#FFFFFF1A] bg-[#FFFFFF08]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <span className="text-[#88C4FF] text-[14px] font-medium leading-[21px]">
                {post.category}
            </span>

            <h2 className="line-clamp-2 mt-2 text-white text-[24px] sm:text-[30px] lg:text-[40px] font-normal max-w-[711px] leading-[32px] sm:leading-[40px] lg:leading-[52px] group-hover:text-white/80 transition-colors">
                {post.title}
            </h2>

            <p className="mt-3 sm:mt-4 text-white/60 text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] line-clamp-2">
                {post.excerpt}
            </p>

            <p className="mt-3 sm:mt-4 text-white/60 text-[14px] sm:text-[16px] leading-6 font-medium">
                By {post.author} <span className='text-[#9EA5AF] mx-2 sm:mx-3'>•</span> {post.date}
            </p>
        </Link>
    );
}
