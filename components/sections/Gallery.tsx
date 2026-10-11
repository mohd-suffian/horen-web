import Link from 'next/link'
import { getHomeHighlights, imageUrlFor } from '@/lib/gallery'

export default function Gallery() {
  const tiles = getHomeHighlights(6)

  return (
    <section className="bg-[#F7F9FC] py-18 px-10">
      <div className="max-w-[1100px] mx-auto">
        <p className="eyebrow">Training Gallery</p>
        <h2 className="font-serif text-3xl font-bold text-dark mb-3">In the room with our clients</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl">
          Live sessions, team building days, and award nights across Malaysia&apos;s leading hotel properties.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiles.map((t, i) => (
            <Link
              key={`${t.slug}-${t.file}`}
              href={`/gallery/${t.slug}`}
              className={`${t.large ? 'md:col-span-2 md:row-span-2 md:min-h-[260px]' : ''}
                group relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden block`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
              <img
                src={imageUrlFor(t.slug, t.file)}
                alt={`${t.title}, ${t.venue}`}
                loading={i === 0 ? undefined : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors flex items-end">
                <span className="text-white text-xs font-medium px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/gallery" className="text-sm text-teal font-semibold">View full gallery →</Link>
        </div>
      </div>
    </section>
  )
}
