import Link from 'next/link'
import { categories } from '@/lib/programmes'
import CategoryBanner from '@/components/ui/CategoryBanner'

export default function Programmes() {
  return (
    <section className="bg-white py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">
          What we offer
        </p>
        <h2 className="font-serif text-4xl text-dark mb-11">Our programmes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/programmes#${c.slug}`}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <CategoryBanner icon={c.icon} count={c.count} image={c.image} size="card" />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-lg text-dark leading-snug mb-2">{c.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/programmes"
            className="text-sm font-semibold text-[#1A8C8C] border-b-[1.5px] border-[#1A8C8C] pb-0.5 hover:opacity-80"
          >
            View all programmes →
          </Link>
        </div>
      </div>
    </section>
  )
}
