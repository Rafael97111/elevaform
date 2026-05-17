'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion'
import Hero from './Hero'
import Pourquoi from './Pourquoi'
import KeywordBand from './KeywordBand'
import Services from './Services'
import ImageBand from './ImageBand'
import Comment from './Comment'
import Contact from './Contact'

// Ombre portée vers le haut pour donner l'effet de profondeur au bord de la carte
const SHADOW = '0 -32px 80px rgba(26,15,8,0.5), 0 -6px 24px rgba(26,15,8,0.25)'

export default function CardStackAll() {
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const { scrollYProgress: p2 } = useScroll({ target: ref2, offset: ['start end', 'start start'] })
  const { scrollYProgress: p3 } = useScroll({ target: ref3, offset: ['start end', 'start start'] })
  const { scrollYProgress: p4 } = useScroll({ target: ref4, offset: ['start end', 'start start'] })

  // Fake sticky pour Card 2 sur mobile : maintient la carte visible pendant que Card 3 slide par dessus
  const c2y  = useMotionValue(0)  // translateY externe (+stuck = reste en haut)
  const c2iy = useMotionValue(0)  // translateY interne (-stuck = contenu défile normalement)
  const card2Top = useRef(0)

  useEffect(() => {
    const measure = () => {
      if (ref2.current) {
        card2Top.current = ref2.current.getBoundingClientRect().top + window.scrollY
      }
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (window.innerWidth >= 768 || !ref2.current) {
      c2y.set(0); c2iy.set(0); return
    }
    const top = card2Top.current
    const h = ref2.current.offsetHeight
    const wh = window.innerHeight
    // Inner scroll range: montrer tout le contenu de Card 2
    const maxInner = Math.max(0, h - wh)
    // Outer sticky range: Card 2 reste fixée jusqu'à ce que Card 3 la recouvre entièrement
    const maxOuter = h
    const stuck = Math.max(0, y - top)
    c2y.set(Math.min(maxOuter, stuck))
    c2iy.set(-Math.min(maxInner, stuck))
  })

  // Carte 1 (Hero) : recule et s'assombrit quand Carte 2 entre
  const scale1 = useTransform(p2, [0, 1], [1, 0.88])
  const veil1  = useTransform(p2, [0, 1], [0, 0.58])

  // Carte 2 (Pourquoi+KW) : recule et s'assombrit quand Carte 3 entre
  // Sticky = encore visible pendant l'entrée de Carte 3, d'où l'effet de profondeur
  const scale2 = useTransform(p3, [0, 1], [1, 0.88])
  const veil2  = useTransform(p3, [0, 1], [0, 0.58])

  // Coins arrondis en haut de chaque carte entrante (signature Apple card reveal)
  const r2 = useTransform(p2, [0, 0.55], [22, 0])
  const r3 = useTransform(p3, [0, 0.55], [22, 0])
  const r4 = useTransform(p4, [0, 0.55], [22, 0])

  return (
    <div>
      {/* ── Carte 1 : Hero ── sticky sur desktop ET mobile (100vh, pas de débordement) */}
      <div className="card-sticky card-sticky-hero" style={{ zIndex: 1 }}>
        <motion.div style={{ scale: scale1, transformOrigin: 'top center' }}>
          <Hero />
          {/* Voile sombre qui monte progressivement sur le fond */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: '#1a0f08',
              opacity: veil1,
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        </motion.div>
      </div>

      {/* ── Carte 2 : Pourquoi + KeywordBand ── sticky desktop / fake-sticky mobile */}
      <motion.div
        ref={ref2}
        className="card-sticky card-over"
        style={{
          zIndex: 2,
          borderTopLeftRadius: r2, borderTopRightRadius: r2,
          overflow: 'hidden', boxShadow: SHADOW,
          background: 'var(--paper)',
          y: c2y,
        }}
      >
        <motion.div style={{ scale: scale2, y: c2iy, transformOrigin: 'top center' }}>
          <Pourquoi />
          <KeywordBand />
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: '#1a0f08',
              opacity: veil2,
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Carte 3 : Services + ImageBand ── PAS sticky : défilement normal */}
      <motion.div
        ref={ref3}
        className="card-over"
        style={{
          position: 'relative', zIndex: 3,
          borderTopLeftRadius: r3, borderTopRightRadius: r3,
          overflow: 'hidden', boxShadow: SHADOW,
          background: 'var(--leather)',
        }}
      >
        <Services />
        <ImageBand />
      </motion.div>

      {/* ── Carte 4 : Comment + Contact ── gradient léger du crème vers le marron foncé */}
      <motion.div
        ref={ref4}
        className="card-over"
        style={{
          position: 'relative', zIndex: 4,
          borderTopLeftRadius: r4, borderTopRightRadius: r4,
          overflow: 'hidden', boxShadow: SHADOW,
          background: 'linear-gradient(to bottom, #fdf9f1 0%, #f9ede6 100%)',
        }}
      >
        <Comment />
        <Contact />
      </motion.div>
    </div>
  )
}
