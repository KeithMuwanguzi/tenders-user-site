import type { Metadata } from 'next'
import Image from 'next/image'
import ConsultationFlow from './ConsultationFlow'
import { CONSULTATIONS } from '@/lib/consultations'

export const metadata: Metadata = {
  title: 'Book a Tender Consultation | TenderLab',
  description: 'Book focused tender advice, a bid feedback debrief, a tender readiness review or an opportunity-specific tender briefing with TenderLab.',
  alternates: { canonical: '/book-consultation' },
}

export default function BookConsultationPage() {
  return (
    <main className="booking-page">
      <section className="booking-hero">
        <div><p className="campaign-eyebrow">Focused tender advice</p><h1>Choose the work you need before choosing a time.</h1><p>Each option has a clear preparation requirement, fixed price and defined outcome. Higher prices reflect the document review completed before your session or written briefing.</p></div>
        <figure><Image src="/design-v4/images/service-viability.png" alt="A TenderLab specialist examining a public-sector tender pack before advising a care provider" fill priority sizes="(max-width: 850px) 100vw, 50vw" /></figure>
      </section>
      <ConsultationFlow consultations={CONSULTATIONS} />
    </main>
  )
}
