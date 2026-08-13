import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { CONSULTATION_BY_ID } from '@/lib/consultations'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const MAX_FILES = 5
const MAX_FILE_BYTES = 10 * 1024 * 1024
const ALLOWED = new Set(['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/zip','application/x-zip-compressed'])

function text(form: FormData, key: string, max = 500) { return String(form.get(key) || '').trim().slice(0, max) }

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const consultation = CONSULTATION_BY_ID.get(text(form, 'consultationId', 80))
    if (!consultation) return NextResponse.json({ error: 'Choose a valid consultation.' }, { status: 400 })
    const details = {
      firstName: text(form, 'firstName', 100), lastName: text(form, 'lastName', 100), email: text(form, 'email', 254),
      phone: text(form, 'phone', 50), organisation: text(form, 'organisation', 180), notes: text(form, 'notes', 2000),
      date: text(form, 'date', 20), time: text(form, 'time', 20),
    }
    if (!details.firstName || !details.lastName || !/^\S+@\S+\.\S+$/.test(details.email) || !details.phone || !details.organisation || !details.date) {
      return NextResponse.json({ error: 'Complete all required booking details.' }, { status: 400 })
    }
    const documents = form.getAll('documents').filter((value): value is File => value instanceof File && value.size > 0)
    if (consultation.documentsRequired && documents.length === 0) return NextResponse.json({ error: 'This service requires documents at booking.' }, { status: 400 })
    if (documents.length > MAX_FILES) return NextResponse.json({ error: 'Upload no more than five files.' }, { status: 400 })
    for (const file of documents) {
      if (file.size > MAX_FILE_BYTES || !ALLOWED.has(file.type)) return NextResponse.json({ error: `The file ${file.name} is not an accepted type or is larger than 10 MB.` }, { status: 400 })
    }

    const bookingReference = crypto.randomUUID()
    const uploaded: string[] = []
    if (documents.length && process.env.BLOB_READ_WRITE_TOKEN) {
      for (const file of documents) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const blob = await put(`consultations/${bookingReference}/${safeName}`, file, { access: 'private', addRandomSuffix: false })
        uploaded.push(blob.url)
      }
    } else if (documents.length) {
      return NextResponse.json({ error: 'Secure document upload is not configured on this preview yet. Please contact TenderLab so we can receive the documents safely.' }, { status: 503 })
    }

    const origin = new URL(request.url).origin
    if (consultation.free) {
      const params = new URLSearchParams({ booking: bookingReference, service: consultation.title, date: details.date, time: details.time })
      return NextResponse.json({ url: `${origin}/book-consultation/confirmation?${params}` })
    }
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Secure payment is not configured on this preview yet. Your details have not been charged.' }, { status: 503 })

    const payload = new URLSearchParams()
    payload.set('mode', 'payment')
    payload.set('success_url', `${origin}/book-consultation/confirmation?session_id={CHECKOUT_SESSION_ID}`)
    payload.set('cancel_url', `${origin}/book-consultation?cancelled=1`)
    payload.set('customer_email', details.email)
    payload.set('line_items[0][quantity]', '1')
    payload.set('line_items[0][price_data][currency]', 'gbp')
    payload.set('line_items[0][price_data][unit_amount]', String(consultation.price * 100))
    payload.set('line_items[0][price_data][product_data][name]', consultation.title)
    payload.set('line_items[0][price_data][product_data][description]', `${consultation.duration}. ${consultation.description}`.slice(0, 500))
    Object.entries({ bookingReference, consultationId: consultation.id, preferredDate: details.date, preferredTime: details.time, organisation: details.organisation, phone: details.phone, documentCount: String(uploaded.length) }).forEach(([key, value]) => payload.set(`metadata[${key}]`, value))
    const checkout = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload })
    const result = await checkout.json()
    if (!checkout.ok || !result.url) return NextResponse.json({ error: 'Secure payment could not be started. Please try again or contact TenderLab.' }, { status: 502 })
    return NextResponse.json({ url: result.url })
  } catch (error) {
    console.error('[consultation checkout]', error)
    return NextResponse.json({ error: 'The booking could not be started. Please try again.' }, { status: 500 })
  }
}
