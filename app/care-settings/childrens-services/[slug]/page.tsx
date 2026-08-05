import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

const ROUTES: Record<string, string> = {
  'care-home-accommodation': 'childrens-residential-care',
  'supported-accommodation': 'supported-accommodation',
  'temporary-accommodation': 'temporary-accommodation',
  'emergency-accommodation': 'emergency-accommodation',
  'supported-living': 'leaving-care-services',
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

export default async function LegacyChildrensServicesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const canonicalSlug = ROUTES[slug]
  if (!canonicalSlug) notFound()
  redirect(`/care-settings/${canonicalSlug}`)
}
