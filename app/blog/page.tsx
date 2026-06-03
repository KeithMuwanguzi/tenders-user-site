import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchBlogs, formatBlogDate } from '@/lib/blogs'
import BlogCard from '@/components/blog/BlogCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UK Care Tender Writing Blog and Insights | TenderLab',
  description:
    'Live tender analysis, bid writing strategy, and commissioning trends for UK health and social care providers. 92% win rate across 200+ submissions.',
  alternates: { canonical: 'https://www.tenderlab.co.uk/blog' },
  openGraph: {
    title: 'UK Care Tender Writing Blog and Insights | TenderLab',
    description:
      'Live tender analysis, bid writing strategy, and commissioning trends for UK health and social care providers.',
    url: 'https://www.tenderlab.co.uk/blog',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'How often does the TenderLab blog publish?',
    a: 'We publish 2 to 3 posts per week across Live Tender Analysis and Sector Insights. Top-traffic posts are refreshed quarterly.',
  },
  {
    q: 'What is a Live Tender Analysis post?',
    a: 'A breakdown of a currently live UK public sector care tender: cohort, statutory context, scoring battlegrounds, and win-rate playbook from 200+ submissions.',
  },
  {
    q: 'Are these posts written by a human?',
    a: 'Yes. Every post is written by an evaluator-trained bid writer. AI assists research only; framing and references are human-verified.',
  },
  {
    q: 'Can I get email alerts when a new post goes live?',
    a: 'Yes. Subscribe from any post footer for monthly insights and subscriber-only briefings.',
  },
]

export default async function BlogPage() {
  const posts = await fetchBlogs()
  const [featured, ...rest] = posts
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))]

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': 'https://www.tenderlab.co.uk/blog#blog',
            name: 'TenderLab Blog: UK Care Tender Writing Insights',
            url: 'https://www.tenderlab.co.uk/blog',
            publisher: { '@id': 'https://www.tenderlab.co.uk/#organization' },
          }),
        }}
      />

      <section className="blog-hero">
        <div className="container blog-hero__inner">
          <div className="blog-hero__kicker">Insights · Analysis · Strategy</div>
          <h1>UK care tender writing and bid writing insights</h1>
          <p className="blog-hero__sub">
            Live tender analysis, bid strategy, and commissioning trends. Written by evaluator-trained bid writers — 92% win rate across 200+ submissions.
          </p>
        </div>
      </section>

      <section className="blog-listing">
        <div className="container">
          {posts.length === 0 ? (
            <p className="blog-empty">No posts published yet. Check back soon.</p>
          ) : (
            <>
              {featured && (
                <div className="blog-featured">
                  <p className="blog-block-label">Latest</p>
                  <BlogCard
                    post={featured}
                    variant="featured"
                    dateLabel={formatBlogDate(featured.publishedAt)}
                  />
                </div>
              )}

              {categories.length > 0 && (
                <div className="blog-topics" aria-label="Topics">
                  {categories.map((cat) => (
                    <span key={cat} className="blog-topics__pill">
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {rest.length > 0 && (
                <div className="blog-block">
                  <p className="blog-block-label">All articles</p>
                  <div className="blog-grid">
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
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="blog-faq-title" className="blog-faq">
        <div className="container blog-faq__inner">
          <h2 id="blog-faq-title">Blog: frequently asked questions</h2>
          {FAQS.map((f) => (
            <details key={f.q} className="blog-faq__item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <p className="section-label">Work With TenderLab</p>
          <h2 className="services-cta__headline">Ready to win more tenders?</h2>
          <p className="services-cta__sub">
            Speak to TenderLab about your next procurement. 92% win rate across 200+ UK care sector submissions.
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
