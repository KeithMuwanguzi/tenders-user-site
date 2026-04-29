export type ServiceData = {
  slug: string
  title: string
  tagline: string
  heroImg: string
  paragraphs: string[]
  delivers: string[]
}

const WP = 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs'

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'bid-writing',
    title: 'Bid Writing',
    tagline: 'Specification-led writing. Evaluator-tested precision.',
    heroImg: `${WP}/mature-person-college-campus-study-area-writing-notes-ideas_482257-122475-1-rlxsw0xj5uov2nobza9nq3rjnjyvq9lmnhk2isxyuk.jpg`,
    paragraphs: [
      "Commissioning bodies across UK health and social care are raising the bar on every scored submission. Evaluation criteria are becoming more granular, mark schemes more demanding, and the gap between a compliant response and a winning one continues to narrow. Generic content no longer passes threshold. Evaluators expect operational specificity, named evidence, and responses that directly address every element of the scoring rubric.",
      "TenderLab's bid writing service is built on a rubric-first methodology. Before a single word is written, we decode the specification — identifying the scoring criteria, reading between the lines of what evaluators want to see, and mapping your organisation's evidence against every marked element. We do not write to fill word counts. We write to score.",
      "Every tender response we produce is built from the ground up around your organisation's real delivery model. We interview your team, review your policies, outcomes data, and operational evidence, and structure every section to mirror how an evaluator will read and mark it. Our responses reference real named individuals, real outcomes, and real operational practice — because that is what scores at 9 and 10, not the responses that could have been written by anyone.",
      "Whether you are tendering for a domiciliary care framework, a supported living lot, a children's residential contract, or a community health service, TenderLab writes responses that are specific, credible, and built to win. We deliver submission-ready documents, manage your timeline, and are available throughout the process to ensure nothing is missed before you submit.",
    ],
    delivers: [
      'Full specification analysis before writing begins',
      'Rubric-mapped response framework for every question',
      'Evidence-calibrated, outcome-led content',
      'Named staff, real case studies, measurable outcomes',
      'Quality gate review before final delivery',
      'Submission-ready document with full formatting',
    ],
  },
  {
    slug: 'pre-submission-review',
    title: 'Pre-Submission Review',
    tagline: 'Independent scoring. Evaluator-level scrutiny.',
    heroImg: `${WP}/business-team-situation-present-share-idea-scaled-rlxsy44mcljsvgn3s6rt9ksf6do8u1w5ltqwwxuh0s.jpg`,
    paragraphs: [
      "Submitting a tender without an independent review is the single most common reason providers score below threshold. Internal teams are too close to the content. They know what they meant to say, so they read what they intended rather than what the evaluator will actually mark. By the time a response reaches submission stage, the team writing it has read it so many times they can no longer see what is missing.",
      "TenderLab's Pre-Submission Review applies the same 20-criterion scoring framework used by commissioning bodies to assess your response before it leaves your hands. We read your tender the way an evaluator reads it — scoring every section, identifying where responses fail to fully address the marking criteria, flagging assertions made without supporting evidence, and highlighting where your language is vague when it needs to be specific.",
      "Our review reports are detailed and actionable. We do not produce a general commentary on your writing quality. We produce a scored breakdown of every question with specific recommendations for improvement. Where a response scores 6 out of 10, we tell you precisely what needs to change to reach 9. Where evidence is missing, we identify what evidence would strengthen the response and how to source it from your existing operations.",
      "Providers who use TenderLab's Pre-Submission Review consistently see score improvements of two to three points per question across reviewed sections. In competitive tender processes where the winning provider often scores just one or two points above the next, those improvements make the difference between winning and being eliminated.",
    ],
    delivers: [
      '20-criterion evaluator scoring of every question',
      'Specific improvement recommendations per question',
      'Evidence gap analysis with sourcing guidance',
      'Compliance check against specification requirements',
      'Word count and formatting review',
      'Revised draft with tracked amendments',
    ],
  },
  {
    slug: 'lost-bid-debrief',
    title: 'Lost Bid Debrief',
    tagline: 'Evidence-based analysis. Actionable intelligence.',
    heroImg: `${WP}/two-men-discussing-contract-desk_31965-128846-rlxnbi11686q9ey6wluvspfhgcbxmtj32zb0tq9i98.jpg`,
    paragraphs: [
      "Losing a tender is costly. Losing the same way twice is avoidable. Most providers receive a results letter and evaluator feedback but lack the framework to translate that information into meaningful improvements. Feedback is often vague, scores are listed without context, and the real reasons for the loss remain unclear. Without structured analysis, providers return to their next tender making the same mistakes.",
      "TenderLab's Lost Bid Debrief provides a forensic review of your failed submission against the available evaluator feedback, the scoring breakdown, and the specification requirements. We map every score against your response to identify precisely where marks were lost, what the evaluator was looking for that your response did not provide, and what structural or evidential changes would have changed the outcome.",
      "Our debrief process goes beyond the surface-level feedback you receive from commissioners. We analyse the pattern of low scores across your response to identify systemic weaknesses — whether the issue is insufficient evidence, failure to address the mark scheme directly, lack of operational specificity, or a structural approach that is not aligned with how evaluators assess responses. We distinguish between issues that can be fixed before your next submission and strategic gaps that require longer-term development.",
      "Every Lost Bid Debrief concludes with a prioritised action plan. We tell you what to do differently in your next submission, what evidence to develop before you tender again, and whether there are structural changes to your organisation's approach that would materially improve your success rate. Losing once is a setback. Understanding why you lost turns it into a competitive advantage.",
    ],
    delivers: [
      'Forensic scoring analysis against evaluator feedback',
      'Response-by-response breakdown of lost marks',
      'Identification of systemic vs submission-specific issues',
      'Evidence gap report with development priorities',
      'Competitor positioning analysis where data available',
      'Prioritised action plan for your next submission',
    ],
  },
  {
    slug: 'tender-readiness-audit',
    title: 'Tender Readiness Audit',
    tagline: 'Assessed capability. Identified gaps. Clear action plan.',
    heroImg: `${WP}/service5-rld2tb6l874u29gi0ghbat2xqz5o9gd2l6ub88mmcs.webp`,
    paragraphs: [
      "Winning tenders starts before the ITT is released. Providers who wait for a tender opportunity to assess their readiness are already behind. The organisations that score highest are those with pre-built evidence banks, current policies, documented outcomes, and a clear understanding of what commissioning bodies expect before the clock starts. By the time the tender documents arrive, the groundwork is already done.",
      "TenderLab's Tender Readiness Audit assesses your organisation against the full range of requirements typically evaluated in health and social care procurement. We review your policies and procedures for completeness and current compliance, assess your outcomes evidence and how well it is documented, evaluate your quality assurance infrastructure, and identify the gaps between your current position and what commissioners expect to see in a high-scoring response.",
      "Our audit methodology is structured around the actual scoring criteria used by local authorities and NHS commissioners. We do not assess your organisation against general standards — we assess it against the specific requirements of the frameworks and procurement routes you are targeting. If you are tendering for a community care framework in a specific region, our audit reflects what that commissioning body will look for.",
      "The output of every Tender Readiness Audit is a clear action plan with prioritised recommendations. We tell you what to fix immediately before your next tender opportunity, what to develop over the next three to six months to materially improve your competitiveness, and what longer-term strategic investments would position your organisation to win consistently rather than occasionally.",
    ],
    delivers: [
      'Policy and procedure compliance review',
      'Outcomes evidence assessment and documentation audit',
      'Quality assurance infrastructure review',
      'Gap analysis against commissioning expectations',
      'Prioritised readiness action plan',
      'Three, six and twelve-month development roadmap',
    ],
  },
  {
    slug: 'bid-team-coaching',
    title: 'Bid Team Coaching',
    tagline: 'Practical skills. Evaluator perspective. Lasting capability.',
    heroImg: `${WP}/team-architects-working-town-project-conference-room-architect-business-suit_482257-26513-rlech3dwy1clh1rrgzpxq067wt5p662hx5uscbdh2k.jpg`,
    paragraphs: [
      "Many care providers want to develop the internal capability to write and manage tenders without permanent reliance on external consultants. The challenge is that tender writing in health and social care is a specialist discipline. It requires understanding how evaluators think, how mark schemes work, how to structure responses to maximise scores, and how to translate operational delivery into evidence that commissioners recognise and value.",
      "TenderLab's Bid Team Coaching develops those capabilities directly within your team. Our coaching programme combines practical skills training with real tender application — we work with your team on live or recent tenders to develop scoring intelligence, response structuring, evidence calibration, and the evaluator perspective that separates responses that score 6 from responses that score 9.",
      "Coaching sessions are structured around your team's current skill level and your organisation's immediate tender priorities. We cover the fundamentals of rubric-first writing, how to read and decode a specification, how to identify and structure evidence for maximum scoring impact, and how to write with the operational specificity that evaluators reward. Every session includes worked examples from real care sector tenders.",
      "Providers who invest in bid team coaching see measurable improvement in their tender scores within two to three submission cycles. More importantly, they build a lasting internal capability that reduces dependence on external support, shortens tender turnaround times, and creates an organisational culture where winning tenders is a core operational competence rather than an occasional scramble.",
    ],
    delivers: [
      'Bespoke coaching programme tailored to your team',
      'Rubric-first writing skills and methodology',
      'Specification decoding and planning workshops',
      'Evidence calibration and outcome structuring training',
      'Live tender application with expert feedback',
      'Ongoing coaching support during active tender periods',
    ],
  },
  {
    slug: 'pipeline-tracking',
    title: 'Pipeline Tracking',
    tagline: 'Organised opportunities. Strategic priorities. No missed deadlines.',
    heroImg: `${WP}/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg`,
    paragraphs: [
      "Tender opportunities in UK health and social care are published across multiple portals, frameworks, and Dynamic Purchasing Systems with varying timescales, different submission requirements, and overlapping deadlines. Providers who rely on ad hoc monitoring miss opportunities. By the time a tender appears on their radar, they may have two weeks to respond to a specification that warrants six.",
      "TenderLab's Pipeline Tracking service monitors the procurement landscape on your behalf across Find a Tender, Contracts Finder, and all the major council and NHS portals relevant to your service areas and geography. We identify upcoming opportunities at the pre-market engagement stage where possible, giving you maximum preparation time, and alert you to relevant procurement activity as soon as it is published.",
      "Our pipeline tracking is not a generic alert service. We filter opportunities against your specific service types, geographies, lot sizes, and organisational capacity. We provide go/no-go analysis for each opportunity, assessing the strategic fit, the likely competition, the framework requirements, and your current readiness to submit a competitive response. We tell you which tenders are worth pursuing and which are not — so your resources are focused where they will have the greatest impact.",
      "For providers managing complex portfolios across multiple frameworks and service areas, TenderLab provides a structured pipeline dashboard updated in real time with upcoming deadlines, submission requirements, and strategic priority ratings. You always know what is coming, when it is due, and what preparation is required — well in advance of the submission window.",
    ],
    delivers: [
      'Monitoring across all major UK procurement portals',
      'Filtered opportunity alerts matched to your criteria',
      'Go/no-go analysis for every relevant opportunity',
      'Pre-market engagement monitoring where available',
      'Strategic priority ratings and capacity planning',
      'Structured pipeline dashboard with live deadlines',
    ],
  },
  {
    slug: 'mobilisation-support',
    title: 'Mobilisation Support',
    tagline: 'Contract won. Delivery planned. Transition secured.',
    heroImg: `${WP}/two-colleagues-working-together-office-color-background-corporate-business-colleagues-working_265223-44392-rlxnlsdfyy9pbs08u1xw33z3i5mjvkdbtwcbwr0e5o.jpg`,
    paragraphs: [
      "Winning a health and social care contract is the starting point, not the finish line. Commissioning bodies expect a detailed mobilisation plan that demonstrates your ability to transition from contract award to full operational delivery within the specified timeframe. That plan is typically due within days of contract award, and the quality of your mobilisation directly affects the commissioner's confidence in your ability to deliver.",
      "TenderLab's Mobilisation Support service helps you develop and execute the mobilisation plan your contract requires. We work with your operational team to map every activity from contract award to go-live, build a realistic delivery timeline against the commissioner's requirements, identify the critical path and risk areas, and produce the documentation your commissioner needs to be assured that delivery will proceed on time and to specification.",
      "Our mobilisation support covers the full range of activities typically required in health and social care contract transitions — staffing and TUPE planning, premises and equipment procurement, system set-up and data migration, safeguarding and compliance infrastructure, referral pathway development, and commissioner communication throughout the mobilisation period. We have managed mobilisations across domiciliary care, residential services, supported living, and children's services.",
      "For providers who have tendered competitively and won on the strength of their bid, mobilisation is the moment where that commitment to delivery is tested. TenderLab ensures your mobilisation is as strong as your tender — structured, evidenced, and delivered on time. We remain available throughout the mobilisation period to support any commissioner queries and to manage any delivery issues before they escalate.",
    ],
    delivers: [
      'Mobilisation plan development against contract requirements',
      'Critical path mapping and timeline management',
      'Staffing and TUPE planning support',
      'Safeguarding and compliance infrastructure review',
      'Commissioner communication management',
      'Risk identification and mitigation planning',
    ],
  },
  {
    slug: 'tender-retainer',
    title: 'Tender Retainer',
    tagline: 'Ongoing partnership. Priority access. Consistent results.',
    heroImg: `${WP}/businessman-shaking-hand-with-his-colleague-office-scaled-rlxt0xn6uperpcjnbeniqv67bzrvxd35zs7cqtnycs.jpg`,
    paragraphs: [
      "For providers with a regular flow of tender opportunities, a retainer arrangement delivers the consistency, priority access, and strategic oversight that one-off engagements cannot. The commissioning landscape in UK health and social care moves continuously — frameworks re-procure, new lots appear, Dynamic Purchasing Systems open and close. Managing that landscape effectively while maintaining operational delivery requires dedicated, specialist support that is available when you need it.",
      "TenderLab's Tender Retainer provides ongoing bid writing and strategic tender support on a fixed monthly basis. Retainer clients receive priority access to our team, meaning your opportunities are never deprioritised or delayed by competing project demand. We maintain a live profile of your organisation, your evidence bank, your outcomes data, and your current portfolio — so when a new opportunity arises, we can mobilise immediately rather than starting from scratch.",
      "Beyond individual tender responses, retainer clients benefit from strategic oversight of their entire pipeline. We advise on go/no-go decisions, framework strategy, positioning against known competitors, and the longer-term development priorities that will improve your win rate across your target procurement routes. We become an extension of your business development capability — not a reactive resource you call when the deadline is close.",
      "Providers on a TenderLab retainer consistently outperform those using ad hoc support. The combination of maintained evidence banks, organisational knowledge, strategic pipeline oversight, and priority access to specialist writers means retainer clients submit more competitive responses, more quickly, with higher consistency of quality. If tendering is a significant part of how your organisation grows, a retainer is the most effective way to support that growth.",
    ],
    delivers: [
      "Priority access to TenderLab's full team",
      'Maintained evidence bank and organisational profile',
      'Strategic pipeline oversight and go/no-go advice',
      'Fixed monthly cost with predictable capacity',
      'Rapid mobilisation for new tender opportunities',
      'Quarterly performance review and strategy sessions',
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug)
}
