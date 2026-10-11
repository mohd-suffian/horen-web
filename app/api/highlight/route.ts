import { NextResponse } from 'next/server'
import { highlightStatus, imageUrlFor } from '@/lib/highlights'
import { readHighlight } from '@/lib/highlights-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const config = readHighlight()

  if (highlightStatus(config) !== 'live') {
    return NextResponse.json({ highlight: null }, { headers: { 'Cache-Control': 'no-store' } })
  }

  return NextResponse.json(
    {
      highlight: {
        version: config.version,
        label: config.label,
        title: config.title,
        imageUrl: imageUrlFor(config.image),
        imageAlt: config.imageAlt,
        autoOpen: config.autoOpen,
        autoOpenDelaySec: config.autoOpenDelaySec,
        linkLabel: config.linkLabel,
        linkUrl: config.linkUrl,
      },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
