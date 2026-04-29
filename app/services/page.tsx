import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Services | TenderLab — Health & Social Care Tender Writing',
  description:
    'Specialist tender writing and bid consultancy services for UK health and social care providers. Bid Writing, Pre-Submission Review, Lost Bid Debrief, and more.',
}

const SERVICES = [
  {
    id: 'bid-writing',
    num: '01',
    title: 'Bid Writing',
    tagline: 'Specification-led writing. Evaluator-tested precision.',
    desc: 'Commissioning bodies across UK health and social care are raising the bar on every scored submission. Evaluation criteria are becoming more granular, mark schemes more demanding, and the gap between a compliant response and a winning one continues to narrow. Generic content no longer passes threshold. Evaluators expect operational specificity, named evidence.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/mature-person-college-campus-study-area-writing-notes-ideas_482257-122475-1-rlxsw0xj5uov2nobza9nq3rjnjyvq9lmnhk2isxyuk.jpg',
    href: '/services/bid-writing',
  },
  {
    id: 'pre-submission-review',
    num: '02',
    title: 'Pre-Submission Review',
    tagline: 'Independent scoring. Evaluator-level scrutiny.',
    desc: "Submitting a tender without an independent review is the single most common reason providers score below threshold. Internal teams are too close to the content. They know what they meant to say, so they read what they intended rather than what the evaluator will actually mark. TenderLab's Pre-Submission Review applies the same 20-criterion scoring framework used by commissioning bodies.",
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/business-team-situation-present-share-idea-scaled-rlxsy44mcljsvgn3s6rt9ksf6do8u1w5ltqwwxuh0s.jpg',
    href: '/services/pre-submission-review',
  },
  {
    id: 'lost-bid-debrief',
    num: '03',
    title: 'Lost Bid Debrief',
    tagline: 'Evidence-based analysis. Actionable intelligence.',
    desc: 'Losing a tender is costly. Losing the same way twice is avoidable. Most providers receive a results letter and evaluator feedback but lack the framework to translate that information into meaningful improvements. Feedback is often vague, scores are listed without context, and the real reasons for the loss remain unclear.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/two-men-discussing-contract-desk_31965-128846-rlxnbi11686q9ey6wluvspfhgcbxmtj32zb0tq9i98.jpg',
    href: '/services/lost-bid-debrief',
  },
  {
    id: 'tender-readiness-audit',
    num: '04',
    title: 'Tender Readiness Audit',
    tagline: 'Assessed capability. Identified gaps. Clear action plan.',
    desc: 'Winning tenders starts before the ITT is released. Providers who wait for a tender opportunity to assess their readiness are already behind. The organisations that score highest are those with pre-built evidence banks, current policies, documented outcomes, and a clear understanding of what commissioning bodies expect before the clock starts.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/service5-rld2tb6l874u29gi0ghbat2xqz5o9gd2l6ub88mmcs.webp',
    href: '/services/tender-readiness-audit',
  },
  {
    id: 'bid-team-coaching',
    num: '05',
    title: 'Bid Team Coaching',
    tagline: 'Practical skills. Evaluator perspective. Lasting capability.',
    desc: 'Many care providers want to develop the internal capability to write and manage tenders without permanent reliance on external consultants. The challenge is that tender writing in health and social care is a specialist discipline. It requires understanding how evaluators think and what commissioning bodies genuinely look for.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/team-architects-working-town-project-conference-room-architect-business-suit_482257-26513-rlech3dwy1clh1rrgzpxq067wt5p662hx5uscbdh2k.jpg',
    href: '/services/bid-team-coaching',
  },
  {
    id: 'pipeline-tracking',
    num: '06',
    title: 'Pipeline Tracking',
    tagline: 'Organised opportunities. Strategic priorities. No missed deadlines.',
    desc: 'Tender opportunities in UK health and social care are published across multiple portals, frameworks, and Dynamic Purchasing Systems with varying timescales, different submission requirements, and overlapping deadlines. Providers who rely on ad hoc monitoring miss opportunities.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg',
    href: '/services/pipeline-tracking',
  },
  {
    id: 'mobilisation-support',
    num: '07',
    title: 'Mobilisation Support',
    tagline: 'Contract won. Delivery planned. Transition secured.',
    desc: 'Winning a health and social care contract is the starting point, not the finish line. Commissioning bodies expect a detailed mobilisation plan that demonstrates your ability to transition from contract award to full operational delivery within the specified timeframe.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/two-colleagues-working-together-office-color-background-corporate-business-colleagues-working_265223-44392-rlxnlsdfyy9pbs08u1xw33z3i5mjvkdbtwcbwr0e5o.jpg',
    href: '/services/mobilisation-support',
  },
  {
    id: 'tender-retainer',
    num: '08',
    title: 'Tender Retainer',
    tagline: 'Ongoing partnership. Priority access. Consistent results.',
    desc: 'For providers with a regular flow of tender opportunities, a retainer arrangement delivers the consistency, priority access, and strategic oversight that one-off engagements cannot. The commissioning landscape in UK health and social care moves continuously.',
    img: 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs/businessman-shaking-hand-with-his-colleague-office-scaled-rlxt0xn6uperpcjnbeniqv67bzrvxd35zs7cqtnycs.jpg',
    href: '/services/tender-retainer',
  },
]

