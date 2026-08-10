import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, careSettingFaq, faqSchema, serviceSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Children's Services Tender Writing UK | TenderLab",
  description:
    "Specialist tender writing for children's residential care, supported accommodation, fostering, short breaks, family support and leaving care services.",
  alternates: { canonical: '/care-settings/childrens-services' },
}

const settings = [
  ['Children’s residential care', 'childrens-residential-care', 'Safeguarding, therapeutic support, workforce stability and Ofsted-aligned practice.'],
  ['Supported accommodation', 'supported-accommodation', 'Key-work, independence, safeguarding and measurable move-on pathways for young people.'],
  ['Fostering services', 'fostering-services', 'Carer recruitment, matching, placement stability, support and quality assurance.'],
  ['Children’s short breaks', 'childrens-short-breaks', 'Safe, flexible support that evidences outcomes for children and families.'],
  ['Family support and outreach', 'family-support-and-outreach', 'Early help, whole-family practice, multi-agency working and measurable change.'],
  ['Leaving care services', 'leaving-care-services', 'Pathway planning, tenancy sustainment, education, employment and enduring support.'],
] as const

const faqs = careSettingFaq({ label: "children's services" })
const faqItems = faqs.map(item => ({ q: item.question, a: item.answer }))

export default function ChildrensServicesPage() {
  return (
    <main className="ep-page">
      <JsonLd
        idPrefix="ld-childrens-services"
        data={[
          serviceSchema({
            name: "Children's services tender writing",
            description:
              "Tender writing for children's services commissioned by local authorities and public-sector partners.",
            path: '/care-settings/childrens-services',
            serviceType: 'Tender writing',
            audienceType: "UK children's services providers",
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Care settings', path: '/care-settings' },
            { name: "Children's services", path: '/care-settings/childrens-services' },
          ]),
        ]}
      />

      <EditorialHero
        eyebrow="Children's services procurement"
        title="Children's services tender writing"
        intro="We help providers evidence safeguarding, workforce competence, child-centred practice, multi-agency working and outcomes in the language of the specification and scoring method."
        image="/images/editorial/tenderlab-childrens-services-hero-v1.webp"
        imageAlt="A family-support professional discussing a plan at home, linked to safe accommodation and children’s service evidence"
        primaryLabel="Ask us to assess a tender"
        primaryHref="/contact"
        secondaryLabel="Browse children’s settings"
        secondaryHref="#childrens-settings"
        tone="peach"
      />

      <section className="ep-section ep-care-hub" id="childrens-settings">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Choose the service model</p>
              <h2>Write for the child, the service and the evaluator.</h2>
            </div>
            <p>
              Children’s procurement carries distinct statutory, regulatory and
              safeguarding expectations. Each setting below leads to a focused page,
              not a recycled adult-care description.
            </p>
          </div>
          <div className="ep-care-hub__grid ep-care-hub__grid--six">
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

      <section className="ep-section ep-care-hub-proof ep-care-hub-proof--yellow">
        <div className="ep-shell ep-care-hub-proof__grid">
          <div>
            <p className="ep-kicker">Evidence before claims</p>
            <h2>Safeguarding language must describe a working system.</h2>
          </div>
          <div>
            <p>
              A strong response names responsibilities, escalation routes, records,
              oversight and learning. We work from the provider’s actual practice and
              identify gaps that writing alone cannot responsibly conceal.
            </p>
            <Link href="/case-studies" className="ep-link">
              Inspect documented case studies <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <EditorialFaq title="Questions about children’s services tenders" items={faqItems} />
    </main>
  )
}
