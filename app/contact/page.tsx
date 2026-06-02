import type { Metadata } from 'next'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import ContactForm from './ContactForm'
import FaqAccordion from './FaqAccordion'


export const metadata: Metadata = {
  title: 'Contact | TenderLab - Send an Enquiry',
  description:
    'Send your tender enquiry to TenderLab. We read the specification, identify the scoring structure, and tell you whether the win is realistic within one working day. 92% win rate.',
  alternates: { canonical: '/contact' },
  openGraph: defaultOpenGraph({
    title: 'Contact | TenderLab - Send an Enquiry',
    description: 'Send your tender enquiry to TenderLab. We read the specification, identify the scoring structure, and tell you whether the win is realistic within one working day. 92% win rate.',
    path: '/contact',
  }),
  twitter: defaultTwitter({
    title: 'Contact | TenderLab - Send an Enquiry',
    description: 'Send your tender enquiry to TenderLab. We read the specification, identify the scoring structure, and tell you whether the win is realistic within one working day. 92% win rate.',
  }),
}

const STEPS = [
  {
    num: '01',
    heading: 'We read the ITT',
    body: 'Full specification review: every appendix, every scoring descriptor, every criterion weighting. Within one working day of receiving the documents.',
  },
  {
    num: '02',
    heading: 'We send you an honest assessment',
    body: 'Win probability, scoring structure breakdown, our recommendation. If we do not think you should bid, we will say so. No charge for this step.',
  },
  {
    num: '03',
    heading: 'You decide whether to proceed',
    body: 'No obligation past the assessment. If you proceed, we send the intake form — 45–60 minutes of your time, then TenderLab handles everything from there.',
  },
  {
    num: '04',
    heading: 'Submission-ready delivery',
    body: '5–10 working days from intake to submission-ready document. Quality-gated before delivery. Every criterion scored 4 or above before you see it.',
  },
]

const CONTACT_DETAILS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.5 19.79 19.79 0 0 1 1.15 3.87 2 2 0 0 1 3.12 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: '01707 240393',
    href: 'tel:01707240393',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'info@tenderlab.co.uk',
    href: 'mailto:info@tenderlab.co.uk',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: '128 City Road, London, EC1V 2NX',
    href: 'https://maps.google.com/?q=128+City+Road+London+EC1V+2NX',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M9 16h6" />
      </svg>
    ),
    label: 'Company number 17184263',
    href: 'https://find-and-update.company-information.service.gov.uk/company/17184263',
  },
]

export default function ContactPage() {
  return (
    <main>

      {/* Hero */}
      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <div className="contact-hero__kicker">Free Assessment · No Obligation</div>
          <h1>Get In Touch</h1>
          <p className="contact-hero__sub">
            Send us your tender. We will read the specification, assess the scoring model, and tell you whether the win is realistic — within one working day.
          </p>
        </div>
      </section>

      {/* Main two-column section */}
      <section className="contact-main-section">
        <div className="container contact-layout">

          {/* Left — dark form card */}
          <div className="contact-form-card">
            <div className="contact-form-card__head">
              <h2>Get In Touch With Us</h2>
              <p>We&apos;d love to hear from you. Whether you have a question about our services, want to request a review, or just want to say hello — our team is here to help.</p>
            </div>
            <ContactForm />
          </div>

          {/* Right — steps + info */}
          <aside className="contact-aside">

            <div className="contact-next">
              <h3 className="contact-next__heading">What happens next</h3>
              <div className="contact-next__steps">
                {STEPS.map(step => (
                  <div key={step.num} className="contact-next__step">
                    <div className="contact-next__num">{step.num}</div>
                    <div className="contact-next__content">
                      <h4>{step.heading}</h4>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-info">
              <h3 className="contact-info__heading">Contact Information</h3>
              <ul className="contact-info__list">
                {CONTACT_DETAILS.map(d => (
                  <li key={d.label}>
                    <a href={d.href} className="contact-info__item" target={d.href.startsWith('http') ? '_blank' : undefined} rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      <span className="contact-info__icon">{d.icon}</span>
                      <span className="contact-info__label">{d.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-info">
              <h3 className="contact-info__heading">Find Us On</h3>
              <ul className="contact-info__list">
                <li>
                  <a href="https://g.page/r/CarBdrVY3WO4EBM/review" className="contact-info__item" target="_blank" rel="noopener noreferrer" aria-label="Read our Google reviews">
                    <span className="contact-info__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </span>
                    <span className="contact-info__label">Read our Google reviews</span>
                  </a>
                </li>
                <li>
                  <a href="https://uk.trustpilot.com/review/tenderlab.co.uk" className="contact-info__item" target="_blank" rel="noopener noreferrer" aria-label="Find us on Trustpilot">
                    <span className="contact-info__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 1.5l2.83 7.39H22.5l-6.14 4.46 2.34 7.15L12 16.04l-6.7 4.46 2.34-7.15L1.5 8.89h7.67z"/>
                      </svg>
                    </span>
                    <span className="contact-info__label">Find us on Trustpilot</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/tenderlabuk/" className="contact-info__item" target="_blank" rel="noopener noreferrer" aria-label="TenderLab on LinkedIn">
                    <span className="contact-info__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </span>
                    <span className="contact-info__label">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/tenderlabuk" className="contact-info__item" target="_blank" rel="noopener noreferrer" aria-label="TenderLab on Facebook">
                    <span className="contact-info__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </span>
                    <span className="contact-info__label">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/tenderlabuk/" className="contact-info__item" target="_blank" rel="noopener noreferrer" aria-label="TenderLab on Instagram">
                    <span className="contact-info__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </span>
                    <span className="contact-info__label">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>

          </aside>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion />

    </main>
  )
}
