import { NextRequest, NextResponse } from 'next/server'
import { clean, isEmail, notify, saveSubmission } from '@/lib/submissions'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const fields = clean(body, ['name', 'email', 'company', 'programme', 'message'])

  if (!fields.name || !fields.email || !fields.message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }
  if (!isEmail(fields.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    const submission = saveSubmission('enquiries', fields)
    await notify('enquiries', submission, fields.email)
  } catch (err) {
    console.error('Failed to save contact enquiry:', err, fields)
    return NextResponse.json(
      { error: 'Sorry, we could not send your enquiry. Please email info@horen.com.my or call 019-582 5007.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, message: 'Thank you! We will be in touch within 48 hours.' })
}
