import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'

const title = 'Tender Writing Process for UK Care Providers | TenderLab'
const description =
  'How TenderLab qualifies, structures, writes and reviews health and social care tenders from buyer-document assessment to submission-ready response.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/process' },
  openGraph: defaultOpenGraph({ title, description, path: '/process' }),
  twitter: defaultTwitter({ title, description }),
}

const stages = [
  {
    number: '01',
    label: 'Qualification',
    title: 'Check whether the opportunity fits',
    text: 'We read the published conditions, scope, lots, timetable and commercial requirements, then test them against your registration, geography, delivery model, evidence and mobilisation position.',
    output: 'A clear view of the fit, material gaps and responsible next step.',
  },
  {
    number: '02',
    label: 'Procurement map',
    title: 'Turn the buyer documents into a controlled plan',
    text: 'Every pass/fail condition, scored question, descriptor, word limit, attachment and submission rule is mapped before drafting begins.',
    output: 'A requirement map, ownership plan and evidence request.',
  },
  {
    number: '03',
    label: 'Evidence',
    title: 'Gather proof from the people who run the service',
    text: 'Structured working sessions identify the real roles, controls, records, case examples and outcomes that support each answer.',
    output: 'An evidence bank linked to the questions and scoring method.',
  },
  {
    number: '04',
    label: 'Writing',
    title: 'Build each response for the scoring sheet',
    text: 'We draft against the specification and descriptors, making responsibilities, sequence, frequency, oversight and outcomes easy for the evaluator to find.',
    output: 'Complete draft responses with traceable operational evidence.',
  },
  {
    number: '05',
    label: 'Independent challenge',
    title: 'Test what the evaluator can actually award',
    text: 'The draft is challenged for compliance, unsupported claims, missed requirements, repetition, readability and evidence strength.',
    output: 'A corrected response with clear actions for any unresolved gap.',
  },
  {
    number: '06',
    label: 'Submission control',
    title: 'Prepare the final response without breaking the rules',
    text: 'We complete the final check against word counts, filenames, attachments, declarations, portal rules and the agreed submission timetable.',
    output: 'Submission-ready files and a final compliance record.',
  },
]

const principles = [
  {
    title: 'Buyer documents come first',
    text: 'The specification, conditions and scoring descriptors determine the response—not a reusable generic template.',
  },
  {
    title: 'Evidence must be real',
    text: 'TenderLab improves the selection and expression of genuine operational evidence. Missing capability is identified, not disguised.',
  },
  {
    title: 'The provider retains decisions',
    text: 'Your authorised team approves factual claims, pricing, declarations and the final submission. We maintain a clear review trail.',
  },
]

const faqs = [
  {
    q: 'Will TenderLab start writing every tender we receive?',
    a: 'No. We first assess mandatory conditions, service scope, geography, registration, evidence, mobilisation and commercial fit. We will explain a material gap before proposing full writing work.',
  },
  {
    q: 'How long does the process take?',
    a: 'It depends on the procurement pack, number of questions, evidence available and deadline. We confirm a practical timetable only after reviewing the documents and current position.',
  },
  {
    q: 'Who supplies the evidence?',
    a: 'Your leadership and operational teams provide and approve company facts, policies, records, examples, pricing and declarations. TenderLab structures that information around the buyer’s requirements.',
  },
  {
    q: 'Does the process guarantee an award?',
    a: 'No. The buyer controls evaluation and award. The process is designed to improve compliance, evidence and evaluator clarity while being honest about risks that writing cannot remove.',
  },
]

export default function ProcessPage() {
  return (
    <main className="ep-page">
      <EditorialHero
        eyebrow="The TenderLab process"
        title="A controlled route from buyer documents to submission."
        intro="The work begins by deciding whether the tender fits. Only then do we map the requirements, gather evidence, draft, challenge and prepare the final response."
        image="/images/editorial/tenderlab-process-hero-v1.png"
        imageAlt="A controlled tender workflow connecting opportunity fit, evidence, drafting, review and submission"
        primaryLabel="Ask us to assess a tender"
        primaryHref="/contact"
        secondaryLabel="Compare tender services"
        secondaryHref="/services"
        tone="cream"
      />

      <section className="ep-section ep-process">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Six controlled stages</p>
              <h2>Every stage produces something the next stage needs.</h2>
            </div>
            <p>
              The exact timetable changes with the procurement. The sequence remains
              deliberate so the team does not start drafting before the conditions,
              responsibilities and evidence are understood.
            </p>
          </div>

          <div className="ep-process__list">
            {stages.map(stage => (
              <article key={stage.number}>
                <div className="ep-process__number">{stage.number}</div>
                <div className="ep-process__copy">
                  <span>{stage.label}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </div>
                <div className="ep-process__output">
                  <small>Stage output</small>
                  <p>{stage.output}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-process-principles">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Working principles</p>
              <h2>Good process protects the provider as well as the submission.</h2>
            </div>
            <p>
              Tender writing should not create promises the delivery team cannot keep.
              These controls keep the response connected to the real service.
            </p>
          </div>
          <div className="ep-process-principles__grid">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-process-cta">
        <div className="ep-shell ep-process-cta__grid">
          <div>
            <p className="ep-kicker">Have a live tender?</p>
            <h2>Start with the documents, deadline and intended lot.</h2>
          </div>
          <div>
            <p>
              Send the notice or procurement pack and a short description of your
              current service. We will review the position before recommending the
              writing support.
            </p>
            <Link href="/contact" className="ep-button ep-button--primary">
              Contact TenderLab <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <EditorialFaq title="Questions about the tender-writing process" items={faqs} />
    </main>
  )
}
