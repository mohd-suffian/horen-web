import { redirect }        from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import NavSettingsClient   from './NavSettingsClient'

export default async function NavSettingsPage() {
  const authed = await isAuthenticated()
  if (!authed) redirect('/admin/login')

  return <NavSettingsClient />
}
