'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Types ── */
type GrandChild = { label: string; href: string }
type Child = { label: string; href: string; children?: GrandChild[] }
type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: Child[] }

/* ── Nav data ── */
const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Bid Writing',            href: '/services/bid-writing' },
      { label: 'Pre-Submission Review',  href: '/services/pre-submission-review' },
      { label: 'Lost Bid Debrief',       href: '/services/lost-bid-debrief' },
      { label: 'Tender Readiness Audit', href: '/services/tender-readiness-audit' },
      { label: 'Bid Team Coaching',      href: '/services/bid-team-coaching' },
      { label: 'Pipeline Tracking',      href: '/services/pipeline-tracking' },
      { label: 'Mobilisation Support',   href: '/services/mobilisation-support' },
      { label: 'Tender Retainer',        href: '/services/tender-retainer' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About',   href: '/about' },
      { label: 'Process', href: '/process' },
      { label: 'Reviews', href: '/reviews' },
    ],
  },
  { label: 'Live Tenders', href: '/tenders' },
  {
    label: 'Care Settings',
    href: '/care-settings',
    children: [
      {
        label: 'Health & Social Care',
        href: '/care-settings/health-social-care',
        children: [
          { label: 'Domiciliary Care',       href: '/care-settings/health-social-care#domiciliary-care' },
          { label: 'Shared Lives',           href: '/care-settings/health-social-care#shared-lives' },
          { label: 'Residential Care',       href: '/care-settings/health-social-care#residential-care' },
          { label: 'Nursing Care',           href: '/care-settings/health-social-care#nursing-care' },
          { label: 'Extra Care Services',    href: '/care-settings/health-social-care#extra-care-services' },
          { label: 'Reablement Services',    href: '/care-settings/health-social-care#reablement-services' },
          { label: 'Day Services',           href: '/care-settings/health-social-care#day-services' },
          { label: 'Live-In Care Services',  href: '/care-settings/health-social-care#live-in-care-services' },
          { label: 'Short Breaks',           href: '/care-settings/health-social-care#short-breaks' },
          { label: 'Housing Support',        href: '/care-settings/health-social-care#housing-support' },
        ],
      },
      {
        label: "Children's Services",
        href: '/care-settings/childrens-services',
        children: [
          { label: 'Care Home Accommodation',  href: '/care-settings/childrens-services#care-home-accommodation' },
          { label: 'Supported Accommodation',  href: '/care-settings/childrens-services#supported-accommodation' },
          { label: 'Temporary Accommodation',  href: '/care-settings/childrens-services#temporary-accommodation' },
          { label: 'Emergency Accommodation',  href: '/care-settings/childrens-services#emergency-accommodation' },
          { label: 'Supported Living',         href: '/care-settings/childrens-services#supported-living' },
        ],
      },
    ],
  },
  { label: 'Blogs',        href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact',      href: '/contact' },
]