const CONTRACTS = [
  {
    img: '/images/contracts/contract-1.jpg',
    council: 'Essex County Council',
    care: 'Domiciliary Care',
    framework: 'Live at Home 2025 Framework',
  },
  {
    img: '/images/contracts/contract-2.jpg',
    council: 'Southend-on-Sea City Council',
    care: "Children's Services",
    framework: "Children's Residential & Accommodation Framework",
  },
  {
    img: '/images/contracts/contract-3.jpg',
    council: 'Bedford Borough Council',
    care: 'Supported Living',
    framework: 'Supported Living and Community Based Support Framework',
  },
  {
    img: '/images/contracts/contract-4.jpg',
    council: 'Dorset Council',
    care: 'Multiple Lots',
    framework: 'Care, Support, Housing and Community Safety Framework',
  },
]

const TESTIMONIALS = [
  {
    quote: 'TenderLab transformed our bid writing process. Within 6 months of working with them, we had won three major council contracts worth £4.2M annually.',
    author: 'James Mitchell',
    role: 'Operations Director',
    org: 'Compass Housing and Support',
    sector: 'Supported Living, London',
  },
  {
    quote: 'We were struggling to compete against national chains. TenderLab helped us position our local expertise and community relationships as genuine competitive advantages. We now win 8 out of 10 tenders we submit.',
    author: 'Sarah Mitchell',
    role: 'Managing Director',
    org: 'CarePlus Community',
    sector: 'Domiciliary Care',
  },
  {
    quote: "What impressed us most was the strategic thinking. TenderLab helped us understand what councils really want to see and how to demonstrate our unique value.",
    author: 'Lisa Harrison',
    role: 'Commissioning Manager',
    org: 'Horizon Housing',
    sector: 'Supported Living',
  },
  {
    quote: "Our previous tenders weren't scoring well. TenderLab completely restructured how we present our evidence and outcomes. Our scores jumped from 6.8 to 9.2.",
    author: 'Peter Morrison',
    role: 'CEO',
    org: 'Premier Care Solutions',
    sector: 'Domiciliary Care',
  },
]

const FAQS = [
  {
    q: 'What exactly does TenderLab do?',
    a: "TenderLab specialises in helping care sector organisations win tender competitions. We provide expert tender and bid writing services, strategic bid reviews, evidence development, and training for health and social care providers across all care sectors including domiciliary care, residential care, day services, nursing care, children's services, and supported living.",
  },
  {
    q: 'What makes TenderLab different from other tender consultants?',
    a: "We specialise exclusively in the care sector, which means we understand the specific evaluation criteria, tender language, and compliance requirements that matter most to councils and authorities buying care services. We focus heavily on scoring intelligence — our team regularly reviews tender feedback reports and evaluation panels, so we know what evaluators actually look for beyond what is written in the tender documents.",
  },
  {
    q: 'Which care sectors do you work with?',
    a: "Health and Social Care, Children's Services, Domiciliary Care, Day Services, Extra Care Services, Live-In Care Services, Housing Support, Reablement Services, Nursing Care, Residential Care, Shared Lives, Short Breaks (Respite Care), Care Home Accommodation, Supported Living, Supported Accommodation, Emergency Accommodation, and Temporary Accommodation.",
  },
  {
    q: 'Do you work with independent providers or only larger organisations?',
    a: 'We work with providers of all sizes, from single-service independent providers through to large multi-service organisations. Our data shows that smaller, well-positioned providers often win more often than larger competitors because they bid more selectively and write more authentic, focused responses.',
  },
  {
    q: 'Can you help us with services we are not currently delivering?',
    a: "Yes. We regularly help providers expand into new service areas through tender bids. We will help you articulate your ability to develop new services, bring in partners where needed, and demonstrate how your existing capabilities transfer to new areas. We are always honest about what is realistic.",
  },
]

