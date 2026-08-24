import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchBlogs, formatBlogDate } from '@/lib/blogs'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { DIRECT_CLIENTS, VERIFIED_CLIENT_REVIEWS } from '@/lib/client-proof'
import { DECISION_GUIDE_BY_SLUG } from '@/lib/decision-guides'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import HomeHero from '@/components/HomeHero'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'Health and Social Care Tender Writing Services | TenderLab' },
  description:
    'Specialist tender writing and bid support for UK health and social care providers. Evidence-led submissions for council, NHS and ICB contracts.',
  alternates: { canonical: '/' },
  openGraph: defaultOpenGraph({
    title: 'Health and Social Care Tender Writing Services | TenderLab',
    description:
      'TenderLab turns operational evidence into clear, compliant submissions built for the scoring sheet.',
    path: '/',
  }),
  twitter: defaultTwitter({
    title: 'Health and Social Care Tender Writing Services | TenderLab',
    description:
      'TenderLab turns operational evidence into clear, compliant submissions built for the scoring sheet.',
  }),
}

const services = [
  {
    number: '01',
    title: 'Bid viability',
    prompt: 'You have found an opportunity and need to know whether it fits.',
    outcome:
      'We test the published conditions, available evidence, mobilisation position and price before your team commits.',
    deliverable: 'A recorded bid or no-bid recommendation, with risks and actions.',
    href: '/services/bid-viability',
  },
  {
    number: '02',
    title: 'Complete bid writing',
    prompt: 'The tender is live and the submission still needs to be written.',
    outcome:
      'We map every scored requirement, gather operational proof and write the response through to final review.',
    deliverable: 'A submission-ready response aligned to the buyer documents.',
    href: '/services/bid-writing',
    featured: true,
  },
  {
    number: '03',
    title: 'Pre-submission review',
    prompt: 'Your draft is complete but needs an independent evaluator challenge.',
    outcome:
      'We score the draft, expose unsupported claims and identify where an evaluator may struggle to award marks.',
    deliverable: 'A prioritised improvement plan with annotated, score-led feedback.',
    href: '/services/pre-submission-review',
  },
  {
    number: '04',
    title: 'Retained tender support',
    prompt: 'Tendering is part of your growth plan, not a one-off project.',
    outcome:
      'We help manage the pipeline, strengthen the evidence bank and reserve writing capacity for suitable opportunities.',
    deliverable: 'A more controlled and repeatable tender function.',
    href: '/services/tender-retainer',
  },
]

const decisionStages = [
  {
    number: '01',
    title: 'Read the buyer documents',
    text: 'We extract every condition, scored question, descriptor, submission rule and dependency before drafting starts.',
  },
  {
    number: '02',
    title: 'Build the response architecture',
    text: 'Each section is mapped to the specification and evaluation criteria so the answer remains complete and easy to score.',
  },
  {
    number: '03',
    title: 'Develop the operational evidence',
    text: 'Roles, controls, records, case examples and outcomes are made explicit, without inventing claims the provider cannot support.',
  },
  {
    number: '04',
    title: 'Challenge before submission',
    text: 'The draft is tested for compliance, proof, clarity and evaluator effort before the final quality gate.',
  },
]

const decisionGuideSlugs = [
  'how-to-get-domiciliary-care-contracts',
  'how-to-get-supported-living-contracts',
  'do-you-need-a-cqc-rating-to-bid',
  'why-care-providers-lose-tenders',
]

const decisionGuides = decisionGuideSlugs
  .map((slug) => DECISION_GUIDE_BY_SLUG.get(slug))
  .filter((guide) => guide !== undefined)

