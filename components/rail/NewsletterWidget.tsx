'use client'

import { useState } from 'react'

type Props = {
  title?: string
  body?: string
  /** Brevo form action URL. Defaults to env NEXT_PUBLIC_BREVO_FORM_URL. */
  formAction?: string
}

export default function NewsletterWidget({
  title = 'Live tenders, weekly',
  body = 'Monday morning digest of every relevant tender we score.',
  formAction,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [email, setEmail] = useState('')

  const action =
    formAction ??
    (process.env.NEXT_PUBLIC_BREVO_FORM_URL as string | undefined) ??
    ''

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!action || !email) return
    setStatus('loading')
    try {
      const fd = new FormData()
      fd.append('email', email)
      const res = await fetch(action, { method: 'POST', body: fd, mode: 'no-cors' })
      // Brevo forms are no-cors so we cannot read the response; assume success.
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="he-news">
      <h4>{title}</h4>
      <p>{body}</p>
      {status === 'done' ? (
        <div className="he-news__done">Subscribed. Check your inbox.</div>
      ) : (
        <form className="he-news__form" onSubmit={onSubmit}>
          <input
            type="email"
            required
            placeholder="Your work email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : 'Join'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <div className="he-news__err">Something went wrong. Try again.</div>
      )}
    </div>
  )
}
