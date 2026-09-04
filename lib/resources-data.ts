export type ResourceKind = 'assessment' | 'calculator' | 'builder' | 'guide' | 'report'

export type ResourceQuestion = {
  id: string
  section: string
  label: string
  help: string
  type: 'single' | 'number' | 'text' | 'textarea'
  required?: boolean
  options?: Array<{ label: string; value: string; score: number }>
  unit?: string
  placeholder?: string
  hardGate?: boolean
}

export type ResourceDefinition = {
  number: number
  slug: string
  title: string
  shortTitle: string
  kind: ResourceKind
  group: 'Assess your organisation' | 'Assess an opportunity' | 'Improve a bid' | 'Plan delivery' | 'Learn'
  summary: string
  outcome: string
  resultLabel: string
  serviceHref?: string
  serviceLabel?: string
  featured?: boolean
  questions?: ResourceQuestion[]
  sections?: Array<{ title: string; body: string }>
}

const confidenceOptions = [
  { label: 'Yes — we can evidence this now', value: 'yes', score: 100 },
  { label: 'Partly — some evidence or work is still needed', value: 'partly', score: 55 },
  { label: 'Not sure — we need to verify it', value: 'unsure', score: 30 },
  { label: 'No — this is not currently in place', value: 'no', score: 0 },
]

const q = (id: string, section: string, label: string, help: string, hardGate = false): ResourceQuestion => ({
  id, section, label, help, type: 'single', required: true, options: confidenceOptions, hardGate,
})

const commonGuideSections = {
  readiness: [
    { title: 'Choose a realistic route to market', body: 'Start with the services you already deliver, the geography you can safely cover and the contract scale your current governance and workforce can support. Frameworks, dynamic markets and open procedures create different entry points and obligations.' },
    { title: 'Prepare organisation and regulatory evidence', body: 'Keep legal records, regulator details, insurance, accounts and policy ownership current. A buyer may set procurement-specific conditions, so generic preparation must always be checked against the live notice and procurement pack.' },
    { title: 'Build commissioner-verifiable proof', body: 'Strong tender evidence links a claim to a record, a measurable result and a person who can verify it. Maintain comparable case studies, KPI trends, audit outcomes, workforce data and action-closure records before a deadline appears.' },
    { title: 'Control mobilisation and commercial risk', body: 'Test staffing, onboarding, travel, systems, management capacity and pricing assumptions against the proposed start date. A compelling response cannot repair an undeliverable operating model.' },
    { title: 'Create a 90-day readiness plan', body: 'Prioritise eligibility and evidence gaps first, then improve writing systems, review controls and portal readiness. Give every action an owner, due date, definition of done and evidence output.' },
  ],
  response: [
    { title: 'Reconstruct the question', body: 'Separate every instruction, sub-question, buyer outcome, word limit and scoring descriptor. Build the response around what must be evaluated rather than around a generic service description.' },
    { title: 'Map requirements to operational proof', body: 'For every claim, identify the named role, action, timing, system, record, escalation and measurable outcome. Where evidence is unavailable, do not invent certainty; state the control that will create it.' },
    { title: 'Make evaluation easy', body: 'Use clear headings that mirror the question, direct topic sentences and specific evidence. The evaluator should not need to infer whether a requirement has been addressed.' },
    { title: 'Use examples responsibly', body: 'Case studies need comparable context, scale, intervention, measured outcome and a credible verification route. Avoid unsupported percentages and vague claims of positive impact.' },
    { title: 'Run an independent quality gate', body: 'Check requirement coverage, evidence strength, consistency, pricing commitments, mobilisation promises and submission instructions before final authorisation.' },
  ],
}

