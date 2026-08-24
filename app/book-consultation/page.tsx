import type { Metadata } from 'next'
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
      <ConsultationFlow consultations={CONSULTATIONS} />
    </main>
  )
}
