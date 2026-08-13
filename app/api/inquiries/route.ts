import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createHash, randomUUID } from 'node:crypto'
import { getPortalApiUrl } from '@/lib/portal-api'

/**
 * Inquiry relay endpoint for the TenderLab website contact form.
 *
 * Two independent delivery channels protect against either failing:
 *
 *   1) Email, sent via Gmail SMTP to INQUIRY_TO when SMTP is configured.
 *
 *   2) Portal API, forwarded to the FastAPI service on TenderLab's VPS so it
 *                   appears in the admin portal. We mark the request with a
 *                   signed relay header so the API can reject direct abuse
 *                   and skip duplicate email sending.
 *
 * If website SMTP is unavailable, the Portal API remains the delivery channel
 * and sends its own notification email. The relay marker is applied only after
 * this website has already delivered an email, preventing duplicate messages.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Keep the relay within the Vercel function budget. Email normally completes
// quickly; the VPS API has its own short, bounded retry window below.
export const maxDuration = 30

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'TenderLab Website'
const INQUIRY_TO = process.env.INQUIRY_TO || 'info@tenderlab.co.uk'
const PORTAL_ADMIN_URL =
  process.env.PORTAL_ADMIN_URL || 'https://admin.tenderlab.co.uk'
const MAX_REQUEST_BYTES = 32_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_SALT = process.env.INQUIRY_RATE_LIMIT_SALT || 'tenderlab-local-development'
const INQUIRY_RELAY_TOKEN = process.env.INQUIRY_RELAY_TOKEN || ''
const BASE_ALLOWED_ORIGINS = [
  'https://www.tenderlab.co.uk',
  'https://tenderlab.co.uk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]

type RateLimitRecord = { count: number; resetAt: number }
const rateLimitStore = new Map<string, RateLimitRecord>()

function allowedOrigins(request: NextRequest): Set<string> {
  const configured = (process.env.INQUIRY_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean)
  const vercelOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
    : ''
  const requestOrigin = new URL(request.url).origin
  return new Set([...BASE_ALLOWED_ORIGINS, ...configured, vercelOrigin, requestOrigin].filter(Boolean))
}

function requestKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
  const address = forwarded || request.headers.get('x-real-ip') || 'unknown'
  return createHash('sha256').update(`${RATE_LIMIT_SALT}:${address}`).digest('hex')
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  for (const [storedKey, record] of rateLimitStore) {
    if (record.resetAt <= now) rateLimitStore.delete(storedKey)
  }

  const current = rateLimitStore.get(key)
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  rateLimitStore.set(key, current)
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

function resolvePortalApiUrl(): string {
  const raw = process.env.PORTAL_INQUIRY_API_URL || getPortalApiUrl()
  return raw.replace(/\/$/, '')
}

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
  tenderTitle?: string
  tenderDescription?: string
  tenderUrl?: string
  website?: string
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
    `Tender title: ${data.tenderTitle || 'Not specified'}`,
    `Tender URL: ${data.tenderUrl || 'Not specified'}`,
    `Service type: ${data.serviceType || 'Not specified'}`,
    `Submission deadline: ${data.deadline || 'Not specified'}`,
    `Commissioning authority: ${data.authority || 'Not specified'}`,
    `How they found TenderLab: ${data.howFound || 'Not specified'}`,
    `Tender description: ${data.tenderDescription || 'Not specified'}`,
  ]
  const messageBody = (data.message || '').trim()
  const fullMessage = [messageBody, '', '---', ...detailLines].join('\n')

  return {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    company: data.org || null,
    subject: `Tender Enquiry, ${data.serviceType || 'General'}`,
    message: fullMessage,
  }
}

function buildEmailContent(data: InquiryPayload, portal: PortalInquiry) {
  // Spam filters dislike "New …" subjects and repeated brand keywords.
  // A short, person-first subject reads like real correspondence.
  const subject = data.org
    ? `Enquiry from ${data.name}, ${data.org}`
    : `Enquiry from ${data.name}`

  // Hidden preheader: the bit Gmail/Outlook show next to the subject in the
  // inbox list. Setting one explicitly looks more like real mail.
  const preheaderBits = [
    data.serviceType,
    data.org,
    (data.message || '').trim().split('\n')[0],
  ].filter(Boolean)
  const preheader = preheaderBits.join(' · ').slice(0, 120) || 'Website enquiry'

  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || ', '],
    ['Organisation', data.org || ', '],
    ['Tender title', data.tenderTitle || ', '],
    ['Tender URL', data.tenderUrl || ', '],
    ['Service type', data.serviceType || ', '],
    ['Submission deadline', data.deadline || ', '],
    ['Commissioning authority', data.authority || ', '],
    ['How they found us', data.howFound || ', '],
  ]

  const text = [
    `Hi team,`,
    ``,
    `${data.name}${data.org ? ` from ${data.org}` : ''} has sent an enquiry through the website.`,
    ``,
    ...rows.map(([k, v]) => `${k.padEnd(24)}: ${v}`),
    ``,
    `Message:`,
    (data.message || '(no message)').trim(),
    ``,
    `Reply directly to this email, it goes straight to ${data.email}.`,
    `Or open the inquiry in the portal: ${PORTAL_ADMIN_URL}/enquiries`,
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
    <div style="display:none;font-size:1px;color:#f9fafb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escape(
      preheader,
    )}</div>
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
      <div style="padding:20px 24px;border-bottom:1px solid #f3f4f6;">
        <p style="margin:0;font-size:13px;color:#374151;">Hi team,</p>
        <p style="margin:6px 0 0;font-size:14px;color:#111827;">
          <strong>${escape(data.name)}</strong>${
            data.org ? ` from <strong>${escape(data.org)}</strong>` : ''
          } has sent an enquiry through the website.
        </p>
      </div>
      <div style="padding:20px 24px;">
        <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
        <div style="margin-top:20px;padding-top:18px;border-top:1px solid #f3f4f6;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;font-weight:600;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escape(
            (data.message || '(no message)').trim(),
          )}</p>
        </div>
        <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">
          Reply directly to this email, it goes straight to <a href="mailto:${escape(
            data.email,
          )}" style="color:#374151;">${escape(data.email)}</a>.
        </p>
        <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">
          Or <a href="${PORTAL_ADMIN_URL}/enquiries" style="color:#374151;">open the enquiry in the portal</a>.
        </p>
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
      replyTo: `"${data.name}" <${data.email}>`,
      sender: SMTP_USER,
      subject,
      text,
      html,
      // Headers that mark this as a one-shot transactional notification
      //, helps Gmail / Outlook classify it as legitimate mail rather
      // than bulk marketing.
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
        'X-Mailer': 'TenderLab Website',
        'X-Entity-Ref-ID': `tenderlab-enquiry-${Date.now()}`,
      },
    })
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[inquiries] email send failed:', message)
    return { ok: false, error: message }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Ping the Render API so a cold start finishes before we POST the inquiry. */
