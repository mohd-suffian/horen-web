import { NextRequest, NextResponse } from 'next/server'
import { clean, isEmail, notify, saveSubmission } from '@/lib/submissions'

const REQUIRED = ['name', 'email', 'phone', 'specialisation', 'experience', 'bio']

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const fields = clean(body, REQUIRED)

  if (REQUIRED.some(k => !fields[k])) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }
  if (!isEmail(fields.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    const submission = saveSubmission('trainer-applications', fields)
    await notify('trainer-applications', submission, fields.email)
  } catch (err) {
    console.error('Failed to save trainer application:', err, fields)
    return NextResponse.json(
      { error: 'Sorry, we could not submit your application. Please email info@horen.com.my instead.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
