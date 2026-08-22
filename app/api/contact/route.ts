import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, company, message, programme } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }

  // ── Email sending stub ────────────────────────────────────────────────────
  // Replace this section with your email provider of choice:
  //
  // Option A: Resend (recommended)
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({ from: '...', to: 'adam@horen.com.my', ... })
  //
  // Option B: Nodemailer (SMTP)
  //   const transporter = nodemailer.createTransport({ ... })
  //   await transporter.sendMail({ ... })
  //
  // Option C: Mailchimp / HubSpot API (for CRM integration)
  //   POST to their API with contact data
  // ─────────────────────────────────────────────────────────────────────────

  console.log('📩 Contact form submission:', { name, email, company, message, programme })

  // TODO: Store in database or forward to CRM
  // For now: log to console and return success

  return NextResponse.json({ ok: true, message: 'Thank you! We will be in touch within 48 hours.' })
}
