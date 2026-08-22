import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'horen2026'
const SESSION_COOKIE = 'horen_admin_session'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  return token === ADMIN_PASSWORD
}

export async function requireAuth() {
  const ok = await isAuthenticated()
  if (!ok) throw new Error('Unauthorized')
}

export { ADMIN_PASSWORD, SESSION_COOKIE }
