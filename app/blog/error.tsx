'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import styles from './BlogError.module.css'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="blog-recovery-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>TenderLab blogs</p>
          <h1 id="blog-recovery-title">The article library is taking a moment.</h1>
          <p>
            The published guidance could not be verified just now. Please try
            again; we will never replace an unavailable article with incomplete
            information.
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={reset}>Try again</button>
            <Link href="/contact">Ask TenderLab a question</Link>
          </div>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <span className={styles.sheetOne} />
          <span className={styles.sheetTwo} />
          <span className={styles.thread} />
          <strong>?</strong>
        </div>
      </section>
    </main>
  )
}
