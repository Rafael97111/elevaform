'use client'

// ─────────────────────────────────────────────────────────────
// Bouton "Prendre RDV" flottant
// Apparaît en bas de l'écran dès que le visiteur a dépassé
// la section hero. Au clic : défilement vers la section Contact,
// puis ouverture automatique du calendrier de réservation.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'

export default function StickyCTA() {
  // Le bouton est masqué tant qu'on est sur le hero
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero) return

    // On affiche le bouton dès que le bas du hero sort de l'écran
    const check = () => {
      setShow(hero.getBoundingClientRect().bottom < 60)
    }

    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  function open() {
    // 1. On défile vers la section Contact
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 2. Une fois arrivé, on ouvre le modal de réservation (700ms = durée du scroll)
    setTimeout(() => window.dispatchEvent(new CustomEvent('openBookingModal')), 700)
  }

  return (
    <button
      className={`sticky-cta${show ? ' show' : ''}`}
      onClick={open}
      aria-label="Prendre rendez-vous — 1er rendez-vous offert"
    >
      <span className="sticky-cta-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </span>
      <span className="sticky-cta-meta">
        Prendre RDV
        <small>1er rendez-vous offert</small>
      </span>
    </button>
  )
}
