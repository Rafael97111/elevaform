import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!
const SLOT_DURATION = 60
const SLOT_STEP = 30
const DAY_START = 9
const DAY_END = 18

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  })
}

function getParisHM(iso: string): { h: number; m: number } {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(iso))
  return {
    h: parseInt(parts.find((p) => p.type === 'hour')!.value),
    m: parseInt(parts.find((p) => p.type === 'minute')!.value),
  }
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 })
  }

  // Reject today and past (Paris time)
  const parisToday = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date())
  if (date <= parisToday) return NextResponse.json({ slots: [] })

  // Reject Sundays
  const [y, mo, d] = date.split('-').map(Number)
  if (new Date(Date.UTC(y, mo - 1, d, 12)).getDay() === 0) {
    return NextResponse.json({ slots: [] })
  }

  try {
    const auth = getAuth()
    const calendar = google.calendar({ version: 'v3', auth })

    // Query freebusy — add ±3h buffer to safely cover Paris timezone in any DST
    const timeMin = new Date(Date.UTC(y, mo - 1, d) - 3 * 3600_000).toISOString()
    const timeMax = new Date(Date.UTC(y, mo - 1, d + 1) + 3 * 3600_000).toISOString()

    const { data } = await calendar.freebusy.query({
      requestBody: { timeMin, timeMax, items: [{ id: CALENDAR_ID }] },
    })

    const busy = data.calendars?.[CALENDAR_ID]?.busy ?? []

    // Generate 30-min-step slots, each 1h long, within 09:00–18:00
    const allSlots: string[] = []
    for (let total = DAY_START * 60; total + SLOT_DURATION <= DAY_END * 60; total += SLOT_STEP) {
      const h = Math.floor(total / 60)
      const m = total % 60
      allSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }

    // Remove slots whose 1h window overlaps a busy period
    const available = allSlots.filter((slot) => {
      const [sh, sm] = slot.split(':').map(Number)
      const start = sh * 60 + sm
      const end = start + SLOT_DURATION
      return !busy.some((b) => {
        if (!b.start || !b.end) return false
        const { h: bsh, m: bsm } = getParisHM(b.start)
        const { h: beh, m: bem } = getParisHM(b.end)
        return start < beh * 60 + bem && end > bsh * 60 + bsm
      })
    })

    return NextResponse.json({ slots: available })
  } catch (err) {
    console.error('[availability]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
