'use client'

import { useEffect, useRef, useCallback } from 'react'

interface StepMeta {
  id: string
  label: string
}

interface TimelineScrollProps {
  steps: StepMeta[]
}

export default function TimelineScroll({ steps }: TimelineScrollProps) {
  const scrollProgressRef = useRef<HTMLDivElement>(null)
  const toTopRef = useRef<HTMLButtonElement>(null)
  const sideNavRef = useRef<HTMLDivElement>(null)
  const stepIndicatorRef = useRef<HTMLDivElement>(null)
  const stepIndicatorLabelRef = useRef<HTMLSpanElement>(null)

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const pct = docH > 0 ? (scrollY / docH) * 100 : 0

    // Scroll progress bar
    if (scrollProgressRef.current) {
      scrollProgressRef.current.style.width = pct + '%'
    }

    // Back to top
    if (toTopRef.current) {
      toTopRef.current.classList.toggle('show', scrollY > 500)
    }

    // Side nav visibility
    const timeline = document.querySelector('.tl-timeline') as HTMLElement | null
    if (timeline && sideNavRef.current) {
      const rect = timeline.getBoundingClientRect()
      const inTimeline = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3
      sideNavRef.current.classList.toggle('show', inTimeline)
    }

    // Timeline rail fill
    if (timeline) {
      const rect = timeline.getBoundingClientRect()
      const timelineH = timeline.offsetHeight
      const progress = Math.min(Math.max((-rect.top) / (timelineH - window.innerHeight), 0), 1)
      timeline.style.setProperty('--rail', (progress * 100) + '%')
    }

    // Hero parallax glow
    const heroGlow = document.querySelector('.tl-hero-glow') as HTMLElement | null
    if (heroGlow) {
      heroGlow.style.transform = `translateY(${scrollY * 0.15}px)`
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Hero reveal
    const hero = document.querySelector('.tl-hero')
    if (hero) {
      requestAnimationFrame(() => hero.classList.add('in'))
    }

    // IntersectionObserver for steps and closer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    const stepEls = document.querySelectorAll('.tl-step')
    const closer = document.querySelector('.tl-closer')
    stepEls.forEach((el) => observer.observe(el))
    if (closer) observer.observe(closer)

    // Step indicator + side nav active tracking
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const idx = steps.findIndex((s) => s.id === id)
            if (idx === -1) return

            // Update step indicator
            if (stepIndicatorRef.current && stepIndicatorLabelRef.current) {
              stepIndicatorRef.current.classList.add('show')
              stepIndicatorLabelRef.current.textContent = steps[idx].label
            }

            // Update side nav active
            if (sideNavRef.current) {
              sideNavRef.current.querySelectorAll('button').forEach((btn, i) => {
                btn.classList.toggle('active', i === idx)
              })
            }
          }
        })
      },
      { threshold: 0.3 }
    )
    stepEls.forEach((el) => stepObserver.observe(el))

    // Hide step indicator when leaving timeline
    const timelineVisibility = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && stepIndicatorRef.current) {
          stepIndicatorRef.current.classList.remove('show')
        }
      },
      { threshold: 0 }
    )
    const timeline = document.querySelector('.tl-timeline')
    if (timeline) timelineVisibility.observe(timeline)

    // Scroll listener
    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
    onScroll()

    // Hero cursor spotlight
    const heroEl = document.querySelector('.tl-hero') as HTMLElement | null
    if (heroEl) {
      const handleMouse = (e: MouseEvent) => {
        const rect = heroEl.getBoundingClientRect()
        heroEl.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%')
        heroEl.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%')
      }
      heroEl.addEventListener('mousemove', handleMouse)
    }

    // Counter animation
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const target = parseInt(el.dataset.target || '0', 10)
            if (!target) return
            let current = 0
            const step = Math.max(1, Math.ceil(target / 40))
            const interval = setInterval(() => {
              current += step
              if (current >= target) {
                current = target
                clearInterval(interval)
              }
              el.textContent = String(current)
            }, 30)
            counterObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('.tl-counter[data-target]').forEach((el) => counterObserver.observe(el))

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      observer.disconnect()
      stepObserver.disconnect()
      timelineVisibility.disconnect()
      counterObserver.disconnect()
    }
  }, [steps, onScroll])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      {/* Scroll progress */}
      <div className="tl-scroll-progress" ref={scrollProgressRef} aria-hidden="true" />

      {/* Side nav */}
      <div className="tl-side-nav" ref={sideNavRef} aria-label="Section navigation">
        {steps.map((step) => (
          <button
            key={step.id}
            data-label={step.label}
            onClick={() => scrollToStep(step.id)}
            aria-label={`Go to ${step.label}`}
          />
        ))}
      </div>

      {/* Step indicator */}
      <div className="tl-step-indicator" ref={stepIndicatorRef}>
        <span className="tl-dot-mini" />
        <span ref={stepIndicatorLabelRef} />
      </div>

      {/* Back to top */}
      <button
        className="tl-to-top"
        ref={toTopRef}
        onClick={scrollToTop}
        type="button"
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
