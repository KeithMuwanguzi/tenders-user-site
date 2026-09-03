import type { Metadata } from 'next'
import Link from 'next/link'
import CalendlyScheduler from './CalendlyScheduler'
import { CONSULTATION_BY_ID } from '@/lib/consultations'
import { getStripe } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Consultation Confirmed | TenderLab',
  description: 'Confirmation that a TenderLab consultation request has been received.',
  alternates: { canonical: '/book-consultation/confirmation' },
  robots: { index: false, follow: false },
}

export default async function ConsultationConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ free?: string; session_id?: string; booking_reference?: string; consultation?: string }>
}) {
  const params = await searchParams
  const bookingReference = String(params.booking_reference || '').slice(0, 36)
  const consultationId = String(params.consultation || '').slice(0, 80)
  const consultation = CONSULTATION_BY_ID.get(consultationId)
  const isFree = params.free === '1' && consultation?.price === 0
  let paymentVerified = false
  if (!isFree && params.session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(params.session_id)
      paymentVerified = session.payment_status === 'paid' && session.metadata?.bookingReference === bookingReference && session.metadata?.consultationId === consultationId
    } catch (error) {
      console.error('[consultation confirmation]', error)
    }
  }
  const confirmed = Boolean(consultation && /^[0-9a-f-]{36}$/i.test(bookingReference) && (isFree || paymentVerified))
  const calendlyUrls: Record<string, string | undefined> = {
    'tender-consultation': process.env.NEXT_PUBLIC_CALENDLY_URL,
    'bid-feedback-debrief': process.env.NEXT_PUBLIC_CALENDLY_BID_FEEDBACK_URL,
    'tender-readiness-review': process.env.NEXT_PUBLIC_CALENDLY_READINESS_URL,
  }
  const calendlyUrl = consultation ? calendlyUrls[consultation.id] : undefined
  return (
    <main className="booking-confirmation">
      <section>
        <p>{confirmed ? (isFree ? 'Booking received' : 'Payment received') : 'Confirmation unavailable'}</p>
        <h1>{confirmed ? `${consultation?.title} confirmed.` : 'We could not verify this booking.'}</h1>
        <p>{confirmed ? (consultation?.duration === 'Written briefing' ? 'TenderLab has received the briefing request and will contact you about the documents and delivery date.' : 'Complete the final calendar step below to reserve the appointment and receive the meeting invitation.') : 'Return to the booking page and try again. No unverified payment is treated as a confirmed booking.'}</p>
        <Link href="/">Return to TenderLab</Link>
      </section>
      {confirmed && calendlyUrl && consultation?.duration !== 'Written briefing' ? <CalendlyScheduler calendlyUrl={calendlyUrl} /> : null}
      {confirmed && !calendlyUrl && consultation?.duration !== 'Written briefing' ? <section className="booking-calendar booking-calendar--unavailable"><h2>Calendar connection required</h2><p>The booking is recorded, but TenderLab’s Calendly event has not yet been connected. We will contact you to arrange the appointment.</p></section> : null}
    </main>
  )
}
