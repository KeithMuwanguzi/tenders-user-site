import type { Metadata } from 'next'
import Link from 'next/link'
import TimelineScroll from '@/components/TimelineScroll'

export const metadata: Metadata = {
  title: 'Tender Writing and Bid Review Services | TenderLab',
  description:
    'Specialist tender writing services for UK health and social care providers. Framework, PQQ and ITT bid writing with a 92% win rate across 200+ submissions.',
  alternates: { canonical: 'https://www.tenderlab.co.uk/services' },
  openGraph: {
    title: 'Tender Writing and Bid Review Services | TenderLab',
    description:
      'Specialist tender writing services for UK health and social care providers. Framework, PQQ and ITT bid writing with a 92% win rate across 200+ submissions.',
    url: 'https://www.tenderlab.co.uk/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tender Writing and Bid Review Services | TenderLab',
    description:
      'Specialist tender writing services for UK health and social care providers. 92% win rate, 200+ submissions.',
  },
}

const SERVICES_FAQS = [
  { q: 'What sectors do you write tenders for?', a: "UK health and social care exclusively. Adult social care, children's services, NHS-commissioned community health, housing-related support, supported accommodation and continuing healthcare. We do not write outside the care sector." },
  { q: 'What is your win rate on care sector tenders?', a: '92% across 200+ submissions. The biggest single lift is our 72-hour pre-submission review by an evaluator-perspective writer who has not drafted the bid.' },
  { q: 'How much do your services cost?', a: 'Bid writing from £3,000 per submission depending on scope. Pre-Submission Review from £950. Tender Retainer from £4,500 per month. Free 30-minute consultation to scope before any engagement.' },
  { q: 'Can you work to short deadlines?', a: 'Yes, where the brief allows. Our Pre-Submission Review runs 72 hours before deadline. Full bid writing engagements need a 10 working day minimum on a standard 3-question method statement framework.' },
  { q: 'Do you offer training as well as writing?', a: 'Yes. Our Bid Team Coaching runs 1-to-1 or small-group sessions with your in-house writer, structured around CQC, Ofsted, Care Act 2014 Section 42 and MCA 5 principles.' },
]

const STEPS = [
  { id: 'bid-writing', label: '01 Bid Writing' },
  { id: 'pre-submission-review', label: '02 Pre-Submission Review' },
  { id: 'lost-bid-debrief', label: '03 Lost Bid Debrief' },
  { id: 'tender-readiness-audit', label: '04 Tender Readiness Audit' },
  { id: 'bid-team-coaching', label: '05 Bid Team Coaching' },
  { id: 'pipeline-tracking', label: '06 Pipeline Tracking' },
  { id: 'mobilisation-support', label: '07 Mobilisation Support' },
  { id: 'tender-retainer', label: '08 Tender Retainer' },
]

