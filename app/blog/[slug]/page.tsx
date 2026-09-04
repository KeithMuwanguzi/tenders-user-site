import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailView from '@/components/blog/BlogDetailView'
import { fetchBlogBySlug, fetchBlogs } from '@/lib/blogs'
import ContextualResourcePanel from '@/components/ContextualResourcePanel'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchBlogBySlug(slug)
  if (!post) return { title: 'Post Not Found | TenderLab' }
  return {
    title: `${post.title} | TenderLab`,
    description: post.excerpt,
    alternates: { canonical: `https://www.tenderlab.co.uk/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.tenderlab.co.uk/blog/${slug}`,
      type: 'article',
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.title }] : undefined,
    },
  }
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params
  const [post, posts] = await Promise.all([fetchBlogBySlug(slug), fetchBlogs()])
  if (!post) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `https://www.tenderlab.co.uk/blog/${slug}`,
            datePublished: post.publishedAt || undefined,
            dateModified: post.publishedAt || undefined,
            mainEntityOfPage: `https://www.tenderlab.co.uk/blog/${slug}`,
            image: post.imageUrl || undefined,
            publisher: { '@id': 'https://www.tenderlab.co.uk/#organization' },
            author: { '@type': 'Organization', name: 'TenderLab editorial team', url: 'https://www.tenderlab.co.uk/about' },
            inLanguage: 'en-GB',
          }),
        }}
      />
      <main className="blog-v2 blog-v2--detail">
        <BlogDetailView post={post} posts={posts} />
        <ContextualResourcePanel eyebrow="Put the guidance to work" title="Complete one relevant TenderLab check next." slugs={['tools/tender-readiness-assessment']} />
      </main>
    </>
  )
}
