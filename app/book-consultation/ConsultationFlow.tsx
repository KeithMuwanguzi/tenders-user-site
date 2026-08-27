'use client'

import { upload } from '@vercel/blob/client'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import type { Consultation } from '@/lib/consultations'

type Details = { firstName: string; lastName: string; email: string; phone: string; organisation: string; notes: string }
type UploadedDocument = { name: string; pathname: string; url: string }

const UK_BANK_HOLIDAYS = new Set(['2026-01-01','2026-04-03','2026-04-06','2026-05-04','2026-05-25','2026-08-31','2026-12-25','2026-12-28','2027-01-01','2027-03-26','2027-03-29','2027-05-03','2027-05-31','2027-08-30','2027-12-27','2027-12-28'])
const TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

function validWorkingDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || UK_BANK_HOLIDAYS.has(value)) return false
  const day = new Date(`${value}T12:00:00`).getDay()
  return day !== 0 && day !== 6
}

export default function ConsultationFlow({ consultations }: { consultations: Consultation[] }) {
  const flowRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState(1)
  const [selectedId, setSelectedId] = useState(consultations[0].id)
  const [attendees, setAttendees] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [files, setFiles] = useState<File[]>([])
  const [details, setDetails] = useState<Details>({ firstName: '', lastName: '', email: '', phone: '', organisation: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const selected = useMemo(() => consultations.find((item) => item.id === selectedId) || consultations[0], [consultations, selectedId])
  const set = (key: keyof Details) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails((value) => ({ ...value, [key]: event.target.value }))

  const showStep = (nextStep: number) => {
    setStep(nextStep)
    window.requestAnimationFrame(() => flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const chooseConsultation = (consultationId: string) => {
    setSelectedId(consultationId)
    setFiles([])
    setError('')
    showStep(2)
  }

  const chooseFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length > 5 || selectedFiles.some((file) => file.size > 10 * 1024 * 1024)) {
      event.target.value = ''
      setFiles([])
      setError('Choose no more than five documents, each 10 MB or smaller.')
      return
    }
    setError('')
    setFiles(selectedFiles)
  }

  const next = () => {
    setError('')
    if (step === 2 && selected.documentsRequired && files.length === 0) return setError('Upload the required documents before continuing.')
    if (step === 3 && !validWorkingDate(date)) return setError('Choose a weekday that is not a UK bank holiday.')
    showStep(Math.min(4, step + 1))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const bookingReference = crypto.randomUUID()
    try {
      const documents: UploadedDocument[] = []
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index]
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const blob = await upload(`consultations/${bookingReference}/${safeName}`, file, {
          access: 'private',
          handleUploadUrl: '/api/consultations/upload',
          multipart: file.size > 5 * 1024 * 1024,
          clientPayload: JSON.stringify({ consultationId: selected.id, bookingReference }),
          onUploadProgress: ({ percentage }) => setUploadProgress(Math.round(((index + percentage / 100) / files.length) * 100)),
        })
        documents.push({ name: file.name, pathname: blob.pathname, url: blob.url })
      }
      const response = await fetch('/api/consultations/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingReference, consultationId: selected.id, date, time, attendees, details, documents }),
      })
      const data = await response.json()
      if (!response.ok || !data.url) throw new Error(data.error || 'The booking could not be started.')
      window.location.assign(data.url)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The booking could not be started.')
      setSubmitting(false)
    }
  }

  return (
    <section ref={flowRef} className="booking-flow" aria-labelledby="booking-flow-title">
      <div className="booking-progress" aria-label={`Step ${step} of 4`}><span style={{ width: `${step * 25}%` }} /><p>Step {step} of 4</p></div>

      {step === 1 && <div className="booking-stage">
        <header className="booking-stage__intro">
          <div className="booking-stage__copy">
            <p className="booking-kicker">Book focused tender advice</p>
            <h1 id="booking-flow-title">Choose the preparation you need.</h1>
            <p>Four paid options. Each has a fixed price, a clear preparation requirement and a defined outcome.</p>
          </div>
          <div className="booking-stage__visual" aria-hidden="true">
            <Image src="/images/editorial/tenderlab-contact-briefing-hero-v1.webp" alt="" fill priority sizes="(max-width: 900px) 100vw, 560px" />
            <span>Prepared advice. Clear next steps.</span>
          </div>
        </header>
        <div className="booking-options" role="list">
          {consultations.map((item) => <button type="button" className={item.id === selectedId ? 'is-selected' : ''} aria-pressed={item.id === selectedId} onClick={() => chooseConsultation(item.id)} key={item.id}>
            <span>{item.documentsRequired ? 'Preparation included' : 'Focused advice'}</span><h3>{item.title}</h3><p>{item.description}</p><div><strong>£{item.price}</strong><small>{item.duration}</small></div><b>Book now <span aria-hidden="true">→</span></b>
          </button>)}
        </div>
      </div>}

      {step === 2 && <div className="booking-stage booking-stage--split">
        <header><p className="booking-kicker">Attendees and preparation</p><h2>Who is joining, and what should we read first?</h2><p>{selected.preparation}</p>{selected.deductible && <aside>The fee can be deducted from a full engagement if you instruct TenderLab within 30 days.</aside>}</header>
        <div className="booking-upload"><fieldset className="booking-attendees"><legend>How many people will attend?</legend><div>{[1,2,3,4,5,6].map((number) => <label key={number} className={attendees === number ? 'is-selected' : ''}><input type="radio" name="attendees" checked={attendees === number} onChange={() => setAttendees(number)} /><span>{number === 1 ? 'Just me' : number}</span></label>)}</div></fieldset><label htmlFor="booking-documents">{selected.documentsRequired ? 'Required documents' : 'Optional supporting documents'}<input id="booking-documents" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.zip" onChange={chooseFiles} /></label><p>PDF, Word, Excel or ZIP. Up to five files, 10 MB each.</p>{files.length > 0 && <ul>{files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)}</ul>}</div>
      </div>}

      {step === 3 && <div className="booking-stage booking-stage--split">
        <header><p className="booking-kicker">Date and time</p><h2>Choose a working-day appointment.</h2><p>Appointments run Monday to Friday, 10am to 5pm. Weekends and UK bank holidays are unavailable.</p></header>
        <div className="booking-date"><label>Preferred date<input type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={(event) => { setDate(event.target.value); setError('') }} /></label><div className="booking-times" role="group" aria-label="Preferred time">{TIMES.map((value) => <button type="button" key={value} className={time === value ? 'is-selected' : ''} onClick={() => setTime(value)}>{value}</button>)}</div><p>Times are shown in Europe/London.</p></div>
      </div>}

      {step === 4 && <form className="booking-stage booking-stage--form" onSubmit={submit}>
        <header><p className="booking-kicker">Your information</p><h2>Complete the booking and continue to secure payment.</h2></header>
        <div className="booking-fields"><label>First name<input required autoComplete="given-name" value={details.firstName} onChange={set('firstName')} /></label><label>Last name<input required autoComplete="family-name" value={details.lastName} onChange={set('lastName')} /></label><label>Email address<input required type="email" autoComplete="email" value={details.email} onChange={set('email')} /></label><label>Telephone<input required type="tel" autoComplete="tel" value={details.phone} onChange={set('phone')} /></label><label className="wide">Organisation<input required autoComplete="organization" value={details.organisation} onChange={set('organisation')} /></label><label className="wide">Anything we should know?<textarea rows={4} value={details.notes} onChange={set('notes')} /></label></div>
        <aside className="booking-summary"><span>{selected.title}</span><strong>£{selected.price}</strong><p>{date} at {time} · {selected.duration} · {attendees} attendee{attendees === 1 ? '' : 's'}</p><small>You will continue to secure payment.</small></aside>
        {submitting && files.length > 0 && <p className="booking-upload-progress" role="status">Securely uploading documents: {uploadProgress}%</p>}
        <button disabled={submitting} type="submit">{submitting ? 'Preparing secure payment…' : `Continue to payment · £${selected.price}`}</button>
      </form>}

      {error && <p className="booking-error" role="alert">{error}</p>}
      <div className="booking-controls">{step > 1 && <button type="button" onClick={() => showStep(step - 1)}>Go back</button>}{step < 4 && <button type="button" onClick={next}>Continue</button>}</div>
    </section>
  )
}
