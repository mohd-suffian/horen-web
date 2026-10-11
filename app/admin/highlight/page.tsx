import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import HighlightSettingsClient from './HighlightSettingsClient'

export default async function HighlightSettingsPage() {
  const authed = await isAuthenticated()
  if (!authed) redirect('/admin/login')

  return <HighlightSettingsClient />
}
