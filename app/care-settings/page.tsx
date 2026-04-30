import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Care Settings | TenderLab — Every Commissioning Route',
  description:
    "TenderLab covers every UK commissioning route. Adult Social Care, Children's Services, Housing and Support, Health and Clinical Services across 28 specialised tender-writing pages.",
}

type SettingCard = { title: string; desc: string; slug: string }
type Category = { num: string; label: string; desc: string; color: string; cards: SettingCard[] }

const CATEGORIES: Category[] = [
  {
    num: '01',
    label: 'Adult Social Care',
    desc: 'Care delivered to adults with assessed needs across home, community and accommodation-based services.',
    color: '#B02727',
    cards: [
      { title: 'Domiciliary Care',         slug: 'domiciliary-care',         desc: 'Personal care and practical support delivered to people in their own homes through scheduled visits.' },
      { title: 'Live-In Care',              slug: 'live-in-care',             desc: 'Continuous support delivered by a carer living in the service user\'s home for extended periods.' },
      { title: 'Residential Care',          slug: 'residential-care',         desc: 'Twenty-four-hour care delivered in registered residential or care home settings.' },
      { title: 'Nursing Care',              slug: 'nursing-care',             desc: 'Nursing-led care for adults with health needs that require qualified clinical oversight.' },
      { title: 'Supported Living',          slug: 'supported-living',         desc: 'Tenancy-based housing combined with personalised support for adults with disability or mental health needs.' },
      { title: 'Extra Care Housing',        slug: 'extra-care-housing',       desc: 'Self-contained housing for older adults with on-site care available across the development.' },
      { title: 'Day Services',              slug: 'day-services',             desc: 'Centre-based or community-based day support for adults with disability or mental health needs.' },
      { title: 'Reablement Services',       slug: 'reablement-services',      desc: 'Time-limited, goal-focused intensive support to restore independence after illness or hospital admission.' },
      { title: 'Short Breaks and Respite',  slug: 'short-breaks-and-respite', desc: 'Planned, time-limited respite stays for adults with assessed needs to support family carers.' },
      { title: 'Shared Lives',              slug: 'shared-lives',             desc: 'Family-based care arrangement where Shared Lives carers share their home with adults requiring support.' },
      { title: 'Outreach and Community Support', slug: 'outreach-community-support', desc: 'Visit-based support for adults living independently with mental health, learning disability or substance misuse needs.' },
      { title: 'Crisis and Rapid Response', slug: 'crisis-rapid-response',    desc: 'Time-critical short-term support to prevent crisis escalation, hospital admission or placement breakdown.' },
    ],
  },
  {
    num: '02',
    label: "Children's Services",
    desc: 'Statutory and commissioned services for children, young people and care leavers.',
    color: '#2E5E8C',
    cards: [
      { title: "Children's Residential Care",       slug: 'childrens-residential-care',  desc: 'Ofsted-registered residential placements for children and young people unable to live at home.' },
      { title: 'Supported Accommodation (16-17 / 16+)', slug: 'supported-accommodation', desc: 'Ofsted-registered supported accommodation for 16 and 17 year olds, with semi-independent and independent options.' },
      { title: 'Fostering Services',                slug: 'fostering-services',          desc: 'Ofsted-registered fostering provision for looked-after children and young people.' },
      { title: 'Leaving Care Services',             slug: 'leaving-care-services',       desc: 'Statutory and commissioned support for care leavers transitioning from care into adulthood.' },
      { title: 'Short Breaks (Children)',           slug: 'childrens-short-breaks',      desc: 'Time-limited respite stays and outreach for disabled children, including children with SEND.' },
      { title: 'Family Support and Outreach',       slug: 'family-support-and-outreach', desc: 'Edge-of-care, early help and family support services delivered to children and families at home.' },
    ],
  },
  {
    num: '03',
    label: 'Housing and Support',
    desc: 'Housing-led services where the support function is contracted alongside or independent of accommodation.',
    color: '#0A6E5A',
    cards: [
      { title: 'Housing Related Support', slug: 'housing-related-support', desc: 'Floating support delivered to people in their own tenancies to sustain housing and prevent homelessness.' },
      { title: 'Temporary Accommodation', slug: 'temporary-accommodation', desc: 'Short-term accommodation for people in housing crisis, including families and single adults.' },
      { title: 'Emergency Accommodation', slug: 'emergency-accommodation', desc: 'Same-day emergency placement for people facing immediate homelessness or crisis.' },
      { title: 'Supported Housing',       slug: 'supported-housing',       desc: 'Long-term housing with on-site or visiting support for adults with mental health, substance misuse or learning disability needs.' },
    ],
  },
  {
    num: '04',
    label: 'Health and Clinical Services',
    desc: 'NHS-commissioned and joint-commissioned health services delivered in community, home or rehabilitation settings.',
    color: '#5B3A8B',
    cards: [
      { title: 'Community Health Services',       slug: 'community-health-services',         desc: 'Community-based clinical and nursing services delivered outside hospital settings.' },
      { title: 'Continuing Healthcare (CHC)',     slug: 'continuing-healthcare',             desc: 'Care commissioned by NHS ICBs for adults with primary health needs that meet CHC eligibility.' },
      { title: 'Complex Care',                    slug: 'complex-care',                      desc: 'Bespoke clinical and personal care for adults with complex health needs, often delivered 1:1 or 2:1.' },
      { title: 'Rehabilitation Services',         slug: 'rehabilitation-services',           desc: 'Multi-disciplinary rehabilitation following injury, illness or hospital admission.' },
      { title: 'End of Life and Palliative Care', slug: 'end-of-life-and-palliative-care',   desc: 'Care for adults in the final months of life, including symptom management and family support.' },
      { title: 'Hospital Discharge Services',     slug: 'hospital-discharge-services',       desc: 'Time-critical care commissioned to support safe discharge from hospital under the Discharge to Assess model.' },
    ],
  },
]

