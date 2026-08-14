import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Booking received | TenderLab',
  alternates: { canonical: '/book-consultation/confirmation' },
  robots: { index: false, follow: false },
}

export default function ConfirmationPage() {
  return <main className="booking-confirmation"><p className="campaign-eyebrow">Booking received</p><h1>Thank you. Your next step is being prepared.</h1><p>TenderLab will check the booking details, documents and preferred appointment before confirming the arrangement by email.</p><div><Link href="/">Return to TenderLab</Link><Link href="/contact">Contact us</Link></div></main>
}