export default function ServicesPage() {
  return (
    <div className="tl-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': 'https://www.tenderlab.co.uk/services#collection',
          name: 'Tender Writing and Bid Review Services',
          url: 'https://www.tenderlab.co.uk/services',
          isPartOf: { '@id': 'https://www.tenderlab.co.uk/#website' },
          about: { '@id': 'https://www.tenderlab.co.uk/#organization' },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: 8,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Bid Writing', url: 'https://www.tenderlab.co.uk/services/bid-writing' },
              { '@type': 'ListItem', position: 2, name: 'Pre-Submission Review', url: 'https://www.tenderlab.co.uk/services/pre-submission-review' },
              { '@type': 'ListItem', position: 3, name: 'Lost Bid Debrief', url: 'https://www.tenderlab.co.uk/services/lost-bid-debrief' },
              { '@type': 'ListItem', position: 4, name: 'Tender Readiness Audit', url: 'https://www.tenderlab.co.uk/services/tender-readiness-audit' },
              { '@type': 'ListItem', position: 5, name: 'Bid Team Coaching', url: 'https://www.tenderlab.co.uk/services/bid-team-coaching' },
              { '@type': 'ListItem', position: 6, name: 'Pipeline Tracking', url: 'https://www.tenderlab.co.uk/services/pipeline-tracking' },
              { '@type': 'ListItem', position: 7, name: 'Mobilisation Support', url: 'https://www.tenderlab.co.uk/services/mobilisation-support' },
              { '@type': 'ListItem', position: 8, name: 'Tender Retainer', url: 'https://www.tenderlab.co.uk/services/tender-retainer' },
            ],
          },
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': 'https://www.tenderlab.co.uk/services#faq',
          mainEntity: SERVICES_FAQS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }) }}
      />
      {/* Hero */}
      <section className="tl-hero" aria-labelledby="hero-title">
        <div className="tl-hero-glow" aria-hidden="true" />
        <div className="tl-hero-inner">
          <div className="tl-hero-eye">Services &middot; UK Health and Social Care</div>
          <h1 id="hero-title" className="tl-hero-title">Eight tender writing services across the bidding lifecycle.</h1>
          <p className="tl-hero-sub">From spec-to-submission writing through pre-submission review, lost-bid debrief and mobilisation, our <strong>tender writing services</strong> sit at every stage of the bidding cycle. Our <strong>bid writing consultants</strong> deliver <strong>bid and tender writing services</strong> structured around the published evaluation criteria used by NHS commissioners, integrated care boards, and local authorities.</p>
          <p className="tl-hero-sub tight">Each service is structured around when to use it, what you receive, and the outcome it delivers. No padding, no narrative.</p>
          <Link className="tl-btn-red" href="/contact">Book a Free Consultation</Link>
        </div>
      </section>

      {/* Timeline */}
      <main className="tl-timeline" aria-label="Eight services in eight sections">

        {/* 01 BID WRITING : image left */}
        <article className="tl-step" id="bid-writing">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Bid writing service mapping specification clauses to a structured scored answer architecture">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="30" y="50" width="160" height="300" rx="6" fill="#192231"/>
                  <text x="50" y="80" fontSize="11" fill="#fff" fontWeight="700" letterSpacing="1">SPECIFICATION</text>
                  <g fill="rgba(255,255,255,.1)">
                    <rect x="46" y="100" width="128" height="28" rx="3"/><rect x="46" y="138" width="128" height="28" rx="3"/>
                    <rect x="46" y="176" width="128" height="28" rx="3"/><rect x="46" y="214" width="128" height="28" rx="3"/>
                    <rect x="46" y="252" width="128" height="28" rx="3"/><rect x="46" y="290" width="128" height="28" rx="3"/>
                  </g>
                  <g fontSize="10" fill="rgba(255,255,255,.78)">
                    <text x="56" y="119">Clause 1 · Service Model</text><text x="56" y="157">Clause 2 · Safeguarding</text>
                    <text x="56" y="195">Clause 3 · Workforce</text><text x="56" y="233">Clause 4 · Outcomes</text>
                    <text x="56" y="271">Clause 5 · Quality</text><text x="56" y="309">Clause 6 · Social Value</text>
                  </g>
                  <g stroke="#D4382C" strokeWidth="1.5" fill="none" data-draw="">
                    <path d="M190 114 Q220 114 250 100"/><path d="M190 152 Q220 152 250 140"/>
                    <path d="M190 190 Q220 190 250 180"/><path d="M190 228 Q220 228 250 220"/>
                    <path d="M190 266 Q220 266 250 260"/><path d="M190 304 Q220 304 250 300"/>
                  </g>
                  <rect x="250" y="50" width="220" height="280" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <text x="270" y="80" fontSize="11" fill="#D4382C" fontWeight="700" letterSpacing="1">ANSWER ARCHITECTURE</text>
                  <g fontSize="10" fill="#192231">
                    <rect x="266" y="92" width="188" height="34" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="278" y="108" fontWeight="700">1.1 Service Delivery Model</text>
                    <text x="278" y="121" fill="#6B7280">Named staff · KPI · cohort</text>
                    <rect x="266" y="130" width="188" height="34" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="278" y="146" fontWeight="700">1.2 Safeguarding</text>
                    <text x="278" y="159" fill="#6B7280">Policy · training · escalation</text>
                    <rect x="266" y="168" width="188" height="34" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="278" y="184" fontWeight="700">1.3 Workforce &amp; Retention</text>
                    <text x="278" y="197" fill="#6B7280">DBS · supervision · CPD</text>
                    <rect x="266" y="206" width="188" height="34" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="278" y="222" fontWeight="700">1.4 Outcomes</text>
                    <text x="278" y="235" fill="#6B7280">Baseline · target · method</text>
                    <rect x="266" y="244" width="188" height="34" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="278" y="260" fontWeight="700">1.5 Quality &amp; Governance</text>
                    <text x="278" y="273" fill="#6B7280">Audit · feedback · improvement</text>
                    <rect x="266" y="282" width="188" height="34" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="278" y="298" fontWeight="700">1.6 Social Value</text>
                    <text x="278" y="311" fill="#6B7280">Local · measurable · TOMs</text>
                  </g>
                  <rect x="370" y="340" width="100" height="40" rx="20" fill="#D4382C"/>
                  <text x="394" y="364" fontSize="14" fill="#fff" fontWeight="700">9 / 10</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">01</span> Bid Writing</div>
            <h2 className="tl-step-title">Bid Writing</h2>
            <p>End-to-end <strong>bid and tender writing</strong> for UK health and social care contracts. We read the full specification, extract every evaluation criterion, and build a bespoke answer architecture mapped to the scoring matrix. Each method statement is drafted by specialist <strong>tender writers</strong>, evidenced with named staff and quantified outcomes, then reviewed against the marking guide before submission.</p>
            <p>Used for framework bids, dynamic purchasing system call-offs, approved provider list refreshes, and full ITT responses. <strong>Framework bid writing</strong>, <strong>PQQ bid writing</strong>, and <strong>ITT bid writing</strong> are written under the same scoring-led discipline.</p>
            <div className="tl-callout">When used: a full tender submission is open and the contract is one you intend to win.</div>
            <Link className="tl-step-link" href="/services/bid-writing">View service &rarr;</Link>
          </div>
        </article>

        {/* 02 PRE-SUBMISSION REVIEW : image right */}
        <article className="tl-step" id="pre-submission-review">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">02</span> Pre-Submission Review</div>
            <h2 className="tl-step-title">Pre-Submission Review</h2>
            <p>An independent forensic review of your draft submission before the deadline. Our <strong>bid writing consultants</strong> read every method statement against the published evaluation criteria, mark each answer line-by-line against the marking guide, and return a redlined draft with prioritised rewrites. The review names the criteria you are at risk of failing and the evidence you need to add to lift each score band.</p>
            <p>The output is a scored gap analysis covering structure, evidence, named staff, quantified outcomes, and policy citations. A second pass after rewrite is included where the deadline permits.</p>
            <div className="tl-callout">When used: a draft is written but you do not know what it will score.</div>
            <Link className="tl-step-link" href="/services/pre-submission-review">View service &rarr;</Link>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Pre-submission review with magnifying glass over a draft page and a checklist of evaluation criteria">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="40" y="40" width="260" height="320" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                  <text x="56" y="68" fontSize="11" fontWeight="700" fill="#192231">DRAFT · Q3 SAFEGUARDING</text>
                  <g fill="#ccc"><rect x="56" y="84" width="226" height="6" rx="2"/><rect x="56" y="98" width="200" height="6" rx="2"/><rect x="56" y="112" width="220" height="6" rx="2"/></g>
                  <g fill="rgba(212,56,44,.16)"><rect x="56" y="132" width="226" height="14" rx="2"/></g>
                  <g fill="#888"><rect x="56" y="135" width="180" height="6" rx="2"/></g>
                  <text x="290" y="143" fontSize="9" fill="#D4382C" fontWeight="700">+ named DSL</text>
                  <g fill="#ccc"><rect x="56" y="158" width="226" height="6" rx="2"/><rect x="56" y="172" width="210" height="6" rx="2"/></g>
                  <g fill="rgba(212,56,44,.16)"><rect x="56" y="186" width="226" height="14" rx="2"/></g>
                  <g fill="#888"><rect x="56" y="189" width="200" height="6" rx="2"/></g>
                  <text x="290" y="197" fontSize="9" fill="#D4382C" fontWeight="700">+ S42 timeline</text>
                  <g fill="#ccc"><rect x="56" y="212" width="226" height="6" rx="2"/><rect x="56" y="226" width="220" height="6" rx="2"/><rect x="56" y="240" width="180" height="6" rx="2"/></g>
                  <g fill="rgba(212,56,44,.16)"><rect x="56" y="254" width="226" height="14" rx="2"/></g>
                  <g fill="#888"><rect x="56" y="257" width="170" height="6" rx="2"/></g>
                  <text x="290" y="265" fontSize="9" fill="#D4382C" fontWeight="700">+ training %</text>
                  <g data-draw="">
                    <circle cx="220" cy="180" r="56" fill="none" stroke="#D4382C" strokeWidth="3"/>
                    <line x1="260" y1="220" x2="294" y2="254" stroke="#D4382C" strokeWidth="5" strokeLinecap="round"/>
                  </g>
                  <rect x="320" y="60" width="150" height="280" rx="6" fill="#192231"/>
                  <text x="336" y="86" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">CRITERIA AUDIT</text>
                  <g fontSize="9" fill="#fff">
                    <rect x="336" y="102" width="14" height="14" rx="2" fill="#D4382C"/><text x="340" y="113" fontWeight="700">✓</text><text x="358" y="113">Service model</text>
                    <rect x="336" y="124" width="14" height="14" rx="2" fill="#D4382C"/><text x="340" y="135" fontWeight="700">✓</text><text x="358" y="135">Named roles</text>
                    <rect x="336" y="146" width="14" height="14" rx="2" fill="#6B7280"/><text x="340" y="157" fontWeight="700">!</text><text x="358" y="157">Outcomes</text>
                    <rect x="336" y="168" width="14" height="14" rx="2" fill="#D4382C"/><text x="340" y="179" fontWeight="700">✓</text><text x="358" y="179">Safeguarding</text>
                    <rect x="336" y="190" width="14" height="14" rx="2" fill="#6B7280"/><text x="340" y="201" fontWeight="700">!</text><text x="358" y="201">Retention</text>
                    <rect x="336" y="212" width="14" height="14" rx="2" fill="#D4382C"/><text x="340" y="223" fontWeight="700">✓</text><text x="358" y="223">Soc. value</text>
                    <rect x="336" y="234" width="14" height="14" rx="2" fill="#D4382C"/><text x="340" y="245" fontWeight="700">✓</text><text x="358" y="245">Mobilisation</text>
                  </g>
                  <rect x="336" y="270" width="118" height="50" rx="4" fill="#D4382C"/>
                  <text x="346" y="290" fontSize="10" fontWeight="700" fill="#fff">PREDICTED</text>
                  <text x="346" y="310" fontSize="20" fontWeight="800" fill="#fff">68 → 88%</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 03 LOST BID DEBRIEF : image left */}
        <article className="tl-step" id="lost-bid-debrief">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Lost bid debrief flow turning evaluator feedback into a reusable evidence bank">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="30" y="120" width="130" height="160" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                  <text x="46" y="148" fontSize="10" fontWeight="700" fill="#192231" letterSpacing="1">01 · LOSS NOTICE</text>
                  <g fill="#ddd"><rect x="46" y="162" width="98" height="6" rx="2"/><rect x="46" y="174" width="90" height="6" rx="2"/><rect x="46" y="186" width="100" height="6" rx="2"/><rect x="46" y="198" width="80" height="6" rx="2"/></g>
                  <rect x="46" y="222" width="80" height="22" rx="11" fill="#192231"/>
                  <text x="56" y="237" fontSize="9" fontWeight="700" fill="#fff">Q-Score 62</text>
                  <text x="46" y="260" fontSize="9" fill="#6B7280">Rank: 4 of 11</text>
                  <rect x="186" y="120" width="130" height="160" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <text x="202" y="148" fontSize="10" fontWeight="700" fill="#D4382C" letterSpacing="1">02 · FEEDBACK</text>
                  <g fontSize="9" fill="#192231">
                    <rect x="202" y="162" width="14" height="14" rx="2" fill="#D4382C"/><text x="206" y="173" fill="#fff" fontWeight="700">!</text><text x="222" y="172">Q2: outcomes</text>
                    <rect x="202" y="184" width="14" height="14" rx="2" fill="#D4382C"/><text x="206" y="195" fill="#fff" fontWeight="700">!</text><text x="222" y="194">Q4: retention</text>
                    <rect x="202" y="206" width="14" height="14" rx="2" fill="#D4382C"/><text x="206" y="217" fill="#fff" fontWeight="700">!</text><text x="222" y="216">Q7: soc. value</text>
                    <rect x="202" y="228" width="14" height="14" rx="2" fill="#192231"/><text x="206" y="239" fill="#fff" fontWeight="700">✓</text><text x="222" y="238">Q1: model</text>
                    <rect x="202" y="250" width="14" height="14" rx="2" fill="#192231"/><text x="206" y="261" fill="#fff" fontWeight="700">✓</text><text x="222" y="260">Q3: safeguarding</text>
                  </g>
                  <rect x="342" y="120" width="130" height="160" rx="6" fill="#192231"/>
                  <text x="358" y="148" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">03 · EVIDENCE BANK</text>
                  <g fill="rgba(255,255,255,.1)"><rect x="358" y="162" width="98" height="20" rx="3"/><rect x="358" y="186" width="98" height="20" rx="3"/><rect x="358" y="210" width="98" height="20" rx="3"/><rect x="358" y="234" width="98" height="20" rx="3"/></g>
                  <g fontSize="9" fill="#fff">
                    <text x="364" y="176">Outcomes pack v2</text><text x="364" y="200">Retention model</text>
                    <text x="364" y="224">TOMs library</text><text x="364" y="248">Case studies</text>
                  </g>
                  <rect x="358" y="262" width="98" height="14" rx="7" fill="#D4382C"/>
                  <text x="370" y="272" fontSize="8" fontWeight="700" fill="#fff">REUSE-READY</text>
                  <g stroke="#D4382C" strokeWidth="2" fill="#D4382C" data-draw="">
                    <line x1="160" y1="200" x2="180" y2="200" strokeLinecap="round"/>
                    <polygon points="180,194 188,200 180,206"/>
                    <line x1="316" y1="200" x2="336" y2="200" strokeLinecap="round"/>
                    <polygon points="336,194 344,200 336,206"/>
                  </g>
                  <text x="220" y="360" fontSize="10" fontWeight="700" fill="#D4382C" letterSpacing="1">LOSS → ASSET</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">03</span> Lost Bid Debrief</div>
            <h2 className="tl-step-title">Lost Bid Debrief</h2>
            <p>A structured analysis of an unsuccessful submission. Our <strong>professional tender writers</strong> reread the response against the evaluator feedback, identify the criteria that scored below band, and convert the loss into a reusable evidence bank: outcomes packs, retention models, TOMs commitments, and case studies that can be deployed across future framework bids.</p>
            <p>The output is a debrief report with a per-criterion score gap and a remediation plan that feeds directly into the next submission.</p>
            <div className="tl-callout">When used: you lost a tender and want the next one to score 20 points higher.</div>
            <Link className="tl-step-link" href="/services/lost-bid-debrief">View service &rarr;</Link>
          </div>
        </article>

        {/* 04 TENDER READINESS AUDIT : image right */}
        <article className="tl-step" id="tender-readiness-audit">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">04</span> Tender Readiness Audit</div>
            <h2 className="tl-step-title">Tender Readiness Audit</h2>
            <p>A diagnostic of your organisation&apos;s tender-readiness before the next opportunity drops. We review your policies, evidence base, workforce data, outcomes reporting, and pricing model against the criteria most commonly weighted by NHS and local authority commissioners. The audit produces a five-axis readiness map with current state, target state, and a prioritised closure plan.</p>
            <p>Used by providers preparing for framework re-tenders, new geographies, or first-time CQC-registered submissions. Pairs directly with the Tender Retainer for ongoing closure.</p>
            <div className="tl-callout">When used: a major tender is six to twelve weeks away and you want to be ready.</div>
            <Link className="tl-step-link" href="/services/tender-readiness-audit">View service &rarr;</Link>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Tender readiness radar chart with five axes Policies Evidence Workforce Outcomes Pricing">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif" transform="translate(250 210)">
                  <g fill="none" stroke="#192231" strokeOpacity=".15" strokeWidth="1">
                    <polygon points="0,-150 142,-46 88,121 -88,121 -142,-46"/>
                    <polygon points="0,-120 114,-37 70,97 -70,97 -114,-37"/>
                    <polygon points="0,-90 85,-28 53,73 -53,73 -85,-28"/>
                    <polygon points="0,-60 57,-19 35,48 -35,48 -57,-19"/>
                    <polygon points="0,-30 28,-9 18,24 -18,24 -28,-9"/>
                  </g>
                  <g stroke="#192231" strokeOpacity=".25" strokeWidth="1">
                    <line x1="0" y1="0" x2="0" y2="-150"/><line x1="0" y1="0" x2="142" y2="-46"/>
                    <line x1="0" y1="0" x2="88" y2="121"/><line x1="0" y1="0" x2="-88" y2="121"/>
                    <line x1="0" y1="0" x2="-142" y2="-46"/>
                  </g>
                  <polygon points="0,-135 128,-41 80,109 -80,109 -128,-41" fill="rgba(25,34,49,.08)" stroke="#192231" strokeWidth="2" strokeDasharray="4 4"/>
                  <polygon points="0,-90 85,-28 53,73 -53,73 -85,-28" fill="rgba(212,56,44,.18)" stroke="#D4382C" strokeWidth="2.5" data-draw=""/>
                  <g fill="#D4382C">
                    <circle cx="0" cy="-90" r="4"/><circle cx="85" cy="-28" r="4"/>
                    <circle cx="53" cy="73" r="4"/><circle cx="-53" cy="73" r="4"/>
                    <circle cx="-85" cy="-28" r="4"/>
                  </g>
                </g>
                <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#192231">
                  <text x="222" y="48" textAnchor="middle">POLICIES</text>
                  <text x="424" y="166" textAnchor="middle">EVIDENCE</text>
                  <text x="358" y="356" textAnchor="middle">WORKFORCE</text>
                  <text x="144" y="356" textAnchor="middle">OUTCOMES</text>
                  <text x="76" y="166" textAnchor="middle">PRICING</text>
                </g>
                <g fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600">
                  <rect x="30" y="40" width="12" height="12" rx="2" fill="#D4382C"/>
                  <text x="48" y="50" fill="#192231">Current state</text>
                  <rect x="30" y="58" width="12" height="12" rx="2" fill="none" stroke="#192231" strokeDasharray="3 2"/>
                  <text x="48" y="68" fill="#192231">Target state</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 05 BID TEAM COACHING : image left */}
        <article className="tl-step" id="bid-team-coaching">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Bid team coaching with scoring framework whiteboard and rising score consistency bar">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="40" y="40" width="420" height="160" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                  <text x="60" y="68" fontSize="11" fontWeight="700" fill="#192231" letterSpacing="1">SCORING FRAMEWORK</text>
                  <line x1="60" y1="80" x2="440" y2="80" stroke="#192231" strokeWidth="1"/>
                  <g>
                    <rect x="60" y="100" width="80" height="80" rx="4" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                    <text x="76" y="118" fontSize="9" fontWeight="700" fill="#D4382C">EXCEPTIONAL</text>
                    <text x="76" y="170" fontSize="22" fontWeight="800" fill="#D4382C">10</text>
                    <rect x="150" y="100" width="80" height="80" rx="4" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                    <text x="178" y="118" fontSize="9" fontWeight="700" fill="#D4382C">GOOD</text>
                    <text x="174" y="170" fontSize="22" fontWeight="800" fill="#D4382C">8</text>
                    <rect x="240" y="100" width="80" height="80" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <text x="262" y="118" fontSize="9" fontWeight="700" fill="#192231">PARTIAL</text>
                    <text x="266" y="170" fontSize="22" fontWeight="800" fill="#192231">5</text>
                    <rect x="330" y="100" width="110" height="80" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <text x="346" y="118" fontSize="9" fontWeight="700" fill="#192231">WEAK</text>
                    <text x="366" y="170" fontSize="22" fontWeight="800" fill="#192231">2</text>
                  </g>
                  <g fill="#192231">
                    <circle cx="90" cy="240" r="16"/><rect x="74" y="256" width="32" height="50" rx="6"/>
                  </g>
                  <g fill="#D4382C">
                    <circle cx="250" cy="220" r="16"/><rect x="234" y="236" width="32" height="50" rx="6"/>
                    <text x="284" y="246" fontSize="10" fontWeight="700" fill="#D4382C">COACH</text>
                  </g>
                  <g fill="#192231">
                    <circle cx="410" cy="240" r="16"/><rect x="394" y="256" width="32" height="50" rx="6"/>
                  </g>
                  <text x="40" y="334" fontSize="10" fontWeight="700" fill="#192231" letterSpacing="1">SCORE CONSISTENCY</text>
                  <rect x="40" y="344" width="420" height="14" rx="7" fill="#eee"/>
                  <rect x="40" y="344" width="350" height="14" rx="7" fill="#D4382C" data-draw=""/>
                  <text x="394" y="354" fontSize="10" fontWeight="700" fill="#D4382C">↑ 83%</text>
                  <text x="40" y="380" fontSize="9" fill="#6B7280">Before coaching · 48%   After coaching · 83%</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">05</span> Bid Team Coaching</div>
            <h2 className="tl-step-title">Bid Team Coaching</h2>
            <p>Direct training for in-house bid teams, registered managers, and operations leads. Our <strong>bid writing consultants</strong> work with your writers to teach the scoring framework, the evaluator&apos;s marking guide, and the structure conventions that move answers from a Partial 5 to an Exceptional 10. Delivered in person, online, or hybrid; tailored to the procurement routes your organisation tenders into.</p>
            <p>Includes worked examples, redlines on live drafts, a scoring framework reference pack, and a follow-up review on the next live submission.</p>
            <div className="tl-callout">When used: you want your team to write at TenderLab standard themselves.</div>
            <Link className="tl-step-link" href="/services/bid-team-coaching">View service &rarr;</Link>
          </div>
        </article>

        {/* 06 PIPELINE TRACKING : image right */}
        <article className="tl-step" id="pipeline-tracking">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">06</span> Pipeline Tracking</div>
            <h2 className="tl-step-title">Pipeline Tracking</h2>
            <p>A weekly intelligence service that surfaces live and forthcoming health and social care tenders matched to your geography, scope, and capacity. Each opportunity is scored against your operating footprint, regulatory position, and bid resource so the pipeline shows only what is worth pursuing. Delivered as a structured weekly feed with a go / no-go recommendation per opportunity.</p>
            <p>Covers <strong>NHS tender writing</strong> opportunities, <strong>local authority tender writing</strong> opportunities, ICB lots, dynamic purchasing systems, and approved provider list refreshes.</p>
            <div className="tl-callout">When used: you have capacity but no shortlist of bids to chase.</div>
            <Link className="tl-step-link" href="/services/pipeline-tracking">View service &rarr;</Link>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Pipeline tracking weekly feed with date stamps geography scope and capacity pills">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="30" y="30" width="120" height="120" rx="8" fill="#192231"/>
                  <rect x="30" y="30" width="120" height="28" rx="8" fill="#D4382C"/>
                  <text x="48" y="48" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="2">WEEK 17</text>
                  <text x="56" y="120" fontSize="44" fontWeight="800" fill="#fff">28</text>
                  <text x="46" y="140" fontSize="10" fontWeight="600" fill="#fff" letterSpacing="2">APR · MON</text>
                  <g fontSize="10" fill="#192231">
                    <rect x="170" y="34" width="300" height="56" rx="6" fill="#fff" stroke="#eee" strokeWidth="1"/>
                    <text x="184" y="52" fontWeight="700">Domiciliary · Birmingham CC</text>
                    <text x="184" y="68" fontSize="8" fill="#6B7280">Closes 14 May · £6.4m · 4yr framework</text>
                    <rect x="184" y="74" width="44" height="12" rx="6" fill="#D4382C"/><text x="190" y="83" fontSize="7" fontWeight="700" fill="#fff">GEO ✓</text>
                    <rect x="232" y="74" width="50" height="12" rx="6" fill="#D4382C"/><text x="238" y="83" fontSize="7" fontWeight="700" fill="#fff">SCOPE ✓</text>
                    <rect x="286" y="74" width="60" height="12" rx="6" fill="#D4382C"/><text x="292" y="83" fontSize="7" fontWeight="700" fill="#fff">CAPACITY ✓</text>
                    <rect x="430" y="50" width="32" height="22" rx="11" fill="#D4382C"/><text x="440" y="65" fontSize="9" fontWeight="700" fill="#fff">GO</text>
                    <rect x="170" y="98" width="300" height="56" rx="6" fill="#fff" stroke="#eee" strokeWidth="1"/>
                    <text x="184" y="116" fontWeight="700">Supp. Living · Manchester ICB</text>
                    <text x="184" y="132" fontSize="8" fill="#6B7280">Closes 22 May · £3.1m · 3yr DPS</text>
                    <rect x="184" y="138" width="44" height="12" rx="6" fill="#D4382C"/><text x="190" y="147" fontSize="7" fontWeight="700" fill="#fff">GEO ✓</text>
                    <rect x="232" y="138" width="50" height="12" rx="6" fill="#D4382C"/><text x="238" y="147" fontSize="7" fontWeight="700" fill="#fff">SCOPE ✓</text>
                    <rect x="286" y="138" width="60" height="12" rx="6" fill="#6B7280"/><text x="292" y="147" fontSize="7" fontWeight="700" fill="#fff">CAPACITY !</text>
                    <rect x="430" y="114" width="32" height="22" rx="11" fill="#6B7280"/><text x="438" y="129" fontSize="8" fontWeight="700" fill="#fff">HOLD</text>
                    <rect x="170" y="162" width="300" height="56" rx="6" fill="#fff" stroke="#eee" strokeWidth="1"/>
                    <text x="184" y="180" fontWeight="700">Children&apos;s Resi · Surrey CC</text>
                    <text x="184" y="196" fontSize="8" fill="#6B7280">Closes 30 May · £4.8m · spot + block</text>
                    <rect x="184" y="202" width="44" height="12" rx="6" fill="#6B7280"/><text x="190" y="211" fontSize="7" fontWeight="700" fill="#fff">GEO ?</text>
                    <rect x="232" y="202" width="50" height="12" rx="6" fill="#D4382C"/><text x="238" y="211" fontSize="7" fontWeight="700" fill="#fff">SCOPE ✓</text>
                    <rect x="286" y="202" width="60" height="12" rx="6" fill="#D4382C"/><text x="292" y="211" fontSize="7" fontWeight="700" fill="#fff">CAPACITY ✓</text>
                    <rect x="430" y="178" width="32" height="22" rx="11" fill="#6B7280"/><text x="436" y="193" fontSize="8" fontWeight="700" fill="#fff">REVIEW</text>
                  </g>
                  <text x="30" y="180" fontSize="9" fontWeight="700" fill="#6B7280" letterSpacing="1">THIS WEEK</text>
                  <text x="30" y="206" fontSize="28" fontWeight="800" fill="#192231">5</text>
                  <text x="30" y="222" fontSize="8" fill="#6B7280">live opportunities</text>
                  <text x="30" y="244" fontSize="28" fontWeight="800" fill="#D4382C">3</text>
                  <text x="30" y="260" fontSize="8" fill="#6B7280">recommended GO</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 07 MOBILISATION SUPPORT : image left */}
        <article className="tl-step" id="mobilisation-support">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Mobilisation support 0 to 90 day timeline with five named milestones">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <text x="40" y="60" fontSize="11" fontWeight="700" fill="#192231" letterSpacing="1">0 — 90 DAY MOBILISATION</text>
                  <line x1="60" y1="200" x2="460" y2="200" stroke="#192231" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="60" y1="200" x2="460" y2="200" stroke="#D4382C" strokeWidth="3" strokeLinecap="round" data-draw=""/>
                  <g stroke="#6B7280" strokeWidth="1">
                    <line x1="60" y1="210" x2="60" y2="220"/><line x1="160" y1="210" x2="160" y2="220"/>
                    <line x1="260" y1="210" x2="260" y2="220"/><line x1="360" y1="210" x2="360" y2="220"/>
                    <line x1="460" y1="210" x2="460" y2="220"/>
                  </g>
                  <g fontSize="9" fontWeight="700" fill="#6B7280">
                    <text x="52" y="236">DAY 0</text><text x="146" y="236">DAY 14</text>
                    <text x="246" y="236">DAY 30</text><text x="346" y="236">DAY 60</text>
                    <text x="446" y="236">DAY 90</text>
                  </g>
                  <g fill="#D4382C" stroke="#FAFAF5" strokeWidth="3">
                    <circle cx="60" cy="200" r="9"/><circle cx="160" cy="200" r="9"/>
                    <circle cx="260" cy="200" r="9"/><circle cx="360" cy="200" r="9"/>
                    <circle cx="460" cy="200" r="9"/>
                  </g>
                  <rect x="20" y="100" width="100" height="76" rx="6" fill="#192231"/>
                  <text x="32" y="124" fontSize="10" fontWeight="700" fill="#fff">AWARD</text>
                  <text x="32" y="140" fontSize="8" fill="rgba(255,255,255,.75)">Contract issue,</text>
                  <text x="32" y="152" fontSize="8" fill="rgba(255,255,255,.75)">kick-off meeting,</text>
                  <text x="32" y="164" fontSize="8" fill="rgba(255,255,255,.75)">project plan agreed</text>
                  <line x1="60" y1="180" x2="60" y2="195" stroke="#192231" strokeWidth="2"/>
                  <rect x="120" y="100" width="100" height="76" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <text x="132" y="124" fontSize="10" fontWeight="700" fill="#D4382C">TUPE</text>
                  <text x="132" y="140" fontSize="8" fill="#6B7280">Staff transfer,</text>
                  <text x="132" y="152" fontSize="8" fill="#6B7280">consultation,</text>
                  <text x="132" y="164" fontSize="8" fill="#6B7280">measures pack</text>
                  <line x1="160" y1="180" x2="160" y2="195" stroke="#D4382C" strokeWidth="2"/>
                  <rect x="220" y="100" width="100" height="76" rx="6" fill="#192231"/>
                  <text x="232" y="124" fontSize="10" fontWeight="700" fill="#fff">STAFFING</text>
                  <text x="232" y="140" fontSize="8" fill="rgba(255,255,255,.75)">DBS, contracts,</text>
                  <text x="232" y="152" fontSize="8" fill="rgba(255,255,255,.75)">induction, rotas,</text>
                  <text x="232" y="164" fontSize="8" fill="rgba(255,255,255,.75)">competency sign-off</text>
                  <line x1="260" y1="180" x2="260" y2="195" stroke="#192231" strokeWidth="2"/>
                  <rect x="320" y="100" width="100" height="76" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <text x="332" y="124" fontSize="10" fontWeight="700" fill="#D4382C">SYSTEMS LIVE</text>
                  <text x="332" y="140" fontSize="8" fill="#6B7280">Care plans,</text>
                  <text x="332" y="152" fontSize="8" fill="#6B7280">eMAR, rostering,</text>
                  <text x="332" y="164" fontSize="8" fill="#6B7280">data flows</text>
                  <line x1="360" y1="180" x2="360" y2="195" stroke="#D4382C" strokeWidth="2"/>
                  <rect x="380" y="260" width="100" height="76" rx="6" fill="#D4382C"/>
                  <text x="392" y="284" fontSize="10" fontWeight="700" fill="#fff">STEADY STATE</text>
                  <text x="392" y="300" fontSize="8" fill="rgba(255,255,255,.85)">KPIs reporting,</text>
                  <text x="392" y="312" fontSize="8" fill="rgba(255,255,255,.85)">contract review,</text>
                  <text x="392" y="324" fontSize="8" fill="rgba(255,255,255,.85)">growth plan</text>
                  <line x1="460" y1="205" x2="460" y2="258" stroke="#D4382C" strokeWidth="2"/>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">07</span> Mobilisation Support</div>
            <h2 className="tl-step-title">Mobilisation Support</h2>
            <p>Practical hands-on support during the ninety days after award. We project-manage TUPE, staffing, systems go-live, and KPI reporting to the contract specification you bid on. Each milestone is mapped to the deliverables the commissioner expects, with weekly reporting and a steady-state handover at day ninety.</p>
            <p>Used by providers winning their first framework lot, expanding into a new local authority area, or stepping up to a higher-volume retender.</p>
            <div className="tl-callout">When used: the contract has been awarded and the clock is running.</div>
            <Link className="tl-step-link" href="/services/mobilisation-support">View service &rarr;</Link>
          </div>
        </article>

        {/* 08 TENDER RETAINER : image right */}
        <article className="tl-step" id="tender-retainer">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">08</span> Tender Retainer</div>
            <h2 className="tl-step-title">Tender Retainer</h2>
            <p>An ongoing monthly engagement covering pipeline tracking, two pre-submission reviews per month, and priority access to the bid writing team. The retainer is sized to the volume of tenders your organisation runs through and the operating regions you bid into. <strong>Bid management services</strong> are coordinated centrally so deadlines, sign-offs, and version control sit with one point of contact.</p>
            <p>Used by providers running two or more concurrent submissions, by groups defending multiple framework positions, and by organisations building a long-term <strong>contract bid writing</strong> capability without a full in-house team.</p>
            <div className="tl-callout">When used: tenders are a continuous workstream, not a one-off project.</div>
            <Link className="tl-step-link" href="/services/tender-retainer">View service &rarr;</Link>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Tender retainer subscription card with included tokens pipeline pre-submission reviews and priority bid writing">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="60" y="40" width="380" height="320" rx="14" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                  <rect x="60" y="40" width="380" height="68" rx="14" fill="#192231"/>
                  <text x="84" y="76" fontSize="12" fontWeight="700" fill="#fff" letterSpacing="2">TENDER RETAINER</text>
                  <text x="84" y="94" fontSize="10" fill="rgba(255,255,255,.7)">Monthly engagement · fixed scope · named lead</text>
                  <rect x="350" y="56" width="74" height="36" rx="18" fill="#D4382C"/>
                  <text x="368" y="79" fontSize="11" fontWeight="700" fill="#fff">ACTIVE</text>
                  <g fontSize="11" fill="#192231">
                    <rect x="84" y="132" width="332" height="50" rx="8" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                    <circle cx="108" cy="157" r="12" fill="#D4382C"/>
                    <text x="103" y="161" fontSize="11" fontWeight="700" fill="#fff">P</text>
                    <text x="128" y="155" fontWeight="700">Pipeline Tracking</text>
                    <text x="128" y="170" fontSize="9" fill="#6B7280">Weekly scored feed · go/no-go recommendation per opportunity</text>
                    <rect x="84" y="190" width="332" height="50" rx="8" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                    <circle cx="108" cy="215" r="12" fill="#D4382C"/>
                    <text x="103" y="219" fontSize="11" fontWeight="700" fill="#fff">2x</text>
                    <text x="128" y="213" fontWeight="700">Pre-Submission Reviews</text>
                    <text x="128" y="228" fontSize="9" fill="#6B7280">Two forensic reviews per month with redlined drafts and gap analysis</text>
                    <rect x="84" y="248" width="332" height="50" rx="8" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                    <circle cx="108" cy="273" r="12" fill="#D4382C"/>
                    <text x="103" y="277" fontSize="11" fontWeight="700" fill="#fff">!</text>
                    <text x="128" y="271" fontWeight="700">Priority Bid Writing</text>
                    <text x="128" y="286" fontSize="9" fill="#6B7280">Front-of-queue access to the writing team · agreed turnaround windows</text>
                  </g>
                  <line x1="84" y1="316" x2="416" y2="316" stroke="#eee"/>
                  <text x="84" y="338" fontSize="10" fontWeight="700" fill="#192231" letterSpacing="1">INCLUDED</text>
                  <text x="84" y="352" fontSize="9" fill="#6B7280">Named lead · weekly stand-up · quarterly review</text>
                  <rect x="336" y="324" width="80" height="28" rx="14" fill="#D4382C"/>
                  <text x="358" y="343" fontSize="10" fontWeight="700" fill="#fff">FROM £</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

      </main>

      {/* FAQ */}
      <section aria-labelledby="services-faq-title" style={{ padding: '4rem 0', background: '#FAFAF5' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 id="services-faq-title" style={{ marginBottom: '1.5rem' }}>Frequently asked questions about our tender writing services</h2>
          {SERVICES_FAQS.map(f => (
            <details key={f.q} style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.05rem' }}>{f.q}</summary>
              <p style={{ marginTop: '0.75rem', lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="tl-closer">
        <h2>Eight services. One outcome: winning contracts.</h2>
        <p>92% win rate across 200+ UK care sector submissions. Tell us where you are in the cycle and we will pick the right service.</p>
        <Link className="tl-btn-white" href="/contact">Book a Free Consultation</Link>
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.7 }}>
          TenderLab Ltd · Companies House 17184263 · See our <Link href="/case-studies">case studies</Link> and read the latest <Link href="/blog">tender writing insights</Link>. Reference: <a href="https://www.gov.uk/government/collections/procurement-policy-procurement-policy-notes" target="_blank" rel="noopener noreferrer">gov.uk procurement policy notes</a>.
        </p>
      </section>

      <TimelineScroll steps={STEPS} />
    </div>
  )
}
