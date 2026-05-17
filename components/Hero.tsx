import Image from 'next/image'

// Header est rendu en dehors du CardStack pour éviter que
// position:fixed soit cassé par les transforms CSS du parent
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-spotlight" aria-hidden="true" />
      <span className="hero-watermark" aria-hidden="true">
        e
      </span>

      <div className="hero-inner">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow" data-fx="fade-up">
            Préparation &amp; Récupération · Chirurgie
          </span>
          <h1 className="hero-title" data-fx="fade-up">
            Votre corps mérite
            <br />
            le meilleur <em>avant</em>
            <br />
            et <em>après</em>.
          </h1>
          <p className="hero-desc" data-fx="fade-up">
            Un accompagnement personnalisé pour préparer votre corps à
            l&apos;intervention et préserver vos résultats sur le long terme.
          </p>
          <div className="hero-actions" data-fx="fade-up">
            <button
              className="btn btn-gold"
              data-open-booking
            >
              Prendre rendez-vous
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a href="#services" className="btn btn-ghost">
              Découvrir les services
            </a>
          </div>
          <div className="hero-scroll-cue" data-fx="fade-up">
            <span className="cue-line" />
            défiler pour découvrir
          </div>
        </div>

        <div className="hero-images">
          <div className="hero-img-sk hero-img-sk--main" aria-hidden="true" />
          <div className="hero-img-sk hero-img-sk--secondary" aria-hidden="true" />
          <div className="hero-img-clip" data-fx="reveal-img">
            <div className="hero-img-main">
              <Image
                src="/hero-main.jpg"
                alt="Matériel d'entraînement à domicile"
                width={900}
                height={1100}
                priority
              />
            </div>
            <div className="hero-img-secondary">
              <Image
                src="/hero-secondary.jpg"
                alt="Matériel de fitness à domicile"
                width={600}
                height={400}
                priority
              />
            </div>
          </div>
        </div>

        <div className="hero-tagline">Rafael Storti · coach diplômé d&apos;état</div>
      </div>
    </section>
  )
}
