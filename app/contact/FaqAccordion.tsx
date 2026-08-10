'use client'
import { useState } from 'react'

type FaqItem = { q: string; a: string }

const SECTIONS: { heading: string; items: FaqItem[] }[] = [
  {
    heading: 'Pricing and Payment',
    items: [
      {
        q: 'How much does tender writing cost?',
        a: 'Pricing depends on the procurement pack, number and length of scored responses, lots, deadline, evidence already available and the work your team will complete. We review those facts before providing a written scope and quote.',
      },
      {
        q: 'Do you offer discounts for multiple tenders?',
        a: 'A retained arrangement may be appropriate when several suitable tenders are expected and evidence development needs to continue between deadlines. The scope is tailored to realistic demand rather than sold as an automatic discount bundle.',
      },
      {
        q: 'Can you review a draft before we commit to a larger engagement?',
        a: 'Yes. The pre-submission review can be scoped around a defined group of important responses or the complete quality submission. We confirm the work and fee after seeing the buyer documents, draft and deadline.',
      },
      {
        q: 'Do you guarantee we will win the tender?',
        a: 'No. Tender outcomes depend on eligibility, evidence, delivery, price, competition and the buyer’s evaluation. TenderLab can improve compliance, structure and evaluator clarity, but cannot guarantee the buyer’s decision or a particular score.',
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
