import Image from 'next/image';
import Link from 'next/link';
import type { Post } from './blogData';

interface SidebarCardProps {
    post: Post;
}

export default function SidebarCard({ post }: SidebarCardProps) {
    return (
        <Link href={`/blog/${post.id}`} className="flex items-center gap-6 group">
            <div className="relative flex-shrink-0 w-[256px] h-[150px] rounded-[6px] overflow-hidden border border-[#FFFFFF1A] bg-[#FFFFFF08]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <span className="text-[#88C4FF] text-[12px] sm:text-[14px] font-medium leading-[21px]">
                    {post.category}
                </span>
                <h4 className="mt-2 text-white text-[22px] font-medium leading-[29px] line-clamp-2 group-hover:text-white/80 transition-colors">
                    {post.title}
                </h4>
                <p className="mt-4 text-white/60 text-[14px] leading-[21px] font-medium">
                    By {post.author} <span className='text-[#9EA5AF] mx-2'>•</span> {post.date}
                </p>
            </div>
        </Link>
    );
}
