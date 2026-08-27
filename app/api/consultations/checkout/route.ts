import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { CONSULTATION_BY_ID } from '@/lib/consultations'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

type BookingBody = { bookingReference?: string; consultationId?: string; date?: string; time?: string; attendees?: number; details?: { firstName?: string; lastName?: string; email?: string; phone?: string; organisation?: string; notes?: string }; documents?: Array<{ name?: string; pathname?: string; url?: string }> }
const BANK_HOLIDAYS = new Set(['2026-01-01','2026-04-03','2026-04-06','2026-05-04','2026-05-25','2026-08-31','2026-12-25','2026-12-28','2027-01-01','2027-03-26','2027-03-29','2027-05-03','2027-05-31','2027-08-30','2027-12-27','2027-12-28'])
const TIMES = new Set(['10:00','11:00','12:00','13:00','14:00','15:00','16:00'])
const clean = (value: unknown, max = 500) => String(value || '').trim().slice(0, max)

function validWorkingDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || BANK_HOLIDAYS.has(value)) return false
  const day = new Date(`${value}T12:00:00`).getDay()
  return day !== 0 && day !== 6
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody
    const consultation = CONSULTATION_BY_ID.get(clean(body.consultationId, 80))
    if (!consultation) return NextResponse.json({ error: 'Choose a valid consultation.' }, { status: 400 })
    const bookingReference = clean(body.bookingReference, 36)
    const details = { firstName: clean(body.details?.firstName,100), lastName: clean(body.details?.lastName,100), email: clean(body.details?.email,254), phone: clean(body.details?.phone,50), organisation: clean(body.details?.organisation,180), notes: clean(body.details?.notes,2000) }
    const date = clean(body.date,10)
    const time = clean(body.time,5)
    const attendees = Number.isInteger(body.attendees) && Number(body.attendees) >= 1 && Number(body.attendees) <= 6 ? Number(body.attendees) : 1
    if (!/^[0-9a-f-]{36}$/i.test(bookingReference) || !details.firstName || !details.lastName || !/^\S+@\S+\.\S+$/.test(details.email) || !details.phone || !details.organisation || !validWorkingDate(date) || !TIMES.has(time)) return NextResponse.json({ error: 'Complete all required booking details and choose an available weekday.' }, { status: 400 })

    const documents = (Array.isArray(body.documents) ? body.documents : []).slice(0,5).map((document) => ({ name: clean(document.name,220), pathname: clean(document.pathname,500), url: clean(document.url,900) }))
    if (consultation.documentsRequired && documents.length === 0) return NextResponse.json({ error: 'This service requires documents at booking.' }, { status: 400 })
    if (documents.some((document) => !document.pathname.startsWith(`consultations/${bookingReference}/`) || !/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(document.url))) return NextResponse.json({ error: 'One or more document references are invalid.' }, { status: 400 })
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Secure payment is not configured on this preview yet. Your card has not been charged.' }, { status: 503 })

    const record = { bookingReference, consultationId: consultation.id, serviceTitle: consultation.title, price: consultation.price, date, time, attendees, details, documents, createdAt: new Date().toISOString(), paymentStatus: 'checkout-created' }
    if (process.env.BLOB_READ_WRITE_TOKEN) await put(`consultations/${bookingReference}/booking.json`, JSON.stringify(record,null,2), { access:'private', contentType:'application/json', addRandomSuffix:false })

    const origin = new URL(request.url).origin
    const checkout = await getStripe().checkout.sessions.create({
      mode: 'payment',
      success_url: `${origin}/book-consultation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book-consultation?cancelled=1`,
      customer_email: details.email,
      line_items: [{ quantity: 1, price_data: { currency: 'gbp', unit_amount: consultation.price * 100, product_data: { name: consultation.title, description: `${consultation.duration}. ${consultation.description}`.slice(0,500) } } }],
      metadata: { bookingReference, consultationId:consultation.id, serviceTitle:consultation.title, preferredDate:date, preferredTime:time, attendees:String(attendees), organisation:details.organisation, phone:details.phone, contactName:`${details.firstName} ${details.lastName}`, documentCount:String(documents.length) },
    })
    if (!checkout.url) return NextResponse.json({ error:'Secure payment could not be started. Please try again or contact TenderLab.' }, { status:502 })
    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error('[consultation checkout]', error)
    return NextResponse.json({ error:'The booking could not be started. Please try again.' }, { status:500 })
  }
}
