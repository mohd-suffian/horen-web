'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface AlbumCard {
  slug: string
  title: string
  venue: string
  category: string
  photoCount: number
  coverUrl: string
}

export default function AlbumGrid({ albums, categories }: { albums: AlbumCard[]; categories: string[] }) {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? albums : albums.filter(a => a.category === filter)

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {['All', ...categories].map(cat => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(album => (
          <Link
            key={album.slug}
            href={`/gallery/${album.slug}`}
            className="group bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
              <img
                src={album.coverUrl}
                alt={`${album.title}, ${album.venue}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg text-dark mb-1 leading-snug">{album.title}</h3>
              {album.venue && <p className="text-sm text-gray-500 mb-2">{album.venue}</p>}
              <p className="text-xs font-semibold text-[#1A8C8C] uppercase tracking-wide">
                {album.photoCount} {album.photoCount === 1 ? 'photo' : 'photos'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
