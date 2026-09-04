import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ResourceExperience from './ResourceExperience'
import { RESOURCES, RESOURCE_BY_SLUG, resourceHref } from '@/lib/resources-data'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import styles from '../resources.module.css'

export function generateStaticParams() { return RESOURCES.map((resource) => ({ slug: resource.slug.split('/') })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params; const resource = RESOURCE_BY_SLUG.get(slug.join('/')); if (!resource) return {}
  const path = resourceHref(resource)
  return { title: { absolute: `${resource.title} | TenderLab Resources` }, description: resource.summary, alternates: { canonical: path }, openGraph: defaultOpenGraph({ title: `${resource.title} | TenderLab`, description: resource.summary, path }), twitter: defaultTwitter({ title: `${resource.title} | TenderLab`, description: resource.summary }) }
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params; const resource = RESOURCE_BY_SLUG.get(slug.join('/')); if (!resource) notFound()
  return <main className={styles.resourcePage}><section className={styles.detailHero}><div className={styles.shell}><div className={styles.detailEyebrow}>Resource {String(resource.number).padStart(2, '0')} · {resource.kind}</div><div className={styles.detailGrid}><div><h1>{resource.title}</h1><p>{resource.summary}</p></div><aside><span>You receive</span><strong>{resource.outcome}</strong><em>No forced account before you see value.</em></aside></div></div></section><ResourceExperience resource={resource} /></main>
}
