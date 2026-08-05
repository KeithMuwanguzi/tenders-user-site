import Image from 'next/image'
import Link from 'next/link'
import styles from './EditorialPageHero.module.css'

type HeroAction = {
  href: string
  label: string
}

type EditorialPageHeroProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  caption: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  tone?: 'blue' | 'peach' | 'yellow'
}

export default function EditorialPageHero({
  id,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  caption,
  primaryAction,
  secondaryAction,
  tone = 'blue',
}: EditorialPageHeroProps) {
  return (
    <section className={`${styles.hero} ${styles[tone]}`} aria-labelledby={id}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id={id} className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          {(primaryAction || secondaryAction) && (
            <div className={styles.actions}>
              {primaryAction && (
                <Link className={styles.primaryAction} href={primaryAction.href}>
                  {primaryAction.label}<span aria-hidden="true">↗</span>
                </Link>
              )}
              {secondaryAction && (
                <Link className={styles.secondaryAction} href={secondaryAction.href}>
                  {secondaryAction.label}<span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          )}
        </div>

        <figure className={styles.figure}>
          <div className={styles.imageFrame}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              quality={88}
              sizes="(max-width: 900px) 100vw, 56vw"
              className={styles.image}
            />
          </div>
          <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
