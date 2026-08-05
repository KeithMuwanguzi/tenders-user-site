'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ------------------------------------------------------------------
   HeroSlider - Bain-style hero for the TenderLab homepage.
   - Single component file. No edits to globals.css or app/page.tsx required.
   - Accepts `children` prop and ignores it so the existing call site
     <HeroSlider><div className="hero__bg"><Image .../></div></HeroSlider>
     still compiles. The Image passed in is not rendered (we use our own
     four CSS background images that rotate).
   - The visually-hidden page H1 for SEO is preserved (set up in the
     29-May-2026 SEO fix).
   - Each slide headline is an h2 to keep the heading hierarchy clean.
   - Auto-advance every 6.5s. Click any tab to jump. Hover pauses.
   - Respects prefers-reduced-motion (no zoom, no auto-advance).
------------------------------------------------------------------ */

type Slide = {
  label: string
  eyebrow: string
  headline: string
  cta: string
  href: string
  image: string
}

const SLIDES: Slide[] = [
  {
    label: 'Bid Writing',
    eyebrow: 'Bid Writing',
    headline: 'Specification-mirrored method statements that score 5 of 5.',
    cta: 'Explore the service',
    href: '/services/bid-writing',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80',
  },
  {
    label: 'Pre-Submission Review',
    eyebrow: 'Pre-Submission Review',
    headline:
      'An independent review of your draft against the buyer’s published criteria.',
    cta: 'Book a review',
    href: '/services/pre-submission-review',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80',
  },
  {
    label: 'Bid Team Coaching',
    eyebrow: 'Bid Team Coaching',
    headline:
      'Build a repeatable method for planning, evidencing and reviewing live submissions.',
    cta: 'See the coaching path',
    href: '/services/tender-training',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80',
  },
  {
    label: 'Tender Retainer',
    eyebrow: 'Tender Retainer',
    headline:
      'Agree the capacity and responsibilities your tender pipeline needs before deadlines tighten.',
    cta: 'Discuss a retainer',
    href: '/services/tender-retainer',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80',
  },
]

const SLIDE_MS = 6500

// Scoped inline keyframes + utility classes. Class names are unique
// (`tlh-` prefix = TenderLab Hero) so they cannot collide with anything
// in globals.css.
const SCOPED_CSS = `
@keyframes tlh-kenburns {
  0%   { transform: scale(1); }
  100% { transform: scale(1.10); }
}
@keyframes tlh-rise {
  to { opacity: 1; transform: translateY(0); }
}
.tlh-section { position: relative; width: 100%; height: calc(100vh - 100px); min-height: 640px; overflow: hidden; background: #0B1F3A; }
.tlh-bg, .tlh-bg-slide { position: absolute; inset: 0; }
.tlh-bg-slide { background-size: cover; background-position: center; opacity: 0; transition: opacity 1000ms ease-in-out; }
.tlh-bg-slide.is-active { opacity: 1; animation: tlh-kenburns 6500ms linear forwards; }
.tlh-overlay {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(180deg, rgba(11,31,58,0.65) 0%, rgba(11,31,58,0.25) 35%, rgba(11,31,58,0.70) 100%),
    linear-gradient(90deg, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.15) 60%);
}
.tlh-content { position: relative; z-index: 2; height: 100%; padding: 0 80px 220px; display: flex; flex-direction: column; justify-content: center; }
.tlh-eyebrow {
  color: #fff; font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
  margin-bottom: 18px; opacity: 0; transform: translateY(20px);
  animation: tlh-rise 800ms ease-out 200ms forwards;
}
.tlh-headline {
  color: #fff; font-size: clamp(28px, 3.6vw, 52px); font-weight: 700;
  line-height: 1.1; letter-spacing: -0.015em; max-width: 640px; margin: 0 0 28px;
  opacity: 0; transform: translateY(20px);
  animation: tlh-rise 800ms ease-out 350ms forwards;
}
.tlh-cta {
  display: inline-flex; align-items: center; gap: 14px; color: #fff;
  text-decoration: none; font-size: 12px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
  opacity: 0; transform: translateY(20px);
  animation: tlh-rise 800ms ease-out 500ms forwards;
  align-self: flex-start;
}
.tlh-cta-arrow {
  display: inline-block; width: 56px; height: 1.5px; background: #fff;
  position: relative; transition: width 0.3s ease;
}
.tlh-cta-arrow::after {
  content: ''; position: absolute; right: 0; top: -4px; width: 10px; height: 10px;
  border-right: 1.5px solid #fff; border-top: 1.5px solid #fff; transform: rotate(45deg);
}
.tlh-cta:hover .tlh-cta-arrow { width: 72px; }
.tlh-tabs { position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  padding: 0 80px 28px; display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; }
.tlh-tablist { flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px; }
.tlh-tab {
  background: none; border: 0; padding: 16px 0 0; text-align: left;
  color: rgba(255,255,255,0.7); font-family: inherit; font-size: 13px;
  font-weight: 500; cursor: pointer; position: relative; transition: color 0.3s ease;
}
.tlh-tab--active { color: #fff; font-weight: 600; }
.tlh-tab:hover:not(.tlh-tab--active) { color: rgba(255,255,255,0.92); }
.tlh-tab-progress {
  position: absolute; top: 0; left: 0; right: 100%; height: 2px; background: #C8102E;
  transition: right 60ms linear;
}
.tlh-scroll {
  color: #fff; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  opacity: 0.85; display: flex; flex-direction: column; align-items: center; gap: 8px; padding-bottom: 10px;
}
.tlh-scroll-icon {
  width: 28px; height: 28px; border: 1px solid rgba(255,255,255,0.4);
  border-radius: 50%; display: grid; place-items: center;
}
.tlh-scroll-icon::after {
  content: ''; width: 6px; height: 6px;
  border-right: 1.5px solid #fff; border-bottom: 1.5px solid #fff;
  transform: translateY(-1px) rotate(45deg);
}
.tlh-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
@media (max-width: 900px) {
  .tlh-content { padding: 0 24px 260px; }
  .tlh-tabs { padding: 0 24px 22px; gap: 14px; }
  .tlh-tablist { grid-template-columns: 1fr 1fr; gap: 18px 24px; }
  .tlh-tab { font-size: 12px; padding-top: 12px; }
  .tlh-scroll { display: none; }
}
`

