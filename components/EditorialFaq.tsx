type Item = { q: string; a: string }

export default function EditorialFaq({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="ep-section ep-faq" id="faqs">
      <div className="ep-shell ep-faq__grid">
        <div className="ep-section-head">
          <p className="ep-kicker">Frequently asked questions</p>
          <h2>{title}</h2>
        </div>
        <div className="ep-faq__list">
          {items.map((item, index) => (
            <details key={item.q}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
