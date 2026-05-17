'use client'

import { useEffect, useRef } from 'react'

// Palette wellness — transitions entre blancs cassés et pastels très subtils.
// Les sections sombres (hero, services, imageband, footer) gardent leur propre
// background opaque, donc le fond fixe ne s'y voit pas. Il ne transparaît que
// dans les sections claires (pourquoi, marquee, comment, contact).
const STOPS: { pct: number; rgb: [number, number, number] }[] = [
  { pct: 0.00, rgb: [253, 249, 241] }, // crème chaude
  { pct: 0.25, rgb: [252, 248, 240] }, // crème (Pourquoi)
  { pct: 0.42, rgb: [245, 250, 246] }, // vert sauge très pâle (marquee)
  { pct: 0.60, rgb: [242, 248, 252] }, // bleu azur très pâle (Comment)
  { pct: 0.80, rgb: [248, 244, 252] }, // lavande très pâle (Contact)
  { pct: 1.00, rgb: [253, 249, 241] }, // retour crème (footer)
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function smoothstep(t: number) { return t * t * (3 - 2 * t) }

function colorAt(pct: number): string {
  const first = STOPS[0], last = STOPS[STOPS.length - 1]
  if (pct <= first.pct) return `rgb(${first.rgb.join(',')})`
  if (pct >= last.pct) return `rgb(${last.rgb.join(',')})`

  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i], b = STOPS[i + 1]
    if (pct >= a.pct && pct <= b.pct) {
      const t = smoothstep((pct - a.pct) / (b.pct - a.pct))
      const r = Math.round(lerp(a.rgb[0], b.rgb[0], t))
      const g = Math.round(lerp(a.rgb[1], b.rgb[1], t))
      const bl = Math.round(lerp(a.rgb[2], b.rgb[2], t))
      return `rgb(${r},${g},${bl})`
    }
  }
  return `rgb(${first.rgb.join(',')})`
}

export default function GradientBackground() {
  const divRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    function update() {
      if (!divRef.current) return
      const scrollH = document.body.scrollHeight - window.innerHeight
      const pct = scrollH > 0 ? Math.min(window.scrollY / scrollH, 1) : 0
      divRef.current.style.background = colorAt(pct)
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        pointerEvents: 'none',
        // Transition CSS pour un glissement fluide entre chaque frame
        transition: 'background 0.7s cubic-bezier(.2,.7,.2,1)',
        background: `rgb(${STOPS[0].rgb.join(',')})`,
      }}
    />
  )
}
