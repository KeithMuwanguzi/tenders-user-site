import Link from 'next/link'
import Image from 'next/image'
import HeroSlider from '@/components/HeroSlider'

/* ── Data ── */
const serviceCards = [
  {
    tag: 'TENDER RETAINER',
    type: 'Strategic Partnership',
    title: 'Dedicated Pipeline Support',
    desc: 'Dedicated tender support with priority access. Your pipeline, our capacity.',
  },
  {
    tag: 'FULL TENDER WRITING',
    type: 'Complete Solution',
    title: 'End-to-End Bid Writing',
    desc: 'End-to-end tender writing. Specification analysis to submission-ready document.',
  },
  {
    tag: 'TENDER REVIEW',
    type: 'Quick Assessment',
    title: 'Independent Scoring Review',
    desc: 'Independent scoring against evaluator mark schemes. Know where you stand before you submit.',
  },
]


const contractWins = [
  {
    council: 'Essex County Council',
    care: 'Domiciliary Care',
    framework: 'Live at Home 2025 Framework',
  },
  {
    council: 'Southend-on-Sea City Council',
    care: "Children's Services",
    framework: "Children's Residential and Accommodation Framework",
  },
  {
    council: 'Bedford Borough Council',
    care: 'Supported Living',
    framework: 'Supported Living and Community Based Support Services Framework',
  },
  {
    council: 'Dorset Council',
    care: 'Multiple Lots',
    framework: 'Care, Support, Housing and Community Safety Framework',
  },
]

const portals = [
  'Find a Tender',
  'Contracts Finder',
  'ProContract',
  'Delta eSourcing',
  'Due North',
  'NEPO Open',
  'Bravo Solutions',
  'Proactis',
  'NHS SBS',
  'YPO Marketplace',
  'Crown Commercial Service',
  'Intend',
  'Atamis',
  'HealthTrust Europe',
  'NHS Supply Chain',
]

const services = [
  {
    title: 'Tender Review',
    desc: 'Independent evaluation against scoring criteria to identify strengths, gaps, and winning potential.',
    href: '/services#tender-review',
  },
  {
    title: 'Full Tender Writing',
    desc: 'End-to-end tender writing service from requirement analysis to submission-ready documentation.',
    href: '/services#bid-writing',
  },
  {
    title: 'Tender Retainer',
    desc: 'Ongoing expert support with priority access to manage and scale your tender pipeline.',
    href: '/services#retainer',
  },
]

const whyCards = [
  {
    title: 'Strategic Intelligence',
    desc: 'Data-driven insights to position your bid competitively and maximise scoring potential.',
  },
  {
    title: 'Collaborative Discovery',
    desc: 'We work closely with you to uncover key strengths and align your response with requirements.',
  },
  {
    title: 'Partner Success',
    desc: 'Focused on long-term wins, we support your growth with consistent tender success.',
  },
]

