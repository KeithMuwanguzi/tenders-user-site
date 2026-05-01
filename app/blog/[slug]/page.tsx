import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchBlogs, categoryColor } from '@/lib/sheets'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = await fetchBlogs()
  const post = posts.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found | TenderLab' }
  return {
    title: `${post.title} | TenderLab`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const posts = await fetchBlogs()
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const color = categoryColor(post.category)

  return (
    <main className="blog-post">

      {/* Hero */}
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
          <h1 className="blog-post__title">{post.title}</h1>
        </div>
      </section>

      {/* Featured image */}
      {post.imageUrl && (
        <div className="blog-post__img-section">
          <div className="container">
            <div className="blog-post__img-box">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1140px"
                className="blog-post__img"
                priority
              />
            </div>
            {post.imageCredit && (
              <p className="blog-post__img-credit">Image: {post.imageCredit}</p>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      <div className="blog-post__body-wrap">
        <div className="container">
          <div className="blog-post__body">

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="blog-post__tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-post__tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="blog-post__content">
              <p className="blog-post__excerpt">{post.excerpt}</p>
              <div className="blog-post__divider" />
              <p className="blog-post__note">
                For full analysis, specification breakdowns, and tender-specific insights, speak to TenderLab directly.
              </p>
            </div>

            {/* Actions */}
            <div className="blog-post__actions">
              <Link href="/contact" className="btn btn-primary">
                Book a Free Consultation
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                ← Back to Blog
              </Link>
            </div>

          </div>
        </div>
      </div>

    </main>
  )
}