export const RESOURCES: ResourceDefinition[] = [
  {
    number: 1, slug: 'tools/tender-readiness-assessment', title: 'Tender Readiness Assessment', shortTitle: 'Check tender readiness', kind: 'assessment', group: 'Assess your organisation', featured: true,
    summary: 'See whether your organisation has the foundation, evidence and capacity to compete for suitable public-sector care contracts.',
    outcome: 'A readiness band, category diagnosis, red flags and a prioritised 30–60–90 day action plan.', resultLabel: 'TenderLab readiness band', serviceHref: '/services/tender-readiness-audit', serviceLabel: 'Explore the full readiness audit',
    questions: [
      q('regulation', 'Organisation and regulation', 'Are all regulated activities required for the services you intend to tender for currently covered by the correct registration?', 'Requirements differ by service and procurement. Select “Not sure” if the live tender still needs to be checked.'),
      q('financial', 'Financial capacity', 'Can you provide current accounts, insurance evidence and a clear explanation of financial capacity?', 'This prepares your evidence; it does not assume a universal turnover or insurance threshold.'),
      q('experience', 'Technical experience', 'Do you hold recent, comparable delivery examples with a credible commissioner or customer verification route?', 'Comparable scale, cohort, service model and outcomes matter more than a generic reference letter.'),
      q('evidence', 'Evidence and outcomes', 'Can you evidence outcomes through current KPI trends, audits, action closure and case studies?', 'A policy alone is not outcome evidence.'),
      q('workforce', 'Workforce', 'Can your workforce records demonstrate recruitment, vetting, training, supervision and continuity controls?', 'Consider both current delivery and plausible mobilisation demand.'),
      q('quality', 'Quality and governance', 'Are quality, safeguarding, incident, complaint and improvement controls supported by records?', 'The strongest evidence shows how issues are identified, escalated, resolved and learned from.'),
      q('mobilisation', 'Mobilisation', 'Can you show a realistic mobilisation method with owners, lead times, dependencies and contingency?', 'A generic mobilisation template is not enough for a contract-specific start date.'),
      q('bid', 'Bid capability', 'Do you use a requirements map, evidence owner, independent review and final compliance check for every submission?', 'This tests the repeatability of your bid process.'),
    ],
  },
  {
    number: 2, slug: 'tools/tender-eligibility-checker', title: 'Tender Eligibility Checker', shortTitle: 'Check a tender', kind: 'assessment', group: 'Assess an opportunity', featured: true,
    summary: 'Test the explicit participation conditions in a live procurement against the evidence you currently hold.',
    outcome: 'A condition-by-condition status: pass, evidence required, clarification required or fail on information provided.', resultLabel: 'Eligibility on information provided', serviceHref: '/services/bid-viability', serviceLabel: 'Get an expert viability decision',
    questions: [
      { id: 'tender', section: 'Tender context', label: 'Which tender are you checking?', help: 'Enter the tender title, notice ID or paste the official notice URL.', type: 'text', required: true, placeholder: 'Tender title, notice ID or URL' },
      q('legal', 'Legal and financial', 'Can you satisfy every legal and financial condition explicitly stated by the buyer?', 'Only use the published procurement conditions. Do not substitute generic TenderLab benchmarks.', true),
      q('technical', 'Technical ability', 'Can you evidence every mandatory technical ability, qualification and experience condition?', 'Keep the buyer document and page reference beside each conclusion.', true),
      q('regulatory', 'Regulatory status', 'Do you hold each registration, licence or service status explicitly required for the relevant lot?', 'A condition may differ by lot and jurisdiction.', true),
      q('deadline', 'Lot and deadline', 'Can all outstanding evidence and clarifications be resolved lawfully before the relevant deadline?', 'Select “No” where a confirmed mandatory condition cannot be met in time.', true),
    ],
  },
  {
    number: 3, slug: 'tools/what-tenders-can-we-bid-for', title: 'What Tenders Can We Bid For?', shortTitle: 'Find likely tender matches', kind: 'assessment', group: 'Assess your organisation', featured: true,
    summary: 'Turn your services, geography, regulation, experience and delivery scale into a realistic opportunity shortlist.', outcome: 'Recommended tender routes, realistic contract bands, likely live matches and the factors still needing verification.', resultLabel: 'Indicative opportunity match', serviceHref: '/services/tender-pipeline-monitoring', serviceLabel: 'Explore pipeline monitoring',
    questions: [
      { id: 'services', section: 'Service fit', label: 'Which care services do you currently deliver?', help: 'List current delivery first. Planned services can be considered separately.', type: 'textarea', required: true, placeholder: 'For example: domiciliary care, supported living…' },
      { id: 'geography', section: 'Geography', label: 'Which areas can you safely mobilise and manage?', help: 'Include a realistic travel radius or named regions.', type: 'text', required: true, placeholder: 'Regions, counties or travel radius' },
      q('scale', 'Delivery scale', 'Do you have evidence of delivering at a scale comparable to the opportunities you want to pursue?', 'Match by credible delivery volume, not ambition alone.'),
      q('references', 'Experience', 'Can you provide relevant case studies and verification contacts for the target services?', 'Private-sector evidence can still be relevant where it is genuinely comparable.'),
      q('capacity', 'Mobilisation', 'Can you mobilise new work without weakening existing services?', 'Consider recruitment throughput, management span and systems capacity.'),
    ],
  },
  {
    number: 4, slug: 'tools/bid-no-bid', title: 'Bid / No-Bid Decision Tool', shortTitle: 'Make a bid decision', kind: 'assessment', group: 'Assess an opportunity', featured: true,
    summary: 'Decide whether a specific opportunity deserves bid time before writing begins.', outcome: 'GO, CONDITIONAL GO or NO-GO, with hard stops, decision conditions and a recorded rationale.', resultLabel: 'Bid decision', serviceHref: '/services/bid-viability', serviceLabel: 'Commission an expert bid decision',
    questions: [
      { id: 'tender', section: 'Tender context', label: 'Which opportunity is being decided?', help: 'Use the TenderLab tender title, notice ID or official notice URL.', type: 'text', required: true, placeholder: 'Tender title, notice ID or URL' },
      q('eligibility', 'Mandatory fit', 'Are all confirmed participation conditions satisfied or lawfully resolvable before the deadline?', 'A confirmed unresolved mandatory failure overrides the weighted factors below.', true),
      q('strategy', 'Strategic fit', 'Does the opportunity match your service model, geography and growth priorities?', 'A contract can be eligible but still be a poor strategic use of bid capacity.'),
      q('evidence', 'Evidence and experience', 'Can you support the scored response with relevant, verifiable evidence?', 'Consider comparable scale, outcomes and reference strength.'),
      q('mobilisation', 'Mobilisation', 'Is the start date feasible on realistic workforce, systems and management assumptions?', 'Record any dependency that must be resolved before submission.'),
      q('commercial', 'Commercial sustainability', 'Can the contract be delivered sustainably within the buyer pricing model?', 'Include wage, travel, non-contact, overhead and contingency assumptions.'),
      q('capacity', 'Bid capacity', 'Is there enough protected time for writing, evidence gathering, pricing and independent review?', 'Deadline feasibility should reflect the actual procurement pack.'),
    ],
  },
  {
    number: 5, slug: 'tools/score-my-response', title: 'Score My Response / 5/5 Tender Answer Checker', shortTitle: 'Score a response', kind: 'assessment', group: 'Improve a bid', featured: true,
    summary: 'Review a draft against the question, specification and published scoring descriptors without pretending to reproduce the buyer’s final score.', outcome: 'A transparent quality band, missing sub-points, unsupported claims and a prioritised rewrite plan.', resultLabel: 'Indicative TenderLab quality band', serviceHref: '/services/pre-submission-review', serviceLabel: 'Book independent human review',
    questions: [
      { id: 'question', section: 'Buyer requirement', label: 'Paste the exact tender question and instructions', help: 'Include the word limit and scoring descriptor where supplied.', type: 'textarea', required: true, placeholder: 'Tender question, instructions and scoring scale' },
      { id: 'response', section: 'Draft response', label: 'Paste the response you want to check', help: 'Remove personal data that is not needed for the review.', type: 'textarea', required: true, placeholder: 'Your current draft response' },
      q('coverage', 'Requirement coverage', 'Does the draft visibly answer every sub-requirement and instruction?', 'The evaluator should not need to infer coverage.'),
      q('method', 'Operational method', 'Does the draft explain what happens, who owns it, when it happens and which record proves it?', 'Specific operational control is stronger than policy language.'),
      q('proof', 'Evidence and outcomes', 'Are important claims supported by relevant measures, examples or verification?', 'Avoid unverified percentages and vague positive-outcome claims.'),
      q('clarity', 'Evaluator clarity', 'Is the answer easy to navigate, concise and aligned to the scoring language?', 'Clear signposting reduces evaluator effort.'),
    ],
  },
  { number: 6, slug: 'tools/evidence-health-check', title: 'Healthcare Tender Evidence Health Check', shortTitle: 'Check your evidence bank', kind: 'assessment', group: 'Assess your organisation', summary: 'Measure whether your organisation holds current, relevant and verifiable operational proof.', outcome: 'An evidence maturity band, gap map, stale-evidence list and KPI capture plan.', resultLabel: 'Evidence maturity', serviceHref: '/services/tender-readiness-audit', serviceLabel: 'Strengthen your evidence with TenderLab', questions: [q('references','Comparable experience','Do you hold recent comparable references with a reliable verification route?','Check relevance, scale and recency.'),q('outcomes','Outcomes','Can you evidence measured service-user, quality and contract outcomes?','Use trends and defined measures rather than isolated claims.'),q('quality','Quality records','Are audit, safeguarding, incident, complaint and action-closure records current and reusable?','Evidence should show learning as well as compliance.'),q('workforce','Workforce evidence','Can you evidence recruitment, vetting, training, supervision, continuity and competence?','Use records with owners and review dates.'),q('governance','Evidence governance','Does every important evidence item have an owner, date, source and review cycle?','A controlled evidence bank is easier to reuse safely.')] },
  { number: 7, slug: 'calculators/tender-pricing', title: 'Tender Pricing Calculator', shortTitle: 'Calculate a sustainable rate', kind: 'calculator', group: 'Plan delivery', summary: 'Build a transparent service rate from real employment, delivery and overhead assumptions.', outcome: 'Break-even and target rates, cost composition, margin and sensitivity warnings.', resultLabel: 'Commercial sustainability', serviceHref: '/services/bid-viability', serviceLabel: 'Review pricing and viability', questions: [
    {id:'pay',section:'Direct labour',label:'Base hourly pay',help:'Enter the weighted average hourly pay for the roles included.',type:'number',required:true,unit:'£'},
    {id:'oncost',section:'Employment on-costs',label:'Employer on-cost percentage',help:'Include National Insurance, pension, holiday and other employment on-costs.',type:'number',required:true,unit:'%'},
    {id:'noncontact',section:'Non-contact time',label:'Non-contact and supervision percentage',help:'Include training, supervision, meetings and paid time not billed directly.',type:'number',required:true,unit:'%'},
    {id:'travel',section:'Travel',label:'Travel and mileage cost per billed hour',help:'Use a realistic local delivery assumption.',type:'number',required:true,unit:'£'},
    {id:'overhead',section:'Overhead',label:'Allocated overhead percentage',help:'Include management, office, technology, insurance and compliance.',type:'number',required:true,unit:'%'},
    {id:'margin',section:'Margin',label:'Target operating margin percentage',help:'Set the margin needed for sustainable delivery and contingency.',type:'number',required:true,unit:'%'},
    {id:'ceiling',section:'Buyer constraint',label:'Buyer ceiling rate if known',help:'Leave at zero if no ceiling has been published.',type:'number',required:true,unit:'£'},
  ] },
  { number: 8, slug: 'calculators/mobilisation-capacity', title: 'Mobilisation Capacity Calculator', shortTitle: 'Test mobilisation capacity', kind: 'calculator', group: 'Plan delivery', summary: 'Test whether award-to-go-live is feasible for the required volume and start date.', outcome: 'Capacity gap, FTE requirement, recruitment pace, critical dates and mobilisation risk.', resultLabel: 'Mobilisation risk', serviceHref: '/services/mobilisation-support', serviceLabel: 'Plan mobilisation with TenderLab', questions: [
    {id:'hours',section:'Contract demand',label:'Required weekly delivery hours',help:'Enter the expected steady-state weekly hours.',type:'number',required:true,unit:'hours'},
    {id:'capacity',section:'Current capacity',label:'Reliable unused weekly capacity',help:'Count only capacity that can be deployed without weakening current services.',type:'number',required:true,unit:'hours'},
    {id:'weeks',section:'Lead time',label:'Weeks available to go-live',help:'Use the contractual start date and realistic award/standstill timing.',type:'number',required:true,unit:'weeks'},
    {id:'recruitment',section:'Recruitment',label:'New staff who can be cleared and trained each week',help:'Use demonstrated throughput, not a best-case assumption.',type:'number',required:true,unit:'people'},
    {id:'staffhours',section:'Workforce model',label:'Productive hours per new FTE each week',help:'Allow for contracted hours, non-contact time and utilisation.',type:'number',required:true,unit:'hours'},
    q('systems','Systems and management','Can systems, office and management capacity be configured within the same lead time?','Include rostering, reporting, referrals, on-call and governance dependencies.'),
  ] },
  { number: 9, slug: 'builders/social-value', title: 'Social Value Commitment Builder', shortTitle: 'Build credible social value', kind: 'builder', group: 'Plan delivery', summary: 'Turn buyer priorities into measurable, costed and evidenceable commitments.', outcome: 'A commitment register with baseline, quantity, owner, evidence, timeframe and cost.', resultLabel: 'Commitment feasibility', serviceHref: '/services/bid-writing', serviceLabel: 'Develop the full response', questions: [
    {id:'objective',section:'Buyer objective',label:'What local outcome is the buyer asking suppliers to support?',help:'Paste or summarise the published criterion.',type:'textarea',required:true,placeholder:'Buyer objective or criterion'},
    {id:'commitment',section:'Commitment',label:'What specific change will your organisation deliver?',help:'Avoid unsupported absolute promises.',type:'textarea',required:true,placeholder:'Measurable commitment'},
    {id:'measure',section:'Measurement',label:'How will the change be measured and evidenced?',help:'Include baseline, quantity, frequency and evidence source.',type:'textarea',required:true,placeholder:'Measure, evidence source and reporting frequency'},
    {id:'owner',section:'Ownership',label:'Who owns delivery and by when?',help:'Use a role, delivery period and review point.',type:'text',required:true,placeholder:'Responsible role and timeframe'},
    {id:'cost',section:'Costing',label:'Estimated delivery cost',help:'Include staff time, partners, materials and reporting.',type:'number',required:true,unit:'£'},
    q('capacity','Feasibility','Is the commitment affordable and deliverable within the contract model?','A commitment should not depend on unfunded capacity.'),
  ] },
  { number: 10, slug: 'tools/submission-risk-checker', title: 'Tender Submission Risk Checker', shortTitle: 'Run the final submission check', kind: 'assessment', group: 'Assess an opportunity', summary: 'Find procedural blockers and material submission risks before the portal deadline.', outcome: 'A blocker list, final-hour actions, owners and a timestamped readiness record.', resultLabel: 'Submission readiness', serviceHref: '/services/pre-submission-review', serviceLabel: 'Arrange a final independent review', questions: [q('returns','Mandatory returns','Are every mandatory return, declaration, schedule and attachment complete?','A missing mandatory return is a critical blocker.',true),q('limits','Instructions','Do all files comply with word, page, format, naming and signature instructions?','Use the latest amendment and clarification position.',true),q('pricing','Pricing','Has the pricing workbook been independently checked for arithmetic and narrative consistency?','Confirm totals, assumptions, VAT treatment and commitments.',true),q('consistency','Cross-document consistency','Are names, figures, staffing, mobilisation and commitments consistent across all answers and files?','Resolve contradictions before upload.'),q('portal','Portal submission','Have uploads, virus checks, portal fields and final submission confirmation been completed by an authorised person?','Do not leave the first complete upload until the deadline hour.',true)] },
  { number: 11, slug: 'guides/uk-tender-readiness-handbook', title: 'Complete UK Tender Readiness Handbook', shortTitle: 'UK tender readiness handbook', kind: 'guide', group: 'Learn', summary: 'A practical reference for care providers preparing before a suitable public-sector opportunity appears.', outcome: 'Routes to market, participation conditions, regulation, evidence, workforce, mobilisation and a 90-day plan.', resultLabel: 'Downloadable handbook', serviceHref: '/services/tender-readiness-audit', serviceLabel: 'Explore tender readiness support', sections: commonGuideSections.readiness },
  { number: 12, slug: 'guides/write-a-5-5-tender-response', title: 'How to Write a 5/5 Tender Response', shortTitle: 'Write a 5/5 tender response', kind: 'guide', group: 'Learn', summary: 'Convert buyer requirements and operational evidence into a clear, scoreable response.', outcome: 'A complete writing method from question reconstruction through independent review.', resultLabel: 'Downloadable handbook', serviceHref: '/services/pre-submission-review', serviceLabel: 'Arrange independent review', sections: commonGuideSections.response },
  { number: 13, slug: 'guides/healthcare-tender-evidence', title: 'Complete Healthcare Tender Evidence Guide', shortTitle: 'Healthcare tender evidence guide', kind: 'guide', group: 'Learn', summary: 'Build an evidence system that can prove care quality, control and outcomes in future submissions.', outcome: 'Evidence hierarchy, KPI library, capture cadence, governance and reusable case-study records.', resultLabel: 'Downloadable handbook', serviceHref: '/services/tender-readiness-audit', serviceLabel: 'Strengthen your evidence base', sections: [
    {title:'Move from policy to proof',body:'A strong evidence chain connects policy intent to an operational record, a measured outcome and an independent or commissioner verification route.'},
    {title:'Capture care quality consistently',body:'Maintain trends for continuity, missed visits, safeguarding, incidents, medication, complaints, audits, outcomes and action closure where relevant to the service.'},
    {title:'Separate care settings',body:'Adult social care, children’s services, housing support and clinical services have different operating evidence. Do not treat regulator, staffing or outcome expectations as interchangeable.'},
    {title:'Control the evidence bank',body:'Give each record an owner, service context, period, source, verification status, retention position and review date.'},
    {title:'Turn delivery into case studies',body:'Record starting position, cohort and scale, action, named control, result, timeframe and verification while the evidence is fresh.'},
  ] },
  { number: 14, slug: 'guides/domiciliary-care-supported-living-tenders', title: 'Domiciliary Care and Supported Living Tender Guide', shortTitle: 'Care tender specialist guide', kind: 'guide', group: 'Learn', summary: 'Sector-specific tender guidance that keeps domiciliary care and supported living models distinct.', outcome: 'Service-specific evidence, pricing, workforce, mobilisation and outcome guidance.', resultLabel: 'Downloadable specialist guide', serviceHref: '/care-settings', serviceLabel: 'Explore care-setting expertise', sections: [
    {title:'Domiciliary care route',body:'Test zoned delivery, travel time, continuity, call monitoring, missed-call controls, medication, reablement and local recruitment against the buyer model.'},
    {title:'Domiciliary care pricing',body:'A viable rate must fund contact time, travel, mileage, supervision, training, absence, management, systems, quality and contingency.'},
    {title:'Supported living route',body:'Keep housing and support distinct. Address cohort matching, tenancy independence, community inclusion, mental capacity, PBS where relevant and property mobilisation.'},
    {title:'Supported living staffing',body:'Explain core, shared, one-to-one, waking-night and sleep-in assumptions transparently, including management and escalation.'},
    {title:'Shared tender disciplines',body:'Both models still require document-led eligibility, strong evidence, clear response architecture, sustainable pricing and controlled mobilisation.'},
  ] },
  { number: 15, slug: 'guides/tender-mobilisation-handbook', title: 'Complete Tender Mobilisation Handbook', shortTitle: 'Tender mobilisation handbook', kind: 'guide', group: 'Learn', summary: 'A practical control manual from award and standstill through safe go-live and stabilisation.', outcome: 'Governance, commitment control, TUPE, workforce, systems, risk and 30–60–90 day assurance.', resultLabel: 'Downloadable handbook', serviceHref: '/services/mobilisation-support', serviceLabel: 'Get mobilisation support', sections: [
    {title:'Establish mobilisation governance',body:'Appoint an accountable lead, workstream owners, decision routes, reporting rhythm and a controlled commitment register linked to the winning submission.'},
    {title:'Build the critical path',body:'Sequence commissioner handover, TUPE, recruitment, vetting, training, referrals, care-plan migration, systems, property and equipment against the contractual start date.'},
    {title:'Protect people during transition',body:'Plan communication with people using services, families and staff. Record continuity, consent, risk and escalation decisions.'},
    {title:'Evidence day-one readiness',body:'Define the evidence that proves staffing, systems, governance, contingency and commissioner actions are complete before go-live.'},
    {title:'Stabilise delivery',body:'Use the first 30, 60 and 90 days to baseline KPIs, close transition risks, verify commitments and move governance into business as usual.'},
  ] },
  { number: 16, slug: 'builders/tender-case-study', title: 'Tender Case Study Builder', shortTitle: 'Build a tender case study', kind: 'builder', group: 'Improve a bid', summary: 'Turn raw delivery experience into a commissioner-verifiable case study.', outcome: 'Long and short case-study formats, evidence warnings and a transferability check.', resultLabel: 'Evidence strength', serviceHref: '/services/bid-writing', serviceLabel: 'Use the case study in a live bid', questions: [
    {id:'context',section:'Context',label:'Describe the service, commissioner or customer, dates, cohort and delivery scale',help:'Give enough detail to test relevance without adding unnecessary personal data.',type:'textarea',required:true,placeholder:'Service context, period, cohort and scale'},
    {id:'challenge',section:'Starting challenge',label:'What specific starting problem or requirement had to be addressed?',help:'Describe the baseline, risk or commissioner objective.',type:'textarea',required:true,placeholder:'Starting position'},
    {id:'action',section:'Intervention',label:'What did your team do, who owned it and how was delivery controlled?',help:'Include timing, systems, records, review and escalation.',type:'textarea',required:true,placeholder:'Actions, roles and controls'},
    {id:'outcome',section:'Outcome',label:'What measurable change occurred and over what period?',help:'Use only figures you can substantiate.',type:'textarea',required:true,placeholder:'Measured outcome and timeframe'},
    {id:'verification',section:'Verification',label:'Who or what can verify the result?',help:'Name a role or record, not personal contact details.',type:'text',required:true,placeholder:'Commissioner role, audit, KPI report or other source'},
  ] },
  { number: 17, slug: 'builders/compliance-matrix', title: 'Compliance Matrix Builder', shortTitle: 'Build a compliance matrix', kind: 'builder', group: 'Improve a bid', summary: 'Convert procurement requirements into a controlled register of owners, evidence and response status.', outcome: 'A requirements register, ownership view, missing-evidence alerts and CSV export.', resultLabel: 'Task completeness', serviceHref: '/services/bid-writing', serviceLabel: 'Build the complete submission', questions: [
    {id:'requirement',section:'Requirement',label:'Enter a buyer requirement or question',help:'Keep the original text visibly separate from your interpretation.',type:'textarea',required:true,placeholder:'Requirement text'},
    {id:'source',section:'Source',label:'Where does the requirement appear?',help:'Record document name, page, section or question ID.',type:'text',required:true,placeholder:'Document and location'},
    {id:'owner',section:'Ownership',label:'Who owns the response and who reviews it?',help:'Use named roles or team members within your controlled working record.',type:'text',required:true,placeholder:'Owner and reviewer'},
    {id:'evidence',section:'Evidence',label:'Which evidence is required or still missing?',help:'Identify the source record and verification route.',type:'textarea',required:true,placeholder:'Evidence available and gaps'},
    {id:'status',section:'Status',label:'What is the current status?',help:'Completeness is task progress, not a bid-quality score.',type:'single',required:true,options:[{label:'Not started',value:'not-started',score:0},{label:'Evidence needed',value:'evidence-needed',score:25},{label:'Drafted',value:'drafted',score:55},{label:'Reviewed',value:'reviewed',score:80},{label:'Complete',value:'complete',score:100},{label:'Blocked',value:'blocked',score:0}]},
  ] },
  { number: 18, slug: 'tools/tender-improvement-plan', title: 'Tender Improvement Plan', shortTitle: 'Build an improvement plan', kind: 'builder', group: 'Improve a bid', summary: 'Turn diagnostic findings into sequenced management actions before the next tender.', outcome: 'A 30–60–90 day roadmap with owners, dependencies, due dates and evidence of completion.', resultLabel: 'Plan status', serviceHref: '/services/tender-training', serviceLabel: 'Build internal capability', questions: [
    {id:'priority',section:'Priority gap',label:'What is the most important tender weakness to resolve?',help:'Eligibility and evidence gaps usually come before cosmetic writing changes.',type:'textarea',required:true,placeholder:'Specific weakness or missing evidence'},
    {id:'deadline',section:'Planning horizon',label:'When does this need to be resolved?',help:'Use a target tender date or a 30, 60 or 90-day horizon.',type:'text',required:true,placeholder:'Target date or planning horizon'},
    {id:'owner',section:'Owner',label:'Who is accountable for closing the action?',help:'Use one accountable role, even if others contribute.',type:'text',required:true,placeholder:'Accountable role'},
    {id:'done',section:'Definition of done',label:'What evidence will prove the action is complete?',help:'Define a tangible controlled output.',type:'textarea',required:true,placeholder:'Evidence of completion'},
    {id:'dependency',section:'Dependencies',label:'What must happen first or could prevent completion?',help:'Include approvals, data, external parties and lead times.',type:'textarea',required:true,placeholder:'Dependencies and risks'},
  ] },
  { number: 19, slug: 'tools/tender-feedback-analysis', title: 'Tender Feedback Analysis Workbook', shortTitle: 'Analyse tender feedback', kind: 'builder', group: 'Improve a bid', summary: 'Convert evaluator feedback into repeatable lessons without inferring more than the evidence supports.', outcome: 'Question-level lessons, recurring themes, severity and an improvement workbook.', resultLabel: 'Issue severity and recurrence', serviceHref: '/services/lost-bid-debrief', serviceLabel: 'Arrange an independent debrief', questions: [
    {id:'question',section:'Requirement',label:'Paste the tender question or requirement',help:'Include the scoring descriptor where available.',type:'textarea',required:true,placeholder:'Question and scoring descriptor'},
    {id:'feedback',section:'Buyer feedback',label:'Paste the evaluator feedback exactly as received',help:'Keep the buyer wording separate from TenderLab analysis.',type:'textarea',required:true,placeholder:'Evaluator comments'},
    {id:'response',section:'Submitted content',label:'Paste the relevant submitted response',help:'Remove unnecessary personal data.',type:'textarea',required:true,placeholder:'Submitted answer'},
    {id:'cause',section:'Cause classification',label:'Which issue best explains the feedback?',help:'Choose the closest supported cause; avoid rewriting history.',type:'single',required:true,options:[{label:'Missed requirement',value:'missed',score:20},{label:'Weak operational method',value:'method',score:35},{label:'Insufficient evidence or outcome',value:'evidence',score:35},{label:'Poor signposting or inconsistency',value:'clarity',score:50},{label:'Commercial, eligibility or procedure',value:'commercial',score:20},{label:'External competition factor',value:'external',score:70}]},
    {id:'lesson',section:'Future rule',label:'What specific rule should apply to the next submission?',help:'Write a repeatable control, not a vague intention.',type:'textarea',required:true,placeholder:'Future action or review rule'},
  ] },
  { number: 20, slug: 'reports/opportunity-qualification', title: 'Tender Opportunity Qualification Report', shortTitle: 'Create a qualification report', kind: 'report', group: 'Assess an opportunity', summary: 'Combine eligibility, fit, evidence, mobilisation and commercial findings into one director-ready decision record.', outcome: 'An executive decision summary with unresolved assumptions, risks, conditions and next actions.', resultLabel: 'Decision inherited from Bid / No-Bid', serviceHref: '/services/bid-viability', serviceLabel: 'Commission a document-led viability review', questions: [
    {id:'tender',section:'Opportunity',label:'Identify the tender, authority, notice ID and deadline',help:'Use the official notice and procurement pack as the source.',type:'textarea',required:true,placeholder:'Tender context'},
    {id:'eligibility',section:'Eligibility',label:'What is the latest eligibility conclusion and which conditions remain unresolved?',help:'Separate participation conditions from scored award criteria.',type:'textarea',required:true,placeholder:'Eligibility status and conditions'},
    {id:'decision',section:'Bid decision',label:'What is the current GO, CONDITIONAL GO or NO-GO decision?',help:'Record the decision owner and date.',type:'single',required:true,options:[{label:'GO',value:'go',score:90},{label:'CONDITIONAL GO',value:'conditional',score:60},{label:'NO-GO',value:'no-go',score:10}]},
    {id:'evidence',section:'Evidence',label:'Which decisive evidence strengths and gaps affect the opportunity?',help:'Reference actual records or missing proof.',type:'textarea',required:true,placeholder:'Evidence strengths and gaps'},
    {id:'mobilisation',section:'Mobilisation and commercial risk',label:'Which delivery, workforce, timeline or pricing assumptions remain unresolved?',help:'State assumptions clearly; do not hide uncertainty in an overall score.',type:'textarea',required:true,placeholder:'Risks, assumptions and conditions'},
  ] },
]

export const RESOURCE_BY_SLUG = new Map(RESOURCES.map((resource) => [resource.slug, resource]))

export function resourceHref(resource: ResourceDefinition) {
  return `/resources/${resource.slug}`
}

export const RESOURCE_GROUPS = ['Assess your organisation', 'Assess an opportunity', 'Improve a bid', 'Plan delivery', 'Learn'] as const
