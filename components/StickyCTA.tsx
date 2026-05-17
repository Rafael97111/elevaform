'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function StickyCTA() {
  const { scrollY } = useScroll()
  const footerTop = useRef(999999)

  useEffect(() => {
    const footer = document.querySelector('.app-footer')
    if (footer) {
      footerTop.current = (footer as HTMLElement).offsetTop
    }
  }, [])

  // Fade in entre 400-600px, fade out quand le footer arrive
  const opacity = useTransform(scrollY, (y) => {
    const entry = Math.min(1, Math.max(0, (y - 400) / 200))
    const exit  = Math.min(1, Math.max(0, (footerTop.current - 80 - y) / 120))
    return Math.min(entry, exit)
  })

  function open() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => window.dispatchEvent(new CustomEvent('openBookingModal')), 700)
  }

  return (
    <motion.button
      className="sticky-cta show"
      style={{ opacity }}
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
    </motion.button>
  )
}
