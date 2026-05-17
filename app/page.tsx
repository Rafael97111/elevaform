// ─────────────────────────────────────────────────────────────
// Page principale — la landing page d'ElevaForm
// Header est rendu ici (en dehors du CardStackAll) pour que son
// position:fixed ne soit pas cassé par les transforms CSS du stack.
// CardStackAll gère l'effet carte Apple entre chaque section.
// ─────────────────────────────────────────────────────────────

import Header from '@/components/Header'
import CardStackAll from '@/components/CardStackAll'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import ScrollEffects from '@/components/ScrollEffects'
import BookingModal from '@/components/BookingModal'

export default function Page() {
  return (
    <>
      <div id="scroll-thread" aria-hidden="true" />
      {/* Header fixe, isolé du stack pour préserver position:fixed */}
      <Header />
      <main id="app">
        <CardStackAll />
        {/* Footer hors du stack : pas d'effet carte, défilement normal */}
        <Footer />
      </main>
      <StickyCTA />
      <ScrollEffects />
      <BookingModal />
    </>
  )
}
