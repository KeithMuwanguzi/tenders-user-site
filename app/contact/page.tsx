import type { Metadata } from 'next'
import { Suspense } from 'react'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import ContactForm, { type TenderEnquiryContext } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact TenderLab | Discuss a Health or Social Care Tender',
  description: 'Contact TenderLab about a live UK health or social care tender, bid review, readiness audit, mobilisation or retained tender support.',
  alternates: { canonical: '/contact' },
}

const faqs = [
  { q: 'What should we send with the enquiry?', a: 'Send the tender notice or procurement pack if available, the submission deadline, the lots you are considering and a short description of your current services.' },
  { q: 'How quickly will TenderLab respond?', a: 'We respond as soon as we can. Sharing the live deadline, scope and buyer documents helps us give a useful first response rather than a generic acknowledgement.' },
  { q: 'Can we speak before sharing the documents?', a: 'Yes. Call 01707 240393 or use the form to request a conversation. We will still need the buyer documents before confirming the work required.' },
  { q: 'Does submitting the form create an obligation?', a: 'No. The enquiry allows us to understand the opportunity and discuss scope. Work begins only after the proposed engagement has been agreed.' },
  { q: 'Can TenderLab help with a tender already in progress?', a: 'Yes, subject to capacity and the remaining deadline. Tell us what has already been completed so we can assess whether full writing or independent review is the responsible option.' },
]

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] || '' : value || ''

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams
  const initialContext: TenderEnquiryContext = {
    tenderTitle: first(query.tenderTitle) || first(query.tender),
    tenderDescription: first(query.tenderDescription),
    tenderUrl: first(query.tenderUrl),
    serviceType: first(query.serviceType),
    deadline: first(query.deadline),
    authority: first(query.authority),
  }

  return (
    <main className="ep-page">
      <EditorialHero
        eyebrow="Contact TenderLab"
        title="Share the opportunity and tell us where the work stands."
        intro="Send the notice or procurement pack, the deadline and a short description of your service. We will review the context and respond with a clear first view of the support required."
        image="/images/editorial/tenderlab-contact-briefing-hero-v1.webp"
        imageAlt="A care-provider director and tender specialist reviewing an opportunity during a first briefing"
        primaryLabel="Go to the enquiry form"
        primaryHref="#enquiry"
        secondaryLabel="Call 01707 240393"
        secondaryHref="tel:+441707240393"
        tone="yellow"
      />

      <section className="ep-section ep-contact" id="enquiry" tabIndex={-1}>
        <div className="ep-shell ep-contact__grid">
          <div className="ep-contact__form">
            <div className="ep-contact__heading">
              <div>
                <p className="ep-kicker">Your enquiry</p>
                <h2>Tell us about the tender.</h2>
              </div>
              <div className="ep-contact__thread" aria-hidden="true">
                <span>notice</span><i /><span>fit</span><i /><span>next step</span>
              </div>
            </div>
            <p className="ep-contact__lead">Share enough for us to understand the opportunity. We check the buyer documents and mandatory requirements before recommending any writing or review work.</p>
            <Suspense fallback={<div className="cf cf--loading" aria-label="Loading enquiry form" />}>
              <ContactForm initialContext={initialContext} />
            </Suspense>
          </div>
          <aside className="ep-contact__details">
            <div className="ep-contact-card ep-contact-card--blue">
              <p className="ep-kicker">Contact details</p>
              <a href="tel:+441707240393">01707 240393</a>
              <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
              <address>128 City Road<br />London EC1V 2NX</address>
            </div>
            <div className="ep-contact-card ep-contact-card--peach">
              <p className="ep-kicker">Independent profiles</p>
              <a href="https://g.page/r/CarBdrVY3WO4EBM/review" target="_blank" rel="noopener noreferrer">★★★★★ Google Reviews ↗</a>
              <a href="https://uk.trustpilot.com/review/tenderlab.co.uk" target="_blank" rel="noopener noreferrer">Trustpilot ↗</a>
              <a href="https://www.linkedin.com/company/tenderlabuk/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
            <div className="ep-contact-card ep-contact-card--cream">
              <p className="ep-kicker">A careful first response</p>
              <ol>
                <li>We read the enquiry and buyer documents.</li>
                <li>We check mandatory requirements, deadline and delivery fit.</li>
                <li>We explain whether and how TenderLab can responsibly help.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <EditorialFaq title="Questions before you contact us." items={faqs} />
    </main>
  )
}
