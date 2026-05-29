import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * Inquiry relay endpoint for the TenderLab website contact form.
 *
 * Two independent delivery channels protect against either failing:
 *
 *   1) Email  — sent via Gmail SMTP to INQUIRY_TO. Always-on Vercel runtime
 *               talking to Gmail makes this the guaranteed channel.
 *
 *   2) Portal API — forwarded to the FastAPI backend so it appears in the
 *                   admin portal. Wrapped in a retry loop with a tight
 *                   timeout so a Render free-tier cold start doesn't kill
 *                   the inquiry. We mark the request with a header so the
 *                   API skips its own email-sending and we don't duplicate.
 *
 * The handler returns success as soon as the email is sent. The DB forward
 * runs after that; if it ultimately fails the team still has the inquiry
 * in their inbox.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Allow up to 60s on Vercel — gives the Render free-tier API time to wake
// from cold start (~30s) without us giving up. Email send is much faster.
export const maxDuration = 60

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'TenderLab Website'
const INQUIRY_TO = process.env.INQUIRY_TO || 'info@tenderlab.co.uk'
const PORTAL_API_URL =
  process.env.PORTAL_API_URL || 'https://tenderlab-admin-api.onrender.com'
const PORTAL_ADMIN_URL =
  process.env.PORTAL_ADMIN_URL || 'https://tenderlab-admin-portal.vercel.app'

interface InquiryPayload {
  name: string
  email: string
  phone?: string | null
  org?: string | null
  serviceType?: string
  deadline?: string
  authority?: string
  howFound?: string
  message?: string
}

interface PortalInquiry {
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string
  message: string
}

function buildPortalInquiry(data: InquiryPayload): PortalInquiry {
  const detailLines = [
    `Service type: ${data.serviceType || 'Not specified'}`,
    `Submission deadline: ${data.deadline || 'Not specified'}`,
    `Commissioning authority: ${data.authority || 'Not specified'}`,
    `How they found TenderLab: ${data.howFound || 'Not specified'}`,
  ]
  const messageBody = (data.message || '').trim()
  const fullMessage = [messageBody, '', '---', ...detailLines].join('\n')

  return {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    company: data.org || null,
    subject: `Tender Enquiry — ${data.serviceType || 'General'}`,
    message: fullMessage,
  }
}

function buildEmailContent(data: InquiryPayload, portal: PortalInquiry) {
  const subject = `New TenderLab Enquiry — ${data.serviceType || 'General'}${
    data.org ? ` — ${data.org}` : ''
  }`

  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Organisation', data.org || '—'],
    ['Service type', data.serviceType || '—'],
    ['Submission deadline', data.deadline || '—'],
    ['Commissioning authority', data.authority || '—'],
    ['How they found TenderLab', data.howFound || '—'],
  ]

  const text = [
    'A new enquiry has been received via tenderlab.co.uk',
    '',
    ...rows.map(([k, v]) => `${k.padEnd(26)}: ${v}`),
    '',
    'Message:',
    '--------',
    (data.message || '(no message)').trim(),
    '',
    `Open the portal: ${PORTAL_ADMIN_URL}/enquiries`,
  ].join('\n')

  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const tableRows = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${escape(
          k,
        )}</td>
        <td style="padding:6px 0;color:#111827;font-size:14px">${escape(v)}</td>
      </tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;background:#fef2f2;">
        <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#991b1b;font-weight:600;">New website enquiry</p>
        <h1 style="margin:6px 0 0;font-size:18px;color:#111827;">${escape(
          portal.subject,
        )}</h1>
      </div>
      <div style="padding:20px 24px;">
        <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
        <div style="margin-top:20px;padding-top:18px;border-top:1px solid #f3f4f6;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;font-weight:600;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escape(
            (data.message || '(no message)').trim(),
          )}</p>
        </div>
        <div style="margin-top:24px;">
          <a href="${PORTAL_ADMIN_URL}/enquiries"
             style="display:inline-block;padding:9px 16px;background:#111827;color:#fff;font-size:13px;font-weight:500;border-radius:6px;text-decoration:none;">
             Open in portal →
          </a>
          <a href="mailto:${escape(data.email)}?subject=Re: ${escape(
            portal.subject,
          )}"
             style="display:inline-block;padding:9px 16px;margin-left:6px;background:#fff;color:#111827;font-size:13px;font-weight:500;border:1px solid #e5e7eb;border-radius:6px;text-decoration:none;">
             Reply by email
          </a>
        </div>
      </div>
      <div style="padding:14px 24px;background:#f9fafb;border-top:1px solid #f3f4f6;">
        <p style="margin:0;font-size:11px;color:#9ca3af;">Sent automatically by tenderlab.co.uk</p>
      </div>
    </div>
  </body>
