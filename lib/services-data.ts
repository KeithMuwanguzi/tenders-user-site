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

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'bid-viability',
    title: 'Bid Viability and Tender Qualification',
    tagline: 'Know what fits before you commit money and management time.',
    description: 'A qualification-first review of the participation conditions, service scope, evidence, mobilisation demands and commercial position of a live care tender.',
    heroImg: '/images/editorial/tenderlab-readiness-audit-hero-v1.webp',
    paragraphs: [
      'A live opportunity can look attractive while containing a condition the provider cannot responsibly meet. Before recommending a full writing engagement, TenderLab reads the notice and available procurement documents, then tests the requirements against the provider’s actual position.',
      'The review covers mandatory participation conditions, registration and ratings where relevant, geography, service scope, turnover or insurance requirements, available operational evidence, mobilisation expectations, pricing constraints and the time left to prepare a credible response.',
      'The result is a clear recommendation: proceed, resolve defined gaps before deciding, or do not bid. It is professional judgement based on the information available, not a guarantee of eligibility or award. The buyer remains responsible for the final evaluation.',
    ],
    whenUsed: [
      'You have found a live tender and need an independent fit check before committing.',
      'The opportunity extends beyond your current service, geography or evidence base.',
      'Your team is deciding between several tenders and needs a consistent qualification method.',
      'The deadline is close and the highest-risk conditions need identifying quickly.',
    ],
    delivers: [
      'A written bid, resolve-first or no-bid recommendation.',
      'A record of the conditions, evidence gaps, delivery risks and commercial questions behind it.',
      'A practical next-step list for any gap that can reasonably be resolved before submission.',
    ],
    howItWorks: [
      { step: 'Read the buyer documents', desc: 'Identify every mandatory condition, dependency, deadline and scored requirement.' },
      { step: 'Test the provider position', desc: 'Compare the requirements with registration, experience, evidence, capacity and commercial reality.' },
      { step: 'Record the recommendation', desc: 'Explain what fits, what needs resolving and what would make the opportunity too risky to pursue.' },
    ],
    solves: [
      'Time and fees spent on an opportunity the provider cannot credibly deliver.',
      'Late discovery of a mandatory condition or mobilisation dependency.',
      'Bid decisions driven by contract value rather than operational fit.',
    ],
    transforms: [
      { from: 'An attractive notice', to: 'A requirements-led decision' },
      { from: 'Unrecorded assumptions', to: 'Named risks and evidence actions' },
      { from: 'Automatic go decision', to: 'Responsible bid, resolve-first or no-bid recommendation' },
    ],
    tiers: [
      { name: 'Initial qualification', desc: 'Notice and core buyer documents reviewed against the current provider position.' },
      { name: 'Detailed viability review', desc: 'Multi-lot or complex procurement with a recorded evidence, mobilisation and commercial assessment.' },
    ],
  },
  {
    slug: 'bid-writing',
    title: 'Health and Social Care Tender Writing',
    tagline: 'Turn real care delivery into a response the evaluator can follow and score.',
    description: 'End-to-end tender writing for UK health and social care providers, from procurement-pack review and answer planning through evidence development, drafting and final quality control.',
    heroImg: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
    paragraphs: [
      'TenderLab writes health and social care submissions around the buyer’s published requirements. We read the complete procurement pack, map every scored question and descriptor, and build an answer plan before drafting begins.',
      'The writing is developed from the provider’s real service: named roles, controls, records, case examples, outcomes and mobilisation arrangements. We do not invent experience or replace an operational gap with confident language. Where the evidence is incomplete, the gap is made visible and resolved with the provider where possible.',
      'The result is a coherent response that makes it easier for an evaluator to find the answer, understand how delivery will work and connect each promise to evidence. Award remains the buyer’s decision and also depends on eligibility, competition, price and the strength of the underlying service.',
    ],
    whenUsed: [
      'A suitable tender is live and the response still needs to be planned and written.',
      'Operational leaders have the evidence but limited capacity to turn it into scored answers.',
      'Previous submissions were compliant but did not make delivery, controls or outcomes clear enough.',
      'A multi-lot or specialist care procurement needs one consistent evidence-led narrative.',
    ],
    delivers: [
      'A response plan mapped to the buyer’s questions, descriptors and submission rules.',
      'Drafted quality responses developed from verified operational evidence.',
      'A final compliance and clarity review with an agreed submission handover.',
    ],
    howItWorks: [
      { step: 'Map the procurement', desc: 'Translate the specification, questions, descriptors and portal rules into one controlled response plan.' },
      { step: 'Build the evidence', desc: 'Work with the people who own delivery to identify the roles, controls, records and outcomes behind each claim.' },
      { step: 'Draft for the evaluator', desc: 'Write complete answers in the buyer’s order, using clear signposting and proportionate detail.' },
      { step: 'Challenge and hand over', desc: 'Test compliance, consistency and unsupported claims before the final approved version is prepared.' },
    ],
    solves: [
      'Buyer requirements buried across several procurement documents.',
      'Operational knowledge that has not been converted into usable tender evidence.',
      'Generic answers that describe good intentions without showing delivery controls.',
      'Inconsistent language, commitments or evidence across lots and questions.',
    ],
    transforms: [
      { from: 'A complex procurement pack', to: 'A controlled response plan' },
      { from: 'Operational knowledge', to: 'Evaluator-visible evidence' },
      { from: 'Disconnected drafts', to: 'One coherent submission' },
    ],
    tiers: [
      { name: 'Focused response', desc: 'A defined question set or single-service procurement.' },
      { name: 'Complete submission', desc: 'End-to-end writing across the full quality response.' },
      { name: 'Complex or multi-lot', desc: 'A larger procurement requiring shared evidence and lot-specific responses.' },
    ],
  },
  {
    slug: 'pre-submission-review',
    title: 'Pre-Submission Tender Review',
    tagline: 'Give the draft an independent evaluator challenge before it is submitted.',
    description: 'An independent review of a completed or advanced care tender draft against the buyer documents, scoring descriptors and visible evidence.',
    heroImg: '/images/editorial/tenderlab-pre-submission-review-hero-v1.webp',
    paragraphs: [
      'A fluent response can still miss a condition, leave a scored subpoint implicit or make a promise without showing who controls it. A pre-submission review tests the draft from outside the writing team.',
      'TenderLab compares the response with the question, specification, evaluation descriptors and submission rules. Findings are prioritised by risk and likely marks at stake, so the team knows what needs attention first rather than rewriting every section indiscriminately.',
      'The review does not reproduce the buyer’s final evaluation and cannot predict an award. It provides an independent, document-led assessment and practical changes the team can consider before submission.',
    ],
    whenUsed: [
      'The draft is substantially complete and needs an independent challenge.',
      'Several contributors have written different sections and consistency is uncertain.',
      'The team wants to prioritise the final review period around the highest-risk gaps.',
      'Previous evaluator feedback suggests recurring weaknesses in evidence or completeness.',
    ],
    delivers: [
      'Question-by-question findings against the published requirements and descriptors.',
      'A prioritised action list covering compliance, evidence, clarity and consistency.',
      'Focused comments or agreed rewrites for the sections most likely to benefit.',
    ],
    howItWorks: [
      { step: 'Reconstruct the scoring requirement', desc: 'Read the buyer documents and define what each answer must cover.' },
      { step: 'Challenge the draft', desc: 'Identify missing subpoints, unsupported claims, contradictions and unnecessary evaluator effort.' },
      { step: 'Prioritise the revision', desc: 'Separate material risks from optional improvements so the remaining time is used responsibly.' },
    ],
    solves: [
      'Writer familiarity hiding gaps in the draft.',
      'Final-week editing without a clear order of priority.',
      'Strong evidence that is present but difficult for the evaluator to locate.',
    ],
    transforms: [
      { from: 'Internal confidence', to: 'Independent document-led challenge' },
      { from: 'Diffuse editing', to: 'Prioritised corrections' },
      { from: 'Implicit evidence', to: 'Clear evaluator signposting' },
    ],
    tiers: [
      { name: 'Focused review', desc: 'A defined group of high-value responses.' },
      { name: 'Complete review', desc: 'The full quality response and cross-answer consistency.' },
    ],
  },
  {
    slug: 'lost-bid-debrief',
    title: 'Lost Tender Debrief and Improvement Review',
    tagline: 'Turn buyer feedback into specific changes before the next opportunity.',
    description: 'A structured review of a lost care tender using the submitted answers, buyer feedback and published evaluation material.',
    heroImg: '/images/editorial/tenderlab-lost-bid-debrief-hero-v1.webp',
    paragraphs: [
      'A rejection notice often records the score without explaining the writing, evidence or operational changes that would improve the next submission. TenderLab brings the buyer feedback back to the submitted answer and the published requirement.',
      'The review separates bid-specific issues from repeatable problems: missed subpoints, evidence that was asserted rather than demonstrated, weak signposting, inconsistent commitments or a delivery model the buyer did not find convincing.',
      'The output is designed for reuse. It records the lessons, identifies evidence actions and shows how selected answers could be rebuilt. Public competitor information may provide context, but it is never treated as proof of the evaluator’s private reasoning.',
    ],
    whenUsed: [
      'Buyer scores or written feedback are available after an unsuccessful tender.',
      'The same question types continue to score below expectation.',
      'The team needs to convert feedback into an evidence and answer-bank improvement plan.',
    ],
    delivers: [
      'A documented comparison of the requirement, submitted answer, score and buyer feedback.',
      'A prioritised explanation of bid-specific and repeatable weaknesses.',
      'An improvement plan and agreed example rewrites for future use.',
    ],
    howItWorks: [
      { step: 'Rebuild the evaluation trail', desc: 'Place the question, descriptors, submitted answer, score and feedback together.' },
      { step: 'Find the recurring causes', desc: 'Separate one-off procurement issues from evidence and writing weaknesses likely to recur.' },
      { step: 'Convert learning into assets', desc: 'Record evidence actions and rebuild selected material for the answer bank.' },
    ],
    solves: [
      'Buyer feedback that is filed but not acted on.',
      'Repeated losses with no consistent diagnosis.',
      'Rewriting from zero instead of improving reusable evidence.',
    ],
    transforms: [
      { from: 'A score and short comment', to: 'A traceable evaluation review' },
      { from: 'General disappointment', to: 'Specific evidence and writing actions' },
      { from: 'Dormant feedback', to: 'Reusable improvement material' },
    ],
    tiers: [
      { name: 'Single debrief', desc: 'One procurement, its response and available buyer feedback.' },
      { name: 'Pattern review', desc: 'Several submissions reviewed to identify recurring causes and priorities.' },
    ],
  },
  {
    slug: 'tender-readiness-audit',
    title: 'Tender Readiness Audit for Care Providers',
    tagline: 'Strengthen the evidence before the right opportunity arrives.',
    description: 'A practical assessment of the documents, evidence, capacity and tender process a care provider needs for its target public-sector opportunities.',
    heroImg: '/images/editorial/tenderlab-readiness-audit-hero-v1.webp',
    paragraphs: [
      'Tender readiness is not a generic folder of policies. It depends on the participation conditions and scored evidence used in the opportunities a provider actually wants to pursue.',
      'TenderLab reviews the target market alongside the provider’s registration, policies, insurances, financial and workforce evidence, case studies, outcomes, mobilisation capability, references and internal ownership. The audit distinguishes evidence that already exists from evidence that needs organising, strengthening or building through real delivery.',
      'The provider receives a prioritised plan with owners and dependencies. Timing is agreed from the current position and target opportunities rather than imposed as a universal programme.',
    ],
    whenUsed: [
      'A provider is preparing for its first public-sector care tender.',
      'The business is moving from spot work to frameworks or larger contracts.',
      'Evidence is spread across teams and the tender owner cannot see what is usable.',
      'The next target opportunity is known and preparation can begin before publication.',
    ],
    delivers: [
      'A readiness assessment aligned to the provider’s target opportunity types.',
      'A prioritised evidence, capability and ownership plan.',
      'A clear distinction between existing proof, remediable gaps and material constraints.',
    ],
    howItWorks: [
      { step: 'Define the target', desc: 'Identify the contracts, buyers, services and participation conditions the provider expects to pursue.' },
      { step: 'Inspect the evidence', desc: 'Review the documents, records, examples, capacity and ownership available now.' },
      { step: 'Build the readiness plan', desc: 'Prioritise actions by tender risk, dependency and the time needed to create genuine evidence.' },
    ],
    solves: [
      'Uncertainty about what commissioners will ask to see.',
      'Evidence fragmented across operations, HR, finance and quality teams.',
      'Important gaps discovered only after a live deadline begins.',
    ],
    transforms: [
      { from: 'A generic policy folder', to: 'Targeted tender evidence' },
      { from: 'Unclear ownership', to: 'Named actions and dependencies' },
      { from: 'Late surprises', to: 'Earlier, responsible preparation' },
    ],
    tiers: [
      { name: 'Single-setting audit', desc: 'One defined care setting and target opportunity type.' },
      { name: 'Multi-service audit', desc: 'Several services, lots or regions with shared and distinct evidence needs.' },
    ],
  },
  {
    slug: 'tender-training',
    title: 'Tender Training and Bid Team Coaching',
    tagline: 'Build a method your team can apply to real buyer documents.',
    description: 'Practical tender training for UK health and social care providers covering qualification, specification analysis, answer planning, evidence and review.',
    heroImg: '/images/editorial/tenderlab-tender-training-hero-v1.webp',
    paragraphs: [
      'TenderLab training is designed around the work the team actually performs. Sessions use relevant procurement documents and provider examples to show how conditions, questions and scoring descriptors become a controlled response plan.',
      'Training can cover bid qualification, specification analysis, answer architecture, evidence selection, case examples, review and the responsibilities of operational contributors. The aim is not to provide a collection of writing tricks. It is to build a shared method the team can repeat and improve.',
      'The scope is agreed around experience and role. A registered manager contributing evidence needs a different session from a bid lead responsible for the complete response.',
    ],
    whenUsed: [
      'An internal team writes bids but uses inconsistent methods or scoring judgements.',
      'Operational leaders need to provide stronger, more usable evidence.',
      'A new bid lead needs a repeatable process grounded in care procurement.',
      'The business wants to reduce dependence on knowledge held by one person.',
    ],
    delivers: [
      'A programme tailored to the team’s roles, experience and target procurements.',
      'Practical exercises using relevant buyer documents and provider evidence.',
      'Reusable templates, review questions and an agreed internal method.',
    ],
    howItWorks: [
      { step: 'Diagnose the need', desc: 'Understand who contributes, where the current process breaks and what the team must be able to do.' },
      { step: 'Teach through real work', desc: 'Use relevant procurement material and exercises rather than generic presentation-only training.' },
      { step: 'Embed the method', desc: 'Leave the team with usable prompts, responsibilities and review controls.' },
    ],
    solves: [
      'Inconsistent contributions from operations and bid teams.',
      'Generic training that does not transfer to live tender work.',
      'A bid process dependent on one individual’s undocumented approach.',
    ],
    transforms: [
      { from: 'Individual habits', to: 'A shared tender method' },
      { from: 'Generic theory', to: 'Practice using relevant documents' },
      { from: 'Unstructured review', to: 'Consistent questions and responsibilities' },
    ],
    tiers: [
      { name: 'Focused workshop', desc: 'A defined skill or team problem addressed in one practical session.' },
      { name: 'Team programme', desc: 'A sequenced programme covering qualification, planning, evidence, drafting and review.' },
    ],
  },
  {
    slug: 'mobilisation-support',
    title: 'Tender Mobilisation Support',
    tagline: 'Turn the winning promises into owned actions before service begins.',
    description: 'Post-award support that converts commitments in a successful care tender into a controlled mobilisation plan, evidence trail and reporting structure.',
    heroImg: '/images/editorial/tenderlab-mobilisation-support-hero-v1.webp',
    paragraphs: [
      'A winning response contains commitments about people, systems, training, communication, governance, reporting and transition. Mobilisation support brings those promises into one delivery control so they are not lost between award and contract start.',
      'TenderLab extracts the commitments from the submitted response and buyer documents, then works with the provider to assign owners, dependencies, evidence and review points. The operating team remains responsible for delivery; our role is to make the written commitments visible and manageable.',
      'The plan is shaped by the contract and implementation timetable. It does not assume a universal 90-day model when the buyer has set different milestones.',
    ],
    whenUsed: [
      'A contract has been awarded and the tender commitments need converting into delivery actions.',
      'Several teams own dependencies across recruitment, training, quality, finance and systems.',
      'The buyer requires regular mobilisation reporting or evidence before service commencement.',
    ],
    delivers: [
      'A commitment register drawn from the buyer documents and submitted response.',
      'A mobilisation plan with owners, dependencies, evidence and review points.',
      'A reporting structure aligned to the buyer’s timetable and governance requirements.',
    ],
    howItWorks: [
      { step: 'Extract the promises', desc: 'Identify every material commitment, dependency and milestone in the contract and winning response.' },
      { step: 'Assign control', desc: 'Agree owners, evidence, due dates and escalation routes with the delivery team.' },
      { step: 'Track to service start', desc: 'Maintain a visible review and reporting rhythm against the buyer’s actual mobilisation timetable.' },
    ],
    solves: [
      'Tender commitments becoming disconnected from operational delivery.',
      'Dependencies owned across several teams without one visible control.',
      'Buyer reporting assembled late from inconsistent records.',
    ],
    transforms: [
      { from: 'Promises in a submission', to: 'Owned delivery actions' },
      { from: 'Distributed dependencies', to: 'One controlled mobilisation record' },
      { from: 'Reactive reporting', to: 'Planned evidence and review points' },
    ],
    tiers: [
      { name: 'Mobilisation plan', desc: 'Commitment extraction and one controlled implementation plan.' },
      { name: 'Mobilisation support', desc: 'Plan plus agreed reviews through the buyer’s mobilisation period.' },
    ],
  },
  {
    slug: 'tender-pipeline-monitoring',
    title: 'Tender Pipeline Monitoring',
    tagline: 'See suitable opportunities early enough to make a responsible bid decision.',
    description: 'Structured monitoring of UK health and social care procurement opportunities, filtered around the provider’s services, geography, buyer priorities and realistic delivery capacity.',
    heroImg: '/images/editorial/tenderlab-live-tenders-hero-v1.webp',
    paragraphs: [
      'Tender Pipeline Monitoring gives care providers a focused view of opportunities that may fit their organisation. TenderLab agrees the services, locations, buyer types, contract sizes and notice sources that matter, then applies those criteria to the published market rather than forwarding every notice containing a broad care keyword.',
      'Each relevant alert records the buyer, service, geography, estimated value, deadline and source link, together with an initial explanation of why it may fit. Monitoring is an early-warning service, not a substitute for reading the procurement pack. A formal bid decision still requires the participation conditions, specification, mobilisation demands, evidence and commercial model to be checked.',
      'The pipeline record also helps leadership plan ahead. It separates immediate opportunities from future notices, market engagement and expiring contracts, so the team can prepare evidence and capacity before a suitable tender becomes urgent.',
    ],
    whenUsed: [
      'Your team checks several portals and needs one focused care-sector opportunity view.',
      'Relevant notices are being found too late for a controlled qualification and response process.',
      'Leadership wants visibility of upcoming procurements as well as tenders that are already open.',
      'The provider operates in defined services and regions and does not want generic tender alerts.',
    ],
    delivers: [
      'An agreed monitoring profile covering care settings, geography, buyers, value, exclusions and notice sources.',
      'Focused opportunity alerts with key dates, source links and an initial reason for relevance.',
      'A maintained pipeline separating live tenders, early market activity, future prospects and closed decisions.',
    ],
    howItWorks: [
      { step: 'Set the monitoring profile', desc: 'Agree what a relevant opportunity looks like, including services, locations, buyer types, values and exclusions.' },
      { step: 'Review the published market', desc: 'Monitor official notice sources and classify opportunities against the agreed profile.' },
      { step: 'Record and alert', desc: 'Share suitable notices with the deadline, buyer, source and initial reason they may fit.' },
      { step: 'Maintain the pipeline', desc: 'Track decisions, future prospects and evidence actions so useful intelligence is not lost between deadlines.' },
    ],
    solves: [
      'Relevant opportunities found after too much of the response period has passed.',
      'Generic alerts that overwhelm the team with unrelated contracts.',
      'No shared record of live decisions, future notices and early preparation actions.',
    ],
    transforms: [
      { from: 'Disconnected portal searches', to: 'One focused opportunity view' },
      { from: 'Generic keyword alerts', to: 'Provider-specific monitoring criteria' },
      { from: 'Late reactive decisions', to: 'Earlier qualification and preparation' },
    ],
    tiers: [
      { name: 'Focused monitoring', desc: 'One defined care setting, service area or regional opportunity profile.' },
      { name: 'Multi-service pipeline', desc: 'Several services or regions with separate filters, decisions and preparation actions.' },
    ],
  },
  {
    slug: 'tender-retainer',
    title: 'Retained Tender and Bid Support',
    tagline: 'Build a controlled tender function, not a series of isolated deadlines.',
    description: 'Ongoing tender support for care providers that need opportunity review, evidence development, writing capacity, independent challenge and continuous improvement.',
    heroImg: '/images/editorial/tenderlab-retainer-hero-v1.webp',
    paragraphs: [
      'Retained support is for providers treating public procurement as an ongoing growth function. The scope can combine opportunity monitoring, qualification, evidence-bank development, writing capacity, reviews, feedback learning and internal coaching.',
      'The engagement is planned around the provider’s services, geography, realistic capacity and target buyers. Not every opportunity is recommended. A consistent qualification record helps the leadership team focus on contracts the organisation can credibly pursue and deliver.',
      'The service is tailored rather than sold as a fixed bundle. The provider should pay for the support it is likely to use, with responsibilities and availability made clear before the engagement begins.',
    ],
    whenUsed: [
      'The provider expects several suitable opportunities across the year.',
      'Evidence and answer-bank development need to continue between deadlines.',
      'The internal team needs reliable specialist capacity without recruiting a full-time bid function.',
      'Leadership wants a consistent qualification and improvement record across bids.',
    ],
    delivers: [
      'An agreed support plan covering target opportunities, responsibilities and capacity.',
      'A maintained qualification, evidence and improvement record.',
      'Defined access to the combination of monitoring, writing, review or coaching required.',
    ],
    howItWorks: [
      { step: 'Set the tender strategy', desc: 'Agree target buyers, services, geography, opportunity filters and internal responsibilities.' },
      { step: 'Maintain the evidence base', desc: 'Capture useful outcomes, examples, feedback and changes between bid windows.' },
      { step: 'Support suitable opportunities', desc: 'Apply the agreed mix of qualification, writing, review and coaching when relevant work appears.' },
    ],
    solves: [
      'Reactive bidding with no consistent selection method.',
      'Evidence and learning lost between procurements.',
      'Unpredictable specialist capacity during live deadlines.',
    ],
    transforms: [
      { from: 'Isolated deadlines', to: 'A controlled tender programme' },
      { from: 'Repeated evidence searches', to: 'A maintained evidence base' },
      { from: 'Automatic bidding', to: 'Consistent opportunity qualification' },
    ],
    tiers: [
      { name: 'Advisory retainer', desc: 'Qualification, planning, reviews and evidence development.' },
      { name: 'Delivery retainer', desc: 'Reserved writing and review capacity alongside ongoing tender management.' },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((service) => service.slug === slug)
}
