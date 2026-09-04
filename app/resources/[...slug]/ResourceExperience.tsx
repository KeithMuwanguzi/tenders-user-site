'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { ResourceDefinition, ResourceQuestion } from '@/lib/resources-data'
import styles from '../resources.module.css'

type Answers = Record<string, string>
type Result = { status: string; score: number | null; summary: string; strengths: string[]; actions: string[]; calculations?: Array<[string, string]> }

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

function track(event: string, resource: ResourceDefinition, detail: Record<string, unknown> = {}) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', event, { tool_id: resource.slug, tool_version: '1.0', ...detail })
}

function numeric(answers: Answers, id: string) {
  const value = Number.parseFloat(answers[id] || '0')
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

function answerScore(question: ResourceQuestion, answer: string) {
  return question.options?.find((option) => option.value === answer)?.score ?? (answer.trim() ? 100 : 0)
}

function calculate(resource: ResourceDefinition, answers: Answers): Result {
  if (resource.slug === 'calculators/tender-pricing') {
    const pay = numeric(answers, 'pay')
    const oncost = numeric(answers, 'oncost') / 100
    const noncontact = Math.min(numeric(answers, 'noncontact') / 100, .9)
    const travel = numeric(answers, 'travel')
    const overhead = numeric(answers, 'overhead') / 100
    const margin = Math.min(numeric(answers, 'margin') / 100, .8)
    const ceiling = numeric(answers, 'ceiling')
    const employment = pay * (1 + oncost)
    const productiveLabour = employment / Math.max(1 - noncontact, .1)
    const direct = productiveLabour + travel
    const breakEven = direct * (1 + overhead)
    const target = breakEven / Math.max(1 - margin, .2)
    const ceilingMargin = ceiling > 0 ? ((ceiling - breakEven) / ceiling) * 100 : null
    const status = ceiling === 0 ? 'Rate calculated — buyer ceiling not supplied' : ceiling >= target ? 'Sustainable on current assumptions' : ceiling >= breakEven ? 'Marginal on current assumptions' : 'Unsustainable on current assumptions'
    return {
      status, score: null,
      summary: 'The calculation separates direct labour, non-contact time, travel, overhead and target margin so the rate can be challenged before submission.',
      strengths: [`Base employment cost: £${employment.toFixed(2)} per paid hour`, `Break-even rate: £${breakEven.toFixed(2)} per billed hour`],
      actions: [ceiling === 0 ? 'Enter the published ceiling when available and rerun the comparison.' : 'Validate every assumption against the tender pricing schedule.', 'Run wage, travel and utilisation sensitivity before approving the final price.', 'Confirm that narrative commitments are fully funded by the rate.'],
      calculations: [['Break-even rate', `£${breakEven.toFixed(2)}`], ['Target bid rate', `£${target.toFixed(2)}`], ['Margin at buyer ceiling', ceilingMargin === null ? 'Not supplied' : `${ceilingMargin.toFixed(1)}%`]],
    }
  }

  if (resource.slug === 'calculators/mobilisation-capacity') {
    const demand = numeric(answers, 'hours')
    const current = numeric(answers, 'capacity')
    const weeks = numeric(answers, 'weeks')
    const weeklyRecruits = numeric(answers, 'recruitment')
    const staffHours = numeric(answers, 'staffhours')
    const gap = Math.max(0, demand - current)
    const fte = staffHours > 0 ? Math.ceil(gap / staffHours) : 0
    const possible = weeks * weeklyRecruits
    const systemsScore = answers.systems === 'yes' ? 100 : answers.systems === 'partly' ? 55 : answers.systems === 'unsure' ? 30 : 0
    const status = gap === 0 && systemsScore >= 55 ? 'Low mobilisation risk on current assumptions' : possible >= fte && systemsScore >= 55 ? 'Controlled risk on current assumptions' : possible >= fte * .7 ? 'High mobilisation risk' : 'Not feasible on current assumptions'
    return { status, score: null, summary: 'Capacity is tested against required hours, reliable unused capacity, recruitment throughput, productive hours and systems readiness.', strengths: [`Weekly capacity gap: ${gap.toFixed(0)} hours`, `Indicative additional FTE required: ${fte}`], actions: ['Validate the contract start date and volume profile against the procurement pack.', 'Confirm DBS, onboarding and training lead times.', 'Name owners for systems, management and commissioner dependencies.'], calculations: [['Capacity gap', `${gap.toFixed(0)} hours/week`], ['Indicative FTE required', String(fte)], ['Recruitment possible before go-live', `${possible.toFixed(0)} people`]] }
  }

  const questions = resource.questions || []
  const scored = questions.filter((question) => question.type === 'single')
  const score = scored.length ? Math.round(scored.reduce((sum, question) => sum + answerScore(question, answers[question.id] || ''), 0) / scored.length) : 100
  const hardFails = questions.filter((question) => question.hardGate && answers[question.id] === 'no')
  const unresolved = questions.filter((question) => ['partly', 'unsure', 'no', 'not-started', 'evidence-needed', 'blocked'].includes(answers[question.id]))
  const positive = questions.filter((question) => answerScore(question, answers[question.id] || '') >= 80)

  let status = score >= 85 ? 'Strong foundation' : score >= 70 ? 'Nearly ready' : score >= 50 ? 'Development needed' : 'Significant preparation required'
  if (resource.slug === 'tools/tender-eligibility-checker') status = hardFails.length ? 'Not currently eligible on information provided' : unresolved.length ? 'Potentially eligible pending evidence or clarification' : 'Eligible on information provided'
  if (resource.slug === 'tools/bid-no-bid') status = hardFails.length ? 'NO-GO' : score >= 75 ? 'GO' : score >= 50 ? 'CONDITIONAL GO' : 'NO-GO'
  if (resource.slug === 'tools/submission-risk-checker') status = hardFails.length ? 'Blocked — critical items remain' : unresolved.length ? 'Material risks remain' : 'Ready for final authorisation'
  if (resource.slug === 'tools/evidence-health-check') status = score >= 85 ? 'Evidence-rich' : score >= 65 ? 'Usable but incomplete' : score >= 40 ? 'Thin evidence base' : 'Evidence-building priority'
  if (resource.slug === 'tools/score-my-response') status = score >= 85 ? 'Submission-ready on this self-check' : score >= 70 ? 'Strong, but material improvements remain' : score >= 45 ? 'Significant gaps' : 'Rebuild required'
  if (resource.slug === 'reports/opportunity-qualification') status = answers.decision === 'go' ? 'GO' : answers.decision === 'conditional' ? 'CONDITIONAL GO' : 'NO-GO'
  if (resource.kind === 'builder' && !['tools/bid-no-bid'].includes(resource.slug)) status = unresolved.length ? 'Draft complete — strengthening required' : 'Working record complete'

  return {
    status, score: scored.length ? score : null,
    summary: resource.outcome,
    strengths: positive.length ? positive.slice(0, 3).map((question) => question.section) : ['You completed a controlled first assessment and now have a recorded starting point.'],
    actions: unresolved.length ? unresolved.slice(0, 5).map((question) => `${question.section}: ${question.help}`) : ['Verify the result against the current buyer documents.', 'Save the report with the tender decision record.', 'Repeat the check if the procurement pack or organisation position changes.'],
  }
}

function formatAnswer(question: ResourceQuestion, value: string) {
  return question.options?.find((option) => option.value === value)?.label || value || 'Not answered'
}

function GuideExperience({ resource }: { resource: ResourceDefinition }) {
  const download = async () => {
    track('report_download', resource, { output: 'pdf' })
    const response = await fetch('/api/resources/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: resource.title, resultLabel: resource.resultLabel, status: 'TenderLab practical handbook', summary: resource.outcome, strengths: resource.sections?.map((section) => section.title) || [], actions: resource.sections?.map((section) => section.body) || [], answers: [] }) })
    if (!response.ok) return
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${resource.slug.split('/').pop()}.pdf`; anchor.click(); URL.revokeObjectURL(url)
  }
  return (
    <>
      <section className={styles.guideBody}>
        <div className={styles.shell}>
          <div className={styles.guideIntro}><span>Inside this guide</span><p>{resource.outcome}</p></div>
          <div className={styles.guideSections}>{resource.sections?.map((section, index) => <article key={section.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}</div>
          <button type="button" className={styles.primaryButton} onClick={download}>Download the PDF handbook</button>
        </div>
      </section>
      <NextStep resource={resource} />
    </>
  )
}

function NextStep({ resource }: { resource: ResourceDefinition }) {
  return <section className={styles.nextStep}><div className={styles.shell}><span>Relevant next step</span><h2>Your result should determine the support you see.</h2><p>TenderLab specialist support is shown here because it relates directly to this resource—not because every free tool leads to the same service.</p><div><Link href={resource.serviceHref || '/services'}>{resource.serviceLabel || 'Explore TenderLab services'} <span aria-hidden="true">↗</span></Link><Link href="/book-consultation">Book a consultation</Link></div></div></section>
}

export default function ResourceExperience({ resource }: { resource: ResourceDefinition }) {
  const questions = resource.questions || []
  const storageKey = `tenderlab-resource:${resource.slug}:v1`
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [reviewing, setReviewing] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [notice, setNotice] = useState('')
  const current = questions[step]

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      const savedAnswers = saved ? JSON.parse(saved) as Answers : {}
      const profileRaw = window.localStorage.getItem('tenderlab-organisation-profile:v1')
      const profile = profileRaw ? JSON.parse(profileRaw) as Record<string, string> : {}
      const profileAnswers: Answers = {}
      if (questions.some((question) => question.id === 'services') && profile.services) profileAnswers.services = profile.services
      if (questions.some((question) => question.id === 'geography') && profile.geography) profileAnswers.geography = profile.geography
      setAnswers({ ...profileAnswers, ...savedAnswers })
      const query = new URLSearchParams(window.location.search)
      const tender = query.get('tender') || query.get('title')
      if (tender && questions.some((question) => question.id === 'tender')) setAnswers((existing) => ({ ...existing, tender: existing.tender || tender }))
    } catch { /* local saving is optional */ }
    track('resource_view', resource)
  }, [resource, questions, storageKey])

  useEffect(() => { try { window.localStorage.setItem(storageKey, JSON.stringify(answers)) } catch { /* optional */ } }, [answers, storageKey])

  const progress = questions.length ? Math.round(((step + 1) / questions.length) * 100) : 0
  const complete = useMemo(() => questions.every((question) => !question.required || String(answers[question.id] || '').trim()), [answers, questions])

  if (resource.kind === 'guide') return <GuideExperience resource={resource} />

  const update = (value: string) => { if (!current) return; setAnswers((existing) => ({ ...existing, [current.id]: value })); setNotice('Answer saved') }
  const next = () => { if (!current || (current.required && !String(answers[current.id] || '').trim())) { setNotice('Choose or enter an answer before continuing.'); return } setNotice(''); if (step < questions.length - 1) { setStep(step + 1); track('tool_section_complete', resource, { section: current.section }) } else setReviewing(true) }
  const finish = () => { const nextResult = calculate(resource, answers); setResult(nextResult); setReviewing(false); track('tool_complete', resource, { result_band: nextResult.status }) }
  const reset = () => { setAnswers({}); setStep(0); setStarted(false); setReviewing(false); setResult(null); try { window.localStorage.removeItem(storageKey) } catch {} }
  const download = async () => {
    if (!result) return
    setNotice('Preparing your report…')
    const response = await fetch('/api/resources/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: resource.title, resultLabel: resource.resultLabel, ...result, answers: questions.map((question) => ({ question: question.label, answer: formatAnswer(question, answers[question.id]) })) }) })
    if (!response.ok) { setNotice('The report could not be prepared. Please try again.'); return }
    const blob = await response.blob(); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${resource.slug.split('/').pop()}-report.pdf`; anchor.click(); URL.revokeObjectURL(url); setNotice('Report downloaded'); track('report_download', resource, { output: 'pdf', result_band: result.status })
  }

  if (!started) return (
    <section className={styles.toolLanding}><div className={styles.shell}>
      <div className={styles.outcomeGrid}><article><span>01</span><strong>{questions.length} focused decisions</strong><p>One question at a time, with plain explanations and no registration wall.</p></article><article><span>02</span><strong>A documented diagnosis</strong><p>{resource.outcome}</p></article><article><span>03</span><strong>Your answers stay on this device</strong><p>Free-text answers are not sent to analytics. A report is generated only when you request it.</p></article></div>
      <button type="button" className={styles.primaryButton} onClick={() => { setStarted(true); track('tool_start', resource) }}>Start this resource <span aria-hidden="true">↗</span></button>
    </div></section>
  )

  if (result) return (
    <>
      <section className={styles.resultSection}><div className={styles.shell}>
        <div className={styles.resultHero}><div><span>{resource.resultLabel}</span><strong>{result.score === null ? result.status : `${result.score}%`}</strong>{result.score !== null && <em>{result.status}</em>}</div><div><h2>{result.status}</h2><p>{result.summary}</p></div></div>
        {result.calculations && <div className={styles.calculations}>{result.calculations.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>}
        <div className={styles.findings}><article><span>What is working</span><h3>Useful foundations</h3><ul>{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article><article><span>Highest-impact next actions</span><h3>Fix these before the next decision</h3><ol>{result.actions.map((item) => <li key={item}>{item}</li>)}</ol></article></div>
        <div className={styles.resultActions}><button type="button" className={styles.primaryButton} onClick={download}>Download PDF report</button><button type="button" className={styles.secondaryButton} onClick={() => { setResult(null); setReviewing(true) }}>Review answers</button><button type="button" className={styles.textButton} onClick={reset}>Start again</button></div><p className={styles.liveNotice} role="status" aria-live="polite">{notice}</p>
      </div></section><NextStep resource={resource} />
    </>
  )

  if (reviewing) return (
    <section className={styles.questionSection}><div className={styles.toolShell}><div className={styles.questionHead}><span>Check your answers</span><h2>Review the record before calculating the result.</h2><p>Changing an answer recalculates every dependent result.</p></div><div className={styles.reviewList}>{questions.map((question, index) => <button type="button" key={question.id} onClick={() => { setStep(index); setReviewing(false) }}><span>{question.section}</span><strong>{question.label}</strong><em>{formatAnswer(question, answers[question.id])}</em><b>Change</b></button>)}</div><div className={styles.questionActions}><button type="button" className={styles.secondaryButton} onClick={() => setReviewing(false)}>Back</button><button type="button" className={styles.primaryButton} disabled={!complete} onClick={finish}>Calculate result</button></div></div></section>
  )

  return (
    <section className={styles.questionSection}><div className={styles.toolShell}>
      <aside className={styles.toolProgress}><strong>{resource.shortTitle}</strong><span>Question {step + 1} of {questions.length}</span><div><i style={{ width: `${progress}%` }} /></div><ol>{questions.map((question, index) => <li key={question.id} className={index === step ? styles.currentStep : index < step ? styles.doneStep : ''}><button type="button" onClick={() => setStep(index)}>{question.section}</button></li>)}</ol></aside>
      <div className={styles.questionPanel}><span className={styles.questionEyebrow}>{current.section}</span><h2>{current.label}</h2><p>{current.help}</p>
        {current.type === 'single' && <fieldset className={styles.answers}><legend className="sr-only">{current.label}</legend>{current.options?.map((option) => <label key={option.value}><input type="radio" name={current.id} value={option.value} checked={answers[current.id] === option.value} onChange={() => update(option.value)} /><span>{option.label}</span></label>)}</fieldset>}
        {current.type === 'number' && <label className={styles.field}><span>{current.unit}</span><input type="number" min="0" step="0.01" value={answers[current.id] || ''} onChange={(event) => update(event.target.value)} inputMode="decimal" /></label>}
        {current.type === 'text' && <input className={styles.textField} type="text" value={answers[current.id] || ''} placeholder={current.placeholder} onChange={(event) => update(event.target.value)} />}
        {current.type === 'textarea' && <textarea className={styles.textArea} value={answers[current.id] || ''} placeholder={current.placeholder} rows={7} onChange={(event) => update(event.target.value)} />}
        <p className={styles.liveNotice} role="status" aria-live="polite">{notice}</p>
        <div className={styles.questionActions}><button type="button" className={styles.secondaryButton} onClick={() => step > 0 ? setStep(step - 1) : setStarted(false)}>Back</button><button type="button" className={styles.primaryButton} onClick={next}>{step === questions.length - 1 ? 'Check answers' : 'Continue'}</button></div>
      </div>
    </div></section>
  )
}
