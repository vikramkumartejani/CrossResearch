import type { Metadata } from 'next';
import BlogContent from '../components/Blog/BlogContent';

export const metadata: Metadata = {
    title: 'Blog | Market Insights, Strategies & Trading Education | CrossResearch',
    description: 'Read the latest market insights, trading strategies, product updates, and educational content from the CrossResearch team.',
    keywords: ['trading blog', 'market insights', 'trading strategies', 'technical analysis', 'CrossResearch', 'trading education'],
    authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://cross-research.vercel.app/blog' },
    openGraph: {
        title: 'Blog | CrossResearch',
        description: 'Read the latest market insights, trading strategies, product updates, and educational content from the CrossResearch team.',
        url: 'https://cross-research.vercel.app/blog',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | CrossResearch',
        description: 'Read the latest market insights, trading strategies, product updates, and educational content from the CrossResearch team.',
        site: '@crossresearch',
    },
};

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            <BlogContent />
        </div>
    );
}
