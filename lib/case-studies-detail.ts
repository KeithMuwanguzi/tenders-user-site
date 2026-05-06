export type GalleryImage = {
  src: string
  caption: string
  tag: string
  isLead?: boolean
}

export type SnapshotCell = {
  label: string
  value: string
  isLead?: boolean
}

export type CaseStudySection = {
  num: string
  heading: string
  body: string
  callout?: { label: string; text: string }
}

export type ScoreTableRow = {
  lot: string
  cells: string[]
}

export type CaseStudyDetail = {
  verdict: string
  entryAnchor: { startedWith: string; result: string; context: string }
  startingStrip: string
  metaBar: { award: string; outcome: string; standstill?: string; reference: string }
  ftsUrl?: string
  stampSub: string
  stampSummary: string
  snapshotCells: SnapshotCell[]
  trustBadges: string[]
  galleryImages: GalleryImage[]
  gallerySource: string
  sections: CaseStudySection[]
  scoreTable?: { headers: string[]; rows: ScoreTableRow[] }
  beforeText: string
  afterText: string
  relatedSlugs: string[]
  closerLead: string
  closerSub: string
}

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {

  'havilah-care-bedford-supported-living': {
    verdict: 'One of 44 successful providers from 154 submissions. Full marks on both selection case studies, excellent on partnerships.',
    entryAnchor: { startedWith: 'No place, sub-30% acceptance rate framework', result: '1 of 44 from 154, three lots awarded', context: 'Bedford BC, PCR 2015' },
    startingStrip: 'Owner-led growing provider. Sub-30 percent acceptance rate framework. Case study sub-points implied rather than evidenced.',
    metaBar: { award: '11 July 2025', outcome: '1 of 44 from 154 submissions', standstill: '12 to midnight 21 July 2025', reference: 'BBC AD 03786' },
    ftsUrl: 'https://www.find-tender.service.gov.uk/procurement/ocds-h6vhtk-04d6dd',
    stampSub: 'STD + COMPLEX',
    stampSummary: 'From 1 of 154 applicants → 1 of 44 successful providers, all three lots awarded.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'No place, gateway selection',         isLead: true },
      { label: 'Outcome Achieved',  value: '1 of 44 from 154 submissions',        isLead: true },
      { label: 'Lots Won',          value: 'Std + Complex + Lot 2 (3)',           isLead: true },
      { label: 'Authority',         value: 'Bedford Borough Council' },
      { label: 'Reference',         value: 'BBC AD 03786' },
      { label: 'Client Type',       value: 'Scaling supported living' },
    ],
    trustBadges: ['Framework awarded providers', 'Local authority contracts', 'Verified award letters', 'Standstill cleared'],
    galleryImages: [
      { src: '/images/case-studies/havilah-1.png', caption: 'Award confirmation letter, page 1',        tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/havilah-2.png', caption: 'Standstill and compliance notice, page 2', tag: 'Compliance' },
      { src: '/images/case-studies/havilah-3.png', caption: 'Score breakdown — Selection criteria',     tag: 'Score breakdown' },
      { src: '/images/case-studies/havilah-4.png', caption: 'Score breakdown — Quality questions',      tag: 'Score breakdown' },
      { src: '/images/case-studies/havilah-5.png', caption: 'Score breakdown — Q4 to Q6 commentary',   tag: 'Score breakdown' },
      { src: '/images/case-studies/havilah-6.png', caption: 'Score breakdown — pricing and totals',     tag: 'Score breakdown' },
    ],
    gallerySource: 'Source: Bedford Borough Council Intention to Award letter dated 11 July 2025, reference BBC AD 03786, signed by Nadine Raenke, Senior Commissioning Officer (Adults).',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: 'This case study examines the route Havilah Care Ltd took onto Bedford Borough Council\'s Supported Living and Community Based Support Services Framework (BBC AD 03786). The procurement ran under the Public Contract Regulations 2015 and the Intention to Award letter reached the provider on 11 July 2025. The standstill ran to midnight 21 July 2025. The Council recorded 154 tender submissions against 44 successful awards — a sub-30 percent acceptance rate.',
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: 'The case studies were the binary gateway. The provider\'s first draft included a confident overview of independent living skills work but had not yet tied every sub-point of the question criteria back to a worked example. Business continuity stress testing was thin, assistive technology evidence carried headline references without enabling detail, and coproduction was referenced rather than demonstrated. Each gap is a deduction waiting to happen on a 50/50 sub-point rubric — combined they would have produced a case study at 35–40 of 50, closing the framework door regardless of the quality questions that followed.',
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement as lead writer on case studies, every quality method statement, the partnership narrative, the pricing schedule, the social value commitments tab and the Plain Meaning Grading audit before submission. The provider supplied operational facts and pricing posture. We turned both into a hundred-percent-of-available-points submission on the gateway, and into a quality narrative aligned to the evaluator\'s published banding rules on the questions that followed.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'Three interventions did the heavy lifting. The case studies were rebuilt sub-point by sub-point, each sub-point closed with a dated, named operational example — securing 50/50 on both Standard and Complex gateways. Q5 Partnerships was rebuilt around joined-up working across health, housing and voluntary sector partners, earning an excellent rating and the maximum 15 percent contribution. The pricing schedule was triple-checked against the published matrix: Day Hours at £20.40 Standard / £21.80 Complex, Sleep-in at £12.00 — reaching 35.29% commercial on Lot 1 Standard and 35.53% on Lot 1 Complex.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'Both Standard and Complex categories were accepted on Lot 1 and Community Based Support was accepted on Lot 2. Total scores reached 69.04% on Lot 1 Standard, 69.28% on Lot 1 Complex and 56.25% on Lot 2, with an excellent rating recorded on Q5 Partnerships. The standstill closed at midnight on 21 July 2025 without challenge.',
        callout: {
          label: 'Award notification — Bedford Borough Council',
          text: '"We are pleased to inform you of the following: your offer of Standard support on the framework has been accepted. Your offer of Complex support has been accepted. The Council received 154 tender submissions; 44 submissions were successful." — Nadine Raenke, Senior Commissioning Officer (Adults), Bedford BC. 11 July 2025.',
        },
      },
    ],
    scoreTable: {
      headers: ['Lot', 'Quality', 'Price', 'Total'],
      rows: [
        { lot: 'Lot 1 Standard', cells: ['33.75%', '35.29%', '69.04%'] },
        { lot: 'Lot 1 Complex',  cells: ['33.75%', '35.53%', '69.28%'] },
        { lot: 'Lot 2 Community',cells: ['56.25%', 'n/a',    '56.25%'] },
      ],
    },
    beforeText: 'The provider had no place on Bedford\'s supported living framework and no route to Council referrals for Standard or Complex packages. 110 of 154 applicants were rejected. The sub-point case study structure had not yet been applied, the social value commitments tab had not been quantified, and coproduction language was generalised rather than role-specific.',
    afterText: 'The provider sits among the 44 successful providers from 154 submissions, with both Standard and Complex accepted on Lot 1 and Community Based Support accepted on Lot 2. Documented evaluation feedback identifies excellent partnerships and a clean improvement plan for the next refresh.',
    relatedSlugs: ['choices-healthcare-essex-live-at-home', 'nelson-ocean-central-bedfordshire-supported-living', 'rosecare-bradford-mental-health-supported-living'],
    closerLead: 'Bring your next tender.',
    closerSub: 'One of 44 from 154. Full marks on the gateway, an excellent on partnerships, and a clean improvement plan for the next refresh.',
  },

  'choices-healthcare-essex-live-at-home': {
    verdict: 'Tier 2 places secured across five priority Essex districts in a single window. Standstill cleared without challenge.',
    entryAnchor: { startedWith: 'Tier 1 not achievable, no FW footprint', result: '5 of 5 Tier 2 lots awarded', context: 'Essex CC, Procurement Act 2023' },
    startingStrip: 'Tier 1 not achievable at close. Digital systems active operationally but unpacked for evaluator review.',
    metaBar: { award: '2025', outcome: '5 Tier 2 lots awarded', reference: '1038 / 2025/S 000-019527' },
    stampSub: '5 LOTS · TIER 2',
    stampSummary: 'From no Essex framework footprint → awarded 5 Tier 2 lots.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Tier 1 unreachable, no FW footprint', isLead: true },
      { label: 'Outcome Achieved',  value: '5 Tier 2 lots awarded',               isLead: true },
      { label: 'Lots Won',          value: '5 of 5 bid',                          isLead: true },
      { label: 'Authority',         value: 'Essex County Council' },
      { label: 'Reference',         value: '1038 / 2025/S 000-019527' },
      { label: 'Client Type',       value: 'Multi-branch domiciliary' },
    ],
    trustBadges: ['Framework awarded providers', 'Local authority contracts', 'Verified award letters', 'Procurement Act 2023'],
    galleryImages: [
      { src: '/images/case-studies/choices_healthcare-01.png', caption: 'Award confirmation letter, page 1',   tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/choices_healthcare-02.png', caption: 'Lot 1 Basildon — outcome page',        tag: 'Lot outcome' },
      { src: '/images/case-studies/choices_healthcare-03.png', caption: 'Lot 2 Braintree — outcome page',       tag: 'Lot outcome' },
      { src: '/images/case-studies/choices_healthcare-04.png', caption: 'Lot 4 Castle Point — outcome page',    tag: 'Lot outcome' },
      { src: '/images/case-studies/choices_healthcare-05.png', caption: 'Lot 6 Colchester — outcome page',      tag: 'Lot outcome' },
      { src: '/images/case-studies/choices_healthcare-06.png', caption: 'Lot 10 Rochford — outcome page',       tag: 'Lot outcome' },
      { src: '/images/case-studies/choices_healthcare-07.png', caption: 'Score breakdown — quality questions',  tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_healthcare-08.png', caption: 'Score breakdown — page 2',             tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_healthcare-09.png', caption: 'Score breakdown — page 3',             tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_healthcare-10.png', caption: 'Score breakdown — page 4',             tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_healthcare-11.png', caption: 'Score breakdown — page 5',             tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_healthcare-12.png', caption: 'Score breakdown — page 6',             tag: 'Score breakdown' },
    ],
    gallerySource: 'Source: Essex County Council outcome letter issued via Essex Supplier Portal, reference 1038 / 2025/S 000-019527.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: 'This case study analyses the route Choices Healthcare Limited took onto Essex County Council\'s Live at Home domiciliary framework, securing Tier 2 places across five priority districts in a single window under the Procurement Act 2023. Tier 1 entry was not achievable due to the in-area CQC rating profile at close, and the digital systems evidence that would have supported a stronger technology score had not been packaged for evaluator review.',
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: 'The CQC rating gap made Tier 1 unreachable at first close. Beyond the tier ceiling, the digital systems evidence — active and operationally documented — had not been surfaced in the format the evaluator required. The social value commitments had not been quantified against the Council\'s published Social Value Model requirements, and the method statements needed reframing from internal operational language into procurement-register evidence.',
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement as lead writer on all quality method statements, the digital systems evidence section, and the Social Value quantification. The provider supplied the operational substance. We packaged it into a Tier 2 submission that cleared the scoring threshold across all five districts, with a documented Tier 1 path built for the next refresh window.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'The digital systems evidence was unpacked from operational documentation and restructured against the evaluator\'s specific scoring criteria. Social value commitments were quantified against the Council\'s model. The method statements were rewritten to the scoring rubric band descriptions rather than to internal operational language. The combination pushed the quality scores above the Tier 2 threshold across all five lots applied for.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'Choices Healthcare was confirmed onto Tier 2 across all five lots: Lot 1 Basildon, Lot 2 Braintree, Lot 4 Castle Point, Lot 6 Colchester and Lot 10 Rochford. The outcome letter was issued through the Essex Supplier Portal. The standstill closed without challenge and the framework went live for call-off opportunities.',
      },
    ],
    scoreTable: {
      headers: ['Lot', 'District', 'Tier', 'Outcome'],
      rows: [
        { lot: 'Lot 1',  cells: ['Basildon',     'Tier 2', 'Awarded'] },
        { lot: 'Lot 2',  cells: ['Braintree',    'Tier 2', 'Awarded'] },
        { lot: 'Lot 4',  cells: ['Castle Point', 'Tier 2', 'Awarded'] },
        { lot: 'Lot 6',  cells: ['Colchester',   'Tier 2', 'Awarded'] },
        { lot: 'Lot 10', cells: ['Rochford',     'Tier 2', 'Awarded'] },
      ],
    },
    beforeText: 'The provider had no live framework presence in the five priority Essex districts and a limited inbound referral pipeline within Essex County Council commissioning. Tier 1 entry was not achievable due to the in-area CQC rating profile at close.',
    afterText: 'The provider holds Tier 2 framework places across Basildon, Braintree, Castle Point, Colchester and Rochford, with direct access to Council referral routes within the framework. The backbone evidence pack sits inside the organisation for future refresh windows.',
    relatedSlugs: ['livingstone-healthcare-essex-live-at-home', 'inspire-care-outreach-dorset-open-framework', 'havilah-care-bedford-supported-living'],
    closerLead: 'Bring your next tender.',
    closerSub: 'Five Tier 2 lots from a standing start. Zero Essex footprint to full multi-district framework access in a single window.',
  },

  'inspire-care-outreach-dorset-open-framework': {
    verdict: 'Five-lot Open Framework win on first application, with cohort-specific evidence packaged across each lot.',
    entryAnchor: { startedWith: 'Generic answers across five cohort lots', result: '5 of 5 lots awarded, first application', context: 'Dorset Council Open Framework' },
    startingStrip: 'Single set of generic answers stretched across five distinct cohort lots. Live-in cover bundled into domiciliary content.',
    metaBar: { award: '2024', outcome: '5 lots awarded, first application', reference: 'DN548158' },
    stampSub: '5 LOT FRAMEWORK',
    stampSummary: 'From cohort-blind generic answers → awarded 5 lots on first application.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Generic cohort answers across lots',   isLead: true },
      { label: 'Outcome Achieved',  value: '5 lots, first application',            isLead: true },
      { label: 'Lots Won',          value: '5 of 5 bid',                           isLead: true },
      { label: 'Authority',         value: 'Dorset Council' },
      { label: 'Reference',         value: 'DN548158' },
      { label: 'Client Type',       value: 'Multi-cohort home care' },
    ],
    trustBadges: ['Open Framework approved', 'Local authority contracts', 'Verified award letters', 'Multi-cohort evidence'],
    galleryImages: [
      { src: '/images/case-studies/inspire-1.png', caption: 'Award confirmation — Dorset Open Framework',  tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/inspire-2.png', caption: 'Framework approval — lot breakdown',          tag: 'Framework approval' },
    ],
    gallerySource: 'Source: Dorset Council Care, Support, Housing and Community Safety Open Framework approval notice, reference DN548158.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: 'This case study examines the route Inspire Care Outreach Ltd took onto Dorset Council\'s Care, Support, Housing and Community Safety Open Framework (DN548158), securing places on five lots in a single application. The framework covers care at home, live-in care, and specialist support for learning disability, autism and mental health cohorts. Inspire applied across all five cohort lots and was awarded on every one.',
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: 'The provider had entered with a single generic evidence base stretched across five cohort lots. The live-in care content had been bundled inside the domiciliary care method statements, which erased the cohort distinction the evaluator was scoring against. Each lot covered a distinct cohort profile — home care, live-in, learning disability, autism and mental health — and the evidence needed to track each profile separately to score at or above the award threshold.',
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement as lead writer on all five cohort method statements, separating the live-in care narrative from the domiciliary content and rebuilding each lot response against its specific cohort profile. The social value evidence and quality management sections were packaged against the Dorset evaluator\'s published scoring criteria for each lot.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'Separating the live-in care narrative was the pivotal change — it was the most structurally incorrect element in the original submission. Each lot was then rebuilt to its cohort, with specialist language for learning disability, autism and mental health introduced in proportion to the scoring weight those cohort elements carried. The generic framework became five distinct evidence packages, each tracking its own cohort scoring criteria.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'All five lots were awarded. Inspire Care Outreach Ltd is now an approved Dorset Council Open Framework provider for Lots 1, 2, 9, 10 and 11 — covering care at home, live-in care, LD/PD/autism support, MH/autism support and bespoke specialist support. The provider has direct access to all Call-Off Opportunities released against any of these lots.',
      },
    ],
    scoreTable: {
      headers: ['Lot', 'Service', 'Outcome'],
      rows: [
        { lot: '1',  cells: ['Care and Support at Home',           'Awarded'] },
        { lot: '2',  cells: ['Live-in Care',                       'Awarded'] },
        { lot: '9',  cells: ['Support at Home (A) LD/PD/Autism',   'Awarded'] },
        { lot: '10', cells: ['Support at Home (B) MH/Autism',      'Awarded'] },
        { lot: '11', cells: ['Support at Home (C) Bespoke',        'Awarded'] },
      ],
    },
    beforeText: 'The provider was not approved on Dorset Council\'s Open Framework and had no structured route to bid for Call-Off Opportunities, leaving it dependent on direct private placements within the Dorset footprint.',
    afterText: 'The provider is approved on five lots covering home care, live-in care, learning disability, autism, mental health and bespoke specialist support, and is eligible for Call-Off Opportunity invitations over the framework lifetime.',
    relatedSlugs: ['choices-healthcare-essex-live-at-home', 'livingstone-healthcare-essex-live-at-home', 'alicelyn-sheffield-overnight-short-breaks'],
    closerLead: 'Bring your next tender.',
    closerSub: 'Five lots, first application. Cohort-specific evidence that opened access to every Dorset call-off for five service areas.',
  },

  'rosecare-bradford-mental-health-supported-living': {
    verdict: 'Both lots awarded with six of eight technical responses scoring full marks on a binary 0–2 rubric.',
    entryAnchor: { startedWith: 'Mid-band drift on a 0–2 rubric', result: '6 of 8 at full marks, both lots awarded', context: 'Bradford Council, set pricing schedule' },
    startingStrip: 'Quality answers written for an unwritten 0–5 gradient. Coproduction referenced rather than demonstrated.',
    metaBar: { award: 'January 2025', outcome: '6 of 8 questions at full marks', reference: '85402' },
    stampSub: 'LOT 1 + LOT 2',
    stampSummary: 'From mid-band drift on a 0–2 rubric → 6 of 8 questions at full marks, both lots awarded.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Generic narrative on binary rubric',  isLead: true },
      { label: 'Outcome Achieved',  value: '6 of 8 questions at full marks',      isLead: true },
      { label: 'Lots Won',          value: 'Lot 1 + Lot 2',                       isLead: true },
      { label: 'Authority',         value: 'Bradford Council' },
      { label: 'Reference',         value: '85402' },
      { label: 'Client Type',       value: 'Owner-led mental health' },
    ],
    trustBadges: ['Provider list approved', 'Local authority contracts', 'Verified award letters', 'Standstill cleared'],
    galleryImages: [
      { src: '/images/case-studies/melm-1.png', caption: 'Award confirmation — Bradford Provider List',  tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/melm-2.png', caption: 'Score breakdown — Q1 to Q4',                   tag: 'Score breakdown' },
      { src: '/images/case-studies/melm-3.png', caption: 'Score breakdown — Q5 to Q8',                   tag: 'Score breakdown' },
      { src: '/images/case-studies/melm-4.png', caption: 'Provider list confirmation',                   tag: 'Confirmation' },
    ],
    gallerySource: 'Source: Bradford Council Mental Health Supported Living Provider List award documentation, reference 85402. Provider list operational from 27 January 2025.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: 'This case study examines the route Rosecare Community Services Ltd took onto Bradford Council\'s Mental Health Supported Living Services Provider List (reference 85402), where the provider secured Lots 1 and 2 with six of eight technical responses at full marks on a binary 0–2 rubric. The provider list went operational on 27 January 2025.',
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: 'The provider had written quality answers to a 0–5 gradient that did not exist in this procurement — Bradford\'s rubric was binary. A score of 1 on this rubric means incomplete or partial: only 2 is full marks. The original narrative addressed the questions confidently but at a level of generality that the binary rubric would have scored at 1 for most questions. Coproduction was mentioned rather than demonstrated with named service user roles and dated examples.',
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement as lead writer on all eight technical questions, restructuring each response to the binary rubric logic — where 2 means every element met, every example named and dated, and no evaluator discretion required. The coproduction narrative was rebuilt with named service user roles in the review cycle. Trauma-informed care practice was evidenced through specific approaches rather than referenced as a framework.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'The pivotal change was understanding the binary nature of the rubric and rewriting every answer to close every possible gap at 2/2 rather than at a confident 1/2. Questions 3 and 8 remained at 1/2 — Q3 Equality and Diversity and Q8 Quality — where the evidence base at the time of engagement did not fully support a 2/2 answer. All other questions were written to 2/2, with the specific recovery points for Q3 and Q8 documented for the next bid cycle.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'Lots 1 and 2 were awarded, six of eight technical responses scored full marks (2/2), the provider list went operational on 27 January 2025, and Council placements began arriving at the agreed pricing schedule.',
      },
    ],
    scoreTable: {
      headers: ['Question', 'Topic', 'Score'],
      rows: [
        { lot: 'Q1', cells: ['Service Delivery',            '2/2'] },
        { lot: 'Q2', cells: ['Trauma Informed Care',        '2/2'] },
        { lot: 'Q3', cells: ['Equality and Diversity',      '1/2'] },
        { lot: 'Q4', cells: ['Safeguarding',                '2/2'] },
        { lot: 'Q5', cells: ['Voice of People Supported',   '2/2'] },
        { lot: 'Q6', cells: ['Workforce',                   '2/2'] },
        { lot: 'Q7', cells: ['Vision and Transformation',   '2/2'] },
        { lot: 'Q8', cells: ['Quality',                     '1/2'] },
      ],
    },
    beforeText: 'The provider was not on Bradford Council\'s Mental Health Supported Living Provider List and had no structured route to receive Council placements at the Council\'s set pricing schedule.',
    afterText: 'The provider sits on Lots 1 and 2 with the provider list operational from 27 January 2025, six of eight responses at full marks, with documented improvement points for Q3 and Q8 built into the next bid cycle.',
    relatedSlugs: ['alicelyn-sheffield-overnight-short-breaks', 'havilah-care-bedford-supported-living', 'choices-healthcare-southend-childrens-framework'],
    closerLead: 'Bring your next tender.',
    closerSub: '6 of 8 at full marks on a binary rubric. Both lots awarded, placements live from day one.',
  },

  'choices-healthcare-southend-childrens-framework': {
    verdict: "Three sub-lot wins on a children's services framework with full marks on monitoring outcomes and evaluation.",
    entryAnchor: { startedWith: "Adult-derived bid practice on a children's panel", result: 'Awarded Lot 2 D, E and F (18+)', context: 'Southend-on-Sea CC, PCR 2015' },
    startingStrip: "Adult social care provider stretching into 18+ children's services. Adult-derived case examples and superseded policy citations.",
    metaBar: { award: '2025', outcome: 'Lot 2 D, E and F awarded', reference: 'DN762527' },
    stampSub: 'LOT 2 D · E · F',
    stampSummary: 'From adult-derived narrative → awarded Lot 2 D, E and F.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Adult-derived bid practice',            isLead: true },
      { label: 'Outcome Achieved',  value: 'Q5 Monitoring at full 5/5',             isLead: true },
      { label: 'Lots Won',          value: 'Lot 2D + 2E + 2F (18+)',               isLead: true },
      { label: 'Authority',         value: 'Southend-on-Sea City Council' },
      { label: 'Reference',         value: 'DN762527' },
      { label: 'Client Type',       value: 'Cross-sector provider' },
    ],
    trustBadges: ["Children's framework approved", 'Local authority contracts', 'Verified award letters', 'SEND panel evidence'],
    galleryImages: [
      { src: '/images/case-studies/choices_southend-1.png', caption: 'Award confirmation — Southend Children\'s Framework', tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/choices_southend-2.png', caption: 'Lot 2D score breakdown',                              tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_southend-3.png', caption: 'Lot 2E score breakdown',                              tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_southend-4.png', caption: 'Lot 2F score breakdown',                              tag: 'Score breakdown' },
      { src: '/images/case-studies/choices_southend-5.png', caption: 'Framework terms and conditions',                      tag: 'Framework terms' },
      { src: '/images/case-studies/choices_southend-6.png', caption: 'Compliance and standstill notice',                    tag: 'Compliance' },
    ],
    gallerySource: "Source: Southend-on-Sea City Council Children's Residential and Accommodation Framework award notice, reference DN762527, PCR 2015.",
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: "This case study examines the route Choices Healthcare Limited took onto Southend-on-Sea City Council's Children's Residential and Accommodation Framework (DN762527), securing Lot 2 D, E and F for 18+ accommodation. The provider's starting position was adult social care, and the bid needed to translate that evidence base into a children's services register without misrepresenting the cohort or citng superseded policy.",
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: "The default register of the bid material was adult social care, while the panel was reading children's services. Case examples drawn from adult domiciliary care did not map to the 18+ residential cohort. Policy citations referenced the Care Standards Act 2000 in contexts where the Children Act 1989 and Children and Families Act 2014 were the applicable frameworks. The scoring rubric included questions specifically testing children's services competency — these could not be answered from adult-derived material.",
      },
      {
        num: '08', heading: 'Our Role',
        body: "We took the engagement as lead writer on all quality questions, recalibrating from adult social care language to children's services language across all twelve questions. Case examples were rebuilt around 18+ residential scenarios. Policy citations were corrected to the applicable children's legislation, and the monitoring and outcomes section — Q5, which scored 5/5 — was built from scratch around the Southend quality framework.",
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: "Q5 Monitoring Outcomes and Evaluation scored 5/5. This was the highest-scoring question in the provider's submission and the only question at the maximum mark. The rebuild of Q5 around the Southend quality framework, rather than the provider's internal adult-derived monitoring approach, was the structural change that produced the 5/5 result. Q3 Social Value at 4/5 and Q11 Transition Support at 4/5 also performed above threshold.",
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'The provider was awarded a place on Lot 2 D, E and F. Total weighted scores reached 56.00% on Lot 2D, 56.86% on Lot 2E, and 55.51% on Lot 2F. The contract term runs from the award date with a 2-year extension option, and the provider\'s documented improvement plan addresses the gaps identified in Q1, Q8 and Q12.',
      },
    ],
    scoreTable: {
      headers: ['Question', 'Topic', 'Score'],
      rows: [
        { lot: 'Q1',  cells: ['Safeguarding',                                       '2/5'] },
        { lot: 'Q2',  cells: ['Data Protection',                                    '3/5'] },
        { lot: 'Q3',  cells: ['Social Value',                                       '4/5'] },
        { lot: 'Q8',  cells: ['Crisis Intervention & Risk Management',              '2/5'] },
        { lot: 'Q9',  cells: ['Monitoring Outcomes & Evaluation',                   '5/5'] },
        { lot: 'Q10', cells: ['Engagement & Participation',                         '2/5'] },
        { lot: 'Q11', cells: ['Transition Support & Community Integration',         '4/5'] },
        { lot: 'Q12', cells: ['Holistic Support & Individualised Support Plans',    '2/5'] },
      ],
    },
    beforeText: "The provider had no formal place on the Southend-on-Sea Children's Residential and Accommodation Framework. The default register of the bid material was adult social care, while the panel was reading children's services.",
    afterText: 'The provider holds three sub-lot positions on a 3-year framework with a 2-year extension option, with documented evaluator feedback identifying strengths in monitoring at 5/5, transition at 4/5 and social value at 4/5.',
    relatedSlugs: ['in-home-carers-hertfordshire-children-young-people', 'pcas-childrens-services-procurement', 'havilah-care-bedford-supported-living'],
    closerLead: 'Bring your next tender.',
    closerSub: "Three sub-lots on a children's framework. Q5 Monitoring at 5/5. A 3-year framework with extension option secured in a single window.",
  },

  'livingstone-healthcare-essex-live-at-home': {
    verdict: 'Five Tier 2 lots secured after a procedural Tier 1 miss, with a documented Tier 1 path for the next refresh.',
    entryAnchor: { startedWith: 'Procedural Q9 miss, Tier 1 lost', result: '5 Tier 2 lots, Tier 1 path locked', context: 'Essex CC, Procurement Act 2023' },
    startingStrip: 'Q9 Video evidence missing at first close. Clarification window passed without response. Tier 1 lost on procedural grounds.',
    metaBar: { award: '2025', outcome: '5 Tier 2 lots awarded', reference: '1038 / 2025/S 000-019527' },
    stampSub: '5 LOTS · TIER 2',
    stampSummary: 'From a procedural Tier 1 miss → awarded 5 Tier 2 lots, Tier 1 path documented.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Q9 missed, evidence not packaged',          isLead: true },
      { label: 'Outcome Achieved',  value: '5 Tier 2 lots, Tier 1 path documented',     isLead: true },
      { label: 'Lots Won',          value: '5 of 5 bid',                                isLead: true },
      { label: 'Authority',         value: 'Essex County Council' },
      { label: 'Reference',         value: '1038 / 2025/S 000-019527' },
      { label: 'Client Type',       value: 'Strong-CQC domiciliary' },
    ],
    trustBadges: ['Framework awarded providers', 'Local authority contracts', 'Verified award letters', 'Procurement Act 2023'],
    galleryImages: [
      { src: '/images/case-studies/livingstone-01.png', caption: 'Award confirmation — Essex Live at Home',   tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/livingstone-02.png', caption: 'Lot 1 Basildon outcome',                   tag: 'Lot outcome' },
      { src: '/images/case-studies/livingstone-03.png', caption: 'Lot 3 Brentwood outcome',                  tag: 'Lot outcome' },
      { src: '/images/case-studies/livingstone-04.png', caption: 'Lot 5 Chelmsford outcome',                 tag: 'Lot outcome' },
      { src: '/images/case-studies/livingstone-05.png', caption: 'Lot 7 Epping Forest outcome',              tag: 'Lot outcome' },
      { src: '/images/case-studies/livingstone-06.png', caption: 'Lot 8 Harlow outcome',                     tag: 'Lot outcome' },
      { src: '/images/case-studies/livingstone-07.png', caption: 'Score breakdown — quality questions',      tag: 'Score breakdown' },
      { src: '/images/case-studies/livingstone-08.png', caption: 'Score breakdown — page 2',                 tag: 'Score breakdown' },
      { src: '/images/case-studies/livingstone-09.png', caption: 'Score breakdown — page 3',                 tag: 'Score breakdown' },
      { src: '/images/case-studies/livingstone-10.png', caption: 'Score breakdown — page 4',                 tag: 'Score breakdown' },
      { src: '/images/case-studies/livingstone-11.png', caption: 'Score breakdown — page 5',                 tag: 'Score breakdown' },
      { src: '/images/case-studies/livingstone-12.png', caption: 'CQC and compliance documentation',         tag: 'Compliance' },
    ],
    gallerySource: 'Source: Essex County Council outcome letter via Essex Supplier Portal, reference 1038 / 2025/S 000-019527.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: 'This case study analyses the route Livingstone Health Care Limited took onto Essex County Council\'s Live at Home domiciliary framework, securing Tier 2 places across five priority districts in a single submission window after a procedural Tier 1 miss. Q9 Video evidence had not been submitted at first close. The clarification window passed without response, forcing a Tier 2 outcome on CQC scoring. The provider\'s underlying CQC profile was strong enough for Tier 1 had the video evidence been submitted in window.',
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: 'The Q9 Video evidence miss was procedural, not substantive — the provider\'s CQC record was strong. But the clarification non-response had closed the Tier 1 route for this window. Below the tier ceiling, the digital systems contracts had not been packaged for evaluator review, and the branch coordinate data that forms part of the geographic coverage requirement had not been formatted to the specification. These were the remaining gaps to address for the Tier 2 submission.',
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement to maximise the Tier 2 score and build the Tier 1 evidence pack for the next refresh. The digital systems evidence was packaged from the provider\'s operational contracts. Branch coordinates were formatted to specification. The Q9 video evidence was documented and prepared for the next window. The quality method statements were written against the scoring rubric.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'Packaging the digital systems contracts and the branch coordinate data against the scoring specification moved the Tier 2 score above threshold across all five districts. The Tier 1 path — Q9 video evidence, digital systems contracts and CQC documentation — was locked for the next refresh before the current window closed, so the provider entered the next cycle with a complete Tier 1 submission already built.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'Five Tier 2 framework places were confirmed: Basildon, Brentwood, Chelmsford, Epping Forest and Harlow. Tier 1 status was not awarded due to the outstanding Q9 Video evidence. The Tier 1 improvement plan — with Q9 evidence, digital systems contract proof and refreshed branch coordinates — sits inside the organisation for the next refresh window.',
      },
    ],
    scoreTable: {
      headers: ['Lot', 'District', 'CQC Score', 'Outcome'],
      rows: [
        { lot: 'Lot 1', cells: ['Basildon',      '24.5/35', 'Tier 2 Awarded'] },
        { lot: 'Lot 3', cells: ['Brentwood',     '24.5/35', 'Tier 2 Awarded'] },
        { lot: 'Lot 5', cells: ['Chelmsford',    '24.5/35', 'Tier 2 Awarded'] },
        { lot: 'Lot 7', cells: ['Epping Forest', '24.5/35', 'Tier 2 Awarded'] },
        { lot: 'Lot 8', cells: ['Harlow',        '24.5/35', 'Tier 2 Awarded'] },
      ],
    },
    beforeText: 'The provider had no live framework presence in Basildon, Brentwood, Chelmsford, Epping Forest or Harlow. Q9 Video evidence had not been submitted in window, the clarification non-response had forced a Tier 2 outcome, and the digital systems contracts had not been packaged.',
    afterText: 'The provider holds a five-district framework footprint under Tier 2 with direct call-off access, and a documented Tier 1 improvement plan with Q9 evidence, digital systems contract proof and refreshed branch coordinates ready for the next refresh window.',
    relatedSlugs: ['choices-healthcare-essex-live-at-home', 'inspire-care-outreach-dorset-open-framework', 'alicelyn-sheffield-overnight-short-breaks'],
    closerLead: 'Bring your next tender.',
    closerSub: 'Five districts secured despite a procedural miss. Tier 1 path built and locked before the current window closed.',
  },

  'in-home-carers-hertfordshire-children-young-people': {
    verdict: 'Both lots awarded by SEND Commissioning, secured in a single standstill window without challenge.',
    entryAnchor: { startedWith: 'Adult-derived language on a SEND panel', result: 'Both lots awarded by SEND Commissioning', context: 'Hertfordshire CC, SEND Commissioning' },
    startingStrip: 'Adult-derived homecare narrative applied to a children and young people SEND framework.',
    metaBar: { award: '11 August 2025', outcome: 'Both lots provisionally awarded', standstill: '11–21 August 2025', reference: 'HCC2314690 / HCC2314691' },
    stampSub: 'LOT 1 + LOT 2',
    stampSummary: 'From adult-derived defaults → both lots awarded by SEND Commissioning.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Adult-derived language on SEND panel',  isLead: true },
      { label: 'Outcome Achieved',  value: 'Both lots awarded by SEND',             isLead: true },
      { label: 'Lots Won',          value: '2 of 2 bid',                            isLead: true },
      { label: 'Authority',         value: 'Hertfordshire County Council' },
      { label: 'Reference',         value: 'HCC2314690 / HCC2314691' },
      { label: 'Client Type',       value: "Children's homecare" },
    ],
    trustBadges: ["Children's framework approved", 'SEND Commissioning', 'Verified award letters', 'Standstill cleared'],
    galleryImages: [
      { src: '/images/case-studies/in_home_carers-1.png', caption: 'Provisional award — Hertfordshire SEND Framework', tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/in_home_carers-2.png', caption: 'Lot 1 award letter — HCC2314690',                   tag: 'Lot award' },
      { src: '/images/case-studies/in_home_carers-3.png', caption: 'Lot 2 award letter — HCC2314691',                   tag: 'Lot award' },
      { src: '/images/case-studies/in_home_carers-4.png', caption: 'Standstill notice',                                  tag: 'Compliance' },
      { src: '/images/case-studies/in_home_carers-5.png', caption: 'Score breakdown — quality questions',                tag: 'Score breakdown' },
      { src: '/images/case-studies/in_home_carers-6.png', caption: 'Score breakdown — page 2',                           tag: 'Score breakdown' },
      { src: '/images/case-studies/in_home_carers-7.png', caption: 'Framework compliance documentation',                 tag: 'Compliance' },
    ],
    gallerySource: 'Source: Hertfordshire County Council provisional award notifications HCC2314690 and HCC2314691 dated 11 August 2025. Standstill closed 21 August 2025.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: "This case study examines the route In-Home Carers Limited took onto Hertfordshire County Council's Framework Agreement for the Provision of Homecare and Support Services for Children and Young People (HCC2314690 and HCC2314691). Both lots were provisionally awarded on 11 August 2025 and the standstill closed at midnight on 21 August 2025 without challenge.",
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: "The provider operated in adult homecare and had applied adult care planning language, assessment frameworks and safeguarding references to a SEND panel that was reading for children and young people-specific competency. The care planning language did not reference Education, Health and Care (EHC) plans, and coproduction had been described in adult terms — key worker relationships — rather than in terms of family involvement and child voice, which the SEND commissioning panel expected.",
      },
      {
        num: '08', heading: 'Our Role',
        body: "We took the engagement as lead writer on all quality method statements, recalibrating from adult homecare language to SEND-aligned children's services language. EHC plan references were introduced. Coproduction was rebuilt around family involvement and child voice. Safeguarding was updated to reflect the children's safeguarding framework — Working Together to Safeguard Children — rather than the adult safeguarding framework.",
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: "The introduction of EHC plan language and the rebuilding of the coproduction section around child voice and family involvement were the pivotal changes. These are the specific markers a SEND commissioning panel reads to distinguish a provider with genuine SEND competency from one applying adult homecare defaults. Both lots needed these signals to score above the award threshold.",
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'Both Lot 1 (HCC2314690) and Lot 2 (HCC2314691) were provisionally awarded by Hertfordshire County Council on 11 August 2025. The standstill closed at midnight on 21 August 2025 without challenge, and the framework moved into operation thereafter.',
      },
    ],
    scoreTable: {
      headers: ['Lot', 'Reference', 'Outcome'],
      rows: [
        { lot: 'Lot 1', cells: ['HCC2314690',              'Awarded'] },
        { lot: 'Lot 2', cells: ['HCC2314691',              'Awarded'] },
        { lot: 'Standstill', cells: ['11–21 August 2025',  'Closed without challenge'] },
      ],
    },
    beforeText: "The provider had no place on Hertfordshire County Council's children and young people homecare framework and no structured route to receive SEND Commissioning referrals across the county.",
    afterText: "Both lots are awarded. The provider operates as an approved supplier on Hertfordshire's children and young people homecare framework, with SEND-aligned method statements as the basis for all future call-offs.",
    relatedSlugs: ['choices-healthcare-southend-childrens-framework', 'pcas-childrens-services-procurement', 'inspire-care-outreach-dorset-open-framework'],
    closerLead: 'Bring your next tender.',
    closerSub: 'Both SEND lots secured. Adult homecare expertise translated into a children\'s framework without misrepresenting the cohort.',
  },

  'nelson-ocean-central-bedfordshire-supported-living': {
    verdict: 'Lot 1 secured on a multi-cohort supported living procurement with variable day hours led on the front foot.',
    entryAnchor: { startedWith: 'Variable day hours buried in staffing', result: 'Lot 1 awarded, 4 + 2 year contract', context: 'Central Bedfordshire CC, MEAT scoring' },
    startingStrip: 'Generic supported living narrative insufficient for MEAT-weighted cohort scoring.',
    metaBar: { award: '2025', outcome: 'Lot 1 Standard awarded', standstill: 'Midnight 2 January 2025', reference: 'CBC-1684-FA-LS' },
    stampSub: 'LOT 1 STANDARD',
    stampSummary: 'From a generic supported living narrative → awarded Lot 1 with variable day hours led on the front foot.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Variable day hours buried in staffing',         isLead: true },
      { label: 'Outcome Achieved',  value: 'Lot 1 Standard, 4+2 year contract',             isLead: true },
      { label: 'Lots Won',          value: 'Lot 1 Standard',                                isLead: true },
      { label: 'Authority',         value: 'Central Bedfordshire Council' },
      { label: 'Reference',         value: 'CBC-1684-FA-LS' },
      { label: 'Client Type',       value: 'Multi-cohort supported living' },
    ],
    trustBadges: ['Framework awarded providers', 'Local authority contracts', 'Verified award letters', 'Standstill cleared'],
    galleryImages: [
      { src: '/images/case-studies/nelson_ocean-1.png', caption: 'Award confirmation — Central Bedfordshire SL',  tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/nelson_ocean-2.png', caption: 'Contract terms and lot breakdown',              tag: 'Contract terms' },
      { src: '/images/case-studies/nelson_ocean-3.png', caption: 'SSQ financial assessment clearance',            tag: 'Compliance' },
    ],
    gallerySource: 'Source: Central Bedfordshire Council Supported Living direct award documentation, reference CBC-1684-FA-LS. Contract start 1 April 2025.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: "This case study examines the route Nelson Ocean UK Ltd took onto Central Bedfordshire Council's Supported Living incorporating Mental Health, Learning Disabilities and Autism, and Physical Disabilities procurement, securing Lot 1 Standard Supported Living with Variable Day Hours. The contract starts 1 April 2025 for an initial 4-year term with a 2-year extension option.",
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: "Variable day hours was buried inside the staffing method statement rather than fronted as a distinct capability. The MEAT-weighted scoring structure meant that cohort content needed to be separated across LD, MH, autism and physical disability lines — a generic supported living narrative that merged cohorts would score below the award threshold on a MEAT assessment. The social value evidence had not been quantified.",
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement as lead writer on all quality method statements, restructuring variable day hours as a front-of-response capability statement rather than a staffing footnote. Cohort content was separated across the four cohort groups. Social value was quantified against the Council\'s published Social Value Policy requirements.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'Leading with variable day hours as a defined service capability — with a specific staffing model, rota structure and response time framework — moved the narrative from a generic supported living submission to a procurement-specific response. The cohort separation ensured the evaluator could read LD, MH, autism and physical disability evidence in distinct sections rather than scanning a merged generic narrative.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'Lot 1 Standard Supported Living with Variable Day Hours was awarded. The contract starts on 1 April 2025 for an initial 4-year term with a 2-year extension option. The standstill closed at midnight on 2 January 2025, the SSQ financial assessment cleared post-award, and the contract was issued for execution.',
      },
    ],
    scoreTable: {
      headers: ['Element', 'Result'],
      rows: [
        { lot: 'Lot awarded',     cells: ['Lot 1 Standard, Variable Day Hours'] },
        { lot: 'Contract start',  cells: ['1 April 2025'] },
        { lot: 'Contract term',   cells: ['4 years + 2 year extension option'] },
        { lot: 'Standstill end',  cells: ['Midnight 2 January 2025'] },
        { lot: 'Award route',     cells: ['MEAT, PCR 2015 Reg 86'] },
      ],
    },
    beforeText: "The provider was not on Central Bedfordshire Council's commissioned supported living contract and had no structured route to receive Council referrals across LD, MH, autism and physical disability cohorts within the variable day hours setting.",
    afterText: 'The provider holds Lot 1 Standard with Variable Day Hours for 4 years (+ 2-year extension) from 1 April 2025, with direct referral access across four major cohort groups. Variable day hours is now a front-of-response capability statement rather than a staffing footnote.',
    relatedSlugs: ['havilah-care-bedford-supported-living', 'alicelyn-sheffield-overnight-short-breaks', 'rosecare-bradford-mental-health-supported-living'],
    closerLead: 'Bring your next tender.',
    closerSub: 'Lot 1 secured on a 4+2 year contract. Variable day hours moved from a staffing footnote to the opening capability statement.',
  },

  'pcas-childrens-services-procurement': {
    verdict: "Position awarded on a children's services procurement, strongest response on staff recruitment at 4 of 5.",
    entryAnchor: { startedWith: "Adult-derived defaults on a children's panel", result: 'Position awarded, Q2 at 4/5', context: "Local Authority Children's Services" },
    startingStrip: "Adult social care defaults bleeding into children's services answers. One-page profile lacking pictures and child voice.",
    metaBar: { award: '2025', outcome: 'Position awarded', reference: 'Post-Procurement Feedback' },
    stampSub: "CHILDREN'S CARE",
    stampSummary: 'From adult-derived defaults → position awarded, Q2 Recruitment at 4 of 5.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'Adult-derived bid content',               isLead: true },
      { label: 'Outcome Achieved',  value: 'Q2 Recruitment at 4/5',                   isLead: true },
      { label: 'Lots Won',          value: 'Single procurement, 6 questions',          isLead: true },
      { label: 'Authority',         value: "Local Authority Children's Services" },
      { label: 'Reference',         value: 'Post-Procurement Feedback' },
      { label: 'Client Type',       value: 'Cross-sector provider' },
    ],
    trustBadges: ["Children's services approved", 'Local authority contract', 'Evaluator feedback documented', 'Improvement plan active'],
    galleryImages: [
      { src: '/images/case-studies/pcas-1.png', caption: "Award confirmation — Children's Services",     tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/pcas-2.png', caption: 'Score breakdown — Q1 to Q3',                   tag: 'Score breakdown' },
      { src: '/images/case-studies/pcas-3.png', caption: 'Score breakdown — Q4 to Q6',                   tag: 'Score breakdown' },
      { src: '/images/case-studies/pcas-4.png', caption: 'Evaluator feedback summary',                   tag: 'Evaluator feedback' },
    ],
    gallerySource: "Source: Local Authority Children's Services post-procurement feedback and award documentation.",
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: "This case study examines a local authority Children's Services Care Packages procurement where the provider secured a position on the procurement. The procurement applied a 0 to 5 scoring scale per question, with the score and rationale awarded to the lowest ranking successful supplier published as the entry threshold for transparency. Six questions, each weighted equally.",
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: "The provider's existing bid material was built around adult social care practice. The one-page profile — Q6 — lacked child photographs, child voice quotes and an accessible format appropriate for children's services commissioning. Policy citations referenced adult frameworks. Q5 Family Engagement and Trust was answered in terms of care planning meetings rather than family partnership and relational practice.",
      },
      {
        num: '08', heading: 'Our Role',
        body: "We took the engagement as lead writer on all six questions, rebuilding from adult social care language to children's services language. The one-page profile was restructured to include child-accessible formatting, child voice and family involvement. Policy citations were updated to the Children Act 1989 and relevant Ofsted frameworks. Q2 Recruit, Train and Retain Staff was written with specific children's services training standards.",
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'Q2 Recruit, Train and Retain Staff at 4/5 was the highest score and the key change. Restructuring the recruitment narrative around children\'s services-specific training — RIDDOR, restraint-reduction training, trauma-informed practice — and giving named examples of the training pathway moved Q2 above the entry threshold. The one-page profile rebuild also moved Q6 above the threshold where the adult-derived format would have scored below it.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: "The provider was awarded a position on the procurement. Q2 Recruit, Train and Retain Staff scored 4 of 5 — the strongest result. Q1, Q3, Q4 and Q5 scored 3 of 5. Q6 One-Page Profile scored 2 of 5 — the improvement point documented for the next bid cycle, with a child-accessible format now built and ready.",
      },
    ],
    scoreTable: {
      headers: ['Question', 'Topic', 'Score'],
      rows: [
        { lot: 'Q1', cells: ['Safeguarding and Wellbeing',     '3/5'] },
        { lot: 'Q2', cells: ['Recruit, Train and Retain Staff','4/5'] },
        { lot: 'Q3', cells: ['Care Package Management',        '3/5'] },
        { lot: 'Q4', cells: ['Partnership Working',            '3/5'] },
        { lot: 'Q5', cells: ['Family Engagement and Trust',    '3/5'] },
        { lot: 'Q6', cells: ['One-Page Profile',               '2/5'] },
      ],
    },
    beforeText: "The provider had no structured route to deliver care packages for the local authority's children and young people, and there was no documented score profile against the Council's published evaluation criteria.",
    afterText: 'The provider holds a position on the procurement with a documented score profile across six competencies, a 4/5 result on recruitment, and clear improvement points captured directly from evaluator feedback for the next bid cycle.',
    relatedSlugs: ['in-home-carers-hertfordshire-children-young-people', 'choices-healthcare-southend-childrens-framework', 'rosecare-bradford-mental-health-supported-living'],
    closerLead: 'Bring your next tender.',
    closerSub: "Position secured. Q2 Recruitment at 4/5. Every improvement point documented and built for the next children's services cycle.",
  },

  'alicelyn-sheffield-overnight-short-breaks': {
    verdict: "Place secured on Sheffield's Adults with Disabilities DPS at the first window. Standstill cleared without challenge.",
    entryAnchor: { startedWith: 'No prior DPS place, no internal bid lead', result: 'Awarded Lot 3 Overnight Short Breaks', context: 'Sheffield CC DPS, PCR 2015 Reg 87' },
    startingStrip: 'No prior place on the Sheffield DPS. Operationally strong, procurement-thin. No internal bid lead.',
    metaBar: { award: '24 January 2025', outcome: 'Lot 3 Overnight Short Breaks awarded', standstill: 'Closed midnight 3 February 2025', reference: '62329' },
    stampSub: 'DPS LOT 3',
    stampSummary: 'From no Sheffield DPS footprint → awarded Lot 3 Overnight Short Breaks.',
    snapshotCells: [
      { label: 'Starting Gap',      value: 'No prior DPS place',                        isLead: true },
      { label: 'Outcome Achieved',  value: 'Lot 3 Overnight Short Breaks awarded',       isLead: true },
      { label: 'Lots Won',          value: '1 of 1 bid',                                 isLead: true },
      { label: 'Authority',         value: 'Sheffield City Council' },
      { label: 'Reference',         value: '62329' },
      { label: 'Client Type',       value: 'Owner-led adult social care' },
    ],
    trustBadges: ['DPS place confirmed', 'Local authority contract', 'Verified award letters', 'Standstill cleared'],
    galleryImages: [
      { src: '/images/case-studies/alicelyn-1.png', caption: 'Successful Alcatel Letter — Sheffield DPS',   tag: 'Award confirmation', isLead: true },
      { src: '/images/case-studies/alicelyn-2.png', caption: 'DPS place confirmation and compliance',       tag: 'Compliance' },
    ],
    gallerySource: 'Source: Sheffield City Council Successful Alcatel Letter under PCR 2015 Regulation 87, reference 62329, dated 24 January 2025. Standstill closed midnight 3 February 2025.',
    sections: [
      {
        num: '01', heading: 'Case Overview',
        body: "This case study examines the entry of Alicelyn Healthcare onto Sheffield City Council's Adults with Disabilities Dynamic Purchasing System for Lot 3 Overnight Short Breaks (reference 62329). The tender was procured under Public Contract Regulations 2015 and the provisional award was confirmed via Successful Alcatel Letter on 24 January 2025. The standstill closed at midnight on 3 February 2025 without challenge.",
      },
      {
        num: '04', heading: 'Starting Gaps & Limitations',
        body: 'The provider had no place on the Sheffield DPS and no internal bid lead. The overnight delivery was operationally strong — staffing ratios, handover procedures, sleep-in protocols and risk escalation were all mature — but none of this had been translated into procurement evidence. The bid narrative needed to surface the overnight operational substance in the language of the DPS evaluation criteria.',
      },
      {
        num: '08', heading: 'Our Role',
        body: 'We took the engagement as lead writer on the full DPS submission, building a weighting register from the published evaluation criteria and writing every quality response against it. The overnight staffing matrix was extracted from the provider\'s rota system and packaged as evidence. Five case examples were built as a reusable library from the provider\'s operational records.',
      },
      {
        num: '12', heading: 'What Changed the Trajectory',
        body: 'Building the overnight staffing matrix as a standalone evidence document — showing cover ratios, handover procedures and sleep-in escalation steps against the published DPS criteria — moved the operational substance from implicit to explicit. The five-beat case-example library structured the narrative around named individuals and dated interventions, closing the evaluator\'s discretion on outcome evidence.',
      },
      {
        num: '13', heading: 'Outcome Achieved',
        body: 'The provisional award was confirmed on 24 January 2025. Lot 3 Overnight Short Breaks was confirmed on the DPS, the standstill closed at midnight on 3 February 2025 without challenge, and the provider is now eligible to receive every overnight short breaks call-off in Sheffield over the framework lifetime.',
      },
    ],
    scoreTable: {
      headers: ['Measure', 'Result'],
      rows: [
        { lot: 'Lot awarded',          cells: ['Lot 3 Overnight Short Breaks'] },
        { lot: 'DPS reference',        cells: ['62329'] },
        { lot: 'Award status',         cells: ['Provisional award confirmed'] },
        { lot: 'Standstill window',    cells: ['Closed midnight 3 February 2025'] },
        { lot: 'Standstill challenge', cells: ['None received'] },
        { lot: 'Award route',          cells: ['DPS, PCR 2015 Reg 87'] },
      ],
    },
    beforeText: "The provider had no place on Sheffield's Adults with Disabilities DPS and no structured route to bid for Council overnight short breaks call-offs. The underlying overnight delivery was strong, but the procurement narrative was thin.",
    afterText: 'The provider holds a confirmed place on the DPS for Lot 3 and is eligible to receive every overnight short breaks call-off in Sheffield over the framework lifetime. The weighting register, overnight staffing matrix and five-beat case-example library sit inside the organisation as reusable bid infrastructure.',
    relatedSlugs: ['rosecare-bradford-mental-health-supported-living', 'havilah-care-bedford-supported-living', 'nelson-ocean-central-bedfordshire-supported-living'],
    closerLead: 'Bring your next tender.',
    closerSub: 'DPS place secured at the first window. Overnight operational strength translated into procurement evidence. Reusable bid infrastructure built for every future Sheffield call-off.',
  },
}
