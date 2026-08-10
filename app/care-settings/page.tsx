import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'

export const metadata: Metadata = {
  title: 'Care Sector Tender Writing UK | NHS and Local Authority Bids',
  description: 'Specialist tender writing for domiciliary care, supported living, children’s services, residential care, community health, complex care and housing support providers.',
  alternates: { canonical: '/care-settings' },
}

const groups = [
  {
    title: 'Adult social care',
    text: 'Tender writing for regulated and commissioned adult care services, where safe delivery, workforce, safeguarding and outcomes must be evidenced clearly.',
    links: [
      ['Domiciliary care', 'domiciliary-care'], ['Supported living', 'supported-living'], ['Residential care', 'residential-care'], ['Nursing care', 'nursing-care'], ['Live-in care', 'live-in-care'], ['Reablement services', 'reablement-services'], ['Extra care housing', 'extra-care-housing'], ['Day services', 'day-services'], ['Shared Lives', 'shared-lives'], ['Short breaks and respite', 'short-breaks-and-respite'], ['Outreach and community support', 'outreach-community-support'],
    ],
  },
  {
    title: 'Children’s services',
    text: 'Bid support for services operating within heightened safeguarding, regulatory and outcomes scrutiny across children’s social care.',
    links: [
      ['Children’s services overview', 'childrens-services'], ['Children’s residential care', 'childrens-residential-care'], ['Supported accommodation', 'supported-accommodation'], ['Fostering services', 'fostering-services'], ['Children’s short breaks', 'childrens-short-breaks'], ['Family support and outreach', 'family-support-and-outreach'], ['Leaving care services', 'leaving-care-services'],
    ],
  },
  {
    title: 'Health and clinical services',
    text: 'Procurement support for NHS, ICB and local authority services where clinical governance, pathways, integration and measurable outcomes carry significant weight.',
    links: [
      ['Community health services', 'community-health-services'], ['Complex care and continuing healthcare', 'complex-care-and-continuing-healthcare'], ['Continuing healthcare', 'continuing-healthcare'], ['Complex care', 'complex-care'], ['Hospital discharge services', 'hospital-discharge-services'], ['Mental health services', 'mental-health-services'], ['Crisis and rapid response', 'crisis-rapid-response'], ['Substance misuse services', 'substance-misuse-services'], ['Rehabilitation services', 'rehabilitation-services'], ['End of life and palliative care', 'end-of-life-and-palliative-care'],
    ],
  },
  {
    title: 'Housing and support',
    text: 'Tender writing for accommodation and community support models that combine housing management, safeguarding, independence and social value.',
    links: [
      ['Housing-related support', 'housing-related-support'], ['Supported housing', 'supported-housing'], ['Temporary accommodation', 'temporary-accommodation'], ['Emergency accommodation', 'emergency-accommodation'],
    ],
  },
  {
    title: 'Specialist support',
    text: 'Tender support for services where specialist communication, workforce competence, risk management and person-centred outcomes must be demonstrated in detail.',
    links: [
      ['Autism services', 'autism-services'], ['Learning disability services', 'learning-disability-services'],
    ],
  },
] as const

const faqs = [
  { q: 'Which care settings does TenderLab support?', a: 'TenderLab supports adult social care, children’s services, health and clinical services, and housing support. The individual pages explain the service models and procurement priorities within each setting.' },
  { q: 'Why does the care setting matter to tender writing?', a: 'The buyer’s priorities, regulator, statutory framework, service risks and acceptable evidence change between settings. A strong response must use the correct operational language and proof for the commissioned service.' },
  { q: 'Can one tender cover several care settings?', a: 'Yes. Frameworks and open arrangements may contain several lots. We maintain shared company evidence while adapting the service model, case examples and regulatory framing for each lot.' },
  { q: 'Can TenderLab support a new service area?', a: 'Possibly, but the tender must fit the provider’s genuine capability, registration, evidence and mobilisation position. Writing cannot responsibly replace missing eligibility or operational capacity.' },
]

export default function CareSettingsPage() {
  const allLinks: ReadonlyArray<readonly [string, string]> = groups.flatMap(
    group => Array.from(group.links as readonly (readonly [string, string])[]),
  )
  return (
    <main className="ep-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'UK care sector tender writing', url: 'https://www.tenderlab.co.uk/care-settings',
        mainEntity: { '@type': 'ItemList', itemListElement: allLinks.map(([name, slug], index) => ({ '@type': 'ListItem', position: index + 1, name, url: `https://www.tenderlab.co.uk/care-settings/${slug}` })) },
      }) }} />
      <EditorialHero
        eyebrow="Care sector tender writing"
        title="Sector knowledge matters when the evaluator tests delivery."
        intro="Explore specialist tender support across the care settings commissioned by councils, NHS organisations and integrated care boards throughout the UK."
        image="/images/editorial/tenderlab-adult-social-care-hero-v1.png"
        imageAlt="Care delivery, provider leadership and operational evidence connected in an editorial collage"
        primaryLabel="Discuss your care tender"
        primaryHref="/contact#enquiry"
        secondaryLabel="Browse the care settings"
        secondaryHref="#care-settings"
        tone="cream"
      />

      <section className="ep-section ep-sectors" id="care-settings">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div><p className="ep-kicker">Care settings</p><h2>Find the page that matches the commissioned service.</h2></div>
            <p>Each page is a useful destination in its own right, with sector scope, evaluation priorities, relevant services and internal links to related tenders and evidence.</p>
          </div>
          <div className="ep-sector-groups">
            {groups.map((group, index) => (
              <article className="ep-sector-group" key={group.title}>
                <div className="ep-sector-group__head">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h2>{group.title}</h2><p>{group.text}</p></div>
                </div>
                <div className="ep-sector-group__links">
                  {group.links.map(([name, slug]) => <Link href={`/care-settings/${slug}`} key={slug}>{name}<span aria-hidden="true">↗</span></Link>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <EditorialFaq title="Questions about care sector tender writing." items={faqs} />
    </main>
  )
}
