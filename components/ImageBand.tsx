import Image from 'next/image'

export default function ImageBand() {
  return (
    <section className="imageband">
      <div className="imageband-img" data-parallax="0.15">
        <Image
          src="/imageband.jpg"
          alt="Rafael Storti se déplace à domicile sur la Côte d'Azur"
          width={1600}
          height={900}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className="imageband-overlay" aria-hidden="true" />
      <div className="imageband-content">
        <p className="imageband-quote" data-fx="fade-up">
          «&nbsp;Je me déplace à votre domicile
          <br />
          avec mon <em>matériel</em>.&nbsp;»
        </p>
        <div className="imageband-cite" data-fx="fade-up">
          Rafael Storti · Côte d&apos;Azur
        </div>
      </div>
    </section>
  )
}
