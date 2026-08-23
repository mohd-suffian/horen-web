'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  visible: boolean
}

interface ProgrammeItem extends NavItem {
  column: string
}

interface NavConfig {
  about: NavItem[]
  programmes: { featured: ProgrammeItem[] }
  clientele: NavItem[]
}

const COLUMN_OPTIONS = ['Hospitality Core', 'People & Culture', 'Compliance & Tech']

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export default function NavSettingsClient() {
  const [config, setConfig] = useState<NavConfig | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('horen/v2/api/admin/nav-config')
      .then(res => res.json())
      .then(data => {
        setConfig(data)
        setStatus('idle')
      })
      .catch(() => {
        setStatus('error')
        setMessage('Failed to load navigation config.')
      })
  }, [])

  function updateAbout(next: NavItem[]) {
    setConfig(c => c && { ...c, about: next })
  }
  function updateClientele(next: NavItem[]) {
    setConfig(c => c && { ...c, clientele: next })
  }
  function updateProgrammes(next: ProgrammeItem[]) {
    setConfig(c => c && { ...c, programmes: { featured: next } })
  }

  async function handleSave() {
    if (!config) return
    setStatus('saving')
    setMessage('')

    const res = await fetch('horen/v2/api/admin/nav-config', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(config),
    })

    if (res.ok) {
      setStatus('success')
      setMessage('Navigation saved.')
    } else {
      const data = await res.json().catch(() => ({}))
      setStatus('error')
      setMessage(data.error ?? 'Failed to save navigation.')
    }
  }

  if (status === 'loading' || !config) {
    return (
      <div className="min-h-screen bg-soft flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading navigation…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soft">
      <div className="bg-dark text-white px-8 py-4 flex items-center justify-between">
        <p className="font-serif text-lg text-teal-light">HOREN Admin</p>
        <Link href="/admin" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl text-dark mb-2">Navigation</h1>
        <p className="text-sm text-gray-400 mb-10">Manage the About, Programmes and Clientele menus shown in the navbar.</p>

        <SimpleSection title="About Menu" items={config.about} onChange={updateAbout} />
        <ProgrammeSection title="Programmes Menu" items={config.programmes.featured} onChange={updateProgrammes} />
        <SimpleSection title="Clientele Menu" items={config.clientele} onChange={updateClientele} />

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="bg-teal text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-teal/90 disabled:opacity-50 transition-colors"
          >
            {status === 'saving' ? 'Saving…' : 'Save changes'}
          </button>
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-teal'}`}>{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SimpleSection({
  title,
  items,
  onChange,
}: {
  title: string
  items: NavItem[]
  onChange: (items: NavItem[]) => void
}) {
  function updateItem(i: number, patch: Partial<NavItem>) {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)))
  }
  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function moveItem(i: number, dir: -1 | 1) {
    onChange(move(items, i, i + dir))
  }
  function addItem() {
    onChange([...items, { label: 'New item', href: '/', visible: true }])
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
      <h2 className="font-semibold text-dark text-sm mb-4">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <input
              value={item.label}
              onChange={e => updateItem(i, { label: e.target.value })}
              className="flex-1 min-w-[120px] border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="Label"
            />
            <input
              value={item.href}
              onChange={e => updateItem(i, { href: e.target.value })}
              className="flex-1 min-w-[120px] border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="/href"
            />
            <label className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={e => updateItem(i, { visible: e.target.checked })}
              />
              Visible
            </label>
            <div className="flex items-center gap-0.5 shrink-0">
              <button onClick={() => moveItem(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-dark disabled:opacity-30" aria-label="Move up">
                <ChevronUp size={16} />
              </button>
              <button onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} className="text-gray-400 hover:text-dark disabled:opacity-30" aria-label="Move down">
                <ChevronDown size={16} />
              </button>
            </div>
            <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 shrink-0" aria-label="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addItem}
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal hover:underline"
      >
        <Plus size={14} /> Add item
      </button>
    </div>
  )
}

function ProgrammeSection({
  title,
  items,
  onChange,
}: {
  title: string
  items: ProgrammeItem[]
  onChange: (items: ProgrammeItem[]) => void
}) {
  function updateItem(i: number, patch: Partial<ProgrammeItem>) {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)))
  }
  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function moveItem(i: number, dir: -1 | 1) {
    onChange(move(items, i, i + dir))
  }
  function addItem() {
    onChange([...items, { label: 'New programme', href: '/programmes', column: COLUMN_OPTIONS[0], visible: true }])
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
      <h2 className="font-semibold text-dark text-sm mb-4">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <input
              value={item.label}
              onChange={e => updateItem(i, { label: e.target.value })}
              className="flex-1 min-w-[140px] border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="Label"
            />
            <input
              value={item.href}
              onChange={e => updateItem(i, { href: e.target.value })}
              className="flex-1 min-w-[100px] border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="/href"
            />
            <select
              value={item.column}
              onChange={e => updateItem(i, { column: e.target.value })}
              className="border border-gray-200 rounded-md px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal bg-white shrink-0"
            >
              {COLUMN_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={e => updateItem(i, { visible: e.target.checked })}
              />
              Visible
            </label>
            <div className="flex items-center gap-0.5 shrink-0">
              <button onClick={() => moveItem(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-dark disabled:opacity-30" aria-label="Move up">
                <ChevronUp size={16} />
              </button>
              <button onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} className="text-gray-400 hover:text-dark disabled:opacity-30" aria-label="Move down">
                <ChevronDown size={16} />
              </button>
            </div>
            <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 shrink-0" aria-label="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addItem}
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal hover:underline"
      >
        <Plus size={14} /> Add item
      </button>
    </div>
  )
}
