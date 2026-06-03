import Link from 'next/link'
import Image from 'next/image'

/* ============================================================
   Footer with social row + review CTAs
   Adds: Facebook, Instagram, LinkedIn icons + Google review CTA +
   Trustpilot CTA. Sits under the existing phone/email/address block
   in the footer__brand column. Same red brand colour as TopBar.
   ============================================================ */

const SOCIAL_PROFILES = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/tenderlabuk',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tenderlabuk/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/tenderlabuk/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

const socialsBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255,255,255,0.15)',
}

const socialsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
}

const socialIconStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.10)',
  border: '1px solid rgba(255,255,255,0.20)',
  borderRadius: '50%',
  color: '#fff',
  transition: 'all 0.15s',
  textDecoration: 'none',
}

const reviewsRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '6px',
}

const reviewPillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  padding: '7px 14px',
  borderRadius: '20px',
  fontSize: '12.5px',
  fontWeight: 600,
  background: '#E63946',
  border: '1px solid #E63946',
  color: '#fff',
  textDecoration: 'none',
  transition: 'background 0.15s',
  whiteSpace: 'nowrap',
}

const starsStyle: React.CSSProperties = {
  color: '#FFD166',
  letterSpacing: '1px',
  fontSize: '12.5px',
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <Image
                src="/images/Logo/tenderlab-logo-transparent.png"
                alt="TenderLab"
                height={36}
                width={144}
                style={{ objectFit: 'contain', objectPosition: 'left center', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="footer__tagline">
              Specialist tender writing and bid consultancy exclusively for UK health and social care providers.
            </p>
            <a href="tel:+441707240393" className="footer__contact-item">
              <svg viewBox="0 0 512 512"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
              01707 240393
            </a>
            <a href="mailto:info@tenderlab.co.uk" className="footer__contact-item">
              <svg viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
              info@tenderlab.co.uk
            </a>
            <span className="footer__contact-item">
              <svg viewBox="0 0 384 512"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>
              128 City Road, London, EC1V 2NX
            </span>

            {/* Social profiles + review CTAs (added 2 June 2026) */}
            <div style={socialsBlockStyle}>
              <div style={socialsRowStyle}>
                {SOCIAL_PROFILES.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TenderLab on ${s.label}`}
                    style={socialIconStyle}
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
              <div style={reviewsRowStyle}>
                <a
                  href="https://g.page/r/CarBdrVY3WO4EBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={reviewPillStyle}
                  aria-label="Read our reviews on Google"
                >
                  <span style={starsStyle} aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span>Read on Google</span>
                </a>
                <a
                  href="https://uk.trustpilot.com/review/tenderlab.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={reviewPillStyle}
                  aria-label="Find us on Trustpilot"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                    <path d="M12 1.5l2.83 7.39H22.5l-6.14 4.46 2.34 7.15L12 16.04l-6.7 4.46 2.34-7.15L1.5 8.89h7.67z" />
                  </svg>
                  <span>Find us on Trustpilot</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer__col">
            <p className="footer__col-head">Navigation</p>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/process">Our Process</Link></li>
              <li><Link href="/care-settings">Care Settings</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/tenders">Tender Listings</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-head">Services</p>
            <ul>
              <li><Link href="/services#bid-writing">Bid Writing</Link></li>
              <li><Link href="/services#tender-review">Tender Review</Link></li>
              <li><Link href="/services#retainer">Tender Retainer</Link></li>
              <li><Link href="/services#debrief">Lost Bid Debrief</Link></li>
              <li><Link href="/services#readiness">Readiness Audit</Link></li>
              <li><Link href="/services#coaching">Bid Team Coaching</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-head">Resources</p>
            <ul>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/blog">Articles</Link></li>
              <li><Link href="/contact">Free Consultation</Link></li>
              <li><Link href="/reviews">Client Reviews</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} TenderLab. All rights reserved.</span>
          <span className="footer__company-number">Company number 17184263 (registered in England and Wales)</span>
          <div className="footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
