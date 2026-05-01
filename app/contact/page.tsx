import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import FaqAccordion from './FaqAccordion'

export const metadata: Metadata = {
  title: 'Contact | TenderLab — Send an Enquiry',
  description:
    'Send your tender enquiry to TenderLab. We read the specification, identify the scoring structure, and tell you whether the win is realistic — within one working day.',
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

          </aside>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion />

    </main>
  )
}
