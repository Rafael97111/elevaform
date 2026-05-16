'use client'

// ─────────────────────────────────────────────────────────────
// Fond dégradé animé au scroll
// Deux calques de couleur très subtils (opacité 4%) positionnés
// en arrière-plan fixe. En haut de page, une teinte dorée domine.
// En bas, une teinte cuir prend le dessus. La transition est
// pilotée en temps réel par la position de défilement du visiteur.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'

export default function GradientBackground() {
  // "progress" va de 0 (haut de page) à 1 (bas de page)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf: number

    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    // On synchronise le dégradé avec le scroll, frame par frame (60fps)
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    >
      {/* Calque A — or chaud, haut-gauche, visible en haut de page */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 70% at 25% 25%, rgba(212,168,95,1) 0%, transparent 65%)',
          opacity: (1 - progress) * 0.04,
          transition: 'opacity 300ms ease-out',
        }}
      />
      {/* Calque B — cuir profond, bas-droite, visible en bas de page */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 70% at 75% 75%, rgba(107,69,48,1) 0%, transparent 65%)',
          opacity: progress * 0.04,
          transition: 'opacity 300ms ease-out',
        }}
      />
    </div>
  )
}
