import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import { DECISION_GUIDES, DECISION_GUIDE_BY_SLUG } from '@/lib/decision-guides'
import { articleSchema, breadcrumbSchema, defaultOpenGraph, defaultTwitter, faqSchema } from '@/lib/seo'

export function generateStaticParams() {
  return DECISION_GUIDES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = DECISION_GUIDE_BY_SLUG.get(slug)
  if (!guide) return {}
  const path = `/guides/${slug}`
  return {
    title: `${guide.title} | TenderLab`,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: defaultOpenGraph({ title: guide.title, description: guide.description, path, type: 'article', image: '/images/editorial/tenderlab-blog-intelligence-hero-v1.png' }),
    twitter: defaultTwitter({ title: guide.title, description: guide.description, image: '/images/editorial/tenderlab-blog-intelligence-hero-v1.png' }),
  }
}

export default async function DecisionGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = DECISION_GUIDE_BY_SLUG.get(slug)
  if (!guide) notFound()
  const related = guide.related.map((relatedSlug) => DECISION_GUIDE_BY_SLUG.get(relatedSlug)).filter(Boolean)
  const path = `/guides/${slug}`
  const structured = [
    articleSchema({ headline: guide.title, description: guide.description, path, image: '/images/editorial/tenderlab-blog-intelligence-hero-v1.png', datePublished: '2026-07-30', dateModified: '2026-07-30' }),
    faqSchema(guide.faq.map(({ q, a }) => ({ question: q, answer: a }))),
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tender guides', path: '/guides' }, { name: guide.title, path }]),
  ]

  return (
    <main className="ep-page">
      {structured.map((data, index) => (
        <script key={index} id={`ld-guide-${slug}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <EditorialHero
        eyebrow={guide.eyebrow}
        title={guide.title}
        intro={guide.description}
        image="/images/editorial/tenderlab-blog-intelligence-hero-v1.png"
        imageAlt="Editorial collage of care-provider questions, procurement documents and evaluator evidence"
        primaryLabel={guide.service.label}
        primaryHref={guide.service.href}
        secondaryLabel="All tender guides"
        secondaryHref="/guides"
        tone="cream"
      />

      <article className="ep-section ep-guide">
        <div className="ep-shell ep-guide__layout">
          <div className="ep-guide__body">
            <section className="ep-guide__answer">
              <p className="ep-kicker">Direct answer</p>
              <p>{guide.directAnswer}</p>
            </section>
            {guide.sections.map((section, index) => (
              <section key={section.heading} className="ep-guide__section">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                </div>
              </section>
            ))}
          </div>
          <aside className="ep-guide__aside">
            <div>
              <p className="ep-kicker">Check the opportunity</p>
              <h2>Writing starts after the requirements fit.</h2>
              <p>TenderLab first checks the buyer documents, mandatory conditions, deadline and delivery position. We do not recommend full writing where the published requirements cannot be met.</p>
              <Link className="ep-button ep-button--primary" href={guide.service.href}>{guide.service.label}<span aria-hidden="true">↗</span></Link>
            </div>
            <div className="ep-guide__sources">
              <p className="ep-kicker">Official reading</p>
              {guide.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="ep-section ep-guide-related">
          <div className="ep-shell">
            <div className="ep-section-head"><p className="ep-kicker">Continue the decision</p><h2>Related questions from care-provider leaders.</h2></div>
            <div className="ep-guide-related__grid">
              {related.map((item) => item && <Link key={item.slug} href={`/guides/${item.slug}`}><small>{item.eyebrow}</small><h3>{item.title}</h3><span aria-hidden="true">↗</span></Link>)}
            </div>
          </div>
        </section>
      )}

      <EditorialFaq title={`Questions about ${guide.title.toLowerCase()}.`} items={guide.faq} />
    </main>
  )
}
