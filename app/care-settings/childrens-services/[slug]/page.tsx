import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const WP = 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs'

const SECTIONS = [
  {
    slug: 'care-home-accommodation',
    title: 'Care Home Accommodation',
    subtitle: 'Residential care home submissions for children require Ofsted-aligned quality evidence, named registered managers, and a therapeutic environment that commissioners can evidence.',
    img: `${WP}/two-colleagues-working-together-office-color-background-corporate-business-colleagues-working_265223-44392-rlxnlsdfyy9pbs08u1xw33z3i5mjvkdbtwcbwr0e5o.jpg`,
    paragraphs: [
      "Children's residential care home procurement sits at the highest end of scrutiny in children's services commissioning. Local authority commissioners procuring residential placements for children with complex needs, trauma histories, and challenging behaviours are evaluating every response against Ofsted's inspection framework — whether or not that framework is explicitly referenced in the specification. A response that demonstrates regulatory awareness without operational depth will not score at the level needed to win.",
      "Evaluation criteria for residential care home contracts focus on your therapeutic environment, the qualifications and stability of your residential staff team, your named registered manager's experience and Ofsted track record, your safeguarding infrastructure, your approach to behaviour support and de-escalation, and your outcomes data from current placements. Commissioners look for evidence that your home delivers therapeutic progress — not simply a safe place to live.",
      "TenderLab builds children's residential care responses around your home's specific operational model and your Ofsted evidence base. We capture your therapeutic approach, your staffing stability data, your safeguarding culture, and your placement outcomes, and structure your submission to demonstrate to commissioning evaluators that your home goes beyond compliance and delivers measurable progress for the children in your care.",
    ],
  },
  {
    slug: 'supported-accommodation',
    title: 'Supported Accommodation',
    subtitle: 'Supported accommodation for young people demands evidence of key worker relationships, pathway planning, and measurable move-on outcomes that commissioners can verify.',
    img: `${WP}/businessman-shaking-hand-with-his-colleague-office-scaled-rlxt0xn6uperpcjnbeniqv67bzrvxd35zs7cqtnycs.jpg`,
    paragraphs: [
      "Supported accommodation for young people aged 16-25, including care leavers and young people at risk of homelessness, is one of the most outcomes-focused commissioning environments in children's services. Local authority commissioners and combined authority housing teams procuring supported accommodation contracts are evaluating responses on the evidence of your key worker model, your approach to independent living skills, and the move-on outcomes you deliver — not your generic statements about young person-centred support.",
      "Evaluation criteria for supported accommodation commissioning focus on your key worker allocation and relationship model, your pathway planning methodology, your approach to building independent living skills, your outcomes data showing successful move-on to independent accommodation, your multi-agency working with housing, employment, and health services, and your specific capability with young people who have care experience or complex needs backgrounds.",
      "TenderLab's approach to supported accommodation tendering centres on evidencing your key worker model and your outcomes data. We work with your service team to identify the specific evidence — the pathway planning tools, the move-on percentages, the multi-agency working arrangements — that commissioners score most highly, and structure your response to present that evidence in the format that maximises marks at each evaluation section.",
    ],
  },
  {
    slug: 'temporary-accommodation',
    title: 'Temporary Accommodation',
    subtitle: 'Temporary accommodation submissions require rapid access evidence, crisis management protocols, and clear pathway planning from first placement to settled outcome.',
    img: `${WP}/service5-rld2tb6l874u29gi0ghbat2xqz5o9gd2l6ub88mmcs.webp`,
    paragraphs: [
      "Temporary accommodation for young people and families in housing crisis sits at the intersection of children's services commissioning, housing procurement, and crisis intervention. Commissioners procuring temporary accommodation contracts are evaluating your ability to respond rapidly, manage complex presentations safely, and move individuals and families towards settled accommodation within defined timeframes. Generic statements about providing a safe and supportive environment do not score — operational specificity does.",
      "Evaluation criteria for temporary accommodation contracts focus on your access and response time to emergency placements, your assessment and support planning methodology, your safeguarding infrastructure for crisis presentations, your multi-agency working with children's social care, housing, and voluntary sector partners, your staffing model for out-of-hours support, and your pathway planning approach and move-on outcome data.",
      "TenderLab builds temporary accommodation responses around your operational model and your evidence of rapid response capacity. We identify your placement response times, your assessment tools, your safeguarding protocols, and your pathway outcomes data, and structure your submission to demonstrate both the safety of your crisis response and the effectiveness of your pathway planning in moving individuals towards settled outcomes.",
    ],
  },
  {
    slug: 'emergency-accommodation',
    title: 'Emergency Accommodation',
    subtitle: 'Emergency accommodation tenders are evaluated on response times, safeguarding integration, and crisis support capacity — every section must demonstrate operational readiness.',
    img: `${WP}/business-team-situation-present-share-idea-scaled-rlxsy44mcljsvgn3s6rt9ksf6do8u1w5ltqwwxuh0s.jpg`,
    paragraphs: [
      "Emergency accommodation for children and young people is commissioned in the highest-stakes procurement environment in the children's services sector. Local authorities procuring emergency placements need absolute confidence that your service can respond within hours, safely manage complex and often traumatised young people in crisis, and maintain safeguarding standards under pressure. Evaluators are not looking for aspirational language — they are looking for evidence that your emergency response infrastructure is genuinely operational.",
      "Evaluation criteria for emergency accommodation contracts focus on your response time guarantees and how you deliver against them, your 24/7 staffing model, your safeguarding protocols specific to emergency placements, your approach to initial assessment and risk management, your liaison with referring social workers and out-of-hours teams, your physical environment standards, and your approach to stabilisation and onward pathway planning.",
      "TenderLab approaches emergency accommodation tendering by building responses around your operational response model. We capture your response time data, your out-of-hours staffing infrastructure, your safeguarding and risk management protocols, and your pathway planning approach, and structure your submission to demonstrate to commissioning evaluators that your emergency accommodation service is genuinely ready to respond — and that every child placed with you will be safe and supported from the moment they arrive.",
    ],
  },
  {
    slug: 'supported-living',
    title: 'Supported Living',
    subtitle: 'Supported living for young people and care leavers requires evidence of tenancy sustainment, independence skill development, and the multi-agency working that underpins long-term stability.',
    img: `${WP}/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg`,
    paragraphs: [
      "Supported living for young people, particularly care leavers transitioning to independence, is one of the most outcome-intensive commissioning environments in children's services. Local authority commissioners and leaving care teams procuring supported living contracts are evaluating responses on the evidence of your independence pathway model, your tenancy sustainment approach, and your outcomes data — not your description of the support you intend to provide. A response that describes a key worker model without evidencing outcomes will not score at the top of the framework.",
      "Evaluation criteria for supported living contracts focus on your key worker model and relationship approach, your independence skills building methodology, your tenancy sustainment outcome data, your approach to financial capability and employment readiness, your multi-agency working with Leaving Care teams, mental health services, employment support, and housing providers, and your specific capability with young people who have complex needs including trauma, mental health challenges, and substance misuse backgrounds.",
      "TenderLab builds supported living responses around your key worker model and your independence outcomes evidence. We work with your service team to capture the tenancy sustainment data, the independence skills progression evidence, and the multi-agency working arrangements that commissioners score most highly in supported living procurement, and structure your submission to demonstrate that your service delivers long-term stability — not just short-term support.",
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

export default async function ChildrensServicesSubPage({
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
            <Link href="/care-settings/childrens-services">Children&apos;s Services</Link>
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
                <Link href="/care-settings/childrens-services" className="btn btn-ghost">
                  ← Back to Children&apos;s Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Children&apos;s Services</p>
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
