'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GalleryImage } from '@/lib/case-studies-detail'

export default function GalleryGrid({
  images,
  accentColor,
}: {
  images: GalleryImage[]
  accentColor: string
}) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])
  const prev  = useCallback(() => setLightbox(i => (i != null && i > 0) ? i - 1 : i), [])
  const next  = useCallback(() => setLightbox(i => (i != null && i < images.length - 1) ? i + 1 : i), [images.length])

  useEffect(() => {
    if (lightbox === null) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handle)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handle)
    }
  }, [lightbox, close, prev, next])

  const lead = images.find(i => i.isLead) ?? images[0]
  const rest  = images.filter(i => !i.isLead)
  const leadIdx = images.indexOf(lead)

  return (
    <>
      <div className="gal">
        {/* Lead image – spans full row */}
        <div className="gal__lead">
          <div className="gal__lead-thumb" onClick={() => setLightbox(leadIdx)} role="button" tabIndex={0} aria-label={`View ${lead.caption} full size`}>
            <Image src={lead.src} alt={lead.caption} fill sizes="55vw" className="gal__img" unoptimized />
            <div className="gal__page-tag" style={{ background: accentColor }}>{lead.tag}</div>
            <div className="gal__doc-badge">Primary source</div>
            <div className="gal__caption">{lead.caption}</div>
          </div>
          <div className="gal__lead-meta">
            <span className="gal__meta-tag" style={{ background: accentColor }}>Primary Source</span>
            <h3 className="gal__lead-h">{lead.caption}</h3>
            <p className="gal__lead-p">Primary award document issued by the Contracting Authority. Click any image to view full size.</p>
            <button className="gal__zoom-btn" onClick={() => setLightbox(leadIdx)}>
              View full size
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2H2v3M9 2h3v3M5 12H2V9M9 12h3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Remaining images grid */}
        {rest.length > 0 && (
          <div className="gal__grid">
            {rest.map((img, i) => {
              const idx = images.indexOf(img)
              return (
                <div
                  key={i}
                  className="gal__thumb"
                  onClick={() => setLightbox(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${img.caption} full size`}
                >
                  <Image src={img.src} alt={img.caption} fill sizes="25vw" className="gal__img" unoptimized />
                  <div className="gal__page-tag" style={{ background: accentColor }}>{img.tag}</div>
                  <div className="gal__doc-badge">Official document</div>
                  <div className="gal__caption">{img.caption}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gal__lb" onClick={close} role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="gal__lb-close" onClick={close} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {lightbox > 0 && (
            <button className="gal__lb-nav gal__lb-nav--prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {lightbox < images.length - 1 && (
            <button className="gal__lb-nav gal__lb-nav--next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <div className="gal__lb-frame" onClick={e => e.stopPropagation()}>
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].caption}
              fill
              sizes="90vw"
              className="gal__lb-img"
              unoptimized
            />
          </div>

          <div className="gal__lb-footer">
            <span className="gal__lb-caption">{images[lightbox].caption}</span>
            <span className="gal__lb-counter">{lightbox + 1} / {images.length}</span>
          </div>
        </div>
      )}
    </>
  )
}
