import Image from 'next/image'
import Link from 'next/link'

type Props = {
  eyebrow: string
  title: string
  intro: string
  image: string
  imageAlt: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  tone?: 'cream' | 'blue' | 'peach' | 'yellow'
  imageFit?: 'cover' | 'contain'
}

export default function EditorialHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  primaryLabel = 'Contact us',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  tone = 'cream',
  imageFit = 'cover',
}: Props) {
  const titleClass = title.length > 56 ? ' ep-hero--long-title' : ''
  return (
    <section className={`ep-hero ep-hero--${tone}${titleClass}`}>
      <div className="ep-shell ep-hero__grid">
        <div className="ep-hero__copy">
          <p className="ep-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="ep-hero__intro">{intro}</p>
          <div className="ep-actions">
            <Link href={primaryHref} className="ep-button ep-button--primary">{primaryLabel} <span aria-hidden="true">↗</span></Link>
            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className="ep-link">{secondaryLabel} <span aria-hidden="true">↗</span></Link>
            ) : null}
          </div>
        </div>
        <div className={`ep-hero__image ep-hero__image--${imageFit}`}>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
        </div>
      </div>
    </section>
  )
}
