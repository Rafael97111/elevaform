// ─────────────────────────────────────────────────────────────
// Layout racine — s'applique à toutes les pages du site
// Charge les polices, définit les métadonnées SEO (titre, description,
// réseaux sociaux) et enveloppe le contenu dans la structure HTML de base.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ElevaForm: Bien-être · Rééducation · Performance',
  description:
    "Accompagnement pré et post-opératoire personnalisé avec Rafael Storti, coach diplômé d'état sur la Côte d'Azur.",
  keywords: ['préparation chirurgie', 'récupération post-opératoire', 'coach sportif', "Côte d'Azur", 'ElevaForm'],
  metadataBase: new URL('https://elevaform.fr'),
  openGraph: {
    title: 'ElevaForm, Coaching pré & post-opératoire',
    description:
      "Un accompagnement personnalisé pour préparer votre corps à l'intervention et préserver vos résultats sur le long terme.",
    url: 'https://elevaform.fr',
    siteName: 'ElevaForm',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElevaForm, Coaching pré & post-opératoire',
    description:
      "Un accompagnement personnalisé pour préparer votre corps à l'intervention et préserver vos résultats sur le long terme.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${jost.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  )
}
