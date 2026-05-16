'use client'

import { useEffect } from 'react'

// Couleur de fond associée à chaque section
const ZONES = [
  { selector: '.hero',          color: [26,  15,  8]   },
  { selector: '.section-paper', color: [245, 237, 224] },
  { selector: '.marquee',       color: [61,  32,  16]  },
  { selector: '.services',      color: [26,  15,  8]   },
  { selector: '.imageband',     color: [42,  28,  20]  },
  { selector: '.comment',       color: [245, 237, 224] },
  { selector: '.contact',       color: [61,  32,  16]  },
  { selector: '.app-footer',    color: [26,  15,  8]   },
]

// Interpolation linéaire entre deux nombres
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// Courbe de lissage : démarre et finit doucement (smoothstep)
function smoothstep(t: number) { return t * t * (3 - 2 * t) }

export default function GradientBackground() {
  useEffect(() => {
    let zones: { top: number; color: number[] }[] = []
    let raf: number

    function build() {
      zones = ZONES.flatMap(({ selector, color }) => {
        const el = document.querySelector<HTMLElement>(selector)
        if (!el) return []
        return [{ top: el.offsetTop, color }]
      }).sort((a, b) => a.top - b.top)
    }

    function update() {
      if (zones.length < 2) return

      // Le centre de l'écran détermine la position dans la page
      const mid = window.scrollY + window.innerHeight * 0.5

      let r = zones[0].color[0]
      let g = zones[0].color[1]
      let b = zones[0].color[2]

      for (let i = 0; i < zones.length - 1; i++) {
        const cur = zones[i]
        const nxt = zones[i + 1]

        if (mid >= cur.top && mid < nxt.top) {
          // t = position relative dans la zone (0 = début, 1 = fin)
          const t = smoothstep((mid - cur.top) / (nxt.top - cur.top))
          r = Math.round(lerp(cur.color[0], nxt.color[0], t))
          g = Math.round(lerp(cur.color[1], nxt.color[1], t))
          b = Math.round(lerp(cur.color[2], nxt.color[2], t))
          break
        }

        if (i === zones.length - 2 && mid >= nxt.top) {
          ;[r, g, b] = nxt.color
        }
      }

      // Mise à jour directe, pas de transition CSS (le JS gère le lissage)
      document.body.style.backgroundColor = `rgb(${r},${g},${b})`
    }

    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    build(); update()
    window.addEventListener('load', () => { build(); update() })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { build(); update() }, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
