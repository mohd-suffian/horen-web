import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated }            from '@/lib/auth'
import { saveBlogPost, deleteBlogPost } from '@/lib/cms'

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, title, excerpt, date, category, author, published, content } = await req.json()
  if (!slug || !title) return NextResponse.json({ error: 'slug and title required' }, { status: 400 })

  saveBlogPost(slug, { title, excerpt, date, category, author, published }, content ?? '')
  return NextResponse.json({ ok: true, slug })
}

export async function DELETE(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await req.json()
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

  deleteBlogPost(slug)
  return NextResponse.json({ ok: true })
}
