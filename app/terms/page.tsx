import type { Metadata } from 'next'
import Link from 'next/link'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service | TenderLab',
  description: 'Terms of service for TenderLab Ltd (Companies House 17184263). UK bid writing consultancy. Governing law: England and Wales.',
  alternates: { canonical: '/terms' },
  openGraph: defaultOpenGraph({
    title: 'Terms of Service | TenderLab',
    description: 'Terms of service for TenderLab Ltd. UK bid writing consultancy. Governing law: England and Wales.',
    path: '/terms',
  }),
  twitter: defaultTwitter({
    title: 'Terms of Service | TenderLab',
    description: 'Terms of service for TenderLab Ltd.',
  }),
}

const UPDATED = '28 May 2026'

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '4rem 1.5rem', lineHeight: 1.7 }}>
      <p style={{ color: '#5A6772', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Legal</p>
      <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem', color: '#0B1F3A' }}>Terms of Service</h1>
      <p style={{ color: '#5A6772', margin: '0 0 2rem' }}>Last updated: {UPDATED}</p>

      <h2>1. About us</h2>
      <p>TenderLab is a trading name of TenderLab Ltd, a company registered in England and Wales (Companies House number 17184263) with registered office at 128 City Road, London, EC1V 2NX. Contact: <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>.</p>

      <h2>2. Acceptance</h2>
      <p>By using this website or engaging our services you agree to these terms. If you do not accept them, do not use the site or our services. We may update these terms from time to time; the version on this page at the date of your engagement applies.</p>

      <h2>3. Our services</h2>
      <p>We provide tender writing, bid writing, pre-submission review, lost bid debrief, tender readiness audit, bid team coaching, pipeline tracking, mobilisation support, and tender retainer services for UK health and social care providers. Service-specific scope, deliverables, timelines and fees are set out in the engagement letter we issue before work begins.</p>

      <h2>4. Fees and payment</h2>
      <p>Fees are stated in your engagement letter. Unless agreed otherwise: invoices are payable within 14 days, late payments accrue statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998, and quoted fees exclude VAT (we will indicate where VAT applies).</p>

      <h2>5. Client obligations</h2>
      <p>You agree to provide complete, accurate and timely information; respond to draft reviews within agreed timeframes; not misrepresent the verified evidence we include in submissions; and pay agreed fees on time.</p>

      <h2>6. Win rate statements</h2>
      <p>Where we cite a 92% win rate across 200+ submissions, this refers to the aggregate of bids where the full submission was written or quality-gated by us and the commissioner has issued a final scoring decision. Past performance does not guarantee future results, and tender outcomes depend on factors outside our control (price competition, evaluator interpretation, commissioner internal processes).</p>

      <h2>7. Intellectual property</h2>
      <p>On full payment of fees, you receive a non-exclusive licence to use the submission content we produce for the procurement it was written for and any directly related re-bid. We retain ownership of underlying frameworks, templates, our 27-criterion quality gate, and methodology. We may reuse and adapt content patterns we develop, provided we do not disclose your confidential information.</p>

      <h2>8. Confidentiality</h2>
      <p>We treat all client information as confidential. We do not disclose your engagement, your bids, your pricing or any commissioner-specific evidence to third parties except as required by law or by our hosting and infrastructure providers acting on our instructions. We expect the same in return: do not share our methodology or draft content with competitors.</p>

      <h2>9. Limitation of liability</h2>
      <p>Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for any other liability that cannot be excluded under English law. Subject to that: our total liability arising out of or in connection with any engagement is limited to the fees paid by you for that engagement in the 12 months preceding the claim. We are not liable for loss of profit, loss of business opportunity, loss of contract or indirect or consequential loss.</p>

      <h2>10. Termination</h2>
      <p>Either party may terminate an engagement by written notice with 14 days&apos; warning, or immediately if the other party commits a material breach that is not remedied within 14 days. On termination you pay for work performed up to the termination date.</p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>These terms are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction over any disputes arising under these terms.</p>

      <h2>12. Contact</h2>
      <p>To raise an issue or query under these terms, email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a> or write to TenderLab Ltd, 128 City Road, London, EC1V 2NX. We aim to respond within 5 working days.</p>

      <hr style={{ margin: '2.5rem 0', border: 0, borderTop: '1px solid #E0E4E8' }} />
      <p style={{ fontSize: '0.875rem', color: '#5A6772' }}>
        TenderLab Ltd, Companies House 17184263. Registered office: 128 City Road, London, EC1V 2NX. <Link href="/privacy-policy">Privacy policy</Link> &middot; <Link href="/contact">Contact</Link>
      </p>
    </main>
  )
}
