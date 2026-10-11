import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { saveUpload } from '@/lib/highlights-store'

const MAX_UPLOAD_BYTES = 3 * 1024 * 1024

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (contentLength > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'Image must be 3 MB or smaller.' }, { status: 400 })
  }

  const arrayBuffer = await req.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const { filename } = saveUpload(buffer)
    return NextResponse.json({ image: filename })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
