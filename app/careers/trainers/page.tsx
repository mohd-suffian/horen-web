'use client'

import { useState } from 'react'
import Link from 'next/link'

const specialisations = [
  'Leadership',
  'Communication',
  'Team Building',
  'AI & Productivity',
  'Wellness & EQ',
  'Legal & Compliance',
  'Service Excellence',
  'Sales & Marketing',
  'Other',
]

export default function TrainerRecruitmentPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', specialisation: '', experience: '', bio: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const submitted = status === 'success'

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      // basePath is not auto-prepended for client-side fetch
      const res = await fetch('/horen/v2/api/careers', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.')
      setStatus('success')
      window.scrollTo({ top: 0 })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Join Our Trainer Network</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Share your expertise with Malaysia&apos;s leading hotel brands.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
        {submitted ? (
          <div className="bg-[#1A8C8C]/10 rounded-xl p-8" role="status">
            <p className="font-serif text-2xl text-dark mb-2">Thank you, {form.name.split(' ')[0]}!</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              We&apos;ve received your application and will be in touch if there&apos;s a fit for our trainer network.
              In the meantime, feel free to explore our programmes.
            </p>
            <Link
              href="/programmes"
              className="inline-block mt-6 bg-[#1A8C8C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#1A8C8C]/90 transition-colors"
            >
              View our programmes
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Full name *</label>
                <input
                  type="text" required value={form.name}
                  onChange={e => update('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
                  placeholder="Ahmad Razif"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Email *</label>
                <input
                  type="email" required value={form.email}
                  onChange={e => update('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
                  placeholder="ahmad@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Phone *</label>
                <input
                  type="tel" required value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
                  placeholder="012 345 6789"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Years of experience *</label>
                <input
                  type="text" required value={form.experience}
                  onChange={e => update('experience', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
                  placeholder="e.g. 8 years"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Area of specialisation *</label>
              <select
                required
                value={form.specialisation}
                onChange={e => update('specialisation', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C] bg-white"
              >
                <option value="">Select a specialisation…</option>
                {specialisations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Brief bio *</label>
              <textarea
                required rows={5} value={form.bio}
                onChange={e => update('bio', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C] resize-none"
                placeholder="Tell us about your training experience and background…"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#1A8C8C] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#1A8C8C]/90 transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {status === 'loading' ? 'Submitting…' : 'Submit application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
