import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TenderLab | Specialist Health & Social Care Bid Writing',
  description:
    'TenderLab is a specialist tender writing and bid consultancy operating exclusively within UK health and social care procurement. 92% win rate across 200+ local authority and NHS submissions.',
  keywords: 'tender writing, bid writing, health social care, UK, tender consultancy',
  icons: {
    icon: '/images/Logo/tenderlab-logo-transparent.png',
    apple: '/images/Logo/tenderlab-logo-transparent.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
