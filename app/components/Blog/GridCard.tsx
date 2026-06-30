import Image from 'next/image';
import Link from 'next/link';
import type { Post } from './blogData';

interface GridCardProps {
    post: Post;
}

export default function GridCard({ post }: GridCardProps) {
    return (
        <Link href={`/blog/${post.id}`} className="group flex flex-col border border-[#FFFFFF1A] bg-[#FFFFFF08] rounded-[32px] p-6">
            <div className="relative w-full h-[336px] overflow-hidden mb-8 rounded-[24px] bg-[#FFFFFF08] border border-[#FFFFFF1A]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 right-4 bg-[#FFFFFF08] backdrop-blur-[34px] border border-[#FFFFFF1A] text-white text-[12px] leading-[18px] px-5 py-2.5 rounded-[90px]">
                    {post.date}
                </div>
            </div>

            <span className="text-[#88C4FF] text-[12px] sm:text-[14px] font-medium leading-[21px]">
                {post.category}
            </span>

            <h3 className="mt-2 text-white text-[16px] sm:text-[26px] font-medium leading-[34px] group-hover:text-white/80 transition-colors">
                {post.title}
            </h3>

            <p className="mt-3 text-white/60 text-[14px] leading-[21px] font-medium">By {post.author}</p>
        </Link>
    );
}
