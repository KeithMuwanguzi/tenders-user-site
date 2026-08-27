'use client'

import { useEffect, useRef, useState } from 'react'

export default function CallbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', bestTime: '', website: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('input, button, a[href]')).filter((item) => !item.hasAttribute('disabled'))
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKeyDown); previous?.focus() }
  }, [open, onClose])

  if (!open) return null

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, org: 'Callback request', serviceType: 'Request a callback', message: `Preferred callback time: ${form.bestTime || 'No preference supplied'}`, website: form.website }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'The callback request could not be sent.')
      setSent(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The callback request could not be sent.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="callback-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div ref={dialogRef} className="callback-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="callback-title">
        <button type="button" className="callback-modal__close" onClick={onClose} aria-label="Close callback form">×</button>
        {sent ? <div className="callback-modal__sent"><span aria-hidden="true">✓</span><h2 id="callback-title">Callback requested.</h2><p>Thank you. TenderLab will use the details you supplied to call you back.</p><button type="button" onClick={onClose}>Close</button></div> : <>
          <p className="callback-modal__kicker">Speak to TenderLab</p>
          <h2 id="callback-title">When should we call you?</h2>
          <p>Leave your number and a useful time. Tender advice and assessments are available through the paid consultation options.</p>
          <form onSubmit={submit}>
            <label>Your name<input required maxLength={120} autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label>Email address<input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <label>Telephone number<input required type="tel" maxLength={50} autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
            <label>Best time to call<input maxLength={120} placeholder="For example: weekdays after 2pm" value={form.bestTime} onChange={(event) => setForm({ ...form, bestTime: event.target.value })} /></label>
            <label className="callback-modal__trap" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label>
            {error && <p className="callback-modal__error" role="alert">{error}</p>}
            <button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Request my callback'}</button>
          </form>
        </>}
      </div>
    </div>
  )
}
