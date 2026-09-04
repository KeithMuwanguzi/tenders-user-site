'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TenderFitPanel({ id, title }: { id: string; title: string }) {
  const [hasProfile, setHasProfile] = useState(false)
  useEffect(() => {
    try { setHasProfile(Boolean(window.localStorage.getItem('tenderlab-organisation-profile:v1'))) } catch { setHasProfile(false) }
  }, [])
  const context = `?tender=${encodeURIComponent(title)}&tenderId=${encodeURIComponent(id)}`
  return (
    <section className="tender-detail__fit-panel" aria-labelledby="tender-fit-title">
      <p className="ep-kicker">TenderLab Fit</p>
      <h2 id="tender-fit-title">{hasProfile ? 'Review this opportunity against your saved information.' : 'Check whether this fits your organisation.'}</h2>
      <p>{hasProfile ? 'Your saved profile can reduce repeat questions, but every tender-specific condition still needs verification against the buyer documents.' : 'Start without creating an account. The tender title is carried into the eligibility and bid decision tools automatically.'}</p>
      <div className="tender-detail__inline-cta">
        <Link href={`/resources/tools/tender-eligibility-checker${context}`} className="ep-button ep-button--primary">Run eligibility check</Link>
        <Link href={`/resources/tools/bid-no-bid${context}`} className="ep-link">Make a bid / no-bid decision</Link>
      </div>
      <small>Indicative TenderLab guidance only. We do not claim to have analysed procurement attachments unless you provide and confirm them.</small>
    </section>
  )
}
