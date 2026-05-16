import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="section-head">
        <span className="eyebrow" data-fx="fade-up">
          Contact &amp; Rendez-vous
        </span>
        <h2 className="section-title" data-fx="fade-up">
          Commençons votre
          <br />
          parcours <em>ensemble</em>
        </h2>
        <div className="section-divider" />
      </div>

      <div className="contact-banner" data-fx="scale-in">
        <div className="contact-banner-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <p>
          <strong>Votre premier rendez-vous est offert</strong> — un bilan gratuit en présentiel
          ou par téléphone pour identifier la formule qui vous correspond le mieux.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info" data-fx="fade-up">
          <p className="contact-intro">
            Prenez rendez-vous directement en ligne ou contactez-moi par téléphone ou email. Je
            vous répondrai dans les plus brefs délais.
          </p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .08h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.19-1.19a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="contact-item-content">
                <span className="contact-item-label">Téléphone</span>
                <a href="tel:0761688665" className="contact-item-value">
                  07 61 68 86 65
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-item-content">
                <span className="contact-item-label">Email</span>
                <a
                  href="mailto:elevaform.coaching@gmail.com"
                  className="contact-item-value"
                >
                  elevaform.coaching@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-item-content">
                <span className="contact-item-label">Déplacement</span>
                <span className="contact-item-value">À domicile · Côte d&apos;Azur</span>
              </div>
            </div>
          </div>
          <button
            className="btn btn-gold"
            style={{ alignSelf: 'flex-start' }}
            data-booking-modal
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
        </div>

        <div data-fx="fade-up">
          <div className="or-divider" style={{ marginBottom: '24px' }}>
            ou envoyez un message
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
