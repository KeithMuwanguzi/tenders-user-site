'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import CallbackModal from './CallbackModal'

type GrandChild = { label: string; href: string }
type Child = {
  label: string; href: string; desc?: string
  children?: GrandChild[]; color?: string
}
type NavItem =
  | { label: string; href: string; children?: undefined; mega?: undefined }
  | { label: string; href: string; children: Child[]; mega?: boolean }

const NAV: NavItem[] = [
  {
    label: 'Services', href: '/services',
    children: [
      { label: 'Bid Viability',          href: '/services/bid-viability',          desc: 'Check the opportunity before committing' },
      { label: 'Bid Writing',            href: '/services/bid-writing',            desc: 'Build the complete care tender response' },
      { label: 'Pre-Submission Review',  href: '/services/pre-submission-review',  desc: 'Challenge the draft before submission' },
      { label: 'Lost Bid Debrief',       href: '/services/lost-bid-debrief',       desc: 'Turn feedback into specific changes' },
      { label: 'Tender Readiness',       href: '/services/tender-readiness-audit', desc: 'Strengthen evidence before the next tender' },
      { label: 'Tender Training',        href: '/services/tender-training',        desc: 'Build an internal, repeatable method' },
      { label: 'Mobilisation Support',   href: '/services/mobilisation-support',   desc: 'Turn winning promises into delivery actions' },
      { label: 'Retained Support',       href: '/services/tender-retainer',        desc: 'Manage tendering as an ongoing function' },
      { label: 'Book a Consultation',    href: '/book-consultation',               desc: 'Choose and pay for focused tender advice' },
    ],
  },
  {
    label: 'Care Settings', href: '/care-settings', mega: true,
    children: [
      {
        label: 'Adult Social Care', href: '/care-settings', color: '#B02727',
        children: [
          { label: 'Domiciliary Care',      href: '/care-settings/domiciliary-care' },
          { label: 'Live-In Care',          href: '/care-settings/live-in-care' },
          { label: 'Residential Care',      href: '/care-settings/residential-care' },
          { label: 'Nursing Care',          href: '/care-settings/nursing-care' },
          { label: 'Supported Living',      href: '/care-settings/supported-living' },
          { label: 'Extra Care Housing',    href: '/care-settings/extra-care-housing' },
        ],
      },
      {
        label: "Children's Services", href: '/care-settings', color: '#2E5E8C',
        children: [
          { label: "Children's Residential Care",   href: '/care-settings/childrens-residential-care' },
          { label: 'Supported Accommodation (16+)', href: '/care-settings/supported-accommodation' },
          { label: 'Fostering Services',            href: '/care-settings/fostering-services' },
          { label: 'Leaving Care Services',         href: '/care-settings/leaving-care-services' },
          { label: 'Short Breaks (Children)',       href: '/care-settings/childrens-short-breaks' },
          { label: 'Family Support & Outreach',     href: '/care-settings/family-support-and-outreach' },
        ],
      },
      {
        label: 'Housing and Support', href: '/care-settings', color: '#0A6E5A',
        children: [
          { label: 'Housing Related Support', href: '/care-settings/housing-related-support' },
          { label: 'Temporary Accommodation', href: '/care-settings/temporary-accommodation' },
          { label: 'Emergency Accommodation', href: '/care-settings/emergency-accommodation' },
          { label: 'Supported Housing',       href: '/care-settings/supported-housing' },
        ],
      },
      {
        label: 'Health & Clinical', href: '/care-settings', color: '#5B3A8B',
        children: [
          { label: 'Community Health Services',         href: '/care-settings/community-health-services' },
          { label: 'Continuing Healthcare (CHC)',       href: '/care-settings/continuing-healthcare' },
          { label: 'Complex Care',                      href: '/care-settings/complex-care' },
          { label: 'Rehabilitation Services',           href: '/care-settings/rehabilitation-services' },
          { label: 'End of Life & Palliative Care',     href: '/care-settings/end-of-life-and-palliative-care' },
          { label: 'Hospital Discharge Services',       href: '/care-settings/hospital-discharge-services' },
        ],
      },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blogs',         href: '/blog' },
  {
    label: 'About Us', href: '/about',
    children: [
      { label: 'Our Story',     href: '/about' },
      { label: 'Our Process',   href: '/process' },
      { label: 'Client Reviews', href: '/reviews' },
      { label: 'Contact Us', href: '/contact', desc: 'Send a tender enquiry or share the buyer documents' },
    ],
  },
]

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const [scrolled,       setScrolled]        = useState(false)
  const [menuOpen,       setMenuOpen]        = useState(false)
  const [mobileExpanded, setMobileExpanded]  = useState<string | null>(null)
  const [openMenu,       setOpenMenu]        = useState<string | null>(null)
  const [callbackOpen,   setCallbackOpen]    = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const burgerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero')
      if (hero) {
        setScrolled(window.scrollY >= hero.getBoundingClientRect().height - 72)
      } else {
        setScrolled(window.scrollY > 100)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const drawer = drawerRef.current
    const closeButton = drawer?.querySelector<HTMLButtonElement>('.nav__drawer-close')
    closeButton?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        setMobileExpanded(null)
        burgerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !drawer) return
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (document.contains(burgerRef.current)) burgerRef.current?.focus()
    }
  }, [menuOpen])

  const openDropdown  = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180)
  }, [])

  const closeAll = useCallback(() => {
    setMenuOpen(false)
    setMobileExpanded(null)
    setOpenMenu(null)
  }, [])

  useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  const activeSection = (() => {
    if (pathname === '/services' || pathname.startsWith('/services/')) return '/services'
    if (pathname === '/care-settings' || pathname.startsWith('/care-settings/')) return '/care-settings'
    if (pathname === '/tenders' || pathname.startsWith('/tenders/')) return '/tenders'
    if (pathname === '/case-studies' || pathname.startsWith('/case-studies/')) return '/case-studies'
    if (pathname === '/blog' || pathname.startsWith('/blog/')) return '/blog'
    if (
      pathname === '/about' || pathname.startsWith('/about/') ||
      pathname === '/process' || pathname.startsWith('/process/') ||
      pathname === '/reviews' || pathname.startsWith('/reviews/') ||
      pathname === '/contact' || pathname.startsWith('/contact/')
    ) return '/about'
    return pathname
  })()

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    if (base === '/') return pathname === '/'
    return activeSection === base
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__topbar" />
        <div className="nav__strip">
          <div className="container">
            <div className="nav__inner">

              {/* Burger — visible on mobile, Bain puts it left */}
              <button
                ref={burgerRef}
                className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span /><span /><span />
              </button>

              {/* Logo */}
              <Link href="/" className="nav__logo" onClick={closeAll}>
                <Image
                  src="/images/Logo/Logo%20(2).png"
                  alt="TenderLab"
                  height={61} width={112} priority
                  sizes="112px"
                  style={{ objectFit: 'contain', objectPosition: 'left center' }}
                />
              </Link>

              {/* Desktop links */}
              <ul className="nav__links" role="list">
                {NAV.map((item) => {
                  const isOpen = openMenu === item.label
                  const active = isActive(item.href)

                  if (!item.children) {
                    return (
                      <li key={item.label} className="nav__item-wrap">
                        <Link href={item.href} onClick={closeAll}
                          aria-current={active ? 'page' : undefined}
                          className={`nav__item${active ? ' nav__item--active' : ''}`}>
                          {item.label}
                        </Link>
                      </li>
                    )
                  }

                  return (
                    <li key={item.label}
                      className={`nav__item-wrap nav__item-wrap--drop${item.mega ? ' nav__item-wrap--mega' : ''}`}
                      onMouseEnter={() => openDropdown(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <span className={`nav__item nav__item--btn${active ? ' nav__item--active' : ''}${isOpen ? ' nav__item--open' : ''}`}>
                        <Link href={item.href} onClick={closeAll} className="nav__item-link"
                          aria-current={active ? 'page' : undefined}>
                          {item.label}
                        </Link>
                        <button
                          className="nav__chevron-btn"
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-label={`${item.label} submenu`}
                          onClick={() => isOpen ? setOpenMenu(null) : openDropdown(item.label)}
                        >
                          <ChevronDown className={`nav__chevron${isOpen ? ' nav__chevron--up' : ''}`} />
                        </button>
                      </span>

                      {/* Standard dropdown */}
                      {!item.mega && (
                        <div
                          className={`nav__drop${isOpen ? ' nav__drop--open' : ''}`}
                          role="menu"
                          onMouseEnter={() => openDropdown(item.label)}
                          onMouseLeave={scheduleClose}
                        >
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} role="menuitem"
                              className="nav__drop-link" onClick={closeAll}>
                              <span className="nav__drop-label">{child.label}</span>
                              {child.desc && <span className="nav__drop-desc">{child.desc}</span>}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>

              {/* Right actions */}
              <div className="nav__actions">
                <Link
                  href="/tenders"
                  className={`nav__live${activeSection === '/tenders' ? ' nav__live--active' : ''}`}
                  onClick={closeAll}
                >
                  Live tenders
                </Link>
                <Link
                  href="/book-consultation"
                  className={`nav__live nav__book${activeSection === '/book-consultation' ? ' nav__live--active' : ''}`}
                  onClick={closeAll}
                >
                  Book consultation
                </Link>
                <button type="button" className="nav__callback" onClick={() => setCallbackOpen(true)}>Request a callback</button>
              </div>
            </div>
          </div>
        </div>

        {/* Mega panels — full-width, absolutely below nav__strip */}
        {(NAV.filter((i): i is NavItem & { mega: true; children: Child[] } => !!i.mega)).map((item) => {
          const isOpen = openMenu === item.label
          return (
            <div key={item.label}
              className={`nav__mega${isOpen ? ' nav__mega--open' : ''}`}
              role="region"
              aria-label={`${item.label} menu`}
              onMouseEnter={() => openDropdown(item.label)}
              onMouseLeave={scheduleClose}
            >
              <div className="container">
                <div className="nav__mega-inner">
                  <div className="nav__mega-grid">
                    {item.children.map((col) => (
                      <div key={col.label} className="nav__mega-col">
                        <div
                          className="nav__mega-col-head"
                          style={{ '--col-accent': col.color } as React.CSSProperties}
                        >
                          {col.label}
                        </div>
                        <ul className="nav__mega-list">
                          {col.children?.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href}
                                className="nav__mega-link" onClick={closeAll}>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="nav__mega-foot">
                    <Link href="/care-settings" className="nav__mega-cta" onClick={closeAll}>
                      Browse all care settings <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className={`nav__drawer${menuOpen ? ' nav__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="nav__drawer-head">
          <span className="nav__drawer-title">Explore TenderLab</span>
          <button
            type="button"
            className="nav__drawer-close"
            onClick={closeAll}
            aria-label="Close navigation menu"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="nav__drawer-scroll">
          <div className="nav__drawer-links">
            {NAV.map((item) => {
              if (!item.children) {
                return (
                  <Link key={item.label} href={item.href}
                    className={`nav__drawer-link${isActive(item.href) ? ' active' : ''}`}
                    onClick={closeAll}>
                    {item.label}
                  </Link>
                )
              }

              const expanded = mobileExpanded === item.label
              return (
                <div key={item.label} className="nav__drawer-group">
                  <button
                    className={`nav__drawer-trigger${expanded ? ' open' : ''}`}
                    onClick={() => setMobileExpanded(expanded ? null : item.label)}
                    aria-expanded={expanded}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`nav__chevron${expanded ? ' nav__chevron--up' : ''}`} />
                  </button>
                  <div className={`nav__drawer-sub${expanded ? ' nav__drawer-sub--open' : ''}`}>
                    {item.mega ? (
                      item.children.map((col) => (
                        <div key={col.label}>
                          <p className="nav__drawer-col-head" style={{ color: col.color }}>
                            {col.label}
                          </p>
                          {col.children?.map((link) => (
                            <Link key={link.href} href={link.href}
                              className="nav__drawer-sublink nav__drawer-sublink--deep"
                              onClick={closeAll}>
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      item.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className="nav__drawer-sublink" onClick={closeAll}>
                          {child.label}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="nav__drawer-foot">
            <Link href="/tenders" className="nav__drawer-live" onClick={closeAll}>
              See live tenders
            </Link>
            <Link href="/book-consultation" className="nav__drawer-book" onClick={closeAll}>
              Book a consultation
            </Link>
            <button
              type="button"
              className="nav__callback nav__callback--full"
              onClick={() => {
                setMenuOpen(false)
                setMobileExpanded(null)
                setCallbackOpen(true)
              }}
            >
              Request a callback
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="nav__backdrop" onClick={closeAll} aria-hidden="true" />
      )}
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  )
}
