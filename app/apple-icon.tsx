import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a0f08',
        borderRadius: 40,
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '1.5px solid rgba(212,168,95,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(212,168,95,0.07)',
        }}>
          <span style={{
            fontSize: 72,
            color: '#d4a85f',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1,
            marginTop: 6,
          }}>
            e
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
