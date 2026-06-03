import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchBlogs, fetchBlogBySlug, categoryColor, formatBlogDate } from '@/lib/blogs'
import { renderMarkdownSafe } from '@/components/blog/renderMarkdown'
import BlogPostAside from '@/components/blog/BlogPostAside'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchBlogBySlug(slug)
  if (!post) return { title: 'Post Not Found | TenderLab' }
  return {
    title: `${post.title} | TenderLab`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([fetchBlogBySlug(slug), fetchBlogs()])
  if (!post) notFound()

  const html = renderMarkdownSafe(post.body || '')
  const color = categoryColor(post.category)
  const dateLabel = formatBlogDate(post.publishedAt)

  return (
    <main className="blog-post">
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
            inLanguage: 'en-GB',
          }),
        }}
      />

      <section className="blog-post__hero">
        <div className="container blog-post__hero-inner">
          <nav className="blog-post__crumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link>
            <span className="blog-post__crumb-sep">/</span>
            <span>{post.category}</span>
          </nav>
          <span className="blog-post__cat" style={{ background: color }}>
            {post.category}
          </span>
          {dateLabel && <time className="blog-post__date">{dateLabel}</time>}
          <h1 className="blog-post__title">{post.title}</h1>
          {post.excerpt && <p className="blog-post__lead">{post.excerpt}</p>}
        </div>
      </section>

      {post.imageUrl && (
        <div className="blog-post__img-section">
          <div className="container">
            <div className="blog-post__img-box">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 960px"
                className="blog-post__img"
              />
            </div>
            {post.imageCredit && (
              <p className="blog-post__img-credit">Image: {post.imageCredit}</p>
            )}
          </div>
        </div>
      )}

      <div className="blog-post__layout">
        <div className="container blog-post__layout-inner">
          <article className="blog-post__main">
            {post.tags.length > 0 && (
              <div className="blog-post__tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-post__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="blog-post__content">
              {post.body ? (
                <div
                  className="blog-post__body-md"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p className="blog-post__excerpt">{post.excerpt}</p>
              )}
            </div>

            <div className="blog-post__actions">
              <Link href="/contact" className="btn btn-primary">
                Book a Free Consultation
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                Back to Blog
              </Link>
            </div>
          </article>

          <BlogPostAside related={allPosts} currentSlug={slug} />
        </div>
      </div>
    </main>
  )
}
