import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { listSubmissions } from '@/lib/submissions'
import SubmissionList from '../SubmissionList'

export default async function EnquiriesPage() {
  if (!await isAuthenticated()) redirect('/admin/login')

  return (
    <SubmissionList
      title="Enquiries"
      description="Training proposal requests from the Contact page, newest first."
      submissions={listSubmissions('enquiries')}
      summary={[
        { key: 'email',     label: 'Email' },
        { key: 'company',   label: 'Company' },
        { key: 'programme', label: 'Interested in' },
      ]}
      longField={{ key: 'message', label: 'Message' }}
    />
  )
}
