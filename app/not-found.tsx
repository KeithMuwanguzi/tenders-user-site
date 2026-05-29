import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found | TenderLab',
  description: 'The page you were looking for could not be found. Browse our tender writing services, case studies, and live tenders.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/404' },
}

export default function NotFound() {
  return (
    <main className="not-found-page" style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem' }}>
      <p style={{ color: '#C8102E', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>404</p>
      <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1.5rem', color: '#0B1F3A' }}>Page not found</h1>
      <p style={{ fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        The page you were looking for does not exist or has moved. We updated the site recently and a few URLs changed.
      </p>
      <p style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>Try one of these instead:</p>
      <ul style={{ lineHeight: 2, paddingLeft: '1.5rem' }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/services">Tender writing services</Link></li>
        <li><Link href="/care-settings">Care settings we support</Link></li>
        <li><Link href="/case-studies">Case studies (10 verified contract wins)</Link></li>
        <li><Link href="/blog">Blog and guides</Link></li>
        <li><Link href="/tenders">Live tenders</Link></li>
        <li><Link href="/contact">Contact us</Link></li>
      </ul>
      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#5A6772' }}>
        Need help finding something? Email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a> or call 01707 240393.
      </p>
    </main>
  )
}
