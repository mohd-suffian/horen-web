import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { readHighlight, writeHighlight, validateHighlight } from '@/lib/highlights-store'

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json(readHighlight())
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const result = validateHighlight(body)

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  writeHighlight(result.config)
  return NextResponse.json({ ok: true, config: result.config })
}
