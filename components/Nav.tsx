'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Types ── */
type GrandChild = { label: string; href: string }
type Child = { label: string; href: string; children?: GrandChild[]; color?: string }
type NavItem =
  | { label: string; href: string; children?: undefined; mega?: undefined }
  | { label: string; href: string; children: Child[]; mega?: boolean }

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
    mega: true,
    children: [
      {
        label: 'Adult Social Care',
        href: '/care-settings',
        color: '#B02727',
        children: [
          { label: 'Domiciliary Care',          href: '/care-settings/domiciliary-care' },
          { label: 'Live-In Care',              href: '/care-settings/live-in-care' },
          { label: 'Residential Care',          href: '/care-settings/residential-care' },
          { label: 'Nursing Care',              href: '/care-settings/nursing-care' },
          { label: 'Supported Living',          href: '/care-settings/supported-living' },
          { label: 'Extra Care Housing',        href: '/care-settings/extra-care-housing' },
        ],
      },
      {
        label: "Children's Services",
        href: '/care-settings',
        color: '#2E5E8C',
        children: [
          { label: "Children's Residential Care",     href: '/care-settings/childrens-residential-care' },
          { label: 'Supported Accommodation (16+)',   href: '/care-settings/supported-accommodation' },
          { label: 'Fostering Services',              href: '/care-settings/fostering-services' },
          { label: 'Leaving Care Services',           href: '/care-settings/leaving-care-services' },
          { label: 'Short Breaks (Children)',         href: '/care-settings/childrens-short-breaks' },
          { label: 'Family Support and Outreach',     href: '/care-settings/family-support-and-outreach' },
        ],
      },
      {
        label: 'Housing and Support',
        href: '/care-settings',
        color: '#0A6E5A',
        children: [
          { label: 'Housing Related Support',  href: '/care-settings/housing-related-support' },
          { label: 'Temporary Accommodation',  href: '/care-settings/temporary-accommodation' },
          { label: 'Emergency Accommodation',  href: '/care-settings/emergency-accommodation' },
          { label: 'Supported Housing',        href: '/care-settings/supported-housing' },
        ],
      },
      {
        label: 'Health and Clinical Services',
        href: '/care-settings',
        color: '#5B3A8B',
        children: [
          { label: 'Community Health Services',           href: '/care-settings/community-health-services' },
          { label: 'Continuing Healthcare (CHC)',         href: '/care-settings/continuing-healthcare' },
          { label: 'Complex Care',                        href: '/care-settings/complex-care' },
          { label: 'Rehabilitation Services',             href: '/care-settings/rehabilitation-services' },
          { label: 'End of Life and Palliative Care',     href: '/care-settings/end-of-life-and-palliative-care' },
          { label: 'Hospital Discharge Services',         href: '/care-settings/hospital-discharge-services' },
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

              /* ── Mega menu (Care Settings) ── */
              if (item.mega) {
                return (
                  <div key={item.label}
                    className={`nav__dropdown nav__dropdown--mega${isOpen ? ' open' : ''}`}
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
                      <div className="nav__mega-panel" role="menu"
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="nav__mega-grid">
                          {item.children.map((col) => (
                            <div key={col.label} className="nav__mega-col">
                              <div className="nav__mega-col-head" style={{ borderBottomColor: col.color }}>
                                <span className="nav__mega-col-dot" style={{ background: col.color }} />
                                {col.label}
                              </div>
                              <ul className="nav__mega-col-list">
                                {col.children?.map((link) => (
                                  <li key={link.href}>
                                    <Link href={link.href} role="menuitem"
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
                          <Link href="/care-settings" onClick={closeAll} className="nav__mega-foot-link">
                            View all care settings →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              /* ── Standard dropdown ── */
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
                      {item.mega ? (
                        /* Mobile mega: flat list of all links grouped by column */
                        item.children.map((col) => (
                          <div key={col.label}>
                            <div className="nav__mobile-mega-head" style={{ borderLeftColor: col.color }}>
                              {col.label}
                            </div>
                            {col.children?.map((link) => (
                              <Link key={link.href} href={link.href}
                                className="nav__mobile-sublink nav__mobile-sublink--indented"
                                onClick={closeAll}>
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        item.children.map((child) => {
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
                        })
                      )}
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
