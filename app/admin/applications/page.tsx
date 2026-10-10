import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { listSubmissions } from '@/lib/submissions'
import SubmissionList from '../SubmissionList'

export default async function TrainerApplicationsPage() {
  if (!await isAuthenticated()) redirect('/admin/login')

  return (
    <SubmissionList
      title="Trainer applications"
      description="Submissions from the Join Us trainer recruitment form, newest first."
      submissions={listSubmissions('trainer-applications')}
      summary={[
        { key: 'email',          label: 'Email' },
        { key: 'phone',          label: 'Phone' },
        { key: 'specialisation', label: 'Specialisation' },
        { key: 'experience',     label: 'Experience' },
      ]}
      longField={{ key: 'bio', label: 'Bio' }}
    />
  )
}