export default function HeroSlider(_props: { children?: React.ReactNode }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const progressStartRef = useRef<number>(0)
  const pauseAtRef = useRef<number | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const rafRef = useRef<number | null>(null)
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Detect prefers-reduced-motion on mount only.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  const goTo = useCallback((next: number) => {
    setIdx(next)
    progressStartRef.current = performance.now()
  }, [])

  // Auto-advance.
  useEffect(() => {
    if (reducedMotion || paused) return
    progressStartRef.current = performance.now()
    advanceTimerRef.current = setTimeout(() => {
      goTo((idx + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    }
  }, [idx, paused, reducedMotion, goTo])

  // Progress bar animation via requestAnimationFrame.
  useEffect(() => {
    if (reducedMotion) return
    const tick = () => {
      if (!paused) {
        const elapsed = performance.now() - progressStartRef.current
        const pct = Math.min(1, elapsed / SLIDE_MS)
        const activeTab = tabRefs.current[idx]
        if (activeTab) {
          const bar = activeTab.querySelector<HTMLElement>('.tlh-tab-progress')
          if (bar) bar.style.right = `${(1 - pct) * 100}%`
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [idx, paused, reducedMotion])

  // Reset every other tab's progress bar on slide change.
  useEffect(() => {
    tabRefs.current.forEach((el, i) => {
      if (!el) return
      if (i !== idx) {
        const bar = el.querySelector<HTMLElement>('.tlh-tab-progress')
        if (bar) bar.style.right = '100%'
      }
    })
  }, [idx])

  const pause = () => {
    if (paused) return
    setPaused(true)
    pauseAtRef.current = performance.now()
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
  }
  const resume = () => {
    if (!paused) return
    const pausedFor =
      pauseAtRef.current !== null ? performance.now() - pauseAtRef.current : 0
    progressStartRef.current += pausedFor
    setPaused(false)
  }

  const slide = SLIDES[idx]

  return (
    <section className="tlh-section" aria-roledescription="carousel">
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />

      {/* Page H1 for SEO. Visually hidden so design is unchanged but Google
          and screen readers see the proper page heading. */}
      <h1 className="tlh-sr">
        Tender Writing Services for UK Health and Social Care
      </h1>

      {/* Background slides (CSS background-image so transitions are crisp). */}
      <div className="tlh-bg" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={s.href}
            className={`tlh-bg-slide${i === idx ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
      </div>

      <div className="tlh-overlay" aria-hidden="true" />

      {/* Slide content - h2 keeps heading hierarchy clean. */}
      <div className="tlh-content">
        <p key={`eb-${idx}`} className="tlh-eyebrow">
          {slide.eyebrow}
        </p>
        <h2 key={`hl-${idx}`} className="tlh-headline">
          {slide.headline}
        </h2>
        <Link
          key={`cta-${idx}`}
          href={slide.href}
          className="tlh-cta"
          aria-label={`${slide.cta} - ${slide.label}`}
        >
          {slide.cta}
          <span className="tlh-cta-arrow" aria-hidden="true" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="tlh-tabs">
        <div className="tlh-tablist" role="tablist" aria-label="Featured services">
          {SLIDES.map((s, i) => (
            <button
              key={s.href}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              aria-selected={i === idx}
              aria-controls={`tlh-slide-${i}`}
              className={`tlh-tab${i === idx ? ' tlh-tab--active' : ''}`}
              onClick={() => goTo(i)}
              onMouseEnter={pause}
              onMouseLeave={resume}
              onFocus={pause}
              onBlur={resume}
            >
              <span className="tlh-tab-progress" />
              {s.label}
            </button>
          ))}
        </div>
        <div className="tlh-scroll" aria-hidden="true">
          Scroll
          <span className="tlh-scroll-icon" />
        </div>
      </div>
    </section>
  )
}
