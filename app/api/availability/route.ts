// ─────────────────────────────────────────────────────────────
// API : créneaux disponibles pour une date donnée
// Le site appelle cette route quand un visiteur clique sur une date
// dans le calendrier de réservation. On interroge Google Agenda
// pour savoir quelles heures sont déjà prises, puis on renvoie
// uniquement les créneaux libres.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Identifiant du calendrier Google (l'adresse Gmail de Rafael)
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!

// Durée d'une séance : 1 heure, créneaux proposés toutes les 30 minutes
// Plage horaire : 9h – 18h (le dernier créneau démarre à 17h)
const SLOT_DURATION = 60
const SLOT_STEP = 30
const DAY_START = 9
const DAY_END = 18

// Connexion sécurisée à Google via le compte de service ElevaForm
// (les clés sont stockées côté serveur, jamais visibles par les visiteurs)
function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  })
}

// Convertit une heure UTC en heure de Paris (gère l'heure d'été automatiquement)
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

  // Vérification que la date reçue est bien formatée (ex: 2024-06-15)
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 })
  }

  // On refuse les dates passées ou le jour même (heure de Paris)
  const parisToday = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date())
  if (date <= parisToday) return NextResponse.json({ slots: [] })

  // Pas de séances le dimanche
  const [y, mo, d] = date.split('-').map(Number)
  if (new Date(Date.UTC(y, mo - 1, d, 12)).getDay() === 0) {
    return NextResponse.json({ slots: [] })
  }

  try {
    const auth = getAuth()
    const calendar = google.calendar({ version: 'v3', auth })

    // On demande à Google Agenda les plages déjà occupées pour ce jour
    // (±3h de marge pour couvrir tous les fuseaux horaires sans risque)
    const timeMin = new Date(Date.UTC(y, mo - 1, d) - 3 * 3600_000).toISOString()
    const timeMax = new Date(Date.UTC(y, mo - 1, d + 1) + 3 * 3600_000).toISOString()

    const { data } = await calendar.freebusy.query({
      requestBody: { timeMin, timeMax, items: [{ id: CALENDAR_ID }] },
    })

    const busy = data.calendars?.[CALENDAR_ID]?.busy ?? []

    // Génération de tous les créneaux possibles entre 9h et 17h (toutes les 30 min)
    const allSlots: string[] = []
    for (let total = DAY_START * 60; total + SLOT_DURATION <= DAY_END * 60; total += SLOT_STEP) {
      const h = Math.floor(total / 60)
      const m = total % 60
      allSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }

    // On retire les créneaux qui chevauchent un rendez-vous déjà existant
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

    // On renvoie uniquement les créneaux disponibles au site
    return NextResponse.json({ slots: available })
  } catch (err) {
    console.error('[availability]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
