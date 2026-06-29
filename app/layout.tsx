import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import ReduxProvider from '@/store/Provider'
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  BRAND,
  organizationSchema,
  websiteSchema,
  LOGO_URL,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const GA_MEASUREMENT_ID = 'G-DLMB4FKDG0'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Win Care Tenders & Council Contracts | TenderLab',
    template: '%s',
  },
  description: BRAND.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: 'Next.js',
  keywords: [
    'how to win care tenders',
    'council care contracts',
    'how to get on a care framework',
    'domiciliary care tenders',
    'supported living tenders',
    'NHS care contracts',
    'how to become a care provider',
    'win council contracts',
    'care tender support',
    'framework application care',
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
   apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'UMLHV4HxkfIfzeul48d9nBZSMaKfFDo8TNbQAfhj_qc',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Win Care Tenders & Council Contracts | TenderLab',
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
    title: 'Win Care Tenders & Council Contracts | TenderLab',
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
    <html lang="en-GB" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Sitewide JSON-LD. Loaded as inline script so it ships in the
            server-rendered HTML and is crawlable on first byte. */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Analytics 4 - gtag.js */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <TopBar />
          <Nav />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
