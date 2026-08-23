import Link from 'next/link'
import { categories } from '@/lib/programmes'

export default function ProgrammesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A45] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] mb-3">
            2026/27 Training Catalogue
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            60+ programmes across 8 categories
          </h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            All programmes are HRD Corp claimable under SBL-Khas. Delivered in-house at your property or in combined cohorts.
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <h2 className="font-serif text-2xl text-dark leading-snug">{c.name}</h2>
                <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[#0F2A45] bg-[#C9A84C]/15 rounded-full px-2.5 py-1">
                  {c.count}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-5">{c.desc}</p>

              <ul className="flex flex-col gap-2 mb-6">
                {c.programmes.slice(0, 4).map((p) => (
                  <li key={p} className="text-sm text-gray-600 leading-snug pl-3 border-l-2 border-gray-100">
                    {p}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto text-sm font-semibold text-[#C9A84C] hover:opacity-80 self-start"
              >
                View programmes →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-[#0F2A45] py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-white text-xl font-serif">
            Can&apos;t find what you need? We customise programmes for your property.
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-[#C9A84C] text-[#0F2A45] font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Get a free proposal
          </Link>
        </div>
      </div>
    </div>
  )
}
