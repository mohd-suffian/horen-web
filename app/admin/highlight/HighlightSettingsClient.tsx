'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { highlightStatus, imageUrlFor, type HighlightConfig, type HighlightStatus } from '@/lib/highlights'

const STATUS_STYLES: Record<HighlightStatus, { label: string; className: string }> = {
  live:      { label: 'Live',      className: 'bg-green-50 text-green-600' },
  scheduled: { label: 'Scheduled', className: 'bg-amber-50 text-amber-600' },
  ended:     { label: 'Ended',     className: 'bg-gray-100 text-gray-500' },
  disabled:  { label: 'Disabled',  className: 'bg-gray-100 text-gray-500' },
}

const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.85

function resizeToJpeg(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      let { width, height } = img
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width >= height) {
          height = Math.round((height * MAX_DIMENSION) / width)
          width = MAX_DIMENSION
        } else {
          width = Math.round((width * MAX_DIMENSION) / height)
          height = MAX_DIMENSION
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Canvas is not supported in this browser.'))
        return
      }

      // Fill white behind the image first, in case the source PNG has transparency.
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        blob => {
          URL.revokeObjectURL(url)
          if (blob) resolve(blob)
          else reject(new Error('Could not process the image.'))
        },
        'image/jpeg',
        JPEG_QUALITY,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read the selected image.'))
    }

    img.src = url
  })
}

export default function HighlightSettingsClient() {
  const [config, setConfig] = useState<HighlightConfig | null>(null)
  const [showAgain, setShowAgain] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/horen/v2/api/admin/highlight')
      .then(res => res.json())
      .then(data => {
        setConfig(data)
        setStatus('idle')
      })
      .catch(() => {
        setStatus('error')
        setMessage('Failed to load highlight settings.')
      })
  }, [])

  function patch(fields: Partial<HighlightConfig>) {
    setConfig(c => c && { ...c, ...fields })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    try {
      const jpeg = await resizeToJpeg(file)
      const res = await fetch('/horen/v2/api/admin/highlight/image', {
        method: 'POST',
        headers: { 'Content-Type': 'image/jpeg' },
        body: jpeg,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload failed.')

      patch({ image: data.image })
      setShowAgain(true)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleSave() {
    if (!config) return
    setStatus('saving')
    setMessage('')

    const res = await fetch('/horen/v2/api/admin/highlight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...config, showAgain }),
    })
    const data = await res.json().catch(() => ({}))

    if (res.ok) {
      setConfig(data.config)
      setShowAgain(false)
      setStatus('success')
      setMessage('Highlight saved.')
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Failed to save highlight.')
    }
  }

  if (status === 'loading' || !config) {
    return (
      <div className="min-h-screen bg-soft flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading highlight settings…</p>
      </div>
    )
  }

  const liveStatus = highlightStatus(config)
  const pill = STATUS_STYLES[liveStatus]

  return (
    <div className="min-h-screen bg-soft">
      <div className="bg-[#0A3333] text-white px-8 py-4 flex items-center justify-between">
        <p className="font-serif text-lg text-[#5DC6C6]">HOREN Admin</p>
        <Link href="/admin" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-serif text-3xl text-[#0A3333]">Latest highlight</h1>
          <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${pill.className}`}>
            {pill.label}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-10">Manage the homepage popup: poster, dates, and on/off.</p>

        {/* Enabled toggle */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={e => patch({ enabled: e.target.checked })}
            />
            <span className="text-sm font-semibold text-[#0A3333]">Enabled</span>
          </label>
        </div>

        {/* Poster */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-[#0A3333] text-sm mb-4">Poster</h2>

          <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 mb-4 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
            <img
              src={imageUrlFor(config.image)}
              alt="Current poster preview"
              className="max-h-96 w-auto object-contain"
            />
          </div>

          <label className="inline-block">
            <span className="bg-[#1A8C8C] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#1A8C8C]/90 transition-colors cursor-pointer">
              {uploading ? 'Uploading…' : 'Replace image'}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {uploadError && <p className="text-xs text-red-500 mt-3">{uploadError}</p>}

          <p className="text-xs text-gray-400 mt-3">
            The new poster is not visible to visitors until you click Save below.
          </p>
        </div>

        {/* Content fields */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 flex flex-col gap-5">
          <h2 className="font-semibold text-[#0A3333] text-sm">Content</h2>

          <Field label="Floating button text">
            <input
              value={config.label}
              onChange={e => patch({ label: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
            />
          </Field>

          <Field label="Title">
            <input
              value={config.title}
              onChange={e => patch({ title: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
            />
          </Field>

          <Field label="Image description" hint="Describe the poster's text for visitors using screen readers">
            <textarea
              value={config.imageAlt}
              onChange={e => patch({ imageAlt: e.target.value })}
              rows={3}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C] resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Start date">
              <input
                type="date"
                value={config.startsOn}
                onChange={e => patch({ startsOn: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
              />
            </Field>
            <Field label="End date">
              <input
                type="date"
                value={config.endsOn}
                onChange={e => patch({ endsOn: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
              />
            </Field>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoOpen}
                onChange={e => patch({ autoOpen: e.target.checked })}
              />
              <span className="text-sm text-gray-600">Auto-open after</span>
            </label>
            <input
              type="number"
              min={0}
              max={60}
              value={config.autoOpenDelaySec}
              onChange={e => patch({ autoOpenDelaySec: Number(e.target.value) })}
              disabled={!config.autoOpen}
              className="w-20 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C] disabled:opacity-50"
            />
            <span className="text-sm text-gray-600">seconds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Extra button text" hint="Optional — leave blank for no extra button">
              <input
                value={config.linkLabel}
                onChange={e => patch({ linkLabel: e.target.value })}
                placeholder="e.g. View on LinkedIn"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
              />
            </Field>
            <Field label="Extra button link">
              <input
                value={config.linkUrl}
                onChange={e => patch({ linkUrl: e.target.value })}
                placeholder="https:// or /path"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8C8C]/30 focus:border-[#1A8C8C]"
              />
            </Field>
          </div>
        </div>

        {/* Show again */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showAgain}
              onChange={e => setShowAgain(e.target.checked)}
            />
            <span className="text-sm text-gray-600">Show again to visitors who already saw it</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="bg-[#1A8C8C] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#1A8C8C]/90 disabled:opacity-50 transition-colors"
          >
            {status === 'saving' ? 'Saving…' : 'Save changes'}
          </button>
          <a
            href="/horen/v2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#1A8C8C] hover:underline"
          >
            View homepage ↗
          </a>
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-[#1A8C8C]'}`}>{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 block mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
    </div>
  )
}
