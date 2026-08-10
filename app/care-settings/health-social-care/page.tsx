import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, careSettingFaq, faqSchema, serviceSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Health and Social Care Tender Writing UK | TenderLab',
  description:
    'Specialist tender writing for integrated health and social care services commissioned by councils, NHS organisations and integrated care boards.',
  alternates: { canonical: '/care-settings/health-social-care' },
}

const settings = [
  ['Domiciliary care', 'domiciliary-care', 'Visit-based care delivered safely and consistently in people’s homes.'],
  ['Live-in care', 'live-in-care', 'Continuous home-based support, rest arrangements and reliable handovers.'],
  ['Residential care', 'residential-care', 'Quality of life, workforce, safeguarding and registered service leadership.'],
  ['Nursing care', 'nursing-care', 'Clinical governance, registered nursing oversight and complex health needs.'],
  ['Continuing healthcare', 'continuing-healthcare', 'NHS-funded packages, clinical pathways and multidisciplinary coordination.'],
  ['Complex care', 'complex-care', 'High-acuity support, clinical controls, contingency and competent staffing.'],
  ['Reablement services', 'reablement-services', 'Time-limited support with measurable independence and recovery outcomes.'],
  ['Hospital discharge', 'hospital-discharge-services', 'Safe transfers, rapid mobilisation and joined-up discharge pathways.'],
] as const

const faqs = careSettingFaq({ label: 'health and social care' })
const faqItems = faqs.map(item => ({ q: item.question, a: item.answer }))

export default function HealthSocialCarePage() {
  return (
    <main className="ep-page">
      <JsonLd
        idPrefix="ld-health-social-care"
        data={[
          serviceSchema({
            name: 'Health and social care tender writing',
            description:
              'Tender writing for integrated health and social care contracts commissioned by councils, ICBs and NHS organisations.',
            path: '/care-settings/health-social-care',
            serviceType: 'Tender writing',
            audienceType: 'UK health and social care providers',
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Care settings', path: '/care-settings' },
            { name: 'Health and social care', path: '/care-settings/health-social-care' },
          ]),
        ]}
      />

      <EditorialHero
        eyebrow="Integrated care procurement"
        title="Health and social care tender writing"
        intro="We help providers turn clinical governance, safeguarding, workforce controls, referral pathways and service outcomes into submissions that answer the buyer’s scored requirements."
        image="/images/editorial/tenderlab-community-health-hero-v1.webp"
        imageAlt="A community nurse supporting a person at home, linked to multidisciplinary review and clinical governance evidence"
        primaryLabel="Ask us to assess a tender"
        primaryHref="/contact"
        secondaryLabel="Browse the care settings"
        secondaryHref="#health-care-settings"
        tone="blue"
      />

      <section className="ep-section ep-care-hub" id="health-care-settings">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Choose the commissioned service</p>
              <h2>The evidence changes with the care model.</h2>
            </div>
            <p>
              A community health response should not read like a domiciliary care bid.
              Select the service that matches the opportunity to see its procurement
              context, operational requirements and related evidence.
            </p>
          </div>
          <div className="ep-care-hub__grid">
            {settings.map(([name, slug, description], index) => (
              <Link href={`/care-settings/${slug}`} key={slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <strong>Explore this setting ↗</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-care-hub-proof">
        <div className="ep-shell ep-care-hub-proof__grid">
          <div>
            <p className="ep-kicker">Before full writing begins</p>
            <h2>First test the contract against the provider.</h2>
          </div>
          <div>
            <p>
              We check the published conditions, regulated activity, geography,
              workforce, clinical or operational evidence, mobilisation and commercial
              position. If a material requirement is not met, we explain it before
              asking the team to invest in a full response.
            </p>
            <Link href="/services/tender-readiness-audit" className="ep-link">
              Explore tender readiness <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <EditorialFaq title="Questions about health and social care tenders" items={faqItems} />
    </main>
  )
}
