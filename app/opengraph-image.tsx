import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ElevaForm — Bien-être · Rééducation · Performance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a0f08',
          position: 'relative',
        }}
      >
        {/* Halo doré central */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,168,95,0.14) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Ligne dorée gauche */}
        <div style={{
          position: 'absolute',
          left: 64,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(212,168,95,0.3), transparent)',
          display: 'flex',
        }} />

        {/* Ligne dorée droite */}
        <div style={{
          position: 'absolute',
          right: 64,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(212,168,95,0.3), transparent)',
          display: 'flex',
        }} />

        {/* Logo stamp */}
        <div style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          border: '1px solid rgba(212,168,95,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 36,
          background: 'rgba(212,168,95,0.07)',
        }}>
          <span style={{
            fontSize: 58,
            color: '#d4a85f',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1,
            marginTop: 4,
          }}>
            E
          </span>
        </div>

        {/* Nom */}
        <div style={{
          fontSize: 80,
          fontWeight: 300,
          color: '#faf2e6',
          letterSpacing: 14,
          fontFamily: 'Georgia, serif',
          marginBottom: 24,
        }}>
          ELEVAFORM
        </div>

        {/* Séparateur */}
        <div style={{
          width: 48,
          height: 1,
          background: 'rgba(212,168,95,0.5)',
          marginBottom: 24,
          display: 'flex',
        }} />

        {/* Tagline */}
        <div style={{
          fontSize: 20,
          color: '#d4a85f',
          letterSpacing: 5,
          fontFamily: 'Helvetica Neue, sans-serif',
          fontWeight: 300,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          Bien-être · Rééducation · Performance
        </div>

        {/* Sous-titre */}
        <div style={{
          fontSize: 16,
          color: 'rgba(181,164,141,0.75)',
          fontFamily: 'Helvetica Neue, sans-serif',
          fontWeight: 300,
          letterSpacing: 2,
        }}>
          Rafael Storti · Coach diplômé d'état · Côte d'Azur
        </div>
      </div>
    ),
    { ...size }
  )
}
