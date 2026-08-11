import type { Metadata } from 'next';
import BlogContent from '../components/Blog/BlogContent';

export const metadata: Metadata = {
    title: 'Blog | Market Insights, Strategies & Trading Education | CrossResearch',
    description: 'Read the latest market insights, trading strategies, product updates, and educational content from the CrossResearch team.',
    keywords: ['trading blog', 'market insights', 'trading strategies', 'technical analysis', 'CrossResearch', 'trading education'],
    authors: [{ name: 'CrossResearch', url: 'https://crossresearch.io' }],
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://crossresearch.io/blog' },
    openGraph: {
        title: 'Blog | CrossResearch',
        description: 'Read the latest market insights, trading strategies, product updates, and educational content from the CrossResearch team.',
        url: 'https://crossresearch.io/blog',
        siteName: 'CrossResearch',
        type: 'website',
        locale: 'en_US',
        images: [{ url: 'https://crossresearch.io/og-image.png', width: 1200, height: 630, alt: 'CrossResearch' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | CrossResearch',
        description: 'Read the latest market insights, trading strategies, product updates, and educational content from the CrossResearch team.',
        site: '@crossresearch',
        images: ['https://crossresearch.io/og-image.png'],
    },
};

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            <BlogContent />
        </div>
    );
}
