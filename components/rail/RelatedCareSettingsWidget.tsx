import Link from 'next/link'
import { getRelatedCareSettings } from '@/lib/care-settings-relations'

type Props = {
  /** Current care setting slug to derive siblings from. */
  currentSlug: string
  /** Optional widget title override. */
  title?: string
}

export default function RelatedCareSettingsWidget({
  currentSlug,
  title = 'Related care settings',
}: Props) {
  const siblings = getRelatedCareSettings(currentSlug)
  if (!siblings.length) return null

  return (
    <div className="he-widget">
      <div className="he-widget__head">
        <span className="he-widget__dot" />
        <h3>{title}</h3>
      </div>
      <div className="he-widget__body he-widget__body--list">
        {siblings.map(s => (
          <Link key={s.slug} href={`/care-settings/${s.slug}`} className="he-rel-link">
            <span>{s.label}</span>
            <span className="he-rel-link__arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
