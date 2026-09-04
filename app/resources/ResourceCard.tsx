import Link from 'next/link'
import type { ResourceDefinition } from '@/lib/resources-data'
import { resourceHref } from '@/lib/resources-data'
import styles from './resources.module.css'

const kindLabels: Record<ResourceDefinition['kind'], string> = {
  assessment: 'Interactive assessment', calculator: 'Calculator', builder: 'Interactive builder', guide: 'Guide', report: 'Executive report',
}

export default function ResourceCard({ resource }: { resource: ResourceDefinition }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTopline}>
        <span>{String(resource.number).padStart(2, '0')}</span>
        <span>{kindLabels[resource.kind]}</span>
      </div>
      <h3>{resource.shortTitle}</h3>
      <p>{resource.summary}</p>
      <div className={styles.cardOutcome}><strong>You receive</strong><span>{resource.outcome}</span></div>
      <Link href={resourceHref(resource)}>Open resource <span aria-hidden="true">↗</span></Link>
    </article>
  )
}
