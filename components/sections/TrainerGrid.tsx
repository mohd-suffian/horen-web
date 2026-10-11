'use client'

import { useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { trainers, type Trainer } from '@/lib/trainers'

const HASH_EVENT = 'trainer-hash-change'
function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  window.addEventListener(HASH_EVENT, cb)
  return () => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener(HASH_EVENT, cb)
  }
}
const getHash = () => window.location.hash.slice(1)
const getServerHash = () => ''

function initials(name: string) {
  return name
    .replace(/^Dr\s+/, '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
}

export default function TrainerGrid() {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash)
  const active = trainers.find(t => t.slug === hash) ?? null
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new Event(HASH_EVENT))
  }, [])

  const open = useCallback((trainer: Trainer) => {
    history.replaceState(null, '', `#${trainer.slug}`)
    window.dispatchEvent(new Event(HASH_EVENT))
  }, [])

  useEffect(() => {
    if (!active) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active, close])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map(t => (
          <button
            key={t.slug}
            onClick={() => open(t)}
            className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 flex flex-col items-center text-center cursor-pointer hover:border-[#1A8C8C]/40 transition-colors"
          >
            <div className="w-20 h-20 rounded-full bg-[#1A8C8C]/15 flex items-center justify-center mb-5 overflow-hidden ring-1 ring-gray-200">
              {t.photo ? (
                <img src={`/horen/v2/images/team/${t.photo}`} alt={t.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="font-serif text-2xl text-[#1A8C8C]">{initials(t.name)}</span>
              )}
            </div>
            <h3 className="font-serif text-lg text-dark mb-2">{t.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{t.spec}</p>
            <span className="text-xs font-semibold text-[#1A8C8C] mt-3">View profile</span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="trainer-modal-name"
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative p-7"
          >
            <button
              ref={closeButtonRef}
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 text-gray-400 hover:text-dark transition-colors"
            >
              <X size={22} />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-1 ring-gray-200 mb-4">
                <img
                  src={`/horen/v2/images/team/${active.photo}`}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 id="trainer-modal-name" className="font-serif text-2xl text-dark">{active.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{active.spec}</p>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {active.categories.map(c => (
                  <span key={c} className="bg-[#1A8C8C]/10 text-[#1A8C8C] rounded-full text-xs px-3 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Signature programmes</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {active.programmes.map(p => (
                  <li key={p} className="text-sm text-gray-600 leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>

            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Ideal for</p>
              <p className="text-sm text-gray-500">{active.audience.join(' · ')}</p>
            </div>

            <Link
              href="/contact"
              className="block w-full text-center bg-[#1A8C8C] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#1A8C8C]/90 transition-colors"
            >
              Enquire about this trainer
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
