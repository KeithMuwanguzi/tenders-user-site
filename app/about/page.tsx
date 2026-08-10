import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'

export const metadata: Metadata = {
  title: 'About TenderLab | Health and Social Care Tender Writing Specialists',
  description: 'Meet TenderLab, a specialist UK health and social care tender writing consultancy with a recorded 92% historic win rate and more than 200 submissions supported as a separate measure.',
  alternates: { canonical: '/about' },
}

const method = [
  { n: '01', title: 'Understand the buyer', text: 'We read the notice, specification, conditions, question set and scoring descriptors before deciding how the response should be built.' },
  { n: '02', title: 'Understand the provider', text: 'We identify the real people, controls, records, case examples and outcomes that can support each promise in the submission.' },
  { n: '03', title: 'Build for the scoring sheet', text: 'The answer architecture follows the buyer’s requirements so evaluators can find the evidence and award marks without guesswork.' },
  { n: '04', title: 'Challenge before delivery', text: 'The draft is tested for compliance, completeness, operational credibility and clarity before it reaches the submission stage.' },
]

const faqs = [
  { q: 'What makes TenderLab different from a general bid writing company?', a: 'TenderLab works specifically in UK health and social care procurement. That focus matters because commissioner expectations, regulatory language, service models and evidence patterns vary significantly across care settings.' },
  { q: 'Who does TenderLab work with?', a: 'We support established providers, growing SMEs, first-time framework bidders and in-house bid teams across adult social care, children’s services, community health and housing support.' },
  { q: 'Are the performance figures guarantees?', a: 'No. The 92%, 200+, £50M+ and 5/5 figures are separate historic measures from TenderLab records. They describe past work and do not guarantee the outcome of a future procurement.' },
  { q: 'Does TenderLab invent case studies or operational evidence?', a: 'No. We improve how real evidence is selected, structured and expressed. Unsupported claims create commercial and delivery risk and should not appear in a submission.' },
]

export default function AboutPage() {
  return (
    <main className="ep-page">
      <EditorialHero
        eyebrow="About TenderLab"
        title="Tender writing built around the way care contracts are evaluated."
        intro="TenderLab is a specialist bid consultancy for UK health and social care providers. We translate genuine operational capability into submissions that are compliant, evidenced and easier to score."
        image="/images/editorial/tenderlab-about-practice-hero-v1.png"
        imageAlt="Tender specialists connecting care delivery, buyer requirements and operational evidence"
        primaryLabel="Contact TenderLab"
        secondaryLabel="See documented results"
        secondaryHref="/case-studies"
        tone="blue"
      />

      <section className="ep-section ep-about-position">
        <div className="ep-shell ep-about-position__grid">
          <div>
            <p className="ep-kicker">The practice</p>
            <h2>Specialist enough to understand the service, disciplined enough to follow the buyer.</h2>
          </div>
          <div className="ep-about-position__copy">
            <p>Health and social care tenders are not writing exercises. They test whether a provider can meet participation conditions, mobilise safely, govern delivery, evidence outcomes and sustain the commercial model.</p>
            <p>Our work brings those requirements together. We support domiciliary care, supported living, children’s services, residential and nursing care, community health, complex care and housing support providers across UK public procurement.</p>
          </div>
        </div>
      </section>

      <section className="ep-section ep-about-method">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div><p className="ep-kicker">How the work is controlled</p><h2>A method built to reduce evaluator effort.</h2></div>
            <p>Each stage has a clear purpose. The method stays consistent while the evidence and language change for the procurement in front of us.</p>
          </div>
          <div className="ep-method-grid">
            {method.map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-record">
        <div className="ep-shell">
          <div className="ep-record__intro"><p className="ep-kicker">Recorded experience</p><h2>Four different measures, stated separately.</h2></div>
          <div className="ep-record__stats">
            <div><strong>92%</strong><span>Recorded historic win rate</span></div>
            <div><strong>200+</strong><span>Submissions supported</span></div>
            <div><strong>£50M+</strong><span>Aggregate contract value linked to successful work</span></div>
            <div><strong>5/5</strong><span>Documented top question scores</span></div>
          </div>
          <p className="ep-record__note">These figures are historic records, not a promise that every future tender will be awarded.</p>
        </div>
      </section>

      <section className="ep-section ep-about-cta">
        <div className="ep-shell ep-about-cta__panel">
          <div><p className="ep-kicker">Work with TenderLab</p><h2>Bring the buyer documents. We will start with the evidence.</h2></div>
          <Link href="/contact" className="ep-button ep-button--primary">Contact us <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <EditorialFaq title="Questions about TenderLab and its approach." items={faqs} />
    </main>
  )
}
