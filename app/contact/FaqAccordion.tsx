'use client'
import { useState } from 'react'

type FaqItem = { q: string; a: string }

const SECTIONS: { heading: string; items: FaqItem[] }[] = [
  {
    heading: 'Pricing and Payment',
    items: [
      {
        q: 'How much does tender writing cost?',
        a: 'Our pricing varies based on the scope of work. A full tender response typically ranges from £2,500 to £8,000 depending on length, complexity, and urgency. A mid-sized bid review costs £1,500–£3,000. We also offer training, evidence development, and ongoing support at different price points. Rather than assume pricing, we prefer to discuss your specific tender and provide a tailored quote.',
      },
      {
        q: 'Do you offer discounts for multiple tenders?',
        a: 'Yes. We offer package pricing for organisations bidding for multiple tenders in the same quarter or year. The more we work together, the better the value and the more efficient we can be. We also offer retainer arrangements for organisations that want ongoing support with tender strategy and bid reviews.',
      },
      {
        q: 'What is your free bid review offer and what is included?',
        a: 'Our free bid review is a genuine opportunity to get expert feedback without any sales pressure. You send us a draft tender response (or even just the tender spec if you have not started), and we review it and provide: assessment of your response against the tender scoring criteria, estimated scoring prediction, identified gaps and weak areas, top 3–5 improvements that would increase your score most, and recommendations on next steps. This typically takes 1 week.',
      },
      {
        q: 'Do you guarantee we will win the tender?',
        a: 'No. Anyone who guarantees a win is not being honest. Tender outcomes depend on multiple factors beyond even the best written response. What we can guarantee is that we will help you write the best response possible, maximise your score against the evaluation criteria, and give you honest feedback about your competitiveness before you bid.',
      },
    ],
  },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="faq-section">
      <div className="container">
        {SECTIONS.map(sec => (
          <div key={sec.heading} className="faq-block">
            <div className="faq-block__heading">
              <h2>{sec.heading} <span className="faq-block__arrow">→</span></h2>
            </div>
            <div className="faq-block__items">
              {sec.items.map(item => {
                const isOpen = open === item.q
                return (
                  <div key={item.q} className={`faq-item${isOpen ? ' open' : ''}`}>
                    <button
                      className="faq-item__trigger"
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-item__q">{item.q}</span>
                      <span className="faq-item__icon" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-item__body">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
