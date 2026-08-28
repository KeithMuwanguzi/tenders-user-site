import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Consultation Confirmed | TenderLab',
  description: 'Confirmation that a TenderLab consultation request and payment have been received.',
  alternates: { canonical: '/book-consultation/confirmation' },
  robots: { index: false, follow: false },
}

export default function ConsultationConfirmationPage() {
  return (
    <main className="booking-confirmation">
      <section>
        <p>Payment received</p>
        <h1>Your consultation request is confirmed.</h1>
        <p>TenderLab will email the booking details and confirm the appointment. If the meeting time needs adjustment, we will contact you directly.</p>
        <Link href="/">Return to TenderLab</Link>
      </section>
    </main>
  )
}
