'use client'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a
            href="#top"
            className="footer-logo"
            onClick={(e) => {
              e.preventDefault()
              history.replaceState(null, '', window.location.pathname)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="app-logo-stamp">E</span>
            <span className="app-logo-text">
              <span className="app-logo-name">ELEVAFORM</span>
              <span className="app-logo-sub">BIEN-ÊTRE · RÉÉDUCATION · PERFORMANCE</span>
            </span>
          </a>
          <p className="footer-desc">
            Un accompagnement personnalisé pour préparer votre corps avant l&apos;intervention
            et préserver vos résultats sur le long terme.
          </p>
          <div className="footer-contact">
            <a href="tel:0761688665">07 61 68 86 65</a>
            <a href="mailto:elevaform.coaching@gmail.com">elevaform.coaching@gmail.com</a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Navigation</div>
          <nav className="footer-nav">
            <a href="#services">Services</a>
            <a href="#comment">Comment ça marche</a>
            <a href="#contact">Contact</a>
            <a href="#contact">Prendre rendez-vous</a>
          </nav>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <nav className="footer-nav">
            <a href="#services">Séances pré-opératoires</a>
            <a href="#services">Séances post-opératoires</a>
            <a href="#contact">Bilan initial</a>
            <a href="#contact">Suivi personnalisé</a>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">
          © 2025 ElevaForm — Rafael Storti. Tous droits réservés.
        </span>
        <div className="footer-legal">
          <a href="/mentions-legales">Mentions légales</a>
          <a href="#contact">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  )
}
