import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import { DIRECT_CLIENTS, VERIFIED_CLIENT_REVIEWS } from '@/lib/client-proof'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Tender Writing Reviews from UK Care Providers | TenderLab',
  description:
    'Read independent TenderLab reviews from UK health and social care providers, see selected direct client organisations and understand our documented tender experience.',
  alternates: { canonical: '/reviews' },
  openGraph: defaultOpenGraph({
    title: 'Tender Writing Reviews from UK Care Providers | TenderLab',
    description:
      'Independent client reviews, selected direct care-provider engagements and clearly labelled TenderLab performance records.',
    path: '/reviews',
  }),
  twitter: defaultTwitter({
    title: 'Tender Writing Reviews from UK Care Providers | TenderLab',
    description:
      'Independent client reviews, selected direct care-provider engagements and clearly labelled TenderLab performance records.',
  }),
}

const record = [
  { value: '92%', label: 'Recorded historic win rate' },
  { value: '200+', label: 'Submissions supported' },
  { value: '£50M+', label: 'Aggregate contract value linked to successful submissions' },
  { value: '5/5', label: 'Documented top question scores' },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function ReviewsPage() {
  return (
    <main className="ep-page">
      <EditorialHero
        eyebrow="Independent client feedback"
        title="What care providers say after working with TenderLab."
        intro="These are independently published reviews and named direct-client relationships. The evidence is presented with its source so you can inspect it for yourself."
        image="/images/editorial/tenderlab-reviews-proof-hero-v1.webp"
        imageAlt="Care-provider leaders beside independent review and documented-results evidence"
        primaryLabel="Talk to TenderLab"
        primaryHref="/contact"
        secondaryLabel="See documented case studies"
        secondaryHref="/case-studies"
        tone="peach"
      />

      <section className="ep-section ep-review-record">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Experience with the qualification attached</p>
              <h2>Four different measures, kept separate.</h2>
            </div>
            <p>
              These figures describe historic TenderLab records. They are not a promise that a future bid will win;
              buyer decisions also depend on eligibility, competition, price and the provider&apos;s underlying service.
            </p>
          </div>
          <div className="ep-review-record__grid">
            {record.map((item) => (
              <div key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-review-clients">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Direct TenderLab engagements</p>
              <h2>Selected care providers that have worked directly with us.</h2>
            </div>
            <p>
              Living Plus Care appears first by design. Every tile links to the provider&apos;s own website and is
              included as a named relationship, not as a claim that every engagement produced the same outcome.
            </p>
          </div>
          <div className="ep-review-clients__grid">
            {DIRECT_CLIENTS.map((client) => (
              <a
                key={client.name}
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`ep-review-client${client.dark ? ' ep-review-client--dark' : ''}`}
                aria-label={`Visit ${client.name} website`}
              >
                <span className={`ep-review-client__logo ep-review-client__logo--${client.treatment}`}>
                  <Image src={client.logo} alt={client.name} width={220} height={86} />
                </span>
                <span>{client.name}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-review-stories">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Published on Trustpilot</p>
              <h2>Read the experience in the client&apos;s own words.</h2>
            </div>
            <p>
              Longer reviews are given enough room to be readable without turning them into giant display text.
              The newest review is clearly labelled as a summary until its exact wording is stored here.
            </p>
          </div>
          <div className="ep-review-stories__grid">
            {VERIFIED_CLIENT_REVIEWS.map((review, index) => (
              <article
                key={review.organisation}
                className={`ep-review-story ep-review-story--${index === 0 ? 'featured' : index === 1 ? 'blue' : 'yellow'}`}
              >
                <header>
                  <div className={`ep-review-story__logo${review.darkLogo ? ' ep-review-story__logo--dark' : ''}`}>
                    {review.logo ? (
                      <Image src={review.logo} alt={review.organisation} width={176} height={64} />
                    ) : (
                      <span>{review.organisation}</span>
                    )}
                  </div>
                  <div className="ep-review-story__rating" aria-label="Five out of five stars">★★★★★</div>
                </header>
                <div className="ep-review-story__copy">
                  <h3>{review.title}</h3>
                  {review.quote ? (
                    <blockquote>
                      {review.quote.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </blockquote>
                  ) : (
                    <div className="ep-review-story__summary">
                      <p className="ep-kicker">Review summary</p>
                      <p>{review.summary}</p>
                    </div>
                  )}
                </div>
                <footer>
                  <span><strong>{review.person}</strong>{review.role}</span>
                  <a href={review.href} target="_blank" rel="noopener noreferrer">
                    Open {review.sourceLabel.toLowerCase()} <Arrow />
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-review-choice">
        <div className="ep-shell ep-review-choice__panel">
          <div>
            <p className="ep-kicker">The first decision is whether to bid</p>
            <h2>We do not begin full tender writing until the opportunity has been checked.</h2>
          </div>
          <div>
            <p>
              TenderLab checks the published participation conditions, your evidence, delivery position and
              commercial fit first. If a mandatory requirement is not met, we will say so before taking on the
              writing work. That protects your time and gives suitable opportunities the attention they deserve.
            </p>
            <p>
              This is a professional assessment, not an award guarantee. The contracting authority always makes
              the final decision.
            </p>
            <Link href="/contact" className="ep-button ep-button--primary">
              Ask us to assess a tender <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