const methodologySteps = [
  {
    number: '01',
    title: 'Specification Intelligence',
    desc: 'Full specification analysis before a word is written. Every evaluator criterion extracted, weighted, and mapped to the question structure.',
  },
  {
    number: '02',
    title: 'Framework-First Drafting',
    desc: 'Each response is drafted against our 20-criterion scoring framework built from real evaluator feedback across 200+ submissions.',
  },
  {
    number: '03',
    title: 'Evidence Calibration',
    desc: 'Named staff. Specific case examples. Measurable outcomes. Dated policies. Every criterion that evaluators mark gets addressed precisely.',
  },
  {
    number: '04',
    title: 'Quality Gate',
    desc: 'No response leaves without scoring 4 or above on every criterion. The gate is not a review. It is a hard stop. If it does not pass, it does not go.',
  },
]

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'Operations Director, Compass Housing and Support · Supported Living, London',
    quote:
      'TenderLab transformed our bid writing process. Within 6 months of working with them, we had won three major council contracts worth £4.2M annually.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Managing Director, CarePlus Community · Domiciliary Care',
    quote:
      'We were struggling to compete against national chains. TenderLab helped us position our local expertise and community relationships as genuine competitive advantages. We now win 8 out of 10 tenders we submit.',
  },
  {
    name: 'Rebecca Carter',
    role: "Director, Rainbow Children's Services · Children's Services",
    quote:
      "As a new entrant to children's services, we had no track record. TenderLab built our evidence bank from scratch and prepared us brilliantly for council presentations. We won our first tender and haven't looked back.",
  },
  {
    name: 'Peter Morrison',
    role: 'CEO, Premier Care Solutions · Domiciliary Care',
    quote:
      "Our previous tenders weren't scoring well. TenderLab completely restructured how we present our evidence and outcomes. Our scores jumped from 6.8 to 9.2.",
  },
  {
    name: 'David Kingston',
    role: 'Director, Pathways Reablement · Specialist Services',
    quote:
      "We lost our NHS contract and needed to quickly establish ourselves across local authorities. TenderLab's strategic approach helped us secure five new contracts in six months.",
  },
  {
    name: 'Lisa Harrison',
    role: 'Commissioning Manager, Horizon Housing · Supported Living',
    quote:
      'What impressed us most was the strategic thinking. It is not just about writing pretty words. TenderLab helped us understand what councils really want to see and how to demonstrate our unique value.',
  },
]

const faqs = [
  {
    q: 'How does the 92% win rate hold up across different councils?',
    a: 'The 92% is calculated across 200+ submissions spanning domiciliary care, supported living, residential, step-down, and children\'s services across multiple local authorities including Bradford, West Sussex, Worcestershire, Dudley, Buckinghamshire, and NHS frameworks. It is not a figure from a single good run. The methodology works because it is built on pattern recognition across a consistent, single-sector data set.',
  },
  {
    q: 'We already have draft responses. Can TenderLab work from them?',
    a: 'Yes. Existing drafts are scored against the evaluator framework first. What passes, stays. What does not, gets rewritten. The most common outcome is a partial rewrite — the operational knowledge in your draft is valuable; the structure, evidence, and language typically need recalibrating against the mark sheet. You will receive a tracked version showing exactly what changed and why.',
  },
  {
    q: 'What is the turnaround time for a full submission?',
    a: 'Standard turnaround is 5 to 10 working days from receipt of your company information and the full tender documents. Rush submissions (2 to 4 working days) are available at additional cost and depend on current capacity. The single most important step is sending the ITT as early as possible after the tender is released — not 72 hours before the deadline.',
  },
  {
    q: "What if we score below threshold after you've written it?",
    a: 'It has happened in 11% of submissions. In every case, TenderLab provides a full post-result analysis at no additional cost — mapping evaluator feedback against the scoring framework to identify the specific gap. In several cases, re-submissions or appeals have been successful as a direct result of this analysis.',
  },
  {
    q: "We're a small provider. Is TenderLab right for us?",
    a: 'The majority of TenderLab clients are owner-managed providers with between 1 and 5 registered locations. The practice was built for organisations where a single contract win represents material growth — not for care corporates with internal bid teams. Send us the ITT and we will assess it. If TenderLab is not the right fit, we will tell you.',
  },
]

const blogPosts = [
  {
    title: 'Tender Writing Courses UK: 5 Options Compared',
    category: 'Bid Strategy',
    date: '22 Apr 2026',
    slug: '/tender-writing-courses-uk-5-options-compared',
  },
  {
    title: 'Tender Writing Software vs Human Bid Writers: 2026 Comparison',
    category: 'Commissioning Trends',
    date: '22 Apr 2026',
    slug: '/tender-writing-software-vs-human-bid-writers-2026-comparison',
  },
  {
    title: "Free Tender Writing Training: A Beginner's Guide",
    category: 'Bid Strategy',
    date: '22 Apr 2026',
    slug: '/free-tender-writing-training-a-beginners-guide',
  },
]

