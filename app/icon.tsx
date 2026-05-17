import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a0f08',
        borderRadius: '50%',
        border: '1px solid rgba(212,168,95,0.5)',
      }}>
        <span style={{
          fontSize: 20,
          color: '#d4a85f',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          lineHeight: 1,
          marginTop: 2,
        }}>
          e
        </span>
      </div>
    ),
    { ...size }
  )
}