const COHORTS = [
  'Mental Health', 'Learning Disabilities', 'Autism', 'Substance Misuse',
  'Physical Disabilities', 'Older People', 'Forensic / High Risk',
]

export default function CareSettingsPage() {
  return (
    <main>

      {/* Hero */}
      <section className="cs-index-hero">
        <div className="container cs-index-hero__inner">
          <div className="cs-index-hero__kicker">Care Settings · UK Health and Social Care</div>
          <h1>Every commissioning route, every service model.</h1>
          <p className="cs-index-hero__lede">Adult Social Care · Children&apos;s Services · Housing and Support · Health and Clinical Services</p>
          <p className="cs-index-hero__sub">
            Twenty-eight specialised tender-writing pages mapped to how commissioners actually procure. Specialist cohorts (Mental Health, Learning Disability, Autism, Substance Misuse, Physical Disabilities, Older People, Forensic) appear as overlays across the categories below.
          </p>
        </div>
      </section>

      {/* Cohort row */}
      <section className="cs-cohort-row">
        <div className="container cs-cohort-row__inner">
          <span className="cs-cohort-label">Specialist cohorts:</span>
          {COHORTS.map((c) => (
            <span key={c} className="cs-cohort-tag">{c}</span>
          ))}
        </div>
      </section>

      {/* 4-category grid */}
      <section className="cs-categories-section">
        <div className="container">
          {CATEGORIES.map((cat) => (
            <div key={cat.num} className="cs-cat-block">
              <div className="cs-cat-header" style={{ '--cat-c': cat.color } as React.CSSProperties}>
                <div className="cs-cat-num">{cat.num}</div>
                <div>
                  <h2>{cat.label}</h2>
                  <p>{cat.desc}</p>
                </div>
              </div>
              <div className="cs-cat-grid">
                {cat.cards.map((card) => (
                  <Link
                    key={card.slug}
                    href={`/care-settings/${card.slug}`}
                    className="setting-card"
                    style={{ '--card-c': cat.color } as React.CSSProperties}
                  >
                    <div className="setting-card__accent" />
                    <div className="setting-card__tag">{cat.label}</div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <div className="setting-card__cta">View setting →</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Get Started</p>
          <h2 className="services-cta__headline">Ready to Win in Your Care Setting?</h2>
          <p className="services-cta__sub">
            Tell us which setting you&apos;re targeting and we&apos;ll show you exactly how we approach it.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Consultation</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