</html>`

  return { subject, text, html }
}

async function sendInquiryEmail(
  data: InquiryPayload,
  portal: PortalInquiry,
): Promise<{ ok: boolean; error?: string }> {
  if (!SMTP_USER || !SMTP_PASS) {
    return { ok: false, error: 'SMTP credentials not configured' }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const { subject, text, html } = buildEmailContent(data, portal)

  try {
    await transporter.sendMail({
      from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
      to: INQUIRY_TO,
      replyTo: data.email,
      subject,
      text,
      html,
    })
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[inquiries] email send failed:', message)
    return { ok: false, error: message }
  }
}

async function forwardToPortalApi(
  portal: PortalInquiry,
): Promise<{ ok: boolean; status?: number; error?: string }> {
  const url = `${PORTAL_API_URL.replace(/\/$/, '')}/api/inquiries/`

  // Two attempts: the first generously covers a Render free-tier cold start
  // (~30s), the second handles a transient failure right after wake-up.
  const attempts: Array<{ timeoutMs: number; preDelayMs: number }> = [
    { timeoutMs: 35000, preDelayMs: 0 },
    { timeoutMs: 15000, preDelayMs: 1500 },
  ]

  let lastError = ''
  for (let i = 0; i < attempts.length; i++) {
    const { timeoutMs, preDelayMs } = attempts[i]
    if (preDelayMs > 0) {
      await new Promise((r) => setTimeout(r, preDelayMs))
    }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Inquiry-Source': 'website-relay',
        },
        body: JSON.stringify(portal),
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      if (res.ok) return { ok: true, status: res.status }
      lastError = `HTTP ${res.status}`
      console.warn(
        `[inquiries] forward attempt ${i + 1}/${attempts.length} returned ${res.status}`,
      )
    } catch (err) {
      clearTimeout(timeout)
      lastError = err instanceof Error ? err.message : String(err)
      console.warn(
        `[inquiries] forward attempt ${i + 1}/${attempts.length} failed:`,
        lastError,
      )
    }
  }
  return { ok: false, error: lastError }
}

export async function POST(request: NextRequest) {
  let body: InquiryPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const message = (body.message || '').trim()

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required.' },
      { status: 400 },
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }
  if (!message && !body.serviceType) {
    return NextResponse.json(
      { error: 'Please add a short message or select a service type.' },
      { status: 400 },
    )
  }

  const portal = buildPortalInquiry(body)

  const [emailResult, forwardResult] = await Promise.all([
    sendInquiryEmail(body, portal),
    forwardToPortalApi(portal),
  ])

  if (!emailResult.ok && !forwardResult.ok) {
    console.error('[inquiries] BOTH channels failed', {
      email: emailResult.error,
      forward: forwardResult.error,
      payload: { name, email, subject: portal.subject },
    })
    return NextResponse.json(
      {
        error:
          'We could not deliver your enquiry right now. Please email info@tenderlab.co.uk directly.',
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    delivered: {
      email: emailResult.ok,
      portal: forwardResult.ok,
    },
  })
}
