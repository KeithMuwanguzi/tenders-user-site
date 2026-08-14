export type TenderLandingPage = {
  slug: string
  filterId: string
  label: string
  title: string
  description: string
  h1: string
  introduction: string
  heroImage: string
  heroAlt: string
  decisionHeading: string
  decisionCopy: string
  checks: string[]
  evidence: string[]
  sectorPath: string
  faqs: { question: string; answer: string }[]
}

export const TENDER_LANDING_PAGES: TenderLandingPage[] = [
  {
    slug: 'domiciliary-care',
    filterId: 'domiciliary',
    label: 'Domiciliary care tenders',
    title: 'Live Domiciliary Care Tenders UK | TenderLab',
    description:
      'Find live domiciliary care tenders, home care frameworks and reablement opportunities across the UK, with practical guidance for deciding whether to bid.',
    h1: 'Live domiciliary care tenders and home care contracts.',
    heroImage: '/images/editorial/tenderlab-domiciliary-care-hero-v1.jpg',
    heroAlt: 'A home care professional supporting an older person in their own home',
    introduction:
      'Browse current home care, domiciliary care and reablement opportunities published through official UK procurement notice sources. Open each record for the buyer, deadline, value, documents and official submission route.',
    decisionHeading: 'Check the operating model before committing to the bid.',
    decisionCopy:
      'A large contract value does not make an opportunity suitable. Providers need to test geography, visit volumes, call lengths, travel assumptions, workforce availability, mobilisation time and the relationship between the published price and safe delivery.',
    checks: [
      'Whether the service area can be covered without weakening continuity or punctuality.',
      'Whether the published rates recognise travel, unsocial hours, training and supervision.',
      'Whether mobilisation dates allow safe recruitment, onboarding and route planning.',
      'Whether the provider can meet every financial, insurance, registration and experience condition.',
    ],
    evidence: [
      'Workforce capacity, rostering controls and missed-call prevention.',
      'Care planning, medication, safeguarding and quality assurance records.',
      'Examples showing outcomes, continuity, complaints learning and service improvement.',
      'A mobilisation plan grounded in the geography and expected package volumes.',
    ],
    sectorPath: '/care-settings/domiciliary-care',
    faqs: [
      {
        question: 'Where can domiciliary care providers find council contracts?',
        answer:
          'Opportunities may appear on Find a Tender, Contracts Finder and commissioner procurement portals. This page brings relevant published notices together, but providers should also follow the named buyer and official record.',
      },
      {
        question: 'Can a new domiciliary care provider bid for a tender?',
        answer:
          'Sometimes. The answer depends on the published conditions, registration requirements, financial standing, references, mobilisation plan and whether the provider can evidence safe delivery. Read every condition before assuming eligibility.',
      },
      {
        question: 'Can TenderLab assess a domiciliary care tender before we bid?',
        answer:
          'Yes. TenderLab can review the conditions, evidence, delivery model, timetable and commercial exposure, then explain the fit and the gaps that need resolving.',
      },
    ],
  },
  {
    slug: 'supported-living',
    filterId: 'supported-living',
    label: 'Supported living tenders',
    title: 'Live Supported Living Tenders UK | TenderLab',
    description:
      'Browse live supported living tenders and supported accommodation opportunities for learning disability, autism, mental health and complex support services.',
    h1: 'Live supported living tenders for UK care providers.',
    heroImage: '/images/editorial/tenderlab-supported-living-hero-v1.jpg',
    heroAlt: 'A support worker and an adult discussing everyday choices in a home setting',
    introduction:
      'Find current supported living and related accommodation-based support opportunities. Use the filters and official notice links to examine service scope, cohorts, locations, lots, deadlines and procurement documents.',
    decisionHeading: 'Separate the contract opportunity from the property assumption.',
    decisionCopy:
      'Supported living procurements can combine care, support, housing and referral expectations in different ways. Before bidding, establish what the buyer is purchasing, how accommodation will be sourced, which regulatory duties apply and whether the staffing model supports real choice and independence.',
    checks: [
      'Whether accommodation must already be available and what standards it must meet.',
      'Whether care and housing responsibilities are clearly separated in the tender pack.',
      'Whether referral volumes, void exposure and staffing assumptions are commercially workable.',
      'Whether the provider has credible specialist practice for the named cohorts.',
    ],
    evidence: [
      'Person-centred support, choice, tenancy sustainment and community participation.',
      'Positive behaviour support, safeguarding and restrictive-practice governance where relevant.',
      'Workforce competence for learning disability, autism, mental health or complex needs.',
      'Mobilisation evidence covering property, referrals, staffing and multi-agency working.',
    ],
    sectorPath: '/care-settings/supported-living',
    faqs: [
      {
        question: 'What is normally included in a supported living tender?',
        answer:
          'Scope varies. A procurement may cover individual packages, a framework, block provision or accommodation-linked support. The official specification and contract documents define the requirement.',
      },
      {
        question: 'Do we need properties before bidding?',
        answer:
          'Not always. Some procurements require identified accommodation, some ask for a credible sourcing plan and others concern support within existing properties. Check the property and mobilisation conditions carefully.',
      },
      {
        question: 'How can TenderLab support a supported living bid?',
        answer:
          'TenderLab can test suitability, map the specification, gather operational evidence, draft method statements and independently review the submission before it is uploaded.',
      },
    ],
  },
  {
    slug: 'children-young-people',
    filterId: 'children',
    label: "Children's services tenders",
    title: "Live Children's Services Tenders UK | TenderLab",
    description:
      'Find live children and young people tenders, including residential care, supported accommodation, leaving care, fostering and family support opportunities.',
    h1: "Live children's services tenders.",
    heroImage: '/images/editorial/tenderlab-childrens-services-hero-v1.webp',
    heroAlt: 'Young people and support professionals working together around a table',
    introduction:
      'Browse current procurement opportunities for children\'s residential care, supported accommodation, leaving care, fostering, short breaks, outreach and family support. Always use the official notice and tender pack as the final source of requirements.',
    decisionHeading: 'Test safeguarding, regulation and placement assumptions first.',
    decisionCopy:
      'Children\'s services procurements can involve different regulatory regimes, age groups, placement models and safeguarding expectations. A credible bid must reflect the exact service being commissioned rather than reuse generic adult social care language.',
    checks: [
      'The age range, cohort, placement model and regulatory status of every lot.',
      'Whether premises, registration or inspection history are conditions of participation.',
      'Whether referral, matching, emergency placement and out-of-hours expectations are deliverable.',
      'Whether staffing, leadership and safeguarding competence can be evidenced at mobilisation.',
    ],
    evidence: [
      'Safeguarding leadership, safer recruitment and escalation arrangements.',
      'Child-centred planning, participation, education and preparation for independence.',
      'Placement matching, stability, missing-from-care responses and multi-agency working.',
      'Workforce competence and governance tailored to the specific service model.',
    ],
    sectorPath: '/care-settings/childrens-services',
    faqs: [
      {
        question: "Which children's services opportunities appear here?",
        answer:
          'The filter covers notices referring to children and young people, including residential care, supported accommodation, fostering, leaving care, short breaks and family support. Read the individual notice to confirm scope.',
      },
      {
        question: 'Can one response be reused across different children\'s service lots?',
        answer:
          'Only where the requirements genuinely overlap. Each response should still address the named cohort, service model, outcomes, risks, staffing and scoring criteria for that lot.',
      },
      {
        question: 'Does TenderLab write children\'s services tenders?',
        answer:
          'Yes. TenderLab supports providers with tender assessment, evidence gathering, response writing and pre-submission review for children and young people services.',
      },
    ],
  },
  {
    slug: 'mental-health',
    filterId: 'mental-health',
    label: 'Mental health tenders',
    title: 'Live Mental Health Tenders UK | TenderLab',
    description:
      'Browse live UK mental health tenders for supported living, community support, crisis, recovery and related health and social care services.',
    h1: 'Live mental health tenders and support contracts.',
    heroImage: '/images/editorial/tenderlab-mental-health-hero-v1.jpg',
    heroAlt: 'People sharing a supportive conversation in a calm community setting',
    introduction:
      'Find current mental health procurement opportunities across community support, supported living, crisis response, recovery and related services. Open the official record for the complete scope, eligibility conditions and submission instructions.',
    decisionHeading: 'Make the clinical and social care boundaries explicit.',
    decisionCopy:
      'Mental health procurements may require social care delivery, clinical partnership, accommodation support or a combination of these. Providers should identify the required competencies, referral routes, risk controls and multi-agency responsibilities before deciding that the opportunity fits.',
    checks: [
      'Whether clinical accountability or regulated healthcare activity forms part of the contract.',
      'Whether the workforce model covers crisis, out-of-hours and specialist risk requirements.',
      'Whether referral volumes, step-down expectations and accommodation assumptions are credible.',
      'Whether partnerships and information-sharing arrangements can be evidenced.',
    ],
    evidence: [
      'Recovery-focused planning, co-production and measurable personal outcomes.',
      'Risk assessment, crisis prevention, safeguarding and escalation pathways.',
      'Workforce competence, supervision and partnership with health professionals.',
      'Examples of safe transitions, reduced escalation and sustained community living.',
    ],
    sectorPath: '/care-settings/mental-health-services',
    faqs: [
      {
        question: 'What types of mental health contracts are advertised?',
        answer:
          'They can include supported living, floating support, crisis services, recovery programmes, community services and specialist accommodation. The exact scope is defined by the buyer\'s documents.',
      },
      {
        question: 'What should a provider check before bidding?',
        answer:
          'Check regulatory scope, clinical responsibilities, cohort complexity, workforce competence, mobilisation, partnerships, referral assumptions and the commercial model.',
      },
      {
        question: 'Can TenderLab review a mental health tender response?',
        answer:
          'Yes. We can review compliance, evidence, delivery specificity, scoring alignment and unresolved risks before submission.',
      },
    ],
  },
  {
    slug: 'complex-care-chc',
    filterId: 'complex-chc',
    label: 'Complex care and CHC tenders',
    title: 'Live Complex Care and CHC Tenders UK | TenderLab',
    description:
      'Find live complex care and continuing healthcare tenders, including community packages, framework opportunities and specialist support contracts.',
    h1: 'Live complex care and continuing healthcare tenders.',
    heroImage: '/images/editorial/tenderlab-complex-care-chc-hero-v1.jpg',
    heroAlt: 'A healthcare professional discussing a complex care plan with a patient',
    introduction:
      'Browse current complex care and continuing healthcare opportunities. These procurements may involve community packages, specialist staffing, clinical governance, rapid mobilisation and coordination with commissioners and health professionals.',
    decisionHeading: 'Confirm the clinical governance and workforce requirement.',
    decisionCopy:
      'Complex care contracts can fail when the price, competencies or mobilisation assumptions do not match the needs of the people being supported. The tender decision should examine clinical oversight, workforce availability, package variation, contingency and the provider\'s ability to evidence safe delivery.',
    checks: [
      'The clinical tasks, delegated responsibilities and oversight required by the specification.',
      'Whether qualified and competent staff can be recruited and retained in the service area.',
      'How package changes, cancellations, acuity and out-of-hours support affect the price.',
      'Whether mobilisation and care-transfer arrangements are safe for each person.',
    ],
    evidence: [
      'Clinical governance, competency assessment and escalation arrangements.',
      'Care planning, medication, incident learning and multidisciplinary working.',
      'Workforce continuity, supervision and rapid-response contingency.',
      'Examples of safe complex packages and measurable outcomes where shareable.',
    ],
    sectorPath: '/care-settings/complex-care-and-continuing-healthcare',
    faqs: [
      {
        question: 'What is a complex care or CHC tender?',
        answer:
          'It is a procurement for services supporting people with significant health or care needs. Scope, funding route, clinical responsibility and delivery setting vary, so the tender documents must be read closely.',
      },
      {
        question: 'What is commonly evaluated in these bids?',
        answer:
          'Buyers commonly examine clinical governance, workforce competence, mobilisation, continuity, risk management, safeguarding, outcomes, partnership working and price.',
      },
      {
        question: 'Can TenderLab help with the bid decision?',
        answer:
          'Yes. TenderLab can compare the requirements with the provider\'s governance, evidence, workforce, delivery capacity and commercial position before writing starts.',
      },
    ],
  },
  {
    slug: 'residential-nursing-care',
    filterId: 'residential-nursing',
    label: 'Residential and nursing care tenders',
    title: 'Live Residential and Nursing Care Tenders UK',
    description:
      'Browse live residential care, care home and nursing care tenders, including frameworks, placements and specialist accommodation-based care opportunities.',
    h1: 'Live residential and nursing care tenders.',
    heroImage: '/images/editorial/tenderlab-nursing-care-hero-v1.jpg',
    heroAlt: 'A nursing professional speaking with an older person about their care',
    introduction:
      'Find current care home, residential care and nursing care procurement opportunities. Review each official record for lot structure, service-user cohorts, quality requirements, pricing schedules, deadlines and submission documents.',
    decisionHeading: 'Test capacity, quality and fee assumptions together.',
    decisionCopy:
      'Residential and nursing procurements often combine demanding quality expectations with fixed or banded fees. Providers should assess occupancy, staffing, clinical need, property suitability, mobilisation and inflation exposure as one operating model rather than separate questions.',
    checks: [
      'Whether the property, registration, location and available capacity meet every lot condition.',
      'Whether staffing and nursing requirements can be sustained within the published fee model.',
      'Whether admissions, exclusions, voids and changing needs are clearly addressed.',
      'Whether quality, safeguarding and clinical governance evidence is current and specific.',
    ],
    evidence: [
      'Quality assurance, safeguarding, medication and incident-learning systems.',
      'Workforce planning, clinical leadership, training and supervision.',
      'Person-centred outcomes, family involvement and meaningful activity.',
      'Mobilisation, admissions, continuity and deterioration-management arrangements.',
    ],
    sectorPath: '/care-settings/residential-care',
    faqs: [
      {
        question: 'What residential and nursing opportunities appear here?',
        answer:
          'The filter covers notices for care homes, residential care, nursing care and related accommodation-based services. Confirm the cohort, regulatory scope and lot requirements in the official documents.',
      },
      {
        question: 'Are framework fees always financially viable?',
        answer:
          'No. Providers should test staffing, occupancy, property, clinical need, inflation, additional support and contract terms against the published fee structure before bidding.',
      },
      {
        question: 'How can TenderLab support a care home tender?',
        answer:
          'TenderLab can assess suitability, map the specification, organise evidence, write responses and review the complete submission against the published scoring criteria.',
      },
    ],
  },
]

export function getTenderLandingPage(slug: string): TenderLandingPage | undefined {
  return TENDER_LANDING_PAGES.find((page) => page.slug === slug)
}
