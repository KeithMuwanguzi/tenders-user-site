import type { Metadata } from 'next'
import Link from 'next/link'
import ResourceCard from './ResourceCard'
import { RESOURCES, RESOURCE_GROUPS } from '@/lib/resources-data'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import styles from './resources.module.css'

export const metadata: Metadata = {
  title: { absolute: 'Tender Resources, Calculators and Bid Tools | TenderLab' },
  description: 'Free tender readiness assessments, eligibility checks, pricing and mobilisation calculators, bid tools and practical UK care tender guides.',
  alternates: { canonical: '/resources' },
  openGraph: defaultOpenGraph({ title: 'Tender Resources, Calculators and Bid Tools | TenderLab', description: 'Turn tender uncertainty into a documented decision with TenderLab tools and guidance.', path: '/resources' }),
  twitter: defaultTwitter({ title: 'Tender Resources, Calculators and Bid Tools | TenderLab', description: 'Free decision tools and practical guidance for UK health and social care tenders.' }),
}

export default function ResourcesPage() {
  const featured = RESOURCES.filter((resource) => resource.featured).slice(0, 4)
  return (
    <main className={styles.resources}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.eyebrow}>TenderLab resource centre</div>
          <div className={styles.heroGrid}>
            <div>
              <h1>Tools that turn tender uncertainty into a decision.</h1>
              <p>Assess readiness, check a live opportunity, improve a response, plan delivery and create a documented next action—without registering before you see value.</p>
              <div className={styles.heroActions}>
                <Link href="/resources/tools/tender-readiness-assessment">Check tender readiness</Link>
                <Link href="/resources/tools/what-tenders-can-we-bid-for">Find likely matches</Link>
              </div>
            </div>
            <aside className={styles.heroDossier}>
              <span>Featured assessment</span>
              <strong>Tender Readiness Assessment</strong>
              <p>Organisation, regulation, finance, evidence, workforce, quality, mobilisation and bid capability.</p>
              <Link href="/resources/tools/tender-readiness-assessment">Start assessment <span aria-hidden="true">↗</span></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.featured} aria-labelledby="featured-resources">
        <div className={styles.shell}>
          <div className={styles.sectionHead}>
            <div><span>Start with a decision</span><h2 id="featured-resources">What do you need to know?</h2></div>
            <p>Every result explains the diagnosis, evidence gaps and exact next actions before showing relevant specialist support.</p>
          </div>
          <div className={styles.featuredGrid}>{featured.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div>
        </div>
      </section>

      {RESOURCE_GROUPS.map((group) => {
        const resources = RESOURCES.filter((resource) => resource.group === group)
        return (
          <section className={styles.librarySection} key={group} id={group === 'Learn' ? 'learn' : group === 'Plan delivery' ? 'calculators' : group === 'Assess your organisation' ? 'tools' : undefined}>
            <div className={styles.shell}>
              <div className={styles.libraryHeading}><span>{String(RESOURCE_GROUPS.indexOf(group) + 1).padStart(2, '0')}</span><h2>{group}</h2></div>
              <div className={styles.libraryGrid}>{resources.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div>
            </div>
          </section>
        )
      })}
    </main>
  )
}
