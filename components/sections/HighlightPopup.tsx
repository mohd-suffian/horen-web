'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { currentHighlight, isHighlightActive } from '@/lib/highlights'

const AUTO_OPEN_DELAY_MS = 8000
const noopSubscribe = () => () => {}

function seenKey(id: string) {
  return `horen-highlight-seen:${id}`
}

function hasSeen(id: string) {
  try {
    return window.localStorage.getItem(seenKey(id)) === '1'
  } catch {
    return false
  }
}

function markSeen(id: string) {
  try {
    window.localStorage.setItem(seenKey(id), '1')
  } catch {
    // storage blocked (private mode etc.): popup may show again next visit, which is fine
  }
}

export default function HighlightPopup() {
  // Server render and first client render both return false, so there is no hydration
  // mismatch, and an expired campaign never flashes from the static HTML.
  const active = useSyncExternalStore(
    noopSubscribe,
    () => isHighlightActive(currentHighlight),
    () => false,
  )
  const h = active ? currentHighlight : null

  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const show = useCallback(() => {
    if (!h) return
    setOpen(true)
    markSeen(h.id)
  }, [h])

  const close = useCallback(() => setOpen(false), [])

  // Auto-open once per visitor per campaign
  useEffect(() => {
    if (!h || hasSeen(h.id)) return
    const timer = window.setTimeout(show, AUTO_OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [h, show])

  // Escape key, scroll lock, focus while open
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  if (!h) return null

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          type="button"
          onClick={show}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2 bg-[#1A8C8C] text-white text-sm font-semibold pl-4 pr-5 py-3 rounded-full shadow-[0_6px_24px_rgba(10,51,51,0.35)] hover:bg-[#157575] transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C9A84C]" />
          </span>
          {h.label}
        </button>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 pt-16 pb-6"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={h.title}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-[min(480px,calc((100vh-14rem)*0.7076))] max-h-full flex flex-col"
          >
            {/* Close sits above the panel so it never covers the poster */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white text-[#0A3333] shadow-lg flex items-center justify-center hover:bg-gray-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-0">
            <div className="overflow-y-auto">
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
              <img
                src={`/horen/v2/images/highlights/${h.image}`}
                alt={h.imageAlt}
                className="block w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 border-t border-gray-100 bg-white">
              <Link
                href="/contact"
                onClick={close}
                className="col-span-3 sm:col-span-1 text-center bg-[#1A8C8C] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#157575] transition-colors"
              >
                Enquire now
              </Link>
              <a
                href="tel:+60195825007"
                className="col-span-3 sm:col-span-1 text-center border border-[#1A8C8C] text-[#1A8C8C] text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1A8C8C]/5 transition-colors"
              >
                Call 019-582 5007
              </a>
              <a
                href="mailto:info@horen.com.my?subject=Mental%20wellness%20training%20enquiry"
                className="col-span-3 sm:col-span-1 text-center border border-[#1A8C8C] text-[#1A8C8C] text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1A8C8C]/5 transition-colors"
              >
                Email us
              </a>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
