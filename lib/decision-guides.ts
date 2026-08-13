export type DecisionGuide = {
  slug: string
  title: string
  eyebrow: string
  description: string
  directAnswer: string
  sections: { heading: string; paragraphs: string[]; points?: string[] }[]
  faq: { q: string; a: string }[]
  service: { label: string; href: string }
  related: string[]
  sources: { label: string; href: string }[]
}

export const DECISION_GUIDES: DecisionGuide[] = [
  {
    slug: 'how-to-get-domiciliary-care-contracts',
    title: 'How to Get Domiciliary Care Contracts',
    eyebrow: 'Growth route for home care providers',
    description: 'A practical route from CQC registration and local delivery evidence to domiciliary care frameworks, dynamic markets and council call-offs.',
    directAnswer: 'To get domiciliary care contracts, first identify how each target council buys home care, then qualify for the relevant framework, open framework, dynamic market or provider list. Registration alone is not enough: the buyer will test mandatory requirements, financial and technical capacity, mobilisation, quality evidence and price. Start with the route to market and the conditions of participation before writing method statements.',
    sections: [
      {
        heading: 'Find the route the council actually uses',
        paragraphs: [
          'Councils do not all buy domiciliary care in the same way. One authority may use a fixed framework, another an open framework, and another a dynamic market that remains open to new suppliers. Search Find a Tender and the authority’s own procurement portal for the service, geography and current commercial tool.',
          'A place on a framework or dynamic market usually creates eligibility for later call-offs; it does not automatically create referrals. Read the call-off or allocation mechanism so you understand how work will actually reach providers.',
        ],
      },
      {
        heading: 'Check eligibility before committing bid time',
        paragraphs: ['Build a written bid/no-bid check from the buyer documents. Record every pass/fail requirement and the evidence that proves it. If a mandatory condition cannot be met by the deadline, polished writing cannot repair the position.'],
        points: ['CQC registration and regulated activity scope', 'Required geography, branch or mobilisation commitment', 'Financial standing and insurance position', 'Relevant experience, references and workforce capacity', 'Portal, deadline and submission rules'],
      },
      {
        heading: 'Turn delivery records into evaluator evidence',
        paragraphs: ['Commissioners score what the submission demonstrates, not what the provider knows privately. Package care-plan audits, outcomes, complaints learning, safeguarding controls, workforce data and lived examples so each claim names the role, frequency, record and result.'],
      },
    ],
    faq: [
      { q: 'Does joining a framework guarantee care packages?', a: 'No. The framework documents determine how call-offs, rankings, brokerage or mini-competitions operate. Membership is access to the route, not a guarantee of work.' },
      { q: 'Can a newly registered home care provider bid?', a: 'Sometimes. The tender may allow alternative evidence, reliance on other entities or mobilisation commitments, but the published conditions control. Check them before starting.' },
    ],
    service: { label: 'Discuss a domiciliary care tender', href: '/contact' },
    related: ['how-to-become-an-approved-care-provider-for-a-council', 'care-tender-turnover-requirements', 'care-tender-references'],
    sources: [
      { label: 'Government supplier guidance', href: 'https://www.gov.uk/government/collections/information-and-guidance-for-suppliers' },
      { label: 'Government guidance on dynamic markets', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-dynamic-markets-html' },
    ],
  },
  {
    slug: 'how-to-get-supported-living-contracts',
    title: 'How to Get Supported Living Contracts',
    eyebrow: 'Growth route for supported living providers',
    description: 'How supported living providers can identify council routes, prove service-model fit and prepare evidence for frameworks and dynamic markets.',
    directAnswer: 'Supported living contracts are usually accessed through a council framework, open framework, dynamic market or provider list, followed by call-offs or individual placements. The strongest starting point is not generic bid writing: it is a fit check covering the cohort, housing-and-care boundary, regulated activities, staffing model, geography, mobilisation and evidence of outcomes.',
    sections: [
      {
        heading: 'Separate the service model from the building',
        paragraphs: ['Supported living procurement tests how support enables tenancy, choice, independence and community participation. The response must distinguish support delivery from accommodation arrangements and explain how conflicts of interest, choice of provider and tenancy rights are protected.'],
      },
      {
        heading: 'Match the opportunity to real delivery capability',
        paragraphs: ['Read the lot descriptions, cohort requirements and call-off rules. A provider may be credible for standard support but not complex health needs, forensic risk or 24-hour waking support. Select only the lots for which the workforce, governance and mobilisation plan are defensible.'],
        points: ['Cohort and complexity', 'CQC scope where regulated personal care is included', 'Housing and landlord relationships', 'Positive behaviour and risk capability', 'Local staffing and on-call coverage', 'Evidence of choice, control and measurable independence'],
      },
      {
        heading: 'Write for the placement decision after admission',
        paragraphs: ['Winning admission to a commercial tool is often only the first gate. Keep a concise evidence bank ready for later call-offs: compatible support examples, mobilisation lead times, staffing availability, property dependencies, transition planning and pricing assumptions.'],
      },
    ],
    faq: [
      { q: 'Is a supported living framework the same as guaranteed placements?', a: 'No. The framework or dynamic market creates a route to future contracts. Placements may still be allocated through brokerage, matching, direct award rules or further competition.' },
      { q: 'Do we need properties before applying?', a: 'It depends on the buyer documents. Some routes separate support from accommodation; others require property or mobilisation evidence. The tender-specific requirement decides.' },
    ],
    service: { label: 'Discuss a supported living opportunity', href: '/contact' },
    related: ['how-to-become-an-approved-care-provider-for-a-council', 'do-you-need-a-cqc-rating-to-bid', 'framework-vs-dynamic-market-care-contracts'],
    sources: [
      { label: 'Government supplier guidance', href: 'https://www.gov.uk/government/collections/information-and-guidance-for-suppliers' },
      { label: 'Government framework and dynamic market learning', href: 'https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-5-frameworks-and-dynamic-markets' },
    ],
  },
  {
    slug: 'how-to-become-an-approved-care-provider-for-a-council',
    title: 'How to Become an Approved Care Provider for a Council',
    eyebrow: 'From registration to a public-sector buying route',
    description: 'What “approved provider” usually means, where to find the council’s route and what to check before applying.',
    directAnswer: '“Approved provider” is not one national status. It usually means the organisation has passed the conditions for a specific council framework, open framework, dynamic market or provider list. Identify the exact commercial tool, confirm that it is open, and test every condition before applying. Approval for one authority or service does not transfer automatically to another.',
    sections: [
      {
        heading: 'Name the mechanism, not just the ambition',
        paragraphs: ['Ask the council’s commissioning or procurement information where the opportunity is advertised and what commercial tool is used. Under the Procurement Act 2023, dynamic markets remain open to new suppliers, while traditional frameworks normally fix suppliers for their term and open frameworks reopen at stated points.'],
      },
      {
        heading: 'Prepare the supplier and service evidence',
        paragraphs: ['The buyer may test legal and financial capacity, technical ability, exclusions, registrations, insurance arrangements, experience, mobilisation and service quality. The tender notice and documents must state the relevant conditions. Build a requirement register rather than relying on a generic checklist.'],
      },
      {
        heading: 'Understand what approval unlocks',
        paragraphs: ['Approval may allow the provider to receive brokerage offers, respond to call-offs or join mini-competitions. It may not create a direct contract on day one. Read the award and call-off terms, capacity declaration process and any geographic or lot restrictions.'],
      },
    ],
    faq: [
      { q: 'Can TenderLab tell us which route our council uses?', a: 'Yes. We can review the authority, service and live procurement notices, then explain the current route and whether the published requirements fit the provider.' },
      { q: 'Can a council keep a dynamic market closed?', a: 'A dynamic market under the Procurement Act 2023 must accept applications throughout its life. An older or differently structured arrangement may operate under other rules, so check the notice and governing regime.' },
    ],
    service: { label: 'Check a council opportunity', href: '/services/tender-readiness-audit' },
    related: ['how-to-get-domiciliary-care-contracts', 'how-to-get-supported-living-contracts', 'framework-vs-dynamic-market-care-contracts'],
    sources: [
      { label: 'Government guidance on dynamic markets', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-dynamic-markets-html' },
      { label: 'Government framework and dynamic market learning', href: 'https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-5-frameworks-and-dynamic-markets' },
    ],
  },
  {
    slug: 'do-you-need-a-cqc-rating-to-bid',
    title: 'Do You Need a CQC Rating to Bid for a Care Contract?',
    eyebrow: 'Care tender eligibility',
    description: 'Why there is no universal CQC-rating rule and how to read the tender-specific requirement before committing.',
    directAnswer: 'There is no single CQC-rating rule for every care tender. The buyer’s published conditions decide whether registration, an inspected rating, a minimum rating, evidence from another location or a mobilisation commitment is required. Check the exact lot and deadline: registration, rating and scope are different tests.',
    sections: [
      {
        heading: 'Read the condition exactly as written',
        paragraphs: ['A tender may require current registration for the regulated activity, a particular rating at a named location, or evidence that a new service can lawfully mobilise by contract start. Do not replace the published wording with a general assumption such as “Good is always required”.'],
      },
      {
        heading: 'Test the entity, location and scope',
        paragraphs: ['Confirm that the legal entity bidding matches the registration evidence, that the relevant location or service scope is covered, and that any reliance on another organisation is permitted and documented. A rating from an unrelated location may not satisfy the condition.'],
      },
      {
        heading: 'Use clarification when the wording is ambiguous',
        paragraphs: ['Ask the buyer through the procurement portal before the clarification deadline. A precise question protects the provider and gives every bidder the same published answer. Do not build a submission around an interpretation the buyer has not confirmed.'],
      },
    ],
    faq: [
      { q: 'Can a newly registered provider bid before its first rating?', a: 'Sometimes, if the buyer allows it or accepts alternative evidence. Some tenders require an inspected rating. Only the tender documents and clarifications can settle the point.' },
      { q: 'Is CQC registration the same as a CQC rating?', a: 'No. Registration is permission to carry on specified regulated activities; a rating is the outcome of assessment or inspection activity. A tender may test one or both.' },
    ],
    service: { label: 'Check the eligibility requirements', href: '/services/tender-readiness-audit' },
    related: ['can-you-bid-with-requires-improvement-cqc-rating', 'care-tender-turnover-requirements', 'care-tender-references'],
    sources: [
      { label: 'CQC guidance for providers', href: 'https://www.cqc.org.uk/guidance-providers' },
      { label: 'Government conditions of participation guidance', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-conditions-of-participation-html' },
    ],
  },
  {
    slug: 'can-you-bid-with-requires-improvement-cqc-rating',
    title: 'Can You Bid With a Requires Improvement CQC Rating?',
    eyebrow: 'Care tender eligibility',
    description: 'How to decide whether a Requires Improvement rating is a bar, a scored risk or an evidence issue in a live care tender.',
    directAnswer: 'A Requires Improvement rating does not create an automatic national ban on bidding, but a specific tender may set a minimum rating or score regulatory history. Read the pass/fail condition first. If the tender permits the bid, address the current position honestly with dated actions, governance, evidence of improvement and the relevance of the rated location.',
    sections: [
      {
        heading: 'Separate a pass/fail bar from a scored concern',
        paragraphs: ['If the documents state a minimum rating and the provider does not meet it, writing cannot cure the failure. If the rating is evaluated more broadly, the response must show control and improvement rather than minimise the finding.'],
      },
      {
        heading: 'Build an evidence trail, not a reassurance paragraph',
        paragraphs: ['Use the inspection report, action plan, named owners, completion records, audits, outcomes and governance minutes. Explain what changed, when it changed, how effectiveness is checked and what evidence is available to the buyer.'],
      },
      {
        heading: 'Check which location and entity the buyer means',
        paragraphs: ['Multi-location groups can be assessed differently depending on the tender wording. Confirm whether the buyer tests the bidding entity, the delivery location, an average position or the most recent relevant rating. Use a clarification if necessary.'],
      },
    ],
    faq: [
      { q: 'Should we hide the rating until the buyer finds it?', a: 'No. Procurement responses must be accurate. The safer approach is to answer the requirement directly and provide verified improvement evidence where the tender allows the bid.' },
      { q: 'Can TenderLab guarantee the buyer will accept our explanation?', a: 'No. TenderLab can test the published rule and help present accurate evidence; the buyer controls eligibility, scoring and award.' },
    ],
    service: { label: 'Request a tender readiness review', href: '/services/tender-readiness-audit' },
    related: ['do-you-need-a-cqc-rating-to-bid', 'why-care-providers-lose-tenders', 'how-care-tenders-are-scored'],
    sources: [
      { label: 'CQC guidance for providers', href: 'https://www.cqc.org.uk/guidance-providers' },
      { label: 'Government conditions of participation guidance', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-conditions-of-participation-html' },
    ],
  },
  {
    slug: 'care-tender-turnover-requirements',
    title: 'How Much Turnover Do You Need for a Care Tender?',
    eyebrow: 'Financial conditions of participation',
    description: 'Why care tender turnover thresholds vary and what evidence to review before deciding whether to bid.',
    directAnswer: 'There is no universal turnover figure for care tenders. A contracting authority may test annual turnover and other financial measures, but conditions of participation must be stated in the tender documents and be proportionate to the contract. Check the exact threshold, accounting period, group or consortium rules, and permitted alternative evidence before deciding.',
    sections: [
      {
        heading: 'Find the actual financial test',
        paragraphs: ['Look for conditions of participation, financial standing, economic and financial capacity, accounts, ratios, insurance and parent or guarantor provisions. Do not infer the requirement from contract value alone.'],
      },
      {
        heading: 'Check how the buyer will assess your structure',
        paragraphs: ['The documents may explain whether the bidder can rely on a parent, consortium member, subcontractor or guarantor. Any reliance must be permitted and evidenced; it should never be added informally to make a weak figure appear stronger.'],
      },
      {
        heading: 'Treat affordability separately from eligibility',
        paragraphs: ['Passing a turnover threshold does not prove the price can safely deliver the service. Model staffing, on-costs, travel, management, mobilisation, inflation and payment timing before accepting the commercial risk.'],
      },
    ],
    faq: [
      { q: 'Must every supplier provide audited accounts?', a: 'No. Current government guidance states that suppliers not otherwise required by company law to have audited accounts must be allowed alternative evidence when financial capacity is assessed.' },
      { q: 'Can TenderLab change a turnover failure through better wording?', a: 'No. We can identify the test and permitted evidence or reliance routes, but we will not recommend a full writing engagement where a mandatory financial condition cannot be met.' },
    ],
    service: { label: 'Check the tender before you write', href: '/services/tender-readiness-audit' },
    related: ['care-tender-references', 'do-you-need-a-cqc-rating-to-bid', 'how-to-become-an-approved-care-provider-for-a-council'],
    sources: [
      { label: 'Government supplier-selection learning', href: 'https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-6-supplier-selection' },
      { label: 'Government financial-standing guidance', href: 'https://www.gov.uk/government/publications/the-sourcing-and-consultancy-playbooks/assessing-and-monitoring-the-economic-and-financial-standing-of-suppliers-guidance-note-html--2' },
    ],
  },
  {
    slug: 'care-tender-references',
    title: 'What References Do You Need for a Care Tender?',
    eyebrow: 'Technical ability and experience',
    description: 'How to test reference requirements and prepare relevant, verifiable care-contract evidence.',
    directAnswer: 'The tender documents decide the number, age, value, scope and relevance of references required. A strong reference is not simply a friendly contact: it must match the published test and be verifiable. Confirm whether the buyer accepts contracts, framework places, subcontracted delivery, start-up evidence or reliance on another entity.',
    sections: [
      {
        heading: 'Map every reference to the printed condition',
        paragraphs: ['Record the required service, cohort, contract value or scale, delivery period, geography and contact details. A large but unrelated contract may be weaker than a smaller example that matches the specification exactly.'],
      },
      {
        heading: 'Make the evidence auditable',
        paragraphs: ['Agree the referee, contact details and permission before submission. Keep the contract or award evidence, dates, scope, outcomes and the bidder’s exact role. If the work was subcontracted, describe that accurately and check whether it satisfies the condition.'],
      },
      {
        heading: 'Do not confuse a reference with a case study',
        paragraphs: ['A reference verifies experience. A scored case study usually requires a structured explanation of challenge, action, controls and outcomes. One source may support both, but the response format and evaluation purpose are different.'],
      },
    ],
    faq: [
      { q: 'Can we use a subcontracted contract as a reference?', a: 'Only if the tender permits it and the role is described accurately. Check the wording and provide evidence of the bidder’s real contribution rather than presenting the prime contractor’s whole scope as its own.' },
      { q: 'What if we are newly registered?', a: 'Some buyers accept alternative evidence or reliance arrangements, while others require organisational experience. Ask a clarification before the deadline if the documents do not say.' },
    ],
    service: { label: 'Review your reference evidence', href: '/services/tender-readiness-audit' },
    related: ['care-tender-turnover-requirements', 'do-you-need-a-cqc-rating-to-bid', 'how-care-tenders-are-scored'],
    sources: [
      { label: 'Government conditions of participation guidance', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-procure-phase/guidance-conditions-of-participation-html' },
      { label: 'Government supplier-selection learning', href: 'https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-6-supplier-selection' },
    ],
  },
  {
    slug: 'how-care-tenders-are-scored',
    title: 'How Are Care Tenders Scored?',
    eyebrow: 'Inside the evaluator’s decision',
    description: 'How pass/fail gates, quality questions, price and published scoring descriptors combine in a care tender.',
    directAnswer: 'Care tenders are scored using the evaluation method published by the buyer. The process often starts with compliance and pass/fail gates, then applies weighted quality and price scores. Each quality answer is judged against its question, specification and scoring descriptors. The safest method is to build an answer map before drafting so every scored requirement has evidence.',
    sections: [
      {
        heading: 'Pass the gates before chasing marks',
        paragraphs: ['A strong method statement cannot compensate for a failed mandatory condition, missing attachment, late submission or non-compliant pricing schedule. Separate compliance control from quality writing and assign an owner to both.'],
      },
      {
        heading: 'Write to the descriptor, not the topic',
        paragraphs: ['A response can be accurate but still score poorly if it does not explain who acts, how often, using which control, where the record sits and what outcome follows. Map those elements to each sub-point before prose is written.'],
      },
      {
        heading: 'Protect the weighted total',
        paragraphs: ['Prioritise questions by marks at stake and current weakness. Price, social value, mobilisation, presentations or interviews may also carry weight. Use the buyer’s formula and documents rather than applying a generic target score.'],
      },
    ],
    faq: [
      { q: 'What score do you need to win?', a: 'There is no universal winning score. The tender may set minimum thresholds, and the final result also depends on competitors, weighting and price. Use the published evaluation method.' },
      { q: 'Can TenderLab guarantee a 5 out of 5?', a: 'No. TenderLab can review an answer against the published rubric and strengthen evidence and clarity. The evaluator controls the actual score.' },
    ],
    service: { label: 'Get an independent response review', href: '/services/pre-submission-review' },
    related: ['why-care-providers-lose-tenders', 'care-tender-references', 'can-you-bid-with-requires-improvement-cqc-rating'],
    sources: [
      { label: 'Government competitive tendering guidance', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/competitive-tendering-procedures-html' },
      { label: 'Government supplier guidance', href: 'https://www.gov.uk/government/collections/information-and-guidance-for-suppliers' },
    ],
  },
  {
    slug: 'why-care-providers-lose-tenders',
    title: 'Why Do Care Providers Lose Tenders?',
    eyebrow: 'From feedback to a stronger next bid',
    description: 'The recurring reasons credible care providers lose marks, and how to distinguish a writing problem from a fit problem.',
    directAnswer: 'Care providers often lose for one of two different reasons: the opportunity did not fit the provider, or the submission did not make the provider’s evidence easy to score. Common causes include missed conditions, weak answer mapping, unsupported claims, generic examples, uncosted delivery promises and poor submission control. Start with the evaluator feedback and buyer documents, not assumptions.',
    sections: [
      {
        heading: 'First decide whether the tender should have been pursued',
        paragraphs: ['A loss may begin before writing: the wrong lot, insufficient experience, an unreachable mobilisation promise, weak financial capacity or a price that cannot deliver safely. A disciplined bid/no-bid record prevents the same mismatch recurring.'],
      },
      {
        heading: 'Then reconstruct where the marks disappeared',
        paragraphs: ['Compare each answer with the exact question, specification and scoring descriptor. Identify missing sub-points, unverified claims, absent ownership, unclear frequency, generic case studies and outcomes that were asserted rather than measured.'],
      },
      {
        heading: 'Convert the debrief into reusable controls',
        paragraphs: ['Rewrite the lowest-scoring answers, update the evidence library, assign operational actions and record a pre-submission check for the next bid. A debrief only creates value when it changes the next response and the underlying evidence.'],
      },
    ],
    faq: [
      { q: 'Should we challenge every lost tender?', a: 'No. First check the published process, feedback and materiality. A debrief may reveal a correctable weakness without grounds for a formal challenge. Seek legal advice where a procurement challenge is being considered.' },
      { q: 'Can TenderLab review a loss without the original documents?', a: 'A useful review needs the buyer documents, submitted response, scores and feedback. Without them, conclusions would be speculative.' },
    ],
    service: { label: 'Turn a loss into a written improvement plan', href: '/services/lost-bid-debrief' },
    related: ['how-care-tenders-are-scored', 'care-tender-references', 'can-you-bid-with-requires-improvement-cqc-rating'],
    sources: [
      { label: 'Government competitive tendering guidance', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/competitive-tendering-procedures-html' },
      { label: 'Government supplier guidance', href: 'https://www.gov.uk/government/collections/information-and-guidance-for-suppliers' },
    ],
  },
  {
    slug: 'framework-vs-dynamic-market-care-contracts',
    title: 'Care Framework vs Dynamic Market: What Is the Difference?',
    eyebrow: 'Public-sector buying routes',
    description: 'A current comparison of frameworks, open frameworks and dynamic markets for care providers under the Procurement Act 2023.',
    directAnswer: 'A framework is a public contract that sets terms for future call-offs and normally fixes the appointed suppliers for its term. An open framework is a scheme of frameworks that reopens at stated points. A dynamic market is a list of qualified suppliers that must remain open to new applicants; membership makes suppliers eligible for later procurements but is not itself a public contract award.',
    sections: [
      {
        heading: 'Framework',
        paragraphs: ['Suppliers compete for a place under the published procedure. The framework then controls how future contracts are awarded, with or without further competition according to its terms. A traditional framework normally does not add new suppliers during its life.'],
      },
      {
        heading: 'Open framework',
        paragraphs: ['The Procurement Act 2023 introduced open frameworks. They reopen through successive frameworks at the published intervals, allowing new suppliers to compete at those points while retaining framework-style call-offs.'],
      },
      {
        heading: 'Dynamic market',
        paragraphs: ['A dynamic market must accept applications throughout its life and cannot limit supplier numbers. Suppliers must meet the conditions for membership. A later tender notice advertises contracts awarded by reference to the market, and membership may be required to participate.'],
      },
    ],
    faq: [
      { q: 'Is a DPS the same as a dynamic market?', a: 'The Procurement Act 2023 replaced DPSs for new procurements with dynamic markets. Older DPS arrangements can continue under the rules that apply to them, so check the notice and date.' },
      { q: 'Does membership guarantee a contract?', a: 'No. Dynamic market membership is qualification for later procurements. A framework place may itself be a public contract award, but actual call-off work still follows the framework terms.' },
    ],
    service: { label: 'Check which route fits your opportunity', href: '/services/tender-readiness-audit' },
    related: ['how-to-become-an-approved-care-provider-for-a-council', 'how-to-get-domiciliary-care-contracts', 'how-to-get-supported-living-contracts'],
    sources: [
      { label: 'Government guidance on dynamic markets', href: 'https://www.gov.uk/government/publications/procurement-act-2023-guidance-documents-define-phase/guidance-dynamic-markets-html' },
      { label: 'Government framework and dynamic market learning', href: 'https://www.gov.uk/government/publications/the-official-procurement-act-2023-e-learning/module-5-frameworks-and-dynamic-markets' },
    ],
  },
]

export const DECISION_GUIDE_BY_SLUG = new Map(DECISION_GUIDES.map((guide) => [guide.slug, guide]))