/* ── SVG helpers ── */
function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  )
}

function Stars() {
  return (
    <div className="testimonial-card__stars">
      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
    </div>
  )
}

/* ── Page ── */
export default function HomePage() {
  const portalsDuplicated = [...portals, ...portals]

  return (
    <main>
      {/* ─── HERO ─── */}
      <HeroSlider />

      {/* ─── SERVICES INTRO ─── */}
      <section className="services-intro">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Services</div>
            <h2>Three Ways We Help You Win</h2>
            <p>From a single submission review to ongoing pipeline support — choose the level of service that fits your bid strategy.</p>
          </div>
          <div className="services-intro__grid">
            {serviceCards.map((card) => (
              <div key={card.tag} className="service-card">
                <div className="service-card__tag">{card.tag}</div>
                <div className="service-card__type">{card.type}</div>
                <h3 className="service-card__title">{card.title}</h3>
                <p className="service-card__desc">{card.desc}</p>
                <Link href="/contact" className="service-card__cta">Get a Free Consultation</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTALS ─── */}
      <section className="portals">
        <div className="portals__heading">Portals We Work With</div>
        <div className="marquee-track">
          <div className="marquee-inner">
            {portalsDuplicated.map((p, i) => (
              <div key={i} className="marquee-item">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTRACT WINS ─── */}
      <section className="wins">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Achievement</div>
            <h2>Recent Contract Wins</h2>
            <p>Selected results across local authority and NHS frameworks.</p>
          </div>
          <div className="wins__grid">
            {contractWins.map((w, i) => (
              <div key={w.council} className="win-card">
                <div className="win-card__photo">
                  <Image
                    src={`/images/contracts/contract-${i + 1}.jpg`}
                    alt={`Contract win document: ${w.council}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                  <div className="win-card__photo-badge">Won</div>
                </div>
                <div className="win-card__body">
                  <div className="win-card__label">Care Setting: {w.care}</div>
                  <h3 className="win-card__council">{w.council}</h3>
                  <p className="win-card__framework">{w.framework}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="wins__cta">
            <Link href="/case-studies" className="btn btn-ghost">View More Case Studies</Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="about-snippet">
        <div className="container">
          <div className="about-snippet__inner">
            <div className="about-snippet__text">
              <div className="section-label">About Us</div>
              <h2 className="about-snippet__headline">
                Winning Contracts with Evidence-Led Precision.
              </h2>
              <p className="about-snippet__desc">
                TenderLab is a specialist tender writing and bid consultancy operating exclusively within UK health and social care procurement.
              </p>
              <div className="about-snippet__features">
                <div className="feature-item">
                  <div className="feature-item__icon">
                    <svg viewBox="0 0 640 512"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/></svg>
                  </div>
                  <div>
                    <div className="feature-item__title">Skilled team for your growth.</div>
                    <div className="feature-item__desc">Certified industry specialists.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-item__icon">
                    <svg viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>
                  </div>
                  <div>
                    <div className="feature-item__title">Reliable support you can count on.</div>
                    <div className="feature-item__desc">Focused on long-term success.</div>
                  </div>
                </div>
              </div>
              <div className="about-snippet__highlight">
                <strong>Evaluator-trained writers with care sector expertise</strong>
                <p>92% win rate across 200+ local authority and NHS submissions</p>
              </div>
              <Link href="/about" className="btn btn-primary">About Us</Link>
            </div>
            <div className="about-snippet__image">
              <svg viewBox="0 0 640 512" fill="none"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" fill="currentColor"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES OVERVIEW ─── */}
      <section className="services-overview">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Expert Services</div>
            <h2>Strategic Solutions for Winning Tenders</h2>
            <p>We deliver high-impact bid management and specialist consultancy to empower health and social care providers.</p>
          </div>
          <div className="services-overview__grid">
            {services.map((svc) => (
              <div key={svc.title} className="svc-card">
                <div className="svc-card__visual">
                  <svg viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/></svg>
                </div>
                <div className="svc-card__body">
                  <h3 className="svc-card__title">{svc.title}</h3>
                  <p className="svc-card__desc">{svc.desc}</p>
                  <Link href={svc.href} className="svc-card__link">View Service</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY PARTNER ─── */}
      <section className="why-partner">
        <div className="container">
          <div className="section-header">
            <div className="section-label" style={{ color: 'rgba(255,255,255,.6)' }}>
              Why Partner With Us
            </div>
            <h2>Success Isn&apos;t Luck. It&apos;s a Science.</h2>
            <p>
              Every year, hundreds of care providers invest immense effort into tender responses, yet many fail to secure the contract. The reason isn&apos;t a lack of quality care — it&apos;s because winning a tender is a precise science that most are simply guessing at.
            </p>
          </div>
          <p className="why-partner__text">
            Our unique methodology combines two exclusive advantages: the direct perspective of evaluators who mark the responses and deep operational care management expertise. This fusion is why our win rate remains unmatched in the industry.
          </p>
          <div className="why-partner__cta-row">
            <Link href="/contact" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
          <div className="why-partner__grid">
            {whyCards.map((card) => (
              <div key={card.title} className="why-card">
                <div className="why-card__icon">
                  <svg viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
                </div>
                <h3 className="why-card__title">{card.title}</h3>
                <p className="why-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY ─── */}
      <section className="methodology">
        <div className="container">
          <div className="methodology__header">
            <div className="section-label">The Method</div>
            <h2>Other firms write tenders.<br />We engineer them.</h2>
            <p>A four-stage process built on evaluator intelligence and evidence precision.</p>
          </div>
          <div className="methodology__grid">
            {methodologySteps.map((step) => (
              <div key={step.number} className="method-card">
                <div className="method-card__number">{step.number}</div>
                <h3 className="method-card__title">{step.title}</h3>
                <p className="method-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Client Testimonials</div>
            <h2>Real Results from Real Clients</h2>
            <p>We help care providers turn average bids into winning submissions.</p>
          </div>
          <div className="testimonials__grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <Stars />
                <p className="testimonial-card__quote">{t.quote}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials__more">
            <Link href="/reviews" className="btn btn-ghost">Read More Reviews</Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <div className="section-label">FAQs</div>
            <h2>Popular Questions &amp; Answers</h2>
            <p>No sales copy. The answers below are what a provider should know before deciding whether to work with TenderLab.</p>
          </div>
          <div className="faq__list">
            {faqs.map((item) => (
              <details key={item.q} className="faq__item">
                <summary>
                  {item.q}
                  <span className="faq__chevron">▾</span>
                </summary>
                <p className="faq__answer">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="faq__cta">
            <Link href="/contact" className="btn btn-ghost">Still Have Questions?</Link>
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="blog-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Blog &amp; News</div>
            <h2>From the Lab</h2>
            <p>Expert advice, industry trends, and actionable strategies for your business.</p>
          </div>
          <div className="blog-section__grid">
            {blogPosts.map((post) => (
              <Link href={post.slug} key={post.slug} className="blog-card">
                <div className="blog-card__img">
                  <svg viewBox="0 0 448 512"><path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zm-128 80H96c-26.5 0-48-21.5-48-48s21.5-48 48-48h224v96zm32-240H80v-32h272v32zm0-64H80v-32h272v32z"/></svg>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__date">{post.date}</span>
                    <span className="blog-card__category">{post.category}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <span className="blog-card__link">Learn more</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="blog-section__more">
            <Link href="/blog" className="btn btn-ghost">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <h2>Ready to Win Your Next Contract?</h2>
            <p>
              Get a free bid assessment — no obligation, no sales pressure. Just an honest evaluation of your tender opportunity.
            </p>
            <div className="cta-banner__actions">
              <Link href="/contact" className="btn btn-white">Get a Free Consultation</Link>
              <Link href="/process" className="btn btn-outline-white">View Our Process</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
