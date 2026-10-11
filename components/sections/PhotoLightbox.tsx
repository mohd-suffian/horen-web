'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxPhoto {
  src: string
  alt: string
}

export default function PhotoLightbox({ photos }: { photos: LightboxPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrev = useCallback(() => {
    setActiveIndex(i => (i === null ? null : (i - 1 + photos.length) % photos.length))
  }, [photos.length])
  const showNext = useCallback(() => {
    setActiveIndex(i => (i === null ? null : (i + 1) % photos.length))
  }, [photos.length])

  useEffect(() => {
    if (activeIndex === null) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, close, showPrev, showNext])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square rounded-xl bg-[#1A8C8C] overflow-hidden cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
          </button>
        ))}
      </div>

      {activeIndex !== null && photos[activeIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-6"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-6 right-6 text-white/70 hover:text-white"
          >
            <X size={28} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); showPrev() }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <div className="w-[min(80vw,560px)] aspect-square rounded-xl bg-[#1A8C8C] flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
              <img
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); showNext() }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  )
}
