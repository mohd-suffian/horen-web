'use client'

import { useState } from 'react'

const programmes = [
  'Microsoft Azure & M365',
  'AWS Cloud',
  'Red Hat Linux',
  'Soft Skills & Leadership',
  'Technical Writing',
  'Custom / Multiple programmes',
  'Not sure yet',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', programme: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('horen/v2/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    })

    const data = await res.json()
    if (res.ok) {
      setStatus('success')
      setMsg(data.message)
    } else {
      setStatus('error')
      setMsg(data.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft py-16 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow">Get in touch</p>
          <h1 className="font-serif text-4xl text-dark">Request a training proposal</h1>
          <p className="text-gray-500 mt-3 text-base max-w-lg">
            Tell us about your team and objectives — we&apos;ll put together a tailored proposal within 48 hours. No obligation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-14">
        {/* Form */}
        <div>
          {status === 'success' ? (
            <div className="bg-teal-pale rounded-xl p-8">
              <p className="font-serif text-2xl text-dark mb-2">Thank you!</p>
              <p className="text-gray-600 text-sm">{msg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Your name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => update('name', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    placeholder="Ahmad Razif"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Work email *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    placeholder="ahmad@company.com.my"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Company</label>
                <input
                  type="text" value={form.company}
                  onChange={e => update('company', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  placeholder="Your organisation"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Programme of interest</label>
                <select
                  value={form.programme}
                  onChange={e => update('programme', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal bg-white"
                >
                  <option value="">Select a programme…</option>
                  {programmes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">Tell us about your needs *</label>
                <textarea
                  required rows={5} value={form.message}
                  onChange={e => update('message', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                  placeholder="Number of participants, preferred dates, specific topics, delivery mode (virtual / on-site)…"
                />
              </div>

              {status === 'error' && <p className="text-xs text-red-500">{msg}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-teal text-white font-semibold py-3 rounded-lg text-sm hover:bg-teal/90 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Direct contact</p>
            <a href="tel:0124305054" className="block text-sm text-dark font-medium hover:text-teal mb-1">012 430 5054</a>
            <a href="mailto:hello@horen.com.my" className="block text-sm text-teal hover:underline">hello@horen.com.my</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Office</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              No 8, Unit A-21-03, Tower A,<br />
              Vertical Business Suite, Jalan Kerinchi,<br />
              Bangsar South, 59200 Kuala Lumpur
            </p>
          </div>
          <div className="bg-teal-pale rounded-xl p-5">
            <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-1">HRD Corp claimable</p>
            <p className="text-xs text-gray-600 leading-relaxed">All HOREN programmes qualify for HRD Corp claims under the SBL-Khas scheme. We handle the paperwork.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
