import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAlbums, getAlbum, imageUrlFor } from '@/lib/gallery'
import PhotoLightbox from '@/components/sections/PhotoLightbox'

interface Props {
  params: Promise<{ album: string }>
}

export async function generateStaticParams() {
  return getAlbums().map(a => ({ album: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { album: slug } = await params
  const album = getAlbum(slug)
  if (!album) return {}
  return { title: `${album.title} | HOREN Training Gallery` }
}

export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params
  const album = getAlbum(slug)
  if (!album) notFound()

  const photos = album.photos.map(file => ({
    src: imageUrlFor(album.slug, file),
    alt: `${album.title}, ${album.venue}`,
  }))

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0A3333] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/gallery" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to gallery
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">{album.title}</h1>
          {album.venue && <p className="text-white/70 text-base">{album.venue}</p>}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <PhotoLightbox photos={photos} />
      </div>
    </div>
  )
}
