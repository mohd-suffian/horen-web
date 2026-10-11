'use client'

import { useState, useEffect, useRef, useCallback, useSyncExternalStore, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/lib/hero'

const INTERVAL_MS = 6000
const REDUCED_MOTION_INTERVAL_MS = 9000
const PRELOAD_TIMEOUT_MS = 3000

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerReducedMotion = () => false

export default function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const [resetSignal, setResetSignal] = useState(0)
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)

  const indexRef = useRef(index)
  useEffect(() => { indexRef.current = index }, [index])

  useEffect(() => {
    function onVisibilityChange() { setTabHidden(document.hidden) }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const canAutoAdvance = slides.length > 1 && !manuallyPaused && !hovered && !keyboardFocused && !tabHidden
  const intervalMs = reducedMotion ? REDUCED_MOTION_INTERVAL_MS : INTERVAL_MS

  // Preloads the next slide before switching to it, so it never fades in blank.
  const advance = useCallback(() => {
    const next = (indexRef.current + 1) % slides.length
    const url = slides[next].src
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      setIndex(next)
    }
    const img = new window.Image()
    img.onload = finish
    img.onerror = finish
    img.src = url
    window.setTimeout(finish, PRELOAD_TIMEOUT_MS)
  }, [slides])

  useEffect(() => {
    if (!canAutoAdvance) return
    const id = window.setInterval(advance, intervalMs)
    return () => window.clearInterval(id)
    // resetSignal forces the interval to restart from zero after a manual dot click.
  }, [canAutoAdvance, intervalMs, advance, resetSignal])

  function goTo(i: number) {
    setIndex(i)
    setResetSignal(s => s + 1)
  }

  function onFocusCapture(e: React.FocusEvent<HTMLElement>) {
    if (e.target.matches(':focus-visible')) setKeyboardFocused(true)
  }

  return (
    <section
      className="relative min-h-[560px] flex items-center py-24 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={onFocusCapture}
      onBlur={() => setKeyboardFocused(false)}
    >
      {slides.map((slide, i) => (
        /* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${reducedMotion ? 'duration-300' : 'duration-1000'}`}
          style={{ opacity: i === index ? 1 : 0, objectPosition: slide.focus }}
        />
      ))}

      <div className="absolute inset-0 bg-[#0A3333]/72" />

      {children}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3 z-10">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                  i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setManuallyPaused(p => !p)}
            aria-label={manuallyPaused ? 'Play slideshow' : 'Pause slideshow'}
            className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer text-white/70 hover:text-white transition-colors"
          >
            {manuallyPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      )}
    </section>
  )
}
