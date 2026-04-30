import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | TenderLab — The Science of Winning Tenders',
  description:
    'TenderLab structures submissions to meet the exact system used by local authorities and commissioning bodies to score, rank, and award contracts across UK health and social care.',
}

const SECTIONS = [
  {
    num: '01',
    label: 'Our position',
    heading: 'We work to the scoring system',
    content: (
      <>
        <p>Tender outcomes are not determined by writing quality in isolation. They are determined by how precisely a response aligns to the evaluation model set out in the specification. Each procurement defines weighted questions, subpoints, and minimum thresholds. Marks are awarded only where delivery is evidenced clearly against those criteria.</p>
        <p>Across multiple procurements, evaluation feedback shows the same patterns. Responses described as &ldquo;generic&rdquo; or lacking context reduce evaluator confidence and limit scoring. Where operational delivery is not clearly evidenced, or where responses fail to address specific subpoints, marks are withheld even where overall intent is acceptable.</p>
        <div className="pull">We build submissions to remove those risks at source by structuring every response around the scoring system itself.</div>
      </>
    ),
  },
  {
    num: '02',
    label: 'Experience and capability',
    heading: 'Experience and capability',
    content: (
      <>
        <p>Work is delivered across adult social care, children&apos;s services, housing and support, and health and clinical provision, aligned to how services are commissioned and evaluated.</p>
        <p>This includes supported living, domiciliary care, children&apos;s residential and supported accommodation, mental health provision, learning disability services, and housing-related support. Submissions are structured for framework agreements, Dynamic Purchasing Systems, provider lists, and direct contracts.</p>
        <p>Across these procurements, submissions have been evaluated within highly competitive environments. In one framework, 154 submissions were received, with only 44 providers successfully appointed following scoring against published criteria and minimum thresholds.</p>
        <p>Appointments have been secured across multi-lot frameworks and DPS agreements following formal evaluation processes and standstill procedures prior to contract award.</p>
        <p>Evaluation models commonly apply a quality weighting of up to 80 percent, with scoring focused on service delivery, safeguarding, workforce, and outcomes rather than price alone.</p>
        <div className="pull">This reflects the environment in which submissions are delivered and the level of precision required to achieve appointment.</div>
      </>
    ),
  },
  {
    num: '03',
    label: 'Who we work with',
    heading: 'Who we work with',
    content: (
      <>
        <p>We work with providers at different stages of development and across different levels of internal capability.</p>
        <p>This includes organisations entering the tender market for the first time, without prior framework experience or a developed evidence base. It includes small providers delivering strong services but without internal bid-writing capacity. It includes organisations expanding into new local authority areas or new service lines, where alignment to different commissioning approaches is required.</p>
        <p>We also work with established providers who submit regularly but experience inconsistent scoring across tenders, often due to lack of structured alignment to evaluation criteria. In these cases, the issue is not service delivery but translation into responses that meet the scoring framework.</p>
        <p>Work is also delivered alongside internal bid teams where a structured approach to specification analysis, answer architecture, and scoring alignment is required.</p>
      </>
    ),
  },
  {
    num: '04',
    label: 'Starting point and what changes',
    heading: 'Starting point and what changes',
    content: (
      <>
        <p>Providers do not start from a single position, but the underlying issues are consistent.</p>
        <p>At entry, submissions often rely on general descriptions of service delivery rather than evidence mapped to specific criteria. Key areas such as workforce planning, referral processes, safeguarding application, and partnership working are referenced but not demonstrated in a way that satisfies evaluation requirements. Case examples may be included, but not tied directly to the question being asked. Systems may be named without showing how they are used in practice.</p>
        <p>Evaluation feedback repeatedly highlights these gaps. Responses are described as acceptable but lacking detail, or as demonstrating intent without providing sufficient confidence in delivery.</p>
        <p>Following restructuring, submissions are aligned directly to scoring criteria and subpoints. Each answer demonstrates how the service will operate in practice, supported by operational detail and relevant evidence. Workforce models are defined. Processes are described step by step. Case examples are tied directly to the requirements of the question.</p>
        <div className="pull">The result is not a change in writing style. It is a change in how the submission is evaluated.</div>
        <p>Providers move from submissions that meet requirements in principle to submissions that evidence delivery against the scoring framework. This increases evaluator confidence and improves scoring outcomes across quality-weighted criteria.</p>
      </>
    ),
  },
  {
    num: '05',
    label: 'How submissions are built',
    heading: 'How submissions are built',
    content: (
      <>
        <p>Every submission is designed against the evaluation model before any writing begins.</p>
        <p>The specification is broken down into its scoring structure, including questions, subpoints, and weightings. This defines what must be evidenced and how marks are awarded.</p>
        <p>Each response is then mapped directly to those criteria. This ensures that all required elements are addressed and that no part of the question is left unanswered.</p>
        <p>Operational detail is embedded across all areas of delivery. This includes staffing structures, safeguarding processes, referral and assessment pathways, care planning, partnership working, risk management, and reporting. The focus is on demonstrating how the service will operate, not describing what it aims to achieve.</p>
        <p>Where systems are referenced, their application is explained. Where processes are described, they are set out in a way that reflects actual delivery. Where outcomes are included, they are linked to measurable activity.</p>
        <div className="pull">This removes the gaps that lead to reduced or zero marks where evidence is missing or unclear.</div>
      </>
    ),
  },
  {
    num: '06',
    label: 'What the scoring process requires',
    heading: 'What the scoring process requires',
    content: (
      <>
        <p>Evaluation is based on demonstrable delivery against defined requirements.</p>
        <p>Responses that rely on general statements without operational context reduce evaluator confidence. Responses that do not address each subpoint within a question fail to secure full marks. Responses that reference systems, workforce, or processes without evidence receive reduced or zero scores in those areas. Responses that do not align clearly to the contract specification introduce delivery risk from the commissioner&apos;s perspective.</p>
        <p>Across multiple evaluations, commissioners assess safeguarding, workforce structure, partnership working, systems, and outcomes in detail. They expect clarity on how services will be delivered, monitored, and adapted. They expect evidence of capability, not statements of intent.</p>
        <div className="pull">Submissions must be structured to meet those expectations consistently.</div>
      </>
    ),
  },
  {
    num: '07',
    label: 'Proof',
    heading: 'Proof',
    content: (
      <>
        <p>Work is delivered within procurement environments defined by structured evaluation and competition.</p>
        <p>In one framework, 154 submissions were assessed, with 44 providers successfully appointed following evaluation against published criteria.</p>
        <p>Submissions have secured places across multi-lot frameworks, Dynamic Purchasing Systems, and provider lists, following regulated evaluation processes and standstill periods prior to contract award.</p>
        <p>Evaluation models applied to these procurements prioritise quality, with weighting structures that place the majority of marks on service delivery, safeguarding, workforce, and outcomes.</p>
        <div className="pull">These outcomes reflect consistent alignment to the scoring system used in procurement.</div>
        <p style={{ marginTop: 18 }}>
          <Link href="/case-studies" style={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--heritage-red)' }}>
            View case studies →
          </Link>
        </p>
      </>
    ),
  },
  {
    num: '08',
    label: 'Why it works',
    heading: 'Why it works',
    content: (
      <>
        <p>The approach works because it reflects how tenders are actually assessed.</p>
        <p>Generic content is removed and replaced with responses structured directly against scoring criteria. Operational detail is embedded across all areas of delivery. Evidence is mapped to each requirement and subpoint. Responses demonstrate how services will operate in practice.</p>
        <p>This increases evaluator confidence and improves scoring outcomes.</p>
        <div className="pull">Nothing is left to interpretation.</div>
      </>
    ),
  },
  {
    num: '09',
    label: 'Where this applies',
    heading: 'Where this applies',
    content: (
      <>
        <p>Across UK health and social care commissioning, including adult social care, children&apos;s services, housing and support, and health and clinical services.</p>
        <p>Across procurement routes including frameworks, Dynamic Purchasing Systems, provider lists, and direct contracts.</p>
      </>
    ),
  },
]

export default function AboutPage() {
  return (
    <main>

      {/* Hero */}
      <section className="ab-hero">
        <div className="container ab-hero__inner">
          <div className="ab-hero__kicker">About Us</div>
          <h1>We work to the scoring system.</h1>
          <p className="ab-hero__proof">
            We structure submissions to meet the exact criteria used by local authorities and commissioning bodies to score, rank, and award contracts across UK health and social care.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            Free consultation
          </Link>
        </div>
      </section>

      {/* 9 sections */}
      <article className="ab-page">
        {SECTIONS.map((s) => (
          <section key={s.num} className="ab-section">
            <div className="ab-num">
              {s.num}<br />{s.label}
            </div>
            <div>
              <h2>{s.heading}</h2>
              {s.content}
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <div className="ab-final" id="consultation">
          <span className="lead">This is not bid writing.</span>
          <span className="sub">It is structuring submissions to meet the exact system used to score, rank, and award contracts.</span>
          <Link href="/contact" className="btn">Book a free consultation</Link>
        </div>
      </article>

    </main>
  )
}
