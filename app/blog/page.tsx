import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { fetchBlogs, categoryColor } from '@/lib/sheets'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UK Care Tender Writing Blog and Insights | TenderLab',
  description:
    'Live tender analysis, bid strategy, and commissioning trends for UK health and social care providers. 92% win rate across 200+ submissions.',
  alternates: { canonical: 'https://www.tenderlab.co.uk/blog' },
  openGraph: {
    title: 'UK Care Tender Writing Blog and Insights | TenderLab',
    description:
      'Live tender analysis, bid strategy, and commissioning trends for UK health and social care providers. 92% win rate across 200+ submissions.',
    url: 'https://www.tenderlab.co.uk/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Care Tender Writing Blog and Insights | TenderLab',
    description: 'Live tender analysis and bid strategy for UK care providers. 92% win rate, 200+ submissions.',
  },
}

const FAQS = [
  {
    q: 'How often does the TenderLab blog publish?',
    a: 'We publish 2 to 3 posts per week across two formats: Live Tender Analysis (a named UK procurement, scoring breakdown, bid strategy) and Sector Insights (statutory changes, evaluator patterns, sector trends). Top-traffic posts are refreshed quarterly.',
  },
  {
    q: 'What is a Live Tender Analysis post?',
    a: 'A breakdown of a currently live UK public sector care tender: the cohort, the statutory context, the scoring battlegrounds, the common pitfalls, and the win-rate playbook drawn from 200+ submissions. Published within 7 days of the tender going live and archived the day after the deadline closes.',
  },
  {
    q: 'Are these posts written by a human?',
    a: 'Yes. Every TenderLab post is written by an evaluator-trained bid writer with care sector specialism. AI is used internally as a research assistant during first-draft research; the regulator-correct framing, statutory references, and case examples are always human-written and human-verified.',
  },
  {
    q: 'Can I get email alerts when a new post goes live?',
    a: 'Yes. The TenderLab Insights newsletter goes out monthly with the most useful posts of the past 30 days, plus subscriber-only Live Tender Analysis briefings. Subscribe from any post footer.',
  },
]

export default async function BlogPage() {
  const posts = await fetchBlogs()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': 'https://www.tenderlab.co.uk/blog#blog',
          name: 'TenderLab Blog: UK Care Tender Writing Insights',
          url: 'https://www.tenderlab.co.uk/blog',
          description: 'Live tender analysis, bid strategy, and commissioning trends for UK health and social care providers.',
          isPartOf: { '@id': 'https://www.tenderlab.co.uk/#website' },
          publisher: { '@id': 'https://www.tenderlab.co.uk/#organization' },
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': 'https://www.tenderlab.co.uk/blog#faq',
          mainEntity: FAQS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }) }}
      />

      {/* Hero */}
      <section className="blog-hero">
        <div className="container blog-hero__inner">
          <div className="blog-hero__kicker">Insights Â· Analysis Â· Strategy</div>
          <h1>UK care tender writing insights and live tender analysis</h1>
          <p className="blog-hero__sub">
            Live tender analysis, bid strategy, and commissioning trends across UK health and social care. Written by evaluator-trained bid writers with a 92% win rate across 200+ submissions.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="blog-listing">
        <div className="container">
          {posts.length === 0 ? (
            <p className="blog-empty">No posts available right now. Check back soon.</p>
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
                      Read more â
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="blog-faq-title" style={{ padding: '4rem 0', background: '#FAFAF5' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <h2 id="blog-faq-title" style={{ marginBottom: '1.5rem' }}>Blog: frequently asked questions</h2>
          {FAQS.map(f => (
            <details key={f.q} style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.05rem' }}>{f.q}</summary>
              <p style={{ marginTop: '0.75rem', lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Work With TenderLab</p>
          <h2 className="services-cta__headline">Ready to win more tenders?</h2>
          <p className="services-cta__sub">
            Speak to TenderLab about your next procurement and get a free consultation. 92% win rate across 200+ UK care sector submissions.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Consultation</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.7, color: '#fff' }}>
            TenderLab Ltd Â· Companies House 17184263 Â· See our <Link href="/case-studies" style={{ color: 'inherit', textDecoration: 'underline' }}>case studies</Link>. Reference: <a href="https://www.gov.uk/government/collections/procurement-policy-procurement-policy-notes" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>gov.uk procurement policy notes</a>.
          </p>
        </div>
      </section>

    </main>
  )
}
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
