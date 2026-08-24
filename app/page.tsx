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
    image: '/images/editorial/tenderlab-readiness-audit-hero-v1.webp',
  },
  {
    number: '02',
    title: 'Complete bid writing',
    prompt: 'The tender is live and the submission still needs to be written.',
    outcome:
      'We map every scored requirement, gather operational proof and write the response through to final review.',
    deliverable: 'A submission-ready response aligned to the buyer documents.',
    href: '/services/bid-writing',
    image: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
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
    image: '/images/editorial/tenderlab-pre-submission-review-hero-v1.webp',
  },
  {
    number: '04',
    title: 'Retained tender support',
    prompt: 'Tendering is part of your growth plan, not a one-off project.',
    outcome:
      'We help manage the pipeline, strengthen the evidence bank and reserve writing capacity for suitable opportunities.',
    deliverable: 'A more controlled and repeatable tender function.',
    href: '/services/tender-retainer',
    image: '/images/editorial/tenderlab-retainer-hero-v1.webp',
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

function caseEditorialImage(category: string) {
  if (category === 'supported-living') return '/images/editorial/tenderlab-supported-living-hero-v1.jpg'
  if (category === 'domiciliary') return '/images/editorial/tenderlab-domiciliary-care-hero-v1.jpg'
  if (category === 'mental-health') return '/images/editorial/tenderlab-mental-health-hero-v1.jpg'
  if (category === 'childrens') return '/images/editorial/tenderlab-childrens-services-hero-v1.webp'
  return '/images/editorial/tenderlab-adult-social-care-hero-v1.webp'
}

export default async function HomePage() {
  const blogPosts = await fetchBlogs()
  const featuredCases = CASE_STUDIES.slice(0, 4)
  const featuredBlogs = blogPosts.slice(0, 3)

  return (
    <main className="tl-home">
      <HomeHero />

      <section className="rl-method" id="method">
        <div className="tl-shell rl-method__stage">
          <div className="rl-method__visual">
            <Image src="/images/editorial/tenderlab-process-hero-v1.webp" alt="Tender specialists mapping buyer requirements to operational evidence" fill sizes="(max-width: 900px) 100vw, 58vw" />
            <div className="rl-method__statement">
              <p className="tl-kicker">How the work is controlled</p>
              <h2>From buyer documents to evidence an evaluator can score.</h2>
              <p>Every scored requirement stays visible from qualification through final review.</p>
            </div>
          </div>
          <div className="rl-method__index">
            {decisionStages.map((stage) => (
              <article key={stage.number}>
                <span>{stage.number}</span>
                <div><h3>{stage.title}</h3><p>{stage.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rl-services" id="services">
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

          <div className="rl-services__grid">
            {services.slice(0, 3).map((service) => (
              <Link
                key={service.number}
                href={service.href}
                className="rl-service"
              >
                <div className="rl-service__media">
                  <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                  <span>{service.number}</span>
                </div>
                <div className="rl-service__body">
                  <div><h3>{service.title}</h3>{service.featured && <em>Most requested</em>}</div>
                  <p>{service.prompt}</p>
                  <p>{service.deliverable}</p>
                  <strong>Explore the service <Arrow /></strong>
                </div>
              </Link>
            ))}
          </div>
          <Link href={services[3].href} className="rl-service-feature">
            <div className="rl-service-feature__media">
              <Image src={services[3].image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
            <div className="rl-service-feature__body">
              <span>{services[3].number} · Tender function support</span>
              <h3>{services[3].title}</h3>
              <p>{services[3].prompt}</p>
              <p>{services[3].deliverable}</p>
              <strong>Explore retained tender support <Arrow /></strong>
            </div>
          </Link>
          <div className="tl-services__footer">
            <Link href="/services" className="tl-button tl-button--ink">
              Compare all tender services <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="rl-guides" id="guides">
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
          <div className="rl-guide-index">
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

      <section className="rl-cases" id="case-studies">
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
          <div className="rl-cases__grid">
            {featuredCases.map((study, index) => (
              <Link href={`/case-studies/${study.slug}`} key={study.slug} className="rl-case">
                <div className="rl-case__image">
                  <Image src={caseEditorialImage(study.category)} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <div className="rl-case__body">
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

      <section className="rl-clients" id="clients">
        <div className="tl-shell">
          <div className="rl-clients__stage">
            <div className="rl-clients__media"><Image src="/images/editorial/tenderlab-about-practice-hero-v1.webp" alt="TenderLab specialists working with health and social care providers" fill sizes="100vw" /></div>
            <div className="rl-clients__heading">
              <p className="tl-kicker">Direct TenderLab engagements</p>
              <h2>Care providers that have worked directly with TenderLab.</h2>
              <p>
              Selected health and social care organisations supported through direct TenderLab engagements. Links
              lead to each provider’s own website.
              </p>
            </div>
          </div>
          <div className="rl-client-strip" role="list">
            {DIRECT_CLIENTS.map((client) => (
              <a
                key={client.name}
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`rl-client${client.dark ? ' rl-client--dark' : ''}`}
                aria-label={`Visit ${client.name} website`}
                role="listitem"
              >
                <span className={`rl-client__logo rl-client__logo--${client.treatment}`}>
                  <Image src={client.logo} alt={client.name} width={220} height={86} />
                </span>
                <small>{client.name} <Arrow /></small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rl-testimonials" id="reviews">
        <div className="tl-shell">
          <div className="tl-section-heading">
            <p className="tl-kicker">Independent client feedback</p>
            <h2>What long-term tender support feels like from the client side.</h2>
          </div>
          <div className="rl-testimonials__grid">
            {VERIFIED_CLIENT_REVIEWS.slice(0, 2).map((review) => (
              <article key={review.organisation} className="rl-review">
                <div className={`rl-review__brand${review.darkLogo ? ' rl-review__brand--dark' : ''}`}>
                  {review.logo ? <Image src={review.logo} alt={review.organisation} width={176} height={64} /> : null}
                </div>
                <div className="rl-review__stars" aria-label="Five star review">★★★★★</div>
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

      <section className="rl-insights" id="insights">
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">TenderLab blogs</p>
              <h2>Practical analysis for care providers pursuing public contracts.</h2>
            </div>
            <Link href="/blog" className="tl-text-link">Browse all blogs <Arrow /></Link>
          </div>
          {featuredBlogs.length > 0 ? (
            <div className="rl-insights__grid">
              {featuredBlogs.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="rl-blog-card">
                  <div className="rl-blog-card__media"><Image src={post.imageUrl} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                  <div className="rl-blog-card__body">
                    <span>{post.category || 'Tender guidance'}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <small>{formatBlogDate(post.publishedAt)} <Arrow /></small>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Link href="/blog" className="rl-insights__fallback">
              <div className="rl-insights__fallback-media"><Image src="/images/editorial/tenderlab-blog-intelligence-hero-v1.webp" alt="Tender analysis prepared for health and social care providers" fill sizes="100vw" /></div>
              <div className="rl-insights__fallback-copy">
                <span>Current analysis</span>
                <h3>Read tender guidance written for care-provider decision-makers.</h3>
                <p>Explore procurement analysis, practical bid guidance and explanations of the questions providers ask before they commit to a tender.</p>
                <strong>Open the blogs <Arrow /></strong>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="rl-faqs" id="faqs">
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

      <section className="rl-consultation" id="consultation">
        <div className="tl-shell rl-consultation__panel">
          <div className="rl-consultation__image"><Image src="/images/editorial/tenderlab-contact-briefing-hero-v1.webp" alt="A TenderLab specialist preparing for a consultation with a care provider" fill sizes="(max-width: 820px) 100vw, 55vw" /></div>
          <div className="rl-consultation__copy">
            <p className="tl-kicker">Book a consultation</p>
            <h2>Choose a focused session with the preparation already defined.</h2>
            <p>Book tender advice, a feedback debrief, a readiness review or a full tender briefing. Prices reflect the document review completed before the session.</p>
            <Link href="/book-consultation" className="tl-button tl-button--primary">View consultation options <Arrow /></Link>
            <p className="rl-consultation__contact"><a href="tel:+441707240393">01707 240393</a><a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a></p>
          </div>
        </div>
      </section>
    </main>
  )
}
