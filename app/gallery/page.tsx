'use client'

import { useState, useEffect, useCallback } from 'react'
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = ['All', 'Training Sessions', 'Team Building', 'Award Nights', 'Workshops'] as const
type Category = typeof categories[number]

interface GalleryItem {
  label: string
  category: Exclude<Category, 'All'>
}

const images: GalleryItem[] = [
  { label: 'Featured Session',   category: 'Training Sessions' },
  { label: 'Hotel Visit',        category: 'Training Sessions' },
  { label: 'F&B Training',       category: 'Training Sessions' },
  { label: 'Sunway Hotel',       category: 'Training Sessions' },
  { label: 'Team Building',      category: 'Team Building' },
  { label: 'Group Training',     category: 'Team Building' },
  { label: 'SKS Session',        category: 'Team Building' },
  { label: 'Award Night',        category: 'Award Nights' },
  { label: 'MIDA Event',         category: 'Award Nights' },
  { label: 'Workshop',           category: 'Workshops' },
  { label: 'Leadership Session', category: 'Workshops' },
  { label: 'Holiday Villa',      category: 'Workshops' },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState<Category>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter)

  const close = useCallback(() => setLightboxIndex(null), [])
  const showPrev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])
  const showNext = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, close, showPrev, showNext])

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0A3333] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Training Gallery</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            In the room with our clients — live sessions, team building days and award nights.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                filter === cat
                  ? 'bg-[#1A8C8C] text-white'
                  : 'bg-[#F7F8FA] text-gray-500 hover:bg-[#1A8C8C]/10 hover:text-[#1A8C8C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Image grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <button
              key={img.label}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square rounded-xl bg-[#1A8C8C] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon size={28} className="text-white/40" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                <span className="text-white text-sm font-medium text-center px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
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
            <div className="w-[min(80vw,560px)] aspect-square rounded-xl bg-[#1A8C8C] flex items-center justify-center">
              <ImageIcon size={56} className="text-white/40" />
            </div>
            <p className="text-white text-sm font-medium mt-5">{filtered[lightboxIndex].label}</p>
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
    </div>
  )
}
