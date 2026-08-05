'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const TENDERLAB_HOSTS = new Set(['tenderlab.co.uk', 'www.tenderlab.co.uk'])

/**
 * Keeps links inherited from CMS content or older WordPress articles inside
 * the current application. Relative links already work normally; this guard
 * catches only absolute TenderLab URLs rendered by external content sources.
 */
export default function InternalLinkGuard() {
  const router = useRouter()

  useEffect(() => {
    const keepTenderLabLinksLocal = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.hasAttribute('download')) return

      let destination: URL
      try {
        destination = new URL(anchor.href)
      } catch {
        return
      }

      if (!TENDERLAB_HOSTS.has(destination.hostname.toLowerCase())) return

      event.preventDefault()
      router.push(`${destination.pathname}${destination.search}${destination.hash}`)
    }

    document.addEventListener('click', keepTenderLabLinksLocal)
    return () => document.removeEventListener('click', keepTenderLabLinksLocal)
  }, [router])

  return null
}
