'use client'
import { useState } from 'react'

const SERVICE_OPTIONS = [
  'Bid Writing',
  'Pre-Submission Review',
  'Lost Bid Debrief',
  'Tender Readiness Audit',
  'Bid Team Coaching',
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

const API_URL = 'https://tenderlab-admin-api.onrender.com'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', org: '', email: '', phone: '',
    serviceType: '', deadline: '', authority: '',
    howFound: '', message: '',
  })

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.org || null,
      subject: `Tender Enquiry — ${form.serviceType || 'General'}`,
      message: [
        form.message,
        '',
        `---`,
        `Service type: ${form.serviceType}`,
        `Submission deadline: ${form.deadline}`,
        `Commissioning authority: ${form.authority}`,
        `How they found TenderLab: ${form.howFound}`,
      ].filter(Boolean).join('\n'),
    }

    try {
      const res = await fetch(`${API_URL}/api/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.')
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
    <form className="cf" onSubmit={handleSubmit} noValidate>
      <div className="cf-grid">
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-name">Your Name</label>
          <input id="cf-name" className="cf-input" type="text"
            placeholder="Director / Registered Manager"
            value={form.name} onChange={set('name')} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-org">Organisation Name</label>
          <input id="cf-org" className="cf-input" type="text"
            placeholder="Company name"
            value={form.org} onChange={set('org')} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-email">Email Address</label>
          <input id="cf-email" className="cf-input" type="email"
            placeholder="your@email.co.uk"
            value={form.email} onChange={set('email')} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-phone">Phone Number</label>
          <input id="cf-phone" className="cf-input" type="tel"
            placeholder="07xxx xxxxxx"
            value={form.phone} onChange={set('phone')} />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-service">Tender / Service type</label>
          <div className="cf-select-wrap">
            <select id="cf-service" className="cf-select"
              value={form.serviceType} onChange={set('serviceType')}>
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-deadline">Submission Deadline</label>
          <input id="cf-deadline" className="cf-input" type="date"
            value={form.deadline} onChange={set('deadline')} />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-authority">Commissioning Authority</label>
          <input id="cf-authority" className="cf-input" type="text"
            placeholder="e.g. Bradford Council, NHS Norfolk ICB"
            value={form.authority} onChange={set('authority')} />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-how">How did you find TenderLab?</label>
          <div className="cf-select-wrap">
            <select id="cf-how" className="cf-select"
              value={form.howFound} onChange={set('howFound')}>
              <option value="">Select an option</option>
              {HOW_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="cf-field cf-field--full">
        <label className="cf-label" htmlFor="cf-message">Tell us about the tender</label>
        <textarea id="cf-message" className="cf-textarea" rows={5}
          placeholder="Brief description of the tender, service type, any specific requirements or concerns…"
          value={form.message} onChange={set('message')} />
      </div>

      {error && (
        <p className="cf-error">{error}</p>
      )}

      <button type="submit" className="cf-submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send enquiry →'}
      </button>
    </form>
  )
}
