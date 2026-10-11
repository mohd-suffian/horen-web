// New session = new folder in public/images/gallery/, then add one album entry here.

import fs from 'fs'
import path from 'path'

export const categories = ['Training Sessions', 'Team Building', 'Award Nights', 'Workshops'] as const
export type Category = typeof categories[number]

export interface Album {
  slug: string
  title: string
  venue: string
  category: Category
  date?: string
  summary?: string
  cover: string      // filename inside the album folder
  photos: string[]   // filenames inside the album folder, naturally sorted
}

type AlbumMeta = Omit<Album, 'photos'>

const ALBUM_META: AlbumMeta[] = [
  {
    slug: 'eq-kl-ai-session',
    title: 'AI Made Simple: Humanizing AI for Hoteliers',
    venue: 'EQ Kuala Lumpur',
    category: 'Workshops',
    cover: 'photo1.jpeg',
  },
  {
    slug: 'grand-hyatt-service-recovery',
    title: 'Leading the Moment of Truth: Service Recovery, Guest Emotions & Crisis Awareness',
    venue: 'Grand Hyatt Kuala Lumpur',
    category: 'Training Sessions',
    cover: 'photo1.jpeg',
  },
  {
    slug: 'ruma-chow-kit-tune-revenue',
    title: 'Revenue & Sales Leadership',
    venue: 'The RuMa Hotel and Residences, The Chow Kit Hotel and Tune Hotels (Ormond Hotels Group)',
    category: 'Training Sessions',
    cover: 'photo1.jpeg',
  },
  {
    slug: 'awards',
    title: 'Award recognition',
    venue: '',
    category: 'Award Nights',
    cover: 'photo1.jpg',
  },
]

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'gallery')
const IMAGE_RE = /\.(jpe?g|png|webp)$/i

/** Natural sort: photo2 before photo10. */
function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

function listPhotos(slug: string): string[] {
  const dir = path.join(GALLERY_DIR, slug)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => IMAGE_RE.test(f))
    .sort(naturalCompare)
}

/** All albums that currently have at least one photo on disk, in the order declared above. */
export function getAlbums(): Album[] {
  return ALBUM_META
    .map(meta => ({ ...meta, photos: listPhotos(meta.slug) }))
    .filter(album => album.photos.length > 0)
}

export function getAlbum(slug: string): Album | undefined {
  return getAlbums().find(a => a.slug === slug)
}

/** Only the categories that at least one album actually uses, in the declared category order. */
export function getActiveCategories(): Category[] {
  const used = new Set(getAlbums().map(a => a.category))
  return categories.filter(c => used.has(c))
}

export function imageUrlFor(slug: string, file: string) {
  return `/horen/v2/images/gallery/${slug}/${file}`
}

export interface HomeHighlight {
  slug: string
  title: string
  venue: string
  file: string
  large: boolean
}

/**
 * Picks photos for the homepage strip: the first album's cover photo leads (large tile),
 * and photos are interleaved across albums round-robin style so adjacent tiles rarely
 * share an album.
 */
export function getHomeHighlights(limit = 6): HomeHighlight[] {
  const albums = getAlbums()
  const maxPhotos = Math.max(0, ...albums.map(a => a.photos.length))

  const flat: Omit<HomeHighlight, 'large'>[] = []
  for (let col = 0; col < maxPhotos; col++) {
    for (const album of albums) {
      const ordered = [album.cover, ...album.photos.filter(f => f !== album.cover)]
      const file = ordered[col]
      if (file) flat.push({ slug: album.slug, title: album.title, venue: album.venue, file })
    }
  }

  return flat.slice(0, limit).map((item, i) => ({ ...item, large: i === 0 }))
}
