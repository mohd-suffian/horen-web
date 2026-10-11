import { NextRequest, NextResponse } from 'next/server'
import { readUpload } from '@/lib/highlights-store'

const CONTENT_TYPES = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
} as const

export async function GET(_req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const upload = readUpload(file)

  if (!upload) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return new NextResponse(new Uint8Array(upload.buffer), {
    headers: {
      'Content-Type': CONTENT_TYPES[upload.ext],
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
