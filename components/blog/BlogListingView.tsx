'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blogs'
import { formatBlogDate } from '@/lib/blogs'
import BlogCard from './BlogCard'

type Faq = { q: string; a: string }

type Props = {
  posts: BlogPost[]
  faqs: Faq[]
  onOpenPost: (slug: string) => void
  onPrefetchPost?: (slug: string) => void
}

export default function BlogListingView({ posts, faqs, onOpenPost, onPrefetchPost }: Props) {
  const [category, setCategory] = useState<string>('all')

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean))
    return ['all', ...Array.from(set).sort()]
  }, [posts])

  const filtered = useMemo(() => {
    if (category === 'all') return posts
    return posts.filter((p) => p.category === category)
  }, [posts, category])

  const [featured, ...rest] = filtered

  return (
    <>
      <header className="blog-v2-hero">
        <div className="container blog-v2-hero__inner">
          <p className="blog-v2-hero__kicker">Insights · Analysis · Strategy</p>
          <h1 className="blog-v2-hero__title">Tender writing intelligence for UK care providers</h1>
          <p className="blog-v2-hero__sub">
            Live tender analysis, bid strategy, and commissioning trends from evaluator-trained
            writers — 92% win rate across 200+ submissions.
          </p>
          <div className="blog-v2-hero__stats">
            <span>
              <strong>{posts.length}</strong> articles
            </span>
            <span className="blog-v2-hero__stats-dot" aria-hidden />
            <span>Updated from our editorial team</span>
          </div>
        </div>
      </header>

      <div className="blog-v2-listing">
        <div className="container">
          {posts.length === 0 ? (
            <p className="blog-v2-empty">No posts published yet. Check back soon.</p>
          ) : (
            <>
              <div className="blog-v2-toolbar">
                <nav className="blog-v2-filters" aria-label="Filter by topic">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`blog-v2-filters__btn${category === cat ? ' is-active' : ''}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat === 'all' ? 'All topics' : cat}
                    </button>
                  ))}
                </nav>
                <p className="blog-v2-toolbar__count">
                  {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                </p>
              </div>

              {featured && (
                <div className="blog-v2-featured">
                  <p className="blog-v2-section-label">Latest</p>
                  <BlogCard
                    post={featured}
                    variant="featured"
                    dateLabel={formatBlogDate(featured.publishedAt)}
                    onOpen={onOpenPost}
                    onPrefetch={onPrefetchPost}
                  />
                </div>
              )}

              {rest.length > 0 && (
                <div className="blog-v2-grid-wrap">
                  <p className="blog-v2-section-label">More to read</p>
                  <div className="blog-v2-grid">
                    {rest.map((post) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        dateLabel={formatBlogDate(post.publishedAt)}
                        onOpen={onOpenPost}
                        onPrefetch={onPrefetchPost}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filtered.length === 0 && (
                <p className="blog-v2-empty">No articles in this topic yet.</p>
              )}
            </>
          )}
        </div>
      </div>

      {faqs.length > 0 && (
        <section className="blog-v2-faq" aria-labelledby="blog-v2-faq-title">
          <div className="container blog-v2-faq__inner">
            <h2 id="blog-v2-faq-title">Frequently asked questions</h2>
            {faqs.map((f) => (
              <details key={f.q} className="blog-v2-faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="blog-v2-cta-band">
        <div className="container blog-v2-cta-band__inner">
          <p className="blog-v2-cta-band__label">Work with TenderLab</p>
          <h2>Ready to win your next care sector tender?</h2>
          <p>Free consultation — honest bid assessment, no sales pressure.</p>
          <div className="blog-v2-cta-band__actions">
            <Link href="/contact" className="btn btn-white">
              Book a free consultation
            </Link>
            <Link href="/services" className="btn btn-outline-white">
              View services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
