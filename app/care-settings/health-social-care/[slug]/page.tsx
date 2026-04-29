import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const WP = 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs'

const SECTIONS = [
  {
    slug: 'domiciliary-care',
    title: 'Domiciliary Care',
    subtitle: 'Winning domiciliary care contracts through operational specificity, evidence-led methodology, and a deep understanding of community-based commissioning.',
    img: `${WP}/two-colleagues-working-together-office-color-background-corporate-business-colleagues-working_265223-44392-rlxnlsdfyy9pbs08u1xw33z3i5mjvkdbtwcbwr0e5o.jpg`,
    paragraphs: [
      "Domiciliary care providers are frequently delivering care to 20 or more individuals per day, managing complex rota systems, variable care packages, and the full range of stakeholder engagement that goes with community-based delivery. Commissioning bodies understand the operational pressures of domiciliary provision and their evaluation criteria reflect it — they are looking for evidence that you can manage complexity at scale without compromising quality, continuity, or compliance.",
      "Evaluators in domiciliary care procurement prioritise consistent carer allocation, robust service management policies, and measurable person-centred outcomes. They want to see your staffing model, your supervision structure, your approach to continuity of care, and the systems you use to monitor quality at individual package level. Generic responses about person-centred care do not score. Named approaches, named tools, and named outcomes do.",
      "TenderLab's approach to domiciliary care tendering begins with a full analysis of your current operational model against the evaluation criteria. We identify the evidence that will score, structure your response to mirror how evaluators will read and mark it, and ensure every section demonstrates the operational specificity that differentiates a winning submission from a compliant one.",
    ],
  },
  {
    slug: 'shared-lives',
    title: 'Shared Lives',
    subtitle: 'Shared Lives commissioning values relationship quality, matching processes, and carer support infrastructure above all else.',
    img: `${WP}/businessman-shaking-hand-with-his-colleague-office-scaled-rlxt0xn6uperpcjnbeniqv67bzrvxd35zs7cqtnycs.jpg`,
    paragraphs: [
      "Shared Lives care is a fundamentally different approach from other care delivery models, and commissioners procuring Shared Lives arrangements know it. The Shared Lives model values relationship quality, the matching process, carer development, and the integration of the person into family and community life. Commissioners are not looking for institutional quality assurance language — they are looking for evidence that your Shared Lives scheme genuinely embeds the principles of ordinary living.",
      "Evaluation criteria for Shared Lives contracts typically focus on your matching methodology, your carer recruitment and retention approach, your support to Shared Lives carers, your safeguarding infrastructure, and your outcomes data across current placements. The evidence needs to be specific to the Shared Lives model — not adapted from a residential or supported living framework.",
      "TenderLab understands the Shared Lives commissioning environment and the evidence base that scores within it. We work with your scheme coordinators to capture the matching process, the carer support model, and the lived experience outcomes that commissioners want to see — translating your operational practice into a submission that reflects the genuine quality of your scheme.",
    ],
  },
  {
    slug: 'residential-care',
    title: 'Residential Care',
    subtitle: 'Residential care tenders demand CQC compliance evidence, quality-of-life outcome data, and named clinical governance leads — we deliver all three.',
    img: `${WP}/service5-rld2tb6l874u29gi0ghbat2xqz5o9gd2l6ub88mmcs.webp`,
    paragraphs: [
      "Residential care homes operate at the intersection of CQC compliance, quality-of-life outcomes, and commissioning expectations that are shaped by years of national policy on personalisation and dignity. Local authority evaluators for residential care contracts expect to see evidence that your home goes beyond regulatory compliance — they want to see how your service improves residents' lives, not just how it avoids inspection failures.",
      "Evaluation criteria for residential care procurement include staffing ratios and qualifications, activities and social engagement provision, dementia and complex needs capability, quality assurance systems, safeguarding infrastructure, and measurable quality-of-life outcomes. Commissioners look for named registered managers, named clinical leads where applicable, and evidence from current residents and families rather than policy documents alone.",
      "TenderLab approaches residential care tendering by building responses around your home's specific operational model, your current CQC rating and evidence of continuous improvement, and the outcomes you are already delivering for residents. We ensure your submission reflects your home's genuine quality and positions your organisation to score at the top of the evaluation framework.",
    ],
  },
  {
    slug: 'nursing-care',
    title: 'Nursing Care',
    subtitle: 'Nursing care submissions require clinical governance infrastructure, registered nursing oversight, and complex health needs management presented with precision.',
    img: `${WP}/business-team-situation-present-share-idea-scaled-rlxsy44mcljsvgn3s6rt9ksf6do8u1w5ltqwwxuh0s.jpg`,
    paragraphs: [
      "Nursing care tenders require you to demonstrate a combination of clinical governance infrastructure, registered nursing oversight, and complex health needs management that goes significantly beyond standard social care requirements. Commissioning bodies and NHS procurement teams evaluating nursing care submissions expect detailed evidence of how your clinical governance operates, how registered nurses are deployed and supervised, and how complex health needs are identified, assessed, and managed across the care home.",
      "Evaluators in nursing care procurement look for named Directors of Nursing or senior clinical leads, evidence of clinical audit, medication management systems, wound care and tissue viability capability, liaison with primary care and specialist services, and training frameworks for clinical staff. The gap between a compliant response and a high-scoring one in nursing care is almost always in the clinical specificity of the evidence provided.",
      "TenderLab works with your clinical leadership team to capture the evidence that nursing care evaluators reward. We identify your clinical governance infrastructure, your outcomes data, and your complex needs management approach, and build responses that demonstrate genuine clinical expertise — not general statements about nursing quality that could apply to any provider.",
    ],
  },
  {
    slug: 'extra-care-services',
    title: 'Extra Care Services',
    subtitle: 'Extra care commissioning sits at the intersection of housing and care delivery — a dual-commissioning context generalist writers consistently misread.',
    img: `${WP}/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg`,
    paragraphs: [
      "Extra care housing developments require a very different competitive bidding strategy from standard domiciliary or residential care commissioning. The integration of housing management and care delivery, the emphasis on independence and community integration, and the specific outcomes frameworks used by housing associations and local authorities jointly commissioning extra care schemes all create a commissioning environment that generalist bid writers consistently misunderstand.",
      "Evaluation criteria for extra care services focus on how your care model integrates with the housing and facilities management infrastructure, your approach to supporting independence rather than dependency, your outcomes data for existing extra care or housing with care services, your partnerships with housing providers, and your capacity to respond flexibly as residents' needs change over time.",
      "TenderLab's approach to extra care tendering addresses the specific dual-commissioning context that these procurements operate within. We build responses that speak to both the care delivery evaluation criteria and the housing integration expectations, evidencing your model's approach to independence, community, and measurable quality of life for residents.",
    ],
  },
  {
    slug: 'reablement-services',
    title: 'Reablement Services',
    subtitle: 'Reablement tenders are outcomes-intensive. Commissioners expect measurable independence goals, timeframes, and reduction-in-care-need data.',
    img: `${WP}/mature-person-college-campus-study-area-writing-notes-ideas_482257-122475-1-rlxsw0xj5uov2nobza9nq3rjnjyvq9lmnhk2isxyuk.jpg`,
    paragraphs: [
      "Reablement services are a short-term community programme with a single, measurable purpose: restoring independence and reducing ongoing support needs. Commissioning bodies procure reablement services with clear outcome expectations and they evaluate responses on whether providers can demonstrate they genuinely deliver on that purpose — not just describe it. A reablement tender that reads like a domiciliary care submission will not score well, because commissioners can see immediately that the provider does not understand the model.",
      "Evaluation criteria for reablement contracts focus on your goal-setting methodology, your timeframes to independence, your outcomes data showing reduction in care needs following reablement, your staff training and reablement-specific skills, your multi-disciplinary working arrangements with occupational therapists and physiotherapists, and your approach to equipment and home adaptation as part of the reablement pathway.",
      "TenderLab builds reablement responses around your operational model and your outcomes data. We identify the specific evidence — the goal-setting tools, the outcome percentages, the MDT working arrangements — that reablement evaluators score, and structure your response to present that evidence in the order and format that maximises marks at each section.",
    ],
  },
  {
    slug: 'day-services',
    title: 'Day Services',
    subtitle: 'Day services commissioning prioritises meaningful activity, social engagement outcomes, and genuine complex needs capability — not time-filling programmes.',
    img: `${WP}/team-architects-working-town-project-conference-room-architect-business-suit_482257-26513-rlech3dwy1clh1rrgzpxq067wt5p662hx5uscbdh2k.jpg`,
    paragraphs: [
      "Day services form a critical resource for adults with complex needs and their carers, and commissioning bodies procuring day service contracts are acutely aware of the difference between meaningful social engagement and time-filling activity. Day service tenders require evidence that your programme delivers genuine outcomes for individuals — improved wellbeing, social connection, skill development, and maintained independence — not simply a structured day away from home.",
      "Evaluators for day services look at the quality and variety of your activity programme, your approach to individual goal-setting and outcomes measurement, your capability to support people with complex needs including dementia, learning disabilities, and physical and sensory impairments, your carer support offer, your safeguarding infrastructure, and your transport and accessibility arrangements.",
      "TenderLab works with your day service team to build responses that reflect the genuine quality of your programme. We capture your activity evidence, your outcomes data, your complex needs capability, and your individual planning approach, and structure your submission to demonstrate operational depth in every section the evaluator will mark.",
    ],
  },
  {
    slug: 'live-in-care-services',
    title: 'Live-In Care Services',
    subtitle: '24/7 live-in care submissions require evidence of carer-matching processes, person-centred planning, and the unique safeguarding dynamics of home-based care.',
    img: `${WP}/two-men-discussing-contract-desk_31965-128846-rlxnbi11686q9ey6wluvspfhgcbxmtj32zb0tq9i98.jpg`,
    paragraphs: [
      "Live-in care services are fundamentally personal and require a very different evidence base from other care models. Commissioners and local authorities procuring live-in care arrangements are looking for evidence that your matching process, your carer training and support model, and your safeguarding infrastructure are all built around the unique dynamics of a carer living in a client's home — not adapted from a domiciliary or residential framework.",
      "Evaluators for live-in care contracts focus on your carer recruitment and vetting processes, your matching methodology, your approach to carer wellbeing and respite, your supervision model for live-in carers, your emergency and contingency arrangements, your safeguarding infrastructure specific to the live-in context, and your outcomes data for current live-in service users.",
      "TenderLab understands the live-in care commissioning environment and the specific evidence requirements it creates. We work with your operations and matching teams to capture the evidence that scores in live-in care procurement, building responses that demonstrate both the quality of your carer model and the safeguarding rigour that commissioners require.",
    ],
  },
  {
    slug: 'short-breaks',
    title: 'Short Breaks (Respite Care)',
    subtitle: 'Short breaks tenders must satisfy two distinct outcome sets — the service user experience and the carer benefit. We evidence both.',
    img: `${WP}/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg`,
    paragraphs: [
      "Short breaks and respite care commissioning can be particularly challenging because the evaluation must satisfy two distinct sets of outcomes — the experience and wellbeing of the service user during the break, and the rest, relief, and support experience of the carer. Commissioners procuring short break services want to see evidence that your provision is genuinely restorative for carers and genuinely positive for service users, not simply a safe place to spend a few days.",
      "Evaluation criteria for short breaks services typically include your activities and wellbeing programme for service users, your approach to maintaining routines and familiar care practices, your communication with families and carers throughout the break, your complex needs capability, your safeguarding infrastructure, and your outcomes data demonstrating both service user experience and carer benefit from the respite period.",
      "TenderLab builds short breaks responses around the dual outcome framework that this commissioning environment requires. We evidence your service user programme and your carer engagement approach in parallel, ensuring your submission demonstrates operational quality on both dimensions and scores consistently across the evaluation criteria.",
    ],
  },
  {
    slug: 'housing-support',
    title: 'Housing Support',
    subtitle: 'Housing support commissioning demands tenancy sustainment outcome data, multi-agency working evidence, and a prevention-focused approach that stands out.',
    img: `${WP}/businessman-shaking-hand-with-his-colleague-office-scaled-rlxt0xn6uperpcjnbeniqv67bzrvxd35zs7cqtnycs.jpg`,
    paragraphs: [
      "Housing support services are often procured within broader community services frameworks, which means providers tendering for housing support contracts are competing against a wide range of organisations — housing associations, voluntary sector providers, and specialist support agencies — each with different evidence bases and commissioning relationships. Standing out in housing support procurement requires a clear articulation of your tenancy sustainment model and your prevention-focused approach.",
      "Evaluation criteria for housing support commissioning focus on your tenancy sustainment outcome data, your approach to early intervention and crisis prevention, your multi-agency working with housing officers, social workers, mental health services, and community organisations, your financial inclusion capability, and your approach to supporting people with complex and multiple needs including substance misuse, mental health, and offending backgrounds.",
      "TenderLab approaches housing support tendering by building responses around your outcome evidence and your multi-agency working model. We identify your tenancy sustainment data, your prevention approach, and your complex needs capability, and structure your submission to demonstrate the operational depth and community integration that housing support commissioners score most highly.",
    ],
  },
]

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const section = SECTIONS.find((s) => s.slug === slug)
  if (!section) return {}
  return {
    title: `${section.title} Tenders | TenderLab`,
    description: section.subtitle,
  }
}

