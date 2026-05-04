export type ServiceTier = { name: string; desc: string }
export type ServiceStep = { step: string; desc: string }
export type ServiceTransform = { from: string; to: string }

export type ServiceData = {
  slug: string
  title: string
  tagline: string
  description: string
  heroImg: string
  paragraphs: string[]
  whenUsed: string[]
  delivers: string[]
  howItWorks: ServiceStep[]
  solves: string[]
  transforms: ServiceTransform[]
  tiers: ServiceTier[]
}

const WP = 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs'

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'bid-writing',
    title: 'Bid Writing',
    tagline: 'From specification to submission, structured to score.',
    description: 'End-to-end tender writing for UK health and social care contracts.',
    heroImg: `${WP}/mature-person-college-campus-study-area-writing-notes-ideas_482257-122475-1-rlxsw0xj5uov2nobza9nq3rjnjyvq9lmnhk2isxyuk.jpg`,
    paragraphs: [
      'Bid Writing is the end-to-end authoring of a tender response. From the moment the tender drops to the moment it lands on the commissioner\'s portal, every word, every method statement, every case example and every line of pricing narrative is built specifically for the procurement in front of us.',
      'The discipline that separates winning submissions from compliant ones is not vocabulary. It is structure. Commissioners score against published evaluation criteria with weighted questions, named subpoints, and minimum thresholds. The submissions that win are the submissions whose architecture mirrors that scoring sheet line for line. Each paragraph closes a scoring point. Each operational claim is anchored to a named system, a named role, a dated case example or a verifiable document. Generic narrative is removed. Marketing language is removed. Adjective clusters that say nothing are removed.',
      'Bid Writing is used when the team needs the response to read like the commissioner\'s own scoring framework rather than like the provider\'s own brochure. It is used when the contract sits at the boundary of current operational scope and the response has to carry the operational imagination required to stretch into it. It is used when the previous submission scored below threshold and the next one cannot.',
    ],
    whenUsed: [
      'When the tender drops and there is no internal capacity to write it.',
      'When previous submissions have scored below threshold.',
      'When the contract sits on the boundary of current operational scope.',
      'When the team can deliver the service but cannot translate that into evaluator-grade evidence.',
    ],
    delivers: [
      'A fully written submission pack, specification-aligned and evaluator-ready.',
      'Every quality question answered to an Exceptional standard.',
      'Method statements, pricing narrative, mobilisation, case examples and supporting evidence.',
      'Final upload-ready format aligned to the commissioner\'s portal.',
    ],
    howItWorks: [
      { step: 'Specification Extraction', desc: 'Strip the document to its scoring architecture. The commissioner\'s language becomes our language.' },
      { step: 'Response Architecture', desc: 'Map every paragraph to a scoring criterion before a word is written.' },
      { step: 'Operational Proof', desc: 'Embed named staff, named systems, named outcomes and dated case examples throughout.' },
      { step: 'Quality Gate', desc: '27-criterion self-evaluation. Nothing ships below threshold.' },
    ],
    solves: [
      'Low scores on quality questions.',
      'No internal bid writer or limited bid capacity.',
      'Missed scoring requirements buried in the specification.',
      'Inconsistent answers across questions.',
      'Generic narrative that fails on operational specificity.',
    ],
    transforms: [
      { from: 'Incomplete draft', to: 'Evaluator-ready submission' },
      { from: 'Low-scoring answers', to: 'Exceptional-rated responses' },
      { from: 'Generic narrative', to: 'Specification-mapped, evidence-led' },
      { from: 'Disconnected questions', to: 'Unified narrative across the bid' },
    ],
    tiers: [
      { name: 'Standard', desc: 'Single-service contracts under £1m annual value.' },
      { name: 'Complex', desc: 'Multi-service or specialist cohorts.' },
      { name: 'Framework', desc: 'Multi-lot, multi-year, multi-region opportunities.' },
    ],
  },
  {
    slug: 'pre-submission-review',
    title: 'Pre-Submission Review',
    tagline: 'Know the score before the commissioner does.',
    description: 'Forensic scoring of a completed draft against the published evaluation criteria.',
    heroImg: `${WP}/business-team-situation-present-share-idea-scaled-rlxsy44mcljsvgn3s6rt9ksf6do8u1w5ltqwwxuh0s.jpg`,
    paragraphs: [
      'Pre-Submission Review is a forensic, evaluator-grade scoring of a completed draft against the published evaluation criteria of the procurement. It is delivered in a 72-hour turnaround so it fits inside the final week of any bid window.',
      'The review is structured around three deliverables. A scored workbook against the commissioner\'s own framework, with a rubric mark on every scored question. A gap list mapped directly to the specification, naming the line, the subpoint and the missing element. A rewrite priority list ranked by marks at stake, so the final week of the bid window is spent rewriting the answers that will move the score, not the answers the team feels least comfortable with.',
      'Internal scoring rarely captures evaluator triggers reliably. The team that wrote the answer is the worst-placed team to grade it. Pre-Submission Review provides the independent rubric score that a commissioner will arrive at, with enough warning to act on it before submission.',
    ],
    whenUsed: [
      'Final draft complete, one to two weeks before submission.',
      'When the team cannot score their own work objectively.',
      'When previous bids have scored below expectation and the pattern needs identifying.',
      'When the bid is high-stakes and requires evaluator-grade audit.',
    ],
    delivers: [
      'A scored workbook against the commissioner\'s own framework.',
      'A gap list mapped directly to the specification.',
      'A rewrite priority list ranked by marks at stake.',
      'Written commentary the internal team can action immediately.',
    ],
    howItWorks: [
      { step: 'Evaluator Scoring', desc: 'Score the draft against the published evaluation criteria, not a generic checklist.' },
      { step: 'Gap Identification', desc: 'Every missing element is mapped to the specification line it relates to.' },
      { step: 'Rewrite Prioritisation', desc: 'Gaps ranked by marks at stake, ordered for the final week of the bid window.' },
    ],
    solves: [
      'Subjective internal scoring that misses evaluator triggers.',
      'Late-stage rewrites with no clear priority.',
      'Risk of submission slipping below the quality threshold.',
    ],
    transforms: [
      { from: 'Internal scoring guesswork', to: 'Evaluator-aligned rubric score' },
      { from: 'Diffuse last-week priorities', to: 'Rewrite list ranked by marks' },
      { from: 'Submission risk', to: 'Defensible final draft' },
    ],
    tiers: [
      { name: 'Standard', desc: 'Single response set under 12,000 words.' },
      { name: 'Complex', desc: 'Multi-lot or multi-cohort review.' },
    ],
  },
  {
    slug: 'lost-bid-debrief',
    title: 'Lost Bid Debrief',
    tagline: 'Convert losses into a compounding answer bank.',
    description: 'Structured post-loss analysis that turns a loss into reusable content.',
    heroImg: `${WP}/two-men-discussing-contract-desk_31965-128846-rlxnbi11686q9ey6wluvspfhgcbxmtj32zb0tq9i98.jpg`,
    paragraphs: [
      'Lost Bid Debrief converts a lost tender into reusable bid material. It runs within 30 days of the award notice, while feedback is still accessible and the answers are still fresh in the team\'s mind.',
      'The debrief begins by requesting the commissioner\'s written feedback through the formal route. That feedback is then cross-referenced against publicly available information on the winning bidder, including their CQC profile, contract history, registered manager, and any published case studies. The combination reveals the structural reasons marks were lost: missed subpoints, weak operational evidence, evaluator-language mismatch, or a winning competitor who built a stronger case example library.',
      'The output is a forensic written report covering the commissioner\'s feedback, the competitor positioning, and the three structural failures behind the lost marks. The two lowest-scoring answers are then rewritten to an Exceptional standard so the loss converts into reusable content for the next bid. Recurring loss patterns become identified, structural fixes that the team can carry forward.',
    ],
    whenUsed: [
      'Within 30 days of the award notice, while feedback is still accessible.',
      'When the same questions are recurring across procurements and the loss pattern is unclear.',
      'When the team needs the post-loss commentary turned into bid material before the next window.',
    ],
    delivers: [
      'A forensic written report covering the commissioner\'s feedback, competitor positioning, and the structural reasons marks were lost.',
      'Rewrites of the two lowest-scoring answers to an Exceptional standard.',
      'A reusable-content extraction so the loss converts into the next bid\'s evidence base.',
    ],
    howItWorks: [
      { step: 'Feedback Analysis', desc: 'Request and parse the commissioner\'s written debrief.' },
      { step: 'Competitor Positioning', desc: 'Cross-reference public contract information on the winning bidder.' },
      { step: 'Answer Reconstruction', desc: 'Rewrite the two lowest-scoring answers to evaluator standard.' },
    ],
    solves: [
      'Recurring losses on the same question types.',
      'Loss feedback never converted into improved bid practice.',
      'No structured post-loss process inside the team.',
    ],
    transforms: [
      { from: 'Lost bid', to: 'Evaluator-grade rewrites' },
      { from: 'Loss feedback dormant', to: 'Reusable answer bank' },
      { from: 'Repeating failure pattern', to: 'Identified structural fix' },
    ],
    tiers: [
      { name: 'Standard', desc: 'Single-loss debrief and two answer rewrites.' },
      { name: 'Complex', desc: 'Multi-loss pattern analysis across a six-month period.' },
    ],
  },
  {
    slug: 'tender-readiness-audit',
    title: 'Tender Readiness Audit',
    tagline: 'Be ready before the opportunity arrives.',
    description: 'Diagnostic for providers preparing to enter the tender market or to step up to larger frameworks.',
    heroImg: `${WP}/service5-rld2tb6l874u29gi0ghbat2xqz5o9gd2l6ub88mmcs.webp`,
    paragraphs: [
      'Tender Readiness Audit is a diagnostic for providers preparing to enter the tender market for the first time, or stepping up from smaller local contracts to larger frameworks and Dynamic Purchasing Systems. It is run 90 to 180 days before the first target tender drops, when there is still time to build the evidence base properly.',
      'The audit covers every document a commissioner will ask for. Policy suite completeness against published expectations. Case study bank depth against the question categories that recur in the target sector. KPI evidence and contract performance data. CQC alignment and inspection readiness. Reference quality from current contracts. Commissioner relationships and named officer-level engagement. The audit is benchmarked against the evidence thresholds of the contracts the provider intends to bid for, so the gap is concrete, not abstract.',
      'The output is a prioritised readiness plan with deliverables, owners, and timescales. The provider exits the audit knowing exactly what is missing, who is responsible for closing each gap, and when the readiness state will support a defensible submission to the target opportunity.',
    ],
    whenUsed: [
      '90 to 180 days before the first target tender drops.',
      'When the provider is moving from spot work into framework bidding.',
      'When CQC or Ofsted ratings are about to refresh and the next bid window depends on them.',
      'When the evidence base is fragmented across HR, ops and clinical folders.',
    ],
    delivers: [
      'A readiness report against the evidence thresholds of the contracts the provider intends to bid for.',
      'An evidence gap plan with deliverables, owners and timescales.',
      'A prioritised actions roadmap to close the gap before the bid window.',
    ],
    howItWorks: [
      { step: 'Document Review', desc: 'Desktop review of every document a commissioner will ask for.' },
      { step: 'Benchmark', desc: 'Test the evidence base against published thresholds for the target contracts.' },
      { step: 'Build Roadmap', desc: 'Sequenced action plan with owners and target completion dates.' },
    ],
    solves: [
      'Readiness uncertainty before a major bid window.',
      'Fragmented evidence across departments.',
      'Compliance gaps that surface mid-bid.',
    ],
    transforms: [
      { from: 'Unknown readiness', to: 'Evidenced position against target contracts' },
      { from: 'Fragmented evidence', to: 'Structured, packaged evidence pack' },
      { from: 'Late-bid surprises', to: 'Pre-bid roadmap delivered on schedule' },
    ],
    tiers: [
      { name: 'Standard', desc: 'Single-setting readiness audit.' },
      { name: 'Complex', desc: 'Multi-setting, multi-region readiness audit.' },
    ],
  },
  {
    slug: 'bid-team-coaching',
    title: 'Bid Team Coaching',
    tagline: 'Build a tender function that delivers beyond the bid.',
    description: 'In-house capability build for providers with an internal bid writer or bid team.',
    heroImg: `${WP}/team-architects-working-town-project-conference-room-architect-business-suit_482257-26513-rlech3dwy1clh1rrgzpxq067wt5p662hx5uscbdh2k.jpg`,
    paragraphs: [
      'Bid Team Coaching is an in-house capability build for providers who already have an internal bid writer or a small bid team but whose scoring is inconsistent across submissions. It is a four-session live programme designed to leave behind a repeatable internal methodology rather than to write a single bid.',
      'The four sessions cover specification analysis (how to extract a scoring sheet from a procurement document), answer architecture (how to map paragraphs to scoring points before drafting prose), evidence banking (how to build a reusable answer library that compounds across bids), and evaluator psychology (how a panel reads, scores, and ranks responses). Each session ends with a live rewrite of one of the team\'s current in-flight answers, so the coaching is calibrated to the work the team is actually doing.',
      'Participants leave with a reusable answer framework, an evidence library structure, and a scoring rubric calibrated against real evaluator feedback. The internal team\'s bid practice moves from one head to a documented method that the next writer can pick up without rebuild from zero.',
    ],
    whenUsed: [
      'When the internal team is writing its own bids but scoring inconsistently.',
      'When a new bid writer joins and needs evaluator-aligned calibration.',
      'When the team handles volume but lacks a repeatable answer framework.',
    ],
    delivers: [
      'Four live coaching sessions with the provider\'s bid team.',
      'Live rewrites of in-flight answers during each session.',
      'A reusable answer framework, an evidence library structure and a scoring rubric calibrated to real evaluator feedback.',
    ],
    howItWorks: [
      { step: 'Live Sessions', desc: 'Four scheduled sessions covering specification analysis, answer architecture, evidence banking and evaluator psychology.' },
      { step: 'Real Answer Rewrites', desc: 'Each session ends with a live rewrite of one of the team\'s current answers.' },
      { step: 'Scoring Calibration', desc: 'Internal scoring practice tested and corrected against real evaluator feedback.' },
    ],
    solves: [
      'Inconsistent scoring across an internal team.',
      'New bid writers without evaluator-grade training.',
      'Volume bidding without a repeatable answer framework.',
    ],
    transforms: [
      { from: 'Inconsistent internal scoring', to: 'Calibrated rubric across the team' },
      { from: 'Generic answer style', to: 'Evaluator-aligned answer architecture' },
      { from: 'Bid practice trapped in one head', to: 'Repeatable team framework' },
    ],
    tiers: [
      { name: 'Standard', desc: 'Four-session programme for one to three writers.' },
      { name: 'Scale', desc: 'Four-session programme plus three follow-up reviews.' },
    ],
  },
  {
    slug: 'pipeline-tracking',
    title: 'Pipeline Tracking',
    tagline: 'See every opportunity before competitors do.',
    description: "Weekly feed of relevant opportunities scored against the provider's service scope, geography and capacity.",
    heroImg: `${WP}/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg`,
    paragraphs: [
      'Pipeline Tracking is a weekly feed of relevant tender opportunities sourced across Find a Tender, Contracts Finder, In-Tend, ProContract, Atamis, and regional procurement portals. Every opportunity is scored for fit against the provider\'s service scope, geography, and delivery capacity, with a bid or no-bid recommendation and an internal drafting deadline for every go decision.',
      'The pipeline arrives every Monday morning. Each opportunity carries a fit score, a commissioner profile, a likely evaluator weighting, and a recommended drafting window back-calculated from the submission deadline to leave a buffer for review. The team can move straight into specification analysis on the opportunities they decide to bid, rather than spending Monday hunting through portals.',
      'Pipeline Tracking is used when the provider is ready to bid consistently but does not have the bandwidth to monitor every portal every day. It removes the structural risk that the right opportunity drops on a Tuesday and is missed because the team did not see it until Friday.',
    ],
    whenUsed: [
      'When the provider is ready to bid consistently but cannot monitor every portal every day.',
      'When opportunity selection is reactive rather than strategic.',
      'When an internal bid lead spends too much time sourcing rather than writing.',
    ],
    delivers: [
      'A weekly Monday-morning scored pipeline report.',
      'A fit score, commissioner profile, evaluator weighting and recommended drafting window per opportunity.',
      'A bid or no-bid recommendation with internal drafting deadline for every go decision.',
    ],
    howItWorks: [
      { step: 'Sourcing', desc: 'Continuous monitoring across Find a Tender, Contracts Finder, In-Tend, ProContract, Atamis and regional portals.' },
      { step: 'Scoring', desc: "Each opportunity scored for fit against the provider's service scope, geography and capacity." },
      { step: 'Scheduling', desc: 'Drafting deadlines back-calculated to leave a buffer for review.' },
    ],
    solves: [
      'Missed opportunities buried in low-volume portals.',
      'Reactive bidding driven by inbound notifications only.',
      'Internal bid time wasted on sourcing rather than writing.',
    ],
    transforms: [
      { from: 'Reactive opportunity flow', to: 'Curated scored pipeline' },
      { from: 'Missed lots in adjacent regions', to: 'Visible fit scores across all portals' },
      { from: 'Sourcing overhead', to: 'Drafting time protected' },
    ],
    tiers: [
      { name: 'Growth', desc: 'One to two tenders per quarter.' },
      { name: 'Scale', desc: 'Three to five tenders per quarter.' },
      { name: 'Enterprise', desc: 'Six or more tenders per quarter, dedicated tender lead.' },
    ],
  },
  {
    slug: 'mobilisation-support',
    title: 'Mobilisation Support',
    tagline: 'Ready for contract day one.',
    description: 'Post-award delivery from contract award through to the first 90 days of live service.',
    heroImg: `${WP}/two-colleagues-working-together-office-color-background-corporate-business-colleagues-working_265223-44392-rlxnlsdfyy9pbs08u1xw33z3i5mjvkdbtwcbwr0e5o.jpg`,
    paragraphs: [
      'Mobilisation Support closes the gap between winning the bid and delivering the service on contract day one. It begins within 72 hours of the award notice, runs through the standstill window where applicable, and continues through the first 90 days of live delivery.',
      'The mobilisation plan is phased and Gantt-charted. TUPE workstreams are documented and named to clear owners, with consultation timelines aligned to statutory requirements. Policy alignment runs in parallel against the contract specification, so any policy gap surfaced during commissioner monitoring is closed before the meeting rather than during it. The first-90-day reporting framework is built to match the commissioner\'s expectation, ready for the first contract monitoring meeting from the outset.',
      'Mobilisation is the workstream that determines whether the contract is operationally credible at day one or whether the first commissioner meeting becomes a remediation conversation. We treat it as a structured project rather than as an extension of the bid.',
    ],
    whenUsed: [
      'From the moment the award notice arrives, through the first 90 days of live delivery.',
      'When TUPE applies and the workstream cannot wait.',
      'When the contract specification carries reporting or governance requirements that must be live on day one.',
    ],
    delivers: [
      'A phased mobilisation plan with Gantt chart issued in week one.',
      'A TUPE documentation pack and policy alignment workstream.',
      'A first-90-day reporting framework matching the commissioner\'s expectations.',
    ],
    howItWorks: [
      { step: 'Kick-Off', desc: 'Mobilisation kick-off within 72 hours of award.' },
      { step: 'Parallel Workstreams', desc: 'TUPE, policy alignment and reporting framework run in parallel.' },
      { step: 'Contract Readiness', desc: "Commissioner-facing reporting framework ready for the first contract monitoring meeting." },
    ],
    solves: [
      'Mobilisation slippage that risks contract penalties.',
      'TUPE workstreams without a documented owner.',
      'Reporting frameworks built reactively after the first commissioner meeting.',
    ],
    transforms: [
      { from: 'Award notice', to: 'Live service on day one' },
      { from: 'TUPE pressure', to: 'Documented TUPE pack delivered' },
      { from: 'Reporting confusion', to: 'Framework aligned to commissioner expectation' },
    ],
    tiers: [
      { name: 'Standard', desc: 'Single-service mobilisation.' },
      { name: 'Complex', desc: 'Multi-service or TUPE-heavy mobilisation.' },
      { name: 'Framework', desc: 'Multi-lot mobilisation across regions.' },
    ],
  },
  {
    slug: 'tender-retainer',
    title: 'Tender Retainer',
    tagline: 'Turn tendering into a growth function.',
    description: 'Monthly engagement bundling Pipeline Tracking, two Pre-Submission Reviews and priority access to Bid Writing.',
    heroImg: `${WP}/businessman-shaking-hand-with-his-colleague-office-scaled-rlxt0xn6uperpcjnbeniqv67bzrvxd35zs7cqtnycs.jpg`,
    paragraphs: [
      'Tender Retainer is a monthly engagement that bundles Pipeline Tracking, two Pre-Submission Reviews per month, and priority access to Bid Writing at a fixed retainer discount. It is designed for providers who treat tendering as a continuous growth function rather than as a project that runs once or twice a year.',
      'The retainer delivers a Monday-morning pipeline report every week, covering Contracts Finder, Find a Tender, ProContract, In-Tend, Atamis and regional portals filtered for the provider\'s care setting and geography. Two Pre-Submission Reviews are included each month, so the team always has rapid access to evaluator-grade scoring on any draft. Bid Writing slots are reserved on priority access, bypassing the standard lead time when an urgent submission lands.',
      'Quarterly strategy reviews keep the retainer aligned to the provider\'s growth plan. Tender activity stops being reactive project work and becomes a predictable, plannable contribution to the year\'s growth target.',
    ],
    whenUsed: [
      "When tender income is central to the provider's growth plan.",
      'When the pace of opportunity needs a permanent answer rather than one-off engagements.',
      'When the team needs priority slotting into the writing queue without waiting on standard lead time.',
    ],
    delivers: [
      'Monthly pipeline report with scored opportunities.',
      'Two Pre-Submission Reviews per month included.',
      'Priority access to Bid Writing at a fixed retainer discount.',
      'Quarterly strategy reviews with the retained tender lead.',
    ],
    howItWorks: [
      { step: 'Monthly Delivery', desc: 'Pipeline reports, reviews and strategy calls on a fixed cycle.' },
      { step: 'Quarterly Strategy', desc: "Twelve-week strategy review aligned to the provider's growth plan." },
      { step: 'Priority Access', desc: 'Retained clients bypass standard lead time on urgent submissions.' },
    ],
    solves: [
      'One-off engagement friction at the start of every bid.',
      'Lead-time pressure on urgent submissions.',
      'Tender activity treated as project work rather than as a continuous function.',
    ],
    transforms: [
      { from: 'Project-by-project tendering', to: 'Continuous tender function' },
      { from: 'Lead-time risk', to: 'Priority access to writing slots' },
      { from: 'Reactive growth plan', to: 'Quarterly strategy reviews' },
    ],
    tiers: [
      { name: 'Growth', desc: 'One to two tenders per quarter.' },
      { name: 'Scale', desc: 'Three to five tenders per quarter.' },
      { name: 'Enterprise', desc: 'Six or more tenders per quarter with a dedicated tender lead.' },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug)
}
