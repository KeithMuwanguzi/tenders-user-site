'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  ['Services', '/services'], ['Care settings', '/care-settings'], ['Live tenders', '/tenders'],
  ['Case studies', '/case-studies'], ['Blogs', '/blog'], ['About', '/about'],
] as const

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  return (
    <nav className="campaign-nav" aria-label="Main navigation">
      <div className="campaign-nav__inner">
        <Link className="campaign-nav__logo" href="/" aria-label="TenderLab home">
          <Image src="/design-v4/images/logo.png" alt="TenderLab" width={118} height={64} priority />
        </Link>
        <button className="campaign-nav__toggle" type="button" aria-expanded={open} aria-controls="campaign-menu" onClick={() => setOpen((value) => !value)}>{open ? 'Close' : 'Menu'}</button>
        <div className="campaign-nav__links" id="campaign-menu" data-open={open}>
          {links.map(([label, href]) => <Link href={href} key={href} className={active(href) ? 'is-active' : ''} aria-current={active(href) ? 'page' : undefined}>{label}</Link>)}
          <Link href="/faqs" className={active('/faqs') ? 'is-active' : ''}>FAQs</Link>
        </div>
        <Link className="campaign-nav__cta" href="/contact">Contact us</Link>
      </div>
    </nav>
  )
}
