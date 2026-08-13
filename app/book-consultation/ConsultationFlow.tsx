'use client'

import { useMemo, useState } from 'react'
import type { Consultation } from '@/lib/consultations'

type Details = { firstName: string; lastName: string; email: string; phone: string; organisation: string; notes: string }

export default function ConsultationFlow({ consultations }: { consultations: Consultation[] }) {
  const [step, setStep] = useState(1)
  const [selectedId, setSelectedId] = useState(consultations[0].id)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [files, setFiles] = useState<File[]>([])
  const [details, setDetails] = useState<Details>({ firstName: '', lastName: '', email: '', phone: '', organisation: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const selected = useMemo(() => consultations.find((item) => item.id === selectedId) || consultations[0], [consultations, selectedId])
  const set = (key: keyof Details) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails((value) => ({ ...value, [key]: event.target.value }))
  const next = () => {
    setError('')
    if (step === 2 && selected.documentsRequired && files.length === 0) return setError('Upload the required documents before continuing.')
    if (step === 3 && !date) return setError('Choose a preferred date before continuing.')
    setStep((value) => Math.min(4, value + 1))
    window.scrollTo({ top: document.querySelector('.booking-flow')?.getBoundingClientRect().top || 0, behavior: 'smooth' })
  }
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitting(true); setError('')
    const body = new FormData()
    body.set('consultationId', selected.id); body.set('date', date); body.set('time', time)
    Object.entries(details).forEach(([key, value]) => body.set(key, value))
    files.forEach((file) => body.append('documents', file))
    try {
      const response = await fetch('/api/consultations/checkout', { method: 'POST', body })
      const data = await response.json()
      if (!response.ok || !data.url) throw new Error(data.error || 'The booking could not be started.')
      window.location.assign(data.url)
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'The booking could not be started.'); setSubmitting(false) }
  }
  return (
    <section className="booking-flow" aria-labelledby="booking-flow-title">
      <div className="booking-progress" aria-label={`Step ${step} of 4`}><span style={{ width: `${step * 25}%` }} /><p>Step {step} of 4</p></div>
      {step === 1 && <div className="booking-stage"><header><p className="campaign-eyebrow">Choose a service</p><h2 id="booking-flow-title">What do you need help with?</h2></header><div className="booking-options">{consultations.map((item) => <button type="button" className={item.id === selectedId ? 'is-selected' : ''} onClick={() => setSelectedId(item.id)} key={item.id}><span>{item.free ? 'No-cost starting point' : item.documentsRequired ? 'Preparation included' : 'Focused advice'}</span><h3>{item.title}</h3><p>{item.description}</p><div><strong>{item.free ? 'Free' : `£${item.price}`}</strong><small>{item.duration}</small></div></button>)}</div></div>}
      {step === 2 && <div className="booking-stage booking-stage--split"><header><p className="campaign-eyebrow">Preparation</p><h2>Send what we need to prepare properly.</h2><p>{selected.preparation}</p>{selected.deductible && <aside>The fee can be deducted from a full engagement if you instruct TenderLab within 30 days.</aside>}</header><div className="booking-upload"><label htmlFor="booking-documents">{selected.documentsRequired ? 'Required documents' : 'Optional supporting documents'}<input id="booking-documents" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.zip" onChange={(event) => setFiles(Array.from(event.target.files || []))} /></label><p>PDF, Word, Excel or ZIP. Up to five files, 10 MB each.</p>{files.length > 0 && <ul>{files.map((file) => <li key={file.name}>{file.name}</li>)}</ul>}</div></div>}
      {step === 3 && <div className="booking-stage booking-stage--split"><header><p className="campaign-eyebrow">Preferred appointment</p><h2>Choose a suitable date and time.</h2><p>We will confirm availability after your booking. Written Tender Briefings use this date as the preferred delivery date.</p></header><div className="booking-date"><label>Preferred date<input type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Preferred time<select value={time} onChange={(event) => setTime(event.target.value)}><option>09:00</option><option>10:00</option><option>11:00</option><option>14:00</option><option>15:00</option><option>16:00</option></select></label><p>Times are shown in Europe/London.</p></div></div>}
      {step === 4 && <form className="booking-stage booking-stage--form" onSubmit={submit}><header><p className="campaign-eyebrow">Your information</p><h2>Complete the booking and continue to payment.</h2></header><div className="booking-fields"><label>First name<input required autoComplete="given-name" value={details.firstName} onChange={set('firstName')} /></label><label>Last name<input required autoComplete="family-name" value={details.lastName} onChange={set('lastName')} /></label><label>Email address<input required type="email" autoComplete="email" value={details.email} onChange={set('email')} /></label><label>Telephone<input required type="tel" autoComplete="tel" value={details.phone} onChange={set('phone')} /></label><label className="wide">Organisation<input required autoComplete="organization" value={details.organisation} onChange={set('organisation')} /></label><label className="wide">Anything we should know?<textarea rows={4} value={details.notes} onChange={set('notes')} /></label></div><aside className="booking-summary"><span>{selected.title}</span><strong>{selected.free ? 'Free' : `£${selected.price}`}</strong><p>{date} at {time} · {selected.duration}</p><small>{selected.free ? 'Continue to appointment confirmation.' : 'Continue to secure payment.'}</small></aside><button disabled={submitting} type="submit">{submitting ? 'Preparing your booking…' : selected.free ? 'Request this appointment' : `Continue to payment · £${selected.price}`}</button></form>}
      {error && <p className="booking-error" role="alert">{error}</p>}
      <div className="booking-controls">{step > 1 && <button type="button" onClick={() => setStep((value) => value - 1)}>Go back</button>}{step < 4 && <button type="button" onClick={next}>Continue</button>}</div>
    </section>
  )
}
