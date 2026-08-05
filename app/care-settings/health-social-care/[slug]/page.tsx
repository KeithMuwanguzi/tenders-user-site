import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

const ROUTES: Record<string, string> = {
  'domiciliary-care': 'domiciliary-care',
  'shared-lives': 'shared-lives',
  'residential-care': 'residential-care',
  'nursing-care': 'nursing-care',
  'extra-care-services': 'extra-care-housing',
  'reablement-services': 'reablement-services',
  'day-services': 'day-services',
  'live-in-care-services': 'live-in-care',
  'short-breaks': 'short-breaks-and-respite',
  'housing-support': 'housing-support',
}

export function generateStaticParams() {
  return Object.keys(ROUTES).map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const canonicalSlug = ROUTES[slug]
  return canonicalSlug
    ? {
        robots: { index: false, follow: true },
        alternates: { canonical: `/care-settings/${canonicalSlug}` },
      }
    : {}
}

export default async function LegacyHealthSocialCarePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const canonicalSlug = ROUTES[slug]
  if (!canonicalSlug) notFound()
  redirect(`/care-settings/${canonicalSlug}`)
}
