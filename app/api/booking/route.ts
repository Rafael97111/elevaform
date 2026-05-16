import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  })
}

function addMinutes(time: string, min: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + min
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export async function POST(req: NextRequest) {
  try {
    const { date, time, firstName, lastName, email, phone, message } = await req.json()

    if (!date || !time || !firstName || !email) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const endTime = addMinutes(time, 60)

    const auth = getAuth()
    const calendar = google.calendar({ version: 'v3', auth })

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `ElevaForm — ${firstName} ${lastName}`,
        description: [
          `📧 ${email}`,
          phone ? `📞 ${phone}` : null,
          message ? `\n${message}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
        start: { dateTime: `${date}T${time}:00`, timeZone: 'Europe/Paris' },
        end: { dateTime: `${date}T${endTime}:00`, timeZone: 'Europe/Paris' },
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[booking]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
