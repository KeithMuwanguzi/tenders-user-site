'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blogs'
import { formatBlogDate } from '@/lib/blogs'
import BlogCard from './BlogCard'

type Faq = { q: string; a: string }

type Props = {
  posts: BlogPost[]
  faqs: Faq[]
  unavailable?: boolean
}

export default function BlogListingView({ posts, faqs, unavailable = false }: Props) {
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
        <div className="container blog-v2-hero__grid">
          <div className="blog-v2-hero__inner">
            <p className="blog-v2-hero__kicker">Tender advice for care providers</p>
            <h1 className="blog-v2-hero__title">Care tender advice and bid writing guides.</h1>
            <p className="blog-v2-hero__sub">
              Understand how to find suitable opportunities, test whether they fit, gather evidence
              and write responses that evaluators can follow and score.
            </p>
          </div>
          <figure className="blog-v2-hero__visual">
            <Image
              src="/images/editorial/tenderlab-blog-hero-v1.png"
              alt="An editor connecting operational care evidence to clear tender guidance"
              fill
              priority
              quality={88}
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <figcaption>Advice starts with the procurement documents and the evidence a provider can stand behind.</figcaption>
          </figure>
        </div>
      </header>

      <section className="blog-v2-paths" aria-labelledby="blog-paths-title">
        <div className="container">
          <div className="blog-v2-paths__head">
            <p className="blog-v2-section-label">Choose where to begin</p>
            <h2 id="blog-paths-title">Use the question you are trying to answer.</h2>
          </div>
          <div className="blog-v2-paths__grid">
            <Link href="/tenders" className="blog-v2-path-card">
              <span>01</span>
              <h3>Find a live care tender</h3>
              <p>Browse current opportunities by care setting and open the official notice.</p>
            </Link>
            <Link href="/services/tender-readiness-audit" className="blog-v2-path-card">
              <span>02</span>
              <h3>Decide whether to bid</h3>
              <p>Test eligibility, evidence, mobilisation, capacity and commercial exposure.</p>
            </Link>
            <Link href="/services/bid-writing" className="blog-v2-path-card">
              <span>03</span>
              <h3>Build a stronger submission</h3>
              <p>Turn the tender pack and operational evidence into a controlled response.</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="blog-v2-listing">
        <div className="container">
          {unavailable ? (
            <div className="blog-v2-empty" role="status">
              <strong>Tender advice is temporarily unavailable.</strong>
              <span>The publishing service could not be reached. Please try this page again shortly, or browse live tenders and services in the meantime.</span>
              <div className="blog-v2-cta-band__actions">
                <Link href="/tenders" className="btn btn-primary">Browse live tenders</Link>
                <Link href="/services" className="btn btn-ghost">View tender services</Link>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <p className="blog-v2-empty">No articles have been published yet.</p>
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
                  <p className="blog-v2-section-label">Latest guidance</p>
                  <BlogCard
                    post={featured}
                    variant="featured"
                    dateLabel={formatBlogDate(featured.publishedAt)}
                  />
                </div>
              )}

              {rest.length > 0 && (
                <div className="blog-v2-grid-wrap">
                  <p className="blog-v2-section-label">Browse more tender advice</p>
                  <div className="blog-v2-grid">
                    {rest.map((post) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        dateLabel={formatBlogDate(post.publishedAt)}
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
          <p className="blog-v2-cta-band__label">Have a live opportunity?</p>
          <h2>Move from general advice to the documents in front of you.</h2>
          <p>Share the tender pack and deadline so TenderLab can assess the fit and the work required.</p>
          <div className="blog-v2-cta-band__actions">
            <Link href="/contact" className="btn btn-white">
              Discuss your tender
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
