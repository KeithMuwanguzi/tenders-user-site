import Image from 'next/image'
import Link from 'next/link'

const socialProfiles = [
  { label: 'Facebook', href: 'https://www.facebook.com/tenderlabuk' },
  { label: 'Instagram', href: 'https://www.instagram.com/tenderlabuk/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tenderlabuk/' },
]

const footerGroups = [
  {
    title: 'Tender support',
    links: [
      ['Bid viability', '/services/bid-viability'],
      ['Complete bid writing', '/services/bid-writing'],
      ['Pre-submission review', '/services/pre-submission-review'],
      ['Tender training', '/services/tender-training'],
      ['Retained support', '/services/tender-retainer'],
      ['Compare all services', '/services'],
    ],
  },
  {
    title: 'Explore',
    links: [
      ['Live tenders', '/tenders'],
      ['Care settings', '/care-settings'],
      ['Case studies', '/case-studies'],
      ['Tender guides', '/guides'],
      ['Blogs', '/blog'],
      ['Frequently asked questions', '/faqs'],
    ],
  },
  {
    title: 'TenderLab',
    links: [
      ['About TenderLab', '/about'],
      ['Our process', '/process'],
      ['Client reviews', '/reviews'],
      ['Book a consultation', '/book-consultation'],
      ['Contact us', '/contact'],
    ],
  },
] as const

export default function Footer() {
  return (
    <footer className="tl-footer">
      <div className="tl-footer__shell">
        <div className="tl-footer__lead" aria-label="TenderLab contact and next steps">
          <div className="tl-footer__identity">
            <Link href="/" aria-label="TenderLab home">
              <Image
                src="/images/Logo/tenderlab-logo-transparent.png"
                alt="TenderLab"
                width={112}
                height={61}
                sizes="112px"
              />
            </Link>
            <p>Specialist tender writing and bid consultancy for UK health and social care providers.</p>
            <div className="tl-footer__contact">
              <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
              <a href="tel:+441707240393">01707 240393</a>
            </div>
          </div>
          <div className="tl-footer__lead-copy">
            <p>Bring us the notice, the deadline and the service you deliver. We will start with the requirements and explain the responsible next step.</p>
            <div>
              <Link href="/book-consultation">Book a consultation <span aria-hidden="true">↗</span></Link>
              <Link href="/contact?request=callback#enquiry">Request a call back <span aria-hidden="true">↗</span></Link>
              <Link href="/tenders">See live tenders <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>

        <div className="tl-footer__directory">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="tl-footer__trust">
            <h2>Independent profiles</h2>
            <a href="https://g.page/r/CarBdrVY3WO4EBM/review" target="_blank" rel="noopener noreferrer">
              <span>★★★★★</span> Google Reviews ↗
            </a>
            <a href="https://uk.trustpilot.com/review/tenderlab.co.uk" target="_blank" rel="noopener noreferrer">
              Trustpilot ↗
            </a>
            <div className="tl-footer__socials">
              {socialProfiles.map((profile) => (
                <a key={profile.label} href={profile.href} target="_blank" rel="noopener noreferrer">
                  {profile.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="tl-footer__bottom">
          <span>© {new Date().getFullYear()} TenderLab Ltd · Company 17184263</span>
          <span>128 City Road, London, EC1V 2NX</span>
          <div>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
