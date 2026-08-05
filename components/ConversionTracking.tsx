'use client'

// components/ConversionTracking.tsx
//
// WHY THIS EXISTS: GA4 recorded 8 key events in the 90 days to 24 July 2026,
// and the only tracked conversion was the contact form's generate_lead. Every
// phone enquiry and every email enquiry was invisible, so the true enquiry
// count was unknowable. This attaches delegated listeners for the three
// conversion actions that were untracked.
//
// Mount once, in the root layout, inside <body>.

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}

export default function ConversionTracking() {
  useEffect(() => {
    // ---- tel: and mailto: clicks -------------------------------------------
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''

      if (href.startsWith('tel:')) {
        track('phone_call_click', {
          link_url: href,
          page_path: window.location.pathname,
          // Treated as a lead: a care provider dialling the number is the same
          // commercial event as a form submission, and historically the larger one.
          value: 1,
        })
        track('generate_lead', { method: 'phone', page_path: window.location.pathname })
        return
      }

      if (href.startsWith('mailto:')) {
        track('email_click', {
          link_url: href,
          page_path: window.location.pathname,
          value: 1,
        })
        track('generate_lead', { method: 'email', page_path: window.location.pathname })
        return
      }

      // WhatsApp / messaging links, if any are added later.
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)/.test(href)) {
        track('whatsapp_click', { link_url: href, page_path: window.location.pathname })
      }
    }

    // ---- form_start: first interaction with any form on the page ------------
    const started = new WeakSet<HTMLFormElement>()
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null
      const form = el?.closest?.('form') as HTMLFormElement | null
      if (!form || started.has(form)) return
      started.add(form)
      track('form_start', {
        form_id: form.id || form.getAttribute('name') || 'unnamed',
        page_path: window.location.pathname,
      })
      // Mark it so the unload handler can tell started-but-not-submitted apart.
      form.dataset.tlStarted = '1'
    }

    const onInquirySuccess = (event: Event) => {
      const form = document.getElementById('tender-enquiry-form') as HTMLFormElement | null
      if (!form) return
      form.dataset.tlSubmitted = '1'
      track('form_submit', {
        form_id: form.id || form.getAttribute('name') || 'unnamed',
        page_path: window.location.pathname,
        confirmed_delivery: true,
      })
      track('generate_lead', {
        method: 'contact_form',
        page_path: window.location.pathname,
        tender_context: Boolean((event as CustomEvent).detail?.tender),
      })
    }

    // ---- form_abandon: started, never submitted, page going away ------------
    const onHide = () => {
      if (document.visibilityState !== 'hidden') return
      document.querySelectorAll<HTMLFormElement>('form[data-tl-started="1"]').forEach((form) => {
        if (form.dataset.tlSubmitted === '1') return
        if (form.dataset.tlAbandonSent === '1') return
        form.dataset.tlAbandonSent = '1'

        // Which field did they stop at? This is the whole point of the event:
        // the contact form has 9 fields and we need to know where people quit.
        const fields = Array.from(
          form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            'input, textarea, select',
          ),
        ).filter((f) => f.type !== 'hidden' && f.type !== 'submit')

        const filled = fields.filter((f) => String(f.value || '').trim().length > 0)
        const lastFilled = filled[filled.length - 1]

        track('form_abandon', {
          form_id: form.id || form.getAttribute('name') || 'unnamed',
          fields_total: fields.length,
          fields_completed: filled.length,
          last_field: lastFilled?.name || lastFilled?.id || 'none',
          page_path: window.location.pathname,
        })
      })
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('focusin', onFocusIn, true)
    window.addEventListener('tenderlab:inquiry-success', onInquirySuccess)
    document.addEventListener('visibilitychange', onHide)

    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('focusin', onFocusIn, true)
      window.removeEventListener('tenderlab:inquiry-success', onInquirySuccess)
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [])

  return null
}
