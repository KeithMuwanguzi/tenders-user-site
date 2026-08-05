import Link from 'next/link'

/* ============================================================
   TopBar - Option 4 (Trust-stack rollout, 2 June 2026)
   Sticky bar fixed to the top of every page. Red background.
   Socials + contact on the LEFT, reviews on the RIGHT.
   All six off-domain profiles linked. Trustpilot wording is honest
   ("Find us on Trustpilot") because reviews are still building.

   IMPORTANT — this component keeps className="top-bar" on the outer
   element so the existing globals.css rules apply:
     .top-bar { position: fixed; top: 0; left: 0; right: 0;
                z-index: 1000; height: 34px; }
     .nav    { position: fixed; top: 34px; ... }   (sits below)
     @media (max-width: 1024px) { .top-bar { display: none !important } }

   The inline style on the outer div only overrides the bits we need
   to change (background colour, border, flex alignment). Everything
   else - the fixed positioning, the 34px height, the mobile-hide -
   is inherited from globals.css and behaves exactly as before.

   Layout is built to fit inside 34px. If we ever want a taller bar,
   we also need to update .nav { top: 34px; } in globals.css to the
   new value. For now we stay within the existing 34px envelope.
   ============================================================ */

const RED = '#B52E24'
const WHITE_92 = 'rgba(255,255,255,0.92)'
const PILL_BG = 'rgba(24,35,50,0.22)'
const PILL_BORDER = 'rgba(255,255,255,0.34)'
const GOLD = '#FFD166'

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/tenderlabuk',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tenderlabuk/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

/* The outer div keeps className="top-bar" so globals.css gives us the
   fixed positioning, the 34px height, the z-index, and the mobile-hide. */
const barOverride: React.CSSProperties = {
  background: RED,
  borderBottom: 'none',
  display: 'flex',
  alignItems: 'center',
}

const innerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1320px',
  margin: '0 auto',
  padding: '0 24px',
  gap: '16px',
  fontSize: '12.5px',
  color: '#fff',
}

const leftGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
}

const socialsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
}

const socialLinkStyle: React.CSSProperties = {
  color: WHITE_92,
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'color 0.15s',
}

const dividerStyle: React.CSSProperties = {
  opacity: 0.4,
  fontSize: '12.5px',
  color: '#fff',
}

const contactRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
}

const contactLinkStyle: React.CSSProperties = {
  color: '#fff',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontWeight: 500,
  textDecoration: 'none',
}

const reviewsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
}

const pillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '3px 10px',
  borderRadius: '14px',
  fontSize: '11.5px',
  fontWeight: 600,
  background: PILL_BG,
  border: `1px solid ${PILL_BORDER}`,
  color: '#fff',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  lineHeight: '1.4',
}

const starsStyle: React.CSSProperties = {
  color: GOLD,
  letterSpacing: '0.5px',
  fontSize: '11px',
}

const arrowStyle: React.CSSProperties = {
  fontSize: '10px',
  opacity: 0.85,
  marginLeft: '1px',
}

export default function TopBar() {
  return (
    <div className="top-bar" style={barOverride}>
      <div style={innerStyle}>
        {/* LEFT: socials + divider + contact */}
        <div style={leftGroupStyle}>
          <div style={socialsRowStyle}>
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={socialLinkStyle}
              >
                {s.icon}
              </Link>
            ))}
          </div>
          <span style={dividerStyle} aria-hidden="true">|</span>
          <div style={contactRowStyle}>
            <a href="mailto:info@tenderlab.co.uk" style={contactLinkStyle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>info@tenderlab.co.uk</span>
            </a>
            <a href="tel:+441707240393" style={contactLinkStyle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>01707 240393</span>
            </a>
          </div>
        </div>

        {/* RIGHT: reviews (Google + Trustpilot) */}
        <div style={reviewsRowStyle}>
          <a
            href="https://g.page/r/CarBdrVY3WO4EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            style={pillStyle}
            title="Read our Google reviews"
            aria-label="Read our Google reviews"
          >
            <span style={starsStyle} aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span>Read our Google reviews</span>
            <span style={arrowStyle} aria-hidden="true">&rsaquo;</span>
          </a>
          <a
            href="https://uk.trustpilot.com/review/tenderlab.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            style={pillStyle}
            title="Find us on Trustpilot"
            aria-label="Find us on Trustpilot"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M12 1.5l2.83 7.39H22.5l-6.14 4.46 2.34 7.15L12 16.04l-6.7 4.46 2.34-7.15L1.5 8.89h7.67z" />
            </svg>
            <span>Find us on Trustpilot</span>
          </a>
        </div>
      </div>
    </div>
  )
}
