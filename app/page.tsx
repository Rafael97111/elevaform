// ─────────────────────────────────────────────────────────────
// Page principale — la landing page d'ElevaForm
// Assemble toutes les sections dans l'ordre d'affichage.
// Les composants "invisibles" (GradientBackground, ScrollEffects,
// StickyCTA, BookingModal) sont montés en dehors du flux principal
// car ils se positionnent en fixed/overlay sur la page.
// ─────────────────────────────────────────────────────────────

import GradientBackground from '@/components/GradientBackground'
import Hero from '@/components/Hero'
import Pourquoi from '@/components/Pourquoi'
import KeywordBand from '@/components/KeywordBand'
import Services from '@/components/Services'
import ImageBand from '@/components/ImageBand'
import Comment from '@/components/Comment'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import ScrollEffects from '@/components/ScrollEffects'
import BookingModal from '@/components/BookingModal'

export default function Page() {
  return (
    <>
      <div id="scroll-thread" aria-hidden="true" />
      <main id="app">
        <Hero />
        <Pourquoi />
        <KeywordBand />
        <Services />
        <ImageBand />
        <Comment />
        <Contact />
        <Footer />
      </main>
      <GradientBackground />
      <StickyCTA />
      <ScrollEffects />
      <BookingModal />
    </>
  )
}