async function wakePortalApi(baseUrl: string): Promise<void> {
  if (!baseUrl) return
  const healthUrl = `${baseUrl}/api/health`
  const attempts = 4
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)
    try {
      const res = await fetch(healthUrl, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      if (res.ok) {
        console.info('[inquiries] portal API awake')
        return
      }
      console.warn(
        `[inquiries] health check attempt ${i + 1}/${attempts} returned ${res.status}`,
      )
    } catch (err) {
      clearTimeout(timeout)
      const message = err instanceof Error ? err.message : String(err)
      console.warn(
        `[inquiries] health check attempt ${i + 1}/${attempts} failed:`,
        message,
      )
    }
    if (i < attempts - 1) {
      await sleep(2000)
    }
  }
}

async function forwardToPortalApi(
  portal: PortalInquiry,
  baseUrl: string,
  relayAlreadyEmailed: boolean,
): Promise<{ ok: boolean; status?: number; error?: string }> {
  if (!baseUrl) return { ok: false, error: 'Portal API is not configured' }
  const url = `${baseUrl}/api/inquiries/`

  // After wakePortalApi(), the API should be hot, short retries cover
  // transient sheet-store hiccups without burning the whole Vercel budget.
  const attempts: Array<{ timeoutMs: number; preDelayMs: number }> = [
    { timeoutMs: 12000, preDelayMs: 0 },
    { timeoutMs: 8000, preDelayMs: 750 },
  ]

  let lastError = ''
  for (let i = 0; i < attempts.length; i++) {
    const { timeoutMs, preDelayMs } = attempts[i]
    if (preDelayMs > 0) {
      await sleep(preDelayMs)
    }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(relayAlreadyEmailed
            ? {
                'X-Inquiry-Source': 'website-relay',
                ...(INQUIRY_RELAY_TOKEN
                  ? { 'X-Inquiry-Token': INQUIRY_RELAY_TOKEN }
                  : {}),
              }
            : {}),
        },
        body: JSON.stringify(portal),
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      if (res.ok) return { ok: true, status: res.status }

      const body = await res.text().catch(() => '')
      lastError = `HTTP ${res.status}${body ? `: ${body.slice(0, 300)}` : ''}`
      console.warn(
        `[inquiries] forward attempt ${i + 1}/${attempts.length} failed:`,
        lastError,
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
  const requestId = randomUUID()
  const origin = request.headers.get('origin')
  if (!origin || !allowedOrigins(request).has(origin.replace(/\/$/, ''))) {
    return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403 })
  }

  const declaredLength = Number(request.headers.get('content-length') || '0')
  if (declaredLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: 'Enquiry is too large.' }, { status: 413 })
  }

  let body: InquiryPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const limits: Record<keyof InquiryPayload, number> = {
    name: 120,
    email: 254,
    phone: 50,
    org: 200,
    serviceType: 120,
    deadline: 80,
    authority: 200,
    howFound: 120,
    message: 5_000,
    tenderTitle: 300,
    tenderDescription: 1_200,
    tenderUrl: 500,
    website: 200,
  }

  for (const [field, limit] of Object.entries(limits) as Array<[keyof InquiryPayload, number]>) {
    const value = body[field]
    if (typeof value === 'string' && value.length > limit) {
      return NextResponse.json(
        { error: `${field} is too long.` },
        { status: 400 },
      )
    }
  }

  body = {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    phone: typeof body.phone === 'string' ? body.phone.trim() : null,
    org: typeof body.org === 'string' ? body.org.trim() : null,
    serviceType: typeof body.serviceType === 'string' ? body.serviceType.trim() : '',
    deadline: typeof body.deadline === 'string' ? body.deadline.trim() : '',
    authority: typeof body.authority === 'string' ? body.authority.trim() : '',
    howFound: typeof body.howFound === 'string' ? body.howFound.trim() : '',
    message: typeof body.message === 'string' ? body.message.trim() : '',
    tenderTitle: typeof body.tenderTitle === 'string' ? body.tenderTitle.trim() : '',
    tenderDescription: typeof body.tenderDescription === 'string' ? body.tenderDescription.trim() : '',
    tenderUrl: typeof body.tenderUrl === 'string' ? body.tenderUrl.trim() : '',
    website: typeof body.website === 'string' ? body.website.trim() : '',
  }

  if (body.website) {
    // Return the normal success shape without sending anything. Bots commonly
    // populate this visually hidden field; a silent success avoids teaching
    // them how to bypass it.
    return NextResponse.json({ ok: true, delivered: { email: false, portal: false } })
  }

  if (isRateLimited(requestKey(request))) {
    return NextResponse.json(
      { error: 'Too many enquiries. Please wait and try again.' },
      { status: 429, headers: { 'Retry-After': '600' } },
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

  if (body.tenderUrl) {
    try {
      const isRelativeTenderPath = /^\/tenders\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]+$/.test(body.tenderUrl)
      const tenderUrl = isRelativeTenderPath
        ? new URL(body.tenderUrl, 'https://www.tenderlab.co.uk')
        : new URL(body.tenderUrl)
      const allowedTenderHosts = new Set([
        'www.tenderlab.co.uk',
        'tenderlab.co.uk',
        ...(process.env.VERCEL_URL ? [process.env.VERCEL_URL] : []),
      ])
      if (tenderUrl.protocol !== 'https:' || !allowedTenderHosts.has(tenderUrl.hostname)) {
        return NextResponse.json({ error: 'Tender URL is invalid.' }, { status: 400 })
      }
      body.tenderUrl = tenderUrl.toString()
    } catch {
      return NextResponse.json({ error: 'Tender URL is invalid.' }, { status: 400 })
    }
  }

  const portal = buildPortalInquiry(body)
  const portalApiUrl = resolvePortalApiUrl()

  // Email is independent of the Portal/VPS channel, so a temporary upstream
  // problem does not discard an otherwise deliverable enquiry.
  const [emailResult] = await Promise.all([
    sendInquiryEmail(body, portal),
    wakePortalApi(portalApiUrl),
  ])

  const forwardResult = await forwardToPortalApi(
    portal,
    portalApiUrl,
    emailResult.ok,
  )

  if (!emailResult.ok && !forwardResult.ok) {
    console.error('[inquiries] BOTH channels failed', {
      requestId,
      email: emailResult.error,
      forward: forwardResult.error,
      portalConfigured: Boolean(portalApiUrl),
    })
    return NextResponse.json(
      {
        error:
          'We could not deliver your enquiry right now. Please email info@tenderlab.co.uk directly.',
      },
      { status: 502 },
    )
  }

  if (emailResult.ok && !forwardResult.ok) {
    console.error('[inquiries] email delivered but portal forward FAILED', {
      requestId,
      forward: forwardResult.error,
      portalConfigured: Boolean(portalApiUrl),
    })
  }

  return NextResponse.json({
    ok: true,
    delivered: {
      email: emailResult.ok,
      portal: forwardResult.ok,
    },
  })
}
