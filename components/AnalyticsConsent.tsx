'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'tenderlab-cookie-preferences'
const LEGACY_STORAGE_KEY = 'tenderlab-analytics-consent'
const MEASUREMENT_ID = 'G-DLMB4FKDG0'

type Preferences = { version: 2; necessary: true; analytics: boolean; updatedAt: string }

declare global {
  interface Window { [key: `ga-disable-${string}`]: boolean }
}

function storePreferences(analytics: boolean): Preferences {
  const preferences: Preferences = { version: 2, necessary: true, analytics, updatedAt: new Date().toISOString() }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  window.localStorage.removeItem(LEGACY_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent('tenderlab:consent-changed', { detail: preferences }))
  return preferences
}

function readPreferences(): Preferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Preferences>
      if (parsed.version === 2 && typeof parsed.analytics === 'boolean') return parsed as Preferences
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
  }
  const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY)
  if (legacy === 'accepted' || legacy === 'declined') return storePreferences(legacy === 'accepted')
  return null
}

function startAnalytics() {
  if (typeof window === 'undefined') return
  window[`ga-disable-${MEASUREMENT_ID}`] = false
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer?.push(args) }
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  if (document.getElementById('tl-ga-script')) return
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true })
  const script = document.createElement('script')
  script.id = 'tl-ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function stopAnalytics() {
  if (typeof window === 'undefined') return
  window[`ga-disable-${MEASUREMENT_ID}`] = true
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  document.cookie = '_ga=; Max-Age=0; path=/; SameSite=Lax'
  document.cookie = `_ga_${MEASUREMENT_ID.replace('G-', '')}=; Max-Age=0; path=/; SameSite=Lax`
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
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [managing, setManaging] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const dialogRef = useRef<HTMLElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const save = useCallback((analytics: boolean) => {
    const next = storePreferences(analytics)
    setPreferences(next)
    setAnalyticsEnabled(analytics)
    setPanelOpen(false)
    setManaging(false)
    if (analytics) startAnalytics()
    else stopAnalytics()
  }, [])

  const openSettings = useCallback(() => {
    setAnalyticsEnabled(preferences?.analytics ?? false)
    setManaging(true)
    setPanelOpen(true)
  }, [preferences])

  useEffect(() => {
    const stored = readPreferences()
    setPreferences(stored)
    setAnalyticsEnabled(stored?.analytics ?? false)
    if (!stored) setPanelOpen(true)
    else if (stored.analytics) startAnalytics()
    else stopAnalytics()
  }, [])

  useEffect(() => {
    if (!preferences?.analytics) return
    startAnalytics()
    sendPageView()
  }, [pathname, preferences?.analytics])

  useEffect(() => {
    const handleOpen = () => openSettings()
    window.addEventListener('tenderlab:open-cookie-settings', handleOpen)
    return () => window.removeEventListener('tenderlab:open-cookie-settings', handleOpen)
  }, [openSettings])

  useEffect(() => {
    if (!panelOpen) {
      document.body.classList.remove('tl-consent-open')
      previousFocusRef.current?.focus()
      return
    }
    document.body.classList.add('tl-consent-open')
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])') || [])
    controls[0]?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && preferences) {
        event.preventDefault()
        setPanelOpen(false)
        setManaging(false)
        return
      }
      if (event.key !== 'Tab' || controls.length === 0) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('tl-consent-open')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [panelOpen, preferences])

  return (
    <>
      {panelOpen && (
        <div className="tl-consent-backdrop">
          <section ref={dialogRef} className="tl-consent" role="dialog" aria-modal="true" aria-labelledby="tl-consent-title" aria-describedby="tl-consent-description">
            <div className="tl-consent__icon" aria-hidden="true">🍪</div>
            <div className="tl-consent__content">
              <p className="tl-consent__kicker">Your privacy choices</p>
              <h2 id="tl-consent-title">Here’s how we use cookies</h2>
              {!managing ? (
                <>
                  <div id="tl-consent-description" className="tl-consent__copy">
                    <p><strong>Necessary cookies</strong> keep TenderLab secure, remember your choices and make the website work.</p>
                    <p>With your permission, analytics cookies also help us:</p>
                    <ul>
                      <li>Understand which tender guidance people find useful</li>
                      <li>Measure visits and improve page performance</li>
                      <li>Find and fix navigation problems</li>
                    </ul>
                    <p>We do not use advertising cookies or sell your data. You can change your choice at any time. Read our <Link href="/privacy-policy#sec-09">Cookie Policy</Link>.</p>
                  </div>
                  <div className="tl-consent__actions">
                    <button type="button" className="tl-consent__decline" onClick={() => save(false)}>Reject all</button>
                    <button type="button" className="tl-consent__accept" onClick={() => save(true)}>Accept all</button>
                    <button type="button" className="tl-consent__manage" onClick={() => setManaging(true)}>Manage cookies</button>
                  </div>
                </>
              ) : (
                <div id="tl-consent-description" className="tl-consent__preferences">
                  <p>Choose which optional cookies TenderLab may use. Necessary cookies cannot be switched off.</p>
                  <div className="tl-consent__category">
                    <div><strong>Necessary cookies</strong><span>Security, core site features and your saved cookie choice.</span></div>
                    <span className="tl-consent__always-on">Always on</span>
                  </div>
                  <label className="tl-consent__category" htmlFor="tl-analytics-consent">
                    <div><strong>Analytics cookies</strong><span>Anonymous usage information that helps us improve the website.</span></div>
                    <span className="tl-consent__switch">
                      <input id="tl-analytics-consent" type="checkbox" checked={analyticsEnabled} onChange={(event) => setAnalyticsEnabled(event.target.checked)} />
                      <span aria-hidden="true" />
                    </span>
                  </label>
                  <div className="tl-consent__preference-actions">
                    <button type="button" className="tl-consent__accept" onClick={() => save(analyticsEnabled)}>Save my choices</button>
                    <button type="button" className="tl-consent__manage" onClick={() => setManaging(false)}>Back</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      {!panelOpen && preferences && <button type="button" className="tl-consent-settings" onClick={openSettings}>Cookie settings</button>}
    </>
  )
}
