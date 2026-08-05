import type { Metadata } from 'next'
import TenderCategoryLanding from '../_components/TenderCategoryLanding'
import { getTenderLandingPage } from '@/lib/tender-landing-pages'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'

const page = getTenderLandingPage('supported-living')!
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/tenders/${page.slug}` },
  openGraph: defaultOpenGraph({ title: page.title, description: page.description, path: `/tenders/${page.slug}` }),
  twitter: defaultTwitter({ title: page.title, description: page.description }),
}

export default function SupportedLivingTendersPage() {
  return <TenderCategoryLanding page={page} />
}
