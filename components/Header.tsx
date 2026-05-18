'use client'

export default function Header() {
  return (
    <header className="app-header">
      <a
        href="#top"
        className="app-logo"
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
      <nav className="app-nav app-nav-desktop">
        <a href="#services">Services</a>
        <a href="#comment">Comment ça marche</a>
        <a href="#contact">Contact</a>
        <button
          className="app-nav-cta"
          data-open-booking
        >
          Prendre RDV
        </button>
      </nav>
      <button
        className="app-nav-mobile-toggle"
        aria-label="Prendre rendez-vous"
        data-open-booking
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
      </button>
    </header>
  )
}
