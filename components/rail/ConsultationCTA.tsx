import Link from 'next/link'

type Props = {
  /** Headline shown in the card. Override per page context. */
  title?: string
  /** Sub-copy underneath. */
  body?: string
  /** Button label. */
  cta?: string
  /** Attribution reference appended to /contact?ref=... */
  ref?: string
}

export default function ConsultationCTA({
  title = '92% win rate. Bid with us.',
  body = 'Free 20-minute call to scope your bid.',
  cta = 'Book a call →',
  ref,
}: Props) {
  const href = ref ? `/contact?ref=${encodeURIComponent(ref)}` : '/contact'
  return (
    <div className="he-cta-card">
      <div className="he-cta-card__ttl">{title}</div>
      <p>{body}</p>
      <Link className="he-cta-card__btn" href={href}>
        {cta}
      </Link>
    </div>
  )
}
