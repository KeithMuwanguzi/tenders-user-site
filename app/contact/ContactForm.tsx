'use client'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const SERVICE_OPTIONS = [
  'Bid Writing',
  'Pre-Submission Review',
  'Lost Bid Debrief',
  'Tender Readiness Audit',
  'Tender Training / Bid Team Coaching',
  'Pipeline Tracking',
  'Mobilisation Support',
  'Tender Retainer',
]

const HOW_OPTIONS = [
  'Google Search',
  'Referral / Word of mouth',
  'LinkedIn',
  'Social Media',
  'Online article / Blog',
  'Other',
]

// Posts to a same-origin Next.js server route which:
//   1) emails info@tenderlab.co.uk via Gmail SMTP (always-on channel)
//   2) forwards to the portal API with retries (handles cold-start)
// See app/api/inquiries/route.ts
const INQUIRY_ENDPOINT = '/api/inquiries'

export type TenderEnquiryContext = {
  tenderTitle?: string
  tenderDescription?: string
  tenderUrl?: string
  serviceType?: string
  deadline?: string
  authority?: string
}

export default function ContactForm({ initialContext = {} }: { initialContext?: TenderEnquiryContext }) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.toString()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', org: '', email: '', phone: '',
    tenderTitle: initialContext.tenderTitle || '',
    tenderDescription: initialContext.tenderDescription || '',
    tenderUrl: initialContext.tenderUrl || '',
    serviceType: initialContext.serviceType || '',
    deadline: (initialContext.deadline || '').slice(0, 10),
    authority: initialContext.authority || '',
    howFound: '', message: '', website: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(searchQuery)
    const tenderTitle = params.get('tenderTitle') || params.get('tender') || ''
    const tenderDescription = params.get('tenderDescription') || ''
    const tenderUrl = params.get('tenderUrl') || ''
    const serviceType = params.get('serviceType') || ''
    const deadline = (params.get('deadline') || '').slice(0, 10)
    const authority = params.get('authority') || ''
    const hasTenderContext = Boolean(
      tenderTitle || tenderDescription || serviceType || deadline || authority,
    )

    if (hasTenderContext) {
      setForm((previous) => ({
        ...previous,
        tenderTitle,
        tenderDescription,
        tenderUrl,
        serviceType,
        deadline,
        authority,
      }))
    }

    if (!hasTenderContext && window.location.hash !== '#enquiry') return

    const moveToForm = () => {
      document.getElementById('tender-enquiry-form')?.scrollIntoView({ block: 'start' })
    }
    requestAnimationFrame(() => requestAnimationFrame(moveToForm))
    const timer = window.setTimeout(moveToForm, 200)
    return () => window.clearTimeout(timer)
  }, [searchQuery])

  const serviceOptions = useMemo(
    () =>
      form.serviceType && !SERVICE_OPTIONS.includes(form.serviceType)
        ? [form.serviceType, ...SERVICE_OPTIONS]
        : SERVICE_OPTIONS,
    [form.serviceType],
  )

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data.error || data.detail || 'Something went wrong. Please try again.'
        )
      }
      window.dispatchEvent(new CustomEvent('tenderlab:inquiry-success', {
        detail: { tender: Boolean(form.tenderTitle) },
      }))
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="cf-sent">
        <div className="cf-sent__icon" aria-hidden="true">✓</div>
        <h3>Enquiry received</h3>
        <p>Thank you — we&apos;ll review your enquiry and respond within one working day. You can also reach us at <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>.</p>
      </div>
    )
  }

  return (
    <form className="cf" id="tender-enquiry-form" onSubmit={handleSubmit}>
      <div className="cf-honeypot" aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1}
          autoComplete="off" value={form.website} onChange={set('website')} />
      </div>
      <div className="cf-grid">
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-name">Your name <span aria-hidden="true">*</span></label>
          <input id="cf-name" className="cf-input" type="text"
            name="name" autoComplete="name" maxLength={100}
            placeholder="Director / Registered Manager"
            value={form.name} onChange={set('name')} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-org">Organisation name <span aria-hidden="true">*</span></label>
          <input id="cf-org" className="cf-input" type="text"
            name="organisation" autoComplete="organization" maxLength={160}
            placeholder="Company name"
            value={form.org} onChange={set('org')} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-email">Email address <span aria-hidden="true">*</span></label>
          <input id="cf-email" className="cf-input" type="email"
            name="email" autoComplete="email" maxLength={254}
            placeholder="your@email.co.uk"
            value={form.email} onChange={set('email')} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-phone">Phone number</label>
          <input id="cf-phone" className="cf-input" type="tel"
            name="phone" autoComplete="tel" maxLength={40}
            placeholder="07xxx xxxxxx"
            value={form.phone} onChange={set('phone')} />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-service">Tender / Service type</label>
          <div className="cf-select-wrap">
            <select id="cf-service" className="cf-select"
              name="serviceType"
              value={form.serviceType} onChange={set('serviceType')}>
              <option value="">Select a service</option>
              {serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-deadline">Submission deadline</label>
          <input id="cf-deadline" className="cf-input" type="date"
            name="deadline"
            value={form.deadline} onChange={set('deadline')} />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-authority">Commissioning authority</label>
          <input id="cf-authority" className="cf-input" type="text"
            name="authority" maxLength={180}
            placeholder="e.g. Bradford Council, NHS Norfolk ICB"
            value={form.authority} onChange={set('authority')} />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-how">How did you find TenderLab?</label>
          <div className="cf-select-wrap">
            <select id="cf-how" className="cf-select"
              name="howFound"
              value={form.howFound} onChange={set('howFound')}>
              <option value="">Select an option</option>
              {HOW_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {form.tenderTitle && (
        <div className="cf-context" aria-label="Tender carried over from the opportunity page">
          <input type="hidden" name="tenderUrl" value={form.tenderUrl} />
          <p className="cf-context__label">Tender selected</p>
          <div className="cf-field cf-field--full">
            <label className="cf-label" htmlFor="cf-tender-title">Tender title</label>
            <input id="cf-tender-title" className="cf-input" type="text"
              name="tenderTitle" maxLength={300}
              value={form.tenderTitle} onChange={set('tenderTitle')} />
          </div>
          {form.tenderDescription && (
            <div className="cf-field cf-field--full">
              <label className="cf-label" htmlFor="cf-tender-description">Tender description</label>
              <textarea id="cf-tender-description" className="cf-textarea" rows={3}
                name="tenderDescription" maxLength={1200}
                value={form.tenderDescription} onChange={set('tenderDescription')} />
            </div>
          )}
        </div>
      )}

      <div className="cf-field cf-field--full">
        <label className="cf-label" htmlFor="cf-message">Tell us about the tender</label>
        <textarea id="cf-message" className="cf-textarea" rows={5}
          name="message" maxLength={5000}
          placeholder="Brief description of the tender, service type, any specific requirements or concerns…"
          value={form.message} onChange={set('message')} />
      </div>

      {error && (
        <p className="cf-error" role="alert">{error}</p>
      )}

      <button type="submit" className="cf-submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send my enquiry →'}
      </button>
      <p className="cf-note">Submitting this form does not commit you to a service. TenderLab will first review the information and confirm the appropriate next step.</p>
    </form>
  )
}
