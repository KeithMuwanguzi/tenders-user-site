import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { fetchBlogs, categoryColor } from '@/lib/sheets'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | TenderLab — UK Health & Social Care Tender Insights',
  description:
    'Live tender analysis, bid strategy, and commissioning trends for UK health and social care providers.',
}

export default async function BlogPage() {
  let posts = await fetchBlogs()

  return (
    <main>

      {/* Hero */}
      <section className="blog-hero">
        <div className="container blog-hero__inner">
          <div className="blog-hero__kicker">Insights · Analysis · Strategy</div>
          <h1>The TenderLab Blog</h1>
          <p className="blog-hero__sub">
            Live tender analysis, bid strategy, and commissioning trends across UK health and social care.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="blog-listing">
        <div className="container">
          {posts.length === 0 ? (
            <p className="blog-empty">No posts available right now — check back soon.</p>
          ) : (
            <div className="blog-grid">
              {posts.map(post => (
                <article key={post.slug} className="blog-card">
                  {post.imageUrl && (
                    <Link href={`/blog/${post.slug}`} className="blog-card__img-link" tabIndex={-1} aria-hidden="true">
                      <div className="blog-card__img-wrap">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="blog-card__img"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="blog-card__body">
                    <span
                      className="blog-card__cat"
                      style={{ background: categoryColor(post.category) }}
                    >
                      {post.category}
                    </span>
                    <h2 className="blog-card__title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="blog-card__cta">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Work With TenderLab</p>
          <h2 className="services-cta__headline">Ready to Win More Tenders?</h2>
          <p className="services-cta__sub">
            Speak to TenderLab about your next procurement and get a free consultation.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Consultation</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
