import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Process | TenderLab — How We Win Tenders',
  description:
    'Six disciplined steps from Discovery Call to Submission-Ready document. See exactly how TenderLab engineers winning tender responses.',
}

const STEPS = [
  {
    num: 'Step 1',
    title: 'Discovery Call (1–2 hours)',
    desc: 'We begin with a structured intake call. We learn your organisation, your delivery model, your evidence base, and your target opportunity. We identify the gaps before the tender arrives and set the intelligence foundation for everything that follows.',
  },
  {
    num: 'Step 2',
    title: 'Tender Decode (2–3 days)',
    desc: 'The moment the ITT arrives, we dissect it completely. Every criterion extracted, weighted, and prioritised. Scoring frameworks reverse-engineered. Evaluator expectations mapped. Most providers start writing here. We have not written a word yet.',
  },
  {
    num: 'Step 3',
    title: 'Evidence Gathering (1–2 weeks)',
    desc: 'We conduct structured interviews with your team, review your policies, outcomes data, case studies, and quality records. We identify the evidence that will score, the gaps that need filling, and build an evidence bank calibrated to the specific mark scheme.',
  },
  {
    num: 'Step 4',
    title: 'Tender Writing (2–3 weeks)',
    desc: 'Each response is drafted against the criterion, not the question. We write with operational specificity, named individuals, measurable outcomes, and evidence woven directly into the scoring structure. Every draft is reviewed against the rubric before it progresses.',
  },
  {
    num: 'Step 5',
    title: 'Quality Assurance (1 week)',
    desc: 'We conduct internal review. We verify rubric alignment, simulate evaluator scoring, check compliance with all requirements, proofread for errors, and refine weak sections. Outcome: Refined bid with scoring simulation results and compliance verification.',
  },
  {
    num: 'Step 6',
    title: 'Submission Ready (2–3 days)',
    desc: 'Final proofing, formatting, pagination, and file preparation. We ensure your submission meets all technical requirements. Outcome: Submission-ready document(s), formatted and compliant.',
  },
]

const METHOD = [
  {
    num: '01',
    title: 'Specification Intelligence',
    desc: 'Full specification analysis before a word is written. Every evaluator criterion extracted, weighted, and mapped to the question structure.',
  },
  {
    num: '02',
    title: 'Framework-First Drafting',
    desc: "Each response is drafted against our 20-criterion scoring framework built from real evaluator feedback across 200+ submissions.",
  },
  {
    num: '03',
    title: 'Evidence Calibration',
    desc: 'Named staff. Specific case examples. Measurable outcomes. Dated policies. Every criterion that evaluators mark gets addressed precisely.',
  },
  {
    num: '04',
    title: 'Quality Gate',
    desc: 'No response leaves without scoring 4 or above on every criterion. The gate is not a review. It is a hard stop. If it does not pass, it does not go.',
  },
]

export default function ProcessPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="TenderLab process"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="page-hero__title">Our Process</h1>
          <p className="page-hero__sub">Six disciplined steps from Discovery Call to Submission-Ready document.</p>
        </div>
      </section>

      {/* ── Steps timeline ── */}
      <section className="proc-flow">
        <div className="container">
          <div className="proc-flow__header">
            <div className="section-label">The Journey</div>
            <h2 className="proc-flow__headline">From first conversation<br />to contract award.</h2>
            <p className="proc-flow__sub">Every engagement follows the same six-stage sequence. No shortcuts. No skipped steps. Each one exists because evaluators told us it matters.</p>
          </div>
          <div className="proc-flow__timeline">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`proc-step${i % 2 === 1 ? ' proc-step--alt' : ''}`}>
                <div className="proc-step__line">
                  <div className="proc-step__dot">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="proc-step__connector" />}
                </div>
                <div className="proc-step__card">
                  <span className="proc-step__tag">{s.num}</span>
                  <h3 className="proc-step__title">{s.title}</h3>
                  <p className="proc-step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Method ── */}
      <section className="proc-method">
        <div className="container">
          <div className="proc-method__header">
            <div className="section-label section-label--light">The Method</div>
            <h2 className="proc-method__headline">Other firms write tenders.<br />We engineer them.</h2>
            <p className="proc-method__sub">A four-pillar system built on evaluator intelligence and evidence precision.</p>
          </div>
          <div className="proc-method__grid">
            {METHOD.map((m, i) => (
              <div key={m.num} className="proc-mcard">
                <div className="proc-mcard__icon">
                  <span>{m.num}</span>
                </div>
                <h3 className="proc-mcard__title">{m.title}</h3>
                <p className="proc-mcard__desc">{m.desc}</p>
                {i < METHOD.length - 1 && (
                  <div className="proc-mcard__arrow" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="proc-method__cta">
            <Link href="/contact" className="btn btn-white">Book a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Get Started</p>
          <h2 className="services-cta__headline">Start the Process Today</h2>
          <p className="services-cta__sub">
            Book a free Discovery Call and we&apos;ll assess your position, your next opportunity, and what it would take to win.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Call</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
