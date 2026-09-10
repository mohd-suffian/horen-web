import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/horen/v2/admin/login', req.url))
  res.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' })
  return res
}
