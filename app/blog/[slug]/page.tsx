import { notFound } from 'next/navigation'
import Image from '@/lib/CldImage'
import Link from 'next/link'
import { ArticleJsonLd } from '@/app/components/seo/ArticleJsonLd'
import Breadcrumbs from '@/app/components/seo/Breadcrumbs'
import { pageMetadata } from '@/lib/seo'
import { POSTS, getPostBySlug, blogPath } from '@/app/components/Blog/blogData'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: blogPath(post),
    type: 'article',
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = POSTS.filter((p) => p.tab === post.tab && p.slug !== post.slug).slice(0, 3)

  return (
    <main className="font-urbanist min-h-screen bg-[#0B0B12] text-white">
      <ArticleJsonLd
        headline={post.title}
        description={post.excerpt}
        path={blogPath(post)}
        datePublished={post.dateIso}
        authorName={post.author}
        image={post.image}
      />
      <div className="mx-auto max-w-[820px] px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: post.title, href: blogPath(post) },
          ]}
        />
        <p className="text-[#88C4FF] text-[13px] font-medium mb-3">{post.category}</p>
        <h1 className="text-[30px] sm:text-[40px] leading-tight font-medium mb-4">{post.title}</h1>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[13px] text-white/55 mb-8 space-y-1">
          <p>
            <span className="text-white/80">{post.author}</span>
          </p>
          <p>Published: {post.date}</p>
          <p>
            Methodology:{' '}
            <Link href="/methodology" className="text-[#88C4FF] hover:underline">
              CrossResearch research framework
            </Link>
          </p>
        </div>
        <div className="relative w-full h-[220px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/10 mb-8">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>
        <div className="space-y-4 mb-12">
          {post.body.map((p) => (
            <p key={p.slice(0, 40)} className="text-white/60 text-[15px] leading-7">
              {p}
            </p>
          ))}
        </div>
        {related.length ? (
          <section>
            <h2 className="text-[18px] font-medium mb-3">Related posts</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={blogPath(r)} className="text-[#88C4FF] text-[14px] hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  )
}
