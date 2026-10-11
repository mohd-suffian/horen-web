'use client'

import { useState, useEffect, useSyncExternalStore, type ReactNode } from 'react'

const INTERVAL_MS = 6000

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerReducedMotion = () => false

export default function HeroCarousel({ slides, children }: { slides: string[]; children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)

  useEffect(() => {
    function onVisibilityChange() { setTabHidden(document.hidden) }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const canAutoAdvance = slides.length > 1 && !reducedMotion && !hovered && !focused && !tabHidden

  useEffect(() => {
    if (!canAutoAdvance) return
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [canAutoAdvance, slides.length])

  return (
    <section
      className="relative min-h-[560px] flex items-center py-24 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {slides.map((src, i) => (
        /* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 w-full h-full object-cover ${reducedMotion ? '' : 'transition-opacity duration-1000'}`}
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-[#0A3333]/72" />

      {children}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