export default function ServicesPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="Professional bid writing services"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="page-hero__title">Services</h1>
          <p className="page-hero__sub">Strategic solutions for winning health and social care tenders.</p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-cards">
            {SERVICES.map((s) => (
              <article key={s.id} id={s.id} className="svc-card-wp">
                <div className="svc-card-wp__header">
                  <span className="svc-card-wp__num">{s.num}</span>
                  <h3 className="svc-card-wp__title">{s.title}</h3>
                </div>
                <div className="svc-card-wp__img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.title} loading="lazy" />
                </div>
                <div className="svc-card-wp__body">
                  <p className="svc-card-wp__tagline">{s.tagline}</p>
                  <p className="svc-card-wp__desc">{s.desc}</p>
                  <Link href={s.href} className="svc-card-wp__btn">View More</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className="why-partner">
        <div className="container">
          <div className="why-partner__intro">
            <div className="why-partner__intro-text">
              <p className="section-label">Why Partner With Us</p>
              <h2 className="why-partner__headline">
                Success Isn&apos;t Luck.<br />It&apos;s a Science.
              </h2>
              <p className="why-partner__text">
                Every year, hundreds of care providers invest immense effort into tender responses, yet many fail to secure the contract. The reason isn&apos;t a lack of quality care — it&apos;s because winning a tender is a precise science that most are simply guessing at.
              </p>
              <p className="why-partner__text">
                Our unique methodology combines two exclusive advantages: the direct perspective of evaluators who mark the responses and deep operational care management expertise. This fusion is why our 92% win rate remains unmatched in the industry.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Get a Free Consultation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
            <div className="why-partner__intro-stat">
              <div className="why-partner__big-stat">
                <span className="why-partner__big-num">92<span>%</span></span>
                <span className="why-partner__big-label">Win Rate</span>
              </div>
              <div className="why-partner__big-stat">
                <span className="why-partner__big-num">200<span>+</span></span>
                <span className="why-partner__big-label">Submissions</span>
              </div>
              <div className="why-partner__big-stat">
                <span className="why-partner__big-num">10<span>+</span></span>
                <span className="why-partner__big-label">Years in Care Sector</span>
              </div>
            </div>
          </div>
          <div className="why-partner__grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                ),
                title: 'Strategic Intelligence',
                desc: 'Data-driven insights to position your bid competitively and maximise scoring potential.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                ),
                title: 'Collaborative Discovery',
                desc: 'We work closely with you to uncover key strengths and align your response with requirements.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                ),
                title: 'Partner Success',
                desc: 'Focused on long-term wins, we support your growth with consistent tender success.',
              },
            ].map((c) => (
              <div key={c.title} className="why-card">
                <div className="why-card__icon">{c.icon}</div>
                <h3 className="why-card__title">{c.title}</h3>
                <p className="why-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Projects ── */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-section__head">
            <div>
              <p className="section-label">Case Studies</p>
              <h2>Our Recent Projects</h2>
              <p>Delivering high-impact tender solutions that consistently win competitive contracts.</p>
            </div>
            <Link href="/case-studies" className="btn btn-primary">
              View All Case Studies
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>
          <div className="projects-grid">
            {CONTRACTS.map((c) => (
              <div key={c.council} className="project-card">
                <div className="project-card__img">
                  <Image src={c.img} alt={`${c.council} contract award`} fill style={{ objectFit: 'cover' }} />
                  <span className="project-card__badge">Won</span>
                </div>
                <div className="project-card__body">
                  <p className="project-card__council">{c.council}</p>
                  <p className="project-card__care">{c.care}</p>
                  <p className="project-card__framework">{c.framework}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="svcs-testimonials">
        <div className="svcs-testimonials__bg" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header centered">
            <p className="section-label" style={{ color: 'rgba(212,56,44,0.85)' }}>
              <span style={{ background: 'rgba(212,56,44,0.85)' }} />
              Client Testimonials
            </p>
            <h2 style={{ color: '#ffffff' }}>Real Results from Real Clients</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>
              We help businesses turn average bids into winning submissions — here&apos;s what our clients say about working with us.
            </p>
          </div>
          <div className="svcs-testimonials__grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="svcs-testimonial-card">
                <div className="svcs-testimonial-card__stars">★★★★★</div>
                <blockquote className="svcs-testimonial-card__quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <footer className="svcs-testimonial-card__footer">
                  <strong className="svcs-testimonial-card__name">{t.author}</strong>
                  <span>{t.role}, {t.org}</span>
                  <span className="svcs-testimonial-card__sector">{t.sector}</span>
                </footer>
                <span className="svcs-testimonial-card__mark" aria-hidden="true">&rdquo;</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/reviews" className="btn btn-primary">
              Read More Reviews
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-section__inner">
            <div className="faq-section__header">
              <p className="section-label">FAQs</p>
              <h2>Popular Questions &amp; Answers</h2>
              <p>No sales copy. The answers below are what a provider should know before deciding whether to work with TenderLab.</p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: 28 }}>Still Have Questions?</Link>
            </div>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-item__q">{f.q}</summary>
                  <p className="faq-item__a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Get Started</p>
          <h2 className="services-cta__headline">Ready to Win Your Next Tender?</h2>
          <p className="services-cta__sub">
            Talk to our team today for a free, no-obligation consultation. We&apos;ll assess your current position and tell you honestly what&apos;s possible.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Get a Free Consultation</Link>
            <Link href="/process" className="btn btn-outline-white">See Our Process</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