/* ── Arrow icons ── */
function ArrowDown() {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true">
      <path d="M1 1l3.5 3.5L1 8" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const [scrolled,          setScrolled]          = useState(false)
  const [menuOpen,          setMenuOpen]           = useState(false)
  const [mobileExpanded,    setMobileExpanded]     = useState<string | null>(null)
  const [mobileSub,         setMobileSub]          = useState<string | null>(null)
  const [openMenu,          setOpenMenu]           = useState<string | null>(null)
  const [openSubMenu,       setOpenSubMenu]        = useState<string | null>(null)
  const closeTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const subCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const openDropdown  = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => { setOpenMenu(null); setOpenSubMenu(null) }, 140)
  }, [])

  const openSub = useCallback((label: string) => {
    if (subCloseTimer.current) clearTimeout(subCloseTimer.current)
    setOpenSubMenu(label)
  }, [])

  const scheduleSub = useCallback(() => {
    subCloseTimer.current = setTimeout(() => setOpenSubMenu(null), 100)
  }, [])

  const closeAll = useCallback(() => {
    setMenuOpen(false)
    setMobileExpanded(null)
    setMobileSub(null)
    setOpenMenu(null)
    setOpenSubMenu(null)
  }, [])

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    if (base === '/') return pathname === '/'
    return pathname.startsWith(base)
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="nav__inner">

          {/* Logo */}
          <Link href="/" className="nav__logo" onClick={closeAll}>
            <Image
              src="/images/Logo/tenderlab-logo-transparent.png"
              alt="TenderLab"
              height={34} width={136} priority
              style={{
                objectFit: 'contain', objectPosition: 'left center',
                filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                transition: 'filter 0.35s ease',
              }}
            />
          </Link>

          {/* Desktop links */}
          <div className="nav__links">
            {NAV.map((item) => {
              if (!item.children) {
                return (
                  <Link key={item.label} href={item.href} onClick={closeAll}
                    className={['nav__link',
                      item.label === 'Home' ? 'nav__link--home' : '',
                      isActive(item.href) ? 'nav__link--active' : '',
                    ].filter(Boolean).join(' ')}>
                    {item.label}
                  </Link>
                )
              }

              const isOpen = openMenu === item.label
              return (
                <div key={item.label}
                  className={`nav__dropdown${isOpen ? ' open' : ''}`}
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <div className="nav__link nav__link--trigger" style={{ display: 'inline-flex', alignItems: 'center', gap: 0, padding: 0 }}>
                    <Link href={item.href} onClick={closeAll}
                      className={['nav__trigger-label', isActive(item.href) ? 'nav__link--active' : ''].filter(Boolean).join(' ')}>
                      {item.label}
                    </Link>
                    <button className="nav__trigger-chevron" aria-haspopup="true" aria-expanded={isOpen}
                      onClick={() => isOpen ? setOpenMenu(null) : openDropdown(item.label)}>
                      <span className={`nav__chevron-wrap${isOpen ? ' rotated' : ''}`}>
                        <ArrowDown />
                      </span>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="nav__panel" role="menu"
                      onMouseEnter={() => openDropdown(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children.map((child) => {
                        const hasSub = !!(child.children && child.children.length > 0)
                        const subOpen = openSubMenu === child.label
                        return (
                          <div key={child.href}
                            className={`nav__panel-item${hasSub ? ' nav__panel-item--has-sub' : ''}${subOpen ? ' open' : ''}`}
                            onMouseEnter={() => hasSub ? openSub(child.label) : scheduleSub()}
                            onMouseLeave={() => hasSub ? scheduleSub() : undefined}
                          >
                            <Link href={child.href} role="menuitem"
                              className="nav__panel-link" onClick={closeAll}>
                              {child.label}
                              {hasSub && <span className="nav__sub-arrow"><ArrowRight /></span>}
                            </Link>
                            {hasSub && subOpen && (
                              <div className="nav__sub-panel" role="menu"
                                onMouseEnter={() => openSub(child.label)}
                                onMouseLeave={scheduleSub}
                              >
                                {child.children!.map((gc) => (
                                  <Link key={gc.href} href={gc.href} role="menuitem"
                                    className="nav__panel-link" onClick={closeAll}>
                                    {gc.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="nav__right">
            <Link href="/contact" className="nav__score-btn" onClick={closeAll}>
              Score My Response
            </Link>
          </div>

          {/* Burger */}
          <button className={`nav__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="nav__mobile">
            {NAV.map((item) => {
              if (!item.children) {
                return (
                  <Link key={item.label} href={item.href}
                    className={`nav__mobile-link${isActive(item.href) ? ' active' : ''}`}
                    onClick={closeAll}>
                    {item.label}
                  </Link>
                )
              }

              const expanded = mobileExpanded === item.label
              return (
                <div key={item.label} className="nav__mobile-group">
                  <div className="nav__mobile-link nav__mobile-trigger" style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                    <Link href={item.href} className="nav__mobile-trigger-label" onClick={closeAll}>
                      {item.label}
                    </Link>
                    <button className="nav__mobile-trigger-chevron"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      aria-expanded={expanded}>
                      <span style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.22s ease', display: 'flex' }}>
                        <ArrowDown />
                      </span>
                    </button>
                  </div>

                  {expanded && (
                    <div className="nav__mobile-submenu">
                      {item.children.map((child) => {
                        const hasSub = !!(child.children && child.children.length > 0)
                        const subExpanded = mobileSub === child.label
                        return (
                          <div key={child.href}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Link href={child.href}
                                className="nav__mobile-sublink" style={{ flex: 1 }}
                                onClick={closeAll}>
                                {child.label}
                              </Link>
                              {hasSub && (
                                <button
                                  className="nav__mobile-trigger-chevron"
                                  style={{ padding: '8px 0 8px 12px' }}
                                  onClick={() => setMobileSub(subExpanded ? null : child.label)}
                                  aria-expanded={subExpanded}>
                                  <span style={{ transform: subExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.22s ease', display: 'flex' }}>
                                    <ArrowDown />
                                  </span>
                                </button>
                              )}
                            </div>
                            {hasSub && subExpanded && (
                              <div className="nav__mobile-subsubmenu">
                                {child.children!.map((gc) => (
                                  <Link key={gc.href} href={gc.href}
                                    className="nav__mobile-subsublink"
                                    onClick={closeAll}>
                                    {gc.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            <Link href="/contact" className="nav__score-btn nav__score-btn--mobile" onClick={closeAll}>
              Score My Response
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
