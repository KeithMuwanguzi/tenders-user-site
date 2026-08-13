import Image from 'next/image'
import Link from 'next/link'

const groups = [
  ['Services', [['Complete bid writing','/services/bid-writing'],['Bid viability','/services/bid-viability'],['Pre-submission review','/services/pre-submission-review'],['Tender training','/services/tender-training'],['Compare services','/services']]],
  ['Explore', [['Live tenders','/tenders'],['Care settings','/care-settings'],['Case studies','/case-studies'],['Blogs','/blog'],['FAQs','/faqs']]],
  ['TenderLab', [['About TenderLab','/about'],['Our process','/process'],['Client reviews','/reviews'],['Book a consultation','/book-consultation'],['Contact us','/contact']]],
] as const

export default function Footer() {
  return (
    <footer className="campaign-footer">
      <div className="campaign-footer__contact">
        <div><p>Ready to discuss a live opportunity?</p><h2>Start with the buyer documents.</h2></div>
        <div><a href="tel:+441707240393">01707 240393</a><a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a><address>128 City Road, London EC1V 2NX</address></div>
        <Link href="/contact">Contact TenderLab <span>→</span></Link>
      </div>
      <div className="campaign-footer__main">
        <div className="campaign-footer__identity"><Link href="/"><Image src="/design-v4/images/logo.png" alt="TenderLab" width={132} height={72} /></Link><p>Specialist tender writing and bid consultancy for UK health and social care providers.</p></div>
        {groups.map(([title, links]) => <nav key={title} aria-label={title}><h2>{title}</h2>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>)}
        <nav aria-label="Independent profiles"><h2>Independent profiles</h2><a href="https://g.page/r/CarBdrVY3WO4EBM/review" target="_blank" rel="noopener noreferrer">Google Reviews ↗</a><a href="https://uk.trustpilot.com/review/tenderlab.co.uk" target="_blank" rel="noopener noreferrer">Trustpilot ↗</a><a href="https://www.linkedin.com/company/tenderlabuk/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></nav>
      </div>
      <div className="campaign-footer__base"><span>© {new Date().getFullYear()} TenderLab Ltd · Company 17184263</span><div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms of service</Link></div></div>
    </footer>
  )
}
