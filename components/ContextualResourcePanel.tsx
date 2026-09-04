import Link from 'next/link'
import { RESOURCE_BY_SLUG, resourceHref } from '@/lib/resources-data'

export default function ContextualResourcePanel({ eyebrow = 'TenderLab resource centre', title = 'Use the evidence while it is in front of you.', slugs }: { eyebrow?: string; title?: string; slugs: string[] }) {
  const resources = slugs.map((slug) => RESOURCE_BY_SLUG.get(slug)).filter((item) => item !== undefined)
  if (!resources.length) return null
  return (
    <section className="ep-section tl-context-resources" aria-label="Relevant TenderLab resources">
      <div className="ep-shell">
        <div className="ep-section-head ep-section-head--split"><div><p className="ep-kicker">{eyebrow}</p><h2>{title}</h2></div><p>Start without creating an account. The result explains the diagnosis and next actions before showing relevant specialist support.</p></div>
        <div className="tl-context-resources__grid">
          {resources.map((resource, index) => <Link key={resource.slug} href={resourceHref(resource)}><span>{String(index + 1).padStart(2, '0')}</span><small>{resource.kind}</small><h3>{resource.shortTitle}</h3><p>{resource.summary}</p><strong>Open resource ↗</strong></Link>)}
        </div>
      </div>
    </section>
  )
}
