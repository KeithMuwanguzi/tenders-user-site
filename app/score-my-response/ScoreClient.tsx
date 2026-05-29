'use client'

import { useState, useRef } from 'react'

const SECTORS = [
  'Domiciliary Care',
  'Supported Living',
  'Residential Care',
  'Nursing Care',
  'Children\'s Services',
  'Mental Health',
  'Housing Support',
  'Community Health',
  'Learning Disabilities',
  'Extra Care',
  'Reablement',
  'Other',
]

const WORD_LIMIT = 5000

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export default function ScoreClient() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [sector, setSector] = useState('')
  const [tenderName, setTenderName] = useState('')
  const [specification, setSpecification] = useState('')
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [specFile, setSpecFile] = useState<File | null>(null)
  const [questionFile, setQuestionFile] = useState<File | null>(null)
  const [responseFile, setResponseFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const specFileRef = useRef<HTMLInputElement>(null)
  const questionFileRef = useRef<HTMLInputElement>(null)
  const responseFileRef = useRef<HTMLInputElement>(null)

  const responseWords = wordCount(response)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!response && !responseFile) return
    setSubmitting(true)
    // Simulate submission — replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <>
        <section className="smr-hero">
          <div className="container">
            <h1>Score My Response</h1>
            <p>Your response has been submitted for scoring.</p>
          </div>
        </section>
        <section className="smr-form-section">
          <div className="container">
            <div className="smr-success">
              <div className="smr-success__icon">✓</div>
              <h2>Submission Received</h2>
              <p>Our scoring engine is analysing your response against ten evaluator-tested criteria. You&apos;ll receive your results at <strong>{email}</strong> shortly.</p>
              <button className="btn btn-primary" onClick={() => { setSubmitted(false); setResponse(''); setSpecification(''); setQuestion('') }}>
                Score Another Response
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Dark header */}
      <section className="smr-hero">
        <div className="container">
          <h1>Score My Response</h1>
          <p>
            Submit your tender response below. Our scoring engine grades it confidentially against ten 
            evaluator-tested criteria. Optional: include the specification and the question for context-aware 
            scoring. <strong>No login. No payment. No obligation.</strong>
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="smr-form-section">
        <div className="container">
          <form className="smr-form" onSubmit={handleSubmit}>
            {/* Row: Name + Email */}
            <div className="smr-form__row">
              <div className="smr-form__field">
                <label htmlFor="smr-name">Your name</label>
                <input
                  id="smr-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="smr-form__field">
                <label htmlFor="smr-email">Email</label>
                <input
                  id="smr-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Row: Organisation + Sector */}
            <div className="smr-form__row">
              <div className="smr-form__field">
                <label htmlFor="smr-org">Organisation</label>
                <input
                  id="smr-org"
                  type="text"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                />
              </div>
              <div className="smr-form__field">
                <label htmlFor="smr-sector">Sector</label>
                <select
                  id="smr-sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                >
                  <option value="">Select</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tender name */}
            <div className="smr-form__field">
              <label htmlFor="smr-tender"><em>Tender name (optional)</em></label>
              <input
                id="smr-tender"
                type="text"
                placeholder="e.g. Birmingham Supported Living Framework 2026"
                value={tenderName}
                onChange={(e) => setTenderName(e.target.value)}
              />
            </div>

            {/* Specification */}
            <div className="smr-form__card">
              <div className="smr-form__card-header">
                <h3>Specification <span className="smr-form__optional">OPTIONAL</span></h3>
                <span className="smr-form__wc">{wordCount(specification)} words</span>
              </div>
              <p className="smr-form__card-desc">
                Paste the relevant specification section, or drop a file anywhere on this card. Improves scoring accuracy on context-sensitive criteria.
              </p>
              <textarea
                placeholder="Paste the specification text here..."
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                rows={5}
              />
              <div className="smr-form__attach">
                <button type="button" onClick={() => specFileRef.current?.click()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                  Attach a file (PDF, DOCX, TXT)
                </button>
                {specFile && <span className="smr-form__filename">{specFile.name}</span>}
                <input
                  ref={specFileRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  hidden
                  onChange={(e) => setSpecFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            {/* Question being answered */}
            <div className="smr-form__card">
              <div className="smr-form__card-header">
                <h3>Question being answered <span className="smr-form__optional">OPTIONAL</span></h3>
                <span className="smr-form__wc">{wordCount(question)} words</span>
              </div>
              <p className="smr-form__card-desc">
                Paste the exact question text, or drop a file. Improves scoring accuracy on adherence and operational alignment.
              </p>
              <textarea
                placeholder="Paste the question text here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
              />
              <div className="smr-form__attach">
                <button type="button" onClick={() => questionFileRef.current?.click()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                  Attach a file (PDF, DOCX, TXT)
                </button>
                {questionFile && <span className="smr-form__filename">{questionFile.name}</span>}
                <input
                  ref={questionFileRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  hidden
                  onChange={(e) => setQuestionFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            {/* Your response — REQUIRED */}
            <div className="smr-form__card smr-form__card--required">
              <div className="smr-form__card-header">
                <h3>Your response <span className="smr-form__required">REQUIRED</span></h3>
                <span className="smr-form__wc">{responseWords} / {WORD_LIMIT.toLocaleString()} words</span>
              </div>
              <p className="smr-form__card-desc">
                Paste the full tender response you want graded, or drop a file. {WORD_LIMIT.toLocaleString()} word cap.
              </p>
              <textarea
                placeholder="Paste your tender response here..."
                value={response}
                onChange={(e) => {
                  const text = e.target.value
                  if (wordCount(text) <= WORD_LIMIT) setResponse(text)
                }}
                rows={10}
                required={!responseFile}
              />
              <div className="smr-form__attach">
                <button type="button" onClick={() => responseFileRef.current?.click()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                  Attach a file (PDF, DOCX, TXT)
                </button>
                {responseFile && <span className="smr-form__filename">{responseFile.name}</span>}
                <input
                  ref={responseFileRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  hidden
                  onChange={(e) => setResponseFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="smr-form__submit"
              disabled={submitting || (!response && !responseFile)}
            >
              {submitting ? 'Scoring…' : 'Run the Scoring Engine'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
