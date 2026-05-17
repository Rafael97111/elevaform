import Image from 'next/image'

const ArrowIcon = () => (
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
)

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-head">
        <span className="eyebrow light" data-fx="fade-up">
          Mes Services
        </span>
        <h2 className="section-title" data-fx="fade-up" style={{ color: 'var(--paper)' }}>
          Deux phases, un seul <em>objectif</em>
        </h2>
        <div className="section-divider" />
      </div>
      <div className="services-grid">
        <article className="service-block" data-fx="fade-up">
          <div className="service-img" data-fx="reveal-img-up">
            <span className="service-phase">Phase 01</span>
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&fit=crop&q=80"
              alt="Préparation pré-opératoire"
              width={900}
              height={600}
            />
            <span className="service-num-bg">01</span>
          </div>
          <div className="service-body">
            <div className="service-label">Avant l&apos;intervention</div>
            <h3 className="service-title">
              Séances
              <br />
              <em>Pré-opératoires</em>
            </h3>
            <ul className="service-list">
              <li>Bilan physique initial et évaluation de la condition corporelle</li>
              <li>
                Renforcement musculaire ciblé pour préparer les zones concernées par
                l&apos;intervention
              </li>
              <li>
                Optimisation cardiovasculaire pour favoriser une meilleure anesthésie et
                récupération
              </li>
              <li>
                Conseils en hygiène de vie pour mettre le corps dans les meilleures conditions
              </li>
            </ul>
            <button
              className="btn btn-gold"
              data-open-booking
            >
              Prendre rendez-vous
              <ArrowIcon />
            </button>
          </div>
        </article>

        <article className="service-block" data-fx="fade-up">
          <div className="service-img" data-fx="reveal-img-up">
            <span className="service-phase">Phase 02</span>
            <Image
              src="/image-kb-maison.png"
              alt="Récupération post-opératoire"
              width={900}
              height={600}
            />
            <span className="service-num-bg">02</span>
          </div>
          <div className="service-body">
            <div className="service-label">Après l&apos;intervention</div>
            <h3 className="service-title">
              Séances
              <br />
              <em>Post-opératoires</em>
            </h3>
            <ul className="service-list">
              <li>Reprise progressive et sécurisée de l&apos;activité physique</li>
              <li>
                Travail de mobilité et exercices spécifiques pour stimuler la circulation
                sanguine des zones concernées et réduire les œdèmes
              </li>
              <li>
                Renforcement musculaire pour maintenir et sublimer les résultats de l&apos;opération
              </li>
              <li>Suivi sur le long terme pour pérenniser les résultats</li>
            </ul>
            <button
              className="btn btn-gold"
              data-open-booking
            >
              Prendre rendez-vous
              <ArrowIcon />
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}
