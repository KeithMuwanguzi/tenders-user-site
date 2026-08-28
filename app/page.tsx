import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchBlogs, formatBlogDate } from '@/lib/blogs'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { DIRECT_CLIENTS } from '@/lib/client-proof'
import { DECISION_GUIDE_BY_SLUG } from '@/lib/decision-guides'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import HomeHero from '@/components/HomeHero'
import HomeReviewCarousel from '@/components/HomeReviewCarousel'
import HomeMotion from '@/components/HomeMotion'
import LondonTransition from '@/components/LondonTransition'
import TenderPhotoChapter from '@/components/TenderPhotoChapter'
import { fetchPublishedTenders, type PublishedTenderSnapshot } from '@/lib/published-tenders'

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
    title: 'Complete bid writing',
    prompt: 'The tender is live and the submission still needs to be written.',
    outcome:
      'We map every scored requirement, gather operational proof and write the response through independent review and final quality control.',
    deliverable: 'A submission-ready response aligned to the buyer documents.',
    href: '/services/bid-writing',
    image: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
    featured: true,
  },
  {
    number: '02',
    title: 'Bid viability',
    prompt: 'You have found an opportunity and need to know whether it fits.',
    outcome:
      'We test the published conditions, available evidence, mobilisation position and price before your team commits.',
    deliverable: 'A recorded bid or no-bid recommendation, with risks and actions.',
    href: '/services/bid-viability',
    image: '/images/editorial/tenderlab-readiness-audit-hero-v1.webp',
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

const decisionGuideSlugs = [
  'how-to-get-domiciliary-care-contracts',
  'how-to-get-supported-living-contracts',
  'do-you-need-a-cqc-rating-to-bid',
  'why-care-providers-lose-tenders',
]

const decisionGuides = decisionGuideSlugs
  .map((slug) => DECISION_GUIDE_BY_SLUG.get(slug))
  .filter((guide) => guide !== undefined)

const expertise = [
  {
    number: '01',
    title: 'Care experience from the frontline upwards',
    text: 'Our team includes carers and registered managers who understand staffing, safeguarding, records, quality assurance and the day-to-day reality behind a care contract.',
    image: '/images/editorial/tenderlab-care-evidence-hero-v1.webp',
  },
  {
    number: '02',
    title: 'Tender writers who work only in healthcare',
    text: 'We do not move between unrelated industries. Our bid practice is built around health and social care standards, commissioning models and the evidence care providers actually hold.',
    image: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
  },
  {
    number: '03',
    title: 'Insight from the evaluator side',
    text: 'Consultants with local-authority procurement and evaluation experience help us test how each claim will be read, challenged and scored before it reaches the buyer.',
    image: '/images/editorial/tenderlab-proof-hero-v1.webp',
  },
]

function tenderDaysLeft(deadline: string | null) {
  if (!deadline) return 'Deadline in notice'
  const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86_400_000)
  if (days <= 0) return 'Closing today'
  return `${days} day${days === 1 ? '' : 's'} left`
}

function isCurrentTender(tender: PublishedTenderSnapshot) {
  return !tender.deadline || new Date(tender.deadline).getTime() >= Date.now()
}

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

