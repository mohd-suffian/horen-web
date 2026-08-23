import fs   from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

const NAV_CONFIG_PATH = path.join(process.cwd(), 'public/data/nav-config.json')

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!fs.existsSync(NAV_CONFIG_PATH)) {
    return NextResponse.json({ error: 'nav-config.json not found' }, { status: 404 })
  }
  const raw = fs.readFileSync(NAV_CONFIG_PATH, 'utf-8')
  return NextResponse.json(JSON.parse(raw))
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  if (
    !body ||
    typeof body !== 'object' ||
    !Array.isArray(body.about) ||
    !body.programmes ||
    !Array.isArray(body.programmes.featured) ||
    !Array.isArray(body.clientele)
  ) {
    return NextResponse.json(
      { error: 'Invalid nav config — expected about[], programmes.featured[], clientele[]' },
      { status: 400 }
    )
  }

  fs.writeFileSync(NAV_CONFIG_PATH, JSON.stringify(body, null, 2))
  return NextResponse.json({ ok: true })
}