const faqs = [
  {
    q: 'What does TenderLab need before it can assess a tender?',
    a: 'Send the notice link or full procurement pack, the deadline, the lots you are considering and a short description of your current services. We will then identify the participation conditions, evidence requirements and any immediate delivery risks.',
  },
  {
    q: 'Can you work from tender responses we have already drafted?',
    a: 'Yes. We can review an existing draft, retain material that answers the requirement and rebuild sections where the proof, structure or compliance position is weak. The work is driven by the buyer documents, not by changing words for appearance alone.',
  },
  {
    q: 'Which care services do you support?',
    a: 'TenderLab supports health and social care providers across domiciliary care, supported living, children’s services, residential and nursing care, complex care, housing support, community health and related commissioned services.',
  },
  {
    q: 'Do you guarantee that every tender will be won?',
    a: 'No responsible tender writer can guarantee an award. Buyer decisions also depend on eligibility, competition, price and the strength of the underlying service. TenderLab improves the quality, traceability and scoreability of the submission while being clear about risks that writing cannot solve.',
  },
  {
    q: 'Where do the 92%, 200+, £50M+ and 5/5 figures come from?',
    a: 'They are separate historic measures from TenderLab records: recorded tender outcomes, submissions supported, aggregate contract value linked to successful work and documented top question scores. They are presented separately so a decision-maker can understand what each figure represents.',
  },
  {
    q: 'Can you help after a contract has been awarded?',
    a: 'Yes. Mobilisation support can translate the commitments in the winning submission into owned actions, evidence records, reporting controls and a practical transition plan for contract start.',
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default async function HomePage() {
  const blogPosts = await fetchBlogs()
  const featuredCases = CASE_STUDIES.slice(0, 4)
  const featuredBlogs = blogPosts.slice(0, 3)

  return (
    <main className="tl-home">
      <HomeHero />

      <section className="tl-proof" aria-label="TenderLab recorded experience">
        <div className="tl-shell tl-proof__grid">
          <div className="tl-proof__intro">
            <p className="tl-kicker">A record stated precisely</p>
            <h2>Experience, with the qualification attached.</h2>
          </div>
          <div className="tl-stat tl-stat--coral">
            <strong>92%</strong>
            <span>Recorded historic win rate</span>
          </div>
          <div className="tl-stat tl-stat--blue">
            <strong>200+</strong>
            <span>Submissions supported</span>
          </div>
          <div className="tl-stat tl-stat--yellow">
            <strong>£50M+</strong>
            <span>Aggregate contract value</span>
          </div>
          <div className="tl-stat tl-stat--sage">
            <strong>5/5</strong>
            <span>Documented question scores</span>
          </div>
        </div>
      </section>

      <section className="tl-section tl-section--blue">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">How the work is controlled</p>
              <h2>From buyer documents to evidence an evaluator can score.</h2>
            </div>
            <p>
              Health and social care tenders compress years of operational practice into a fixed set of questions.
              Our job is to make the service model, safeguards and outcomes visible without forcing the evaluator to
              search for them.
            </p>
          </div>
          <div className="tl-method">
            {decisionStages.map((stage) => (
              <article key={stage.number} className="tl-method__item">
                <span>{stage.number}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tl-section tl-services" id="services">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">Tender writing services</p>
              <h2>Choose the support that matches the work in front of you.</h2>
            </div>
            <p>
              The right starting point depends on whether you are deciding, writing, reviewing or building a more
              consistent tender pipeline.
            </p>
          </div>

          <div className="tl-service-compare">
            {services.map((service) => (
              <article
                key={service.number}
                className={`tl-service-card${service.featured ? ' tl-service-card--featured' : ''}`}
              >
                <div className="tl-service-card__top">
                  <span>{service.number}</span>
                  {service.featured && <em>Most requested</em>}
                </div>
                <h3>{service.title}</h3>
                <p className="tl-service-card__prompt">{service.prompt}</p>
                <dl>
                  <div>
                    <dt>What TenderLab does</dt>
                    <dd>{service.outcome}</dd>
                  </div>
                  <div>
                    <dt>What you receive</dt>
                    <dd>{service.deliverable}</dd>
                  </div>
                </dl>
                <Link href={service.href} className="tl-card-link">
                  Explore {service.title.toLowerCase()} <Arrow />
                </Link>
              </article>
            ))}
          </div>
          <div className="tl-services__footer">
            <Link href="/services" className="tl-button tl-button--ink">
              Compare all tender services <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="tl-section tl-decision-guides">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">Before the searcher knows to ask for a bid writer</p>
              <h2>Start with the contract, eligibility or scoring question.</h2>
            </div>
            <p>
              Owners and registered managers do not always begin with tender terminology. These guides explain the
              public-sector route first, then show where specialist support may be useful.
            </p>
          </div>
          <div className="ep-guide-index">
            {decisionGuides.map((guide, index) => (
              <Link href={`/guides/${guide.slug}`} key={guide.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{guide.eyebrow}</small>
                <h2>{guide.title}</h2>
                <p>{guide.description}</p>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
          <div className="tl-services__footer">
            <Link href="/guides" className="tl-button tl-button--ink">
              Browse all tender guides <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="tl-section tl-cases">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">Documented results</p>
              <h2>Selected contract awards and the work behind them.</h2>
            </div>
            <p>
              Each case study separates the provider’s starting position, the procurement challenge and the result
              supported by available award evidence.
            </p>
          </div>
          <div className="tl-cases__grid">
            {featuredCases.map((study, index) => (
              <Link href={`/case-studies/${study.slug}`} key={study.slug} className="tl-case-card">
                <div className="tl-case-card__image">
                  <Image src={study.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <div className="tl-case-card__body">
                  <span>{String(index + 1).padStart(2, '0')} · {study.categoryLabel}</span>
                  <h3>{study.council}</h3>
                  <p>{study.result}</p>
                  <strong>Read the case study <Arrow /></strong>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/case-studies" className="tl-text-link tl-cases__all">
            View all documented case studies <Arrow />
          </Link>
        </div>
      </section>

      <section className="tl-section tl-clients">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">Direct TenderLab engagements</p>
              <h2>Care providers that have worked directly with TenderLab.</h2>
            </div>
            <p>
              Selected health and social care organisations supported through direct TenderLab engagements. Links
              lead to each provider’s own website.
            </p>
          </div>
          <div className="tl-client-grid">
            {DIRECT_CLIENTS.map((client) => (
              <a
                key={client.name}
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`tl-client${client.dark ? ' tl-client--dark' : ''}`}
                aria-label={`Visit provider — ${client.name} website`}
              >
                <span className={`tl-client__logo tl-client__logo--${client.treatment}`}>
                  <Image src={client.logo} alt={client.name} width={220} height={86} />
                </span>
                <small>Visit provider <Arrow /></small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="tl-section tl-testimonials">
        <div className="tl-shell">
          <div className="tl-section-heading">
            <p className="tl-kicker">Independent client feedback</p>
            <h2>What long-term tender support feels like from the client side.</h2>
          </div>
          <div className="tl-testimonials__grid">
            {VERIFIED_CLIENT_REVIEWS.slice(0, 2).map((review) => (
              <article key={review.organisation} className="tl-review">
                <div className={`tl-review__brand${review.darkLogo ? ' tl-review__brand--dark' : ''}`}>
                  {review.logo ? <Image src={review.logo} alt={review.organisation} width={176} height={64} /> : null}
                </div>
                <div className="tl-review__stars" aria-label="Five star review">★★★★★</div>
                <blockquote>“{review.quote?.split('\n\n')[0]}”</blockquote>
                <footer>
                  <span><strong>{review.person}</strong>{review.role}</span>
                  <a href={review.href} target="_blank" rel="noopener noreferrer">
                    Read verified review <Arrow />
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tl-section tl-insights">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">TenderLab blogs</p>
              <h2>Practical analysis for care providers pursuing public contracts.</h2>
            </div>
            <Link href="/blog" className="tl-text-link">Browse all blogs <Arrow /></Link>
          </div>
          {featuredBlogs.length > 0 ? (
            <div className="tl-insights__grid">
              {featuredBlogs.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="tl-blog-card">
                  <span>{post.category || 'Tender guidance'}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <small>{formatBlogDate(post.publishedAt)} <Arrow /></small>
                </Link>
              ))}
            </div>
          ) : (
            <div className="tl-insights__empty">
              <p>Current tender analysis and procurement guidance are available in the TenderLab blog.</p>
              <Link href="/blog" className="tl-button tl-button--ink">Open the blogs <Arrow /></Link>
            </div>
          )}
        </div>
      </section>

      <section className="tl-section tl-faqs">
        <div className="tl-shell tl-faqs__layout">
          <div className="tl-section-heading">
            <p className="tl-kicker">Frequently asked questions</p>
            <h2>Clear answers before you share the tender documents.</h2>
            <p>
              If your question is specific to a live opportunity, send the notice or procurement pack and we will
              respond in context.
            </p>
            <Link href="/contact" className="tl-text-link">Ask TenderLab <Arrow /></Link>
          </div>
          <div className="tl-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.q}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tl-contact-band">
        <div className="tl-shell tl-contact-band__inner">
          <div>
            <p className="tl-kicker">Have a tender in front of you?</p>
            <h2>Share the opportunity. We will start with the requirements.</h2>
          </div>
          <div className="tl-contact-band__actions">
            <Link href="/contact" className="tl-button tl-button--primary">Contact TenderLab <Arrow /></Link>
            <a href="tel:+441707240393">01707 240393</a>
            <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
          </div>
        </div>
      </section>
    </main>
  )
}
