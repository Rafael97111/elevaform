'use client'

import { useCallback, useEffect, useState } from 'react'

type Step = 'date' | 'time' | 'form' | 'done'

const WEEKDAYS = ['L', 'Ma', 'Me', 'J', 'V', 'S', 'D']
const MONTHS_FR = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre',
]

function getParisToday(): string {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date())
}

function formatDateFR(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
    timeZone: 'Europe/Paris',
  })
}

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={14} height={14}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function BookingModal() {
  const now = new Date()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('date')
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const close = useCallback(() => {
    setOpen(false)
    setTimeout(() => {
      setStep('date')
      setSelectedDate('')
      setSelectedTime('')
      setSlots([])
      setSubmitError('')
    }, 300)
  }, [])

  useEffect(() => {
    const handleOpen = () => { setOpen(true); setStep('date') }
    window.addEventListener('openBookingModal', handleOpen)
    return () => window.removeEventListener('openBookingModal', handleOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  async function selectDate(dateStr: string) {
    setSelectedDate(dateStr)
    setStep('time')
    setLoadingSlots(true)
    setSlots([])
    try {
      const res = await fetch(`/api/availability?date=${dateStr}`)
      const data = await res.json()
      setSlots(data.slots ?? [])
    } catch {
      setSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, time: selectedTime, ...form }),
      })
      const data = await res.json()
      if (data.success) setStep('done')
      else setSubmitError(data.error ?? 'Une erreur est survenue.')
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  // Calendar grid
  const today = getParisToday()
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = (firstDay.getDay() + 6) % 7
  const cells: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  function getDayState(day: number) {
    const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    if (ds <= today) return 'past'
    if (new Date(ds + 'T12:00:00Z').getDay() === 0) return 'sunday'
    if (ds === selectedDate) return 'selected'
    return 'available'
  }

  const nowDate = new Date()
  const canPrev = !(year === nowDate.getFullYear() && month <= nowDate.getMonth())
  const canNext = !(year === nowDate.getFullYear() && month >= nowDate.getMonth() + 3)

  function prevMonth() {
    if (!canPrev) return
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (!canNext) return
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
  }

  if (!open) return null

  return (
    <div className="bk-overlay" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
      <div className="bk-dialog" role="dialog" aria-modal="true" aria-label="Prendre rendez-vous">

        {/* Header */}
        <div className="bk-header">
          <span className="bk-eyebrow">ElevaForm · Réservation</span>
          <h3 className="bk-title">
            {step === 'done' ? <>Rendez-vous <em>confirmé</em></> : <>Prendre <em>rendez-vous</em></>}
          </h3>
          <button className="bk-close" onClick={close} aria-label="Fermer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={14} height={14}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* STEP: Date */}
        {step === 'date' && (
          <div className="bk-body">
            <p className="bk-hint">Sélectionnez une date pour votre bilan</p>
            <div className="bk-cal-nav">
              <button className="bk-nav-btn" onClick={prevMonth} disabled={!canPrev} aria-label="Mois précédent">
                <ArrowLeft />
              </button>
              <span className="bk-month-label">{MONTHS_FR[month]} {year}</span>
              <button className="bk-nav-btn" onClick={nextMonth} disabled={!canNext} aria-label="Mois suivant">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={14} height={14}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <div className="bk-weekdays">
              {WEEKDAYS.map(d => <span key={d} className="bk-weekday">{d}</span>)}
            </div>
            <div className="bk-days">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />
                const state = getDayState(day)
                return (
                  <button
                    key={i}
                    className={`bk-day bk-day-${state}`}
                    disabled={state === 'past' || state === 'sunday'}
                    onClick={() => selectDate(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
            <p className="bk-note">Lundi – Samedi · 9h – 18h · Premier rendez-vous offert</p>
          </div>
        )}

        {/* STEP: Time */}
        {step === 'time' && (
          <div className="bk-body">
            <div className="bk-back-row">
              <button className="bk-back-btn" onClick={() => setStep('date')}>
                <ArrowLeft /> Modifier la date
              </button>
              <span className="bk-selected-info">{formatDateFR(selectedDate)}</span>
            </div>
            <p className="bk-hint">Choisissez un créneau disponible</p>
            {loadingSlots && (
              <div className="bk-loading"><div className="bk-spinner" /></div>
            )}
            {!loadingSlots && slots.length === 0 && (
              <div className="bk-empty">
                <p>Aucun créneau disponible ce jour.</p>
                <button className="bk-back-btn" onClick={() => setStep('date')}>Choisir une autre date</button>
              </div>
            )}
            {!loadingSlots && slots.length > 0 && (
              <div className="bk-slots">
                {slots.map(slot => (
                  <button
                    key={slot}
                    className={`bk-slot${selectedTime === slot ? ' bk-slot-selected' : ''}`}
                    onClick={() => { setSelectedTime(slot); setStep('form') }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP: Form */}
        {step === 'form' && (
          <div className="bk-body">
            <div className="bk-back-row">
              <button className="bk-back-btn" onClick={() => setStep('time')}>
                <ArrowLeft /> Modifier le créneau
              </button>
              <span className="bk-selected-info">{formatDateFR(selectedDate)} · {selectedTime}</span>
            </div>
            <form className="bk-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-fn">Prénom *</label>
                  <input id="bk-fn" type="text" required value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-ln">Nom *</label>
                  <input id="bk-ln" type="text" required value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bk-email">Email *</label>
                <input id="bk-email" type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label htmlFor="bk-phone">Téléphone</label>
                <input id="bk-phone" type="tel" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="form-group">
                <label htmlFor="bk-msg">Message (optionnel)</label>
                <textarea id="bk-msg" rows={3} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              {submitError && <p className="form-error">{submitError}</p>}
              <button type="submit" className="btn btn-gold" disabled={submitting} style={{ alignSelf: 'flex-start' }}>
                {submitting ? 'Confirmation…' : 'Confirmer le rendez-vous'}
                {!submitting && <ArrowRight />}
              </button>
            </form>
          </div>
        )}

        {/* STEP: Done */}
        {step === 'done' && (
          <div className="bk-body bk-done">
            <div className="bk-done-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
                <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h4 className="bk-done-title">Rendez-vous confirmé !</h4>
            <div className="bk-done-summary">
              <p>{formatDateFR(selectedDate)} à {selectedTime}</p>
              <p>Lieu : Chez vous</p>
              <p>Un email de confirmation vous a été envoyé.</p>
            </div>
            <button className="btn btn-gold" onClick={close}>Fermer <ArrowRight /></button>
          </div>
        )}
      </div>
    </div>
  )
}