const tenderRailImages = [
  '/images/editorial/tenderlab-domiciliary-care-hero-v1.jpg',
  '/images/editorial/tenderlab-supported-living-hero-v1.jpg',
  '/images/editorial/tenderlab-childrens-services-hero-v1.webp',
  '/images/editorial/tenderlab-complex-care-chc-hero-v1.jpg',
  '/images/editorial/tenderlab-residential-care-hero-v1.jpg',
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default async function HomePage() {
  const [blogPosts, publishedTenders] = await Promise.all([fetchBlogs(), fetchPublishedTenders(80)])
  const featuredCases = CASE_STUDIES.slice(0, 4)
  const featuredBlogs = blogPosts.slice(0, 3)
  const liveTenders = publishedTenders
    .filter(isCurrentTender)
    .sort((a, b) => !a.deadline ? 1 : !b.deadline ? -1 : new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 8)

  return (
    <main className="tl-home">
      <HomeMotion />
      <HomeHero />
      <LondonTransition variant="layered" className="tl-london--after-hero" />

      {liveTenders.length > 0 ? (
        <section className="tl-tender-ticker" aria-label="Current healthcare tender opportunities">
          <div className="tl-tender-ticker__label"><span>Live</span> Healthcare tenders</div>
          <div className="tl-tender-ticker__viewport">
            <div className="tl-tender-ticker__track">
              {[...liveTenders, ...liveTenders].map((tender, index) => (
                <Link
                  href={`/tenders/${encodeURIComponent(tender.id)}`}
                  key={`${tender.id}-${index}`}
                  aria-hidden={index >= liveTenders.length ? true : undefined}
                  tabIndex={index >= liveTenders.length ? -1 : undefined}
                >
                  <span className="tl-tender-ticker__image"><Image src={tenderRailImages[index % tenderRailImages.length]} alt="" fill sizes="72px" /></span>
                  <strong>{tender.title}</strong>
                  <span>{tender.organisation || 'Public-sector buyer'}</span>
                  <em>{tenderDaysLeft(tender.deadline)}</em>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/tenders" className="tl-tender-ticker__all">Go to tenders <Arrow /></Link>
        </section>
      ) : null}

      <TenderPhotoChapter />
      <LondonTransition variant="edge" />

      <section className="tl-proof tl-proof--explained" aria-labelledby="record-heading" data-reveal>
        <div className="tl-shell">
          <div className="tl-proof__heading">
            <div><p className="tl-kicker">Recorded TenderLab results</p><h2 id="record-heading">A high win rate begins before the first answer is written.</h2></div>
            <p>We qualify the opportunity first, then put every response through separate drafting, independent review and evaluator-led final scoring.</p>
          </div>
          <div className="tl-proof__story">
            <article className="tl-proof__feature">
              <div><strong>92%</strong><span>Recorded historic win rate</span></div>
              <p>Before accepting an instruction, we read the buyer documents and brief the client on eligibility, evidence, delivery risk and whether the opportunity is genuinely worth pursuing. Drafts then move from the writing team to independent reviewers and a final evaluator-experienced supervisor before the client approves submission.</p>
              <small>If a bid is lost because our quality responses did not achieve the required marks, the next tender-writing fee is on us, subject to our terms of service.</small>
              <Link href="/terms" className="tl-text-link">Read the terms <Arrow /></Link>
            </article>
            <div className="tl-proof__supporting">
              <article><strong>200+</strong><span>Submissions supported</span></article>
              <article><strong>£50M+</strong><span>Aggregate contract value</span></article>
              <article><strong>5/5</strong><span>Documented question scores</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="tl-section tl-services" id="services" data-reveal>
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

          <Link href={services[0].href} className="tl-service-feature">
            <div className="tl-service-feature__media">
              <Image src={services[0].image} alt="Tender writers preparing a complete healthcare tender response" fill sizes="(max-width: 760px) 100vw, 55vw" />
              <span>01</span>
            </div>
            <div className="tl-service-feature__body">
              <div className="tl-service-card__top"><em>Most requested</em></div>
              <h3>{services[0].title}</h3>
              <p>{services[0].prompt}</p>
              <p>{services[0].outcome}</p>
              <strong>Explore complete tender writing <Arrow /></strong>
            </div>
          </Link>

          <div className="tl-service-compare tl-service-compare--secondary">
            {services.slice(1).map((service) => (
              <Link key={service.number} href={service.href} className="tl-service-card">
                <div className="tl-service-card__image"><Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{service.number}</span></div>
                <div className="tl-service-card__body">
                  <h3>{service.title}</h3>
                  <p className="tl-service-card__prompt">{service.prompt}</p>
                  <p>{service.deliverable}</p>
                  <strong>Explore the service <Arrow /></strong>
                </div>
              </Link>
            ))}
          </div>
          <div className="tl-services__footer">
            <Link href="/services" className="tl-button tl-button--primary">
              Compare all tender services <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <LondonTransition variant="overlap" />

      <section className="tl-section tl-expertise" aria-labelledby="expertise-heading" data-reveal>
        <div className="tl-shell">
          <div className="tl-expertise__intro">
            <p className="tl-kicker">Healthcare is our only field</p>
            <h2 id="expertise-heading">We do not write tenders for every industry. We specialise in care.</h2>
            <p>That single-sector focus means the people shaping your response understand the service, the management evidence and the way a public-sector evaluator reads it.</p>
          </div>
          <div className="tl-expertise__grid">
            {expertise.map((item) => (
              <article key={item.number}>
                <div className="tl-expertise__image"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <Link href="/services/bid-writing" className="tl-button tl-button--primary">Explore healthcare tender writing <Arrow /></Link>
        </div>
      </section>

      <section className="tl-section tl-decision-guides" data-reveal>
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
            <Link href="/guides" className="tl-button tl-button--primary">
              Browse all tender guides <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <LondonTransition variant="panorama" />

      <section className="tl-section tl-cases" data-reveal>
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
                  <b className="tl-award-seal" aria-label="Contract award supported by TenderLab"><span>Contract</span><strong>won</strong></b>
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

      <LondonTransition variant="edge" className="tl-london--reverse" />

      <section className="tl-section tl-clients" data-reveal>
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

      <section className="tl-section tl-testimonials" data-reveal>
        <div className="tl-shell">
          <div className="tl-section-heading">
            <p className="tl-kicker">Independent client feedback</p>
            <h2>What long-term tender support feels like from the client side.</h2>
          </div>
          <HomeReviewCarousel />
          <div className="tl-review-actions">
            <a href="https://g.page/r/CarBdrVY3WO4EBM/review" target="_blank" rel="noopener noreferrer" className="tl-button tl-button--primary">Read our Google reviews <Arrow /></a>
            <a href="https://uk.trustpilot.com/review/tenderlab.co.uk" target="_blank" rel="noopener noreferrer" className="tl-button">Read our Trustpilot reviews <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="tl-section tl-insights" data-reveal>
        <div className="tl-shell">
          <div className="tl-section-heading tl-section-heading--split">
            <div>
              <p className="tl-kicker">TenderLab blogs</p>
              <h2>Practical analysis for care providers pursuing public contracts.</h2>
            </div>
            <Link href="/blog" className="tl-text-link">Browse all blogs <Arrow /></Link>
          </div>
          {featuredBlogs.length > 0 ? (
            <div className="tl-insights__grid tl-insights__grid--image-led">
              {featuredBlogs.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="tl-blog-card">
                  <div className="tl-blog-card__image"><Image src={post.imageUrl} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                  <div className="tl-blog-card__body">
                    <span>{post.category || 'Tender guidance'}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <small>{formatBlogDate(post.publishedAt)} <Arrow /></small>
                  </div>
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

      <LondonTransition variant="panorama" className="tl-london--quiet" />

      <section className="tl-section tl-faqs" data-reveal>
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

      <section className="tl-contact-band" data-reveal>
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
      <LondonTransition variant="river" />
    </main>
  )
}
