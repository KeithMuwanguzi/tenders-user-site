import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { put } from '@vercel/blob'
import { CONSULTATION_BY_ID } from '@/lib/consultations'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

type BookingBody = {
  bookingReference?: string
  consultationId?: string
  date?: string
  time?: string
  details?: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    organisation?: string
    notes?: string
  }
  documents?: Array<{ name?: string; pathname?: string; url?: string }>
}

function clean(value: unknown, max = 500) {
  return String(value || '').trim().slice(0, max)
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character)
}

async function notifyTenderLab(record: Record<string, unknown>) {
  const user = process.env.SMTP_USER || ''
  const pass = process.env.SMTP_PASS || ''
  if (!user || !pass) return
  const details = record.details as Record<string, string>
  const documents = record.documents as Array<{ name: string; pathname: string }>
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  })
  const rows = [
    ['Reference', clean(record.bookingReference)],
    ['Service', clean(record.serviceTitle)],
    ['Preferred date', clean(record.date)],
    ['Preferred time', clean(record.time)],
    ['Name', `${details.firstName} ${details.lastName}`],
    ['Organisation', details.organisation],
    ['Email', details.email],
    ['Telephone', details.phone],
    ['Notes', details.notes || 'None supplied'],
    ['Documents', documents.length ? documents.map((document) => `${document.name} (${document.pathname})`).join('\n') : 'None supplied'],
  ]
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = rows.map(([label, value]) => `<tr><th align="left" style="padding:8px 12px;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || 'TenderLab Website'}" <${user}>`,
    to: process.env.INQUIRY_TO || 'info@tenderlab.co.uk',
    replyTo: details.email,
    subject: `Consultation booking: ${clean(record.serviceTitle)} · ${details.organisation}`,
    text,
    html: `<h1>New consultation booking</h1><table>${html}</table>`,
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody
    const consultation = CONSULTATION_BY_ID.get(clean(body.consultationId, 80))
    if (!consultation) return NextResponse.json({ error: 'Choose a valid consultation.' }, { status: 400 })

    const bookingReference = clean(body.bookingReference, 36)
    const details = {
      firstName: clean(body.details?.firstName, 100),
      lastName: clean(body.details?.lastName, 100),
      email: clean(body.details?.email, 254),
      phone: clean(body.details?.phone, 50),
      organisation: clean(body.details?.organisation, 180),
      notes: clean(body.details?.notes, 2000),
    }
    const date = clean(body.date, 10)
    const time = clean(body.time, 5)

    if (!/^[0-9a-f-]{36}$/i.test(bookingReference) || !details.firstName || !details.lastName || !/^\S+@\S+\.\S+$/.test(details.email) || !details.phone || !details.organisation || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ error: 'Complete all required booking details.' }, { status: 400 })
    }

    const documents = (Array.isArray(body.documents) ? body.documents : []).slice(0, 5).map((document) => ({
      name: clean(document.name, 220),
      pathname: clean(document.pathname, 500),
      url: clean(document.url, 900),
    }))
    if (consultation.documentsRequired && documents.length === 0) return NextResponse.json({ error: 'This service requires documents at booking.' }, { status: 400 })
    if (documents.some((document) => !document.pathname.startsWith(`consultations/${bookingReference}/`) || !/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(document.url))) {
      return NextResponse.json({ error: 'One or more document references are invalid.' }, { status: 400 })
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: 'Secure booking storage is not configured on this preview yet.' }, { status: 503 })

    const record = {
      bookingReference,
      consultationId: consultation.id,
      serviceTitle: consultation.title,
      price: consultation.price,
      date,
      time,
      details,
      documents,
      createdAt: new Date().toISOString(),
      paymentStatus: consultation.free ? 'not-required' : 'checkout-created',
    }
    await put(`consultations/${bookingReference}/booking.json`, JSON.stringify(record, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    try {
      await notifyTenderLab(record)
    } catch (error) {
      console.error('[consultation notification]', error)
    }

    const origin = new URL(request.url).origin
    if (consultation.free) {
      const params = new URLSearchParams({ booking: bookingReference, service: consultation.title, date, time })
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
    const metadata = {
      bookingReference,
      consultationId: consultation.id,
      preferredDate: date,
      preferredTime: time,
      organisation: details.organisation,
      phone: details.phone,
      contactName: `${details.firstName} ${details.lastName}`,
      documentCount: String(documents.length),
    }
    Object.entries(metadata).forEach(([key, value]) => payload.set(`metadata[${key}]`, value))
    const checkout = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload,
    })
    const result = await checkout.json()
    if (!checkout.ok || !result.url) return NextResponse.json({ error: 'Secure payment could not be started. Please try again or contact TenderLab.' }, { status: 502 })
    return NextResponse.json({ url: result.url })
  } catch (error) {
    console.error('[consultation checkout]', error)
    return NextResponse.json({ error: 'The booking could not be started. Please try again.' }, { status: 500 })
  }
}