export default async function HSCSubPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const section = SECTIONS.find((s) => s.slug === slug)
  if (!section) notFound()

  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt={section.title}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-hero__breadcrumb">
            <Link href="/care-settings">Care Settings</Link>
            {' / '}
            <Link href="/care-settings/health-social-care">Health &amp; Social Care</Link>
            {' / '}
            {section.title}
          </p>
          <h1 className="page-hero__title">{section.title}</h1>
          <p className="page-hero__sub">{section.subtitle}</p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="hsc-sub-page-body">
        <div className="container">
          <div className="hsc-sub-page-layout">
            {/* Photo */}
            <div className="hsc-sub-page-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.img} alt={section.title} />
            </div>
            {/* Text */}
            <div className="hsc-sub-page-text">
              <h2 className="hsc-sub-page-heading">{section.title}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="hsc-sub-page-para">{p}</p>
              ))}
              <div className="hsc-sub-page-actions">
                <Link href="/contact" className="btn btn-primary">
                  Get a Free Consultation
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <Link href="/care-settings/health-social-care" className="btn btn-ghost">
                  ← Back to Health &amp; Social Care
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Health &amp; Social Care</p>
          <h2 className="services-cta__headline">Ready to Win Your Next Contract?</h2>
          <p className="services-cta__sub">
            Book a free consultation and we&apos;ll assess your next opportunity, the commissioning landscape, and what it takes to win.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Call</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
