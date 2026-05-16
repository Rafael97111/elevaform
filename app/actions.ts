'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactResult = { success: boolean; error: string }

export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  try {
    const firstName = formData.get('firstName')?.toString().trim() ?? ''
    const lastName = formData.get('lastName')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const message = formData.get('message')?.toString().trim() ?? ''

    if (!firstName || !email) {
      return { success: false, error: 'Veuillez remplir les champs obligatoires.' }
    }

    await resend.emails.send({
      from: 'ElevaForm <onboarding@resend.dev>',
      to: 'elevaform.coaching@gmail.com',
      replyTo: email,
      subject: `Nouveau message — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2a1c14">
          <h2 style="color:#6b4530;margin-bottom:4px">Nouveau message ElevaForm</h2>
          <p style="color:#8a7058;font-size:13px;margin-top:0">Via le formulaire de contact</p>
          <hr style="border:none;border-top:1px solid #f3e8d4;margin:20px 0">
          <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message :</strong></p>
          <p style="background:#faf2e6;padding:16px;border-radius:6px;white-space:pre-wrap">${message || '(aucun message)'}</p>
          <hr style="border:none;border-top:1px solid #f3e8d4;margin:20px 0">
          <p style="font-size:12px;color:#b5a48d">ElevaForm · elevaform.fr</p>
        </div>
      `,
    })

    return { success: true, error: '' }
  } catch (err) {
    console.error('[ElevaForm contact]', err)
    return { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' }
  }
}
