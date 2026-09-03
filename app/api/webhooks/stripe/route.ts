import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { notifyPaidConsultation } from '@/lib/consultation-notifications'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !webhookSecret) return NextResponse.json({ error: 'Stripe webhook is not configured.' }, { status: 503 })

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret)
  } catch (error) {
    console.error('[stripe webhook signature]', error)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.payment_status === 'paid') {
      const metadata = session.metadata || {}
      const record = { bookingReference: metadata.bookingReference, consultationId: metadata.consultationId, serviceTitle: metadata.serviceTitle, duration: metadata.duration, attendees: metadata.attendees, organisation: metadata.organisation, phone: metadata.phone, contactName: metadata.contactName, email: session.customer_details?.email || session.customer_email || '', stripeSessionId: session.id, paidAt: new Date().toISOString(), paymentStatus: 'paid', schedulingStatus: metadata.duration === 'Written briefing' ? 'not-required' : 'awaiting-calendar-selection' }
      if (process.env.BLOB_READ_WRITE_TOKEN && metadata.bookingReference) await put(`consultations/${metadata.bookingReference}/payment.json`, JSON.stringify(record,null,2), { access:'private', contentType:'application/json', addRandomSuffix:false })
      try { await notifyPaidConsultation(record) } catch (error) { console.error('[paid consultation notification]', error) }
    }
  }

  return NextResponse.json({ received: true })
}
