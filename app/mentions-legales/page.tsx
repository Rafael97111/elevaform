import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales — ElevaForm',
  description: 'Informations légales du site elevaform.fr — Rafael Storti, ElevaForm.',
}

export default function MentionsLegales() {
  return (
    <>
      <header className="app-header scrolled" style={{ position: 'sticky', top: 0 }}>
        <Link href="/" className="app-logo">
          <span className="app-logo-stamp">E</span>
          <span className="app-logo-text">
            <span className="app-logo-name">ELEVAFORM</span>
            <span className="app-logo-sub">BIEN-ÊTRE · RÉÉDUCATION · PERFORMANCE</span>
          </span>
        </Link>
        <nav className="app-nav app-nav-desktop">
          <Link href="/#services">Services</Link>
          <Link href="/#comment">Comment ça marche</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      <main className="mentions-main">
        <div className="mentions-container">
          <span className="eyebrow">Informations légales</span>
          <h1 className="mentions-title">Mentions légales</h1>
          <div className="section-divider" />

          <div className="mentions-notice">
            <p>
              <strong>Note provisoire —</strong> Ce site est en cours de mise en conformité
              légale. La structure juridique ElevaForm est actuellement en cours de création. Les
              informations complètes (SIRET, adresse professionnelle) seront ajoutées dès la
              finalisation de l&apos;immatriculation.
            </p>
          </div>

          <div className="mentions-section">
            <h2>Éditeur du site</h2>
            <div className="mentions-line" />
            <p>Le site elevaform.fr est édité par :</p>
            <p>
              <strong>Rafael Storti</strong>
              <br />
              Auto-entrepreneur — en cours d&apos;immatriculation
              <br />
              SIRET : en cours d&apos;attribution
              <br />
              Adresse : en cours de domiciliation
              <br />
              Email :{' '}
              <a href="mailto:elevaform.coaching@gmail.com">elevaform.coaching@gmail.com</a>
              <br />
              Téléphone : 07 61 68 86 65
            </p>
          </div>

          <div className="mentions-section">
            <h2>Hébergement</h2>
            <div className="mentions-line" />
            <p>Ce site est hébergé par :</p>
            <p>
              <strong>Vercel Inc.</strong>
              <br />
              440 N Barranca Ave #4133
              <br />
              Covina, CA 91723, États-Unis
              <br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
            </p>
          </div>

          <div className="mentions-section">
            <h2>Propriété intellectuelle</h2>
            <div className="mentions-line" />
            <p>
              L&apos;ensemble du contenu de ce site (textes, visuels, logo, identité graphique)
              est la propriété exclusive de Rafael Storti — ElevaForm. Toute reproduction, même
              partielle, est interdite sans autorisation préalable.
            </p>
          </div>

          <div className="mentions-section">
            <h2>Données personnelles</h2>
            <div className="mentions-line" />
            <p>
              Les informations collectées via le formulaire de contact (nom, prénom, email,
              message) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont pas
              transmises à des tiers.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous
              disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
              données. Pour exercer ce droit, contactez-nous à{' '}
              <a href="mailto:elevaform.coaching@gmail.com">elevaform.coaching@gmail.com</a>.
            </p>
          </div>

          <div className="mentions-section">
            <h2>Cookies</h2>
            <div className="mentions-line" />
            <p>
              Ce site utilise des cookies fonctionnels liés à l&apos;intégration du service de
              prise de rendez-vous Cal.com. Aucun cookie publicitaire ou de tracking n&apos;est
              utilisé.
            </p>
          </div>

          <div className="mentions-section">
            <h2>Limitation de responsabilité</h2>
            <div className="mentions-line" />
            <p>
              Les informations contenues sur ce site sont données à titre indicatif. ElevaForm ne
              saurait être tenu responsable des dommages directs ou indirects résultant de
              l&apos;utilisation de ce site.
            </p>
          </div>

          <Link href="/" className="mentions-back">
            ← Retour au site
          </Link>
        </div>
      </main>

      <footer className="app-footer" style={{ paddingTop: '48px' }}>
        <div className="footer-bottom" style={{ borderTop: 'none' }}>
          <span className="footer-copy">© 2025 ElevaForm — Rafael Storti. Tous droits réservés.</span>
        </div>
      </footer>
    </>
  )
}
