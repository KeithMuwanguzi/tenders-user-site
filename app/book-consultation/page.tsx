import type { Metadata } from 'next'
import ConsultationFlow from './ConsultationFlow'
import { CONSULTATIONS } from '@/lib/consultations'

export const metadata: Metadata = {
  title: 'Book a Tender Consultation | TenderLab',
  description: 'Book a free 30-minute tender consultation or choose fixed-fee bid feedback, tender readiness and briefing support from TenderLab.',
  alternates: { canonical: '/book-consultation' },
}

export default function BookConsultationPage() {
  return <main className="booking-page"><ConsultationFlow consultations={CONSULTATIONS} /></main>
}
