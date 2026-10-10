import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import type { Submission } from '@/lib/submissions'

interface Column {
  key: string
  label: string
}

interface Props {
  title: string
  description: string
  submissions: Submission[]
  /** Short fields shown in the card header row */
  summary: Column[]
  /** Longer free-text field shown in full below */
  longField: Column
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    day: 'numeric', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

export default function SubmissionList({ title, description, submissions, summary, longField }: Props) {
  return (
    <div className="min-h-screen bg-soft">
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-2">
        <Link href="/admin" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0A3333] transition-colors">
          <MdArrowBack size={16} /> Admin Portal
        </Link>
        <span className="text-gray-300">/</span>
        <p className="text-sm text-[#0A3333] font-medium">{title}</p>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[18px] font-semibold text-[#0A3333] mb-1">{title}</h1>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <p className="text-sm text-gray-500 shrink-0">
            {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-sm text-gray-400">
            Nothing yet. New submissions from the website will appear here.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {submissions.map(s => (
              <li key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <p className="font-semibold text-[#0A3333]">{s.fields.name || 'No name'}</p>
                  <p className="text-xs text-gray-400">{formatDate(s.receivedAt)}</p>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                  {summary.map(col => {
                    const v = s.fields[col.key]
                    if (!v) return null
                    return (
                      <div key={col.key} className="flex gap-2 min-w-0">
                        <dt className="text-gray-400 shrink-0">{col.label}:</dt>
                        <dd className="text-[#0A3333] break-words min-w-0">
                          {col.key === 'email' ? (
                            <a href={`mailto:${v}`} className="text-[#1A8C8C] hover:underline">{v}</a>
                          ) : col.key === 'phone' ? (
                            <a href={`tel:${v.replace(/[^\d+]/g, '')}`} className="text-[#1A8C8C] hover:underline">{v}</a>
                          ) : v}
                        </dd>
                      </div>
                    )
                  })}
                </dl>

                {s.fields[longField.key] && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">{longField.label}</p>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{s.fields[longField.key]}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
