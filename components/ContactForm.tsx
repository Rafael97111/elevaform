'use client'

import { useState, useTransition } from 'react'
import { sendContactMessage } from '@/app/actions'

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        const result = await sendContactMessage(formData)
        if (result.success) {
          setSuccess(true)
        } else {
          setError(result.error)
        }
      } catch {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    })
  }

  if (success) {
    return (
      <div className="form-success">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width={32}
          height={32}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <p>
          Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input id="firstName" name="firstName" type="text" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nom</label>
          <input id="lastName" name="lastName" type="text" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button
        type="submit"
        className="btn btn-leather"
        disabled={isPending}
        style={{ alignSelf: 'flex-start' }}
      >
        {isPending ? 'Envoi en cours…' : 'Envoyer le message'}
        {!isPending && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </button>
    </form>
  )
}
