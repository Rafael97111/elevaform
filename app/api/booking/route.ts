// ─────────────────────────────────────────────────────────────
// API : confirmation d'un rendez-vous
// Quand le visiteur valide son formulaire de réservation,
// cette route crée automatiquement l'événement dans Google Agenda
// de Rafael avec toutes les informations du client.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Identifiant du calendrier Google de Rafael
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!

// Connexion sécurisée à Google via le compte de service ElevaForm
function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  })
}

// Calcule l'heure de fin à partir de l'heure de début (séance d'1 heure)
function addMinutes(time: string, min: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + min
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export async function POST(req: NextRequest) {
  try {
    // Récupération des informations envoyées par le formulaire de réservation
    const { date, time, firstName, lastName, email, phone, message } = await req.json()

    // Vérification des champs obligatoires
    if (!date || !time || !firstName || !email) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // La séance dure 1 heure
    const endTime = addMinutes(time, 60)

    const auth = getAuth()
    const calendar = google.calendar({ version: 'v3', auth })

    // Création de l'événement dans Google Agenda de Rafael
    // Le titre affiche le nom du client, la description contient ses coordonnées
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `ElevaForm — ${firstName} ${lastName}`,
        description: [
          `📧 ${email}`,
          phone ? `📞 ${phone}` : null,    // téléphone si renseigné
          message ? `\n${message}` : null,  // message optionnel du client
        ]
          .filter(Boolean)
          .join('\n'),
        // Heure en fuseau Europe/Paris pour éviter tout décalage
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
