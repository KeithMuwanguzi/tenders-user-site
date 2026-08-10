import type { Metadata, Viewport } from 'next'
import './globals.css'
import './editorial-system.css'
import Nav from '@/components/Nav'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import ConversionTracking from '@/components/ConversionTracking'
import AnalyticsConsent from '@/components/AnalyticsConsent'
import InternalLinkGuard from '@/components/InternalLinkGuard'
import ReduxProvider from '@/store/Provider'
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  BRAND,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TenderLab | Specialist Health & Social Care Bid Writing',
    template: '%s',
  },
  description: BRAND.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: 'Next.js',
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // NOTE: `alternates.canonical` is deliberately NOT set here.
  //
  // It previously read `canonical: '/'`. In the App Router, child pages that do
  // not declare their own canonical INHERIT the parent's, so every page missing
  // an explicit canonical was telling Google it was a duplicate of the
  // homepage. That is what de-indexed /care-settings/childrens-services and its
  // children. Each page now sets its own canonical; there is no inherited
  // default to leak.
  icons: {
    icon: '/images/Logo/tenderlab-logo-transparent.png',
    apple: '/images/Logo/tenderlab-logo-transparent.png',
  },
  verification: {
    google: 'UMLHV4HxkfIfzeul48d9nBZSMaKfFDo8TNbQAfhj_qc',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'TenderLab | Specialist Health & Social Care Bid Writing',
    description: BRAND.description,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'TenderLab. Specialist health and social care bid writing.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TenderLab | Specialist Health & Social Care Bid Writing',
    description: BRAND.description,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B1F3A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        {/* Sitewide JSON-LD.

            Previously emitted through next/script with strategy="beforeInteractive".
            In the App Router that does NOT put a <script type="application/ld+json">
            tag in the server-rendered HTML: Next routes it through
            self.__next_s.push and React injects it at hydration. A raw crawl of
            all 165 URLs on 25 July 2026 found zero real ld+json tags, and the
            Search Console "Search appearance" report was empty across 13,300
            impressions.

            JsonLd renders a plain <script> during SSR, so the schema is in the
            first byte for Googlebot and for AI retrieval crawlers. */}
        <JsonLd data={[organizationSchema, websiteSchema]} idPrefix="ld-site" />

      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#site-content">Skip to main content</a>
        <div id="site-shell">
          <ReduxProvider>
            <TopBar />
            <Nav />
            <div id="site-content" tabIndex={-1}>{children}</div>
            <Footer />
          </ReduxProvider>
        </div>
        {/* Tracks tel: clicks, mailto: clicks, form_start and form_abandon.
            None of these were measured before; every phone enquiry was invisible. */}
        <ConversionTracking />
        <AnalyticsConsent />
        <InternalLinkGuard />
      </body>
    </html>
  )
}
