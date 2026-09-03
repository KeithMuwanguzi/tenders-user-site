'use client'

import { useEffect, useMemo, useState } from 'react'

type CalendlyMessage = {
  event?: string
}

export default function CalendlyScheduler({
  calendlyUrl,
}: {
  calendlyUrl: string
}) {
  const [scheduled, setScheduled] = useState(false)
  const source = useMemo(() => {
    const url = new URL(calendlyUrl)
    url.searchParams.set('embed_domain', typeof window === 'undefined' ? 'www.tenderlab.co.uk' : window.location.hostname)
    url.searchParams.set('embed_type', 'Inline')
    url.searchParams.set('hide_event_type_details', '1')
    url.searchParams.set('hide_gdpr_banner', '1')
    url.searchParams.set('background_color', 'fffdf9')
    url.searchParams.set('text_color', '17384f')
    url.searchParams.set('primary_color', 'bd3026')
    return url.toString()
  }, [calendlyUrl])

  useEffect(() => {
    const receive = (message: MessageEvent<CalendlyMessage>) => {
      if (message.origin !== 'https://calendly.com' || message.data?.event !== 'calendly.event_scheduled') return
      setScheduled(true)
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [])

  return (
    <section className="booking-calendar" aria-labelledby="booking-calendar-title">
      <header>
        <p>Live availability</p>
        <h2 id="booking-calendar-title">Choose your appointment.</h2>
        <span>Calendly shows only available weekday appointments. When configured on TenderLab’s calendar, the confirmation includes the Google Meet link automatically.</span>
      </header>
      {scheduled ? <div className="booking-calendar__success" role="status">Appointment selected. Calendly will email your confirmation and meeting details.</div> : null}
      <iframe src={source} title="Choose a TenderLab consultation appointment" loading="eager" />
    </section>
  )
}
