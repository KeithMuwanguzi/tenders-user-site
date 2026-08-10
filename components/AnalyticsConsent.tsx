'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'tenderlab-analytics-consent'
const MEASUREMENT_ID = 'G-DLMB4FKDG0'

type Choice = 'accepted' | 'declined' | null

function startAnalytics() {
  if (typeof window === 'undefined' || document.getElementById('tl-ga-script')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  })

  const script = document.createElement('script')
  script.id = 'tl-ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function sendPageView() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  })
}

export default function AnalyticsConsent() {
  const pathname = usePathname()
  const [choice, setChoice] = useState<Choice>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const dialogRef = useRef<HTMLElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const choose = useCallback((nextChoice: Exclude<Choice, null>) => {
    window.localStorage.setItem(STORAGE_KEY, nextChoice)
    setChoice(nextChoice)
    setPanelOpen(false)
    if (nextChoice === 'accepted') {
      startAnalytics()
    } else {
      document.cookie = '_ga=; Max-Age=0; path=/'
      document.cookie = `_ga_${MEASUREMENT_ID.replace('G-', '')}=; Max-Age=0; path=/`
    }
  }, [])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Choice
    if (stored === 'accepted' || stored === 'declined') {
      setChoice(stored)
      if (stored === 'accepted') startAnalytics()
    } else {
      setPanelOpen(true)
    }
  }, [])

  useEffect(() => {
    if (choice !== 'accepted') return
    startAnalytics()
    sendPageView()
  }, [choice, pathname])

  useEffect(() => {
    const shell = document.getElementById('site-shell')
    if (!panelOpen) {
      shell?.removeAttribute('inert')
      previousFocusRef.current?.focus()
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null
    shell?.setAttribute('inert', '')
    const controls = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || [],
    )
    controls[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (choice === null) choose('declined')
        else setPanelOpen(false)
        return
      }
      if (event.key !== 'Tab' || controls.length === 0) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      shell?.removeAttribute('inert')
    }
  }, [choice, choose, panelOpen])

  return (
    <>
      {panelOpen && (
        <section
          ref={dialogRef}
          className="tl-consent"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tl-consent-title"
          aria-describedby="tl-consent-description"
        >
          <div>
            <p className="tl-consent__kicker">Your privacy</p>
            <h2 id="tl-consent-title">Choose whether we may measure visits.</h2>
            <p id="tl-consent-description">
              The website works without analytics. If you accept, anonymous visit information
              helps us understand which tender guidance is useful. We do not use advertising cookies.
              {' '}<Link href="/privacy-policy">Read the privacy policy</Link>.
            </p>
          </div>
          <div className="tl-consent__actions">
            <button type="button" className="tl-consent__accept" onClick={() => choose('accepted')}>
              Accept analytics
            </button>
            <button type="button" className="tl-consent__decline" onClick={() => choose('declined')}>
              Continue without analytics
            </button>
          </div>
        </section>
      )}
      {!panelOpen && choice && (
        <button type="button" className="tl-consent-settings" onClick={() => setPanelOpen(true)}>
          Privacy settings
        </button>
      )}
    </>
  )
}
