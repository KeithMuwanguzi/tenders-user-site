import Link from 'next/link'

type Props = {
  /** Headline shown in the card. Override per page context. */
  title?: string
  /** Sub-copy underneath. */
  body?: string
  /** Button label. */
  cta?: string
  /** Attribution tag appended to /contact?ref=... for analytics. */
  attribution?: string
}

/**
 * Opportunity-assessment CTA card for the right rail.
 *
 * Note: the prop name is `attribution` (not `ref`) because React reserves the
 * `ref` prop name for the refs system. Passing `ref="..."` to a server
 * component triggers a build error in Next 15. Renaming to `attribution`
 * keeps the same /contact?ref=... URL output without colliding with React.
 */
export default function ConsultationCTA({
  title = '92% win rate. Bid with us.',
  body = 'Free 20-minute call to scope your bid.',
  cta = 'Book a call →',
  attribution,
}: Props) {
  const href = attribution
    ? `/contact?ref=${encodeURIComponent(attribution)}#enquiry`
    : '/contact#enquiry'
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
