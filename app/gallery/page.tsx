import { getAlbums, getActiveCategories, imageUrlFor } from '@/lib/gallery'
import AlbumGrid from './AlbumGrid'

export default function GalleryPage() {
  const albums = getAlbums().map(album => ({
    slug: album.slug,
    title: album.title,
    venue: album.venue,
    category: album.category,
    photoCount: album.photos.length,
    coverUrl: imageUrlFor(album.slug, album.cover),
  }))
  const categories = getActiveCategories()

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

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <AlbumGrid albums={albums} categories={categories} />
      </div>
    </div>
  )
}
