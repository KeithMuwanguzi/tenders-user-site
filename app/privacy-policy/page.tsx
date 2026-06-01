import type { Metadata } from 'next'
import Link from 'next/link'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy | TenderLab',
  description: 'How TenderLab Ltd (Companies House 17184263) collects, uses and protects your personal data. UK GDPR and ePrivacy compliant.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: defaultOpenGraph({
    title: 'Privacy Policy | TenderLab',
    description: 'How TenderLab Ltd collects, uses and protects your personal data. UK GDPR and ePrivacy compliant.',
    path: '/privacy-policy',
  }),
  twitter: defaultTwitter({
    title: 'Privacy Policy | TenderLab',
    description: 'How TenderLab Ltd collects, uses and protects your personal data.',
  }),
}

const UPDATED = '28 May 2026'

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '4rem 1.5rem', lineHeight: 1.7 }}>
      <p style={{ color: '#5A6772', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Legal</p>
      <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem', color: '#0B1F3A' }}>Privacy Policy</h1>
      <p style={{ color: '#5A6772', margin: '0 0 2rem' }}>Last updated: {UPDATED}</p>

      <h2>Who we are</h2>
      <p>TenderLab is a trading name of TenderLab Ltd, a company registered in England and Wales (Companies House number 17184263). Our registered address is 128 City Road, London, EC1V 2NX.</p>
      <p>For all data protection enquiries email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a> or write to us at the address above.</p>

      <h2>The personal data we collect</h2>
      <ul>
        <li><strong>Contact data</strong> when you submit our consultation form, email us, or call us: name, email address, phone number, organisation, sector, and the contents of your enquiry.</li>
        <li><strong>Engagement data</strong> when you become a client: company contact details, tender specifications you share with us, draft response content, and verified evidence used to populate your submission.</li>
        <li><strong>Site analytics</strong>: anonymised page views, referring URL, device type, and approximate location. We do not capture personally identifying information through analytics.</li>
      </ul>

      <h2>How we use your data</h2>
      <p>We use the data above to respond to enquiries, deliver bid writing and consultancy services, manage our client relationships, send service updates, comply with legal obligations, and improve our website and content.</p>

      <h2>Lawful basis</h2>
      <ul>
        <li><strong>Consent</strong> when you tick a checkbox to receive marketing from us.</li>
        <li><strong>Contract</strong> when we deliver consultancy services you have engaged us for.</li>
        <li><strong>Legitimate interest</strong> when we respond to a business enquiry you sent us, or when we use anonymised analytics to improve the site.</li>
        <li><strong>Legal obligation</strong> when we retain financial records under HMRC rules.</li>
      </ul>

      <h2>Sharing your data</h2>
      <p>We do not sell your data. We share it only with: our accountants and auditors for financial reporting, our hosting and email providers (Vercel, Google Workspace) to deliver the service, professional advisors when required, and law enforcement when legally compelled.</p>

      <h2>Data retention</h2>
      <p>Consultation enquiries: held for 24 months from last contact, then deleted. Active client files: retained for the duration of the engagement plus 7 years for HMRC and contractual record-keeping. Marketing subscriber data: held until you unsubscribe.</p>

      <h2>Your rights under UK GDPR</h2>
      <p>You have the right to access your data, correct inaccurate data, request erasure, restrict processing, object to processing, request data portability, and withdraw consent at any time. To exercise any of these rights email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>. We will respond within 30 days.</p>
      <p>You also have the right to complain to the Information Commissioner&apos;s Office at <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">ico.org.uk</a> or by calling 0303 123 1113.</p>

      <h2>Cookies</h2>
      <p>This site uses strictly necessary cookies to deliver the page and optional analytics cookies. You can decline non-essential cookies at any time via your browser settings.</p>

      <h2>International transfers</h2>
      <p>Our hosting provider (Vercel) may transfer data outside the UK. Where this happens we rely on the UK&apos;s adequacy regulations and standard contractual clauses to safeguard your data.</p>

      <h2>Changes to this policy</h2>
      <p>We review this policy annually. The last updated date at the top of this page reflects the most recent change.</p>

      <hr style={{ margin: '2.5rem 0', border: 0, borderTop: '1px solid #E0E4E8' }} />
      <p style={{ fontSize: '0.875rem', color: '#5A6772' }}>
        TenderLab Ltd, Companies House 17184263. Registered office: 128 City Road, London, EC1V 2NX. <Link href="/terms">Terms of service</Link> &middot; <Link href="/contact">Contact</Link>
      </p>
    </main>
  )
}
